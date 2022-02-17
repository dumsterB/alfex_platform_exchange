<template>
  <v-card tag="section" class="mx-auto ml-4 mr-4 mb-4">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>
    <v-card-title tag="h2">{{ item.heading }}</v-card-title>
    <v-card-subtitle tag="h3"> {{ item.date }}</v-card-subtitle>
    <v-card-text tag="p" class="text--primary">
      <div>{{ item.content }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Article",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },

  mounted() {},
};
</script>
<style lang="scss" scoped></style>
