import { Board } from './board.js';
import { Space, SpaceType } from './space.js';
import { RangeSelector } from './range.js';

export class ChutesAndLadders {
  /**
   *
   * @param {Number} rows number of spaces in a row
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */

  constructor(rows, chutes, ladders) {
    this.TOTAL_SPACES = 100;
    this.ROWS = rows;
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.MAX_SPECIAL_DISTANCE = 40;
    this.uniqueSpecialValues = new Set();
    this.uniqueSpecialValuesDump = new Set();
    this.chuteCount = 0;
    this.ladderCount = 0;
    this.specials = [];
    this.startSpace = null;
  }

  /**
   * makes calls in order to make the game, link the spaces and set the startspace
   */

  makeGameBoard() {
    this.specialValuesMaker();
    const board = new Board(this.TOTAL_SPACES, this.ROWS, this.spaceMaker);
    this.startSpace = board.boardSetup();
    this.connectSpecials(this.specials);
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
   * @returns
   */
  specialValuesMaker(min = this.minValue(), max = this.TOTAL_SPACES) {
    if (this.uniqueSpecialValues.size === this.CHUTES + this.LADDERS) return;
    const specialValue = new RangeSelector(min, max).random();
    if (this.uniqueSpecialValues.has(specialValue)) this.specialValuesMaker(min, max);
    else {
      this.uniqueSpecialValues.add(specialValue);
      this.specialValuesMaker(min - (this.ROWS - 1), max - (this.ROWS - 1));
    }
    return this.uniqueSpecialValues;
  }

  /**
   *
   * @param {Array.<Space>} specials is that is populated in the spaceMaker method with the the SpaceTypes of CHUTE or LADDER
   */
  connectSpecials(specials) {
    let dummyNode = null;
    let indexOfSpace = undefined;

    for (let i = 0; i < specials.length; i++) {
      [dummyNode, indexOfSpace] = specials[i];
      dummyNode.type === SpaceType.CHUTE
        ? (dummyNode.special = this._connectChute(dummyNode, indexOfSpace))
        : (dummyNode.special = this._connectLadder(dummyNode, indexOfSpace));
    }
  }
  /**
   *
   * @param {Space} dummyNode is the space that has the SpaceType.CHUTE
   * @param {Number} indexOfSpace is the index of the space which we use to figure out the distance to traverse
   * @returns the space.special connection
   */
  _connectChute(dummyNode, indexOfSpace) {
    const maxValForRand = indexOfSpace > this.MAX_SPECIAL_DISTANCE ? this.MAX_SPECIAL_DISTANCE : indexOfSpace;
    const minDist = this.rowFinder(indexOfSpace) - 1;
    let cDistanceToTraverse = this.specialDumpValue(minDist, maxValForRand) ?? this.MIN_DIST;
    while (cDistanceToTraverse > 0) {
      dummyNode = dummyNode.previous;
      cDistanceToTraverse--;
    }
    //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.previous;
  }

  /**
   *
   * @param {Space} dummyNode space that has the SpaceType.LADDER
   * @param {Number} indexOfSpace index of space which we use to figure out the distance to traverse
   * @returns the space.special connection
   */
  _connectLadder(dummyNode, indexOfSpace) {
    const maxValForRand =
      this.TOTAL_SPACES - indexOfSpace > this.MAX_SPECIAL_DISTANCE
        ? this.MAX_SPECIAL_DISTANCE
        : this.TOTAL_SPACES - indexOfSpace;
    const minDist = this.rowFinder(indexOfSpace) + 1;
    let lDistanceToTraverse = this.specialDumpValue(minDist, maxValForRand) ?? this.MIN_DIST;
    while (lDistanceToTraverse > 0) {
      dummyNode = dummyNode.next;
      lDistanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.next; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  /**
   *
   * @param {Number} min is the first space in the row above the space selected to be a special space
   * @param {Number} max is the greatest distance the span of spaces that the special connection can be while keeping the space within the rules or constants set forth
   * @returns the distance to traverse from the index of the special space
   */
  specialDumpValue(min, max) {
    if (this.uniqueSpecialValuesDump.size > this.uniqueSpecialValues.size)
      throw new Error('Find better way to randomize'); //base case to prevent error only

    const dumpValue = new RangeSelector(min, max).random();
    this.uniqueSpecialValues.has(this.uniqueSpecialValuesDump)
      ? this.specialDumpValue(min, max)
      : this.uniqueSpecialValuesDump.add(dumpValue.random);
    return dumpValue;
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
    let chute = '\x1b[31mCT\x1b[0m';
    let ladder = '\x1b[31mLD\x1b[0m';
    while (space) {
      let rowCount = this.rowFinder(indexOfSpace);
      if (space.type === SpaceType.CHUTE) row.push(chute);
      else if (space.type === SpaceType.LADDER) row.push(ladder);
      else row.push(indexOfSpace);
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
}

// BELOW IS PROCESS TO MAKE ACTIVE GAME BOARD

//10 is spaces per row, 5 chutes, 5 ladders, 100 total spaces is a constant declared in the constructor
const chutesAndLadders = new ChutesAndLadders(10, 5, 5);
//call to makeGameBoard() returns the board constructed in the Board class and provides a property of startSpace which is the first space of gameplay
chutesAndLadders.makeGameBoard();
// game is assigned to the displaySpaces method of the ChutesAndLadders game class. 'C' represents chutes and 'L' represents ladders
const game = chutesAndLadders.displayGameBoard();
// I left this in so anyone could see my gameboard easily
console.log(
  game
    .map((row, idx) => {
      if (idx === 0) return row.join('  ');
      if (idx === 9) return row.join('   ');
      else return row.join('  ');
    })
    .join('\n ')
);
