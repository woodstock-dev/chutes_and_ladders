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

import { Die } from "./die";
import {IDie, ISpace, ISummedRoll} from "./interfaces";


const GenerateRandomNumber = (upperBound : number) : number => {
  return Math.floor(Math.random() * upperBound) + 1;
}

/**
 *
 * @param dice the dice to roll
 * @return number[] each dice that was rolled once.
 */
const RollDice = (dice : Array<IDie>) : Array<number> => {
  return dice.map(shake => shake.roll())
}


const RollSingleDiceMultipleTimes = (count: number, die: IDie, rolls: Array<any> = []) : Array<number> => {
  if (count == 0) {
    return
  }
  rolls.push(die.roll())
  RollSingleDiceMultipleTimes(count-1, die, rolls)
  return rolls
}

/**
 *
 * @param totalRolls the total number of times to roll
 * @param dice one or more dice
 * @return number[][] an array of values
 */
const RollMultipleDiceMultipleTimes = (totalRolls : number, rolls: Array<any>, ...dice : Array<IDie>) : Array<Array<number>> => {
  if (totalRolls === 0) {
    return
  }
  rolls.push(RollDice(dice))
  RollMultipleDiceMultipleTimes(totalRolls -1, rolls, ...dice)
  return rolls
}

/**
 *
 * @param count number of roles
 * @param die single dice
 */
const RollSingleDiceMultipleTimesAndSum = (count: number, die: IDie, rolls: Array<any>) : ISummedRoll => {
  if (count === 0 ) {
    return 
  }
  rolls.push(die.roll())
  RollSingleDiceMultipleTimesAndSum(count-1, die, rolls)
  return {
    rolledValues: rolls,
    sum: rolls.reduce((a,b) => a+b, 0)
  } as ISummedRoll
}

/**
 *
 * @param dice
 * @return SummedRoll
 */
const RollMultipleDiceAndSum = (dice: Array<IDie>) : ISummedRoll => { 
  let values: Array<any> = RollDice(dice) 
  return {
    rolledValues: values,
    sum: values.reduce((a,b) => a+b, 0)
  } as ISummedRoll
}


export default { GenerateRandomNumber, RollDice, RollSingleDiceMultipleTimes,  RollSingleDiceMultipleTimesAndSum, RollMultipleDiceMultipleTimes, RollMultipleDiceAndSum }
