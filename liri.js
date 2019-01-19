// requiring all of the proper NPM info.
require("dotenv").config();
var axios = require("Axios");
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');

// grabbing API keys and putting them in 
// an easy variable format
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var bandsInTown = keys.bandsInTown.key;

var liriCommand = process.argv[2];
var liriInput = process.argv.slice(3).join(" ");

// switch statement to process userInput
switch (liriCommand) {
    case "spotify-this-song":
        Spotify();
        break;
    case "concert-this":
        bit();
        break;
    case "movie-this":
        Omdb();
        break;
    case "do-what-it-says":
        txtFile();
        break;
};

// music
function Spotify() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
};
// bit = Bands In Town
function bit() {
    axios.get(//todo)
    ).then(function (response) {
        console.log()//todo
    });
};
// movies
function Omdb() {
    axios.get("http://www.omdbapi.com/?apikey=" + omdb + "&y=&plot=short&t=" + liriInput)
        .then(function (response) {
            console.log("Title: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nCountry Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nList of actors: " + response.data.Actors);
        });
};
// run the process on a txt file of data
function txtFile() {

};