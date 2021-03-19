module.exports = function () {
    this.Discord = require("discord.js");
    this.config = require("../config.json");
    this.c = require("chalk");
    this.fs = require("fs");
    this.Canvas = require("canvas");
    this.commontags = require("common-tags");
    this.moment = require("moment");
    require("moment-duration-format");
    this.package = require("../package.json");
    this.util = require("util");
    this.superagent = require("superagent");
    this.mysql = require("mysql");
    this.https = require("https");
    this.xml2js = require("xml2js");
    this.randomPuppy = require("random-puppy");
    this.path = require("path");
    this.weather = require("weather-js");
    this.app = require('express')();
    this.http = require('http').Server(app);
    this.io = require('socket.io')(http);
    this.bodyParser = require('body-parser')
    this.rektapi = "http://rektapi.blackfire.hu/";
    this.os = require('os');
    this.osu = require('os-utils');
    this.cpuStat = require('cpu-stat');
    this.si = require('systeminformation');
    this.axios = require('axios');
    this.tf = require('@tensorflow/tfjs-node');
    this.nsfw = require('nsfwjs');
    this.Minesweeper = require('discord.js-minesweeper');
    this.socketStats = require("socketstats");

    this.con = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    });
}