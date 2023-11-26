import { useState } from 'react';

function DisplayActiveGameBoard({ board }) {
  const [space, setOccupied] = useState(board);
  const updateSpaces = () => {
    setOccupied(space);
    console.log(space);
  };
  return (
    <>
      {board.map((row, i) => {
        return (
          <div className="Rows" key={i}>
            {row.map((space, j) => {
              return (
                <div className="Spaces" key={j} onChange={updateSpaces}>
                  {space}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default DisplayActiveGameBoard;
