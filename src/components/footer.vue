<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleSwitcher() {
      this.isVisible = !this.isVisible;
    },

    /**
     * Onclick color change
     * @param theme theme color
     */
    setTheme(theme) {
      document
        .getElementById("color-opt")
        .setAttribute("href", "./css/colors/" + theme + ".css");
    },
  },
};
</script>


<template>
  <div>
    <!--START FOOTER-->
    <footer class="">
      <div class="container">
        <h4 style="height: 3px; background-color: #2B6A5D; width: 100%"></h4>
        <div class="row">
          <div class="col-lg-4 margin-t-20">
            <div class="text-color margin-t-20">
              <h4>ЎЗБЕКИСТОН РЕСПУБЛИКАСИ
                РАҚОБАТНИ РИВОЖЛАНТИРИШ
                ВА ИСТЕЪМОЛЧИЛАР ХУҚУҚЛАРИНИ
                ҲИМОЯ ҚИЛИШ ҚЎМИТАСИ</h4>
            </div>
            <h5 class="text-color">Ўзбекистон Республикаси, Тошкент шахри,
              Лабзак кўчаси, 3А, 1234567</h5>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="text-color margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4">CALL-марказ</span>
                  <p>(71) 123-45-67</p>
                </li>
                <li>
                  <span class="h4">Девонхона</span>
                  <p>(71) 123-45-67</p>
                </li>
                <li>
                  <span class="h4">Ишонч рақами</span>
                  <p>(71) 123-45-67</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="text-color margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4">TELTGRAM орқали мурожаат</span>
                  <p>@rqbot</p>
                </li>
                <li>
                  <span class="h4">Ижтимоий тармоқлар</span>
                  <ul class="list-inline social margin-t-20">
                    <li class="list-inline-item">
                      <a href class="social-icon">
                        <i class="mdi mdi-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href class="social-icon">
                        <i class="mdi mdi-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href class="social-icon">
                        <i class="mdi mdi-linkedin"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href class="social-icon">
                        <i class="mdi mdi-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
    <!--END FOOTER-->

    <!--START FOOTER ALTER-->
    <div class="mt-4">
      <div class="container">
        <h4 style="height: 3px; background-color: #2B6A5D; width: 100%"></h4>
              <p class="copy-rights text-color text-center"> © {{ new Date().getFullYear()}} РАҚАМЛИ ТРАНСФОРМАЦИЯ ВА АУТСОРСИНГ МАРКАЗИ
                БАРЧА ХУҚУҚЛАР ҲИМОЯЛАНГАН</p>
            </div>
            <div class="clearfix"></div>
      </div>
    </div>
    <!--START FOOTER ALTER-->
    <!-- Style switcher -->
    <!-- end Style switcher -->
</template>
