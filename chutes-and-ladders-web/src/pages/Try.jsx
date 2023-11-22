import React from 'react';
import { ChutesAndLadders } from '../../../src/js/model/chutes_and_ladders';

const Try = () => {
  const game = new ChutesAndLadders(5, 5);
  let board = game.displayGameBoard();

  return (
    <div className="">
      {board.map((row, idx) => (
        <div key={idx} className="Rows">
          {row.map((space, idx) => (
            <div key={idx} className="Spaces">
              {space.length > 2 ? <div style={{ color: 'black' }}>{space}</div> : <div>{space}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
Try();
export default Try;
