<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :permanent="permanent"
    :mini-variant="style_panel_left_minimal"
    mobile-break-point="1"
    mini-variant-width="75"
    id="main_menu"
    class="menu elevation-0"
  >
    <div
      v-if="style_panel_left_minimal"
      class="logo d-flex align-center justify-center px-4"
    ></div>

    <div
      v-if="!style_panel_left_minimal"
      class="panel_left_minimal d-flex align-center justify-start px-4"
    ></div>

    <div
      v-if="style_panel_left_minimal"
      class="d-flex align-center px-4"
      style="height: 100px; margin: 0px"
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
      style="height: 100px; margin: 0px"
    >
      <v-btn
          icon
          class="ml-auto"
          color="#aaa"
          @click.stop="style_panel_left_minimal = !style_panel_left_minimal"
        >
          <v-icon size="28">{{ "mdi-chevron-left" }}</v-icon>
        </v-btn>
    </v-row>

    <v-divider color="#21212B"></v-divider>
    <v-list class="ma-0 pa-0">
      <v-list-item-group v-model="menu_active">
        <div v-for="(item, i) in menu" :key="i">
          <v-list-item :key="i" nuxt :to="item.to" active-class="_nav-active">
            <template v-slot:default="{}">
              <v-tooltip
                right
                nudge-right
                transition="slide-x-reverse-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-list-item-action v-on="on">
                    <v-icon color="#444351" size="24">{{
                      item.icon
                    }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      class="menu_item__title"
                      v-text="item.title"
                    />
                  </v-list-item-content>
                </template>
                <span>{{ item.title }}</span>
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

export default {
  data: function () {
    return {
      style_panel_left_minimal: false,
      permanent: true,
      menu_active: 0,
      drawer: true,
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
<style scoped>
</style>
