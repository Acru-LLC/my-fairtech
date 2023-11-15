import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";
// import openDataMenu from "@/modules/integration/modules/open-data/menuItems"

export default [
    // id: "IntegrationMenuId",
    // label: i18n.t("submodules.integration.title"),
    // icon: "mdi mdi-database",
    // code: "integration",
    // hasPerm: () => ability.can('view', 'open-data-infos') ||
    //     ability.can('view', 'e-auction-info') ||
    //     ability.can('view', 'dbq-import-product-infos') ||
    //     ability.can('view', 'statistics') ||
    //     ability.can('view', 'moliya'),
    // subItems: [
    // {
    //     id: "OpenDataMenuId",
    //     label: i18n.t("open_data.title"),
    //     icon: "mdi mdi-database",
    //     code: "integration",
    //     hasPerm: () => ability.can('view', 'open-data-infos'),
    //     subItems: [
    //         {
    //             id: "OpenDataManagementInformationId",
    //             label: i18n.t("open_data.management_information.code") + ' - ' + i18n.t("open_data.management_information.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataManagementInformation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'management information')
    //         },
    //         {
    //             id: "OpenDataPublicAuthorityId",
    //             label: i18n.t("open_data.public_authority.code") + ' - ' + i18n.t("open_data.public_authority.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataPublicAuthority"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'public authority')
    //         },
    //         {
    //             id: "OpenDataSubordinateOrganizationId",
    //             label: i18n.t("open_data.subordinate_organization.code") + ' - ' + i18n.t("open_data.subordinate_organization.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataSubordinateOrganization"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'subordinate organization')
    //         },
    //         {
    //             id: "OpenDataVacancyId",
    //             label: i18n.t("open_data.vacancy.code") + ' - ' + i18n.t("open_data.vacancy.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataVacancy"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'vacancy')
    //         },
    //         {
    //             id: "OpenDataAppealsConsiderationId",
    //             label: i18n.t("open_data.appeals_consideration.code") + ' - ' + i18n.t("open_data.appeals_consideration.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataAppealsConsideration"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'appeals consideration')
    //         },
    //         {
    //             id: "OpenDataEntitiesViolateCompetitionId",
    //             label: i18n.t("open_data.entities_violate_competition.code") + ' - ' + i18n.t("open_data.entities_violate_competition.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataEntitiesViolateCompetition"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'entities violate competition')
    //         },
    //         {
    //             id: "OpenDataAdvertisingLawViolationId",
    //             label: i18n.t("open_data.advertising_law_violation.code") + ' - ' + i18n.t("open_data.advertising_law_violation.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataAdvertisingLawViolation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'advertising law violation')
    //         },
    //         {
    //             id: "OpenDataEnterprisesDominantPositionId",
    //             label: i18n.t("open_data.enterprises_dominant_position.code") + ' - ' + i18n.t("open_data.enterprises_dominant_position.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataEnterprisesDominantPosition"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'enterprises dominant position')
    //         },
    //         {
    //             id: "OpenDataNaturalMonopolyReestrId",
    //             label: i18n.t("open_data.natural_monopoly_reestr.code") + ' - ' + i18n.t("open_data.natural_monopoly_reestr.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataNaturalMonopolyReestr"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'natural monopoly reestr')
    //         },
    //         {
    //             id: "OpenDataStockProductId",
    //             label: i18n.t("open_data.stock_product.code") + ' - ' + i18n.t("open_data.stock_product.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataStockProduct"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'stock product')
    //         },
    //         {
    //             id: "OpenDataDomesticMarketPriceId",
    //             label: i18n.t("open_data.domestic_market_price.code") + ' - ' + i18n.t("open_data.domestic_market_price.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataDomesticMarketPrice"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'domestic market price')
    //         },
    //         {
    //             id: "OpenDataRegionsProductPriceId",
    //             label: i18n.t("open_data.regions_product_price.code") + ' - ' + i18n.t("open_data.regions_product_price.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataRegionsProductPrice"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'regions product price')
    //         },
    //         {
    //             id: "OpenDataCompetitionPolicyId",
    //             label: i18n.t("open_data.competition_policy.code") + ' - ' + i18n.t("open_data.competition_policy.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataCompetitionPolicy"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'competition policy')
    //         },
    //         {
    //             id: "OpenDataDocumentEvaluationId",
    //             label: i18n.t("open_data.document_evaluation.code") + ' - ' + i18n.t("open_data.document_evaluation.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataDocumentEvaluation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'document evaluation')
    //         },
    //         {
    //             id: "OpenDataCompetitionLawReestrId",
    //             label: i18n.t("open_data.competition_law_reestr.code") + ' - ' + i18n.t("open_data.competition_law_reestr.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataCompetitionLawReestr"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'competition law reestr')
    //         },
    //         {
    //             id: "OpenDataComplianceListId",
    //             label: i18n.t("open_data.compliance_list.code") + ' - ' + i18n.t("open_data.compliance_list.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataComplianceList"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'compliance list')
    //         },
    //         {
    //             id: "OpenDataBrandAndFinanceReestrId",
    //             label: i18n.t("open_data.brand_and_finance_reestr.code") + ' - ' + i18n.t("open_data.brand_and_finance_reestr.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataBrandAndFinanceReestr"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'brand and finance reestr')
    //         },
    //         {
    //             id: "OpenDataAnalysisResultId",
    //             label: i18n.t("open_data.analysis_result.code") + ' - ' + i18n.t("open_data.analysis_result.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataAnalysisResult"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'analysis result')
    //         },
    //         {
    //             id: "OpenDataStockCompetitionLawId",
    //             label: i18n.t("open_data.stock_competition_law.code") + ' - ' + i18n.t("open_data.stock_competition_law.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataStockCompetitionLaw"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'stock competition law')
    //         },
    //         {
    //             id: "OpenDataProductPriceQuotationId",
    //             label: i18n.t("open_data.product_price_quotation.code") + ' - ' + i18n.t("open_data.product_price_quotation.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataProductPriceQuotation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'product price quotation')
    //         },
    //         {
    //             id: "OpenDataConsentTransactionId",
    //             label: i18n.t("open_data.consent_transaction.code") + ' - ' + i18n.t("open_data.consent_transaction.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataConsentTransaction"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'consent transaction')
    //         },
    //         {
    //             id: "OpenDataAreasAppealId",
    //             label: i18n.t("open_data.areas_appeal.code") + ' - ' + i18n.t("open_data.areas_appeal.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataAreasAppeal"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'areas appeal')
    //         },
    //         {
    //             id: "OpenDataConsumerRightReestrId",
    //             label: i18n.t("open_data.consumer_right_reestr.code") + ' - ' + i18n.t("open_data.consumer_right_reestr.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataConsumerRightReestr"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'consumer right reestr')
    //         },
    //         {
    //             id: "OpenDataNonCompliantBrandId",
    //             label: i18n.t("open_data.non_compliant_brand.code") + ' - ' + i18n.t("open_data.non_compliant_brand.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataNonCompliantBrand"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'non compliant brand')
    //         },
    //         {
    //             id: "OpenDataExplanationAndWarningId",
    //             label: i18n.t("open_data.explanation_and_warning.code") + ' - ' + i18n.t("open_data.explanation_and_warning.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataExplanationAndWarning"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'explanation and warning')
    //         },
    //         {
    //             id: "OpenDataPublicProcurementInformationId",
    //             label: i18n.t("open_data.public_procurement_information.code") + ' - ' + i18n.t("open_data.public_procurement_information.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataPublicProcurementInformation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'public procurement information')
    //         },
    //         {
    //             id: "OpenDataServiceCostId",
    //             label: i18n.t("open_data.service_cost.code") + ' - ' + i18n.t("open_data.service_cost.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataServiceCost"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'service cost')
    //         },
    //         {
    //             id: "OpenDataPropertyInformationId",
    //             label: i18n.t("open_data.property_information.code") + ' - ' + i18n.t("open_data.property_information.title"),
    //             icon: "mdi mdi-briefcase-edit",
    //             link: {name: "IndexOpenDataPropertyInformation"},
    //             parentId: "OpenDataMenuId",
    //             linkClass: "align-items-start",
    //             hasPerm: () => ability.can('list', 'property information')
    //         },
    //     ]
    // },
    // {
    //     id: "e-auction-info-id",
    //     label: i18n.t("submodules.integration.e_auction_info.title"),
    //     icon: "mdi mdi-briefcase-edit",
    //     link: {name: "IntegrationEAuctionInfoIndex"},
    //     parentId: "IntegrationMenuId",
    //     code: "integration",
    //     hasPerm: () => ability.can('view', 'e-auction-info')
    // },
    // {
    //     id: "customs-product-id",
    //     label: i18n.t("submodules.integration.customs_product.title"),
    //     icon: "mdi mdi-window-shutter-open",
    //     link: {name: "IntegrationCustomsProductIndex"},
    //     parentId: "IntegrationMenuId",
    //     code: "integration",
    //     hasPerm: () => ability.can('view', 'dbq-import-product-infos') ||
    //         ability.can('view', 'dbq-export-product-infos'),
    //     subItems: [
    //         {
    //             id: "customs-product-import-id",
    //             label: i18n.t("submodules.integration.customs_product.import"),
    //             icon: "mdi mdi-arrow-down",
    //             link: {name: "IntegrationCustomsProductImportIndex"},
    //             parentId: "IntegrationMenuId",
    //             hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
    //         },
    //         {
    //             id: "customs-product-export-id",
    //             label: i18n.t("submodules.integration.customs_product.export"),
    //             icon: "mdi mdi-arrow-up",
    //             link: {name: "IntegrationCustomsProductExportIndex"},
    //             parentId: "IntegrationMenuId",
    //             hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
    //         },
    //     ],
    // },
    // {
    //     id: "statistics-info-id",
    //     label: i18n.t("submodules.integration.statistics_info.menu_title"),
    //     icon: "mdi mdi-chart-bar",
    //     link: {name: "IntegrationStatisticsInfoIndex"},
    //     parentId: "IntegrationMenuId",
    //     code: "integration",
    //     hasPerm: () => ability.can('view', 'statistics')
    // },
    // {
    //     id: "price-stock-id",
    //     label: i18n.t("submodules.integration.price_stock.menu_title"),
    //     icon: "mdi mdi-window-shutter-open",
    //     link: {name: "IntegrationPriceStockIndex"},
    //     parentId: "IntegrationMenuId",
    //     code: "integration",
    //     hasPerm: () => ability.can('view', 'dbq-import-product-infos') || ability.can('view', 'dbq-export-product-infos'),
    //     subItems: [
    //         {
    //             id: "price-stock-realization-id",
    //             label: i18n.t("submodules.integration.price_stock.realization"),
    //             icon: "mdi mdi-reload",
    //             link: {name: "IntegrationPriceStockRealizationIndex"},
    //             parentId: "price-stock-id",
    //             // hasPerm: () => ability.can('view', 'price-stock')
    //         },
    //         {
    //             id: "price-stock-embedding-realization-id",
    //             label: i18n.t("submodules.integration.price_stock.embedding_realization"),
    //             icon: "mdi mdi-reload",
    //             link: {name: "IntegrationPriceStockEmbeddingRealizationIndex"},
    //             parentId: "price-stock-id",
    //             // hasPerm: () => ability.can('view', 'price-stock')
    //         },
    //     ],
    // },
    {
        id: "integration-menu-id",
        label: i18n.t("product_dashboard_info.menu_items.other_services"),
        link: {name: "IntegrationMenuIndex"},
        parentId: "IntegrationMenuId",
    },
    //     ]
];
