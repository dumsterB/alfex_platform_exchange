<template v-slot:[`item.action`]="{ item }">
  <v-card>
    <v-card-title class="d-flex">
      <span class="text-h5">{{ $t("close_order") }}</span>
      <span class="text-h6">{{ $t("choose_marketplace") }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-radio-group v-model="defaultRadioButton">
          {{ "You choosed before" }}
          <v-radio
            :label="`${item.arbitrage_company.name} ${item.start_exchange_rate} ${item.wallet.currency.name}`"
            :value="item.amount"
            @click="companiesItemList(item.amount)"
          ></v-radio>
        </v-radio-group>
      </v-container>
      <v-container>
        <v-radio-group
          v-model="defaultRadioButton"
          v-for="(elem, i) in companies"
          :key="i"
          column
        >
          <v-radio
            :label="`${elem.name} ${elem.price} ${item.wallet.currency.name}`"
            :value="elem.price"
            @click="companiesItemList(elem)"
          ></v-radio>
        </v-radio-group>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" name="goBack" text @click="$emit('close')">
        {{ $t("go_back") }}
      </v-btn>
      <v-btn
        color="green darken-3"
        name="agree"
        text
        @click="$emit('close')"
        type="submit"
      >
        {{ $t("ok") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";
export default {
  name: "ClosePosition",
  data() {
    return {
      defaultRadioButton: this.item.amount,
    };
  },
  props: {
    item: {
      item: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    receivedItem() {
      return this.item;
    },
    companiesItemList(elem) {
      this.defaultRadioButton = elem.price;
    },
  },
  mounted() {
    this.fetchList();
    this.receivedItem();
    console.log("this.companies :>> ", this.companies);
  },
};
</script>
