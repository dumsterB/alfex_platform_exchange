<template>
  <trading-vue
    :data="chart"
    :width="width"
    :height="height"
    :title-txt="title"
    :toolbar="true"
    :overlays="overlays"
    :color-back="colors.back"
    :color-grid="colors.grid"
    :color-text="colors.text"
    :color-cross="colors.cross"
    :color-candle-dw="colors.candle_dw"
    :color-wick-dw="colors.wick_dw"
    :color-title="colors.tvTitle"
  ></trading-vue>
</template>
<script>
import { DataCube } from 'trading-vue-js'
import TradingVue from "trading-vue-js";
import Data from './data.json'

export default {
  name: "app",
  components: { TradingVue },
  props: {
    title: {
      type: String,
      default: "USD",
    },
    width: {
      type: Number,
      default: 700,
    },
    height: {
      type: Number,
      default: 500,
    }
  },
  data() {
    return {
      chart: new DataCube(Data),
      overlays: []
    };
  },
  computed: {
    colors() {
      return this.$vuetify.theme.dark
        ? {
            back: "#121827",
            grid: "#3e3e3e",
            text: "#35a776",
            cross: "#dd64ef",
            candle_dw: "#e54077",
            wick_dw: "#e54077",
          }
        : {
            back: "#fff",
            grid: "#eee",
            text: "#333",
            candle_dw: "black",
            wick_dw: "black",
          };
    }
  },
};
</script>