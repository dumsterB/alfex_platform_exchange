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
          <v-toolbar-title>{{ $t(title) }}</v-toolbar-title>
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
      <template v-slot:[`item.amount`]="{ item }">
        <span>{{ item.amount + " " + item.wallet.currency.symbol }}</span>
      </template>
      <template v-slot:[`item.difference`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference }}</span>
      </template>
      <template v-slot:[`item.difference_perc`]="{ item }">
        <span :style="diffColor(item.difference)">{{
          item.difference_perc
        }}</span>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-row justify="center">
          <v-btn
            name="closeOrder"
            @click="toggleModal(item)"
            class="green--text"
            :value="item"
            :disabled="item.status.key != 'OPEN'"
            outlined
          >
            <v-icon>{{ "mdi-close" }}</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <ClosePosition
        :item="selectedItem"
        :prices="prices"
        @close="dialog = false"
        @reload="reload"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ClosePosition from "~/components/elements/modals/ClosePosition";
const model = "data/arbitrage_session";

export default {
  components: {
    ClosePosition,
  },
  props: {
    prices: {
      type: Array,
      default: () => {
        return [];
      },
    },
    filter: null,
    title: "",
  },
  data() {
    return {
      dialog: false,
      perpage: 5,
      search: "",
      selectedItem: null,
      list: [],
      interv: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      arbitrage_sessions: "list",
    }),
    headers() {
      return [
        {
          text: this.$t("name_table"),
          value: "arbitrage_company.name",
          // width: 80,
        },
        {
          text: this.$t("table_position"),
          value: "session_start_type.name",
          // width: 100,
        },
        {
          text: this.$t("table_time"),
          value: "created_at",
        },
        {
          text: this.$t("amount"),
          value: "amount",
          // width: 100,
        },
        {
          text: this.$t("table_buy_price"),
          value: "start_exchange_rate",
          // width: 120,
        },
        {
          text: this.$t("table_current_price"),
          value: "current_cost",
          // width: 130,
        },
        {
          text: this.$t("table_profit_loss"),
          value: "difference",
          // width: 116,
        },
        {
          text: `${this.$t("table_profit_loss")} %`,
          value: "difference_perc",
          // width: 128,
        },
        {
          text: this.$t("table_close"),
          value: "action",
          // width: 80,
        },
      ];
    },
  },

  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    toggleModal(item) {
      this.$emit("get_prices", item.wallet.currency);
      this.selectedItem = item;
      this.dialog = true;
    },
    resetList(prices) {
      let list = [];
      let as = [];
      if (this.filter) {
        as = this.arbitrage_sessions.filter((el) => {
          for (let p in this.filter) {
            let spl = p.split(".");
            if (spl.length > 1) {
              let v = el[spl[0]];
              for (let i = 1; i < spl.length; i++) {
                v = v[spl[i]];
              }
              if (this.filter[p] != v) {
                return false;
              }
            } else {
              if (this.filter[p] != el[p]) {
                return false;
              }
            }
          }
          return true;
        });
      } else {
        as = this.arbitrage_sessions;
      }
      as.forEach((element) => {
        let fnd = prices.find(
          (e) => e && e.base == element.wallet.currency.symbol
        );
        let pr = 1;
        if (fnd && fnd.price) {
          pr = fnd.price;
        }
        element.current_cost = pr;
        let diff = pr - element.start_exchange_rate;
        let diff_full = diff * element.amount;
        let diff_proc = (diff * 100) / element.start_exchange_rate;
        element.difference = diff_full.toFixed(3);
        element.difference_perc = `${diff_proc.toFixed(3)} %`;
        list.push(element);
      });
      this.list = list;
    },

    async reload() {
      await this.fetchList();
      this.resetList(this.prices);
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
      // console.log("this.prices", this.prices);
      this.resetList(this.prices);
    },
    filter() {
      this.resetList(this.prices);
    },
    arbitrage_sessions() {
      this.resetList(this.prices);
    },
  },
  async created() {
    // console.log("this.arbitrage_sessions", this.arbitrage_sessions);
  },
};
</script>
