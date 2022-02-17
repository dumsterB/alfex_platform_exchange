<template>
  <div class="wallet">
      <v-row>
        <v-col md="4">
          <GeneralCapital></GeneralCapital>
          <br>
          <Check :title="spot_title" :totalEquity="spot_total_equity" :total_equity_usdt="spot_total_equity_usdt" :available_balance="spot_available_balance" :available_balance_usdt="spot_available_balance_usdt" ></Check>
          <br>
          <Check :title="fiat_title" :totalEquity="fiat_total_equity" :total_equity_usdt="fiat_total_equity_usdt" :available_balance="fiat_available_balance" :available_balance_usdt="fiat_available_balance_usdt" > </Check>
        </v-col>
        <v-col md="8">
        </v-col>
      </v-row>
  </div>
</template>

<script>
import GeneralCapital from "@/components/elements/GeneralCapital";
import Check from "@/components/elements/Check";

export default {
  components: {GeneralCapital,Check},
  mounted() {},
  data(){
    return{
      spot_title:this.$t('spot_account'),
      spot_total_equity:'93.179434 BTC',
      spot_available_balance:'93.179434 BTC',
      spot_available_balance_usdt:'≈ 4,064,102.564 USD',
      spot_total_equity_usdt:'≈ 4,064,102.564 USD',
      fiat_title:this.$i18n.t('fiat_account'),
      fiat_total_equity:'93.179434 BTC',
      fiat_available_balance:'93.179434 BTC',
      fiat_available_balance_usdt:'≈ 4,064,102.564 USD',
      fiat_total_equity_usdt:'≈ 4,064,102.564 USD',

    }
  },
  watch:{

  }
};
</script>
