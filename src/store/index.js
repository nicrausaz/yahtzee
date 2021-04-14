import Vue from 'vue'
import Vuex from 'vuex'
import Scorer from './Scorer'
import Defaults from './Defaults.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    game: {
      turn: {
        to: 0,
        number: 1,
        leftRolls: Defaults.MAX_ROLLS,
        dices: []
      },
    },
  },
  mutations: {
    createPlayer (state, name) {
      state.players[state.players.length] = { id: state.players.length, name: name, scores: JSON.parse(JSON.stringify(Defaults.SCORE_BOARD)) }
    },
    createDice (state, id) {
      state.game.turn.dices.push({ id: id, locked: false, value: id })
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
      state.game.turn.leftRolls = Defaults.MAX_ROLLS
    },
    resetGame (state, clearPlayers) {
      state.players.forEach(p => p.scores = JSON.parse(JSON.stringify(Defaults.SCORE_BOARD)))
      state.game.turn.to = 0
      state.game.turn.number = 1
      state.game.turn.leftRolls = Defaults.MAX_ROLLS
      state.game.turn.dices = []

      if (clearPlayers) {
        state.players = []
      }
    },
    unlockDices (state) {
      state.game.turn.dices.forEach(x => x.locked = false)
    },
    setScoreRowValue (state, { id, zone, att, value }) {
      state.players[id].scores[zone][att] = value
    },
    refreshTotals (state, id) {
      state.players[id].scores.totals.upper_total = Object.values(state.players[id].scores.upper).reduce((a, b) => a + b)
      state.players[id].scores.totals.lower_total = Object.values(state.players[id].scores.lower).reduce((a, b) => a + b)

      if (state.players[id].scores.totals.upper_total >= Defaults.BONUS_TO_REACH) {
        state.players[id].scores.totals.upper_bonus = Defaults.POINTS_FOR_BONUS
      }
      state.players[id].scores.totals.total = state.players[id].scores.totals.upper_total + state.players[id].scores.totals.upper_bonus + state.players[id].scores.totals.lower_total
    }
  },
  actions: {
    async initGame (context, players) {
      // TODO: Clear invalid players (empty)
      players.forEach(p => context.commit('createPlayer', p))

      for (let i = 1; i <= Defaults.NB_OF_DICES; i++) {
        context.commit('createDice', i);
      }
    },
    replay (context) {
      context.commit('resetGame', false)
      for (let i = 1; i <= Defaults.NB_OF_DICES; i++) {
        context.commit('createDice', i);
      }
    },
    abortGame (context) {
      context.commit('resetGame', true)
    },
    rollDices (context) {
      context.commit('setLeftRools', this.state.game.turn.leftRolls - 1)

      this.state.game.turn.dices.forEach(dice => {
        if (!dice.locked) {
          context.commit('setDiceValue', { id: dice.id, value: (Math.floor(Math.random() * Defaults.NB_OF_DICES + 1) + 1) })
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
      context.commit('unlockDices')
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
      return Math.ceil(state.game.turn.number / state.players.length) == Defaults.MAX_TURN
    },
    playersRanking (state) {
      return state.players.sort((a, b) => a.scores.totals.total - b.scores.totals.total)
    }
  }
})
