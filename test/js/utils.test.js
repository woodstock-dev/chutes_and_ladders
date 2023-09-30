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


import { Die } from "../../src/js/model/die"
import { generateRandomNumber, rollDice, rollMultipleDiceMultipleTimes, rollSingleDiceMultipleTimes } from "../../src/js/model/utils"

describe('Test functionality and validity of utils methods', () => {
  
  const D1 = new Die(6)
  const D2 = new Die(4)

  const D1_Sides = D1.sides
  const D2_Sides = D2.sides
  
  const minSideValue = 1
  const max = 100 
  let min = 0
  
  test('Test random number generation', () => {
    const randNum1 = generateRandomNumber(D1_Sides)
    const randNum2 = generateRandomNumber(D2_Sides)

    while (min < max) {
      expect(randNum1).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum1).toBeLessThanOrEqual(D1_Sides)

      expect(randNum2).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum2).toBeLessThanOrEqual(D2_Sides)
      min++
    }
  })
  
  test('Test functionality of rollDice function', () => {
    const rollValues = rollDice(D1, D2)

    while (min < max) {
      expect(rollValues).toBeInstanceOf(Array)
      expect(rollValues).toBeGreaterThanOrEqual(minSideValue)
      expect(rollValues[0]).toBeLessThanOrEqual(D1_Sides)
      expect(rollValues[1]).toBeLessThanOrEqual(D2_Sides)
      
      min++
    }
  })

  test('Test rollSingleDiceMultipleTimes function', () => {
    const count = 10
    const singleDiceRollsD1 = rollSingleDiceMultipleTimes(count, D1)
    const singleDiceRollsD2 = rollSingleDiceMultipleTimes(count, D2)

    while (min < max) {
      expect(singleDiceRollsD1.length).toBe(count)
      expect(singleDiceRollsD2.length).toBe(count)
    }
  })

  test('Test rollMultipleDiceMultipleTimes function', () => {
    const totalRolls = 10
    const multDiceRolls = rollMultipleDiceMultipleTimes(totalRolls, [], D1, D2)
    
    
  })
})