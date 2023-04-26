<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.group_regions.title') }}</div>
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
                          header="Гуруҳ ҳудудлари"
                          worksheet="My Worksheet"
                          name="Гуруҳ_ҳудудлари.xls"
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
                        :to="{name: 'CreateGroupRegion'}"
                    >
                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                    </b-btn>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- end col-->
          </div>
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

            <!-- REGION NAMES -->
            <template #cell(regionNames)="data">
              <div class="d-flex align-items-center flex-wrap">
                <p
                    v-for="(region, index) in data.item.geographicalRegionDto"
                    :key="`group-region-${index}`"
                    class="mb-0"
                    style="flex: 0 1 calc(25% - 8px);"
                ><span> {{
                    getName({
                      nameRu: region.nameRu,
                      nameLt: region.nameLt,
                      nameUz: region.nameUz,
                    })
                  }} <span
                    v-if="index != data.item.geographicalRegionDto.length - 1">,</span></span></p>
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
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
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
import i18n from "../../../../i18n";

const MAIN_API_URL = 'directory/group-regions'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  page: {
    title: "Group regions",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        "Гуруҳ": "groupNameUz",
        "Вилоятлар": "regionName",
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
      title: "Group regions",
      activeDep: {},
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
        {label: this.$t('column.group'), key: "groupNameUz"},
        {label: this.$t('column.regions'), key: "regionNames"},
        {label: this.$t('column.status'), key: "status"},
        {label: this.$t('column.reason'), key: "description"},
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
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
        let regions = []
        res.geographicalRegionDto.forEach(t => {
          regions.push(t.name)
        })
        obj.groupNameUz = res.groupNameUz
        obj.regionName = regions
        obj.description = res.description
        this.json_data.push(obj)
      })
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
      crudAndListsService
          .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
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
      this.$router.push({name: 'UpdateGroupRegion', params: {id: id}})
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
</style>