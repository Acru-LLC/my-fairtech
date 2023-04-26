<script>
import Layout from "@/router/layouts/main";
import appConfig from "@/app.config";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    // PageHeader,
  },
  data() {
    return {
      title: "Dashboard",
      items: [],
      showModal: false,
      isLoading: false,
      fullPage: true,
      canCancel: false,
      useSlot: false,
      loader: "spinner",
      color: "#007bff",
      bgColor: "#ffffff",
      height: 128,
      width: 128,
      timeout: 3000, //ms
      fetchingStats: true,
      earningStatus: true,
    };
  },
  /*
  COMPUTED */
  computed: {},
  /*
  METHODS */
  methods: {
    makeBreadCrumb(routeMatched) {
      routeMatched.forEach((route, idx) => {
        if (route.meta.bcDynamic && route.meta.bcStateVarAndModuleName && this.$store.state[route.meta.bcStateVarAndModuleName.moduleName]) {
          if (this.$store.state[route.meta.bcStateVarAndModuleName.moduleName][route.meta.bcStateVarAndModuleName.stateVar]) {
            if (this.$store.state[route.meta.bcStateVarAndModuleName.moduleName][route.meta.bcStateVarAndModuleName.stateVar][route.meta.bcStateVarAndModuleName.stateVarKey]) {
              route.meta.bcLinkText = this.$store.state[route.meta.bcStateVarAndModuleName.moduleName][route.meta.bcStateVarAndModuleName.stateVar][route.meta.bcStateVarAndModuleName.stateVarKey]
              route.meta.bcTo = {
                name: route.name,
                params: { [route.meta.paramName]: this.$route.params[route.meta.paramName] }
              }
            }
          }
        }
        if (route.meta.bcLinkText) {
          let routeMetaCopy = Object.assign({}, route.meta)
          let bcItem = {
            // disabled: idx === routeMatched.length - 1,
            text: routeMetaCopy.bcLinkText,
            // exact: true,
          }
          this.items.push(bcItem)
        }
      })
      // this.items = breadCrumbs
      if (this.items.length) {
        this.items[this.items.length - 1].active = true
        this.title = this.items[this.items.length - 1].text
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.showModal = true;
    }, 1500);
  },
  /*
  WATCH */
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.makeBreadCrumb(newVal.matched)
      }
    }
  }
};
</script>

<template>
  <Layout>
    <!--        <PageHeader-->
    <!--            :title="title"-->
    <!--            :items="items"-->
    <!--        />-->
    <slot/>
    <RouterView></RouterView>
  </Layout>
</template>