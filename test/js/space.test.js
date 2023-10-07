// TEST CASES FOR SPACE MODULE

import { Space } from "../../src/js/model/space";
import { Avatar } from "../../src/js/model/avatar";
import { SpaceType } from "../../src/js/model/space";


    // Setup of spaces & avatar
    
const s1 = new Space(SpaceType.START, '1')
const Ladder = new Space(SpaceType.LADDER, '2')
const s3 = new Space(SpaceType.NORMAL, '3')
const s4 = new Space(SpaceType.NORMAL, '4')
const s5 = new Space(SpaceType.NORMAL, '5')
const s6 = new Space(SpaceType.NORMAL, '6')
const s7 = new Space(SpaceType.NORMAL, '7')
const s8 = new Space(SpaceType.NORMAL, '8')
const Chute = new Space(SpaceType.CHUTE, '9')
const s10 = new Space(SpaceType.FINISH, '10')

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

const avatar = new Avatar('Test Car')

describe('Connectivity and functionality of space.js', () => {

    test('Test for #Value of Spaces', () => {
        
        expect(s1.value).toBe('1')
        expect(Ladder.value).toBe('2')
        expect(s3.value).toBe('3')
        expect(s4.value).toBe('4')
        expect(s5.value).toBe('5')
        expect(s6.value).toBe('6')
        expect(s7.value).toBe('7')
        expect(s8.value).toBe('8')
        expect(Chute.value).toBe('9')
        expect(s10.value).toBe('10')
        
    })
    
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
        
        expect(s1.special).toBe(null)
        expect(Ladder.special).toBeInstanceOf(Space)
        expect(s3.special).toBe(null)
        expect(s4.special).toBe(null)
        expect(s5.special).toBe(null)
        expect(s6.special).toBe(null)
        expect(s7.special).toBe(null)
        expect(s8.special).toBe(null)
        expect(Chute.special).toBeInstanceOf(Space)
        expect(s10.special).toBe(null)
    })
})
  
describe('Test of move function starting from beginning space and #Players array', () => {
    
    beforeEach(() => {
        s1.land(avatar)
    })
    
    test('Move 1 space, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(1)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s5)
        expect(s5.players.length).toBe(1)
        expect(s5.occupied).toBeTruthy()
    })
    test('Move 2 Spaces, land, leave, occupied', () => {

        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(2)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s3)
        expect(s3.players.length).toBe(1)
        expect(s3.occupied).toBeTruthy()
    })
    
    test('Move 3 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(3)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s4)
        expect(s4.players.length).toBe(1)
        expect(s4.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 4 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(4)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s5)
        expect(s5.players.length).toBe(1)
        expect(s5.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 5 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(5)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s6)
        expect(s6.players.length).toBe(1)
        expect(s6.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 6 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(6)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s7)
        expect(s7.players.length).toBe(1)
        expect(s7.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 7 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(7)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s8)
        expect(s8.players.length).toBe(1)
        expect(s8.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 8 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(8)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s3)
        expect(s3.players.length).toBe(1)
        expect(s3.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })
    
    test('Move 9 Spaces, land, leave, occupied', () => {
        
        expect(s1.players.length).toBe(1)
        expect(s1.occupied).toBeTruthy()
        avatar.move(9)
        expect(s1.players.length).toBe(0)
        expect(avatar.location).toEqual(s10)
        expect(s10.players.length).toBe(1)
        expect(s10.occupied).toBeTruthy()
        expect(s1.occupied).toBeFalsy()
    })        
})