<template>
  <div>
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
        <Indicators></Indicators>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
        <v-row class="ml-4">
          <v-col class="d-flex justify-center">
            <TradeGraph :width="graphWidth" :height="graphHeight"></TradeGraph>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TableTrades></TableTrades>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12" :xs="12"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Indicators from "~/components/elements/currencies/Indicators";
import TradeGraph from "~/components/graphs/Trade";
import TableTrades from "~/components/data/TableTrades";
const model = "data/currency";

export default {
  components: {
    Indicators,
    TradeGraph,
    TableTrades,
  },
  data() {
    return {
      is_switched: false,
      curr_id: null,
      graphWidth: (window.innerWidth * 2) / 3 - 250,
      graphHeight: 500,
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies: "list",
      curr_by_id: "byId",
    }),
    current() {
      if (
        this.$router.currentRoute.query &&
        this.$router.currentRoute.query.id
      ) {
        let curr_id = parseInt(this.$router.currentRoute.query.id);
        return this.curr_by_id(curr_id);
      }
      return {};
    },
  },
  methods: {
    ...mapActions(model, {
      fetchCurrencies: "fetchList",
    }),
    ...mapActions("data/arbitrage_company", {
      fetchAC: "fetchList",
    }),
    onResize(event) {
      this.graphWidth = (window.innerWidth * 2) / 3 - 250;
    },
    initGrpaphWidth() {},
  },
  created() {},
  async mounted() {
    await this.fetchCurrencies();
    this.fetchAC();
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
