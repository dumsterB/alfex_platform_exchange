<template>
  <div >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card class="currecyCard" elevation="3" v-bind="attrs" v-on="on" :width="200">
          <v-list-item three-line class="pa-2" @click="$router.push('/')">
            <v-list-item-content class="pa-1">
              <div class="d-flex">
                <v-img :src="currency.logo" :max-width="20"></v-img>
                <span class="mt-1 ml-1">{{ currency.short_name.toUpperCase() }}</span>
              </div>
              <span>404.00$</span>
            </v-list-item-content>
            <v-list-item-content class="coinList pa-1 flexNone">
              <div class="success-text chip">24H</div>
              <span class="success-text ">000.00%</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <span>Tooltip</span>
      <br>
      <span>Tooltip</span>
      <br>
      <span>Tooltip</span>
      <br>
      <span>Tooltip</span>
      <br>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  props: {
    currency: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters("data/currency", {
      currencies: "list",
    }),
  },
  methods: {},
  mounted() {
    //console.log(this.currency)
  },
};
</script>
