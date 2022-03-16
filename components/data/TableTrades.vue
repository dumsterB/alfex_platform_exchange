<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      :search="search"
      sort-by="created_at"
      :sort-desc="true"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("recent_trades") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div style="max-width: 300px !important">
            <v-text-field
              dense
              v-model="search"
              append-icon="mdi-magnify"
              outlined
              :label="$t('market_search_bar_placeholder')"
              hide-details
            ></v-text-field>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:[`item.dest_amount`]="{ item }">
        <span>{{ `${item.dest_amount} ${item.dest_currency.symbol}` }}</span>
      </template>
      <template v-slot:[`item.source_amount`]="{ item }">
        <span>{{
          `${item.source_amount} ${item.source_currency.symbol}`
        }}</span>
      </template>
      <template v-slot:[`item.current_cost`]="{ item }">
        <span>{{
          `${item.current_cost} ${item.source_currency.symbol}`
        }}</span>
      </template>
      <template v-slot:[`item.difference`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference }}</span>
      </template>
      <template v-slot:[`item.difference_perc`]="{ item }">
        <span :style="diffColor(item.difference)">{{
          item.difference_perc
        }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/trade";

export default {
  props: {
    prices: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      perpage: 5,
      search: "",
      list: [],
      interv: null,
      platform: "binance",
    };
  },
  computed: {
    ...mapGetters(model, {
      trades: "list",
    }),
    headers() {
      return [
        {
          text: this.$t("Purchased"),
          value: "dest_amount",
          width: 150,
        },
        {
          text: this.$t("Spent"),
          value: "source_amount",
          width: 150,
        },
        {
          text: this.$t("table_time"),
          value: "created_at",
        },

        {
          text: this.$t("table_current_price"),
          value: "current_cost",
        },
        {
          text: this.$t("table_profit_loss"),
          value: "difference",
        },
        {
          text: `${this.$t("table_profit_loss")} %`,
          value: "difference_perc",
        },
      ];
    },
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    resetList(prices) {
      let trades = this.trades.filter(el => {
        return el.trade_status_id == 3;
      })
      this.list = trades.map((el) => {
        let fnd_b = prices.find((e) => e && e.base == el.dest_currency.symbol);
        let pr_b = 1;
        if (fnd_b && fnd_b.price) pr_b = fnd_b.price;
        let fnd_p = prices.find(
          (e) => e && e.base == el.source_currency.symbol
        );
        let pr_p = 1;
        if (fnd_p && fnd_p.price) pr_p = fnd_p.price;
        let curr_cost = (el.dest_amount * pr_b) / pr_p;
        el.current_cost = curr_cost.toFixed(4);
        let diff = curr_cost - el.source_amount;
        let diff_proc = (diff * 100) / el.source_amount;
        el.difference = diff.toFixed(4);
        el.difference_perc = `${diff_proc.toFixed(4)} %`;
        return el;
      });
    },
    diffColor(diff) {
      let nm = parseFloat(diff);
      if (nm < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
  },
  watch: {
    prices() {
      this.resetList(this.prices);
    },
  },
  async created() {},
};
</script>
