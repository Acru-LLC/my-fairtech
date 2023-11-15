import i18n from "@/i18n";

import eAuctionInfo from "@/modules/integration/modules/e-auction-info/routes";
import customsProduct from "@/modules/integration/modules/customs-product/routes";
import openDataRoutes from "@/modules/integration/modules/open-data/routes";
import statisticsInfo from "@/modules/integration/modules/statistics/routes";
import priceStock from "@/modules/integration/modules/price-stock/routes";
import moliyaInfo from "@/modules/integration/modules/moliya-vazirlik/routes";
import iqtisodiyTaraqqiyotInfo from "@/modules/integration/modules/iqtisodiy-taraqqiyot/routes";
import davlatActiveInfo from "@/modules/integration/modules/davlat-aktivlari/routes";
import qurilishInfo from "@/modules/integration/modules/qurilish-vazirlik/routes";
import investitsiyaTashqiSavdoInfo from "@/modules/integration/modules/investitsiya-tashqiSavdo/routes";
import adliyaInfo from "@/modules/integration/modules/adliya-vazirlik/routes";
import transportInfo from "@/modules/integration/modules/transport-vazirlik/routes";
import qishloqXojaligiInfo from "@/modules/integration/modules/qishloq-xojaligi-vazirlik/routes";
import suvXojaligiInfo from "@/modules/integration/modules/suv-xojaligi-vazirlik/routes";
import veterinariyaChorvachilikInfo from "@/modules/integration/modules/veterinariya-chorvachilik/routes";
import soliqInfo from "@/modules/integration/modules/soliq/routes";
import bojxonaInfo from "@/modules/integration/modules/bojxona/routes";
import ekologiyaInfo from "@/modules/integration/modules/ekologiya/routes";
import osimlikInfo from "@/modules/integration/modules/osimlik-karantini-himoyasi/routes";
import soliqQomitaInfo from "@/modules/integration/modules/soliq-qomita/routes";
import kadastrInfo from "@/modules/integration/modules/kadastr/routes";
import tehnikInfo from "@/modules/integration/modules/tehnik-jihatdan-tartibga-solish/routes";
import farmasevtikaInfo from "@/modules/integration/modules/farmasevtika/routes";
import sugurtaMoliyaInfo from "@/modules/integration/modules/sugurta-moliya/routes";
import kommunalInfo from "@/modules/integration/modules/kommunal/routes";
import axborotResursDUKInfo from "@/modules/integration/modules/axborot-resurs-duk/routes";
import elektrInfo from "@/modules/integration/modules/elektr/routes";
import hududgazInfo from "@/modules/integration/modules/hudud-gaz/routes";
import suvTaminotInfo from "@/modules/integration/modules/suv-taminot/routes";
import tovarXomashyoInfo from "@/modules/integration/modules/tovar-xomashyo/routes";
import IntegrationMenuCards from "@/modules/integration/modules/menu-card/routes";
import iivInfo from "@/modules/integration/modules/iiv/routes";
import yoshlarInfo from "@/modules/integration/modules/yoshlar/routes";
import ssvInfo from "@/modules/integration/modules/ssv/routes";
import checkAppeal from "@/modules/integration/modules/check-appeal/routes";

export default [
  {
    name: "InteractiveServices",
    path: "/services",
    component: () => import('@/modules/integration/Index'),
    meta: {
      bcLinkText: i18n.t("submodules.integration.title"),
      bcTo: {name: "Integration"},
    },
    children: [
        {
            name: 'IntegrationMenuIndex',
            path: '',
            component: () => import('@/modules/integration/modules/menu-card/menu'),
            meta: {
                bcTo: {name: "IntegrationMenuIndex"},
                authRequired: true,
            },
        },
        ...checkAppeal,
        ...eAuctionInfo,
        ...openDataRoutes,
        ...customsProduct,
        ...statisticsInfo,
        ...priceStock,
        ...moliyaInfo,
        ...iqtisodiyTaraqqiyotInfo,
        ...davlatActiveInfo,
        ...qurilishInfo,
        ...investitsiyaTashqiSavdoInfo,
        ...adliyaInfo,
        ...transportInfo,
        ...qishloqXojaligiInfo,
        ...suvXojaligiInfo,
        ...veterinariyaChorvachilikInfo,
        ...soliqInfo,
        ...bojxonaInfo,
        ...ekologiyaInfo,
        ...soliqQomitaInfo,
        ...osimlikInfo,
        ...kadastrInfo,
        ...tehnikInfo,
        ...farmasevtikaInfo,
        ...sugurtaMoliyaInfo,
        ...kommunalInfo,
        ...axborotResursDUKInfo,
        ...elektrInfo,
        ...hududgazInfo,
        ...suvTaminotInfo,
        ...tovarXomashyoInfo,
        ...iivInfo,
        ...yoshlarInfo,
        ...ssvInfo,
        ...IntegrationMenuCards,
    ],
  },
];
