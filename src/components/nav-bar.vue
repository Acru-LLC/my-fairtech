<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { TokenService } from '@/shared/services/storage.service'
import simplebar from "simplebar-vue";
import helperService from "../shared/services/helper.service";
import crudAndListsService from "../shared/services/crud_and_list.service";

const MAIN_API_URL = '/notification'
const MAIN_API_URL_ADVERTISEMENT_NOTIFICATION = '/report/advertisement-notifications'
const MAIN_API_URL_INVENTORY_REPORT = '/report/general-inventory-reports'

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      notificationList: [],
      isNotificationLoading: false,
      totalItems: 0,
      keyword: '',
      publicPath: process.env.BASE_URL,
      languages: [
        {
          flag: require("@/assets/images/flags/uz.png"),
          language: "uz",
          title: "O'ZB",
        },
        {
          flag: require("@/assets/images/flags/uz.png"),
          language: "uzCyrillic",
          title: "ЎЗБ",
        },
        {
          flag: require("@/assets/images/flags/ru.png"),
          language: "ru",
          title: "РУС",
        }
      ],
      lan: this.$i18n.locale,
      text: null,
      flag: null,
      currentLocale: {},
    };
  },

  components: { simplebar },

  computed: {
    ...mapState({ notificationsCount: 'count' }),
    userInfo() {
      return TokenService.getUserInfo()
    },
    userAvatarUrlFromStorage() {
      return TokenService.getUserAvatarUrl()
    }
  },

  mounted() {
    this.currentLocale = this.languages.find((x) => x.language === this.$i18n.locale);
  },

  async created() {
    this.setCount()
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    toggleMenu() {
      this.$parent.toggleMenu(true);
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
          !document.fullscreenElement &&
          /* alternative standard method */ !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
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
            params: { notId: this.notificationList[foundIndex].link.id }
          })
          helperService.makeReadNotification(id)
          this.setCount()
        }
      } else if (this.notificationList[foundIndex].type === 'INVENTORY_REPORT') {
        if (foundIndex > -1) {
          crudAndListsService.getById(this.notificationList[foundIndex].link.controllerName, this.notificationList[foundIndex].link.id, true)
          this.$router.push({
            name: 'InventoryReportDetails',
            params: { id: this.notificationList[foundIndex].link.id }
          })
          helperService.makeReadNotification(id)
          this.setCount()
        }
      }
    }
  },
};
</script>
<style scoped>
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
</style>
<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <div class="navbar-brand-box">
          <router-link
              tag="a"
              to="/"
              class="logo logo-dark"
          >
                        <span class="logo-sm">
                            <img
                                src="@/assets/images/logo-acru.png"
                                alt
                                height="22"
                            />
                        </span>
            <span class="logo-lg">
                            <img
                                src="@/assets/images/logo-acru.png"
                                alt
                                height="40"
                            />
                        </span>
          </router-link>

          <router-link tag="a" to="/" class="logo logo-light" >
            <span class="logo-sm">
                <img src="@/assets/images/logo-acru.png" alt height=22 />
            </span>
            <span class="logo-lg">
                <img src="@/assets/images/logo-acru.png" alt height=40 />
            </span>
          </router-link>
        </div>
        <button
            id="vertical-menu-btn"
            type="button"
            class="btn btn-sm px-3 font-size-20 header-item"
            @click="toggleMenu"
        >
          <i class="mdi mdi-menu"></i>
        </button>
      </div>
      <div class="d-flex">
        <router-link :to="{name: 'ProjectLessons'}" class="dropdown d-none d-lg-inline-block ms-1 border-right border-left">
          <button type="button" class="btn header-item noti-icon" v-b-popover.hover.bottom="{content: $t('modules.management.project_lessons.title')}">
            <i class="bx bx-video"></i>
          </button>
        </router-link>
        <b-dropdown variant="white" right toggle-class="header-item" class="border-right">
          <template v-slot:button-content>
            {{ currentLocale.title }}
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
        <b-dropdown
            right
            menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
            toggle-class="header-item noti-icon border-right"
            variant="black"
            @shown="fetchNotifications"
        >
          <template v-slot:button-content>
            <i
                v-if="notificationsCount > 0"
                class="bx bxs-bell bx-tada"
                style="color: orange"
            ></i>
            <i
                v-else
                class="bx bx-bell"
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
        <div class="dropdown d-none d-lg-inline-block ms-1 border-right">
          <button
              type="button"
              class="btn header-item noti-icon"
              @click="initFullScreen"
          >
            <i class="bx bx-fullscreen"></i>
          </button>
        </div>
        <b-dropdown
            right
            variant="black"
            toggle-class="header-item"
            menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <img
                class="rounded-circle header-profile-user"
                :src="userAvatarUrlFromStorage ? publicPath + userAvatarUrlFromStorage : require('@/assets/images/users/default-avatar.png')"
                alt="userImg"
            />
            <span class="d-none d-xl-inline-block ms-1">
                            {{
                userInfo.username
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
      </div>
    </div>
  </header>
</template>