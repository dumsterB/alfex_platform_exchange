<template>
  <div>
    <v-dialog width="500" v-model="cardDialog">
      <v-card>
        <div class="d-flex darken-1 pa-5 white--text font-weight-black title">
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('cardDialogChanger')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-card-text class="pb-6">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                >CARD NUMBER</v-subheader
              >
              <v-text-field
                single-line
                :rules="cardRules"
                outlined
                mask="credit-card"
                v-model="card_number"
                dense
              />
            </v-col>

            <v-col cols="12" class="pb-0">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                >CARDHOLDER’S NAME</v-subheader
              >
              <v-text-field
                single-line
                outlined
                label=""
                dense
                v-model="data.user_name"
                type="text"
                :rules="nameRules"
              />
            </v-col>

            <v-col cols="8">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                >EXPIRY DATE</v-subheader
              >
              <v-text-field
                label="MM/YY"
                :rules="expireDateRules"
                outlined
                dense
                v-model="exp_date"
              />
            </v-col>

            <v-col cols="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"
                >CVV</v-subheader
              >
              <v-text-field
                type="password"
                :rules="cvvRules"
                single-line
                outlined
                dense
                v-model="data.cvv"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!btnDisable"
            dark
            elevation="0"
            @click="addCardNumber"
            large
            class="success-btn mb-4 ml-2"
            >{{ $t("add_card") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "BankCard",
  props: {
    cardDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxlength: 20,
      valueOfCardNumber: "4478 6322 9923 8990",
      data: {
        expire_date: "",
        card_number: "",
        user_name: "",
        cvv: "",
      },
      card_number: "",
      exp_date: "",
      valid: false,
      cardRules: [
        (v) => !!v || "Card number is required",
        (v) => (v && v.length == 19) || "Card number must have 16 characters",
      ],
      nameRules: [(v) => !!v || "Name  is required"],
      expireDateRules: [
        (v) => !!v || "Expire date is required",
        (v) => (v && v.length == 5) || "Wrond date",
      ],
      cvvRules: [
        (v) => !!v || "CVV  is required",
        (v) => (v && v.length == 3) || "Wrong CVV",
      ],
      years: [],
    };
  },
  methods: {
    addCardNumber() {
      let cards = localStorage.getItem("bank_cards");
      let c_json = JSON.parse(cards);
      let list = [];
      if (c_json) {
        list = c_json;
      }
      list.push(this.data);
      localStorage.setItem("bank_cards", JSON.stringify(list));
      this.$emit("save");
    },
  },
  watch: {
    exp_date(v) {
      if (v.length == 2) {
        this.exp_date += "/";
      }
      this.data.expire_date = v;
    },
    card_number(v) {
      if (v.length == 4 || v.length == 9 || v.length == 14) {
        this.card_number += " ";
      }
      this.data.card_number = v;
    }
  },
  mounted() {},
  computed: {
    btnDisable() {
      return (
        this.data.card_number &&
        this.data.user_name &&
        this.data.expire_date &&
        this.data.cvv
      );
    },
  },
};
</script>
<style scoped>
.v-subheader {
  height: 32px;
  margin-left: 6px;
}
</style>
