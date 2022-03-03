<template>
  <div class="ma-4">
    <div class="d-flex mdc-form-field--space-between">
      <p class="text-h6">{{ $t("my_wallet") }}</p>
      <a @click="$router.push('/wallet')">{{ $t("view_more") }}</a>
    </div>
    <v-card class="pa-3">
      <div class="justify-center">
        <div class="text-center justify-center d-flex pa-4">
          <div>
            <div>{{ $t("total") }}</div>
            <div id="chart ">
              <apexchart
                class="apexchart"
                type="donut"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
            <strong class="text-h4">${{total_sum ? total_sum.toFixed(4) : ""}}</strong>
            <div>≈ {{total_sum_btc ? total_sum_btc.toFixed(4) : ""}} BTC</div>
          </div>
        </div>
        <div class="mt-10">
          <v-card class="mx-auto" elevation="0" tile>
            <div v-for="(coin, i) of filteredArr" :key="i">
              <v-list-item class="pa-1">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-badge
                      class="ml-1 mb-1"
                      :color="chartOptions.colors[i]"
                      dot
                    ></v-badge>
                    <span class="ml-2">{{
                      coin.currency
                    }}</span></v-list-item-title
                  >
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-content class="flexNone">
                  <v-list-item-title>${{ coin.balance ? coin.balance.toFixed(4) : "" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>
            <div v-if="getLengthArr > 0">
              <v-list-item class="pa-1">
                <v-list-item-title>
                  <v-badge
                    class="ml-1 mb-1"
                    dot
                    :color="chartOptions.colors[5]"
                  ></v-badge>
                  <span class="ml-2">
                    {{ getLengthArr + " " + $t("others") }}</span
                  ></v-list-item-title
                >
                <v-spacer></v-spacer>
                <v-list-item-content class="flexNone">
                  <v-list-item-title> ${{ other_sum ? other_sum.toFixed(4) : "" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import apexchart from "vue-apexcharts";

const wallet = "data/wallet";
const currencies = "data/currency";
export default {
  components: {
    apexchart,
  },
  name: "Wallet",
  props: {
    currency: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      apexArrBalance: [],
      apexArrSymbol: [],
      someArray: [],
      getLengthArr: 0,
      other_sum: 0,
      total_sum: 0,
      total_sum_btc: 0,
      max_items: 5,
      series: [1, 2, 3, 3],
      filteredArr: [],
      counter: 0,
      chartOptions: {
        colors: [
          "#53d923",
          "#d9a823",
          "#0fb7d9",
          "#7762a8",
          "#b52d9c",
          "#04151a",
        ],
        labels: [],
        chart: {
          type: "donut",
        },
        stroke: {
          width: 0,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                height: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
  },
  methods: {
    ...mapActions(wallet, {
      fetchWallet: "fetchList",
    }),
    ...mapActions(currencies, {
      fetchCurrencies: "fetchList",
    }),
    filteredArrInit() {
      let data = this.wallet.map((el) => {
        return {
          balance: el.balance,
          currency: el.currency.symbol,
        };
      });
      this.total_sum = 0;
      if (this.currency && this.currency.length > 0) {
        data.forEach((element) => {
          let fnd = this.currency.find((el) => el.symbol == element.currency);
          if (fnd && fnd.price) {
            element.balance =
              parseFloat(element.balance) * parseFloat(fnd.price);
            this.total_sum += element.balance;
          }
        });
        let fnd_btc = this.currency.find((el) => el.symbol == "BTC");
        if (fnd_btc) {
          this.total_sum_btc = this.total_sum / parseFloat(fnd_btc.price);
        }
      }
      

      data.sort((a, b) => {
        return b.balance - a.balance;
      });
      if (data.length > 5) {
        this.getLengthArr = data.length - 5;
        let other_sum = 0;
        for (let i = 5; i < data.length; i++) {
          other_sum += data[i].balance;
        }
        this.other_sum = other_sum;
        this.filteredArr = data.slice(0, 5);
      } else {
        this.filteredArr = data;
      }
      
      this.apexArrSymbol = this.filteredArr.map((e) => `${e.currency} $`);
      this.apexArrBalance = this.filteredArr.map((e) => e.balance);
      if (this.getLengthArr > 0) {
        this.apexArrBalance.push(this.other_sum);
        this.apexArrSymbol.push(this.$t("others"));
      }
      this.chartOptions.labels = this.apexArrSymbol;
      this.series = this.apexArrBalance;
      this.chartOptions = Object.assign({}, this.chartOptions);
    },
  },

  watch: {
    currency() {
      if (this.counter < 2) {
        this.counter += 1;
        this.filteredArrInit();
      }
    },
  },

  created() {
    this.fetchWallet();
  },
};
</script>

<style>
.apexcharts-legend.apx-legend-position-right {
  display: none;
}
</style>
