import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'


export default [
    {
        name: "WordTemplate",
        path: "/word-template",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'word-templates-menu'),
        },
        children: [
            {
                name: "WordTemplateOrganizationsMain",
                path: "organizations",
                component: () => import("@/modules/wordTemplates/organizations/Index"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
            {
                name: "CreateOrganizations",
                path: "create",
                component: () => import("@/modules/wordTemplates/organizations/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t('column.document_status'),
                    bcTo: {name: "CreateOrganizations"}
                },
            },
            {
                name: "UpdateOrganizations",
                path: "update/:id",
                component: () => import("@/modules/wordTemplates/organizations/CreateOrUpdate"),
                meta: {},
            },


            // TEMPLATES

            {
                name: "WordTemplatesMain",
                path: "templates",
                component: () => import("@/modules/wordTemplates/templates/Index"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
            {
                name: "CreateTemplates",
                path: "templates/create",
                component: () => import("@/modules/wordTemplates/templates/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t('column.document_status'),
                    bcTo: {name: "CreateOrganizations"}
                },
            },
            {
                name: "UpdateTemplates",
                path: "templates/update/:id",
                component: () => import("@/modules/wordTemplates/templates/CreateOrUpdate"),
                meta: {},
            },
            {
                name: "SeeTemplates",
                path: "templates/see/:id",
                component: () => import("@/modules/wordTemplates/templates/SeeForm"),
                meta: {},
            },

            // TEMPLATE CATEGORY

            {
                name: "WordTemplateCategoriesMain",
                path: "categories",
                component: () => import("@/modules/wordTemplates/templateCategory/Index"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
            {
                name: "CreateTemplateCategories",
                path: "categories/create",
                component: () => import("@/modules/wordTemplates/templateCategory/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t('column.document_status'),
                    bcTo: {name: "CreateOrganizations"}
                },
            },
            {
                name: "UpdateTemplateCategories",
                path: "categories/update/:id",
                component: () => import("@/modules/wordTemplates/templateCategory/CreateOrUpdate"),
                meta: {},
            },
            // TEMPLATE HEADER
            {
                name: "WordTemplateHeaderMain",
                path: "header",
                component: () => import("@/modules/wordTemplates/templateHeader/Index"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
            {
                name: "CreateTemplateHeader",
                path: "header/create",
                component: () => import("@/modules/wordTemplates/templateHeader/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t('column.document_status'),
                    bcTo: {name: "CreateOrganizations"}
                },
            },
            {
                name: "UpdateTemplateHeader",
                path: "header/update/:id",
                component: () => import("@/modules/wordTemplates/templateHeader/CreateOrUpdate"),
                meta: {},
            },
            // TEMPLATE CATEGORY
            {
                name: "WordTemplateSampleMain",
                path: "sample",
                component: () => import("@/modules/wordTemplates/sample/Index"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
            // TEMPLATE List
            {
                name: "WordTemplateSampleListMain",
                path: "sampleList",
                component: () => import("@/modules/wordTemplates/sample/List"),
                meta: {
                    // hasPerm: () => ability.can('view', 'word-templates-organizations')
                }
            },
        ]
    },
]