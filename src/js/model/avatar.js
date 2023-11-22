export class Color {
  static UNDEFINED = 0;
  static RED = 1;
  static BLACK = 2;
  static BROWN = 3;
  static BLUE = 4;
  static GREEN = 5;
  static PURPLE = 6;
  static WHITE = 7;
  static YELLOW = 8;
  static ORANGE = 9;
  static PINK = 10;
}

export class AvatarList {
  static XENOMORPH = 0;
  static PREDATOR = 1;
  static TERMINATOR = 2;
  static ROBOCOP = 3;
}

export class Avatar {
  /**
   *
   * @param name the name of the avatar example: Car, Top Hat, Black Cat, etc
   * @param color the color of the avatar
   */
  constructor(name, color) {
    this.avatarName = name;
    this.avatarColor = color;
    this.avatarLocation = null;
  }

  get name() {
    return this.avatarName;
  }

  get color() {
    return this.avatarColor;
  }

  get location() {
    return this.avatarLocation;
  }

  set location(location) {
    this.avatarLocation = location;
  }
  /**
   *
   * @param {*} numberOfSpaces is the number of spaces to move
   * @returns the potential location of the avatar after traversing
   */
  _moveBack(numberOfSpaces) {
    let avatarLoc = this.avatarLocation;
    while (numberOfSpaces > 0) {
      if (!avatarLoc.previous) return null;
      else avatarLoc = avatarLoc.previous;
      numberOfSpaces--;
    }
    return avatarLoc;
  }
  /**
   *
   * @param {*} numberOfSpaces number of spaces to move
   * @returns the potetential location of the avatar after traversing
   */
  _moveForward(numberOfSpaces) {
    let avatarLoc = this.avatarLocation;
    while (numberOfSpaces > 0) {
      if (!avatarLoc.next) return null;
      else avatarLoc = avatarLoc.next;
      numberOfSpaces--;
    }
    return avatarLoc;
  }
  /**
   *
   * @param {*} numberOfSpaces number of spaces from the die roll
   */

  move(numberOfSpaces) {
    let locBeforeMove = this.avatarLocation;
    const locAfterMove = numberOfSpaces > 0 ? this._moveForward(numberOfSpaces) : this._moveBack(Math.abs(numberOfSpaces));

    if (locAfterMove) {
      locBeforeMove.leave();
      locAfterMove.land(this);
    }
  }
}
