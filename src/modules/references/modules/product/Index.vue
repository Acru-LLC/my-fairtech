<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.product.menu_title') }}</div>
        <router-link class="btn btn-success float-right" :to="{name: 'ReferencesProductCreate'}">
          {{$t('actions.create')}}
        </router-link>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-8">
            </div>
            <div class="col-sm-4">

            </div>
          </div>
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
                ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
              </div>
            </template>
            <template #cell(type)="data">
              <div class="d-flex justify-content-between">
                {{ data.item.type }}
              </div>
            </template>
            <template #cell(productType)="data">
              <div class="d-flex justify-content-between">
                {{ data.item.productType }}
              </div>
            </template>
            <template #cell(unitName)="data">
              <div class="d-flex justify-content-between">
                {{
                  getName({
                    nameUz: data.item.unitNameUz,
                    nameLt: data.item.unitNameLt,
                    nameRu: data.item.unitNameRu,
                  })
                }}
              </div>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
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
import crudAndListService from "@/shared/services/crud_and_list.service";

const REF_NAME = 'price/product'
import helperService from '@/shared/services/helper.service'
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
  components: {},
  data() {
    return {
      loadingTableItems: false,
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
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
      title: "Department Types",
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
        { label: this.$t('column.name'), key: "name" },
        { label: this.$t('actions.export_import_type'), key: "type" },
        { label: this.$t('actions.product_type'), key: "productType" },
        { label: this.$t('column.units'), key: "unitName" },
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
  /** COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    json_fields() {
      const map = {};
      this.tableFields.forEach((item) => {
        map[item.label] = item.key;
      })
      return map
    },
  },
  methods: {
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    async fetchTableItems() {
      this.loadingTableItems = true
      // GET STATUSES
      await crudAndListService.searchList(REF_NAME, this.var_default_search_payload, '', true)
          .then(res => {
            this.tableItems = res.data.list
            this.totalItems = res.data.total
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(REF_NAME, id)
                  .then(() => {
                    this.fetchTableItems()
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
          })
    },
  },
  /** CREATED */
  created() {
    this.fetchTableItems()
  },
  /** WATCH */
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