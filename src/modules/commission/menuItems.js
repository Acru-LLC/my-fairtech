import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        id: "commissionParentMenuId",
        label: i18n.t("submodules.application_before_commission.title"),
        icon: "mdi mdi-rename-box",
        subItems: [
            // Working with documents
            {
                id: "commission-0",
                label: i18n.t('submodules.doc.work_with_doc'),
                icon: "bx mdi mdi-file-document-multiple",
                link: {name: "workWithDocument"},
                parentId: "commissionParentMenuId",
                hasPerm: () => ability.can('view', 'passport-info')
            },
            // COMMISSION STRUCTURE
            /* {
                id: "commission-1",
                label: i18n.t('submodules.commission.title'),
                icon: "mdi mdi-rename-box",
                link: {name: "CommissionStructure"},
                parentId: "commissionParentMenuId",
                hasPerm: () => ability.can('view', 'passport-info')
            }, */
            // MONITORING ADVERTISEMENTS
            /* {
                id: "commission-2",
                label: i18n.t('submodules.commission.special_commission_type.title'),
                icon: "mdi mdi-account-multiple-plus",
                link: {name: "CommissionMembers"},
                parentId: "commissionParentMenuId"
            }, */
        ]
    }
];
