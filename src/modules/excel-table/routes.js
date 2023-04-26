import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Excel",
        path: "/excel",
        redirect: "/excel",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t( 'submodules.excel.title' ),
            bcTo: {name: "Excel"}
        },
        children: [
            // Commission
            {
                name: "table",
                path: "/excel/table",
                redirect: "/excel/table",
                component: {
                    render(c) {
                        return c( 'router-view' )
                    }
                },
                meta: {
                    bcTo: {name: "workWithDocument"},
                    hasPerm: () => ability.can('view', 'statistic-reports'),
                },
                children: [
                    {
                        name: "ExcelTable1",
                        path: "number-1",
                        component: () => import("@/modules/excel-table/ExcelTable1"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_1' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable2",
                        path: "number-2",
                        component: () => import("@/modules/excel-table/ExcelTable2"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_2' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable3",
                        path: "number-3",
                        component: () => import("@/modules/excel-table/ExcelTable3"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_3' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable4",
                        path: "number-4",
                        component: () => import("@/modules/excel-table/ExcelTable4"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_4' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable5",
                        path: "number-5",
                        component: () => import("@/modules/excel-table/ExcelTable5"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_5' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable6",
                        path: "number-6",
                        component: () => import("@/modules/excel-table/ExcelTable6"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_6' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable7",
                        path: "number-7",
                        component: () => import("@/modules/excel-table/ExcelTable7"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_7' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                    {
                        name: "ExcelTable8",
                        path: "number-8",
                        component: () => import("@/modules/excel-table/ExcelTable8"),
                        meta: {
                            bcLinkText: i18n.t( 'submodules.excel.table_name_8' ),
                            bcTo: {name: "CreateApplicationByLegal"}
                        },
                    },
                ]
            },
            {
                name: "FinalForecast",
                path: '/excel/final-forecast/',
                component: {
                    render(c) {
                        return c( 'router-view' )
                    }
                },
                meta: {
                    bcLinkText: i18n.t( "submodules.final_forecast.title"),
                    bcTo: {name: "FinalForecast"}
                },
                children: [
                    {
                        name: "IndexFinalForecast",
                        path: "index",
                        component: () => import('@/modules/excel-table/modules/final-forecast/Index'),
                        meta: {
                            bcLinkText: i18n.t( "submodules.final_forecast.title"),
                            // hasPerm: () => ability.can( 'view', 'quarter' )
                        }
                    },
                    {
                        name: "CreateFinalForecast",
                        path: "create",
                        component: () => import("@/modules/excel-table/modules/final-forecast/Create"),
                        meta: {
                            bcLinkText: i18n.t( "submodules.final_forecast.title"),
                            bcTo: {name: "CreateFinalForecast"}
                        },
                    },
                    {
                        name: "UpdateFinalForecast",
                        path: "update/:id",
                        component: () => import("@/modules/excel-table/modules/final-forecast/Update"),
                        meta: {
                            bcLinkText: i18n.t( "submodules.final_forecast.title"),
                            bcTo: {name: "UpdateFinalForecast"}
                        },
                    },
                ]
            },
            {
                name: "FinalForecastFill",
                path: '/excel/final-forecast-fill/',
                component: {
                    render(c) {
                        return c( 'router-view' )
                    }
                },
                meta: {
                    bcLinkText: i18n.t( "submodules.final_forecast.fill_title"),
                    bcTo: {name: "FinalForecastFill"}
                },
                children: [
                    {
                        name: "IndexFinalForecastFill",
                        path: "index",
                        component: () => import('@/modules/excel-table/modules/final-forecast-fill/Index'),
                        meta: {
                            bcLinkText: i18n.t( "submodules.final_forecast.fill_title"),
                            // hasPerm: () => ability.can( 'view', 'quarter' )
                        }
                    },
                    {
                        name: "UpdateFinalForecastFill",
                        path: "update/:id",
                        component: () => import("@/modules/excel-table/modules/final-forecast-fill/Update"),
                        meta: {
                            bcLinkText: i18n.t( "submodules.final_forecast.fill_title"),
                            bcTo: {name: "UpdateFinalForecastFill"}
                        },
                    },
                ]
            },
        ]
    },

]
