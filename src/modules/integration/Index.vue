<template>
  <div>
    <Layout>
    <navbar style="margin-bottom:110px !important;"/>
      <router-view class="px-4"/>
    </Layout>
  </div>
</template>

<script>
import Navbar from "/src/components/nav-bar.vue";
import Layout from "/src/router/layouts/main"

export default {
  name: "Index",
  components: {
    Navbar,
    Layout
  },
  data: () => ({  }),
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
