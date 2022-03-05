<template>
  <div class="">
    <v-row>
      <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
        <div
          class="
            d-flex
            mt-2
            mdc-form-field--space-between
            justify-content-beetween
            currencyNavbar
          "
        >
          <div>
            <p class="text-h6 ml-10">{{ $t("markets") }}</p>
          </div>
          <div class="d-flex">
            <p elevation="0" class="mr-4 mt-2">
              <v-icon>mdi-filter</v-icon> {{ $t("filters") }}
            </p>
            <v-text-field
              :label="$t('market_search_bar_placeholder')"
              outlined
              class="searchCurrency"
              dense
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
        </div>
        <v-row class="ml-4">
          <v-col
            class="d-flex justify-center"
            v-for="(curr, i) in currs"
            :key="i"
          >
            <Currency
              :currency="curr"
              :companies="companies"
              :id="`ttp-${curr.symbol}`"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12" :xs="12">
        <Wallet :currency="currs"></Wallet>
        <Exchange :currency="currs"></Exchange>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Currency from "~/components/elements/Currency";
import Wallet from "../../components/elements/Wallet";
import Exchange from "../../components/elements/Exchange";
const model = "data/currency";

export default {
  components: {
    Currency,
    Wallet,
    Exchange,
  },
  data() {
    return {
      currs: [],
      companies: [],
      platform: "binance",
      waiter: {},
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies_full: "list",
    }),
    currencies() {
      let c_f = this.currencies_full;
      return c_f.filter(el => el.currency_type && el.currency_type.key == "CRYPTO");
    },
    ...mapGetters("data/arbitrage_company", {
      arbitrage_company: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchCurrencies: "fetchList",
    }),
    ...mapActions("data/arbitrage_company", {
      fetchAC: "fetchList",
    }),
  },
  async created() {
    let me = this;
    let socket = global.socket;
    socket.send(`{
      "method": "subscribe",
      "data": ["${me.platform}_all@ticker_10s"]
    }`);
    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        if (json_d && json_d.method == `${me.platform}_all@ticker_10s`) {
          let data = json_d.data ? json_d.data.data || [] : [];
          let currs = me.currencies.map((el) => {
            let res = {
              id: el.id,
              symbol: el.symbol,
              name: el.name,
              logo: el.logo,
            };
            let fnd = data.find((e) => e && e.base == el.symbol);
            if (fnd) {
              res.price = fnd.price;
              res.change = fnd.change;
              res.change_p = (
                (parseFloat(fnd.change) * 100) /
                parseFloat(fnd.price)
              ).toFixed(4);
            }
            return res;
          });
          me.currs = currs;
        }
        let s_method = json_d.method.slice(0, 3);
        if (json_d && s_method == "all") {
          let data = json_d.data ? json_d.data.data || [] : [];
          let crs = me.arbitrage_company.map((el) => {
            let res = {
              id: el.id,
              name: el.name,
            };
            let fnd = data.find((e) => e && e.company == el.name);
            if (fnd) {
              res.price = fnd.price;
            }
            return res;
          });
          let companies = crs.filter((el) => {
            return el.price ? true : false;
          });
          me.companies = companies;
        }
        // console.log('me.currs', me.currs)
      }
    };
  },
  mounted() {
    let me = this;
    let int = setInterval(() => {
      let test = document.getElementById(`ttp-BTC`);
      if (test) {
        me.currencies.forEach((currency) => {
          let sym = currency.symbol;
          let test = document.getElementById(`ttp-${sym}`);
          let socket = global.socket;

          test.addEventListener(
            "mouseenter",
            function (event) {
              me.companies = [];
              me.waiter[sym] = true;
              setTimeout(() => {
                if (me.waiter[sym]) {
                  socket.send(`{
                    "method": "subscribe",
                    "data": ["all_${sym}-USDT@ticker_10s"]
                  }`);
                }
              }, 500);
            },
            false
          );

          test.addEventListener(
            "mouseleave",
            function (event) {
              me.waiter[sym] = false;
              socket.send(`{
                "method": "unsubscribe",
                "data": ["all_${sym}-USDT@ticker_10s"]
              }`);
            },
            false
          );
        });
        clearInterval(int);
      }
    }, 1000);
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["${this.platform}_all@ticker_10s"]
    }`);
  },
};
</script>
<style scoped>
.currencyNavbar .v-input__control {
  width: 40% !important;
}
</style>
