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
 * index-8 component
 */
export default {
  name: "index-8",
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
};
</script>

<template>
  <div>
    <Navbar />
    <div v-scroll-spy>
      <!--START HOME-->
      <section
        class="section section-lg home-half"
        id="home"
        :style="{'background-image': 'url(' + require('@/assets/images/img-2.jpg') + ')' , 'background-size': 'cover', 'background-position': 'center'}"
      >
        <div class="bg-overlay"></div>
        <div class="display-table">
          <div class="home-cell-bottom">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 offset-lg-2 text-white text-center">
                  <h1 class="home-title">We help startups launch their products</h1>
                  <p
                    class="padding-t-15 home-desc"
                  >Etiam sed.Interdum consequat proin vestibulum class at a euismod mus luctus quam.Lorem ipsum dolor sit amet, consectetur adipisicing eli.</p>
                  <div class="margin-t-30">
                    <iframe
                      src="http://player.vimeo.com/video/69988283?color=f15b72&amp;title=0&amp;byline=0&amp;portrait=0"
                      width="555"
                      height="321"
                      class="frame-border"
                    ></iframe>
                  </div>
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
