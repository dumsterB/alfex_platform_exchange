<template>
  <div>
    <v-dialog
      width="500"
      v-model="cardDialog"
    >
      <v-card>

        <div
          class="d-flex darken-1 pa-5 white--text font-weight-black title"
        >
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('cardDialogChanger')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-card-text class='pb-6'>
          <v-row>

            <v-form ref="form"
                    v-model="valid"
                    lazy-validation>
              <v-col cols='12'>
                <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
                <v-text-field
                  single-line pattern="\d*" maxlength="4" type="number" :rules="cardRules" outlined
                  mask="credit-card"  @input="input" v-model.lazy="data.card_number" dense
                />
              </v-col>

              <v-col cols='12'>
                <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDER’S NAME</v-subheader>
                <v-text-field
                  single-line outlined label="" hide-details dense
                  v-model="data.user_name"
                  :rules="nameRules"
                />
              </v-col>

              <v-col cols='8'>
                <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
                <v-text-field
                  label="MM/DD" outlined hide-details dense v-model="data.expire_date"
                />
              </v-col>

              <v-col cols='4'>
                <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
                <v-text-field single-line outlined hide-details dense v-model="data.cvv"/>
              </v-col>
            </v-form>

          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!btnDisable" dark elevation="0" @click="addCardNumber" large class="success-btn mb-4 ml-2">{{ $t('add_card') }}
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
      default: false
    }
  },
  data() {
    return {
      maxlength: 20,
      valueOfCardNumber: '4478 6322 9923 8990',
      data: {
        expire_date: '',
        card_number: '',
        user_name: '',
        cvv: '',
      },
      valid:false,
      cardRules: [
        v => !!v || 'Card number is required',
        v => (v && v.length <= 20) || 'Card number must be less than 20 characters',
      ],
      nameRules: [
        v => !!v || 'Name  is required',
      ],
      years: [],
    }
  },
  methods: {
    addCardNumber() {
      if (!localStorage.getItem('bank_cards')) {
        let cards = localStorage.getItem('bank_cards')
        let c_json = JSON.parse(cards);
        let list = [];
        if (c_json) {
          list = c_json;
        }
        list.push(this.data);
        localStorage.setItem('bank_cards', JSON.stringify(c_json));
        this.$emit('save');
      }
      console.log(this.data)
    },
    change(val){
      console.log(val,'change')
    },
    input(val){
      console.log(val)
      }
  },
  mounted() {
  },
  computed: {
   btnDisable(){
     return this.valid && this.data.card_number && this.data.user_name && this.data.expire_date && this.data.cvv
   },

  }
}
</script>
<style scoped>
.v-subheader {
  height: 32px;
  margin-left: 6px;
}
</style>
