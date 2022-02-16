<template>
  <v-card tag="section" class="mx-auto ml-4 mr-4 mb-4">
    <div class="d-flex align-center">
      <v-card-title tag="h2">{{
        `${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`
      }}</v-card-title>
      <v-img
        contain="true"
        height="auto"
        max-width="200px"
        v-bind:src="item.logo"
        class=""
      >
      </v-img>
    </div>
    <v-card-subtitle tag="h3" v-text="item.created_at"> </v-card-subtitle>
    <v-card-text tag="p" class="text--primary">
      <div v-text="item.name"></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Marketplace",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
