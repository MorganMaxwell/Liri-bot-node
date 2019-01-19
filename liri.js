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
// grab user data from command line
var liriCommand = process.argv[2];
var liriInput = process.argv.slice(3).join(" ");
// variable to go through appendFile motions if needed
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
        // pretty print the data returned into a variable
        var info = [
            "\nArtist(s): " + response.album.artists[0].name,
            "Song Name: " + response.name,
            "Album: " + response.album.name,
            "Song Preview: " + response.preview_url,
        ].join("\n");

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // this is the same for all the functions. If text=true, which means we are using a text file, then run a function.
        // otherwise, console log it.
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
    var url = "https://rest.bandsintown.com/artists/" + liriInput + "/events?app_id=" + bandsInTown
    axios.get(url)
        .then(function (response) {
            // changing the format of the date and time using moment.js
            var data = response.data[0];
            var date = response.data.datetime
            var info = [
                "Venue Name: " + data.venue.name,
                "Venue City: " + data.venue.city + ", " + data.venue.region,
                "Date: " + moment(date).format("d/MM/YY h a")
            ].join("\n");
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
    // read file to grab user info from it, and store it in variables.
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(error);
        };
        var dataArr = data.split(",");
        liriCommand = dataArr[0];
        liriInput = dataArr[1];
        // flip the 'switch' to run all the functions as though we've got a txt file of user data.
        text = true;
        switchState();
    });
};
// append data to txt file.
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