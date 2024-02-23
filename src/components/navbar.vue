<script>
import {mapActions, mapMutations} from "vuex";
import i18n from "@/i18n";

export default {
  data() {
    return {
      selectedLanguage: 'UZ',
      languages: [
        {
          language: "uz",
          title: "O'Z",
        },
        {
          language: "uzCyrillic",
          title: "ЎЗ",

        },
        {
          language: "ru",
          title: "РУ",
        },
        // {
        //     flag: require("../shared/views/auth/images/mainPageImages/flags/united-states-of-america.png"),
        //     language: "en",
        //     title: "En",
        // }
      ],
      lan: this.$i18n.locale,
      text: null,
      currentLocale: {},
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    window.onscroll = function () {
      onwindowScroll();
    };
    var navbar = document.getElementById("navbar");
    function onwindowScroll() {
      if (
          document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50
      ) {
        navbar.style.backgroundColor = "#272a33";
        navbar.style.padding = "10px";
      } else {
        navbar.style.backgroundColor = "";
        // navbar.style.padding = "20px";
      }
    }
  },
  methods: {
    ...mapActions(['setCount']),
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
    selectLanguage(language) {
      this.selectedLanguage = language;
      // You can perform additional actions here when a language is selected
    },
    toggleMenu() {
      document.getElementById("navbarCollapse").classList.toggle("show");
    },
  },
};
</script>

<template>
  <!--Navbar Start-->
  <nav class="navbar navbar-expand-lg fixed-top bg-white sticky sticky-dark" id="navbar">
    <div class="container">
      <!-- LOGO -->
      <a class="navbar-brand logo text-uppercase" href="/">
        <img src="@/assets/image/gerb.svg"
             width="61" height="61"
             alt="logo"
             style="box-shadow: rgb(36, 98, 86) 1px 2px 8px; border-radius: 50%"
        />
      </a>
      <h5 style="width: 35%" class="text-color mb-0">
        ЎЗБЕКИСТОН РЕСПУБЛИКАСИ
        РАҚОБАТНИ РИВОЖЛАНТИРИШ
        ВА ИСТЕЪМОЛЧИЛАР ХУҚУҚЛАРИНИ
        ҲИМОЯ ҚИЛИШ ҚЎМИТАСИ
      </h5>
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu()"
      >
        <i class="mdi mdi-menu"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto navbar-center" id="mySidenav">
          <li class="nav-item">
            <a v-scroll-to="'#home'" href="javascript: void(0);" class="nav-link text-color">АСОСИЙ САҲИФА</a>
          </li>
          <li class="nav-item mx-2">
            <a href="https://raqobat.gov.uz/" target="_blank" class="nav-link text-color">РАҚОБАТ ҚЎМИТАСИ ВЕБ-САЙТИ</a>
          </li>
          <li class="nav-item">
            <a href="https://fairtech.uz/" target="_blank" class="nav-link text-color">FAIRTECH</a>
          </li>
          <!--          <li class="nav-item">-->
          <!--            <a v-scroll-to="'#pricing'" href="javascript: void(0);" class="nav-link text-color">Pricing</a>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <a v-scroll-to="'#team'" href="javascript: void(0);" class="nav-link text-color">Team</a>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <a v-scroll-to="'#blog'" href="javascript: void(0);" class="nav-link text-color">Blog</a>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <a v-scroll-to="'#contact'" href="javascript: void(0);" class="nav-link text-color">Contact</a>-->
          <!--          </li>-->
        </ul>
      </div>
      <div >
        <b-dropdown variant="white" right toggle-class="header-item" class="language-bar">
          <template v-slot:button-content>
            {{ text }}
            <!--                        <span class="flag-icon flag-icon-uz" id="selectSpan"-->
            <!--                              style="width: 21px; height: 21px; border-radius: 50%; background-size: cover"></span>-->
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
            <!--                        <img :src="entry.flag" alt="Flag" class="language-img">-->
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
  <!-- Navbar End -->
</template>
<style>
.language-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-right: 10px;
  //top: 50px;
  //left: 50px;
  //position: absolute;
  border: 2px solid #2C665A;
  border-radius: 6px;
  width: 68px;
  height: 40px;
}
</style>
