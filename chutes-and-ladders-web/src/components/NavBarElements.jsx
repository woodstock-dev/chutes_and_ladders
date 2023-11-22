import React from 'react';

const NavBar = () => {
  return (
    <div>
      <nav>
        <a style={{ marginRight: '100px', marginLeft: '100px' }} href="/pages/GameSetup">
          Game Setup
        </a>
        <a href="/pages/Try">Board</a>
      </nav>
    </div>
  );
};

export default NavBar;
