<template>
  <v-row>
    <v-col
      :cols="12"
      :md="2"
      :lg="2"
      :sm="12"
      :xs="12"
      v-for="(val, i) in indicators"
      :key="i"
    >
      <p class="ma-0 pa-0 mt-3">{{ val.title }}</p>
      <p class="ma-0 pa-0 mt-1">{{ val.value }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      indicators: [
        {
          title: "Current",
          value: 100.16,
        },
        {
          title: "24H Change",
          value: 0.11,
        },
        {
          title: "24H High",
          value: 101.51,
        },
        {
          title: "24H Low",
          value: 99.34,
        },
        {
          title: "24H Turnover(USD)",
          value: 233877.0,
        },
        {
          title: "24H Volume(BTC)",
          value: 233.0,
        },
      ],
    };
  },
};
</script>
