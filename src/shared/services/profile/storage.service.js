const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_INFO = 'user_info';
const USER_LOCALE = 'locale';
// const USER_RULES = 'rules';
const SIDEBAR = 'sidebar';
const SELECTED_MODULE = 'selected_module';
const ACTIVE_ONLY_OFFICE_ID = 'active_only_office_id';
const ACTIVE_ONLY_OFFICE_TAB = 'active_only_office_tab';
const INFO_MODAL_CLOSED = 'info_modal_closed';
const MENU_COLLAPSED = 'menu_collapsed';


/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
    getSelectedModule() {
        return localStorage.getItem(SELECTED_MODULE)
    },
    setSelectedModule(moduleName) {
        localStorage.setItem(SELECTED_MODULE, moduleName)
    },
    setActiveOnlyOfficeId(id) {
        localStorage.setItem(ACTIVE_ONLY_OFFICE_ID, id)
    },
    getActiveOnlyOfficeId() {
        localStorage.getItem(ACTIVE_ONLY_OFFICE_ID)
    },
    removeActiveOnlyOfficeId() {
        localStorage.removeItem(ACTIVE_ONLY_OFFICE_ID)
    },
    removeActiveOnlyOfficeTab() {
        localStorage.removeItem(ACTIVE_ONLY_OFFICE_TAB)
    },
    setActiveOnlyOfficeTab(id) {
        localStorage.setItem(ACTIVE_ONLY_OFFICE_TAB, id)
    },
    getActiveOnlyOfficeTab() {
        localStorage.getItem(ACTIVE_ONLY_OFFICE_TAB)
    },
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    getLocale() {
        if (localStorage.getItem(USER_LOCALE) && localStorage.getItem(USER_LOCALE) !== 'undefined') {
            return localStorage.getItem(USER_LOCALE)
        } else {
            return 'ru'
        }

    },
    getCorrectLocal() {
        let lang = 'ru';
        if (localStorage.getItem(USER_LOCALE) && localStorage.getItem(USER_LOCALE) !== 'undefined') {
            lang = localStorage.getItem(USER_LOCALE);
            if (lang === 'uz') {
                lang = 'uz-cyrl'
            }
        }
        return lang
    },
    setLocale(lang) {
        localStorage.setItem(USER_LOCALE, lang)
    },
    setSidebar(data) {
        localStorage.setItem(SIDEBAR, JSON.stringify(data))
    },
    getSidebar() {
        if (localStorage.getItem(SIDEBAR)) {
            return JSON.parse(localStorage.getItem(SIDEBAR))
        } else {
            return []
        }
    },
    removeSidebar() {
        localStorage.removeItem(SIDEBAR)
    },
    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },
    removeLocale() {
        localStorage.removeItem(USER_LOCALE)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },
    setUserInfo(data) {
        localStorage.setItem(USER_INFO, JSON.stringify(data))
    },
    getUserInfo() {
        return JSON.parse(localStorage.getItem(USER_INFO))
    },
    removeUserInfo() {
        localStorage.removeItem(USER_INFO)
    },
    getRules() {
        let obj = JSON.parse(localStorage.getItem('state'));
        return obj.rules
    },
    setInfoModalClosed(value) {
        localStorage.setItem(INFO_MODAL_CLOSED, value)
    },
    getInfoModalClosed() {
        if (localStorage.getItem(INFO_MODAL_CLOSED) === undefined || localStorage.getItem(INFO_MODAL_CLOSED) === null) {
            return false
        } else {
            return localStorage.getItem(INFO_MODAL_CLOSED)
        }

    },
    removeInfoModalClosed() {
        localStorage.removeItem(INFO_MODAL_CLOSED)
    },
    getUserName() {
        let userInfo = JSON.parse(localStorage.getItem(USER_INFO));
        return userInfo.userName;
    },
    getFullName() {
        let userInfo = JSON.parse(localStorage.getItem(USER_INFO));
        return userInfo.userName;
    },
    removeState() {
        localStorage.removeItem('state');
    },
    getUserId() {
        let userInfo = JSON.parse(localStorage.getItem(USER_INFO));
        return userInfo.id;
    },

    getStateMenuCollapsed() {
        return localStorage.getItem(MENU_COLLAPSED)
    },
    removeStateMenuCollapsed() {
        localStorage.removeItem(MENU_COLLAPSED)
    },
    setStateMenuCollapsed(value) {
        localStorage.setItem(MENU_COLLAPSED, value)
    },

}

export {TokenService}
