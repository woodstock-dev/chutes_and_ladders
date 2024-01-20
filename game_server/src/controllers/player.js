global.playersArr = [];

const newPlayer = (req, res, next) => {
  let player = req.body;
  global.playersArr.push(player);
  console.log(global.playersArr);
  res.status(201).send(`${player.playerName} created`);
  next();
};

const returnPlayerId = (req, res, next) => {
  let r = req.params.playerID;
  playersArr.forEach((player) => {
    if (player.playerID === r) res.send(player);
  });
};

module.exports = { newPlayer, returnPlayerId };

// player is not tied to a game nor an avatar. player has name and an ID made by the
// ascii code of the first and last charachter of the input plus a random hex char for a total
// of 5 chars
// not sure if i need to create an array for all players that register
// then group by id of the game they select or leave all players unnassigned
// until a game is selected and group then
