<template>
  <div>
    <div class="privateInformation">
      <p class="text-h6">{{ $t('verification') }}</p>
      <v-card class="mainCard pa-5">
        <v-container>
          <v-row>
            <v-col>
             <v-card class="pa-5">
               <h4>{{$t('s1_basic_verification')}}</h4>
               <p class="text-gray">{{$t('verify_user_data')}}</p>
               <p class="text-gray">{{$t('daily_withdrawal_limit')}}</p>
               <p class="success-text">50BTC</p>
               <identification></identification>
             </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-5">
                <h4>{{$t('s2_residency_verify')}}</h4>
                <p class="text-gray">{{$t('residency_verify_address')}}</p>
                <p class="text-gray">{{$t('daily_withdrawal_limit')}}</p>
                <p class="success-text">100BTC</p>
                <v-btn elevation="0" disabled  >Проверить сейчас</v-btn>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
 <v-card class="pa-5">
   <h4 class="success-text">{{$t('disclaimer')}}</h4>
   <p class="text-gray">{{$t('disclaimer_description')}}</p>
 </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import identification from "@/components/elements/modals/Identification";
export default {
  name: "privateInformation",
  components:{
    identification
  }
}
</script>

<style scoped>

</style>
