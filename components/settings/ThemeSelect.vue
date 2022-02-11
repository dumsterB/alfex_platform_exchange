<template>
  <v-select
    v-model="selected_theme"
    :items="themes"
    outlined
    dense
    hide-details
    @change="modeChange"
    :label="$t('Theme')"
    :readonly="readonly"
  ></v-select>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
  },
  data() {
    return {
      selected_theme: "",
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters("config/data", {
      themes_store: "themes",
    }),
    themes() {
      let themes = [];
      this.themes_store.forEach((element) => {
        themes.push({
          text: this.$t(element),
          value: element,
        });
      });
      return themes;
    }
  },
  methods: {
    async modeChange(mode) {
      let htmlElement = document.documentElement;
      if (mode == "Dark") {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
        this.$vuetify.theme.dark = true;
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
        this.$vuetify.theme.dark = false;
      }
    },
  },
  mounted() {
    this.selected_theme = this.$vuetify.theme.dark ? "Dark" : "Light";
  },
};
</script>
