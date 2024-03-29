<template>
  <div>
    <v-row v-if="curr_company" class="pa-3 pl-6 pr-6">
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
            <v-btn class="green" block @click="trade_now(coin)">{{
              $t("trade_now")
            }}</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pa-3 pl-6 pr-6" v-if="!curr_company"
      ><v-col
        ><v-row
          ><v-col>
            <v-row class="pl-4 mb-2"
              ><v-icon class="mr-4" @click="curr_company = true"
                >mdi-arrow-left</v-icon
              >
              <v-img
                class="mr-4"
                max-width="50"
                :src="sel_currency.logo"
              ></v-img>
              <span class="mt-3">{{ sel_currency.symbol }}</span></v-row
            >
          </v-col></v-row
        >
        <v-row>
          <v-col
            cols="12"
            xl="3"
            md="6"
            lg="4"
            sm="12"
            v-for="(cmp, i) in arb_companies"
            :key="i"
            ><TradePosition
              :tradeItem="cmp.currency"
              :action="cmp.action"
              :userWallet="cmp.wallet"
              :tradePlatform="cmp.company"
              :price="cmp.price"
              :height="350"
              @reload="reload"
          /></v-col> </v-row></v-col
    ></v-row>
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
    <v-dialog v-model="dialog" max-width="600px"> </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TradePosition from "../../components/elements/modals/TradePosition";
import TableASession from "~/components/data/TableASession";
import ThemeSelectVue from "../settings/ThemeSelect.vue";

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
      sel_currency: {},
      arb_companies: [],
      prices_all: [],
      cur_len: 8,
      prices: [],
      need_curr: null,
      curr_company: true,
      base_p: this.$store.state.config.data.base_p,
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
    define_arb_companies(data) {
      let me = this;
      let arb_companies = [];
      data.forEach((element) => {
        if (element && element.price) {
          let comp = me.ac.find((el) => el.name == element.company);
          let wallet = me.wallet_full.find(
            (el) => el.currency_id == me.sel_currency.id
          );
          arb_companies.push({
            currency: me.sel_currency,
            wallet: wallet || {},
            company: comp,
            action: wallet ? "Both" : "Buy",
            price: element.price,
          });
        }
      });
      me.arb_companies = arb_companies;
      console.log("me.arb_companies", me.arb_companies);
    },
    trade_now(coin) {
      this.sel_currency = coin;
      this.update_subscr(coin);
      this.curr_company = false;
    },
    async reload() {
      await this.fetchWallet();
      await this.fetchAS();
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
        res = crs.slice(0, this.cur_len);
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
    socket.send(`{
      "method": "subscribe",
      "data": ["${me.base_p}_all@ticker_10s"]
    }`);

    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        if (json_d && json_d.method == `${me.base_p}_all@ticker_10s`) {
          let data = json_d.data ? json_d.data.data || [] : [];
          me.define_prices(data);
        } else if (me.need_curr) {
          let curr = me.need_curr.symbol;
          if (json_d && json_d.method == `all_${curr}-USD@ticker_5s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.define_arb_companies(data);
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
      "data": ["${this.base_p}_all@ticker_10s", "all_${curr}-USD@ticker_5s"]
    }`);
  },
};
</script>

<style>
.op_t_title {
  font-size: 22px;
}
</style>
