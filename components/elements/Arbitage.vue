<template>
  <div>
    <v-row class="pa-3">
      <v-col cols="12" md="3" lg="3" sm="6" v-for="(coin,i) of wallet" :key="coin.id">
        <v-card elevation="1" max-width="500">

          <div class="justify-space-between d-flex pa-3">
            <div>
              <v-card-subtitle class="d-flex"><img height="30" :src="coin.currency.logo" alt="">
                <p class="ml-2 mt-1"><strong>{{ coin.currency.symbol }}</strong></p></v-card-subtitle>
            </div>

            <div>
              <v-card-subtitle><p><strong>{{ coin.balance }}</strong></p></v-card-subtitle>
            </div>
          </div>
          <div class="d-flex justify-space-between" v-for="(item ,i) of arbitrage_company" :key="item.id">
            <v-list-item three-line
                         class="">
              <v-list-item-content>
                <div>
                  <p>{{ item.name }}</p>
                </div>
              </v-list-item-content>
              <v-list-item-content>
                <div>
                  <p>{{ i * 10000 }}</p>
                </div>
                </v-list-item-content>
                  <v-list-item-content class="d-block mt-3">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs"
                                  v-on="on" class="ml-3 green--text" @click="buy(coin,item)">mdi-plus-box
                          </v-icon>
                        </template>
                        <span>{{ $t('buy') }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs"
                                  v-on="on" class="ml-3 red--text" @click="sell(item)">mdi-minus-box
                          </v-icon>
                        </template>
                        <span>{{ $t('sell') }}</span>
                      </v-tooltip>
                    </v-list-item-content>
            </v-list-item>
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
    buy(coin, item) {
      this.action = "Buy";
      this.dialog = true;
      console.log(coin)
      this.userWallet = coin
      this.selectedCurrency = coin
      this.selectedArbitrageCompany = item
      console.log(coin, item)
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
    console.log(this.wallet[0].currency.currency_type)
    this.fetchList()
  }
}
</script>

<style scoped>

</style>
