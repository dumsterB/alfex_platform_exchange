<template>
  <v-list tag="section" class="mt-4 mr-4 mb-4 ml-4 bgColor">
    <v-list-item-group tag="ul" class="pl-0 d-flex flex-wrap">
      <MarketItem
        v-for="(company, i) in companies"
        :key="i"
        :item="company"
        :prices="prices[company.name]"
        :currencies="fav_currencies"
      />
      <p v-if="!companies.length">
        {{ $t("no_market_place") }}
      </p>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MarketItem from "~/components/elements/MarketItem";
const model = "data/arbitrage_company";

export default {
  components: {
    MarketItem,
  },
  data() {
    return {
      fav_currs: ["BTC", "ETH", "BCH", "LUNA", "XRP"],
      send_str: "",
      prices: {},
      interv: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
    ...mapGetters("data/currency", {
      currency: "list",
    }),
    fav_currencies() {
      return this.currency.filter(el => {
        let fnd = this.fav_currs.find(e => e == el.symbol);
        if (fnd) {
          return true;
        }
        return false;
      })
    }
  },
  methods: {
    ...mapActions(model, {
      fetchAC: "fetchList",
    }),
  },
  async mounted() {
    let me = this;
    await me.fetchAC();
    let socket = global.socket;
    let send_str = "";
    me.fav_currs.forEach((element, i) => {
      send_str += `"all_${element}-USDT@ticker_5s"`;
      if (i != me.fav_currs.length - 1) {
        send_str += ", ";
      }
    });
    me.send_str = send_str;
    socket.send(`{
      "method": "subscribe",
      "data": [${me.send_str}]
    }`);

    socket.onmessage = function (event) {
      if (event.data) {
        let json_d = JSON.parse(event.data);
        me.fav_currs.forEach((curr) => {
          if (json_d && json_d.method == `all_${curr}-USDT@ticker_5s`) {
            let data = json_d.data ? json_d.data.data || [] : [];
            me.companies.forEach(cmp => {
              let fnd = data.find(el => el.company == cmp.name);
              if (fnd && fnd.price) {
                if (!me.prices[cmp.name]) me.prices[cmp.name] = {};
                me.prices[cmp.name][curr] = fnd.price;
              }
            })
          }
        });
      }
    };
  },
  created() {
    setTimeout(() => {
      this.prices = Object.assign({}, this.prices)
    }, 1500)
    this.interv = setInterval(() => {
      this.prices = Object.assign({}, this.prices)
    }, 4000)
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": [${this.send_str}]
    }`);
    if (this.interv) {
      clearInterval(this.interv)
    }
  },
};
</script>

<style lang="scss" scoped>
.bgColor {
  background-color: transparent !important;
  background: transparent !important;
}
</style>
