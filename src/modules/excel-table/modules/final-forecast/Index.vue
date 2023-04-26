<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h5 mb-4 d-inline-block">{{ $t('submodules.final_forecast.title') }}</div>
    </div>
    <div class="col-12">
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
                          header="Лавозим"
                          worksheet="My Worksheet"
                          name="Лавозим.xls"
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
                        :to="{name: 'CreateFinalForecast'}"
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
            <template #cell(index)="data">
              <p>
                {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
              </p>
            </template>

            <template #cell(decisionName)="data">
                <p>{{ getName({
                  nameUz: data.item.decisionNameUz,
                  nameLt: data.item.decisionNameLt,
                  nameRu: data.item.decisionNameRu,
                }) }}</p>
            </template>

            <template #cell(year)="data">
                <p>{{ data.item.year }}</p>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <p>
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
                      v-if="false"
                      variant="link"
                      class="text-decoration-none p-0 text-danger"
                      style="font-size: 1.2rem;"
                  >
                    <i
                        @click="deleteItem(data.item.id)"
                        class="mdi mdi-trash-can delete"
                    ></i>
                  </b-btn>
                </p>
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

const MAIN_API_URL = 'statistic-report'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  page: {
    title: i18n.t('submodules.final_forecast.title'),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        [this.$t('submodules.final_forecast.main_header_name')]:  "mainHeaderName",
        [this.$t('submodules.final_forecast.decision_name')]:  "decisionName",
        [this.$t('column.comment')]: "descriptoion",
        [this.$t('column.year')]: "year",
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
      title: i18n.t('submodules.final_forecast.title'),
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
        {label: this.$t('submodules.final_forecast.main_header_name'), key: "mainHeaderName"},
        {label: this.$t('submodules.final_forecast.decision_name'), key: "decisionName"},
        {label: this.$t('column.year'), key: "year"},
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
        obj.nameUz = res.nameUz
        obj.nameLt = res.nameLt
        obj.nameRu = res.nameRu
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
      this.var_default_search_payload.sortDesc.push(false)
      if (i18n.locale == 'uz') {
        this.var_default_search_payload.sortBy.push('nameLt')
      } else if (i18n.locale == 'ru') {
        this.var_default_search_payload.sortBy.push('nameRu')
      } else if (i18n.locale == 'uzCyrillic') {
        this.var_default_search_payload.sortBy.push('nameUz')
      }
      crudAndListsService
          .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
          .then((res) => {
            this.tableItems = res.data;
            this.totalItems = res.data?.length ?? 0;
          })
          .catch(e => {
            console.log(e)
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    editItem(id) {
      this.$router.push({name: 'UpdateFinalForecast', params: {id: id}})
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
        console.log(err)
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