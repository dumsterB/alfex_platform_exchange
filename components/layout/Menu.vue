<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :permanent="permanent"
    :mini-variant="style_panel_left_minimal"
    mobile-breakpoint="1"
    mini-variant-width="75"
    width="280"
    class="elevation-0"
  >
    <div
      v-if="style_panel_left_minimal"
      class="logo d-flex align-center justify-start px-4"
    ></div>

    <div
      v-if="!style_panel_left_minimal"
      class="panel_left_minimal d-flex align-center justify-start px-4"
    ></div>

    <div
      v-if="style_panel_left_minimal"
      class="d-flex align-center px-4"
      style="height: 70px; margin: 0px"
    >
      <v-btn
        icon
        class="mx-auto"
        color="#aaa"
        @click.stop="style_panel_left_minimal = !style_panel_left_minimal"
      >
        <v-icon size="28">{{ "mdi-menu" }}</v-icon>
      </v-btn>
    </div>

    <v-row
      v-if="!style_panel_left_minimal"
      class="align-center px-4"
      style="height: 70px; margin: 0px"
    >
      <img
        style="height: 30px; margin-right: 20px; margin-left: auto;"
        :src="config.logo"
        alt="Профинвест картинка"
      />
      <v-btn
        icon
        class="ml-auto"
        @click.stop="style_panel_left_minimal = !style_panel_left_minimal"
      >
        <v-icon size="28">{{ "mdi-chevron-left" }}</v-icon>
      </v-btn>
    </v-row>

    <v-divider></v-divider>
    <v-list class="ma-0 pa-0">
      <v-list-item-group v-model="menu_active">
        <div v-for="(item, i) in menu" :key="i">
          <v-list-item :key="i" nuxt :to="item.to" active-class="primary--text">
            <template v-slot:default="{}">
              <v-tooltip
                right
                nudge-right
                transition="slide-x-reverse-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-list-item-action v-on="on">
                    <v-icon color="#9D9D9D" size="24">{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="$t(item.title)" />
                  </v-list-item-content>
                </template>
                <span>{{ $t(item.title) }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.json"
export default {
  data: function () {
    return {
      style_panel_left_minimal: false,
      permanent: true,
      menu_active: 0,
      drawer: true,
      config: config
    };
  },
  components: {},
  methods: {},

  computed: {
    ...mapGetters({
      menu: "config/menu/getAllMenu",
    }),
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped></style>
