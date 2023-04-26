import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [

    {
        id: "wordTemplatesMenuId",
        label: i18n.t("word_templates.menu_title"),
        icon: "mdi mdi-email-edit",
        code: "fair_tech",
        hasPerm: () => ability.can('view', 'word-template'),
        subItems: [
            {
                id: "WordTemplateSampleMainId",
                label: i18n.t("word_templates.example_document"),
                icon: "mdi mdi-microsoft-word",
                link: {name: "WordTemplateSampleMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-sample'),
            },
            {
                id: "WordTemplateSampleListMainId",
                label: i18n.t("word_templates.template_list"),
                icon: "mdi mdi-folder-text",
                link: {name: "WordTemplateSampleListMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-sample-list'),
            },
            {
                id: "WordTemplatesMenuId",
                label: i18n.t("word_templates.templates"),
                icon: "mdi mdi-folder-multiple",
                link: {name: "WordTemplatesMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-menu'),
            },
            {
                id: "WordTemplatesCategoriesMenuId",
                label: i18n.t("word_templates.categories"),
                icon: "mdi mdi-clipboard-list",
                link: {name: "WordTemplateCategoriesMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-categories'),
            },
            {
                id: "organizationsMenuId",
                label: i18n.t("word_templates.organizations"),
                icon: "mdi mdi-city",
                link: {name: "WordTemplateOrganizationsMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-organization'),
            },

            {
                id: "WordTemplatesHeaderMenuId",
                label: i18n.t("word_templates.template_header_name"),
                icon: "mdi mdi-script-text-outline",
                link: {name: "WordTemplateHeaderMain"},
                parentId: "wordTemplatesMenuId",
                hasPerm: () => ability.can('view', 'word-template-header'),
            }
        ]
    }
]