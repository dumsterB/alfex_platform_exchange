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
      <p class="ma-0 pa-0 mt-1">{{ val.value.toFixed(4) }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      default: "btc",
    },
  },
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
  watch: {
    currency() {
      let indicator = this.indicators;
      indicator.forEach((el) => {
        el.value = (0.5 + Math.random()) * el.value;
      });
      this.indicators = Object.assign([], indicator);
    },
  },
};
</script>
