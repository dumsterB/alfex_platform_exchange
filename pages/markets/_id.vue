<template>
  <div>
    <Marketplace class="mt-4" :item="item.item" />
    <v-row class="mx-auto ml-1">
      <v-col class="" v-for="(curr, i) in item.item.currency" :key="i">
        <Currency :currency="curr" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Marketplace from "~/components/elements/Marketplace";
import Currency from "~/components/elements/Currency";
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";

export default {
  components: {
    Marketplace,
    Currency,
  },

  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
    item() {
      const marketplaceId = this.$route.path.split("/").slice(2).toString();
      return {
        item: this.companies.find((el) => el.id === Number(marketplaceId)),
      };
    },
  },

  methods: {
    ...mapActions(model, {
      fetchAC: "fetchList",
    }),
  },
  async mounted() {
    await this.fetchAC();
  },
};
</script>
