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
            <v-col cols="12" class="pb-0 card">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">{{
                $t("card_number")
              }}</v-subheader>
              <v-text-field
                v-model="card_number"
                mask="credit-card"
                :rules="cardRules"
                @click="onLoading"
                class="card_input"
                maxlength="19"
                single-line
                outlined
                dense
              />
              <template>
                <v-fade-transition leave-absolute>
                  <v-progress-circular
                    v-if="loading"
                    size="24"
                    color="green"
                    indeterminate
                    class="card_input__icon"
                  ></v-progress-circular>

                  <img
                    v-else
                    class="card_input__icon"
                    width="24"
                    height="24"
                    :src="card_icon"
                    alt=""
                  />
                </v-fade-transition>
              </template>
            </v-col>

            <v-col cols="12" class="pb-0">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">{{
                $t("cardholder_name")
              }}</v-subheader>
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
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">{{
                $t("expiry")
              }}</v-subheader>
              <v-text-field
                label="MM/YY"
                :rules="expireDateRules"
                outlined
                dense
                maxlength="5"
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
                maxlength="3"
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
const validateExpDate = (value) => {
  const monthAndYear = value.split("/");
  const valueDate = new Date();
  valueDate.setFullYear(parseInt(`20${monthAndYear[1]}`), monthAndYear[0], 1);
  const today = new Date();
  return valueDate > today;
};
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
      loading: false,
      data: {
        expire_date: "",
        card_number: "",
        user_name: "",
        cvv: "",
        card_type: "",
      },
      card_icon: "",
      card_number: "",
      exp_date: "",
      valid: false,
      cardRules: [
        (v) => !!v || this.$t("card_number_required"),
        (v) => (v && v.length == 19) || this.$t("card_rules"),
      ],
      nameRules: [(v) => !!v || this.$t("cardholder_name_required")],
      expireDateRules: [
        (v) => !!v || this.$t("card_expiry_required"),
        (v) => (v && v.length == 5) || this.$t("invalid_date"),
        (v) => (v && validateExpDate(v)) || this.$t("your_card_expired"),
      ],
      cvvRules: [
        (v) => !!v || this.$t("CVV_required"),
        (v) => (v && v.length == 3) || this.$t("CVV_rules"),
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
    onLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
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
    },
    card_type(v) {
      return (this.data.card_type = v);
    },
    card_icon(v) {
      this.data.card_type === "visa"
        ? (this.card_icon =
            "https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg")
        : this.data.card_type === "mastercard"
        ? (this.card_icon =
            "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg")
        : this.data.card_type !== "visa" && this.card_icon !== "mastercard"
        ? (this.card_icon =
            "https://www.svgrepo.com/show/103010/credit-card.svg")
        : (this.card_icon =
            "https://www.svgrepo.com/show/103010/credit-card.svg");
    },
  },
  computed: {
    getCardType() {
      let number = this.data.card_number;
      let re = new RegExp("^4");
      if (number.match(re) != null) return (this.data.card_type = "visa");
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return (this.data.card_type = "mastercard");
      // re = new RegExp("^(34|37)");
      // if (number.match(re) != null) return (this.data.card_type = "amex");
      // re = new RegExp("^6011");
      // if (number.match(re) != null) return (this.data.card_type = "discover");
      // re = new RegExp("^9792");
      // if (number.match(re) != null) return (this.data.card_type = "troy");
      return (this.data.card_type = ""); // default type
    },
    cardIcon() {
      return this.data.card_type === "visa"
        ? (this.card_icon =
            "https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg")
        : this.data.card_type === "mastercard"
        ? (this.card_icon =
            "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg")
        : this.data.card_type !== "visa" && this.card_icon !== "mastercard"
        ? (this.card_icon =
            "https://www.svgrepo.com/show/103010/credit-card.svg")
        : (this.card_icon =
            "https://www.svgrepo.com/show/103010/credit-card.svg");
    },
    btnDisable() {
      return (
        this.data.card_number &&
        this.data.user_name &&
        this.data.expire_date &&
        this.data.cvv &&
        this.data.card_type
      );
    },
  },
  mounted() {},
};
</script>
<style scoped>
.v-subheader {
  height: 32px;
  margin-left: 6px;
}
.card_input,
.card {
  position: relative;
}
.card_input__icon {
  position: absolute;
  content: "";
  top: 52px;
  right: 24px;
  bottom: 0;
}
</style>
