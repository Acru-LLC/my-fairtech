import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [{
    name: "Reports",
    path: "/report",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
        bcLinkText: i18n.t( "submodules.reports.title_plural" ),
        bcTo: {name: "Reports"}
    },
    children:
        [
            {
                path: '/report/organizitional/create/:id',
                name: 'vueReportFromQRcode',
                component: () => import('@/modules/report/organizitional/components/vueReportFromQRcode'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/organizitional/income/:id',
                name: 'vueReportFromQRcode',
                component: () => import('@/modules/report/organizitional/components/vueReportFromQRcode'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/organizitional/sent/:id',
                name: 'vueReportFromQRcode',
                component: () => import('@/modules/report/organizitional/components/vueReportFromQRcode'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/columns',
                name: 'ReportColumns',
                component: () => import('@/modules/report/columns/report-columns'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-columns' )
                }
            },
            {
                path: '/report/rows',
                name: 'ReportRows',
                component: () => import('@/modules/report/rows/report-rows'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-rows' )
                }
            },
            {
                path: '/report/roles',
                name: 'ReportRoles',
                component: () => import('@/modules/report/roles/roles'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/templates',
                name: 'ReportTemplates',
                component: () => import('@/modules/report/templates/templates'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-templates' )
                }
            },

            {
                path: '/report/templates/create',
                name: 'ReportCreateTemplates',
                component: () => import('@/modules/report/templates/create-template'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/templates/:id',
                name: 'ReportViewTemplates',
                component: () => import('@/modules/report/templates/view-template'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/templates/:id/:staticReportName',
                name: 'ReportViewTemplates',
                component: () => import('@/modules/report/templates/view-template'),
                meta: {
                    authRequired: true,
                }
            },
            {
                path: '/report/organizitional/create',
                name: 'OrganizationalReportCreate',
                component: () => import('@/modules/report/organizitional/create'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-organisational' )
                }
            },

            {
                path: '/report/organizitional/income',
                name: 'OrganizitionalReportIncome',
                component: () => import('@/modules/report/organizitional/income'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-income' )
                }
            },

            {
                path: '/report/organizitional/sent',
                name: 'OrganizitionalReportSent',
                component: () => import('@/modules/report/organizitional/sent'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-sent' )
                }
            },

            {
                path: '/report/organizitional/gathered',
                name: 'OrganizitionalReportGathered',
                component: () => import('@/modules/report/organizitional/gathered'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-gathered' )
                }
            },

            {
                path: '/report/organizitional/for-petrol-prices',
                name: 'OrganizitionalReportGatheredForPetrolPrices',
                component: () => import('@/modules/report/organizitional/gatheredForPetrolPrices'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-gathered' )
                }
            },
            {
                path: '/report/collection/assemble',
                name: 'ReportCollectionAssemble',
                component: () => import('@/modules/report/collection/assemble/index'),
                meta: {
                    authRequired: true,
                    hasPerm: () => ability.can( 'view', 'report-gathered' )
                }
            },

            // {
            //     path: '/report/organizitional/insert/:id',
            //     name: 'OrganizitionalReportInsert',
            //     component: () => import('@/modules/report/organizitional/insert/insert'),
            //     meta: {
            //         authRequired: true,
            //     }
            // },

            // {
            //     path: '/report/organizitional/view/:id',
            //     name: 'OrganizitionalReportView',
            //     component: () => import('@/modules/report/organizitional/view/view'),
            //     meta: {
            //         authRequired: true,
            //     }
            // },


        ]
}]
