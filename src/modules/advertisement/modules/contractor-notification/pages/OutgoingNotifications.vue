<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.contractor_notification.outgoing_list') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-10">
              <div class="row">
                <div class="col-4 search-box">
                  <div class="position-relative">
                    <input
                        v-model="searchKeyword"
                        type="text"
                        class="form-control"
                        @input="fetchTableItems"
                        :placeholder="$t('column.search')"
                    />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
                <div class="col-2">
                  <div class="position-relative">
                    <b-form-select
                        v-model="selected"
                        :options="optionsTable"
                        @change="selectList"
                        class="form-select"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-3">
                  <BaseDatePickerWithValidation
                      not-required
                      custom-styles="grid-template-columns: 100%;"
                      :only-form-element="true"
                      v-model="placedDate"
                      :placeholder="$t('column.placement_date')"
                      @input="fetchTableItems"
                      lang="ru"
                  ></BaseDatePickerWithValidation>
                </div>
                <div class="col-3">
                  <BaseMultiselectWithValidation
                      not-required
                      v-model="statusId"
                      :options="statuses.map(e => e.id)"
                      :placeholder="$t('column.status')"
                      @input="fetchTableItems"
                      :custom-label="customLabelStatus"
                      open-direction="bottom"
                      :max-height="600"
                      :show-labels="false"
                      :only-form-element="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-2 col-sm-2">
              <div class="text-sm-end">
                <div class="text-sm-end justify-content-end">
                  <download-excel
                      :data="json_data"
                      :fields="json_fields"
                      header="Жўнатилган билдиришномалар"
                      worksheet="My Worksheet"
                      name="Жўнатилган_билдиришномалар.xls"
                  >
                    <b-btn
                        @click="downloadExcel"
                        type="button"
                        class="btn btn-rounded bg-primary mb-2"
                    >
                      <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                    </b-btn>
                  </download-excel>
                </div>
              </div>
            </div>
            <!-- end col-->
          </div>

          <!-- Table data -->
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :busy="loadingTableItems"
              sticky-header="sticky-header"
              id="my-table"
              class="custom-b-table max-height-70"
              responsive
              striped
              bordered
              small
              hover
              show-empty
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- STATUS -->
            <template #cell(statusNames)="data">
              <b-badge v-if="data.item.statusCode == 'ACCEPTED'" variant="success">{{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </b-badge>
              <b-badge v-else-if="data.item.statusCode == 'REJECTED'" variant="danger">{{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </b-badge>
              <b-badge v-else-if="data.item.statusCode == 'VIEWED'" variant="warning">{{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </b-badge>

              <b-badge v-else>{{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </b-badge>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
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

                <!-- MESSAGE BUTTON -->
                <b-btn
                    v-if="data.item.rejectMessage"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    @click="showRejectMessage(data.item.rejectMessage)"
                >
                  <i class="mdi mdi-message-processing" style="color: #ef4d50"></i>
                </b-btn>

                <!-- IMAGES BUTTON -->
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i @click="getImages(data.item.id)" class="mdi mdi-image-multiple"></i>
                </b-btn>

                <!-- RECEIVERS BUTTON -->
                <b-btn
                    v-if="$can('list', 'outgoing receivers')"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    @click="fetchTableItemsAdd(data.toggleDetails, data.item.id)"
                >
                  <i class="mdi mdi-account-multiple"></i>
                </b-btn>
                <!-- NOTIFICATION BUTTON -->
                <b-btn
                    v-if="$can('get', 'advertisement notification')"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    :to="{name: 'Notifications', params: {notId: data.item.id}}"
                >
                  <i class="mdi mdi-eye"></i>
                </b-btn>
              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner variant="primary" class="align-middle"></b-spinner>

              </div>
            </template>

            <template #row-details="row">
              <b-table
                  :items="row.item.receivers ? row.item.receivers : []"
                  :fields="tableFieldsAdd"
                  :busy="loadingExtendTableItems"
                  table-variant="info"
                  id="add-table"
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
                <!-- EMPTY SLOT -->
                <template #empty="">
                  <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                </template>

                <!-- ACTION -->
                <template #cell(action)="innerData">
                  <div v-if="innerData.item.isChanged && row.item.statusCode == 'REJECTED'">
                    {{ $t('messages.rejected_by') }}
                  </div>
                  <div v-else-if="innerData.item.isChanged && row.item.statusCode == 'ACCEPTED'">
                    {{ $t('messages.accepted_by') }}
                  </div>
                  <div v-else>
                  </div>
                </template>
              </b-table>
              <b-button size="sm" @click="row.toggleDetails">{{ $t('actions.close') }}</b-button>
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

          <b-modal v-model="getMessage" ok-only>
            <h4>{{ currentRejectMessage }}</h4>
          </b-modal>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>

</template>

<script>

import {mapActions} from 'vuex'

const MAIN_API_URL = 'report/advertisement-notifications'
const i18n = require("@/i18n");
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from "@/shared/services/helper.service";

export default {
  data() {
    return {
      json_fields: {
        [this.$t('column.ad_construction_owner')]: "contractorName",
        [this.$t('column.passport_number')]: "passportNumber",
        [this.$t('column.comment')]: "description",
        [this.$t('column.placement_date')]: "changedDate",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      tableItems: [],
      tableFields: [
        {
          label: "№",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('column.ad_construction_owner'),
          key: "contractorFullName",
        },
        {
          label: this.$t('column.passport_number'),
          key: "contractorAdvertisingConstructionPassportNumber",
        }, {
          label: this.$t('column.comment'),
          key: "description",
        },
        {
          label: this.$t('column.placement_date'),
          key: "placedDate",
        },
        {
          label: this.$t('column.accept_or_reject_date'),
          key: "acceptedOrRejectedDate",
        },
        {
          label: this.$t('column.status'),
          key: "statusNames",
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      tableFieldsAdd: [
        {
          label: "№",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('column.to_whom'),
          key: "username",
        },
        {
          label: this.$t('column.actions'),
          key: "action",
        },
      ],
      searchKeyword: '',
      selected: 20,
      totalItems: 0,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      loadingTableItems: false,
      loadingExtendTableItems: false,
      publicPath: process.env.BASE_URL,
      visible: false,
      index: 0,
      photosFromServer: [],
      getMessage: false,
      currentRejectMessage: null,
      statusId: '',
      statuses: [],
      placedDate: ''
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
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.placedDate = this.placedDate
      this.var_default_search_payload.statusId = this.statusId
      crudAndListsService
          .searchListOutgoingNotification(MAIN_API_URL, this.var_default_search_payload)
          .then((res) => {
            this.tableItems = res.data.list;
          })
          .catch(e => {
            this.tableItems = [];
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    fetchTableItemsAdd(toggleDetails, id) {
      if (toggleDetails) {
        toggleDetails()
      }
      this.loadingExtendTableItems = true
      helperService
          .getAllReceivers(id)
          .then((res) => {
            let foundAdIndex = this.tableItems.findIndex(el => el.id == id)
            if (foundAdIndex > -1) {
              this.$set(this.tableItems[foundAdIndex], 'receivers', res.data)
            }
          })
          .catch(e => {
            this.notificationTableItems = [];
          })
          .finally(() => {
            this.loadingExtendTableItems = false
          })
    },
    getImages(id) {
      let foundIndex = this.tableItems.findIndex(el => el.id == id)
      if (foundIndex > -1) {
        this.photosFromServer = this.tableItems[foundIndex].advertisementNotificationPhotoList
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
    showRejectMessage(msg) {
      this.currentRejectMessage = msg
      this.getMessage = true
    },
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.contractorName = res.contractorFullName
        obj.passportNumber = res.contractorAdvertisingConstructionPassportNumber
        obj.description = res.description
        obj.changedDate = res.placedDate
        this.json_data.push(obj)
      })
    },
    customLabelStatus(opt) {
      let selected = this.statuses.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    }
  },
  async created() {
    this.fetchTableItems()

    //GET STATUSES
    await helperService.getRefByCode('notification_status')
        .then(res => {
          this.statuses = res.data.children
        })
        .catch(e => {
          console.log(e)
        })
  },

  computed: {
    imgArr() {
      let arrs = [];
      this.photosFromServer.forEach(e => {
        if (this.photosFromServer)
          arrs.push(this.publicPath + e.url)
      })
      return arrs
    }
  }
}
</script>

<style scoped>

</style>