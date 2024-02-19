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
                                            <p class="text-muted">Sign up for a new Account</p>
                                        </div>
                                        <div class="p-3">
                                            <form>
                                                <div class="form-group">
                                                    <label for="firstname">First Name</label>
                                                    <input type="text" class="form-control" id="firstname" placeholder="First Name">
                                                </div>

                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="password" class="form-control" id="email" placeholder="Enter Email">
                                                </div>

                                                <div class="form-group">
                                                    <label for="userpassword">Password</label>
                                                    <input type="password" class="form-control" id="userpassword" placeholder="Enter password">
                                                </div>

                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="customControlInline">
                                                    <label class="custom-control-label" for="customControlInline">Remember me</label>
                                                </div>

                                                <div class="mt-3">
                                                    <button type="submit" class="btn btn-custom btn-block">Sign in</button>
                                                </div>

                                                <div class="mt-4 mb-0 text-center">
                                                    <p class="mb-0">Don't have an account ? <a href="/login" class="text-danger">Sign in</a></p>
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
  name: 'Signup',
  components: {
      HomeButton
  }
}
</script>