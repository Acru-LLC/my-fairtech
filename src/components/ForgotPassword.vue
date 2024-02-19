<template>
    <div>
        <HomeButton></HomeButton>
        <section class="bg-account-pages height-100vh">
            <div class="display-table">
                <div class="display-table-cell">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card account-card">
                                    <div class="card-body">
                                        <div class="text-center mt-3">
                                            <h3 class="font-weight-bold"><a href="/" class="text-dark text-uppercase account-pages-logo">Dorsin</a></h3>
                                            <p class="text-muted">Reset Password</p>
                                        </div>
                                        <div class="p-3">
                                            <div class="alert alert-warning  text-center" role="alert">
                                                Enter your email address and we'll send you an email with instructions to reset your password.
                                            </div>
                                            <form>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="password" class="form-control" id="email" placeholder="Enter Email">
                                                </div>

                                                <div class="mt-3">
                                                    <button type="submit" class="btn btn-custom btn-block">Reset your Password</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card -->
                            </div>
                            <!-- end col -->
                        </div>
                        <!-- end row -->
                    </div>
                </div>
            </div>
        </section>
        <!-- end account-pages  -->
    </div>
</template>

<script>
import HomeButton from './Elements/HomeButton'

export default {
  name: 'ForgotPassword',
  components: {
      HomeButton
  }
}
</script>
