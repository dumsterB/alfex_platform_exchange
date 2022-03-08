<template v-slot:[`item.action`]="{ item }">
  <v-card :height="height ? height : undefined">
    <v-card-title class="d-flex">
      <v-img
        contain
        tag="img"
        height="60px"
        :src="tradePlatform ? tradePlatform.logo : ''"
        :alt="tradePlatform ? tradePlatform.name : ''"
        class=""
      >
      </v-img>
    </v-card-title>
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
          outlined
          dense
          hide-details="auto"
          type="number"
        ></v-text-field>
      </v-container>
    </v-card-text>
    <v-card-actions v-if="action == 'Both'">
      <v-btn
        class="c-actions-sell"
        color="red darken-1"
        type="submit"
        text
        :loading="loadingSell"
        @click="save('Sell')"
      >
        {{ $t("sell") }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="c-actions"
        color="green darken-1"
        type="submit"
        text
        :loading="loading"
        @click="save('Buy')"
      >
        {{ $t("buy") }}
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else class="c-actions">
      <v-btn
        color="green darken-1"
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
      loadingSell: false
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
    height: null,
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
    async save(act) {
      let load = "loading";
      if (!act) {
        act = this.action;
      } else {
        if (act == "Sell") {
          load = "loadingSell"
        }
      }
      this[load] = true;
      let as_data = {
        amount: this.amount,
        arbitrage_company_id: this.tradePlatform.id,
        session_start_type_id: act === "Buy" ? 1 : 2,
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
        this[load] = false;
        this.$emit("reload");
        this.close();
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
.c-actions {
  position: absolute;
  margin: 12px;
  bottom: 0;
  right: 0;
}
.c-actions-sell {
  position: absolute;
  margin: 12px;
  bottom: 0;
  left: 0;
}
</style>
