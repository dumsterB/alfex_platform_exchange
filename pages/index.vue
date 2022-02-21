<template>
  <div></div>
</template>

<script>
import "../assets/scss/variables.scss";
// import "../plugins/vuetify.js";
export default {
  mounted() {
    this.$router.push({
      path: "/account",
    });
  },
};
</script>

<style lang="scss" scoped>
// @import "../plugins/vuetify.js";
</style>
