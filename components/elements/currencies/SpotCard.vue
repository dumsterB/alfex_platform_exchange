<template>
  <v-card class="ma-2 mr-8 pa-4">
    <v-row>
      <v-col :cols="6">
        <v-btn
          large
          block
          :class="!buy_sell ? 'green--text' : 'green'"
          :outlined="buy_sell"
          @click="buy_sell = true"
          >{{ $t("buy") }}</v-btn
        >
      </v-col>
      <v-col :cols="6">
        <v-btn
          large
          block
          :class="!buy_sell ? 'red' : 'red--text'"
          :outlined="!buy_sell"
          @click="buy_sell = false"
          >{{ $t("sell") }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="9">
        <span>{{ $t("available_balance_title") }}</span>
      </v-col>
      <v-col :cols="3">
        <span>{{ av_bal }} {{ curr }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <span>{{ $t("price") }}</span>
      </v-col>
      <v-col :cols="6">
        <v-text-field
          v-model="price"
          outlined
          dense
          hide-details
          readonly
          suffix="USD"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <span>{{ $t("amount") }}</span>
      </v-col>
      <v-col :cols="6">
        <v-text-field
          v-model="amount"
          outlined
          dense
          hide-details
          :suffix="currency"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-slider hide-details max="100" min="0" v-model="slider_v"></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <span>{{ $t("total") }}</span>
      </v-col>
      <v-col :cols="6">
        <span>{{ t_price }} {{t_price ? curr : ""}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-btn large block :class="buy_sell ? 'green' : 'red'">{{
          buy_sell ? $t("buy") : $t("sell")
        }}</v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-row>
      <v-col :cols="6">
        <v-btn large block class="green--text" outlined>{{
          $t("deposit_title")
        }}</v-btn>
      </v-col>
      <v-col :cols="6">
        <v-btn large block>{{ $t("withdraw") }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    currency: {
      type: String,
      default: "BTC",
    },
    price: 0,
  },
  data() {
    return {
      t_price: null,
      amount: null,
      buy_sell: true,
      slider_v: "0",
    };
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),
    av_bal() {
      let usd_bal;
      if (this.buy_sell) {
        usd_bal = this.wallet.find((el) => el.currency.symbol == "USD");
      } else {
        usd_bal = this.wallet.find((el) => el.currency.symbol == this.currency);
      }
      if (usd_bal) {
        return usd_bal.balance;
      }
      return 0;
    },
    curr() {
      if (this.buy_sell) {
        return "USD";
      } else {
        return this.currency;
      }
    },
  },
  methods: {
    ...mapActions("data/wallet", {
      fetchWallet: "fetchList",
    }),
    am_def() {
      if (this.amount) {
        let t_price;
        if (this.buy_sell) {
          t_price = parseFloat(this.price) * parseFloat(this.amount);
        } else {
          t_price = parseFloat(this.amount);
        }
        this.t_price = t_price.toFixed(4);
      } else {
        this.t_price = null;
      }
    },
    sl_def() {
      let v_n = parseFloat(this.slider_v);
      let amount;
      if (this.buy_sell) {
        amount = (this.av_bal * v_n) / parseFloat(this.price) / 100;
      } else {
        amount = (this.av_bal * v_n) / 100;
      }
      this.amount = Math.round(amount * 1000000) / 1000000;
    }
  },
  watch: {
    amount() {
      this.am_def();
    },
    slider_v() {
      this.sl_def();
    },
    price() {
      this.am_def();
    }
  },
  created() {
    this.fetchWallet();
  },
};
</script>
<style lang="scss" scoped>
</style>
