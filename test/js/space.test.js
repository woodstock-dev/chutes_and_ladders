// TEST CASES FOR SPACE MODULE

import { Space } from "../../src/js/model/space";
import { Avatar, Color } from "../../src/js/model/avatar";
import { SpaceType } from "../../src/js/model/space";



    // Setup of spaces & avatars    
let s1, Ladder, s3, s4, s5, s6, s7, s8, Chute, s10, avatar1, avatar2

beforeEach(() => {

    s1 = new Space(SpaceType.START, '1')
    Ladder = new Space(SpaceType.LADDER, '2')
    s3 = new Space(SpaceType.NORMAL, '3')
    s4 = new Space(SpaceType.NORMAL, '4')
    s5 = new Space(SpaceType.NORMAL, '5')
    s6 = new Space(SpaceType.NORMAL, '6')
    s7 = new Space(SpaceType.NORMAL, '7')
    s8 = new Space(SpaceType.NORMAL, '8')
    Chute = new Space(SpaceType.CHUTE, '9')
    s10 = new Space(SpaceType.FINISH, '10')

    s1.next = Ladder
    Ladder.next = s3
    Ladder.special = s5
    s3.next = s4
    s4.next = s5
    s5.next = s6
    s6.next = s7
    s7.next = s8
    s8.next = Chute
    Chute.next = s10
    Chute.special = s3

    Ladder.previous = s1
    s3.previous = Ladder
    s4.previous = s3
    s5.previous = s4
    s6.previous = s5
    s7.previous = s6
    s8.previous = s7
    Chute.previous = s8
    s10.previous = Chute
    

    avatar1 = new Avatar('Test Car', Color.RED)
    avatar2 = new Avatar('Test Hat', Color.BLACK)
    s1.land(avatar1) 
    s1.land(avatar2)

})
    
describe('Connectivity and functionality of space.js', () => {

    test('Test for #Next of Spaces', () => {
        
        expect(s1.next).toBe(Ladder)
        expect(Ladder.next).toBe(s3)
        expect(s3.next).toBe(s4)
        expect(s4.next).toBe(s5)
        expect(s5.next).toBe(s6)
        expect(s6.next).toBe(s7)
        expect(s7.next).toBe(s8)
        expect(s8.next).toBe(Chute)
        expect(Chute.next).toBe(s10)
    })
    
    test('Test for #Type of Spaces', () => {
        
        expect(s1.type).toBe(SpaceType.START)
        expect(Ladder.type).toBe(SpaceType.LADDER)
        expect(s3.type).toBe(SpaceType.NORMAL)
        expect(s4.type).toBe(SpaceType.NORMAL)
        expect(s5.type).toBe(SpaceType.NORMAL)
        expect(s6.type).toBe(SpaceType.NORMAL)
        expect(s7.type).toBe(SpaceType.NORMAL)
        expect(s8.type).toBe(SpaceType.NORMAL)
        expect(Chute.type).toBe(SpaceType.CHUTE)
        expect(s10.type).toBe(SpaceType.FINISH)
    })
    
    test('Test for #Special of Spaces', () => {
        
        expect(s1.special).toBeNull()
        expect(Ladder.special).toBeInstanceOf(Space)
        expect(s3.special).toBeNull()
        expect(s4.special).toBeNull()
        expect(s5.special).toBeNull()
        expect(s6.special).toBeNull()
        expect(s7.special).toBeNull()
        expect(s8.special).toBeNull()
        expect(Chute.special).toBeInstanceOf(Space)
        expect(s10.special).toBeNull()
    })
})
  
describe('Test of move function starting from beginning space and #Players array', () => {
    
    
    test('Test Special Space and Occupied method', () => {
        
        expect(s1.players.length).toBe(2)
        expect(s1.occupied).toBeTruthy()
        avatar1.move(1)
        avatar2.move(1)
        expect(s1.players.length).toBe(0)
        expect(avatar1.location).toEqual(s6)
        expect(avatar2.location).toEqual(s5)
        expect(s5.players.length).toBe(1)
        expect(s5.occupied).toBeTruthy()
        expect(s6.players.length).toBe(1)
        expect(s6.occupied).toBeTruthy()
    })
    test('Move 2 Spaces, land, leave, occupied and previous', () => {

        expect(s1.players.length).toBe(2)
        expect(s1.occupied).toBeTruthy()
        avatar1.move(3)
        avatar2.move(5)
        expect(s1.players.length).toBe(0)
        expect(avatar1.location).toEqual(s4)
        expect(s4.players.length).toBe(1)
        expect(s4.occupied).toBeTruthy()
        expect(avatar2.location).toBe(s6)
        expect(s6.players.length).toBe(1)
        expect(s6.occupied).toBeTruthy()
    })

    test('Test Break statement of move method in Avatar - line 55', () => {
        avatar1.move(9000)
        expect(avatar1.location).toBe(s10)
    })
    
    test('Test Previous', () => {
        expect(s1.previous).toBeNull()
        expect(s5.previous).toBe(s4)
    })  
    test('Test correct Avatar in player array after move is called', () => {
        avatar1.move(2)
        expect(s1.players[0].name).toBe('Test Hat')
    })
})
describe('Test of User Defined Input Methods', () => {

    test('Test Avatar Name and Color / Space Value', () => {
        expect(avatar1.color).toBe(Color.RED)
        expect(avatar2.color).toBe(Color.BLACK)
        expect(avatar1.name).toBe('Test Car')
        expect(avatar2.name).toBe('Test Hat')
        expect(s1.value).toBe('1')
    })
})