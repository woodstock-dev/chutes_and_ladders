import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import DisplayActiveGameBoard from './components/DisplayGameBoard';
import PlayerName from './components/PlayerName';
import AvatarColor from './components/AvatarColor';
import AvatarList from './components/AvatarList';
import Game from './components/Game';
import Button from './components/Button';

const game = Game();
const board = game.displayGameBoard();
const avatarColorList = Object.assign({}, game.colorList);
const avatarNameList = game.avatarList;

function App() {
  const avatarComponents = [];
  const gameBoard = [];
  const colorsComponents = [];

  const [getAvatarNames, setAvatarNames] = useState(avatarNameList);
  const [rednerValue, flipRenderValue] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    const player = event.target.playerName.value;
    const avatar = event.target.avatarName.value;
    const color = event.target.avatarColorList.value;
    registerPlayerAndAvatar(player, avatar, color);

    if (player && avatar && color) setAvatarNames(getAvatarNames.filter((a) => a.name !== avatar));
  };

  const registerPlayerAndAvatar = (playerName, avatarName, avatarColor) => {
    game.registerPlayer(playerName, avatarName, avatarColor);
  };
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
    game.reset();
    flipRenderValue(!rednerValue);
  }
  getAvatarNames.map((a) => {
    avatarComponents.push(<AvatarList avatarName={a.name} avatarId={a.id} key={a.id} />);
  });

  colorsComponents.push(<AvatarColor colorList={Object.keys(avatarColorList).slice(1)} key={Object.values(avatarColorList)} />);

  board.map((row) => {
    row.map((space) => {
      gameBoard.push(<DisplayActiveGameBoard space={space} rednerValue={rednerValue} flipRenderValue={flipRenderValue} key={space.value} />);
    });
  });

  return (
    <div className="main">
      <Home />
      <form onSubmit={handleRegisterPlayer}>
        <h3>Player Name:</h3>
        <PlayerName game={game} />
        <h3>Avatar Name:</h3>
        <select name="avatarName">{avatarComponents}</select>
        <h3>Avatar Color: </h3>
        <select name="avatarColorList">{colorsComponents}</select>
        <h4>Register Player:</h4>
        <Button type={'submit'} name={'Click to Register'} />
      </form>
      <br></br>

      <Button type={'button'} name={'Ready To Play'} onClick={onReadyToPlay} />

      <Button type={'Button'} name={'Take Turn'} onClick={onTakeTurn} />
      <br></br>

      <br></br>
      <div className="Rows">{gameBoard}</div>
      <br></br>
      <Button type={'button'} name={'Reset'} onClick={onGameReset} />
    </div>
  );
}

export default App;
