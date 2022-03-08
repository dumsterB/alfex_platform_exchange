<template>
  <div>
    <v-snackbar
      :color="item.color"
      :key="item.id"
      right
      :timeout="timeout"
      top
      :value="i === 0"
      v-for="(item, i) in items"
    >
      <div class="main-msg">
        <div>
          <h3>{{ item.title }}</h3>
          <div>{{ item.text }}</div>
        </div>
        <div class="action-button">
          <v-btn
            @click="removeItem(item.id)"
            text
            v-if="items.length > 1"
          >{{nextButtonText}} ({{items.length - 1}} more)</v-btn>
          <v-btn @click="removeItem(item.id)" text icon v-else>
            <v-icon>{{closeButtonIcon}}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-snackbar>
  </div>
</template>
<script>

export default {
  data() {
    return {
      timeout: 10000,
      nextButtonText: "Next",
      closeButtonIcon: "mdi-close",
      processing: false,
      timeoutId: false
    };
  },
  created() {
    this.$axios.onResponse(response => {
      if (response.data && !response.data.success) {
        let msg = response.data.message;
        let title = response.config.url;
        this.addItem(title, msg);
      }
      return response;
    });
  },
  computed: {
    items() {
      return this.$store.state.data.notifications.messages;
    }
  },
  watch: {
    items() {
      this.processItems();
    }
  },
  methods: {
    processItems() {
      const vm = this;
      vm.processing = true;
      if (vm.items && Array.isArray(vm.items) && vm.items.length > 0) {
        const item = vm.items[0];
        return (vm.timeoutId = setTimeout(() => {
          vm.removeItem(item.id);
        }, vm.timeout));
      }
      vm.processing = false;
    },
    addItem(title, message) {
      const vm = this;
      let item = {
        id: vm.uniqueId("error_"),
        title: title,
        text: message,
        color: "error"
      };
      this.$store.commit("data/notifications/create", item);
    },
    removeItem(id) {
      const vm = this;
      clearTimeout(vm.timeoutId);
      this.$store.commit("data/notifications/remove", id);
      if (vm.items.length > 0) {
        return vm.processItems();
      }
    },
    uniqueId: prefix =>
      `${prefix}_` +
      Math.random()
        .toString(36)
        .substr(2, 9)
  }
};
</script>
<style scoped>
.main-msg {
  display: grid;
  grid-template-columns: 1fr 150px;
}
.action-button {
  text-align: right;
}
</style>