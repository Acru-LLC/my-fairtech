import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router/index'
import Lightbox from 'vue-easy-lightbox'
import VueParticles from 'vue-particles'

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

import Scrollspy from 'vue2-scrollspy';
var VueScrollTo = require('vue-scrollto');
Vue.use(VueParticles)
Vue.use(Lightbox)
Vue.use(Scrollspy);
Vue.use(VueScrollTo)

import VueMultiselctCustomized from "./components/vue-multiselect-customized"
Vue.component('MultiselectCustomized', VueMultiselctCustomized)
import "./design/app.scss";
// NPROGRESS STYLES
import 'nprogress/nprogress.css'

import store from '@/state/store'

import App from './App.vue'

import i18n from './i18n'

import common from './common'
Vue.mixin(common)

import back from "@/components/new/back"
Vue.component('Back', back)

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

/*
 * IMPORT GLOBAL MIXINS */
import UtilMixins from "./plugins/util_mixins";

Vue.use(UtilMixins);

/**
 IMPORT BASE COMPONENTS
 */
import "./plugins/base";

/*
DATE_PROTOTYPE */
import "./shared/services/dateProtypes"
import uploadFile from '@/components/uploadFile'
Vue.component('upload-file', uploadFile)
import FileView from "@/components/fileView"
Vue.component('FileView', FileView)

/**
 IMPORT VEE-VALIDATE
 */
import "./plugins/vee-validate";

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

/*
OBSERVE_VISIBILITY GLOBAL DIRECTIVE */
import { ObserveVisibility } from 'vue-observe-visibility'
Vue.directive('observe-visibility', ObserveVisibility)

/*
CURRENCY FILTER */
Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0
    });
    return formatter.format(value).replace("UZS", "");
});

/*
 * VUE-MASK */
import VueMask from "v-mask";

Vue.use(VueMask);

import Toast from "vue-toastification";
// Import the CSS.
import "vue-toastification/dist/index.css";

const options = {
    position: 'top-right',
    timeout: 3000
};
Vue.use(Toast, options);

// IMPORT DATE-PICKER
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

DatePicker.props.valueType.default = 'format'
DatePicker.props.format.default = 'DD-MM-YYYY'
Vue.use(DatePicker)

// IMPORT VUE_JSON_EXCEL
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

/*
 * FOR USER PERMISSIONS MANAGEMENT ON UI */
import { abilitiesPlugin, Can } from "@casl/vue";
import { ability } from '@/shared/store/ability'
Vue.use(abilitiesPlugin, ability);
Vue.component("Can", Can);

Vue.config.productionTip = false

Vue.use(BootstrapVue)

import ApiService from "./shared/services/api.service";
import { TokenService } from "./shared/services/storage.service";
/*
 *  IF TOKEN EXISTS SET HEADER */
if (TokenService.getToken()) {
    ApiService.setHeader();
}

export const bus = new Vue({
    data () {
        return {
            leaveWithConfirm: true
        }
    },
    computed: {
        reactiveLeaveWithConfirm () {
            return this.leaveWithConfirm
        }
    }
});


import {
    showMsgError,
    catchErr,
    enterInfo,
    successEdited,
    successSaved,
    deleteSuccess,
    accessDenied,
    editSuccess,
    cnf,
    promptSwal,
    cancelBtn
} from "./helper"
Vue.prototype.showMsgError = showMsgError
Vue.prototype.catchErr = catchErr

Vue.prototype.enterInfo = enterInfo
Vue.prototype.successEdited = successEdited

Vue.prototype.successSaved = successSaved
Vue.prototype.deleteSuccess = deleteSuccess
Vue.prototype.accessDenied = accessDenied
Vue.prototype.cnf = cnf
Vue.prototype.promptSwal = promptSwal
Vue.prototype.cancelBtn = cancelBtn
Vue.prototype.editSuccess = editSuccess
/*
 * SET API BASE_URL */
ApiService.init(process.env.VUE_APP_ROOT_API);
/*
 * MOUNT AXIOS GLOBAL REQUEST INTERCEPTOR */
ApiService.mount401Interceptor();

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
