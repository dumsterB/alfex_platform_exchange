<template>
  <div class="">
    <v-row>
      <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
        <div class="d-flex mt-2 mdc-form-field--space-between justify-content-beetween currencyNavbar">
          <div>
            <p class="text-h6 ml-10">{{$t('markets')}}</p>
          </div>
          <div class="d-flex">
            <p elevation="0" class="mr-4 mt-2"> <v-icon>mdi-filter</v-icon> {{$t('filters')}}</p>
            <v-text-field
              :label="$t('market_search_bar_placeholder')"
              outlined
              class="searchCurrency "
              dense
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
        </div>
        <v-row class="ml-4">
          <v-col
            class="d-flex justify-center"
            v-for="(curr, i) in currencies"
            :key="i"
          >
            <Currency :currency="curr" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12" :xs="12">
        <Wallet></Wallet>
        <Exchange></Exchange>
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
  async mounted() {
    await this.fetchCurrencies();
    await this.fetchAC();
  },
};
</script>
