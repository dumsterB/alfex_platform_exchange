<template>
  <div>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card class="pa-4">
        <v-row>
          <v-col>
            <p class="text-h5 text-center">
              {{ $t("withdraw") }}
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
          <div class="credit-card-add" @click="cardDialogChanger">
            <div class="mt-15">
              <v-icon size="50" dark>mdi-plus</v-icon>
              <p style="color: white">{{ $t("addNewPayment") }}</p>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('depositChanger')">
            I accept
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
  },
  name: "Deposit",
  data() {
    return {
      selectedItem: 1,
      cardDialog: false,
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
</style>
