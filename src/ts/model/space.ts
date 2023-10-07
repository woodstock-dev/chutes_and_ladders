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

import { Avatar } from "./avatar";
import {IAvatar, IPlayer, ISpace, SpaceType} from "./interfaces";


export class Space implements ISpace {
  Value : string;
  Type : SpaceType;
  Next : ISpace | null = null;
  Special : ISpace | null = null;
  Players : Array<IPlayer>;

  constructor(Type: SpaceType, Value: string) {
    this.Value = Value;
    this.Type = Type;
    this.Players = Array(0);
  }
  get next(): ISpace {
    throw new Error("Method not implemented.");
  }
  get special(): ISpace {
    throw new Error("Method not implemented.");
  }


  land(avatar: IAvatar): void {
    avatar.location = this
  }

  leave(): void {
    // TODO - Implement the method for leaving the space
  }

  get next(): ISpace {
    return this.Next;
  }

  get occupied(): boolean {
    // TODO - Implement the logic to determine if the space is occupied
    return false;
  }

  get special(): ISpace | null {
    return this.Special;
  }

  get type(): SpaceType {
    return this.Type;
  }

  validate(validators: Array<(space: ISpace) => boolean>): boolean {
    // TODO - Implement validating the space based on rules
    return false;
  }

  get value(): string {
    return this.Value;
  }
}
/*
const s1 = new Space(SpaceType.START, '1')
const Ladder = new Space(SpaceType.LADDER, '2')
const s3 = new Space(SpaceType.NORMAL, '3')
const s4 = new Space(SpaceType.NORMAL, '4')
const s5 = new Space(SpaceType.NORMAL, '5')
const s6 = new Space(SpaceType.NORMAL, '6')
const s7 = new Space(SpaceType.NORMAL, '7')
const s8 = new Space(SpaceType.NORMAL, '8')
const Chute = new Space(SpaceType.CHUTE, '9')
const s10 = new Space(SpaceType.FINISH, '10')

s1.Next = Ladder
Ladder.Next = s3
Ladder.Special = s5
s3.Next = s4
s4.Next = s5
s5.Next = s6
s6.Next = s7
s7.Next = s8
s8.Next = Chute
Chute.Next = s10
Chute.Special = s3


let avatar = new Avatar('test')
s1.land(avatar)
avatar.move(1)



console.log('outside of land', avatar.location.value)
*/