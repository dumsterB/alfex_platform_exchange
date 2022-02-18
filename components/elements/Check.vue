<template>
  <div>
    <v-card
      class="mx-auto  check-card"
      max-width="380"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="d-flex">
            <v-list-item-title class="text-h5 mb-1">
              <strong>{{title}}</strong>
            </v-list-item-title>
            <v-chip
              color="blue"
              outlined
              class="historyChip"
            >
            <v-icon>mdi-history</v-icon>  History
            </v-chip>
          </div>

          <br><br>
          <v-row>
            <v-col>
              <p class="text-gray">{{$t('total_equity')}}</p>
              <p class="text-h6"> <strong>{{totalEquity}}</strong></p>
              <p class="text-gray">{{total_equity_usdt}}</p>
            </v-col>
            <v-col>
              <p class="text-gray">{{$t('available_balance')}}</p>
             <p class="text-h6"><strong>{{available_balance}}</strong></p>
              <p class="text-gray">{{available_balance_usdt}}</p>
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

</style>
