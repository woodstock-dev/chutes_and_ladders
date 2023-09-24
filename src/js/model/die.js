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

/**
 * The Die class represents the idea of a single dice (die) that may have four or more sides.
 */
export class Die {
  #Sides = -1;
  constructor(sides) {
    this.#Sides = sides;
  }
  // Should return a number of sides
  get sides() {
    // TODO - implement the sides method
    throw new Error("Method not implemented.");
  }
  // Should return a random number between one and the total sides
  roll() {
    // TODO - implement the roll method
    throw new Error("Method not implemented.");
  }
}
