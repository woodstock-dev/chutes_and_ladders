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

import { IDie, ISummedRoll } from "./interfaces";

export class SummedRoll implements ISummedRoll {
  rollValues(): number[] {
    throw new Error("Method not implemented.");
  }
  sum(): number {
    throw new Error("Method not implemented.");
  }
}

export class Die implements IDie {
  get sides(): number {
    throw new Error("Method not implemented.");
  }
  roll(): number {
    throw new Error("Method not implemented.");
  }
  rollMultiple(totalRolls: number): number[] {
    throw new Error("Method not implemented.");
  }
  rollMultipleAndSum(totalRolls: number): ISummedRoll {
    throw new Error("Method not implemented.");
  }

}