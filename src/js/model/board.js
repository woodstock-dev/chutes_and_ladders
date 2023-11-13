//If there is a setting I need to change in VSCode or Prettier, please advise, I do not like how the comments formatted in between some of the code

export class Board {
  constructor(totalSpaces, rows, spaceMaker) {
    this.totalSpaces = totalSpaces;
    this.rowValue = rows;
    this.spaceMaker = spaceMaker;
  }

  /**
   * @returns {Space} | starting space for the board
   */
  boardSetup() {
    //builds the board from top down
    let space = this.spaceMaker(this.totalSpaces);
    for (let indexOfSpace = this.totalSpaces - 1; indexOfSpace > 0; indexOfSpace--) {
      space.previous = this.spaceMaker(indexOfSpace);
      space.previous.next = space;
      space = space.previous;
    }
    return space;
  }
}
