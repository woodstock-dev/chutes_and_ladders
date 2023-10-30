import { Space, SpaceType } from "./space.js";

export class Board {
  #TotalSpaces = 0;
  #StartSpace = null;
  #Chutes = []
  #Ladders = []


  constructor(totalSpaces, startSpace) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
  }

  get totalSpaces() {
    return this.#TotalSpaces;
  }

  get startSpace() {
    this.boardSetup
    return this.#StartSpace
  }

  randomSelector(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  spaceMaker(value) {
    let isSpecialSpace = false;
    let spaceType = SpaceType.NORMAL;
    let specialSpaceSelector = this.randomSelector(0, 20);

    if (value === 1) return this.#StartSpace

    else if (specialSpaceSelector === 7 || specialSpaceSelector === 14) {
      let chuteOrLadderSelector = this.randomSelector(0, 2);
      if (chuteOrLadderSelector === 0 && value > 10 && !isSpecialSpace) {
        spaceType = SpaceType.CHUTE;
        value = "Chute";
        isSpecialSpace = true;
      }
      if (chuteOrLadderSelector === 1 && value < 89 && !isSpecialSpace) {
        spaceType = SpaceType.LADDER;
        value = "Ladder";
        isSpecialSpace = true;
      }
      isSpecialSpace = false;
    }

    return new Space (spaceType, value)
  }

  chuteSpaceConnector() {
    let chutes = this.#Chutes;
    let dummyNode = null;

    for (let i = 0; i < chutes.length; i++) {
      let special = chutes[i][1]
      dummyNode = chutes[i][0]

      while (special > 0) {
        dummyNode = dummyNode.previous
        special--
      }
      if (dummyNode.type !== SpaceType.NORMAL) dummyNode = dummyNode.previous
      chutes[i][0].special = dummyNode
    }
  }

  ladderSpaceConnector() {
    let ladders = this.#Ladders;
    let dummyNode = null;

    for (let i = 0; i < ladders.length; i++) {
      let special = ladders[i][1]
      dummyNode = ladders[i][0]

      while (special > 0) {
        dummyNode = dummyNode.next
        special--
      }
      if (dummyNode.type !== SpaceType.NORMAL) dummyNode = dummyNode.next
      ladders[i][0].special = dummyNode
    }
  }

  get boardSetup() {
    let totalSpaces = this.#TotalSpaces;
    let space = new Space(SpaceType.FINISH, "Finish");

    for (let i = totalSpaces - 1; i >= 1; i--) {
      space.previous = this.spaceMaker(i);
      space.previous.next = space;
      if (space.type === SpaceType.CHUTE) {
        let special = this.randomSelector(10, i-1)
        this.#Chutes.push([space,special])
      }
      if (space.type === SpaceType.LADDER) {
        let special = this.randomSelector(10, 99 - i)
        this.#Ladders.push([space, special])
      } 
      space = space.previous;
    }      

    this.chuteSpaceConnector();
    this.ladderSpaceConnector();
    
  }

  get displaySpaces() {
    let total = this.#TotalSpaces
    let boardDisplay = [];
    for (let i = 10; i >= 1; i--) {
      let row = [];
      for (let j = 1; j <= 10; j++) {
        row.push(total--);
      }
      row = i % 2 == 0 ? row : row.reverse();
      boardDisplay.push(row);
    }
    return boardDisplay
      .map((row, idx) => {
        if (idx === boardDisplay.length-1) return row.join("    ");
        if (idx === 0) return row.join("   ");
        return row.join("   ");
      }).join('\n ')
      ;
  }
}
