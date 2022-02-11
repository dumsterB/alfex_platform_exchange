<template>
  <v-select
    class="lang_select"
    v-model="$i18n.locale"
    :items="langs"
    outlined
    dense
    hide-details
    item-text="text"
    item-value="value"
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
    ...mapGetters("config/data", {
      langs: "languages",
    }),
  },

  methods: {
  },
};
</script>
