<template>
  <div class="d-flex justify-center align-center py-10">
    <div>
      <v-card
        elevation="4"
        class="d-flex flex-column justify-center _align-center px-4 py-6 pt-8"
      >
        <v-form
          v-model="auth_registration_form_valid"
          ref="auth_registration_form"
          :lazy-validation="false"
          @submit.prevent
          class="mt-6"
        >
          <v-text-field
            v-model="registration.name"
            dense
            outlined
            :label="labelName"
            class="mt-4"
            required
          ></v-text-field>
          <v-text-field
            v-model="registration.company_name"
            dense
            outlined
            :label="labelCompany"
            required
          ></v-text-field>
          <v-divider class="mb-6"></v-divider>
          <v-text-field
            v-model="registration.phone"
            dense
            outlined
            :label="labelPhone"
            required
          ></v-text-field>
          <v-divider></v-divider>
        </v-form>

        <v-btn
          outlined
          tile
          class="mt-8 mb-2 mx-10"
          _click="auth"
          :disabled="sended"
          color="blue"
          @click="auth_registration"
        >
          {{ $t("SendRequest") }}
        </v-btn>
        <div v-if="sended" class="sent_block">
          <v-divider class="mt-3 mb-3"></v-divider>
          <p>{{ $t("Sent") }}</p>
        </div>
        <v-divider class="mt-6 mb-3"></v-divider>
        <p class="already_have_account mb-0 mt-4 text-center">
          {{ $t("AlreadyHaveAccount") }}
        </p>
        <v-btn text width="200" class="mt-1 ma-auto" nuxt to="/auth/login">{{
          $t("SignIn")
        }}</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  layout: "auth",
  watch: {
  },
  // ..
  auth: false,
  data() {
    return {
      auth_registration_form_valid: false,
      registration: {
        name: "",
        company_name: "",
        phone: "",
      },
      sended: false,
    };
  },

  methods: {
    async auth_registration() {
      
    },
  },

  computed: {
    // input validation
    CURRENT_LOCALE() {
      return this.$i18n.locale;
    }
  },

  components: {
    // ..
  },
};
</script>

