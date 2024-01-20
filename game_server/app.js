const express = require('express');
const path = require('path');

const games = require('./src/routes/games');
const player = require('./src/routes/player');

const filePathToGame = path.resolve(__dirname, '../chutes-and-ladders-web/dist');

var app = express();

app.use(express.json());
app.use(express.static(filePathToGame));

app.use('/', games);
app.use('/', player);

module.exports = app;
