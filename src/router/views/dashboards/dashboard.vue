<script>
import Layout from "@/router/layouts/main";
import i18n from "@/i18n";
import PageHeader from "@/components/page-header";
import {TokenService} from "@/shared/services/storage.service";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import VueApexCharts from 'vue-apexcharts'
import helperService from "@/shared/services/helper.service";
import ProjectMenu from "@/shared/views/auth/MainProMenu.vue";

const MAIN_API_URL_USER = 'user'
const MAIN_API_URL = 'report/dashboard'

/**
 * Dashboard Component
 */
export default {
    components: {
        Layout,
        PageHeader,
        ProjectMenu,
        VueApexCharts,
    },
    data() {
        return {
            userId: TokenService.getUserId(),
            userInfos: [],
            counts: [],
            countsByRegion: [],
            arr: [],
            isOpen: false,
            title: i18n.t('submodules.ad_passport_info.title'),
            items: [
                {
                    text: "Dashboard",
                    href: "/",
                },
                {
                    text: i18n.t('submodules.ad_passport_info.title'),
                    active: true,
                },
            ],
            transactions: [
                {
                    id: "#SK2540",
                    name: "Neal Matthews",
                    date: "07 Oct, 2019",
                    total: "$400",
                    status: "Paid",
                    payment: ["fa-cc-mastercard", "Mastercard"],
                    index: 1,
                },
                {
                    id: "#SK2541",
                    name: "Jamal Burnett",
                    date: "07 Oct, 2019",
                    total: "$380",
                    status: "Chargeback",
                    payment: ["fa-cc-visa", "Visa"],
                    index: 2,
                },
                {
                    id: "#SK2542",
                    name: "Juan Mitchell",
                    date: "06 Oct, 2019",
                    total: "$384",
                    status: "Paid",
                    payment: ["fab fa-cc-paypal", "Paypal"],
                    index: 3,
                },
                {
                    id: "#SK2543",
                    name: "Barry Dick",
                    date: "05 Oct, 2019",
                    total: "$412",
                    status: "Paid",
                    payment: ["fa-cc-mastercard", "Mastercard"],
                    index: 4,
                },
                {
                    id: "#SK2544",
                    name: "Ronald Taylor",
                    date: "04 Oct, 2019",
                    total: "$404",
                    status: "Refund",
                    payment: ["fa-cc-visa", "Visa"],
                    index: 5,
                },
                {
                    id: "#SK2545",
                    name: "Jacob Hunter",
                    date: "04 Oct, 2019",
                    total: "$392",
                    status: "Paid",
                    payment: ["fab fa-cc-paypal", "Paypal"],
                    index: 6,
                },
            ],

            //FOR ROUND DIAGRAM
            // pieSeries: [44, 55, 13, 43, 22, 25, 45, 89, 74, 98, 12, 58, 78, 54],
            // pieChartOptions: {
            //   chart: {
            //     width: 380,
            //     type: 'pie',
            //   },
            //   labels: ['Андижон вилояти', 'Буҳоро вилояти', 'Фарғона вилояти', 'Жиззах вилояти', 'Наманган вилояти', 'Навоий вилояти', 'Қашқадарё вилояти', 'Қорақалпоғистон Республикаси', 'Самарқанд вилояти', 'Сирдарё вилояти', 'Сурхандарё вилояти', 'Тошкент шаҳри', 'Тошкент вилояти', 'Хоразм вилояти'],
            //   responsive: [{
            //     breakpoint: 480,
            //     options: {
            //       chart: {
            //         width: 200
            //       },
            //       legend: {
            //         position: 'bottom'
            //       }
            //     }
            //   }]
            // },
            //END ROUND DIAGRAM ELEMENTS

            //FOR DIAGRAM

            barChart: {
                isShow: false,
                series: [],
                chartOptions: {
                    chart: {
                        stacked: true,
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: true,
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "15%",
                            endingShape: "rounded",
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        //ToDo BACKDAN KELADIGAN QILISH KERAK
                        // "ҚАШҚАДАРЁ ВИЛОЯТИ", "ЖИЗЗАХ ВИЛОЯТИ", "СИРДАРЁ ВИЛОЯТИ", "НАМАНГАН ВИЛОЯТИ", "АНДИЖОН ВИЛОЯТИ", "НАВОИЙ ВИЛОЯТИ", "БУХОРО ВИЛОЯТИ", "ТОШКЕНТ ШАҲАР", "СУРХОНДАРЁ ВИЛОЯТИ", "САМАРҚАНД ВИЛОЯТИ", "ФАРҒОНА ВИЛОЯТИ", "ТОШКЕНТ ВИЛОЯТИ", "КОРАҚАЛПОҒИСТОН РЕСПУБЛИКАСИ", "ХОРАЗМ ВИЛОЯТИ"]
                        categories: []
                    },
                    colors: ["#556ee6", "#f1b44c", "#34c38f", "#f46a6a"],
                    legend: {
                        position: "bottom",
                    },
                    fill: {
                        opacity: 1,
                    },
                }
            }
            //END DIAGRAM ELEMENTS
        };
    },
    /*
  COMPUTED */
    computed: {
        // current_project() {
        //     return JSON.parse(localStorage.getItem('current_project')) ? JSON.parse(localStorage.getItem('current_project')) : null
        // },
        result() {
            return (TokenService.getCurrentProject('fair_tech')
                || TokenService.getCurrentProject('fair_price')
                || TokenService.getCurrentProject('pharm_info')
                || TokenService.getCurrentProject('product_info')
                || TokenService.getCurrentProject('integration'))
        }
    },

    /*
    METHODS */
    methods: {
        async isLoginBtn(value) {
            localStorage.setItem('current_project', value);
            this.$router.push('/dashboard');
        },
        getUserInfo() {
            crudAndListsService.getById(MAIN_API_URL_USER, this.userId)
                .then((res) => {
                    this.userInfos = res.data;
                })
                .catch(e => {
                    this.userInfos = [];
                })
        },

        clearValue() {
            this.$set(this.barChart, "series", []);
            // this.$set(this.barChart.chartOptions.xaxis, "categories", []);
        },
        async setResponse(data) {
            await this.clearValue();
            let passport = data.map((e) => e.getAdvertisementCountByIsUzAvtoYulIsFalse);
            let passportAvtoyul = data.map((e) => e.getAdvertisementCountByIsUzAvtoYulIsTrue);
            let notification = data.map((e) => e.getAdvertisementNotificationCount);
            let report = data.map((e) => e.getInventoryReportCount);

            this.barChart.chartOptions.xaxis.categories = data.map((e) => this.getName({
                nameRu: e.getRegionNameRu,
                nameLt: e.getRegionNameLt,
                nameUz: e.getRegionNameUz,
                nameEn: e.getRegionNameEn,
            }));
            this.barChart.series.push({
                data: passport,
                name: this.$t("column.passports"),
            });
            this.barChart.series.push({
                data: passportAvtoyul,
                name: this.$t("column.passports_avtoyul"),
            });
            this.barChart.series.push({
                data: notification,
                name: this.$t("submodules.contractor_notification.all_notifications"),
            });
            this.barChart.series.push({
                data: report,
                name: this.$t("submodules.inventory_report.all_reports"),
            });
            this.barChart.isShow = true;
            //ToDo TO'G'IRLASH KERAK, shu yerda chartni categories iga backdan kelgan qiymatlar beriladi
            // await this.$set(
            //     this.barChart.chartOptions.xaxis,
            //     "categories",
            //     regionNames
            // );
        },
        getCountsByRegionFromServer() {
            helperService.getCountsByRegion()
                .then((res) => {
                    this.countsByRegion = res.data.responseData;
                    this.setResponse(res.data.responseData)
                })
                .catch(e => {
                    this.counts = [];
                })
        },
        getCountsFromServer() {
            helperService.getCounts()
                .then((res) => {
                    this.counts = res.data;
                })
                .catch(e => {
                    this.counts = [];
                })
        },
        getPassports() {
            this.$router.push({
                name: 'AdvertisementPassportInfoAvtoyulFalse',
                params: {}
            })
        },
        getPassportsAvtoyul() {
            this.$router.push({
                name: 'AdvertisementPassportInfoAvtoyulTrue',
            })
        },
        getNotifications() {
            this.$router.push({
                name: 'IncomeNotifications',
            })
        },
        getReports() {
            this.$router.push({
                name: 'IncomeInventoryReports',
            })
        }
    },
    mounted() {
    },

    created() {
        this.getUserInfo()
        this.getCountsFromServer()
        this.getCountsByRegionFromServer()
    },
    /*
    WATCH */
    watch: {}
}
</script>

