import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [

    {
        id: "priceId",
        label: i18n.t('prices.menu'),
        // icon: "bx mdi mdi-file-document-multiple",
        link: {name: "priceEnterCost"},
        parentId: "priceEnterCostMenuId",
        hasPerm: () => ability.can('view', 'price-enter-cost') || ability.can('view', 'price-enter-cost-hypermarket')
    },
    // {
    //     id: "priceId",
    //     label: i18n.t('prices.menu'),
    //     // icon: "bx mdi mdi-file-document-multiple",
    //     link: {name: "priceEnterCostHypermarket"},
    //     parentId: "priceEnterCostMenuId",
    //     // hasPerm: () => ability.can('view', 'price-enter-cost-hypermarket')
    // },
];