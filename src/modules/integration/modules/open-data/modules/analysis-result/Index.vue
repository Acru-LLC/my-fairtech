<template>
  <b-row>
    <b-col cols="12">
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('open_data.analysis_result.code') }} - {{ $t('open_data.analysis_result.title') }}
        </div>
      </b-col>
      <b-card>
        <b-card-body>
          <b-row class="mb-2">
            <div class="d-inline-block">
              <div class="search-box me-4 mb-2 d-inline-block">
                <div class="position-relative">
                  <b-input
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
              <b-col cols="2" class="me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </b-col>
              <span>{{ $t('column.select.text2') }}</span>
            </div>
            <div class="d-inline-block">
              <div class="text-sm-end float-right mx-1">
                <b-btn
                    @click="openImportExcelModal"
                    type="button"
                    class="btn btn-rounded mb-2"
                >
                  <i class="mdi mdi-import me-1"></i> {{ $t('actions.excel') }}
                </b-btn>
              </div>
              <div class="text-sm-end float-right mx-1">
                <b-btn
                    @click="sendOpenData"
                    type="button"
                    class="btn btn-rounded btn-pink mb-2"
                >
                  <i class="mdi mdi-send me-1"></i> {{ $t('actions.send') }}
                </b-btn>
                <b-btn
                    @click="promptOpenDataToken"
                    type="button"
                    class="btn btn-rounded btn-pink mb-2"
                >
                  <i class="mdi mdi-send me-1"></i> {{ $t('actions.change_token') }}
                </b-btn>
              </div>
              <div class="text-sm-end float-right">
                <download-excel
                    :data="json_data"
                    :fields="json_fields"
                    :header="$t('open_data.analysis_result.title')"
                    worksheet="My Worksheet"
                    :name="`${$t('open_data.analysis_result.title')}.xls`"
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
              <b-btn
                  type="button"
                  class="btn btn-success btn-rounded mb-2 me-2 float-right"
                  :to="{name: 'CreateOpenDataAnalysisResult'}"
              >
                <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
              </b-btn>
            </div>
          </b-row>
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

            <!-- STATUS -->
            <template #cell(status)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
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
                  <i @click="viewItem(data.item.id)" class="mdi mdi-eye-outline"/>
                </b-btn>
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i @click="editItem(data.item.id)" class="mdi mdi-circle-edit-outline"/>
                </b-btn>
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0 text-danger"
                    style="font-size: 1.2rem;"
                >
                  <i @click="deleteItem(data.item.id)" class="mdi mdi-trash-can-outline"/>
                </b-btn>
              </div>
            </template>

            <!-- CHANGE INDEX -->
            <template #cell(change_index)="data">
              <div class="d-flex justify-content-center">
                <b-btn
                    @click="handleChangeIndex(data.item.id)"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i class="mdi" :class="changeIndex.firstItemId === data.item.id || changeIndex.secondItemId === data.item.id ? 'mdi-checkbox-intermediate' : 'mdi-checkbox-blank-outline'"/>
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
                />
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
        </b-card-body>
      </b-card>
      <b-modal
          v-model="importExcelModal.isShow"
          size="lg"
          hide-footer
          :title="$t('actions.upload_file')"
          :no-close-on-backdrop="true"
      >
        <b-overlay
            :opacity="0.1"
            :show="importExcelModal.loader"
            rounded="sm"
        >
          <div class="row">
            <div class="col-md-12">
              <label for="">{{ $t('actions.download_template') }}</label>
              <div class="form-group">
                <a :href="`/template/opendata/${$t('open_data.analysis_result.code')}.xlsx`" class="btn btn-info" target="_blank" download>{{ $t('actions.download_template') }}</a>
              </div>
            </div>
            <div class="col-md-12">
              <label for="">{{ $t('actions.choose_file') }}</label>
              <file-input
                  ref="refImportExcel"
              />
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <b-btn variant="primary" @click="onImportExcel">{{ $t('actions.upload') }}</b-btn>
              </div>
            </div>
          </div>
        </b-overlay>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
const MAIN_API_URL = 'open-data/analysis-result'
import openDataService from '@/shared/services/open_data.service.js'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import FileInput from '../../components/FileInput'

