<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
      persistent
    >
      <v-card class="pa-4">
        <div>
          <div class="d-flex justify-space-between">
            <span class="text-h5 ">
                {{ $t('withdraw') }}
                <br>
               <p class="text-h6 text-gray mt-1">{{ $t('choose_payment_method') }}</p>
              </span>
            <v-spacer></v-spacer>
            <v-btn elevation="0"  @click="$emit('depositChanger')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <v-list flat >
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-content >
                <v-list-item-title> <v-icon class="mr-5" v-text="item.icon"></v-icon>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="text-center justify-center d-flex">
          <div class="credit-card-add" @click="cardDialogChanger">
            <div class="mt-15">
              <v-icon size="50">mdi-plus</v-icon>
              <p>{{$t('addNewPayment')}}</p>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$emit('depositChanger')"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <BankCard :cardDialog="cardDialog" @cardDialogChanger="cardDialogChanger"></BankCard>
  </div>
</template>

<script>
import BankCard from '../modals/BankCard'
export default {
  components:{
    BankCard
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  name: "Deposit",
  data(){

    return{
      selectedItem:1,
      cardDialog:false,
      items: [
        { text: 'Банковская карта', icon: 'mdi-credit-card-outline' },
        { text: 'Банковская карта', icon: 'mdi-credit-card-outline' },
        { text: 'Банковская карта', icon: 'mdi-credit-card-outline' },
      ],
    }
  },
  methods:{
    cardDialogChanger(){
      this.cardDialog=!this.cardDialog
    }
  }
}
</script>

<style scoped>
.credit-card-add {
  width: 400px;
  height: 220px;
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  border-radius: 20px;
  cursor: pointer;
}
</style>
