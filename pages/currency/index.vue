<template>
  <div>
    <v-container>
      <v-row>
        <v-col :cols="12" :md="3" :lg="3" :sm="12" :xs="12">
          <v-row>
            <v-col :cols="12" :md="5" :lg="5" :sm="12" :xs="12">
              <v-switch
                v-model="is_switched"
                class="ml-6 mt-4"
                :label="is_switched ? $t('Arbitrage') : $t('Spot')"
              ></v-switch>
            </v-col>
            <v-col :cols="12" :md="7" :lg="7" :sm="12" :xs="12">
              <v-autocomplete
                class="crypto-select ml-4 mt-4"
                v-model="curr_id"
                :items="currencies"
                item-text="name"
                item-value="id"
                outlined
                dense
                hide-details
                :label="$t('cryptocurrency')"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="12" :md="9" :lg="9" :sm="12" :xs="12">
          <Indicators
            v-if="!is_switched"
            :currency="curr_code"
            :price="price"
            :change="change"
          ></Indicators>
          <Platforms
            v-else
            :currency="curr_code"
            @clicked="platform_changed"
          ></Platforms>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
          <v-row class="ml-4">
            <v-col class="d-flex justify-center">
              <TradeGraph
                :width="graphWidth"
                :height="graphHeight"
                :ovls="is_switched"
                :currency="curr_code ? curr_code : undefined"
                :platform="selected_platform"
              ></TradeGraph>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <TableTrades v-if="!is_switched"></TableTrades>
              <TableASession v-else></TableASession>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="12" :md="4" :lg="4" :sm="12" :xs="12">
          <SpotCard v-if="!is_switched" :currency="curr_code" :price="price"></SpotCard>
          <TableAC
            v-else
            :currency="curr_code ? curr_code : undefined"
            :currencies="currencies"
            :current="current"
          ></TableAC>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Indicators from "~/components/elements/currencies/Indicators";
import TradeGraph from "~/components/graphs/Trade";
import TableTrades from "~/components/data/TableTrades";
import TableAC from "~/components/data/TableAC";
import TableASession from "~/components/data/TableASession";
import SpotCard from "~/components/elements/currencies/SpotCard";
import Platforms from "~/components/elements/currencies/Platforms";
const model = "data/currency";

export default {
  components: {
    Indicators,
    TradeGraph,
    TableTrades,
    TableAC,
    Platforms,
    SpotCard,
    TableASession,
  },
  data() {
    return {
      is_switched: false,
      curr_id: null,
      curr_code: null,
      current: {},
      graphWidth: parseInt(((window.innerWidth - 250) * 2) / 3),
      graphHeight: 500,
      selected_platform: "binance",
      price: null,
      change: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies: "list",
      curr_by_id: "byId",
    }),
  },
  watch: {
    curr_id() {
      this.current = this.curr_by_id(this.curr_id) || {};
      this.curr_code = this.current.symbol;
    },
    curr_code() {
      let me = this;
      if (this.curr_code) {
        socket.send(`{
          "method": "subscribe",
          "data": ["binance_${me.curr_code}-USDT@ticker_5s"]
        }`);
        socket.onmessage = function (event) {
          if (event.data) {
            let json_d = JSON.parse(event.data);
            if (
              json_d &&
              json_d.method == `binance_${me.curr_code}-USDT@ticker_5s`
            ) {
              let data = json_d.data ? json_d.data.data || [] : [];
              if (data && data[0] && data[0].price) {
                me.price = data[0].price;
                me.change = data[0].change;
              } else {
                me.price = 1;
                me.change = 0;
              }
            }
          }
        };
      }
    },
  },
  methods: {
    ...mapActions(model, {
      fetchCurrencies: "fetchList",
    }),
    ...mapActions("data/arbitrage_company", {
      fetchAC: "fetchList",
    }),
    ...mapActions("data/trade", {
      fetchTrades: "fetchList",
    }),
    ...mapActions("data/arbitrage_session", {
      fetchAS: "fetchList",
    }),
    onResize(event) {
      this.graphWidth = parseInt(((window.innerWidth - 250) * 2) / 3);
    },
    initGrpaphWidth() {},
    platform_changed(platform) {
      this.selected_platform = platform;
    },
  },
  created() {
    this.fetchAC();
    this.fetchAS();
    this.fetchTrades();
  },
  async mounted() {
    await this.fetchCurrencies();
    if (this.$router.currentRoute.query && this.$router.currentRoute.query.id) {
      this.curr_id = parseInt(this.$router.currentRoute.query.id);
    }
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["binance_${this.curr_code}-USDT@ticker_5s"]
    }`);
  },
};
</script>
<style scoped>
.crypto-select {
  width: 160px;
}
</style>
