<template>
  <b-row>
    <b-col cols="12">
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('open_data.natural_monopoly_reestr.code') }} - {{ $t('open_data.natural_monopoly_reestr.title') }}
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
                    :header="$t('open_data.natural_monopoly_reestr.title')"
                    worksheet="My Worksheet"
                    :name="`${$t('open_data.natural_monopoly_reestr.title')}.xls`"
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
    </b-col>
  </b-row>
</template>

<script>
const MAIN_API_URL = 'open-data/natural-monopoly-reestr'
import openDataService from '@/shared/services/open_data.service.js'
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  components: {
  },
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        [this.$t('open_data.natural_monopoly_reestr.subjectName', 'uzCyrillic')]: 'subjectNameUz',
        [this.$t('open_data.natural_monopoly_reestr.subjectName', 'ru')]: 'subjectNameRu',
        [this.$t('open_data.natural_monopoly_reestr.subjectName', 'uz')]: 'subjectNameLt',
        [this.$t('open_data.natural_monopoly_reestr.subjectName', 'en')]: 'subjectNameEn',
        [this.$t('open_data.natural_monopoly_reestr.serviceType', 'uzCyrillic')]: 'serviceTypeUz',
        [this.$t('open_data.natural_monopoly_reestr.serviceType', 'ru')]: 'serviceTypeRu',
        [this.$t('open_data.natural_monopoly_reestr.serviceType', 'uz')]: 'serviceTypeLt',
        [this.$t('open_data.natural_monopoly_reestr.serviceType', 'en')]: 'serviceTypeEn',
        [this.$t('open_data.natural_monopoly_reestr.region', 'uzCyrillic')]: 'regionUz',
        [this.$t('open_data.natural_monopoly_reestr.region', 'ru')]: 'regionRu',
        [this.$t('open_data.natural_monopoly_reestr.region', 'uz')]: 'regionLt',
        [this.$t('open_data.natural_monopoly_reestr.region', 'en')]: 'regionEn',
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
          label: this.$t('open_data.natural_monopoly_reestr.subjectName'), key: this.getName({
            nameUz: 'subjectNameUz',
            nameRu: 'subjectNameRu',
            nameLt: 'subjectNameLt',
          }),
        },
        {
          label: this.$t('open_data.natural_monopoly_reestr.serviceType'), key: this.getName({
            nameUz: 'serviceTypeUz',
            nameRu: 'serviceTypeRu',
            nameLt: 'serviceTypeLt',
          }),
        },
        {
          label: this.$t('open_data.natural_monopoly_reestr.region'), key: this.getName({
            nameUz: 'regionUz',
            nameRu: 'regionRu',
            nameLt: 'regionLt',
          }),
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        }
      ],
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
          openDataService.createToken(this.$t('open_data.natural_monopoly_reestr.code'), value)
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
        this.var_default_search_payload.sortBy.push('subjectNameLt')
      } else if (this.$i18n.locale === 'ru') {
        this.var_default_search_payload.sortBy.push('subjectNameRu')
      } else if (this.$i18n.locale === 'uzCyrillic') {
        this.var_default_search_payload.sortBy.push('subjectNameUz')
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
      this.$router.push({name: 'UpdateOpenDataNaturalMonopolyReestr', params: {id: id}})
    },
    viewItem(id) {
      this.$router.push({name: 'ViewOpenDataNaturalMonopolyReestr', params: {id: id}})
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