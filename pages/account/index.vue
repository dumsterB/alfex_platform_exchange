<template>
  <div>
    <v-row>
      <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
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
