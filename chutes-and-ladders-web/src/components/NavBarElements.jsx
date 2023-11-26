import React from 'react';

const NavBar = () => {
  return (
    <div>
      <nav>
        <a style={{ marginRight: '100px', marginLeft: '100px' }} href="/pages/RegisterPlayer">
          Register Player
        </a>
        <a href="/pages/DisplayGameBoard">Board</a>
        <a style={{ marginLeft: '25px' }} href="/components/AvatarList">
          AvatarList
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
