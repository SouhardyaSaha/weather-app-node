const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Initialize Express
const app = express();

// Load View Engine
app.set('view engine', 'hbs');
// change default views dir
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir); // set up partials directory

// Load Public Directory as static 
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));


// Routes

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Souhardya Saha'
    });
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'Souhardya',
    });

});

app.get('/weather', (req, res) => {

    const userLocation = req.query.location;

    if (!userLocation) {
        return res.send({
            error: 'Please provide the location query'
        });
    }

    geocode.getLocationInformation(userLocation, (geocodeError, { latitude, longitude, location } = {}) => {

        if (geocodeError) {
            return res.send({
                error: geocodeError
            });
        }

        forecast.getForecastInformation(latitude, longitude, (forecastError, forecastData) => {

            if (forecastError) {
                return res.send({
                    error: forecastError
                });
            }

            return res.send({
                location,
                forecastData
            });

        });

    });


});

app.get('/products', (req, res) => {

    const search = req.query.search;
    if (!search) {
        return res.send({
            error: 'The search query must be provided'
        });
    }
    res.send({
        products: []
    });

});

app.get('/about/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Souhardya',
        errorMessage: 'About article not found..!!'
    });

});

app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Souhardya',
        errorMessage: 'Page not Found'
    });

});

app.listen(3500, () => {
    console.log('Listening to 3500');
});