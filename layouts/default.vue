<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading" class="main-page">
      <Menu />
      <NavBar />
      <v-main fluid>
        <v-container fluid class="layout_default__content mt-5 ma-0 pa-0">
          <nuxt />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import NavBar from "~/components/layout/NavBar";
import Menu from "~/components/layout/Menu";
import LoadingScreen from "~/components/layout/LoadingScreen";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters("config/data", {
      default_language: "default_language"
    }),
  },
  methods: {
    preload_models() {
      if (this.$store.state.auth.user) {
        let htmlElement = document.documentElement;
        let theme = localStorage.getItem("theme");
        if (!theme) {
          theme = "light";
        }
        let lang = localStorage.getItem("language");
        if (!lang) {
          lang = this.default_language;
        }
        if (theme == "dark") {
          this.$vuetify.theme.dark = true;
        }
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", lang);
        htmlElement.setAttribute("theme", theme);
      }
    },
  },
  async created() {
    if (this.$store.state.auth.user) {
      this.preload_models();
    } else {
      if (this.$router.history.current.path != "/auth/registration") {
        this.$router.push({
          path: "/auth/login",
        });
      }
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  components: {
    NavBar,
    Menu,
    LoadingScreen,
  },
};
</script>

<style>
html {
  font-family: "Cera Pro";
  height: 100%;
  font-style: normal;
  font-weight: normal;
  background-repeat: no-repeat;
  -webkit-transition: 223ms;
  -o-transition: 223ms;
  transition: 223ms;
}
div {
  font-family: "Cera Pro";
}
</style>
