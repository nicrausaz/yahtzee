import Vue from 'vue'
import Vuex from 'vuex'
import Scorer from './Scorer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    game: {
      turn: {
        to: 0,
        number: 1,
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
      state.game.turn.number++
      state.game.turn.leftRolls = 3
    },
    resetDices (state) {
      state.game.turn.dices.forEach(x => x.locked = false)
    },
    setScoreRowValue (state, { id, zone, att, value }) {
      state.players[id].scores[zone][att] = value
    },
    refreshTotals (state, id) {
      state.players[id].scores.totals.upper_total = Object.values(state.players[id].scores.upper).reduce((a, b) => a + b)
      state.players[id].scores.totals.lower_total = Object.values(state.players[id].scores.lower).reduce((a, b) => a + b)

      if (state.players[id].scores.totals.upper_total >= 63) {
        state.players[id].scores.totals.upper_total = 50
      }
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

      let result = Scorer.evaluate(zone, att, this.state.game.turn.dices)

      context.commit('setScoreRowValue', { id, zone, att, value: result })

      context.commit('refreshTotals', id)
    },
    nextTurn (context) {
      context.commit('nextTurn')
      context.commit('resetDices')
    }
  },
  getters: {
    currentTurnPlayerName (state) {
      return state.players.find(x => x.id === state.game.turn.to).name
    },
    currentTurn (state) {
      return Math.ceil(state.game.turn.number / state.players.length)
    },
    gameIsOver (state) {
      return Math.ceil(state.game.turn.number / state.players.length) == 16
    }
  }
})
