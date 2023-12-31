// script.js
async function getWeather() {
    const apiKey = 'apiKey';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 401) {
                alert('Unauthorized access. Please check your API key.');
            } else {
                console.log(`Error: ${response.status}`);
            }
            return;
        }
        console.log("check response");

        const data = await response.json();

        // Display current weather information
        const currentWeatherInfo = `Temperature: ${data.list[0].main.temp}°C<br>
                                     Description: ${data.list[0].weather[0].description}<br>
                                     Humidity: ${data.list[0].main.humidity}%<br>
                                     Wind Speed: ${data.list[0].wind.speed} m/s`;

        document.getElementById('weather-info').innerHTML = currentWeatherInfo;
        console.log("dispaly response");

        // Prepare data for the temperature chart
        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };
        console.log("chartdata response");

        // Extract data for the chart
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            chartData.labels.push(`${date.getHours()}:00`);
            chartData.datasets[0].data.push(item.main.temp);
        });
        console.log("check foreach");
        // Display temperature chart
        const ctx = document.getElementById('temperatureChart').getContext('2d');
        console.log('Canvas Context:', ctx);
        console.log('Chart Data:', chartData);

        const temperatureChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: chartData.labels,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        console.log("check ctx");
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again later.');
    }
}
