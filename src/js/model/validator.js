
import { Avatar, Color } from "./avatar";
import { Space, SpaceType } from "./space";

/**
 * 
 * @param {Space} space the space to validate 
 * @returns true if valid, false if not
 * 
 */


export const ValidateStart = (space) => {
    return space !== undefined && space.type === SpaceType.START && space.next !== undefined
}

export const ValidateFinish = (space) => {
    return space !== undefined && space.type === SpaceType.FINISH && space.next === null  
}

export const ValidateChute = (space) => {
    return space !== undefined && space.type === SpaceType.CHUTE && space.special !== null
}

export const ValidateLadder = (space) => {
    return space !== undefined && space.type === SpaceType.LADDER && space.special !== null
}

export const ValidateLand = (space, avatar) => {
    return avatar.location = space && space.occupied === true
}

export const ValidateLeave = (space) => {
    space.leave()
    return space.occupied === false
}

export const ValidateNextNormal = (space) => {
    return space = space.next
}

export const ValidateNextSpecial = (space) => {
    if (space.next.special !== null) return space = space.next.special
}


/**
 * 
 * @param {Avatar} avatar test the avatar methods
 * @returns true if valid, false if not
 * 
 */

export const ValidateAvatarColor = (avatar) => {
    return avatar.color > 0 && avatar.color < 11
}

export const ValidateAvatarName = (avatar) => {
    return typeof avatar.name === 'string'
}

//NO IDEA HOW TO PUT THEM ALL TOGETHER, ALL THE ARGUMENTS ARE DIFFERENT
// export const ValidateValues = (space, avatar) => {
    // if (ValidateStart(space) && ValidateFinish(space) && ValidateChute(space) && ValidateLadder(space) && ValidateLand(space) && ValidateLeave(space) && ValidateNextNormal(space, avatar) && ValidateNextNormal(space, avatar) && ValidateNextSpecial(space, avatar))  return true
    // return false
// }

