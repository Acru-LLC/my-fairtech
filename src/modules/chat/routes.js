import i18n from "@/i18n";
import store from "@/state/store"
import { ability } from '@/shared/store/ability'
export default [
    {
        name: "Settings",
        path: "/settings",
        component: () => import("@/router/views/dashboards/default"),
    }
]
