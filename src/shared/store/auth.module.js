import {AuthService, AuthenticationError} from "@/shared/services/auth.service"
import router from '@/router'
import ApiService from "@/shared/services/api.service";
import {TokenService} from "@/shared/services/storage.service";


const state = {
    authenticating: false,
    accessToken: '',
    authenticationErrorCode: 0,
    authenticationError: '',
    refreshTokenPromise: null, // Holds the promise of the refresh token
    UserInfo: {}
};

const getters = {
    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    }
};

const actions = {
    async login({commit}, {Username, Password}) {
        commit('loginRequest');
        try {
            const data = await AuthService.login(Username, Password);
            commit('loginSuccess', data);
            commit('ROOT_LOGIN_SUCCESS', data, {root: true});
            // Redirect the user to the page he first tried to visit or to the home view
            // await router.push(router.history.current.query.redirect || '/');
            await router.push('/');
            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }
            return false
        }
    },
    async loginByToken({commit}, {signedData, TIN, PNFL, INN}) {
        try {
            const data = await AuthService.loginEsp(signedData, TIN, PNFL, INN);
            commit('loginSuccess', data);
            commit('ROOT_LOGIN_SUCCESS', data, {root: true});

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push(router.history.current.query.redirect ? router.history.current.query.redirect : '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },
    async loginOneId({commit}, data) {
        commit('loginRequest');
        try {
            TokenService.saveToken(data.token)
            TokenService.setUserAvatarUrl(data.uploadPath)
            TokenService.saveRefreshToken(data.token);
            TokenService.setUserInfo({
                id: data.id,
                username: data.username,
                employeeId: data.employeeId,
                settings: data.userSettings,
                employeeFullName: data.employeeFirstName + ' ' + data.employeeLastName + ' ' + (data.employeeMiddleName ? data.employeeMiddleName : '')
            })
            TokenService.setUserId(data.id);
            TokenService.setIsOuter(data.isOuter);
            ApiService.setHeader();
            commit('loginSuccess', data);
            commit('ROOT_LOGIN_SUCCESS', data, {root: true});
            await router.push('/');
            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }
            return false
        }
    },

    refreshToken({commit, state}) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if (!state.refreshTokenPromise) {
            const p = AuthService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the AuthService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                    commit('ROOT_LOGIN_SUCCESS', data, {root: true});
                },
                () => {
                    commit('refreshTokenPromise', null)
                }
            )
        }

        return state.refreshTokenPromise
    },

    logout({commit}) {
        AuthService.logout()
        commit('logoutSuccess')
        commit('ROOT_LOGOUT_SUCCESS', null, {root: true});
        // router.push('authentication/fulllogin')
        window.location.reload()
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    setUserInfo(state, data) {
        state.UserInfo = data;
    },

    loginSuccess(state, data) {
        /*let formattedRules = [];
        if (data.permissions.length > 0) {
            formattedRules = data.permissions.map(perm => {
                let formattedObj = {};
                formattedObj.actions = perm.substr(0, perm.indexOf(' '));
                formattedObj.subject = perm.substr(perm.indexOf(' ') + 1);
                return formattedObj;
            })
        }*/
        // state.rules = formattedRules;
        state.accessToken = data.token;
        // state.token = data.token;
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
        state.accessToken = '';
        state.UserInfo = {}
        // state.rules = [];
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
