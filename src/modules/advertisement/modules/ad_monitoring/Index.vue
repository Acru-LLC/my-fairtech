<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_monitoring.title') }}</div>
      </div>
      <div class="card">
        <div class="card-body p-0">
          <!-- FILTER FORM ROW -->
          <div class="row p-4">
            <!-- PASSPORT NUMBER OF AD_CONSTRUCTION -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
              <BaseInputWithValidation
                  not-required
                  label-on-top
                  v-model="filterPayload.passportNumber"
                  :label="$t('column.ad_construction_passport_number')"
              />
            </div>

            <!-- CONTRAGENTS -->
            <div v-if="!currentUserIsOuter" class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
              <BaseMultiselectWithValidation

                  not-required
                  v-model="filterPayload.contractorIds"
                  multiple
                  :has-next-page="hasNextPageContractors"
                  @reachedEndOfList="contractorReachedEndOfList"
                  @search-change="debounceSearchContractors"
                  :searchable="true"
                  preserve-search
                  :clear-on-select="false"
                  :close-on-select="false"
                  :loading="isLoadingContractors"
                  :internal-search="false"
                  :options="contractors.map(e => e.id)"
                  :hide-selected="true"
                  :label="$t('submodules.contractor.title')"
                  label-on-top
                  style="width: 100%;"
                  placeholder=""
                  :custom-label="customLabelContractor"
                  open-direction="bottom"
                  :max-height="600"
                  :show-labels="false"
              />
            </div>

            <!-- REGIONS -->
            <div v-if="!currentUserIsOuter" class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.regionIds"
                  :options="regions.map(e => e.regionId)"
                  :hide-selected="true"
                  :close-on-select="false"
                  :label="$t('column.region')"
                  label-on-top
                  placeholder=""
                  :custom-label="customLabelRegion"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
              />
            </div>

            <!-- DISTRICTS -->
            <div v-if="!currentUserIsOuter" class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.districtIds"
                  :options="districts.map(e => e.id)"
                  :hide-selected="true"
                  :close-on-select="false"
                  :label="$t('column.district')"
                  label-on-top
                  placeholder=""
                  :custom-label="customLabelDistrict"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
              />
            </div>

            <!-- AD_DESIGN_TYPES -->
            <div v-if="!currentUserIsOuter" class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-3 d-flex align-items-end">
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.designTypeIds"
                  :options="adDesignTypes.map(e => e.id)"
                  :hide-selected="true"
                  :close-on-select="false"
                  :label="$t('column.ad_design_type')"
                  label-on-top
                  placeholder=""
                  :custom-label="customLabelAdDesignType"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
              />
            </div>

            <!-- ACTION_BUTTONS -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1 d-flex align-items-end">
              <b-button
                  variant="primary"
                  size="sm"
                  class="me-2"
                  @click="search"
              >
                <i class="mdi mdi-magnify font-size-20 align-middle"></i>
                <!-- {{ $t('actions.search') }} -->
              </b-button>
              <b-button
                  variant="warning"
                  size="sm"
                  @click="resetFilter"
              >
                <i class="mdi mdi-refresh font-size-20 align-middle"></i>
                <!-- {{ $t('actions.reset') }} -->
              </b-button>
            </div>

          </div>
          <!-- MAP ROW -->
          <div class="row">
            <div class="col-12">
              <v-map
                  :zoom="zoom"
                  :center="center"
                  ref="leafletMap"
                  class="leaflet-map-container"
              >
                <v-tilelayer
                    :url="url"
                    :attribution="attribution"
                ></v-tilelayer>
                <v-locatecontrol/>
                <v-marker-cluster
                    v-if="geoJsonLoaded"
                    :options="clusterOptions"
                >
                  <v-marker
                      v-for="(l, index) in adMarkers"
                      :key="l.id"
                      :lat-lng="l.latlng"
                      :icon="l.icon"
                      @click="getAdDetails(l, index)"
                      :ref="`marker-${index}`"
                  >
                    <v-popup :ref="`ad-details-popup-${l.id}`">
                      <template v-if="!l.details">
                        <h4 class="m-0"><strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong>
                        </h4>
                        <div class="ad-details-wrapper">
                          <b-row>
                            <b-col
                                cols="12"
                                lg="4"
                            >
                              <b-row>
                                <b-col
                                    class="p-0 pb-1"
                                    cols="12"
                                    md="5"
                                    lg="12"
                                >
                                  <b-skeleton-img
                                      no-aspect
                                      height="165px"
                                  ></b-skeleton-img>
                                </b-col>
                                <b-col
                                    class="pe-0"
                                    cols="12"
                                    md="7"
                                    lg="12"
                                >
                                  <b-skeleton width="85%"></b-skeleton>
                                  <b-skeleton width="55%"></b-skeleton>
                                  <b-skeleton width="70%"></b-skeleton>
                                  <b-skeleton width="70%"></b-skeleton>
                                  <b-skeleton width="70%"></b-skeleton>
                                  <b-skeleton width="70%"></b-skeleton>
                                </b-col>
                              </b-row>
                            </b-col>
                            <b-col
                                cols="8"
                                class="p-0 d-none d-md-block"
                            >
                              <b-skeleton-table
                                  :rows="8"
                                  :columns="4"
                                  :table-props="{ bordered: true }"
                              ></b-skeleton-table>
                            </b-col>
                          </b-row>
                        </div>
                      </template>
                      <template v-else>
                        <div class="ad-details-wrapper">
                          <h4 class="m-0 mb-1 d-flex justify-content-between">
                            <strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong>
                            <strong v-if="currentAdDetails.isUzAvtoYul" style="color: green;">{{
                                $t('column.uzavtoyul')
                              }}</strong>
                            <strong>{{ $t('column.number_sign') }}: {{ currentAdDetails.passportNumber }}</strong>
                          </h4>
                          <b-row>
                            <b-col
                                cols="12"
                                lg="4"
                            >
                              <b-row class="pr-md-0 pr-lg-2">
                                <b-col
                                    class="p-0"
                                    cols="12"
                                    md="5"
                                    lg="12"
                                >
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
                                      <img
                                          class="ad-details-img"
                                          alt="images"
                                          :src="require('@/assets/images/photo-placeholder.png')"
                                      >
                                    </div>
                                  </template>
                                </b-col>
                                <b-col
                                    class="pe-0"
                                    cols="12"
                                    md="7"
                                    lg="12"
                                >
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
                                    <router-link
                                        :to="{name: 'AdvertisementDetails', params: {id: currentAdDetails.id}}">
                                      {{ $t('actions.details') }}...
                                    </router-link>
                                  </p>
                                </b-col>
                              </b-row>
                            </b-col>
                            <b-col
                                cols="12"
                                lg="8"
                                class="p-0 d-none d-md-block"
                            >
                              <table class="ad-details">
                                <tbody>
                                <tr>
                                  <th
                                      rowspan="7"
                                      width="10%"
                                  >{{ $t('column.construction.ad_construction') }}
                                  </th>
                                </tr>
                                <tr>
                                  <th
                                      scope="row"
                                      width="10%"
                                  >{{ $t('column.construction.owner') }}
                                  </th>
                                  <td colspan="2">{{ currentAdDetails.contractorName }}</td>
                                </tr>
                                <tr>
                                  <th
                                      scope="row"
                                      width="10%"
                                  >{{ $t('column.construction.owner_inn') }}
                                  </th>
                                  <td colspan="2">{{ currentAdDetails.inn }}</td>
                                </tr>
                                <tr>
                                  <th
                                      scope="row"
                                      width="10%"
                                  >{{ $t('column.construction.owner_address') }}
                                  </th>
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
                                  <th
                                      scope="row"
                                      width="10%"
                                  >{{ $t('column.construction.side') }}
                                  </th>
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
                                  <th
                                      scope="row"
                                      width="10%"
                                  >{{ $t('column.construction.volume') }}
                                  </th>
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
                    </v-popup>
                  </v-marker>
                </v-marker-cluster>
              </v-map>

            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import { TokenService } from "@/shared/services/storage.service";

