import { Board } from './board.js';
import { Color } from './avatar.js';
import { Space, SpaceType } from './space.js';
import { RangeSelector } from './range.js';
import { PlayerSetup } from './player_setup.js';
import { Die } from './die.js';
import { generateRandomNumber, rollDice } from './utils.js';

/**
 * select avatar - method that is invoked when new player is created
 * register player - that will
 * play:
 * take turn
 * isWinner()
 * reset EVERYTHING
 * list of pieces in game class to verify no 2 are the same
 * game will determine order of play for players playing
 *
 */

const TOTAL_SPACES = 100;
const START = 1;
const ROWS = Math.ceil(TOTAL_SPACES / (TOTAL_SPACES / 10));
const MAX_SPECIAL_DISTANCE = 40;
const DIE = new Die(6);
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;
let uniqueSpecialValues = new Set();
let uniqueSpecialValuesDump = new Set();
let specials = [];
let chuteCount = 0;
let ladderCount = 0;
let readyToPlay = false;

const spaceMaker = (indexOfSpace) => {
  let space = new Space(SpaceType.NORMAL, indexOfSpace);
  if (indexOfSpace === TOTAL_SPACES) space = new Space(SpaceType.FINISH, 'Finish');
  if (indexOfSpace === START) space = new Space(SpaceType.START, 'Start');
  if (checkIfSpecialSpace(indexOfSpace)) {
    space = specialSpaceSelector(indexOfSpace);
    specials.push([space, indexOfSpace]);
  }
  return space;
};

function checkIfSpecialSpace(indexOfSpace) {
  return uniqueSpecialValues.has(indexOfSpace);
}

function specialSpaceSelector(indexOfSpace) {
  let type;
  let row = rowFinder(indexOfSpace);
  if (chuteCount === ladderCount || row === ROWS - 1) {
    type = SpaceType.CHUTE;
    chuteCount++;
  } else {
    type = SpaceType.LADDER;
    ladderCount++;
  }
  return new Space(type, indexOfSpace);
}

function minSpecialRangeValue() {
  return (ROWS - 1) ** 2 + 2;
}

const connectSpecials = () => {
  let dummyNode = null;
  let indexOfSpace = undefined;

  for (let i = 0; i < specials.length; i++) {
    [dummyNode, indexOfSpace] = specials[i];
    dummyNode.type === SpaceType.CHUTE ? (dummyNode.special = _connectChute(dummyNode, indexOfSpace)) : (dummyNode.special = _connectLadder(dummyNode, indexOfSpace));
  }
};

function _connectChute(dummyNode, indexOfSpace) {
  const maxValForRand = indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;
  const minDist = indexOfSpace % ROWS === 0 ? 1 : indexOfSpace % ROWS;
  let cDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
  let space = indexOfSpace - cDistanceToTraverse;
  if (!specialDumpValueChecker(space)) {
    while (cDistanceToTraverse > 0) {
      dummyNode = dummyNode.previous;
      cDistanceToTraverse--;
    }
  } else return _connectChute(dummyNode, indexOfSpace);

  return dummyNode;
}

function _connectLadder(dummyNode, indexOfSpace) {
  const maxValForRand = TOTAL_SPACES - indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : TOTAL_SPACES - indexOfSpace;
  const minDist = ROWS - (indexOfSpace % ROWS) + 1;
  let lDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
  let space = indexOfSpace + lDistanceToTraverse;
  if (!specialDumpValueChecker(space)) {
    while (lDistanceToTraverse > 0) {
      dummyNode = dummyNode.next;
      lDistanceToTraverse--;
    }
  } else return _connectLadder(dummyNode, indexOfSpace);

  return dummyNode;
}

function specialDumpValueChecker(space) {
  uniqueSpecialValuesDump.add(space);
  return uniqueSpecialValues.has(uniqueSpecialValuesDump);
}

function rowFinder(indexOfSpace) {
  return Math.floor(indexOfSpace / ROWS);
}

function resortPlayerOrderInPlayersArray(playersArray) {
  return playersArray.sort((a, b) => {
    return a.playerOrder - b.playerOrder;
  });
}

