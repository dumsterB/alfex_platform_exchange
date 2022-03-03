<template>
  <div>
    <v-container>
      <v-row class="f">
        <v-col cols="12" md="3" lg="3" sm="6" v-for="(coin,i) of wallet" :key="coin.id">
          <v-card elevation="1" width="300">
            <div class="justify-space-between d-flex pa-3 ">
              <div>
                <v-card-subtitle class="d-flex"><img height="30" :src="coin.currency.logo" alt="">
                  <p class="ml-2 mt-1"><strong>{{ coin.currency.symbol }}</strong></p></v-card-subtitle>
              </div>
              <div>
                <v-card-subtitle><p><strong>{{ coin.balance }}</strong></p></v-card-subtitle>
              </div>
            </div>
            <div class="d-flex justify-end pa-5">
              <v-btn @click="buy(coin)" class="ml-3 green--text" outlined>
                {{ $t("buy") }}
              </v-btn>
              <v-btn @click="sell(coin)" class="ml-3 red--text" outlined>
                {{ $t("sell") }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="600px">
        <TradePosition
          :tradeItem="selectedCurrency"
          :action="action"
          :userWallet="
          userWallet ? userWallet : { balance: $t('wallet_balance') }
        "
          :tradePlatform="selectedArbitrageCompany"
          @close="closeTrade"
        />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
const modelCompanies = "data/arbitrage_company";
const wallet = 'data/wallet'
export default {
  name: "Arbitage",
  data(){
    return{
     dialog:false,
      action:'',
    }
  },
  methods: {
    ...mapActions(wallet, {
      fetchWallet: "fetchList",
    }),
    ...mapActions(modelCompanies, {
      fetchList: "fetchList",
    }),
    closeTrade(){
      this.dialog=false
    },
    buy(item) {
      this.action = "Buy";
      this.dialog = true;
      this.selectedCurrency = this.currencies.filter(
        (curr) => curr.short_name === this.currency
      )[0];
      this.selectedArbitrageCompany = this.list.filter(
        (elem) => elem.name === item.name
      )[0];

      this.userWallet = this.wallets.filter(
        (el) => el.currency.symbol === this.selectedCurrency.symbol
      )[0];
    },
    sell(item) {
      this.action = "Sell";
      this.dialog = true;
      this.selectedCurrency = this.currencies.filter(
        (curr) => curr.short_name === this.currency
      )[0];
      this.selectedArbitrageCompany = this.list.filter(
        (elem) => elem.name === item.name
      )[0];
      this.userWallet = this.wallets.filter(
        (el) => el.currency.symbol === this.selectedCurrency.symbol
      )[0];
    },
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),
    ...mapGetters(modelCompanies, {
      ac: "list",
    }),
  },
  async mounted() {
    await this.fetchWallet()
    this.fetchList()
  }
}
</script>

<style scoped>

</style>
