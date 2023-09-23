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

export interface IPlayer {
  Name : string;
  Ordinal : number;
  Avatar : IAvatar;
}

export interface IAvatar {
  Name : string;
  Location : ISpace;
  move(space : ISpace) : void;
}

export enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}

export interface ISpace {
  Value : string;
  Type : SpaceType;
  Next : ISpace;
  Special : ISpace | null;
  land(avatar : IAvatar) : void;
}

export interface ISummedRoll {
  rollValues() : Array<number>;
  sum() : number;
}

export interface IDie {
  get sides() : number;
  roll() : number;
  rollMultiple(totalRolls : number) : Array<number>;
  rollMultipleAndSum(totalRolls : number) : ISummedRoll;
}



