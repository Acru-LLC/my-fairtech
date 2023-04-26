<template>
  <thead>
    <tr v-for="(fieldRows, fieldRowsIndex) in fieldList" :key="fieldRowsIndex">
      <th v-for="(item, index) in fieldRows"
          class="text-center vertical-align-middle max-width-fit-content"
          :rowspan="fieldList.length > 1 ? (item.children.length > 0 ? 1 : fieldList.length - fieldRowsIndex) : 1"
          :colspan="item.children.length ? sumChildrenCount(item) : 1"
          :key="index"
      >
        {{ getName(item) }}
      </th>
    </tr>
<!--    <tr>-->
<!--      <th v-for="(_, index) in fieldList"-->
<!--          class="text-center"-->
<!--          :key="index">{{ index + 1 }}-->
<!--      </th>-->
<!--    </tr>-->
  </thead>
</template>

<script>
export default {
  name: "report-header",
  props: {
    fields: {
      type: Array,
    },
  },
  data() {
    return {
      fieldList: [],
    }
  },
  created() {
    this.filterFields(this.fields);
  },
  methods: {
    filterFields(list, depth = 0) {
      this.fieldList[depth] = [];
      list.forEach(e => {
        this.fieldList[depth].push(e);
        if (e.children && e.children.length > 0) {
          this.filterFields(e.children, depth + 1);
        }
      })
    },
    sumChildrenCount(item) {
      let count = 1;
      if (item.children && item.children.length > 0) {
        item.children.forEach(e => {
          count += this.sumChildrenCount(e);
        });
      }
      if (count > 1) {
        count = count - 1;
      }
      return count;
    },
  }
}
</script>

<style scoped>
.max-width-fit-content {
  max-width: fit-content;
}
.vertical-align-middle {
  vertical-align: middle;
}
</style>