<template>
  <tr @click="$emit('pushData', data)">
    <slot name="index"></slot>
    <th class="text-center">
      <p class="m-0">{{ getName({ ...data }) }}</p>
    </th>

    <td
      v-show="thirdColumns.length !== index + 1"
      v-for="(i, index) in thirdColumns.length"
      :key="index + 'td'"
      class="text-center"
    >
    </td>

    <slot name="actions"></slot>
  </tr>
</template>

<script>
// import { getName } from "@/helper";
export default {
  methods: {
    setColums(v) {
      this.columns = [...v];
      return this.columns;
    },
  },
  data() {
    return {
      // getName: getName,
    };
  },
  props: ["data", "listColumns", "thirdColumns"],
};
</script>

<style>
</style>
