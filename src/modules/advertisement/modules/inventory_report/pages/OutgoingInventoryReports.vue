<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.inventory_report.outgoing_list') }}</div>
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
                        @input="fetchTableItemsOutgoing"
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
                      v-model="createdDate"
                      :placeholder="$t('column.created_date')"
                      @input="fetchTableItemsOutgoing"
                      lang="ru"
                  ></BaseDatePickerWithValidation>
                </div>
                <div class="col-3">
                  <BaseMultiselectWithValidation
                      not-required
                      v-model="statusId"
                      :options="statuses.map(e => e.id)"
                      :placeholder="$t('column.status')"
                      @input="fetchTableItemsOutgoing"
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
                      header="Жўнатилган хатловлар"
                      worksheet="My Worksheet"
                      name="Жўнатилган_хатловлар.xls"
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
              :items="tableItemsOutgoing"
              :fields="tableFieldsOutgoing"
              :table-busy="loadingTableItems"
              sticky-header="sticky-header"
              id="my-table"
              class="custom-b-table max-height-70"
              responsive
              striped
              bordered
              small
              hover
              show-empty>
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{
                util_paginate(data.index, var_default_search_payload.page + 1, var_default_search_payload.itemsPerPage)
              }}
            </template>

            <template #cell(address)="data">
              {{
                getName({
                  nameRu: data.item.quarterNameRu,
                  nameLt: data.item.quarterNameLt,
                  nameUz: data.item.quarterNameUz
                }) ? getName({
                  nameRu: data.item.quarterNameRu,
                  nameLt: data.item.quarterNameLt,
                  nameUz: data.item.quarterNameUz
                }) + ', ' : ''
              }}
              {{
                getName({
                  nameRu: data.item.streetNameRu,
                  nameLt: data.item.streetNameLt,
                  nameUz: data.item.streetNameUz
                }) ? getName({
                  nameRu: data.item.streetNameRu,
                  nameLt: data.item.streetNameLt,
                  nameUz: data.item.streetNameUz
                }) + ', ' : ''
              }}
              {{ data.item.additional }}
            </template>

            <template #cell(locationOfOutdoor)="data">
              {{
                getName({
                  nameRu: data.item.locationOfOutdoorNameRu,
                  nameLt: data.item.locationOfOutdoorNameLt,
                  nameUz: data.item.locationOfOutdoorNameUz
                })
              }}
            </template>

            <template #cell(designType)="data">
              {{
                getName({
                  nameRu: data.item.designTypeNameRu,
                  nameLt: data.item.designTypeNameLt,
                  nameUz: data.item.designTypeNameUz
                })
              }}
            </template>

            <template #cell(volumeType)="data">
              {{
                getName({
                  nameRu: data.item.volumeTypeNameRu,
                  nameLt: data.item.volumeTypeNameLt,
                  nameUz: data.item.volumeTypeNameUz
                })
              }}
            </template>

            <template #cell(objectState)="data">
              {{
                getName({
                  nameRu: data.item.objectStateNameRu,
                  nameLt: data.item.objectStateNameLt,
                  nameUz: data.item.objectStateNameUz
                })
              }}
            </template>

            <!--                <template #cell(advertisementType)="data">-->
            <!--                  {{-->
            <!--                    getName({-->
            <!--                      nameRu: data.item.advertisementTypeNameRu,-->
            <!--                      nameLt: data.item.advertisementTypeNameLt,-->
            <!--                      nameUz: data.item.advertisementTypeNameUz-->
            <!--                    })-->
            <!--                  }}-->
            <!--                </template>-->

            <template #cell(contractorInfo)="data">
              {{ data.item.contractorFullName }}
              {{ data.item.contractorAddress }}
              {{ data.item.contractorPhoneNumber }}
            </template>

            <template #cell(status)="data">
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

            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{
                util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
              }}
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem;"
                    :to="{name: 'InventoryReportDetails', params: {id: data.item.id, }}"
                >
                  <i class="mdi mdi-eye"></i>
                </b-btn>
                <!-- RECEIVERS BUTTON -->
                <b-btn
                    v-if="$can('list', 'outgoing receivers for inventory report')"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    @click="fetchTableItemsAdd(data.toggleDetails, data.item.id)"
                >
                  <i class="mdi mdi-account-multiple"></i>
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
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
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

                 ACTION
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
        </div>
        <!-- end card-body -->
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "../../../../../i18n";

const MAIN_API_URL = 'report/general-inventory-reports'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from "@/shared/services/helper.service";