export default {
  components: {
    FileInput,
  },
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        [this.$t('open_data.analysis_result.name')]: this.getName({
          nameUz: 'nameUz',
          nameRu: 'nameRu',
          nameLt: 'nameLt',
        }),
        [this.$t('open_data.analysis_result.workName')]: this.getName({
          nameUz: 'workNameUz',
          nameRu: 'workNameRu',
          nameLt: 'workNameLt',
        }),
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
      activeDep: {},
      changeIndex: {
        firstItemId: null,
        secondItemId: null,
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
        {
          label: this.$t('open_data.analysis_result.name'), key: this.getName({
            nameUz: 'nameUz',
            nameRu: 'nameRu',
            nameLt: 'nameLt',
          }),
        },
        {
          label: this.$t('open_data.analysis_result.workName'), key: this.getName({
            nameUz: 'workNameUz',
            nameRu: 'workNameRu',
            nameLt: 'workNameLt',
          }),
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
        {
          label: '#',
          key: "change_index",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      importExcelModal: {
        isShow: false,
        loader: false,
      },
    };
  },
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    downloadExcel() {
      this.json_data = [...this.tableItems];
    },
    openImportExcelModal() {
      this.importExcelModal.isShow = true;
    },
    onImportExcel() {
      if (!this.$refs.refImportExcel.file) {
        return this.$toast(this.$t('messages.file_not_chosen'), {type: 'error'});
      }
      const formData = new FormData();
      formData.append('uploadExcel', this.$refs.refImportExcel.file);
      this.importExcelModal.loader = true;
      crudAndListsService.post(MAIN_API_URL + "/uploadByExcel", formData, true)
          .then(res => {
            this.importExcelModal.loader = false;
            this.importExcelModal.isShow = false;
            return this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
          })
          .catch(err => {
            this.importExcelModal.loader = false;
            this.importExcelModal.isShow = false;
            return this.$toast(this.$t('error.title'), {type: 'error'});
          })
          .finally(() => {
            this.fetchTableItems()
          });
    },
    sendOpenData() {
      this.cnf().then(({value}) => {
        if (value) {
          this.fetchSendOpenData()
        }
      })
    },
    promptOpenDataToken(){
      this.promptSwal({
        title: this.$t('messages.enter_token'),
        label: " ",
        buttonText: this.$t('actions.send')
      }).then(({isConfirmed, value}) => {
        if (isConfirmed) {
          openDataService.createToken(this.$t('open_data.analysis_result.code'), value)
        }
      })
    },
    fetchSendOpenData() {
      crudAndListsService
          .post(MAIN_API_URL + "/send-to-open-data",{}, true)
          .then(res => {
            this.$toast(res.data);
          })
    },
    async handleChangeIndex(id) {
      if (this.changeIndex.firstItemId === null) {
        this.changeIndex.firstItemId = id;
      } else if (this.changeIndex.secondItemId === null && this.changeIndex.firstItemId !== id) {
        this.changeIndex.secondItemId = id;
      }
      if (this.changeIndex.firstItemId !== null && this.changeIndex.secondItemId !== null && this.changeIndex.firstItemId !== this.changeIndex.secondItemId) {
        await this.cnf().then(async ({isConfirmed}) => {
          if (isConfirmed) {
            await crudAndListsService.post(MAIN_API_URL + `/change-index?firstItemId=${this.changeIndex.firstItemId}&secondItemId=${this.changeIndex.secondItemId}`, null, true).then(async res => {
              await this.fetchTableItems();
            })
          }
          this.changeIndex.firstItemId = null;
          this.changeIndex.secondItemId = null;
        })
      }
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
      this.var_default_search_payload.sortDesc.push(false)
      if (this.$i18n.locale === 'uz') {
        this.var_default_search_payload.sortBy.push('nameLt')
      } else if (this.$i18n.locale === 'ru') {
        this.var_default_search_payload.sortBy.push('nameRu')
      } else if (this.$i18n.locale === 'uzCyrillic') {
        this.var_default_search_payload.sortBy.push('nameUz')
      }
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
      this.$router.push({name: 'UpdateOpenDataAnalysisResult', params: {id: id}})
    },
    viewItem(id) {
      this.$router.push({name: 'ViewOpenDataAnalysisResult', params: {id: id}})
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
  created() {
    this.fetchTableItems()
  },
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      },
      deep: true
    }
  }
};
</script>

<style scoped lang='scss'>
</style>