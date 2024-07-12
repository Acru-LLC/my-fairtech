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
  <nav class="navbar navbar-expand-lg fixed-top bg-white sticky sticky-dark" id="navbar" style="box-shadow: 0 0 4px 3px rgba(128, 128, 128, 0.187);">
    <div class="container">

      <div class="main-container">
        <div>
          <a class="" href="/">
            <img src="@/assets/image/gerb.svg"
                 width="61" height="61"
                 alt="logo"
                 style="box-shadow: rgb(36, 98, 86) 1px 2px 8px; border-radius: 50%"
            />
          </a>
        </div>
        <div>
                <span class="text-color main-title">
                    {{ $t('navbar.main_title') }}
                </span>
        </div>
        <div>
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
            <i class="mdi mdi-menu text-color"></i>
          </button>
        </div>
      </div>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav" id="mySidenav">
          <li class="nav-item">
            <a v-scroll-to="'#home'" href="javascript: void(0);" class="nav-link text-color">{{ $t('navbar.home') }}</a>
          </li>
          <li class="nav-item mx-2">
            <a href="https://raqobat.gov.uz/" target="_blank" class="nav-link text-color">{{ $t('navbar.raqobat_site') }}</a>
          </li>
          <li class="nav-item">
            <a href="https://fairtech.uz/" target="_blank" class="nav-link text-color">FAIRTECH</a>
          </li>
          <li class="dropdown-items">
            <b-dropdown variant="white" right toggle-class="header-item" class="languageBar">
              <template v-slot:button-content>
                {{ text }}
              </template>
              <b-dropdown-item
                  v-for="(entry, i) in languages"
                  :key="i"
                  :value="entry"
                  :class="{ active: currentLocale.language === entry.language }"
                  @click="changeLocale(entry.language)"
                  class="notify-item"
              >
                <span class="align-middle">{{ entry.title }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>

      </div>
    </div>
  </nav>

  <!-- Navbar End -->
</template>
<style>
.languageBar{
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

/* Media queries for responsiveness */
@media only screen and (max-width: 767px) {
  .navbar-collapse {
    position: static;
    transform: translateY(0);
    flex-direction: row;
    //justify-content: flex-end;
    background-color: transparent;
    padding: 0;
    border: none;
    display: flex;
    text-align: center;
  }

  .dropdown-items{
    display: flex;
    justify-content: center;
  }

  .main-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-container div:nth-child(2){
    width: 60%;
    margin-left: 8px;
  }
  .main-title{
    font-size: 10px;
  }

  .nav-item {
    margin: 0 15px;
  }
}

@media only screen and (max-width: 991px) {
  .navbar-collapse {
    position: static;
    transform: translateY(0);
    flex-direction: row;
    //justify-content: flex-end;
    background-color: transparent;
    padding: 0;
    border: none;
    display: flex;
    text-align: center;
  }


  .main-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-container div:nth-child(2){
    width: 60%;
    margin-left: 8px;
  }
  .main-title{
    font-size: 10px;
  }

  .nav-item {
    margin: 0 15px;
  }
}

@media only screen and (min-width: 992px) {
  .navbar-nav {
    margin-right: auto;
  }
  .main-title{
    font-size: 10px;
  }
}

@media only screen and (min-width: 1200px) {
  .navbar-collapse {
    position: static;
    transform: translateY(0);
    flex-direction: row;
    justify-content: flex-end;
    background-color: transparent;
    padding: 0;
    border: none;
  }
  .main-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%;
  }
  .main-container div:nth-child(2){
    width: 80%;
  }

  .main-title{
    font-size: 16px;
  }
}
</style>
