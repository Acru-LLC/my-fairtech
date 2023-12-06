import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Product",
        path: "/product",
        redirect: "/product",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcTo: {name: "Product"}
        },
        children: [
            {
                name: "ProductMurojaat",
                path: "murojaat",
                component: () => import("@/modules/product-info/murojaat/monitor.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "ProductInfos",
                path: "infos",
                component: () => import("@/modules/product-info/infos/Main.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "ProductInfosTIFTNCODE",
                path: "infos-tif-tn_shtrix_mxik-code",
                component: () => import("@/modules/product-info/tif-tn_shtrix_mxik/Index.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            }
        ]
    }
]
