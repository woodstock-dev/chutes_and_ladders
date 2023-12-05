export class Board {
  /**
   *
   * @param {*} totalSpaces total spaces the board will have
   * @param {*} spaceMaker the function used to create spaces based on the index of the loop
   * @param {*} specialValuesMaker function passed from game to make special spaces
   * @param {*} connectSpecials function passed from game to connect special spaces
   */

  constructor(totalSpaces, spaceMaker, specialValuesMaker, connectSpecials) {
    this.totalSpaces = totalSpaces;
    this.spaceMaker = spaceMaker;
    this.specialValuesMaker = specialValuesMaker;
    this.connectSpecials = connectSpecials;
    this.startSpace = this.boardSetup();
  }

  /**
   * @returns {Space} | starting space for the board
   */

  //builds the board from top down
  boardSetup() {
    this.specialValuesMaker();
    let space = this.spaceMaker(this.totalSpaces);
    for (let indexOfSpace = this.totalSpaces - 1; indexOfSpace > 0; indexOfSpace--) {
      space.previous = this.spaceMaker(indexOfSpace);
      space.previous.next = space;
      space = space.previous;
    }
    this.connectSpecials();
    return space;
  }
}
