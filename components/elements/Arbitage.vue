<template>
  <div>
    <v-row class="pa-3 pl-6 pr-6">
      <v-col
        cols="12"
        xl="3"
        md="6"
        lg="4"
        sm="12"
        v-for="(coin, i) in currs"
        :key="i"
      >
        <v-card elevation="1" max-width="500" min-height="130" class="pb-4">
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
                  <strong>${{ coin.price }}</strong>
                </p></v-card-subtitle
              >
            </div>
          </div>
          <div class="ma-8 mb-1 mt-1">
            <v-btn class="green" block>{{ $t("trade_now") }}</v-btn>
          </div>
          <!-- <div v-for="(item, i) in arbitrage_company" :key="i">
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
          </div> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pl-8"
      ><v-col class="op_t_title">{{ $t("open_positions") }}</v-col></v-row
    >
    <v-row>
      <v-col>
        <TableASession
          :prices="prices_all"
          :filter="{
            status_id: 1,
          }"
          @get_prices="update_subscr"
        ></TableASession>
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
import TableASession from "~/components/data/TableASession";
import ThemeSelectVue from '../settings/ThemeSelect.vue';

const modelCompanies = "data/arbitrage_company";
const wallet = "data/wallet";
export default {
  name: "Arbitage",
  components: {
    TradePosition,
    TableASession,
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
      prices_all: [],
      cur_len: 8,
      need_curr: null,
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
    ...mapActions("data/arbitrage_session", {
      fetchAS: "fetchList",
    }),
    ...mapActions(modelCompanies, {
      fetchList: "fetchList",
    }),
    closeTrade() {
      this.dialog = false;
    },
    update_subscr(curr) {
      let me = this;
      let socket = global.socket;
      if (this.need_curr) {
        socket.send(`{
          "method": "unsubscribe",
          "data": ["all_${this.need_curr.symbol}-USD@ticker_5s"]
        }`);
      }
      this.need_curr = curr;
      setTimeout(() => {
        socket.send(`{
          "method": "subscribe",
          "data": ["all_${curr.symbol}-USD@ticker_5s"]
        }`);
      }, 100);
    },
    define_prices(data) {
      let me = this;
      let dt = Object.assign([], me.prices_all);
      data.forEach((element) => {
        if (element) {
          let fnd = dt.findIndex(
            (el) =>
              el && el.base == element.base && el.company == element.company
          );
          if (fnd < 0) {
            dt.push(element);
          } else {
            dt[fnd] = element;
          }
        }
      });
      me.prices_all = dt;
    },
    buy(coin, item) {
      this.action = "Buy";
      this.dialog = true;
      this.userWallet = this.wallet_full.find(
        (el) => el.currency_id == coin.id
      );
      this.selectedCurrency = coin;
      this.selectedArbitrageCompany = item;
      console.log(this.userWallet);
    },
    sell(coin, item) {
      this.action = "Sell";
      this.dialog = true;
      this.userWallet = this.wallet_full.find(
        (el) => el.currency_id == coin.id
      );
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
      let crs = wlts.map((el) => {
        el.currency.wallet_id = el.id;
        return el.currency;
      });
      if (crs.length > this.cur_len) {
        res = wlts.crs(0, this.cur_len);
      } else {
        res = crs;
        for (let i = crs.length; i < this.cur_len; i++) {
          let cr = this.currencies.find((el) => {
            if (el.currency_type.key == "CRYPTO") {
              let f = res.find((e) => e.id == el.id);
              if (!f) return true;
            }
            return false;
          });
          res.push(cr);
        }
      }
      res.forEach((el) => {
        let fnd = this.prices_all.find((e) => e.base == el.symbol);
        if (fnd && fnd.price) el.price = fnd.price;
      });
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
    await this.fetchAS();
    let me = this;
    let socket = global.socket;
    me.send_str = `"binance_all@ticker_10s"`;
    socket.send(`{
      "method": "subscribe",
      "data": ["binance_all@ticker_10s"]
    }`);

    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        // console.log(json_d.method)
        if (json_d && json_d.method == `binance_all@ticker_10s`) {
          let data = json_d.data ? json_d.data.data || [] : [];
          me.define_prices(data);
        } else if (me.need_curr) {
          let curr = me.need_curr.symbol;
          if (json_d && json_d.method == `all_${curr}-USD@ticker_5s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.define_prices(data);
          }
        }
      }
    };
  },
  destroyed() {
    let socket = global.socket;
    let curr = this.need_curr ? this.need_curr.symbo : "USD";
    socket.send(`{
      "method": "unsubscribe",
      "data": ["binance_all@ticker_10s", "all_${curr}-USD@ticker_5s"]
    }`);
  },
};
</script>

<style>
.op_t_title {
  font-size: 22px;
}
</style>
