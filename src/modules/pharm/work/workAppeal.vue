<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";
import Service from "../pharmService";
import Regions from "../../pharm/monitor/region.vue";
import VueApexCharts from 'vue-apexcharts'

import DocumentTree from "@/modules/commission/document-tree/document-tree";
import DocumentHistory from "@/modules/commission/document-history/document-history";
/**
 * Products-order component
 */
import {cnfDoc, showMsgSuccess} from "@/helper";
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
    components: {
        DocumentTree,
        DocumentHistory,
        Regions,
        // VueApexCharts,
        // Receivers,
        // Editor,
        // Modal,
    },
    watch: {
        page() {
            this.getList();
        },
        searchValue(v) {
            this.getList();
        },
        selectedAppStatus: {
            handler() {
                if (this.isTabDxa) {
                    this.getListDXAByStatus();
                } else {
                    this.getList();
                }

            },
        },
    },
    data() {
        return {
            employeeAttachched: [],
            attachchedModal: false,
            attachchedModalLoader: false,
            form1: {
                employeeId: null,
                pharmId: null,
                comment: ''
            },

            loadingMonthlyChartData: false,
            loadingChartData: false,
            loadingMonthlyChartDataForDXA: false,
            loadingChartDataForDXA: false,

            statusCodes: {
                CREATED: {
                    label: this.$t('submodules.commission.doc_status.doc_created'),
                    color: '#74788D',
                },
                BEING_SEEN: {
                    label: this.$t('submodules.commission.doc_status.doc_seen'),
                    color: '#F1B44C',
                },
                SEEN: {
                    label: this.$t('submodules.commission.doc_status.seen'),
                    color: '#50A5F1',
                },
                // SENT: {
                //     label: this.$t('submodules.reports.report_sended'),
                //     color: '#556EE6',
                // },
                CANCELLED: {
                    label: this.$t('docs_r.CANCELED'),
                    color: '#F46A6A',
                },
                // SEND_FOR_COMMISSION: {
                //     label: this.$t('submodules.commission.doc_status.send_for_commission'),
                //     color: '#50A5F1',
                // },
                // COMMISSION_BEING_SEEN: {
                //     label: this.$t('submodules.commission.doc_status.commission_being_seen'),
                //     color: '#F1B44C',
                // },
                // COMMISSION_SEEN: {
                //     label: this.$t('submodules.commission.doc_status.commission_seen'),
                //     color: '#50A5F1',
                // },
                // COMMISSION_SENT: {
                //     label: this.$t('submodules.commission.doc_status.commission_sent'),
                //     color: '#556EE6',
                // },
                // COMMISSION_SIGNED: {
                //     label: this.$t('submodules.commission.doc_status.commission_signed'),
                //     color: '#34C38F',
                // },
                // COMMISSION_CANCELLED: {
                //     label: this.$t('submodules.commission.doc_status.commission_canceled'),
                //     color: '#F46A6A',
                // },
                FOR_NOT_COMPLETED_FOR_DXA: {
                    label: this.$t('messages.for_not_completed_dxa'),
                    color: '#623CE8',
                },
            },
            statusCodesForDXA: {
                DESCENDED: {
                    label: this.$t('submodules.commission.DESCENDED'),
                    color: '#74788D',
                    style: {
                        border: '1px solid #74788D',
                        'margin-right': '1px',
                        color: '#74788D',
                    },
                },
                NOT_COMPLETED: {
                    label: this.$t('submodules.dxa.not_complete'),
                    color: '#50A5F1',
                    style: {
                        border: '1px solid #50A5F1',
                        'margin-right': '1px',
                        color: '#50A5F1',
                    },
                },
                RETURN_FOR_COMPLETE: {
                    label: this.$t('messages.return_for_complete'),
                    color: '#F46A6A',
                    style: {
                        border: '1px solid #F46A6A',
                        'margin-right': '1px',
                        color: '#F46A6A',
                    },
                },
                // NO_PERMIT_REQUIRED: {
                //     label: this.$t('submodules.commission.NO_PERMIT_REQUIRED'),
                //     color: '#50A5F1',
                //     style: {
                //         border: '1px solid #50A5F1',
                //         'margin-right': '1px',
                //         color: '#50A5F1',
                //     },
                // },
                // FOR_NO_PERMIT_REQUIRED_DXA: {
                //     label: this.$t('submodules.commission.FOR_NO_PERMIT_REQUIRED_DXA'),
                //     color: '#F1B44C',
                //     style: {
                //         border: '1px solid #F1B44C',
                //         'margin-right': '1px',
                //         color: '#F1B44C',
                //     },
                // },
                // RETURN_AFTER_NO_PERMIT_REQUIRED: {
                //     label: this.$t('submodules.commission.RETURN_AFTER_NO_PERMIT_REQUIRED'),
                //     color: '#F46A6A',
                //     style: {
                //         border: '1px solid #F46A6A',
                //         'margin-right': '1px',
                //         color: '#F46A6A',
                //     },
                // },
                REJECTED: {
                    label: this.$t('submodules.commission.REJECTED'),
                    color: '#50A5F1',
                    style: {
                        border: '1px solid #50A5F1',
                        'margin-right': '1px',
                        color: '#50A5F1',
                    },
                },
                // NOT_BELONG: {
                //     label: this.$t('submodules.dxa.not_belong'),
                //     color: '#556EE6',
                //     style: {
                //         border: '1px solid #556EE6',
                //         'margin-right': '1px',
                //         color: '#556EE6',
                //     },
                // },
                // FOR_NOT_COMPLETED_DXA: {
                //     label: this.$t('messages.for_not_completed_dxa'),
                //     color: '#F1B44C',
                //     style: {
                //         border: '1px solid #F1B44C',
                //         'margin-right': '1px',
                //         color: '#F1B44C',
                //     },
                // },
                RETURN_AFTER_NOT_BELONG: {
                    label: this.$t('submodules.commission.RETURN_AFTER_NOT_BELONG'),
                    color: '#F46A6A',
                    style: {
                        border: '1px solid #F46A6A',
                        'margin-right': '1px',
                        color: '#F46A6A',
                    },
                },
                EXTENDED: {
                    label: this.$t('submodules.dxa.extended'),
                    color: '#F1B44C',
                    style: {
                        border: '1px solid #F1B44C',
                        'margin-right': '1px',
                        color: '#F1B44C',
                    },
                },
                FOR_NOT_COMPLETED_FOR_DXA: {
                    label: this.$t('messages.for_not_completed_dxa'),
                    color: '#623CE8',
                    style: {
                        border: '1px solid #623CE8',
                        'margin-right': '1px',
                        color: '#623CE8',
                    },
                },
                FOR_NOT_BELONG_DXA: {
                    label: this.$t('messages.for_not_belong_dxa'),
                    color: '#F1B44C',
                    style: {
                        border: '1px solid #F1B44C',
                        'margin-right': '1px',
                        color: '#F1B44C',
                    },
                },
                FOR_EXTENDED_DXA: {
                    label: this.$t('messages.for_extended_dxa'),
                    color: '#a80000',
                    style: {
                        border: '1px solid #a80000',
                        'margin-right': '1px',
                        color: '#a80000',
                    },
                },
                EXTEND_COMPLETED: {
                    label: this.$t('submodules.commission.EXTEND_COMPLETED'),
                    color: '#50A5F1',
                    style: {
                        border: '1px solid #50A5F1',
                        'margin-right': '1px',
                        color: '#50A5F1',
                    },
                },
                EXPIRED: {
                    label: this.$t('submodules.commission.EXPIRED'),
                    color: '#50A5F1',
                    style: {
                        border: '1px solid #50A5F1',
                        'margin-right': '1px',
                        color: '#50A5F1',
                    },
                },
                RETURN_FROM_REGION: {
                    label: this.$t('messages.return_from_region'),
                    color: '#F46A6A',
                    style: {
                        border: '1px solid #F46A6A',
                        'margin-right': '1px',
                        color: '#F46A6A',
                    },
                },
                RECEIVED: {
                    label: this.$t('submodules.dxa.received'),
                    color: '#F1B44C',
                    style: {
                        border: '1px solid #F1B44C',
                        'margin-right': '1px',
                        color: '#F1B44C',
                    },
                },
                FOR_REJECTED_DXA: {
                    label: this.$t('messages.for_rejected_dxa'),
                    color: '#b77308',
                    style: {
                        border: '1px solid #b77308',
                        'margin-right': '1px',
                        color: '#b77308',
                    },
                },
                RETURN_AFTER_REJECTED: {
                    label: this.$t('messages.return_from_region'),
                    color: '#F46A6A',
                    style: {
                        border: '1px solid #F46A6A',
                        'margin-right': '1px',
                        color: '#F46A6A',
                    },
                },
                FOR_ACCEPTED_DXA: {
                    label: this.$t('messages.for_accepted_dxa'),
                    color: '#ff7100',
                    style: {
                        border: '1px solid #ff7100',
                        'margin-right': '1px',
                        color: '#ff7100',
                    },
                },
                ACCEPTED: {
                    label: this.$t('messages.accepted_message'),
                    color: '#556EE6',
                    style: {
                        border: '1px solid #556EE6',
                        'margin-right': '1px',
                        color: '#556EE6',
                    },
                },
            },

            lineWithDataChart: {
                chartOptions: {
                    chart: {
                        height: 210,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [],
                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        width: [3, 3],
                        curve: 'straight'
                    },
                    /* title: {
              text: 'Average High & Low Temperature',
              align: 'left',
              style: {
                  fontWeight: '500',
              },
          }, */
                    grid: {
                        row: {
                            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.2
                        },
                        borderColor: '#f1f1f1'
                    },
                    markers: {
                        style: 'inverted',
                        size: 6
                    },
                    xaxis: {
                        categories: [],
                        /* title: {
                text: 'Oy'
            } */
                    },
                    yaxis: {
                        /* title: {
                text: 'Arizalar soni'
            }, */
                        /* min: 5,
            max: 40 */
                    },
                    /* legend: {
              position: 'bottom',
              horizontalAlign: 'right',
              floating: true,
              offsetY: 0,
              offsetX: 0
          }, */
                    responsive: [{
                        breakpoint: 600,
                        options: {
                            chart: {
                                toolbar: {
                                    show: false
                                }
                            },
                            legend: {
                                show: false
                            },
                        }
                    }],
                },
                series: [],
                year: null
            },
            lineWithDataChartForDXA: {
                chartOptions: {
                    chart: {
                        height: 210,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [],
                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        width: [3, 3],
                        curve: 'straight'
                    },
                    /* title: {
              text: 'Average High & Low Temperature',
              align: 'left',
              style: {
                  fontWeight: '500',
              },
          }, */
                    grid: {
                        row: {
                            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.2
                        },
                        borderColor: '#f1f1f1'
                    },
                    markers: {
                        style: 'inverted',
                        size: 6
                    },
                    xaxis: {
                        categories: [],
                        /* title: {
                text: 'Oy'
            } */
                    },
                    yaxis: {
                        /* title: {
                text: 'Arizalar soni'
            }, */
                        /* min: 5,
            max: 40 */
                    },
                    /* legend: {
              position: 'bottom',
              horizontalAlign: 'right',
              floating: true,
              offsetY: 0,
              offsetX: 0
          }, */
                    responsive: [{
                        breakpoint: 600,
                        options: {
                            chart: {
                                toolbar: {
                                    show: false
                                }
                            },
                            legend: {
                                show: false
                            },
                        }
                    }],
                },
                series: [],
                year: null
            },

            columnChart: {
                series: [{
                    name: '',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        toolbar: {
                            show: false,
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '30%',
                            distributed: true
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    colors: [],
                    xaxis: {
                        categories: [],
                        labels: {
                            style: {
                                colors: [],
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    grid: {
                        borderColor: '#f1f1f1',
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "Soni: " + val + " ta"
                            }
                        }
                    }
                }
            },
            columnChartForDXA: {
                series: [{
                    name: '',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        toolbar: {
                            show: false,
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '30%',
                            distributed: true
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    colors: [],
                    xaxis: {
                        categories: [],
                        labels: {
                            style: {
                                colors: [],
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    grid: {
                        borderColor: '#f1f1f1',
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "Soni: " + val + " ta"
                            }
                        }
                    }
                }
            },

            donutChart: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut',
                    },
                    labels: [],
                    colors: [],
                    legend: {
                        show: true,
                        position: 'left',
                        horizontalAlign: 'center',
                        verticalAlign: 'middle',
                        floating: false,
                        fontSize: '14px',
                        offsetX: 0
                    },
                    responsive: [{
                        breakpoint: 600,
                        options: {
                            chart: {
                                height: 240
                            },
                            legend: {
                                show: true
                            },
                        }
                    }],
                    dataLabels: {
                        formatter: function (val, opts) {
                            return opts.w.config.series[opts.seriesIndex]
                        },
                    }
                }
            },
            donutChartForDXA: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut',
                    },
                    labels: [],
                    colors: [],
                    legend: {
                        show: true,
                        position: 'left',
                        horizontalAlign: 'center',
                        verticalAlign: 'middle',
                        floating: false,
                        fontSize: '14px',
                        offsetX: 0
                    },
                    responsive: [{
                        breakpoint: 600,
                        options: {
                            chart: {
                                height: 240
                            },
                            legend: {
                                show: true
                            },
                        }
                    }],
                    dataLabels: {
                        formatter: function (val, opts) {
                            return opts.w.config.series[opts.seriesIndex]
                        },
                    }
                }
            },

            yearlyChartData: [],
            chartData: [],

            yearlyChartDataForDXA: [],
            chartDataForDXA: [],

            selectedAppStatus: "CREATED",
            selectedAppByStatus: {},
            selectedApplicationItem: {},
            loadingById: false,
            currentAppDetailsTabIndex: 0,
            totalAppsByStatus: 0,
            applicationsByStatus: [],
            activeTab: 'inner',
            activeDXATab: 'FOR_SALE',
            applicationStatusDXAFilterCollapse: false,
            commissionTypeId: null,
            commissionComment: '',
            commissionModalLoader: false,
            commissionTypes: [],
            isSidebar: false,
            isSidebarRegion: false,
            currentPage: 1,
            src: null,
            selectedRegion: null,
            numPages: undefined,
            reasonRejected: "",
            selectedTrItem: {},
            selectedAppealTrItem: {},
            active: "",
            sendTypeList: [
                // {
                //   label: this.$t("actions.view"),
                //   value: "VIEW",
                // },
                {
                    label: this.$t("column.accept"),
                    value: "SEND_REGION",
                },
                // {
                //   label: this.$t("submodules.commission.send_region"),
                //   value: "SEND_REGION",
                // },


                // {
                //   label: this.$t("forAgreement"),
                //   value: "AGREEMENT",
                // },
                // {
                //   label: this.$t("forReview"),
                //   value: "REVIEW",
                // },
            ],
            title: this.$t("received"),
            // items: [
            //   {
            //     text: this.$t("menu"),
            //     href: "/",
            //   },
            //   {
            //     text: this.$t("received"),
            //     active: true,
            //   },
            // ],
            list: [],
            appealList: [],
            searchValue: "",
            page: 1,
            limit: 20,
            loading: false,
            total: 1,
            isModal: false,
            currentItem: {},
            signatureModal: false,
            loaderButton: false,
            isModalKeys: false,
            agreementCount: 0,
            signatureCount: 0,
            reviewCount: 0,
            loaderReceiver: false,
            infoData: {},
            rejectedLoader: false,
            isRejectedModal: false,
            viewModal: false,
            filesList: [],
            viewModalBeforeSigned: false,
            loaderPdf: false,
            ilovaUploadPath: null,
            viewIlovaModal: false,
            base64: null,
            editModal: false,
            loader: false,
            modalNoPermitRequired: false,
            noPermitRequiredApplicationId: null,
            noPermitRequiredText: '',
            contextText: "",
        };
    },
    async created() {
        await this.getList();
        // await this.getEmployeesByDepartment();


        // CHECK FOR PERMISSIONS
        // if (this.$can('view', 'application-monitor-inner')) {
        //     this.$set(this.lineWithDataChart, 'year', (new Date().getFullYear()).toString())
        //     this.activeTab = 'inner'
        //     this.loadingChartData = true
        //     await this.fetchDataForChart()
        //     await this.fetchDataForMonthlyChart(false)
        //     this.loadingChartData = false
        //     await this.getList();
        // } else if (this.$can('view', 'application-monitor-dxa')) {
        //
        //     this.activeTab = 'dxa'
        // } else {
        //     this.activeTab = null
        // }
        // await this.getIncomeTotalCount();
    },
    computed: {
        isTabDxa() {
            return this.activeTab === 'dxa'
        },
        params() {
            return {
                params: {
                    itemsPerPage: this.limit,
                    page: this.page - 1,
                },
                search: this.searchValue,
            };
        },
        statusCodesForDXAComputedFirst() {
            const half = Math.floor(Object.keys(this.statusCodesForDXA).length / 2)
            let arr = {};
            let i = 0;
            for (const key in this.statusCodesForDXA) {
                arr[key] = this.statusCodesForDXA[key];
                i++;
                if (i >= half) {
                    break;
                }
            }
            return arr
        },
        statusCodesForDXAComputedSecond() {
            const half = Math.floor(Object.keys(this.statusCodesForDXA).length / 2)
            let arr = {};
            let i = 0;
            for (const key in this.statusCodesForDXA) {
                i++;
                if (i < half) {
                    continue;
                }
                arr[key] = this.statusCodesForDXA[key];
            }
            return arr
        },
    },

    methods: {
        openSignatureModalForAttachchedEmployees() {
            this.attachchedModalLoader = true

            if (this.form1.employeeId) {
                this.form1.pharmId = this.selectedAppealTrItem.id
                Service.setEmployeesAttachchedToAppeal(this.form1)
                    .then((res) => {
                        this.$toast(res.data, {type: 'success'});
                        // this.$toast(data, {type: 'success'});
                    })
                    .catch((err) => {
                        this.catchErr(err);
                    })
                    .finally(() => {
                        this.attachchedModalLoader = false
                        this.attachchedModal = false
                    });
            } else {
                this.attachchedModalLoader = false
                this.attachchedModal = true
                this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
            }
        },
        setAttachchedEmployees() {
            this.attachchedModal = true;
        },
        getEmployeesByDepartment() {
            Service.getEmployeesInnerDepartment(this.params)
                .then(({data}) => {
                    this.employeeAttachched = data.list;
                    // this.employeeAttachched = [];
                })
                .catch((err) => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async fetchDataForChartForDXA() {
            // this.loadingChartData = true
            // CURRENT CHART DATA
            await Service
                .fetchChartDataCurrentApplicationStatusesForDXA()
                .then((res) => {
                    this.chartDataForDXA = res.data

                    // SET DATA TO CHARTS
                    this.donutChartForDXA.series = []
                    this.donutChartForDXA.chartOptions.labels = []
                    let tmpSeries = []
                    let tmpLabels = []
                    let tmpColors = []
                    this.chartDataForDXA.forEach(d => {
                        tmpSeries.push(d.count)
                        tmpLabels.push(this.statusCodesForDXA[d.status] ? this.statusCodesForDXA[d.status].label : d.status)
                        tmpColors.push(this.statusCodesForDXA[d.status] ? this.statusCodesForDXA[d.status].color : '#74788D')
                    })
                    // SET TO DONUT_CHART
                    this.$set(this.donutChartForDXA.chartOptions, 'colors', tmpColors)
                    this.$set(this.donutChartForDXA.chartOptions, 'labels', tmpLabels)
                    this.$set(this.donutChartForDXA, 'series', tmpSeries)

                    // SET TO COLUMN_CHART
                    this.$set(this.columnChartForDXA.chartOptions, 'colors', tmpColors)
                    this.$set(this.columnChartForDXA.chartOptions.xaxis.labels.style, 'colors', tmpColors)
                    this.$set(this.columnChartForDXA.chartOptions.xaxis, 'categories', tmpLabels)
                    this.$set(this.columnChartForDXA.series[0], 'data', tmpSeries)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    // this.loadingChartData = false
                })
        },
        async fetchDataForMonthlyChartForDXA(fromDatePicker = true) {
            await this.$set(this.lineWithDataChartForDXA, 'year', (new Date().getFullYear()).toString())
            if (fromDatePicker) {
                this.loadingMonthlyChartDataForDXA = true
            }
            // MONTHLY CHART DATA
            await Service
                .fetchChartDataApplicationsByStatusesForYearForDXA(this.lineWithDataChartForDXA.year)
                .then((res) => {
                    this.yearlyChartDataForDXA = res.data

                    this.lineWithDataChartForDXA.series = []
                    this.lineWithDataChartForDXA.chartOptions.xaxis.categories = []
                    this.lineWithDataChartForDXA.chartOptions.colors = []
                    let tmpSeries = []
                    let tmpLabels = []
                    let tmpColors = []
                    for (let m in this.yearlyChartDataForDXA) {
                        let mStatuses = this.yearlyChartDataForDXA[m]
                        for (let sCode in this.statusCodesForDXA) {
                            let mEl = mStatuses.find(el => el.status == sCode)
                            // SERIES
                            let idxInSeries = tmpSeries.findIndex(el => el.sCode == sCode)
                            if (idxInSeries > -1) {
                                tmpSeries[idxInSeries].data.push(mEl ? mEl.count : 0)
                            } else {
                                tmpSeries.push({
                                    sCode: sCode,
                                    name: this.statusCodesForDXA[sCode].label,
                                    data: [mEl ? mEl.count : 0]
                                })
                            }
                            // COLORS
                            if (m == 1) {
                                tmpColors.push(this.statusCodesForDXA[sCode] ? this.statusCodesForDXA[sCode].color : '#74788D')
                            }
                        }
                        // CATEGORIES
                        tmpLabels.push(this.$t(`months.${m}`))
                    }
                    // SET TO LINE_CHART
                    this.$set(this.lineWithDataChartForDXA.chartOptions, 'colors', tmpColors)
                    this.$set(this.lineWithDataChartForDXA.chartOptions.xaxis, 'categories', tmpLabels)
                    this.$set(this.lineWithDataChartForDXA, 'series', tmpSeries)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    if (fromDatePicker) {
                        this.loadingMonthlyChartData = false
                    }
                })
        },

        async fetchDataForChart() {
            // this.loadingChartData = true
            // CURRENT CHART DATA
            await Service
                .fetchChartDataCurrentApplicationStatuses()
                .then((res) => {
                    this.chartData = res.data

                    // SET DATA TO CHARTS
                    this.donutChart.series = []
                    this.donutChart.chartOptions.labels = []
                    let tmpSeries = []
                    let tmpLabels = []
                    let tmpColors = []
                    this.chartData.forEach(d => {
                        tmpSeries.push(d.count)
                        tmpLabels.push(this.statusCodes[d.status] ? this.statusCodes[d.status].label : d.status)
                        tmpColors.push(this.statusCodes[d.status] ? this.statusCodes[d.status].color : '#74788D')
                    })

                    // SET TO DONUT_CHART
                    this.$set(this.donutChart.chartOptions, 'colors', tmpColors)
                    this.$set(this.donutChart.chartOptions, 'labels', tmpLabels)
                    this.$set(this.donutChart, 'series', tmpSeries)

                    // SET TO COLUMN_CHART
                    this.$set(this.columnChart.chartOptions, 'colors', tmpColors)
                    this.$set(this.columnChart.chartOptions.xaxis.labels.style, 'colors', tmpColors)
                    this.$set(this.columnChart.chartOptions.xaxis, 'categories', tmpLabels)
                    this.$set(this.columnChart.series[0], 'data', tmpSeries)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    // this.loadingChartData = false
                })
        },
        async fetchDataForMonthlyChart(fromDatePicker = true) {
            if (fromDatePicker) {
                this.loadingMonthlyChartData = true
            }
            // MONTHLY CHART DATA
            await Service
                .fetchChartDataApplicationsByStatusesForYear(this.lineWithDataChart.year)
                .then((res) => {
                    this.yearlyChartData = res.data

                    this.lineWithDataChart.series = []
                    this.lineWithDataChart.chartOptions.xaxis.categories = []
                    this.lineWithDataChart.chartOptions.colors = []
                    let tmpSeries = []
                    let tmpLabels = []
                    let tmpColors = []

                    for (let m in this.yearlyChartData) {
                        let mStatuses = this.yearlyChartData[m]
                        for (let sCode in this.statusCodes) {
                            let mEl = mStatuses.find(el => el.status == sCode)
                            // SERIES
                            let idxInSeries = tmpSeries.findIndex(el => el.sCode == sCode)
                            if (idxInSeries > -1) {
                                tmpSeries[idxInSeries].data.push(mEl ? mEl.count : 0)
                            } else {
                                tmpSeries.push({
                                    sCode: sCode,
                                    name: this.statusCodes[sCode].label,
                                    data: [mEl ? mEl.count : 0]
                                })
                            }
                            // COLORS
                            if (m == 1) {
                                tmpColors.push(this.statusCodes[sCode] ? this.statusCodes[sCode].color : '#74788D')
                            }
                        }
                        // CATEGORIES
                        tmpLabels.push(this.$t(`months.${m}`))
                    }

                    // SET TO LINE_CHART
                    this.$set(this.lineWithDataChart.chartOptions, 'colors', tmpColors)
                    this.$set(this.lineWithDataChart.chartOptions.xaxis, 'categories', tmpLabels)
                    this.$set(this.lineWithDataChart, 'series', tmpSeries)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    if (fromDatePicker) {
                        this.loadingMonthlyChartData = false
                    }
                })
        },
        async getAppById(item) {
            this.loadingById = true;
            await crudAndListsService.getById('before-commission/application', item.id, false)
                .then(res => {
                    this.selectedApplicationItem = res.data.ApplicationDto
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.loadingById = false;
                })
        },
        toggleLoading(boolean) {
            this.loadingById = boolean;
        },
        activeTableInnerApplication() {
            this.selectedTrItem = {}
            this.activeTab = 'inner'
            this.var_default_search_payload.page = 1
            this.getList();
        },
        async activeTableDXAApplication() {
            this.selectedTrItem = {}
            this.activeTab = 'dxa'
            this.activeDXATab = 'FOR_SALE'
            this.var_default_search_payload.page = 1
            this.loadingChartDataForDXA = true
            await this.fetchDataForChartForDXA()
            await this.fetchDataForMonthlyChartForDXA(false)
            this.loadingChartDataForDXA = false
            await this.getList();
        },
        activeTableDXAApplicationFOR_ADD() {
            this.selectedTrItem = {}
            this.activeTab = 'dxa'
            this.activeDXATab = 'FOR_ADD'
            this.var_default_search_payload.page = 1
            this.getList();
        },
        activeTableDXAApplicationFOR_SALE() {
            this.selectedTrItem = {}
            this.activeTab = 'dxa'
            this.activeDXATab = 'FOR_SALE'
            this.var_default_search_payload.page = 1
            this.getList();
        },
        updateSidebar() {
            this.signatureModal = false
        },
        openSignatureModalForCommission() {
            if (this.commissionTypeId) {
                this.signatureModal = true
            } else {
                this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
            }
        },

        customLabelAttachchedEmployees(opt) {
            let selected = this.employeeAttachched.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName} (${this.getName({
                    nameUz: selected.departmentNameUz,
                    nameLt: selected.departmentNameLt,
                    nameRu: selected.departmentNameRu
                })})`
            }
            return ``;
        },
        changeText(text) {
            this.contextText = text;
        },
        okModal() {
            let text = this.$refs.editorRef.text;
            this.$refs.editModalRef.loading(true);
            Service.saveLetterBody(this.selectedTrItem.letterId, text)
                .then(() => {
                    let tempData = this.selectedTrItem;
                    this.successEdited();
                    this.getList();
                    this.editModal = false;
                    setTimeout(() => {
                        let newdata = this.list.find((e) => e.id == tempData.id);
                        this.selectedTrItem = newdata;
                        this.$forceUpdate();
                        this.getReceivers(this.selectedTrItem);
                    }, 500);
                })
                .catch((e) => {
                })
                .finally(() => {
                    this.$refs.editModalRef.loading(false);
                });
        },
        viewModalClick() {
            this.$refs.editModalRef.loadingPdf(true);
            this.viewModalBeforeSigned = true;
            this.loaderPdf = true;
            this.base64 = null;

            Service.convert(this.contextText)
                .then((res) => {
                    setTimeout(() => {
                        this.base64 = res.data;
                    }, 400);
                })
                .finally(() => {
                    this.loaderPdf = false;
                    this.$refs.editModalRef.loadingPdf(false);
                });
        },
        viewIlova(uploadPath) {
            if (this.getExt(uploadPath) === "pdf") {
                this.ilovaUploadPath = uploadPath;
                this.viewIlovaModal = true;
            }
        },

        convertToPdf(selectedItem, forSign = false) {
            return new Promise((res, rej) => {
                let config = {
                    url: `${selectedItem.url}`,
                    outputtype: ".pdf",
                    forSign: forSign,
                    key: selectedItem.key,
                };
                Service.convertToPdfByApi(config)
                    .then((rs) => {
                        if (rs.data.uploadPath) {
                            this.$nextTick(() => {
                                this.src = `${this.baseUrl}/${rs.data.uploadPath}`;
                            });
                            res(rs.data.uploadPath);
                        } else {
                            res(false);
                        }
                    })
                    .catch((e) => {
                        // this.catchErr(e);
                        rej(e);
                    });
            });
        },
        getByIdLetter() {
            Service.getByIdLetter(this.selectedTrItem.letterId)
                .then((rs) => {
                    this.currentDoc = rs.data;
                    this.loaderPdf = true;
                    this.convertToPdf(rs.data).then((uploadPath) => {
                        if (!uploadPath) {
                            setTimeout(() => {
                                this.convertToPdf(rs.data)
                                    .then(() => {
                                        this.loaderPdf = false;
                                    })
                                    .catch((e) => {
                                        this.loaderPdf = false;
                                    });
                            }, 4000);
                        } else {
                            this.loaderPdf = false;
                        }
                    });
                })
                .catch((e) => {
                });
        },
        viewLetter() {
            this.viewModalBeforeSigned = true;
            this.loaderPdf = true;
            this.base64 = null;
            Service.viewPdfByLetterId(this.selectedTrItem.letterId)
                .then((res) => {
                    setTimeout(() => {
                        this.base64 = res.data;
                    }, 300);
                })
                .finally(() => {
                    this.loaderPdf = false;
                });
        },
        viewDocBeforeSigned() {
            // this.viewModalBeforeSigned = true;
            // this.getByIdLetter();
            this.viewLetter();
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
        getAttachedFilesById(id) {
            Service.getAttachedFilesById(id).then((res) => {
                this.filesList = res.data;
            });
        },
        saveRejected(payload) {
            this.rejectedLoader = true;
            Service.saveRejected(
                this.selectedTrItem.letterId,
                this.selectedTrItem.id,
                this.reasonRejected,
                payload
            )
                .then(async () => {
                    this.isRejectedModal = false;
                    let tempData = this.selectedTrItem;
                    await this.successSaved();
                    await this.getList();
                    await this.getIncomeTotalCount();
                    setTimeout(() => {
                        let newdata = this.list.find((e) => e.id == tempData.id);
                        this.selectedTrItem = newdata;
                        this.$forceUpdate();
                        this.getReceivers(this.selectedTrItem);
                    }, 500);
                })
                .finally(() => {
                    this.rejectedLoader = false;
                });
        },
        showRejectedModal() {
            this.isRejectedModal = true;
        },
        viewDocSigned() {
            this.viewModal = true;
        },
        getIncomeTotalCount() {
            Service.getIncomeTotalCount().then((rs) => {
                this.agreementCount = rs.data.agreement;
                this.reviewCount = rs.data.review;
                this.signatureCount = rs.data.signature;
            });
        },
        signSuccess(data) {
            let payload = {
                signedContent: data.content,
                inn: data.inn,
                pnfl: data.pnfl
            };
            if (this.isRejectedModal) {
                this.isModalKeys = false;
                this.signatureModal = false;
                this.saveRejected(payload)
            } else {
                if (this.selectedTrItem.status === 'COMMISSION_SEND') {
                    Service.onlyDocSign(payload, this.selectedTrItem.id)
                        .then(async () => {
                            this.isModalKeys = false;
                            this.signatureModal = false;
                            let tempData = this.selectedTrItem;
                            await showMsgSuccess(this.$t("successDocSigned"));
                            await this.getList();
                            await this.getIncomeTotalCount();
                            setTimeout(() => {
                                let newdata = this.list.find((e) => e.id == tempData.id);
                                this.selectedTrItem = Object.assign({}, newdata);
                                this.$forceUpdate();
                                this.getReceivers(this.selectedTrItem);
                            }, 1000);
                        })
                        .catch((err) => {
                            // this.catchErr(err);
                        });
                } else {
                    Service.signDoc(payload, this.selectedTrItem.id, this.commissionTypeId, this.commissionComment)
                        .then(async () => {
                            this.isModalKeys = false;
                            this.signatureModal = false;
                            this.attachchedModal = false;
                            let tempData = this.selectedTrItem;
                            await showMsgSuccess(this.$t("successDocSigned"));
                            await this.getList();
                            await this.getIncomeTotalCount();
                            setTimeout(() => {
                                let newdata = this.list.find((e) => e.id == tempData.id);
                                this.selectedTrItem = Object.assign({}, newdata);
                                this.$forceUpdate();
                                this.getReceivers(this.selectedTrItem);
                            }, 1000);
                        })
                        .catch((err) => {
                            // this.catchErr(err);
                        });
                }
            }
        },
        getReceivers(item) {
            this.loaderReceiver = true;
            Service.getReceivers(item.letterId)
                .then((rs) => {
                    this.infoData = rs.data;
                })
                .finally(() => {
                    this.loaderReceiver = false;
                });
        },
        clickTrItem(item) {
            if (this.selectedTrItem.id == item.id) {
                if (this.isTabDxa) {
                    this.selectedTrItem = {};
                    this.infoData = {};
                } else {
                    this.selectedAppByStatus = {}
                }
            } else {
                if (this.isTabDxa) {
                    this.selectedTrItem = item;
                } else {
                    if (this.selectedApplicationItem) {
                        this.$set(this.selectedApplicationItem, 'id', item.id)
                        this.selectedApplicationItem = Object.assign({}, item)
                    }
                    this.selectedAppByStatus = item;
                    if (this.currentTabIndex == 0) {
                        this.getAppById(item);
                    }
                }
                // this.getAttachedFilesById(item.letterId);
                // this.getReceivers(item);
            }
        },
        signatureItem() {
            this.isModalKeys = true;
        },
        // rowclick
        async selectAppealRowTr(item) {
            if (this.selectedAppealTrItem.id == item.id) {
                this.selectedAppealTrItem = {};
            }
            this.selectedAppealTrItem = item;
        },
        // rowclick
        async selectSendTypeInTr(v, item) {

            if (Object.keys(this.selectedTrItem).length === 0) {
                this.$toast(this.$t('submodules.doc.selected_doc'), {type: 'warning'});
            } else {
                if (this.active == v) {
                    this.active = "";
                } else {
                    this.active = v;
                }
                this.selected();
            }
        },
        selectSendType(v) {
            if (Object.keys(this.selectedTrItem).length === 0) {
                this.$toast(this.$t('submodules.doc.selected_doc'), {type: 'warning'});
            } else {
                if (this.active == v) {
                    this.active = "";
                } else {
                    this.active = v;
                }
                this.selected();
            }
        },
        noPermitRequired(applicationId) {
            this.modalNoPermitRequired = true;
            this.noPermitRequiredApplicationId = applicationId;
        },
        sendNoPermitRequired() {
            if (this.loading) {
                return false;
            }
            this.loading = true;
            Service.applicationReviewNoPermitRequired(this.noPermitRequiredApplicationId, this.noPermitRequiredText)
                .finally(() => {
                    this.getList()
                    this.modalNoPermitRequired = false;
                    this.noPermitRequiredApplicationId = null;
                    this.noPermitRequiredText = '';
                    this.loading = false;
                    this.isSidebarRegion = false;
                    this.closeSidebar()
                })
        },
        async selected() {
            if (this.active === 'VIEW') {
                this.isSidebar = true
                await this.$refs.isSidebar_ref.getApplicationInfoById()
                await this.$refs.isSidebar_ref.getVisaInfoById()
            } else if (this.active === 'ACCEPT') {
                this.$bvModal.msgBoxConfirm(this.$t('messages.accept_title'), {
                    okTitle: this.$t('actions.confirm'),
                    cancelTitle: this.$t('actions.cancel')
                })
                    .then(value => {
                        if (value) {
                            Service.getByIdPharmAppeals(this.selectedTrItem.id, this.selectedRegion)
                                .then((res) => {
                                    this.$toast(this.$t('messages.accepted_message'), {type: 'success'});
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                                .finally(async () => {
                                    await this.getList();
                                    this.selectedTrItem = {}
                                    this.active = ''
                                })
                        } else {
                            this.active = ""
                        }
                    })
                    .catch(err => {
                        // An error occurred
                    })
            } else if (this.active === 'SEND_REGION') {
                this.isSidebarRegion = true
            }
        },
        makeAgree(item) {
            this.cnf().then((rs) => {
                if (rs.value) {
                    Service.makeAgree(item.letterId).then(async () => {
                        let tempData = this.selectedTrItem;
                        await this.successSaved();
                        await this.getList();
                        await this.getIncomeTotalCount();
                        setTimeout(() => {
                            let newdata = this.list.find((e) => e.id == tempData.id);
                            this.selectedTrItem = newdata;
                            this.$forceUpdate();
                            this.getReceivers(this.selectedTrItem);
                        }, 500);
                    });
                }
            });
        },
        makeReview(item) {
            this.cnf().then((rs) => {
                if (rs.value) {
                    Service.makeReview(item.letterId).then(async () => {
                        let tempData = this.selectedTrItem;
                        await this.successSaved();
                        await this.getList();
                        await this.getIncomeTotalCount();
                        setTimeout(() => {
                            let newdata = this.list.find((e) => e.id == tempData.id);
                            this.selectedTrItem = newdata;
                            this.$forceUpdate();
                            this.getReceivers(this.selectedTrItem);
                        }, 500);
                    });
                }
            });
        },
        rejectConfirm() {
            cnfDoc(this.$t("messages.reject_title")).then((rs) => {
                if (rs.value) {
                    this.signatureModal = true;
                }
            });
        },
        signItem(item) {
            if (item.action === "SIGNATURE") {
                /* if (item.status === 'COMMISSION_SEND') {
            this.signatureModal = true;
        } else { */
                this.currentItem = item;
                // this.signatureModal = true;

                if (item.status === "SEND_SIGN" || item.status === "SEND" || item.status === 'COMMISSION_SEND') {

                    // GET COMMISSION_TYPES
                    /* crudAndListsService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
              .then(res => {
                  this.commissionTypes = res.data.list
              })
              .catch(e => {
                  console.log(e)
              })
          this.commissionsModal = true; */

                    // this.signatureModal = true;
                    this.$router.push(
                        `/letter/income/${item.letterId}/${item.id}`
                    );
                } else {
                    cnfDoc(this.$t("docConfirm")).then((rs) => {
                        if (rs.value) {
                            this.signatureModal = true;
                        }
                    });
                }
                // }
            } else if (item.action === "AGREEMENT") {
                this.makeAgree(item);
            } else if (item.action === "REVIEW") {
                this.makeReview(item);
            }
        },
        async closeSidebar() {
            this.selectedTrItem = {}
            this.isSidebar = false
            this.active = "";
        },
        async closeRegionSidebar() {
            this.isSidebarRegion = false
            this.active = "";
        },
        async save(region) {
            if (region.id) {
                this.selectedRegion = region.id
                await Service.acceptSenderRegion(this.selectedTrItem.id, this.selectedRegion)
                    .then((res) => {
                        this.isSidebarRegion = false
                        this.$toast(this.$t('messages.accepted_message'), {type: 'success'});
                    })
                    .catch(e => {
                        console.log(e)
                    })
                    .finally(async () => {
                        await this.getList();
                        this.selectedTrItem = {}
                        this.active = ''
                        this.isSidebar = false
                    })
            } else {
                // this.enterInfo();
            }

        },
        add() {
            this.isModal = true;
        },
        getList() {
            this.loading = true;
            Service.getDoerAppealList(this.params)
                .then((res) => {
                    this.appealList = res.data.list;
                    this.total = res.data.total;
                })
                .catch((err) => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getListDXAByStatus() {
            this.loading = true;
            Service
                .listDXA_ApplicationsByStatus(this.var_default_search_payload, this.selectedAppStatus, this.searchValue, this.activeDXATab)
                .then((res) => {
                    this.list = res.data.list;
                    this.total = res.data.total;
                })
                .catch(e => {
                    this.list = [];
                    this.total = 0;
                })
                .finally(() => {
                    this.loading = false
                })
        },
    },
};
</script>

<template>
  <!-- <Layout> -->
    <div>
        <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('submodules.commission.monitor') }}</div>
        </div>
        <!--        <Modal-->
        <!--                :scroll="true"-->
        <!--                :variantOk="'success'"-->
        <!--                :value="editModal"-->
        <!--                @okModal="okModal"-->
        <!--                @closeModal="editModal = false"-->
        <!--                :title="selectedTrItem.fileName"-->
        <!--                :cancelText="'actions.cancel'"-->
        <!--                @viewModalClick="viewModalClick"-->
        <!--                :okText="'actions.save'"-->
        <!--                :signerHide="false"-->
        <!--                ref="editModalRef"-->
        <!--                :size="'xl'"-->
        <!--        >-->
        <!--            <template v-slot:body>-->
        <!--                <div>-->
        <!--                    <Editor-->
        <!--                            ref="editorRef"-->
        <!--                            @changeText="changeText"-->
        <!--                    />-->
        <!--                </div>-->
        <!--            </template>-->
        <!--        </Modal>-->

        <!-- <PageHeader :title="title" :items="items" /> -->
        <!-- for view ilova -->
        <b-modal
                scrollable
                v-model="viewIlovaModal"
                size="xl"
                :title="$t('actions.view')"
        >
            <div
                    style="height: 700px"
                    v-if="ilovaUploadPath"
            >
                <embed
                        width="100%"
                        height="800"
                        :src="`${baseUrl}/${ilovaUploadPath}`"
                        type="application/pdf"
                />
            </div>
            <template v-slot:modal-footer>
                <b-button
                        variant="secondary"
                        @click="viewIlovaModal = false"
                >{{
                    $t("actions.close")
                    }}
                </b-button>
            </template>
        </b-modal>


        <!-- for view document -->
        <b-modal
                scrollable
                v-model="viewModal"
                size="xl"
                :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
        >
            <div
                    style="height: 700px"
                    v-if="selectedTrItem.url"
            >
                <embed
                        width="100%"
                        height="800"
                        :src="`${baseUrl}/${selectedTrItem.url}`"
                        type="application/pdf"
                />
            </div>
            <template v-slot:modal-footer>
                <b-button
                        variant="secondary"
                        @click="viewModal = false"
                >{{
                    $t("actions.close")
                    }}
                </b-button>
            </template>
        </b-modal>

        <!-- modal view before modal -->
        <b-modal
                scrollable
                v-model="viewModalBeforeSigned"
                size="xl"
                body-bg-variant="light"
                :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
        >
            <b-overlay
                    variant="white"
                    :opacity="1"
                    :show="loaderPdf"
                    rounded="lg"
            >
                <div style="min-height: 700px">
                    <embed
                            style="width: 100%;"
                            :style="`min-height:${heightWindow-250}px`"
                            v-if="base64"
                            :src="`data:application/pdf;base64, ${base64}`"
                    />
                </div>
            </b-overlay>

            <template v-slot:modal-footer>
                <b-button
                        variant="secondary"
                        @click="viewModalBeforeSigned = false"
                >{{ $t("actions.close") }}
                </b-button>
            </template>
        </b-modal>

        <!-- COMMISSIONS MODAL -->
        <b-modal
                scrollable
                v-model="attachchedModal"
                size="md"
                :title="`${$t('pharm.attachched_employee')}`"
                style="height: 600px"
        >
            <div>
                <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="form1.employeeId"
                        :options="employeeAttachched.map(e => e.id)"
                        :label="$t('assign_employee')"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelAttachchedEmployees"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                ></BaseMultiselectWithValidation>
            </div>

            <b-form-textarea
                    class="mt-3"
                    v-model="form1.comment"
                    :placeholder="$t('submodules.doc.summary')"
                    rows="5"
            ></b-form-textarea>

            <template v-slot:modal-footer>
                <b-button
                        variant="success"
                        @click="openSignatureModalForAttachchedEmployees"
                >
                    <b-overlay
                            :opacity="0.1"
                            :show="attachchedModalLoader"
                            rounded="sm"
                    >
                        {{ $t("actions.continue") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>
        <!-- rejected modal -->
        <b-modal
                scrollable
                v-model="isRejectedModal"
                size="md"
                :title="`${$t('submodules.reports.reasonRejected')}`"
        >
            <b-form-textarea
                    v-model="reasonRejected"
                    rows="5"
            ></b-form-textarea>

            <template v-slot:modal-footer>
                <b-button
                        variant="danger"
                        @click="rejectConfirm"
                >
                    <b-overlay
                            :opacity="0.1"
                            :show="rejectedLoader"
                            rounded="sm"
                    >
                        {{ $t("submodules.reports.rejected") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>

        <!-- No Permit Required modal -->
        <b-modal scrollable v-model="modalNoPermitRequired" size="md" :title="$t('submodules.dxa.no_permit_required')">
            <div>
                {{ $t('column.comment') }}
            </div>
            <b-form-textarea v-model="noPermitRequiredText" rows="5"/>
            <template v-slot:modal-footer>
                <b-button variant="danger" @click="sendNoPermitRequired">
                    <b-overlay :opacity="0.1" :show="loader" rounded="sm">
                        {{ $t("actions.send") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>


        <div class="row" v-if="activeTab">
            <div class="col-12">
                <!--                <div class="card">-->
                <!--                    <div class="card-body p-2">-->
                <!--                        <div class="row">-->
                <!--                            <div class='col-12'>-->
                <!--                                <div class="d-inline-block mt-1">-->
                <!--                                    <div class="search-box">-->
                <!--                                        <div class="position-relative">-->
                <!--                                            <input-->
                <!--                                                    style="width: 300px"-->
                <!--                                                    type="text"-->
                <!--                                                    v-model="searchValue"-->
                <!--                                                    class="form-control rounded bg-light border-light"-->
                <!--                                                    :placeholder="$t('actions.search')"-->
                <!--                                            />-->
                <!--                                            <i class="mdi mdi-magnify search-icon"></i>-->
                <!--                                        </div>-->
                <!--                                    </div>-->
                <!--                                </div>-->
                <!--                            </div>-->
                <!--                            <div class="col-12">-->
                <!--                                <div class="text-sm-right">-->
                <!--                                    <div :class="!isTabDxa && activeTab ? 'w-100' : ''" class="float-right">-->
                <!--                                        <div v-if="isTabDxa" class="d-flex align-items-center">-->
                <!--                                            &lt;!&ndash;                      <div&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          v-show="selectedTrItem.applicationStatus === 'DESCENDED' || selectedTrItem.applicationStatus === 'RETURN_FOR_COMPLETE'"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          @click.prevent="selectSendType(dc.value)"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          class="card m-0 my-card-hovered_2 mr-3"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          v-for="(dc, index) in sendTypeList"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          :key="index + 'doc'"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          :class="dc.value == active ? 'my-card-active' : ''"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                      >&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                        <div&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                            class="&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    card-body&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    p-0&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    text-center&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    d-flex&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    align-items-center&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                    justify-content-center&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                  ">&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          <div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                            <div class="d-flex align-items-center">&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                              <img&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  :src="dc.value === 'SEND_REGION'&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  ? require('@/assets/doc/5.png')&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  : require('@/assets/doc/1.png')"&ndash;&gt;-->

                <!--                                            &lt;!&ndash;                                  alt="DOC"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  height="30"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                              />&ndash;&gt;-->

                <!--                                            &lt;!&ndash;                              <div class="ml-2">&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                <p class="m-0">&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  {{ dc.label }}&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                </p>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                              </div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                              <div class="ml-2">&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                <b-badge&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    v-if="&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                            dc.value === 'AGREEMENT' &&&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                            agreementCount > 0&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                          "&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    variant="success"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                >&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  {{ agreementCount }}&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                </b-badge>&ndash;&gt;-->

                <!--                                            &lt;!&ndash;                                <b-badge&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    v-if="&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                            dc.value === 'SIGNATURE' &&&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                            signatureCount > 0&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                          "&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    variant="success"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                >&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  {{ signatureCount }}&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                </b-badge>&ndash;&gt;-->

                <!--                                            &lt;!&ndash;                                <b-badge&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    v-if="&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                            dc.value === 'REVIEW' && reviewCount > 0&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                                          "&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                    variant="success"&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                >&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                  {{ reviewCount }}&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                                </b-badge>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                              </div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                            </div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                          </div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                        </div>&ndash;&gt;-->
                <!--                                            &lt;!&ndash;                      </div>&ndash;&gt;-->
                <!--                                        </div>-->
                <!--                                    </div>-->
                <!--                                </div>-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->

                <!-- STATISTICS FOR DXA APPLICATION-->
                <!--                <div class="row" v-if="isTabDxa && activeTab === 'dxa'">-->
                <!--                    <div class="col-7">-->
                <!--                        <div class="card">-->
                <!--                            <div class="card-body pt-3 px-3"-->
                <!--                                 :class="(loadingChartDataForDXA || loadingMonthlyChartDataForDXA) ? 'pb-3' : 'pb-1'">-->
                <!--                                &lt;!&ndash; SKELETON-LOADER &ndash;&gt;-->
                <!--                                <template v-if="loadingChartDataForDXA || loadingMonthlyChartDataForDXA">-->
                <!--                                    <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>-->
                <!--                                    <b-skeleton-img no-aspect height="230px"></b-skeleton-img>-->
                <!--                                </template>-->
                <!--                                &lt;!&ndash; Column Charts &ndash;&gt;-->
                <!--                                <template v-else>-->
                <!--                                    <h4 class="card-title mb-2 d-flex justify-content-between">-->
                <!--                                        {{ $t('column.monthly_general_statistics') }}-->
                <!--                                        <BaseDatePickerWithValidation-->
                <!--                                                not-required-->
                <!--                                                disable-after-->
                <!--                                                :clearable="false"-->
                <!--                                                type="year"-->
                <!--                                                format="YYYY"-->
                <!--                                                custom-styles="grid-template-columns: 50% 50%"-->
                <!--                                                v-model="lineWithDataChartForDXA.year"-->
                <!--                                                @change="fetchDataForMonthlyChartForDXA(true, $event)"-->
                <!--                                                :placeholder="$t('column.year')"-->
                <!--                                                lang="ru"-->
                <!--                                        ></BaseDatePickerWithValidation>-->
                <!--                                    </h4>-->
                <!--                                    <vue-apex-charts-->
                <!--                                            class="apex-charts"-->
                <!--                                            height="210"-->
                <!--                                            type="line"-->
                <!--                                            dir="ltr"-->
                <!--                                            :series="lineWithDataChartForDXA.series"-->
                <!--                                            :options="lineWithDataChartForDXA.chartOptions"-->
                <!--                                    ></vue-apex-charts>-->
                <!--                                </template>-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                    <div class="col-5">-->
                <!--                        <div class="card">-->
                <!--                            <div class="card-body p-3">-->
                <!--                                &lt;!&ndash; SKELETON-LOADER &ndash;&gt;-->
                <!--                                <template v-if="loadingChartDataForDXA">-->
                <!--                                    <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>-->
                <!--                                    <div class="row">-->
                <!--                                        <div class="col-5 mt-2">-->
                <!--                                            <b-skeleton animation="wave" width="55%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="75%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="85%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="65%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="90%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="75%"></b-skeleton>-->
                <!--                                            <b-skeleton animation="wave" width="55%"></b-skeleton>-->
                <!--                                        </div>-->
                <!--                                        <div class="col-7">-->
                <!--                                            <b-skeleton-img no-aspect height="230px"></b-skeleton-img>-->
                <!--                                        </div>-->
                <!--                                    </div>-->
                <!--                                </template>-->
                <!--                                &lt;!&ndash; Donut Chart &ndash;&gt;-->
                <!--                                <template v-else>-->
                <!--                                    <h4 class="card-title mb-2">{{ $t('column.current_statistics') }}</h4>-->
                <!--                                    <vue-apex-charts-->
                <!--                                            class="apex-charts"-->
                <!--                                            height="225"-->
                <!--                                            type="donut"-->
                <!--                                            dir="ltr"-->
                <!--                                            :series="donutChartForDXA.series"-->
                <!--                                            :options="donutChartForDXA.chartOptions"-->
                <!--                                    ></vue-apex-charts>-->
                <!--                                </template>-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->

                <!-- APPLICATIONS TABS -->
                <div class="row">
                    <!-- APPLICATIONS TABS -->
                    <div class="col-7">
                        <div class="row">
                            <!-- COLUMN CHART COLUMN -->
                            <!--                            <div class="col-12 pr-1 pl-0 pt-1">-->
                            <!--                                <div class="card mb-1">-->
                            <!--                                    <div class="card-body pt-3 px-3"-->
                            <!--                                         :class="(loadingChartData || loadingMonthlyChartData) ? 'pb-3' : 'pb-1'">-->
                            <!--                                        &lt;!&ndash; SKELETON-LOADER &ndash;&gt;-->
                            <!--                                        <template v-if="loadingChartData || loadingMonthlyChartData">-->
                            <!--                                            <b-skeleton class="card-title mb-2" animation="wave"-->
                            <!--                                                        width="35%"></b-skeleton>-->
                            <!--                                            <b-skeleton-img no-aspect height="230px"></b-skeleton-img>-->
                            <!--                                        </template>-->
                            <!--                                        &lt;!&ndash; Column Charts &ndash;&gt;-->
                            <!--                                        <template v-else>-->
                            <!--                                            <h4 class="card-title mb-2 d-flex justify-content-between">-->
                            <!--                                                {{ $t('column.monthly_general_statistics') }}-->
                            <!--                                                <BaseDatePickerWithValidation-->
                            <!--                                                        not-required-->
                            <!--                                                        disable-after-->
                            <!--                                                        :clearable="false"-->
                            <!--                                                        type="year"-->
                            <!--                                                        format="YYYY"-->
                            <!--                                                        custom-styles="grid-template-columns: 50% 50%"-->
                            <!--                                                        v-model="lineWithDataChart.year"-->
                            <!--                                                        @change="fetchDataForMonthlyChart(true, $event)"-->
                            <!--                                                        :placeholder="$t('column.year')"-->
                            <!--                                                        lang="ru"-->
                            <!--                                                ></BaseDatePickerWithValidation>-->
                            <!--                                            </h4>-->
                            <!--                                            <vue-apex-charts-->
                            <!--                                                    class="apex-charts"-->
                            <!--                                                    height="210"-->
                            <!--                                                    type="line"-->
                            <!--                                                    dir="ltr"-->
                            <!--                                                    :series="lineWithDataChart.series"-->
                            <!--                                                    :options="lineWithDataChart.chartOptions"-->
                            <!--                                            ></vue-apex-charts>-->
                            <!--                                        </template>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                            </div>-->

                            <div class="col-12 pr-1 pl-0 pt-1">
                                <div class="card card-body card-tabs p-2 mb-1" style="min-height: 35em">
                                    <!-- STATUSES TO FILTER -->
                                    <div class="mb-2 overflow-auto">
                                        <!--                                        <b-collapse v-model="applicationStatusDXAFilterCollapse" class="mt-2">-->
                                        <!--                                            <b-form-radio-group-->
                                        <!--                                                    class="btn-custom mb-0"-->
                                        <!--                                                    button-variant="outline-primary"-->
                                        <!--                                                    id="application-statuses-for-filter"-->
                                        <!--                                                    v-model="selectedAppStatus"-->
                                        <!--                                                    buttons-->
                                        <!--                                                    name="application-statuses-for-filter"-->
                                        <!--                                            >-->
                                        <!--                                                <template-->
                                        <!--                                                        v-for="(status, key) in statusCodesForDXAComputedFirst">-->
                                        <!--                                                    <b-form-radio :value="key" button-variant="light"-->
                                        <!--                                                                  :style="status.style" :key="key">-->
                                        <!--                                                        <span>  {{ $t(status.label) }}</span>-->
                                        <!--                                                        <b-badge-->
                                        <!--                                                                class="ml-1"-->
                                        <!--                                                                variant="primary"-->
                                        <!--                                                                v-if="chartDataForDXA.find(el => el.status === key) && chartDataForDXA.find(el => el.status === key).count > 0"-->
                                        <!--                                                        >{{-->
                                        <!--                                                            chartDataForDXA.find(el => el.status === key).count-->
                                        <!--                                                            }}-->
                                        <!--                                                        </b-badge>-->
                                        <!--                                                    </b-form-radio>-->
                                        <!--                                                </template>-->
                                        <!--                                            </b-form-radio-group>-->
                                        <!--                                                <b-form-radio-group-->
                                        <!--                                                        class="btn-custom mb-0"-->
                                        <!--                                                        button-variant="outline-primary"-->
                                        <!--                                                        id="application-statuses-for-filter2"-->
                                        <!--                                                        v-model="selectedAppStatus"-->
                                        <!--                                                        buttons-->
                                        <!--                                                        name="application-statuses-for-filter2"-->
                                        <!--                                                >-->
                                        <!--                                                    <template-->
                                        <!--                                                            v-for="(status, key) in statusCodesForDXAComputedSecond">-->
                                        <!--                                                        <b-form-radio :value="key" button-variant="light"-->
                                        <!--                                                                      :style="status.style" :key="key">-->
                                        <!--                                                            <span>  {{ $t(status.label) }}</span>-->
                                        <!--                                                            <b-badge-->
                                        <!--                                                                    class="ml-1"-->
                                        <!--                                                                    variant="primary"-->
                                        <!--                                                                    v-if="chartDataForDXA.find(el => el.status === key) && chartDataForDXA.find(el => el.status === key).count > 0"-->
                                        <!--                                                            >{{-->
                                        <!--                                                                chartDataForDXA.find(el => el.status === key).count-->
                                        <!--                                                                }}-->
                                        <!--                                                            </b-badge>-->
                                        <!--                                                        </b-form-radio>-->
                                        <!--                                                    </template>-->
                                        <!--                                                </b-form-radio-group>-->
                                        <!--                                        </b-collapse>-->
                                        <!--                                        <b-button-->
                                        <!--                                                class="my-1"-->
                                        <!--                                                variant="secondary"-->
                                        <!--                                                @click="applicationStatusDXAFilterCollapse = !applicationStatusDXAFilterCollapse"-->
                                        <!--                                        >-->
                                        <!--                                            {{-->
                                        <!--                                            applicationStatusDXAFilterCollapse ? $t('actions.status_filter_close') : $t('actions.status_filter_open')-->
                                        <!--                                            }}-->
                                        <!--                                        </b-button>-->
                                        <div class="d-inline-block mt-1 float-left">
                                            <div class="search-box">
                                                <div class="position-relative">
                                                    <input
                                                            style="width: 300px"
                                                            type="text"
                                                            v-model="searchValue"
                                                            class="form-control rounded bg-light border-light"
                                                            :placeholder="$t('actions.search')"
                                                    />
                                                    <i class="mdi mdi-magnify search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card-body" style="min-height: 70vh">
                                        <div class="table-responsive">
                                            <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                                                <table class=" table table-centered table-striped table-nowrap table-hover ">
                                                    <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col" class="text-center"
                                                            style="width: 70px">
                                                            №
                                                        </th>
                                                        <th class="text-center" scope="col">
                                                            {{ $t("pharm.appeal_number") }}
                                                        </th>

                                                        <th class="text-center" scope="col">
                                                            {{ $t("pharm.appeal_fio") }}
                                                        </th>
                                                        <th class="text-center" scope="col">
                                                            {{ $t("pharm.appeal_date") }}
                                                        </th>
                                                        <th class="text-center" scope="col">
                                                            {{ $t("pharm.medicine_name") }}
                                                        </th>
                                                        <!--                                                        <th class="text-center" scope="col">-->
                                                        <!--                                                            {{ $t("profile.inn") }}-->
                                                        <!--                                                        </th>-->
                                                        <!--                                                        <th class="text-center" scope="col">-->
                                                        <!--                                                            {{ $t("submodules.doc.sender") }}-->
                                                        <!--                                                        </th>-->
                                                        <th class="text-center" scope="col">
                                                            {{
                                                            $t('pharm.status')
                                                            }}
                                                        </th>
                                                        <!--                                                        <th class="text-center" scope="col">-->
                                                        <!--                                                            {{ $t('actions.view') }}-->
                                                        <!--                                                        </th>-->
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="text-center" v-if="appealList.length === 0">
                                                        <td colspan="9"
                                                            :style="loading ? 'height:50px' : ''"
                                                            style="vertical-align: middle">
                                                            <h5>
                                                                {{ $t("messages.data_not_found") }}
                                                            </h5>
                                                        </td>
                                                    </tr>
                                                    <tr @click.prevent="selectAppealRowTr(item)"
                                                        class="p_cursor"
                                                        v-for="(item, index) in appealList"
                                                        :key="index + 'CREATE_DOC'"
                                                        :class="
                                          selectedTrItem.id == item.id
                                            ? 'bg-soft-primary text-primary'
                                            : item.status === 'CANCELED'
                                            ? 'bg-soft-danger text-danger'
                                            : item.status === 'SIGNED'
                                            ? 'bg-soft-success text-dark'
                                            : 'bg-white  text-dark font-weight-bold '
                                        "
                                                    >
                                                        <td class="text-center">
                                                            <strong>{{
                                                                paginate(index, limit, page - 1)
                                                                }}</strong>
                                                        </td>
                                                        <td class="text-center"
                                                            :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                                            {{ item.mnumber ? item.mnumber : "" }}
                                                        </td>
                                                        <td class="text-center"
                                                            :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                                            {{ item.consumerLastName }} {{ item.consumerFirstName }}
                                                            {{ item.consumerMiddleName }}
                                                        </td>
                                                        <td class="text-center"
                                                            :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                                            <p class="pre m-0">
                                                                {{ new Date(item.createJson).ddmmyyyyhhmmss() }}
                                                            </p>
                                                        </td>
                                                        <td class="text-center"
                                                            :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                                            <p class="pre m-0">{{ item.medicationName }}</p>
                                                        </td>
                                                        <td class="text-center"
                                                            :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                                            <b-badge variant="success" class="p-1"
                                                                     v-if="item.status === 'CREATED'">
                                                                {{
                                                                $t('submodules.commission.doc_status.doc_created')
                                                                }}
                                                            </b-badge>
                                                            <b-badge variant="success" class="p-1"
                                                                     v-if="item.status === 'SEND_TO_REGION'">
                                                                {{
                                                                $t('pharm.send_to_region')
                                                                }}
                                                            </b-badge>
                                                            <b-badge variant="primary" class="p-1"
                                                                     v-if="item.status === 'BEING_SEEN'">
                                                                {{ $t('submodules.commission.doc_status.doc_seen') }}
                                                            </b-badge>
                                                        </td>
                                                        <!--                                                        <td class="text-center">-->
                                                        <!--                                                            <i @click.prevent="selectSendTypeInTr('VIEW', item)"-->
                                                        <!--                                                               style="color: #0b83e8"-->
                                                        <!--                                                               class="fa fa-eye fa-2x"></i>-->
                                                        <!--                                                        </td>-->

                                                        <!--                      <td-->
                                                        <!--                          :class="!item.isRead ? 'font-weight-bold' : ''"-->
                                                        <!--                          class="text-center p-0"-->
                                                        <!--                      >-->
                                                        <!--                        {{-->
                                                        <!--                          item.action === "SIGNATURE"-->
                                                        <!--                              ? $t("forSignature")-->
                                                        <!--                              : item.action === "AGREEMENT"-->
                                                        <!--                                  ? $t("forAgreement")-->
                                                        <!--                                  : item.action === "REVIEW"-->
                                                        <!--                                      ? $t("forReview")-->
                                                        <!--                                      : ""-->
                                                        <!--                        }}-->
                                                        <!--                        <i-->
                                                        <!--                            v-if="item.action === 'SIGNATURE' && item.signed"-->
                                                        <!--                            class="-->
                                                        <!--                                mdi mdi-check-all-->
                                                        <!--                                font-size-22-->
                                                        <!--                                p-0-->
                                                        <!--                                ml-2-->
                                                        <!--                                text-success-->
                                                        <!--                              "-->
                                                        <!--                        ></i>-->

                                                        <!--                        <i-->
                                                        <!--                            v-if="item.action === 'AGREEMENT' && item.isAgreed"-->
                                                        <!--                            class="-->
                                                        <!--                                mdi mdi-handshake-->
                                                        <!--                                font-size-22-->
                                                        <!--                                ml-2-->
                                                        <!--                                text-success-->
                                                        <!--                              "-->
                                                        <!--                        ></i>-->

                                                        <!--                        <i-->
                                                        <!--                            v-if="item.action === 'REVIEW' && item.isViewed"-->
                                                        <!--                            class="-->
                                                        <!--                                mdi mdi-file-eye-->
                                                        <!--                                font-size-18 font-size-16-->
                                                        <!--                                ml-2-->
                                                        <!--                                text-success-->
                                                        <!--                              "-->
                                                        <!--                        ></i>-->
                                                        <!--                      </td>-->
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </b-overlay>
                                        </div>
                                        <div class="row" v-if="total > 0">
                                            <div class="col-lg-12">
                                                <b-pagination
                                                        size="sm"
                                                        class="m-0"
                                                        :total-rows="total"
                                                        :per-page="limit"
                                                        v-model="page"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="row">
                            <!-- DONUT CHART COLUMN -->
                            <!--                            <div class="col-12 pl-1 pr-1 pt-1">-->
                            <!--                                <div class="card mb-1 pb-1">-->
                            <!--                                    <div class="card-body p-3">-->
                            <!--                                        &lt;!&ndash; SKELETON-LOADER &ndash;&gt;-->
                            <!--                                        <template v-if="loadingChartData">-->
                            <!--                                            <b-skeleton class="card-title mb-2" animation="wave"-->
                            <!--                                                        width="35%"></b-skeleton>-->
                            <!--                                            <div class="row">-->
                            <!--                                                <div class="col-5 mt-2">-->
                            <!--                                                    <b-skeleton animation="wave" width="55%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="75%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="85%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="65%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="90%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="75%"></b-skeleton>-->
                            <!--                                                    <b-skeleton animation="wave" width="55%"></b-skeleton>-->
                            <!--                                                </div>-->
                            <!--                                                <div class="col-7">-->
                            <!--                                                    <b-skeleton-img no-aspect height="230px"></b-skeleton-img>-->
                            <!--                                                </div>-->
                            <!--                                            </div>-->
                            <!--                                        </template>-->
                            <!--                                        &lt;!&ndash; Donut Chart &ndash;&gt;-->
                            <!--                                        <template v-else>-->
                            <!--                                            <h4 class="card-title mb-2">{{ $t('column.current_statistics') }}</h4>-->
                            <!--                                            <vue-apex-charts-->
                            <!--                                                    class="apex-charts"-->
                            <!--                                                    height="225"-->
                            <!--                                                    type="donut"-->
                            <!--                                                    dir="ltr"-->
                            <!--                                                    :series="donutChart.series"-->
                            <!--                                                    :options="donutChart.chartOptions"-->
                            <!--                                            ></vue-apex-charts>-->
                            <!--                                        </template>-->
                            <!--                                    </div>-->
                            <!--                                </div>-->
                            <!--                            </div>-->

                            <div class="col-12 pl-1 pr-1 pt-1">
                                <div class="card card-body card-tabs p-2 mb-1" style="min-height: 35em">
                                    <b-tabs
                                            content-class="mt-3"
                                            :no-fade="true"
                                            v-model="currentAppDetailsTabIndex"
                                            fill
                                    >
                                        <b-tab :title="$t('submodules.doc.tab_doc')">
                                            <b-overlay
                                                    :opacity="0.1"
                                                    :show="loadingById"
                                                    rounded="sm"
                                            >
                                                <div style="height: 72vh; overflow: auto"
                                                     v-if="Object.keys(this.selectedAppealTrItem).length !== 0">
                                                    <table
                                                            class="table m-0 "
                                                    >
                                                        <tbody>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b class="mt-3"> {{ $t('column.actions') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
<!--                                                         <a-->
                                                        <!--                                                                 href="../../../assets/pharm/document.doc"-->
                                                        <!--                                                                 download-->
                                                        <!--                                                                 type="file"-->
                                                        <!--                                                                 class="btn btn-icon btn-light btn-sm"-->
                                                        <!--                                                         >-->
                                                        <!--                  <span class="svg-icon svg-icon-md svg-icon-primary">-->
                                                        <!--                    <i class="fa fa-download"></i>-->
                                                        <!--                  </span>-->
                                                        <!--                </a>-->

                                                        <!--                                                        <a href="../../../assets/pharm/bot.docx" class="btn btn-success" download>Download</a>-->

                                                        <b-button
                                                            v-if="selectedAppealTrItem.status == 'BEING_SEEN'"
                                                                @click="setAttachchedEmployees"
                                                                variant="warning">
                                                            {{ $t('pharm.appeal_proccess') }}
                                                        </b-button>
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.appeal_number') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.mnumber }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumer') }}</b> <br>
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumerFirstName') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.consumerFirstName }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumerLastName') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.consumerLastName }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumerMiddleName') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.consumerMiddleName }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumerPhone') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.consumerPhone }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.consumerPinfl') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                        {{ selectedAppealTrItem.consumerPinfl }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.createJson') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{
                                                        new Date(selectedAppealTrItem.createJson).ddmmyyyyhhmmss()
                                                        }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.updateJson') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{
                                                        new Date(selectedAppealTrItem.updateJson).ddmmyyyyhhmmss()
                                                        }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.founderSharePercent') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.founderSharePercent }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.founderShareSum') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.founderShareSum }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.medication') }}</b> <br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.medicationName') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.medicationName }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.medicationPaymentDate') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.medicationPaymentDate }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.medicationPaymentPrice') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.medicationPaymentPrice }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.medicationReferentPrice') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.medicationReferentPrice }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacy') }}</b> <br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacyAddress') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.pharmacyAddress }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacyEmail') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.pharmacyEmail }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacyName') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.pharmacyName }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacySoato') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.pharmacySoato }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left">
                                                                <b> {{ $t('pharm.pharmacyTin') }}</b> <br>
                                                            </td>
                                                            <td class="text-right">
                                                    <span
                                                            style="font-size: 12px"
                                                            class="text-right"
                                                    >
                                                         {{ selectedAppealTrItem.pharmacyTin }}
                                                    </span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div
                                                        class="card card-body card-tabs mt-1 text-center"
                                                        style="min-height: 2em; width: 100%"
                                                        v-else-if="Object.keys(this.selectedAppealTrItem).length === 0"
                                                >
                                                    {{ $t('messages.data_not_found') }} {{ selectedAppealTrItem }}
                                                </div>

                                                <!--                                                <div-->
                                                <!--                                                        class="wrapper"-->
                                                <!--                                                        v-if="selectedApplicationItem.allFiles"-->
                                                <!--                                                >-->
                                                <!--                                                    <span CLASS="fromcenter">{{-->
                                                <!--                                                        $t('submodules.doc.application_file')-->
                                                <!--                                                        }}</span>-->
                                                <!--                                                </div>-->
                                                <!--                                                <div-->
                                                <!--                                                        class="card card-body card-tabs mt-1"-->
                                                <!--                                                        style="min-height: 10em; width: 100%"-->
                                                <!--                                                        v-if="1 || selectedApplicationItem.allFiles && selectedApplicationItem.allFiles.length"-->
                                                <!--                                                >-->
                                                <!--                                                    <tr-->
                                                <!--                                                            class="mt-3"-->
                                                <!--                                                            v-for="(item, index) in selectedApplicationItem.allFiles"-->
                                                <!--                                                            :key="index + 'FILE'"-->
                                                <!--                                                    >-->
                                                <!--                                                        <div class=" d-flex align-items-center bg-light p-2 justify-content-between">-->
                                                <!--                                                            <div class="d-flex align-items-center">-->
                                                <!--                                                                <a @click="viewIlova(item.url)"-->
                                                <!--                                                                   :download="getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? false : true"-->
                                                <!--                                                                   :href="getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"-->
                                                <!--                                                                >-->
                                                <!--                                                                    <BaseFileViewer-->
                                                <!--                                                                            class="my-card-hovered"-->
                                                <!--                                                                            :uploadPath="item.name"-->
                                                <!--                                                                    />-->
                                                <!--                                                                </a>-->
                                                <!--                                                                <span class="ml-2">{{ item.name }}</span>-->
                                                <!--                                                            </div>-->
                                                <!--                                                        </div>-->
                                                <!--                                                    </tr>-->
                                                <!--                                                </div>-->
                                                <!--                                                <div-->
                                                <!--                                                        class="card card-body card-tabs mt-1 text-center"-->
                                                <!--                                                        style="min-height: 2em; width: 100%"-->
                                                <!--                                                        v-else-if="selectedApplicationItem.allFiles"-->
                                                <!--                                                >-->
                                                <!--                                                    {{ $t('messages.data_not_found') }}-->
                                                <!--                                                </div>-->

                                            </b-overlay>
                                        </b-tab>
                                        <b-tab
                                                :title="$t('submodules.doc.tab_doc_tree')"
                                                lazy
                                        >
                                            <b-overlay
                                                    :opacity="0.1"
                                                    :show="loadingById"
                                                    rounded="sm"
                                            >
                                                <div
                                                        class="text-center card mt-3"
                                                        v-if="!selectedApplicationItem"
                                                >
                                                    <h5
                                                            style="opacity: 0.3"
                                                            class="p-3"
                                                    >
                                                        {{ $t("submodules.doc.selected_doc") }}
                                                    </h5>
                                                </div>
                                                <document-tree
                                                        v-else
                                                        ref="documentTreeRef"
                                                        :doc-id="selectedApplicationItem.id"
                                                        @toggleLoading="toggleLoading"
                                                ></document-tree>
                                            </b-overlay>
                                        </b-tab>
                                        <b-tab
                                                :title="$t('submodules.doc.tab_doc_history')"
                                                lazy
                                        >
                                            <b-overlay
                                                    :opacity="0.1"
                                                    :show="loadingById"
                                                    rounded="sm"
                                            >
                                                <div
                                                        class="text-center card mt-3"
                                                        v-if="!selectedApplicationItem"
                                                >
                                                    <h5
                                                            style="opacity: 0.3"
                                                            class="p-3"
                                                    >
                                                        {{ $t("submodules.doc.selected_doc") }}
                                                    </h5>
                                                </div>
                                                <document-history
                                                        v-else
                                                        ref="documentHistoryRef"
                                                        :doc-id="selectedApplicationItem.id"
                                                        @toggleLoading="toggleLoading"
                                                ></document-history>
                                            </b-overlay>
                                        </b-tab>

                                    </b-tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-sidebar
                v-model="isSidebarRegion"
                right
                shadow
                width="60%"
                class="sidebar-part"
                sidebar-class="p-0"
                :no-header="true"
        >
            <Regions
                    @save="save"
                    @close="closeRegionSidebar"
            />
        </b-sidebar>
    </div>
  <!-- </Layout> -->
</template>

<style scoped lang="scss">
#application-statuses-for-filter {
  label {
    font-size: .75em;
  }
}

#application-statuses-for-filter2 {
  label {
    font-size: .75em;
  }
}

.bg-class {
  background-color: #fbfbfb !important;
}

::v-deep.sidebar-part {
  .b-sidebar {
    height: 100vw;
    background: white;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.fromcenter {
  height: auto;
  font-size: 22px;
  text-align: center;
  color: #000;
  opacity: 0.8;
}

.fromcenter:after {
  display: block;
  content: "";
  border-bottom: solid 3px #eea529;
  transform: scaleX(0);
  transition: transform 300ms ease-in-out;
}

.fromcenter:hover:after {
  transform: scaleX(1);
}
</style>