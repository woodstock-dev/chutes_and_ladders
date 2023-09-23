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
import {Space} from "./space";

export enum Color {
  RED,
  WHITE,
  BLUE,
  GREEN,
  PURPLE,
  YELLOW,
  ORANGE,
  PINK,
  BLACK,
  BROWN
}

export enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}


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

export interface ISpace {
  // Member Variables
  Value : string;
  Type : SpaceType;
  Next : ISpace;
  Special : ISpace | null;
  Players : Array<IAvatar>;

  // Functions
  /**
   * A function for handling an avatar when it lands on the space.
   * @param avatar
   */
  land(avatar : IAvatar) : void;

  /**
   * A function for updating the space state when the avatar leaves the space.
   */
  leave() : void

  // Getters
  get value() : string
  get type() : SpaceType
  get next() : ISpace
  get special() : ISpace | null
  get occupied() : boolean;

  /**
   * The validator method is used to verify a space based on one or more rule functions.
   * For example, if is the "FINISH" space, there are no next spaces.
   * @param validators
   */
  validate(validators: Array<(space: ISpace) => boolean>) : boolean;
}


export interface Board {
  spaces() : Array<Space>
  setup() : void
  display() : string
}

export interface Game {
  minPlayers() : number
  maxPlayers() : number
  board() : Board
  players() : Array<IPlayer>
  addPlayer(player: IPlayer) : void
  play() : boolean
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



