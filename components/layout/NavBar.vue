<template>
  <v-app-bar
    app
    flat
    fixed
    style="border-bottom: 1px solid #383741; height: 71px"
  >
    <div class="d-flex mt-8">
      <v-btn elevation="0" @click="handlerOpenWallet" class="navLink">{{
        $t("my_wallet")
      }}</v-btn>
      <v-btn elevation="0" @click="handlerOpenCommodities" class="navLink">{{
        $t("user_commodities")
      }}</v-btn>
      <v-btn elevation="0" @click="handlerOpenArbitrage" class="navLink">{{
        $t("user_arbitrage")
      }}</v-btn>
      <v-btn elevation="0" @click="handlerOpenTrading" class="navLink">{{
        $t("user_trading")
      }}</v-btn>
      <v-autocomplete
        v-model="value"
        :items="filterItems"
        prepend-inner-icon="mdi-magnify"
        :label="$t('market_search_bar_placeholder')"
        dense
        outlined
        class="ml-2"
      ></v-autocomplete>
    </div>
    <v-spacer></v-spacer>

    <v-menu
      transition="slide-y-transition"
      bottom
      right
      :offset-y="true"
      content-class="elevation-1"
      :close-on-content-click="false"
      hide-details
    >
      <template v-slot:activator="{ on }">
        <v-card
          flat
          class="account-menu d-flex flex-columns align-center mt-2 py-2 pr-2 pl-4"
          style="width: 200px"
          v-on="on"
        >
          <div class="mr-2">
            <v-avatar size="40">
              <v-icon class="mr-2">mdi-account</v-icon>
            </v-avatar>
          </div>
          <div>{{ $auth.user.name }}</div>
          <v-spacer></v-spacer>
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
          <v-list-item-title>{{ $t(action.name) }}</v-list-item-title>
        </v-list-item>
        <v-list-item style="margin-top: 8px"
          ><language-select style="width: 50px"></language-select
        ></v-list-item>
        <v-list-item style="margin-top: 8px"
          ><theme-select style="width: 50px"></theme-select
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LanguageSelect from "~/components/settings/LanguageSelect";
import ThemeSelect from "~/components/settings/ThemeSelect";

export default {
  data: function () {
    return {
      user_image: null,
      account_menu: this.initAccountMenu(),
      filterItems: [],
      value: null,
    };
  },
  methods: {
    ...mapActions("data/currency", {
      fetchCurrencies: "fetchList",
    }),
    ...mapActions("data/arbitrage_company", {
      fetchAC: "fetchList",
    }),
    initAccountMenu() {
      return [
        {
          name: "Account",
          action: () => {
            this.$router.push("/settings");
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
    handlerOpenWallet: function () {
      this.$router.push({
        path: `/wallet`,
      });
    },
    handlerOpenCommodities: function () {
      this.$router.push({
        path: `/commodities`,
      });
    },
    handlerOpenArbitrage: function () {
      this.$router.push({
        path: `/arbitrage`,
      });
    },
    handlerOpenTrading: function () {
      this.$router.push({
        path: `/trading`,
      });
    },
    async auth_logout() {
      this.$auth.logout();
    },
    async close(i, message_id) {},
  },
  mounted() {
    console.log("this.filterItems :>> ", this.filterItems);
    console.log("this.filter :>> ", this.filter);
  },

  watch: {},

  components: {
    LanguageSelect,
    ThemeSelect,
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
    ...mapGetters("data/arbitrage_company", {
      arbitrage_company: "list",
    }),
    ...mapGetters("data/currency", {
      currencies_full: "list",
    }),
    filter() {
      let options = [...this.arbitrage_company, ...this.currencies_full];
      let createOptions = options.map((item) => {
        return {
          label: item.name,
          value: item.name,
          logo: item.logo,
        };
      });
      console.log("createOptions :>> ", createOptions);
      this.filterItems = createOptions;
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

<style lang="scss">
.account-menu {
  background-color: rgb(39, 39, 39) !important;
}

.navLink {
  text-transform: none;
}

html[theme="light"] {
  .account-menu {
    background-color: rgb(245, 245, 245) !important;
  }
}
</style>
