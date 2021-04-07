export default class Scorer {
   static DEFAULTS = {}

   static evaluate (zone, att, dices) {

      let req, reqThree, reqTwo
      let occ = this.occurences(dices)


      if (zone === 'upper') {
         switch (att) {
            case 'ones':
               return occ.one
            case 'twos':
               return occ.two * 2
            case 'threes':
               return occ.three * 3
            case 'fours':
               return occ.four * 4
            case 'fives':
               return occ.five * 5
            case 'sixes':
               return occ.six * 6
         }
      }
      else if (zone === 'lower') {
         switch (att) {
            case 'pair':
               req = this.hasRequiredCount(occ, 2)
               return req.length > 0 ? this.valueFromKey(req[req.length-1].key) * 2 : 0

            case 'twopair':
               req = this.hasRequiredCount(occ, 2)
               return req.length == 2 ? this.valueFromKey(req[0].key) * 2 + this.valueFromKey(req[1].key) * 2 : 0

            case 'three':
               req = this.hasRequiredCount(occ, 3)
               return req.length > 0 ? this.sumOfDices(dices) : 0

            case 'four':
               req = this.hasRequiredCount(occ, 4)
               return req.length > 0 ? this.sumOfDices(dices) : 0

            case 'full':
               reqThree = this.hasRequiredCount(occ, 3)
               reqTwo = this.hasRequiredCount(occ, 2)
               return reqThree.length == 1 && reqTwo.length == 2 ? 25 : 0

            case 'serie':
               return this.isASerie(occ, false) ? 30 : 0

            case 'bigserie':
               return this.isASerie(occ, true) ? 40 : 0

            case 'yahtzee':
               req = this.hasRequiredCount(occ, 5)
               return req.length > 0 ? 50 : 0

            case 'chance':
               return this.sumOfDices(dices)
         }
      }
      else throw Error('Invalid score zone')
   }

   static occurences (dices) {
      return {
         one: dices.filter(x => x.value === 1).length,
         two: dices.filter(x => x.value === 2).length,
         three: dices.filter(x => x.value === 3).length,
         four: dices.filter(x => x.value === 4).length,
         five: dices.filter(x => x.value === 5).length,
         six: dices.filter(x => x.value === 6).length
      }
   }

   static hasRequiredCount (occurences, wishedNumber) {
      let required = []
      for (const [key, value] of Object.entries(occurences)) {
         if (value >= wishedNumber) {
            required.push({ key, value })
         }
      }
      return required
   }

   static sumOfDices (dices) {
      let sum = 0
      Object.values(dices).forEach(x => sum += x.value)
      return sum
   }

   static isASerie (occurences, big) {
      if (big) {
         if (occurences.one || occurences.six) {
            return occurences.two && occurences.three && occurences.four && occurences.five
         }
         return false
      }
      else {
         return (occurences.one && occurences.two && occurences.three && occurences.four)
            || (occurences.two && occurences.three && occurences.four && occurences.five)
            || (occurences.three && occurences.four && occurences.five && occurences.six)
      }
   }

   static valueFromKey (key) {
      switch (key) {
         case 'one': return 1
         case 'two': return 2
         case 'three': return 3
         case 'four': return 4
         case 'five': return 5
         case 'six': return 6
      }
   }
}