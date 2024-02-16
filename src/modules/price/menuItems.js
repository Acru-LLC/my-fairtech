import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        id: "commissionParentMenuId",
        label: i18n.t("fair_price.main_menu"),
        hasPerm: () => ability.can('view', 'price-main-menu'),
        subItems: [
            {
                id: "priceId",
                label: i18n.t('fair_price.enter_cost'),
                // icon: "bx mdi mdi-file-document-multiple",
                link: {name: "priceEnterCost"},
                parentId: "priceEnterCostMenuId",
                hasPerm: () => ability.can('view', 'price-enter-cost') || ability.can('view', 'price-enter-cost-hypermarket')
            },
            {
                id: "priceMarketsId",
                label: i18n.t('fair_price.priceMarkets'),
                // icon: "bx mdi mdi-file-document-multiple",
                link: {name: "PriceMarkets"},
                parentId: "priceMarketsMenuId",
                hasPerm: () => ability.can('view', 'price-enter-market')
            },
            {
                id: "priceId",
                label: i18n.t('fair_price.add_product'),
                // icon: "bx mdi mdi-file-document-multiple",
                link: {name: "priceAddProduct"},
                parentId: "priceEnterCostMenuId",
                hasPerm: () => ability.can('view', 'price-add-product')
            },
        ]
    }
];