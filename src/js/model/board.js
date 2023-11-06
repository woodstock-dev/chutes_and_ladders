import { Space, SpaceType } from './space.js';

//If there is a setting I need to change in VSCode or Prettier, please advise, I do not like how the comments formatted in between some of the code

export class Board {
  #TotalSpaces = 0;
  #StartSpace = null;
  #ChuteCount = 0;
  #LadderCount = 0;
  #Chutes = [];
  #Ladders = [];

  constructor(totalSpaces, startSpace, chutes, ladders) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
    this.chutes = chutes;
    this.ladders = ladders;
    this.uniqueSpecialValues = new Set(); // sets to accept only unique values for random generated numbers
    this.uniqueSpecialValuesDump = new Set(); // this is so we do not add extra special space indexes when we connect them
    this.minDistForSpecialSpace = Math.sqrt(totalSpaces); //for square board the min distance for a special space is the sqrt of the total spaces
  }

  get totalSpaces() {
    return this.#TotalSpaces;
  }

  get startSpace() {
    this.boardSetup; // call the board setup to make the board and connect the startspace from the constructor
    return this.#StartSpace;
  }

  // not sure if I should include on utils page or if I should just update the generateRandomNumber method to accept a min and max value
  randomRangeSelector(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // I want 0 to be included in my range if need be
  }

  // makes the special space indexes and stores them in the set to guarantee the values are unqiue
  specialValuesMaker() {
    let max = this.#TotalSpaces;
    let min = 83;
    while (this.uniqueSpecialValues.size < 10) {
      let specialValues = this.randomRangeSelector(min, max);
      if (this.uniqueSpecialValues.add(specialValues)) {
        max -= 9; // i decrement the min and max by the minimum value possible to ensure a good spread of values for the special spaces because Math.random() FUCKING SUCKS!!!!
        min -= 9;
      }
    }
  }

  spaceMaker(value, row) {
    let space = new Space(SpaceType.NORMAL, value);

    if (value === 1) return this.#StartSpace; //when loop is over, attach the startSpace which was instanciated with the board, in case you want to make a different space the starting location
    if (this.uniqueSpecialValues.has(value) && this.#LadderCount < this.ladders) {
      //check if value in the the uniqueSpecialValues set, I decided on this for 0(1) lookup and sets take care of the uniqueness requirement
      if (row < 10 && this.#ChuteCount === this.#LadderCount) {
        // Using the count of chutes and ladders, i alternate between the 2 to assign the types, values
        space = new Space(SpaceType.CHUTE, value);
        this.#ChuteCount++; //starting at the instanciated number of chutes and ladders, i decrement each and keep track of the equality of the numbers to decide which is chute or ladder
      } else {
        space = new Space(SpaceType.LADDER, value);
        this.#LadderCount++;
      }
    }
    return space;
  }

  //checks the space value for the special space against the values in the set and if the value is not in the set, it assigns to special of cooresponding chute or ladder, then adds the value to the set, if the number is in the set, it runs the random function again
  specialDumpValue(min, max) {
    if (this.uniqueSpecialValuesDump.size === this.uniqueSpecialValues.size) throw new Error('Find better way to randomize'); //base case to prevent error only

    let dumpValue = this.randomRangeSelector(min, max);
    if (this.uniqueSpecialValues.has(this.uniqueSpecialValuesDump)) this.specialDumpValue(min, max);
    else {
      this.uniqueSpecialValuesDump.add(dumpValue);
      return dumpValue;
    }
  }

  chuteSpaceConnector() {
    const minDistForSpecialSpace = this.minDistForSpecialSpace;
    // These next 2 functions take the chutes and ladders special space idx and connects them with the special dump value idx
    let chutes = this.#Chutes;
    let dummyNode = null;
    let special = undefined;

    for (let i = 0; i < chutes.length; i++) {
      [dummyNode, special] = chutes[i];
      special = this.specialDumpValue(minDistForSpecialSpace, special - 1);
      if (special === undefined) special = minDistForSpecialSpace;
      while (special > 0) {
        dummyNode = dummyNode.previous;
        special--;
      }
      dummyNode.type === SpaceType.NORMAL ? (chutes[i][0].special = dummyNode) : (chutes[i][0].special = dummyNode.previous); //extra check to make sure the dumpSpace for special is a normal space, if not, move back 1
    }
  }

  ladderSpaceConnector() {
    const minDistForSpecialSpace = this.minDistForSpecialSpace;
    let ladders = this.#Ladders;
    let dummyNode = null;
    let special = undefined;

    for (let i = 0; i < ladders.length; i++) {
      [dummyNode, special] = ladders[i];
      special = this.specialDumpValue(minDistForSpecialSpace, this.totalSpaces - special);
      if (special === undefined) special = minDistForSpecialSpace;
      while (special > 0) {
        dummyNode = dummyNode.next;
        special--;
      }
      dummyNode.type === SpaceType.NORMAL ? (ladders[i][0].special = dummyNode) : (ladders[i][0].special = dummyNode.next); //extra check to make sure the dumpSpace for special is normal, if not, move up 1
    }
  }

  get boardSetup() {
    //builds the board from top down, generates special values
    const minDistForSpecialSpace = this.minDistForSpecialSpace;
    this.specialValuesMaker(); //generate special indexes
    let totalSpaces = this.#TotalSpaces;
    let space = new Space(SpaceType.FINISH, 'Finish');
    let row = 1;

    for (let i = totalSpaces - 1; i > 0; i--) {
      //build next, previous and define the rows
      space.previous = this.spaceMaker(i, row);
      space.previous.next = space;
      space = space.previous;
      i % 10 === 0 ? row++ : undefined;

      if (space.type === SpaceType.CHUTE) {
        //check for chute and ladder type, if so, push a "tuple" with the space and the idx to an array
        this.#Chutes.push([space, i]);
      }
      if (space.type === SpaceType.LADDER) {
        this.#Ladders.push([space, i]);
      }
    }
    this.chuteSpaceConnector(); // execute the connections of the special spaces
    this.ladderSpaceConnector();
  }

  //This will work for any square number board
  //Does not display current gameplay. If that is what is preferred, please advise and I will work on it.
  get displaySpaces() {
    let totalSpaces = this.#TotalSpaces;
    const rowTotal = Math.sqrt(totalSpaces);
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
