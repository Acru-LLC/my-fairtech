<template>
  <base-create-or-update-wrapper
      :custom-title="$t('actions.confirm')"
      has-save-suspend
      @save="save"
  >
    <ValidationObserver ref="observer" v-slot="{}">
      <b-row class="mb-3">
        <b-col md="5" sm="12">
          <div class="d-flex justify-content-between flex-row align-items-end">
            <div class="w-100">
              <base-multiselect-with-validation
                  v-model="form.contractorId"
                  required
                  label-on-top
                  preserve-search
                  with-create-addition
                  rules="required"
                  class="required"
                  open-direction="bottom"
                  :max-height="600"
                  :searchable="true"
                  :show-labels="false"
                  :custom-styles="{display: 'block'}"
                  :clear-on-select="false"
                  :internal-search="false"
                  :loading="isLoadingContractors"
                  :label="$t('column.contractor')"
                  :custom-label="customLabelContractor"
                  :placeholder="$t('column.contractor')"
                  :options="contractors.map((e) => e.id)"
                  :has-next-page="hasNextPageContractors"
                  @search-change="debounceSearchContractors"
                  @reachedEndOfList="contractorReachedEndOfList"
              >
              </base-multiselect-with-validation>
            </div>
            <b-button
                @click="contractorCreateModal = true"
                variant="outline-info"
                id="contractorSearchButton"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-plus-circle"/>
            </b-button>
          </div>
          <br>
          <base-input-with-validation
              v-model="form.passportNumber"
              required
              rules="required"
              class="required"
              label-on-top
              :label="$t('column.ad_construction_passport_number')"
          />
          <br>
          <base-date-picker-with-validation
              v-model="form.passportGivenDate"
              required
              rules="required"
              class="required"
              format="DD.MM.YYYY"
              label-on-top
              :label="$t('column.ad_construction_passport_given_date')"
              :custom-styles="{display: 'block'}"
          />
          <br>
          <base-date-picker-with-validation
              v-model="form.passportExpireDate"
              required
              rules="required"
              class="required"
              format="DD.MM.YYYY"
              label-on-top
              :label="$t('column.ad_construction_passport_expire_date')"
              :custom-styles="{display: 'block'}"
          />
          <br>
          <base-textarea-with-validation
              v-model="form.description"
              label-on-top
              rows="5"
              :label="$t('column.comment')"
          />
        </b-col>
        <b-col md="7" sm="12">
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
            <v-locatecontrol/>
            <!-- <l-marker :lat-lng="center"></l-marker> -->
          </l-map>
        </b-col>
      </b-row>

      <!-- CONTRACTOR CREATE MODAL -->
      <b-modal
          v-model="contractorCreateModal"
          id="create-multiple-min-collections-modal-id"
          size="xl"
          :title="$t('column.contractor')"
          title-class="font-18"
          :ok-title="$t('actions.save')"
          @ok="createContractor"
          @cancel="fetchContractorsWithKeyword('', false, true)"
          ok-variant="success"
          :cancel-title="$t('actions.cancel')"
          cancel-variant="danger"
          no-close-on-backdrop
          no-close-on-esc
      >
        <CreateFormContractor
            @saved="contractorSaved"
            :custom-is-mode-create="true"
            ref="createFormContractor"
        />
      </b-modal>

    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateFormContractor from '@/shared/views/components/CreateFormContractor'
import crudAndListsService from "@/shared/services/crud_and_list.service";
import apiService from "../../../../shared/services/api.service";
import BaseInputWithValidation from "@/components/base/BaseInputWithValidation.vue";
import BaseTextareaWithValidation from "@/components/base/BaseTextareaWithValidation.vue";
import BaseDatePickerWithValidation from "@/components/base/BaseDatePickerWithValidation.vue";
import Vue2LeafletLocatecontrol from "vue2-leaflet-locatecontrol";
import {LMap, LMarker, LTileLayer} from "vue2-leaflet";
import L from 'leaflet'
import * as esri_geo from 'esri-leaflet-geocoder';

const MAIN_API_URL = 'e-auction-info'

const MyCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 30),
    iconSize: new L.Point(24, 30),
    iconUrl: require('@/assets/images/map-marker.png')
  }
});
export default {
  name: "Confirm",
  components: {
    BaseDatePickerWithValidation,
    BaseTextareaWithValidation,
    BaseInputWithValidation,
    CreateFormContractor,
    LMap,
    LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  data() {
    return {
      center: L.latLng(41.381166, 64.5735819),
      map: null,
      marker: null,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OSM</a>',
      item: null,
      hasNextPageContractors: false,
      isLoadingContractors: false,
      contractorCreateModal: false,
      contractors: [],
      contractorSearchPayload: {
        itemsPerPage: 10,
      },
      debounce: false,
      form: {
        eAuctionInfoId: null,
        contractorId: null,
        passportNumber: null,
        passportGivenDate: null,
        passportExpireDate: null,
        description: '',
        latNumber: null,
        lngNumber: null,
      },
      statuses: []
    }
  },
  computed: {
    viewItems() {
      let result = [];
      if (!this.item) return result;
      for (const index in this.item) {
        if (this.labels[index]) {
          result.push({
            label: this.labels[index],
            value: this.item[index],
          });
        }
      }
      return result;
    },
    labels() {
      return {
        address: this.$t('submodules.integration.e_auction_info.address'),
        area: this.$t('submodules.integration.e_auction_info.area'),
        lot: this.$t('submodules.integration.e_auction_info.lot'),
        over_time: this.$t('submodules.integration.e_auction_info.over_time'),
        price: this.$t('submodules.integration.e_auction_info.price'),
        property: this.$t('submodules.integration.e_auction_info.property'),
        region: this.$t('submodules.integration.e_auction_info.region'),
        win_amount: this.$t('submodules.integration.e_auction_info.win_amount'),
        winner: this.$t('submodules.integration.e_auction_info.winner'),
      }
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    async contractorSaved (res) {
      this.contractorCreateModal = false
      this.contractorNotFound = false
      await this.fetchContractorsWithKeyword('', true)
    },
    createContractor (e) {
      e.preventDefault()

      this.$refs.createFormContractor.save()
    },
    addMarker(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      if (e.latlng.lat && e.latlng.lng) {
        this.form.latNumber = e.latlng.lat
        this.form.lngNumber = e.latlng.lng
        this.marker = new L.Marker(e.latlng, {icon: new MyCustomMarker()}).addTo(this.map);
      }
    },
    async getById() {
      const {eAuctionInfoId} = this.form
      await apiService.get(MAIN_API_URL + '/get/' + eAuctionInfoId, true)
          .then((response) => {
            this.item = response.data
          })
    },
    contractorReachedEndOfList(e) {
      if (e && !this.isLoadingContractors) {
        this.fetchContractors()
      }
    },
    async debounceSearchContractors(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText);
      }, 1000);
    },
    fetchContractorsWithKeyword(keyword, makeFirstSelected = false) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      this.fetchContractors(makeFirstSelected)
    },
    async fetchContractors(makeFirstSelected) {
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor', !this.customIsModeCreate)
          .then(res => {
            this.contractors.push(...res.data.list)
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
            if (makeFirstSelected) {
              this.editingItem.parentId = this.contractors.length ? this.contractors[0].id : null
            }
          })
          .catch(e => {
            console.log(e)
            this.contractors = []
          })
          .finally(() => {
            this.isLoadingContractors = false
          })
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id === opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (!this.form.latNumber || !this.form.lngNumber) {
          this.$toast(this.$t('messages.pls_select_place_in_map'), {type: 'error'});
        } else if (valid) {
          apiService.post(MAIN_API_URL + `/confirm`, this.form, true).then(res => {
            this.computedObserver.reset()
            this.form = {
              eAuctionInfoId: null,
              contractorId: null,
            };
            this.$router.go(-1)
            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
          })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  async created() {
    this.form.eAuctionInfoId = this.$route.params.id;
    await this.getById();
    setTimeout(() => {
      this.$refs.mymap.mapObject.invalidateSize();
      this.map = this.$refs.mymap.mapObject;
      this.fetchContractorsWithKeyword('')
      if (this.item.lat && this.item.lng) {
        const latlng = {
          lat: this.item.lat,
          lng: this.item.lng,
        };
        this.addMarker({
          latlng: latlng
        })
        this.map.setView([latlng.lat, latlng.lng], 14);
      }
    }, 500)
  }
}
</script>
<style scoped>
.base-form-component {
  display: block;
}

.base-form-component__label {
  padding: 10px 0;
}
</style>