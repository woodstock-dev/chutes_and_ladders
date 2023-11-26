import { Avatar, AvatarList, Color } from './js/model/avatar.js';
import { Board } from './js/model/board.js';
import { ChutesAndLadders } from './js/model/chutes_and_ladders.js';
import { Die } from './js/model/die.js';
import { PlayerSetup } from './js/model/player_setup.js';
import { Player } from './js/model/player.js';
import { RangeSelector } from './js/model/range.js';
// import { Rules } from './js/model/rules.js';
import { Space } from './js/model/space.js';
import { SummedRoll } from './js/model/summed_roll.js';
import {
  generateRandomNumber,
  rollDice,
  rollMultipleAndSum,
  rollMultipleDiceMultipleTimes,
  rollSingleDiceMultipleTimes,
  rollSingleDiceMultipleTimesAndSum,
} from './js/model/utils.js';
// import { Validators } from './js/model/validator.js';

const game = new ChutesAndLadders(5, 5);

const main = () => {
  const board = game.displayGameBoard();
  const players = makeAllPlayers(1, AvatarList.XENOMORPH, Color.RED);

  // game.startGame();
  console.log(game.startGame());
};

const makeAllPlayers = (name, avatar, avatarColor) => {
  while (game.playersArray.length < game.MAX_PLAYERS) {
    game.registerPlayer(name, avatar, avatarColor);
    name++;
    avatar++;
    avatarColor++;
  }
  return game.playersArray;
};

main();

export { main };
