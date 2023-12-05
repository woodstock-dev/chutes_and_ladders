import { Space, SpaceType } from './space';

/**
 *
 * @param {Space} space the space to validate
 * @returns true if valid, false if not
 *
 */
export class Validators {
  ValidateStart = (space) => {
    return space !== undefined && space.type === SpaceType.START && space.next !== undefined;
  };

  ValidateFinish = (space) => {
    return space !== undefined && space.type === SpaceType.FINISH && space.next === null;
  };

  ValidateChute = (space) => {
    return space !== undefined && space.type === SpaceType.CHUTE && space.special !== null;
  };

  ValidateLadder = (space) => {
    return space !== undefined && space.type === SpaceType.LADDER && space.special !== null;
  };

  ValidateSpace = (space) => {
    return space !== undefined && space.type === SpaceType.NORMAL && space.next !== null;
  };
}

//NO IDEA HOW TO PUT THEM ALL TOGETHER, ALL THE ARGUMENTS ARE DIFFERENT
// export const ValidateValues = (space, avatar) => {
// if (ValidateStart(space) && ValidateFinish(space) && ValidateChute(space) && ValidateLadder(space) && ValidateLand(space) && ValidateLeave(space) && ValidateNextNormal(space, avatar) && ValidateNextNormal(space, avatar) && ValidateNextSpecial(space, avatar))  return true
// return false
// }
