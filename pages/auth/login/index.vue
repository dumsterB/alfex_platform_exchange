<template>
  <div class="py-10">
    <v-row>
      <v-col>
        <v-row>
          <v-spacer></v-spacer>
          <img
            style="height: 60px; margin-right: 20px"
            src="data:image/png;base64,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"
            alt="Профинвест картинка"
          />
          <LangSelect style="max-width: 150px; margin-top: 10px" />
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :md="12" :lg="6" style="">
        <v-card
          v-if="!reg_log"
          elevation="4"
          max-width="450"
          class="px-4 py-6 pt-8 mx-auto"
        >
          <h3>{{ $t("register") }}</h3>
          <div v-if="steper == 0">
            <p class="d-flex">
              {{ $t("readyToRegister") }}
              <span
                style="cursor: pointer; color: green"
                class="ml-2"
                @click="reg_log = true"
                >{{ $t("signinHere") }}</span
              >
            </p>
            <v-form ref="reg_form" class="mt-6" :lazy-validation="false">
              <v-row>
                <v-col :cols="6">
                  <v-text-field
                    v-model="name"
                    :rules="validation.name"
                    dense
                    outlined
                    :label="$t('first_name')"
                  ></v-text-field>
                </v-col>
                <v-col :cols="6">
                  <v-text-field
                    v-model="surname"
                    :rules="validation.surname"
                    dense
                    outlined
                    :label="$t('surname')"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="email"
                :rules="validation.email"
                dense
                outlined
                :label="$t('email')"
                required
              ></v-text-field>
              <v-text-field
                v-model="phone_number"
                :rules="validation.number"
                dense
                outlined
                type="number"
                :label="$t('phone_number')"
              ></v-text-field>
              <v-autocomplete
                v-model="selectCountry"
                :items="countries"
                :rules="validation.birth_place"
                :label="$t('place_of_birth')"
                outlined
                dense
              ></v-autocomplete>
              <v-row>
                <v-col :cols="6">
                  <v-text-field
                    v-model="date"
                    :label="$t('date_of_birth')"
                    outlined
                    :rules="validation.birth"
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col :cols="6">
                  <v-autocomplete
                    v-model="selectGender"
                    :items="['male', 'female']"
                    :label="$t('gender')"
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
              </v-row>

              <p v-if="error_message" style="color: red"></p>

              <div class="d-flex">
                <v-checkbox v-model="checkbox"></v-checkbox>
                <span
                  style="font-size: 13px; margin-top: 22px"
                  class="text-gray"
                >
                  {{ $t("agree_with_policy") }}</span
                >
              </div>
              <p style="font-size: 14px">
                {{ $t("agree")
                }}<span style="cursor: pointer; color: green">
                  {{ $t("terms_and_policy") }}
                </span>
              </p>

              <div>
                <v-btn
                  width="200"
                  outlined
                  tile
                  class="d-flex mt-2 mb-2 mx-auto"
                  color="green"
                  @click="reg_start"
                >
                  {{ $t("to_continue") }}
                </v-btn>
              </div>
            </v-form>
          </div>
          <div v-if="steper == 1">
            <p class="d-flex">
              {{ $t("create_password") }}
            </p>
            <v-form
              ref="reg_form_password"
              class="mt-6"
              :lazy-validation="false"
            >
              <v-text-field
                v-model="email"
                disabled
                dense
                outlined
                :label="$t('email')"
              ></v-text-field>

              <v-text-field
                v-model="password"
                dense
                outlined
                :label="$t('password')"
                :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="validation.password"
                :type="is_show_pass ? 'text' : 'password'"
                @click:append="is_show_pass = !is_show_pass"
              ></v-text-field>

              <v-text-field
                v-model="password_confirm"
                dense
                outlined
                :label="$t('confirm_password')"
                :append-icon="is_show_pass_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="ident_passwords"
                :type="is_show_pass_confirm ? 'text' : 'password'"
                @click:append="is_show_pass_confirm = !is_show_pass_confirm"
              ></v-text-field>

              <div>
                <v-btn
                  width="200"
                  outlined
                  tile
                  class="d-flex mt-2 mb-2 mx-auto"
                  color="green"
                  @click="reg_end"
                >
                  {{ $t("to_continue") }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-card>
        <v-card
          v-if="reg_log"
          max-width="450"
          elevation="4"
          class="px-4 py-6 pt-8 mx-auto"
        >
          <h3>{{ $t("signin") }}</h3>
          <p class="d-flex">
            {{ $t("haveNotAccount") }}
            <span
              style="cursor: pointer; color: green"
              class="ml-2"
              @click="reg_log = false"
              >{{ $t("signupHere") }}</span
            >
          </p>
          <v-form
            v-model="auth_login_form_valid"
            ref="auth_login_form"
            class="mt-6"
            :lazy-validation="false"
            @submit.prevent="auth_login"
          >
            <v-text-field
              v-model="email"
              :rules="validation.email"
              dense
              outlined
              :label="$t('email')"
            ></v-text-field>

            <v-text-field
              v-model="password"
              dense
              outlined
              :label="$t('password')"
              :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.required"
              :type="is_show_pass ? 'text' : 'password'"
              @click:append="is_show_pass = !is_show_pass"
            ></v-text-field>

            <div>
              <v-btn
                width="200"
                outlined
                tile
                class="d-flex mt-2 mb-2 mx-auto"
                color="green"
                type="submit"
              >
                {{ $t("signin") }}
              </v-btn>
              <span class="forgetPassword">
                {{ $t("forgetPasswordMessage") }}</span
              >
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col :md="12" :lg="6" class="text-center">
        <div style="position: relative; top: 20%">
          <SvgImage />
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="is_notify" color="#1F1F29" :timeout="3000" top="top">
      {{ is_notify_message }}
      <v-btn dark text @click="is_notify = false"> OK</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import SvgImage from "./svg.vue";
import LangSelect from "~/components/settings/LanguageSelect";
export default {
  layout: "auth",
  components: {
    SvgImage,
    LangSelect,
  },
  watch: {
    CURRENT_LOCALE(v) {
      this.validation = {
        required: [(v) => !!v || this.$t("password_required")],
        password: [
          (v) => !!v || this.$t("password_required"),
          (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || this.$t("password_create_description"),
        ],
        number: [(v) => (!!v && v.length == 12) || this.$t("invalid_phone_number")],
        name: [(v) => !!v || this.$t("enter_first_name")],
        surname: [(v) => !!v || this.$t("enter_last_name")],
        birth_place: [(v) => !!v || this.$t("enter_place_birth")],
        birth: [(v) => !!v || this.$t("enter_day_birth")],
        email: [
          (v) => !!v || this.$t("enter_verification_email"),
          (v) => /.+@.+\..+/.test(v) || this.$t("enter_verification_email"),
        ],
      };
    },
  },
  computed: {
    CURRENT_LOCALE() {
      return this.$i18n.locale;
    },
  },
  data() {
    return {
      countries: this.$store.state.config.data.countries,
      auth_login_form_valid: false,
      name: "",
      surname: "",
      phone_number: null,
      phone_str: "",
      selectCountry: null,
      selectGender: null,
      date: null,
      checkbox: false,
      email: "",
      password: "",
      password_confirm: "",
      // settings
      is_show_pass: false,
      is_show_pass_confirm: false,
      is_notify: false,
      is_notify_message: "",
      reg_log: false,
      steper: 0,
      error_message: null,
      ident_passwords: [],

      // data validation
      validation: {
        required: [
          (v) => !!v || this.$t("password_required"),
        ],
        password: [
          (v) => !!v || this.$t("password_required"),
          (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || this.$t("password_create_description"),
        ],
        number: [(v) => (!!v && v.length == 12) || this.$t("invalid_phone_number")],
        name: [(v) => !!v || this.$t("enter_first_name")],
        surname: [(v) => !!v || this.$t("enter_last_name")],
        birth_place: [(v) => !!v || this.$t("enter_place_birth")],
        birth: [(v) => !!v || this.$t("enter_day_birth")],
        email: [
          (v) => !!v || this.$t("enter_verification_email"),
          (v) => /.+@.+\..+/.test(v) || this.$t("enter_verification_email"),
        ],
      },
    };
  },

  methods: {
    async auth_login() {
      if (!this.$refs.auth_login_form.validate()) {
        return;
      }

      await this.$auth
        .loginWith("local", {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        .then(function (response) {
          // console.log(response);
        })
        .catch((er) => {
          console.log(er);
          this.is_notify = true;
          this.is_notify_message = this.$t("AuthorisationError");
        });
    },
    async reg_start() {
      if (!this.$refs.reg_form.validate()) {
        return;
      }
      this.phone_str = `+${this.phone_number}`;
      let res = await this.$axios.put("api/user/validate", {
        mail: this.email,
        phone: this.phone_str,
      });
      if (res.data.success) {
        this.steper = 1;
      } else {
        this.error_message = res.data.message;
        this.is_notify = true;
        this.is_notify_message = this.$t(this.error_message);
      }
    },
    async reg_end() {
      if (!this.$refs.reg_form_password.validate()) {
        return;
      }
      if (this.password != this.password_confirm) {
        this.ident_passwords = [this.$t("password_match")];
        return;
      }
      let res = await this.$axios.post("api/auth/register", {
        birthDate: this.date,
        birthPlace: this.selectCountry,
        firstName: this.name,
        lastName: this.surname,
        mail: this.email,
        password: this.password,
        phone: this.phone_str,
        phoneCode: this.phone_str,
      });
      if (res.data.success) {
        await this.$auth
          .loginWith("local", {
            data: {
              username: this.email,
              password: this.password,
            },
          })
          .then(function (response) {
            // console.log(response);
          })
          .catch((er) => {
            console.log(er);
            this.is_notify = true;
            this.is_notify_message = this.$t("AuthorisationError");
          });
      } else {
        this.error_message = res.data.message;
        this.is_notify = true;
        this.is_notify_message = this.$t(this.error_message);
      }
    },
  },

  mounted() {},
};
</script>
<style scoped>
.forgetPassword {
  color: #23ad41;
  text-align: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 15px;
}
</style>
