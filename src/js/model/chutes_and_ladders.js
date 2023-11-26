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

//EVERYTHING IS BASED ON A PERFECT SQUARE BOARD, CERTAIN METHODS WILL NEED TO BE MODIFIED IF USING NUMBERS THAT WILL NOT MAKE A PERFECT SQUARE

export class ChutesAndLadders {
  /**
   *
   * @param {Number} rows number of spaces in a row
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */

  constructor(chutes, ladders) {
    this.TOTAL_SPACES = 100;
    this.ROWS = Math.ceil(this.TOTAL_SPACES / (this.TOTAL_SPACES / 10));
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.MAX_SPECIAL_DISTANCE = 40;
    this.MAX_PLAYERS = 4;
    this.MIN_PLAYERS = 2;
    this.DIE = new Die(6);
    this.uniqueSpecialValues = new Set();
    this.uniqueSpecialValuesDump = new Set();
    this.chuteCount = 0;
    this.ladderCount = 0;
    this.specials = [];
    this.startSpace = this.makeGameBoard();
    this.playersArray = [];
    this.colorList = Object.keys(Color);
    this.currentPlayer = 0;
    this.playerInTurn = undefined;
    this.readyToPlay = false;
    this.avatarList = [
      { id: 0, name: 'UNDEFINED' },
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
    const board = new Board(this.TOTAL_SPACES, this.spaceMaker, this.specialValuesMaker, this.connectSpecials);
    return board.startSpace;
  }

  /**
   *
   * @param {Number} indexOfSpace is the index of the space created by the Board class. Anything with indexOfSpace represents this value
   * @returns the type of space for the specific index of the board
   */

  spaceMaker = (indexOfSpace) => {
    let space = new Space(SpaceType.NORMAL, indexOfSpace);
    if (indexOfSpace === this.TOTAL_SPACES) space = new Space(SpaceType.FINISH, 'Finish');
    if (indexOfSpace === 1) space = new Space(SpaceType.START, 'Start');
    if (this.checkIfSpecialSpace(indexOfSpace)) {
      space = this.specialSpaceSelector(indexOfSpace);
      this.specials.push([space, indexOfSpace]);
    }
    return space;
  };

  /**
   *
   * @param {Number} indexOfSpace
   * @returns checks if the index of space from the board class is in the special values set to determine if that index will be a special space
   */

  checkIfSpecialSpace(indexOfSpace) {
    return this.uniqueSpecialValues.has(indexOfSpace);
  }

  /**
   *
   * @param {Number} indexOfSpace
   * @returns the type of special space that the index of the space will be
   */
  specialSpaceSelector(indexOfSpace) {
    let type;
    let row = this.rowFinder(indexOfSpace);
    if (this.chuteCount === this.ladderCount || row === this.ROWS - 1) {
      type = SpaceType.CHUTE;
      this.chuteCount++;
    } else {
      type = SpaceType.LADDER;
      this.ladderCount++;
    }
    return new Space(type, indexOfSpace);
  }

  /**
   *
   * @returns this is the equation to find the first min value for your range to set your special spaces
   */

  minValue() {
    return (this.ROWS - 1) ** 2 + 2;
  }

  /**
   *
   * @param {Number} min sets the minimum value for any total number of spaces
   * @param {Number} max total number of spaces
   * @returns the values of the special spaces according to number of chutes and ladders provided
   */
  specialValuesMaker = (min = this.minValue(), max = this.TOTAL_SPACES) => {
    if (this.uniqueSpecialValues.size === this.CHUTES + this.LADDERS) return;
    const specialValue = new RangeSelector(min, max).random;
    if (this.uniqueSpecialValues.has(specialValue)) this.specialValuesMaker(min, max);
    else {
      this.uniqueSpecialValues.add(specialValue);
      this.specialValuesMaker(min - (this.ROWS - 1), max - (this.ROWS - 1));
    }
    return this.uniqueSpecialValues;
  };

  /**
   *  connects the specials after the spaces are made
   */
  connectSpecials = () => {
    let dummyNode = null;
    let indexOfSpace = undefined;

    for (let i = 0; i < this.specials.length; i++) {
      [dummyNode, indexOfSpace] = this.specials[i];
      dummyNode.type === SpaceType.CHUTE ? (dummyNode.special = this._connectChute(dummyNode, indexOfSpace)) : (dummyNode.special = this._connectLadder(dummyNode, indexOfSpace));
    }
  };
  /**
   *
   * @param {Space} dummyNode is the space that has the SpaceType.CHUTE
   * @param {Number} indexOfSpace is the index of the space which we use to figure out the distance to traverse
   * @returns the space.special connection
   */
  _connectChute(dummyNode, indexOfSpace) {
    const maxValForRand = indexOfSpace > this.MAX_SPECIAL_DISTANCE ? this.MAX_SPECIAL_DISTANCE : indexOfSpace;
    const minDist = indexOfSpace % this.ROWS;
    let cDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
    let space = indexOfSpace - cDistanceToTraverse;
    if (!this.specialDumpValueChecker(space)) {
      while (cDistanceToTraverse > 0) {
        dummyNode = dummyNode.previous;
        cDistanceToTraverse--;
      }
    } else return this._connectChute(dummyNode, indexOfSpace);
    //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
    return dummyNode;
  }

  /**
   *
   * @param {Space} dummyNode space that has the SpaceType.LADDER
   * @param {Number} indexOfSpace index of space which we use to figure out the distance to traverse
   * @returns the space.special connection
   */
  _connectLadder(dummyNode, indexOfSpace) {
    const maxValForRand = this.TOTAL_SPACES - indexOfSpace > this.MAX_SPECIAL_DISTANCE ? this.MAX_SPECIAL_DISTANCE : this.TOTAL_SPACES - indexOfSpace;
    const minDist = this.ROWS - (indexOfSpace % this.ROWS);
    let lDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
    let space = indexOfSpace + lDistanceToTraverse;
    if (!this.specialDumpValueChecker(space)) {
      while (lDistanceToTraverse > 0) {
        dummyNode = dummyNode.next;
        lDistanceToTraverse--;
      }
    } else return this._connectLadder(dummyNode, indexOfSpace);

    return dummyNode;
  }

  /**
   *
   * @param {Number} space is the mock value for the dump index for special space
   * @returns checks whether any of the other special spaces or special space dump values have been used
   */
  specialDumpValueChecker(space) {
    this.uniqueSpecialValuesDump.add(space);
    return this.uniqueSpecialValues.has(this.uniqueSpecialValuesDump);
  }

  /**
   *
   * @param {Number} indexOfSpace
   * @returns the row of the space using floor division by the length of the row declared at instantiation
   */

  rowFinder(indexOfSpace) {
    return Math.floor(indexOfSpace / this.ROWS);
  }

  /**
   *
   * @returns a visual representation of how the board will look: chutes are CT, ladders are LD
   */

  displayGameBoard() {
    let space = this.startSpace;
    let gameBoard = [];
    let row = [];
    let indexOfSpace = 1;
    while (space) {
      let rowCount = this.rowFinder(indexOfSpace);
      if (space.occupied) row.push(space.players[0].name);
      else row.push(space.value);
      if (row.length === this.ROWS) {
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
    if (this.playersArray.length === this.MAX_PLAYERS) return;
    if (!name || !avatar || !color) return;
    const player = new PlayerSetup(name, avatar, color).registerPlayer();
    this.generatePlayerOrder(player);
  }

  generatePlayerOrder(player) {
    const unshiftOrPush = generateRandomNumber(2);
    if (unshiftOrPush === 1) this.playersArray.push(player);
    if (unshiftOrPush === 2) this.playersArray.unshift(player);
  }

  setOrderAndStart() {
    if (!this.readyToPlay) {
      this.playersArray.forEach((player, idx) => {
        player.playerOrder = idx + 1;
        this.startSpace.land(player.avatar);
      });
      this.playerInTurn = this.playersArray[this.currentPlayer];
    } else alert("Click the 'Ready To Play' Button");
  }

  takeTurn() {
    if (this.playerInTurn.avatar.location.type === SpaceType.FINISH) {
      this.wonGame(this.playerInTurn);
      return;
    }
    const moveDist = rollDice(this.DIE);
    this.playerInTurn = this.rotatePlayers();
    this.playerInTurn.avatar.move(moveDist);
  }

  rotatePlayers() {
    this.currentPlayer++;
    if (this.currentPlayer === this.playersArray.length) this.currentPlayer = 0;
    return this.playersArray[this.currentPlayer];
  }

  wonGame(player) {
    console.log(`CONGRADULATIONS ${player.name}... YOU WON!!!!`);
    this.reset();
  }

  reset() {
    this.makeGameBoard();
    this.setOrderAndStart();
  }
}
// /**

// BELOW IS HOW TO MAKE GAME, VIEW REAL GAMEPLAY, VIEW GAMEBOARD
// TO INTERACT WITH GAME IN TERMINAL PLEASE ADD npm install prompt-sync

// const chutesAndLadders = new ChutesAndLadders(5, 5);
// const gamePlay = chutesAndLadders.startGame();
// const gameBoard = chutesAndLadders.displayGameBoard();
//THIS IS THE WAY TO SEE A GAME PLAYED OUT AUTOMATICALLY
// console.log(gamePlay);
//VIEW GAMEBOARD
// console.log(gameBoard)
