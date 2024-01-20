const { GameList } = require('../model/game');

const listGames = () => {
  return new GameList();
};

exports.listGames = listGames;

//AXIOS GET CAN ONLY MANIPULATE THE HEADER AND QUERY STRING

//MATRIX PARAM EXISTS PAST QUERY STRING
