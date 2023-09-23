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

export class SummedRoll {
  // Should return an array of numbers
  rollValues() {
    throw new Error("Method not implemented.");
  }
  // Should return a sum of all the roles as a number value
  sum() {
    throw new Error("Method not implemented.");
  }
}

export class Die {
  // Should return a number of sides
  get sides() {
    throw new Error("Method not implemented.");
  }
  // Should return a random number between one and the total sides
  roll() {
    throw new Error("Method not implemented.");
  }
  // Should return an array of numbers
  rollMultiple(totalRolls) {
    throw new Error("Method not implemented.");
  }
  // Should return a SummedRoll
  rollMultipleAndSum(totalRolls) {
    throw new Error("Method not implemented.");
  }

}