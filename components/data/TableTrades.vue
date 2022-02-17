<template>
  <div>
    <v-data-table
      :items="list"
      :headers="headers"
      :items-per-page="perpage"
      class="elevation-1 ma-4 ml-8"
    >
      <template v-slot:[`item.difference`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference }}</span>
      </template>
      <template v-slot:[`item.difference_perc`]="{ item }">
        <span :style="diffColor(item.difference)">{{ item.difference_perc }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/trade";

export default {
  data() {
    return {
      perpage: 5,
      headers: [
        {
          text: "bought",
          value: "dest_amount",
          width: 100,
        },
        {
          text: "bought_currency",
          value: "dest_currency.name",
        },
        {
          text: "date",
          value: "created_at",
        },
        {
          text: "paid",
          value: "source_amount",
          width: 80,
        },
        {
          text: "paid_currency",
          value: "source_currency.name",
        },
        {
          text: "current_cost",
          value: "current_cost",
        },
        {
          text: "difference",
          value: "difference",
          width: 120,
        },
        {
          text: "difference %",
          value: "difference_perc",
          width: 140,
        },
      ],
      list: [],
      interv: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      trades: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    resetList() {
      this.list = this.trades.map((el) => {
        let diff =
          (Math.random() * el.source_amount) / 10 -
          (Math.random() * el.source_amount) / 10;
        let curr_cost = el.source_amount + diff;
        el.current_cost = curr_cost.toFixed(4);
        let diff_proc = (diff * 100) / curr_cost;
        el.difference = diff.toFixed(4);
        el.difference_perc = `${diff_proc.toFixed(4)} %`;
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
  },
  async created() {
    await this.fetchList();
    this.resetList();
    this.interv = setInterval(() => {
      this.resetList();
    }, 1000);
  },
  beforeDestroy() {
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>
