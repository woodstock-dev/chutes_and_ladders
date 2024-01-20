const curGame = () => {
  return import('../../../src/js/model/chutes_and_ladders.js')
    .then((mod) => {
      return new mod.ChutesAndLadders(5, 5);
    })
    .then((data) => {
      return data;
    });
};

exports.curGame = curGame;
