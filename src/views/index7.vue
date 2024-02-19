<script>
import Navbar from "@/components/navbar";
import Services from "@/components/servicesCopy1.vue";
import Features from "@/components/features";
import Pricing from "@/components/pricingCopy1.vue";
import Team from "@/components/team";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

/**
 * index-7 component
 */
export default {
  name: "index-7",
  components: {
    Navbar,
    Services,
    Features,
    Pricing,
    Team,
    Blog,
    Contact,
    Footer,
  },
  data() {
    return {
      rotateindex: 0,
      rotate: [
        {
          item: 0,
          text: "Professional Landing Page Template",
          name: "zoom",
          duration: 4000,
        },
        {
          item: 1,
          text: "We help startups launch their products",
          name: "zoom",
          duration: 4000,
        },
        {
          item: 2,
          text: "Perfect solution for small businesses",
          name: "zoom",
          duration: 3500,
        },
      ],
    };
  },
  mounted() {
    setInterval(() => {
      this.textRotate();
    }, this.rotate[this.rotateindex].duration);
  },

  methods: {
    /**
     * Text show one after another
     */
    textRotate() {
      setTimeout(() => {
        this.rotateindex += 1;
        if (this.rotateindex >= this.rotate.length) {
          this.rotateindex = 0;
        }
      }, 0);
    },
  },
};
</script>

<template>
  <div>
    <Navbar />
    <div v-scroll-spy>
      <!--START HOME-->
      <section
        class="section section-lg height-100vh"
        id="home"
        :style="{'background-image': 'url(' + require('@/assets/images/img-1.jpg') + ')' , 'background-size': 'cover', 'background-position': 'center'}"
      >
        <div class="bg-overlay"></div>
        <div class="display-table">
          <div class="display-table-cell">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 offset-lg-2 text-white text-center">
                  <transition appear :name="rotate[rotateindex].name" mode="out-in">
                    <h1
                      class="home-title text-rotate"
                      :key="rotateindex"
                    >{{ rotate[rotateindex].text }}</h1>
                  </transition>
                  <p
                    class="padding-t-15 home-desc"
                  >Etiam sed.Interdum consequat proin vestibulum class at a euismod mus luctus quam.Lorem ipsum dolor sit amet, consectetur adipisicing eli.</p>
                  <p class="play-shadow margin-t-30 margin-l-r-auto">
                    <a v-b-modal.modal class="play-btn video-play-icon">
                      <i class="mdi mdi-play text-center"></i>
                    </a>
                    <b-modal id="modal" hide-footer size="lg" centered header-close-variant="white">
                      <youtube video-id="RnDC9MXSqCY" ref="youtube" width="750" height="450"></youtube>
                    </b-modal>
                  </p>
                </div>
              </div>
            </div>
          </div>
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
