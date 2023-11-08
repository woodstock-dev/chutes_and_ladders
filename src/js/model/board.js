import { Space, SpaceType } from './space.js';

//If there is a setting I need to change in VSCode or Prettier, please advise, I do not like how the comments formatted in between some of the code

export class Board {
  #TotalSpaces = 0;
  #StartSpace = null;
  #ChuteCount = 0;
  #LadderCount = 0;
  #Specials = [];

  constructor(totalSpaces, chutes, ladders, startSpace) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
    this.chutes = chutes;
    this.ladders = ladders;
    this.uniqueSpecialValues = new Set(); // sets to accept only unique values for random generated numbers
    this.uniqueSpecialValuesDump = new Set(); // this is so we do not add extra special space indexes when we connect them
    this.minDistForSpecialSpace = Math.sqrt(totalSpaces); //for square board: the min distance for a special space && row length is the sqrt of the total spaces
  }

  get totalSpaces() {
    return this.#TotalSpaces;
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

  // not sure if I should include on utils page or if I should just update the generateRandomNumber method to accept a min and max value
  randomRangeSelector(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // I want 0 to be included in my range if need be
  }

  // makes the special space indexes and stores them in the set to guarantee the values are unqiue
  specialValuesMaker(min = 83, max = this.#TotalSpaces) {
    if (this.uniqueSpecialValues.size === this.chutes + this.ladders) return;
    const specialValues = this.randomRangeSelector(min, max);
    if (this.uniqueSpecialValues.add(specialValues)) this.specialValuesMaker(min - 9, max - 9);
  }

  spaceMaker(indexOfSpace, row) {
    let space = new Space(SpaceType.NORMAL, indexOfSpace);

    if (indexOfSpace === 1) return this.#StartSpace; //when loop is over, attach the startSpace which was instanciated with the board, in case you want to make a different space the starting location
    if (this.uniqueSpecialValues.has(indexOfSpace) && this.ladderCount < this.ladders) {
      //check if indexOfSpace in the the uniqueSpecialValues set, I decided on this for 0(1) lookup and sets take care of the uniqueness requirement
      if (row < 10 && this.chuteCount === this.ladderCount) {
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

    const dumpValue = this.randomRangeSelector(min, max);
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
    let distanceToTraverse = this.specialDumpValue(this.minDistForSpecialSpace, indexOfSpace - 2) ?? this.minDistForSpecialSpace;
    // check to make sure the distanceToTraverse is not undefined, if so, set min distance to 10 spaces or 1 row
    while (distanceToTraverse > 0) {
      dummyNode = dummyNode.previous;
      distanceToTraverse--;
    }
    return dummyNode.type === SpaceType.NORMAL ? dummyNode : dummyNode.previous; //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
  }

  _connectLadder(dummyNode, indexOfSpace) {
    let distanceToTraverse = this.specialDumpValue(this.minDistForSpecialSpace, this.totalSpaces - 2 - indexOfSpace) ?? this.minDistForSpecialSpace;
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

    for (let indexOfSpace = this.#TotalSpaces - 1; indexOfSpace > 0; indexOfSpace--) {
      //build next, previous and define the rows
      space.previous = this.spaceMaker(indexOfSpace, row);
      space.previous.next = space;
      space = space.previous;
      indexOfSpace % 10 === 0 ? row++ : row;

      if (space.type === SpaceType.CHUTE || space.type === SpaceType.LADDER) this.specials.push([space, indexOfSpace]);
    }
    this.specialsConnector(); //connects both chutes and ladders to special space
  }

  //This will work for any square number board
  //Does not display current gameplay. If that is what is preferred, please advise and I will work on it.
  get displaySpaces() {
    let totalSpaces = this.#TotalSpaces;
    const rowTotal = this.minDistForSpecialSpace;
    let boardDisplay = [];
    let space = ' ';
    let newLine = '\n';

    for (let i = rowTotal; i >= 1; i--) {
      let row = [];
      for (let j = 1; j <= rowTotal; j++) {
        if (i === rowTotal) {
          row.push(`${totalSpaces}`.padStart(3));
        } else if (i === 1) {
          row.push(`${totalSpaces}`.padStart(3));
        } else row.push(`${totalSpaces}`.padStart(3));
        totalSpaces--;
      }
      row = i % 2 == 0 ? row : row.reverse();
      boardDisplay.push(row);
    }

    return boardDisplay.map((row) => row.join(space)).join(newLine);
  }
}
