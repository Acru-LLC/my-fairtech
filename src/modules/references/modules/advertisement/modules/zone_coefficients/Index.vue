<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.advertisement.zone_cofficients') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-8">
              <div class="search-box me-4 mb-2 d-inline-block">
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
              <span>{{ $t('column.select.text1') }}</span>
              <div class="col-2 me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
              <span>{{ $t('column.select.text2') }}</span>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-row>
                  <b-col cols="7">
                    <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          header="Коэффициентлар (K)"
                          worksheet="My Worksheet"
                          name="Коэффициентлар_(K).xls"
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
                  </b-col>
                  <b-col cols="5">
                    <b-btn
                        type="button"
                        class="btn btn-success btn-rounded mb-2 me-2"
                        :to="{name: 'CreateZoneCoefficient'}"
                    >
                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                    </b-btn>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- end col-->
          </div>
            <b-row class="mb-2">
              <b-col cols="4">
                <!-- REGIONS -->
                <BaseMultiselectWithValidation
                    class="required"
                    v-model="activeDep.regionId"
                    :options="regions.map(e => e.id)"
                    @input="regionSelected"
                    :custom-label="customLabelRegion"
                    :placeholder="$t('column.region')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                    :only-form-element="true"
                />
              </b-col>
              <b-col cols="4">
                <!-- DISTRICTS -->
                <BaseMultiselectWithValidation
                    not-required
                    v-model="activeDep.districtId"
                    :options="districts.map(e => e.id)"
                    @input="districtSelected"
                    :custom-label="customLabelDistrict"
                    :placeholder="$t('column.district')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                    :only-form-element="true"
                />
              </b-col>
            </b-row>

          <!-- Table data -->
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :busy="loadingTableItems"
              id="my-table"
              class="custom-b-table"
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

            <!-- NAME -->
            <template #cell(name)="data">
              <div class="d-flex justify-content-between">
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">O'Z</span> &nbsp;:&nbsp; <span> {{ data.item.nameLt }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">РУ</span> &nbsp;:&nbsp; <span> {{ data.item.nameRu }}</span></p>
              </div>
            </template>

            <!-- STATUS -->
            <template #cell(status)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.statusNameRu,
                      nameLt: data.item.statusNameLt,
                      nameUz: data.item.statusNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- ZONE NAME -->
            <template #cell(zoneName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.zoneNameRu,
                      nameLt: data.item.zoneNameLt,
                      nameUz: data.item.zoneNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- DISTRICT NAME -->
            <template #cell(districtName)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.districtNameRu,
                    nameLt: data.item.districtNameLt,
                    nameUz: data.item.districtNameUz,
                  })
                }}
              </p>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i
                      @click="editItem(data.item.id)"
                      class="mdi mdi-circle-edit-outline edit"
                  ></i>
                </b-btn>

                <b-btn
                    variant="link"
                    class="text-decoration-none p-0 text-danger"
                    style="font-size: 1.2rem;"
                >
                  <i
                      @click="deleteItem(data.item.id)"
                      class="mdi mdi-trash-can delete"
                  ></i>
                </b-btn>
              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ activeDep.regionId ? 'Маълумот топилмади' : 'Илтимос ҳудудни танланг' }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner variant="primary" class="align-middle"></b-spinner>
                
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
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>

<script>
import i18n from "../../../../../../i18n";

const MAIN_API_URL = 'directory/coefficients'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from "@/shared/services/helper.service";

export default {
  page: {
    title: "Zone Coefficients",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        "Зона": "zoneNameUz",
        "Туман": "districtName",
        "Коэффициент": "coefficient",
        "Қарор санаси": "createdDate",
        "Асос": "description",
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
      searchKeyword: '',
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      title: "Zone Coefficients",
      activeDep: {
        regionId: '',
        districtId: '',
      },
      tableItems: [],
      totalItems: 0,
      tableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {label: this.$t('column.zone'), key: "zoneName"},
        {label: this.$t('column.district'), key: "districtName"},
        {label: this.$t('column.coefficient'), key: "coefficient"},
        {label: this.$t('column.decision_date'), key: "createdDate"},
        {label: this.$t('column.reason'), key: "description"},
        {label: this.$t('column.status'), key: "status"},
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      regions: [],
      districts: [],
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
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.zoneNameUz = res.zoneNameUz
        obj.districtName = res.districtName
        obj.coefficient = res.coefficient
        obj.createdDate = res.createdDate
        obj.description = res.description
        this.json_data.push(obj)
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
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.id == opt);
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
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.activeDep.districtId = null
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
      this.fetchTableItems()
    },
    async districtSelected() {
      this.fetchTableItems()
    },
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
      this.var_default_search_payload.regionId = this.activeDep.regionId
      this.var_default_search_payload.districtId = this.activeDep.districtId
      crudAndListsService
          .searchListWithKeywordByRegionAndDistrict(MAIN_API_URL, this.var_default_search_payload)
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
      this.$router.push({name: 'UpdateZoneCoefficient', params: {id: id}})
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
                    this.fetchTableItems()
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
    // GET REGIONS
    await helperService.fetchRegions()
        .then(res => {
          this.regions = res.data
          // this.regionSelected(this.activeDep.regionId, true)
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
      }
    }
  }
};
</script>

<style scoped lang='scss'>
</style>