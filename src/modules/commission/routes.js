import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Commission",
        path: "/commission",
        redirect: "/commission",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t( "submodules.commission.title" ),
            bcTo: {name: "Commission"}
        },
        children: [
            // Commission
            {
                name: "workWithDocument",
                path: "/commission/work-with-document",
                redirect: "/commission/work-with-document",
                component: {
                    render(c) {
                        return c( 'router-view' )
                    }
                },
                meta: {
                    bcLinkText: i18n.t( 'submodules.doc.work_with_doc' ),
                    bcTo: {name: "workWithDocument"}
                },
                children: [
                    {
                        name: "workWithDocument",
                        path: "",
                        component: () => import("@/modules/commission/create/Index"),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "CreateApplicationByLegal",
                        path: "create-by-legal",
                        component: () => import("@/modules/commission/create/CreateOrUpdateLegal"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.doc.work_with_doc' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "CreateApplicationByPhysical",
                        path: "create-by-physical",
                        component: () => import("@/modules/commission/create/CreateOrUpdatePhysical"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.doc.work_with_doc' ),
                            bcTo: {name: "CreateApplicationByPhysical"}
                        },
                    },
                    {
                        name: "CreateApplicationByDirector",
                        path: "create-by-director",
                        component: () => import("@/modules/commission/create/CreateOrUpdateDirector"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.doc.work_with_doc' ),
                            bcTo: {name: "CreateApplicationByDirector"}
                        },
                    },
                    {
                        name: "UpdateworkWithDocument",
                        path: "update/:id",
                        component: () => import("@/modules/commission/create/CreateOrUpdateLegal"),
                        meta: {
                            bcDynamic: true,
                            paramName: 'id',
                            bcStateVarAndModuleName: {
                                stateVar: 'currentItem',
                                moduleName: 'workWithDocument',
                                stateVarKey: 'name'
                            },
                            bcLinkText: i18n.t( 'submodules.commission.commission_members.title' ),
                        },
                    },
                ]
            },
        ]
    },
    {
        name: 'Office-DOCUMENT-commission',
        path: '/docs/office',
        meta: { authRequired: true },
        component: () => import('@/modules/letter/office')
    },

]
