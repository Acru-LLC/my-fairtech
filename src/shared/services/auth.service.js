import ApiService from './api.service'
import { TokenService } from './storage.service'

const REG_MAIN_API_URL = 'registration'
const USER_MAIN_API_URL = 'user'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const AuthService = {
    signup (payload) {
        return ApiService.post(`${REG_MAIN_API_URL}/finish`, payload)
    },

    confirmPhone (payload) {
        return ApiService.post(`${REG_MAIN_API_URL}/confirmation/phone-confirmed?uid=${payload.user.inn}&token=${payload.verifyCode}&username=${payload.user.username}`)
    },

    confirmMail (payload) {
        return ApiService.post(`${REG_MAIN_API_URL}/confirmation/mail-confirmed?uid=${payload.inn}&token=${payload.token}&username=${payload.username}`)
    },

    sendVerifyCodeToMail (payload) {
        return ApiService.post(`${REG_MAIN_API_URL}/send/confirmation/code/to-confirmation`, payload)
    },

    sendVerifyCode (payload, withLoader = false) {
        let payloadTemp = JSON.parse(JSON.stringify(payload))
        payloadTemp.user.phoneNumber = payloadTemp.user.phoneNumber.replaceAll('-', '')
        payloadTemp.user.phoneNumber = payloadTemp.user.phoneNumber.replaceAll('+', '')
        return ApiService.post(`${REG_MAIN_API_URL}/send/confirmation/code/to-confirmation?uid=${payloadTemp.user.inn}`, payloadTemp, withLoader)
        /*return new Promise(function(resolve) {
            setTimeout(resolve, 1000);
        });*/
    },

    checkNoUsername (username) {
        return ApiService.get(`${USER_MAIN_API_URL}/check/no-username?username=${username}`)
    },

    isOrgRegistered (tin, pinfl, uid, isYur, position) {
        return ApiService.get(`${REG_MAIN_API_URL}/check-inn?tin=${tin}&pinfl=${pinfl}&uid=${uid}&isYur=${isYur.toString()}&position=${position}`)
    },

    getKeyForLoginSign (inn, employeeTin, pinfl) {
        return ApiService.get(`key-for-login-sign?INN=${inn}&TIN=${employeeTin}&PNFL=${pinfl}`)
    },
    /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
     **/
    login: async function (username, password) {
        try {
            const response = await ApiService.post('auth-payload', { username: username, password: password }, true)
            TokenService.saveToken(response.data.token)
            TokenService.setUserAvatarUrl(response.data.uploadPath)
            TokenService.saveRefreshToken(response.data.token);
            TokenService.setUserInfo({
                id: response.data.id,
                username: response.data.username,
                employeeId: response.data.employeeId,
                settings: response.data.userSettings,
                employeeFullName: response.data.employeeFirstName + ' ' + response.data.employeeLastName + ' ' + (response.data.employeeMiddleName ? response.data.employeeMiddleName : '')
            })
            TokenService.setUserId(response.data.id);
            TokenService.setIsOuter(response.data.isOuter);
            ApiService.setHeader();
            // ApiService.mount401Interceptor();
            return response.data;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },
    loginEsp: async function (signedData, TIN, PNFL, INN) {
        const requestData = {
            method: 'post',
            url: '/auth-payload',
            data: {
                signedData: signedData,
                TIN: TIN,
                INN: INN,
                tin: TIN,
                PNFL: PNFL
            },
            config: {
                withLoader: true
            }
        };

        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.token)
            TokenService.setUserAvatarUrl(response.data.uploadPath)
            TokenService.saveRefreshToken(response.data.token);
            TokenService.setUserInfo({
                id: response.data.id,
                username: response.data.username,
                employeeId: response.data.employeeId,
                settings: response.data.userSettings,
                employeeFullName: response.data.employeeFirstName + ' ' + response.data.employeeLastName + ' ' + (response.data.employeeMiddleName ? response.data.employeeMiddleName : '')
            })
            TokenService.setUserId(response.data.id);
            TokenService.setIsOuter(response.data.isOuter);
            ApiService.setHeader();
            // ApiService.mount401Interceptor();
            return response.data;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    /**
     * Refresh the access token.
     **/
    refreshToken: async function () {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: "/o/token/",
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            auth: {
                username: process.env.VUE_APP_CLIENT_ID,
                password: process.env.VUE_APP_CLIENT_SECRET
            },
            config: {
                withLoader: true
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access_token)
            TokenService.setUserAvatarUrl(response.data.uploadPath)
            TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader()

            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }

    },

    /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
     **/
    logout () {
        // Remove the token and remove Authorization header from Api Service as well
        TokenService.removeToken();
        TokenService.removeUserAvatarUrl();
        // TokenService.removeLocale();
        TokenService.removeRefreshToken();
        TokenService.removeSidebar();
        //TokenService.removeMenuMinimize();
        ApiService.removeHeader();
        TokenService.removeUserInfo();
        TokenService.removeUserId();
        TokenService.removeIsOuter();
        TokenService.removeCurrentProject();

        ApiService.unmount401Interceptor()
    },
    loginRequestToOneId({ code, state }) {
        return ApiService.get(`/product-auth/auth/oneid/redirectUri?code=${code}&state=${state}`);
    }
}

export default AuthService

export { AuthService, AuthenticationError }
