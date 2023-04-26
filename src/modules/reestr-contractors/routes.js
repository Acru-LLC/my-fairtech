import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";
export default [
    {
        name: "ReestrContractors",
        path: "/reestr-contractors",
        redirect: "/reestr-contractors",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.reestr.title"),
            bcTo: { name: "ReestrContractors" }
        },
        children: [
            // NATURAL_REESTR_CONTRACTORS
            {
                name: "NaturalReestrContractors",
                path: "/reestr-contractors/natural",
                redirect: "/reestr-contractors/natural",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.reestr_contractors.natural_reestr_title"),
                    bcTo: { name: "NaturalReestrContractors" }
                },
                children: [
                    {
                        name: "NaturalReestrContractorsMain",
                        path: "",
                        component: () => import("@/modules/reestr-contractors/modules/natural/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'natural-monopoly-reestr')
                        }
                    },
                    {
                        name: "CreateNaturalContractorReestr",
                        path: "create",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdate"),
                        meta: {},
                    },
                    {
                        name: "UpdateNaturalContractorReestr",
                        path: "update/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdate"),
                        meta: {},
                    },
                    {
                        name: "CreateRemoveDocNaturalContractorReestr",
                        path: "remove",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdateRemoveDoc"),
                        meta: {},
                    },
                    {
                        name: "UpdateRemoveDocNaturalContractorReestr",
                        path: "update-remove/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdateRemoveDoc"),
                        meta: {},
                    },
                    {
                        name: "ReestrHistoryForContractorNatural",
                        path: "contractor-history/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/ReestrHistoryForContractor"),
                        meta: {},
                    },
                    {
                        name: "ReestrHistoryForRepublicContractorNatural",
                        path: "contractor-history-for-republic/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/ReestrHistoryForContractor"),
                        meta: {},
                    },
                ]
            },

            // DOMINANT_REESTR_CONTRACTORS
            {
                name: "DominantReestrContractors",
                path: "/reestr-contractors/dominant",
                redirect: "/reestr-contractors/dominant",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                    bcTo: { name: "DominantReestrContractors" }
                },
                children: [
                    {
                        name: "DominantReestrContractorsMain",
                        path: "",
                        component: () => import("@/modules/reestr-contractors/modules/natural/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'dominant-monopoly-reestr')
                        }
                    },
                    {
                        name: "CreateDominantContractorReestr",
                        path: "create",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdate"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                    {
                        name: "UpdateDominantContractorReestr",
                        path: "update/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdate"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                    {
                        name: "CreateRemoveDocDominantContractorReestr",
                        path: "remove",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdateRemoveDoc"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                    {
                        name: "UpdateRemoveDocDominantContractorReestr",
                        path: "update-remove/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/CreateOrUpdateRemoveDoc"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                    {
                        name: "ReestrHistoryForContractorDominant",
                        path: "contractor-history/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/ReestrHistoryForContractor"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                    {
                        name: "ReestrHistoryForRepublicContractorDominant",
                        path: "contractor-history-for-republic/:id",
                        component: () => import("@/modules/reestr-contractors/modules/natural/ReestrHistoryForContractor"),
                        meta: {
                            // bcLinkText: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
                            // bcTo: { name: "CreateDominantContractorReestr" }
                        },
                    },
                ]
            },
        ]
    }
]
