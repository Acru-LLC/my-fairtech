import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'


export default [
    {
        name: 'SendMessage',
        path: '/sendMessage',
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'send-message-to-phone-menu'),
        },
        children: [
            {
                name: 'SendMessageToPhoneUserIndex',
                path: 'user',
                component: () => import('@/modules/sendMessageToPhone/sendMessage'),
                meta: {
                    bcTo: {name: "sendMessageMenuId"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'send-message-to-user-phone-menu')
                },
            },
            {
                name: 'SendMessageHistoryIndex',
                path: 'history',
                component: () => import('@/modules/sendMessageToPhone/messageHistory'),
                meta: {
                    bcTo: {name: "sendMessageMenuId"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'send-message-history-menu')
                },
            },
            {
                name: 'RegionalAdministrationsIndex',
                path: 'region',
                component: () => import('@/modules/sendMessageToPhone/regional_administrations/Index'),
                meta: {
                    bcTo: {name: "sendMessageMenuId"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'send-message-history-menu')
                },
            },
            {
                name: "CreateRegionalAdministrations",
                path: "create",
                component: () => import("@/modules/sendMessageToPhone/regional_administrations/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t( "submodules.department_type.title"),
                    bcTo: {name: "CreateRegionalAdministrations"}
                },
            },
            {
                name: "UpdateRegionalAdministrations",
                path: "update/:id",
                component: () => import("@/modules/sendMessageToPhone/regional_administrations/CreateOrUpdate"),
                meta: {
                    bcDynamic: true,
                    paramName: 'id',
                    // bcStateVarAndModuleName: {
                    //     stateVar: 'currentItem',
                    //     moduleName: 'refDepartmentType',
                    //     stateVarKey: 'name'
                    // },
                    bcLinkText: i18n.t( "submodules.department_type.title")
                },
            },
            {
                name: 'PhoneCodeIndex',
                path: 'phoneCode',
                component: () => import('@/modules/sendMessageToPhone/phone_code/Index'),
                meta: {
                    bcTo: {name: "sendMessageMenuId"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'send-message-history-menu')
                },
            },
            {
                name: "CreatePhoneCode",
                path: "phoneCode-create",
                component: () => import("@/modules/sendMessageToPhone/phone_code/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t( "submodules.department_type.title"),
                    bcTo: {name: "CreatePhoneCode"}
                },
            },
            {
                name: "UpdatePhoneCode",
                path: "phoneCode-update/:id",
                component: () => import("@/modules/sendMessageToPhone/phone_code/CreateOrUpdate"),
                meta: {
                    bcDynamic: true,
                    paramName: 'id',
                    // bcStateVarAndModuleName: {
                    //     stateVar: 'currentItem',
                    //     moduleName: 'refDepartmentType',
                    //     stateVarKey: 'name'
                    // },
                    bcLinkText: i18n.t( "submodules.department_type.title")
                },
            },

        ]
    }
]