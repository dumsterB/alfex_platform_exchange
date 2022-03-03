<template>
  <div class="ma-4">
    <div class="d-flex mdc-form-field--space-between">
      <p class="text-h6">{{ $t("exchange") }}</p>
      <a href="#">{{ $t("view_more") }}</a>
    </div>
    <v-card class="pa-3">
      <div class="justify-center text-center">
        <div class="pa-1 mt-2 justify-space-between d-flex">
          <v-text-field
            v-model="buy"
            label="0"
            class="mr-2"
            solo
            hide-details
            type="number"
          ></v-text-field>
          <v-autocomplete
            v-model="buy_curr"
            :items="currencies"
            label=""
            class="ml-2"
            item-text="name"
            item-value="symbol"
            solo
            hide-details
          >
            <template v-slot:item="{ item }">
              <img height="20" width="20" :src="item.logo" />
              <p class="ml-4 mt-3">{{ item.name }}</p>
            </template>
          </v-autocomplete>
        </div>
        <div class="pa-1 mt-2 mb-4 justify-space-between d-flex">
          <v-text-field
            v-model="pay"
            :label="$t('pay_with')"
            class="mr-2"
            solo
            hide-details
            type="number"
          ></v-text-field>
          <v-autocomplete
            v-model="pay_curr"
            :items="available_currs"
            label=""
            class="ml-2"
            item-text="name"
            item-value="symbol"
            solo
            hide-details
          >
            <template v-slot:item="{ item }">
              <img height="20" width="20" :src="item.logo" />
              <p class="ml-4 mt-3">{{ item.name }}</p>
            </template>
          </v-autocomplete>
        </div>
        <v-btn block large class="success-btn mb-3" elevation="0">{{
          $t("trade")
        }}</v-btn>
      </div>
    </v-card>
    <v-row class="mt-10 d-flex align-center justify-start">
      <v-col :cols="8">
        <v-text-field
          v-model="link_url"
          :label="$t('for_depositing_Bitcoin')"
          readonly
          outlined
          dense
          hide-details
          disabled
          ref="clone"
        ></v-text-field>
      </v-col>
      <v-col :cols="3">
        <v-icon large @click.prevent.stop="copyURL(link_url)">{{
          copied ? "mdi-check" : "mdi-content-copy"
        }}</v-icon>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const currencies = "data/currency";
export default {
  name: "Exchange",
  props: {
    currency: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      link_url: "bc1qu75kr9s9j0hpuf5qugqdastwwhzglz3gfwcz06",
      copied: false,
      pay: null,
      buy: null,
      pay_curr: "USD",
      buy_curr: "BTC",
      buy_checker: false,
      pay_checker: false
    };
  },
  methods: {
    ...mapActions(currencies, {
      fetchCurrencies: "fetchList",
    }),
    async copyURL() {
      try {
        //*TODO - документация обещает, что navigator.clipboard будет работать при https соеденении. Иначе нужен иной способ
        // await navigator.clipboard.writeText(this.link_url);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1500);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    pay() {
      if (this.pay_checker) {
        this.pay_checker = false;
      } else {
        let fl_p = parseFloat(this.pay);
        let pp = this.currency.find(el => el.symbol == this.pay_curr);
        let pp_n = pp && pp.price ? parseFloat(pp.price) : 1;
        let bb = this.currency.find(el => el.symbol == this.buy_curr);
        let bb_n = bb && bb.price ? parseFloat(bb.price) : 1;
        let sum = fl_p * pp_n / bb_n;
        this.buy_checker = true;
        this.buy = sum;
      }
    },
    buy() {
      if (this.buy_checker) {
        this.buy_checker = false;
      } else {
        let fl_p = parseFloat(this.buy);
        let pp = this.currency.find(el => el.symbol == this.pay_curr);
        let pp_n = pp && pp.price ? parseFloat(pp.price) : 1;
        let bb = this.currency.find(el => el.symbol == this.buy_curr);
        let bb_n = bb && bb.price ? parseFloat(bb.price) : 1;
        let sum = fl_p * bb_n / pp_n;
        this.pay_checker = true;
        this.pay = sum;
      }
    },
    pay_curr() {
      let fl_p = parseFloat(this.buy);
      let pp = this.currency.find(el => el.symbol == this.pay_curr);
      let pp_n = pp && pp.price ? parseFloat(pp.price) : 1;
      let bb = this.currency.find(el => el.symbol == this.buy_curr);
      let bb_n = bb && bb.price ? parseFloat(bb.price) : 1;
      let sum = fl_p * bb_n / pp_n;
      this.pay_checker = true;
      this.pay = sum;
    },
    buy_curr() {
      let fl_p = parseFloat(this.pay);
      let pp = this.currency.find(el => el.symbol == this.pay_curr);
      let pp_n = pp && pp.price ? parseFloat(pp.price) : 1;
      let bb = this.currency.find(el => el.symbol == this.buy_curr);
      let bb_n = bb && bb.price ? parseFloat(bb.price) : 1;
      let sum = fl_p * pp_n / bb_n;
      this.buy_checker = true;
      this.buy = sum;
    }
  },
  computed: {
    ...mapGetters(currencies, {
      currencies: "list",
    }),
    ...mapGetters("data/wallet", {
      wallets: "list",
    }),
    available_currs() {
      return this.wallets.map((el) => el.currency);
    },
  },
};
</script>

<style scoped></style>
