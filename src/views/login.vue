<script>
/**
 * Login component
 */
export default {
  name: "Login",
};
</script>

<template>
  <div>
    <div class="account-home-btn d-none d-sm-block">
      <a href="/" class="text-white">
        <i class="mdi mdi-home h1"></i>
      </a>
    </div>
    <section class="bg-account-pages height-100vh">
      <div class="display-table">
        <div class="display-table-cell">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card account-card">
                  <div class="card-body">
                    <div class="text-center mt-3">
                      <h3 class="font-weight-bold">
                        <a href="/" class="text-dark text-uppercase account-pages-logo">Dorsin</a>
                      </h3>
                      <p class="text-muted">Sign in to continue to Dorsin.</p>
                    </div>
                    <div class="p-3">
                      <form>
                        <div class="form-group">
                          <label for="username">Username</label>
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="Enter username"
                          />
                        </div>

                        <div class="form-group">
                          <label for="userpassword">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                          />
                        </div>

                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customControlInline"
                          />
                          <label class="custom-control-label" for="customControlInline">Remember me</label>
                        </div>

                        <div class="mt-3">
                          <button type="submit" class="btn btn-custom btn-block">Log In</button>
                        </div>

                        <div class="mt-4 mb-0 text-center">
                          <router-link tag="a" to="/forgot-password" class="text-dark">
                            <i class="mdi mdi-lock"></i> Forgot your password?
                          </router-link>
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
