<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import {TokenService} from '@/shared/services/storage.service'
import simplebar from "simplebar-vue";
import helperService from "../shared/services/helper.service";
import crudAndListsService from "../shared/services/crud_and_list.service";
import i18n from "@/i18n";

const MAIN_API_URL = '/notification'
const MAIN_API_URL_ADVERTISEMENT_NOTIFICATION = '/report/advertisement-notifications'
const MAIN_API_URL_INVENTORY_REPORT = '/report/general-inventory-reports'

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      userInfos:{},
      sideBarShowHide:false,
      employeePhoto: TokenService.getUserAvatarUrl(),
      dropdownActive: false,
      notificationList: [],
      isNotificationLoading: false,
      totalItems: 0,
      keyword: '',
      publicPath: process.env.BASE_URL,
      languages: [
        {
          flag: require("../shared/views/auth/images/mainPageImages/flags/uzbekistan.png"),
          language: "uz",
          title: "O'Z",
        },
        {
          flag: require("../shared/views/auth/images/mainPageImages/flags/uzbkril.png"),
          language: "uzCyrillic",
          title: "ЎЗ",

        },
        {
          flag: require("../shared/views/auth/images/mainPageImages/flags/russia.png"),
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
      flag: null,
      currentLocale: {},
    };
  },

  components: {simplebar},
  async created() {
    await this.getUserInfos();
  },
  computed: {
    ...mapState({notificationsCount: 'count'}),
    userInfo() {
      return TokenService.getUserInfo()
    },
    userAvatarUrlFromStorage() {
      return TokenService.getUserAvatarUrl()
    },
    getCurrentDate() {
      const now = new Date();
      // console.log(new Date())
      // console.log(now)
      // const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // return now.toLocaleDateString(undefined, options);
      var day = now.getDate()
      var month = now.getMonth()
      var year = now.getFullYear()
      return day + ' ' + this.monthName(month) + ' ' + year
    },
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    getUserInfos() {
      crudAndListsService.getUserInformation()
          .then((res) => {
            this.userInfos = res.data;
          })
          .catch(e => {
            console.log(e)
          })
    },
    //   toggleDropdown() {
    //   const dropdown = document.querySelector(".language-select");
    //   dropdown.classList.toggle("active");
    //   this.dropdownActive = !this.dropdownActive;
    // },
    //   selectLanguage(languageCode) {
    //   const dropdown = document.querySelector(".language-select");
    //   const selectedLanguage = document.querySelector(".selected-language");
    //   const selectSpan = document.querySelector("#selectSpan");
    //   selectSpan.className = "flag-icon flag-icon-" + languageCode
    //   dropdown.classList.remove("active");
    //   this.dropdownActive = false;
    // },
    mainLogo() {
      TokenService.removeCurrentProject();
      this.$router.push('/main')
    },
    toggleMenuRes() {
      this.$parent.toggleMenu(true);
      this.sideBarShowHide = !this.sideBarShowHide
      // document.getElementById("beforeTitleText").setAttribute("hidden", "")
      // document.getElementById("afterTitleText").removeAttribute("hidden")
      const after = document.getElementById("afterTitleText"),
          before = document.getElementById("beforeTitleText"),
          chevron = document.getElementById("bars-icon");

      // if (before.hasAttribute("hidden")) {
        if (!this.sideBarShowHide) {
        // before.removeAttribute("hidden")
        chevron.className = "fa fa-times"
        // after.setAttribute("hidden", "")
      } else {
        // before.setAttribute("hidden", "")
        // after.removeAttribute("hidden")
        chevron.className = "fa fa-bars"
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu(true);
      // document.getElementById("beforeTitleText").setAttribute("hidden", "")
      // document.getElementById("afterTitleText").removeAttribute("hidden")
      const after = document.getElementById("afterTitleText"),
          before = document.getElementById("beforeTitleText"),
          chevron = document.getElementById("chevron-icon");

      if (before.hasAttribute("hidden")) {
        before.removeAttribute("hidden")
        chevron.className = "fa fa-chevron-left"
        after.setAttribute("hidden", "")
      } else {
        before.setAttribute("hidden", "")
        after.removeAttribute("hidden")
        chevron.className = "fa fa-chevron-right"
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
      document.getElementById("beforeTitleText").setAttribute("hidden", "")
      document.getElementById("afterTitleText").removeAttribute("hidden")
    },
    // initFullScreen() {
    //     document.body.classList.toggle("fullscreen-enable");
    //     if (
    //         !document.fullscreenElement &&
    //         /* alternative standard method */ !document.mozFullScreenElement &&
    //         !document.webkitFullscreenElement
    //     ) {
    //         // current working info
    //         if (document.documentElement.requestFullscreen) {
    //             document.documentElement.requestFullscreen();
    //         } else if (document.documentElement.mozRequestFullScreen) {
    //             document.documentElement.mozRequestFullScreen();
    //         } else if (document.documentElement.webkitRequestFullscreen) {
    //             document.documentElement.webkitRequestFullscreen(
    //                 Element.ALLOW_KEYBOARD_INPUT
    //             );
    //         }
    //     } else {
    //         if (document.cancelFullScreen) {
    //             document.cancelFullScreen();
    //         } else if (document.mozCancelFullScreen) {
    //             document.mozCancelFullScreen();
    //         } else if (document.webkitCancelFullScreen) {
    //             document.webkitCancelFullScreen();
    //         }
    //     }
    // },
    async changeLocale(localeCode) {
      if (this.$i18n.locale !== localeCode) {
        window.location.reload();
        await this.setLocale(localeCode);
        this.currentLocale = this.languages.find(locale => locale.language === localeCode)
      }
    },
    logoutUser() {
      this.logout()
    },
    fetchNotifications() {
      this.isNotificationLoading = true
      crudAndListsService
          .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
          .then((res) => {
            this.notificationList = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(() => {
            this.notificationList = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.isNotificationLoading = false
          })
    },
    readMessage(id) {
      let foundIndex = this.notificationList.findIndex(el => el.id == id)
      if (this.notificationList[foundIndex].type === 'ADVERTISEMENT_NOTIFICATION') {
        if (foundIndex > -1) {
          crudAndListsService.getById(this.notificationList[foundIndex].link.controllerName, this.notificationList[foundIndex].link.id, true)
          this.$router.push({
            name: 'Notifications',
            params: {notId: this.notificationList[foundIndex].link.id}
          })
          helperService.makeReadNotification(id)
          this.setCount()
        }
      } else if (this.notificationList[foundIndex].type === 'INVENTORY_REPORT') {
        if (foundIndex > -1) {
          crudAndListsService.getById(this.notificationList[foundIndex].link.controllerName, this.notificationList[foundIndex].link.id, true)
          this.$router.push({
            name: 'InventoryReportDetails',
            params: {id: this.notificationList[foundIndex].link.id}
          })
          helperService.makeReadNotification(id)
          this.setCount()
        }
      }
    },

    monthName(num) {
      return num == 0 ? this.$t('month.january') :
          num == 1 ? this.$t('month.february') :
              num == 2 ? this.$t('month.march') :
                  num == 3 ? this.$t('month.april') :
                      num == 4 ? this.$t('month.may') :
                          num == 5 ? this.$t('month.june') :
                              num == 6 ? this.$t('month.july') :
                                  num == 7 ? this.$t('month.august') :
                                      num == 8 ? this.$t('month.september') :
                                          num == 9 ? this.$t('month.october') :
                                              num == 10 ? this.$t('month.november') :
                                                  num == 11 ? this.$t('month.december') : 'no date'
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  }
};
</script>
<style scoped>
.navbar-header {
  box-shadow: 0 8px 8px 5px rgba(41, 105, 93, 0.20);
}

.no-content-notification {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: lightgray;
}

.cursor-pointer {
  cursor: pointer;
}

/*
  Search input
*/
.inputs {
  position: relative;
  margin: 0 auto;
}

.input-control {
  text-indent: 15px;
  border: none;
  height: 45px;
  border-radius: 0;
  border-bottom: 1px solid #2B6B5E !important;
  padding-left: 1rem;
}

.input-control:focus {
  color: #495057;
  background-color: #fff;
  /*border-color: #eee;*/
  outline: 0;
  box-shadow: none;
  border-bottom: 1px solid blue;
}

.input-control::placeholder {
  text-align: center;
  font-size: 18px;
  line-height: 14px;
  color: #2C665A;
}

.input-control:focus {
  color: #2B6B5E;
}

.inputs i {
  position: absolute;
  top: 14px;
  left: 4px;
  color: #b8b9bc;
}

.notification-bg {
  background-color: #E1E8E7;
  border-radius: 50%;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-bar {
  background-color: #E1E8E7;
  border-radius: 50%;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.language-img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}

.date-label {
  width: 156px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #2C665A;
  background: rgba(217, 217, 217, 0.00);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
//display: inline-block; transition: all 0.4s;
}

.date-label span {
  background-color: #2C665A;
  display: block;
  position: absolute;
  transition: all 0.4s;
}

.date-label span:nth-child(odd) {
  width: 0%;
  height: 2px;
}

.date-label span:nth-child(even) {
  width: 2px;
  height: 0%;
}

.date-label span:nth-child(1) {
  left: 0;
  bottom: 0;
}

.date-label span:nth-child(2) {
  right: 0;
  bottom: 0;
}

.date-label span:nth-child(3) {
  right: 0;
  top: 0;
}

.date-label span:nth-child(4) {
  left: 0;
  top: 0;
}

.date-label:hover span:nth-child(odd) {
  width: 100%;
}

.date-label:hover span:nth-child(even) {
  height: 100%;
}

.date-label:hover {
  box-shadow: 0 2px 4px rgba(75, 0, 130, 0.2);
}

.date-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 15px;
  line-height: 36px; /* 93.333% */
}

.btn-menu {
  background: rgba(37, 105, 92, 0.40);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 40px;
  margin-top: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
}

#afterTitleText .header-main-text a {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 30px;
  line-height: 14px;
}

#afterTitleText .header-sub-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 12px;
}

#beforeTitleText .header-main-text a {
  color: #FFFFFF;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 30px;
  line-height: 14px;
}

#beforeTitleText .header-sub-text {
  color: #FFFFFF;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 12px;
}
.live-icon{
  width: 14px;
  height: 14px;
  background-color: #ff435b;
  border-radius: 50%;
//position: absolute;
  right: 0;
  top: 0;
}
.live-effect{
  width: 100%;
  height: 100%;
  background-color: #ff435b;
  border-radius: 50%;
  animation: live 2s linear infinite;
}
@keyframes live {
  from{
    transform: scale(0.8);
    opacity: 0.8;
  }
  to{
    transform: scale(2);
    opacity: 0.1;
  }
}

