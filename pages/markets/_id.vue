<template>
  <div>
    <Marketplace class="mt-4" :item="item" />
  </div>
</template>

<script>
import Marketplace from "~/components/elements/Marketplace";
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";

export default {
  components: {
    Marketplace,
  },

  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
    item() {
      const marketplaceId = this.$route.path.split("/").slice(2).toString();
      return {
        item: this.companies.find((el) => el.id === marketplaceId),
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
    console.log(this.item);
    console.log(this.companies);
  },
};
</script>
