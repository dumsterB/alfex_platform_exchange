<template v-slot:[`item.action`]="{ item }">
  <v-card>
    <v-card-title class="d-flex">
      <span class="text-h5">{{ $t("close_order") }}</span>
      <span class="text-h6">{{ $t("choose_marketplace") }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row v-for="(elem, i) in cmps" :key="i" class="mb-2">
          <v-btn
            block
            outlined
            :width="150"
            :class="elem.checked ? 'green' : 'green--text'"
            @click="changeClicked(i)"
          >
            {{ elem.name }}
          </v-btn>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="mr-4 pb-4">
      <v-spacer></v-spacer>
      <v-btn class="green--text" outlined text @click="$emit('close')">
        {{ $t("go_back") }}
      </v-btn>
      <v-btn
        class="green"
        text
        outlined
        width="100"
        :loading="loading"
        @click="save"
        type="submit"
      >
        {{ $t("ok") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const model = "data/arbitrage_company";
export default {
  name: "ClosePosition",
  data() {
    return {
      cmps: [],
      loading: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(model, {
      companies: "list",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchList: "fetchList",
    }),
    ...mapActions("data/arbitrage_session", {
      update_as: "update",
    }),
    changeClicked(i) {
      this.cmps.forEach((e) => (e.checked = false));
      this.cmps[i].checked = true;
      this.cmps = Object.assign([], this.cmps);
    },
    save() {
      this.loading = true;
      let as_data = {};
      let ac = this.cmps.find((el) => el.checked == true);
      as_data.id = this.item.id;
      as_data.status_id = 2;
      as_data.stop_exchange_rate = 1;
      as_data.arbitrage_company_id = ac.id;
      // code
      console.log("this.defaultAs", this.item);
      console.log("as_data", as_data);
      // let rs = await this.update_as({data: as_data});
      // console.log("rs", rs);
      setTimeout(() => {
        this.loading = false;
        // this.emit('close');
      }, 500);
    },
    init() {
      let cmps = [];
      let pr = this.item.prices;
      this.companies.forEach((element) => {
        let dt = {
          name: element.name,
          id: element.id,
          logo: element.logo,
          price: pr ? pr[element.name] : null,
        };
        dt.checked = false;
        cmps.push(dt);
      });
      if (this.item.arbitrage_company_id) {
        let id = this.item.arbitrage_company_id;
        let fnd = cmps.find((e) => e.id == id);
        if (fnd) {
          fnd.checked = true;
        }
      }
      this.cmps = cmps;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
