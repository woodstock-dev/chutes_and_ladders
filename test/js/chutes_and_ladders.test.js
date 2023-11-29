import { ChutesAndLadders } from '../../src/js/model/chutes_and_ladders';
import { PlayerSetup } from '../../src/js/model/player_setup';
import { Space, SpaceType } from '../../src/js/model/space';
import { Avatar, Color } from '../../src/js/model/avatar';
import { Die } from '../../src/js/model/die';

let game, avatar1, avatar2, cur, die, rollValue, board, player1, player2;

beforeEach(() => {
  game = new ChutesAndLadders(5, 5);
  board = game.displayGameBoard();
  player1 = new PlayerSetup('Player1', 1, new Avatar('Test Car', Color.RED));
  player2 = new PlayerSetup('Player2', 2, new Avatar('Test Hat', Color.BLACK));
  cur = game.startSpace;

  avatar1 = player1.avatar;
  avatar2 = player2.avatar;

  cur.land(avatar1);
  cur.land(avatar2);

  die = new Die(8);
  rollValue = die.roll();
});

describe('Test connectivity of spaces within Board', () => {
  test('Test Next method of all Spaces', () => {
    while (cur) {
      expect(cur).not.toBeNull();
      expect(cur).toBeInstanceOf(Space);
      cur = cur.next;
    }
  });

  test('Test Previous method', () => {
    expect(cur.previous).toBeNull();
    expect(cur.next.previous.type).toBe(SpaceType.START);
  });

  test('SpaceType Start', () => {
    expect(cur.type).toBe(SpaceType.START);
  });

  test('SpaceType Finish', () => {
    while (cur.next) {
      cur = cur.next;
    }
    expect(cur.type).toBe(SpaceType.FINISH);
  });

  test('Space.Special', () => {
    while (cur) {
      if (cur.special) expect(cur.special).not.toBeNull();
      cur = cur.next;
    }
  });

  test('SpaceType Chute', () => {
    while (cur) {
      if (cur.type === SpaceType.CHUTE) {
        expect(cur.special).not.toBeNull();
        expect(cur.special).toBeInstanceOf(Space);
      }
      cur = cur.next;
    }
  });

  test('SpaceType Ladder', () => {
    while (cur) {
      if (cur.type === SpaceType.LADDER) {
        expect(cur.special).not.toBeNull();
        expect(cur.special).toBeInstanceOf(Space);
      }
      cur = cur.next;
    }
  });

  test('Avatar position / space recognition after Die roll method', () => {
    avatar1.move(rollValue);
    avatar2.move(rollValue);
    let avatar1Space = avatar1.location;
    let avatar2Space = avatar2.location;

    for (let i = 0; i < rollValue; i++) {
      cur = cur.next;
    }
    if (cur.type === SpaceType.NORMAL) {
      if (cur.next.type === SpaceType.NORMAL) {
        expect(avatar1Space === cur.next).toBeTruthy();
        expect(avatar2Space === cur).toBeTruthy();
        expect(avatar1Space.occupied === cur.next.occupied).toBeTruthy();
        expect(avatar2Space.occupied === cur.occupied).toBeTruthy();
      } else {
        expect(avatar1Space === cur.next.special).toBeTruthy();
        expect(avatar1Space.occupied === cur.next.special.occupied).toBeTruthy();
      }
    }
  });

  test('Avatar landing on chute', () => {
    while (cur) {
      if (cur.type === SpaceType.CHUTE) {
        cur.land(avatar1);
        break;
      }
      cur = cur.next;
    }
    if (avatar1.location.type === SpaceType.NORMAL) expect(avatar1.location).toEqual(cur.special);
  });

  test('Avatar landing on ladder', () => {
    while (cur) {
      if (cur.type === SpaceType.LADDER) {
        cur.land(avatar1);
        break;
      }
      cur = cur.next;
    }
    if (avatar1.location.type === SpaceType.NORMAL) expect(avatar1.location).toEqual(cur.special);
  });
});
