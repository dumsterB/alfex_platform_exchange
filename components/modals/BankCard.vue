<template>
  <div>
    <v-dialog
      width="500"
      v-model="cardDialog"
    >
      <v-card>

        <div
          class="blue d-flex darken-1 pa-5 white--text font-weight-black title"
        >
          PAYMENT<br>
          DETAILS
          <v-spacer></v-spacer>

          <v-img
            aspect-ratio="3.075" max-height="40" :src="URL_IMAGE" position="right" contain
          />
         <v-btn icon @click="$emit('cardDialogChanger')"><v-icon >mdi-close</v-icon></v-btn>
        </div>

        <v-card-text class='pb-10'>
          <v-row>
            <v-col cols='6'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDER’S NAME</v-subheader>
              <v-text-field
                single-line outlined label="Johny Relative" hide-details
              />
            </v-col>

            <v-col cols='6'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line outlined mask="credit-card" v-model="valueOfCardNumber" hide-details
              />
            </v-col>

            <v-col col='4'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-select
                :items="MonthList" label="Month" outlined
                append-icon='keyboard_arrow_down' hide-details
              />
            </v-col>

            <v-col col='4'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
              <v-select
                :items="YearList" label="Year" outlined
                append-icon='keyboard_arrow_down' hide-details
              />
            </v-col>

            <v-col col='4'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field single-line outlined hide-details/>
            </v-col>

          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn elevation="0" large class="success-btn">{{$t('add_card')}}</v-btn>
        </v-card-actions>
      </v-card>
      <pre>{{years}}</pre>
    </v-dialog>
  </div>
</template>
<script>
const URL_IMAGE = 'https://i.imgur.com/lY1wk82.png';
export default {
  name: "BankCard",
  props: {
    cardDialog: {
      type: Boolean,
      default: false
    }``
  },
  data() {
    return {
      valueOfCardNumber: '4478 6322 9923 8990',
      years:[],
    }
  },
  mounted() {
    this.URL_IMAGE = URL_IMAGE;
    this.YearList = ['2030', '2029', '2028', '2017', 'whatever'];
    this.MonthList = ["January", "February", "March", "April", "May", "June", "Jully", "August", "September", "October", "November", "December"
    ];
    function generateArrayOfYears() {
      var max = new Date().getFullYear()
      var min = max - 9

      for (var i = max; i >= min; i--) {
        this.years.push(i)
      }
      return this.years
    }
  }
}
</script>
<style scoped>
.demo-container {
  width: 100%;
  max-width: 350px;
  margin: 50px auto;
}

form {
  margin: 30px;
}

input {
  width: 200px;
  margin: 10px auto;
  display: block;
}
</style>
