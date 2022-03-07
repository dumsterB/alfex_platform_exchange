<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
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
      <ClosePosition :item="selectedItem" :prices="prices" @close="dialog = false" />
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
    curr: {
      type: String,
      default: "BTC",
    },
    platform: {
      type: String,
      default: "binance",
    },
  },
  data() {
    return {
      dialog: false,
      perpage: 5,
      selectedItem: null,
      headers: [
        {
          text: "Market",
          value: "arbitrage_company.name",
          // width: 80,
        },
        {
          text: "Position",
          value: "session_start_type.name",
          // width: 100,
        },
        {
          text: "Date & Time",
          value: "created_at",
          width: 120,
        },
        {
          text: "Amount",
          value: "amount",
          // width: 100,
        },
        {
          text: "Start price",
          value: "start_exchange_rate",
          // width: 120,
        },
        {
          text: "Current price",
          value: "current_cost",
          // width: 130,
        },
        {
          text: "Profit/loss",
          value: "difference",
          // width: 116,
        },
        {
          text: "Profit/loss %",
          value: "difference_perc",
          // width: 128,
        },
        {
          text: "Close",
          value: "action",
          // width: 80,
        },
      ],
      list: [],
      interv: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      arbitrage_sessions: "list",
    }),
  },

  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    toggleModal(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    resetList(prices) {
      let list = [];
      this.arbitrage_sessions.forEach((element) => {
        if (element.wallet.currency.symbol == this.curr) {
          let fnd = prices.find(
            (e) =>
              e &&
              e.base == element.wallet.currency.symbol &&
              e.company == element.arbitrage_company.name
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
        }
      });
      this.list = list;
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
      console.log("this.prices", this.prices);
      this.resetList(this.prices);
    },
  },
  async created() {
    console.log("this.arbitrage_sessions", this.arbitrage_sessions);
  },
};
</script>
