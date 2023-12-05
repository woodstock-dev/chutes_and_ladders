// The rules file contains rules and validation functions for the game.
import { ValidateFinish, ValidateStart } from './validator';
const LastSpaceValidator = (space) => {
  // TODO - implement a rule that determines if the space is the last space
  return ValidateFinish(space);
};

const FirstSpaceValidator = (space) => {
  // TODO - implement a rule that determines if a space is the first space
  return ValidateStart(space);
};

export default { LastSpaceValidator, FirstSpaceValidator };
