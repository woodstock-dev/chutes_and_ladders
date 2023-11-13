//If there is a setting I need to change in VSCode or Prettier, please advise, I do not like how the comments formatted in between some of the code
/**
 *
 */

export class Board {
  constructor(totalSpaces, rows, spaceMaker) {
    this.totalSpaces = totalSpaces;
    this.rowValue = rows;
    this.spaceMaker = spaceMaker;
  }

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

//This will work for any square number board
//Does not display current gameplay. If that is what is preferred, please advise and I will work on it.
// get displaySpaces() {
// this.boardSetup();
// let boardDisplay = [];
// let rowCount = 0;
// let space;
//
// let row = [];
// for (let i = 0; i < this.totalSpaces; i++) {
// space = this.board[i];
// if (space.type === SpaceType.CHUTE) {
// row.push(space.value + '-');
// } else if (space.type === SpaceType.LADDER) {
// row.push(space.value + '+');
// } else row.push(space.value);
// if (row.length === this.rowValue) {
// row = rowCount % 2 !== 0 ? row : row.reverse();
// boardDisplay.push(row);
// row = [];
// }
// if (i % this.rowValue === 0) rowCount++;
// }
//
// return boardDisplay.map((row) => row.join(' '));
// }
