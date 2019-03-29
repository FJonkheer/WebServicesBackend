var express = require('express');
var dataprovider = require('./backend');
var Promise = require('q').Promise;
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCD2JoR9-AOOSpb6QxW028IGrJklqUvH1M',
  Promise: Promise
});
var app = express();
var port = 8081;
var alkGetraenke = "Weizen Pils Radler Colabier Colaweizen";
var alkfGetraenke = "Cola Fanta Sprite Wasser Apfelschorle Tee";
alkGetraenke = alkGetraenke.split(" ");
alkfGetraenke = alkfGetraenke.split(" ");
var Random;
var DrinkName = "Wasser";

app.get('/', (req, res) => {
  res.json({0: "Hello"});
});

app.get('/yesno', (req, res) => {
  dataprovider.run("http://yesno.wtf/api/")
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  })
});

app.listen(port, () => {
  console.log("Backend running on: " + port);
});

app.get('/result/:Coordinates/:Rad/:Driver', (req, res) => {
  var coordinates = req.params.Coordinates;
  var rad = parseInt(req.params.Rad);
  googleMapsClient.placesNearby({
    language: 'de',
    location: '' + coordinates,
    radius: rad,
    type: 'bar'
  })
  .asPromise()
  .then(function(response) {
    if(req.params.Driver == "true")
    {
      Random = Math.floor(Math.random() * alkfGetraenke.length);
      DrinkName = alkfGetraenke[Random];
    }
    else if (req.params.Driver == "false")
    {
      Random = Math.floor(Math.random() * alkGetraenke.length);
      DrinkName = alkGetraenke[Random];
    }
    Random = Math.floor(Math.random() * (response.json.results.length));
    var Name = response.json.results[Random].name;
    var Adresse = response.json.results[Random].vicinity;
    var Longitude = response.json.results[Random].geometry.location.lng;
    var Latitude = response.json.results[Random].geometry.location.lat;
    var Strings = Adresse.split(',');
    var Strasse = Strings[0];
    var Ort = Strings[1];
    var S = String("drinkName:"+DrinkName+",pubName:"+Name+",pubStreet:"+Strasse+",pubCity:"+Ort+",lng:"+Longitude+",lat"+Latitude);
    var obj = { drinkName: DrinkName, pubName: Name, pubStreet: Strasse, pubCity: Ort, lng: Longitude, lat: Latitude};
    var JSN = JSON.stringify(obj);
    JSN = JSON.parse(JSN);
    res.json(JSN);
  })
  .catch((err) => {
    console.log(err);
  })
});
