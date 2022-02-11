<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading" class="main-page">
      <Menu />
      <NavBar />
      <v-content fluid>
        <v-container fluid class="layout_default__content ma-0 pa-0">
          <nuxt />
        </v-container>
      </v-content>
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
  computed: {},
  methods: {},
  async created() {
    if (this.$store.state.auth.user) {
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
</style>
