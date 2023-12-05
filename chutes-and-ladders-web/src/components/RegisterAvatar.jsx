import { useState } from 'react';
import Button from './Button';
import AvatarList from './AvatarList';
import AvatarColor from './AvatarColor';

const RegisterAvatar = ({ game }) => {
  const avatarComponents = [];
  const colorsComponents = [];

  const avatarColorList = Object.assign({}, game.colorList);
  const avatarNameList = game.avatarList;

  const [avatarName, setAvatarNames] = useState(avatarNameList);

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    const avatar = event.target.avatarName.value;
    const color = event.target.avatarColorList.value;
    if (game.playerNoAvatar && avatar && color) setAvatarNames(avatarName.filter((a) => a.name !== avatar));
    game.registerAvatar(avatar, color);
  };

  avatarName.map((a) => {
    avatarComponents.push(<AvatarList avatarName={a.name} avatarId={a.id} key={a.id} />);
  });

  colorsComponents.push(<AvatarColor colorList={Object.keys(avatarColorList).slice(1)} key={Object.values(avatarColorList)} />);

  return (
    <>
      <form onSubmit={handleRegisterPlayer}>
        <h3>Avatar Name:</h3>
        <select name="avatarName">{avatarComponents}</select>
        <h3>Avatar Color: </h3>
        <select name="avatarColorList">{colorsComponents}</select>
        <h4>Register Player:</h4>
        <Button type={'submit'} name={'Register Avatar'} />
      </form>
    </>
  );
};

export default RegisterAvatar;
