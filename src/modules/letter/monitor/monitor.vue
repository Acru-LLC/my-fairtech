<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";
import Service from "../letterService";
import DXAApplicationAllInfo from "./DXA info/index";
import Regions from "./DXA info/region";
import VueApexCharts from 'vue-apexcharts'

import DocumentTree from "@/modules/commission/document-tree/document-tree";
import DocumentHistory from "@/modules/commission/document-history/document-history";
/**
 * Products-order component
 */
import { cnfDoc, showMsgSuccess } from "@/helper";
// import Receivers from "./receivers.vue";
import Editor from "../create/froal.editor.vue";
import Modal from "../create/modal.vue";

export default {
  components: {
    DocumentTree,
    DocumentHistory,
    DXAApplicationAllInfo,
    Regions,
    VueApexCharts,
    // Receivers,
    Editor,
    Modal,
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
        SENT: {
          label: this.$t('submodules.reports.report_sended'),
          color: '#556EE6',
        },
        CANCELLED: {
          label: this.$t('docs_r.CANCELED'),
          color: '#F46A6A',
        },
        SEND_FOR_COMMISSION: {
          label: this.$t('submodules.commission.doc_status.send_for_commission'),
          color: '#50A5F1',
        },
        COMMISSION_BEING_SEEN: {
          label: this.$t('submodules.commission.doc_status.commission_being_seen'),
          color: '#F1B44C',
        },
        COMMISSION_SEEN: {
          label: this.$t('submodules.commission.doc_status.commission_seen'),
          color: '#50A5F1',
        },
        COMMISSION_SENT: {
          label: this.$t('submodules.commission.doc_status.commission_sent'),
          color: '#556EE6',
        },
        COMMISSION_SIGNED: {
          label: this.$t('submodules.commission.doc_status.commission_signed'),
          color: '#34C38F',
        },
        COMMISSION_CANCELLED: {
          label: this.$t('submodules.commission.doc_status.commission_canceled'),
          color: '#F46A6A',
        }
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
        NO_PERMIT_REQUIRED: {
          label: this.$t('submodules.commission.NO_PERMIT_REQUIRED'),
          color: '#50A5F1',
          style: {
            border: '1px solid #50A5F1',
            'margin-right': '1px',
            color: '#50A5F1',
          },
        },
        FOR_NO_PERMIT_REQUIRED_DXA: {
          label: this.$t('submodules.commission.FOR_NO_PERMIT_REQUIRED_DXA'),
          color: '#F1B44C',
          style: {
            border: '1px solid #F1B44C',
            'margin-right': '1px',
            color: '#F1B44C',
          },
        },
        RETURN_AFTER_NO_PERMIT_REQUIRED: {
          label: this.$t('submodules.commission.RETURN_AFTER_NO_PERMIT_REQUIRED'),
          color: '#F46A6A',
          style: {
            border: '1px solid #F46A6A',
            'margin-right': '1px',
            color: '#F46A6A',
          },
        },
        REJECTED: {
          label: this.$t('submodules.commission.REJECTED'),
          color: '#50A5F1',
          style: {
            border: '1px solid #50A5F1',
            'margin-right': '1px',
            color: '#50A5F1',
          },
        },
        NOT_BELONG: {
          label: this.$t('submodules.dxa.not_belong'),
          color: '#556EE6',
          style: {
            border: '1px solid #556EE6',
            'margin-right': '1px',
            color: '#556EE6',
          },
        },
        FOR_NOT_COMPLETED_DXA: {
          label: this.$t('messages.for_not_completed_dxa'),
          color: '#F1B44C',
          style: {
            border: '1px solid #F1B44C',
            'margin-right': '1px',
            color: '#F1B44C',
          },
        },
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
      commissionsModal: false,
      isSidebar: false,
      isSidebarRegion: false,
      currentPage: 1,
      src: null,
      selectedRegion: null,
      numPages: undefined,
      reasonRejected: "",
      selectedTrItem: {},
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
    // CHECK FOR PERMISSIONS
    if (this.$can('view', 'application-monitor-inner')) {
      this.$set(this.lineWithDataChart, 'year', (new Date().getFullYear()).toString())
      this.activeTab = 'inner'
      this.loadingChartData = true
      await this.fetchDataForChart()
      await this.fetchDataForMonthlyChart(false)
      this.loadingChartData = false
      await this.getList();
    } else if (this.$can('view', 'application-monitor-dxa')) {

      this.activeTab = 'dxa'
      await this.getList();
    } else {
      this.activeTab = null
    }
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
                  tmpSeries.push({ sCode: sCode, name: this.statusCodes[sCode].label, data: [mEl ? mEl.count : 0] })
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
        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
      }
    },
    customLabelCommissionTypes(opt) {
      let selected = this.commissionTypes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
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
    editLetter(item) {
      this.editModal = true;
      setTimeout(() => {
        Service.getBody(item.letterId).then((res) => {
          let editor = this.$refs.editorRef;
          if (editor) {
            if (!this._empty(res.data)) {
              editor.setTextContent(res.data);
            }
          }
        });
      }, 400);
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
                this.commissionsModal = false;
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
    async selectSendTypeInTrItem(item) {
      this.selectedTrItem = item;
    },
    async selectSendTypeInTr(v, item) {
      await this.selectSendTypeInTrItem(item)

      if (Object.keys(this.selectedTrItem).length === 0) {
        this.$toast(this.$t('submodules.doc.selected_doc'), { type: 'warning' });
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
        this.$toast(this.$t('submodules.doc.selected_doc'), { type: 'warning' });
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
                Service.acceptAppilcation(this.selectedTrItem.id, this.selectedRegion)
                    .then((res) => {
                      this.$toast(this.$t('messages.accepted_message'), { type: 'success' });
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
              this.$toast(this.$t('messages.accepted_message'), { type: 'success' });
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
      if (this.isTabDxa) {
        Service.getListMonitor(this.params, this.activeDXATab)
            .then(({ data }) => {
              this.list = data.list;
              this.total = data.total;
            })
            .catch((err) => {
              // this.catchErr(err);
            })
            .finally(() => {
              this.loading = false;
            });
      } else {
        Service
            .listApplicationsByStatus(this.var_default_search_payload, this.selectedAppStatus, this.searchValue)
            .then((res) => {
              this.applicationsByStatus = res.data.list;
              this.totalAppsByStatus = res.data.total;
            })
            .catch(e => {
              this.applicationsByStatus = [];
              this.totalAppsByStatus = 0;
            })
            .finally(() => {
              this.loading = false
            })
      }
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
    <Modal
        :scroll="true"
        :variantOk="'success'"
        :value="editModal"
        @okModal="okModal"
        @closeModal="editModal = false"
        :title="selectedTrItem.fileName"
        :cancelText="'actions.cancel'"
        @viewModalClick="viewModalClick"
        :okText="'actions.save'"
        :signerHide="false"
        ref="editModalRef"
        :size="'xl'"
    >
      <template v-slot:body>
        <div>
          <Editor
              ref="editorRef"
              @changeText="changeText"
          />
        </div>
      </template>
    </Modal>

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
        v-model="commissionsModal"
        size="md"
        :title="`${$t('submodules.commission.title')}`"
    >
      <BaseMultiselectWithValidation
          rules="required"
          class="required"
          v-model="commissionTypeId"
          :options="commissionTypes.map(e => e.id)"
          :label="$t('submodules.commission.special_commission_type.title')"
          label-on-top
          placeholder=""
          :custom-label="customLabelCommissionTypes"
          open-direction="bottom"
          :max-height="600"
          :show-labels="false"
      ></BaseMultiselectWithValidation>

      <b-form-textarea
          class="mt-3"
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button
            variant="success"
            @click="openSignatureModalForCommission"
        >
          <b-overlay
              :opacity="0.1"
              :show="commissionModalLoader"
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
        <div class="card">
          <div class="card-body p-2">
            <div class="row">
              <div :class="isTabDxa ? 'col-sm-4' : 'col-12'">
                <div class="d-inline-block mt-1">
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
              <div :class="isTabDxa ? 'col-sm-8' : 'col-12'">
                <div class="text-sm-right">
                  <div :class="!isTabDxa && activeTab ? 'w-100' : ''" class="float-right">
                    <div v-if="isTabDxa" class="d-flex align-items-center">
                      <!--                      <div-->
                      <!--                          v-show="selectedTrItem.applicationStatus === 'DESCENDED' || selectedTrItem.applicationStatus === 'RETURN_FOR_COMPLETE'"-->
                      <!--                          @click.prevent="selectSendType(dc.value)"-->
                      <!--                          class="card m-0 my-card-hovered_2 mr-3"-->
                      <!--                          v-for="(dc, index) in sendTypeList"-->
                      <!--                          :key="index + 'doc'"-->
                      <!--                          :class="dc.value == active ? 'my-card-active' : ''"-->
                      <!--                      >-->
                      <!--                        <div-->
                      <!--                            class="-->
                      <!--                                                    card-body-->
                      <!--                                                    p-0-->
                      <!--                                                    text-center-->
                      <!--                                                    d-flex-->
                      <!--                                                    align-items-center-->
                      <!--                                                    justify-content-center-->
                      <!--                                                  ">-->
                      <!--                          <div>-->
                      <!--                            <div class="d-flex align-items-center">-->
                      <!--                              <img-->
                      <!--                                  :src="dc.value === 'SEND_REGION'-->
                      <!--                                  ? require('@/assets/doc/5.png')-->
                      <!--                                  : require('@/assets/doc/1.png')"-->

                      <!--                                  alt="DOC"-->
                      <!--                                  height="30"-->
                      <!--                              />-->

                      <!--                              <div class="ml-2">-->
                      <!--                                <p class="m-0">-->
                      <!--                                  {{ dc.label }}-->
                      <!--                                </p>-->
                      <!--                              </div>-->
                      <!--                              <div class="ml-2">-->
                      <!--                                <b-badge-->
                      <!--                                    v-if="-->
                      <!--                                                            dc.value === 'AGREEMENT' &&-->
                      <!--                                                            agreementCount > 0-->
                      <!--                                                          "-->
                      <!--                                    variant="success"-->
                      <!--                                >-->
                      <!--                                  {{ agreementCount }}-->
                      <!--                                </b-badge>-->

                      <!--                                <b-badge-->
                      <!--                                    v-if="-->
                      <!--                                                            dc.value === 'SIGNATURE' &&-->
                      <!--                                                            signatureCount > 0-->
                      <!--                                                          "-->
                      <!--                                    variant="success"-->
                      <!--                                >-->
                      <!--                                  {{ signatureCount }}-->
                      <!--                                </b-badge>-->

                      <!--                                <b-badge-->
                      <!--                                    v-if="-->
                      <!--                                                            dc.value === 'REVIEW' && reviewCount > 0-->
                      <!--                                                          "-->
                      <!--                                    variant="success"-->
                      <!--                                >-->
                      <!--                                  {{ reviewCount }}-->
                      <!--                                </b-badge>-->
                      <!--                              </div>-->
                      <!--                            </div>-->
                      <!--                          </div>-->
                      <!--                        </div>-->
                      <!--                      </div>-->
                    </div>
                  </div>
                  <!-- <b-button
    @click.prevent="add"
    type="button"
    variant="primary"
  >
    <i class="mdi mdi-plus mr-1"></i>
    {{ $t("actions.createNewDoc") }}
  </b-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- STATISTICS FOR DXA APPLICATION-->
        <div class="row" v-if="isTabDxa && activeTab === 'dxa'">
          <div class="col-7">
            <div class="card">
              <div class="card-body pt-3 px-3"
                   :class="(loadingChartDataForDXA || loadingMonthlyChartDataForDXA) ? 'pb-3' : 'pb-1'">
                <!-- SKELETON-LOADER -->
                <template v-if="loadingChartDataForDXA || loadingMonthlyChartDataForDXA">
                  <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>
                  <b-skeleton-img no-aspect height="230px"></b-skeleton-img>
                </template>
                <!-- Column Charts -->
                <template v-else>
                  <h4 class="card-title mb-2 d-flex justify-content-between">
                    {{ $t('column.monthly_general_statistics') }}
                    <BaseDatePickerWithValidation
                        not-required
                        disable-after
                        :clearable="false"
                        type="year"
                        format="YYYY"
                        custom-styles="grid-template-columns: 50% 50%"
                        v-model="lineWithDataChartForDXA.year"
                        @change="fetchDataForMonthlyChartForDXA(true, $event)"
                        :placeholder="$t('column.year')"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
                  </h4>
                  <vue-apex-charts
                      class="apex-charts"
                      height="210"
                      type="line"
                      dir="ltr"
                      :series="lineWithDataChartForDXA.series"
                      :options="lineWithDataChartForDXA.chartOptions"
                  ></vue-apex-charts>
                </template>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="card">
              <div class="card-body p-3">
                <!-- SKELETON-LOADER -->
                <template v-if="loadingChartDataForDXA">
                  <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>
                  <div class="row">
                    <div class="col-5 mt-2">
                      <b-skeleton animation="wave" width="55%"></b-skeleton>
                      <b-skeleton animation="wave" width="75%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton animation="wave" width="65%"></b-skeleton>
                      <b-skeleton animation="wave" width="90%"></b-skeleton>
                      <b-skeleton animation="wave" width="75%"></b-skeleton>
                      <b-skeleton animation="wave" width="55%"></b-skeleton>
                    </div>
                    <div class="col-7">
                      <b-skeleton-img no-aspect height="230px"></b-skeleton-img>
                    </div>
                  </div>
                </template>
                <!-- Donut Chart -->
                <template v-else>
                  <h4 class="card-title mb-2">{{ $t('column.current_statistics') }}</h4>
                  <vue-apex-charts
                      class="apex-charts"
                      height="225"
                      type="donut"
                      dir="ltr"
                      :series="donutChartForDXA.series"
                      :options="donutChartForDXA.chartOptions"
                  ></vue-apex-charts>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- APPLICATIONS TABS -->
        <div class="row">
          <!-- APPLICATIONS TABS -->
          <div :class="isTabDxa ? 'col-12' : 'col-7'">
            <div class="row">
              <!-- COLUMN CHART COLUMN -->
              <div v-if="!isTabDxa && activeTab" class="col-12 pr-1 pl-0 pt-1">
                <div class="card mb-1">
                  <div class="card-body pt-3 px-3"
                       :class="(loadingChartData || loadingMonthlyChartData) ? 'pb-3' : 'pb-1'">
                    <!-- SKELETON-LOADER -->
                    <template v-if="loadingChartData || loadingMonthlyChartData">
                      <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>
                      <b-skeleton-img no-aspect height="230px"></b-skeleton-img>
                    </template>
                    <!-- Column Charts -->
                    <template v-else>
                      <h4 class="card-title mb-2 d-flex justify-content-between">
                        {{ $t('column.monthly_general_statistics') }}
                        <BaseDatePickerWithValidation
                            not-required
                            disable-after
                            :clearable="false"
                            type="year"
                            format="YYYY"
                            custom-styles="grid-template-columns: 50% 50%"
                            v-model="lineWithDataChart.year"
                            @change="fetchDataForMonthlyChart(true, $event)"
                            :placeholder="$t('column.year')"
                            lang="ru"
                        ></BaseDatePickerWithValidation>
                      </h4>
                      <vue-apex-charts
                          class="apex-charts"
                          height="210"
                          type="line"
                          dir="ltr"
                          :series="lineWithDataChart.series"
                          :options="lineWithDataChart.chartOptions"
                      ></vue-apex-charts>
                    </template>
                  </div>
                </div>
              </div>

              <div class="col-12 pr-1 pl-0 pt-1">
                <div class="card card-body card-tabs p-2 mb-1" style="min-height: 35em">
                  <div>
                    <div v-if="!isTabDxa && activeTab" class="d-flex align-items-center">
                      <!-- APPLICATION STATUSES TO FILTER -->
                      <div class="mb-2 overflow-auto">
                        <b-form-radio-group
                            class="btn-custom mb-0"
                            button-variant="outline-primary"
                            id="application-statuses-for-filter"
                            v-model="selectedAppStatus"
                            buttons
                            name="application-statuses-for-filter"
                        >
                          <b-form-radio class="pl-1 pr-1" value="CREATED" button-variant="outline-secondary">
                            <span> {{ $t('submodules.commission.doc_status.doc_created') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="warning"
                                v-if="chartData.find(el => el.status === 'CREATED') && chartData.find(el => el.status === 'CREATED').count > 0"
                            >{{ chartData.find(el => el.status === 'CREATED').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" button-variant="outline-warning" value="BEING_SEEN">
                            <span> {{ $t('submodules.commission.doc_status.doc_seen') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="info"
                                v-if="chartData.find(el => el.status === 'BEING_SEEN') && chartData.find(el => el.status === 'BEING_SEEN').count > 0"
                            >{{ chartData.find(el => el.status === 'BEING_SEEN').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="SEEN" button-variant="outline-info">
                            <span> {{ $t('submodules.commission.doc_status.seen') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="primary"
                                v-if="chartData.find(el => el.status === 'SEEN') && chartData.find(el => el.status === 'SEEN').count > 0"
                            >{{ chartData.find(el => el.status === 'SEEN').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="SENT" button-variant="outline-primary">
                            <span> {{ $t('submodules.reports.report_sended') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="danger"
                                v-if="chartData.find(el => el.status === 'SENT') && chartData.find(el => el.status === 'SENT').count > 0"
                            >{{ chartData.find(el => el.status === 'SENT').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="CANCELLED" button-variant="outline-danger">
                            <span> {{ $t('docs_r.CANCELED') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="warning"
                                v-if="chartData.find(el => el.status === 'CANCELLED') && chartData.find(el => el.status === 'CANCELLED').count > 0"
                            >{{ chartData.find(el => el.status === 'CANCELLED').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="COMMISSION_BEING_SEEN"
                                        button-variant="outline-warning">
                            <span> {{ $t('submodules.commission.doc_status.commission_being_seen') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="info"
                                v-if="chartData.find(el => el.status === 'COMMISSION_BEING_SEEN') && chartData.find(el => el.status === 'COMMISSION_BEING_SEEN').count > 0"
                            >{{ chartData.find(el => el.status === 'COMMISSION_BEING_SEEN').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="COMMISSION_SEEN" button-variant="outline-info">
                            <span> {{ $t('submodules.commission.doc_status.commission_seen') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="primary"
                                v-if="chartData.find(el => el.status === 'COMMISSION_SEEN') && chartData.find(el => el.status === 'COMMISSION_SEEN').count > 0"
                            >{{ chartData.find(el => el.status === 'COMMISSION_SEEN').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="COMMISSION_SENT" button-variant="outline-primary">
                            <span> {{ $t('submodules.commission.doc_status.commission_sent') }}</span>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="COMMISSION_SIGNED" button-variant="outline-success">
                            <span> {{ $t('submodules.commission.doc_status.commission_signed') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="danger"
                                v-if="chartData.find(el => el.status === 'COMMISSION_SIGNED') && chartData.find(el => el.status === 'COMMISSION_SIGNED').count > 0"
                            >{{ chartData.find(el => el.status === 'COMMISSION_SIGNED').count }}
                            </b-badge>
                          </b-form-radio>
                          <b-form-radio class="pl-1 pr-1" value="COMMISSION_CANCELLED" button-variant="outline-danger">
                            <span> {{ $t('submodules.commission.doc_status.commission_canceled') }}</span>
                            <b-badge
                                class="ml-1"
                                variant="secondary"
                                v-if="chartData.find(el => el.status === 'COMMISSION_CANCELLED') && chartData.find(el => el.status === 'COMMISSION_CANCELLED').count > 0"
                            >{{ chartData.find(el => el.status === 'COMMISSION_CANCELLED').count }}
                            </b-badge>
                          </b-form-radio>
                        </b-form-radio-group>
                      </div>
                    </div>

                    <!--        STATISTICS FOR DXA APPLICATION-->
                    <div v-else-if="isTabDxa && activeTab === 'dxa'" class="d-flex align-items-center">
                      <!-- APPLICATION STATUSES TO FILTER -->
                      <div class="mb-2 overflow-auto">
                        <b-collapse v-model="applicationStatusDXAFilterCollapse" class="mt-2">
                          <b-form-radio-group
                              class="btn-custom mb-0"
                              button-variant="outline-primary"
                              id="application-statuses-for-filter"
                              v-model="selectedAppStatus"
                              buttons
                              name="application-statuses-for-filter"
                          >
                            <template v-for="(status, key) in statusCodesForDXAComputedFirst">
                              <b-form-radio :value="key" button-variant="light" :style="status.style" :key="key">
                                <span>  {{ $t(status.label) }}</span>
                                <b-badge
                                    class="ml-1"
                                    variant="primary"
                                    v-if="chartDataForDXA.find(el => el.status === key) && chartDataForDXA.find(el => el.status === key).count > 0"
                                >{{ chartDataForDXA.find(el => el.status === key).count }}
                                </b-badge>
                              </b-form-radio>
                            </template>
                          </b-form-radio-group>
                          <b-form-radio-group
                              class="btn-custom mb-0"
                              button-variant="outline-primary"
                              id="application-statuses-for-filter2"
                              v-model="selectedAppStatus"
                              buttons
                              name="application-statuses-for-filter2"
                          >
                            <template v-for="(status, key) in statusCodesForDXAComputedSecond">
                              <b-form-radio :value="key" button-variant="light" :style="status.style" :key="key">
                                <span>  {{ $t(status.label) }}</span>
                                <b-badge
                                    class="ml-1"
                                    variant="primary"
                                    v-if="chartDataForDXA.find(el => el.status === key) && chartDataForDXA.find(el => el.status === key).count > 0"
                                >{{ chartDataForDXA.find(el => el.status === key).count }}
                                </b-badge>
                              </b-form-radio>
                            </template>
                          </b-form-radio-group>
                        </b-collapse>
                        <b-button
                            class="my-1"
                            variant="secondary"
                            @click="applicationStatusDXAFilterCollapse = !applicationStatusDXAFilterCollapse"
                        >
                          {{ applicationStatusDXAFilterCollapse ? $t('actions.status_filter_close') : $t('actions.status_filter_open') }}
                        </b-button>
                      </div>
                    </div>
                    <b-tabs active-nav-item-class="font-weight-bold  text-primary">
                      <!-- INNER APPLICATIONS TAB -->
                      <b-tab
                          v-if="$can('view', 'application-monitor-inner')"
                          :title="$t('submodules.dxa.tabs_inner')"
                          :active="!!(!isTabDxa && activeTab)"
                          @click="activeTableInnerApplication"
                      >
                        <div class="table-responsive">
                          <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                            <table class=" table table-centered table-striped table-nowrap table-hover bordered ">
                              <thead class="thead-light">
                              <tr>
                                <th scope="col" class="text-center" style="width: 10%">№</th>
                                <th scope="col" class="text-left">
                                  <span class="ml-5"> {{ $t("column.status") }}</span>
                                </th>
                                <th class="text-left" scope="col">
                                  {{ $t("submodules.doc.senderFIO") }}
                                </th>
                                <th class="text-center" scope="col">
                                  {{ $t("submodules.doc.sender") }}
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr class="text-center" v-if="applicationsByStatus.length == 0">
                                <td colspan="9" :style="loading ? 'height:50px' : ''" style="vertical-align: middle">
                                  <h5>
                                    {{ $t("messages.data_not_found") }}
                                  </h5>
                                </td>
                              </tr>
                              <tr
                                  @click.prevent="clickTrItem(item)"
                                  v-for="(item, index) in applicationsByStatus"
                                  :key="index + 'CREATE_DOC'"
                                  class="p_cursor"
                                  :class="selectedAppByStatus.id === item.id ? 'bg-color bg-soft-primary text-primary' : '' ">

                                <td class="text-center">
                                  {{
                                    util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                                  }}
                                </td>
                                <td class="text-center">
                                  <b-badge
                                      variant="secondary"
                                      class="p-1"
                                      v-if="item.applicationStatus === 'CREATED' || item.applicationStatus === 'RECEIVED'"
                                  >
                                    {{ $t('submodules.commission.doc_status.doc_created') }}
                                  </b-badge>
                                  <b-badge
                                      variant="warning"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'BEING_SEEN'"
                                  >
                                    {{ $t('submodules.commission.doc_status.doc_seen') }}
                                  </b-badge>
                                  <b-badge
                                      variant="info"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'SEEN'"
                                  >
                                    {{ $t('submodules.commission.doc_status.seen') }}
                                  </b-badge>
                                  <b-badge
                                      variant="primary"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'SENT'"
                                  >
                                    {{ $t('submodules.reports.report_sended') }}
                                  </b-badge>
                                  <b-badge
                                      variant="primary"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'CANCELLED'"
                                  >
                                    {{ $t('docs_r.CANCELED') }}
                                  </b-badge>
                                  <b-badge
                                      variant="warning"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'COMMISSION_BEING_SEEN'"
                                  >
                                    {{ $t('submodules.commission.doc_status.commission_being_seen') }}
                                  </b-badge>
                                  <b-badge
                                      variant="info"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'COMMISSION_SEEN'"
                                  >
                                    {{ $t('submodules.commission.doc_status.commission_seen') }}
                                  </b-badge>
                                  <b-badge
                                      variant="primary"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'COMMISSION_SENT'"
                                  >
                                    {{ $t('submodules.commission.doc_status.commission_sent') }}
                                  </b-badge>
                                  <b-badge
                                      variant="success"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'COMMISSION_SIGNED'"
                                  >
                                    {{ $t('submodules.commission.doc_status.commission_signed') }}
                                  </b-badge>
                                  <b-badge
                                      variant="danger"
                                      class="p-1"
                                      v-else-if="item.applicationStatus === 'COMMISSION_CANCELLED'"
                                  >
                                    {{ $t('submodules.commission.doc_status.commission_canceled') }}
                                  </b-badge>
                                  <b-badge
                                      variant="warning"
                                      class="p-1"
                                      v-else
                                  >
                                    {{ item.applicationStatus }}
                                  </b-badge>
                                </td>
                                <td class="text-left">
                                  <p class="mb-0 d-flex align-items-center" style="flex-basis:0;flex-grow:1;gap:.3rem">
                                    <span v-if="item.type === 'LEGAL'"> {{ item.senderFullName }} </span>
                                    <span v-else-if="item.type === 'FROM_DXA'"> {{ item.senderFullName }} </span>
                                    <span v-else-if="item.type === 'PHYSICAL'"> {{ item.applicantSecondName }} {{
                                        item.applicantFirstName
                                      }} {{ item.applicantMiddleName }} </span>
                                    <span v-else-if="item.type === 'BY_DIRECTOR'"> {{ item.senderFullName }} </span>
                                  </p>
                                </td>
                                <td class="text-center">
                                  <b-badge v-if="item.type === 'LEGAL'" variant="primary" class="p-1">
                                    {{ $t("submodules.doc.sendDoc_from_legal") }}
                                  </b-badge>
                                  <b-badge v-else-if="item.type === 'PHYSICAL'" variant="success" class="p-1">
                                    {{ $t("submodules.doc.sendDoc_from_physical") }}
                                  </b-badge>
                                  <b-badge v-else-if="item.type === 'BY_DIRECTOR'" variant="secondary" class="p-1">
                                    {{ $t("submodules.commission.by_director.title") }}
                                  </b-badge>
                                  <b-badge v-else-if="item.type === 'FROM_DXA'" variant="info" class="p-1">
                                    DXA
                                  </b-badge>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                          </b-overlay>
                        </div>
                        <div class="row" v-if="totalAppsByStatus > 0">
                          <div class="col-lg-12">
                            <b-pagination
                                v-model="var_default_search_payload.page"
                                :total-rows="totalAppsByStatus"
                                :per-page="var_default_search_payload.itemsPerPage"
                                aria-controls="my-table"
                                class="justify-content-end"
                            ></b-pagination>
                          </div>
                        </div>
                      </b-tab>
                      <!-- DXA APPLICATIONS TAB -->
                      <b-tab
                          v-if="$can('view', 'application-monitor-dxa')"
                          :title="$t('submodules.dxa.tabs_dxa')"
                          @click="activeTableDXAApplication"
                      >
                        <b-row class="pl-3 pr-3" style="min-height: 30px">
                          <b-col cols="12" class="pt-2">
                            <b-button-group>
                              <b-button @click="activeTableDXAApplicationFOR_SALE"
                                        :variant="activeDXATab === 'FOR_SALE'? 'primary' : 'outline-primary'">
                                <span class="text-center">{{ $t('submodules.dxa.dxa_application_1') }}</span>
                              </b-button>
                              <b-button
                                  @click="activeTableDXAApplicationFOR_ADD"
                                  :variant="activeDXATab === 'FOR_ADD'? 'primary' : 'outline-primary'">
                                <span class="text-center">{{ $t('submodules.dxa.dxa_application_2') }}</span>
                              </b-button>
                            </b-button-group>
                          </b-col>
                        </b-row>
                        <div class="card card-body">
                          <div class="table-responsive">
                            <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                              <table class=" table table-centered table-striped table-nowrap table-hover ">
                                <thead class="thead-light">
                                <tr>
                                  <th scope="col" class="text-center" style="width: 70px">
                                    №
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t("docName") }}
                                  </th>

                                  <th class="text-center" scope="col">
                                    {{ $t("submodules.dxa.dxa_application_number") }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t("submodules.commission.docCreatedDate") }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t("submodules.commission.income_date") }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t("profile.inn") }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t("submodules.doc.sender") }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t('submodules.commission.document_status.title') }}
                                  </th>
                                  <th class="text-center" scope="col">
                                    {{ $t('actions.view') }}
                                  </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-if="list.length === 0">
                                  <td colspan="9" :style="loading ? 'height:50px' : ''" style="vertical-align: middle">
                                    <h5>
                                      {{ $t("messages.data_not_found") }}
                                    </h5>
                                  </td>
                                </tr>
                                <tr @click.prevent="selectSendTypeInTr('VIEW', item)"
                                    class="p_cursor"
                                    v-for="(item, index) in list"
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
                                  <td class="text-center" @click.prevent="clickTrItem(item)">
                                    <strong>{{ paginate(index, limit, page - 1) }}</strong>
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    {{ item.applicant_name }}
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    {{ item.applicationDXARegNumber }}
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    <p class="pre m-0">{{ item.applicant_created_at }}</p>
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    <p class="pre m-0">{{ item.received_date }}</p>
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    <p class="pre m-0">{{ item.applicant_tin }}</p>
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    <b-badge variant="success" class="pre m-0" v-if="item.type === 'FROM_DXA'">DXA
                                    </b-badge>
                                  </td>
                                  <td class="text-center" :class="(index % 2===1) ? 'font-weight-bold' : ''">
                                    <b-badge variant="secondary" class="p-1"
                                             v-if="item.applicationStatus === 'CREATED'">
                                      {{ $t('submodules.commission.doc_status.doc_created') }}
                                    </b-badge>
                                    <b-badge variant="secondary" class="p-1"
                                             v-if="item.applicationStatus === 'RECEIVED'">
                                      {{ $t('submodules.dxa.received') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="p-1"
                                             v-else-if="item.applicationStatus === 'BEING_SEEN'">
                                      {{ $t('submodules.commission.doc_status.doc_seen') }}
                                    </b-badge>
                                    <b-badge variant="info" class="p-1"
                                             v-else-if="item.applicationStatus === 'SEEN'">
                                      {{ $t('submodules.commission.doc_status.seen') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="p-1"
                                             v-else-if="item.applicationStatus === 'SENT'">
                                      {{ $t('submodules.reports.report_sended') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="p-1"
                                             v-else-if="item.applicationStatus === 'CANCELLED'">
                                      {{ $t('docs_r.CANCELED') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="p-1"
                                             v-else-if="item.applicationStatus === 'COMMISSION_BEING_SEEN'">
                                      {{ $t('submodules.commission.doc_status.commission_being_seen') }}
                                    </b-badge>
                                    <b-badge variant="info" class="p-1"
                                             v-else-if="item.applicationStatus === 'COMMISSION_SEEN'">
                                      {{ $t('submodules.commission.doc_status.commission_seen') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="p-1"
                                             v-else-if="item.applicationStatus === 'COMMISSION_SENT'">
                                      {{ $t('submodules.commission.doc_status.commission_sent') }}
                                    </b-badge>
                                    <b-badge variant="success" class="p-1"
                                             v-else-if="item.applicationStatus === 'COMMISSION_SIGNED'">
                                      {{ $t('submodules.commission.doc_status.commission_signed') }}
                                    </b-badge>
                                    <b-badge variant="danger" class="p-1"
                                             v-else-if="item.applicationStatus === 'COMMISSION_CANCELLED'">
                                      {{ $t('submodules.commission.doc_status.commission_canceled') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'DESCENDED'">
                                      {{ $t('submodules.commission.monitor') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'NOT_BELONG'">
                                      {{ $t('submodules.commission.letter_not_belong') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'EXTENDED'">
                                      {{ $t('messages.extended_message') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'REJECTED'">
                                      {{ $t('messages.rejected_message') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'ACCEPTED'">
                                      {{ $t('messages.accepted_message') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'NOT_COMPLETED'">
                                      {{ $t('submodules.dxa.not_complete') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_NOT_BELONG_DXA'">
                                      {{ $t('messages.for_not_belong_dxa') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_EXTENDED_DXA'">
                                      {{ $t('messages.for_extended_dxa') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_REJECTED_DXA'">
                                      {{ $t('messages.for_rejected_dxa') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_ACCEPTED_DXA'">
                                      {{ $t('messages.for_accepted_dxa') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_NOT_COMPLETED_DXA'">
                                      {{ $t('messages.for_not_completed_dxa') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'RETURN_FOR_COMPLETE'">
                                      {{ $t('messages.return_for_complete') }}
                                    </b-badge>
                                    <b-badge variant="primary" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'RETURN_FROM_REGION'">
                                      {{ $t('messages.return_from_region') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'SEND_FOR_TAKE_VISA'">
                                      {{ $t('submodules.dxa.send_for_visa') }}
                                    </b-badge>
                                    <b-badge variant="success" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'VISA_APPROVED'">
                                      {{ $t('submodules.dxa.VISA_APPROVED') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'NO_PERMIT_REQUIRED'">
                                      {{ $t('submodules.commission.NO_PERMIT_REQUIRED') }}
                                    </b-badge>
                                    <b-badge variant="success" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'EXTEND_COMPLETED'">
                                      {{ $t('submodules.commission.EXTEND_COMPLETED') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'RETURN_AFTER_NO_PERMIT_REQUIRED'">
                                      {{ $t('submodules.commission.RETURN_AFTER_NO_PERMIT_REQUIRED') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'RETURN_AFTER_NOT_BELONG'">
                                      {{ $t('submodules.commission.RETURN_AFTER_NOT_BELONG') }}
                                    </b-badge>
                                    <b-badge variant="info" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'RETURN_AFTER_REJECTED'">
                                      {{ $t('submodules.commission.RETURN_AFTER_REJECTED') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'EXPIRED'">
                                      {{ $t('submodules.commission.EXPIRED') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0"
                                             v-else-if="item.applicationStatus === 'FOR_NO_PERMIT_REQUIRED_DXA'">
                                      {{ $t('submodules.commission.FOR_NO_PERMIT_REQUIRED_DXA') }}
                                    </b-badge>
                                    <b-badge variant="warning" class="pre m-0" v-else>
                                      {{ item.applicationStatus }}
                                    </b-badge>
                                  </td>
                                  <td class="text-center">
                                    <i @click.prevent="selectSendTypeInTr('VIEW', item)" style="color: #0b83e8"
                                       class="fa fa-eye fa-2x"></i>
                                  </td>

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
                      </b-tab>
                    </b-tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!isTabDxa && activeTab" class="col-5">
            <div class="row">
              <!-- DONUT CHART COLUMN -->
              <div class="col-12 pl-1 pr-1 pt-1">
                <div class="card mb-1 pb-1">
                  <div class="card-body p-3">
                    <!-- SKELETON-LOADER -->
                    <template v-if="loadingChartData">
                      <b-skeleton class="card-title mb-2" animation="wave" width="35%"></b-skeleton>
                      <div class="row">
                        <div class="col-5 mt-2">
                          <b-skeleton animation="wave" width="55%"></b-skeleton>
                          <b-skeleton animation="wave" width="75%"></b-skeleton>
                          <b-skeleton animation="wave" width="85%"></b-skeleton>
                          <b-skeleton animation="wave" width="65%"></b-skeleton>
                          <b-skeleton animation="wave" width="90%"></b-skeleton>
                          <b-skeleton animation="wave" width="75%"></b-skeleton>
                          <b-skeleton animation="wave" width="55%"></b-skeleton>
                        </div>
                        <div class="col-7">
                          <b-skeleton-img no-aspect height="230px"></b-skeleton-img>
                        </div>
                      </div>
                    </template>
                    <!-- Donut Chart -->
                    <template v-else>
                      <h4 class="card-title mb-2">{{ $t('column.current_statistics') }}</h4>
                      <vue-apex-charts
                          class="apex-charts"
                          height="225"
                          type="donut"
                          dir="ltr"
                          :series="donutChart.series"
                          :options="donutChart.chartOptions"
                      ></vue-apex-charts>
                    </template>
                  </div>
                </div>
              </div>

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
                        <!-- FROM_DXA -->
                        <table
                            v-if="selectedAppByStatus"
                            v-show="selectedAppByStatus.type === 'FROM_DXA'"
                            class="table m-0 "
                        >
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('column.business_entity') }}</b> <br>
                            </td>
                            <td class="text-right">
                                                    <span
                                                        style="font-size: 12px"
                                                        class="text-right"
                                                    >
                                                        {{ selectedApplicationItem.applicant_name }}
                                                    </span>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                            </td>
                            <td class="text-right">
                                                    <span
                                                        style="font-size: 12px"
                                                        class="text-right"
                                                    >
                                                        {{ selectedApplicationItem.applicant_created_at }}
                                                    </span>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('column.inn') }}</b> <br>
                            </td>
                            <td class="text-right">
                                                    <span
                                                        style="font-size: 12px"
                                                        class="text-right"
                                                    >
                                                        {{ selectedApplicationItem.applicant_tin }}
                                                    </span>
                            </td>
                          </tr>
                        </table>

                        <!-- LEGAL -->
                        <table
                            v-if="selectedApplicationItem"
                            v-show="selectedApplicationItem.type === 'LEGAL'"
                            class="table m-0 "
                        >
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('column.business_entity') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.senderFullName }}</span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('column.address') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.senderAddress }}</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.numberOfOutgoingDocument }}</span>
                            </td>

                            <td class="text-right">
                              <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.dateOfOutgoingDocument }}</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b><br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.numberOfIncomingDocument }}</span>
                            </td>

                            <td class="text-right">
                              <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.dateOfIncomingDocument }}</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfOutgoingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfOutgoingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.create_entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfIncomingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfIncomingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.summary') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.summary
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.employeeFullName
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.other_contragent') }}
                              </b> <br>
                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.nameOfOrganizationWasSent
                                }}
                                                    </span>
                            </td>

                            <td class="text-right ">
                              <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.completionTime
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                        </table>

                        <!-- PHYSICAL -->
                        <table
                            v-if="selectedApplicationItem"
                            v-show="selectedApplicationItem.type === 'PHYSICAL'"
                            class="table m-0 "
                        >
                          <tr class="cool-link">
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.fio') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.applicantSecondName }}
                                                        {{ selectedApplicationItem.applicantFirstName }}
                                                        {{ selectedApplicationItem.applicantMiddleName }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b>
                                {{ $t('submodules.doc.address') }}
                              </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.address }}</span>
                            </td>
                          </tr>
                          <tr class="cool-link">
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.commission.confirmation_document.title') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.confirmationDocumentNameRu,
                                    nameLt: selectedApplicationItem.confirmationDocumentNameLt,
                                    nameUz: selectedApplicationItem.confirmationDocumentNameUz,
                                  })
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.method_of_reception') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.receptionMethodNameRu,
                                    nameLt: selectedApplicationItem.receptionMethodNameLt,
                                    nameUz: selectedApplicationItem.receptionMethodNameUz,
                                  })
                                }}
                                                    </span>

                              <br>
                            </td>
                          </tr>
                          <tr class="cool-link">
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.commission.appeal_type.title') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.appealTypeNameRu,
                                    nameLt: selectedApplicationItem.appealTypeNameRu,
                                    nameUz: selectedApplicationItem.appealTypeNameRu,
                                  })
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.commission.document_status.title') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.documentStatusNameLt,
                                    nameLt: selectedApplicationItem.documentStatusNameLt,
                                    nameUz: selectedApplicationItem.documentStatusNameLt,
                                  })
                                }}
                                                    </span>

                              <br>
                            </td>
                          </tr>

                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfOutgoingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfOutgoingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.create_entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfIncomingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfIncomingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.summary') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.summary
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.employeeFullName
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.other_contragent') }}
                              </b> <br>
                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.nameOfOrganizationWasSent
                                }}
                                                    </span>
                            </td>

                            <td class="text-right ">
                              <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.completionTime
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                        </table>

                        <!-- BY_DIRECTOR -->
                        <table
                            v-if="selectedApplicationItem"
                            v-show="selectedApplicationItem.type === 'BY_DIRECTOR'"
                            class="table m-0 "
                        >
                          <tr
                              class="cool-link"
                              v-show="!selectedApplicationItem.isLegal"
                          >
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.fio') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                  {{ selectedApplicationItem.applicantSecondName }}
                                  {{ selectedApplicationItem.applicantFirstName }}
                                  {{ selectedApplicationItem.applicantMiddleName }}
                              </span>
                            </td>
                            <td class="text-right">
                              <b>
                                {{ $t('submodules.doc.address') }}
                              </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >{{ selectedApplicationItem.address }}</span>
                            </td>
                          </tr>
                          <tr
                              class="cool-link"
                              v-show="!selectedApplicationItem.isLegal"
                          >
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.commission.confirmation_document.title') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.confirmationDocumentNameRu,
                                    nameLt: selectedApplicationItem.confirmationDocumentNameLt,
                                    nameUz: selectedApplicationItem.confirmationDocumentNameUz,
                                  })
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.method_of_reception') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.receptionMethodNameRu,
                                    nameLt: selectedApplicationItem.receptionMethodNameLt,
                                    nameUz: selectedApplicationItem.receptionMethodNameUz,
                                  })
                                }}
                                                    </span>

                              <br>
                            </td>
                          </tr>
                          <tr
                              class="cool-link"
                              v-show="!selectedApplicationItem.isLegal"
                          >
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.commission.appeal_type.title') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.appealTypeNameRu,
                                    nameLt: selectedApplicationItem.appealTypeNameRu,
                                    nameUz: selectedApplicationItem.appealTypeNameRu,
                                  })
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.commission.document_status.title') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  getName({
                                    nameRu: selectedApplicationItem.documentStatusNameLt,
                                    nameLt: selectedApplicationItem.documentStatusNameLt,
                                    nameUz: selectedApplicationItem.documentStatusNameLt,
                                  })
                                }}
                                                    </span>

                              <br>
                            </td>
                          </tr>

                          <tr v-show="selectedApplicationItem.isLegal">
                            <td class="text-left">
                              <b> {{ $t('column.business_entity') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.senderFullName }}
                                                    </span>
                            </td>

                            <td class="text-right">
                              <b> {{ $t('column.address') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.senderAddress }}
                                                    </span>
                            </td>
                          </tr>
                          <tr v-show="selectedApplicationItem.isLegal">
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                                    </span>
                            </td>

                            <td class="text-right">
                              <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                                    </span>
                            </td>
                          </tr>
                          <tr v-show="selectedApplicationItem.isLegal">
                            <td class="text-left">
                              <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.numberOfIncomingDocument }}
                                                    </span>
                            </td>

                            <td class="text-right">
                              <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{ selectedApplicationItem.dateOfIncomingDocument }}
                                                    </span>
                            </td>
                          </tr>

                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfOutgoingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfOutgoingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.create_entered_number_physical') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.numberOfIncomingDocument
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.dateOfIncomingDocument
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.summary') }}
                              </b> <br>

                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.summary
                                }}
                                                    </span>
                            </td>
                            <td class="text-right">
                              <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.employeeFullName
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left">
                              <b>
                                {{ $t('submodules.doc.other_contragent') }}
                              </b> <br>
                              <span
                                  style="font-size: 11px"
                                  class="text-left text-muted"
                              >
                                                        {{
                                  selectedApplicationItem.nameOfOrganizationWasSent
                                }}
                                                    </span>
                            </td>

                            <td class="text-right ">
                              <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                              <span
                                  style="font-size: 12px"
                                  class="text-left"
                              >
                                                        {{
                                  selectedApplicationItem.completionTime
                                }}
                                                    </span>
                              <br>
                            </td>
                          </tr>
                        </table>

                        <div
                            class="wrapper"
                            v-if="selectedApplicationItem.allFiles"
                        >
                          <span CLASS="fromcenter">{{ $t('submodules.doc.application_file') }}</span>
                        </div>
                        <div
                            class="card card-body card-tabs mt-1"
                            style="min-height: 10em; width: 100%"
                            v-if="1 || selectedApplicationItem.allFiles && selectedApplicationItem.allFiles.length"
                        >
                          <tr
                              class="mt-3"
                              v-for="(item, index) in selectedApplicationItem.allFiles"
                              :key="index + 'FILE'"
                          >
                            <div class=" d-flex align-items-center bg-light p-2 justify-content-between">
                              <div class="d-flex align-items-center">
                                <a @click="viewIlova(item.url)"
                                   :download="getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? false : true"
                                   :href="getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                                >
                                  <BaseFileViewer
                                      class="my-card-hovered"
                                      :uploadPath="item.name"
                                  />
                                </a>
                                <span class="ml-2">{{ item.name }}</span>
                              </div>
                            </div>
                          </tr>
                        </div>
                        <div
                            class="card card-body card-tabs mt-1 text-center"
                            style="min-height: 2em; width: 100%"
                            v-else-if="selectedApplicationItem.allFiles"
                        >
                          {{ $t('messages.data_not_found') }}
                        </div>

                        <!-- PROJECT FILES -->
                        <div
                            class="card card-body card-tabs mt-1"
                            style="min-height: 10em; width: 100%"
                            v-if="selectedApplicationItem.applicationStatus != 'BEING_SEEN' && selectedApplicationItem.applicationStatus != 'CREATED' && selectedApplicationItem.letterFiles && selectedApplicationItem.letterFiles.length"
                        >
                          <tr
                              class="mt-1"
                              v-for="(item, index) in selectedApplicationItem.letterFiles"
                              :key="index + 'FILE'"
                          >
                            <div class="
                                                                d-flex
                                                                align-items-center
                                                                bg-light
                                                                p-2
                                                                justify-content-between
                                                              ">
                              <div class="d-flex align-items-center">
                                <a
                                    @click="viewIlova(item.url)"
                                    :download="
                                                                    getExt(item.url) === 'PDF' ||
                                                                    getExt(item.url) === 'pdf'
                                                                      ? false
                                                                      : true
                                                                  "
                                    :href="
                                                                    getExt(item.url) === 'PDF' ||
                                                                    getExt(item.url) === 'pdf'
                                                                      ? `#`
                                                                      : `${baseUrl}/${item.url}`
                                                                  "
                                >
                                  <BaseFileViewer
                                      class="my-card-hovered"
                                      :uploadPath="item.url"
                                  />
                                </a>
                                <span class="ml-2">
                                                            {{ item.fileName }}
                                                        </span>
                              </div>

                            </div>
                          </tr>
                        </div>

                        <!-- COMMISSION FILES -->
                        <div
                            class="wrapper"
                            v-if="selectedApplicationItem.commissionFiles && (selectedApplicationItem.applicationStatus === 'COMMISSION_SEEN' || selectedApplicationItem.applicationStatus === 'COMMISSION_SENT' || selectedApplicationItem.applicationStatus === 'COMMISSION_SIGNED' || selectedApplicationItem.applicationStatus === 'COMMISSION_CANCELLED')"
                        >
                          <span CLASS="fromcenter">{{ $t('commission_attached_files') }}</span>
                        </div>
                        <div
                            class="card card-body card-tabs mt-1"
                            style="min-height: 10em; width: 100%"
                            v-if="selectedApplicationItem.commissionFiles && selectedApplicationItem.commissionFiles.length"
                        >
                          <tr
                              class="mt-1"
                              v-for="(item, index) in selectedApplicationItem.commissionFiles"
                              :key="index + 'FILE'"
                          >
                            <div class="d-flex align-items-center bg-light p-2 justify-content-between">
                              <div class="d-flex align-items-center">
                                <a @click="viewIlova(item.url)"
                                   :download="getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? false : true"
                                   :href=" getExt(item.url) === 'PDF' || getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                                >
                                  <BaseFileViewer
                                      class="my-card-hovered"
                                      :uploadPath="item.url"
                                  />
                                </a>
                                <span class="ml-2">{{ item.fileName }}</span>
                              </div>
                            </div>
                          </tr>
                        </div>

                        <div
                            class="text-center card mt-3"
                            v-if="!selectedAppByStatus.id"
                        >
                          <h5
                              style="opacity: 0.3"
                              class="p-3"
                          >
                            {{ $t("submodules.doc.selected_doc") }}
                          </h5>
                        </div>

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
        width="85%"
        class="sidebar-part"
        shadow
        sidebar-class="p-0"
        right
        :no-header="true"
        v-model="isSidebar"
    >

      <DXAApplicationAllInfo
          ref="isSidebar_ref"
          @close="closeSidebar"
          @acceptApplication="selectSendType"
          @noPermitRequired="noPermitRequired"
          :applicationId="selectedTrItem.id"
          :applicationStatus="selectedTrItem.applicationStatus"
      />

    </b-sidebar>
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