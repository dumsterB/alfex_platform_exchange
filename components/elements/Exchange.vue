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
            hide-details
          ></v-text-field>
        <v-autocomplete
          :items="currencies"
          label="BNB"
          class="ml-2"
          item-text="name"
          solo
          hide-details
        >
          <template v-slot:item="{ item }">
            <img height="20" width="20" :src="item.logo"> <p class="ml-4 mt-3">{{ item.name }}</p>
          </template>
        </v-autocomplete>
      </div>
      <div class="pa-1 mt-2 mb-4 justify-space-between d-flex"  >
        <v-text-field
          :label="$t('pay_with')"
          class="mr-2"
          solo
          hide-details
        ></v-text-field>
        <v-autocomplete
          :items="currencies"
          label="BNB"
          class="ml-2"
          item-text="name"
          solo
          hide-details
        >
          <template v-slot:item="{ item }">
            <img height="20" width="20" :src="item.logo"> <p class="ml-4 mt-3">{{ item.name }}</p>
          </template>
        </v-autocomplete>
      </div>
      <v-btn x-large class="success-btn" elevation="0">{{$t('trade')}}</v-btn>
    </div>
  </v-card>
  <v-row class="mt-10">
    <v-col :cols="8">
      <v-text-field
        v-model="link_url"
        :label="$t('for_depositing_Bitcoin')"
        readonly
        outlined
        dense
        hide-details
      ></v-text-field>
    </v-col>
    <v-col :cols="3">
      <v-btn v-if="!copied" elevation="0" @click="copyURL">{{$t('copy')}}</v-btn>
      <v-btn v-if="copied" elevation="0" @click="copyURL">{{$t('copied')}}</v-btn>
    </v-col>
  </v-row>
  <br>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
const currencies = 'data/currency'
export default {
  name: "Exchange",
  data(){
    return{
      link_url:'bc1qu75kr9s9j0hpuf5qugqdastwwhzglz3gfwcz06',
      copied:false,
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
    copyURL() {
     navigator.clipboard.writeText(this.link_url)
      this.copied=true
      setTimeout(()=>{this.copied=false},6000)
    }
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
