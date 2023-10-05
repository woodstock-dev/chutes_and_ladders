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



import { Avatar } from "./avatar.js";
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
    avatar.location = this
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
    // returns a copy of the players
    return [...this.#Players]
  }
  /**
   * @return boolean true if the space has players, false otherwise
   */
  get occupied() {
    return this.occupied
  }
  /**
   *
   * @param validators Array<(space {Space}) => boolean> an array of functions that can validate the space.
   * @return {boolean} true if the space is valid, false otherwise.
  */
 validate(validators) {
    if (validators[0].value === '1' && validators[0].type === SpaceType.START) return true
    if (validators[1].special === s5) return true
    return false
  }
}


const s1 = new Space(SpaceType.START, '1')
const Ladder = new Space(SpaceType.LADDER, '2')
const s3 = new Space(SpaceType.NORMAL, '3')
const s4 = new Space(SpaceType.NORMAL, '4')
const s5 = new Space(SpaceType.NORMAL, '5')
const s6 = new Space(SpaceType.NORMAL, '6')
const s7 = new Space(SpaceType.NORMAL, '7')
const s8 = new Space(SpaceType.NORMAL, '8')
const Chute = new Space(SpaceType.CHUTE, '9')
const s10 = new Space(SpaceType.FINISH, '10')

s1.next = Ladder
Ladder.next = s3
Ladder.special = s5
s3.next = s4
s4.next = s5
s5.next = s6
s6.next = s7
s7.next = s8
s8.next = Chute
Chute.next = s10
Chute.special = s3



let avatar = new Avatar('test')
s1.land(avatar)
avatar.move()

console.log('outside of land', avatar.location.value)

let validators = []
validators.push(s1, Ladder, s3, s4, s5, s6, s7, s8, Chute, s10)

console.log(s1.validate(validators))