import Vue from "vue";
import Vuex from "vuex";
import i18n from "@/i18n";
/*
* FOR USER PERMISSIONS MANAGEMENT ON UI */
import { Ability } from '@casl/ability'
import abilityPlugin from "@/shared/store/ability"
import storage from "@/shared/store/storage";

/*
* IMPORT MODULES */
import main_modules from '@/modules/store'
import modules from './modules'
import { auth } from "@/shared/store/auth.module"; // THIS IS A SHARED MODULE
import { TokenService } from "@/shared/services/storage.service";
import ApiService from "../shared/services/api.service"; // IMPORT MAIN REGISTER_MODULE STORE
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    storage({
      storedKeys: ['token', 'rules'],
      destroyOn: ['ROOT_LOGOUT_SUCCESS']
    }),
    abilityPlugin
  ],
  modules: {
    ...main_modules,
    ...modules,
    auth
  },
  state: {
    count: 0,
    token: '',
    rules: [],
    locale: 'ru',
    locales: [
      {
        code: 'uz',
        title: 'O\'zb'
      },
      {
        code: 'uzCyrillic',
        title: 'ЎЗБ'
      },
      {
        code: 'ru',
        title: 'РУ'
      }
    ],
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "#1d2228", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "#1D2228",
    setHorizontalLayout: true, // Horizontal layout
    globalSnackbarMessages: [],
    globalLoadingOverlay: false,
    defaultSearchPayload: {
      page: 0,
      itemsPerPage: 20,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
      multiSort: true,
      mustSort: false
    },
    perPageOptions: [10, 20, 30, 50, 100]
  },
  mutations: {
    ROOT_LOGIN_SUCCESS (state, data) {
      let formattedRules = [];
      if (data.permissions.length > 0) {
        formattedRules = data.permissions.map(perm => {
          let formattedObj = {};
          formattedObj.action = perm.substr(0, perm.indexOf(' '));
          formattedObj.subject = perm.substr(perm.indexOf(' ') + 1);
          return formattedObj;
        })
      }
      state.rules = formattedRules;
      state.token = data.token;
    },
    ROOT_LOGOUT_SUCCESS (state) {
      state.rules = [];
    },
    SET_LOCALE (state, locale) {
      state.locale = locale;
      i18n.locale = locale;
      TokenService.setLocale(locale);
    },
    SET_ITEMS_PER_PAGE (state, locale) {
      TokenService.setItemsPerPage(locale);
    },
    SET_PAGE (state, locale) {
      TokenService.setPage(locale);
    },
    CLOSE_GLOBAL_SNACKBAR_BY_INDEX (state, index) {
      state.globalSnackbarMessages[index].show = false;
    },
    SET_GLOBAL_SNACKBAR (state, messages) {
      state.globalSnackbarMessages = messages;
    },
    SET_GLOBAL_LOADING (state, boolean) {
      if (document.getElementById("preloader")) {
        if (boolean) {
          document.getElementById("preloader").style.display = "block";
          document.getElementById("status").style.display = "block";
        } else {
          document.getElementById("preloader").style.display = "none";
          document.getElementById("status").style.display = "none";
        }
      }
      // state.globalLoadingOverlay = boolean;
    },
    SET_SIDEBAR_DRAWER (state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER (state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR (state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR (state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT (state, payload) {
      state.setHorizontalLayout = payload;
    },
    setCount(state, response) {
      state.count = response;
    },
  },
  actions: {
    async setCount({commit}) {
      try {
        const response = await ApiService.get('notification/unread-messages')
        commit('setCount', response.data)
      } catch (e) {
        return 0
      }
    },
  },
  getters: {
    ability () {
      return new Ability()
    }
  },
});
