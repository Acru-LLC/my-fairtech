const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_INFO = 'user_info';
const USER_ID = 'user_id';
const IS_OUTER = 'is_outer';
const USER_AVATAR_URL = 'user_avatar_url';
const USER_LOCALE = 'locale';
const PAGE = 'page';
const NUM = 'items_per_page';
const MODULE_NAME = 'module_name';
const SIDEBAR = 'sidebar';
const SELECTED_MODULE = 'selected_module'
const IS_MENU_CONDENSED = 'is_menu_condensed'
const APPLICATION_PAGE_TYPE = 'application_page_type'
const CURRENT_PROJECT = 'current_project'


/**
 * Manage how Access Tokens are being stored and retrieved from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
    getFullName() {
        return JSON.parse(localStorage.getItem(USER_INFO)).employeeFullName
    },
    getIsMenuCondensed() {
        return JSON.parse(localStorage.getItem(IS_MENU_CONDENSED))
    },
    setIsMenuCondensed(booleanValue) {
        localStorage.setItem(IS_MENU_CONDENSED, booleanValue)
    },
    getSelectedModule() {
        return localStorage.getItem(SELECTED_MODULE)
    },
    setSelectedModule(moduleName) {
        localStorage.setItem(SELECTED_MODULE, moduleName)
    },
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    getLocale() {
        if (localStorage.getItem(USER_LOCALE) && localStorage.getItem(USER_LOCALE) !== 'undefined') {
            return localStorage.getItem(USER_LOCALE)
        } else {
            return 'uzCyrillic'
        }
    },
    setLocale(lang) {
        localStorage.setItem(USER_LOCALE, lang)
    },
    getItemsPerPage() {
        if (localStorage.getItem(NUM) && localStorage.getItem(NUM) != 'all' && localStorage.getItem(NUM) !== 'undefined') {
            return localStorage.getItem(NUM)
        } else if (localStorage.getItem(NUM) == 'all' && this.totalItems) {
            return this.totalItems
        } else if (localStorage.getItem(NUM) == 'all' && !this.totalItems) {
            return '20'
        } else {
            return '20'
        }
    },
    setItemsPerPage(num) {
        if (num == 'all' && this.totalItems) {
            localStorage.setItem(NUM, this.totalItems)
        } else if (num == 'all' && !this.totalItems) {
            localStorage.setItem(NUM, '20')
        } else localStorage.setItem(NUM, num)
    },
    getPage() {
        if (localStorage.getItem(PAGE) && localStorage.getItem(PAGE) !== 'undefined') {
            return localStorage.getItem(PAGE)
        } else {
            return '1'
        }
    },
    setPage(page) {
        localStorage.setItem(PAGE, page)
    },
    getApplicationPageType() {
        return localStorage.getItem(APPLICATION_PAGE_TYPE)
    },
    setApplicationPageType(page) {
        localStorage.setItem(APPLICATION_PAGE_TYPE, page)
    },
    removeApplicationPageType() {
        localStorage.removeItem(APPLICATION_PAGE_TYPE)
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
    getUserAvatarUrl() {
        if (localStorage.getItem(USER_AVATAR_URL) == 'null')
            return JSON.parse(localStorage.getItem(USER_AVATAR_URL))
        return localStorage.getItem(USER_AVATAR_URL)
    },

    setUserAvatarUrl(userAvatarUrl) {
        localStorage.setItem(USER_AVATAR_URL, userAvatarUrl)
    },

    removeUserAvatarUrl() {
        localStorage.removeItem(USER_AVATAR_URL)
    },
    setUserInfo(data) {
        localStorage.setItem(USER_INFO, JSON.stringify(data))
    },
    setUserId(data) {
        localStorage.setItem(USER_ID, data)
    },
    setIsOuter(data) {
        localStorage.setItem(IS_OUTER, data)
    },
    getUserInfo() {
        return JSON.parse(localStorage.getItem(USER_INFO))
    },
    getUserId() {
        return localStorage.getItem(USER_ID)
    },
    getIsOuter() {
        return JSON.parse(localStorage.getItem(IS_OUTER))
    },
    removeUserInfo() {
        localStorage.removeItem(USER_INFO)
    },
    removeUserId() {
        localStorage.removeItem(USER_ID)
    },
    removeIsOuter() {
        localStorage.removeItem(IS_OUTER)
    },
    removeCurrentProject() {
        localStorage.removeItem(CURRENT_PROJECT)
    },
    getCurrentProject(code) {
        return localStorage.getItem(CURRENT_PROJECT) == code
    },
    getRules() {
        let obj = JSON.parse(localStorage.getItem('state'));
        return obj.rules
    }
}

export {TokenService}
