<template>
  <v-card tag="section" class="mx-auto ml-4 mr-4 mb-4">
    <v-img class="white--text align-end" height="200px" :src="item.logo">
    </v-img>
    <v-card-title tag="h2">{{ item.name }}</v-card-title>
    <v-card-subtitle tag="h3"> {{ item.created_at }}</v-card-subtitle>
    <v-card-text tag="p" class="text--primary">
      <div>{{ item.name }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Marketplace",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    console.log(this.props);
  },
};
</script>

<style lang="scss" scoped></style>
