<template>
<!-- STRAT NAVBAR -->
        <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
            <div class="container">
                <!-- LOGO -->
                <a class="navbar-brand logo text-uppercase" href="/">
                    Dorsin
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav navbar-center" id="mySidenav">
                        <li class="nav-item active">
                            <a href="#home" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#services" class="nav-link">Services</a>
                        </li>
                        <li class="nav-item">
                            <a href="#features" class="nav-link">Features</a>
                        </li>
                        <li class="nav-item">
                            <a href="#pricing" class="nav-link">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a href="#team" class="nav-link">Team</a>
                        </li>
                        <li class="nav-item">
                            <a href="#blog" class="nav-link">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a href="#contact" class="nav-link">Contact</a>
                        </li>
                    </ul>
                    <div class="nav-button ml-auto">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <button type="button" @click="navigate()" class="btn btn-custom navbar-btn btn-rounded waves-effect waves-light">
                                    Try it Free
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
         <!-- END NAVBAR -->
</template>

<script>


export default {
  name: 'Navbar',
  props: {
  },
  methods: {
      navigate : function(){
          window.location.href= '/register';
      }
  }
}
</script>
