<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      :search="search"
      sort-by="created_at"
      :sort-desc="true"
      class="elevation-1 ma-2 ml-8"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{
            `${$t("deposit")}, ${$t("withdraw")}`
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div style="max-width: 300px !important">
            <v-text-field
              dense
              v-model="search"
              append-icon="mdi-magnify"
              outlined
              :label="$t('market_search_bar_placeholder')"
              hide-details
            ></v-text-field>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:[`item.dest_amount`]="{ item }">
        <span>{{ `${item.dest_amount} ${item.dest_currency.symbol}` }}</span>
      </template>
      <template v-slot:[`item.source_amount`]="{ item }">
        <span>{{
          `${item.source_amount} ${item.source_currency.symbol}`
        }}</span>
      </template>
      <template v-slot:[`item.current_cost`]="{ item }">
        <span>{{ `${item.current_cost} ${item.source_currency.symbol}` }}</span>
      </template>
      <template v-slot:[`item.difference`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference }}</span>
      </template>
      <template v-slot:[`item.difference_perc`]="{ item }">
        <span :style="diffColor(item.difference)">{{
          item.difference_perc
        }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/order";

export default {
  props: {
    filter: null,
  },
  data() {
    return {
      perpage: 5,
      search: "",
      list: [],
    };
  },
  computed: {
    ...mapGetters(model, {
      orders: "list",
    }),
    headers() {
      return [
        {
          text: this.$t("amount"),
          value: "dest_amount",
        },
        {
          text: this.$t("table_time"),
          value: "created_at",
        },
        {
          text: this.$t("type_title_table"),
          value: "order_type.name",
        },
        {
          text: this.$t("Method"),
          value: "order_method.name",
        },
      ];
    },
  },
  watch: {
    orders() {
      this.resetList();
    },
    filter() {
      this.resetList();
    },
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    resetList() {
      let list = [];
      if (this.filter) {
        list = this.orders.filter((el) => {
          for (let p in this.filter) {
            let spl = p.split(".");
            if (spl.length > 1) {
              let v = el[spl[0]];
              for (let i = 1; i < spl.length; i++) {
                v = v[spl[i]];
              }
              if (this.filter[p] != v) {
                return false;
              }
            } else {
              if (this.filter[p] != el[p]) {
                return false;
              }
            }
          }
          return true;
        });
      } else {
        list = this.orders;
      }
      this.list = list;
    },
    diffColor(diff) {
      let nm = parseFloat(diff);
      if (nm < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
  },
  async created() {
    this.resetList();
  },
};
</script>
