// Copyright 2023 Ryan McGuinness
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export class SpaceType {
  static START = 0;
  static NORMAL = 1;
  static CHUTE = 2;
  static LADDER = 3;
  static FINISH = 4;
}

export class Space {
  constructor(type, value) {
    this.spaceType = type;
    this.spaceValue = String(value);
    this.spaceNext = null;
    this.playersArr = [];
    this.spacePrevious = null;
    this.spaceSpecial = null;
  }

  /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
   */
  land(avatar) {
    this.ifOccupied();
    if (this.spaceSpecial !== null) this.spaceSpecial.land(avatar);
    else {
      this.playersArr.push(avatar);
      avatar.location = this;
    }
  }
  /**
   * Is a method to be invoked when an avatar leaves a space
   */
  leave() {
    if (this.type === SpaceType.START) this.playersArr.shift();
    else this.playersArr.pop();
  }

  ifOccupied() {
    if (this.occupied && this.type !== SpaceType.START) {
      this.players[0].move(1);
    }
  }

  /**
   *
   * @return {string}
   */
  get value() {
    return this.spaceValue;
  }
  /**
   *
   * @return {number}
   */
  get type() {
    return this.spaceType;
  }
  /**
   *
   * @return {Space | null}
   */
  get next() {
    return this.spaceNext;
  }

  set next(location) {
    this.spaceNext = location;
  }
  /**
   *
   * @return {Space | null}
   */
  get special() {
    return this.spaceSpecial;
  }

  /**
   *
   * @param location
   * @return {Space} the current space
   */
  set special(location) {
    this.spaceSpecial = location;
  }
  /**
   *
   * @return {*[]} a copy of the array ofplayers
   */
  get players() {
    return [...this.playersArr];
  }
  /**
   * @return boolean true if the space hasplayers, false otherwise
   */
  get occupied() {
    return this.players.length > 0;
  }

  get previous() {
    return this.spacePrevious;
  }

  set previous(previous) {
    this.spacePrevious = previous;
  }

  /**
   *
   * @param validators Array<(space {Space}) => boolean> an array of functions that can validate the space.
   * @return {boolean} true if the space is valid, false otherwise.
   */
  validate(validators) {}
}
