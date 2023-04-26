<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="col-sm-10">
            <div class="search-box me-2 mb-2 d-inline-block">
              <b-btn
                  variant="warning"
                  class="text-capitalize"
                  @click="$router.go(-1)"
              >
                {{ $t('actions.back') }}
              </b-btn>

            </div>

            <div class="col-5 search-box me-4 mb-2 d-inline-block">
              <div class="position-relative">
                <input
                    v-model="searchNotificationKeyword"
                    type="text"
                    class="form-control"
                    @input="fetchNotificationTableItems($route.params.id)"
                    :placeholder="$t('column.search')"
                />
                <i class="bx bx-search-alt search-icon"></i>
              </div>
            </div>
            <div class="col-5 me-2 mx-2 d-inline-block">
              <div class="position-relative d-flex align-items-center">
                <BaseDatePickerWithValidation
                    not-required
                    custom-styles="grid-template-columns: 100%;"
                    :only-form-element="true"
                    v-model="createdDate"
                    :label="$t('column.created_date')"
                    @input="fetchNotificationTableItems($route.params.id)"
                    lang="ru"
                ></BaseDatePickerWithValidation>
                <span class="p-2">
                       {{ $t('column.from_current_date') }}
                    </span>

              </div>
            </div>
          </div>
          <!-- Table data -->
          <b-table
              :items="notificationTableItems"
              :fields="notificationTableFields"
              id="notification-table"
              class="custom-b-table"
              borderless
              bordered
              small
              fixed
              hover
              show-empty
              striped>

            <!-- NUMBER OF ITEM -->
            <template #cell(index)="innerData">
              {{
                util_paginate(innerData.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
              }}
            </template>

            <!-- ACTIONS -->
            <template #cell(notificationActions)="innerData">
              <div class="general-table__actions d-flex justify-content-center">

                <!-- SHOW IMAGES LIGHTBOX -->
                <vue-easy-lightbox
                    :visible="visible"
                    :imgs="imgArr"
                    :index="index"
                    @hide="handleHide"
                    @on-next="handlePrevNext"
                    @on-prev="handlePrevNext"
                ></vue-easy-lightbox>

                <!-- IMAGES BUTTON -->
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i @click="getImages(innerData.item.id, row.index)" class="mdi mdi-image-multiple"></i>
                </b-btn>

                <!-- NOTIFICATION BUTTON -->
                <b-btn
                    v-if="$can('get', 'advertisement notification')"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    :to="{name: 'Notifications', params: {notId: innerData.item.id}}"
                >
                  <i class="mdi mdi-eye"></i>
                </b-btn>

              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>
          </b-table>
          <!-- end table -->
          <b-pagination
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
              aria-controls="my-table"
              class="justify-content-end"
          ></b-pagination>
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

import {mapActions} from 'vuex'
import {TokenService} from "@/shared/services/storage.service"

const MAIN_API_URL = 'contractor-advertising-construction'
const MAIN_NOTIFICATION_API_URL = 'report/advertisement-notifications'
const APPEND_API_URL = 'by-first-agent'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

const i18n = require("@/i18n");

export default {
  page: {
    title: "Passport info",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      visible: false,
      title: "Passport info",
      activeDep: {},
      tableItems: [],
      notificationTableItems: [],
      totalItems: 0,
      notificationTableFields: [
        {
          label: "№",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('column.comment'),
          key: "description",
        },
        {
          label: this.$t('column.created_by'),
          key: "createdBy",
        },
        {
          label: this.$t('column.placement_date'),
          key: "placedDate",
        },
        {
          label: this.$t('column.actions'),
          key: "notificationActions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      searchKeyword: '',
      searchNotificationKeyword: '',
      createdDate: '',
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      regions: [],
      districts: [],
      contractors: [],
      adDesignTypes: [],
      filterPayload: {
        passportNumber: '',
        contractorId: '',
        regionId: '',
        districtIds: [],
        designTypeIds: []
      },
      index: 0,
      photosFromServer: [],
      loadingTableItems: false,
      isOuter: TokenService.getIsOuter(),
    };
  },
  /*
  COMPUTED */
  computed: {
    tableFields() {
      return this.$can('list', 'contractor advertising construction') ? this.tableFieldsForAgency : this.tableFieldsForGovernment;
    },

    dtoName() {
      return this.$can('list', 'contractor advertising construction') ? 'contractorAdvertisingConstructionForSecondAgentDto' : 'contractorAdvertisingConstructionForFirstAgentDto';
    },

    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    imgArr() {
      let arrs = [];
      this.photosFromServer.forEach(e => {
        if (this.photosFromServer)
          arrs.push(this.publicPath + e.url)
      })
      return arrs
    }
  },
  methods: {
    ...mapActions(['setCount']),
    selectList($event) {
      if ($event == 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchNotificationTableItems(this.$route.params.id);
    },
    fetchNotificationTableItems(id) {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.placedDate = this.placedDate
      crudAndListsService
          .searchListNotificationByConstructionId(MAIN_NOTIFICATION_API_URL, this.var_default_search_payload, id, true)
          .then((res) => {
            this.notificationTableItems = res.data.list
          })
          .catch(e => {
            this.notificationTableItems = [];
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
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
    customLabelAdDesignType(opt) {
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
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.filterPayload.districtIds = []
      }
      // GET DISTRICTS
      if ($event)
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
            })
            .catch(e => {
              console.log(e)
            })
      this.fetchNotificationTableItems(this.$route.params.id)
    },
    updateFiles(id, forAgency = false) {
      this.$router.push({
        name: forAgency ? 'UpdateAdPassportInfoFilesByAgency' : 'UpdateAdPassportInfoFilesByGovernment',
        params: {id: id}
      })
    },
    createItem(id, forAgency = false) {
      this.$router.push({
        name: 'CreateContractorNotification',
        params: {adConstructionId: id}
      })
    },
    editItem(id) {
      this.$router.push({name: 'UpdateContractorNotification', params: {id: id}})
    },
    getImages(id, adConstructionIndex) {
      let foundIndex = this.tableItems[adConstructionIndex].contractorAdvertisingConstructionForSecondAgentDto.notifications.findIndex(el => el.id == id)
      if (foundIndex > -1) {
        this.photosFromServer = this.tableItems[adConstructionIndex].contractorAdvertisingConstructionForSecondAgentDto.notifications[foundIndex].advertisementNotificationPhotoList
        this.showImg(0)
      }
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
    handlePrevNext(oldIndex, newIndex) {
      this.index = newIndex
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(MAIN_API_URL, id)
                  .then((res) => {
                    this.fetchNotificationTableItems(this.$route.params.id)
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
  /* CREATED */
  async created() {
    this.fetchNotificationTableItems(this.$route.params.id)

    // GET REGIONS
    await helperService.fetchRegionsForAdvertisementByCurrentUserId()
        .then(res => {
          this.regions = res.data
          // this.regionSelected(this.editingItem ? this.editingItem.regionId : null, true)
        })
        .catch(e => {
          console.log(e)
        })

    // GET CONTRACTORS
    if (!this.isOuter) {
      await crudAndListsService.searchList('contractor', this.var_default_search_payload, 'by-contractor')
          .then(res => {
            this.contractors = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    }

    // GET AD DESIGN TYPES
    await helperService.getAdDesignTypesByActiveStatus()
        .then((res) => {
          this.adDesignTypes = res.data;
        })
        .catch(e => {
          console.log(e)
        })

  },
  /*
  WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchNotificationTableItems(this.$route.params.id)
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.centered-table {
  td, th {
    vertical-align: middle;
    text-align: center;
  }
}

.max-height-70 {
  max-height: 70vh;
}

</style>