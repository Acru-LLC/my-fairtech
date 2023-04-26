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
                        <!-- NAME -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                            <BaseInputWithValidation
                                not-required
                                validation-provider-custom-style="width: 100%;"
                                label-on-top
                                v-model="filterPayload.name"
                                :label="$t('column.name')"
                            />
                        </div>

                        <!-- CONTRAGENTS -->
                        <div class="col-12 col-sm-6 col-md-5 col-lg-3 d-flex align-items-end">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
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

                        <!-- ACTION_BUTTONS -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
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
                                <v-locatecontrol />
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
                                                <h4 class="m-0"><strong>{{ $t('column.petrol_station') }}</strong>
                                                </h4>
                                                <div class="ad-details-wrapper">
                                                    <b-row>
                                                        <b-col
                                                            cols="12"
                                                            class="p-0 d-none d-lg-block"
                                                        >
                                                            <b-skeleton-table
                                                                :rows="7"
                                                                :columns="4"
                                                                :table-props="{ bordered: true }"
                                                            ></b-skeleton-table>
                                                        </b-col>
                                                        <b-col
                                                            cols="12"
                                                            class="p-0 d-none d-md-block d-lg-none"
                                                        >
                                                            <b-skeleton-table
                                                                :rows="10"
                                                                :columns="4"
                                                                :table-props="{ bordered: true }"
                                                            ></b-skeleton-table>
                                                        </b-col>
                                                        <b-col
                                                            cols="12"
                                                            class="p-0 d-sm-block d-md-none"
                                                        >
                                                            <b-skeleton-table
                                                                :rows="11"
                                                                :columns="4"
                                                                :table-props="{ bordered: true }"
                                                            ></b-skeleton-table>
                                                        </b-col>
                                                    </b-row>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="ad-details-wrapper">
                                                    <h4 class="m-0 mb-1">
                                                        {{ $t('column.petrol_station') }} - <strong> <i>{{ currentAdDetails.name }}</i></strong>
                                                    </h4>
                                                    <b-row>
                                                        <b-col
                                                            cols="12"
                                                            class="p-0 d-md-block"
                                                        >
                                                            <table class="ad-details">
                                                                <tbody>
                                                                    <tr>
                                                                        <th
                                                                            rowspan="8"
                                                                            width="10%"
                                                                        >{{ $t('column.petrol_station') }}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.construction.owner') }}</th>
                                                                        <td colspan="2">{{ currentAdDetails.contractorName }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.construction.owner_inn') }}</th>
                                                                        <td colspan="2">{{ currentAdDetails.inn }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.construction.phone_number') }}</th>
                                                                        <td colspan="2">{{ currentAdDetails.contractorPhoneNumber }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.construction.owner_address') }}</th>
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
                                                                        >{{ $t('column.address') }}</th>
                                                                        <td colspan="2">
                                                                            {{
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
                                                                            }}<span v-if="currentAdDetails.addressDto.quarterNameUz || currentAdDetails.addressDto.additional">,</span> 
                                                                            {{
                                                                                currentAdDetails.addressDto.quarterNameUz ?
                                                                                getName({
                                                                                    nameRu: currentAdDetails.addressDto.quarterNameRu,
                                                                                    nameLt: currentAdDetails.addressDto.quarterNameLt,
                                                                                    nameUz: currentAdDetails.addressDto.quarterNameUz,
                                                                                })
                                                                                : ''
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.orienter') }}</th>
                                                                        <td colspan="2">
                                                                            {{ currentAdDetails.addressDto.additional ? currentAdDetails.addressDto.additional : '' }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.comment') }}</th>
                                                                        <td colspan="2">
                                                                            {{ currentAdDetails.description }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="4"></th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.created_by') }}</th>
                                                                        <td colspan="2">
                                                                            <p class="p-0 m-0">
                                                                                {{
                                      currentAdDetails.createdByEmployeeFullName ? (currentAdDetails.createdByEmployeeFullName + ' ' + (currentAdDetails.createdByDirectoryPositionNameUz ? ('(' + currentAdDetails.createdByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.createdByUserName + ')') : '')) : $t('auth.username') + ' - ' + currentAdDetails.createdByUserName
                                    }}
                                                                                <br><i>{{ currentAdDetails.createdDate }}</i>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th
                                                                            scope="row"
                                                                            width="10%"
                                                                        >{{ $t('column.last_modified_by') }}</th>
                                                                        <td colspan="2">
                                                                            <p class="p-0 m-0">{{
                                      currentAdDetails.updatedByEmployeeFullName
                                          ? (currentAdDetails.updatedByEmployeeFullName + ' ' + (currentAdDetails.updatedByDirectoryPositionNameUz
                                              ? ('(' + currentAdDetails.updatedByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName + ')') : ''))
                                          : $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName
                                    }} <br> <i>{{ currentAdDetails.updatedDate }}</i></p>
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
const MAIN_API_URL = 'petrol'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from '@/shared/services/helper.service'

import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
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
    created () {
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.var_default_search_payload.itemsPerPage = 500;
        this.geoJsonLoaded = true;

        // GET MAP DATA
        this.search()

        // GET CONTRACTORS
        this.fetchContractors()

        // GET REGIONS
        helperService.fetchRegionsForPetrolByCurrentUserId()
            .then(res => {
                this.regions = res.data
            })
            .catch(e => {
                console.log(e)
            })
    },
    mounted () {
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
    data () {
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
                name: '',
                contractorIds: [],
                regionIds: [],
                districtIds: [],
            },
            filterPayload: {
                name: '',
                contractorIds: [],
                regionIds: [],
                districtIds: [],
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
        addSearchResultMarker (e) {
            if (this.searchResultMarker) {
                this.map.removeLayer(this.searchResultMarker)
            }
            let vm = this
            this.searchResultMarker = new L.Marker(e.latlng, { icon: new MyCustomMarkerForSearch() }).addTo(this.map).on('click', function (e) {
                vm.map.removeLayer(vm.searchResultMarker)
            });
        },
        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        },
        getAdDetails (adInfo, index) {
            if (!adInfo.details) {
                crudAndListsService.getById(MAIN_API_URL, adInfo.id)
                    .then(res => {
                        this.currentAdImgs = null
                        this.$set(this.adMarkers[index], 'details', res.data)
                        this.currentAdDetails = Object.assign({}, this.adMarkers[index].details)
                    })
                    .catch(e => {
                        this.$set(this.adMarkers[index], 'details', res.data)
                        this.currentAdDetails = Object.assign({}, this.adMarkers[index].details)
                        console.log(e)
                    })
            } else {
                this.currentAdDetails = Object.assign({}, this.adMarkers[index].details)
            }
        },
        resetFilter () {
            this.filterPayload = Object.assign({}, this.initialFilterPayload)
            this.search()
            this.map.setView(this.center, this.zoom);
        },
        search () {
            helperService.getPetrolStationsForMap(this.filterPayload, true)
                .then(res => {
                    this.adMarkers = []
                    res.data.forEach(element => {
                        this.adMarkers.push({
                            id: element.id,
                            latlng: L.latLng(element.latNumber, element.lngNumber),
                            text: "<h1><u><font color='red'>" + element.pointTypeKey + "</h1></u></font><h2>Address: " + element.address + "</h2><p>" + 'feature.properties.Description' + "</p><p> Website:" + 'feature.properties.URL' + "</p><br><center><img src='" + require('@/assets/images/maintenance.png') + "' style='width:200px;height:300x;'>",
                            icon: new MyCustomMarker()
                        })
                    });
                })
                .catch(e => {
                    console.log(e)
                })
        },
        customLabelAdDesignType (opt) {
            let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelDistrict (opt) {
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
        customLabelRegion (opt) {
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
        async regionSelected ($event, dontResetDistrict = false) {
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
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName}`
            }
            return ``;
        },
        async debounceSearchContractors (searchText, selectName = '') {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText, selectName);
            }, 1000);
        },
        fetchContractorsWithKeyword (keyword, selectName) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            if (selectName == 'contractor') {
                this.fetchContractors()
            }
        },
        async fetchContractors () {
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
        contractorReachedEndOfList (e, selectName = '') {
            if (e) {
                this.fetchContractors()
            }
        },
    },
    /*
    WATCH */
    watch: {
        'filterPayload.regionIds': {
            handler (newVal, oldVal) {
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
            width: 16rem;
            @media (min-width: 568px) {
                width: 22rem;
            }
            @media (min-width: 968px) {
                width: 35rem;
            }
            @media (min-width: 1200px) {
                width: 43rem;
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