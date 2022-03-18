<template>
  <div class="wallet">
    <v-row>
      <v-col md="4">
        <div class="ma-2">
          <GeneralCapital
            :total_sum_btc="total_sum"
            :total_sum="total_sum_usdt"
          ></GeneralCapital>
          <br />
          <Check
            :title="spot_title"
            :totalEquity="spot_total_equity"
            :total_equity_usdt="spot_total_equity_usdt"
            :available_balance="spot_available_balance"
            :available_balance_usdt="spot_available_balance_usdt"
            :main_currency="true"
            @history="spot_history"
          ></Check>
          <br />
          <Check
            :title="fiat_title"
            :totalEquity="fiat_total_equity"
            :total_equity_usdt="fiat_total_equity_usdt"
            :available_balance="fiat_available_balance"
            :available_balance_usdt="fiat_available_balance_usdt"
            :main_currency="false"
            @history="fiat_history"
          >
          </Check>
        </div>
      </v-col>
      <v-col md="8">
        <div class="ma-2 mr-8">
          <TableTransactions
            v-if="!is_history"
            :wallets="wallets_t"
            @reload="init_tb"
          ></TableTransactions>
          <TableOrders v-if="is_history" :filter="order_filter"></TableOrders>
          <TableTrades v-if="is_history" :prices="prices"></TableTrades>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GeneralCapital from "@/components/elements/GeneralCapital";
import Check from "@/components/elements/Check";
import TableTransactions from "@/components/data/TableWallets";
import TableTrades from "@/components/data/TableTrades";
import TableOrders from "@/components/data/TableOrders";

export default {
  components: {
    GeneralCapital,
    Check,
    TableTransactions,
    TableTrades,
    TableOrders,
  },
  mounted() {},
  data() {
    return {
      spot_total_equity: "0",
      spot_available_balance: "0",
      spot_available_balance_usdt: "0",
      spot_total_equity_usdt: "0",
      fiat_total_equity: "0",
      fiat_available_balance: "0",
      fiat_available_balance_usdt: "0",
      fiat_total_equity_usdt: "0",
      total_sum: "0",
      total_sum_usdt: "0",
      wallets_t: [],
      prices: null,
      base_p: this.$store.state.config.data.base_p,
      is_history: false,
      is_spot_order: false,
      is_fiat_order: false,
      order_filter: null,
    };
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallets: "list",
    }),
    spot_title() {
      return this.$t("spot_account");
    },
    fiat_title() {
      return this.$t("fiat_account");
    },
  },
  methods: {
    ...mapActions("data/wallet", {
      fetchWallet: "fetchList",
    }),
    ...mapActions("data/trade", {
      fetchTrades: "fetchList",
    }),
    ...mapActions("data/order", {
      fetchOrders: "fetchList",
    }),
    check_tbls() {
      if (this.is_spot_order && !this.is_fiat_order) {
        this.order_filter = {
          "dest_currency.currency_type.key": "CRYPTO",
        };
      } else if (!this.is_spot_order && this.is_fiat_order) {
        this.order_filter = {
          "dest_currency.currency_type.key": "FIAT",
        };
      } else {
        this.order_filter = null;
      }
      console.log("this.order_filter", this.order_filter);
      this.is_history = this.is_spot_order || this.is_fiat_order;
    },
    spot_history(tg) {
      this.is_spot_order = tg;
      this.check_tbls();
    },
    fiat_history(tg) {
      this.is_fiat_order = tg;
      this.check_tbls();
    },
    init_tb() {
      let me = this;
      let data = this.prices;
      if (data) {
        me.wallets_t = me.wallets.map((el) => {
          let fnd = data.find((dt) => dt && dt.base == el.currency.symbol);
          if (fnd && fnd.price) {
            let eqv = parseFloat(fnd.price) * el.balance;
            el.eqv = eqv.toFixed(3);
          } else {
            el.eqv = el.balance;
          }
          return el;
        });
        let sum_t = 0;
        let sum_spot = 0;
        let sum_fiat = 0;
        me.wallets_t.forEach((element) => {
          sum_t += parseFloat(element.eqv);
          if (
            element.currency &&
            element.currency.currency_type &&
            element.currency.currency_type.key == "CRYPTO"
          ) {
            sum_spot += parseFloat(element.eqv);
          }
          if (
            element.currency &&
            element.currency.currency_type &&
            element.currency.currency_type.key == "FIAT"
          ) {
            sum_fiat += parseFloat(element.eqv);
          }
        });
        me.total_sum_usdt = sum_t.toFixed(4);
        me.spot_available_balance_usdt = sum_spot.toFixed(4);
        me.fiat_available_balance_usdt = sum_fiat.toFixed(4);
        me.spot_total_equity_usdt = me.spot_available_balance_usdt;
        me.fiat_total_equity_usdt = me.fiat_available_balance_usdt;
        let fnd_btc = data.find((el) => el && el.base == "BTC");
        if (fnd_btc) {
          me.total_sum = (sum_t / parseFloat(fnd_btc.price)).toFixed(4);
          me.spot_available_balance = (
            sum_spot / parseFloat(fnd_btc.price)
          ).toFixed(4);
          me.fiat_available_balance = (
            sum_fiat / parseFloat(fnd_btc.price)
          ).toFixed(4);
          me.spot_total_equity = me.spot_available_balance;
          me.fiat_total_equity = me.fiat_available_balance;
        }
        console.log("sums", sum_t, sum_spot, sum_fiat);
      }
    },
    async init() {
      let me = this;
      let socket = global.socket;
      socket.send(`{
        "method": "subscribe",
        "data": ["${me.base_p}_all@ticker_10s"]
      }`);
      socket.onmessage = function (event) {
        if (event.data) {
          let json_d = JSON.parse(event.data);
          if (json_d && json_d.method == `${me.base_p}_all@ticker_10s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.prices = data;
          }

          // me.currs = me.currencies.map(el => {
          //   let res = {
          //     id: el.id,
          //     symbol: el.symbol,
          //     name: el.name,
          //     logo: el.logo
          //   }
          //   let fnd = data.find(e => e && e.base == el.symbol);
          //   if (fnd) {
          //     res.price = fnd.price;
          //     res.change = fnd.change;
          //     res.change_p = (parseFloat(fnd.change) / parseFloat(fnd.price)).toFixed(4);
          //   }
          //   return res;
          // })
          // console.log('me.currs', me.currs)
        }
      };
    },
  },
  watch: {
    prices() {
      this.init_tb();
    },
  },
  async created() {
    await this.init();
    this.fetchTrades();
    this.fetchOrders();
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["${this.base_p}_all@ticker_10s"]
    }`);
  },
};
</script>
