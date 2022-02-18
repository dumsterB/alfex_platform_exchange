<template>
  <v-row>
    <v-col
      class="mt-3"
      :cols="12"
      :md="2"
      :lg="2"
      :sm="12"
      :xs="12"
      v-for="(val, i) in list"
      :key="i"
    >
      <v-btn
        x-large
        outlined
        :width="150"
        :class="val.clicked ? 'btn-clicked' : ''"
        @click="changeClicked(val)"
      >
        <div>
          <p class="ma-0 pa-3 pb-0 mt-0">{{ val.name }}</p>
          <p class="price ma-0 pa-3 pt-0 mt-1">{{ val.price }}</p>
        </div>
      </v-btn>
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
      let list = this.ac.map((el, i) => {
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
    changeClicked(val) {
      let list = this.list.map((el) => {
        if (el.id == val.id) {
          el.clicked = true;
        } else {
          el.clicked = false;
        }
        return el;
      });
      this.list = list;
      this.$emit('clicked', val.name)
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
    this.list.forEach((el, i) => {
      if (i == 0) {
        el.clicked = true;
      } else {
        el.clicked = false;
      }
    });
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
<style lang="scss" scoped>
.price {
  font-size: 13px !important;
}
.btn-clicked {
  background-color: #313131;
}
html[theme="light"] {
  .btn-clicked {
    background-color: #e6e6e6;
  }
}
</style>
