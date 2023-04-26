<template>
  <b-row class="p-3">
    <b-col sm="7">
      <b-card>
        <b-table-simple striped hover bordered>
          <b-tbody>
            <b-tr v-for="(detail, index) in data.details" :key="index">
              <b-td>{{ index + 1 }}</b-td>
              <b-td>{{ detail.key }}</b-td>
              <b-td>{{ detail.value }} {{ detail.unit ? detail.unit : '' }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card>
    </b-col>
    <b-col sm="5">
      <b-card>
        <b-col cols="12">
          <l-map ref="map" class="height-300">
            <l-marker
                v-if="markerLatLong"
                :lat-lng="markerLatLong"
                :icon="myGreenCustomMarker"
            />
          </l-map>
        </b-col>
      </b-card>
      <b-card>
        <b-row>
          <b-col cols="6">
            <b-carousel
                controls
                indicators
                class="rounded-lg shadow-lg"
                @sliding-start="() => true"
                @sliding-end="() => true"
            >
              <b-carousel-slide
                  v-for="({name, url}, imageKey) in data.images"
                  class="max-height-400"
                  :key="imageKey"
                  :img-src="url"
              >
                <template v-slot:img>
                  <img
                      class="cursor-pointer img-fluid w-100 d-block"
                      :src="'/' + url"
                      :alt="name"
                      loading="lazy"
                      v-b-popover.hover.bottom
                      :title="name"
                      @click="showLightBox(imageKey)"
                  />
                </template>
              </b-carousel-slide>
            </b-carousel>
            <vue-easy-lightbox
                v-if="this.lightbox"
                :visible="this.lightbox"
                :imgs="imagesList"
                :index="this.lightbox"
                @hide="showLightBox()"
            />
          </b-col>
          <b-col cols="6">
            <template v-for="({url, name, extension}, dk) in data.documents">
              <a
                  v-b-popover.hover.bottom
                  :title="name"
                  :href="'/' + url"
                  :download="name+'.' + extension"
                  :key="dk"
                  target="_blank"
                  class="btn btn-outline-secondary box-60px"
              >
                {{ extension.toUpperCase() }}
                <br>
                <i class="mdi mdi-download mdi-18px"/>
              </a>
            </template>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>

import eAuctionService from '@/shared/services/integration/eAuctionService.service'
import L from "leaflet";
import { LMap, LMarker } from "vue2-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    info: {
      type: Object,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
  },
  components: {
    LMap,
    LMarker,
  },
  data() {
    return {
      lightbox: false,
      map: {
        object: null,
        zoom: this.markerLatLong ? 5 : 14,
        view: this.markerLatLong || [41.5, 64.5],
        maxZoom: 50,
        minZoom: 5,
        maxBounds: [[37, 57], [47, 80]],
      }
    }
  },
  async created() {
    await this.fetchAdditionalInfo();
    console.log(this.data)
    const { mapObject } = this.$refs.map;
    this.map.object = mapObject;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.map.maxZoom,
      minZoom: this.map.minZoom,
    }).addTo(this.map.object);
    this.map.object.setMaxBounds(this.map.maxBounds);
    setTimeout(() => {
      this.map.view = this.markerLatLong;
      this.map.object.setView(this.map.view, this.map.zoom);
    }, 1000)
  },
  methods: {
    async fetchAdditionalInfo() {
      if (!this.data) {
        await eAuctionService.getAdditionalInfo(this.info.id, true)
            .then(({ data }) => {
              this.data = data
            })
      } else {
        this.info = this.data;
      }
    },
    showLightBox(index = null) {
      this.lightbox = index
    }
  },
  computed: {
    imagesList() {
      return this.data.images?.map(({ url }) => '/' + url) ?? [];
    },
    markerLatLong() {
      if (this.info.lat && this.info.lng) {
        return L.latLng(this.info.lat, this.info.lng);
      }
      return null;
    },
    myGreenCustomMarker() {
      return L.icon({
        iconUrl: MarkerIcon,
        iconAnchor: new L.Point(12.5, 40),
        iconSize: new L.Point(25, 41),
      });
    }
  },
  destroyed(){
    this.data = {}
    this.lightbox = false
  }
}
</script>

<style scoped>
.max-height-400 {
  max-height: 400px;
}

.height-300 {
  height: 300px;
}

.box-60px {
  width: 60px;
  height: 60px;
  margin: .3em;
  padding: .3em;
}
</style>