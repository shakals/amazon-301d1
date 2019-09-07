'use strict';

const cors = require('cors');
const superagent = require('superagent');
const requestPkg = require('request');
const express = require('express');
const app = express();

require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 6000;
const googleKey = process.env.GOOGLE_GEOCODE_API_KEY;
const darkSkyKey = process.env.DARKSKY_API_KEY;

/* Extract city name using Route parameter instead of Query string */
app.get('/city/:name', (req,res) => {
  // console.log(`req_params=${req.params}`); //#Brian - Need help understanding why template literal is not working here and showing me '[object Object]' in console
  console.log(req.params); //#Brian - This works just fine. The template literal convention used above is not working. Why is that?
  console.log(req.params.name);

  const locObject = findLatAndLong(req.params.name);
  res.send(locObject);
});


function findLatAndLong(name){
  /*const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${googleKey}`;
  requestPkg(url, (error, response, body) => {
    console.log('requestPkg Error', error);
    //console.log('requestPkg response', response);
    console.log('requestPkg body', body);
  })*/
  const geoData = require('./data/geocode.json');
  //console.log(geoData.results[0]);
  const location = new Location(geoData.results[0]);
  return location;
}

function Location(data){
  this.formatted_loc = data.formatted_address;
  this.lat = data.geometry.location.lat;
  this.long = data.geometry.location.lng;
}


/* Weather route */
//app.get('/weather', getWeather);
app.get('/weather/:latitude/:longitude', getWeather); //Route parameter version

function getWeather(request, response){
  //const url = `https://api.darksky.net/forecast/${darkSkyKey}/${request.query.latitude},${request.query.longitude}`;
  const url = `https://api.darksky.net/forecast/${darkSkyKey}/${request.params.latitude},${request.params.longitude}`;

  console.log(url);
  superagent.get(url)
    .then(result => {
      const weatherSummaries = result.body.daily.data.map(day=>{
        return new Weather(day);
      });
      response.send(weatherSummaries);
      //console.log(result);
    });
}

function Weather (day){
  this.weatherForecast = day.summary;
  this.maxTemp = day.temperatureHigh;
  this.minTemp = day.temperatureLow;
  this.precipitation = `${day.precipProbability * 100}%`;
  this.time = new Date(day.time * 1000).toDateString();
}

/* Spin up the Web server and keep listening for incoming requests */
app.listen(PORT,() => {
  console.log(`City Explorer Web Server listening on Port ${PORT}`);
});
