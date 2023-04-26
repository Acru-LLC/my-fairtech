import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "OpenData",
        path: "open-data",
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            bcLinkText: i18n.t("open_data.title"),
            bcTo: {name: "Open data"}
        },
        children:
            [
                {
                    name: "OpenDataAdvertisingLawViolation",
                    path: "advertising-law-violation",
                    redirect: "/open-data/advertising-law-violation",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.advertising_law_violation.title'),
                        bcTo: {name: "OpenDataAdvertisingLawViolation"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataAdvertisingLawViolation",
                            path: "",
                            component: () => import("./modules/advertising-law-violation/Index"),
                            meta: {
                                hasPerm: () => ability.can('list', 'advertising law violation')
                            }
                        },
                        {
                            name: "CreateOpenDataAdvertisingLawViolation",
                            path: "create",
                            component: () => import("./modules/advertising-law-violation/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.advertising_law_violation.title'),
                                hasPerm: () => ability.can('list', 'advertising law violation')
                            },
                        },
                        {
                            name: "UpdateOpenDataAdvertisingLawViolation",
                            path: "update/:id",
                            component: () => import("./modules/advertising-law-violation/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                bcLinkText: i18n.t('open_data.advertising_law_violation.title'),
                                hasPerm: () => ability.can('list', 'advertising law violation'),
                            },
                        },
                        {
                            name: "ViewOpenDataAdvertisingLawViolation",
                            path: "view/:id",
                            component: () => import("./modules/advertising-law-violation/View"),
                            meta: {
                                hasPerm: () => ability.can('get', 'advertising law violation')
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataAnalysisResult",
                    path: "analysis-result",
                    redirect: "/open-data/analysis-result",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.analysis_result.title'),
                        bcTo: {name: "OpenDataAnalysisResult"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataAnalysisResult",
                            path: "",
                            component: () => import("./modules/analysis-result/Index"),
                            meta: {
                                hasPerm: () => ability.can('list', 'analysis result')
                            }
                        },
                        {
                            name: "CreateOpenDataAnalysisResult",
                            path: "create",
                            component: () => import("./modules/analysis-result/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.analysis_result.title'),
                                hasPerm: () => ability.can('list', 'analysis result'),
                            },
                        },
                        {
                            name: "UpdateOpenDataAnalysisResult",
                            path: "update/:id",
                            component: () => import("./modules/analysis-result/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                bcLinkText: i18n.t('open_data.analysis_result.title'),
                                hasPerm: () => ability.can('list', 'analysis result'),
                            },
                        },
                        {
                            name: "ViewOpenDataAnalysisResult",
                            path: "view/:id",
                            component: () => import("./modules/analysis-result/View"),
                            meta: {
                                hasPerm: () => ability.can('get', 'analysis result')
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataAppealsConsideration",
                    path: "appeals-consideration",
                    redirect: "/open-data/appeals-consideration",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.appeals_consideration.title'),
                        bcTo: {name: "OpenDataAppealsConsideration"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataAppealsConsideration",
                            path: "",
                            component: () => import("./modules/appeals-consideration/Index"),
                            meta: {
                                hasPerm: () => ability.can('list', 'appeals consideration'),
                            },
                        },
                        {
                            name: "CreateOpenDataAppealsConsideration",
                            path: "create",
                            component: () => import("./modules/appeals-consideration/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.appeals_consideration.title'),
                                hasPerm: () => ability.can('list', 'appeals consideration'),
                            },
                        },
                        {
                            name: "UpdateOpenDataAppealsConsideration",
                            path: "update/:id",
                            component: () => import("./modules/appeals-consideration/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                bcLinkText: i18n.t('open_data.appeals_consideration.title'),
                                hasPerm: () => ability.can('list', 'appeals consideration'),
                            },
                        },
                        {
                            name: "ViewOpenDataAppealsConsideration",
                            path: "view/:id",
                            component: () => import("./modules/appeals-consideration/View"),
                            meta: {
                                hasPerm: () => ability.can('get', 'appeals consideration')
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataAreasAppeal",
                    path: "areas-appeal",
                    redirect: "/open-data/areas-appeal",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.areas_appeal.title'),
                        bcTo: {name: "OpenDataAreasAppeal"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataAreasAppeal",
                            path: "",
                            component: () => import("./modules/areas-appeal/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'areas appeal' )
                            }
                        },
                        {
                            name: "CreateOpenDataAreasAppeal",
                            path: "create",
                            component: () => import("./modules/areas-appeal/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.areas_appeal.title'),
                                hasPerm: () => ability.can( 'list', 'areas appeal' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataAreasAppeal",
                            path: "update/:id",
                            component: () => import("./modules/areas-appeal/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'areas appeal' ),
                                bcLinkText: i18n.t('open_data.areas_appeal.title')
                            },
                        },
                        {
                            name: "ViewOpenDataAreasAppeal",
                            path: "view/:id",
                            component: () => import("./modules/areas-appeal/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'areas appeal' ),
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataBrandAndFinanceReestr",
                    path: "brand-and-finance-reestr",
                    redirect: "/open-data/brand-and-finance-reestr",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.brand_and_finance_reestr.title'),
                        bcTo: {name: "OpenDataBrandAndFinanceReestr"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataBrandAndFinanceReestr",
                            path: "",
                            component: () => import("./modules/brand-and-finance-reestr/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'brand and finance reestr' ),
                            }
                        },
                        {
                            name: "ViewOpenDataBrandAndFinanceReestr",
                            path: "view/:id",
                            component: () => import("./modules/brand-and-finance-reestr/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'brand and finance reestr' ),
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataCompetitionLawReestr",
                    path: "competition-law-reestr",
                    redirect: "/open-data/competition-law-reestr",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.competition_law_reestr.title'),
                        bcTo: {name: "OpenDataCompetitionLawReestr"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataCompetitionLawReestr",
                            path: "",
                            component: () => import("./modules/competition-law-reestr/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'competition law reestr' ),
                            }
                        },
                        {
                            name: "CreateOpenDataCompetitionLawReestr",
                            path: "create",
                            component: () => import("./modules/competition-law-reestr/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.competition_law_reestr.title'),
                                hasPerm: () => ability.can( 'list', 'competition law reestr' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataCompetitionLawReestr",
                            path: "update/:id",
                            component: () => import("./modules/competition-law-reestr/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'competition law reestr' ),
                                bcLinkText: i18n.t('open_data.competition_law_reestr.title')
                            },
                        },
                        {
                            name: "ViewOpenDataCompetitionLawReestr",
                            path: "view/:id",
                            component: () => import("./modules/competition-law-reestr/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'competition law reestr' ),
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataCompetitionPolicy",
                    path: "competition-policy",
                    redirect: "/open-data/competition-policy",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.competition_policy.title'),
                        bcTo: {name: "OpenDataCompetitionPolicy"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataCompetitionPolicy",
                            path: "",
                            component: () => import("./modules/competition-policy/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'competition policy' ),
                            }
                        },
                        {
                            name: "CreateOpenDataCompetitionPolicy",
                            path: "create",
                            component: () => import("./modules/competition-policy/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.competition_policy.title'),
                                hasPerm: () => ability.can( 'list', 'competition policy' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataCompetitionPolicy",
                            path: "update/:id",
                            component: () => import("./modules/competition-policy/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'competition policy' ),
                                bcLinkText: i18n.t('open_data.competition_policy.title')
                            },
                        },
                        {
                            name: "ViewOpenDataCompetitionPolicy",
                            path: "view/:id",
                            component: () => import("./modules/competition-policy/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'competition policy' ),
                            }
                        },
                    ]
                },
                {
                    name: "OpenDataComplianceList",
                    path: "compliance-list",
                    redirect: "/open-data/compliance-list",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.compliance_list.title'),
                        bcTo: {name: "OpenDataComplianceList"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataComplianceList",
                            path: "",
                            component: () => import("./modules/compliance-list/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'compliance list' ),
                            }
                        },
                        {
                            name: "CreateOpenDataComplianceList",
                            path: "create",
                            component: () => import("./modules/compliance-list/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.compliance_list.title'),
                                hasPerm: () => ability.can( 'list', 'compliance list' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataComplianceList",
                            path: "update/:id",
                            component: () => import("./modules/compliance-list/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'compliance list' ),
                                bcLinkText: i18n.t('open_data.compliance_list.title')
                            },
                        },
                        {
                            name: "ViewOpenDataComplianceList",
                            path: "view/:id",
                            component: () => import("./modules/compliance-list/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'compliance list' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataConsentTransaction",
                    path: "consent-transaction",
                    redirect: "/open-data/consent-transaction",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.consent_transaction.title'),
                        bcTo: {name: "OpenDataConsentTransaction"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataConsentTransaction",
                            path: "",
                            component: () => import("./modules/consent-transaction/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'consent transaction' )
                            }
                        },
                        {
                            name: "CreateOpenDataConsentTransaction",
                            path: "create",
                            component: () => import("./modules/consent-transaction/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.consent_transaction.title'),
                                hasPerm: () => ability.can( 'list', 'consent transaction' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataConsentTransaction",
                            path: "update/:id",
                            component: () => import("./modules/consent-transaction/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'consent transaction' ),
                                bcLinkText: i18n.t('open_data.consent_transaction.title')
                            },
                        },
                        {
                            name: "ViewOpenDataConsentTransaction",
                            path: "view/:id",
                            component: () => import("./modules/consent-transaction/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'consent transaction' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataConsumerRightReestr",
                    path: "consumer-right-reestr",
                    redirect: "/open-data/consumer-right-reestr",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.consumer_right_reestr.title'),
                        bcTo: {name: "OpenDataConsumerRightReestr"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataConsumerRightReestr",
                            path: "",
                            component: () => import("./modules/consumer-right-reestr/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'consumer right reestr' ),
                            }
                        },
                        {
                            name: "CreateOpenDataConsumerRightReestr",
                            path: "create",
                            component: () => import("./modules/consumer-right-reestr/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.consumer_right_reestr.title'),
                                hasPerm: () => ability.can( 'list', 'consumer right reestr' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataConsumerRightReestr",
                            path: "update/:id",
                            component: () => import("./modules/consumer-right-reestr/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'consumer right reestr' ),
                                bcLinkText: i18n.t('open_data.consumer_right_reestr.title')
                            },
                        },
                        {
                            name: "ViewOpenDataConsumerRightReestr",
                            path: "view/:id",
                            component: () => import("./modules/consumer-right-reestr/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'consumer right reestr' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataDocumentEvaluation",
                    path: "document-evaluation",
                    redirect: "/open-data/document-evaluation",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.document_evaluation.title'),
                        hasPerm: () => ability.can( 'list', 'document evaluation' ),
                        bcTo: {name: "OpenDataDocumentEvaluation"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataDocumentEvaluation",
                            path: "",
                            component: () => import("./modules/document-evaluation/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'document evaluation' )
                            }
                        },
                        {
                            name: "CreateOpenDataDocumentEvaluation",
                            path: "create",
                            component: () => import("./modules/document-evaluation/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.document_evaluation.title'),
                                hasPerm: () => ability.can( 'list', 'document evaluation' )
                            },
                        },
                        {
                            name: "UpdateOpenDataDocumentEvaluation",
                            path: "update/:id",
                            component: () => import("./modules/document-evaluation/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'document evaluation' ),
                                bcLinkText: i18n.t('open_data.document_evaluation.title')
                            },
                        },
                        {
                            name: "ViewOpenDataDocumentEvaluation",
                            path: "view/:id",
                            component: () => import("./modules/document-evaluation/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'document evaluation' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataDomesticMarketPrice",
                    path: "domestic-market-price",
                    redirect: "/open-data/domestic-market-price",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.domestic_market_price.title'),
                        bcTo: {name: "OpenDataDomesticMarketPrice"}
                    },
                    children: [
                        {
                            name: "IndexOpenDataDomesticMarketPrice",
                            path: "",
                            component: () => import("./modules/domestic-market-price/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'domestic market price' )
                            }
                        },
                        {
                            name: "CreateOpenDataDomesticMarketPrice",
                            path: "create",
                            component: () => import("./modules/domestic-market-price/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.domestic_market_price.title'),
                                hasPerm: () => ability.can( 'list', 'domestic market price' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataDomesticMarketPrice",
                            path: "update/:id",
                            component: () => import("./modules/domestic-market-price/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'domestic market price' ),
                                bcLinkText: i18n.t('open_data.domestic_market_price.title')
                            },
                        },
                        {
                            name: "ViewOpenDataDomesticMarketPrice",
                            path: "view/:id",
                            component: () => import("./modules/domestic-market-price/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'domestic market price' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataEnterprisesDominantPositionPrice",
                    path: "enterprises-dominant-position",
                    redirect: "/open-data/enterprises-dominant-position",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.enterprises_dominant_position.title'),
                        bcTo: {name: "OpenDataEnterprisesDominantPositionPrice"},
                        hasPerm: () => ability.can( 'list', 'enterprises dominant position' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataEnterprisesDominantPosition",
                            path: "",
                            component: () => import("./modules/enterprises-dominant-position/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'enterprises dominant position' ),
                            }
                        },
                        {
                            name: "CreateOpenDataEnterprisesDominantPosition",
                            path: "create",
                            component: () => import("./modules/enterprises-dominant-position/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.enterprises_dominant_position.title'),
                                hasPerm: () => ability.can( 'list', 'enterprises dominant position' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataEnterprisesDominantPosition",
                            path: "update/:id",
                            component: () => import("./modules/enterprises-dominant-position/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'enterprises dominant position' ),
                                bcLinkText: i18n.t('open_data.enterprises_dominant_position.title')
                            },
                        },
                        {
                            name: "ViewOpenDataEnterprisesDominantPosition",
                            path: "view/:id",
                            component: () => import("./modules/enterprises-dominant-position/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'enterprises dominant position' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataEntitiesViolateCompetition",
                    path: "entities-violate-competition",
                    redirect: "/open-data/entities-violate-competition",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.entities_violate_competition.title'),
                        bcTo: {name: "OpenDataEntitiesViolateCompetition"},
                        hasPerm: () => ability.can( 'list', 'entities violate competition' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataEntitiesViolateCompetition",
                            path: "",
                            component: () => import("./modules/entities-violate-competition/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'entities violate competition' ),
                            }
                        },
                        {
                            name: "CreateOpenDataEntitiesViolateCompetition",
                            path: "create",
                            component: () => import("./modules/entities-violate-competition/CreateOrUpdate"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'entities violate competition' ),
                                bcLinkText: i18n.t('open_data.entities_violate_competition.title'),
                            },
                        },
                        {
                            name: "UpdateOpenDataEntitiesViolateCompetition",
                            path: "update/:id",
                            component: () => import("./modules/entities-violate-competition/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'entities violate competition' ),
                                bcLinkText: i18n.t('open_data.entities_violate_competition.title')
                            },
                        },
                        {
                            name: "ViewOpenDataEntitiesViolateCompetition",
                            path: "view/:id",
                            component: () => import("./modules/entities-violate-competition/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'entities violate competition' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataExplanationAndWarning",
                    path: "explanation-and-warning",
                    redirect: "/open-data/explanation-and-warning",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.explanation_and_warning.title'),
                        bcTo: {name: "OpenDataExplanationAndWarning"},
                        hasPerm: () => ability.can( 'list', 'explanation and warning' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataExplanationAndWarning",
                            path: "",
                            component: () => import("./modules/explanation-and-warning/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'explanation and warning' ),
                            }
                        },
                        {
                            name: "CreateOpenDataExplanationAndWarning",
                            path: "create",
                            component: () => import("./modules/explanation-and-warning/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.explanation_and_warning.title'),
                                hasPerm: () => ability.can( 'list', 'explanation and warning' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataExplanationAndWarning",
                            path: "update/:id",
                            component: () => import("./modules/explanation-and-warning/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'explanation and warning' ),
                                bcLinkText: i18n.t('open_data.explanation_and_warning.title')
                            },
                        },
                        {
                            name: "ViewOpenDataExplanationAndWarning",
                            path: "view/:id",
                            component: () => import("./modules/explanation-and-warning/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'explanation and warning' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataManagementInformation",
                    path: "management-information",
                    redirect: "/open-data/management-information",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.management_information.title'),
                        bcTo: {name: "OpenDataManagementInformation"},
                        hasPerm: () => ability.can( 'list', 'management information' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataManagementInformation",
                            path: "",
                            component: () => import("./modules/management-information/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'management information' ),
                            }
                        },
                        {
                            name: "CreateOpenDataManagementInformation",
                            path: "create",
                            component: () => import("./modules/management-information/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.management_information.title'),
                            },
                        },
                        {
                            name: "UpdateOpenDataManagementInformation",
                            path: "update/:id",
                            component: () => import("./modules/management-information/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'management information' ),
                                bcLinkText: i18n.t('open_data.management_information.title')
                            },
                        },
                        {
                            name: "ViewOpenDataManagementInformation",
                            path: "view/:id",
                            component: () => import("./modules/management-information/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'management information' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataNaturalMonopolyReestr",
                    path: "natural-monopoly-reestr",
                    redirect: "/open-data/natural-monopoly-reestr",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.natural_monopoly_reestr.title'),
                        bcTo: {name: "OpenDataNaturalMonopolyReestr"},
                        hasPerm: () => ability.can( 'list', 'natural monopoly reestr' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataNaturalMonopolyReestr",
                            path: "",
                            component: () => import("./modules/natural-monopoly-reestr/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'natural monopoly reestr' ),
                            }
                        },
                        {
                            name: "ViewOpenDataNaturalMonopolyReestr",
                            path: "view/:id",
                            component: () => import("./modules/natural-monopoly-reestr/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'natural monopoly reestr' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataNonCompliantBrand",
                    path: "non-compliant-brand",
                    redirect: "/open-data/non-compliant-brand",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.non_compliant_brand.title'),
                        bcTo: {name: "OpenDataNonCompliantBrand"},
                        hasPerm: () => ability.can( 'list', 'non compliant brand' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataNonCompliantBrand",
                            path: "",
                            component: () => import("./modules/non-compliant-brand/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'non compliant brand' ),
                            }
                        },
                        {
                            name: "CreateOpenDataNonCompliantBrand",
                            path: "create",
                            component: () => import("./modules/non-compliant-brand/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.non_compliant_brand.title'),
                                hasPerm: () => ability.can( 'list', 'non compliant brand' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataNonCompliantBrand",
                            path: "update/:id",
                            component: () => import("./modules/non-compliant-brand/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'non compliant brand' ),
                                bcLinkText: i18n.t('open_data.non_compliant_brand.title')
                            },
                        },
                        {
                            name: "ViewOpenDataNonCompliantBrand",
                            path: "view/:id",
                            component: () => import("./modules/non-compliant-brand/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'non compliant brand' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataProductPriceQuotation",
                    path: "product-price-quotation",
                    redirect: "/open-data/product-price-quotation",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.product_price_quotation.title'),
                        bcTo: {name: "OpenDataProductPriceQuotation"},
                        hasPerm: () => ability.can( 'list', 'product price quotation' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataProductPriceQuotation",
                            path: "",
                            component: () => import("./modules/product-price-quotation/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'product price quotation' ),
                            }
                        },
                        {
                            name: "CreateOpenDataProductPriceQuotation",
                            path: "create",
                            component: () => import("./modules/product-price-quotation/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.product_price_quotation.title'),
                                hasPerm: () => ability.can( 'list', 'product price quotation' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataProductPriceQuotation",
                            path: "update/:id",
                            component: () => import("./modules/product-price-quotation/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                bcLinkText: i18n.t('open_data.product_price_quotation.title'),
                                hasPerm: () => ability.can( 'list', 'product price quotation' ),
                            },
                        },
                        {
                            name: "ViewOpenDataProductPriceQuotation",
                            path: "view/:id",
                            component: () => import("./modules/product-price-quotation/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'product price quotation' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataPropertyInformation",
                    path: "property-information",
                    redirect: "/open-data/property-information",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.property_information.title'),
                        bcTo: {name: "OpenDataPropertyInformation"},
                        hasPerm: () => ability.can( 'list', 'property information' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataPropertyInformation",
                            path: "",
                            component: () => import("./modules/property-information/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'property information' ),
                            }
                        },
                        {
                            name: "CreateOpenDataPropertyInformation",
                            path: "create",
                            component: () => import("./modules/property-information/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.property_information.title'),
                                hasPerm: () => ability.can( 'list', 'property information' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataPropertyInformation",
                            path: "update/:id",
                            component: () => import("./modules/property-information/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'property information' ),
                                bcLinkText: i18n.t('open_data.property_information.title')
                            },
                        },
                        {
                            name: "ViewOpenDataPropertyInformation",
                            path: "view/:id",
                            component: () => import("./modules/property-information/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'property information' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataPublicAuthority",
                    path: "public-authority",
                    redirect: "/open-data/public-authority",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.public_authority.title'),
                        bcTo: {name: "OpenDataPublicAuthority"},
                        hasPerm: () => ability.can( 'list', 'public authority' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataPublicAuthority",
                            path: "",
                            component: () => import("./modules/public-authority/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'public authority' ),
                            }
                        },
                        {
                            name: "CreateOpenDataPublicAuthority",
                            path: "create",
                            component: () => import("./modules/public-authority/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.public_authority.title'),
                                hasPerm: () => ability.can( 'list', 'public authority' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataPublicAuthority",
                            path: "update/:id",
                            component: () => import("./modules/public-authority/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'public authority' ),
                                bcLinkText: i18n.t('open_data.public_authority.title')
                            },
                        },
                        {
                            name: "ViewOpenDataPublicAuthority",
                            path: "view/:id",
                            component: () => import("./modules/public-authority/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'public authority' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataPublicProcurementInformation",
                    path: "public-procurement-information",
                    redirect: "/open-data/public-procurement-information",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.public_procurement_information.title'),
                        bcTo: {name: "OpenDataPublicProcurementInformation"},
                        hasPerm: () => ability.can( 'list', 'public procurement information' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataPublicProcurementInformation",
                            path: "",
                            component: () => import("./modules/public-procurement-information/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'public procurement information' ),
                            }
                        },
                        {
                            name: "CreateOpenDataPublicProcurementInformation",
                            path: "create",
                            component: () => import("./modules/public-procurement-information/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.public_procurement_information.title'),
                                hasPerm: () => ability.can( 'list', 'public procurement information' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataPublicProcurementInformation",
                            path: "update/:id",
                            component: () => import("./modules/public-procurement-information/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'public procurement information' ),
                                bcLinkText: i18n.t('open_data.public_procurement_information.title')
                            },
                        },
                        {
                            name: "ViewOpenDataPublicProcurementInformation",
                            path: "view/:id",
                            component: () => import("./modules/public-procurement-information/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'public procurement information' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataRegionsProductPrice",
                    path: "regions-product-price",
                    redirect: "/open-data/regions-product-price",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.regions_product_price.title'),
                        bcTo: {name: "OpenDataRegionsProductPrice"},
                        hasPerm: () => ability.can( 'list', 'regions product price' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataRegionsProductPrice",
                            path: "",
                            component: () => import("./modules/regions-product-price/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'regions product price' ),
                            }
                        },
                        {
                            name: "CreateOpenDataRegionsProductPrice",
                            path: "create",
                            component: () => import("./modules/regions-product-price/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.regions_product_price.title'),
                                hasPerm: () => ability.can( 'list', 'regions product price' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataRegionsProductPrice",
                            path: "update/:id",
                            component: () => import("./modules/regions-product-price/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'regions product price' ),
                                bcLinkText: i18n.t('open_data.regions_product_price.title')
                            },
                        },
                        {
                            name: "ViewOpenDataRegionsProductPrice",
                            path: "view/:id",
                            component: () => import("./modules/regions-product-price/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'regions product price' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataServiceCost",
                    path: "service-cost",
                    redirect: "/open-data/service-cost",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.service_cost.title'),
                        bcTo: {name: "OpenDataServiceCost"},
                        hasPerm: () => ability.can( 'list', 'service cost' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataServiceCost",
                            path: "",
                            component: () => import("./modules/service-cost/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'service cost' ),
                            }
                        },
                        {
                            name: "CreateOpenDataServiceCost",
                            path: "create",
                            component: () => import("./modules/service-cost/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.service_cost.title'),
                                hasPerm: () => ability.can( 'list', 'service cost' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataServiceCost",
                            path: "update/:id",
                            component: () => import("./modules/service-cost/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'service cost' ),
                                bcLinkText: i18n.t('open_data.service_cost.title')
                            },
                        },
                        {
                            name: "ViewOpenDataServiceCost",
                            path: "view/:id",
                            component: () => import("./modules/service-cost/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'service cost' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataStockCompetitionLaw",
                    path: "stock-competition-law",
                    redirect: "/open-data/stock-competition-law",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.stock_competition_law.title'),
                        bcTo: {name: "OpenDataStockCompetitionLaw"},
                        hasPerm: () => ability.can( 'list', 'stock competition law' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataStockCompetitionLaw",
                            path: "",
                            component: () => import("./modules/stock-competition-law/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'stock competition law' ),
                            }
                        },
                        {
                            name: "CreateOpenDataStockCompetitionLaw",
                            path: "create",
                            component: () => import("./modules/stock-competition-law/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.stock_competition_law.title'),
                                hasPerm: () => ability.can( 'list', 'stock competition law' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataStockCompetitionLaw",
                            path: "update/:id",
                            component: () => import("./modules/stock-competition-law/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'stock competition law' ),
                                bcLinkText: i18n.t('open_data.stock_competition_law.title')
                            },
                        },
                        {
                            name: "ViewOpenDataStockCompetitionLaw",
                            path: "view/:id",
                            component: () => import("./modules/stock-competition-law/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'stock competition law' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataStockProduct",
                    path: "stock-product",
                    redirect: "/open-data/stock-product",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.stock_product.title'),
                        bcTo: {name: "OpenDataStockProduct"},
                        hasPerm: () => ability.can( 'list', 'stock product' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataStockProduct",
                            path: "",
                            component: () => import("./modules/stock-product/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'stock product' ),
                            }
                        },
                        {
                            name: "CreateOpenDataStockProduct",
                            path: "create",
                            component: () => import("./modules/stock-product/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.stock_product.title'),
                                hasPerm: () => ability.can( 'list', 'stock product' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataStockProduct",
                            path: "update/:id",
                            component: () => import("./modules/stock-product/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'stock product' ),
                                bcLinkText: i18n.t('open_data.stock_product.title')
                            },
                        },
                        {
                            name: "ViewOpenDataStockProduct",
                            path: "view/:id",
                            component: () => import("./modules/stock-product/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'stock product' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataSubordinateOrganization",
                    path: "subordinate-organization",
                    redirect: "/open-data/organization",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.subordinate_organization.title'),
                        bcTo: {name: "OpenDataSubordinateOrganization"},
                        hasPerm: () => ability.can( 'list', 'subordinate organization' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataSubordinateOrganization",
                            path: "",
                            component: () => import("./modules/subordinate-organization/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'subordinate organization' ),
                            }
                        },
                        {
                            name: "CreateOpenDataSubordinateOrganization",
                            path: "create",
                            component: () => import("./modules/subordinate-organization/CreateOrUpdate"),
                            meta: {
                                bcLinkText: i18n.t('open_data.subordinate_organization.title'),
                                hasPerm: () => ability.can( 'list', 'subordinate organization' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataSubordinateOrganization",
                            path: "update/:id",
                            component: () => import("./modules/subordinate-organization/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'subordinate organization' ),
                                bcLinkText: i18n.t('open_data.subordinate-organization.title')
                            },
                        },
                        {
                            name: "ViewOpenDataSubordinateOrganization",
                            path: "view/:id",
                            component: () => import("./modules/subordinate-organization/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'subordinate organization' ),
                            },
                        },
                    ]
                },
                {
                    name: "OpenDataVacancy",
                    path: "vacancy",
                    redirect: "/open-data/vacancy",
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    meta: {
                        bcLinkText: i18n.t('open_data.vacancy.title'),
                        bcTo: {name: "OpenDataVacancy"},
                        hasPerm: () => ability.can( 'list', 'vacancy' ),
                    },
                    children: [
                        {
                            name: "IndexOpenDataVacancy",
                            path: "",
                            component: () => import("./modules/vacancy/Index"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'vacancy' ),
                            }
                        },
                        {
                            name: "CreateOpenDataVacancy",
                            path: "create",
                            component: () => import("./modules/vacancy/CreateOrUpdate"),
                            meta: {
                                hasPerm: () => ability.can( 'list', 'vacancy' ),
                            },
                        },
                        {
                            name: "UpdateOpenDataVacancy",
                            path: "update/:id",
                            component: () => import("./modules/vacancy/CreateOrUpdate"),
                            meta: {
                                bcDynamic: true,
                                paramName: 'id',
                                bcStateVarAndModuleName: {
                                    stateVar: 'currentItem',
                                    stateVarKey: 'name'
                                },
                                hasPerm: () => ability.can( 'list', 'vacancy' ),
                                bcLinkText: i18n.t('open_data.vacancy.title')
                            },
                        },
                        {
                            name: "ViewOpenDataVacancy",
                            path: "view/:id",
                            component: () => import("./modules/vacancy/View"),
                            meta: {
                                hasPerm: () => ability.can( 'get', 'vacancy' ),
                            },
                        },
                    ]
                }
            ]
    },
]
