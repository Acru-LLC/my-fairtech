<template>
  <div>
    <b-overlay :show="loading" class="loader d-lg-block d-none">
      <div class="wrap-login100">
        <div class="body-content">
          <div class="login100-more">
            <!--                <div class="language-select">-->
            <!--                    <select name="languages" id="languages">-->
            <!--                        <option value="Uz">UZ</option>-->
            <!--                        <option value="En">EN</option>-->
            <!--                        <option value="Ru">RU</option>-->
            <!--                    </select>-->
            <!--                </div>-->
            <b-dropdown variant="white" right toggle-class="header-item" class="language-bar d-flex">
              <template v-slot:button-content>
                {{ text }}
<!--                <span class="flag-icon flag-icon-uz" id="selectSpan"-->
<!--                      style="width: 21px; height: 21px; border-radius: 50%; background-size: cover"></span>-->
                <!-- Uzbek flag icon -->
              </template>
              <b-dropdown-item
                  v-for="(entry, i) in languages"
                  :key="i"
                  :value="entry"
                  :class="{ active: currentLocale.language === entry.language }"
                  @click="changeLocale(entry.language)"
                  class="notify-item"
              >
                <!--                <img :src="entry.flag" alt="Flag" class="language-img">-->
                <span class="align-middle">{{ entry.title }}</span>
              </b-dropdown-item>
            </b-dropdown>
            <VanillaTilt parallax>
              <div class="logo">
              </div>
            </VanillaTilt>
          </div>
          <div class="box position-relative d-flex flex-column justify-content-center">

            <div class="m-auto">
              <b-row class="main-txt">FAIR TECH</b-row>
              <b-row class="welcome-text">{{ $t('system.oneId.welcome_text') }}</b-row>
              <b-row class="bg-white p-3 oneID d-flex align-items-center mb-5">
                <img src="../auth/images/loginImages/oneID.svg" alt="">
                <b-card-text style="color: #2C675B; font-size: 25px" class="ml-4">{{ $t('system.oneId.login_with') }}</b-card-text>
              </b-row>
              <b-row>
                <div class="container-login100-form-btn">
                  <a href='https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=fair_tech&redirect_uri=https://cabinet.fairtech.uz/login&scope=fair_tech&state=eyJtZXRob2QiOiJJRFBXIn0=selfOne Id,left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0' class="login100-form-btn btn">
                    {{ $t('system.login') }}
                  </a>
                </div>
              </b-row>
              <b-card-text>
                <span class="info-text d-flex flex-column justify-content-center font-size-20 text-white position-absolute">{{ $t('system.oneId.text_info') }}</span>
              </b-card-text>
            </div>

            <div class="text-footer">
              <p class="title-footer">{{ $t('system.tex_support') }}</p>
              <img src="../auth/images/loginImages/phone.svg" alt="">
              <p class="svg-footer1 ml-2">+ 99871 1234567</p>

              <div class="text-footer2">
                <img src="../auth/images/loginImages/message.svg" alt="">
                <a href="#" class="svg-footer2 ml-2">@rqbot</a>
                <div class="text-footer-right">
                  <img src="../auth/images/loginImages/tutorial.svg" alt="">

                  <a v-if="checkLocale" href="https://fairtech.uz/cabinet.fairtech.uz/instruction/%D0%A2%D0%B0%D1%88%D2%9B%D0%B8_%D1%84%D0%BE%D0%B9%D0%B4%D0%B0%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D1%87%D0%B8%D0%BB%D0%B0%D1%80_%D1%83%D1%87%D1%83%D0%BD_%D2%9B%D1%9E%D0%BB%D0%BB%D0%B0%D0%BD%D0%BC%D0%B0_%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB_hyfymufngipfzilhhindggcnttslftylmdpqatruwdfhoxidwxkpmiftcqwwmrtwhdxbtawintdikmpxkspvurzdvyjgjeztnawn1698044334964.pdf" target="_blank"><span class="svg-footer3 cursor-pointer"> {{ $t('system.tutorial') }}</span></a>
                  <a v-else href="https://fairtech.uz/cabinet.fairtech.uz/instruction/%D0%A2%D0%B0%D1%88%D2%9B%D0%B8_%D1%84%D0%BE%D0%B9%D0%B4%D0%B0%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D1%87%D0%B8%D0%BB%D0%B0%D1%80_%D1%83%D1%87%D1%83%D0%BD_%D2%9B%D1%9E%D0%BB%D0%BB%D0%B0%D0%BD%D0%BC%D0%B0_%D0%9B%D0%BE%D1%82%D0%B8%D0%BD_hvginiatpzbhvzxfvdgzihioarvqwkacrsrcmuxoyrmhubsytekuweilrtdcnwtytkkhmjdrekxdpsvffvnstzitwwsjykltcmwn1698044432180.pdf" target="_blank"><span class="svg-footer3 cursor-pointer"> {{ $t('system.tutorial') }}</span></a>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="footer-info">
          <div class="txt-left-footer">
            {{ $t('system.footer_left_text') }}
          </div>
          <div class="txt-right-footer">
            {{ $t('system.footer_right_text') }}
          </div>
        </div>
      </div>
    </b-overlay>

    <b-container class="mobile-version d-lg-none d-block px-3">
      <b-row>
        <b-col cols="12">
          <div>
            <b-dropdown variant="white" style="color: white" right toggle-class="header-item" class="language-bar-res d-flex">
              <template v-slot:button-content>
                {{ text }}
                <!--                <span class="flag-icon flag-icon-uz" id="selectSpan"-->
                <!--                      style="width: 21px; height: 21px; border-radius: 50%; background-size: cover"></span>-->
                <!-- Uzbek flag icon -->
              </template>
              <b-dropdown-item
                  v-for="(entry, i) in languages"
                  :key="i"
                  :value="entry"
                  :class="{ active: currentLocale.language === entry.language }"
                  @click="changeLocale(entry.language)"
                  class="notify-item"
              >
                <!--                <img :src="entry.flag" alt="Flag" class="language-img">-->
                <span class="align-middle">{{ entry.title }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="12">
          <div style="margin-top: 145px;">
            <b-row class="main-txt-responsive mb-1">FAIR TECH</b-row>
            <b-row class="welcome-text-responsive mb-5">{{ $t('system.oneId.welcome_text') }}</b-row>
            <b-row class="bg-white p-3 oneID-res d-flex align-items-center mb-4">
              <img width="80" src="../auth/images/loginImages/oneID.svg" alt="">
              <b-card-text style="color: #2C675B; font-size: 15px" class="ml-4">{{ $t('system.oneId.login_with') }}</b-card-text>
            </b-row>
            <b-row>
              <div class="container-login100-form-btn-res">
                <a href='https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=fair_tech&redirect_uri=https://cabinet.fairtech.uz/login&scope=fair_tech&state=eyJtZXRob2QiOiJJRFBXIn0=selfOne Id,left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0' class="login100-form-btn-res btn">
                  {{ $t('system.login') }}
                </a>
              </div>
            </b-row>
            <b-card-text>
              <span class="info-text-responsive d-flex flex-column justify-content-center font-size-12 text-white my-5 pt-4">{{ $t('system.oneId.text_info') }}</span>
            </b-card-text>


            <div class="text-footer-responsive mt-5">
              <p style="color:white;">{{ $t('system.tex_support') }}</p>
              <div class="d-flex align-items-center">
                <img src="../auth/images/loginImages/phone.svg" alt="">
                <p class="ml-2" style="color: #FFFFFF">+ 99871 1234567</p>
              </div>


              <div>
                <div class="d-flex align-items-center my-2">
                <img src="../auth/images/loginImages/message.svg" alt="">
                <a href="#" class="svg-footer2 ml-2">@rqbot</a>
                </div>
                <div>
                  <img src="../auth/images/loginImages/tutorial.svg" alt="">
                  <a v-if="checkLocale" href="https://fairtech.uz/cabinet.fairtech.uz/instruction/%D0%A2%D0%B0%D1%88%D2%9B%D0%B8_%D1%84%D0%BE%D0%B9%D0%B4%D0%B0%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D1%87%D0%B8%D0%BB%D0%B0%D1%80_%D1%83%D1%87%D1%83%D0%BD_%D2%9B%D1%9E%D0%BB%D0%BB%D0%B0%D0%BD%D0%BC%D0%B0_%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB_hyfymufngipfzilhhindggcnttslftylmdpqatruwdfhoxidwxkpmiftcqwwmrtwhdxbtawintdikmpxkspvurzdvyjgjeztnawn1698044334964.pdf" target="_blank"><span class="svg-footer3 cursor-pointer"> {{ $t('system.tutorial') }}</span></a>
                  <a v-else href="https://fairtech.uz/cabinet.fairtech.uz/instruction/%D0%A2%D0%B0%D1%88%D2%9B%D0%B8_%D1%84%D0%BE%D0%B9%D0%B4%D0%B0%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D1%87%D0%B8%D0%BB%D0%B0%D1%80_%D1%83%D1%87%D1%83%D0%BD_%D2%9B%D1%9E%D0%BB%D0%BB%D0%B0%D0%BD%D0%BC%D0%B0_%D0%9B%D0%BE%D1%82%D0%B8%D0%BD_hvginiatpzbhvzxfvdgzihioarvqwkacrsrcmuxoyrmhubsytekuweilrtdcnwtytkkhmjdrekxdpsvffvnstzitwwsjykltcmwn1698044432180.pdf" target="_blank"><span class="svg-footer3 cursor-pointer"> {{ $t('system.tutorial') }}</span></a>
                </div>
              </div>

            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {AuthService} from "@/shared/services/auth.service";
import ApiService from "@/shared/services/api.service";
import {TokenService} from "@/shared/services/storage.service";
import store from "@/state/store"
import VanillaTilt from "vanilla-tilt-vue";
import {mapMutations} from "vuex";
import i18n from "@/i18n";
export default {
  components: {VanillaTilt},
  data() {
    return {
      loading: false,
      popup: false,
      languages: [
        {
          flag: require("../auth/images/mainPageImages/flags/uzbekistan.png"),
          language: "uz",
          title: "O'Z",
        },
        {
          flag: require("../auth/images/mainPageImages/flags/uzbekistan.png"),
          language: "uzCyrillic",
          title: "ЎЗ",

        },
        {
          flag: require("../auth/images/mainPageImages/flags/russia.png"),
          language: "ru",
          title: "РУ",
        },
        // {
        //   flag: require("../auth/images/mainPageImages/flags/united-states-of-america.png"),
        //   language: "en",
        //   title: "En",
        // }
      ],
      lan: this.$i18n.locale,
      text: null,
      flag: null,
      currentLocale: {},
    };
  },
  computed:{
  checkLocale(){
    return (localStorage.getItem('locale') == 'uzCyrillic') ? true : false;
  },
  },
  methods: {
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    async changeLocale(localeCode) {
      if (this.$i18n.locale !== localeCode) {
        window.location.reload();
        await this.setLocale(localeCode);
        this.currentLocale = this.languages.find(locale => locale.language === localeCode)
      }
    },

    redirectToOneId(){
      // this.popup = window.open(
      //     "https://sso.egov.uz/sso/oauth/Authorization.do" +
      //     "?response_type=" + "one_code" +
      //     "&client_id=" + "fair_tech" +
      //     "&redirect_uri=" + "https://fairtech.uz/one-id/login" +
      //     "&scope=" + "fair_tech" +
      //     "&state=" + "eyJtZXRob2QiOiJJRFBXIn0=",
      //     "_self",
      //     "One Id",
      //     "left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0"
      // );
    },
    async getMount() {
      // this.loading = true;
      let { state, code } = this.$route.query;
      if (!state || !code  ) {
        this.redirectToOneId()
      } else {
        try {
          let res = await AuthService.loginRequestToOneId({code, state});
          if (res?.data) {
            TokenService.saveToken(res?.data?.token);
            store.dispatch('auth/loginOneId', res.data);
            ApiService.setHeader();
            await this.$router.push("/");
            return true
          }
        } catch (e) {
          console.error(e);
          TokenService.removeToken();
          await this.$router.push({path: "/"});
        } finally {
          this.loading = false;
        }
      }
    },
  },
  mounted() {
    this.getMount();
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
};
</script>
<style scoped>
.loader {
  height: 100vh;
  width: 100vw;
}
@font-face {
  font-family: "NoirPro-Regular";
  src: url("fonts/NoirPro-Regular.ttf") format("truetype");
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100vw !important;
  /*height: 100vw;  */
  font-family: Poppins-Regular, sans-serif;
  /*padding: 0;*/
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

/*---------------------------------------------*/
a {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #6675df;
}

/*---------------------------------------------*/
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

p {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0;
}

ul, li {
  margin: 0;
  list-style-type: none;
}

.mobile-version{
  height: 100vh;
  background-image: url("images/loginImages/bgr_40.png");
}


.language-bar {
//background-color: #E1E8E7;
//border-radius: 50%;
//width: 33px;
//height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  top: 50px;
  left: 50px;
  position: absolute;
  border: 2px solid #2C665A;
  border-radius: 6px;
  width: 68px;
  height: 40px;
}
.language-bar-res {
//background-color: #E1E8E7;
//border-radius: 50%;
//width: 33px;
//height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  top: 50px;
  left: 0px;
  position: absolute;
  border: 2px solid #fff;
  border-radius: 6px;
  width: 68px;
  height: 40px;
}

.language-img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

label {
  display: block;
  margin: 0;
}

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}


/*==================================================================
[ Text ]*/

.body-content {
  width: 100%;
  display: flex;
}

.flex-sb-m {
  /*margin-top: -50px;*/
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.txt1 {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  text-decoration: none;
  /*position: absolute;*/
  /*top: 300px;*/
  /*right: 76px;*/
}

.txt3 {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  display: flex;
  text-align: center;
}

.txt2 {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: #999999;
}

.title-footer {
  display: flex;
  width: 200px;
  height: 19px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
}

.svg-footer1 {
  display: inline-block;
  width: 115px;
  height: 19px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
}

.svg-footer2 {
  display: block;
  width: 58px;
  height: 19px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
  text-decoration: none;
}

.svg-footer3 {
//display: inline-block;
//width: 71px;
//height: 19px;
  flex-direction: column;
  justify-content: center;
  color: #FFFFFF !important;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  margin-left: 7px;
  text-decoration: none;
}

.footer-info {
  width: 100%;
  height: 50px;
  background: #FFF;
  box-shadow: 0 4px 4px 0 rgba(44, 102, 90, 0.30) inset;
  justify-content: space-between;
  display: flex;
  padding: 1.2rem;
}

.txt-left-footer {
  color: #2C665A;
//font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
}

.txt-right-footer {
  color: #2C665A;
//font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
  margin-right: 53px;
}

/*==================================================================
[ Size ]*/
.size1 {
  width: 355px;
  max-width: 100%;
}

.size2 {
  width: calc(100% - 43px);
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/
.limiter {
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  /*display: flex;*/
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}


.wrap-login100 {
  width: 100vw;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*align-items: stretch;*/
  /*flex-direction: row-reverse;*/
  background-image: url("images/loginImages/bgr_40.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

}

.text-footer {
  position: absolute;
  display: inline-block;
  margin: 0 auto;
  bottom: 5%;
  left: 20%;
}
.text-footer-responsive{
  width: 100%;
}

.text-footer2 {
  font-family: "NoirPro-Regular", sans-serif;
  display: flex;
}

.text-footer-right {
  font-family: "NoirPro-Regular", sans-serif;
  align-items: center;
  display: flex;
  margin-left: 500px;
}

.svg-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 7px;
}


.box {
  width: 50%;
//display: flex;
//flex-direction: column;
//justify-content: space-around;
}

/*==================================================================
[ login more ]*/
.login100-more {
  width: 50%;
  height: calc(100vh - 50px);
  background-size: cover;
  background-position: center;
  background-color: #E3F2EF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}

.logo {
  width: 700px;
  height: 700px;
  background-image: url("images/loginImages/logo.png");
  background-size: cover;
}

.language-select select {
  /*margin-bottom: 10px;*/
  /*padding: 5px;*/
  border: 2px solid #2C665A;
  border-radius: 6px;
  width: 68px;
  height: 40px;
  top: 50px;
  left: 50px;
  position: absolute;
  line-height: 14px;
  color: #2C665A;
  font-size: 24px;
  background-color: #E3F2EF;
}

/*==================================================================
[ Form ]*/

.login100-form {
  /*width: 600px;*/
  /*//min-height: 700px;*/
  display: block;
  /*background-color: #f7f7f7;*/
  padding: 173px 55px 55px 55px;
}

.layout {
  width: 50%;
  height: 50%;
  border-radius: 20px;
  border: 4px solid #FFF;
  background: rgba(13, 40, 35, 0.65);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
//margin-top: 7%;
  margin-bottom: 3%;
  /*top: 10px;*/
  /*right: 150px;*/
  /*position: relative;*/
}

.layout2 {
  width: 50%;
  border-radius: 20px;
  border: 4px solid #FFF;
  background: rgba(13, 40, 35, 0.65);
  /*position: absolute;*/
  /*top: 436px;*/
  /*left: -132px;*/
  padding: 1rem;
  margin: 0 auto;
}

.login100-form-title {
  /*width: 700px;*/
  /*height: 69px;*/
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 60px;
  color: #ffffff;
//line-height: 1;
  font-weight: bold;
  text-align: center;
  /*position: absolute;*/
  /*top: 50px;*/
  /*right: -117px;*/
}

.yagonaAT {
  font-size: 24px;
  color: #ffffff;
  line-height: 14px;
  text-align: center;
  margin-bottom: 20px;
  /*position: absolute;*/
  /*top: 100px;*/
  /*left: 72px;*/
}


/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 80%;
  height: 50px;
  position: relative;
  margin: 0 auto;
  border: 2px solid #FFFFFF;
  border-radius: 6px;
  margin-bottom: 24px;
  /*left: 4%;*/
  /*top: -20px;*/
}

.label-input100 {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 20px;
  color: #ffffff;
  line-height: 9px;

  display: block;
  position: absolute;
  pointer-events: none;
  width: 91px;
  height: 26px;
  padding-left: 115px;
  top: 17px;
  left: 10px;
  transition: all 0.2s ease;

  /*transition: all 0.4s;*/
}

/*.label-input100:disabled{*/
/*    overflow: hidden;*/
/*    display: none;*/
/*}*/

.input100 {
  display: block;
  width: 100%;
  background: transparent;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 18px;
  line-height: 1.2;
  padding: 0 8% 0 8%;
  color: #FFFFFF;
  transition: all 0.4s;
}
.input100:hover{
  box-shadow: 0 0 11px 12px #808588a6;
}

#input {
  position: relative;
}

.show-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust the distance from the right edge of the input */
  transform: translateY(-50%);
  cursor: pointer;
//background-image: url("images/loginImages/eye-solid.png");
}

.show-icon {
  font-size: 20px;
  color: #FFFFFF;
}

.icon1 {
  width: 10.87px;
  height: 15.12px;
  position: absolute;
  left: 10px;
}

.icon2 {
  width: 11.88px;
  height: 15.12px;
  position: absolute;
  left: 10px;
}

input.input100 {
  height: 100%;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

.eff-focus-selection {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

.input100:focus {
  height: 48px;
}

.input100:focus + .focus-input100 + .label-input100 {
  /*top: 14px;*/
  /*font-size: 13px;*/
  /*display: none;*/

  opacity: 0;
  visibility: hidden;
}

.input100:focus + .label-input100,
.input100:not(:placeholder-shown) + .label-input100 {
  opacity: 0;
  visibility: hidden;
}

.input100::placeholder {
  opacity: 1;
  text-align: center;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 20px;
  color: #ffffff;
  line-height: 9px;

  display: block;
  /*position: absolute;*/
  pointer-events: none;
  /*width: 91px;*/
  /*height: 26px;*/
  /*padding-left: 115px;*/
  /*position: absolute;*/
  /*top: 17px;*/
  /*left: 10px;*/
  transition: all 0.2s ease;

}

.has-val {
  height: 48px !important;
}

.has-val + .focus-input100 + .label-input100 {
  top: 14px;
  font-size: 13px;
}

/*==================================================================
[ Restyle Checkbox ]*/


.contact100-form-checkbox {
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.4;
  display: flex;
  cursor: pointer;
}

.input-checkbox100 {
  width: 18px;
  height: 18px;
}
.input-checkbox100:checked {
  background: #cd7939;
}


/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  /*width: 100%;*/
  display: flex;
  /*flex-wrap: wrap;*/
  justify-content: center;
}
.container-login100-form-btn-res {
  width: 100%;
  max-width: 500px;

}

.login100-form-btn {
  display: flex;
  /*align-items: center;*/
  /*padding: 0 20px;*/
  /*background: #6675df;*/
  width: 590px;
  height: 50px;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #FFF;
  background: rgba(255, 255, 255, 0.25);
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 20px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  align-items: center;

  transition: all 0.4s;
  /*margin-right: 140px;*/
  /*margin-top: 15px;*/
}
.login100-form-btn-res{
  display: flex;
  /*align-items: center;*/
  /*padding: 0 20px;*/
  /*background: #6675df;*/
  width: 100%;
  height: 50px;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #FFF;
  background: rgba(255, 255, 255, 0.25);
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 20px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  align-items: center;

  transition: all 0.4s;
  /*margin-right: 140px;*/
  /*margin-top: 15px;*/
}

.login100-form-btn:hover {
  background: #333333;
  color: #fff;
}

.eri {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid #FFF;
  margin: 0 auto;
  margin-top: 10px;
  transition: all 0.4s;
  /*background: rgba(255, 255, 255, 0.25);*/
  background-image: url("images/loginImages/eri-icon.svg");
  background-repeat: no-repeat;
  background-position: 5px;
}

.eri:hover {
  background: #333333;
  background-image: url("images/loginImages/eri-icon.svg");
  background-repeat: no-repeat;
  background-position: 5px;
}

.eri-btn {
  font-family: sans-serif;
  font-size: 12px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.4s;
  margin-left: 10px;
}

.eri-icon {
  margin-right: 10px;
  /*position: absolute;*/
  /*left: 145px;*/
  /*top: 76px;*/
}

input:-webkit-autofill,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid #FFFFFF;
  -webkit-text-fill-color: #FFFFFF;
  -webkit-box-shadow: 0 0 0 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}

.welcome-text {
  color: #FFF;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 80px;
  left: 184px;
  width: 333px;
  height: 100px;
}
.welcome-text-responsive {
  width: 100%;
  color: #FFF;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.main-txt {
  color: #FFF;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 50px;
  left: 184px;
  width: 333px;
  height: 100px;
}
.main-txt-responsive {
  width: 100%;
  color: #FFF;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.oneID {
  width: 590px;
  height: 101px;
  border-radius: 20px;
}
.oneID-res {
  width: 100%;
  height: 70px;
  border-radius: 15px;
}
.info-text {
  width: 588px;
  height: 212px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.info-text-responsive {
  width: 100%;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>

