import i18n from "@/i18n";

import firePriceRegions from "@/modules/fire-price/modules/price-regions/routes";
import firePriceDokon from "@/modules/fire-price/modules/price-dokon/routes";
import firePriceBozor from "@/modules/fire-price/modules/price-bozor/routes";
import firePriceComplexes from "@/modules/fire-price/modules/price-complexes/routes";
import firePriceBirja from "@/modules/fire-price/modules/price-birja/routes";

export default [
  {
    name: "FirePrice",
    path: "/fire-price",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("fire_price.title"),
      bcTo: {name: "FirePrice"},
    },
    children: [
        ...firePriceRegions,
        ...firePriceDokon,
        ...firePriceBozor,
        ...firePriceComplexes,
        ...firePriceBirja,
    ],
  },
];
