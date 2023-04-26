import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "referencesParentMenuId",
    label: i18n.t("submodules.references.title_plural"),
    icon: "mdi mdi-information",
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'advertisement-location-types') ||
      ability.can('view', 'advertisement-design-types') ||
      ability.can('view', 'advertisement-privilege-coefficients') ||
      ability.can('view', 'advertisement-design-types-by-region') ||
      ability.can('view', 'advertisement-sides') ||
      ability.can('view', 'advertisement-volume-types') ||
      ability.can('view', 'advertisement-volume-types-by-location-types') ||
      ability.can('view', 'advertisement-location-of-outdoors') ||
      ability.can('view', 'advertisement-groups') ||
      ability.can('view', 'advertisement-zones') ||
      ability.can('view', 'advertisement-object-states') ||
      ability.can('view', 'advertisement-types') ||
      ability.can('view', 'zone-coefficients') ||
      ability.can('view', 'minimum-collections') || ability.can('view', 'product-or-service-types') ||
      ability.can('view', 'product-or-services-estestveniy') ||
      ability.can('view', 'product-or-services-daminiriushiy') ||
      ability.can('view', 'oked') ||
      ability.can('view', 'skp') ||
      ability.can('view', 'tnved') ||
      ability.can('view', 'group-of-individuals') ||
      ability.can('view', 'date-types') ||
      ability.can('view', 'references-list-for-dynamic-report') ||
      ability.can('view', 'value-types') ||
      ability.can('view', 'process') ||
      ability.can('view', 'mailing-purpose') ||
      ability.can('view', 'commission-type-of-complainant') ||
      ability.can('view', 'commission-type-of-complaint') ||
      ability.can('view', 'commission-confirmation-document') ||
      ability.can('view', 'commission-special-commission') ||
      ability.can('view', 'commission-work-type') ||
      ability.can('view', 'commission-document-type') ||
      ability.can('view', 'commission-document-type') ||
      ability.can('view', 'commission-violation-scope') ||
      ability.can('view', 'commission-competition-law') ||
      ability.can('view', 'document-status') ||
      ability.can('view', 'reception-method') ||
      ability.can('view', 'appeal-type') ||
      ability.can('view', 'base-type') ||
      ability.can('view', 'statistic-report-measurement-unit') ||
      ability.can('view', 'statuses') ||
      ability.can('view', 'document-statuses') ||
      ability.can('view', 'department-permission-types') ||
      ability.can('view', 'units') ||
      ability.can('view', 'form-of-ownership') ||
      ability.can('view', 'positions') ||
      ability.can('view', 'department-types') ||
      ability.can('view', 'department-names') ||
      ability.can('view', 'contractor-statuses') ||
      ability.can('view', 'contractors') ||
      ability.can('view', 'notification-statuses') ||
      ability.can('view', 'group-regions') ||
      ability.can('view', 'product name') ||
      ability.can('view', 'region name') ||
      ability.can('view', 'products') ||
      ability.can('view', 'geo-region-quarters') ||
      ability.can('view', 'geo-region-streets') ||
      ability.can('view', 'geo-region-streets') ||
      ability.can('view', 'work-days'),
    subItems: [
      {
        id: "reference-1",
        label: i18n.t("submodules.advertisement.title"),
        icon: "mdi mdi-billboard",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'advertisement-location-types') ||
          ability.can('view', 'advertisement-design-types') ||
          ability.can('view', 'advertisement-privilege-coefficients') ||
          ability.can('view', 'advertisement-design-types-by-region') ||
          ability.can('view', 'advertisement-sides') ||
          ability.can('view', 'advertisement-volume-types') ||
          ability.can('view', 'advertisement-volume-types-by-location-types') ||
          ability.can('view', 'advertisement-location-of-outdoors') ||
          ability.can('view', 'advertisement-groups') ||
          ability.can('view', 'advertisement-zones') ||
          ability.can('view', 'advertisement-object-states') ||
          ability.can('view', 'advertisement-types') ||
          ability.can('view', 'zone-coefficients') ||
          ability.can('view', 'minimum-collections'),
        subItems: [
          {
            id: "reference-1-1",
            label: i18n.t("submodules.references.location_type"),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementLocationTypes" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-location-types')
          },
          {
            id: "reference-1-2-new",
            label: i18n.t("submodules.references.ad_design_type"),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementDesignTypes" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-design-types')
          },
          {
            id: "reference-1-2",
            label: i18n.t('column.coefficient'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementPrivilegeCoefficients" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-privilege-coefficients')
          },
          {
            id: "reference-1-3-new",
            label: i18n.t('submodules.ad_design_type_by_regions.title'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementDesignTypesByRegion" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-design-types-by-region')
          },
          {
            id: "reference-1-3",
            label: i18n.t('submodules.references.ad_sides'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementSides" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-sides')
          },
          {
            id: "reference-1-4-new",
            label: i18n.t('submodules.ad_volume_types.title'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementVolumeTypes" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-volume-types')
          },
          {
            id: "reference-1-4-new-1",
            label: i18n.t('submodules.ad_volume_types_by_location_type.title'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementVolumeTypesByLocationType" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-volume-types-by-location-types')
          },
          {
            id: "reference-location-of-outdoor",
            label: i18n.t('submodules.ad_volume_types_by_location_of_outdoor.title'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementLocationOfOutdoor" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-location-of-outdoors')
          },
          {
            id: "reference-1-4",
            label: i18n.t('submodules.references.ad_group'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementGroups" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-groups')
          },
          {
            id: "reference-1-5",
            label: i18n.t('submodules.references.ad_zones'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementZones" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-zones')
          },
          {
            id: "reference-1-6",
            label: i18n.t('submodules.references.ad_object_state'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementObjectStates" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-object-states')
          },
          {
            id: "reference-1-7",
            label: i18n.t('submodules.references.ad_type'),
            icon: "mdi mdi-checkbox-blank-circle",
            link: { name: "AdvertisementTypes" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'advertisement-types')
          },
          {
            id: "reference-1-8",
            label: i18n.t('submodules.references.zone_cofficients'),
            icon: "mdi mdi-format-section",
            link: { name: "ZoneCoefficients" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'zone-coefficients')
          },
          {
            id: "reference-1-9",
            label: i18n.t('submodules.references.minimum_collection'),
            icon: "mdi mdi-currency-usd",
            link: { name: "MinimumCollections" },
            parentId: "reference-1",
            hasPerm: () => ability.can('view', 'minimum-collections')
          },
        ]
      },
      // REESTR
      {
        id: "reestr-reference-id",
        label: i18n.t("submodules.reestr.title"),
        icon: "mdi mdi-clipboard-list",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'product-or-service-types') ||
          ability.can('view', 'product-or-services-estestveniy') ||
          ability.can('view', 'product-or-services-daminiriushiy') ||
          ability.can('view', 'oked') ||
          ability.can('view', 'skp') ||
          ability.can('view', 'tnved') ||
          ability.can('view', 'group-of-individuals'),
        subItems: [
          // PRODUCT_OR_SERVICE_TYPES
          {
            id: "product-or-service-types-id",
            label: i18n.t('submodules.product_or_service_types.title'),
            icon: "mdi mdi-format-list-bulleted-type",
            link: { name: "ProductOrServiceTypes" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'product-or-service-types')
          },
          // product_or_services_estestveniy
          {
            id: "product-or-services-estestveniy-id",
            label: i18n.t('submodules.product_or_services_estestveniy.title'),
            icon: "mdi mdi-tag-multiple",
            link: { name: "ProductOrServicesEstestveniy" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'product-or-services-estestveniy')
          },

          // product_or_services_daminiriushiy
          {
            id: "product-or-services-daminiriushiy-id",
            label: i18n.t('submodules.product_or_services_daminiriushiy.title'),
            icon: "mdi mdi-tag-multiple",
            link: { name: "ProductOrServicesDaminiriushiy" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'product-or-services-daminiriushiy')
          },

          // OKED
          {
            id: "oked-id",
            label: i18n.t('column.oked'),
            icon: "mdi mdi-information-variant",
            link: { name: "Oked" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'oked')
          },
          // SKP
          {
            id: "skp-id",
            label: i18n.t('column.skp_code'),
            icon: "mdi mdi-information-variant",
            link: { name: "Skp" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'skp')
          },
          // TNVED
          {
            id: "tnved-id",
            label: i18n.t('column.tnved_code'),
            icon: "mdi mdi-information-variant",
            link: { name: "Tnved" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'tnved')
          },
          // GROUP_OF_INDIVIDUALS
          {
            id: "group-of-individuals-id",
            label: i18n.t('column.group_of_individuals'),
            icon: "mdi mdi-account-group",
            link: { name: "GroupOfIndividuals" },
            parentId: "reestr-reference-id",
            hasPerm: () => ability.can('view', 'group-of-individuals')
          },
        ]
      },
      // REPORT
      {
        id: "report-id",
        label: i18n.t("reports"),
        icon: "mdi mdi-file-document-multiple",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'date-types') ||
          ability.can('view', 'references-list-for-dynamic-report') ||
          ability.can('view', 'value-types'),
        subItems: [
          // Date_TYPES
          {
            id: "date-types-id",
            label: i18n.t('dateTypes'),
            icon: "mdi mdi-timelapse",
            link: { name: "DateTypes" },
            parentId: "report-id",
            hasPerm: () => ability.can('view', 'date-types')
          },
          // REFERENCES_LIST
          {
            id: "references-list-id",
            label: i18n.t('submodules.references_list.title'),
            icon: "mdi mdi-information",
            link: { name: "ReferencesListForDynamicReport" },
            parentId: "report-id",
            hasPerm: () => ability.can('view', 'references-list-for-dynamic-report')
          },
          // VALUE_TYPES
          {
            id: "value-types-id",
            label: i18n.t('column.value_type'),
            icon: "mdi mdi-variable",
            link: { name: "ValueTypes" },
            parentId: "report-id",
            hasPerm: () => ability.can('view', 'value-types')
          },

        ]
      },
      // COMMISSION
      {
        id: "commission-reference-id",
        label: i18n.t("submodules.commission.title"),
        icon: "mdi mdi-rename-box",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'process') ||
          ability.can('view', 'mailing-purpose') ||
          ability.can('view', 'commission-type-of-complainant') ||
          ability.can('view', 'commission-type-of-complaint') ||
          ability.can('view', 'commission-confirmation-document') ||
          ability.can('view', 'commission-special-commission') ||
          ability.can('view', 'commission-work-type') ||
          ability.can('view', 'commission-document-type') ||
          ability.can('view', 'commission-document-type') ||
          ability.can('view', 'commission-violation-scope') ||
          ability.can('view', 'commission-competition-law') ||
          ability.can('view', 'document-status') ||
          ability.can('view', 'reception-method') ||
          ability.can('view', 'appeal-type') ||
          ability.can('view', 'base-type'),
        subItems: [
          // PROCESS
          {
            id: "process-id",
            label: i18n.t('submodules.process.title'),
            icon: "mdi mdi-file-settings",
            link: { name: "Process" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'process')
          },
          // MAILING_PURPOSE
          {
            id: "mailing-purpose-id",
            label: i18n.t('submodules.mailing_purpose.title'),
            icon: "mdi mdi-file-send",
            link: { name: "MailingPurpose" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'mailing-purpose')
          },
          // Complainant
          {
            id: "complainant-id",
            label: i18n.t('submodules.commission.complainant.title'),
            icon: "mdi mdi-account-multiple-remove",
            link: { name: "Complainant" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-type-of-complainant')
          },
          // Type of complaint
          {
            id: "type_of_complaint-id",
            label: i18n.t('submodules.commission.type_of_complaint.title'),
            icon: "mdi mdi-text-box-remove",
            link: { name: "typeOfComplaint" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-type-of-complaint')
          },
          // confirmation document
          {
            id: "confirmation-document-id",
            label: i18n.t('submodules.commission.confirmation_document.title'),
            icon: "mdi mdi-file-check",
            link: { name: "confirmationDocument" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-confirmation-document')
          },
          // special commission
          {
            id: "commission-structure-id",
            label: i18n.t('submodules.commission.special_commission.title'),
            icon: "mdi mdi-account-multiple-plus",
            link: { name: "specialCommission" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-special-commission')
          },
          // special commission type
          {
            id: "commission-type-id",
            label: i18n.t('submodules.commission.special_commission_type.title'),
            icon: "mdi mdi-checkbox-multiple-marked",
            link: { name: "specialCommissionType" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-work-type')
          },
          // work type
          {
            id: "work-type-id",
            label: i18n.t('submodules.commission.work_type.title'),
            icon: "mdi mdi-marker-check",
            link: { name: "workType" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-document-type')
          },
          // document type
          {
            id: "document-type-id",
            label: i18n.t('submodules.commission.document_type.title'),
            icon: "mdi mdi-file-check",
            link: { name: "documentType" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-document-type')
          },
          // scope of violation
          {
            id: "violation-scope-id",
            label: i18n.t('submodules.commission.scope_of_violation.title'),
            icon: "mdi mdi-apple-keyboard-command",
            link: { name: "scopeOfViolation" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-violation-scope')
          },
          // competition law article
          {
            id: "competition-law-id",
            label: i18n.t('submodules.commission.competition_law_article.title'),
            icon: "mdi mdi-shield-half-full",
            link: { name: "competitionLawArticle" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'commission-competition-law')
          },
          // document status
          {
            id: "commission-document-status-id",
            label: i18n.t('submodules.commission.document_status.title'),
            icon: "mdi mdi-file-document",
            link: { name: "CommissionDocumentStatus" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'document-status')
          },
          // reception method
          {
            id: "commission-reception-method-id",
            label: i18n.t('submodules.commission.reception_method.title'),
            icon: "mdi mdi-format-horizontal-align-center",
            link: { name: "ReceptionMethod" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'reception-method')
          },
          // appeal type
          {
            id: "commission-appeal-type-id",
            label: i18n.t('submodules.commission.appeal_type.title'),
            icon: "mdi mdi-source-fork",
            link: { name: "AppealType" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'appeal-type')
          },
          // base type
          {
            id: "commission-base-type-id",
            label: i18n.t('submodules.commission.base_type.title'),
            icon: "mdi mdi-hexagon-multiple",
            link: { name: "BaseType" },
            parentId: "commission-reference-id",
            hasPerm: () => ability.can('view', 'base-type')
          },
        ]
      },

      {
        id: "pk73-reference-id",
        label: i18n.t("submodules.pk73.reference_title"),
        icon: "mdi mdi-clipboard-list",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'statistic-report-measurement-unit'),
        subItems: [
          {
            id: "measurement_unit-id",
            label: i18n.t("submodules.measurement_unit.title"),
            icon: "mdi mdi-briefcase-edit",
            link: { name: "StatisticsReportMeasurementUnit" },
            parentId: "referencesParentMenuId",
            hasPerm: () => ability.can('view', 'statistic-report-measurement-unit')
          },
        ]
      },


      // PriceStock menus
      {
        id: "reference-price-stock",
        label: i18n.t("submodules.integration.price_stock.reference_menu"),
        icon: "mdi mdi-file-document-multiple",
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('list', 'product name') || ability.can('list', 'region name'),
        subItems: [
          // product name
          {
            id: "date-types-id",
            label: i18n.t('submodules.integration.price_stock.product_name_title'),
            icon: "mdi mdi-timelapse",
            link: { name: "ReferencesPriceStockProductNameIndex" },
            parentId: "report-id",
            hasPerm: () => ability.can('list', 'product name')
          },
          // region name
          {
            id: "references-list-id",
            label: i18n.t('submodules.integration.price_stock.region_name_title'),
            icon: "mdi mdi-information",
            link: { name: "ReferencesPriceStockRegionNameIndex" },
            parentId: "report-id",
            hasPerm: () => ability.can('list', 'region name')
          },
        ]
      },
      {
        id: "reference-product",
        label: i18n.t("submodules.product.menu_title"),
        icon: "mdi mdi-map-marker-multiple",
        link: { name: "ReferencesProductIndex" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('list', 'products')
      },

      // STATUS
      {
        id: "reference-2",
        label: i18n.t('column.status'),
        icon: "mdi mdi-list-status  ",
        link: { name: "Statuses" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'statuses')
      },
      // DOCUMENT_STATUS
      {
        id: "document-statuses-id",
        label: i18n.t('column.document_status'),
        icon: "mdi mdi-list-status",
        link: { name: "DocumentStatuses" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'document-statuses')
      },
      // Template sample menus
      {
        id: "references-template-sample",
        label: i18n.t('submodules.template_sample.title'),
        icon: "mdi mdi-information",
        link: { name: "ReferencesTemplateSampleIndex" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('list', 'template samples')
      },
      // DEPARTMENT_PERMISSION_TYPES
      {
        id: "reference-department-permission-types",
        label: i18n.t("submodules.department_permission_types.title"),
        icon: "mdi mdi-shield-check",
        link: { name: "DepartmentPermissionTypes" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'department-permission-types')
      },
      // UNITS
      {
        id: "reference-units",
        label: i18n.t('column.unit'),
        icon: "mdi mdi-tape-measure",
        link: { name: "Units" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'units')
      },

      // FORM_OF_OWNERSHIP
      {
        id: "reference-form-of-ownership",
        label: i18n.t('submodules.form_of_ownership.title'),
        icon: "mdi mdi-office-building",
        link: { name: "FormOfOwnership" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'form-of-ownership')
      },

      {
        id: "reference-3",
        label: i18n.t('column.position'),
        icon: "mdi mdi-briefcase-variant",
        link: { name: "Positions" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'positions')
      },
      {
        id: "reference-4",
        label: i18n.t('column.department_types'),
        icon: "mdi mdi-office-building",
        link: { name: "DepartmentTypes" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'department-types')
      },
      {
        id: "reference-5",
        label: i18n.t('column.department_names'),
        icon: "mdi mdi-office-building",
        link: { name: "DepartmentNames" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'department-names')
      },
      // CONTRACTOR_STATUS
      {
        id: "reference-9",
        label: i18n.t('column.contractors_status'),
        icon: "mdi mdi-briefcase-check",
        link: { name: "ContractorStatuses" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'contractor-statuses')
      },
      // CONTRACTORS
      {
        id: "reference-10",
        label: i18n.t("submodules.contractor.title"),
        icon: "mdi mdi-account-tie",
        link: { name: "Contractors" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'contractors')
      },
      // NOTIFICATION_STATUS
      {
        id: "notification-statuses",
        label: i18n.t("submodules.notification_statuses.title"),
        icon: "mdi mdi-briefcase-check",
        link: { name: "NotificationStatuses" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'notification-statuses')
      },

      // REGION_GROUPS
      {
        id: "reference-11",
        label: i18n.t("submodules.group_regions.title"),
        icon: "mdi mdi-map-marker-multiple",
        link: { name: "GroupRegions" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'group-regions')
      },
      // GEO_REGION_QUARTERS
      {
        id: "reference-12",
        label: i18n.t('column.quarter'),
        icon: "mdi mdi-home-map-marker",
        link: { name: "GeoRegionQuarters" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'geo-region-quarters')
      },
      // GEO_REGION_STREETS
      {
        id: "reference-13",
        label: i18n.t('column.street'),
        icon: "mdi mdi-road",
        link: { name: "GeoRegionStreets" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'geo-region-streets')
      },
      // GEO_REGIONS_14
      {
        id: "reference-14",
        label: i18n.t('submodules.region_14.title'),
        icon: "mdi mdi-city",
        link: { name: "GeoRegions14" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'geo-region-streets')
      },
      // WORK_DAYS
      {
        id: "reference-14",
        label: i18n.t('column.work_days'),
        icon: "mdi mdi-calendar-multiple-check",
        link: { name: "WorkDays" },
        parentId: "referencesParentMenuId",
        hasPerm: () => ability.can('view', 'work-days')
      },
    ]
  }
];
