<script>
import { layoutComputed } from "@/state/helpers";
import { TokenService } from "@/shared/services/storage.service";
import NavBar from "@/components/nav-bar";
import SideBar from "@/components/side-bar";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";
import router from "@/router/index"
/**
 * Vertical layout
 */
export default {
    components: { NavBar, SideBar, RightBar, Footer },
    data () {
        return {
            scTimer: 0,
            scY: 0,
            isMenuCondensedLocal: TokenService.getIsMenuCondensed()
        };
    },
    computed: {
        ...layoutComputed,
        isMenuCondensed () {
            return this.isMenuCondensedLocal
        }
    },
    created: () => {
        document.body.removeAttribute("data-layout", "horizontal");
        document.body.removeAttribute("data-topbar", "dark");
        document.body.removeAttribute("data-layout-size", "boxed");
        document.body.classList.remove("auth-body-bg");
    },
    methods: {
        handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
                this.scY = window.scrollY;
                clearTimeout(this.scTimer);
                this.scTimer = 0;
            }, 100);
        },
        toTop: function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        toggleMenu (changeOnStorageAsWell = false) {
            document.body.classList.toggle("sidebar-enable");
            if (!changeOnStorageAsWell) {
                if (this.isMenuCondensed) {
                    document.body.classList.add("vertical-collpsed");
                } else {
                    document.body.classList.remove("vertical-collpsed");
                }
            } else {
                if (this.isMenuCondensed) {
                    document.body.classList.remove("vertical-collpsed");
                } else {
                    document.body.classList.add("vertical-collpsed");
                }
            }
            if (window.screen.width >= 992) {
                // eslint-disable-next-line no-unused-vars
                /* router.afterEach((routeTo, routeFrom) => {
                    document.body.classList.remove("sidebar-enable");
                    document.body.classList.remove("vertical-collpsed");
                }); */
            } else {
                // eslint-disable-next-line no-unused-vars
                router.afterEach((routeTo, routeFrom) => {
                    document.body.classList.remove("sidebar-enable");
                });
                document.body.classList.remove("vertical-collpsed");
            }
            if (changeOnStorageAsWell) {
                TokenService.setIsMenuCondensed(!this.isMenuCondensed)
                this.isMenuCondensedLocal = !this.isMenuCondensedLocal
            }
        },
        toggleRightSidebar () {
            document.body.classList.toggle("right-bar-enabled");
        },
        hideRightSidebar () {
            document.body.classList.remove("right-bar-enabled");
        },
    },
    mounted () {
        /* if (this.loader === true) {
            document.getElementById("preloader").style.display = "block";
            document.getElementById("status").style.display = "block";

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("status").style.display = "none";
            }, 2500);
        } else {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("status").style.display = "none";
        } */
        window.addEventListener('scroll', this.handleScroll);
        this.toggleMenu()
    },
};
</script>

<template>
    <div>
        <div id="preloader">
            <div id="status">
                <div class="spinner-chase">
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                    <div class="chase-dot"></div>
                </div>
            </div>
        </div>
        <div id="layout-wrapper">
            <NavBar />
            <SideBar
                :is-condensed="isMenuCondensed"
                :type="leftSidebarType"
                :width="layoutWidth"
            />
            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->

            <div class="main-content" style="overflow: unset!important;">
                <div>
                    <!-- Start Content-->
                    <div>
                        <slot />
                    </div>
                </div>
                <transition name="fade">
                    <div
                        id="goToTopButton"
                        style=""
                        v-show="scY > 300"
                        @click="toTop"
                    >
                        <b-btn variant="link">
                            <i class="mdi mdi-arrow-up-circle"></i>
                        </b-btn>
                    </div>
                </transition>
                <Footer />
            </div>
            <RightBar />
        </div>
    </div>
</template>

<style lang="scss" scoped>
::v-deep #goToTopButton {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 4001;
    .btn {
        font-size: 2.5rem;
        padding: 0;
        &:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    }
}
</style>

<style lang="scss">
.mm-active {
  a.active {
    background-color: #fff;
    color: #2E5C55!important;
    border-radius: 6px;
    i.bx {
      color: #fff!important;
      &:hover {
        color: #fff!important;
      }
    }
    .effect {
      &:hover {
        color: #2C665A!important;
      }
    }
  }
  a.active:hover {
  }
}
</style>
