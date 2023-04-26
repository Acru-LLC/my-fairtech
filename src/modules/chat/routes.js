import i18n from "@/i18n";
import store from "@/state/store"
import { ability } from '@/shared/store/ability'
export default [
    {
        name: "Chat",
        path: "/chat",
        redirect: "/chat",
        component: {
            render (c) {
                return c('router-view')
            }
        },
        meta: {
            bcLinkText: i18n.t("submodules.chat.title"),
            bcTo: { name: "Chat" }
        },
        children: [
            // CHAT
            {
                name: "ChatMain",
                path: "/chat",
                component: () => import('@/modules/chat/Index'),
                meta: {
                    bcLinkText: i18n.t("submodules.chat.title"),
                    bcTo: { name: "Chat" },
                    hasPerm: () => ability.can('view', 'chat')
                },
                async beforeEnter (from, to, next) {
                    await store.dispatch("messenger/onLoad")
                    await next()
                }
            }
        ]
    }
]