const MAIN_API_URL = 'contractor-advertising-construction'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from '@/shared/services/helper.service'

import {LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import L from "leaflet";
import * as esri_geo from 'esri-leaflet-geocoder';

var MyCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(19, 12),
    iconSize: new L.Point(40, 37),
    iconUrl: require('@/assets/images/map-marker-red.png')
  }
});

var MyGreenCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(19, 12),
    iconSize: new L.Point(24, 30),
    iconUrl: require('@/assets/images/map-marker-green.png')
  }
});
var MyCustomMarkerForSearch = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 30),
    iconUrl: require('@/assets/images/map-marker.png')
  }
});
export default {
  name: "MonitoringAdvertisementConstructions",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-marker-cluster": Vue2LeafletMarkercluster,
    'v-marker': LMarker,
    'v-popup': LPopup,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  created() {
    this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
    this.var_default_search_payload.itemsPerPage = 500;
    this.geoJsonLoaded = true;

    // GET MAP DATA
    this.search()

    // GET CONTRACTORS
    this.fetchContractors()

    // GET REGIONS
    helperService.fetchRegionsForAdvertisementByCurrentUserId()
        .then(res => {
          this.regions = res.data
        })
        .catch(e => {
          console.log(e)
        })

    // GET AD_DESIGN_TYPES
    helperService
        .getAdDesignTypesByActiveStatus()
        .then((res) => {
          this.adDesignTypes = res.data;
        })
        .catch(e => {
          console.log(e)
        })
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.leafletMap.mapObject;
      var searchControl = new esri_geo.geosearch({
        providers: [
          esri_geo.arcgisOnlineProvider({
            // API Key to be passed to the ArcGIS Online Geocoding Service
            apikey: 'AAPK9acf37860a924037b15132e490ddc20eOLJx7XB1eMCSpCz9GHsYDLeibbVI0Fzzh31h1N9b_cN7OIAYryLzBxkJ5NBwI03l'
          })
        ],
        useMapBounds: false,
        placeholder: this.$t('column.search')
      }).addTo(this.map);

      // var results = new L.LayerGroup().addTo(this.map);
      let vm = this
      searchControl.on('results', function (data) {
        // results.clearLayers();
        /* for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));
        } */
        if (data.results[0])
          vm.addSearchResultMarker(data.results[0])
      });
    })
  },
  data() {
    return {
      searchResultMarker: null,
      slide: 0,
      sliding: null,
      currentAdDetails: {},
      currentAdImgs: [],
      strForImgs: '',
      publicPath: process.env.BASE_URL,
      adDesignTypes: [],
      districts: [],
      regions: [],
      contractorSearchPayload: {},
      hasNextPageContractors: false,
      contractors: [],
      debounce: null,
      isLoadingContractors: false,
      initialFilterPayload: {
        passportNumber: '',
        contractorIds: [],
        regionIds: [],
        districtIds: [],
        designTypeIds: []
      },
      filterPayload: {
        passportNumber: '',
        contractorIds: [],
        regionIds: [],
        districtIds: [],
        designTypeIds: []
      },
      adMarkers: [],
      map: null,
      zoom: 6,
      center: L.latLng(41.381166, 64.5735819),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clusterOptions: {
        disableClusteringAtZoom: 18,
        chunkedLoading: true
      },
      geoJsonLoaded: false
    };
  },
  /*
  METHODS */
  methods: {
    addSearchResultMarker(e) {
      if (this.searchResultMarker) {
        this.map.removeLayer(this.searchResultMarker)
      }
      let vm = this
      this.searchResultMarker = new L.Marker(e.latlng, {icon: new MyCustomMarkerForSearch()}).addTo(this.map).on('click', function (e) {
        vm.map.removeLayer(vm.searchResultMarker)
      });
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    getAdDetails(adInfo, index) {
      if (!adInfo.details) {
        crudAndListsService.getById('contractor-advertising-construction', adInfo.id)
            .then(res => {
              this.currentAdImgs = null
              crudAndListsService.getById('contractor-advertising-construction', adInfo.id, false, null, 'second-agent-files')
                  .then(resForFiles => {
                    this.currentAdImgs = resForFiles.data.objectPhotoList
                    if (resForFiles.data.passportPhotoUrl && resForFiles.data.passportPhotoUrl.url) {
                      this.currentAdImgs.push(resForFiles.data.passportPhotoUrl)
                    }
                    this.$set(this.adMarkers[index], 'details', res.data.contractorAdvertisingConstructionForSecondAgentDto)
                    this.$set(this.adMarkers[index], 'imgs', this.currentAdImgs)
                    this.currentAdDetails = this.adMarkers[index].details
                  })
                  .catch(e => {
                    console.log(e)
                    this.$set(this.adMarkers[index], 'details', res.data.contractorAdvertisingConstructionForSecondAgentDto)
                    this.currentAdDetails = this.adMarkers[index].details
                  })
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        this.currentAdImgs = adInfo.imgs
      }
    },
    resetFilter() {
      this.filterPayload = Object.assign({}, this.initialFilterPayload)
      this.search()
      this.map.setView(this.center, this.zoom);
    },
    search() {
      helperService.getAdConstructionsForMap(this.filterPayload, true)
          .then(res => {
            this.adMarkers = []
            res.data.forEach(element => {
              this.adMarkers.push({
                id: element.id,
                latlng: L.latLng(element.latNumber, element.lngNumber),
                text: "<h1><u><font color='red'>" + element.pointTypeKey + "</h1></u></font><h2>Address: " + element.address + "</h2><p>" + 'feature.properties.Description' + "</p><p> Website:" + 'feature.properties.URL' + "</p><br><center><img src='" + require('@/assets/images/maintenance.png') + "' style='width:200px;height:300x;'>",
                icon: !element.isUzAvtoYul ? new MyCustomMarker() : new MyGreenCustomMarker()
              })
            });
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelAdDesignType(opt) {
      let selected = this.adDesignTypes.find(e => e.id === (opt.id ? opt.id : opt));
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
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
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
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.regionNameRu,
          nameLt: selected.regionNameLt,
          nameUz: selected.regionNameUz,
        })
        }`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.filterPayload.districtIds = []
      }
      if ($event && $event.length) {
        // GET DISTRICTS
        await helperService.getGeoLocationsByMultipleParentIds($event)
            .then(res => {
              this.districts = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    async debounceSearchContractors(searchText, selectName = '') {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText, selectName);
      }, 1000);
    },
    fetchContractorsWithKeyword(keyword, selectName) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      if (selectName == 'contractor') {
        this.fetchContractors()
      }
    },
    async fetchContractors() {
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor')
          .then(res => {
            this.contractors.push(...res.data.list)
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
          })
          .catch(e => {
            console.log(e)
            this.contractors = []
          })
          .finally(() => {
            this.isLoadingContractors = false
          })
    },
    contractorReachedEndOfList(e, selectName = '') {
      if (e) {
        this.fetchContractors()
      }
    },
  },
  /*
  WATCH */
  computed:{
    currentUserIsOuter(){
      return TokenService.getIsOuter();
    },
  },
  watch: {
    'filterPayload.regionIds': {
      handler(newVal, oldVal) {
        this.regionSelected(newVal)
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";

::v-deep .leaflet-map-container {
  height: 80vh;
  width: 100%;
  z-index: 4;
  @media (min-width: 1200px) {
    height: 84vh;
  }

  @media (min-width: 1400px) {
    height: 80vh;
  }

  .leaflet-popup-content {
    width: unset !important;

    .ad-details-wrapper {
      width: 15rem;
      @media (min-width: 568px) {
        width: 600px;
      }
      @media (min-width: 968px) {
        width: 53rem;
      }
      @media (min-width: 1200px) {
        width: 63rem;
      }

      // font-family: "PT Sans", sans-serif;
    }

    table.ad-details {
      // font-family: "PT Sans", sans-serif;
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 0.5rem;

      td,
      th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 5px;
      }

      /* tr:nth-child(even) {
background-color: #dddddd;
} */
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
  }
}
</style>