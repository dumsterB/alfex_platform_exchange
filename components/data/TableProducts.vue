<template>
  <div class="prod-table">
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      :search="search"
      hide-default-footer
      dense
      @click:row="handleClick"
      class="elevation-1 ma-4 ml-8 mt-8"
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <v-toolbar-title>{{ $t(title) }}</v-toolbar-title>
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
      <template v-slot:[`item.close`]="{ item }">
        <span>{{ item.close + " " + currency }}</span>
      </template>
      <template v-slot:[`item.change`]="{ item }">
        <span :style="diffColor(item.change)"
          >{{ item.change ? item.change.toFixed(4) : "0" }} {{ currency }}</span
        >
      </template>
      <template v-slot:[`item.change_perc`]="{ item }">
        <span :style="diffColor(item.change)"
          >{{ item.change_perc ? item.change_perc.toFixed(4) : "0" }}%</span
        >
      </template>
      <template v-slot:[`item.open`]="{ item }">
        <span>{{ item.open + " " + currency }}</span>
      </template>
      <template v-slot:[`item.low`]="{ item }">
        <span>{{ item.low + " " + currency }}</span>
      </template>
      <template v-slot:[`item.high`]="{ item }">
        <span>{{ item.high + " " + currency }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/trade";

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: "",
    currency: {
      type: String,
      default: "USD",
    },
  },
  data() {
    return {
      perpage: 3,
      search: "",
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("column_name"),
          value: "name",
          width: 200,
        },
        {
          text: this.$t("column_value"),
          value: "close",
          width: 200,
        },
        {
          text: this.$t("column_change"),
          value: "change",
          width: 200,
        },
        {
          text: this.$t("column_change") + " %",
          value: "change_perc",
          width: 200,
        },
        {
          text: this.$t("column_open"),
          value: "open",
          width: 200,
        },
        {
          text: this.$t("column_low"),
          value: "low",
          width: 200,
        },
        {
          text: this.$t("column_high"),
          value: "high",
        },
      ];
    },
  },
  methods: {
    diffColor(diff) {
      let nm = parseFloat(diff);
      if (nm < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
    handleClick(value) {
      this.$router.push({
        path: `/currency?id=${value.id}`,
      });
    },
  },
  watch: {},
  async created() {},
};
</script>
<style>
.prod-table tr {
  cursor: pointer;
}
</style>
