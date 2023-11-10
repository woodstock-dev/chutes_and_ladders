import React from 'react';
import { Board } from './board.js';
import { Space, SpaceType } from './space.js';

const Try = () => {
  const b = new Board(100, 5, 5, new Space(SpaceType.START, 'Start'));
  const x = b.displaySpaces();

  return x.map((row) => {
    return (
      <div className="Spaces" key={row}>
        {row.map((space) => {
          return (
            <ul className="Space" key={space}>
              {space.value}
            </ul>
          );
        })}
      </div>
    );
  });
};

export default Try;
