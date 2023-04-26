<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <b-btn
                variant="warning"
                class="text-capitalize"
                @click="$router.go(-1)"
            >
              {{ $t('actions.back') }}
            </b-btn>
            <h4><b>{{ $t('submodules.inventory_report.title') }} №{{ currentDetails.registerNumber }}</b></h4>
            <h5 class="m-0 mb-1"><strong>{{ currentDetails.constructionContractorName }}</strong></h5>
            <div class="align-items-center justify-content-end mb-2 d-flex" v-if="currentDetails.isNotOwner">
              <b-btn v-if="currentDetails.statusCode == 'ACCEPTED' || currentDetails.statusCode == 'REJECTED'"
                     disabled class="mr-2">
                {{ $t('actions.reject') }}
              </b-btn>
              <b-btn v-else
                     variant="danger"
                     class="text-capitalize mr-2"
                     @click="rejectNotification()"
              >
                {{ $t('actions.reject') }}
              </b-btn>
              <b-btn v-if="currentDetails.statusCode == 'ACCEPTED' || currentDetails.statusCode == 'REJECTED'"
                     disabled class="mr-2">
                {{ $t('actions.accept') }}
              </b-btn>
              <b-btn v-else
                     variant="primary"
                     class="text-capitalize mr-2"
                     @click="acceptNotification()"
              >
                {{ $t('actions.accept') }}
              </b-btn>
            </div>
          </div>
          <!--          <template>-->
          <!--            <div class="align-items-center justify-content-end mb-2 d-flex">-->
          <!--              <b-btn v-if="currentDetails.statusCode == 'ACCEPTED' || currentDetails.statusCode == 'REJECTED'"-->
          <!--                     disabled class="mr-2">-->
          <!--                {{ $t('actions.reject') }}-->
          <!--              </b-btn>-->
          <!--              <b-btn v-else-->
          <!--                     variant="danger"-->
          <!--                     class="text-capitalize mr-2"-->
          <!--                     @click="rejectNotification()"-->
          <!--              >-->
          <!--                {{ $t('actions.reject') }}-->
          <!--              </b-btn>-->
          <!--              <b-btn v-if="currentDetails.statusCode == 'ACCEPTED' || currentDetails.statusCode == 'REJECTED'"-->
          <!--                     disabled class="mr-2">-->
          <!--                {{ $t('actions.accept') }}-->
          <!--              </b-btn>-->
          <!--              <b-btn v-else-->
          <!--                     variant="primary"-->
          <!--                     class="text-capitalize mr-2"-->
          <!--                     @click="acceptNotification()"-->
          <!--              >-->
          <!--                {{ $t('actions.accept') }}-->
          <!--              </b-btn>-->
          <!--            </div>-->
          <!--          </template>-->
          <template v-if="!currentDetails.id">
            <!-- <h4 class="m-0"><strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong></h4> -->
            <div class="ad-details-wrapper">
              <b-skeleton-table
                  style="width: 99.9%;"
                  :rows="12"
                  :columns="2"
                  :table-props="{ bordered: true }"
              ></b-skeleton-table>
              <b-row style="width: 99.9%;">
                <b-col
                    cols="4"
                    class="mt-2 mt-md-0"
                >
                  <b-skeleton width="70%"></b-skeleton>
                  <b-skeleton width="70%"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <template v-else>
            <div class="ad-details-wrapper">
              <b-card-header class="d-flex justify-content-between"><strong>{{
                  $t('column.detected_condition')
                }}</strong><h4><strong>{{ $t('column.about_ad_construction') }}</strong></h4>
                <strong>{{ $t('column.passport_number') }}: {{ currentDetails.constructionPassportNumber }}</strong>
              </b-card-header>
              <table class="ad-details">
                <tbody>
                <tr>
                  <th scope="row" style="width: 50%"><strong>1. </strong>{{ $t('column.ad_construction_address') }}</th>
                  <td>
                    {{
                      getName({
                        nameRu: currentDetails.quarterNameRu,
                        nameLt: currentDetails.quarterNameLt,
                        nameUz: currentDetails.quarterNameUz
                      }) ? getName({
                        nameRu: currentDetails.quarterNameRu,
                        nameLt: currentDetails.quarterNameLt,
                        nameUz: currentDetails.quarterNameUz
                      }) + ', ' : ''
                    }}
                    {{
                      getName({
                        nameRu: currentDetails.streetNameRu,
                        nameLt: currentDetails.streetNameLt,
                        nameUz: currentDetails.streetNameUz
                      }) ? getName({
                        nameRu: currentDetails.streetNameRu,
                        nameLt: currentDetails.streetNameLt,
                        nameUz: currentDetails.streetNameUz
                      }) + ', ' : ''
                    }}
                    {{ currentDetails.additional }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>2. </strong>{{ $t('column.ad_construction_place') }}</th>
                  <td>
                    {{
                      getName({
                        nameRu: currentDetails.locationOfOutdoorNameRu,
                        nameLt: currentDetails.locationOfOutdoorNameLt,
                        nameUz: currentDetails.locationOfOutdoorNameUz
                      })
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>3. </strong>{{ $t('column.ad_construction_existence_document') }}
                  </th>
                  <td>{{ currentDetails.existenceDocument }}</td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>4. </strong>{{ $t('column.ad_tool_type') }}</th>
                  <td>
                    {{
                      getName({
                        nameRu: currentDetails.designTypeNameRu,
                        nameLt: currentDetails.designTypeNameLt,
                        nameUz: currentDetails.designTypeNameUz
                      })
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>5. </strong>{{ $t('column.ad_tool_volume') }}</th>
                  <td>
                    {{
                      getName({
                        nameRu: currentDetails.volumeTypeNameRu,
                        nameLt: currentDetails.volumeTypeNameLt,
                        nameUz: currentDetails.volumeTypeNameUz
                      })
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>6. </strong>{{ $t('column.ad_tool_current_status') }}</th>
                  <td>
                    {{
                      getName({
                        nameRu: currentDetails.objectStateNameRu,
                        nameLt: currentDetails.objectStateNameLt,
                        nameUz: currentDetails.objectStateNameUz
                      })
                    }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>7. </strong>{{ $t('column.state_ad_construction_locate') }}
                  </th>
                  <td>{{ currentDetails.locateInState }}</td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>8. </strong>{{ $t('column.ad_construction_about_owner') }}
                  </th>
                  <td>
                    {{ currentDetails.contractorFullName ? currentDetails.contractorFullName + ', ' : '' }}
                    {{ currentDetails.contractorAddress ? currentDetails.contractorAddress + ', ' : '' }}
                    {{ currentDetails.contractorPhoneNumber ? currentDetails.contractorPhoneNumber : '' }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>9. </strong>{{ $t('column.ad_tool_about_contractor') }}
                  </th>
                  <td>{{ currentDetails.infoByContractorAboutAdCompany }}</td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>10. </strong>{{ $t('column.ad_tool_locate_type') }}</th>
                  <td>
                    {{ currentDetails.advertisementTypeName }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>11. </strong>{{ $t('column.other_info') }}</th>
                  <td>{{ currentDetails.otherInfo }}</td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>12. </strong>{{ $t('column.ad_construction_104') }}</th>
                  <td>{{ currentDetails.vm104RelatedChanges }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="ad-details-wrapper pt-5">
              <b-card-header>
                <b-card-title>{{ $t('column.append') }}</b-card-title>
              </b-card-header>
              <table class="ad-details">
                <tbody>
                <tr>
                  <th scope="row" style="width: 50%"><strong>1. </strong>{{
                      $t('submodules.inventory_report.checkbox1')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedAtIntersectionOfHighways" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%"><strong>2. </strong>{{
                      $t('submodules.inventory_report.checkbox2')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedOnSidewalks" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>3. </strong>{{
                      $t('submodules.inventory_report.checkbox3')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedNearRoadside" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%"><strong>4. </strong>{{
                      $t('submodules.inventory_report.checkbox4')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.restrictsVisionForOther" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>5. </strong>{{
                      $t('submodules.inventory_report.checkbox5')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.distanceToRoadLessThanFiveMeters" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%"><strong>6. </strong>{{
                      $t('submodules.inventory_report.checkbox6')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedOnCarriagewayOrSidewalk" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>7. </strong>{{
                      $t('submodules.inventory_report.checkbox7')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedAtPublicTransportStations" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%"><strong>8. </strong>{{
                      $t('submodules.inventory_report.checkbox8')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedCloseToTunnels" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%"><strong>9. </strong>{{
                      $t('submodules.inventory_report.checkbox9')
                    }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.locatedCloseToHighVoltageElectricity" variant="success">
                      Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>10. </strong>{{ $t('submodules.inventory_report.checkbox10') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.dataNotShownInFull" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>11. </strong>{{ $t('submodules.inventory_report.checkbox11') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.advertisingHeightMoreThanOneThirdOfBuilding"
                             variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>12. </strong>{{ $t('submodules.inventory_report.checkbox12') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.foundationsMoreThanFiftyCentimeters" variant="success">
                      Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>13. </strong>{{ $t('submodules.inventory_report.checkbox13') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.foundationsPaintedIncorrectly" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>14. </strong>{{ $t('submodules.inventory_report.checkbox14') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.numberOfAdsAtFourWayIntersectionMoreThanFour"
                             variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>15. </strong>{{ $t('submodules.inventory_report.checkbox15') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.numberOfAdsAtThreeWayIntersectionMoreThanFour"
                             variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>16. </strong>{{ $t('submodules.inventory_report.checkbox16') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.distanceBetweenSmallSizedAdsLessThanFiftyMeters"
                             variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>17. </strong>{{ $t('submodules.inventory_report.checkbox17') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.distanceBetweenMediumSizedAds" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>18. </strong>{{ $t('submodules.inventory_report.checkbox18') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.distanceBetweenLargeSizedAds" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                <tr>
                  <th scope="row" style="width: 50%">
                    <strong>19. </strong>{{ $t('submodules.inventory_report.checkbox19') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.distanceBetweenVeryLargeSizedAds" variant="success">Ha
                    </b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                  <th scope="row" style="width: 50%">
                    <strong>20. </strong>{{ $t('submodules.inventory_report.checkbox20') }}
                  </th>
                  <td>
                    <b-badge v-if="currentDetails.otherCases" variant="success">Ha</b-badge>
                    <b-badge v-else variant="danger">Yo'q</b-badge>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="row float-right">
              <div style="" class="col">
                <h4 class="pr-5"><strong>{{ $t('column.created_date') }}: </strong>{{ currentDetails.createdDate }}</h4>
                <h4><strong>{{ $t('column.created_by') }}: </strong>{{ currentDetails.ownerName }}</h4>
              </div>

              <div class="col">
                <VueQriously :value="qrCodeHeader + '/inventory-report/details/' + currentDetails.id" :size="100"/>
              </div>
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
import InventoryReportService from "../inventory_report.service";
import helperService from "@/shared/services/helper.service";

export default {
  name: "AdDetails",
  /*
  * COMPONENTS */
  components: {VueQriously},
  /*
  * DATA */
  data() {
    return {
      publicPath: process.env.BASE_URL,
      currentDetails: {},
      currentAdImgs: [],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      imgIndex: 0,
      qrCodeHeader: process.env.VUE_APP_ROOT_URL,
      visible: false,
      arr: [],
    }
  },
  /*
  * COMPUTED */
  methods: {
    getInventoryReportDetails(id) {
      InventoryReportService.get(id).then(res => {
        this.currentDetails = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    acceptNotification() {
      this.$bvModal.msgBoxConfirm(this.$t('messages.accept_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              helperService
                  .acceptReportById(this.$route.params.id)
                  .then((res) => {
                    this.$toast(this.$t('messages.accepted_message'), {type: 'success'});
                    this.currentDetails.statusCode = 'ACCEPTED'
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
    rejectNotification() {
      this.$bvModal.msgBoxConfirm(this.$t('messages.reject_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              helperService
                  .rejectReportById(this.$route.params.id)
                  .then((res) => {
                    this.$toast(this.$t('messages.rejected_message'), {type: 'warning'});
                    this.currentDetails.statusCode = 'REJECTED'
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
  },
  /*
  * METHODS */
  async created() {
    this.getInventoryReportDetails(this.$route.params.id)
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
  overflow: auto;

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