<template>
  <div class="wallet">
      <v-row>
        <v-col md="4" >
          <div class="ma-2">
          <GeneralCapital></GeneralCapital>
          <br>
          <Check :title="spot_title" :totalEquity="spot_total_equity" :total_equity_usdt="spot_total_equity_usdt" :available_balance="spot_available_balance" :available_balance_usdt="spot_available_balance_usdt" ></Check>
          <br>
          <Check :title="fiat_title" :totalEquity="fiat_total_equity" :total_equity_usdt="fiat_total_equity_usdt" :available_balance="fiat_available_balance" :available_balance_usdt="fiat_available_balance_usdt" > </Check>
          </div>
        </v-col>
        <v-col md="8">
          <div class="ma-2 mr-8">
            <TableTransactions></TableTransactions>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import GeneralCapital from "@/components/elements/GeneralCapital";
import Check from "@/components/elements/Check";
import TableTransactions from "@/components/elements/TableTransactions";


export default {
  components: {GeneralCapital,Check,TableTransactions},
  mounted() {},
  data(){
    return{
      spot_total_equity:'93.179434 BTC',
      spot_available_balance:'93.179434 BTC',
      spot_available_balance_usdt:'≈ 4,064,102.564 USD',
      spot_total_equity_usdt:'≈ 4,064,102.564 USD',
      fiat_total_equity:'93.179434 BTC',
      fiat_available_balance:'93.179434 BTC',
      fiat_available_balance_usdt:'≈ 4,064,102.564 USD',
      fiat_total_equity_usdt:'≈ 4,064,102.564 USD',

    }
  },
  computed:{
    spot_title(){
      return this.$t('spot_account')
    },
    fiat_title(){
      return this.$t('fiat_account')
    }
  },
  watch:{

  }
};
</script>
