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

/* Extract city name using Route parameter instead of Query string */
app.get('/city/:name', (req,res) => {
  // console.log(`req_params=${req.params}`); //#Brian - Need help understanding why template literal is not working here and showing me '[object Object]' in console
  console.log(req.params); //#Brian - This works just fine. The template literal convention used above is not working
  console.log(req.params.name);

  findLatAndLong(req.params.name);
});


function findLatAndLong(name){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${googleKey}`;
  requestPkg(url, (error, response, body) => {
    console.log('requestPkg Error', error);
    //console.log('requestPkg response', response);
    console.log('requestPkg body', body);
  })
}


/* Spin up the Web server and keep listening for incoming requests */
app.listen(PORT,() => {
  console.log(`City Explorer Web Server listening on Port ${PORT}`);
});
