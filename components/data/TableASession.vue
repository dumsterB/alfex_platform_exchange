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
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                name="closeOrder"
                @click="close(item, $event)"
                class="green accent-3"
              >
                {{ "X" }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="d-flex">
                <span class="text-h5">{{ $t("close_order") }}</span>
                <span class="text-h6">{{ $t("choose_marketplace") }}</span>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-radio-group
                    v-for="(item, i) in list"
                    :key="i"
                    v-model="radios"
                    column
                  >
                    <v-radio
                      :label="item.arbitrage_company.name"
                      :value="item.amount"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  name="goBack"
                  text
                  @click="close(item, $event)"
                >
                  {{ $t("go_back") }}
                </v-btn>
                <v-btn
                  color="green darken-3"
                  name="agree"
                  text
                  @click="close(item, $event)"
                  type="submit"
                >
                  {{ $t("ok") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import ClosePosition from "~/components/elements/modals/ClosePosition";
const model = "data/arbitrage_session";

// const convertProfit = exchangeRate
//   ? (exchangeRate / buy_price - 1) * amount
//   : NaN;
export default {
  components: {
    // ClosePosition,
  },
  data() {
    return {
      radios: "",
      dialog: false,
      perpage: 5,
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
    close(item, event) {
      if (event.currentTarget.name === "closeOrder") this.dialog = true;
      if (event.currentTarget.name === "goBack") this.dialog = false;
      if (event.currentTarget.name === "agree") this.dialog = false;
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
