import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";
export default [
    {
        name: "MurojaatCreate",
        path: "/murojaat-create",
        component: () => import("../../router/views/dashboards/MurojatMonitor"),
    },
    {
        name: "MurojaatDraft",
        path: "/murojaat-draft",
        component: () => import("../../shared/views/auth/one-id"),
    },
]
