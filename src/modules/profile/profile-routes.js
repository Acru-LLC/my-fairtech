import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [{
    name: "profile",
    path: "/profile",
    component: () => import('@/router/views/dashboards/default'),
    children:
        [
            {
                path: '/',
                name: 'Profile',
                component: () => import('../profile/profile'),
                meta: {
                    authRequired: true,
                }
            },
        ]
}]
