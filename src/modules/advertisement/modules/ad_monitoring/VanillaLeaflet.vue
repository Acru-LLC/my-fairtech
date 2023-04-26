<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_monitoring.title') }}</div>
      </div>
      <div class="card">
        <div class="card-body p-0">
          <div class="row p-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
              <BaseInputWithValidation
                  not-required
                  label-on-top
                  v-model="filterPayload.passportNumber"
                  :label="$t('column.ad_construction_passport_number')"
              />
            </div>
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
            <div v-if="!currentUserIsOuter" class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-3 d-flex align-items-end">
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.designTypeIds"
                  :options="adDesignTypes.map(({id}) => id)"
                  :hide-selected="true"
                  :close-on-select="false"
                  :label="$t('column.ad_design_type')"
                  placeholder=""
                  label-on-top
                  :custom-label="customLabelAdDesignType"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1 d-flex align-items-end">
              <b-button
                  variant="primary"
                  size="sm"
                  class="me-2"
                  @click="search"
              >
                <i class="mdi mdi-magnify font-size-20 align-middle"></i>
              </b-button>
              <b-button
                  variant="warning"
                  size="sm"
                  @click="resetFilter"
              >
                <i class="mdi mdi-refresh font-size-20 align-middle"></i>
              </b-button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <v-map id="map" ref="map"></v-map>
            </div>
          </div>
          <b-modal :id="mapPopup.id" size="xl" v-model="mapPopup.show">
            <template #modal-header v-if="!mapPopup.element.details">
              <h4 class="m-0"><strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong></h4>
            </template>
            <template #modal-title v-else>
              <h4 class="m-0 mb-1 d-flex justify-content-between">
                <strong>{{ $t('submodules.ad_monitoring.ad_passport_details_title') }}</strong>
                <strong v-if="currentAdDetails.isUzAvtoYul" style="color: green;">{{ $t('column.uzavtoyul') }}</strong>
                <strong>{{ $t('column.number_sign') }}: {{ currentAdDetails.passportNumber }}</strong>
              </h4>
            </template>
            <template #modal-footer>&nbsp;</template>
            <popup v-if="mapPopup.show"
                   :currentAdDetails="currentAdDetails"
                   :element="mapPopup.element"
                   :publicPath="publicPath"
                   :currentAdImgs="currentAdImgs"
                   :onSlideStart="onSlideStart"
                   :onSlideEnd="onSlideEnd"
            ></popup>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap } from "vue2-leaflet";
import helperService from '@/shared/services/helper.service'
import L from "leaflet";
import LeafletMarkercluster from "leaflet.markercluster";
import store from "@/state/store";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import Popup from "./Popup";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import { TokenService } from "@/shared/services/storage.service";

