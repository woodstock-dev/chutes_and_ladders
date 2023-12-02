class Game {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class GameList {
  constructor() {
    this.message = 'Shall we play a game?';
    this.games = [new Game(1, 'Chutes and Ladders'), new Game(2, 'Tic Tac Toe')];
  }
}

exports.Game = Game;
exports.GameList = GameList;
