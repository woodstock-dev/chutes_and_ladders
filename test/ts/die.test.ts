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


import  {Die} from "../../src/ts/model/die";

describe ('Test functionality of TS IDie class', () => {

  test('Test side generation', () => {

    const D1 = new Die(6)
    const D2 = new Die(4)
  
    const D1_Sides = D1.Sides
    const D2_Sides = D2.Sides

    const minSideValue = 1
    const max = 100 
    let min = 0
  
    expect(D1.Sides).toBe(D1_Sides)
    expect(D2.Sides).toBe(D2_Sides)
  })

  test('Test Roll function with 100 rolls for each die', () => {

    const minSideValue = 1
    const max = 100 
    let min = 0
  

    while (min < max) {

      const D1 = new Die(6)
      const D2 = new Die(4)
    
      const D1_Sides = D1.Sides
      const D2_Sides = D2.Sides

      const D1_Roll = D1.roll()
      const D2_Roll = D2.roll()
      expect(D1_Roll).toBeGreaterThanOrEqual(minSideValue)
      expect(D1_Roll).toBeLessThanOrEqual(D1_Sides)

      expect(D2_Roll).toBeGreaterThanOrEqual(minSideValue)
      expect(D2_Roll).toBeLessThanOrEqual(D2_Sides)
      min++
    }
  })

})

