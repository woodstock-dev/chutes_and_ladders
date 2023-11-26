import React from 'react';
import { ChutesAndLadders } from '../../../src/js/model/chutes_and_ladders';

const ActiveGame = new ChutesAndLadders(5, 5);

function Game() {
  return ActiveGame;
}
export default Game;
