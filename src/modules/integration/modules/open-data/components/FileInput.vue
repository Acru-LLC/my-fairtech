<template>
  <div class="form-group">
    <b-form-file
        v-model="file"
        accept=".xlsx, .xls"
        :state="Boolean(file)"
    />
  </div>
</template>
<script>
export default {
  name: "FileInput",
  props: {},
  data() {
    return {
      file: null
    };
  },
}
</script>
<style scoped>
</style>