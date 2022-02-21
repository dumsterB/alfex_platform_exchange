<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:[`item.amount`]="{ item }">
        <span>{{ item.amount + " " + item.wallet.currency.name }}</span>
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
            @click="toggleModal"
            class="green accent-3"
            :value="item"
          >
            {{ "X" }}
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <ClosePosition :item="JSON.parse(selectedItem)" @close="dialog = false" />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ClosePosition from "~/components/elements/modals/ClosePosition";
const model = "data/arbitrage_session";

// const convertProfit = exchangeRate
//   ? (exchangeRate / buy_price - 1) * amount
//   : NaN;
export default {
  components: {
    ClosePosition,
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
    toggleModal(evt) {
      this.dialog = true;
      this.selectedItem = evt.currentTarget.value;
    },
    resetList() {
      this.list = this.arbitrage_sessions.map((el) => {
        let diff =
          (Math.random() * el.source_amount) / 10 -
          (Math.random() * el.source_amount) / 10;
        let curr_cost = el.source_amount + diff;
        el.current_cost = curr_cost.toFixed(4);
        let diff_proc = (diff * 100) / curr_cost;
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
  async created() {
    this.resetList();
    console.log(this.selectedItem);
    console.log(this.arbitrage_sessions);
    this.interv = setInterval(() => {
      this.resetList();
    }, 1000);
  },

  beforeDestroy() {
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>
