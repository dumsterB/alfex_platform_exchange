<template>
  <v-select
    v-model="$i18n.locale"
    :items="langs"
    outlined
    dense
    hide-details
    @change="modeChange"
    item-text="name"
    item-value="code"
    :label="$t('CurrentLanguage')"
  ></v-select>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
  },
  data() {
    return {
    };
  },
  watch: {
    CURRENT_LOCALE(v) {
    },
  },
  computed: {
    CURRENT_LOCALE() {
      return this.$i18n.locale;
    },
    langs() {
      return this.$i18n.locales
    }
  },

  methods: {
    modeChange() {
      localStorage.setItem("language", this.CURRENT_LOCALE);
    }
  },
};
</script>
