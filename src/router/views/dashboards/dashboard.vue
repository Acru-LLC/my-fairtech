<script>
import Layout from "@/router/layouts/main.vue";
import i18n from "@/i18n";
import PageHeader from "@/components/page-header.vue";
import {TokenService} from "@/shared/services/storage.service";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import helperService from "@/shared/services/helper.service";
// import ProjectMenu from "@/shared/views/auth/MainProMenu.vue";

const MAIN_API_URL_USER = 'user'
const MAIN_API_URL = 'report/dashboard'

/**
 * Dashboard Component
 */
export default {
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      userId: TokenService.getUserId(),
      userInfos: {},
      counts: [],
      searchValue: "",
      page: 1,
      limit: 100,
      selectedAppStatus: "SEND_TO_REGION",
      countsByRegion: [],
      arr: [],
      isOpen: false,
      title: i18n.t('submodules.ad_passport_info.title'),
      // items: [
      //   {
      //     text: "Dashboard",
      //     href: "/",
      //   },
      //   {
      //     text: i18n.t('submodules.ad_passport_info.title'),
      //     active: true,
      //   },
      // ],
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
          colors: ["#0b3348", "#f1b44c", "#34c38f", "#f46a6a"],
          legend: {
            position: "bottom",
          },
          fill: {
            opacity: 1,
          },
        }
      },
      //END DIAGRAM ELEMENTS
    };
  },
  /*
COMPUTED */
  computed: {
    getCurrentDate() {
      const now = new Date();
      // console.log(new Date())
      // console.log(now)
      // const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // return now.toLocaleDateString(undefined, options);
      var day = now.getDate()
      var month = now.getMonth()
      var year = now.getFullYear()
      return day + ' ' + this.monthName(month) + ' ' + year
    },
    // current_project() {
    //     return JSON.parse(localStorage.getItem('current_project')) ? JSON.parse(localStorage.getItem('current_project')) : null
    // },
    result() {
      return (TokenService.getCurrentProject('fair_tech')
          || TokenService.getCurrentProject('fair_price')
          || TokenService.getCurrentProject('pharm_info')
          || TokenService.getCurrentProject('product_info')
          || TokenService.getCurrentProject('')
          || TokenService.getCurrentProject('integration')
          || TokenService.getCurrentProject('alcohol')) ? true: false
    },
    params() {
      return {
        params: {
          // itemsPerPage: this.limit,
          // page: this.page - 1,
          groupBy: [],
          groupDesc: [],
          itemsPerPage: 1,
          keyword: "",
          multiSort: true,
          mustSort: false,
          page: 0,
          sortBy: [],
          sortDesc: [],
        },
        search: this.searchValue,
        status: this.selectedAppStatus,
      };
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
      crudAndListsService.getUserInformation()
          .then((res) => {
            this.userInfos = res.data;
          })
          .catch(e => {
            console.log(e)
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
    },
    startCarousel() {
      setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    },
    nextSlide() {
      let nextIndex = (this.getActiveIndex() + 1) % this.slideCount();
      this.setActiveIndex(nextIndex);
    },
    getActiveIndex() {
      // console.log(arr);
      return Array.from(document.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
    },
    slideCount() {
      return document.querySelectorAll('.carousel-item').length;
    },
    setActiveIndex(index) {
      document.querySelectorAll('.carousel-item').forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      document.querySelectorAll('.carousel-indicators li').forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      })},
    monthName(num) {
      return num == 0 ? this.$t('month.january') :
          num == 1 ? this.$t('month.february') :
              num == 2 ? this.$t('month.march') :
                  num == 3 ? this.$t('month.april') :
                      num == 4 ? this.$t('month.may') :
                          num == 5 ? this.$t('month.june') :
                              num == 6 ? this.$t('month.july') :
                                  num == 7 ? this.$t('month.august') :
                                      num == 8 ? this.$t('month.september') :
                                          num == 9 ? this.$t('month.october') :
                                              num == 10 ? this.$t('month.november') :
                                                  num == 11 ? this.$t('month.december') : 'no date'
    }
  },
  mounted() {
    this.startCarousel();
  },

  created() {
    this.getUserInfo()
    this.getCountsFromServer()
    this.getCountsByRegionFromServer()
  },
}
</script>

<template>
  <div>
    <Layout>
      <PageHeader :title="title" class="mt-3"/>
      <div class="mx-3">
        <div class="row">
          <div class="col-xl-5">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
