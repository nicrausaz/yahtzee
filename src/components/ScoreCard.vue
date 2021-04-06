<template>
  <div class="scoretable">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Partie supérieure</th>
            <th class="text-left">P1</th>
            <th class="text-left">P2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><v-icon>mdi-dice-1</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-2</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-3</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-4</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-5</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><v-icon>mdi-dice-6</v-icon></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><small>Total de la partie supérieure</small></td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Partie inférieure</th>
            <th class="text-left"> </th>
            <th class="text-left"> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 paire</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>2 paire</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Brelan</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Carré</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Full</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Petite suite</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Grande suite</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Yahtzee</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Chance</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><small>Total de la partie inférieure</small></td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td><b>Total final</b></td>
            <td><b></b></td>
            <td><b></b></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {

}
</script>