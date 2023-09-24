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

// Should take a number argument >= 1 and return a number value
import {SummedRoll} from "./summed_roll.js";

export const generateRandomNumber = (upperBound) => {
  // TODO - Write a method that returns a number from 1 to the upperBound
  throw new Error("Method not implemented.");
}


/**
 *
 * @param dice the dice to roll
 * @return number[] each dice that was rolled once.
 */
export const rollDice = (...dice) => {
  // TODO - Implement rolling one or more dice once and only once.
  return []
}

export const rollSingleDiceMultipleTimes = (count, die) => {
  // TODO - Implement rolling a single dice multiple times
  return []
}

/**
 *
 * @param totalRolls the total number of times to roll
 * @param dice one or more dice
 * @return number[][] an array of values
 */
export const rollMultipleDiceMultipleTimes = (totalRolls, ...dice) => {
  // TODO - Implement rolling multiple dice multiple times
  return [][0]
}

export const rollSingleDiceMultipleTimesAndSum = (count, dice) => {
  // TODO - Implement this method
  return new SummedRoll([]);
}
/**
 *
 * @param dice
 * @return SummedRoll
 */
export const rollMultipleAndSum = (...dice) => {
  return new SummedRoll(rollDice(dice))
}
