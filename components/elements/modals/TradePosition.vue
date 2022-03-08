<template v-slot:[`item.action`]="{ item }">
  <v-card>
    <div
      class="d-flex darken-1 pa-5 white--text font-weight-black title"
    >
      <v-card-title class="d-flex">
        <v-img
          contain
          tag="img"
          height="auto"
          max-width="200px"
          :src="tradePlatform ? tradePlatform.logo : ''"
          :alt="tradePlatform ? tradePlatform.name : ''"
          class=""
        >
        </v-img>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-btn class="mt-2" icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-card-text>
      <v-container class="d-flex justify-lg-space-between font-weight-medium">
        <span>{{ $t("marketplace_price") }}</span>
        <span>{{ price }} USD</span>
      </v-container>
      <v-container class="d-flex justify-lg-space-between">
        <span>{{ `${$t("available_balance")}` }}</span>
        <span>{{ balance }}</span>
      </v-container>
      <v-container>
        <v-text-field
          :label="`${$t('choose_amount')}`"
          v-model="amount"
          :rules="rules"
          hide-details="auto"
          type="number"
        ></v-text-field>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        name="goBack"
        type="submit"
        text
        :loading="loading"
        @click="save"
      >
        {{ action === "Sell" ? $t("sell") : $t("buy") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TradePosition",
  data() {
    return {
      amount: "",
      wl: {},
      rules: [
        // $t("amount_required")
        (value) => !!value || this.$t("amount_required"),
        (value) => (value && value.length >= 1) || "Min 1 characters",
      ],
      loading: false,
    };
  },
  props: {
    tradeItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    price: {
      default: null,
    },
    action: {
      type: String,
      default: "",
    },
    userWallet: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tradePlatform: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters("data/arbitrage_session", {
      as: "list",
    }),
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),
    balance() {
      if (this.userWallet.currency && this.wl.currency) {
        if (this.action === "Sell") {
          return (
            this.userWallet.balance + " " + this.userWallet.currency.symbol
          );
        } else {
          return this.wl.balance + " " + this.wl.currency.symbol;
        }
      }
    },
  },
  methods: {
    ...mapActions("data/arbitrage_session", {
      as_create: "create",
      fetchAs: "fetchList",
    }),
    ...mapActions("data/wallet", {
      fetchWallet: "fetchList",
    }),
    async save() {
      this.loading = true;
      let as_data = {
        amount: this.amount,
        arbitrage_company_id: this.tradePlatform.id,
        session_start_type_id: this.action === "Buy" ? 1 : 2,
        exchange_wallet_id: this.wl.id,
        wallet_id: this.userWallet.id,
      };
      // code
      console.log("as_data", as_data, this.wl);
      as_data.start_exchange_rate = this.price;
      let rs = await this.as_create({ data: as_data });
      console.log("rs", rs);
      this.fetchWallet();
      setTimeout(() => {
        this.loading = false;
        if(rs.status===200){
          this.close();
        }
      }, 500);

    },

    close() {
      this.$emit("close");
    },
  },
  async created() {
    await this.fetchAs();
    console.log("this.as", this.as);
    console.log(this.userWallet, "wallet");
    this.wl = this.wallet.find((el) => el.currency.symbol == "USD") || {};
  },
};
</script>

<style lang="scss" scoped>
.dotsLine {
  display: inline;
  width: inherit;
  border-bottom: dotted 1px;
}
</style>
