<script>
import AuthLayout from "@/shared/layouts/auth"
import appConfig from "@/app.config";

/**
 * RecoverPassword component
 */
export default {
    components: {
        AuthLayout
    },
    page: {
        title: "Recover Password",
        meta: [{ name: "description", content: appConfig.description }],
    },
    data () {
        return {
            email: "",
            submitted: false,
            error: null,
            tryingToReset: false,
            isResetError: false,
        };
    },
    methods: {
        // Try to register the user in with the email, fullname
        // and password they provided.
        tryToReset () {
            /* this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    this.tryingToReset = true;
                    // Reset the authError if it existed.
                    this.error = null;
                    return (
                        this.resetPassword({
                            email: this.email,
                        })
                            // eslint-disable-next-line no-unused-vars
                            .then((token) => {
                                this.tryingToReset = false;
                                this.isResetError = false;
                            })
                            .catch((error) => {
                                this.tryingToReset = false;
                                this.error = error ? error : "";
                                this.isResetError = true;
                            })
                    );
                } else if (process.env.VUE_APP_DEFAULT_AUTH === "authapi") {
                    axios
                        .post("http://127.0.0.1:8000/api/password/create", {
                            email: this.email,
                        })
                        .then((res) => {
                            this.isResetError = true;
                            this.error = res.data;
                            return res;
                        });
                }
            } */
        },
    },
    mounted () {
        document.body.classList.add("auth-body-bg");
    },
};
</script>

<template>
    <AuthLayout>
        <div class="my-auto">
            <div>
                <h5 class="text-primary">Reset Password</h5>
                <p class="text-muted">Re-Password with ACRU.</p>
            </div>

            <div class="mt-4">
                <div
                    class="alert alert-success text-center mb-4"
                    role="alert"
                >
                    Enter your Email and instructions will be sent to you!
                </div>
                <form @submit.prevent="tryToReset">
                    <b-alert
                        v-model="isResetError"
                        class="mb-4"
                        variant="danger"
                        dismissible
                    >{{ error }}</b-alert>
                    <div class="mb-3">
                        <label for="useremail">Email</label>
                        <input
                            type="email"
                            v-model="email"
                            class="form-control"
                            id="useremail"
                            placeholder="Enter email"
                            :class="{ 'is-invalid': submitted && $v.email.$error }"
                        />
                        <div
                            v-if="submitted && $v.email.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.email.required">Email is required.</span>
                            <span v-if="!$v.email.email">Please enter valid email.</span>
                        </div>
                    </div>

                    <div class="row mb-0">
                        <div class="col-12 text-end">
                            <button
                                class="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
                <div class="mt-5 text-center">
                    <p>
                        Remember It ?
                        <router-link
                            to="/login"
                            class="fw-medium text-primary"
                        >
                            Sign In here</router-link>
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-4 mt-md-5 text-center">
            <p class="mb-0">
                © {{ new Date().getFullYear() }} ACRU. Developed by Dataprizma LLC
            </p>
        </div>
    </AuthLayout>
</template>

<style lang="scss" scoped>
::v-deep .carousel-caption {
    position: relative !important;
    right: 0;
    left: 0;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    color: #495057;
}

::v-deep .carousel-indicators li {
    background-color: rgba(85, 110, 230, 0.25);
}
</style>