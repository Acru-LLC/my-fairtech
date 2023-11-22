<script setup>
import VanillaTilt from 'vanilla-tilt-vue'
</script>
<script>
import {mapActions, mapMutations} from 'vuex'
import i18n from "@/i18n";
// import AuthLayout from "@/shared/layouts/auth"
// import ESigns from './components/ESigns'
/**
 * Login component
 */

export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      languages: [
        {
          flag: require("../auth/images/mainPageImages/flags/uzbekistan.png"),
          language: "uz",
          title: "O'Z",
        },
        {
          flag: require("../auth/images/mainPageImages/flags/uzbkril.png"),
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

  methods: {
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    toggleVisibilityPassword() {
      this.showPassword = !this.showPassword;
    },
    ...mapActions("auth", ["login", "loginByToken"]),
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      // this.$refs.observer.validate().then(valid => {
      //     if (valid) {
      this.login({Username: this.email, Password: this.password})
      // } else {
      //     this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
      // }
      // })

    },
    async loginByEsp(data, tin, pinfl, INN) {
      let authData = {
        signedData: data,
        TIN: tin,
        INN: INN,
        PNFL: pinfl,
        username: "",
        password: "",
      };
      this.loginByToken(authData)
    },
    async changeLocale(localeCode) {
      if (this.$i18n.locale !== localeCode) {
        window.location.reload();
        await this.setLocale(localeCode);
        this.currentLocale = this.languages.find(locale => locale.language === localeCode)
      }
    },
  },
  mounted() {
    document.body.classList.add("auth-body-bg");
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
}
</script>

<template>
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
            <!--                  <span class="flag-icon flag-icon-uz" id="selectSpan"-->
            <!--                        style="width: 21px; height: 21px; border-radius: 50%; background-size: cover"></span>-->
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
            <!--                  <img :src="entry.flag" alt="Flag" class="language-img">-->
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <VanillaTilt parallax>
          <div class="logo">
            <!--          <img src="images/logo.png" class="logo" alt="">-->
          </div>
        </VanillaTilt>
      </div>
      <div class="box position-relative d-flex flex-column justify-content-center">
        <div class="layout">
          <!--             login100-form-title   <form class="login100-form validate-form">-->
          <span class="login100-form-title p-b-43">
                        {{ $t('system.title') }}
            <!--						FAIR TECH-->
					</span>
          <span class="yagonaAT">
                      {{ $t('system.sub_title') }}
            <!--                        YAGONA AXBOROT TIZIMI-->
                    </span>


          <div class="wrap-input100 validate-input d-flex align-items-center">
            <input class="input100" v-model="email" type="text" required placeholder="login"
                   id="input-field">
            <img class="icon1" src="../auth/images/loginImages/icon1.png" alt="">
            <!--                        <span class="focus-input100"></span>-->
            <!--                        <span class="label-input100">login</span>-->
          </div>


          <div class="wrap-input100 validate-input d-flex align-items-center" data-validate="Password is required">
            <input class="input100" v-model="password" id="input"
                   :type="showPassword ? 'text' : 'password'" required
                   placeholder="parol">
            <img class="icon2" src="../auth/images/loginImages/icon2.png" alt="">
            <!--                        <span class="show-icon">-->
            <i class="fa fa-eye show-icon" @click="toggleVisibilityPassword"></i>
            <!--                          <img class="show-icon" src="../auth/images/loginImages/eye-solid.png" @click="toggleVisibilityPassword" alt="">-->
            <!--                        </span>-->
            <!--                        <span class="label-input100">parol</span>-->
          </div>

          <div class="flex-sb-m w-full">
            <div class="contact100-form-checkbox">
              <input class="input-checkbox100 mr-2" id="ckb1" type="checkbox" name="remember-me">
              <!--                            <label class="label-checkbox100" for="ckb1">-->
              <!--                                Eslab qolish-->
              <!--                            </label>-->
              {{ $t('system.remember_me') }}
            </div>

            <div>
              <a href="#" class="txt1">
                {{ $t('system.forgot_password') }}
              </a>
            </div>
          </div>


          <div class="container-login100-form-btn">
            <button @click="tryToLogIn" class="login100-form-btn">
              {{ $t('system.login') }}
            </button>
          </div>

          <!--                </form>-->
        </div>

        <div class="layout2">
                <span class="txt3">
                  {{ $t('system.eri_text') }}
                  <!--						Foydalanuvchi shaxsiy kabinetiga kirish uchun login va paroldan tashqari elektron raqamli imzo kaliti talab etiladi. Iltimos elektron raqamli imzoni kiriting!-->
					</span>
          <div class="eri">
            <!--            <img class="eri-icon" src="images/loginImages/eri-icon.svg" alt="">-->
            <a href="#">
              <button class="eri-btn">{{ $t('system.eri_btn') }}</button>
            </a>
          </div>
        </div>
        <div class="text-footer">
          <p class="title-footer">{{ $t('system.tex_support') }}</p>
          <img src="../auth/images/loginImages/phone.svg" alt="">
          <p class="svg-footer1 ml-2">71-207-48-00 (1159)</p>

          <div class="text-footer2">
            <img src="../auth/images/loginImages/message.svg" alt="">
            <a href="#" class="svg-footer2 ml-2">@rqbot</a>
            <div class="text-footer-right">
              <img src="../auth/images/loginImages/tutorial.svg" alt="">
              <a href="#"></a><span class="svg-footer3"> {{ $t('system.tutorial') }}</span>
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
</template>

<style lang="scss" scoped>
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
  //width: 115px;
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
  background-image: url("images/loginImages/bgr_40.jpg");
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

.login100-more {

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
  line-height: 24px;
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
  //background-image: url("images/loginImages/eye-solid.svg");
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

.login100-form-btn {
  /*display: flex;*/
  /*align-items: center;*/
  /*padding: 0 20px;*/
  /*background: #6675df;*/
  width: 180px;
  height: 40px;
  /*justify-content: center;*/
  border-radius: 6px;
  border: 2px solid #FFF;
  background: rgba(255, 255, 255, 0.25);
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 20px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;

  transition: all 0.4s;
  /*margin-right: 140px;*/
  /*margin-top: 15px;*/
}

.login100-form-btn:hover {
  background: #333333;
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

</style>
