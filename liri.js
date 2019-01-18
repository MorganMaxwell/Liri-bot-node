require("dotenv").config();
var axios = require("Axios");
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var bandsInTown = keys.bandsInTown.key;