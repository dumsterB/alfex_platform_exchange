<template>
  <v-row>
    <v-col
      :cols="12"
      :md="2"
      :lg="2"
      :sm="12"
      :xs="12"
      v-for="(val, i) in list"
      :key="i"
    >
      <p class="ma-0 pa-0 mt-3">{{ val.name }}</p>
      <p class="ma-0 pa-0 mt-1">{{ val.price }}</p>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";

export default {
  props: {
    currency: {
      type: String,
      default: "btc",
    },
  },
  data() {
    return {
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
    resetList() {
      let list = this.ac.map((el) => {
        let curr_cost = Math.random() * 1000;
        el.price = curr_cost.toFixed(2);
        return el;
      });
      if (list.length > 5) {
        this.list = list.slice(0, 5);
      } else {
        this.list = list;
      }
    },
  },
  watch: {
    currency() {
      let indicator = this.list;
      indicator.forEach((el) => {
        el.price = (0.5 + Math.random()) * el.value;
      });
      let list = Object.assign([], indicator);
      if (list.length > 5) {
        this.list = list.slice(0, 5);
      } else {
        this.list = list;
      }
    },
  },
  async created() {
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