<!--              <ol class="carousel-indicators">-->
<!--                <li data-target="#myCarousel" :data-slide-to="index" :class="{ active: index === 0 }" v-for="(slide, index) in slideCount()" :key="index"></li>-->
<!--              </ol>-->
              <div class="carousel-inner">
                <div class="carousel-item active">
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
                    <div class="card-body pt-0 col-part-1">
                      <div class="row">
                        <div class="col-sm-12 py-5">
<!--                          <a href="#"><button type="button" class="btn btn-success mt-3 mb-3" style="background-color: #1DA78E; z-index: 2">{{ $t('dashboard.slide_bar.info_btn') }}</button></a>-->
                          <h4 class="body-card-text text-white text-uppercase mt-3">{{ $t('dashboard.slide_bar.ask_title') }}</h4>
                          <p class="card-text">{{ $t('dashboard.slide_bar.ask_info') }}</p>
<!--                          <a href="#"><button type="button" class="btn btn-success" style="background-color: #1DA78E">{{ $t('dashboard.slide_bar.detail_btn') }}</button></a>-->
                        </div>
<!--                        JSHSHIR-->
                      </div>
                    </div>
                    <!-- end card-body -->
                  </div>
                </div>
<!--                <div class="carousel-item">-->
<!--                  <div class="card overflow-hidden">-->
<!--                    &lt;!&ndash;          <div class="bg-soft bg-primary">&ndash;&gt;-->
<!--                    &lt;!&ndash;            <div class="row">&ndash;&gt;-->
<!--                    &lt;!&ndash;              <div class="col-7">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <div class="text-primary p-3">&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <h5 class="text-primary">Welcome Back !</h5>&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <p>ANTIMONOPOLY COMMITTEE OF THE REPUBLIC OF UZBEKISTAN</p>&ndash;&gt;-->
<!--                    &lt;!&ndash;                </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;              <div class="col-5 align-self-end">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <img src="@/assets/images/profile-5.png" alt class="img-fluid"/>&ndash;&gt;-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;            </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;          </div>&ndash;&gt;-->
<!--                    <div class="card-body pt-0 col-part-1">-->
<!--                      <div class="row">-->
<!--                        <div class="col-sm-12 ">-->
<!--                          <a href="#"><button type="button" class="btn btn-success mt-3 mb-3" style="background-color: #1DA78E; z-index: 2">{{ $t('dashboard.slide_bar.info_btn') }}</button></a>-->
<!--                          <h4 class="card-text text-uppercase">{{ $t('dashboard.slide_bar.ask_title') }}</h4>-->
<!--                          <p class="card-text">{{ $t('dashboard.slide_bar.ask_info') }}</p>-->
<!--                          <a href="#"><button type="button" class="btn btn-success" style="background-color: #1DA78E">{{ $t('dashboard.slide_bar.detail_btn') }}</button></a>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; end card-body &ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="carousel-item">-->
<!--                  <div class="card overflow-hidden">-->
<!--                    &lt;!&ndash;          <div class="bg-soft bg-primary">&ndash;&gt;-->
<!--                    &lt;!&ndash;            <div class="row">&ndash;&gt;-->
<!--                    &lt;!&ndash;              <div class="col-7">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <div class="text-primary p-3">&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <h5 class="text-primary">Welcome Back !</h5>&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <p>ANTIMONOPOLY COMMITTEE OF THE REPUBLIC OF UZBEKISTAN</p>&ndash;&gt;-->
<!--                    &lt;!&ndash;                </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;              <div class="col-5 align-self-end">&ndash;&gt;-->
<!--                    &lt;!&ndash;                <img src="@/assets/images/profile-5.png" alt class="img-fluid"/>&ndash;&gt;-->
<!--                    &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;            </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;          </div>&ndash;&gt;-->
<!--                    <div class="card-body pt-0 col-part-1">-->
<!--                      <div class="row">-->
<!--                        <div class="col-sm-12 ">-->
<!--                          <a href="#"><button type="button" class="btn btn-success mt-3 mb-3" style="background-color: #1DA78E; z-index: 2">{{ $t('dashboard.slide_bar.info_btn') }}</button></a>-->
<!--                          <h4 class="card-text text-uppercase">{{ $t('dashboard.slide_bar.ask_title') }}</h4>-->
<!--                          <p class="card-text">{{ $t('dashboard.slide_bar.ask_info') }}</p>-->
<!--                          <a href="#"><button type="button" class="btn btn-success" style="background-color: #1DA78E">{{ $t('dashboard.slide_bar.detail_btn') }}</button></a>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; end card-body &ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>
          </div>
          <!-- end col -->
          <div class="col-xl-7 bg-white d-flex justify-content-around flex-column">
            <div class="row">
              <div class="col-md-5">
                <h5 class="font-size-16" style="color: #ABABAD">{{ $t('dashboard.results.done_task') }}</h5>
              </div>
              <div class="col-md-3"></div>
              <div class="col-md-4">
                <h5 class="font-size-16" style="color: #ABABAD">{{ $t('dashboard.results.date') }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <h4 class="font-size-22" style="color: #2C665A">{{ $t('dashboard.results.saw_task') }}</h4>
              </div>
              <div class="col-md-3"></div>
              <div class="col-md-4">
                <h5 class="font-size-22" style="color: #2C665A">{{ getCurrentDate }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <h3 class="result-text">{{ $t('dashboard.results.total') }}</h3>
              </div>
              <div class="col-md-3">
                <h3 class="result-text">1 {{ $t('dashboard.results.ta') }}</h3>
              </div>
              <div class="col-md-2"></div>
              <div class="col-md-3">
                <h3 class="result-text">0 {{ $t('dashboard.results.ta') }}</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 d-flex ">
                <span class="btn btn-info"><i class="fa fa-check"></i></span>
                <div class="ml-2 d-flex justify-content-around flex-column">
                  <span class="font-size-16" style="color: #85DFC2">{{ $t('dashboard.results.status.2') }}</span>
                  <span class="font-size-20" style="color: #1DA78E">0 {{ $t('dashboard.results.ta') }}</span>
                </div>
              </div>
              <div class="col-md-3 d-flex ">
                <span class="btn btn-danger"><i class="fa fa-arrow-down"></i></span>
                <div class="ml-2 d-flex justify-content-around flex-column">
                  <span class="font-size-16" style="color: #EBA77C">{{ $t('dashboard.results.status.1') }}</span>
                  <span class="font-size-20" style="color: #E06A1F">0 {{ $t('dashboard.results.ta') }}</span>
                </div>
              </div>
              <div class="col-md-2"></div>
              <div class="col-md-3 d-flex ">
                <span class="btn btn-warning"><i class="fa fa-hourglass-end"></i></span>
                <div class="ml-2 d-flex justify-content-around flex-column">
                  <span class="font-size-16" style="color: #E7DD57">{{ $t('dashboard.results.status.3') }}</span>
                  <span class="font-size-20" style="color: #CCBF07">1 {{ $t('dashboard.results.ta') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2" style="border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">
          <b-row class="text-white p-1 col-3" style="background-color: #236257; border-radius: 2px">
            {{ $t('product_dashboard_info.customer_ifo_title') }}
          </b-row>
          <b-row class="mt-3">
            <b-col cols="2" style="text-align: center">
              <img class="user-img"
                   :src="`${userInfos.passportPhoto ? `data:image/png;base64, ${userInfos.passportPhoto}`: require('../images/user.png')}`"
                   alt=""
              >
            </b-col>
            <b-col cols="2">
              <div>
                <p>{{ $t('product_dashboard_info.customer_infos.surname') }}</p>
                <h6>{{userInfos.lastName}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.name') }}</p>
                <h6>{{userInfos.firstName}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.middle_name') }}</p>
                <h6>{{userInfos.middleName}}</h6>
              </div>
            </b-col>
            <b-col cols="2">
              <div>
                <p>{{ $t('product_dashboard_info.customer_infos.birth_date') }}</p>
                <h6>{{userInfos.birthday}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.sex') }}</p>
                <h6>{{ (userInfos.gd == 1) ? "ERKAK": (userInfos.gd == 2)? "AYOL" : ''}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.pnfl') }}</p>
                <h6>{{userInfos.pinfl}}</h6>
              </div>
            </b-col>
            <b-col cols="2">
              <div>
<!--                <p>{{ $t('product_dashboard_info.customer_infos.birth_region') }}</p>-->
                <p>{{ $t('product_dashboard_info.customer_infos.birthArea') }}</p>
                <h6>{{userInfos.birthPlace}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.who_given') }}</p>
                <h6>{{userInfos.passportGivenWho}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.livePlace') }}</p>
                <h6>{{userInfos.perAdress}}</h6>
<!--                <p>{{ $t('product_dashboard_info.customer_infos.birth_district') }}</p>-->
<!--                <h6>{{userInfos.birthPlace}}</h6>-->

              </div>
            </b-col>
            <b-col cols="2">
              <div>
                <p>{{ $t('product_dashboard_info.customer_infos.passport_data') }}</p>
                <h6>{{userInfos.passportSeries}} {{userInfos.passportNumber}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.passport_given_date') }}</p>
                <h6>{{userInfos.passportGivenDate}}</h6>
                <p>{{ $t('product_dashboard_info.customer_infos.validity_period') }}</p>
                <h6>{{userInfos.passportEndDate}}</h6>
              </div>
            </b-col>
            <b-col cols="2">
              <div>
                <p>{{ $t('product_dashboard_info.phone_number') }}</p>
                <h6>{{userInfos.phoneNumber}}</h6>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="p-2 mt-3" style="display:none; border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">
          <b-row class="text-white p-1 col-3" style="background-color: #236257; border-radius: 2px">
            {{ $t('product_dashboard_info.for_customer_title') }}
          </b-row>
          <b-row class="d-flex align-items-center justify-content-center mt-3">
            <div class="plyr__video-embed" id="player">
              <iframe
                  src="https://www.youtube.com/embed/njRWSIMaYAU?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                  allowfullscreen
                  allowtransparency
                  width="1200"
                  height="600"
              ></iframe>
            </div>
          </b-row>
        </div>
      </div>
    </Layout>
  </div>
</template>

<style scoped lang="css">
.col-part-1{
  background-image: url("../../../assets/images/col-3-gray.svg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 230px;
}

body-card-text{
  color: #FFFFFF;
  font-size: 20px;
  z-index: 2;
}
.card-text{
  color: #FFFFFF;
  font-size: 15px;
  z-index: 2;
}
.col-xl-7{
  height: 230px;
  border-radius: 20px;
  border: 2px solid #1DA78E;
}
.btn-danger{
  background-color: #FDE3CC;
  border: none;
  height: 40px;
}
.btn-danger i{
  color: #E06A1F;
  font-size: 20px;
}
.btn-info{
  background-color: #B9EFE4;
  border: none;
  height: 40px;
}
.btn-info i{
  color: #219E87;
  font-size: 20px;
}
.btn-warning{
  background-color: #F8F3B6;
  border: none;
  height: 40px;
}
.btn-warning i{
  color: #CDC00A;
  font-size: 20px;
}
.result-text{
  font-size: 40px;
  color: #1DA78E;
  line-height: 14px;
}

.col3-text .row:nth-child(2) span:nth-child(1){
  font-size: 22px;
  color: #5DCC7F;
  line-height: 14px;
}
.col3-text .row:nth-child(2){
  font-size: 45px;
  line-height: 14px;
  color: #5DCC7F;
}

@keyframes call{
  0% {
    box-shadow: 0 0 0 0 rgba(0, 173, 0 , 0.7), 0 0 0 0 rgba(0, 173,0 ,0.7);
  }
  40% {
    box-shadow: 0 0 0 17px rgba(0, 173, 0, 0), 0 0 0 0 rgba(0, 173, 0, 0.7);
  }
  80% {
    box-shadow: 0 0 0 17px rgba(0, 173, 0, 0), 0 0 0 10px rgba(0, 173, 0, 0);
  }
  100%{
    box-shadow: 0 0 0 0 rgba(0, 173, 0, 0), 0 0 0 10px rgba(0, 173, 0, 0);
  }
}
.col3-text .row:nth-child(1) span {
  color: #2C665A;
  font-size: 22px;
  line-height: 20px;
}

.col-element-3 span:nth-child(1){
  border-radius: 50px;
  background: #67A69A;
  font-size: 22px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.col-element-3 .row{
  align-items: center;
}
.col-element-3 .row span:nth-child(3){
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #5DCC7F;
  margin-right: 10px;
}
.col-element-3 span:nth-child(2){
  font-size: 22px;
  color: #2C665A;
  margin: 0 auto;
}
.col-element-3 .row{
  border-radius: 10px;
  background: #B9EFE4;
  width: 100%;
  margin: 0 auto;
}

.user-img{
  width: 160px;
  height: 180px;
}
.txt-btn a{
//width: 71px;
//height: 24px;
  background-color: #1DA78E;
}

.carousel-indicators li{
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.carousel-indicators{
  margin-bottom: 6%;
  margin-right: -60%;
}

.table-tr div{
//border-right: 3px solid #81DDCA;
  font-size: 16px;
  line-height: 14px;
}
.table-tr div span{
  border: 2px solid #81DDCA;
  margin-left: 60%;
}
.td-text span:nth-child(1){
  color: #000000;
}
td{
  color: #219E87;
}

.role span{
  background-color: #B9EFE4;
  border-radius: 50px;
  margin-right: 5px;
  font-size: 10px;
}
.active-td span{
  background-color: #B9EFE4;
  border-radius: 50px;
  font-size: 10px;
}
.movements i{
  font-size: 25px;
  margin-right: 10px;
  color: #049982;
  cursor: pointer;
}
p{
  color: #0f977b;
  margin-bottom: 8px;
}
h6{
  color: #2C665A;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
