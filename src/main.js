import { ChutesAndLadders } from './js/model/chutes_and_ladders.js';

const main = () => {
  console.log('MAIN WORKING');
  const game = new ChutesAndLadders(5, 5);
  return game;
};

export default main;
