<template>
  <!--START HOME-->
  <section
    class="section section-lg height-100vh scroll-select"
    id="home"
    style="background-image: url('images/img-1.jpg'); background-size: cover; background-position: center;"
  >
    <div class="bg-overlay"></div>
    <div class="display-table">
      <div class="display-table-cell">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-white text-center">
              <transition
                appear
                :name="rotate[rotateindex].name"
                :enter-active-class="rotate[rotateindex].enter"
                :leave-active-class="rotate[rotateindex].out"
                mode="out-in"
              >
                <h1 class="home-title text-rotate" :key="rotateindex">{{ rotate[rotateindex].text }}</h1>
              </transition>
              <p
                class="padding-t-15 home-desc"
              >Etiam sed.Interdum consequat proin vestibulum class at a euismod mus luctus quam.Lorem ipsum dolor sit amet, consectetur adipisicing eli.</p>

              <p class="play-shadow margin-t-30 margin-l-r-auto">
                <a href="http://vimeo.com/99025203" class="play-btn video-play-icon">
                  <i class="mdi mdi-play text-center"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--END HOME-->
</template>

<script>
export default {
  data() {
    return {
      rotateindex: 0,
      rotate: [
        {
          item: 0,
          text: "Professional Landing Page Template",
          name: "zoom",
          enter: "zoomIn",
          out: "zoomOut",
          color: "",
          duration: 4000
        },
        {
          item: 1,
          text: "We help startups launch their products",
          name: "zoom",
          enter: "zoomIn",
          out: "zoomOut",
          color: "",
          duration: 4000
        },
        {
          item: 2,
          text: "Perfect solution for small businesses",
          name: "zoom",
          enter: "zoomIn",
          out: "zoomOut",
          color: "",
          duration: 3500
        }
      ]
    };
  },
  name: "HeroSection7",
  props: {},
  mounted() {
    setInterval(() => {
      this.textRotate();
    }, this.rotate[this.rotateindex].duration);
  },

  methods: {
    textRotate() {
      setTimeout(() => {
        this.rotateindex += 1;
        if (this.rotateindex >= this.rotate.length) {
          this.rotateindex = 0;
        }
      }, 0);
    }
  }
};
</script>
