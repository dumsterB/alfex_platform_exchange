<template>
  <v-card
    @click="handlerOpenMarketPage"
    tag="li"
    class="pl-0 pr-0 mb-2 ml-2 mr-2"
    :width="380"
  >
    <a>
      <div class="d-flex justify-space-between">
        <v-card-title>{{ `${item.name}` }}</v-card-title>
        <v-icon
          @click.prevent.stop="togglerFavorite"
          class="yellow--text ma-4 pa-1"
          >{{ isFavorite ? "mdi-star" : "mdi-star-outline" }}</v-icon
        >
      </div>

      <v-list class="mt-4 mr-4 mb-4 ml-4">
        <v-list-item
          class=""
          disabled
          v-for="(cur, i) in item.currency.slice(0, 5)"
          :key="i"
        >
          <v-list-item-avatar>
            <v-img v-bind:src="cur.logo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content v-text="cur.name"></v-list-item-content>
          <v-list-item-content v-text="cur.symbol"></v-list-item-content>
        </v-list-item>
      </v-list>
    </a>
  </v-card>
</template>

<script>
export default {
  name: "MarketItem",
  data() {
    return {
      isFavorite: false,
      fav_currs: ["BTC", "ETH", "BCH", "LUNA", "XRP"]
    };
  },
  computed: {},
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  methods: {
    togglerFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    handlerOpenMarketPage() {
      this.$router.push({
        path: `/markets/${this.item.id}`,
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
