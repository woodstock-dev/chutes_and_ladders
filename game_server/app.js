const express = require('express');
const path = require('path');

const games = require('./src/routes/games');

var app = express();

app.use('/api/v1/games', games);
app.use(express.static(path.resolve(__dirname, '../chutes-and-ladders-web/dist')));

module.exports = app;
