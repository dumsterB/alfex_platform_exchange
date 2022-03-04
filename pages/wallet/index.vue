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
          ></Check>
          <br />
          <Check
            :title="fiat_title"
            :totalEquity="fiat_total_equity"
            :total_equity_usdt="fiat_total_equity_usdt"
            :available_balance="fiat_available_balance"
            :available_balance_usdt="fiat_available_balance_usdt"
          >
          </Check>
        </div>
      </v-col>
      <v-col md="8">
        <div class="ma-2 mr-8">
          <TableTransactions :wallets="wallets_t"></TableTransactions>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GeneralCapital from "@/components/elements/GeneralCapital";
import Check from "@/components/elements/Check";
import TableTransactions from "@/components/elements/TableTransactions";

export default {
  components: { GeneralCapital, Check, TableTransactions },
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
  },
  watch: {},
  async created() {
    let me = this;
    await this.fetchWallet();
    let socket = global.socket;
    socket.send(`{
      "method": "subscribe",
      "data": ["binance_all@ticker_10s"]
    }`);
    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        if (json_d && json_d.method == `binance_all@ticker_10s`) {
          let data = json_d.data ? json_d.data.data || [] : [];
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
          let fnd_btc = this.data.find((el) => el.base == "BTC");
          if (fnd_btc) {
            this.total_sum_btc = this.total_sum / parseFloat(fnd_btc.price);
          }
          console.log("sums", sum_t, sum_spot, sum_fiat);
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
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["binance_all@ticker_10s"]
    }`);
  },
};
</script>
