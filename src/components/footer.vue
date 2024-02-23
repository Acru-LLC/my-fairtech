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
            <div class="margin-t-20">
              <h4 class="text-color">ЎЗБЕКИСТОН РЕСПУБЛИКАСИ
                РАҚОБАТНИ РИВОЖЛАНТИРИШ
                ВА ИСТЕЪМОЛЧИЛАР ХУҚУҚЛАРИНИ
                ҲИМОЯ ҚИЛИШ ҚЎМИТАСИ</h4>
            </div>
            <h5 class="text-color">Ўзбекистон Республикаси, Тошкент шахри,
              Лабзак кўчаси, 3А</h5>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="text-color margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4 text-color">CALL-марказ</span>
                  <p class="text-color">1159</p>
                </li>
                <li>
                  <span class="h4 text-color">Девонхона</span>
                  <p class="text-color">(71) 207-48-00</p>
                </li>
                <li>
                  <span class="h4 text-color">Ишонч рақами</span>
                  <p class="text-color">(71) 207-47-00</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4 text-color">TELEGRAM орқали мурожаат</span>
                  <a href="https://t.me/RaqobatGovUz" target="_blank">@RaqobatGovUz</a>
                </li>
                <li>
                  <span class="h4 text-color">Ижтимоий тармоқлар</span>
                  <ul class="list-inline social margin-t-20 d-flex justify-content-between">
                    <li class="list-inline-item">
                      <a href="https://www.facebook.com/RaqobatGovUz"
                         target="_blank">
                        <i style="font-size: 40px;" class="mdi mdi-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://www.instagram.com/raqobat_gov_uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                         target="_blank">
                        <i style="font-size: 40px;" class="mdi mdi-instagram"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://twitter.com/RaqobatGovUz"
                         target="_blank">
                        <i style="font-size: 40px;" class="mdi mdi-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://www.youtube.com/channel/UCck1Cy6qLxZ7tiXEdm5vuWQ"
                         target="_blank">
                        <i style="font-size: 40px;" class="mdi mdi-youtube"></i>
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
