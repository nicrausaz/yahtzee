<template>
  <div>
    <b>{{ $t("rules.title") }}</b>
    <br />
    <i>{{ $t("rules.upper") }}</i>
    <ul>
      <li>{{ $t("rules.ones") }}</li>
      <li>{{ $t("rules.twos") }}</li>
      <li>{{ $t("rules.threes") }}</li>
      <li>{{ $t("rules.fours") }}</li>
      <li>{{ $t("rules.fives") }}</li>
      <li>{{ $t("rules.sixes") }}</li>
      <li>{{ $t("rules.bonus") }}</li>
    </ul>
    <br />
    <i>{{ $t("rules.lower") }}</i>
    <ul>
      <li>{{ $t("rules.pair") }}</li>
      <li>{{ $t("rules.twopair") }}</li>
      <li>{{ $t("rules.three") }}</li>
      <li>{{ $t("rules.four") }}</li>
      <li>{{ $t("rules.full") }}</li>
      <li>{{ $t("rules.serie") }}</li>
      <li>{{ $t("rules.bigserie") }}</li>
      <li>{{ $t("rules.yahtzee") }}</li>
      <li>{{ $t("rules.chance") }}</li>
    </ul>
    <br />
    {{ $t("rules.notice") }}
  </div>
</template>