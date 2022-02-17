<template>
  <v-footer v-bind="localAttrs" :padless="padless" class="pa-0 mt-4">
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="pa-1">
        <v-btn v-for="icon in icons" :key="icon" class="mx-2" icon>
          <v-icon color="#9D9D9D" size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text pa-1">
        {{ new Date().getFullYear() }} — <strong>vue platform</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      "mdi-home-outline",
      "mdi-email-outline",
      "mdi-calendar-outline",
      "mdi-delete-outline",
    ],
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "absolute",
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>

<style lang="scss" scoped></style>
