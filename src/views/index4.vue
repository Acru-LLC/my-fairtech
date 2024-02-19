<script>
import Services from "@/components/servicesCopy1.vue";
import Features from "@/components/features";
import Pricing from "@/components/pricingCopy1.vue";
import Team from "@/components/team";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

/**
 * index-4 component
 */
export default {
  name: "index-4",
  components: {
    Services,
    Features,
    Pricing,
    Team,
    Blog,
    Contact,
    Footer,
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      document.getElementById("navbarCollapse").classList.toggle("show");
    },
  },
};
</script>

<template>
  <div>
    <!-- STRAT NAVBAR -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-white navbar-custom sticky sticky-dark">
      <div class="container">
        <!-- LOGO -->
        <a class="navbar-brand logo text-uppercase" href="/">Dorsin</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu()"
        >
          <i class="mdi mdi-menu"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav navbar-center" id="mySidenav" v-scroll-spy-active>
            <li class="nav-item">
              <a v-scroll-to="'#home'" href="javascript: void(0);" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#services'" href="javascript: void(0);" class="nav-link">Services</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#features'" href="javascript: void(0);" class="nav-link">Features</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#pricing'" href="javascript: void(0);" class="nav-link">Pricing</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#team'" href="javascript: void(0);" class="nav-link">Team</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#blog'" href="javascript: void(0);" class="nav-link">Blog</a>
            </li>
            <li class="nav-item">
              <a v-scroll-to="'#contact'" href="javascript: void(0);" class="nav-link">Contact</a>
            </li>
          </ul>
          <div class="nav-button ml-auto">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <button
                  type="button"
                  class="btn btn-custom navbar-btn btn-rounded waves-effect waves-light"
                >Try it Free</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAVBAR -->
    <div v-scroll-spy>
      <!--START HOME-->
      <section
        class="section bg-home home-half"
        id="home"
        :style="{'background-image': 'url(' + require('@/assets/images/bg-home.jpg') + ')', 'background-size': 'cover','background-position': 'center' }"
      >
        <div class="bg-overlay"></div>
        <div class="display-table">
          <div class="display-table-cell">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 offset-lg-2 text-white text-center">
                  <h1 class="home-title">We help startups launch their products</h1>
                  <p
                    class="padding-t-15 home-desc"
                  >Etiam sed.Interdum consequat proin vestibulum class at.</p>
                  <p class="play-shadow margin-t-30 margin-l-r-auto">
                    <a v-b-modal.modal href="javascript: void(0);" class="play-btn video-play-icon">
                      <i class="mdi mdi-play text-center"></i>
                    </a>
                  </p>
                  <b-modal id="modal" hide-footer size="lg" centered header-close-variant="white">
                    <youtube video-id="RnDC9MXSqCY" ref="youtube" width="750" height="450"></youtube>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-pattern-effect">
          <img src="@/assets/images/bg-pattern.png" alt />
        </div>
      </section>
      <!--END HOME-->
      <Services />
      <Features />
      <Pricing />
      <Team />
      <Blog />
      <Contact />
      <Footer />
    </div>
  </div>
</template>


<style scoped>
::v-deep .modal-content {
  background-color: #000000;
  color: white;
  background: none;
  border: none;
}
::v-deep .modal-header {
  border: none;
}
::v-deep .modal-backdrop {
  opacity: 0.5;
}
</style>
