import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [

            {
                id: "fire-prices-birja-id",
                label: i18n.t("fire_price.birja.title"),
                icon: "mdi mdi-currency-eur",
                link: {name: "FirePriceBirjaIndex"},
                parentId: "FirePriceMenuId",
                // hasPerm: () => ability.can('view', ''),
                subItems: [
                    {
                        id: "fire-prices-birja-import-id",
                        label: i18n.t("submodules.integration.customs_product.import"),
                        icon: "mdi mdi-arrow-down",
                        link: {name: "FirePriceBirjaImportIndex"},
                        parentId: "IntegrationMenuId",
                        // hasPerm: () => ability.can('view', ''),
                    },
                    {
                        id: "fire-prices-birja-export-id",
                        label: i18n.t("submodules.integration.customs_product.export"),
                        icon: "mdi mdi-arrow-up",
                        link: {name: "FirePriceBirjaExportIndex"},
                        parentId: "IntegrationMenuId",
                        // hasPerm: () => ability.can('view', ''),
                    },
                ],
            },
            {
                id: "fire-prices-regions-id",
                label: i18n.t("fire_price.regions.title"),
                icon: "mdi mdi-currency-eur",
                link: {name: "FirePriceRegionsIndex"},
                parentId: "FirePriceMenuId",
                // hasPerm: () => ability.can('view', '')
            },
            {
                id: "fire-prices-bozor-id",
                label: i18n.t("fire_price.bozor.title"),
                icon: "mdi mdi-currency-eur",
                link: {name: "FirePriceBozorIndex"},
                parentId: "FirePriceMenuId",
                // hasPerm: () => ability.can('view', '')
            },
            {
                id: "fire-prices-dokon-id",
                label: i18n.t("fire_price.dokon.title"),
                icon: "mdi mdi-currency-eur",
                link: {name: "FirePriceDokonIndex"},
                parentId: "FirePriceMenuId",
                // hasPerm: () => ability.can('view', '')
            },
            {
                id: "fire-prices-complexes-id",
                label: i18n.t("fire_price.complexes.title"),
                icon: "mdi mdi-currency-eur",
                link: {name: "FirePriceComplexesIndex"},
                parentId: "FirePriceMenuId",
                // hasPerm: () => ability.can('view', '')
            },

];