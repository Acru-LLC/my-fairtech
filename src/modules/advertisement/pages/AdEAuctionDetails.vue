<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <b-btn-group>
              <b-btn variant="warning" class="text-capitalize" @click="$router.go(-1)">
                {{ $t('actions.back') }}
              </b-btn>
              <b-btn
                  v-if="currentAdDetails.isPresent"
                  variant="info"
                  class="text-capitalize"
                  :to="{name: 'InventoryReportsByAdIdForMonitoring', params: {adId: this.$route.params.id}}"
              >
                {{ $t('submodules.inventory_report.title') }}
              </b-btn>
              <b-btn
                  v-if="currentAdDetails.reportIsPresent"
                  variant="primary"
                  class="text-capitalize"
                  :to="{name: 'NotificationsByAdIdForMonitoring', params: {adId: this.$route.params.id}}"
              >
                {{ $t('submodules.contractor_notification.title') }}
              </b-btn>
            </b-btn-group>
            <h4 class="m-0 mb-1">
              <strong v-if="currentAdDetails.isUzAvtoYul" style="color: green;">{{ $t('column.uzavtoyul') }}</strong>
            </h4>
            <h4 class="m-0 mb-1">
              <strong>{{ $t('column.doc_number') }}: {{ currentAdDetails.passportNumber }}</strong>
            </h4>
          </div>
          <template v-if="!currentAdDetails.id">
            <!-- <h4 class="m-0"><strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong></h4> -->
            <div class="ad-details-wrapper">
              <b-skeleton-table style="width:99.9%" :rows="8" :columns="4" :table-props="{ bordered: true }"/>
              <b-row style="width: 99.9%;">
                <b-col cols="3" md="2" class="pe-0">
                  <b-skeleton-img no-aspect height="10rem"></b-skeleton-img>
                </b-col>
                <b-col cols="3" md="2" class="pe-0">
                  <b-skeleton-img no-aspect height="10rem"></b-skeleton-img>
                </b-col>
                <b-col cols="3" md="2" class="pe-0">
                  <b-skeleton-img no-aspect height="10rem"></b-skeleton-img>
                </b-col>
                <b-col cols="3" md="2" class="pe-0">
                  <b-skeleton-img no-aspect height="10rem"></b-skeleton-img>
                </b-col>
                <b-col cols="4" class="mt-2 mt-md-0">
                  <b-skeleton width="85%"></b-skeleton>
                  <b-skeleton width="55%"></b-skeleton>
                  <b-skeleton width="70%"></b-skeleton>
                  <b-skeleton width="70%"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <template v-else>
            <div class="ad-details-wrapper">
              <table class="ad-details">
                <tbody>
                <tr>
                  <th scope="row">{{ $t('column.ad_construction_owner') }}</th>
                  <td>{{ currentAdDetails.contractorName }}</td>
                  <th scope="row">{{ $t('column.ad_construction_owner_inn') }}</th>
                  <td>{{ currentAdDetails.inn }}</td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.ad_construction_owner_phone_number') }}</th>
                  <td>{{ currentAdDetails.contractorPhoneNumber }}</td>
                  <th scope="row">{{ $t('column.ad_construction_owner_address') }}</th>
                  <td>{{ currentAdDetails.contractorAddressRegionNameUz }},
                    {{ currentAdDetails.contractorAddressDistrictNameUz }}
                    {{
                      currentAdDetails.contractorAdditionalAddress ? ' ,' + currentAdDetails.contractorAdditionalAddress : ''
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.created_date') }}</th>
                  <td>{{ currentAdDetails.constructDate ? currentAdDetails.constructDate : '' }}</td>
                  <th scope="row">{{ $t('column.comment') }}</th>
                  <td>{{ currentAdDetails.description ? currentAdDetails.description : '' }}</td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.monthly_income') }}</th>
                  <td>{{ currentAdDetails.monthlyPayment ? getNumberFormat(currentAdDetails.monthlyPayment) : '' }}</td>
                  <td colspan="2" rowspan="5">
                    <b-row>
                      <b-col cols="8">
                        <div>
                          <strong>{{ $t('column.created_by') }}:</strong>
                          {{
                            currentAdDetails.createdByEmployeeFullName ? (currentAdDetails.createdByEmployeeFullName + ' ' + (currentAdDetails.createdByDirectoryPositionNameUz ? ('(' + currentAdDetails.createdByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.createdByUserName + ')') : '')) : $t('auth.username') + ' - ' + currentAdDetails.createdByUserName
                          }}
                          <br><i>{{ currentAdDetails.createdDate }}</i>
                        </div>
                        <div>
                          <strong>{{ $t('column.last_modified_by') }}:</strong>
                          {{
                            currentAdDetails.updatedByEmployeeFullName ? (currentAdDetails.updatedByEmployeeFullName + ' ' + (currentAdDetails.updatedByDirectoryPositionNameUz ? ('(' + currentAdDetails.updatedByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName + ')') : '')) : $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName
                          }}
                          <br><i>{{ currentAdDetails.updatedDate }}</i>
                        </div>
                      </b-col>
                      <b-col cols="4" class="text-center">
                        <VueQriously :value="qrCodeHeader + '/advertisement/details/e-auction/' + currentAdDetails.id" :size="100"/>
                      </b-col>
                    </b-row>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.ad_construction_volume') }}</th>
                  <td>{{ currentAdDetails.volume }} ({{ currentAdDetails.width }} x
                    {{ currentAdDetails.length }})
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.ad_construction_passport_given_date') }}</th>
                  <td>{{ currentAdDetails.passportGivenDate ? currentAdDetails.passportGivenDate : '' }}</td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.ad_construction_passport_expire_date') }}</th>
                  <td>{{ currentAdDetails.passportExpireDate ? currentAdDetails.passportExpireDate : '' }}</td>
                </tr>
                <tr>
                  <th scope="row">{{ $t('column.address') }}</th>
                  <td>{{
                      getName({
                        nameRu: currentAdDetails.addressDto.regionNameRu,
                        nameLt: currentAdDetails.addressDto.regionNameLt,
                        nameUz: currentAdDetails.addressDto.regionNameUz,
                      })
                    }},
                    {{
                      getName({
                        nameRu: currentAdDetails.addressDto.districtNameRu,
                        nameLt: currentAdDetails.addressDto.districtNameLt,
                        nameUz: currentAdDetails.addressDto.districtNameUz,
                      })
                    }},
                    {{
                      getName({
                        nameRu: currentAdDetails.addressDto.quarterNameRu,
                        nameLt: currentAdDetails.addressDto.quarterNameLt,
                        nameUz: currentAdDetails.addressDto.quarterNameUz,
                      })
                    }},
                    {{
                      getName({
                        nameRu: currentAdDetails.addressDto.streetNameRu,
                        nameLt: currentAdDetails.addressDto.streetNameLt,
                        nameUz: currentAdDetails.addressDto.streetNameUz,
                      }) ?
                          getName({
                            nameRu: currentAdDetails.addressDto.streetNameRu,
                            nameLt: currentAdDetails.addressDto.streetNameLt,
                            nameUz: currentAdDetails.addressDto.streetNameUz,
                          }) + ',' : ''
                    }}
                    {{
                      currentAdDetails.addressDto.additional ? currentAdDetails.addressDto.additional : ''
                    }}
                  </td>
                </tr>
                </tbody>
              </table>
              <ViewInfo :data="info" style="margin: -1rem -3rem auto -3rem;"></ViewInfo>
            </div>
          </template>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
<script>
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import VueQriously from "vue-qriously";
import adMonitoringService from "@/shared/services/advertisement/adMonitoring.service"
import ViewInfo from '@/modules/integration/modules/e-auction-info/ViewInfo.vue'
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
  /*
  * COMPONENTS */
  components: { ViewInfo, VueQriously },
  /*
  * DATA */
  data() {
    return {
      info: {},
      publicPath: process.env.BASE_URL,
      currentAdDetails: {
        addressDto: {}
      },
      currentAdImgs: [],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      qrCodeHeader: process.env.VUE_APP_ROOT_URL,
      imgIndex: 0,
      visible: false,
      arr: [],
    }
  },
  /*
  * COMPUTED */
  methods: {
    getAdDetails(adId) {
      crudAndListsService.getById('contractor-advertising-construction', adId)
          .then(res => {
            this.currentAdImgs = []
            crudAndListsService.getById('contractor-advertising-construction', adId, false, null, 'second-agent-files')
                .then(resForFiles => {
                  this.currentAdImgs = resForFiles.data.objectPhotoList
                  if (resForFiles.data.passportPhotoUrl && resForFiles.data.passportPhotoUrl.url) {
                    this.currentAdImgs.push(resForFiles.data.passportPhotoUrl)
                  }
                  this.currentAdDetails = res.data.contractorAdvertisingConstructionForSecondAgentDto
                })
                .catch(e => {
                  console.log(e)
                  this.currentAdDetails = res.data.contractorAdvertisingConstructionForSecondAgentDto
                })

          })
          .catch(e => {
            console.log(e)
          })
      adMonitoringService.getEAuctionAdditionalInfoById(adId)
          .then(({ data }) => {
            this.info = data
          })
          .catch(e => {
            console.log(e)
          })
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
  },
  /*
  * METHODS */
  async created() {
    this.getAdDetails(this.$route.params.id)
  },
  /*
  * CREATED */
  computed: {
    imgArr() {
      this.currentAdImgs.forEach(e => {
        const arrs = this.arr;
        if (this.currentAdImgs)
          arrs.push(this.publicPath + e.url)
      })
      return this.arr
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.ad-details-wrapper {
  .carousel-caption {
    z-index: 1004 !important;
  }
}

table.ad-details {
  // font-family: "PT Sans", sans-serif;
  border-collapse: collapse;
  width: 99.9%;
  margin-bottom: 0.5rem;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  /* tr:nth-child(even) {
            background-color: #dddddd;
        } */
}

#carousel-1 {
  z-index: 0;
}

.ad-details-img {
  max-width: 100%;
  height: auto;
}

.ad-details-img-slide {
  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 12rem;
    min-height: 10rem;
  }
}
</style>