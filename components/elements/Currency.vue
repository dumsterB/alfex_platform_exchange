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
    cost: {
      type: Number,
      default: 0,
    },
    diff: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
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
    diff_str() {
      let diff_proc = (this.diff * 100) / this.cost;
      return this.diff_proc.toFixed(4);
    },
    cost_str() {
      return this.cost.toFixed(4);
    }
  },
  methods: {
    diffColor(diff) {
      if (diff < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
  },
  mounted() {
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
.coinList .chip {
  background-color: #3d3d3d;
  padding: 1px;
  text-align: center;
  font-size: 13px;
  border-radius: 20px;
  width: 5px !important;
}
.currecyCard {
  cursor: pointer;
}
html[theme="light"] {
  .chip {
    background-color: #ebebeb;
  }
}
</style>
