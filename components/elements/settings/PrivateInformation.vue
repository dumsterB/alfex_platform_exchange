<template>
  <div class="privateInformation">
    <p class="text-h6">{{$t('settings_page')}}</p>
    <v-card class="mainCard">
      <div class="text-center">
        <div class="selecImage">
          <div
            class="image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          >
    <span
      v-if="!imageData"
      class="placeholder"
    >
      <v-icon size="70">mdi-camera</v-icon>
    </span>
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @input="onSelectFile"
            >
          </div>
        </div>
        <p>{{ $t('choose_photo') }}</p>
      </div>
      <div class="form">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6" lg="6">
              <v-text-field
                v-model="name"
                :rules="[v => !!v || $t('enter_first_name')]"
                outlined
                filled
                dense
                :label="$t('first_name')"
                required
              ></v-text-field>

              <v-text-field
                v-model="surname"
                :rules="[v => !!v || $t('email_not_standart')]"
                :label="$t('email')"
                required
                outlined
                filled
                dense
              ></v-text-field>

              <v-select
                v-model="selectCountry"
                :items="countries"
                :label="$t('place_of_birth')"
                outlined
                filled
                dense
                required
              ></v-select>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    :label="$t('date_of_birth')"
                    readonly
                    outlined
                    filled
                    :rules="[v => !!v || $t('enter_day_birth')]"
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-col>
            <v-col cols="12" md="6" sm="6" lg="6">

              <v-text-field
                v-model="email"
                outlined
                filled
                dense
                :label="$t('surname')"
                :rules="[v => !!v || $t('enter_last_name')]"
                required
              ></v-text-field>
              <v-text-field
                v-model="phone"
                outlined
                filled
                dense
                :label="$t('phone_number')"
                required
              ></v-text-field>
              <v-select
                v-model="selectGender"
                outlined
                filled
                :label="$t('gender')"
                dense
                :rules="[v => !!v || $t('invalid_gender')]"
                :items="gender"
                required
              ></v-select>
            </v-col>
            <v-card-actions class="text-center d-flex justify-center">
              <v-btn
                class="mr-4 success-btn"
                @click="validate"
                elevation="0"
                large
                :disabled="!disableBtn"
              >
                {{ $t('saveAccountSettings') }}
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-container>

      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "privateInformation",
  data() {
    return {
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      countries: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'],
      gender: ['male', 'female'],
      imageData: null,
      selectGender: this.$auth.gender,
      selectCountry:'',
      name: this.$auth.user.name,
      surname:this.$auth.user.last_name,
      email:this.$auth.user.mail,
      date:this.$auth.user.birth,
      menu:this.$auth.user.menu,
      phone:this.$auth.user.phone,
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.$emit('input', files[0])
      }
    }
  },
  mounted() {
    console.log(this.$auth.user);
  },
  computed:{
    disableBtn(){
      return this.name && this.surname && this.selectCountry && this.selectGender && this.phone && this.email && this.date
    }
  }
}
</script>

<style scoped>
.selecImage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-input {
  display: block;
  width: 120px;
  height: 120px;
  cursor: pointer;
  border-radius: 50% !important;
  border: 2px solid #32fa5d;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}

.file-input {
  display: none;
}
</style>
