import { Board } from '../../src/js/model/board';
import { Space, SpaceType } from '../../src/js/model/space';

const spaceMaker = () => {
  return new Space(SpaceType.NORMAL, '1');
};

let space, board;

beforeEach(() => {
  board = new Board(100, 10, spaceMaker);
  space = board.boardSetup();
});

describe('Test connection of spaces within the boardSetup method', () => {
  test('test traversing entire list', () => {
    while (space) {
      expect(space).not.toBeNull();
      expect(space).toBeInstanceOf(Space);
      space = space.next;
    }
  });

  test('test traversing entire list backwards', () => {
    while (space.next) {
      space = space.next;
      expect(space.previous).not.toBeNull();
      expect(space.previous).toBeInstanceOf(Space);
    }
  });
});
