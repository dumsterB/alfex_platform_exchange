<template>
  <div class="ma-4">
    <div class="d-flex mdc-form-field--space-between">
      <p class="text-h6">Мой кошелек</p>
      <a href="">Посмотреть все</a>
    </div>
    <v-card class="pa-3">
      <div class="justify-center">
        <div class="text-center pa-4">
          <div>Всего</div>
          <strong class="text-h4">$380.787</strong>
          <div>≈ 0.00870 BTC</div>
        </div>
        <div class="mt-10">
          <v-card
            class="mx-auto"
            elevation="0"
            tile
          >
            <div v-for="(coin,i) of wallet" :key="i">
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
          </v-card>
        </div>
      </div>
    </v-card>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
const wallet = 'data/wallet'
export default {
  name: "Wallet",
  data() {
    return {
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
      ]
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
 }
}
</script>

<style scoped>

</style>
