<template>
  <b-row>
    <b-col cols="12">
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('open_data.public_procurement_information.code') }} - {{ $t('open_data.public_procurement_information.title') }}
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
                    :header="$t('open_data.public_procurement_information.title')"
                    worksheet="My Worksheet"
                    :name="`${$t('open_data.public_procurement_information.title')}.xls`"
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
                  :to="{name: 'CreateOpenDataPublicProcurementInformation'}"
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
                <a :href="`/template/opendata/${$t('open_data.public_procurement_information.code')}.xlsx`" class="btn btn-info" target="_blank" download>{{ $t('actions.download_template') }}</a>
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
const MAIN_API_URL = 'open-data/public-procurement-information'
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
        [this.$t('open_data.public_procurement_information.economicClassification')]: 'economicClassification',
        [this.$t('open_data.public_procurement_information.purchaseType', 'uz')]: 'purchaseTypeLt',
        [this.$t('open_data.public_procurement_information.purchaseType', 'uzCyrillic')]: 'purchaseTypeUz',
        [this.$t('open_data.public_procurement_information.purchaseType', 'ru')]: 'purchaseTypeRu',
        [this.$t('open_data.public_procurement_information.purchaseType', 'en')]: 'purchaseTypeEn',
        [this.$t('open_data.public_procurement_information.goodServiceName', 'uz')]: 'goodServiceNameLt',
        [this.$t('open_data.public_procurement_information.goodServiceName', 'uzCyrillic')]: 'goodServiceNameUz',
        [this.$t('open_data.public_procurement_information.goodServiceName', 'ru')]: 'goodServiceNameRu',
        [this.$t('open_data.public_procurement_information.goodServiceName', 'en')]: 'goodServiceNameEn',
        [this.$t('open_data.public_procurement_information.fundingSource', 'uz')]: 'fundingSourceLt',
        [this.$t('open_data.public_procurement_information.fundingSource', 'uzCyrillic')]: 'fundingSourceUz',
        [this.$t('open_data.public_procurement_information.fundingSource', 'ru')]: 'fundingSourceRu',
        [this.$t('open_data.public_procurement_information.fundingSource', 'en')]: 'fundingSourceEn',
        [this.$t('open_data.public_procurement_information.purchaseProcessType', 'uz')]: 'purchaseProcessTypeLt',
        [this.$t('open_data.public_procurement_information.purchaseProcessType', 'uzCyrillic')]: 'purchaseProcessTypeUz',
        [this.$t('open_data.public_procurement_information.purchaseProcessType', 'ru')]: 'purchaseProcessTypeRu',
        [this.$t('open_data.public_procurement_information.purchaseProcessType', 'en')]: 'purchaseProcessTypeEn',
        [this.$t('open_data.public_procurement_information.lot')]: 'lot',
        [this.$t('open_data.public_procurement_information.purchasePurpose', 'uz')]: 'purchasePurposeLt',
        [this.$t('open_data.public_procurement_information.purchasePurpose', 'uzCyrillic')]: 'purchasePurposeUz',
        [this.$t('open_data.public_procurement_information.purchasePurpose', 'ru')]: 'purchasePurposeRu',
        [this.$t('open_data.public_procurement_information.purchasePurpose', 'en')]: 'purchasePurposeEn',
        [this.$t('open_data.public_procurement_information.goodUnit', 'uz')]: 'goodUnitLt',
        [this.$t('open_data.public_procurement_information.goodUnit', 'uzCyrillic')]: 'goodUnitUz',
        [this.$t('open_data.public_procurement_information.goodUnit', 'ru')]: 'goodUnitRu',
        [this.$t('open_data.public_procurement_information.goodUnit', 'en')]: 'goodUnitEn',
        [this.$t('open_data.public_procurement_information.amount')]: 'amount',
        [this.$t('open_data.public_procurement_information.rice')]: 'rice',
        [this.$t('open_data.public_procurement_information.totalAmount')]: 'totalAmount',
        [this.$t('open_data.public_procurement_information.purchasedGood', 'uz')]: 'purchasedGoodLt',
        [this.$t('open_data.public_procurement_information.purchasedGood', 'uzCyrillic')]: 'purchasedGoodUz',
        [this.$t('open_data.public_procurement_information.purchasedGood', 'ru')]: 'purchasedGoodRu',
        [this.$t('open_data.public_procurement_information.purchasedGood', 'en')]: 'purchasedGoodEn',
        [this.$t('open_data.public_procurement_information.supplier', 'uz')]: 'supplierLt',
        [this.$t('open_data.public_procurement_information.supplier', 'uzCyrillic')]: 'supplierUz',
        [this.$t('open_data.public_procurement_information.supplier', 'ru')]: 'supplierRu',
        [this.$t('open_data.public_procurement_information.supplier', 'en')]: 'supplierEn',
        [this.$t('open_data.public_procurement_information.plannedFunding')]: 'plannedFunding',
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
          label: this.$t('open_data.public_procurement_information.economicClassification'), key: 'economicClassification',
        },
        {
          label: this.$t('open_data.public_procurement_information.purchaseType'), key: this.getName({
            nameUz: 'purchaseTypeUz',
            nameRu: 'purchaseTypeRu',
            nameLt: 'purchaseTypeLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.goodServiceName'), key: this.getName({
            nameUz: 'goodServiceNameUz',
            nameRu: 'goodServiceNameRu',
            nameLt: 'goodServiceNameLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.fundingSource'), key: this.getName({
            nameUz: 'fundingSourceUz',
            nameRu: 'fundingSourceRu',
            nameLt: 'fundingSourceLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.purchaseProcessType'), key: this.getName({
            nameUz: 'purchaseProcessTypeUz',
            nameRu: 'purchaseProcessTypeRu',
            nameLt: 'purchaseProcessTypeLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.lot'), key: 'lot',
        },
        {
          label: this.$t('open_data.public_procurement_information.purchasePurpose'), key: this.getName({
            nameUz: 'purchasePurposeUz',
            nameRu: 'purchasePurposeRu',
            nameLt: 'purchasePurposeLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.goodUnit'), key: this.getName({
            nameUz: 'goodUnitUz',
            nameRu: 'goodUnitRu',
            nameLt: 'goodUnitLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.amount'), key: 'amount',
        },
        {
          label: this.$t('open_data.public_procurement_information.price'), key: 'price',
        },
        {
          label: this.$t('open_data.public_procurement_information.totalAmount'), key: 'totalAmount',
        },
        {
          label: this.$t('open_data.public_procurement_information.purchasedGood'), key: this.getName({
            nameUz: 'purchasedGoodUz',
            nameRu: 'purchasedGoodRu',
            nameLt: 'purchasedGoodLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.supplier'), key: this.getName({
            nameUz: 'supplierUz',
            nameRu: 'supplierRu',
            nameLt: 'supplierLt',
          }),
        },
        {
          label: this.$t('open_data.public_procurement_information.plannedFunding'), key: 'plannedFunding',
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
          openDataService.createToken(this.$t('open_data.public_procurement_information.code'), value)
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
        this.var_default_search_payload.sortBy.push('purchaseTypeLt')
      } else if (this.$i18n.locale === 'ru') {
        this.var_default_search_payload.sortBy.push('purchaseTypeRu')
      } else if (this.$i18n.locale === 'uzCyrillic') {
        this.var_default_search_payload.sortBy.push('purchaseTypeUz')
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
      this.$router.push({name: 'UpdateOpenDataPublicProcurementInformation', params: {id: id}})
    },
    viewItem(id) {
      this.$router.push({name: 'ViewOpenDataPublicProcurementInformation', params: {id: id}})
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