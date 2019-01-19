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
        spotifyThis();
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
function spotifyThis() {
    spotify.search({ type: 'track', query: liriInput, limit: 1 }, function (err, data) {
        var response = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(response.album.artists.name)
        console.log([
            "\nArtist(s): " + response.album.artists[0].name,
            "Song Name: " + response.name,
            "Album: " + response.album.name,
            "Song Preview: " + response.preview_url,
        ].join("\n"));
    });
};
// bit = Bands In Town
function bit() {
    var url = "https://rest.bandsintown.com/artists/" + liriInput + "/events?app_id=" + keys.bandsInTown.key
    axios.get(url)
        .then(function (response) {
            var data = response.data[0];
            var date = response.data.datetime
            console.log([
                "Venue Name: " + data.venue.name,
                "Venue City: " + data.venue.city + ", " + data.venue.region,
                "Date: " + moment(date).format("d/MM/YY h a")
            ].join("\n"));
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