<template>
  <div>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card class="pa-4">
        <v-row>
          <v-col>
            <p class="text-h5 text-center">
              {{ $t(action) }}
            </p>
            <p class="text-h6 text-gray mt-1 text-center">
              {{ $t("choose_payment_method") }}
            </p>
          </v-col>
          <v-btn
            elevation="0"
            @click="$emit('depositChanger')"
            icon
            class="mt-2 mr-2"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-list flat>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="mr-5">mdi-credit-card-outline</v-icon
                  >{{ item ? item.card_number : "" }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="text-center justify-center d-flex">
          <div class="d-block">
          <div class="credit-card-add" @click="cardDialogChanger">
            <div >
              <v-icon style="margin-top: 50px" size="50" dark>mdi-plus</v-icon>
              <p style="color: white">{{ $t("addNewPayment") }}</p>
            </div>
          </div>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-text-field
              v-model="enteredMoney"
              :label="$t('enter_your_amount')"
            ></v-text-field>
            <p class="text-gray">Вы можете внести от 20 до 9999 $</p>
          </v-col>
          </div>
        </div>
        <v-card-actions>
          {{$t('pay')}}: {{enteredMoney}}$
          <v-spacer></v-spacer>
          <v-btn large dark class="success-btn" text @click="$emit('depositChanger')">
           {{$t('deposit')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BankCard :cardDialog="cardDialog" @save="save" @cardDialogChanger="cardDialogChanger"></BankCard>
  </div>
</template>

<script>
import BankCard from "../modals/BankCard";
export default {
  components: {
    BankCard,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    action:{
      type:String,
      default: '',
    }
  },
  name: "Deposit",
  data() {
    return {
      selectedItem: 1,
      cardDialog: false,
      enteredMoney:'',
      items: [],
    };
  },
  methods: {
    cardDialogChanger() {
      this.cardDialog = !this.cardDialog;
    },
    save() {
      let d = localStorage.getItem("bank_cards");
      if (d) {
        this.items = JSON.parse(d) || [];
        this.cardDialog = false;
      }
    },
  },
  mounted() {
    let d = localStorage.getItem("bank_cards");
    if (d) {
      this.items = JSON.parse(d) || [];
    }
  },
};
</script>

<style scoped>
.credit-card-add {
  width: 400px;
  height: 220px;
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  border-radius: 20px;
  cursor: pointer;
}
.success-btn {
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  color: white !important;
}
</style>
