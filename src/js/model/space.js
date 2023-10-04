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


import {Player} from "./player.js";

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
  #Players = Array<Player>(0)

  constructor(type, value) {
    this.#Type = type
    this.#Value = String(value)
  }

  /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
   */
  land(avatar) {
    
  }

  /**
   * Is a method to be invoked when an avatar leaves a space
   */
  leave() {
    // TODO - Implement leaving the space
  }

  /**
   *
   * @return {string}
   */
  get value() {
    return Number(this.#Value)
  }

  /**
   *
   * @return {number}
   */
  get type() {
    if (this.#Value === '1') return this.#Type = SpaceType.START
    if (this.#Next === null) return this.#Type = SpaceType.FINISH
    else return this.#Type = SpaceType.NORMAL
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
    if (location > 10) this.#Next = null
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
    return this
  }


  /**
   *
   * @return {*[]} a copy of the array of players
   */
  get players() {
    // returns a copy of the players
    return [...this.#Players]
  }

  /**
   * @return boolean true if the space has players, false otherwise
   */
  get occupied() {
    
  }

  /**
   *
   * @param validators Array<(space {Space}) => boolean> an array of functions that can validate the space.
   * @return {boolean} true if the space is valid, false otherwise.
   */
  validate(validators) {
    // TODO - Implement a method that validates the spaces state
    return false
  }
}


let s1 = new Space(0, 1)
let s2 = new Space(0, 2)
let s3 = new Space(0, 3)
let s4 = new Space(0, 4)
s1.next = s2
s2.next = s3
s3.next = s4



console.log(s1.type, s2.value, s3.value, s4.type, s4.next)


let spaces = []
for (let i = 1; i <= 10; i++) {
  let space = new Space(0, i)
  space.next = space.value + 1
  spaces.push(space)
  
}

for (let space of spaces) {
  console.log(space.next)
  space = space.next
}
