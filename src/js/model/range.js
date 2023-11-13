/**
 *
 */

export class RangeSelector {
  /**
   *
   * @param {*} min min number for the range
   * @param {*} max max number for the range
   */
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  random = () => {
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  };
}
