<template>
  <div>
    <v-container>
      <v-row>
        <v-col :cols="12" :md="3" :lg="3">
          <v-row>
            <v-col :cols="12" :md="5" :lg="5">
              <v-switch
                v-model="is_switched"
                class="ml-6 mt-4"
                :label="is_switched ? $t('Arbitrage') : $t('Spot')"
              ></v-switch>
            </v-col>
            <v-col :cols="12" :md="7" :lg="7">
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
        <v-col :cols="12" :md="9" :lg="9">
          <Indicators
            v-if="!is_switched"
            :currency="curr_code"
            :price="price"
            :change="change"
          ></Indicators>
          <Platforms
            v-else
            :currency="curr_code"
            :prices="arb_data"
            @clicked="platform_changed"
          ></Platforms>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12" :xl="8">
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
              <TableTrades v-if="!is_switched" :prices="prices"></TableTrades>
              <TableASession
                v-else
                :prices="prices"
                :filter="as_filter"
                title="table_position"
              ></TableASession>
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="12" :md="12" :lg="4">
          <SpotCard
            v-if="!is_switched"
            :currency="curr_code"
            :price="price"
          ></SpotCard>
          <TableAC
            v-else
            :currency="curr_code ? curr_code : undefined"
            :prices="arb_data"
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
      base_p: this.$store.state.config.data.base_p,
      price: null,
      change: null,
      prices: [],
      arb_data: [],
      as_filter: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies_full: "list",
      curr_by_id: "byId",
    }),
    currencies() {
      let c_f = this.currencies_full;
      return c_f.filter(
        (el) => el.currency_type && el.currency_type.key == "CRYPTO"
      );
    },
  },
  watch: {
    curr_id() {
      this.current = this.curr_by_id(this.curr_id) || {};
      this.curr_code = this.current.symbol;
    },
    curr_code() {
      this.as_filter = {
        "wallet.currency.symbol": this.curr_code,
      };
      if (this.curr_code && !this.is_switched) {
        this.spot_sockets();
      }
      if (this.curr_code && this.is_switched) {
        this.arbitrage_sockets();
      }
    },
    "$route.params.search": {
      handler: function (search) {
        if (
          this.$router.currentRoute.query &&
          this.$router.currentRoute.query.id
        ) {
          this.curr_id = parseInt(this.$router.currentRoute.query.id);
        }
      },
      deep: true,
      immediate: true,
    },
    is_switched() {
      if (!this.is_switched) {
        this.spot_sockets();
      } else {
        this.arbitrage_sockets();
      }
    },
    selected_platform() {
      this.arbitrage_sockets();
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
    spot_sockets() {
      let me = this;
      let socket = global.socket;
      socket.send(`{
        "method": "unsubscribe",
        "data": ["all_${me.curr_code}-USD@ticker_5s"]
      }`);
      socket.send(`{
        "method": "subscribe",
        "data": ["${me.base_p}_${me.curr_code}-USD@ticker_5s", "${me.base_p}_all@ticker_10s"]
      }`);
      socket.onmessage = function (event) {
        if (event.data) {
          let json_d = JSON.parse(event.data);
          if (
            json_d &&
            json_d.method == `${me.base_p}_${me.curr_code}-USD@ticker_5s`
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
          if (json_d && json_d.method == `${me.base_p}_all@ticker_10s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.prices = data;
          }
        }
      };
    },
    arbitrage_sockets() {
      let me = this;
      let socket = global.socket;
      socket.send(`{
        "method": "unsubscribe",
        "data": ["binance_${me.curr_code}-USD@ticker_5s", "${me.base_p}_all@ticker_10s"]
      }`);
      socket.send(`{
        "method": "subscribe",
        "data": ["all_${me.curr_code}-USD@ticker_5s"]
      }`);

      socket.onmessage = function (event) {
        if (event.data) {
          let json_d = JSON.parse(event.data);
          if (json_d && json_d.method == `all_${me.curr_code}-USD@ticker_5s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.arb_data = data;
            me.prices = data;
          }
        }
      };
    },
  },
  async mounted() {
    await this.fetchTrades();
    this.fetchAS();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["${this.base_p}_${this.curr_code}-USD@ticker_5s", "${this.base_p}_all@ticker_10s", 
      "all_${this.curr_code}-USD@ticker_5s"]
    }`);
  },
};
</script>
<style scoped>
.crypto-select {
  width: 160px;
}
</style>
