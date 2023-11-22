import React, { useState } from 'react';
import { PlayerSetup } from '../../../src/js/model/player_setup';
import { Color } from '../../../src/js/model/avatar';

const player = new PlayerSetup();
const avatarList = player.avatarList;
const avatarColorList = player.avatarColorList;

function SetPlayerName() {
  const [nameValue, setName] = useState('');
  const [avatarName, setAvatarName] = useState(undefined);
  const [color, setColor] = useState(undefined);

  const options = avatarList.map((avatar) => <option key={avatar}>{avatar}</option>);
  const colorOptions = avatarColorList.map((color) => <option key={color}>{color}</option>);

  const handlePlayerName = (event) => {
    event.preventDefault();
    setName(nameValue);
    setAvatarName(avatarName);
    setColor(color);
    const pName = event.target.nameValue.value;
    const aName = event.target.avatarName.value;
    const aColor = event.target.color.value;
    player.playerName = pName;
    player.avatarName = aName;
    player.avatarColor = aColor;

    console.log(aColor in Object.keys(Color));
  };

  const handleAvatarName = (event) => {};

  if (player.playerName) {
    console.log(player.playerName, player.avatarName, player.playerListCount);
    const x = player.registerPlayer();
    console.log(x);
  }
  return (
    <div>
      <form id="PlayerInfo" onSubmit={handlePlayerName}>
        <p>Player Name</p>
        <input inputMode="text" name="nameValue" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Click To Submit</button>
        <br></br>
        <p>Avatar Name</p>
        <select name="avatarName" value={avatarName} onChange={(e) => setAvatarName(e.target.value)}>
          {options}
        </select>
        <br></br>
        <p>Avatar Color</p>
        <select name="color" value={color} onChange={(e) => setColor(e.target.value)}>
          {colorOptions}
        </select>
      </form>
    </div>
  );
}

export default SetPlayerName;
