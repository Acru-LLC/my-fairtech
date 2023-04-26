<template>
    <div>
        <b-modal
            size="xl"
            :visible="visible"
            @hidden="$emit('clear')"
            :title="$t('column.map')"
            @shown="modalShown"
            title-class="font-18"
            :ok-title="$t('actions.save')"
            @ok="saveLocation"
            @cancel="$emit('close')"
            ok-variant="success"
            :cancel-title="$t('actions.cancel')"
            cancel-variant="danger"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
        >
            <b-container class="text-left">
                <!-- MAP WRAPPER -->
                <div class="map-wrapper">
                    <l-map
                        :center="center"
                        :zoom="6"
                        ref="mymap"
                        @click="addMarker"
                    >
                        <l-tile-layer
                            :url="url"
                            :attribution="attribution"
                        ></l-tile-layer>
                        <v-locatecontrol />
                        <!-- <l-marker :lat-lng="center"></l-marker> -->
                    </l-map>
                </div>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
// import * as moment from "moment";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
// import { deleteEvent } from "./api";
// import "vue-weather-widget/dist/css/vue-weather-widget.css";
// import VueWeatherWidget from "vue-weather-widget";
// define custom marker
import L from 'leaflet'
import * as esri_geo from 'esri-leaflet-geocoder';
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
// import LDraw from 'leaflet-draw';
// Import leaflet draw css and icons for draw toolbar
// import 'leaflet-draw/dist/leaflet.draw.css';
var MyCustomMarker = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 30),
        iconUrl: require('@/assets/images/map-marker.png')
    }
});
export default {
    data () {
        return {
            center: L.latLng(41.381166, 64.5735819),
            marker: null,
            lat: null,
            lng: null,
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        };
    },
    props: {
        visible: {
            type: Boolean
        },
        event: {
            required: true,
            type: Object
        }
    },
    methods: {
        addMarker (e) {
            if (this.marker) {
                this.map.removeLayer(this.marker);
            }
            this.lat = e.latlng.lat
            this.lng = e.latlng.lng
            this.marker = new L.Marker(e.latlng, { icon: new MyCustomMarker() }).addTo(this.map);
        },
        drawCreated (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                // layer.bindPopup('A popup!');
                this.lat = e.layer._latlng.lat
                this.lng = e.layer._latlng.lng
                this.featureGroup.addLayer(layer);
            }

        },
        saveLocation (e) {
            e.preventDefault();

            if (this.marker && this.lat && this.lng) {
                this.$emit('saveLocation', { lat: this.lat, lng: this.lng })
            }
        },
        async deleteEventLocal (id) {
            // await deleteEvent(id);
            this.$emit("refresh");
            this.$emit("clear");
        },
        modalShown () {
            setTimeout(() => {
                this.$refs.mymap.mapObject.invalidateSize();
                this.map = this.$refs.mymap.mapObject;
                if (this.marker) {
                    this.map.removeLayer(this.marker);
                }
                if (this.event.lat && this.event.lng) {
                    this.lat = this.event.lat
                    this.lng = this.event.lng
                    this.marker = new L.Marker(this.event, { icon: new MyCustomMarker() }).addTo(this.map);
                    this.map.setView(this.event, 17);
                } else {
                    this.lat = null
                    this.lng = null
                }
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
                        vm.addMarker(data.results[0])
                });
            }, 100);
        }
    },
    components: {
        LMap,
        LTileLayer,
        'v-locatecontrol': Vue2LeafletLocatecontrol
    }
};
</script>

<style lang="scss" scoped>
::v-deep.map-wrapper {
    width: 100%;
    height: 600px;
    #mapSearchContainer {
        position: fixed;
        top: 20px;
        right: 40px;
        height: 30px;
        width: 180px;
        z-index: 110;
        font-size: 10pt;
        color: #5d5d5d;
        border: solid 1px #bbb;
        background-color: #f8f8f8;
    }
}
</style>