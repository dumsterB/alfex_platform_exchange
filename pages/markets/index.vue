<template>
  <v-list tag="section" class="mt-4 mr-4 mb-4 ml-4">
    <v-list-item-group tag="ul" class="pl-0 d-flex flex-wrap">
      <MarketItem v-for="(company, i) in companies" :key="i" :item="company" />
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MarketItem from "~/components/elements/MarketItem";
const model = "data/arbitrage_company";

export default {
  components: {
    MarketItem,
  },
  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
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
