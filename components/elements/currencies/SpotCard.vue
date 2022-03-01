<template>
  <v-card class="ma-2 mr-8 pa-4">
    <v-row>
      <v-col :cols="6">
        <v-btn
          large
          block
          :class="!buy_sell ? 'green--text' : 'green'"
          :outlined="buy_sell"
          @click="buy_sell = true"
          >{{ $t("buy") }}</v-btn
        >
      </v-col>
      <v-col :cols="6">
        <v-btn
          large
          block
          :class="!buy_sell ? 'red' : 'red--text'"
          :outlined="!buy_sell"
          @click="buy_sell = false"
          >{{ $t("sell") }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="9">
        <span>{{ $t("available_balance_title") }}</span>
      </v-col>
      <v-col :cols="3">
        <span>{{ 100 }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <span>{{ $t("price") }}</span>
      </v-col>
      <v-col :cols="6">
        <v-text-field
          v-model="price"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <span>{{ $t("amount") }}</span>
      </v-col>
      <v-col :cols="6">
        <v-text-field
          v-model="amount"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-slider hide-details max="100" min="0" value="50"></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="9">
        <span>{{ $t("total") }}</span>
      </v-col>
      <v-col :cols="3">
        <span>{{ 100 }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-btn large block :class="buy_sell ? 'green' : 'red'">{{
          buy_sell ? $t("buy") : $t("sell")
        }}</v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-row>
      <v-col :cols="6">
        <v-btn large block class="green--text" outlined>{{
          $t("deposit_title")
        }}</v-btn>
      </v-col>
      <v-col :cols="6">
        <v-btn large block>{{ $t("withdraw") }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {
      price: 100,
      amount: null,
      buy_sell: true,
    };
  },
  computed: {},
  methods: {},
  watch: {},
  async created() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
</style>
