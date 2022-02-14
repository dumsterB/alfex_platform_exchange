<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col
            class="d-flex justify-center mt-4"
            v-for="article in news"
            :key="article.articleId"
          >
            <Card :item="article" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "~/components/elements/Card";
import { mapGetters, mapActions } from "vuex";
const model = "config/data";

export default {
  components: {
    Card,
  },
  computed: {
    ...mapGetters(model, {
      news: "news",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchNews: "fetchList",
    }),
  },
  async mounted() {
    await this.fetchNews();
  },
};
</script>
