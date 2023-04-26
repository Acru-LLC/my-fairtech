<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('word_templates.categories') }}</div>
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
              <div class="col-3 me-2 mx-2 d-inline-block">
                <span>{{ $t('column.select.text1') }} {{ $t('column.select.text2') }}</span>
                <!--                <span>{{ $t('column.select.text2') }}</span>-->

                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
              <div class="col-5 me-2 mx-2 d-inline-block">
                <!--                <BaseMultiselectWithValidation-->
                <!--                    not-required-->
                <!--                    custom-styles="grid-template-columns: 0% 100%"-->
                <!--                    v-model="templateCategory"-->
                <!--                    :options="category.map(e => e.id)"-->
                <!--                    :placeholder="$t('word_templates.categories')"-->
                <!--                    open-direction="bottom"-->
                <!--                    :show-labels="false"-->
                <!--                    :custom-label="customLabelCategory"-->
                <!--                    @search-change="fetchCategoryList"-->
                <!--                />-->
                <base-multiselect-with-validation
                    v-model="templateCategory"
                    not-required
                    label-on-top
                    placeholder=""
                    preserve-search
                    with-create-addition
                    open-direction="bottom"
                    :label="$t('word_templates.categories')"
                    :max-height="600"
                    :searchable="true"
                    :show-labels="false"
                    :clear-on-select="false"
                    :close-on-select="false"
                    :internal-search="false"
                    :custom-label="customLabelCategory"
                    :custom-styles="{display: 'block'}"
                    :options="category.map((e) => e.id)"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-row>
                  <b-col cols="7">
                    <!-- <div class="text-sm-end">
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
</div> -->
                  </b-col>
                  <b-col cols="5">
                    <b-btn
                        type="button"
                        class="btn btn-success btn-rounded mb-2 me-2"
                        :to="{name: 'CreateTemplates'}"
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
              show-empty
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- NAME -->
            <template #cell(bodyHtml)="data">
              <span class="text" v-html="data.item.bodyHtml"></span>
              <b-badge variant="primary" style="cursor: pointer" @click="eyeItem(data.item.id)">
                {{ $t("word_templates.full_text") }}
              </b-badge>
            </template>

            <!-- NAME -->
            <template #cell(category)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.categoryNameRu,
                    nameLt: data.item.categoryNameLt,
                    nameUz: data.item.categoryNameUz
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

const MAIN_API_URL = 'templates'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service';

export default {
  page: {
    title: "Positions",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      category: [],
      templateCategory: null,
      loadingTableItems: false,
      json_fields: {
        "Name Uz": "nameUz",
        "Name Lt": "nameLt",
        "Name Ru": "nameRu",
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
      title: "Positions",
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
          thStyle: {width: "3%"},
        },
        {
          label: this.$t('word_templates.templates'),
          key: "bodyHtml",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {width: "70%"},
        },
        {
          label: this.$t('word_templates.category_name'),
          key: "category",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {width: "20%"},
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          thStyle: {width: "7%"},
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
    async getCategory() {
      // this.var_default_search_payload.itemsPerPage = 100
      await crudAndListsService.searchListWithKeyword("template/category", this.var_default_search_payload)
          .then(res => {
            this.category = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelCategory(opt) {
      let selected = this.category.find(e => e.id === opt);
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
    fetchDateTypesByParentId(parentId, index) {
      let payload = Object.assign({}, this.var_default_search_payload)
      payload.page = 0;
      payload.itemsPerPage = 500;
      this.$set(this.tableItems[index], 'loadingInnerData', true)
      helperService
          .fetchDateTypesByParentId(parentId, payload)
          .then((res) => {
            this.$set(this.tableItems[index], 'children', res.data.list)
          })
          .catch(e => {
            this.$set(this.tableItems[index], 'children', [])
          })
          .finally(() => {
            this.$set(this.tableItems[index], 'loadingInnerData', false)
          })
    },
    rowClicked(item, index) {
      this.$set(item, '_showDetails', !item._showDetails)
      this.fetchDateTypesByParentId(item.id, index)
    },
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
    async fetchTemplateList(keyword = '', callback = null) {
      this.loadingTableItems = true
      // this.var_default_search_payload.keyword = keyword
      let payload = Object.assign({}, this.var_default_search_payload)
      payload.page = 0;
      payload.itemsPerPage = 500;
      await helperService.getTemplateByCategoryId(this.templateCategory,  keyword, payload)
          .then(res => {
            this.tableItems = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(e => {
            this.templates = [];
          }).finally(() => {
            this.loadingTableItems = false
          })
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
      this.$router.push({name: 'UpdateTemplates', params: {id: id}})
    },
    eyeItem(id) {
      this.$router.push({name: 'SeeTemplates', params: {id: id}})
    },
    deleteItem(id, parentId = null, parentIndex = null, forChild = false) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(MAIN_API_URL, id)
                  .then((res) => {
                    if (forChild && parentId) {
                      this.fetchDateTypesByParentId(parentId, parentIndex)
                    } else {
                      this.fetchTableItems()
                    }
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
    await this.fetchTableItems()
    await this.getCategory();
  },
  /*
  WATCH */
  watch: {
    'templateCategory': {
      handler(id) {
        if (id !== null) {
          this.fetchTemplateList('')
        } else {
        }
      }
    },
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
