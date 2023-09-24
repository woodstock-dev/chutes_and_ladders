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

/**
 * An enumeration is a constrained type that provides
 * memory efficient, O(n) access to values using friendly names.
 */
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

/**
 * A SpaceType represents the types of spaces on our playing board.
 */
export enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}

/**
 * An IPlayer is the named player for the game.
 */
export interface IPlayer {
  get name() : string;
  get order() : number;
  get avatar() : IAvatar;
  set avatar(avatar: IAvatar);
}

/**
 * An Avatar is the representation of the player on the board.
 * The Avatar is responsible for knowing where it is on the board,
 * and moving between locations on the board.
 */
export interface IAvatar {
  get name() : string;
  get location() : ISpace;
  set location(location : ISpace);
  move(numberOfSpaces: number) : void;
}

/**
 * An ISpace represents the single space on any board type.
 */
export interface ISpace {
  land(avatar : IAvatar) : void;
  leave() : void

  // Getters
  get value() : string
  get type() : SpaceType
  get next() : ISpace
  get special() : ISpace | null
  get occupied() : boolean;

  validate(validators: Array<(space: ISpace) => boolean>) : boolean;
}

export interface IBoard {
  spaces() : Array<ISpace>
  setup() : void
  display() : string
}

export interface IGame {
  get minimumPlayers() : number
  get maxPlayers() : number
  get board() : IBoard
  get players() : Array<IPlayer>
  addPlayer(player: IPlayer) : void
  play() : boolean
  takeTurn() : void
}

export interface IDie {
  get sides() : number;
  roll() : number;
}

export interface ISummedRoll {
  get rolledValues() : Array<number>;
  get sum() : number;
}