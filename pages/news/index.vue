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
            <NewsItem :item="article" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewsItem from "~/components/elements/NewsItem";
import { mapGetters, mapActions } from "vuex";
const model = "config/data";

export default {
  components: {
    NewsItem,
  },
  computed: {
    ...mapGetters(model, {
      news: "news",
    }),
  },
  methods: {
    ...mapActions(model, {
      fetchNews: "fetchNews",
    }),
  },
  async mounted() {
    await this.fetchNews();
  },
};
</script>
