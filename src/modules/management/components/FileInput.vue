<template>
  <div class="form-group">
    <b-form-file
        v-model="file"
        :accept="accept"
        :state="Boolean(file)"
    />
  </div>
</template>
<script>
export default {
  name: "FileInput",
  props: {
    accept: {
      type: String,
      default: '*'
    },
    fileSizeLimit: {
      type: Number,
      default: -1
    },
  },
  watch: {
    file() {
      if (this.file && this.fileSizeLimit > 0 && this.file.size > this.fileSizeLimit) {
        const size = this.file.size;
        this.file = null
        this.$emit('is-large', size)
      }
    },
  },
  data() {
    return {
      file: null
    };
  },
}
</script>
<style scoped>
</style>