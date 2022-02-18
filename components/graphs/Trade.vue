<template>
  <!-- <trading-vue
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
      ref="tvjschart"
    ></trading-vue> -->
  <!-- TradingView Widget BEGIN -->
  <div class="tradingview-widget-container" id="root-tradingview">
    <div id="tradingview_22087"></div>
    <div class="tradingview-widget-copyright"></div>
  </div>
  <!-- TradingView Widget END -->
</template>
<script>
import { DataCube } from "trading-vue-js";
import TradingVue from "trading-vue-js";
import Data from "./data.json";
import TestOverlay from "./TestOverlay";

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
    },
    ovls: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: new DataCube(Data),
      overlays: [],
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
    },
  },
  watch: {
    ovls() {
      if (this.ovls) {
        this.overlays = [TestOverlay];
      } else {
        this.overlays = [];
      }
      if (this.$refs.tvjschart) {
        this.$refs.tvjschart.resetChart();
      }
    },
  },
  mounted() {
    let dcr = document.createElement("script");
    dcr.setAttribute("type", "text/javascript");
    dcr.setAttribute("src", "https://s3.tradingview.com/tv.js");
    document.getElementById("root-tradingview").appendChild(dcr);
    setTimeout(() => {
      let crtobj = document.createElement("script");
      crtobj.setAttribute("type", "text/javascript");
      crtobj.innerHTML = `new TradingView.widget(
      {
        "width": 980,
        "height": 610,
        "symbol": "BYBIT:BTCUSD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "ru",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_22087"
      }
      );`;
      document.getElementById("root-tradingview").appendChild(crtobj);
    }, 1000);
  },
};
</script>