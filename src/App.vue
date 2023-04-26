<script>
import { TokenService } from '@/shared/services/storage.service'
import appConfig from "@/app.config";

// import { notificationMethods } from "@/state/helpers";

export default {
    name: "app",
    page: {
        // All subcomponent titles will be injected into this template.
        titleTemplate (title) {
            title = typeof title === "function" ? title(this.$store) : title;
            return title ? `${title} | ${appConfig.title}` : appConfig.title;
        },
    },
    mounted () {
        // document.querySelector("html").setAttribute('dir', 'rtl')
    },
    async beforeCreate () {
        if (TokenService.getToken()) {
            await this.$store.dispatch("messenger/onLoad");
            //  setTimeout(() => {
            //   store.dispatch("messenger/allUnreadMessages");
            //  },1000)
        }
    },
    watch: {
        /**
         * Clear the alert message on route change
         */
        // eslint-disable-next-line no-unused-vars
        $route (to, from) {
            // clear alert on location change
            // this.clearNotification();
        },
    },
    methods: {
        // clearNotification: notificationMethods.clear,
    },
};
</script>

<template>
    <div id="app">
        <!-- <keep-alive include="MonitoringAdvertisementConstructions"> -->
        <RouterView :key="this.$route.fullPath" />
        <!-- </keep-alive> -->
    </div>
</template>
