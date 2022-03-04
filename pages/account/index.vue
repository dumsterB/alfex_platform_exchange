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
            <Currency :currency="curr" />
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
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies: "list",
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
    await this.fetchCurrencies();
    await this.fetchAC();
    let socket = global.socket;
    socket.send(`{
      "method": "subscribe",
      "data": ["binance_all@ticker_10s"]
    }`);
    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        if (json_d && json_d.method == `binance_all@ticker_10s`) {
          console.log(json_d.method)
          let data = json_d.data ? json_d.data.data || [] : [];
          me.currs = me.currencies.map((el) => {
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
                parseFloat(fnd.change) / parseFloat(fnd.price)
              ).toFixed(4);
            }
            return res;
          });
        }
        // console.log('me.currs', me.currs)
      }
    };
    // socket.onclose = function (event) {
    //   if (event.wasClean) {
    //     console.log(
    //       `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
    //     );
    //   } else {
    //     console.log("[close] Connection died");
    //   }
    // };

    // socket.onerror = function (error) {
    //   console.log(`[error] ${error.message}`);
    // };
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
<style scoped>
.currencyNavbar .v-input__control {
  width: 40% !important;
}
</style>
