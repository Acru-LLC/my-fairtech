<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div class="navbar-header">
          <div class="d-flex w-100">
            <div class="navbar-brand-box d-flex justify-content-between flex-row align-items-center w-100">
              <button
                  id="vertical-menu-btn"
                  type="button"
                  class="btn btn-sm px-3 font-size-20 header-item"
                  :class="{'mn-215px': toggle, 'mr-3': !toggle}"
                  @click="toggleMenu(true)"
              >
                <i class="mdi mdi-menu"></i>
              </button>
              <router-link tag="a" to="/" class="logo logo-dark">
                <div class="logo-sm d-inline">
                  <img src="@/assets/images/logo-acru.png" alt height="40"/>
                </div>
              </router-link>
              <div class="d-inline-block">&nbsp;</div>
            </div>
          </div>
        </div>
      </header>
      <div class="sidebar h-100 vertical-menu vertical-collpsed">
        1
      </div>
      <div class="main-content">
        <div class="page-content">
          <div class="container">
            <vue-pdf v-if="this.notFound" :src="file" />
            <div v-else>
              {{"Ma'lumot topilmadi"}}
            </div>
          </div>
        </div>
        <transition name="fade">
          <div id="goToTopButton" v-show="scY > 300" @click="toTop" style="right: 15px;bottom:15px;">
            <b-btn variant="link">
              <i class="mdi mdi-36px mdi-arrow-up-circle position-fixed"></i>
            </b-btn>
          </div>
        </transition>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/footer";
import router from "@/router";
import vuePdf from "vue-pdf"
import checkService from '@/shared/services/checkService'
export default {
  name: "Index",
  components: {
    Footer,
    vuePdf,
  },
  data() {
    return {
      toggle: true,
      scTimer: 0,
      scY: 0,
      file: 0,
      notFound: 0,
    }
  },
  methods: {
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    toggleMenu () {
      if (this.toggle) {
        document.body.classList.add("vertical-collpsed");
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.remove("vertical-collpsed");
        document.body.classList.add("sidebar-enable");
      }
      if (window.screen.width < 992) {
        router.afterEach(() => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.toggle = !this.toggle
    },
  },
  computed: {
    applicationId(){
      return this.$route.params.applicationId;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    console.log(this.applicationId)
    if (this.notFound) {
      checkService.dxaVisaDataGetFileByQrcode(this.applicationId).then(({data}) => {
        this.file = data.file;
        this.notFound = Boolean(this.file)
      })
          .catch(() => {
            this.notFound = false;
          })
    }
  },
}
</script>

<style scoped>
  .mn-215px {
    margin-left: 215px;
  }
</style>