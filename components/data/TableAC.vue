<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn @click="buy(item)" class="ml-3 green--text" outlined>
          {{ $t("buy") }}
        </v-btn>
        <v-btn @click="sell(item)" class="ml-3 red--text" outlined>
          {{ $t("sell") }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";

export default {
  data() {
    return {
      perpage: 10,
      headers: [
        {
          text: "name",
          value: "name",
          width: 100,
        },
        {
          text: "price",
          value: "price",
          width: 100,
        },
        {
          text: "",
          value: "action",
          sortable: false,
        },
      ],
      list: [],
      interv: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      ac: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    resetList() {
      this.list = this.ac.map((el) => {
        let curr_cost = Math.random() * 1000;
        el.price = curr_cost.toFixed(2);
        return el;
      });
    },
    diffColor(diff) {
      let nm = parseFloat(diff);
      if (nm < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
    buy(item) {},
    sell(item) {},
  },
  async created() {
    this.resetList();
    this.interv = setInterval(() => {
      this.resetList();
    }, 2000);
  },
  beforeDestroy() {
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>
