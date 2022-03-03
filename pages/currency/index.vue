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
        <Indicators v-if="!is_switched" :currency="curr_code"></Indicators>
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
        <SpotCard v-if="!is_switched"></SpotCard>
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
    TableASession
  },
  data() {
    return {
      is_switched: false,
      curr_id: null,
      curr_code: null,
      current: {},
      graphWidth: (window.innerWidth * 2) / 3 - 250,
      graphHeight: 500,
      selected_platform: "binance",
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
      this.curr_code = this.current.short_name;
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
      this.graphWidth = (window.innerWidth * 2) / 3 - 250;
    },
    initGrpaphWidth() {},
    platform_changed(platform) {
      this.selected_platform = platform;
    },
  },
  async created() {
    await this.fetchCurrencies();
    this.fetchAC();
    this.fetchAS();
    this.fetchTrades();
  },
  async mounted() {
    if (this.$router.currentRoute.query && this.$router.currentRoute.query.id) {
      this.curr_id = parseInt(this.$router.currentRoute.query.id);
    }
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style scoped>
.crypto-select {
  width: 160px;
}
</style>
