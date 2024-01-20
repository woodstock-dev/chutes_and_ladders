const express = require('express');
const router = express.Router();

const gameService = require('../services/games');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.json(gameService.listGames());
});

module.exports = router;