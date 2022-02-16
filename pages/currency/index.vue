<template>
  <div>
    <v-row>
      <v-col :cols="12" :md="3" :lg="3" :sm="12" :xs="12">
        <v-row>
          <v-col :cols="12" :md="5" :lg="5" :sm="12" :xs="12">
            <v-switch
              v-model="is_switched"
              class="ml-6 mt-4"
              :label="is_switched ? $t('Arbitrage') : $t('Spot')"
            ></v-switch>
          </v-col>
          <v-col :cols="12" :md="7" :lg="7" :sm="12" :xs="12">
            <v-autocomplete
              class="crypto-select ml-4 mt-4"
              v-model="curr_id"
              :items="currencies"
              item-text="short_name"
              item-value="id"
              outlined
              dense
              hide-details
              :label="$t('cryptocurrency')"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12" :md="8" :lg="8" :sm="12" :xs="12">
        <v-row class="ml-4">
          <v-col class="d-flex justify-center"> </v-col>
        </v-row>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12" :xs="12"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/currency";

export default {
  components: {},
  data() {
    return {
      is_switched: false,
      curr_id: null,
    };
  },
  computed: {
    ...mapGetters(model, {
      currencies: "list",
      curr_by_id: "byId",
    }),
    current() {
      if (
        this.$router.currentRoute.query &&
        this.$router.currentRoute.query.id
      ) {
        this.curr_id = this.$router.currentRoute.query.id;
        return this.curr_by_id(this.curr_id);
      }
      return {};
    },
  },
  methods: {
    ...mapActions(model, {
      fetchCurrencies: "fetchList",
    }),
    ...mapActions("data/arbitrage_company", {
      fetchAC: "fetchList",
    }),
  },
  created() {},
  mounted() {
    this.fetchCurrencies();
    this.fetchAC();
  },
};
</script>
<style scoped>
.crypto-select {
  width: 160px;
}
</style>
