import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import DisplayActiveGameBoard from './pages/DisplayGameBoard';
import PlayerName from './components/PlayerName';
import AvatarColor from './components/AvatarColor';
import AvatarList from './components/AvatarList';
import Game from './components/Game';
import Button from './components/Button';

const game = Game();
const avatarColor = game.colorList;
const board = game.displayGameBoard();
const readyToPlay = game.readyToPlay;
const players = game.playersArray;
const avatarList = game.avatarList;

function App() {
  const [getAvatarNames, setAvatarNames] = useState(avatarList);
  const [getBoard, setBoardPositions] = useState(board);

  const avatarComponents = [];

  const colorsComponents = [];

  const gameBoard = [];

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    const avatar = event.target.avatarName.value;
    const player = event.target.playerName.value;
    const color = event.target.avatarColor.value;
    handleAvatarName(event);
    const g = game.registerPlayer(player, avatar, color);
  };

  function handleAvatarName(event) {
    setAvatarNames(getAvatarNames.filter((a) => a.name !== event.target.avatarName.value));
  }

  function onReadyToPlay() {
    game.setOrderAndStart();
  }

  function onTakeTurn() {
    game.takeTurn();
    game.displayGameBoard();
    setBoardPositions();
    console.log([game.playerInTurn.avatar.name, game.playerInTurn.avatar.location.value]);
  }

  function handleBoardReRender() {
    game.displayGameBoard();
  }
  getAvatarNames.map((a) => {
    avatarComponents.push(<AvatarList avatarName={a.name} avatarId={a.id} key={a.id} />);
  });

  colorsComponents.push(<AvatarColor colorList={avatarColor} key={avatarColor} />);

  gameBoard.push(<DisplayActiveGameBoard board={board} key={game} />);

  return (
    <div>
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
      <div>{gameBoard}</div>
    </div>
  );
}

export default App;
