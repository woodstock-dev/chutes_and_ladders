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
import { SummedRoll } from './summed_roll.js';

export const generateRandomNumber = (upperBound) => {
  return Math.floor(Math.random() * upperBound) + 1;
};

export const randomRangeSelector = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 *
 * @param dice the dice to roll
 * @return number[] each dice that was rolled once.
 */

/*
ANYTIME dice IS CALLED, IT REPRESENTS AN INSTANCE OF THE die METHOD. IF THE
SPREAD OR REST OPERATOR IS USED, THE FUNCTION CAN HAVE MULTIPLE INSTANCES
OF THE Die CLASS CALLED AND PASSED INTO THE RECEIVING FUNCTION AS THE ARGUMENT
*/
export const rollDice = (...dice) => {
  return dice.map((shake) => shake.roll());
};

export const rollSingleDiceMultipleTimes = (count, die, rolls = []) => {
  if (count === 0) return;
  rolls.push(die.roll());
  rollSingleDiceMultipleTimes(count - 1, die, rolls);
  return rolls;
};

/**
 *
 * @param totalRolls the total number of times to roll
 * @param dice one or more dice
 * @return number[][] an array of values
 */
export const rollMultipleDiceMultipleTimes = (totalRolls, dice, rolls = []) => {
  if (totalRolls === 0) return;
  rolls.push(rollDice(...dice));
  rollMultipleDiceMultipleTimes(totalRolls - 1, dice, rolls);
  return rolls;
};

export const rollSingleDiceMultipleTimesAndSum = (count, dice, rolls = []) => {
  if (count === 0) return;
  rolls.push(dice.roll());
  rollSingleDiceMultipleTimesAndSum(count - 1, dice, rolls);
  return new SummedRoll(rolls).sum();
};
/**
 *
 * @param dice
 * @return SummedRoll
 */
export const rollMultipleAndSum = (...dice) => {
  return new SummedRoll(rollDice(...dice)).sum();
};
