<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:[`item.action`]="{ item }">
        <div class="d-flex justify-end">
          <v-btn @click="buy(item)" class="ml-3 green--text" outlined>
            {{ $t("buy") }}
          </v-btn>
          <v-btn @click="sell(item)" class="ml-3 red--text" outlined>
            {{ $t("sell") }}
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <TradePosition
        :tradeItem="selectedCurrency"
        :action="action"
        :userWallet="
          userWallet ? userWallet : { balance: $t('wallet_balance') }
        "
        :tradePlatform="selectedArbitrageCompany"
        @close="closeTrade"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TradePosition from "~/components/elements/modals/TradePosition.vue";
const modelCompanies = "data/arbitrage_company";
const modelCurrencies = "data/currency";

export default {
  components: { TradePosition },
  props: {
    currency: {
      type: String,
      default: "BTC",
    },
    currencies: {
      type: Array,
      default: () => {
        return [];
      },
    },
    current: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialog: false,
      perpage: 10,
      headers: [
        {
          text: "name",
          value: "name",
          width: 100,
        },
        {
          text: "price",
          value: "price",
          width: 100,
        },
        {
          text: "",
          value: "action",
          sortable: false,
        },
      ],
      list: [],
      interv: null,
      selectedCurrency: null,
      action: null,
      selectedArbitrageCompany: null,
      userWallet: null,
    };
  },
  computed: {
    ...mapGetters(modelCompanies, {
      ac: "list",
    }),
    ...mapGetters("data/wallet", {
      wallets: "list",
    }),
  },
  methods: {
    ...mapActions(modelCompanies, {
      fetchList: "fetchList",
    }),
    // ...mapActions("data/arbitrage_session", {
    //   create: "create",
    // }),

    resetList() {
      this.list = this.ac.map((el) => {
        let curr_cost = Math.random() * 1000;
        el.price = curr_cost.toFixed(2);
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
    buy(item) {
      this.action = "Buy";
      this.dialog = true;
      this.selectedCurrency = this.currencies.filter(
        (curr) => curr.short_name === this.currency
      )[0];
      this.selectedArbitrageCompany = this.list.filter(
        (elem) => elem.name === item.name
      )[0];

      this.userWallet = this.wallets.filter(
        (el) => el.currency.symbol === this.selectedCurrency.symbol
      )[0];
    },
    sell(item) {
      this.action = "Sell";
      this.dialog = true;
      this.selectedCurrency = this.currencies.filter(
        (curr) => curr.short_name === this.currency
      )[0];
      this.selectedArbitrageCompany = this.list.filter(
        (elem) => elem.name === item.name
      )[0];
      this.userWallet = this.wallets.filter(
        (el) => el.currency.symbol === this.selectedCurrency.symbol
      )[0];
    },
    closeTrade() {
      this.action = null;
      this.dialog = false;
      this.selectedCurrency = null;
      this.selectedArbitrageCompany = null;
      this.userWallet = null;
    },
  },
  async created() {
    // this.create({ data: {} });
    this.resetList();
    this.interv = setInterval(() => {
      this.resetList();
    }, 2000);
  },
  beforeDestroy() {
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>
