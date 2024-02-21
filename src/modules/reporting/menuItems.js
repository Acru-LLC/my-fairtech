import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        id: "reportingId",
        label: i18n.t('reporting.name'),
        // icon: "bx mdi mdi-file-document-multiple",
        link: {name: "Menu"},
        parentId: "reportingMenuId",
        // hasPerm: () => ability.can('view', 'reporting-menu')
    },
    // {
    //     id: "reportingParentMenuId",
    //     label: i18n.t("fair_price.main_menu"),
    //     hasPerm: () => ability.can('view', 'price-main-menu'),
    //     subItems: [
    //         {
    //             id: "reportingId",
    //             label: i18n.t('fair_price.enter_cost'),
    //             // icon: "bx mdi mdi-file-document-multiple",
    //             link: {name: "reporting"},
    //             parentId: "reportingMenuId",
    //             // hasPerm: () => ability.can('view', 'price-enter-cost') || ability.can('view', 'price-enter-cost-hypermarket')
    //         },
            // {
            //     id: "priceId",
            //     label: i18n.t('fair_price.add_product'),
            //     // icon: "bx mdi mdi-file-document-multiple",
            //     link: {name: "priceAddProduct"},
            //     parentId: "priceEnterCostMenuId",
            //     hasPerm: () => ability.can('view', 'price-add-product')
            // },
        // ]
    // }
];