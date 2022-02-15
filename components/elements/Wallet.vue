<template>
  <div class="ma-4">
    <div class="d-flex mdc-form-field--space-between">
      <p class="text-h6">{{$t('my_wallet')}}</p>
      <a href="">{{$t('view_more')}}</a>
    </div>
    <v-card class="pa-3">
      <div class="justify-center">
        <div class="text-center pa-4">
          <div>Всего</div>
          <div id="chart">
            <apexchart width="300" type="donut" :options="chartOptions" :series="series"></apexchart>
          </div>
          <strong class="text-h4">$380.787</strong>
          <div>≈ 0.00870 BTC</div>
        </div>
        <div class="mt-10">
          <v-card
            class="mx-auto"
            elevation="0"
            tile
          >
            <div v-for="(coin,i) of filteredArr" :key="i">
              <v-list-item class="pa-1" >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-badge class="ml-1 mb-1" dot></v-badge>
                    <span class="ml-2">{{ coin.currency.symbol }}</span></v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-content class="flexNone">
                  <v-list-item-title>{{ coin.balance }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>
            <div >
              <v-list-item class="pa-1" >
                  <v-list-item-title>
                    <v-badge class="ml-1 mb-1" dot></v-badge>
                    <span class="ml-2" ><a href=""> Посмотреть остальные</a> </span></v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-content class="flexNone">
                  <v-list-item-title> {{getLengthArr}}</v-list-item-title>
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
import {mapActions, mapGetters} from "vuex";
import apexchart from 'vue-apexcharts'
const wallet = 'data/wallet'
export default {
  components:{
    apexchart
  },
  name: "Wallet",
  data() {
    return {
      filteredArr:[],
      getLengthArr:'',
      coins: [
        {
          color: 'red',
          currency: 'USD',
          quantity: '$74.491'
        },
        {
          color: 'pink',
          currency: 'BNB',
          quantity: '$134.491'
        },
        {
          color: 'blue',
          currency: 'ADA',
          quantity: '$14.421'
        },
        {
          color: 'yellow',
          currency: 'BTC',
          quantity: '$74.491'
        },
        {
          color: 'red',
          currency: 'ETH',
          quantity: '$74.491'
        }
      ],
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),

  },
  methods:{
    ...mapActions(wallet, {
      fetchWallet: "fetchList",
    })
  },

 async mounted() {
    await this.fetchWallet()
   this.filteredArr=this.wallet.slice(0,5)
   this.getLengthArr=this.wallet.length-5
 }
}
</script>

<style scoped>

</style>
