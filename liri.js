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
var text = false;

// switch statement to process userInput
function switchState() {
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
};

// music
function spotifyThis() {
    spotify.search({ type: 'track', query: liriInput, limit: 1 }, function (err, data) {
        var response = data.tracks.items[0];
        var info = [
            "\nArtist(s): " + response.album.artists[0].name,
            "Song Name: " + response.name,
            "Album: " + response.album.name,
            "Song Preview: " + response.preview_url,
        ].join("\n");

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (text) {
            appendText(info);
        }
        else {
            console.log(info);
        }
    });
};
// bit = Bands In Town
function bit() {
    var url = "https://rest.bandsintown.com/artists/" + liriInput + "/events?app_id=" + keys.bandsInTown.key
    axios.get(url)
        .then(function (response) {
            var info = [
                "Venue Name: " + data.venue.name,
                "Venue City: " + data.venue.city + ", " + data.venue.region,
                "Date: " + moment(date).format("d/MM/YY h a")
            ].join("\n");

            var data = response.data[0];
            var date = response.data.datetime
            if (text) {
                appendText(info);
            }
            else {
                console.log(info);
            }
        });
};
// movies
function Omdb() {
    axios.get("http://www.omdbapi.com/?apikey=" + omdb + "&y=&plot=short&t=" + liriInput)
        .then(function (response) {
            var info = [
                "Title: " + response.data.Title,
                "Release Year: " + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Country Produced: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "List of actors: " + response.data.Actors
            ].join("\n");

            if (text) {
                appendText(info);
            }
            else {
                console.log(info);
            };
        });
};
// run the process on a txt file of data
function txtFile() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(error);
        };
        var dataArr = data.split(",");
        liriCommand = dataArr[0];
        liriInput = dataArr[1];
        text = true;
        switchState();
    });
};

function appendText(info) {
    fs.appendFile("random.txt", "\n" + info, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("File Appended");
        };
    });
};

switchState();