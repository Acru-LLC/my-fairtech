<template>
  <div style="overflow: auto" class="pb-5">
    <table class="table table-centered table-custom-bordered">
      <thead>
        <slot name="thead" />
      </thead>
      <tbody>
        <template v-for="(data, index) in listRows">
          <Tr
            :index="index"
            :listColumns="listColumns"
            :thirdColumns="thirdColumns"
            :key="data.id + 'SelectedRow'"
            :data="data"
          />
        </template>


      </tbody>
    </table>
  </div>
</template>

<script>
import Tr from "./tr";
export default {
  components:{
    Tr
  },

  props: {
    listRows: {
      type: Array,
      default: () => [],
    },
    listColumns: {
      type: Array,
      default: () => [],
    },
    thirdColumns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
*, :after, :before {
  box-sizing: border-box;
}
</style>
