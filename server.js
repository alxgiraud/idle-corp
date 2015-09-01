/*global require, console, __dirname */
/*jslint node: true */
'use strict';

var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index.html');
});

var server = app.listen(3000, function () {
    console.log("Server is running on localhost:3000...");
});