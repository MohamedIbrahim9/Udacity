// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log('server is running');
});



//get prject data method setup
app.get('/allData', (req, res) => {
    res.send(projectData);
    console.log(res)
});


//POST Weather Data 
app.post('/AddWeatherData', (req, res) => {
    console.log(req);
    projectData.temperature = req.body.temperature;
    projectData.cityName = req.body.cityName;
    projectData.countryName = req.body.countryName;
    projectData.userResponse = req.body.userResponse;
    projectData.date = req.body.date;
});




