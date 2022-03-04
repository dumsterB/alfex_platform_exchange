<template>
  <div>
    <v-card
      class="mx-auto  check-card pa-3"
      max-width="430"
      elevation="1"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="d-flex">
            <v-list-item-title class="text-h5 mb-1">
              <strong>{{title}}</strong>
            </v-list-item-title>
            <v-chip
              color="green"
              outlined
              class="historyChip"
              small
            >
            <v-icon x-small>mdi-history</v-icon><span class="history-btn-cl">History</span>
            </v-chip>
          </div>

          <br><br>
          <v-row class="mt-10">
            <v-col>
              <p class="text-gray">{{$t('total_equity')}}</p>
              <p class="text-h6"> <strong>{{totalEquity}} BTC</strong></p>
              <p class="text-gray">≈ {{total_equity_usdt}} USD</p>
            </v-col>
            <v-col>
              <p class="text-gray">{{$t('available_balance')}}</p>
             <p class="text-h6"><strong>{{available_balance}} BTC</strong></p>
              <p class="text-gray">≈ {{available_balance_usdt}} USD</p>
            </v-col>
          </v-row>
        </v-list-item-content>


      </v-list-item>
    </v-card>

  </div>
</template>

<script>
export default {
  props:['title','totalEquity','available_balance','available_balance_usdt','available_balance_usdt','total_equity_usdt'],
  name: "GeneralCapital"
}
</script>

<style scoped>
.history-btn-cl {
  font-size: 12px;
  padding-left: 5px;
}
.check-card {
  position: relative;
}
.historyChip {
  position: absolute;
  right: 5px;
}
</style>
