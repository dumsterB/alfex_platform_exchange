<template>
  <div class="ma-4">
    <div class="d-flex mdc-form-field--space-between">
      <p class="text-h6">{{ $t("exchange") }}</p>
      <a href="#">{{ $t("view_more") }}</a>
    </div>
    <v-card class="pa-3">
      <div class="justify-center text-center">
        <div class="pa-1 mt-2 justify-space-between d-flex">
          <v-text-field
            label="0"
            class="mr-2"
            solo
            hide-details
            type="number"
          ></v-text-field>
          <v-autocomplete
            :items="currencies"
            label="BTC"
            class="ml-2"
            item-text="name"
            solo
            hide-details
          >
            <template v-slot:item="{ item }">
              <img height="20" width="20" :src="item.logo" />
              <p class="ml-4 mt-3">{{ item.name }}</p>
            </template>
          </v-autocomplete>
        </div>
        <div class="pa-1 mt-2 mb-4 justify-space-between d-flex">
          <v-text-field
            :label="$t('pay_with')"
            class="mr-2"
            disabled
            solo
            hide-details
            type="number"
          ></v-text-field>
          <v-autocomplete
            :items="available_currs"
            label="USD"
            class="ml-2"
            item-text="name"
            solo
            hide-details
          >
            <template v-slot:item="{ item }">
              <img height="20" width="20" :src="item.logo" />
              <p class="ml-4 mt-3">{{ item.name }}</p>
            </template>
          </v-autocomplete>
        </div>
        <v-btn x-large class="success-btn" elevation="0">{{
          $t("trade")
        }}</v-btn>
      </div>
    </v-card>
    <v-row class="mt-10 d-flex align-center justify-start">
      <v-col :cols="8">
        <v-text-field
          v-model="link_url"
          :label="$t('for_depositing_Bitcoin')"
          readonly
          outlined
          dense
          hide-details
          disabled
          ref="clone"
        ></v-text-field>
      </v-col>
      <v-col :cols="3">
        <v-icon large @click.prevent.stop="copyURL(link_url)">{{
          copied ? "mdi-check" : "mdi-content-copy"
        }}</v-icon>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const currencies = "data/currency";
export default {
  name: "Exchange",
  currency: {
      type: Array,
      default: () => {
        return []
      }
    },
  data() {
    return {
      link_url: "bc1qu75kr9s9j0hpuf5qugqdastwwhzglz3gfwcz06",
      copied: false,
    };
  },
  methods: {
    ...mapActions(currencies, {
      fetchCurrencies: "fetchList",
    }),
    async copyURL() {
      try {
        //*TODO - документация обещает, что navigator.clipboard будет работать при https соеденении. Иначе нужен иной способ
        // await navigator.clipboard.writeText(this.link_url);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1500);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters(currencies, {
      currencies: "list",
    }),
    ...mapGetters("data/wallet", {
      wallets: "list",
    }),
    available_currs() {
      return this.wallets.map((el) => el.currency);
    },
  },
};
</script>

<style scoped></style>
