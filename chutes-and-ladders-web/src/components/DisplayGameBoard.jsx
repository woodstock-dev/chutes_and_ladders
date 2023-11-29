function DisplayActiveGameBoard({ space }) {
  return <div className="Spaces">{space.occupied ? space.playersArr[0].name : space.type === 2 ? 'Chute' : space.type === 3 ? 'Ladder' : space.value}</div>;
}

export default DisplayActiveGameBoard;
