<script>
import Layout from "@/router/layouts/main.vue";
// import i18n from "@/i18n";
// import {TokenService} from "@/shared/services/storage.service";
// import crudAndListsService from "@/shared/services/crud_and_list.service";
// import helperService from "@/shared/services/helper.service";
// import ProjectMenu from "@/shared/views/auth/MainProMenu.vue";

const MAIN_API_URL_USER = 'user'
const MAIN_API_URL = 'report/dashboard'
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";
import Service from "../../advertisement/service";
// import Regions from "./region";
import simplebar from "simplebar-vue";
// import statisticsService from "../../../shared/services/integration/statistics.service";
import statisticsService from "../../../shared/services/integration/statistics.service";

// import VueApexCharts from 'vue-apexcharts'

// import DocumentTree from "@/modules/commission/document-tree/document-tree";
// import DocumentHistory from "@/modules/commission/document-history/document-history";
/**
 * Products-order component
 */
import {cnfDoc, showMsgSuccess} from "@/helper";
import crudAndListsService from "@/shared/services/crud_and_list.service";
// import jsPDF from "jspdf";
// import QRCode from "qrcode";
import pharmService from "../../advertisement/service";
// import downloadexcel from "vue-json-excel";
import {ability} from "@/shared/store/ability";
 import forma from './form.vue'

/**
 * Dashboard Component
 */
