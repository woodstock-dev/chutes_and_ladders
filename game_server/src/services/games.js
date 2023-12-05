const { GameList } = require('../model/game');

const listGames = () => {
  return new GameList();
};

exports.listGames = listGames;
