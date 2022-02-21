// import Vue from "vue";
// import Vuetify from "vuetify/lib";

// Vue.use(Vuetify);

// const vuetify = new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: "#b71c1c",
//         secondary: "#b0bec5",
//         anchor: "#8c9eff",
//       },
//     },
//   },
// });

// export default vuetify;

import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
export default vuetify;
console.log("Vuetify :>> ", vuetify);
// Light theme
// this.$vuetify.theme.themes.light.primary = "#b71c1c";
console.log("primary light :>> ", vuetify.framework.theme.themes.light.primary);
console.log("primary dark :>> ", vuetify.framework.theme.themes.dark.primary);

// Dark theme
// this.$vuetify.theme.themes.dark.primary = "#8c9eff";