export default {
  components: {
    Layout,
    simplebar,
    forma,
    // downloadexcel,
    // DocumentTree,
    // DocumentHistory,
    // Regions,
  },

  watch: {
    page: {
      handler(value) {
        if (value == '') {
          this.page = 1
        } else {
          this.getList();
        }
      }
    },
    'monthwithYear': {
      async handler(value) {
        if (value) {
          await this.getDataInMonth()
        }
      }
    },
    'activeStatus': {
      handler() {
        this.selectedAppealTrItem = {}
        this.getList();
      },
    },
    searchValue(v) {
      this.getList();
    },
    DateRange() {
      if (this.DateRange.startDate) {
        this.date_from = this.getDateFormat(this.DateRange.startDate, '-');
        // console.log(this.date_from);

      }
      if (this.DateRange.endDate) {
        this.date_to = this.getDateFormat(this.DateRange.endDate, '-');
        // console.log(this.date_to);
      }
      // this.fetchTableItems();
    },
    searchRegion(){
      statisticsService.getGeograficalDistrictsWithSoatos(this.searchRegion).then(res => {
        this.streetLists = res.data
      })
    }
  },

  data() {
    return{
      searchResultsLoader:false,
      streetLists:[],
      regionsWithSoatos: [],
      searchingModal:false,

      appealPosition:'SEND_TO_REGION',
      stir:'',
      customerName:'',
      customerNumber: '',
      appealYear:'',
      appealnumbers:'',
      searchRegion:'',
      street:'',
      DateRange: {},
      date_from: '01-01-2023',
      date_to: this.getDateFormat(new Date(), '-'),

      countLabel: {},
      selectDataItem: null,
      openTable: true,
      cmpKey: 0,
      monthwithYear: false,
      loadingTableItems: false,

      json_data: [],
      appealPositionData:[
        {
          id: 1,
          nameUz: "Келиб тушган",
          nameLt: "Kelib tushgan",
          nameRu: "Келиб тушган",
          value: "SEND_TO_REGION"
        },
        {
          id: 2,
          nameUz: "Ижро жараёнида",
          nameLt: "Ijro jarayonida",
          nameRu: "Ижро жараёнида",
          value: "PROCCESS"
        },
        {
          id: 3,
          nameUz: "Тасдиқлашда",
          nameLt: "Tasdiqlashda",
          nameRu: "Тасдиқлашда",
          value: "CHECK"
        },
        {
          id: 4,
          nameUz: "Якунланган",
          nameLt: "Yakunlangan",
          nameRu: "Якунланган",
          value: "FINISHED"
        }
      ],

      json_fields: {

        ["Murojaat raqami"]: "mnumber",
        ['Ariza kelib tushgan sana']: "createDate",
        ['Murojaatchi ismi']: "firstName",
        ['Murojaatchi familyasi']: "lastName",
        ["Murojaatchi otasining ismi"]: "middleName",
        ["Telefon raqami"]: "phone",
        ['Chek raqami']: "checkNumber",
        ['Dori nomi']: "medicationName",
        ["Mxik kodi"]: "mxikCode",
        ["To'lov sanasi"]: "paymentDate",
        ["Sotilgan narxi"]: "paymentPrice",
        ["Referent narxi"]: "referentPrice",
        ['Farq']: "difference",
        ["Dorixona nomi"]: "pharmacyName",
        ["STIR"]: "tin",
        ["Dorixona viloyati"]: "regionName",
        ["Ma'lumot kiritilgan sana"]: "districtName",
        ['Dorixona manzili']: "address",
      },
      employeeAttachched: [],
      attachchedModal: false,
      attachchedModalLoader: false,
      form1: {
        employeeId: null,
        pharmIds: [],
        comment: ''
      },

      loadingMonthlyChartData: false,
      loadingChartData: false,
      loadingMonthlyChartDataForDXA: false,
      loadingChartDataForDXA: false,

      statusCodesForPharma: {
        CREATED: {
          label: this.$t('pharm.CREATED'),
          color: '#74788D',
          style: {
            border: '1px solid #74788D',
            'margin-right': '1px',
            color: '#74788D',
          },
        },
        SEND_TO_REGION: {
          label: this.$t('pharm.SEND_TO_REGION'),
          color: '#50A5F1',
          style: {
            border: '1px solid #50A5F1',
            'margin-right': '1px',
            color: '#50A5F1',
          },
        },
        BEING_SEEN: {
          label: this.$t('pharm.BEING_SEEN'),
          color: '#F46A6A',
          style: {
            border: '1px solid #F46A6A',
            'margin-right': '1px',
            color: '#F46A6A',
          },
        },

        PROCCESS: {
          label: this.$t('pharm.PROCCESS'),
          color: '#50A5F1',
          style: {
            border: '1px solid #50A5F1',
            'margin-right': '1px',
            color: '#50A5F1',
          },
        },

        SEND_TO_COURT: {
          label: this.$t('pharm.SEND_TO_COURT'),
          color: '#F46A6A',
          style: {
            border: '1px solid #F46A6A',
            'margin-right': '1px',
            color: '#F46A6A',
          },
        },
        TIME_EXTENDED: {
          label: this.$t('pharm.TIME_EXTENDED'),
          color: '#F1B44C',
          style: {
            border: '1px solid #F1B44C',
            'margin-right': '1px',
            color: '#F1B44C',
          },
        },
        FINISHED: {
          label: this.$t('pharm.FINISHED'),
          color: '#623CE8',
          style: {
            border: '1px solid #623CE8',
            'margin-right': '1px',
            color: '#623CE8',
          },
        },
        // FOR_NOT_BELONG_DXA: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#F1B44C',
        //     style: {
        //         border: '1px solid #F1B44C',
        //         'margin-right': '1px',
        //         color: '#F1B44C',
        //     },
        // },
        // FOR_EXTENDED_DXA: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#a80000',
        //     style: {
        //         border: '1px solid #a80000',
        //         'margin-right': '1px',
        //         color: '#a80000',
        //     },
        // },
        // EXTEND_COMPLETED: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#50A5F1',
        //     style: {
        //         border: '1px solid #50A5F1',
        //         'margin-right': '1px',
        //         color: '#50A5F1',
        //     },
        // },
        // EXPIRED: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#50A5F1',
        //     style: {
        //         border: '1px solid #50A5F1',
        //         'margin-right': '1px',
        //         color: '#50A5F1',
        //     },
        // },
        // RETURN_FROM_REGION: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#F46A6A',
        //     style: {
        //         border: '1px solid #F46A6A',
        //         'margin-right': '1px',
        //         color: '#F46A6A',
        //     },
        // },
        // RECEIVED: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#F1B44C',
        //     style: {
        //         border: '1px solid #F1B44C',
        //         'margin-right': '1px',
        //         color: '#F1B44C',
        //     },
        // },
        // FOR_REJECTED_DXA: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#b77308',
        //     style: {
        //         border: '1px solid #b77308',
        //         'margin-right': '1px',
        //         color: '#b77308',
        //     },
        // },
        // RETURN_AFTER_REJECTED: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#F46A6A',
        //     style: {
        //         border: '1px solid #F46A6A',
        //         'margin-right': '1px',
        //         color: '#F46A6A',
        //     },
        // },
        // FOR_ACCEPTED_DXA: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#ff7100',
        //     style: {
        //         border: '1px solid #ff7100',
        //         'margin-right': '1px',
        //         color: '#ff7100',
        //     },
        // },
        // ACCEPTED: {
        //     label: this.$t('pharm.CREATED'),
        //     color: '#556EE6',
        //     style: {
        //         border: '1px solid #556EE6',
        //         'margin-right': '1px',
        //         color: '#556EE6',
        //     },
        // },
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

      // selectedAppStatus: "SEND_TO_REGION",
      selectedAppStatus: "PROCCESS",
      activeStatus:"PROCCESS",
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
      title: 'Shaxsiy malumotlar',
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
      totalSearch: false,
      totalSearchList: 1,
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
      heading: "Ariza shakli",
      heading1: "Raqobatni qo'mitasiga kelib tushgan murojaat",
      moreText: [],
      pdfData: [],
      pdfMedicationData: [],
      base64Image: '',
      proj: {},
      isFormModal: false,
    }
  },

  computed: {
    stateSTIR(){
      return (this.stir && this.stir?.length > 8) ? true : false
      // return this.stir.length > 9 ? true : false
    },
    ability() {
      return ability
    }
    ,
    isTabDxa() {
      return this.activeTab === 'dxa'
    }
    ,
    params() {
      return {
        params: {
          itemsPerPage: this.limit,
          page: this.page - 1,
        },
        search: this.searchValue,
        status: this.activeStatus,
      };
    }
    ,
    statusCodesForPharm() {
      const half = Math.floor(Object.keys(this.statusCodesForPharma).length)
      let arr = {};
      let i = 0;
      for (const key in this.statusCodesForPharma) {
        arr[key] = this.statusCodesForPharma[key];
        i++;
        if (i >= half) {
          break;
        }
      }
      return arr
    },
  },

  methods: {
    generate() {
      this.$refs.formGenererate.generatePdf();
    },


    async getDataInMonth() {
      this.$bvModal.msgBoxConfirm(this.$t('actions.excel_file_upload'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              pharmService
                  .getDataAllInMonthChakana(this.monthwithYear, true)
                  .then((res) => {

                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const fileLink = document.createElement("a");
                    fileLink.href = url;
                    const filename = `file.xls`;
                    fileLink.setAttribute('download', filename);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    fileLink.remove();

                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    clearDateOfIssueRange() {
      this.date_from = null
      this.date_to = null
      this.DateRange = {}
    }
    ,
    async downloadExcelData() {
      this.json_data = []
      await pharmService
          .getAllApplicationExcelData({
            inn: this.searchValue,
            date_from: this.date_from,
            date_to: this.date_to
          }, true)
          .then((res) => {
            this.alljsonData = res.data;
            if (this.alljsonData.length > 0) {
              this.alljsonData.forEach(res => {
                let obj = {}
                obj.mnumber = res.mNumber
                obj.createDate = res.createDate
                obj.firstName = res.firstName
                obj.lastName = res.lastName
                obj.middleName = res.middleName
                obj.phone = res.phone.split('').slice(0, 5).join('') + res.phone.split('').slice(5, 8).join('') + ' ' + (res.phone).split('').slice(8, 10).join('') + ' ' + (res.phone).split('').slice(10).join('')
                obj.checkNumber = res.checkNumber
                obj.medicationName = res.medicationName
                obj.mxikCode = res.mxikCode.split('').slice(0, 3).join('') + ' ' + (res.mxikCode).split('').slice(3).join('')
                obj.paymentDate = res.paymentDate
                obj.paymentPrice = res.paymentPrice
                obj.referentPrice = res.referentPrice
                obj.difference = (res.paymentPrice - res.referentPrice).toFixed(2)
                obj.pharmacyName = res.pharmacyName
                obj.tin = res.tin
                obj.regionName = res.regionName
                obj.districtName = res.districtName
                obj.address = res.address
                this.json_data.push(obj)
              })
            } else {
              this.$toast(this.$t('submodules.integration.error_message'), {type: 'warning'});
            }
          })
          .catch(e => {
            this.tableItems = {};
          })
          .finally(() => {

          })
      return this.json_data
    }
    ,
    async showSelectDataById(id) {
      this.selectDataItem = id;
      if (id) {
        pharmService
            .getByIdApplicationInfo(id, true)
            .then((res) => {
              this.selectedAppealTrItem = res.data;
            })
            .catch(() => {
            });
      } else {

      }
    }
    ,
    async generatePDF(id) {
      if (id) {
        pharmService
            .getByIdApplicationInfo(id, true)
            .then((rs) => {
              this.proj = rs.data;
              this.isFormModal = true
              //
              // this.pdfMedicationData = []
              // require('jspdf-autotable');
              // const columns = [
              //     {title: "", dataKey: "title"},
              //     {title: "", dataKey: "body"}
              // ];
              // const columns2 = [
              //     {title: 'Chek raqami', dataKey: "checkNumber"},
              //     {title: 'Mxik kodi', dataKey: "mxikCode"},
              //     {title: 'Dori nomi', dataKey: "name"},
              //     {title: 'Sotilgan sanasi', dataKey: "paymentDate"},
              //     {title: 'Sotilgan narxi', dataKey: "paymentPrice"},
              //     {title: 'Referent narxi', dataKey: "referentPrice"},
              // ];
              // const doc = new jsPDF({
              //     orientation: "portrait",
              //     format: "letter"
              // });
              //
              // // text is placed using x, y coordinates
              // doc.setFontSize(14).text(this.heading1, 20, 20);
              // // create a line under heading
              // doc.setLineWidth(0.01).line(15, 21, 200, 21);
              // // Using autoTable plugin
              //
              // this.pdfData = [
              //     // {
              //     //     title: "Murojaat ID",
              //     //     body: this.proj.mnumber.substring(1)
              //     // },
              //     {
              //         title: "Arizachi F.I.SH",
              //         body: this.toLatin(this.proj.consumerFirstName ? this.proj.consumerFirstName : '') + ' ' + this.toLatin(this.proj.consumerLastName ? this.proj.consumerLastName : '') + ' ' + this.toLatin(this.proj.consumerMiddleName ? this.proj.consumerMiddleName : '')
              //     },
              //     {
              //         title: "Arizachi telefon nomeri",
              //         body: this.proj.consumerPhone ? this.proj.consumerPhone : ''
              //     },
              //     {
              //         title: "Arizachi JSHSHIRi",
              //         body: this.proj.consumerPinfl ? this.proj.consumerPinfl : ''
              //     },
              //     {
              //         title: "Ariza yuborilgan sana",
              //         body: this.proj.createJson ? this.proj.createJson : ''
              //     },
              //     {
              //         title: "Dorixona nomi",
              //         body: this.toLatin(this.proj.pharmacyName ? this.proj.pharmacyName : '')
              //     },
              //     {
              //         title: "Dorixona direktori F.I.SH",
              //         body: this.toLatin(this.proj.medicationFounderName ? this.proj.medicationFounderName : '')
              //     },
              //     {
              //         title: "Dorixona direktori pasporti",
              //         body: this.toLatin(this.proj.medicationFounderPassport ? this.proj.medicationFounderPassport : '')
              //     },
              //     {
              //         title: "Dorixona direktori telefon raqami",
              //         body: this.toLatin(this.proj.medicationFounderPhone ? this.proj.medicationFounderPhone : '')
              //     },
              //     {
              //         title: "Dorixona STIRi",
              //         body: this.proj.pharmacyTin ? this.proj.pharmacyTin : ''
              //     },
              //     {
              //         title: "Dorixona manzili",
              //         body: this.toLatin(this.proj.pharmacyRegionName ? this.proj.pharmacyRegionName : '') + ' ' + this.toLatin(this.proj.pharmacyDistrictName ? this.proj.pharmacyDistrictName : '') + ' ' + this.toLatin(this.proj.pharmacyAddress ? this.proj.pharmacyAddress : '')
              //     },
              //     {
              //         title: "Dorixona elektron pochtasi",
              //         body: this.toLatin(this.proj.pharmacyEmail ? this.proj.pharmacyEmail : '')
              //     },
              //     {
              //         title: "",
              //         body: ""
              //     },
              //     // {
              //     //     title: "",
              //     //     body: "                                                             Sana:" + new Date().ddmmyyyy()
              //     // },
              //     // {
              //     //     title: "",
              //     //     body: ""
              //     // },
              //     {
              //         title: "Dori vositasi ma'lumotlari",
              //         body: ""
              //     },
              // ]
              //
              // this.pdfMedicationData.push(
              //     {
              //         checkNumber: 'Chek raqami',
              //         mxikCode: 'Mxik kodi',
              //         name: 'Dori nomi',
              //         paymentDate: 'Sotilgan sanasi',
              //         referentPrice: 'Referent narxi',
              //         paymentPrice: 'Sotilgan narxi'
              //     }
              // )
              //
              // for (let i = 0; i < this.proj.medications.length; i++) {
              //     let medication = {
              //         checkNumber: this.proj.medications[i].checkNumber,
              //         mxikCode: this.proj.medications[i].mxikCode,
              //         name: this.toLatin(this.proj.medications[i].name),
              //         paymentDate: this.proj.medications[i].paymentDate,
              //         referentPrice: this.proj.medications[i].referentPrice,
              //         paymentPrice: this.proj.medications[i].paymentPrice
              //     }
              //     this.pdfMedicationData.push(medication)
              // }
              //
              // // QRCode.toDataURL(this.proj.qrLink)
              // //     .then(url => {
              // //         this.base64Image = url
              // //     })
              // //     .catch(err => {
              // //         console.error(err)
              // //     })
              //
              //
              // doc.autoTable({
              //     columns,
              //     body: this.pdfData,
              //     margin: {left: 15, top: 30, right: 15},
              //     // columnStyles: {
              //     //     title: {columnWidth: 3},
              //     //     body: {columnWidth: 'auto'}
              //     // }
              // });
              // doc.autoTable({
              //     columns2,
              //     body: this.pdfMedicationData,
              //     margin: {left: 15, top: 30, right: 15},
              //     // columnStyles: {
              //     //     title: {columnWidth: 3},
              //     //     body: {columnWidth: 'auto'}
              //     // }
              // });
              // // const img = new Image();
              // // img.src = this.base64Image;
              //
              // // img.onload = () => {
              // // await for the image to be fully loaded
              // // doc.addImage(img, "png", 100, 180, 40, 40);
              //
              // doc.setFont("times", "italic", "400")
              //     .text(
              //         "",
              //         0.5,
              //         doc.internal.pageSize.height - 0.5
              //     )
              //     .save(`${this.heading}.pdf`);
              // };
            })
            .catch(() => {
            });
      } else {

      }
    }
    ,
    openSignatureModalForAttachchedEmployeesMultiple() {
      this.attachchedModalLoader = true

      if (this.form1.employeeId || this.form1.pharmIds) {
        // console.log(this.form1);
        Service.setEmployeesAttachchedToAppeal(this.form1)
            .then(async (res) => {
              this.$toast(res.data, {type: 'success'});
              await this.getList();
              await this.getPharmStatusCount();
              this.selectedAppealTrItem = {};
              this.form1.pharmIds = []
              this.form1.employeeId = null;

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
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    openSignatureModalForAttachchedEmployees() {
      this.attachchedModalLoader = true

      if (this.form1.employeeId) {
        this.form1.pharmIds = [this.selectedAppealTrItem.id];
        // console.log(this.form1);
        Service.setEmployeesAttachchedToAppeal(this.form1)
            .then(async (res) => {
              this.$toast(res.data, {type: 'success'});
              await this.getList();
              await this.getPharmStatusCount();
              this.selectedAppealTrItem = {};
              this.form1.employeeId = null;
              this.form1.pharmIds = []
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
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    setAttachchedEmployees() {
      this.attachchedModal = true;
    },
    checkSearchRestult(){
      this.loading = true;
      let searchForm = {
        appealPosition: this.appealPosition,
        stir: this.stir,
        customerName: this.customerName,
        customerNumber: this.customerNumber.slice(4),
        appeal: this.appealYear+'-'+this.appealnumbers,
        searchRegion: this.searchRegion,
        street: this.street,
        startDate:this.date_from,
        endDate: this.date_to
      }
      this.searchResultsLoader =true;

      Service.getSearchResultList({data:searchForm, params:this.params})
          .then((res) => {
            this.appealList = res.data.list;
            res.data.total ? (this.totalSearch = true) : (this.totalSearch = false)
            // this.totalSearch =  res.data.total ? true : false;

            this.totalSearchList = res.data.total;

            this.appealPosition = 'SEND_TO_REGION';
            this.stir = '';
            this.customerName = '';
            this.customerNumber = '';
            this.appealYear = '';
            this.appealnumbers = '';
            this.searchRegion = '';
            this.street = '';
            this.date_from = '01-01-2023';
            this.date_to = this.getDateFormat(new Date(), '-');
            this.searchResultsLoader = false;
            this.loading = false;

          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.searchResultsLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },
    getEmployeesByDepartment() {
      this.loading = true;
      Service.getEmployeesInnerDepartment(this.params)
          .then(({data}) => {
            this.employeeAttachched = data.list;
            // this.employeeAttachched = [];
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            setTimeout(()=>{
              this.loading = false;
            },3500)
          });
    }
    ,
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
    }
    ,
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
    }
    ,

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
    }
    ,
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
    }
    ,
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
    }
    ,
    toggleLoading(boolean) {
      this.loadingById = boolean;
    }
    ,
    activeTableInnerApplication() {
      this.selectedTrItem = {}
      this.activeTab = 'inner'
      this.var_default_search_payload.page = 1
      this.getList();
    }
    ,
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
    }
    ,
    activeTableDXAApplicationFOR_ADD() {
      this.selectedTrItem = {}
      this.activeTab = 'dxa'
      this.activeDXATab = 'FOR_ADD'
      this.var_default_search_payload.page = 1
      this.getList();
    }
    ,
    activeTableDXAApplicationFOR_SALE() {
      this.selectedTrItem = {}
      this.activeTab = 'dxa'
      this.activeDXATab = 'FOR_SALE'
      this.var_default_search_payload.page = 1
      this.getList();
    }
    ,
    updateSidebar() {
      this.signatureModal = false
    }
    ,
    openSignatureModalForCommission() {
      if (this.commissionTypeId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    }
    ,

    getRegionsWithSoatos() {
      statisticsService.getGeograficalRegionsWithSoatos().then(res => {

        let respublic = {
          id: -1,
          nameEn: null,
          nameLt: "RESPUBLIKA",
          nameRu: "РЕСПУБЛИКА",
          nameUz: "РЕСПУБЛИКА",
          parentId: null,
          soato: '',
        }
        res.data.unshift(respublic)

        //   let newSoato = res.data.push(respublic);
        //   this.regionsWithSoatos = newSoato;
        //   console.log(this.regionsWithSoatos);
        this.regionsWithSoatos = res.data
        // console.log(this.regionsWithSoatos);


      })
    },

    customLabelStreetList(opt){
      let selected = this.streetLists.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameUz: selected.nameUz,
          nameLt: selected.nameLt,
          nameRu: selected.nameRu
        })}`
      }
      return ``;
    },

    customLabelAppealPosition(opt){
      let selected = this.appealPositionData.find(vm => vm.value == opt);
      if (selected) {
        return `${this.getName({
          nameUz: selected.nameUz,
          nameLt: selected.nameLt,
          nameRu: selected.nameRu
        })}`
      }
      return `nothing`;
    },
    customLabelRegionSoatos(opt){
      let selected = this.regionsWithSoatos.find(e => e.id == opt );
      if (selected) {
        return `${this.getName({
          nameUz: selected.nameUz,
          nameLt: selected.nameLt,
          nameRu: selected.nameRu
        })}`
      }
      return ``;
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
    }
    ,
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
    }
    ,
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
    }
    ,
    viewIlova(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    }
    ,

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
    }
    ,
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
    }
    ,
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
    }
    ,
    viewDocBeforeSigned() {
      // this.viewModalBeforeSigned = true;
      // this.getByIdLetter();
      this.viewLetter();
    }
    ,
    setCurrentPage(page) {
      this.currentPage = page;
    }
    ,
    getAttachedFilesById(id) {
      Service.getAttachedFilesById(id).then((res) => {
        this.filesList = res.data;
      });
    }
    ,
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
    }
    ,
    showRejectedModal() {
      this.isRejectedModal = true;
    }
    ,
    viewDocSigned() {
      this.viewModal = true;
    }
    ,
    getIncomeTotalCount() {
      Service.getIncomeTotalCount().then((rs) => {
        this.agreementCount = rs.data.agreement;
        this.reviewCount = rs.data.review;
        this.signatureCount = rs.data.signature;
      });
    }
    ,
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
    }
    ,
    getReceivers(item) {
      this.loaderReceiver = true;
      Service.getReceivers(item.letterId)
          .then((rs) => {
            this.infoData = rs.data;
          })
          .finally(() => {
            this.loaderReceiver = false;
          });
    }
    ,
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
    }
    ,
    signatureItem() {
      this.isModalKeys = true;
    }
    ,
    // rowclick
    async selectAppealRowTr(item) {
      if (this.selectedAppealTrItem.id == item.id) {
        this.selectedAppealTrItem = {};
      }
      this.selectedAppealTrItem = item;
    }
    ,
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
    }
    ,
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
    }
    ,
    noPermitRequired(applicationId) {
      this.modalNoPermitRequired = true;
      this.noPermitRequiredApplicationId = applicationId;
    }
    ,
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
    }
    ,
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
    }
    ,
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
    }
    ,
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
    }
    ,
    rejectConfirm() {
      cnfDoc(this.$t("messages.reject_title")).then((rs) => {
        if (rs.value) {
          this.signatureModal = true;
        }
      });
    }
    ,
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
    }
    ,
    async closeSidebar() {
      this.selectedTrItem = {}
      this.isSidebar = false
      this.active = "";
    }
    ,
    async closeRegionSidebar() {
      this.isSidebarRegion = false
      this.active = "";
    }
    ,
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

    }
    ,
    add() {
      this.isModal = true;
    }
    ,
    getPharmStatusCount() {
      Service.getPharmStatusCountDto().then((res) => {
        this.countLabel = res.data;
      })
          .catch((err) => {
            this.catchErr(err);
          })
    }
    ,
    //  backToGetList(){
    //    this.getList();
    //    this.totalSearchList = 1;
    //    this.activeStatus = 'SEND_TO_REGION';
    //    this.totalSearch = false;
    //   // this.selectedAppealTrItem = {};
    // },
    sendToRegion(){
      this.getList();
      this.totalSearch = false;
      this.totalSearchList = 1;
      this.activeStatus = 'PROCCESS';

    },
    getList() {
      this.loading = true;
      Service.getListPharmMonitor(this.params)
          .then((res) => {
            this.appealList = res.data.list;
            this.total = res.data.total;

          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            setTimeout(()=>{
              this.loading = false;
            },3500)
          });
    }
    ,
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

  mounted() {
    // this.getPharmStatusCount();
  },

  async created() {
    await this.getRegionsWithSoatos()
    await this.getList();
    // await this.getEmployeesByDepartment();

  },
}
</script>

<template>
  <div>
    <Layout>
      <div>
        <div v-if="!isFormModal">
          <div class="col-md-12 text-center">
          </div>
        <!-- Searching -->
          <b-modal
              scrollable
              v-model="searchingModal"
              size="lg"
              :title="$t('actions.sorting')"
              style="height: 800px;"
          >
            <b-col cols="12" style="height:310px;">
              <b-row>
                <b-col cols="12" md="6">
                  <div class="mb-2">
                    <label for="fish" style="color:#495057; margin-bottom:2px;">Оралиқ даври:</label>
                    <BaseDateRangePickerWithValidation
                        v-model="DateRange"
                        only-form-element
                        append-to-body
                        show-clear-button
                        @on-clear="clearDateOfIssueRange"
                        :opens="'right'"
                        custom-styles="grid-template-columns: 100%;"
                        :disabled="loadingTableItems"
                    />
                  </div>

                  <div>
                    <label for="companyName" style="color:#495057; margin-bottom:2px;">{{ $t( 'auth.organisation_data' ) }}:</label>
                    <b-form-input v-if="!stir" style="border:1px solid #ccc;" id="companyName" v-model="stir" type="search" class="px-2" placeholder="СТИР бўйича қидириш"></b-form-input>
                    <b-form-input v-else style="border:1px solid #ccc;" id="companyName" v-model="stir" :state="stateSTIR" type="search" class="px-2" placeholder="СТИР бўйича қидириш"></b-form-input>
                  </div>

                  <div class="mt-3 mb-2">
                    <label for="fish" style="color:#495057; margin-bottom:2px;">{{ $t('pharm.chakanaData.customerDatas') }}:</label>
                    <b-form-input style="border:1px solid #ccc;" id="fish" class="px-2" v-model="customerName" type="search" placeholder="Ф.И.Ш"></b-form-input>
                  </div>

                  <div class="mt-1 pt-1">
                    <!--                        <b-form-input v-model="customerNumber" style="border:1px solid #ccc;" type="search" placeholder="Телефон номери" class="px-2"></b-form-input>-->
                    <label for="number" style="color:#495057; margin-bottom:2px;">Телефон номери</label>
                    <BaseInputWithValidation
                        id="number"
                        not-required
                        custom-styles="grid-template-columns: 100%;"
                        v-model="customerNumber"
                        mask="+998#########"
                    />
                  </div>
                </b-col>
                <b-col cols="12" md="6">
                  <div class="mb-2" style="margin-top:3px;">
                    <BaseMultiselectWithValidation
                        style="width:100%;"
                        rules="required"
                        class="required"
                        v-model="appealPosition"
                        :options="appealPositionData.map((vm) => vm.value)"
                        label="Мурожаат ҳолати"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelAppealPosition"
                        open-direction="bottom"
                        :max-height="800"
                        :show-labels="false"
                    ></BaseMultiselectWithValidation></div>
                  <div>
                    <label for="appeal" style="width:100%; color:#495057; margin-bottom:2px; margin-right: 3px; text-align: end;">{{ $t('pharm.chakanaData.appealDatas') }}</label>
                    <b-row>
                      <b-col cols="4" class="pr-0"><b-form-input id="appeal" style="border:1px solid #ccc;" v-model="appealYear" placeholder="2023" type="number" class="px-2"></b-form-input></b-col>
                      <b-col cols="8" class="pl-1">
                        <b-form-input id="appal" style="border:1px solid #ccc;" v-model="appealnumbers" type="number" :placeholder="$t('pharm.pharmUlgurji.number')" class="px-2"></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                  <div style="margin: 18px 0 15px 0;">
                    <!-- <b-form-select
                                style="border:1px solid #2b675b;"
                                v-model="searchRegion"
                                :disabled="false"
                                :options="regionsWithSoatos.map((e) => e.nameUz )"
                                class="form-select"
                        ></b-form-select> -->
                    <BaseMultiselectWithValidation
                        style="width:100%; z-index:99;"
                        rules="required"
                        class="required"
                        v-model="searchRegion"
                        :options="regionsWithSoatos.map((e) => e.id)"
                        label="Вилоят"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelRegionSoatos"
                        open-direction="bottom"
                        :max-height="800"
                        :show-labels="false"
                    ></BaseMultiselectWithValidation>
                  </div>
                  <div>
                    <!-- <b-form-input style="border:1px solid #2b675b;" v-model="street" placeholder="Туман" class="px-2"></b-form-input> -->
                    <BaseMultiselectWithValidation
                        :disabled="!streetLists.length && !searchRegion"
                        style="width:100%; z-index:99;"
                        rules="required"
                        class="required"
                        v-model="street"
                        :options="streetLists.map(e => e.id)"
                        label="Туман"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelStreetList"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    ></BaseMultiselectWithValidation>
                  </div>
                </b-col>
              </b-row>
            </b-col>


            <template v-slot:modal-footer>
              <b-button
                  style="background-color:#2b675b; color:white;"
                  @click="searchingModal = false;"
              >
                <b-overlay
                    :opacity="0.1"
                    :show="searchResultsLoader"
                    rounded="sm"
                >
                  {{ $t("actions.search") }}
                </b-overlay>
              </b-button>
            </template>
          </b-modal>

          <div class="row" v-if="activeTab">
            <div class="col-12">

              <!-- APPLICATIONS TABS -->
              <div class="row">
                <div class="col-12 mt-5">
                  <div class="row">
                    <div class="col-8">
                      <div class="col-12 d-flex justify-content-start">
                        <div @click="activeStatus = 'PROCCESS'"
                             class="d-flex justify-content-between align-items-center"
                             style="cursor:pointer; width:340px; border: 1px solid #2b675b; padding: 4px 10px; border-radius: 5px;"
                             :style="activeStatus=='PROCCESS' ? `background-color: #2b675b; color: white`:`background-color: white; color: #2b675b`"
                        >
                          <div class="font-weight-bold">{{
                              $t('pharm.chakanaData.appealProsecc')
                            }}
                          </div>
                          <div>
                            <p class="font-weight-bold"
                               style="padding:3px 6px 2px 6px; background-color: #2b675b; color: white; font-size: 12px; border-radius: 5px; border:1px solid white; margin-bottom:0;">
<!--                              <span v-if="countLabel.beingSeen || countLabel.process || countLabel.sendToCourt || countLabel.timeExtended">-->
<!--                                {{ (countLabel.beingSeen + countLabel.process + countLabel.sendToCourt + countLabel.timeExtended).toLocaleString() }}</span>-->
<!--                              <span v-else>0</span>-->
                              <span>1</span>
                            </p>
                          </div>
                        </div>

                        <div @click="activeStatus = 'FINISHED'"
                             class="d-flex justify-content-between align-items-center ml-3"
                             style="cursor:pointer; width:340px; border: 1px solid #2b675b; padding: 4px 10px; border-radius: 5px;"
                             :style="activeStatus=='FINISHED' ? `background-color: #2b675b; color: white`:`background-color: white; color: #2b675b`"
                        >
                          <div class="font-weight-bold">{{
                              $t('pharm.chakanaData.appealFinished')
                            }}
                          </div>
                          <div>
                            <p class="font-weight-bold"
                               style="padding:3px 6px 2px 6px; background-color: #2b675b; color: white; font-size: 12px; border-radius: 5px; border:1px solid white; margin-bottom:0;">
                               <span>
                                 {{ formatNumber(countLabel.finished ? countLabel.finished : 0) }}
                               </span>
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                      <b-button style="background-color:white; display:flex; align-items:center; border:1px solid #2b675b; padding: 4px 26px" @click="searchingModal = true">
                        <div><i class="mdi mdi-filter" style="font-size:16px; color:#2b675b;"></i></div>
                        <p style="color:#2b675b; margin-bottom:0; font-weight:bold;">{{ $t('actions.sorting') }}
                          <span>
                          <span v-if="totalSearch" style="width:210px; background-color: #2b675b; border: 1px solid #2b675b; color:white; padding: 1px 6px; border-radius: 5px;">
                           {{ totalSearchList }}
                           </span>
                           <span v-else></span>
                          </span>
                        </p>
                      </b-button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <div class="row">
                        <div class="col-12 pr-1 pl-0 pt-4">
                          <div class="card card-body card-tabs p-2 mb-1" style="min-height: 35em">
                            <div class="card" style="min-height: 70vh">
                              <div class="table-responsive">
                                <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                                  <simplebar
                                      :key="cmpKey + 'FORWARD_TENDERS'"
                                      style="height: 75vh; background: #ffffff; border-radius: 8px"
                                      id="contact-list"
                                      ref="tendersRef"
                                  >
                                    <ul v-if="(total > 0) && (totalSearchList > 0)" class="list-unstyled chat-list">
                                   <li
                                          :id="appealList[appealList.length - 1].id == data.id ? 'lid' : ''"
                                          v-for="(data, index) in appealList"
                                          :key="data.id + 'CONTACTS_FOR_CHAT' + index"

                                      >
                                        <a href="javascript: void(0);"
                                           class="pl-0 pr-2 pt-2 pb-1">
                                          <div class="media d-flex"
                                               style="align-items: center;">
                                            <div class="overflow-hidden d-flex align-items-center">

                                              <div class="listStyle"
                                                   :class="{active : (data.id == selectDataItem)}"
                                                   @click.prevent="showSelectDataById(data.id)">
                                                                                <span class="d-flex justify-content-between"
                                                                                      style="margin-bottom: 2px;">
                                                                                    <span>id: <b>{{
                                                                                        data.mnumber.slice(2)
                                                                                      }}</b></span>
                                                                                    <span>{{
                                                                                        data.createJson.slice(0, 10).split('-').join('.')
                                                                                      }}</span>
                                                                                </span>
                                                <p style="margin-bottom: 2px;">{{
                                                    $t('pharm.chakanaData.appealer')
                                                  }}: <b>{{ data.consumerLastName }}
                                                    {{ data.consumerFirstName }}
                                                    {{ data.consumerMiddleName }}
                                                  </b></p>
                                                <p style="margin-bottom: 2px;">{{
                                                    $t('pharm.chakanaData.sellDate')
                                                  }}: <b>{{
                                                      data.updateJson.slice(0, 10).split('-').join('.')
                                                    }}</b></p>
                                                <span class="d-flex justify-content-between"
                                                      style="margin-bottom: 2px;">
                                                                                    <span>{{
                                                                                        $t('pharm.chakanaData.sectionControl')
                                                                                      }}: <b>{{
                                                                                          data.pharmacyRegionName
                                                                                        }}</b></span>
                                                                                    <span>
                                                                                        <i @click="generatePDF(data.id)"
                                                                                           class="fa fa-download mr-2"></i>

                                                                                        <span class="buyerId"
                                                                                              :class="{activeBuyerId : (data.id == selectDataItem)}">#{{
                                                                                            Number(data.mnumber.slice(7))
                                                                                          }}</span>
                                                                                    </span>
                                                                                </span>
                                              </div>
                                            </div>

                                          </div>
                                        </a>
                                      </li>
                                     </ul>
                                    <div v-else>
                                      <div class="text-center" style="margin-top: 20px">
                                        <h5 style="opacity: 0.7">
                                          {{ $t('messages.data_not_found') }}</h5>
                                        <b-button variant="link" @click="sendToRegion()">{{$t("actions.back")}}</b-button>
                                      </div>
                                    </div>
                                  </simplebar>
                                </b-overlay>

                              <div class="col-12">
                                <div class="row">
                                  <div class="col-lg-8">
                                    <div v-if="(total > 0) && (totalSearchList == 1)">
                                      <b-pagination
                                          class="pl-2"
                                          align="left"
                                          :total-rows="total"
                                          :per-page="limit"
                                          v-model="page"
                                      >
                                      </b-pagination>
                                    </div>
                                    <div v-else>
                                      <b-pagination
                                          class="pl-2"
                                          align="left"
                                          :total-rows="totalSearchList"
                                          :per-page="limit"
                                          v-model="page"
                                      >
                                      </b-pagination>
                                    </div>

                                  </div>
                                  <div class="col-lg-4">
                                    <b-form-input style="width: 70%; float: right;" v-model="page" type="number"></b-form-input>
                                  </div>
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-9">
                      <div class="row">
                        <div class="col-12 pl-1 pr-1 pt-4">
                          <div class="card card-body card-tabs px-2 pt-0 mb-1" style="min-height: 50em">
                            <div v-if="Object.keys(this.selectedAppealTrItem).length !== 0"
                                 class="card card-body card-tabs px-2 pt-2 mb-1" style="height: 80vh; overflow-y: auto;">
                              <div class="d-flex justify-content-between align-items-center"
                                   style="background-color: #2b6c58; padding: 6px 10px;">
                                <div class="text-white font-weight-bold">
                                  {{ $t('pharm.chakanaData.appealDatas') }}
                                </div>
                              </div>

                              <div style="border: 1px solid #2b6c58; padding:10px; background-color: white; margin-top: 10px;">
                                <div style="background-color: #2b6c58; padding: 6px 10px; width: 220px;">
                                  <div class="text-white font-weight-bold text-start">
                                    {{ $t('pharm.chakanaData.customerDatas') }}
                                  </div>
                                </div>
                                <b-row class="mt-2">
                                  <b-col cols="12">
                                    <b-row>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.fish') }} :</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.consumerLastName
                                          }} {{ selectedAppealTrItem.consumerFirstName }}
                                          {{ selectedAppealTrItem.consumerMiddleName }}</b>
                                        </p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.jshshri') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.consumerPinfl ? selectedAppealTrItem.consumerPinfl : $t('actions.empty')
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.phoneNumber') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">+{{
                                            selectedAppealTrItem.consumerPhone
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.appealNumber') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.mnumber.slice(2)
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.cardNumber') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyTin
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.submitDate') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.createJson.slice(0, 10).split('-').join('.')
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.submitAppealDate') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.createJson.slice(0, 10).split('-').join('.')
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.appealPosition') }}:</p>
                                        <p class="mb-0">
                                          <b style="color:#2b6c58;"
                                             v-if="selectedAppealTrItem.status == 'SEND_TO_REGION'">
                                            {{ $t('pharm.chakanaData.sendToRegion') }}
                                          </b>
                                          <b style="color:#2b6c58;"
                                             v-else-if="selectedAppealTrItem.status == 'CREATED'">
                                            {{ $t('pharm.chakanaData.create') }}
                                          </b>
                                          <b style="color:#2b6c58;"
                                             v-else-if="selectedAppealTrItem.status == 'TIME_EXTENDED'">
                                            {{ $t('pharm.chakanaData.time_extended') }}
                                          </b>
                                          <b style="color:#2b6c58;"
                                             v-else-if="selectedAppealTrItem.status == 'FINISHED'">
                                            {{ $t('pharm.chakanaData.finished') }}
                                          </b>
                                          <b style="color:#2b6c58;" v-else>
                                            {{ $t('pharm.chakanaData.prosecc') }}
                                          </b>

                                        </p>
                                      </b-col>
                                    </b-row>
                                  </b-col>
                                  <b-col cols="12" class="mt-4"
                                         :class="{'mb-3' : (selectedAppealTrItem.medications.length < 3) }">
                                    <b-row>
                                      <b-col cols="9">
                                        <table class="mt-1">
                                          <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>{{ $t('pharm.chakanaData.pillName') }}</th>
                                            <th>{{ $t('pharm.chakanaData.mxikCode') }}</th>
                                            <th>{{ $t('pharm.chakanaData.refPrice') }}</th>
                                            <th>{{ $t('pharm.chakanaData.sellPrice') }}</th>
                                            <th>{{ $t('pharm.chakanaData.fullPrice') }}</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr v-for="(medication, index) in selectedAppealTrItem.medications ? selectedAppealTrItem.medications.slice(0, 2) : []"
                                              :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ medication.name }}</td>
                                            <td>{{ medication.mxikCode }}</td>
                                            <td>
                                              {{
                                                formatNumber(medication.referentPrice ? medication.referentPrice : 0)
                                              }}
                                            </td>
                                            <td>
                                              {{
                                                formatNumber(medication.paymentPrice ? medication.paymentPrice : 0)
                                              }}
                                            </td>
                                            <td class="text-danger">
                                              {{
                                                formatNumber(medication.differencePrice ? medication.differencePrice.toFixed(2) : 0)
                                              }}
                                            </td>

                                          </tr>
                                          <tr :class="openTable ? 'd-none' : ''"
                                              v-for="(medication1, index1) in selectedAppealTrItem.medications ? selectedAppealTrItem.medications.slice(2) : []"
                                              :key="index1">
                                            <td>{{ index1 + 2 }}</td>
                                            <td>{{ medication1.name }}</td>
                                            <td>{{ medication1.mxikCode }}</td>
                                            <td>
                                              {{
                                                formatNumber(medication1.referentPrice ? medication1.referentPrice : 0)
                                              }}
                                            </td>
                                            <td>
                                              {{
                                                formatNumber(medication1.paymentPrice ? medication1.paymentPrice : 0)
                                              }}
                                            </td>
                                            <td class="text-danger">
                                              {{
                                                formatNumber(medication1.differencePrice ? medication1.differencePrice.toFixed(2) : 0)
                                              }}
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                        <div class="text-center">
                                                              <span v-if="selectedAppealTrItem.medications.length > 2">
                                                                  <i v-if="openTable" @click="openTable = !openTable"
                                                                     class="mdi mdi-chevron-double-down"
                                                                     style="font-size: 25px; font-weight: bold;"></i>
                                                                  <i v-else @click="openTable = !openTable"
                                                                     class="mdi mdi-chevron-double-up"
                                                                     style="font-size: 25px; font-weight: bold;"></i>
                                                              </span>
                                        </div>
                                      </b-col>
                                      <b-col cols="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.allPrice') }}:</p>
                                        <p class="mb-0"><b class="text-danger">
                                          {{
                                            formatNumber(selectedAppealTrItem.allExtraPrice ? selectedAppealTrItem.allExtraPrice.toFixed(2) : 0)
                                          }}
                                          so'm</b></p>
                                        <b-button
                                            v-if="selectedAppealTrItem.medications.length > 2"
                                            @click="openTable = !openTable"
                                            style="background-color: #2b6c58; border:none; width: 40%; padding: 3px 10px; margin-top: 5px;">
                                                                <span v-if="openTable"
                                                                      class="d-flex justify-content-between align-items-center">
                                                                    <span>{{ $t('actions.details') }}</span>
                                                                    <span><i class="mdi mdi-eye-outline"
                                                                             style="font-size: 15px;"></i></span>
                                                                </span>
                                          <span v-else
                                                class="d-flex justify-content-between align-items-center">
                                                                    <span>{{ $t('actions.close') }}</span>
                                                                    <span><i class="mdi mdi-eye-off-outline"
                                                                             style="font-size: 15px;"></i></span>
                                                                </span>
                                        </b-button>

                                      </b-col>
                                    </b-row>
                                  </b-col>
                                </b-row>

                              </div>
                              <div style="border: 1px solid #2b6c58; padding:10px; background-color: white; margin-top: 10px;">
                                <div style="background-color: #2b6c58; padding: 6px 10px; width: 220px;">
                                  <div class="text-white font-weight-bold text-start">
                                    {{ $t('pharm.chakanaData.pharmInfo') }}
                                  </div>
                                </div>
                                <b-row class="mt-2">
                                  <b-col cols="12">
                                    <b-row>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.pharmName') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyName
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.pharmStr') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyTin
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.pharmBoss') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.medicationFounderName
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.passNumber') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.medicationFounderPassport
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.phoneNumber') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">+998 {{
                                            selectedAppealTrItem.medicationFounderPhone
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.pharmLoc') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyRegionName
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.pharmLocInside') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyDistrictName
                                          }}</b></p>
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.email') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">-</b></p>
                                      </b-col>
                                    </b-row>
                                  </b-col>
                                </b-row>

                              </div>
                              <div style="border: 1px solid #2b6c58; padding:10px; background-color: white; margin-top: 10px;">
                                <div style="background-color: #2b6c58; padding: 6px 10px; width: 220px;">
                                  <div class="text-white font-weight-bold text-start">
                                    {{ $t('pharm.chakanaData.selectIjro') }}
                                  </div>
                                </div>
                                <b-row class="mt-2">
                                  <b-col cols="12">
                                    <b-row>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.masulArea') }}:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.pharmacyRegionName
                                          }}</b></p>
                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.appealDate') }}:</p>
                                        <p class="mb-0"><b
                                            style="color:#2b6c58;">{{
                                            selectedAppealTrItem.createJson.slice(0, 10).split('-').join('.')
                                          }}</b>
                                        </p>

                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">Мурожаат-1:</p>
                                        <p class="mb-0"><b style="color:#2b6c58;">{{
                                            selectedAppealTrItem.mnumber.slice(2)
                                          }}</b></p>

                                      </b-col>
                                      <b-col cols="12" sm="3">
                                        <p class="mb-0" style="color:#839690;">
                                          {{ $t('pharm.chakanaData.appealDate') }}:</p>
                                        <p class="mb-0"><b
                                            style="color:#2b6c58;">{{
                                            selectedAppealTrItem.createJson.slice(0, 10).split('-').join('.')
                                          }}</b>
                                        </p>

                                      </b-col>
                                    </b-row>
                                  </b-col>
                                </b-row>

                              </div>
                              <div style="border: 1px solid #2b6c58; padding:10px; background-color: white; margin-top: 10px;">
                                <div style="background-color: #2b6c58; padding: 6px 10px; width: 220px;">
                                  <div class="text-white font-weight-bold start">
                                    {{ $t('pharm.chakanaData.workFile') }}
                                  </div>
                                </div>
                                <b-row class="mt-3">
                                  <b-col cols="12">

                                    <table>
                                      <thead>
                                      <tr>
                                        <th width="1%">#</th>
                                        <th width="30%">{{
                                            $t('pharm.chakanaData.typeWork')
                                          }}
                                        </th>
                                        <th width="8%">{{
                                            $t('pharm.chakanaData.sendFile')
                                          }}
                                        </th>
                                        <th width="20%">{{
                                            $t('pharm.chakanaData.fileName')
                                          }}
                                        </th>
                                        <th width="8%">{{
                                            $t('pharm.chakanaData.seeDown')
                                          }}
                                        </th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Iste'molchi hujjatlari</td>
                                        <td>30.09.2023</td>
                                        <td>murojaat-31635.pdf</td>
                                        <td>
                                                                    <span>
                                                                      <i class="mdi mdi-eye-outline mr-2"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                      <i class="fa fa-download"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                    </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Ijro hujjatlar</td>
                                        <td>30.09.2023</td>
                                        <td>murojaat_4444.pdf</td>
                                        <td>
                                                                    <span>
                                                                      <i class="mdi mdi-eye-outline mr-2"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                      <i class="fa fa-download"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                    </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Iste'molchi hujjatlari</td>
                                        <td>30.09.2023</td>
                                        <td>murojaat.pdf</td>
                                        <td>
                                                                    <span>
                                                                      <i class="mdi mdi-eye-outline mr-2"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                      <i class="fa fa-download"
                                                                         style="font-size: 15px; font-weight: bold;"></i>
                                                                    </span>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>

                                  </b-col>
                                </b-row>

                              </div>

                            </div>
                            <div v-else
                                 style="border: 1px solid #2b6c58; padding:20px 10px; background-color: white; margin-top: 10px;">
                              <p style="font-size: 18px; text-align: center; margin-bottom: 0;">
                                {{ $t('messages.data_not_found') }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div size="xl" v-else-if="isFormModal">
          <b-button
              variant="primary"
              class="btn-label float-left ml-3"
              @click="isFormModal = false"
          >
            <i class="bx bx-arrow-back label-icon"></i>
            {{ $t('actions.back') }}
          </b-button>
          <b-button
              variant="primary"
              class="btn-label float-right mr-2"
              @click="generate"
          >
            <i class="bx bx-download label-icon"></i>
            {{ $t('actions.upload_file') }}(pdf)
          </b-button>
          <br>
          <forma
              ref="formGenererate"
              :resDate="proj"
          ></forma>
        </div>
      </div>
    </Layout>
  </div>
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

.noClicking {
  pointer-events: none;
  background-color: #68a190;
}

.listStyle {
  width: 100vw;
  background-color: #f5fffd;
  color: #2b6c58;
  padding: 8px;
  border-radius: 2px;
  transition: all 0.15s ease;
}

.buyerId {
  border: 1px solid #2b6c58;
  border-radius: 3px;
  padding: 2px 6px;
}

.listStyle:hover {
  background-color: #2b6c58;
  border-radius: 2px;
  color: white;
  padding: 8px;
}

.active {
  background-color: #2b6c58;
  border-radius: 2px;
  color: white;
  padding: 8px;

}

.listStyle:hover .buyerId {
  border: 1px solid white;
}

.bg-class {
  background-color: #fbfbfb !important;
}

table, td, th {
  border: 1px solid #2b6c58;
  color: #2b6c58;
  text-align: center;
  padding: 5px 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
}


::v-deep .base-form-component label {
  text-align: start;
}

::v-deep .form-control{
  padding: 3px 5px;
}

::v-deep .page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #2b6c58;
  border-color: #2b6c58;
}

::v-deep .custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #2b6c58;
  background-color: #2b6c58;
}

::v-deep .alert-info {
  width: 410px;
}

::v-deep .card-body {
  padding: 0 20px;
}

::v-deep .base-form-component label {
  text-align: end;
  margin-right: 10px;
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

<style scoped>
.pharm-table {
  display: table;
  border: 1px solid #cccccc;
  margin: 5px;
  border-radius: 5px;
  margin-bottom: 50px;
}

.pharm-row {
  display: table-row;
  border: 1px solid #cccccc;
  text-align: center;
  padding: 5px;
}

.pharm-cell {
  display: table-cell;
  border: 1px solid #cccccc;
  text-align: center;
  padding: 5px;
}
</style>
