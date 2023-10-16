import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Main",
        path: "/main",
        component: () => import('@/router/views/dashboards/dashboard')
    }
];
