<template>
  <div class="d-flex justify-center align-center py-10">
    <div style="width: 450px">
      <v-card
        elevation="4"
        class="d-flex flex-column justify-center _align-center px-4 py-6 pt-8"
      >
        <h3>{{$t('signin')}}</h3>
        <p class="d-flex">{{$t('haveNotAccount')}} <span class="ml-2" @click="goRegistration">{{$t('signupHere')}}</span> </p>
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
            label="Email"
            class="mt-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            dense
            outlined
            :label="$t('Password')"
            :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="validation.required"
            :type="is_show_pass ? 'text' : 'password'"
            @click:append="is_show_pass = !is_show_pass"
            required
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
              {{ $t("SignIn") }}
            </v-btn>
            <span class="forgetPassword"> {{$t('forgetPasswordMessage')}}</span>
          </div>
        </v-form>
      </v-card>
    </div>

    <v-snackbar v-model="is_notify" color="#1F1F29" :timeout="3000" top="top">
      {{ is_notify_message }}
      <v-btn dark text @click="is_notify = false"> OK </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  layout: "auth",
  watch: {
    CURRENT_LOCALE(v) {
      this.labelPassword = this.$t("password");
    },
  },
  computed: {
    CURRENT_LOCALE() {
      return this.$i18n.locale;
    },
  },
  data() {
    return {
      labelPassword: this.$t("password"),
      auth_login_form_valid: false,
      email: "",
      password: "",

      // settings
      is_show_pass: false,
      is_notify: false,
      is_notify_message: "",

      // data validation
      validation: {
        required: [(v) => !!v || this.$t("ObligatoryField")],
        email: [
          (v) => !!v || this.$t("ObligatoryField"),
          (v) => /.+@.+\..+/.test(v) || `${this.$t("Wrong")} email`,
        ],
      },
    };
  },

  methods: {
    goRegistration(){
      this.$router.push('/auth/registration')
    },
    initData() {
      (this.validation = {
        required: [(v) => !!v || this.$t("ObligatoryField")],
        email: [
          (v) => !!v || this.$t("ObligatoryField"),
          (v) => /.+@.+\..+/.test(v) || `${this.$t("Wrong")} email`,
        ],
      }),
        (this.labelPassword = this.$t("password"));
    },
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
  },

  mounted() {},
};
</script>
<style scoped>
.forgetPassword{
  color: #23ad41;
  text-align: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 15px;
}
</style>
