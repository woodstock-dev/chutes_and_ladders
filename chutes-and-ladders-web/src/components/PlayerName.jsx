import { useState } from 'react';

const PlayerName = () => {
  const [playerName, setPlayerName] = useState('');
  return (
    <>
      <input value={playerName} name="playerName" onChange={(e) => setPlayerName(e.target.value)} />
    </>
  );
};
export default PlayerName;
