
import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [

    {
        id: "sendMessageMenuId",
        label: i18n.t("send_message.menu"),
        icon: "mdi mdi-message-text",
        code: "fair_tech",
        hasPerm: () => ability.can('view', 'send-message-to-phone-menu'),
        subItems: [
            {
                id: "sendMessageToUserMenuId",
                label: i18n.t("send_message.user"),
                icon: "mdi mdi-cellphone-message",
                link: {name: "SendMessageToPhoneUserIndex"},
                parentId: "sendMessageMenuId",
                hasPerm: () => ability.can('view', 'send-message-to-user-phone-menu')
            },
            {
                id: "sendMessageHistoryMenuId",
                label: i18n.t("send_message.history"),
                icon: "mdi mdi-view-list",
                link: {name: "SendMessageHistoryIndex"},
                parentId: "sendMessageMenuId",
                hasPerm: () => ability.can('view', 'send-message-history-menu')
            },
            {
                id: "regionMenuId",
                label: i18n.t("send_message.regions"),
                icon: "mdi mdi-map-marker-multiple",
                link: {name: "RegionalAdministrationsIndex"},
                parentId: "sendMessageMenuId",
                hasPerm: () => ability.can('view', 'send-message-regions')
            },
            {
                id: "phoneCodeMenuId",
                label: i18n.t("send_message.phone_code"),
                icon: "mdi mdi-phone-log-outline",
                link: {name: "PhoneCodeIndex"},
                parentId: "sendMessageMenuId",
                hasPerm: () => ability.can('view', 'send-message-phone-code')
            }
        ]
    }
]