import { Space, SpaceType } from './space.js';
import { randomRangeSelector } from './utils.js';

//If there is a setting I need to change in VSCode or Prettier, please advise, I do not like how the comments formatted in between some of the code

export class Board {
  #TotalSpaces = 0;
  #StartSpace = null;
  #ChuteCount = 0;
  #LadderCount = 0;
  #Specials = [];
  #Board = [];
  #MAX_SPECIAL_DIST = 40;

  constructor(totalSpaces, chutes, ladders, startSpace) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
    this.chutes = chutes;
    this.ladders = ladders;
    this.uniqueSpecialValues = new Set(); // sets to accept only unique values for random generated numbers
    this.uniqueSpecialValuesDump = new Set(); // this is so we do not add extra special space indexes when we connect them
    this.rowValue = Math.sqrt(totalSpaces) % 1 === 0 ? Math.sqrt(totalSpaces) : Math.ceil(Math.sqrt(totalSpaces)); //length of each row of square board, if totalSpaces is not a square number, we round to the closest number and add 1
    this.rangeReducer = this.rowValue - 1; // number to reduce my range for special spaces
    this.minDistForSpecialSpace = this.rangeReducer; // i dont know if having the same value in 2 different variables is common practice, but it helped me understand what is happening in my functions
  }

  get totalSpaces() {
    return this.#TotalSpaces;
  }

  get board() {
    return this.#Board;
  }

  set board(space) {
    this.#Board = space;
  }

  get startSpace() {
    return this.#StartSpace;
  }

  get specials() {
    return this.#Specials;
  }

  get chuteCount() {
    return this.#ChuteCount;
  }

  set chuteCount(count) {
    this.#ChuteCount = count;
  }

  get ladderCount() {
    return this.#LadderCount;
  }

  set ladderCount(count) {
    this.#LadderCount = count;
  }

  minValue() {
    return this.rangeReducer ** 2 + 2;
  }

  // makes the special space indexes and stores them in the set to guarantee the values are unqiue
  specialValuesMaker(min = this.minValue(), max = this.totalSpaces) {
    if (this.uniqueSpecialValues.size === this.chutes + this.ladders) return;
    const specialValues = randomRangeSelector(min, max);
    if (this.uniqueSpecialValues.add(specialValues)) this.specialValuesMaker(min - this.rangeReducer, max - this.rangeReducer);
  }

  spaceMaker(indexOfSpace, row) {
    let space = new Space(SpaceType.NORMAL, indexOfSpace);

    if (indexOfSpace === 1) return this.#StartSpace; //when loop is over, attach the startSpace which was instanciated with the board, in case you want to make a different space the starting location
    if (this.uniqueSpecialValues.has(indexOfSpace) && this.ladderCount < this.ladders) {
      //check if indexOfSpace in the the uniqueSpecialValues set, I decided on this for 0(1) lookup and sets take care of the uniqueness requirement
      if (row < this.rowValue && this.chuteCount === this.ladderCount) {
        // Using the count of chutes and ladders, i alternate between the 2 to assign the types, values
        space = new Space(SpaceType.CHUTE, indexOfSpace);
        this.chuteCount++; //starting at the instanciated number of chutes and ladders, i decrement each and keep track of the equality of the numbers to decide which is chute or ladder
      } else {
        space = new Space(SpaceType.LADDER, indexOfSpace);
        this.ladderCount++;
      }
    }
    return space;
  }

  //checks the space value for the special space against the values in the set and if the value is not in the set, it assigns to special of cooresponding chute or ladder, then adds the value to the set, if the number is in the set, it runs the random function again
  specialDumpValue(min, max) {
    if (this.uniqueSpecialValuesDump.size > this.uniqueSpecialValues.size) throw new Error('Find better way to randomize'); //base case to prevent error only

    const dumpValue = randomRangeSelector(min, max);
    this.uniqueSpecialValues.has(this.uniqueSpecialValuesDump) ? this.specialDumpValue(min, max) : this.uniqueSpecialValuesDump.add(dumpValue);
    return dumpValue;
  }
  //loops through specials array generated in the loop of board setup and assigns the special property of a space to the return value of the connector functions
  specialsConnector() {
    let specials = this.#Specials;
    let dummyNode = null;
    let indexOfSpace = undefined;

    for (let i = 0; i < specials.length; i++) {
      [dummyNode, indexOfSpace] = specials[i];
      dummyNode.type === SpaceType.CHUTE ? (dummyNode.special = this._connectChute(dummyNode, indexOfSpace)) : (dummyNode.special = this._connectLadder(dummyNode, indexOfSpace));
    }
  }
  //helper functions are to traverse the special property either, previous or next, depending on what is spacetype of the space
  _connectChute(dummyNode, indexOfSpace) {
    let maxValForRand = indexOfSpace > this.#MAX_SPECIAL_DIST ? this.#MAX_SPECIAL_DIST : indexOfSpace;
    let distanceToTraverse = this.specialDumpValue(this.minDistForSpecialSpace, maxValForRand) ?? this.minDistForSpecialSpace;
    // check to make sure the distanceToTraverse is not undefined, if so, set min distance to 10 spaces or 1 row
    while (distanceToTraverse > 0) {
      dummyNode = dummyNode.previous;
      distanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.previous; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  _connectLadder(dummyNode, indexOfSpace) {
    let maxValForRand = this.totalSpaces - indexOfSpace > this.#MAX_SPECIAL_DIST ? this.#MAX_SPECIAL_DIST : this.totalSpaces - indexOfSpace;
    let distanceToTraverse = this.specialDumpValue(this.minDistForSpecialSpace, maxValForRand) ?? this.minDistForSpecialSpace;
    while (distanceToTraverse > 0) {
      dummyNode = dummyNode.next;
      distanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.next; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  boardSetup() {
    //builds the board from top down, generates special values
    this.specialValuesMaker(); //generate special indexes
    let space = new Space(SpaceType.FINISH, 'Finish');
    let row = 1;
    this.board.push(space);

    for (let indexOfSpace = this.totalSpaces - 1; indexOfSpace > 0; indexOfSpace--) {
      //build next, previous and define the rows
      space.previous = this.spaceMaker(indexOfSpace, row);
      space.previous.next = space;
      space = space.previous;
      indexOfSpace % this.rowValue === 0 ? row++ : row;

      if (space.type === SpaceType.CHUTE || space.type === SpaceType.LADDER) this.specials.push([space, indexOfSpace]);
      this.board.push(space);
    }
    this.specialsConnector(); //connects both chutes and ladders to special space
  }

  //This will work for any square number board
  //Does not display current gameplay. If that is what is preferred, please advise and I will work on it.
  get displaySpaces() {
    this.boardSetup();
    let boardDisplay = [];
    let rowCount = 0;
    let space;

    let row = [];
    for (let i = 0; i < this.totalSpaces; i++) {
      space = this.board[i];
      row.push(space.value);
      if (row.length === this.rowValue) {
        row = rowCount % 2 !== 0 ? row : row.reverse();
        boardDisplay.push(row);
        row = [];
      }
      if (i % this.rowValue === 0) rowCount++;
    }

    return boardDisplay.map((row) => row.join(' '));
  }
}
