<template>
  <div class="card-radio">
    <img width="40" :src="src" :alt="alt"/>
    <span class="ml-2">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "docsIcon",
  props: {
    src: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  }
}
</script>
