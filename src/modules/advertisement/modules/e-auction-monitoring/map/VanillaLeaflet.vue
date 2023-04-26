<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_monitoring.title') }}</div>
      </div>
      <div class="card">
        <div class="card-body p-0">
          <div class="row p-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 px-1 pb-2">
              <BaseInputWithValidation
                  not-required
                  label-on-top
                  custom-styles="width: 100%;"
                  v-model="filterPayload.passportNumber"
                  :label="$t('column.ad_construction_passport_number')"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 px-1 pb-2">
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
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1 pb-2">
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
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1 pb-2">
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
            <div class="col-12 col-sm-12 col-md-8 col-lg-12 col-xl-2 text-right px-1 pb-2">
              <br class="d-none d-xl-block">
              <b-button variant="primary" size="sm" class="me-2" @click="search" >
                <i class="mdi mdi-magnify font-size-20 align-middle"></i>
              </b-button>
              <b-button variant="warning" size="sm" @click="resetFilter" >
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
            <popup
                v-if="mapPopup.show"
                :currentAdDetails="currentAdDetails"
                :publicPath="publicPath"
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
import store from "@/state/store";
import LeafletMarkercluster from "leaflet.markercluster";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import Popup from "./Popup";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import adMonitoringService from "@/shared/services/advertisement/adMonitoring.service";

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
      await helperService.fetchRegionsForAdvertisementByCurrentUserId()
          .then(res => {
            this.regions = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    resetFilter() {
      this.filterPayload = Object.assign({}, this.initialFilterPayload)
      this.search()
      this.map.self.setView(this.map.view, this.map.zoom);
    },
    search() {
      helperService.getAdConstructionsForMapEAuction(this.filterPayload, true)
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
                })
                    .on('click', () => this.getAdDetails(this.adMarkers[index], index)))
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
      this.searchResultMarker = new L.Marker(e.latlng, { icon: new MyCustomMarkerForSearch() }).addTo(this.map).on('click', function (e) {
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
      this.mapPopup.show = true
      adMonitoringService.getEAuctionShortInfoById(adInfo.id)
          .then(({ data }) => {
            this.currentAdDetails = data
          })
          .catch(e => {
            console.log(e)
          })
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
  watch: {
    'filterPayload.regionIds': {
      handler(newVal, oldVal) {
        this.regionSelected(newVal);
      },
    },
    'mapPopup.show': {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.currentAdDetails = {};
        }
      },
      deep: true,
    },
    adMarkerObjects() {
      this.handleAddLayers();
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