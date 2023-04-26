<template>
  <b-button class="btn-custom" :to="to" variant="primary">
    <i class="fa fa-arrow-left"></i>
    <!-- {{ $t("actions.back") }} -->
  </b-button>
</template>

<script>
export default {
    props:["to"]
};
</script>

<style>
</style>