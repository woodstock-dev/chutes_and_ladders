import React from 'react';

function DisplayActiveGameBoard({ space }) {
  return (
    <div className="Spaces">{space.occupied ? space.playersArr[space.playersArr.length - 1].name : space.type === 2 ? 'Chute' : space.type === 3 ? 'Ladder' : space.value}</div>
  );
}

export default DisplayActiveGameBoard;
