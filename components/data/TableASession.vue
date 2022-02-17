<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:[`item.difference`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference }}</span>
      </template>
      <template v-slot:[`item.difference_perc`]="{ item }">
        <span :style="diffColor(item.difference)">{{
          item.difference_perc
        }}</span>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn @click="close(item)" class="ml-3">
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_session";
// const convertProfit = exchangeRate
//   ? (exchangeRate / buy_price - 1) * amount
//   : NaN;
export default {
  data() {
    return {
      perpage: 5,
      headers: [
        {
          text: "Name",
          value: "arbitrage_company.name",
          // width: 40,
        },
        {
          text: "Position",
          value: "session_start_type.name",
          width: 100,
        },
        {
          text: "Date & Time",
          value: "created_at",
          width: 120,
        },
        {
          text: "Amount",
          value: "amount",
          width: 100,
        },
        {
          text: "Start price",
          value: "start_exchange_rate",
          width: 120,
        },
        {
          text: "Current price",
          value: "current_cost",
          width: 130,
        },
        {
          text: "Profit/loss",
          value: "difference",
          width: 116,
        },
        {
          text: "Profit/loss %",
          value: "difference_perc",
          width: 128,
        },
        {
          text: "",
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
    close(item) {},
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
