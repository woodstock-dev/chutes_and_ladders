import {Space}
const specialMaker = () => {
    let specials = []
    let uniqueSpaceVals = new Set()

    let chutes = []
    let ladders = []

    // creates a set of unique values for the space.value of chutes and ladders spaces
    while(uniqueSpaceVals.size < 10) {
      let spaceVal = this.randomSelector(2,99)
      uniqueSpaceVals.add(spaceVal)
    }

    // organizes and guarantees 5 spaces of chutes and 5 of ladders
    let i = 0
    uniqueSpaceVals.forEach(spaceValue => {
      // console.log(i%2, spaceValue)
      if (spaceValue < 10 && i % 2 === 0) spaceValue = spaceValue + 10 // if the space value is in the starting row, add 10 so the chute can be valid
      if (spaceValue > 89 && i % 2 !== 0) spaceValue = spaceValue - 10 // if the space value is in the final row, subtract 10 so the ladder can be valid
      i % 2 === 0 ? specials.push(new Space(SpaceType.CHUTE, spaceValue)) : specials.push(new Space(SpaceType.LADDER, spaceValue))
      i++
      
    })
    
    // specials.push(chutes)            
    // specials.push(ladders)

    return specials // assigns and returns a 2d array with idx 0 being array of chutes and idx 1 being array of ladders 
  }

console.log(specialMaker())










