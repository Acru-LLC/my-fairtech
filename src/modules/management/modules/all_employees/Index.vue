<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.employees.all_employees') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-3">
              <div class="search-box me-2 mb-2 d-inline-block">
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
            </div>
            <div class="col-sm-6">
              <span>{{ $t('column.select.text1') }}</span>
              <div class="col-3 me-2 mx-2 d-inline-block">
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
            <div class="col-sm-3">
              <div class="text-sm-end">
                <b-btn
                    type="button"
                    class="btn btn-success btn-rounded mb-2 me-2"
                    :to="{name: 'CreateEmployee'}"
                >
                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                </b-btn>
              </div>
            </div>
            <!-- end col-->
          </div>
          <!-- Table data -->
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :busy="loadingTableItems"
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
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- DEPARTMENT -->
            <template #cell(department)="data">
              <p>{{
                  getName({
                    nameRu: data.item.departmentParentNameRu,
                    nameLt: data.item.departmentParentNameLt,
                    nameUz: data.item.departmentParentNameUz,
                  })
                }}</p>
              <p style="color: #6f42c1">{{
                  getName({
                    nameRu: data.item.departmentNameRu,
                    nameLt: data.item.departmentNameLt,
                    nameUz: data.item.departmentNameUz,
                  })
                }}</p>
            </template>

            <!-- POSITION -->
            <template #cell(position)="data">
              <p>{{
                  getName({
                    nameRu: data.item.directoryPositionNameRu,
                    nameLt: data.item.directoryPositionNameLt,
                    nameUz: data.item.directoryPositionNameUz,
                  })
                }}</p>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    v-if="data.item.statusUz != 'DELETED'"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i
                      @click="editItem(data.item.id, 'employees')"
                      class="mdi mdi-circle-edit-outline edit"
                  ></i>
                </b-btn>

                <b-btn
                    v-if="data.item.statusUz != 'DELETED'"
                    variant="link"
                    class="text-decoration-none p-0 text-danger"
                    style="font-size: 1.2rem;"
                >
                  <i
                      @click="deleteItem(data.item.id, 'employees')"
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
    </div>
  </div>
</template>

<script>
import i18n from "../../../../i18n";

const MAIN_API_URL = 'employee'
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  name: "Index",
  data() {
    return {
      activeDep: {},
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
        { label: i18n.t('column.fio'), key: "fullName", stickyColumn: true},
        { label: i18n.t('column.department'), key: "department", thStyle: { 'min-width': '17rem' } },
        { label: i18n.t('column.position'), key: "position" },
        { label: i18n.t('column.inn'), key: "inn" },
        { label: i18n.t('column.passport_number'), key: "passportNumber" },
        { label: i18n.t('column.passport_series'), key: "passportSeries" },
        { label: i18n.t('column.passport_given_date'), key: "passportGivenDate" },
        { label: i18n.t('column.passport_end_date'), key: "passportEndDate" },
        { label: i18n.t('column.passport_given_by'), key: "passportGivenWho", thStyle: { 'min-width': '10rem' } },
        { label: i18n.t('column.personal_number'), key: "personalNumber" },
        { label: i18n.t('column.birthdate'), key: "birthday" },
        { label: i18n.t('column.address'), key: "currentAddress", thStyle: { 'min-width': '10rem' } },
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
      this.$router.push({name: 'UpdateEmployee', params: {id: id}})
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

.max-height-70 {
  max-height: 70vh;
}

</style>