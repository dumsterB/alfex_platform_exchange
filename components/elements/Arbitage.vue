<template>
  <div>
    <v-row class="pa-3">
      <v-col
        cols="12"
        xl="3"
        md="6"
        lg="4"
        sm="12"
        v-for="(coin, i) in currs"
        :key="i"
      >
        <v-card elevation="1" max-width="500" min-height="330" class="pb-4">
          <div class="justify-space-between d-flex pa-3">
            <div>
              <v-card-subtitle class="d-flex"
                ><img height="30" :src="coin.logo" alt="" />
                <p class="ml-2 mt-1">
                  <strong>{{ coin.symbol }}</strong>
                </p></v-card-subtitle
              >
            </div>

            <div>
              <v-card-subtitle
                ><p class="mr-6 mt-1">
                  <strong>${{ prices[coin.symbol] &&
                  prices[coin.symbol]["binance"] ? prices[coin.symbol]["binance"] : '' }}</strong>
                </p></v-card-subtitle
              >
            </div>
          </div>
          <div v-for="(item, i) in arbitrage_company" :key="i">
            <v-list-item dense class="ml-4" v-if="
                  prices[coin.symbol] &&
                  prices[coin.symbol][item.name]
                ">
              <v-list-item-content>
                <div>
                  <p>{{ item.name }}</p>
                </div>
              </v-list-item-content>
              <v-list-item-content>
                <div>
                  <p>
                    {{
                      prices[coin.symbol] && prices[coin.symbol][item.name]
                        ? "$" + prices[coin.symbol][item.name]
                        : ""
                    }}
                  </p>
                </div>
              </v-list-item-content>
              <v-list-item-content
                class="d-block"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      class="ml-3 green--text"
                      :disabled="false"
                      @click="buy(coin, item)"
                      >mdi-plus-box
                    </v-icon>
                  </template>
                  <span>{{ $t("buy") }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      class="ml-3 red--text"
                      :disabled="!coin.wallet_id"
                      @click="sell(coin, item)"
                      >mdi-minus-box
                    </v-icon>
                  </template>
                  <span>{{ $t("sell") }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <TradePosition
        :tradeItem="selectedCurrency"
        :action="action"
        :userWallet="
          userWallet ? userWallet : { balance: $t('wallet_balance') }
        "
        :tradePlatform="selectedArbitrageCompany"
        :price="
          prices[selectedCurrency.symbol]
            ? prices[selectedCurrency.symbol][selectedArbitrageCompany.name]
            : null
        "
        @close="closeTrade"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TradePosition from "../../components/elements/modals/TradePosition";

const modelCompanies = "data/arbitrage_company";
const wallet = "data/wallet";
export default {
  name: "Arbitage",
  components: {
    TradePosition,
  },
  data() {
    return {
      dialog: false,
      action: "",
      selectedCurrency: {},
      selectedArbitrageCompany: {},
      userWallet: "",
      send_str: "",
      prices: {},
      cur_len: 8,
    };
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.selectedCurrency = {};
        this.userWallet = {};
        this.selectedArbitrageCompany = {};
      }
    },
  },
  methods: {
    ...mapActions(wallet, {
      fetchWallet: "fetchList",
    }),
    ...mapActions(modelCompanies, {
      fetchList: "fetchList",
    }),
    closeTrade() {
      this.dialog = false;
    },
    buy(coin, item) {
      this.action = "Buy";
      this.dialog = true;
      this.userWallet = this.wallet_full.find(el => el.currency.symbol == "USD");
      this.selectedCurrency = coin;
      this.selectedArbitrageCompany = item;
    },
    sell(coin, item) {
      this.action = "Sell";
      this.dialog = true;
      this.userWallet = this.wallet_full.find(el => el.currency_id == coin.id);
      this.selectedCurrency = coin;
      this.selectedArbitrageCompany = item;
    },
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet_full: "list",
    }),
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
    currs() {
      let res = [];
      let wlts = this.wallet_full.filter((el) => el.currency.symbol != "USD");
      let crs = wlts.map(el => {
        el.currency.wallet_id = el.id;
        return el.currency;
      });
      if (crs.length > this.cur_len) {
        res = wlts.crs(0, this.cur_len);
      } else {
        res = crs;
        for (let i = crs.length; i < this.cur_len; i++) {
          let cr = this.currencies.find(el => {
            if (el.currency_type.key == "CRYPTO") {
              let f = res.find(e => e.id == el.id);
              if (!f) return true;
            }
            return false;
          })
          res.push(cr);
        }
      }
      return res;
    },
    ...mapGetters(modelCompanies, {
      ac: "list",
    }),
    ...mapGetters("data/arbitrage_company", {
      arbitrage_company: "list",
    }),
  },
  async created() {
    await this.fetchWallet();
    let me = this;
    let socket = global.socket;
    let send_str = "";
    me.currs.forEach((element, i) => {
      send_str += `"all_${element.symbol}-USD@ticker_5s"`;
      if (i != me.currs.length - 1) {
        send_str += ", ";
      }
    });
    me.send_str = send_str;
    socket.send(`{
      "method": "subscribe",
      "data": [${me.send_str}]
    }`);

    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        me.currs.forEach((wl) => {
          let curr = wl.symbol;
          if (json_d && json_d.method == `all_${curr}-USD@ticker_5s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            if (data.length > 0) {
              me.ac.forEach((cmp) => {
                let fnd = data.find((el) => el.company == cmp.name);
                if (fnd && fnd.price) {
                  if (!me.prices[curr]) me.prices[curr] = {};
                  me.prices[curr][cmp.name] = fnd.price;
                }
              });
            }
          }
        });
      }
    };
    setTimeout(() => {
      me.prices = Object.assign({}, me.prices);
    }, 1500);
    me.interv = setInterval(() => {
      me.prices = Object.assign({}, me.prices);
    }, 4000);
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": [${this.send_str}]
    }`);
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>

<style scoped>
</style>
