<template>
  <div>
    <Article class="mt-4" :item="item.item" />
  </div>
</template>

<script>
import Article from "~/components/elements/Article";
import { mapGetters, mapActions } from "vuex";
const model = "config/data";

export default {
  components: {
    Article,
  },
  computed: {
    ...mapGetters(model, {
      news: "news",
    }),
    item() {
      const articleId = this.$route.path.split("/").slice(2).toString();
      return {
        item: this.news.find((el) => el.articleId === articleId),
      };
    },
  },
};
</script>
