# 🌤️ Weather Dashboard

A beautiful, responsive weather application that fetches real-time weather data from the OpenWeatherMap API. Get current conditions, 5-day forecasts, hourly predictions, and more!

## ✨ Features

### 🎯 Core Functionality
- **Real-Time Weather Data** - Current temperature, humidity, wind speed, and more
- **5-Day Forecast** - See upcoming weather trends
- **Hourly Forecast** - Detailed predictions for the next 12 hours
- **Location Services** - Get weather for your current location
- **City Search** - Search weather for any city worldwide
- **Recent Searches** - Quick access to previously searched cities

### 🎨 User Interface
- Beautiful purple gradient design
- Responsive layout (works on all devices)
- Smooth animations and transitions
- Intuitive search interface
- Weather emoji icons for visual appeal
- Loading spinner and error messages

### 📊 Weather Information Displayed
- Current temperature and "feels like" temperature
- Weather condition description
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- Cloud coverage percentage
- Rain/precipitation data

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone or download the files**
   ```bash
   git clone https://github.com/marjaanshelia918-boop/teenverse.git
   cd teenverse
   ```

2. **Get a Free API Key**
   - Visit: https://openweathermap.org/api
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key

3. **Update the API Key**
   - Open `weather-script.js`
   - Replace `'e8d9d4b2d2d2d2d2d2d2d2d2d2d2d2d2'` with your actual API key:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

4. **Open in Browser**
   - Open `weather.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000/weather.html
   ```

## 📁 File Structure

```
weather-dashboard/
├── weather.html          # Main HTML file
├── weather-style.css     # CSS styling and animations
├── weather-script.js     # JavaScript with API integration
└── README.md            # Documentation
```

## 🔧 How It Works

### Search by City
1. Enter a city name in the search box
2. Press Enter or click the Search button
3. Weather data loads automatically
4. City is saved to recent searches

### Use Current Location
1. Click the 📍 location button
2. Grant browser permission to access location
3. Weather for your location loads instantly

### Recent Searches
- Click any city in the "Recent Searches" section
- Stores up to 5 most recent searches
- Data persists in browser's local storage

## 🌐 API Integration

### OpenWeatherMap API Endpoints Used

1. **Geocoding API** - Convert city names to coordinates
   ```
   GET /geo/1.0/direct?q={city}&limit=1&appid={API_KEY}
   ```

2. **Current Weather API** - Get real-time weather
   ```
   GET /data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}
   ```

3. **Forecast API** - Get 5-day forecast
   ```
   GET /data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}
   ```

### Units
- Temperature: Celsius (°C)
- Wind Speed: meters per second (m/s)
- Visibility: kilometers (km)
- Pressure: hectopascals (hPa)

## 🎨 Customization

### Change Color Scheme
Edit `weather-style.css`:
```css
/* Change gradient colors */
body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Change Temperature Unit
In `weather-script.js`, change `units=metric` to:
- `units=imperial` for Fahrenheit
- `units=standard` for Kelvin

### Modify Forecast Days
In `displayForecast()` function:
```javascript
.slice(0, 5)  // Change 5 to desired number
```

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Multi-column grid layout
- **Tablet**: 2-column layout
- **Mobile**: Single-column stacked layout

## 🛠️ Troubleshooting

### "City not found" Error
- Check spelling of city name
- Try with country code (e.g., "London, UK")

### API Key Not Working
- Verify API key is correct
- Check that you've activated the key in OpenWeatherMap
- Ensure free tier quota hasn't been exceeded

### Location Permission Denied
- Grant browser permission to access location
- Check browser privacy settings
- Try searching by city instead

### Blank Weather Display
- Wait for API response (may take 1-2 seconds)
- Check browser console for error messages (F12)
- Verify internet connection

## 🔒 Security Notes

- **API Key**: Never commit your actual API key to public repositories
- **Local Storage**: Recent searches stored in browser (not transmitted)
- **HTTPS**: Use HTTPS when deploying to production
- **CORS**: May require server-side proxy for production

## 📈 Future Enhancements

- [ ] Multiple language support
- [ ] Weather alerts for severe conditions
- [ ] Air quality index data
- [ ] UV index details
- [ ] Moon phase information
- [ ] Sunrise/sunset times
- [ ] Favorite cities list
- [ ] Historical weather data
- [ ] Weather comparison between cities
- [ ] Mobile app version

## 📊 Weather Icons Reference

| Condition | Icon |
|-----------|------|
| Clear | ☀️ |
| Clouds | ☁️ |
| Rain | 🌧️ |
| Drizzle | 🌦️ |
| Thunderstorm | ⛈️ |
| Snow | ❄️ |
| Mist/Fog | 🌫️ |
| Tornado | 🌪️ |

## 🌐 Live Demo

Access the live dashboard at:
```
https://marjaanshelia918-boop.github.io/teenverse/weather.html
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console errors (F12)
3. Create an issue on GitHub

## 🎓 Learning Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

## 📊 Technical Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure |
| CSS3 | Styling & Animations |
| JavaScript (ES6+) | Interactivity & API calls |
| OpenWeatherMap API | Weather Data |
| LocalStorage | Data Persistence |
| Geolocation API | User Location |

---

**Created by:** marjaanshelia918-boop  
**Last Updated:** July 6, 2026  
**Repository:** https://github.com/marjaanshelia918-boop/teenverse

🌟 **Enjoy your Weather Dashboard!** 🌟