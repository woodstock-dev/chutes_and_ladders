// import React from 'react';
// import Game from './Game';

// const game = Game();
// let avatarList = Object.keys(game.avatarList);
// const avatarColorList = Object.keys(game.colorList);
// const SetAvatar = () => {
//   const [avatarName, setAvatarName] = React.useState('');
//   const [color, setColor] = React.useState('');
//   const [, update] = React.useState();
//   const forceUpdate = React.useCallback(() => update({}), []);
//   let options = avatarList.map((avatar) => <option key={avatar}>{avatar}</option>);
//   const colorOptions = avatarColorList.map((color) => <option key={color}>{color}</option>);

//   const handleSubmitEvent = (event) => {
//     event.preventDefault();
//     setPlayerName(playerNameValue);
//     event.preventDefault();
//     setAvatarName(avatarName);
//     setColor(color);

//     const pName = event.target.playerNameValue.value;
//     const aName = event.target.avatarName.value;
//     const aColor = event.target.color.value;

//     let a = document.getElementById('avatarName');
//     for (let i = 0; i < a.length; i++) {
//       let o = a.options[i];
//       if (o.value === aName) {
//         avatarList = avatarList.filter((a) => a !== aName);
//         return handleAvatarName();
//       }
//     }
//     handleAvatarName();
//   };
//   const handleAvatarName = () => {
//     return forceUpdate();
//   };
//   return (
//     <div>
//       <br></br>
//       <p>Avatar Name</p>
//       <select name="avatarName" id="avatarName" value={avatarName} onChange={(e) => setAvatarName(e.target.value)}>
//         {options}
//       </select>
//       <br></br>
//       <p>Avatar Color</p>
//       <select value={color} name="color" onChange={(e) => setColor(e.target.value)}>
//         {colorOptions}
//       </select>
//     </div>
//   );
// };

// export default SetAvatar;
