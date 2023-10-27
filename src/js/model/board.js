/*
Only needs to have a start space and number of spaces
Test in beforeAll - reset after each test

Setup is where you design the spaces and run the players through the spaces
*/

import { Avatar, Color } from "./avatar.js";
import { Space, SpaceType } from "./space.js";

export class Board {
  #TotalSpaces = 0;
  #StartSpace = undefined;

  constructor(totalSpaces, startSpace) {
    this.#TotalSpaces = totalSpaces;
    this.#StartSpace = startSpace;
  }

  get totalSpaces() {
    return this.#TotalSpaces;
  }

  get gameStartSpace() {
    this.#StartSpace = this.boardSetup[0][0];
    return this.#StartSpace;
  }

  randomSpaceSelector(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  get boardSetup() {
    let totalSpaces = this.#TotalSpaces;
    let totalRows = totalSpaces / 10;
    let space = this.#StartSpace;
    let dummyNode = null;
    let board = [];
    let rowMult = 0;
    let ladders = [];
    let lCount = 1;
    let chutes = [];
    let cCount = 1;

    for (let i = totalRows; i >= 1; i--) {
      let row = [];
      let l = this.randomSpaceSelector(1, 10);
      let c = this.randomSpaceSelector(0, 10);
      for (let j = 1; j <= 10; j++) {
        let spaceVal = j + rowMult + 1;
        row.push(space);
        if (i === 1 && j === 9) {
          space.next = new Space(SpaceType.FINISH, "Finish");
          space = space.next;
          space.previous = dummyNode;
          break;
        } else if (i % 2 === 0 && l === j) {
          console.log(lCount);
          dummyNode = space;
          space.special = space;
          ladders.push(space.special);
          space.next = new Space(SpaceType.LADDER, `Ladder ${lCount}`);
          space = space.next;
          space.previous = dummyNode;
          lCount++;
        } else if (i % 2 !== 0 && c === j) {
          dummyNode = space;
          space.special = space;
          chutes.push(space.special);
          space.next = new Space(SpaceType.CHUTE, `Chute ${cCount}`);
          space = space.next;
          space.previous = dummyNode;
          cCount++;
        } else {
          dummyNode = space;
          space.next = new Space(SpaceType.NORMAL, spaceVal);
          space = space.next;
          space.previous = dummyNode;
        }
      }
      row = i % 2 == 0 ? row : row.reverse();
      board.push(row);
      rowMult += 10;
    }
    return board;
  }
  get displaySpaces() {
    let space = this.boardSetup.reverse();
    let viewBoard = [];
    space.forEach((row) => {
      let group = [];
      row.forEach((val) => {
        if (val.value === "Start") {
          group.push("1");
        } else if (val.value === "Finish") {
          group.push("100");
        } else {
          group.push(val.value);
        }
      });
      viewBoard.push(group);
    });
    return viewBoard.map((row, idx) => {
      if (idx === 0) return row.join("  ");
      if (idx === 9) return row.join("   ");
      return row.join("  ");
    });
  }
}
