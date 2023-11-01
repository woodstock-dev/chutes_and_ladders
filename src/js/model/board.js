import { Space, SpaceType } from "./space.js";

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

  spaceMaker(value) {
    let isSpecialSpace = false;
    let spaceType = SpaceType.NORMAL;
    let specialSpaceSelector = this.randomSelector(0, 20);

    if (value === 1) return this.#StartSpace;
    else if (specialSpaceSelector === 7 || specialSpaceSelector === 14) {
      let chuteOrLadderSelector = this.randomSelector(0, 2);
      if (chuteOrLadderSelector === 0 && value > 10 && !isSpecialSpace) {
        spaceType = SpaceType.CHUTE;
        isSpecialSpace = true;
      }
      if (chuteOrLadderSelector === 1 && value < 89 && !isSpecialSpace) {
        spaceType = SpaceType.LADDER;
        isSpecialSpace = true;
      }
      isSpecialSpace = false;
    }

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
      if (dummyNode.type !== SpaceType.NORMAL) dummyNode = dummyNode.previous;
      chutes[i][0].special = dummyNode;
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
      if (dummyNode.type !== SpaceType.NORMAL) dummyNode = dummyNode.next;
      ladders[i][0].special = dummyNode;
    }
  }

  get boardSetup() {
    let totalSpaces = this.#TotalSpaces;
    let space = new Space(SpaceType.FINISH, "Finish");

    for (let i = totalSpaces - 1; i >= 1; i--) {
      space.previous = this.spaceMaker(i);
      space.previous.next = space;
      if (space.type === SpaceType.CHUTE) {
        let special = this.randomSelector(10, i - 1);
        this.#Chutes.push([space, special]);
      }
      if (space.type === SpaceType.LADDER) {
        let special = this.randomSelector(10, 99 - i);
        this.#Ladders.push([space, special]);
      }
      space = space.previous;
    }

    this.chuteSpaceConnector();
    this.ladderSpaceConnector();
  }

  //This will work for any square number board
  get displaySpaces() {
    let totalSpaces = this.#TotalSpaces
    const rowTotal = Math.sqrt(totalSpaces)
    let boardDisplay = [];
    let space = ' '
    let newLine = '\n'

    for (let i = rowTotal; i >= 1; i--) {
      let row = [];
      for (let j = 1; j <= rowTotal; j++) {
        if (i === rowTotal) {
          row.push(`${totalSpaces}`.padStart(3))
        }
        else if (i === 1) {
          row.push(`${totalSpaces}`.padStart(3))    
          }
        else row.push(`${totalSpaces}`.padStart(3))
      totalSpaces--
    }
      row = i % 2 == 0 ? row : row.reverse();
      boardDisplay.push(row);
    }
    
    return boardDisplay.map(row => row.join(space)).join(newLine)
  }
}

let board = new Board(100, new Space(SpaceType.START, "Start"));

console.log(board.displaySpaces);
