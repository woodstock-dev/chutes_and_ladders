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

import {IAvatar, IPlayer, ISpace, SpaceType} from "./interfaces";


export class Space implements ISpace {
  Value : string;
  Type : SpaceType;
  Next : ISpace | null = null;
  Special : ISpace | null = null;
  Players : Array<IPlayer>;

  constructor(Value: string, Type: SpaceType) {
    this.Value = Value;
    this.Type = Type;
    this.Players = Array(0);
  }


  land(avatar: IAvatar): void {
    // TODO - Implement the method for landing on the space
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