</style>
<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="">
        <div class="navbar-brand-box d-flex justify-content-around align-items-center">
          <div
              tag="a"
              @click="mainLogo"
              class="logo logo-dark mt-lg-2 mt-0"
              style="cursor:pointer;"
          >
                        <span class="logo-sm">
                            <img
                                src="@/shared/views/auth/images/mainPageImages/flags/logo.svg"
                                alt
                                height="60%"
                                width="60"
                            />
                        </span>
            <span class="logo-lg">
                            <img
                                src="@/shared/views/auth/images/mainPageImages/flags/logo.svg"
                                alt
                                height="80%"
                                width="80"
                            />
                        </span>
          </div>

          <router-link tag="a" to="/main" class="logo logo-light">
            <span class="logo-sm">
                <img src="@/shared/views/auth/images/mainPageImages/flags/logo.svg" alt height=60%/>
            </span>
            <span class="logo-lg">
                <img src="@/shared/views/auth/images/mainPageImages/flags/logo.svg" alt height=80%/>
            </span>
          </router-link>
          <div class="d-lg-block d-none header-text mt-2" id="beforeTitleText">
            <div class="header-main-text cursor-pointer"><a @click="mainLogo()"><span>{{ $t('system.title') }}</span></a></div>
            <div class="header-sub-text"><span>{{ $t('system.sub_title') }}</span></div>
          </div>
        </div>

      </div>
      <button
          id="vertical-menu-btn"
          type="button"
          class="btn d-lg-block d-none font-size-20 header-item btn-menu"
          @click="toggleMenu"
      >
        <i class="fa fa-chevron-right" style="color: #2C665A;" id="chevron-icon"></i>
      </button>

      <div class="header-text mt-2" id="afterTitleText" hidden>
        <div class="header-main-text"><a href="#"><span>{{ $t('system.title') }}</span></a></div>
        <div class="header-sub-text"><span>{{ $t('system.sub_title') }}</span></div>
      </div>
      <div class="inputs">
        <!--                <i class="fa fa-search"></i>-->
        <!--                <label>-->
        <!--                    <input type="text" class="input-control" placeholder="Qidiruv">-->
        <!--                </label>-->
      </div>
      <div class="d-flex align-items-center">
        <!--                <router-link :to="{name: 'ProjectLessons'}"-->
        <!--                             class="dropdown d-none d-lg-inline-block ms-1 border-right border-left">-->
        <!--                    <button type="button" class="btn header-item noti-icon"-->
        <!--                            v-b-popover.hover.bottom="{content: $t('modules.management.project_lessons.title')}">-->
        <!--                        <i class="bx bx-video"></i>-->
        <!--                    </button>-->
        <!--                </router-link>-->
        <div class="d-lg-flex d-none align-items-center mr-3" style="top: 10px">
          <div class="live-icon mr-3">
            <div class="live-effect"></div>
          </div>
          <span class="font-size-17 font-weight-bold text-danger">{{$t('error.test_mode')}}</span>
        </div>
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
        <b-dropdown
            right
            menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
            toggle-class="noti-icon"
            variant="black"
            @shown="fetchNotifications"
            class="notification-bg mr-2"
        >
          <template v-slot:button-content>
            <i
                v-if="notificationsCount > 0"
                class="far fa-envelope bx-tada"
                style="color: #2C665A"
            ></i>
            <i
                v-else
                class="far fa-envelope"
                style="color: #2C665A"
            ></i>
            <span
                v-if="notificationsCount > 0"
                class="badge bg-danger rounded-pill"
            >{{ notificationsCount }}</span>
          </template>
          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ $t("messages.message_header") }}
                </h6>
              </div>
            </div>
          </div>
          <simplebar v-if="isNotificationLoading">
            <b-card>
              <b-row>
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
            </b-card>
          </simplebar>
          <simplebar
              v-else-if="notificationList.length"
              style="max-height: 350px"
              class="cursor-pointer"
          >
            <a
                class="text-reset notification-item"
                v-for="(items, index) in notificationList"
                :key="`${index}`"
                @click="readMessage(items.id)"
            >
              <div class="media">
                <div class="avatar-xs me-3">
                                    <span v-if="items.type === 'ADVERTISEMENT_NOTIFICATION'"
                                          class="avatar-title bg-primary rounded-circle font-size-16">
                                        <i class="bx bx-bell"></i>
                                    </span>
                  <span v-else-if="items.type === 'INVENTORY_REPORT'"
                        class="avatar-title bg-success rounded-circle font-size-16">
                                        <i class="mdi mdi-notebook-check"></i>
                                    </span>

                </div>
                <div class="media-body">
                  <b class="mt-0 mb-1">
                    {{ items.title }}
                  </b>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ items.message ? items.message.toString().substring(0, 70) + '...' : '' }}
                    </p>
                    <i class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ items.dateDay }} {{ items.dateHour }}
                    </i>
                  </div>
                  <div v-if="items.isRejected">
                    <b-badge class="mt-0 mb-1" variant="danger">
                      {{ $t('column.rejected') }}
                    </b-badge>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div v-else-if="!notificationList.length" class="no-content-notification">
            <i class="far fa-envelope"></i>
          </div>
        </b-dropdown>
        <b-dropdown
            right
            menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
            toggle-class="noti-icon"
            variant="black"
            @shown="fetchNotifications"
            class="notification-bg"
        >
          <template v-slot:button-content>
            <i
                v-if="notificationsCount > 0"
                class="bx bxs-bell bx-tada"
                style="color: #2C665A"
            ></i>
            <i
                v-else
                class="bx bx-bell"
                style="color: #2C665A"
            ></i>
            <span
                v-if="notificationsCount > 0"
                class="badge bg-danger rounded-pill"
            >{{ notificationsCount }}</span>
          </template>
          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ $t("messages.notification_header") }}
                </h6>
              </div>
            </div>
          </div>
          <simplebar v-if="isNotificationLoading">
            <b-card>
              <b-row>
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 3%">
                <b-col
                    class="col-2"
                    style="padding-top: 3%"
                >
                  <b-skeleton type="avatar"></b-skeleton>
                </b-col>
                <b-col class="col-10">
                  <b-skeleton
                      animation="wave"
                      width="70%"
                  ></b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="90%"
                  >...
                  </b-skeleton>
                  <b-skeleton
                      animation="wave"
                      width="55%"
                  ></b-skeleton>
                </b-col>
              </b-row>
            </b-card>
          </simplebar>
          <simplebar
              v-else-if="notificationList.length"
              style="max-height: 350px"
              class="cursor-pointer"
          >
            <a
                class="text-reset notification-item"
                v-for="(items, index) in notificationList"
                :key="`${index}`"
                @click="readMessage(items.id)"
            >
              <div class="media">
                <div class="avatar-xs me-3">
                                    <span v-if="items.type === 'ADVERTISEMENT_NOTIFICATION'"
                                          class="avatar-title bg-primary rounded-circle font-size-16">
                                        <i class="bx bx-bell"></i>
                                    </span>
                  <span v-else-if="items.type === 'INVENTORY_REPORT'"
                        class="avatar-title bg-success rounded-circle font-size-16">
                                        <i class="mdi mdi-notebook-check"></i>
                                    </span>

                </div>
                <div class="media-body">
                  <b class="mt-0 mb-1">
                    {{ items.title }}
                  </b>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ items.message ? items.message.toString().substring(0, 70) + '...' : '' }}
                    </p>
                    <i class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ items.dateDay }} {{ items.dateHour }}
                    </i>
                  </div>
                  <div v-if="items.isRejected">
                    <b-badge class="mt-0 mb-1" variant="danger">
                      {{ $t('column.rejected') }}
                    </b-badge>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div v-else-if="!notificationList.length" class="no-content-notification">
            <i class="mdi mdi-bell-off-outline"></i>
          </div>
        </b-dropdown>
        <div class="date-label d-lg-block d-none">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <a href="#"
             class="date-text">{{ getCurrentDate }}</a>
        </div>
        <!--                <div class="dropdown d-none d-lg-inline-block ms-1 border-right">-->
        <!--                    <button-->
        <!--                            type="button"-->
        <!--                            class="btn header-item noti-icon"-->
        <!--                            @click="initFullScreen"-->
        <!--                    >-->
        <!--                        <i class="bx bx-fullscreen"></i>-->
        <!--                    </button>-->
        <!--                </div>-->
        <b-dropdown
            right
            variant="black"
            toggle-class="header-item"
            menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <img
                class="rounded-circle header-profile-user mr-2"
                :src="`${userInfos.passportPhoto ? `data:image/png;base64, ${userInfos.passportPhoto}`: require('../shared/views/auth/images/mainPageImages/flags/user.png')}`"
                alt=""
            />
            <span class="d-none d-lg-inline-block ms-1">
                            {{
                userInfos.username
              }}
                        </span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <b-dropdown-item href="/profile">
            <i class="bx bx-user font-size-16 align-middle mr-1"></i>
            {{ $t("actions.profile") }} <span class="d-sm-flex d-lg-none">
<!--            ({{UserInfo.userName}}-->
                       </span>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <a
              href="javascript: void(0);"
              @click="logoutUser"
              class="dropdown-item text-danger"
          >
            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
            {{ $t("actions.logout") }}
          </a>
        </b-dropdown>
        <div>
          <button
              id="vertical-menu-btn"
              type="button"
              class="btn d-lg-none d-block font-size-20 header-item"
              @click="toggleMenuRes"
          >
            <i :class="sideBarShowHide ? 'fa fa-bars' : 'fa fa-times'" style="color: #2C665A;"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
