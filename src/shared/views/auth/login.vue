<script>
import { mapActions } from 'vuex'
import appConfig from "@/app.config";
import AuthLayout from "@/shared/layouts/auth"
import ESigns from './components/ESigns'
/**
 * Login component
 */
export default {
    components: {
        AuthLayout,
        ESigns
    },
    page: {
        title: "Login",
        meta: [
            {
                name: "description",
                content: appConfig.description,
            },
        ],
    },
    data () {
        return {
            email: "",
            password: "",
            submitted: false,
            showPassword: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
        };
    },
    methods: {
        ...mapActions("auth", ["login", "loginByToken"]),
        // Try to log the user in with the username
        // and password they provided.
        async tryToLogIn () {
            this.$refs.observer.validate().then(valid => {
                if (valid) {
                    this.login({ Username: this.email, Password: this.password })
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            })

        },
        async loginByEsp (data, tin, pinfl, INN) {
            let authData = {
                signedData: data,
                TIN: tin,
                INN: INN,
                PNFL: pinfl,
                username: "",
                password: "",
            };
            this.loginByToken(authData)
        },
    },
    mounted () {
        document.body.classList.add("auth-body-bg");
    },
};
</script>

<template>
    <AuthLayout>
        <ESigns
            v-if="$route.query.login_page === 'ERI_KEY'"
            for-login
            @sign="loginByEsp"
            @back="$router.push({name: 'Login'})"
        ></ESigns>

        <div
            v-else
            class="mt-4 auth-login-wrapper"
        >
            <ValidationObserver
                ref="observer"
                v-slot="{}"
            >
                <b-row class="mb-3">
                    <b-col
                        cols="12"
                        class="mb-3"
                    >
                        <BaseInputWithValidation
                            name="username"
                            rules="required"
                            ref="username"
                            label-on-top
                            v-model="email"
                            :label="$t('auth.username')"
                            class="required"
                        />
                    </b-col>
                    <b-col
                        cols="12"
                        class="mb-1"
                    >
                        <BaseInputWithValidation
                            name="password"
                            with-input-append
                            label-on-top
                            class="required"
                            @keyup.enter="tryToLogIn"
                            :rules="{'required':true}"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            :label="$t('auth.password')"
                        >
                            <template v-slot:append-slot>
                                <b-button
                                    @click="showPassword = !showPassword"
                                    variant="outline-primary"
                                    id="contractorSearchButton"
                                    style="padding: 2.5px 10px; font-size: 1.2rem;"
                                >
                                    <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                                </b-button>
                            </template>
                        </BaseInputWithValidation>
                    </b-col>
                </b-row>
            </ValidationObserver>
            <div class="mt-3 d-grid">
                <b-button
                    @click="tryToLogIn"
                    variant="primary"
                >{{ $t('auth.login') }}</b-button>
            </div>

            <div class="mt-3 d-grid">
                <b-button
                    class="btn-block"
                    to="/login?login_page=ERI_KEY"
                    variant="outline-primary"
                >{{ $t('auth.login_with_e_signature') }}</b-button>
            </div>

            <!-- <div class="mt-4 text-center">
                <h5 class="font-size-14 mb-3">{{ $t('auth.login_with_e_signature') }}</h5>
            </div> -->
            <div class="mt-5 text-center">
                <p>
                    {{ $t('auth.not_yet_registered') }}
                    <router-link
                        :to="{name: 'Register'}"
                        class="fw-medium text-primary"
                    >
                        {{ $t('auth.registration') }}
                    </router-link>
                </p>
            </div>
            <div class="mt-4 text-center">
                <router-link
                    tag="a"
                    to="#"
                    class="text-muted"
                >
                    <i class="mdi mdi-lock me-1"></i> {{ $t('auth.forgot_password') }}
                </router-link>
            </div>
        </div>
    </AuthLayout>
</template>

<style lang="scss" scoped>
.auth-login-wrapper {
    width: 40%;
    margin-right: auto;
    margin-left: auto;
    @media (max-width: 768px) {
        width: 90%;
    }
}
</style>