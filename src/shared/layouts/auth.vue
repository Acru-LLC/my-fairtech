<script>
import apiService from "@/shared/services/api.service";

export default {
  components: {},
};
</script>

<template>
  <div>
    <!-- LOADER -->
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
    <div class="container-fluid p-0" style="position: absolute">
      <div class="row g-0">
        <div class="col-xl-5">
          <img
              src="@/assets/images/loginBack.png"
              class="auth-logo-dark"
              style="position: fixed; width: 100%; height: 100%; bottom: 0;"
          />
          <div class="auth-full-bg">
            <div class="w-100 pt-lg-5 p-4 auth-gerb-bg">
              <div class="d-flex h-100 flex-column">
                <div class="p-4">
                  <div class="row justify-content-center">
                    <div class="col-lg-12">
                      <div class="text-center mt-5">
                        <img
                            src="@/assets/images/acru-logo-with-name.svg"
                            height="200"
                            style="position: relative; left: 30%"
                        />
                      </div>
                      <!-- <h2 class="auth-title pt-4">
                          Ўзбекистон Республикаси Монополияга қарши курашиш қўмитаси
                      </h2> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->

        <div class="col-xl-7">
          <div class="auth-full-page-content justify-content-center p-md-5 p-4">
            <div class="w-100">
              <div class="d-flex flex-column h-100">
                <div class="my-auto">
                  <div class="auth-login-title">
                    <h4 class="mb-0">FAIR TECH</h4>
                    <h4>ягона ахборот тизими</h4>
                  </div>
                  <!-- DEFAULT SLOT FOR AUTH_PAGES CONTENTS -->
                  <slot/>
                </div>
                <div class="mt-4 mt-md-5 text-center">
                  <p class="mb-0">
                    © {{ new Date().getFullYear() }} ACRU. Developed by <a href="https://dataprizma.uz">Dataprizma
                    LLC</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap");

.auth-login-title {
  text-align: center;

  h4:first-child {
    color: #317abe;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1;
  }

  h4:nth-child(2) {
    color: #479850;
  }

  h4 {
    //font-family: "Montserrat", sans-serif !important;
    font-family: "Montserrat", serif !important;
  }
}
</style>