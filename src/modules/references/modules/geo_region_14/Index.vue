<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.region_14.title') }}</div>
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
                  <b-col cols="12">
                    <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          :header="$t('submodules.region_14.title')"
                          :worksheet="$t('submodules.region_14.title')"
                          :name="$t('submodules.region_14.title') + '.xls'"
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
                </b-row>
              </div>
            </div>
          </div>
          <b-table
              :items="itemsAddedShowRowDetails"
              :fields="tableFields"
              :busy="loadingTableItems"
              @row-clicked="rowClicked"
              id="my-table"
              class="custom-b-table"
              responsive
              striped
              bordered
              small
              hover
              show-empty
          >
            <template #row-details="row">
              <b-table
                  :items="row.item.children ? row.item.children : []"
                  :fields="tableFields"
                  :busy="loadingTableItems"
                  :striped="false"
                  class="ml-5 bg-white"
                  small
                  show-empty
              >

                <!-- NUMBER OF ITEM -->
                <template #cell(index)="data">
                  {{
                    data.index + 1
                  }}
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
                    ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                    <p
                        class="mb-0 d-flex align-items-center"
                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                    ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
                  </div>
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
                          @click="editItem(data.item.id, 'inner')"
                          class="mdi mdi-circle-edit-outline edit"
                      ></i>
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
                    <b-spinner
                        variant="primary"
                        class="align-middle"
                    ></b-spinner>
                  </div>
                </template>
              </b-table>
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
                ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
              </div>
            </template>

            <!-- NUMBER OF ITEMS  -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
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
          </b-table>
          <b-pagination
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
              aria-controls="my-table"
              class="justify-content-end"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import i18n from "../../../../i18n";
import appConfig from "@/app.config";
import crudAndListsService from "../../../../shared/services/crud_and_list.service";

const MAIN_API_URL = 'geographical-region'
export default {
  name: "index",
  page: {
    title: "Street names",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {},
  data() {
    return {
      loadingTableItems: false,

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
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
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
        { label: this.$t('column.name'), key: "name" },
        { label: this.$t('column.soato'), key: "soato" },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      editingItem: {
        regionId: '',
      },
      regions: [],
      json_fields: {
        [this.$t('column.name')]: "nameLt",
        [this.$t('column.name')]: "nameRu",
        [this.$t('column.name')]: "nameUz",
        [this.$t('column.soato')]: "soato",
      },
      json_data: [],
    }
  },
  /*
  COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    itemsAddedShowRowDetails() {
      return this.tableItems.map(item => ({ ...item, _showDetails: false }))
    },
  },
  methods: {
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.nameLt = res.nameLt
        obj.nameUz = res.nameUz
        obj.nameRu = res.nameRu
        obj.soato = res.soato
        this.json_data.push(obj)
      })
    },
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.regionId = this.editingItem.regionId
      this.var_default_search_payload.sortDesc.push(false)
      if (i18n.locale === 'uz') {
        this.var_default_search_payload.sortBy.push('nameLt')
      } else if (i18n.locale === 'ru') {
        this.var_default_search_payload.sortBy.push('nameRu')
      } else if (i18n.locale === 'uzCyrillic') {
        this.var_default_search_payload.sortBy.push('nameUz')
      }
      crudAndListsService
          .searchListRegionTreeWithKeyword(MAIN_API_URL, this.var_default_search_payload, 'get-region-tree')
          .then((res) => {
            this.tableItems = res.data;
            this.totalItems = res.data.length;
            // this.regionSelected(this.editingItem ? this.editingItem.regionId : null, true)
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    editItem(id, type = 'outer') {
      this.$router.push({ name: 'UpdateGeoRegions14', params: { id: id } })
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
    rowClicked(item, index, e) {
      this.toggleShowDetails(item)
    },
    toggleShowDetails(item) {
      item._showDetails = !item._showDetails
    },
  },
  async created() {
    this.fetchTableItems()
  },
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    }
  }
}
// fetchRegions14
</script>

<style scoped>

</style>