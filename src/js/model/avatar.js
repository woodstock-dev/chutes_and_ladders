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

export class Avatar {
  #Location = null;
  #Name = "";
  #Color = Color.UNDEFINED;

  /**
   *
   * @param name the name of the avatar example: Car, Top Hat, Black Cat, etc
   * @param color the color of the avatar
   */
  constructor(name, color) {
    this.#Name = name;
    this.#Color = color;
  }

  get name() {
    return this.#Name;
  }

  get location() {
    return this.#Location;
  }

  get color() {
    return this.#Color;
  }

  set location(loc) {
    this.#Location = loc;
  }

  move(numberOfSpaces) {
    let locBeforeMove = this.#Location;
    let locAfterMove = this.#Location;
    while (numberOfSpaces > 0) {
      if (locAfterMove.next === null) {
        break;
      } else {
        locAfterMove = locAfterMove.next;
      }
      numberOfSpaces--;
    }
    if (numberOfSpaces === 0) {
      locBeforeMove.leave();
      locAfterMove.land(this)
    } 
  }
}
