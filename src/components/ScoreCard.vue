<template>
  <div class="scoretable" :key="$store.state.game.turn.number">
    <v-container>
      <p class="text-right">
        {{
          $t("play.turn_nb", { current: $store.getters.currentTurn, max: 15 })
        }}
      </p>
    </v-container>
    <v-divider></v-divider>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">{{ $t("rules.upper") }}</th>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><v-icon>mdi-dice-1</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="ones" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-2</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="twos" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-3</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="threes" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-4</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="fours" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-5</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="fives" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-6</v-icon></td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="upper" att="sixes" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.total") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_total }}
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.bonus") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_bonus }}
            </th>
          </tr>
          <tr>
            <td>
              <small>{{ $t("play.score_labels.upper_total") }}</small>
            </td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.upper_total + p.scores.totals.upper_bonus }}
            </th>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th class="text-left">{{ $t("rules.lower") }}</th>
            <th class="text-left" v-for="p in players" :key="p.id"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t("play.score_labels.pair") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="pair" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.twopair") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="twopair" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.three") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="three" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.four") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="four" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.full") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="full" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.serie") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="serie" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.bigserie") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="bigserie" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.yahtzee") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="yahtzee" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>{{ $t("play.score_labels.chance") }}</td>
            <th class="text-left" v-for="p in players" :key="p.id">
              <EditableScoreRow zone="lower" att="chance" :id="p.id" />
            </th>
          </tr>
          <tr>
            <td>
              <small>{{ $t("play.score_labels.lower_total") }}</small>
            </td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.lower_total }}
            </th>
          </tr>
          <tr>
            <td>
              <b>{{ $t("play.score_labels.final_total") }}</b>
            </td>
            <th class="text-left" v-for="p in players" :key="p.id">
              {{ p.scores.totals.total }}
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
  computed: {
    players () {
      return this.$store.state.players
    }
  }
}
</script>