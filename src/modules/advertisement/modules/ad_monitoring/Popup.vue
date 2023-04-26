<template>
  <div class="popup-container">
    <template v-if="!element.details">
      <div class="ad-details-wrapper">
        <b-row>
          <b-col cols="12" lg="4">
            <b-row>
              <b-col class="p-0 pb-1" cols="12" md="5" lg="12">
                <b-skeleton-img no-aspect height="165px"></b-skeleton-img>
              </b-col>
              <b-col class="pe-0" cols="12" md="7" lg="12">
                <b-skeleton width="85%"></b-skeleton>
                <b-skeleton width="55%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" class="p-0 d-none d-md-block">
            <b-skeleton-table :rows="8" :columns="4" :table-props="{ bordered: true }"></b-skeleton-table>
          </b-col>
        </b-row>
      </div>
    </template>
    <template v-else>
      <div class="ad-details-wrapper">
        <b-row>
          <b-col cols="12" lg="4">
            <b-row class="pr-md-0 pr-lg-2">
              <b-col class="p-0" cols="12" md="5" lg="12">
                <template v-if="currentAdImgs && currentAdImgs.length">
                  <b-carousel
                      id="carousel-1"
                      controls
                      indicators
                      no-animation
                      :interval="0"
                      background="#ababab"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide
                        class="ad-details-img-slide"
                        v-for="(imgFile, imgIndex) in currentAdImgs"
                        :key="`currentAdImg-${imgIndex}`"
                        :img-src="publicPath + imgFile.url"
                    ></b-carousel-slide>
                  </b-carousel>
                </template>
                <template v-else>
                  <div class="pe-0 mb-1">
                    <img class="ad-details-img" alt="images" :src="require('@/assets/images/photo-placeholder.png')">
                  </div>
                </template>
              </b-col>
              <b-col class="pe-0" cols="12" md="7" lg="12">
                <p class="p-0 m-0"><strong>{{ $t('column.created_by') }}:</strong>
                  {{
                    currentAdDetails.createdByEmployeeFullName ? (currentAdDetails.createdByEmployeeFullName + ' ' + (currentAdDetails.createdByDirectoryPositionNameUz ? ('(' + currentAdDetails.createdByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.createdByUserName + ')') : '')) : $t('auth.username') + ' - ' + currentAdDetails.createdByUserName
                  }}
                  <br><i>{{ currentAdDetails.createdDate }}</i>
                </p>
                <p class="p-0 m-0"><strong>{{ $t('column.last_modified_by') }}:</strong> {{
                    currentAdDetails.updatedByEmployeeFullName
                        ? (currentAdDetails.updatedByEmployeeFullName + ' ' + (currentAdDetails.updatedByDirectoryPositionNameUz
                            ? ('(' + currentAdDetails.updatedByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName + ')') : ''))
                        : $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName
                  }} <i>{{ currentAdDetails.updatedDate }}</i>
                  <br>
                  <router-link :to="{name: 'AdvertisementDetails', params: {id: currentAdDetails.id}}" class="btn btn-light">
                    {{ $t('actions.details') }}...
                  </router-link>
                </p>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="8" class="p-0 d-none d-md-block">
            <table class="ad-details">
              <tbody>
              <tr>
                <th rowspan="7" width="10%">{{ $t('column.construction.ad_construction') }}</th>
              </tr>
              <tr>
                <th scope="row" width="10%">{{ $t('column.construction.owner') }}</th>
                <td colspan="2">{{ currentAdDetails.contractorName }}</td>
              </tr>
              <tr>
                <th scope="row" width="10%">{{ $t('column.construction.owner_inn') }}</th>
                <td colspan="2">{{ currentAdDetails.inn }}</td>
              </tr>
              <tr>
                <th scope="row" width="10%">{{ $t('column.construction.owner_address') }}</th>
                <td colspan="2">{{ currentAdDetails.contractorAddressRegionNameUz }},
                  {{ currentAdDetails.contractorAddressDistrictNameUz }}
                  {{
                    currentAdDetails.contractorAdditionalAddress ? ' ,' + currentAdDetails.contractorAdditionalAddress : ''
                  }}
                </td>
              </tr>
              <tr>
                <th
                    scope="row"
                    width="10%"
                >{{ $t('column.construction.type') }}
                </th>
                <td colspan="2">{{
                    getName({
                      nameRu: currentAdDetails.directoryAdvertisementTypeNameRu,
                      nameLt: currentAdDetails.directoryAdvertisementTypeNameLt,
                      nameUz: currentAdDetails.directoryAdvertisementTypeNameUz,
                    })
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row" width="10%">{{ $t('column.construction.side') }}</th>
                <td colspan="2">{{
                    getName({
                      nameRu: currentAdDetails.directoryTypeOfOutdoorAdvertisingToolNameRu,
                      nameLt: currentAdDetails.directoryTypeOfOutdoorAdvertisingToolNameLt,
                      nameUz: currentAdDetails.directoryTypeOfOutdoorAdvertisingToolNameUz,
                    })
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row" width="10%">{{ $t('column.construction.volume') }}</th>
                <td colspan="2">{{ currentAdDetails.volume }} ({{ currentAdDetails.width }} x
                  {{ currentAdDetails.length }})
                </td>
              </tr>
              <tr>
                <th colspan="4"></th>
              </tr>
              <tr>
                <th scope="row">{{ $t('column.ad_construction_passport_expire_date') }}</th>
                <td>{{
                    currentAdDetails.passportExpireDate ? currentAdDetails.passportExpireDate : ''
                  }}
                </td>
                <th scope="row">{{ $t('column.ad_construction_zone') }}</th>
                <td>{{
                    getName({
                      nameRu: currentAdDetails.directoryAdvertisementZoneNameRu,
                      nameLt: currentAdDetails.directoryAdvertisementZoneNameLt,
                      nameUz: currentAdDetails.directoryAdvertisementZoneNameUz,
                    })
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ $t('column.status') }}</th>
                <td>{{
                    getName({
                      nameRu: currentAdDetails.directoryAdvertisementObjectStateNameRu,
                      nameLt: currentAdDetails.directoryAdvertisementObjectStateNameLt,
                      nameUz: currentAdDetails.directoryAdvertisementObjectStateNameUz,
                    })
                  }}
                </td>
                <th scope="row">{{ $t('column.monthly_income') }}</th>
                <td>{{
                    currentAdDetails.monthlyPayment ? getNumberFormat(currentAdDetails.monthlyPayment) : ''
                  }}
                </td>
              </tr>
              <tr>
                <th
                    scope="row"
                    colspan="2"
                >{{ $t('column.ad_design_type') }}
                </th>
                <td colspan="2">{{
                    getName({
                      nameRu: currentAdDetails.directoryAdvertisementDesignTypeNameRu,
                      nameLt: currentAdDetails.directoryAdvertisementDesignTypeNameLt,
                      nameUz: currentAdDetails.directoryAdvertisementDesignTypeNameUz,
                    })
                  }}
                </td>
              </tr>
              <tr>
                <th
                    scope="row"
                    colspan="2"
                >{{ $t('submodules.ad_volume_types.title') }}
                </th>
                <td colspan="2">{{
                    getName({
                      nameRu: currentAdDetails.directoryAdvertisementVolumeTypeNameRu,
                      nameLt: currentAdDetails.directoryAdvertisementVolumeTypeNameLt,
                      nameUz: currentAdDetails.directoryAdvertisementVolumeTypeNameUz,
                    })
                  }}
                </td>
              </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: {
    element: {
      type: Object,
      default: () => {
        return {}
      }
    },
    publicPath: {
      type: String,
      default: () => {
        return '/'
      }
    },
    currentAdDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentAdImgs: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  methods: {
    onSlideStart(slide) {
      this.$emit('onSlideStart')
    },
    onSlideEnd(slide) {
      this.$emit('onSlideEnd')
    },
  }
}
</script>

<style scoped lang="scss">
.popup-container {
  padding: 15px;
}

table.ad-details {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 0.5rem;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 5px;
  }
}

.ad-details-img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 12rem;
  min-height: 10rem;
}

.carousel {
  @media (min-width: 568px) {
    max-width: 60%;
    width: 60%;
  }
  @media (min-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
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