const express = require('express');
const https = require('https');
// to connect the js and html
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const units = "metric";
    const apiKey = "143cff8afb9499abe2674dc80c7233bf#";

    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weather = JSON.parse(data);
            const name = weather.name;
            const temp = weather.main.temp;
            const desc = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<h1>City ${name} has a temp: ${temp} &#8451;</h1>`);
            res.write(`<h2>Current Weather condition is ${desc}</h2>`);
            res.write(`<img src="${imgURL}">`);
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// Existing code

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('form');
//     const cityNameInput = document.getElementById('city');
//     const weatherInfo = document.getElementById('weather-info');

//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const query = cityNameInput.value;
//         const units = 'metric';
//         const apiKey = '143cff8afb9499abe2674dc80c7233bf#';

//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 const name = data.name;
//                 const temp = data.main.temp;
//                 const desc = data.weather[0].description;
//                 const icon = data.weather[0].icon;
//                 const imgURL = `http://openweathermap.org/img/wn/${icon}.png`;

//                 const weatherDetails = `
//                     <h2>${name}</h2>
//                     <p>Temperature: ${temp} °C</p>
//                     <p>Weather: ${desc}</p>
//                     <img src="${imgURL}" alt="Weather Icon">
//                 `;

//                 weatherInfo.innerHTML = weatherDetails;
//             })
//             .catch(error => console.log(error));
//     });
// });
