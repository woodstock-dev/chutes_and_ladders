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

import {Die} from '../../src/ts/model/die'
import utils from '../../src/ts/model/utils'

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

      let randNum1 = utils.GenerateRandomNumber(D1_Sides)
      let randNum2 = utils.GenerateRandomNumber(D2_Sides)
      expect(randNum1).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum1).toBeLessThanOrEqual(D1_Sides)

      expect(randNum2).toBeGreaterThanOrEqual(minSideValue)
      expect(randNum2).toBeLessThanOrEqual(D2_Sides)
      min++
    }
  })
  
  test('Test functionality of rollDice function', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0
    
    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      const rollVals = utils.RollDice([D1, D2])
      expect(rollVals).toBeInstanceOf(Array)
      expect(rollVals[0] && rollVals[1]).toBeGreaterThanOrEqual(minSideValue)
      expect(rollVals[0]).toBeLessThanOrEqual(D1_Sides)
      expect(rollVals[1]).toBeLessThanOrEqual(D2_Sides)
      min++
    }
  })

  test('Test rollSingleDiceMultipleTimes function', () => {
    const minSideValue = 1
    const max = 100 
    let min = 0

    const count = 10
    
    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      let singleDiceRollsD1 = utils.RollSingleDiceMultipleTimes(count, D1)
      let singleDiceRollsD2 = utils.RollSingleDiceMultipleTimes(count, D2)
      expect(singleDiceRollsD1.length).toBe(count)
      expect(singleDiceRollsD2.length).toBe(count)
      min++
    }
  })

  test('Test rollMultipleDiceMultipleTimes function', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0

    let totalRolls = 10

    while (min < 10) {  

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      const multDiceRolls = utils.RollMultipleDiceMultipleTimes(totalRolls,[D1, D2])
  
      expect(multDiceRolls.length).toBe(totalRolls)   
      expect(multDiceRolls[min].reduce((a,b) => a+b)).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(multDiceRolls[min].reduce((a,b) => a+b)).toBeLessThanOrEqual(D1_Sides + D2_Sides)
      min++
    }
  })

  test('Test rollSingleDiceMultipleTimesAndSum function', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0

    const count = 10
    
    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.sides
      const D2_Sides = D2.sides

      const singleDiceRollsD1 = utils.RollSingleDiceMultipleTimesAndSum(count, D1) 
      const singleDiceRollsD2 = utils.RollSingleDiceMultipleTimesAndSum(count, D2)

      expect(singleDiceRollsD1.sum).toBeGreaterThanOrEqual(minSideValue * count)
      expect(singleDiceRollsD1.sum).toBeLessThanOrEqual(D1_Sides * count)

      expect(singleDiceRollsD2.sum).toBeGreaterThanOrEqual(minSideValue * count)
      expect(singleDiceRollsD2.sum).toBeLessThanOrEqual(D2_Sides * count)
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

      expect(utils.RollMultipleDiceAndSum([D1, D1]).sum).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(utils.RollMultipleDiceAndSum([D2, D2]).sum).toBeGreaterThanOrEqual(minSideValue * 2)
      expect(utils.RollMultipleDiceAndSum([D1, D2]).rolledValues).toBeInstanceOf(Array)
      min++
    }
  })

})