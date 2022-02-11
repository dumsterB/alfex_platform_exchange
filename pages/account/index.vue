<template>
  <div>
    <v-row>
      <v-col :cols="8">
        <v-row>
          <v-col v-for="(curr, i) in currencies" :key="i">
            <Currency :currency="curr" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="4"></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Currency from "~/components/elements/Currency";
const model = "data/currency";

export default {
  components: {
    Currency,
  },
  computed: {
    ...mapGetters(model, {
      currencies: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchCurrencies: "fetchList",
    }),
  },
  async mounted() {
    await this.fetchCurrencies();
  },
};
</script>
