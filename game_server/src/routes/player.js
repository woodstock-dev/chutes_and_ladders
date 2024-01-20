const express = require('express');
const route = express.Router();
const playerController = require('../controllers/player');

route.post('/api/v1/player', playerController.newPlayer);

route.get('/api/v1/player/:playerID', playerController.returnPlayerId);

module.exports = route;
