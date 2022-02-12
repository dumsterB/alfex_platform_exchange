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
            <div v-for="coin of coins" :key="coin.currency">
            <v-list-item class="pa-1" >
              <v-list-item-content>
                <v-list-item-title>
                  <v-badge class="ml-1 mb-1" :color="coin.color" dot></v-badge>
                  <span class="ml-2">{{coin.currency}}</span></v-list-item-title>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content class="flexNone">
                <v-list-item-title>{{coin.quantity}}</v-list-item-title>
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
export default {
  name: "Wallet",
  data(){
    return{
      coins:[
        {
          color:'red',
          currency:'USD',
          quantity:'$74.491'
        },
        {
          color:'pink',
          currency:'BNB',
          quantity:'$134.491'
        },
        {
          color:'blue',
          currency:'ADA',
          quantity:'$14.421'
        },
        {
          color:'yellow',
          currency:'BTC',
          quantity:'$74.491'
        },
        {
          color:'red',
          currency:'ETH',
          quantity:'$74.491'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
