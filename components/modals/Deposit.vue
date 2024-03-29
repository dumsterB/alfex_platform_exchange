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
          <v-btn elevation="0" @click="close" icon class="mt-2 mr-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-list flat>
          <v-list-item-group v-model="selected_card" color="primary">
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
              <div>
                <v-icon style="margin-top: 10px" size="25" dark
                  >mdi-plus</v-icon
                >
                <p class="white--text">{{ $t("addNewPayment") }}</p>
              </div>
            </div>
          </div>
        </div>
        <v-row class="mt-4 pa-4">
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="enteredMoney"
              outlined
              :label="$t('enter_your_amount')"
              type="number"
            ></v-text-field>
            <!-- <p class="text-gray">{{ $t("deposit_ruls") }}</p> -->
          </v-col>
        </v-row>
        <v-card-actions>
          {{ $t("pay") }}: {{ enteredMoney }} {{ curr }}
          <v-spacer></v-spacer>
          <v-btn
            large
            dark
            class="success-btn"
            text
            :disabled="!selected_card || selected_card.length == 0"
            :loading="loading"
            @click="make_order"
          >
            {{ $t(action) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BankCard
      :cardDialog="cardDialog"
      @save="save"
      @cardDialogChanger="cardDialogChanger"
    ></BankCard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    wallet: null,
    action: {
      type: String,
      default: "",
    },
  },
  name: "Deposit",
  data() {
    return {
      selectedItem: 1,
      cardDialog: false,
      enteredMoney: "",
      items: [],
      selected_card: -1,
      loading: false,
      curr: "USD",
    };
  },
  computed: {
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
  },
  methods: {
    ...mapActions("data/order", {
      order_create: "create",
      fetchOrders: "fetchList",
    }),
    ...mapActions("data/wallet", {
      f_wallets: "fetchList",
    }),
    close() {
      this.enteredMoney = "";
      this.$emit("depositChanger");
    },
    cardDialogChanger() {
      this.cardDialog = !this.cardDialog;
    },
    save() {
      let d = localStorage.getItem("bank_cards");
      if (d) {
        this.items = JSON.parse(d) || [];
        if (this.items && this.items.length > 0) {
          this.selected_card = 0;
        }
        this.cardDialog = false;
      }
    },
    async make_order() {
      if (this.selected_card > -1) {
        this.loading = true;
        let order_data = {};
        let curr;
        if (!this.wallet) {
          curr = this.currencies.find((el) => el.symbol == "USD");
        } else {
          curr = this.wallet.currency;
          this.curr = curr.symbol;
        }
        if (curr) {
          order_data.source_currency_id = curr.id;
        }
        order_data.source_amount = parseFloat(this.enteredMoney);
        order_data.dest_currency_id = curr.id;
        order_data.dest_amount = parseFloat(this.enteredMoney);
        order_data.exchange_rate = 1;
        if (this.action == "deposit_title") {
          order_data.order_type_id = 2;
        }
        if (this.action == "withdraw") {
          order_data.order_type_id = 1;
        }
        order_data.order_method_id = 1;
        console.log("order_data", order_data);
        let rs = await this.order_create({ data: order_data });
        let title, color;
        if (rs.data && rs.data.order_status_id != 3) {
          title = this.$t("order_failed");
          color = "error";
        } else {
          title = this.$t("create_order_progress");
          color = "warning";
          setTimeout(() => {
            this.$store.commit("data/notifications/create", {
              id: color + "_" + Math.random().toString(36),
              title: this.$t("create_order_done"),
              text: this.$t("create_order_done"),
              color: "primary",
            });
          }, 2000);
        }
        this.$store.commit("data/notifications/create", {
          id: color + "_" + Math.random().toString(36),
          title: title,
          text: title,
          color: color,
        });
        await this.f_wallets();
        await this.fetchOrders();
        this.loading = false;
        this.$emit("depositChanger", true);
      }
    },
  },
  watch: {
    wallet() {
      if (this.wallet && this.wallet.currency) {
        this.curr = this.wallet.currency.symbol;
      }
    },
  },
  mounted() {
    let d = localStorage.getItem("bank_cards");
    if (d) {
      this.items = JSON.parse(d) || [];
      if (this.items && this.items.length > 0) {
        this.selected_card = 0;
      }
    }
  },
};
</script>

<style scoped>
.credit-card-add {
  width: 450px;
  height: 70px;
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  border-radius: 20px;
  cursor: pointer;
}
.success-btn {
  background: linear-gradient(94.9deg, #2fed59 4.26%, #23ad41 95.87%);
  color: white !important;
}
</style>
