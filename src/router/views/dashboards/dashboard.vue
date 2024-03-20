<script>
import Navbar from "@/components/navbar";
import Services from "@/components/service.vue";
// import Features from "@/components/features";
import Pricing from "@/components/pricing.vue";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import VanillaTilt from 'vanilla-tilt-vue'

/**
 * index-9 component
 */
export default {
  name: "index-9",
  components: {
    VanillaTilt,
    Navbar,
    Services,
    // Features,
    Pricing,
    Contact,
    Footer,
  },
};
</script>

<template>
  <div>
    <Navbar/>
    <div>
      <!--START HOME-->
      <section class="section bg-home height-100vh green-gradient-bg" id="home">
        <!--        <div class="bg-overlay"></div>-->
        <div>
          <div>
            <div class="container slidero">
              <b-row cols="12" class="d-flex align-items-center">
                <b-col cols="12" sm="7">
                  <div>
                  <span class="text-white font-weight-bold" style="font-size: 30px">
                    {{ $t('main_page.title') }}
                  </span>
                  </div>

                  <div class="my-3 text-white" style="font-size: 20px">
                  <span>
                    {{ $t('main_page.subtitle') }}
                  </span>
                  </div>

                  <div>
                    <b-button v-scroll-to="'#services'" href="javascript: void(0);" variant="outline-light" class="mt-3 text-white font-size-20">{{ $t('main_page.service_button') }}</b-button>
                  </div>
                </b-col>

                <b-col class="d-flex justify-content-center main-logo">
                  <div>
                    <VanillaTilt parallax>
                      <img width="500" src="@/assets/image/big-logo.svg" alt="logo" class="img-fluid"
                           style="border-radius: 50%; box-shadow: rgb(36, 98, 86) 1px 1px 7px 3px;">
                    </VanillaTilt>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
        <!-- Particles -->
        <vue-particles class="position-relative" color="#FFF"></vue-particles>
      </section>

      <!--END HOME-->
      <Services/>
      <!--      <Features/>-->
      <Pricing/>

      <Contact/>
      <Footer/>
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
@media only screen and (max-width: 767px) {
  .main-logo{
    display: none!important;
  }
}
</style>
