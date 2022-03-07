<template v-slot:[`item.action`]="{ item }">
  <v-card>
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
    <v-card-text>
      <v-container class="d-flex justify-lg-space-between font-weight-medium">
        <span class="dotsLine">{{ $t("marketplace_price") }}</span>
        <span>${{ price }}</span>
      </v-container>
      <v-container class="d-flex justify-lg-space-between">
        <span class="dotsLine">{{ `${$t("available_balance")}` }}</span>
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
      amount:'',
      wl:{},
      rules: [
        // $t("amount_required")
        (value) => !!value || this.$t("amount_required"),
        (value) => (value && value.length >= 1) || "Min 1 characters",
      ],
      loading: false
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
    balance(){
      if(this.action ==='Sell'){
        return this.userWallet.balance + ' ' +this.userWallet.currency.symbol
      }else {
        return  this.wl.balance + ' ' + this.wl.currency.symbol
      }
    }
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
        amount:this.amount,
        arbitrage_company_id:this.tradePlatform.id,
        session_start_type_id: this.action === 'Buy' ? 1 : 2,
        exchange_wallet_id: this.action ==='Buy' ? this.wl.id : this.userWallet.id,
        wallet_id: this.action === 'Buy' ? this.userWallet.id : this.wl.id,
      };
      // code
      console.log("as_data", as_data, this.wl);
      as_data.start_exchange_rate = this.price;
       let rs = await this.as_create({data: as_data});
       console.log("rs", rs);
        this.fetchWallet()
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    close() {
      this.$emit('close');
    }
  },
  async created() {
    await this.fetchAs();
    console.log("this.as", this.as);
    console.log( this.userWallet, 'wallet')
    this.wl=this.wallet.find(el => el.currency.symbol == "USD") || {};
  }
};
</script>

<style lang="scss" scoped>
.dotsLine {
  display: inline;
  width: inherit;
  border-bottom: dotted 1px;
}
</style>
