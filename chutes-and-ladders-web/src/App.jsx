import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import DisplayActiveGameBoard from './components/DisplayGameBoard';
import RegisterAvatar from './components/RegisterAvatar';
import PlayerName from './components/PlayerName';
import Game from './components/Game';
import Button from './components/Button';

const game = Game();
const board = game.displayGameBoard();

function App() {
  const gameBoard = [];

  const [rednerValue, flipRenderValue] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [boardRender, setBoardRender] = useState(board);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function onReadyToPlay() {
    game.setOrderAndStart();
    setReadyToPlay(!readyToPlay);
  }

  function onTakeTurn() {
    if (!readyToPlay) alert('PLEASE CLICK READY TO PLAY');
    game.takeTurn();
    flipRenderValue(!rednerValue);
  }

  function onGameReset() {
    const x = game.reset();
    setBoardRender(x);
  }

  boardRender.map((row) => {
    row.map((space) => {
      gameBoard.push(<DisplayActiveGameBoard space={space} key={space.value} />);
    });
  });

  return (
    <div className="main">
      <Home />
      <h3>Player Name:</h3>
      <PlayerName game={game} />
      <RegisterAvatar game={game} />
      <br></br>
      <Button type={'button'} name={'Ready To Play'} onClick={onReadyToPlay} />
      <br></br>
      <Button type={'Button'} name={'Take Turn'} onClick={onTakeTurn} />
      <br></br>
      <div className="Rows">{gameBoard}</div>
      <br></br>
      <Button type={'button'} name={'Reset'} onClick={onGameReset} />
    </div>
  );
}

export default App;