<style scoped>

.cursor-pointer {
    cursor: pointer;
}
</style>

<template>
    <div>
        <Layout v-if="result">
            <PageHeader :title="title" :items="items"/>
            <div class="row">
                <div class="col-xl-4">
                    <div class="card overflow-hidden">
                        <!--          <div class="bg-soft bg-primary">-->
                        <!--            <div class="row">-->
                        <!--              <div class="col-7">-->
                        <!--                <div class="text-primary p-3">-->
                        <!--                  <h5 class="text-primary">Welcome Back !</h5>-->
                        <!--                  <p>ANTIMONOPOLY COMMITTEE OF THE REPUBLIC OF UZBEKISTAN</p>-->
                        <!--                </div>-->
                        <!--              </div>-->
                        <!--              <div class="col-5 align-self-end">-->
                        <!--                <img src="@/assets/images/profile-5.png" alt class="img-fluid"/>-->
                        <!--              </div>-->
                        <!--            </div>-->
                        <!--          </div>-->
                        <div class="card-body pt-0">
                            <div class="row">
                                <div class="col-sm-12">
                                    <b-row>
                                        <b-col cols="3">
                                            <div class="avatar-md">
                                                <img
                                                        src="@/assets/images/img.png"
                                                        alt
                                                        class="img-thumbnail rounded-circle mt-2"
                                                />
                                            </div>
                                        </b-col>
                                        <b-col cols="9" class="pt-3">
                                            <h6 class="font-size-15 text-truncate">{{ userInfos.employeeFullName }}</h6>
                                            <p class="text-muted mb-0 text-truncate">{{
                                                userInfos.departmentParentNameUz
                                                }}</p>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </div>
                        <!-- end card-body -->
                    </div>
                </div>
                <!-- end col -->
                <div class="col-xl-8">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card mini-stats-wid">
                                <div class="card-body">
                                    <div class="media cursor-pointer" @click="getPassports">
                                        <div class="media-body">
                                            <p class="text-muted fw-medium mb-2">{{ $t('column.passports') }}</p>
                                            <h4 class="mb-0">{{ counts.countPassport }}</h4>
                                        </div>
                                        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i class="bx bx-copy-alt font-size-24"></i>
          </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card-body -->
                            </div>

                        </div>
                        <div class="col-md-3">
                            <div class="card mini-stats-wid">
                                <div class="card-body">
                                    <div class="media cursor-pointer" @click="getPassportsAvtoyul">
                                        <div class="media-body">
                                            <p class="text-muted fw-medium mb-2">{{
                                                $t('column.passports_avtoyul')
                                                }}</p>
                                            <h4 class="mb-0">{{ counts.countPassportAvtoyul }}</h4>
                                        </div>
                                        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i class="bx bx-copy-alt font-size-24"></i>
          </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card-body -->
                            </div>

                        </div>
                        <div class="col-md-3">
                            <div class="card mini-stats-wid">
                                <div class="card-body">
                                    <div class="media cursor-pointer" @click="getNotifications">
                                        <div class="media-body">
                                            <p class="text-muted fw-medium mb-2">{{
                                                $t('submodules.contractor_notification.all_notifications')
                                                }}</p>
                                            <h4 class="mb-0">{{ counts.countNotification }}</h4>
                                        </div>
                                        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i class="bx bxs-bell font-size-24"></i>
          </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card-body -->
                            </div>

                        </div>
                        <div class="col-md-3">
                            <div class="card mini-stats-wid">
                                <div class="card-body" @click="getReports">
                                    <div class="media cursor-pointer">
                                        <div class="media-body">
                                            <p class="text-muted fw-medium mb-2">
                                                {{ $t('submodules.inventory_report.all_reports') }}</p>
                                            <h4 class="mb-0">{{ counts.countInventoryReport }}</h4>
                                        </div>
                                        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i class="bx bx-list-check font-size-24"></i>
          </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card-body -->
                            </div>

                        </div>
                    </div>
                </div>
                <div class="card" style="width: 100%">
                    <div class="card-body" style="width: 100%">
                        <div class="d-sm-flex flex-wrap">
                            <h4 class="card-title mb-4">{{ $t('info_regions') }}</h4>
                        </div>
                        <vue-apex-charts
                                v-if="this.barChart.isShow"
                                class="apex-charts"
                                type="bar"
                                dir="ltr"
                                height="400"
                                width="100%"
                                :series="barChart.series"
                                :options="barChart.chartOptions"
                        ></vue-apex-charts>
                    </div>
                </div>

            </div>
        </Layout>
        <ProjectMenu
                v-else
                @isLoginBtn="isLoginBtn"
        ></ProjectMenu>
    </div>
</template>
