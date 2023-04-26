import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";
import openDataMenu from "@/modules/integration/modules/open-data/menuItems"

export default [
    {
        id: "IntegrationMenuId",
        label: i18n.t("submodules.integration.title"),
        icon: "mdi mdi-database",
        code: "fair_tech",
        hasPerm: () => ability.can('view', 'open-data-infos') ||
            ability.can('view', 'e-auction-info') ||
            ability.can('view', 'dbq-import-product-infos') ||
            ability.can('view', 'statistics') ||
            ability.can('view', 'moliya'),
        subItems: [
            ...openDataMenu,
            {
                id: "e-auction-info-id",
                label: i18n.t("submodules.integration.e_auction_info.title"),
                icon: "mdi mdi-briefcase-edit",
                link: {name: "IntegrationEAuctionInfoIndex"},
                parentId: "IntegrationMenuId",
                hasPerm: () => ability.can('view', 'e-auction-info')
            },
            {
                id: "customs-product-id",
                label: i18n.t("submodules.integration.customs_product.title"),
                icon: "mdi mdi-window-shutter-open",
                link: {name: "IntegrationCustomsProductIndex"},
                parentId: "IntegrationMenuId",
                hasPerm: () => ability.can('view', 'dbq-import-product-infos') ||
                    ability.can('view', 'dbq-export-product-infos'),
                subItems: [
                    {
                        id: "customs-product-import-id",
                        label: i18n.t("submodules.integration.customs_product.import"),
                        icon: "mdi mdi-arrow-down",
                        link: {name: "IntegrationCustomsProductImportIndex"},
                        parentId: "IntegrationMenuId",
                        hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
                    },
                    {
                        id: "customs-product-export-id",
                        label: i18n.t("submodules.integration.customs_product.export"),
                        icon: "mdi mdi-arrow-up",
                        link: {name: "IntegrationCustomsProductExportIndex"},
                        parentId: "IntegrationMenuId",
                        hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
                    },
                ],
            },
            {
                id: "statistics-info-id",
                label: i18n.t("submodules.integration.statistics_info.menu_title"),
                icon: "mdi mdi-chart-bar",
                link: {name: "IntegrationStatisticsInfoIndex"},
                parentId: "IntegrationMenuId",
                hasPerm: () => ability.can('view', 'statistics')
            },
            {
                id: "price-stock-id",
                label: i18n.t("submodules.integration.price_stock.menu_title"),
                icon: "mdi mdi-window-shutter-open",
                link: {name: "IntegrationPriceStockIndex"},
                parentId: "IntegrationMenuId",
                hasPerm: () => ability.can('view', 'dbq-import-product-infos') || ability.can('view', 'dbq-export-product-infos'),
                subItems: [
                    {
                        id: "price-stock-realization-id",
                        label: i18n.t("submodules.integration.price_stock.realization"),
                        icon: "mdi mdi-reload",
                        link: {name: "IntegrationPriceStockRealizationIndex"},
                        parentId: "price-stock-id",
                        // hasPerm: () => ability.can('view', 'price-stock')
                    },
                    {
                        id: "price-stock-embedding-realization-id",
                        label: i18n.t("submodules.integration.price_stock.embedding_realization"),
                        icon: "mdi mdi-reload",
                        link: {name: "IntegrationPriceStockEmbeddingRealizationIndex"},
                        parentId: "price-stock-id",
                        // hasPerm: () => ability.can('view', 'price-stock')
                    },
                ],
            },
            {
                id: "integration-menu-id",
                label: i18n.t("submodules.integration.title"),
                icon: "mdi mdi-database",
                link: {name: "IntegrationMenuIndex"},
                parentId: "IntegrationMenuId",
                hasPerm: () => ability.can('view', 'integration-menu-cards')
            },
        ]
    }
];