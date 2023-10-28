  get boardSetup() {
    let totalSpaces = this.#TotalSpaces;
    let totalRows = totalSpaces / 10;
    let space = this.#StartSpace;
    let dummyNode = null;
    let board = [];
    let rowMult = 0;
    let ladders = []
    let lCount = 1;
    let chutes = []
    let cCount = 1;

    for (let i = totalRows; i >= 1; i--) {
      let row = [];
      let l = this.randomSpaceSelector(2, 10);
      let c = this.randomSpaceSelector(1, 9);
      for (let j = 1; j <= 10; j++) {
        let spaceVal = j + rowMult + 1;
        row.push(space);
        if (i === 1 && j === 10) {
          dummyNode = space.previous
          space = new Space(SpaceType.FINISH, "Finish");
          dummyNode.next = space
          break
        } else if (i % 2 === 0 && l === j) {
          dummyNode = space;
          ladders.push(space);
          space.next = new Space(SpaceType.LADDER, 'L');
          space = space.next;
          space.previous = dummyNode;
          lCount++;
        } else if (i % 2 !== 0 && c === j) {
          dummyNode = space;
          chutes.push(space);
          space.next = new Space(SpaceType.CHUTE, "C");
          space = space.next;
          space.previous = dummyNode;
          cCount++;
        } else {
          dummyNode = space;
          space.next = new Space(SpaceType.NORMAL, spaceVal);
          space = space.next;
          space.previous = dummyNode;
        }
      }
      row = i % 2 == 0 ? row : row.reverse();
      board.push(row);
      rowMult += 10;
    }
    this.#Ladders = ladders
    this.#Chutes = chutes
    return board;
  }