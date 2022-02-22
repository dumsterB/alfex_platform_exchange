<template v-slot:[`item.action`]="{ item }">
  <v-card>
    <v-card-title class="d-flex">
      <v-img
        contain
        tag="img"
        height="auto"
        max-width="200px"
        :src="tradePlatform ? tradePlatform.logo : ''"
        :alt="tradePlatform ? tradePlatform.name : ''"
        class=""
      >
      </v-img>
    </v-card-title>
    <v-card-text>
      <v-container class="d-flex justify-lg-space-between font-weight-medium">
        <span class="dotsLine">{{ $t("marketplace_price") }}</span>
        <span>{{ tradePlatform ? tradePlatform.price : "" }}</span>
      </v-container>
      <v-container class="d-flex justify-lg-space-between">
        <span class="dotsLine">{{ `${$t("available_balance")}` }}</span>
        <span>{{ userWallet.balance }}</span>
      </v-container>
      <v-container>
        <v-text-field
          :label="`${$t('choose_amount')}`"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        name="goBack"
        type="submit"
        text
        @click="$emit('close')"
      >
        {{ action === "Sell" ? $t("sell") : $t("buy") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TradePosition",
  data() {
    return {
      rules: [
        // $t("amount_required")
        (value) => !!value || this.$t("amount_required"),
        (value) => (value && value.length >= 1) || "Min 1 characters",
      ],
    };
  },
  props: {
    tradeItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    action: {
      type: String,
      default: "",
    },
    userWallet: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tradePlatform: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.dotsLine {
  display: inline;
  width: inherit;
  border-bottom: dotted 1px;
}
</style>
