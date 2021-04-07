<template>
  <div class="scoretable" :key="turn">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Partie supérieure</th>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><v-icon>mdi-dice-1</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="ones"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-2</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="twos"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-3</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="threes"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-4</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="fours"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-5</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="fives"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-6</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="upper"
                att="sixes"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Total</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_total }}
            </th>
          </tr>
          <tr>
            <td>Bonus</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_bonus }}
            </th>
          </tr>
          <tr>
            <td><small>Total supérieur</small></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_total + p.scores.totals.upper_bonus }}
            </th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Partie inférieure</th>
            <th class="text-left" v-for="p in players" :key="p.id"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 paire</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow
                zone="lower"
                att="pair"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>2 paire</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="twopair"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Brelan</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="three"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Carré</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="four"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Full</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="full"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Petite suite</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="serie"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Grande suite</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="bigserie"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Yahtzee</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="yahtzee"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td>Chance</td>
            <th class="text-left" v-for="p in players" :key="p.id">
               <EditableScoreRow
                zone="lower"
                att="chance"
                :id="p.id"
                @added="incr"
              />
            </th>
          </tr>
          <tr>
            <td><small>Total inférieur</small></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.lower_total }}
            </th>
          </tr>
          <tr>
            <td><b>Total final</b></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{
                p.scores.totals.upper_total +
                p.scores.totals.upper_bonus +
                p.scores.totals.lower_total
              }}
            </th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import EditableScoreRow from '@/components/EditableScoreRow.vue'

export default {
  components: { EditableScoreRow },
  data: () => ({ turn: 1 }),
  computed: {
    players () {
      return this.$store.state.players
    }
  },
  methods: {
    incr () {
      this.turn++
    }
  }
}
</script>