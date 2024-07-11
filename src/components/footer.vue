<script>
export default {
  data() {
    return {
      isVisible: false,
      showModal: false,
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
              <h4 class="text-color">{{ $t('navbar.main_title') }}</h4>
            </div>
            <h5 class="text-color">{{ $t('contact.address') }}</h5>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="text-color margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4 text-color">{{ $t('contact.call_center') }}</span>
                  <p class="text-color">1159</p>
                </li>
                <li>
                  <span class="h4 text-color">{{ $t('contact.devonxona') }}</span>
                  <p class="text-color">(71) 207-48-00</p>
                </li>
                <li>
                  <span class="h4 text-color">{{ $t('contact.call_number') }}</span>
                  <p class="text-color">(71) 207-47-00</p>
                </li>
                <li>
                  <span class="h4 text-color">
                    <router-link to="/privacy-policy">{{ $t('contact.policy') }}</router-link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 margin-t-20">
            <div class="margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <span class="h4 text-color d-block">{{ $t('contact.telegram') }}</span>
                  <a href="https://t.me/RaqobatGovUz" target="_blank">@RaqobatGovUz</a>
                </li>
                <li>
                  <span class="h4 text-color">{{ $t('contact.socials') }}</span>
                  <ul class="list-inline social margin-t-20 d-flex justify-content-between">
                    <li class="list-inline-item">
                      <a href="https://www.facebook.com/RaqobatGovUz"
                         target="_blank">
                        <i style="font-size: 40px; color: #4267B2;" class="mdi mdi-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://www.instagram.com/raqobat_gov_uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                         target="_blank">
                        <i style="font-size: 40px; color: #E1306C" class="mdi mdi-instagram"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://twitter.com/RaqobatGovUz"
                         target="_blank">
                        <i style="font-size: 40px; color: #1DA1F2" class="mdi mdi-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://www.youtube.com/channel/UCck1Cy6qLxZ7tiXEdm5vuWQ"
                         target="_blank">
                        <i style="font-size: 40px; color: #FF0000" class="mdi mdi-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <b-row style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 5px;" class="d-flex align-items-center p-3">
              <b-col cols="9">
                <h5 class="text-color font-weight-bold">{{ $t('contact.app_title') }}</h5>
              </b-col>
              <b-col cols="3">
                <b-button
                    class="btn btn-warning"
                    style="background-color: rgb(243, 145, 56)"
                    @click="showModal = !showModal"
                > {{ $t('contact.download') }}</b-button>
<!--                <a target="_blank" href='https://play.google.com/store/apps/details?id=com.raqobat.fairtech_mobile&pcampaignid=web_share&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="200" height="50" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>-->
              </b-col>
            </b-row>
          </div>

          <b-modal v-model="showModal" hide-footer :title="$t('contact.app_title')">
            <b-row class="d-flex align-items-center">
              <b-col>
                <a
                    target="_blank"
                    class="btn btn-warning"
                    style="background-color: rgb(243, 145, 56); width: 128px"
                    href="https://drive.google.com/file/d/1A3xHb7Od2VRkqtY7QAQzqtpcjewZ8Amn/view?usp=sharing"
                > FAIRTECH V_1.2802</a>
              </b-col>
              <b-col>
                <a target="_blank" href='https://play.google.com/store/apps/details?id=com.raqobat.fairtech_mobile&pcampaignid=web_share&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="128"  alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
              </b-col>
              <b-col>
                <a class="disabled-link" target="_blank" title="FAIRTECH" href="https://testflight.apple.com/join/F59RPltZ"><img width="128" alt="Download on the App Store Badge" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/128px-Download_on_the_App_Store_Badge.svg.png"></a>
              </b-col>
            </b-row>
          </b-modal>

        </div>
      </div>
    </footer>
    <!--END FOOTER-->

    <!--START FOOTER ALTER-->
    <div class="mt-4">
      <div class="container">
        <h4 style="height: 3px; background-color: #2B6A5D; width: 100%"></h4>
        <p class="copy-rights text-color text-center"> © {{ new Date().getFullYear()}} {{ $t('contact.required_footer') }}</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
  <!--START FOOTER ALTER-->
  <!-- Style switcher -->
  <!-- end Style switcher -->
</template>
<style>
.disabled-link {
  pointer-events: none;
  /* Optionally, you can also style the link to make it visually appear disabled */
  opacity: 0.5; /* Example: Reducing opacity */
  cursor: not-allowed; /* Example: Changing cursor to indicate not clickable */
}
</style>
