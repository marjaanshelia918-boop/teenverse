// Weather API Configuration
const API_KEY = '8d4fb5b93d4af21d66a2948710284366'; // Free tier API key from OpenWeatherMap
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const currentWeatherSection = document.getElementById('currentWeatherSection');
const forecastSection = document.getElementById('forecastSection');
const hourlySection = document.getElementById('hourlySection');
const recentSearchesSection = document.getElementById('recentSearchesSection');

// Recent searches array
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Search weather by city name
async function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        await fetchWeatherByCity(city);
        addToRecentSearches(city);
        searchInput.value = '';
    } catch (error) {
        showError('City not found. Please try again.');
        console.error(error);
    }
}

// Get weather by coordinates
async function getLocationWeather() {
    if (navigator.geolocation) {
        showSpinner(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    await fetchWeatherByCoords(latitude, longitude);
                    showSpinner(false);
                } catch (error) {
                    showError('Error fetching weather for your location');
                    showSpinner(false);
                }
            },
            (error) => {
                showError('Unable to access your location');
                showSpinner(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    showSpinner(true);
    hideError();
    
    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `${GEO_API_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        
        if (!geoResponse.ok) throw new Error('City not found');
        
        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error('City not found');
        
        const { lat, lon, name, country } = geoData[0];
        await fetchWeatherByCoords(lat, lon, `${name}, ${country}`);
    } catch (error) {
        showSpinner(false);
        throw error;
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon, cityName = null) {
    try {
        // Current weather
        const weatherResponse = await fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        // Forecast
        const forecastResponse = await fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        displayHourlyForecast(forecastData);
        
        showSpinner(false);
    } catch (error) {
        showSpinner(false);
        throw error;
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name } = data;
    const weatherIcon = getWeatherIcon(weather[0].main);
    
    document.getElementById('cityName').textContent = `${name}, ${data.sys.country}`;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
    document.getElementById('weatherDescription').textContent = weather[0].main;
    document.getElementById('weatherIcon').textContent = weatherIcon;
    
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°C`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('precipitation').textContent = `${clouds.all}%`;
    
    currentWeatherSection.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    const dailyData = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!dailyData[date]) {
            dailyData[date] = {
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                weather: item.weather[0].main,
                rain: item.rain?.['3h'] || 0
            };
        } else {
            dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
            dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
        }
    });
    
    Object.entries(dailyData).slice(0, 5).forEach(([date, forecast]) => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="forecast-icon">${getWeatherIcon(forecast.weather)}</div>
            <div class="forecast-temp">${Math.round(forecast.temp_max)}° / ${Math.round(forecast.temp_min)}°</div>
            <div class="forecast-desc">${forecast.weather}</div>
            <div class="forecast-rain">💧 ${forecast.rain.toFixed(1)}mm</div>
        `;
        forecastContainer.appendChild(card);
    });
    
    forecastSection.classList.remove('hidden');
}

// Display hourly forecast
function displayHourlyForecast(data) {
    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = '';
    
    data.list.slice(0, 12).forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-icon">${getWeatherIcon(item.weather[0].main)}</div>
            <div class="hourly-temp">${Math.round(item.main.temp)}°C</div>
        `;
        hourlyContainer.appendChild(card);
    });
    
    hourlySection.classList.remove('hidden');
}

// Get weather icon based on condition
function getWeatherIcon(weatherType) {
    const iconMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Smoke': '💨',
        'Dust': '💨',
        'Sand': '💨',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return iconMap[weatherType] || '🌤️';
}

// Add city to recent searches
function addToRecentSearches(city) {
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        displayRecentSearches();
    }
}

// Display recent searches
function displayRecentSearches() {
    if (recentSearches.length === 0) {
        recentSearchesSection.classList.add('hidden');
        return;
    }
    
    const recentList = document.getElementById('recentSearchesList');
    recentList.innerHTML = '';
    
    recentSearches.forEach(city => {
        const item = document.createElement('button');
        item.className = 'recent-item';
        item.textContent = city;
        item.onclick = async () => {
            try {
                await fetchWeatherByCity(city);
            } catch (error) {
                showError('Error fetching weather for ' + city);
            }
        };
        recentList.appendChild(item);
    });
    
    recentSearchesSection.classList.remove('hidden');
}

// Utility functions
function showSpinner(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Event listeners
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize
window.addEventListener('load', () => {
    displayRecentSearches();
    // Load default city on startup
    fetchWeatherByCity('London');
});