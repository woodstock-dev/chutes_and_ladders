// TEST for Board.js

import { Space, SpaceType } from "../../src/js/model/space";
import { Avatar, Color } from "../../src/js/model/avatar";
import { Board } from "../../src/js/model/board";

// setup

let board, avatar1, avatar2, start, max

beforeEach(() => {
    
    max = 100
    board = new Board(100, new Space(SpaceType.START, '1'))
    avatar1 = new Avatar('Test Car', Color.RED)
    avatar2 = new Avatar('Test Hat', Color.BLACK)
    start = board.execute()

    start.land(avatar1)
    start.land(avatar2)
})

describe('Test connectivity of spaces within Board', () => {

    test('Test Next method of all Spaces', () => {
        for (let i = 1; i <= max; i++) {            
            if (i === 1) expect(start.type).toBe(SpaceType.START)
            else if (i === max) expect(start.type).toBe(SpaceType.FINISH)
            else expect(start.type).toBe(SpaceType.NORMAL)
            start = start.next
        }
    
    })

    test('Test Previous method', () => {
        expect(start.previous).toBeNull()
        expect(start.next.previous.type).toBe(SpaceType.START)
    })

    test('Test totalSpaces of Board', () => {
        expect(board.totalSpaces).toEqual(expect.any(Number))
    })

})