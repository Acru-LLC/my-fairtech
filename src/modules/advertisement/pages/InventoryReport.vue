<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-1">
              <div class="search-box me-2 mb-2 d-inline-block">
                <b-btn
                    variant="warning"
                    class="text-capitalize"
                    @click="$router.go(-1)"
                >
                  {{ $t('actions.back') }}
                </b-btn>

              </div>
            </div>
            <div class="col-sm-3">
              <div class="col-6 me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <!-- end col-->
          </div>
              <!-- Table data -->
              <b-table
                  :items="tableItems"
                  :fields="tableFields"
                  :table-busy="loadingTableItems"
                  id="my-table"
                  class="custom-b-table"
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
                  <b-badge v-else>{{
                      getName({
                        nameRu: data.item.statusNameRu,
                        nameLt: data.item.statusNameLt,
                        nameUz: data.item.statusNameUz,
                      })
                    }}
                  </b-badge>
                </template>

                <template #cell(contractorInfo)="data">
                  {{ data.item.contractorFullName }}
                  {{ data.item.contractorAddress }}
                  {{ data.item.contractorPhoneNumber }}
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
                        :to="{name: 'InventoryReportDetails', params: {id: data.item.id}}"
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
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
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
import i18n from "@/i18n";

const MAIN_API_URL = 'report/general-inventory-reports'
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  name: "Index",
  data() {
    return {
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
      tableItems: [],
      totalItems: 0,
      loadingTableItems: false,
      tableFields: [
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
        {label: i18n.t('column.status'), key: "status"},
        {
          label: i18n.t('column.actions'), key: "actions", sortable: false, thClass: "text-center",
          tdClass: "text-center"
        },
      ],
      searchKeyword: '',
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
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      crudAndListsService.searchListWithoutKeyword(MAIN_API_URL, this.var_default_search_payload, this.$route.params.id, true, 'all')
          .then((res) => {
            this.tableItems = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
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
            this.fetchTableItems()
          }).catch(e => {
            console.log(e)
          })
        }
      }).catch(err => {
        // An error occurred
      })
    },
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
  },
  /*
  WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    }
  }
};
</script>

<style scoped lang='scss'>

.max-height-70 {
  max-height: 90vh;
}

</style>