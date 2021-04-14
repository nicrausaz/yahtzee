export default {
   NB_OF_DICES: 5,
   MAX_ROLLS: 3,
   MAX_PLAYERS: 4,
   MAX_TURN: 16,
   POINTS_FOR_FULL: 25,
   POINTS_FOR_SERIE: 30,
   POINTS_FOR_BIGSERIE: 40,
   POINTS_FOR_YAHTZEE: 50,
   BONUS_TO_REACH: 63,
   POINTS_FOR_BONUS: 50,
   SCORE_BOARD: {
      upper: {
         ones: null,
         twos: null,
         threes: null,
         fours: null,
         fives: null,
         sixes: null,
      },
      lower: {
         pair: null,
         twopair: null,
         three: null,
         four: null,
         full: null,
         serie: null,
         bigserie: null,
         yahtzee: null,
         chance: null,
      },
      totals: {
         upper_total: null,
         upper_bonus: null,
         lower_total: null,
         total: null,
      }
   }
}