import { Board } from './board.js';
import { Space, SpaceType } from './space.js';
import { RangeSelector } from './range.js';

export class ChutesAndLadders {
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
  }

  makeGameBoard() {
    this.specialValuesMaker();
    const board = new Board(this.TOTAL_SPACES, this.ROWS, this.spaceMaker);
    const game = board.boardSetup();
    this.connectSpecials(this.specials);
    return game;
  }

  spaceMaker = (indexOfSpace) => {
    let space = new Space(SpaceType.NORMAL, indexOfSpace);
    if (indexOfSpace === 100) space = new Space(SpaceType.FINISH, 'Finish');
    if (indexOfSpace === 1) space = new Space(SpaceType.START, 'Start');
    if (this.checkIfSpecialSpace(indexOfSpace)) {
      space = this.specialSpaceSelector(indexOfSpace);
      this.specials.push([space, indexOfSpace]);
    }
    return space;
  };

  checkIfSpecialSpace(indexOfSpace) {
    return this.uniqueSpecialValues.has(indexOfSpace);
  }

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

  minValue() {
    return (this.ROWS - 1) ** 2 + 2;
  }

  // makes the special space indexes and stores them in the set to guarantee the values are unqiue
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

  //loops through specials array generated in the loop of board setup and assigns the special property of a space to the return value of the connector functions
  connectSpecials(specials) {
    let dummyNode = null;
    let indexToTraverse = undefined;

    for (let i = 0; i < specials.length; i++) {
      [dummyNode, indexToTraverse] = specials[i];
      dummyNode.type === SpaceType.CHUTE ? (dummyNode.special = this._connectChute(dummyNode, indexToTraverse)) : (dummyNode.special = this._connectLadder(dummyNode, indexToTraverse));
    }
  }

  _connectChute(dummyNode, indexToTraverse) {
    const maxValForRand = indexToTraverse > this.MAX_SPECIAL_DISTANCE ? this.MAX_SPECIAL_DISTANCE : indexToTraverse;
    const minDist = this.rowFinder(indexToTraverse) - 1;
    let cDistanceToTraverse = this.specialDumpValue(minDist, maxValForRand) ?? this.MIN_DIST;
    while (cDistanceToTraverse > 0) {
      dummyNode = dummyNode.previous;
      cDistanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.previous; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  _connectLadder(dummyNode, indexToTraverse) {
    const maxValForRand = this.TOTAL_SPACES - indexToTraverse > this.MAX_SPECIAL_DISTANCE ? this.MAX_SPECIAL_DISTANCE : this.TOTAL_SPACES - indexToTraverse;
    const minDist = this.rowFinder(indexToTraverse) + 1;
    let lDistanceToTraverse = this.specialDumpValue(minDist, maxValForRand) ?? this.MIN_DIST;
    while (lDistanceToTraverse > 0) {
      dummyNode = dummyNode.next;
      lDistanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.next; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  specialDumpValue(min, max) {
    if (this.uniqueSpecialValuesDump.size > this.uniqueSpecialValues.size) throw new Error('Find better way to randomize'); //base case to prevent error only

    const dumpValue = new RangeSelector(min, max).random();
    this.uniqueSpecialValues.has(this.uniqueSpecialValuesDump) ? this.specialDumpValue(min, max) : this.uniqueSpecialValuesDump.add(dumpValue.random);
    return dumpValue;
  }

  rowFinder(indexOfSpace) {
    return Math.floor(indexOfSpace / this.ROWS);
  }
}

// This is the way to initiate a board

//10 is spaces per row, 5 chutes, 5 ladders, 100 total spaces is a constant declared in the constructor
const chutesAndLadders = new ChutesAndLadders(10, 5, 5);
//call to makeGameBoard() returns the startspace for the game, I did this just for my ability to test while making this
let game = chutesAndLadders.makeGameBoard();

console.log(game);
