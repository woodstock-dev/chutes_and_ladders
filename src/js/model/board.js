/*
Only needs to have a start space and number of spaces
Test in beforeAll - reset after each test

Setup is where you design the spaces and run the players through the spaces
*/

import { Space, SpaceType } from "./space.js";

export class Board  {
    #TotalSpaces = 0
    #StartSpace = null


    constructor(totalSpaces, startSpace) {
        this.#TotalSpaces = totalSpaces
        this.#StartSpace = startSpace
    }

    get totalSpaces() {
        return this.#TotalSpaces
    }

    get startSpace() {
        this.#StartSpace = this.boardSetup[0][0]
        return this.#StartSpace
    }
    
    get boardSetup() {
    
        let totalSpaces = this.#TotalSpaces
        let totalRows = totalSpaces/10
        let space = this.#StartSpace
        let dummyNode = null
        let board = []      
        let rowMult = 0
        for (let i = totalRows; i >= 1; i--) {
            let row = []
            for (let j = 1; j<=10;j++) {
                let spaceVal = j + rowMult
                if (i === totalRows && j === 1) {
                    space.previous = dummyNode
                    row.push(space) 
                }
                else {
                    if (i === 1 && j === 10) {
                        dummyNode = space
                        space.next = new Space(SpaceType.FINISH, j)
                        space = space.next
                        space.previous = dummyNode
                        row.push(space)
                    }
                    else {
                        dummyNode = space
                        space.next = new Space(SpaceType.NORMAL, spaceVal)
                        space = space.next
                        space.previous = dummyNode
                        row.push(space)
                    } 
                }
            }
            row = (i%2==0) ? row : row.reverse()
            board.push(row)
            rowMult+=10
        }      
        return board
    }
}
