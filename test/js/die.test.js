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

let D1, D2, D1_Sides, D2_Sides, minSideValue, max, min;

beforeEach(() => {
  D1 = new Die(6);
  D2 = new Die(4);
  D1_Sides = D1.sides;
  D2_Sides = D2.sides;
  minSideValue = 1;
  max = 100;
  min = 0;
});

describe('Test funcntionality of Die Class', () => {
  test('Test side generation', () => {
    expect(D1.sides).toBe(D1_Sides);
    expect(D2.sides).toBe(D2_Sides);
  });

  test('Test roll function with 100 rolls for each die', () => {
    while (min < max) {
      const D1_Roll = D1.roll();
      const D2_Roll = D2.roll();
      expect(D1_Roll).toBeGreaterThanOrEqual(minSideValue);
      expect(D1_Roll).toBeLessThanOrEqual(D1_Sides);

      expect(D2_Roll).toBeGreaterThanOrEqual(minSideValue);
      expect(D2_Roll).toBeLessThanOrEqual(D2_Sides);
      min++;
    }
  });
});
