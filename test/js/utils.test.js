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
import { generateRandomNumber, rollDice, rollMultipleAndSum, rollMultipleDiceMultipleTimes, rollSingleDiceMultipleTimes, rollSingleDiceMultipleTimesAndSum } from "../../src/js/model/utils"

describe('Test functionality and validity of utils methods', () => {
   
  test('Test random number generation', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0

    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides
      const dieCount = Die.dieCount

      let randNum1 = generateRandomNumber(D1_Sides)
      let randNum2 = generateRandomNumber(D2_Sides)
      
      expect(randNum1).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum1).toBeLessThanOrEqual(D1_Sides)

      expect(randNum2).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum2).toBeLessThanOrEqual(D2_Sides)
    
      min++
    }
  })
  
  test('Test functionality of rollDice function', () => {
    const max = 100 
    let min = 0
    
    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides
      const minSideValue = 1
      
      
      const rollVals = rollDice(D1, D2)
      expect(rollVals[0] && rollVals[1]).toBeGreaterThanOrEqual(minSideValue)
      expect(rollVals[0]).toBeLessThanOrEqual(D1_Sides)
      expect(rollVals[1]).toBeLessThanOrEqual(D2_Sides)
      min++
    }
  })

  test('Test rollSingleDiceMultipleTimes function', () => {

    const count = 10
    const minSideValue = 1
    const max = 100 
    let min = 0

    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      let singleDiceRollsD1 = rollSingleDiceMultipleTimes(count, D1)
      let singleDiceRollsD2 = rollSingleDiceMultipleTimes(count, D2)
      expect(singleDiceRollsD1.length).toBe(count)
      expect(singleDiceRollsD2.length).toBe(count)
      min++
    }
  })

  test('Test rollMultipleDiceMultipleTimes function', () => {

    let totalRolls = 10
    const minSideValue = 1
    const max = 100 
    let min = 0

    while (min < 10) {  

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      const multDiceRolls = rollMultipleDiceMultipleTimes(totalRolls,[D1, D2])
  
      expect(multDiceRolls.length).toBe(totalRolls)   
      expect(multDiceRolls[min].reduce((a,b) => a+b)).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(multDiceRolls[min].reduce((a,b) => a+b)).toBeLessThanOrEqual(D1_Sides + D2_Sides)
      expect(multDiceRolls).toBeInstanceOf(Array)
      min++
    }
  })

  test('Test rollSingleDiceMultipleTimesAndSum function', () => {

    const count = 10
    const minSideValue = 1
    const max = 100 
    let min = 0

    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      const singleDiceRollsD1 = rollSingleDiceMultipleTimesAndSum(count, D1).sum() 
      const singleDiceRollsD2 = rollSingleDiceMultipleTimesAndSum(count, D2).sum()

      expect(singleDiceRollsD1).toBeGreaterThanOrEqual(minSideValue * count)
      expect(singleDiceRollsD1).toBeLessThanOrEqual(D1_Sides * count)

      expect(singleDiceRollsD2).toBeGreaterThanOrEqual(minSideValue * count)
      expect(singleDiceRollsD2).toBeLessThanOrEqual(D2_Sides * count)
      min++
    }
  })

  test('Test rollMultipleAndSum function', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0

    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      expect(rollMultipleAndSum(D1, D1).sum()).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(rollMultipleAndSum(D1, D1).sum()).toBeLessThanOrEqual(D1_Sides * 2)

      expect(rollMultipleAndSum(D2, D2).sum()).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(rollMultipleAndSum(D2, D2).sum()).toBeLessThanOrEqual(D2_Sides * 2)
      expect(rollMultipleAndSum(D1, D2).rollValues).toHaveLength(2)
      min++
    }
  })

  console.log("An 8 sided die would be optimum because it would take, at min, 13 rounds if someone were to roll an 8 at each turn. \n Also, each player would have the ability to progress far enough through one row on one turn to increase the probability of landing on a chute or ladder")

})