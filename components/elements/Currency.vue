<template>
  <div>
    <template> </template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="currecyCard"
          elevation="3"
          v-bind="attrs"
          v-on="on"
          :width="220"
        >
          <v-list-item
            three-line
            class="pa-2"
            @click="$router.push(`/currency?id=${currency.id}`)"
          >
            <v-list-item-content class="pa-1">
              <div class="d-flex">
                <v-img :src="currency.logo" :max-width="20"></v-img>
                <span class="mt-1 ml-1">{{
                  currency.short_name.toUpperCase()
                }}</span>
              </div>
              <span>{{ cost }}$</span>
            </v-list-item-content>
            <v-list-item-content class="coinList pa-1 flexNone">
              <div class="chip">24H</div>
              <span :style="diffColor(diff)">{{ diff }}%</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <div class="ac-toolltip">
        <span v-for="(item, i) in arbitrage_company" :key="i">
          {{ item.name }}
          <br />
        </span>
      </div>
    </v-tooltip>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    currency: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      cost: (Math.random() * 1000).toFixed(4),
      diff: "0",
      interv: null,
    };
  },
  watch: {},
  computed: {
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
    ...mapGetters("data/arbitrage_company", {
      arbitrage_company: "list",
    }),
  },
  methods: {
    calc_cost() {
      let cost = parseFloat(this.cost);
      let diff = (Math.random() * cost) / 10 - (Math.random() * cost) / 10;
      let curr_cost = cost + diff;
      this.cost = curr_cost.toFixed(4);
      let diff_proc = (diff * 100) / curr_cost;
      this.diff = diff_proc.toFixed(4);
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
  mounted() {
    this.interv = setInterval(() => {
      this.calc_cost();
    }, 1000);
  },
  beforeDestroy() {
    if (this.interv) {
      clearInterval(this.interv);
    }
  },
};
</script>
<style lang="scss" scoped>
.ac-toolltip {
  width: 160px;
}
.coinList {
  width: 80px;
}
.chip {
  background-color: #3d3d3d;
}
html[theme="light"] {
  .chip {
    background-color: #ebebeb;
  }
}
</style>
