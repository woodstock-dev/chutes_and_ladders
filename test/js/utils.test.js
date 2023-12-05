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

import { Die } from '../../src/js/model/die';
import {
  generateRandomNumber,
  rollDice,
  rollMultipleAndSum,
  rollMultipleDiceMultipleTimes,
  rollSingleDiceMultipleTimes,
  rollSingleDiceMultipleTimesAndSum,
} from '../../src/js/model/utils';

let D1, D2, D1_Sides, D2_Sides, max, min, count, totalRolls, minSideValue;

beforeEach(() => {
  D1 = new Die(6);
  D2 = new Die(4);
  D1_Sides = D1.sides;
  D2_Sides = D2.sides;
  minSideValue = 1;
  max = 100;
  min = 0;
  count = 10;
  totalRolls = 10;
});

describe('Test functionality and validity of utils methods', () => {
  test('Test random number generation', () => {
    while (min < max) {
      let randNum1 = generateRandomNumber(D1_Sides);
      let randNum2 = generateRandomNumber(D2_Sides);

      expect(randNum1).toBeGreaterThanOrEqual(minSideValue);
      expect(randNum1).toBeLessThanOrEqual(D1_Sides);

      expect(randNum2).toBeGreaterThanOrEqual(minSideValue);
      expect(randNum2).toBeLessThanOrEqual(D2_Sides);

      min++;
    }
  });

  test('Test functionality of rollDice function', () => {
    while (min < max) {
      const rollVals = rollDice(D1, D2);
      expect(rollVals[0]).toBeGreaterThanOrEqual(minSideValue);
      expect(rollVals[1]).toBeGreaterThanOrEqual(minSideValue);
      expect(rollVals[0]).toBeLessThanOrEqual(D1_Sides);
      expect(rollVals[1]).toBeLessThanOrEqual(D2_Sides);
      min++;
    }
  });

  test('Test rollSingleDiceMultipleTimes function', () => {
    while (min < max) {
      let singleDiceRollsD1 = rollSingleDiceMultipleTimes(count, D1);
      let singleDiceRollsD2 = rollSingleDiceMultipleTimes(count, D2);
      expect(singleDiceRollsD1.length).toBe(count);
      expect(singleDiceRollsD2.length).toBe(count);
      min++;
    }
  });

  test('Test rollMultipleDiceMultipleTimes function', () => {
    while (min < count) {
      const multDiceRolls = rollMultipleDiceMultipleTimes(totalRolls, [D1, D2]);

      expect(multDiceRolls.length).toBe(totalRolls);
      expect(multDiceRolls[min].reduce((a, b) => a + b)).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(multDiceRolls[min].reduce((a, b) => a + b)).toBeLessThanOrEqual(D1_Sides + D2_Sides);
      expect(multDiceRolls).toBeInstanceOf(Array);
      min++;
    }
  });

  test('Test rollSingleDiceMultipleTimesAndSum function', () => {
    while (min < max) {
      const singleDiceRollsD1 = rollSingleDiceMultipleTimesAndSum(count, D1);
      const singleDiceRollsD2 = rollSingleDiceMultipleTimesAndSum(count, D2);

      expect(singleDiceRollsD1).toBeGreaterThanOrEqual(minSideValue * count);
      expect(singleDiceRollsD1).toBeLessThanOrEqual(D1_Sides * count);

      expect(singleDiceRollsD2).toBeGreaterThanOrEqual(minSideValue * count);
      expect(singleDiceRollsD2).toBeLessThanOrEqual(D2_Sides * count);
      min++;
    }
  });

  test('Test rollMultipleAndSum function', () => {
    while (min < max) {
      const doubleD1Roll = rollMultipleAndSum(D1, D1);
      const doubleD2Roll = rollMultipleAndSum(D2, D2);
      const doubleMixedDieRoll = rollMultipleAndSum(D1, D2);

      expect(doubleD1Roll).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleD1Roll).toBeLessThanOrEqual(D1_Sides * 2);

      expect(doubleD2Roll).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleD2Roll).toBeLessThanOrEqual(D2_Sides * 2);

      expect(doubleMixedDieRoll).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleMixedDieRoll).toBeLessThanOrEqual(D1_Sides + D2_Sides);
      min++;
    }
  });

  console.log(
    'An 8 sided die would be optimum because it would take, at min, 13 rounds if someone were to roll an 8 at each turn and not land on any chutes or ladders spaces. \n Also, each player would have the ability to progress far enough through one row on one turn to increase the probability of landing on a chute or ladder space'
  );
});
