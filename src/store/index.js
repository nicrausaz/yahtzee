import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    game: {
      turn: {
        to: 0,
        leftRolls: 3,
        dices: [
          { id: 1, locked: false, value: 1 },
          { id: 2, locked: false, value: 2 },
          { id: 3, locked: false, value: 3 },
          { id: 4, locked: false, value: 4 },
          { id: 5, locked: false, value: 5 }
        ]
      },
    },
  },
  mutations: {
    createPlayer (state, name) {
      state.players[state.players.length] = {
        id: state.players.length, name: name, scores: {
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
            lower_total: null
          }
        }
      }
    },
    toggleDiceLock (state, id) {
      state.game.turn.dices.find(x => x.id === id).locked = !state.game.turn.dices.find(x => x.id === id).locked
    },
    setDiceValue (state, { id, value }) {
      state.game.turn.dices.find(x => x.id === id).value = value
    },
    setLeftRools (state, value) {
      state.game.turn.leftRolls = value
    },
    nextTurn (state) {
      state.game.turn.to = ((state.game.turn.to + 1) % state.players.length)
    },
    setScoreRowValue (state, { id, zone, att, value }) {
      state.players[id].scores[zone][att] = value
    }
  },
  actions: {
    async initGame (context, players) {
      players.forEach(p => context.commit('createPlayer', p))
    },
    rollDices (context) {
      context.commit('setLeftRools', this.state.game.turn.leftRolls - 1)

      this.state.game.turn.dices.forEach(dice => {
        if (!dice.locked) {
          context.commit('setDiceValue', { id: dice.id, value: (Math.floor(Math.random() * 6) + 1) })
        }
      })
    },
    editScore (context, { id, zone, att }) {

      // TODO: Apply score
      if (zone === 'upper') {
        switch (att) {
          case 'ones':
            console.log(this.state.game.turn.dices.filter(x => x.value === 1).length)
            context.commit('setScoreRowValue', { id, zone, att, value: this.state.game.turn.dices.filter(x => x.value === 1).length })
            break
        }
      }
      else if (zone === 'lower') {
        //
      }
      else throw Error('Invalid score zone')

      // TODO: Update global scores
    },
    nextTurn (context) {
      context.commit('nextTurn')
    }
  },
  getters: {
    currentTurnPlayerName (state) {
      return state.players.find(x => x.id === state.game.turn.to).name
    }
  }
})
