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
         <v-btn icon @click="$emit('cardDialogChanger')"><v-icon >mdi-close</v-icon></v-btn>
        </div>

        <v-card-text class='pb-6'>
          <v-row>
            

            <v-col cols='12'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line outlined mask="credit-card" v-model="valueOfCardNumber" hide-details dense
              />
            </v-col>

            <v-col cols='12'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDER’S NAME</v-subheader>
              <v-text-field
                single-line outlined label="" hide-details dense
              />
            </v-col>

            <v-col cols='8'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-text-field
                label="MM/DD" outlined hide-details dense
              />
            </v-col>

            <v-col cols='4'>
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field single-line outlined hide-details dense/>
            </v-col>

          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn elevation="0" large class="success-btn mb-4 ml-2">{{$t('add_card')}}</v-btn>
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
      valueOfCardNumber: '4478 6322 9923 8990',
      years:[],
    }
  },
  mounted() {
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
.v-subheader {
    height: 32px;
    margin-left: 6px;
}
</style>
