import Vue from 'vue'
import VueRouter from 'vue-router'
import { TokenService } from '@/shared/services/storage.service'
import routes from './routes'
import NProgress from 'nprogress'
import { bus } from "../main";
import i18n from "../i18n";

NProgress.configure({ showSpinner: false });
NProgress.configure({ easing: 'ease', speed: 500 });

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    NProgress.set(0.25)
    const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
    const loggedIn = !!TokenService.getToken();
    const isOpen = ('hasPerm' in to.meta) ? !!to.meta.hasPerm() : true;
    if (!isPublic && !loggedIn && to.name !== 'Register') {
        return next({
            path: '/login',
            query: { redirect: to.fullPath === '/login' ? '/' : to.fullPath }  // Store the full path to redirect the user to after login
        });
    }
    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }
    if (!isOpen) {
        return next('/');
    }
    if (from.name !== null) {
        if ((from.name.startsWith('Create') || from.name.startsWith('Update')) && bus.reactiveLeaveWithConfirm) {
            bus.$bvModal
                .msgBoxConfirm(i18n.t('messages.cancel_title'), {
                    okTitle: i18n.t('actions.confirm'),
                    cancelTitle: i18n.t('actions.cancel'),
                }).then(value => {
                    if (value) {
                        next()
                    } else {
                        next(false)
                        NProgress.done()
                    }
                }).catch(err => {
                    // An error occurred
                })
        } else {
            next();
        }
    } else {
        next()
    }
});

router.afterEach(() => {
    setTimeout(() => NProgress.done(), 250)
})

export default router
