<template>
  <div>
    <Marketplace class="mt-4" :item="item" />
    <v-row class="mx-auto ml-1">
      <v-col class="" v-for="(curr, i) in currencies" :key="i">
        <Currency :currency="curr" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Marketplace from "~/components/elements/Marketplace";
import Currency from "~/components/elements/Currency";

const model = "data/arbitrage_company";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  components: {
    Marketplace,
    Currency,
  },

  computed: {
    ...mapGetters(model, {
      companies: "list",
      companyById: "byId",
    }),
    item() {
      let item = this.companyById(parseInt(this.$route.params.id));
      return item ? item : {};
    },
    currencies() {
      return this.item.currency;
    },
  },

  methods: {
    ...mapActions(model, {
      fetchCompanyById: "fetchSingle",
      fetchAC: "fetchList",
    }),
  },

  async mounted() {
    await this.fetchAC();
  },
};
</script>
