import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    // {
        // id: "pharmParentMenuId",
        // label: i18n.t("pharm.menu_title"),
        // icon: "mdi mdi-hospital-box",
        // code: "pharm_info",
        // // hasPerm: () => ability.can('view', 'projects') ,
        // subItems: [
            //PHARM - MONITOR
            {
                id: "pharm-monitor",
                label: i18n.t('pharm.received_applications'),
                icon: "mdi mdi-file-document-multiple",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "PharmMonitor"},
                parentId: "pharmParentMenuId",
                code: "pharm_info",
                hasPerm: () => ability.can('view', 'pharm-monitor')
            },
            //PHARM - MONITOR - CREATED
            {
                id: "pharm-monitor-created",
                label: i18n.t('pharm.region_attachched'),
                icon: "mdi mdi-file-document-multiple",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "PharmMonitorCreated"},
                parentId: "pharmParentMenuId",
                code: "pharm_info",
                hasPerm: () => ability.can('view', 'pharm-monitor-created')
            },
            //PHARM - WORK WITH DOCUMENT
            {
                id: "pharm-work-with-document",
                label: i18n.t('pharm.menu_work_with_document'),
                icon: "mdi mdi-file-document-multiple",
                code: "pharm_info",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "AppealWork"},
                parentId: "pharmParentMenuId",
                hasPerm: () => ability.can('view', 'pharm-appeal-work')
            },
            //PHARM - PHARMACY LIST
            {
                id: "pharm-pharmacy-list",
                label: i18n.t('pharm.menu_pharmacy_list'),
                icon: "mdi mdi-file-document-multiple",
                code: "pharm_info",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "PharmStart2"},
                parentId: "pharmParentMenuId",
                hasPerm: () => ability.can('view', 'pharm-pharmacy-list')
            },
            //PHARM - SEND MESSAGE
            {
                id: "pharm-send-message",
                label: i18n.t('pharm.menu_send_message'),
                icon: "mdi mdi-file-document-multiple",
                code: "pharm_info",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "PharmStart3"},
                parentId: "pharmParentMenuId",
                hasPerm: () => ability.can('view', 'pharm-send-message')
            },
            //PHARM - Template
            {
                id: "pharm-template",
                label: i18n.t('pharm.template'),
                icon: "mdi mdi-file-document-multiple",
                code: "pharm_info",
                // badge: {
                //     component: () => MenuBadgeComponent,
                //     params: 'monitor',
                //     variant: 'success',
                // },
                link: {name: "PharmTemplate"},
                parentId: "pharmParentMenuId",
                hasPerm: () => ability.can('view', 'pharm-template')
            },
    //     ]
    // }
];