export class ChutesAndLadders {
  /**
   *
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */

  constructor(chutes, ladders) {
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.startSpace = this.makeGameBoard();
    this.playersArray = [];
    this.colorList = Color;
    this.currentPlayer = 0;
    this.playerInTurn = undefined;
    this.readyToPlay = false;
    this.haveWinner = false;
    this.avatarList = [
      { id: 0, name: '' },
      { id: 1, name: 'XENOMORPH' },
      { id: 2, name: 'PREDATOR' },
      { id: 3, name: 'TERMINATOR' },
      { id: 4, name: 'ROBOCOP' },
    ];
  }

  /**
   * makes calls in order to make the game, link the spaces and set the startspace
   */

  makeGameBoard() {
    const board = new Board(TOTAL_SPACES, spaceMaker, this.specialValuesMaker, connectSpecials);
    return board.startSpace;
  }

  displayGameBoard() {
    let space = this.startSpace;
    let gameBoard = [];
    let row = [];
    let indexOfSpace = 1;
    while (space) {
      let rowCount = rowFinder(indexOfSpace);
      row.push(space);
      if (row.length === ROWS) {
        row = rowCount % 2 !== 0 ? row : row.reverse();
        gameBoard.push(row);
        row = [];
      }
      indexOfSpace++;
      space = space.next;
    }
    return gameBoard.reverse();
  }

  registerPlayer(name, avatar, color) {
    if (this.playersArray.length === MAX_PLAYERS) return;
    if (!name || !avatar || !color) {
      alert('PLEASE REGISTER ALL FIELDS FOR PLAYER AND AVATAR');
      return;
    }
    const player = new PlayerSetup(name, avatar, color).registerPlayer();
    this.generatePlayerOrder(player);
  }

  generatePlayerOrder(player) {
    const unshiftOrPush = generateRandomNumber(2);
    if (unshiftOrPush === 1) this.playersArray.push(player);
    if (unshiftOrPush === 2) this.playersArray.unshift(player);
  }

  verifyReadyToPlay() {
    if (this.playersArray.length >= 2 && this.haveWinner === false) return (readyToPlay = true);
  }

  setOrderAndStart() {
    this.verifyReadyToPlay();
    if (readyToPlay) {
      this.playersArray.forEach((player, idx) => {
        player.playerOrder = idx + 1;
        this.startSpace.land(player.avatar);
      });
      this.playerInTurn = this.playersArray[this.currentPlayer];
    } else alert('2 PLAYERS MINIMUM NEEDED TO START GAME');
    console.log(this.playersArray, this.playerInTurn);
  }

  takeTurn() {
    if (this.playerInTurn.avatar.location.type === SpaceType.FINISH) {
      this.wonGame(this.playerInTurn);
      return;
    }
    const moveDist = rollDice(DIE);
    this.playerInTurn.avatar.move(moveDist);
    this.playerInTurn = this.rotatePlayers();
  }

  rotatePlayers() {
    this.currentPlayer++;
    if (this.currentPlayer === this.playersArray.length) this.currentPlayer = 0;
    return this.playersArray[this.currentPlayer];
  }

  wonGame(player) {
    this.haveWinner = true;
    return alert(`CONGRADULATIONS ${player.name}... YOU WON!!!!`);
  }

  reset() {
    this.makeGameBoard();
    this.playersArray.forEach((player) => {
      player.avatar.location.leave();
      this.startSpace.land(player.avatar);
    });
    readyToPlay = false;
    this.haveWinner = false;
    this.currentPlayer = 0;
    resortPlayerOrderInPlayersArray(this.playersArray);
  }

  specialValuesMaker = (min = minSpecialRangeValue(), max = TOTAL_SPACES) => {
    if (uniqueSpecialValues.size === this.CHUTES + this.LADDERS) return;
    const specialValue = new RangeSelector(min, max).random;
    if (uniqueSpecialValues.has(specialValue)) this.specialValuesMaker(min, max);
    else {
      uniqueSpecialValues.add(specialValue);
      this.specialValuesMaker(min - (ROWS - 1), max - (ROWS - 1));
    }
    return uniqueSpecialValues;
  };
}
