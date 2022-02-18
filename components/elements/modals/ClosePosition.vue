<template v-slot:[`item.action`]="{ item }">
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          name="closeOrder"
          @click="close(item, $event)"
          class="green accent-3"
        >
          {{ "X" }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="d-flex">
          <span class="text-h5">{{ $t("close_order") }}</span>
          <span class="text-h6">{{ $t("choose_marketplace") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-radio-group
              v-for="(item, i) in list"
              :key="i"
              v-model="radios"
              column
            >
              <v-radio
                :label="item.arbitrage_company.name"
                :value="item.amount"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            name="goBack"
            text
            @click="close(item, $event)"
          >
            {{ $t("go_back") }}
          </v-btn>
          <v-btn
            color="green darken-3"
            name="agree"
            text
            @click="close(item, $event)"
            type="submit"
          >
            {{ $t("ok") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<template>
  <script>
    const company = "data/arbitrage_company";
    export default {
      name: "ClosePosition",
      props: {
        item: {
          item: Object,
          default: () => {
            return {};
          },
        },
      },
    };
  </script>
</template>
