import { Space, SpaceType } from './space.js';

export class Board {
  #TotalSpaces = 0;
  #StartSpace = null;
  #Chutes = [];
  #Ladders = [];

  constructor(totalSpaces, startSpace) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
  }

  get totalSpaces() {
    return this.#TotalSpaces;
  }

  get startSpace() {
    this.boardSetup;
    return this.#StartSpace;
  }

  randomSelector(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  spaceMaker(value, row) {
    let spaceType = SpaceType.NORMAL;
    let spaceInRow = value % 10;

    if (value === 1) return this.#StartSpace;
    if (row % 2 === 0 && spaceInRow === row) spaceType = SpaceType.CHUTE;
    if (row % 2 !== 0 && spaceInRow === row) spaceType = SpaceType.LADDER;

    return new Space(spaceType, value);
  }

  chuteSpaceConnector() {
    let chutes = this.#Chutes;
    let dummyNode = null;
    let special = undefined;

    for (let i = 0; i < chutes.length; i++) {
      [dummyNode, special] = chutes[i];

      while (special > 0) {
        dummyNode = dummyNode.previous;
        special--;
      }
      dummyNode.type === SpaceType.NORMAL ? (chutes[i][0].special = dummyNode) : (chutes[i][0].special = dummyNode.previous);
    }
  }

  ladderSpaceConnector() {
    let ladders = this.#Ladders;
    let dummyNode = null;
    let special = undefined;

    for (let i = 0; i < ladders.length; i++) {
      [dummyNode, special] = ladders[i];

      while (special > 0) {
        dummyNode = dummyNode.next;
        special--;
      }
      dummyNode.type === SpaceType.NORMAL ? (ladders[i][0].special = dummyNode) : (ladders[i][0].special = dummyNode.next);
    }
  }

  get boardSetup() {
    const minDistForSpecialSpace = 9;

    let totalSpaces = this.#TotalSpaces;
    let space = new Space(SpaceType.FINISH, 'Finish');
    let row = 0;

    for (let i = totalSpaces - 1; i >= 1; i--) {
      space.previous = this.spaceMaker(i, row);
      space.previous.next = space;
      space = space.previous;
      i % 10 === 0 ? row++ : undefined;

      if (space.type === SpaceType.CHUTE) {
        let special = this.randomSelector(minDistForSpecialSpace, i - 1);
        this.#Chutes.push([space, special]);
      }
      if (space.type === SpaceType.LADDER) {
        let special = this.randomSelector(minDistForSpecialSpace, 99 - i);
        this.#Ladders.push([space, special]);
      }
    }
    this.chuteSpaceConnector();
    this.ladderSpaceConnector();
  }

  //This will work for any square number board
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
