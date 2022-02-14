<template>
  <v-card class="mx-auto" max-width="320" style="border-radius: 12px">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>
    <v-card-title>{{ item.heading }}</v-card-title>

    <v-card-text class="text--primary">
      <div>{{ item.excerpt }}</div>
    </v-card-text>

    <v-card-actions class="justify-space-between">
      <v-card-subtitle> {{ item.date }} </v-card-subtitle>

      <v-btn color="#23ad41" text>
        {{ $t("read_more") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useLocale } from "vuetify";
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup() {
    const { t } = useLocale();
  },
  mounted() {
    console.log(this.item);
  },
};
</script>
<style lang="scss" scoped></style>
