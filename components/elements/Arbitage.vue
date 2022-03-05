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
            <div class="d-flex justify-space-between pa-1" v-for="(item ,i) of arbitrage_company" :key="item.id">
              <div>
                <p>{{ item.name }}</p>
              </div>
              <div>
                <p>{{ i * 100 }}</p>
              </div>
              <div class="d-block">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs"
                            v-on="on" class="ml-3 green--text" @click="buy(coin,item)">mdi-minus-box</v-icon>
                  </template>
                  <span>{{$t('buy')}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs"
                            v-on="on" class="ml-3 red--text" @click="sell(item)">mdi-minus-box
                    </v-icon>
                  </template>
                  <span>{{$t('sell')}}</span>
                </v-tooltip>
              </div>
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
import TradePosition from '../../components/elements/modals/TradePosition'

const modelCompanies = "data/arbitrage_company";
const wallet = 'data/wallet'
export default {
  name: "Arbitage",
  components: {
    TradePosition
  },
  data() {
    return {
      dialog: false,
      action: '',
      selectedCurrency: {},
      selectedArbitrageCompany: {},
      userWallet: '',
    }
  },
  methods: {
    ...mapActions(wallet, {
      fetchWallet: "fetchList",
    }),
    ...mapActions(modelCompanies, {
      fetchList: "fetchList",
    }),
    closeTrade() {
      this.dialog = false
    },
    buy(coin,item) {
      this.action = "Buy";
      this.dialog = true;
      console.log(coin)
      this.userWallet=coin
      this.selectedCurrency=coin
      this.selectedArbitrageCompany=item
      console.log(coin,item)
    },
    sell() {
      this.action = "Sell";
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters("data/wallet", {
      wallet: "list",
    }),
    ...mapGetters(modelCompanies, {
      ac: "list",
    }),
    ...mapGetters("data/arbitrage_company", {
      arbitrage_company: "list",
    }),
  },
  async mounted() {
    await this.fetchWallet()
    console.log(this.wallet)
    this.fetchList()
  }
}
</script>

<style scoped>

</style>
