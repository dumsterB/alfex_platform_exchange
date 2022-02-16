<template>
<div class="ma-4">
  <div class="d-flex mdc-form-field--space-between">
    <p class="text-h6">{{$t('exchange')}}</p>
    <a href="">{{$t('view_more')}}</a>
  </div>
  <v-card class="pa-3">
    <div class="justify-center text-center">
      <div class="pa-1 mt-2 justify-space-between d-flex"  >
          <v-text-field
            label="0"
            class="mr-2"
            solo
          ></v-text-field>
        <v-select
          :items="currencies"
          label="BNB"
          class="ml-2"
          item-text="name"
          solo
        >
          <template v-slot:item="{ item }">
            <img height="20" width="20" :src="item.logo"> <p class="ml-4 mt-3">{{ item.name }}</p>
          </template>
        </v-select>
      </div>
      <div class="pa-1 mt-2 justify-space-between d-flex"  >
        <v-text-field
          label="Оплатить в"
          class="mr-2"
          solo
        ></v-text-field>
        <v-select
          :items="currencies"
          label="BNB"
          class="ml-2"
          item-text="name"
          solo
        >
          <template v-slot:item="{ item }">
            <img height="20" width="20" :src="item.logo"> <p class="ml-4 mt-3">{{ item.name }}</p>
          </template>
        </v-select>
      </div>
      <v-btn x-large class="success-btn" elevation="0">{{$t('trade')}}</v-btn>
    </div>
  </v-card>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
const currencies = 'data/currency'
export default {
  name: "Exchange",
  data(){
    return{
      items: [
        {currency:'Foo',img:'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'},
        { currency:'Bar',img:'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'},
        {currency:'Fizz',img:'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'},
        {currency:'Buzz',img:'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png'}],
    }
  },
  methods:{
    ...mapActions(currencies, {
      fetchCurrencies: "fetchList",
    }),
  },
  computed:{
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
  }
}
</script>

<style scoped>

</style>
