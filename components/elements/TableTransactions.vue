<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="wallets"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("my_wallet") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            dense
            v-model="search"
            append-icon="mdi-magnify"
            outlined
            :label="$t('market_search_bar_placeholder')"
            hide-details
          ></v-text-field>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn elevation="0" class="success-text" @click="depositChanger">{{
          $t("deposit_title")
        }}</v-btn>
      </template>
      <template v-slot:no-data>
        <p>No data</p>
      </template>
    </v-data-table>
    <Deposit :dialog="dialog" @depositChanger="depositChanger"></Deposit>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Deposit from "@/components/modals/Deposit";
export default {
  name: "TableTransactions",
  components: {
    Deposit,
  },
  props: {
    wallets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("coin_title"),
          align: "start",
          sortable: false,
          value: "currency.name",
          width: 220
        },
        { text: this.$t("wallet_balance"), value: "balance" },
        { text: this.$t("available_balance"), value: "balance" },
        { text: this.$t("equivalent") + " $", value: "eqv" },
        { text: this.$t("actions"), value: "actions" },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
  },
  methods: {
    depositChanger() {
      this.dialog = !this.dialog;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
</style>
