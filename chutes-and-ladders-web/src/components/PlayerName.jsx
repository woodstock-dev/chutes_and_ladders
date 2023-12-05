import { useState } from 'react';
import Button from './Button';

const PlayerName = ({ game }) => {
  const [playerName, setPlayerName] = useState('');
  const submitPlayerName = () => {
    game.registerPlayer(playerName);
  };

  return (
    <>
      <input value={playerName} name="playerName" onChange={(e) => setPlayerName(e.target.value)} />
      <br></br>
      <Button type={'Button'} name={'Register Player Name'} onClick={submitPlayerName} />
    </>
  );
};
export default PlayerName;
