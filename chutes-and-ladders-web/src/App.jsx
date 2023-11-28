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
const avatarColor = Object.assign({}, game.colorList);
const board = game.displayGameBoard();
const avatarList = game.avatarList;

function App() {
  const [getAvatarNames, setAvatarNames] = useState(avatarList);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const avatarComponents = [];

  const colorsComponents = [];

  const gameBoard = [];

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    const avatar = event.target.avatarName.value;
    const player = event.target.playerName.value;
    const color = event.target.avatarColor.value;
    setAvatarNames(getAvatarNames.filter((a) => a.name !== avatar));
    game.registerPlayer(player, avatar, color);
  };

  function onReadyToPlay() {
    game.setOrderAndStart();
  }

  function onTakeTurn() {
    game.takeTurn();
    setReadyToPlay(!readyToPlay);
    console.log([game.playerInTurn.avatar.name, game.playerInTurn.avatar.location.value]);
  }

  function onGameReset() {
    game.reset();
  }
  getAvatarNames.map((a) => {
    avatarComponents.push(<AvatarList avatarName={a.name} avatarId={a.id} key={a.id} />);
  });

  colorsComponents.push(<AvatarColor colorList={Object.keys(avatarColor).slice(1)} key={Object.values(avatarColor)} />);

  board.map((row) => {
    row.map((space, j) => {
      gameBoard.push(<DisplayActiveGameBoard space={space} state={readyToPlay} key={space.value} />);
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
        <select name="avatarColor">{colorsComponents}</select>
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
