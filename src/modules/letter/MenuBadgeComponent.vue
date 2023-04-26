<template>
  <div>{{ count }}</div>
</template>

<script>
import ProjectService from "@/shared/services/projectService";
import Store from "@/state/store";

export default {
  name: "MenuBadgeComponent",
  props: {
    params: String
  },
  methods: {
    async fetchLetterAllCount() {
      await Store.dispatch('menu/fetchLetterAllCount');
    },
  },
  created() {
    this.fetchLetterAllCount();
  },
  computed: {
    count() {
      switch (this.params) {
        case 'monitor':
          return `${Store.state.menu.descendedCount} / ${Store.state.menu.descendedDXACount}`;
        case 'create':
          return `${Store.state.menu.applicationCount} / ${Store.state.menu.applicationDXACount}`;
        case 'visa':
          return Store.state.menu.resolutionCount;
        case 'income':
          return Store.state.menu.incomeCount;
        case 'sent':
          return Store.state.menu.outgoingCount;
      }
      return this[this.params];
    }
  }
}
</script>