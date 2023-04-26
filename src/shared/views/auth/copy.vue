<template>
  <div v-if="!load">
    <main class="site-wrapper">
      <div class="pt-table desktop-768">
        <div class="pt-tablecell page-home relative" style="
    background-position: center;
    background-size: cover;">
          <div class="overlay"></div>

          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div class="page-title  home text-center">
                                  <span class="heading-page"> Fair Tech yagona axborat tizimiga hush kelibsiz
                                  </span>
                  <p class="mt20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>

                <div class="hexagon-menu clear">
                  <div class="hexagon-item"   @click="$router.push(`/login`)">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-universal-access"></i>
                                                </span>
                                                <span class="title">Fair Tech</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-bullseye"></i>
                                                </span>
                                                <span class="title">Fair Price</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-braille"></i>
                                                </span>
                                                <span class="title">Product Info</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-id-badge"></i>
                                                </span>
                                                <span class="title">Pharm Info</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-life-ring"></i>
                                                </span>
                                                <span class="title">Other Project1</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-clipboard"></i>
                                                </span>
                                                <span class="title">Other Project2</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="hexagon-item">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-map-signs"></i>
                                                </span>
                                                <span class="title">Other Project3</span>
                                            </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                            fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      load: true
    }
  },
  created() {
    setTimeout(() => {
      this.load = false
    }, 3000)
  }
}
</script>



