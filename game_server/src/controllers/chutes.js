const game = require('../services/chutes.js');

const sendGame = async (req, res, next) => {
  const instance = await game.curGame();
  console.log(instance.displayGameBoard());
  res.send(JSON.stringify(instance));
};

exports.sendGame = sendGame;
