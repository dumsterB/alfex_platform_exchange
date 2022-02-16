<template>
<div>
  <v-card
    class="mx-auto pa-2"
    max-width="350"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
         <strong>{{$t('total_equity')}}</strong>
        </v-list-item-title>
        <br><br>
        <v-list-item-title class="text-h5 mb-1">
       <strong>93.173529 </strong>BTC
        </v-list-item-title>
        <p class="mt-2 text-gray">≈ 4,064,351.997 USD</p>
      </v-list-item-content>

    <v-icon>mdi-eye</v-icon>
    </v-list-item>

    <v-card-actions class="justify-center">
      <v-btn
        elevation="0"
        large
        rounded
        class="success-btn-half"
        color="white"
      >
        {{$t('deposit_title')}}
      </v-btn>
      <v-btn
        elevation="0"
        large
        rounded
        class="simple-btn-half"
      >
        {{$t('withdraw')}}
      </v-btn>
    </v-card-actions>
  </v-card>

</div>
</template>

<script>
export default {
  name: "GeneralCapital"
}
</script>

<style scoped>

</style>
