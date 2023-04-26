<template>
  <p class="custom-p">
    <span class="badge bg-primary">{{ lang }}</span>: <span><slot/></span>
  </p>
</template>
<script>
export default {
  name: "MultiLangCell",
  props: {
    lang: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-p {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  flex-basis: 0;
  flex-grow: 1;
  gap: .3rem;
}
</style>