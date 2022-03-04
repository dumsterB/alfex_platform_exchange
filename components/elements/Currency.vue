<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          :id="`ttp-${currency.symbol}`"
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
                <span class="mt-1 ml-1">{{ currency.symbol }}</span>
              </div>
              <span>${{ currency.price }}</span>
            </v-list-item-content>
            <v-list-item-content class="coinList pa-1 flexNone">
              <div class="chip">24H</div>
              <span :style="diffColor(currency.change_p)"
                >{{ currency.change_p }}%</span
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <div class="ac-toolltip" >
        <span v-for="(item, i) in currs" :key="i">
          <span>
            {{ item.name }}
          </span>
          <span style="float: right"> ${{ item.price }} </span>
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
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      interv: null,
      currs: [],
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
    diffColor(diff) {
      if (diff < 0) {
        return "color: red;";
      } else {
        return "color: green;";
      }
    },
  },
  mounted() {
    let me = this;
    let sym = me.currency.symbol;
    let test = document.getElementById(`ttp-${sym}`);
    let socket = global.socket;
    test.addEventListener(
      "mouseenter",
      function (event) {
        socket.send(`{
          "method": "subscribe",
          "data": ["all_${sym}-USDT@ticker_10s"]
        }`);
        socket.onmessage = function (event) {
          if (event.data) {
            let json_d = JSON.parse(event.data);
            if (json_d && json_d.method == `all_${sym}-USDT@ticker_10s`) {
              let data = json_d.data ? json_d.data.data || [] : [];
              let crs = me.arbitrage_company.map((el) => {
                let res = {
                  id: el.id,
                  name: el.name,
                };
                let fnd = data.find((e) => e && e.company == el.name);
                if (fnd) {
                  res.price = fnd.price;
                }
                return res;
              });
              me.currs = crs.filter((el) => {
                return el.price ? true : false;
              });
            }
          }
        };
      },
      false
    );

    test.addEventListener(
      "mouseleave",
      function (event) {
        socket.send(`{
          "method": "unsubscribe",
          "data": ["all_${sym}-USDT@ticker_10s"]
        }`);
      },
      false
    );
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