const MAIN_API_URL = 'contractor-advertising-construction'
export default {
  components: {
    "v-map": LMap,
    Popup
  },
  mounted() {
    this.initMap();
    LeafletMarkercluster;
  },
  data() {
    return {
      filterPayload: {
        passportNumber: '',
        designTypeIds: '',
        contractorIds: '',
        districtIds: '',
        regionIds: '',
      },
      map: {
        self: null,
        maxZoom: 19,
        minZoom: 6,
        initZoom: 6,
        view: [41.5, 64.5],
        attribution: [41.5, 64.5],
        maxBounds: [[37, 55], [46, 74]],
        markers: null,
      },
      adMarkers: [],
      adMarkerObjects: [],
      adDesignTypes: [],
      searchResultMarker: null,
      slide: 0,
      sliding: null,
      currentAdDetails: {},
      currentAdImgs: [],
      strForImgs: '',
      publicPath: process.env.BASE_URL,
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
      mapPopup: {
        id: 'map-popup',
        show: false,
        element: {},
      },
    };
  },
  async created() {
    store.commit("SET_GLOBAL_LOADING", true);
    this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
    this.var_default_search_payload.itemsPerPage = 500;
    this.search()
    store.commit("SET_GLOBAL_LOADING", true);
    this.fetchContractors()
    store.commit("SET_GLOBAL_LOADING", true);
    this.fetchAdDesignTypes()
    store.commit("SET_GLOBAL_LOADING", true);
    this.fetchRegionsForAdvertisementByCurrentUserId()
    store.commit("SET_GLOBAL_LOADING", false);
  },
  methods: {
    initMap() {
      const { mapObject } = this.$refs.map;
      this.map.self = mapObject
      const { self, maxZoom, minZoom, attribution, view, initZoom, maxBounds } = this.map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: maxZoom,
        minZoom: minZoom,
        attribution: attribution,
      }).addTo(self);
      self.setView(view, initZoom);
      self.setMaxBounds(maxBounds);
      this.handleAddLayers();
    },
    async handleAddLayers() {
      const { self } = this.map;
      if (this.map.markers) {
        self.removeLayer(this.map.markers);
      }
      this.map.markers = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          return L.divIcon({
            html: cluster.getAllChildMarkers().length,
            className: 'cluster-bar',
            iconSize: L.point(40, 30)
          });
        },
      });
      this.map.markers.addLayers(this.adMarkerObjects);
      self.addLayer(this.map.markers);
    },
    async fetchRegionsForAdvertisementByCurrentUserId() {
      if (this.currentUserIsOuter) {
        return [];
      }
      await helperService.fetchRegionsForAdvertisementByCurrentUserId()
          .then(res => {
            this.regions = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    async fetchAdDesignTypes() {
      if (!this.$can('list', 'directory advertisement design type by active status')) {
        return [];
      }
      await helperService
          .getAdDesignTypesByActiveStatus()
          .then((res) => {
            this.adDesignTypes = res.data;
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelAdDesignType(id) {
      let selected = this.adDesignTypes.find(e => e.id === id);
      if (selected) {
        return this.getName(selected)
      }
      return '';
    },
    resetFilter() {
      this.filterPayload = Object.assign({}, this.initialFilterPayload)
      this.search()
      this.map.self.setView(this.map.view, this.map.zoom);
    },
    search() {
      helperService.getAdConstructionsForMap(this.filterPayload, true)
          .then(res => {
            this.adMarkers = res.data
            this.adMarkerObjects = []
            let list = [];
            res.data.forEach((element, index) => {
              if (element.latNumber && element.lngNumber) {
                list.push(new L.marker([element.latNumber, element.lngNumber], {
                  icon: L.icon({
                    iconUrl: MarkerIcon,
                    iconAnchor: new L.Point(12.5, 40),
                    iconSize: new L.Point(25, 41),
                  })
                }).on('click', () => this.getAdDetails(this.adMarkers[index], index)))
              }
            });
            this.adMarkerObjects = list;
          })
          .catch(e => {
            console.log(e)
          })
    },
    addSearchResultMarker(e) {
      if (this.searchResultMarker) {
        this.map.removeLayer(this.searchResultMarker)
      }
      let vm = this
      this.searchResultMarker = new L.Marker(e.latlng, { icon: new MyCustomMarkerForSearch() })
          .addTo(this.map)
          .on('click', function (e) {
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
      // console.log(adInfo, index)
      // if (!adInfo.details) {
      this.mapPopup.show = true
      crudAndListsService.getById('contractor-advertising-construction', adInfo.id)
          .then(res => {
            this.currentAdImgs = null
            crudAndListsService.getById('contractor-advertising-construction', adInfo.id, false, null, 'second-agent-files')
                .then(resForFiles => {
                  this.mapPopup.element = adInfo
                  this.mapPopup.currentAdDetails = adInfo
                  this.$bvModal.show(this.mapPopup.id);
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
      // } else {
      //   this.$bvModal.show(this.mapPopup.id);
      //   this.currentAdImgs = adInfo.imgs
      //   this.mapPopup.element = adInfo
      //   this.mapPopup.currentAdDetails = adInfo
      //   this.currentAdDetails = this.adMarkers[index].details
      // }
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id === opt);
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
      let selected = this.regions.find(e => e.regionId === (opt.regionId ? opt.regionId : opt));
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
      let selected = this.contractors.find(e => e.id === opt);
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
      if (selectName === 'contractor') {
        this.fetchContractors()
      }
    },
    async fetchContractors() {
      if (!this.$can('list','contractor')) {
        return [];
      }
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
  watch: {
    'filterPayload.regionIds': {
      handler(newVal, oldVal) {
        this.regionSelected(newVal);
      },
    },
    adMarkerObjects() {
      this.handleAddLayers();
    },
  },
  computed: {
    currentUserIsOuter() {
      return TokenService.getIsOuter();
    },
  },
};
</script>

<style scoped lang="scss">
#map {
  height: calc(100vh - 300px);
  z-index: 1;
}
</style>
<style>
.cluster-bar {
  background: #efecec;
  color: #283593;
  border-radius: 10px;
  outline: 1px solid #7d8acf;
  text-align: center;
  line-height: 30px;
  box-shadow: 0 3px 5px #a5aac9;
}

.multiselect__content-wrapper {
  z-index: 500 !important;
}
</style>