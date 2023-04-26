export default {
  data() {
    return {
      heightWindow: window.innerHeight || 800,
      innerWidth: window.innerWidth,
    }
  },
  computed: {
    widthWindow() {
      return this.innerWidth
    },
    hrUrl() {
      return process.env.VUE_APP_HR_URL
    },
    baseUrl() {
      return process.env.VUE_APP_ROOT_URL
    }
  },
  methods: {
    getExt(filename) {
      return filename ? filename.split(".").pop().toLowerCase() : '';
    },
    async forceRouteReload(){
      const route  = {
        path: this.$route.path,
        query: this.$route.query,
        params: this.$route.params
      }
      // Navigate to a different route
      await this.$router.push('/force-reload')
      // Navigate back to the original route
      await this.$nextTick(async () => {
        await this.$router.push(route)
        await this.$forceUpdate()
      })
    },
    setWindowWidth() {
      this.innerWidth = window.innerWidth
    },
    //REPLACE STRING TO ARRAYi
    replaceStringToArray(name) {
      let res = name.replace(/{|}|"|NULL/g, function (x) {
        return "";
      });
      return res.split(',')
    },
    // CHECK EMPTY
    _empty(v) {
      if (v == null) {
        return true
      } else if (v.length === 0) {
        return true
      }
      return false
    },

  }
}
