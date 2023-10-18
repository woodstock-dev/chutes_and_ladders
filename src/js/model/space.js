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

import { Avatar, Color } from "./avatar.js";


export class SpaceType {
  static START = 0;
  static NORMAL = 1;
  static CHUTE = 2;
  static LADDER = 3;
  static FINISH = 4;
}

export class Space {
  #Value = ""
  #Type = SpaceType.NORMAL;
  #Next = null
  #Special = null
  #Players = []
  #Previous = null

  constructor(type, value) {
    this.#Type = type
    this.#Value = String(value)
  }

  /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
   */
  land(avatar) { 
    this.ifOccupied()
    if (this.#Special !== null) this.#Special.land(avatar)
    else {
      this.#Players.push(avatar)
      avatar.location = this
    }
  }
  /**
   * Is a method to be invoked when an avatar leaves a space
  */
 leave() {
    if (this.type === SpaceType.START) this.#Players.shift()
    else this.#Players.pop()
  }
  
  ifOccupied() {
    if (this.occupied && this.type !== SpaceType.START) {
      this.players[0].move(1)
    }
  }
    
  /**
   *
   * @return {string}
   */
  get value() {
    return this.#Value
  }
  /**
   *
   * @return {number}
   */
  get type() {
    return this.#Type
  }
  /**
   *
   * @return {Space | null}
   */
  get next() { 
    return this.#Next
  }
  
  set next(location) {
    this.#Next = location
  }
  /**
   *
   * @return {Space | null}
   */
  get special() {
    return this.#Special
  }
  
  /**
   *
   * @param location
   * @return {Space} the current space
  */
 set special(location) {
    this.#Special = location
  }
  /**
   *
   * @return {*[]} a copy of the array of players
   */
  get players() {
    return [...this.#Players]
  }
  /**
   * @return boolean true if the space has players, false otherwise
   */
  get occupied() {
    return this.players.length > 0
  }

  get previous() {
    return this.#Previous
  }

  set previous(previous) {
    this.#Previous = previous
  }

  /**
   *
   * @param validators Array<(space {Space}) => boolean> an array of functions that can validate the space.
   * @return {boolean} true if the space is valid, false otherwise.
  */
 validate(validators) {
    
  }
}