export default {
  name: "Index",
  data() {
    return {
      json_fields: {
        [this.$t('column.ad_construction_address')]: "constructionAddress",
        [this.$t('column.ad_construction_place')]: "constructionPlace",
        [this.$t('column.ad_construction_existence_document')]: "existenceDocument",
        [this.$t('column.ad_tool_type')]: "toolType",
        [this.$t('column.ad_tool_volume')]: "toolVolume",
        [this.$t('column.ad_tool_current_status')]: "currentStatus",
        [this.$t('column.state_ad_construction_locate')]: "stateConstructionLocate",
        [this.$t('column.ad_construction_about_owner')]: "aboutOwner",
        [this.$t('column.ad_tool_about_contractor')]: "aboutContractor",
        [this.$t('column.ad_tool_locate_type')]: "locateType",
        [this.$t('column.other_info')]: "otherInfo",
        [this.$t('column.ad_construction_104')]: "construction104",
        [this.$t('column.status')]: "statusName",
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
      activeDep: {},
      activeTabIndex: 0,
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      tableItemsOutgoing: [],
      totalItems: 0,
      loadingTableItems: false,
      loadingExtendTableItems: false,
      tableFieldsOutgoing: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {label: i18n.t('column.ad_construction_address'), key: "address"},
        {label: i18n.t('column.ad_construction_place'), key: "locationOfOutdoor"},
        {label: i18n.t('column.ad_construction_existence_document'), key: "existenceDocument"},
        {label: i18n.t('column.ad_tool_type'), key: "designType"},
        {label: i18n.t('column.ad_tool_volume'), key: "volumeType"},
        {label: i18n.t('column.ad_tool_current_status'), key: "objectState"},
        {label: i18n.t('column.state_ad_construction_locate'), key: "locateInState"},
        {label: i18n.t('column.ad_construction_about_owner'), key: "contractorInfo"},
        {label: i18n.t('column.ad_tool_about_contractor'), key: "infoByContractorAboutAdCompany"},
        {label: i18n.t('column.ad_tool_locate_type'), key: "advertisementTypeName"},
        {label: i18n.t('column.other_info'), key: "otherInfo"},
        {label: i18n.t('column.ad_construction_104'), key: "vm104RelatedChanges"},
        {
          label: this.$t('column.accept_or_reject_date'),
          key: "acceptedOrRejectedDate",
        },
        {
          label: this.$t('column.created_date'),
          key: "createdDate",
        },
        {label: i18n.t('column.status'), key: "status"},
        {
          label: i18n.t('column.actions'), key: "actions", sortable: false, thClass: "text-center",
          tdClass: "text-center"
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
      createdDate: '',
      statusId: '',
      statuses: [],
    };
  },
  /*
  COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    selectList($event) {
      if ($event == 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItemsOutgoing()
    },
    fetchTableItemsOutgoing() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.createdDate = this.createdDate
      this.var_default_search_payload.statusId = this.statusId
      crudAndListsService.searchListIncomeAndOutgoingReports(MAIN_API_URL, this.var_default_search_payload, 'by-owner', null, true)
          .then((res) => {
            this.tableItemsOutgoing = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(e => {
            this.tableItemsOutgoing = [];
            this.totalItems = 0;
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
          .getAllReceiversForReport(id)
          .then((res) => {
            let foundAdIndex = this.tableItemsOutgoing.findIndex(el => el.id == id)
            if (foundAdIndex > -1) {
              this.$set(this.tableItemsOutgoing[foundAdIndex], 'receivers', res.data)
            }
          })
          .catch(e => {
            this.notificationTableItems = [];
          })
          .finally(() => {
            this.loadingExtendTableItems = false
          })
    },
    editItem(id) {
      this.$router.push(`/advertisement/report/update-inventory-report/${this.$route.params.adId}/${id}`)
      // this.$router.push({name: 'UpdateInventoryReport', params: {adId: this.$route.params.adId, id: id}})
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      }).then(value => {
        if (value) {
          InventoryReportService.delete(id).then((res) => {
            this.fetchTableItemsOutgoing()
          }).catch(e => {
            console.log(e)
          })
        }
      }).catch(err => {
        // An error occurred
      })
    },
    downloadExcel() {
      this.json_data = []
      this.tableItemsOutgoing.forEach(res => {
        let obj = {}
        obj.constructionAddress = (res.quarterNameUz ? res.quarterNameUz : '') + (res.streetNameUz ? ', ' + res.streetNameUz : '') + (res.additional ? ', ' + res.additional : '')
        obj.constructionPlace = res.locationOfOutdoorNameUz
        obj.existenceDocument = res.existenceDocument
        obj.toolType = res.designTypeNameUz
        obj.toolVolume = res.volumeTypeNameUz
        obj.currentStatus = res.objectStateNameUz
        obj.stateConstructionLocate = res.locateInState
        obj.aboutOwner = (res.constructionContractorName ? res.constructionContractorName : '') + (res.contractorAddress ? ', ' + res.contractorAddress : '') + (res.contractorPhoneNumber ? ', ' + res.contractorPhoneNumber : '')
        obj.aboutContractor = res.infoByContractorAboutAdCompany
        obj.locateType = res.advertisementTypeName
        obj.otherInfo = res.otherInfo
        obj.construction104 = res.vm104RelatedChanges
        obj.statusName = res.statusNameUz
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
  /* CREATED */
  async created() {
    this.fetchTableItemsOutgoing()

    //GET STATUSES
    await helperService.getRefByCode('notification_status')
        .then(res => {
          this.statuses = res.data.children
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
        this.fetchTableItems()
        this.fetchTableItemsOutgoing()
      }
    }
  }
};
</script>

<style scoped lang='scss'>

.max-height-70 {
  max-height: 70vh;
}

</style>