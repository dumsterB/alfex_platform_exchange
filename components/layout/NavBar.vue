<template>
  <v-app-bar
    app
    flat
    fixed
    style="border-bottom: 1px solid #383741; height: 71px"
  >
    <v-spacer></v-spacer>

    <v-menu
      transition="slide-y-transition"
      bottom
      right
      :offset-y="true"
      content-class="elevation-1"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-card
          flat
          class="d-flex flex-columns align-center mt-2 py-2 pr-2 pl-6"
          style="width: 200px"
          v-on="on"
        >
          <div class="mr-4">
            <v-avatar size="40">
              <v-icon class="mr-2">mdi-account</v-icon>
            </v-avatar>
          </div>
          <div>
            <v-icon class="mr-2">mdi-chevron-down</v-icon>
          </div>
        </v-card>
      </template>
      <v-list>
        <v-list-item
          v-for="(action, i) in account_menu"
          :key="i"
          dense
          @click="action.action"
        >
          <v-list-item-title>{{ action.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item style="margin-top: 8px"
          ><language-select
            style="width: 50px"
          ></language-select
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import LanguageSelect from "~/components/settings/LanguageSelect";

export default {
  data: function () {
    return {
      user_image: null,
      account_menu: this.initAccountMenu(),
    };
  },
  components: {
  },
  methods: {
    initAccountMenu() {
      return [
        {
          name: "Account",
          action: () => {
            this.$router.push("/account");
          },
        },
        {
          name: "LogOff",
          action: () => {
            this.auth_logout();
          },
        },
      ];
    },
    async auth_logout() {
      this.$auth.logout();
    },
    async close(i, message_id) {
      
    },
  },
  mounted() {
    
  },

  watch: {
    
  },

  components: {
    LanguageSelect
  },

  computed: {
    
    userAvatar: function () {
      try {
        this.user_image =
          this.$env("FILE_SERVER_BASE") +
          this.$store.state.auth.user.fs[0]["dir"];
      } catch (e) {
        this.user_image = "/files/avatar_default.jpg";
      }
    },
    user_in() {
    //   let name = this.$store.state.auth.user.name;
    //   let surname = this.$store.state.auth.user.surname;
    //   let initiales = name && name.length > 0 ? name[0] : "";
    //   initiales += surname && surname.length > 0 ? surname[0] : "";
      return "User";
    },
  },
};
</script>

<style scoped>
</style>