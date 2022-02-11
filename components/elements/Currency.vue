<template>
  <v-card class="ma-4" elevation="3" :width="200">
    <v-list-item three-line>
      <v-list-item-content>
        <v-img :src="currency.logo" :max-width="20"></v-img>
        <span>{{ currency.short_name.toUpperCase() }}</span>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    currency: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
  },
  methods: {},
  mounted() {
    // console.log(this.currency)
  },
};
</script>
