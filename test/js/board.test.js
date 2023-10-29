// TEST for Board.js

import { Space, SpaceType } from "../../src/js/model/space";
import { Avatar, Color } from "../../src/js/model/avatar";
import { Board } from "../../src/js/model/board";
import { Die } from "../../src/js/model/die";

// setup

let board, avatar1, avatar2, start, max, die, rollValue;

beforeEach(() => {
  max = 100;
  board = new Board(100, new Space(SpaceType.START, "Start"));
  avatar1 = new Avatar("Test Car", Color.RED);
  avatar2 = new Avatar("Test Hat", Color.BLACK);
  start = board.startSpace;

  start.land(avatar1);
  start.land(avatar2);

  die = new Die(8);
  rollValue = die.roll();
});

describe("Test connectivity of spaces within Board", () => {
  test("Test Next method of all Spaces", () => {
    while (start){
      expect(start).not.toBeNull();
      expect(start).toBeInstanceOf(Space);
      start = start.next
    }
  });

  test("Test Previous method", () => {
    expect(start.previous).toBeNull();
    expect(start.next.previous.type).toBe(SpaceType.START);
  });

  test("Test totalSpaces of Board", () => {
    expect(board.totalSpaces).toEqual(expect.any(Number));
  });

  test("SpaceType Start", () => {
    expect(start.type).toBe(SpaceType.START);
  });

  test("SpaceType Finish", () => {
    while (start.next) {
      start = start.next;
    }
    expect(start.type).toBe(SpaceType.FINISH);
  });

  test("Space.Special", () => {
    while (start) {
      if (start.special) expect(start.special).not.toBeNull();
      start = start.next;
    }
  });

  test("SpaceType Chute", () => {
    while (start) {
      if (start.special){
        if (start.value > start.special.value) expect(start.type).toEqual(SpaceType.CHUTE);
     } 
      start = start.next;
    }
  });

  test("SpaceType Ladder", () => {
    while (start) {
      if (start.special) {
        if (start.value < start.special.value) expect(start.type).toEqual(SpaceType.LADDER);
      }
      start = start.next;
    }
  });

  test("Avatar position / space recognition after Die roll method", () => {
    avatar1.move(rollValue);
    avatar2.move(rollValue);
    let avatar1Space = avatar1.location;
    let avatar2Space = avatar2.location;

    for (let i = 0; i < rollValue; i++) {
      start = start.next;
    }

    expect(avatar1Space === start.next).toBeTruthy();
    expect(avatar2Space === start).toBeTruthy();
    expect(avatar1Space.occupied === start.next.occupied).toBeTruthy();
    expect(avatar2Space.occupied === start.occupied).toBeTruthy();
  });
});
