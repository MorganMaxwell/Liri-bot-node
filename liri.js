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

// grab userInput from command line
var liriCommand = process.argv[2];
var liriInput = process.arg[3];
// switch statement to process userInput
switch (liriInput) {
    case "spotify-this-song":
        spotify();
        break;
    case "concert-this":
        bit();
        break;
    case "movie-this":
        omdb();
        break;
    case "do-what-it-says":
        txtFile();
        break;
};

// music
function spotify() {

};
// bit = Bands In Town
function bit() {

};
// movies
function omdb() {

};
// run the process on a txt file of data
function txtFile() {

};