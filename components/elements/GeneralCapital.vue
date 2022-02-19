<template>
  <div>
    <v-card
      class="mx-auto pa-3"
      elevation="1"
      max-width="430"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            <strong>{{ $t('total_equity') }}</strong>
          </v-list-item-title>
          <br><br>
          <v-list-item-title class="text-h5 mb-1">
            <strong v-if="hideBalancer">93.173529 </strong>
            <strong v-if="!hideBalancer">******</strong> BTC
          </v-list-item-title>
          <p v-if="hideBalancer" class="mt-2 text-gray">≈ 4,064,351.997 USD</p>
          <p v-if="!hideBalancer" class="mt-2 text-gray">******</p>
        </v-list-item-content>

        <v-icon v-if="!hideBalancer" @click="hideBalance">mdi-eye</v-icon>
        <v-icon v-if="hideBalancer" @click="hideBalance">mdi-eye-off</v-icon>
      </v-list-item>

      <v-card-actions class="justify-center">
        <v-btn
          elevation="0"
          large
          rounded
          class="success-btn-half"
          color="white"
          @click="depositChanger"
        >
          {{ $t('deposit_title') }}
        </v-btn>
        <v-btn
          elevation="0"
          large
          rounded
          class="simple-btn-half"
          @click="depositChanger"
        >
          {{ $t('withdraw') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <Deposit :dialog="dialog" @depositChanger="depositChanger"></Deposit>

  </div>
</template>

<script>
import Deposit from "@/components/modals/Deposit";
export default {
  name: "GeneralCapital",
  components:{
    Deposit
  },
  data() {
    return {
      hideBalancer: false,
      dialog:false,
    }
  },
  methods: {
    hideBalance() {
      this.hideBalancer = !this.hideBalancer
    },
    depositChanger(){
      this.dialog=!this.dialog
    }
  },
  watch:{
    dialog(newVal,oldVal){
      console.log(newVal,oldVal)
    }
  },
  mounted() {
    console.log(this.dialog)
  }
}
</script>

<style scoped>

</style>
