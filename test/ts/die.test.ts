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

import '../../src/ts/model/functions'

test('Test die class', () => {
  throw new Error("Method not implemented.");
})

test('paint board', () => {
  let total = 100;
  for (let i : number = 10; i >= 1; i--) {
    let row = []
    for (let j : number = 1; j<=10; j++) {
      row.push(total--);
    }
    row = (i%2==0) ? row : row.reverse()
    console.log(row);
  }
})