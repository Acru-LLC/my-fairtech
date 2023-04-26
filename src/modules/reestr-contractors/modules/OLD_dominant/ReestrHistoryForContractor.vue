<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row mb-2 align-items-center">
            <div class="col-2">
              <b-btn
                  variant="warning"
                  class="text-capitalize"
                  @click="$router.go(-1)"
              >
                {{ $t('actions.back') }}
              </b-btn>
            </div>
            <div class="col-10">
              <h4
                  class="text-center font-weight-bold m-0"
                  v-if="tableItems.length > 0"
              >{{ tableItems[0].contractorFullName }}</h4>
            </div>
            <!-- <div class="col-sm-4">
                <div class="search-box d-inline-block">
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
                <div class="ml-2 d-inline-block">
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

            </div> -->
            <!-- <div class="col-sm-4">
                <BaseMultiselectWithValidation
                    class="required"
                    rules="required"
                    v-model="regionId"
                    :options="regions.map(e => e.regionId)"
                    @input="regionSelected"
                    only-form-element
                    :allow-empty="false"
                    :custom-label="customLabelRegion"
                    :placeholder="$t('column.region')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
            </div> -->
            <!-- <div class="col-sm-8">
                <div class="text-sm-end">
                    <b-row>
                        <b-col cols="7"> -->
            <!-- <div class="text-sm-end">
                                <download-excel
                                    :data="json_data"
                                    :fields="json_fields"
                                    header="Соҳалар"
                                    worksheet="My Worksheet"
                                    name="Соҳалар.xls"
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
            <!-- </b-col>
                        <b-col cols="5">
                            <b-btn
                                type="button"
                                class="btn btn-success btn-rounded mb-2 me-2"
                                :to="{name: 'CreateDominantContractorReestr'}"
                            >
                                <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add_to_reestr') }}
                            </b-btn>

                            <b-btn
                                type="button"
                                class="btn btn-danger btn-rounded mb-2 me-2"
                                :to="{name: 'CreateRemoveDocDominantContractorReestr'}"
                            >
                                <i class="mdi mdi-delete me-1"></i> {{ $t('actions.remove_from_reestr') }}
                            </b-btn>
                        </b-col>
                    </b-row> -->
            <!-- </div> -->
            <!-- </div> -->
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
              <strong>{{ data.index + 1 }}</strong>
            </template>

            <template #cell(status)="data">
              <b-badge
                  :variant="data.item.status == 'KIRITISH' ? 'success' : data.item.status == 'CHIQARISH' ? 'danger' : ''">
                {{
                  data.item.status
                }}
              </b-badge>
            </template>

            <!-- PRODUCTS_OR_SERVICES -->
            <template #cell(productOrServices)="data">
              <div class="d-flex align-items-center flex-wrap">
                <ul>
                  <li
                      v-for="(p, index) in data.item.contractorReestrProductOrServiceHistoryDtos"
                      :key="`contractor-product-or-service-${index}`"
                  >{{
                      getName({
                        nameRu: p.directoryProductOrServiceNameRu,
                        nameLt: p.directoryProductOrServiceNameLt,
                        nameUz: p.directoryProductOrServiceNameUz,
                      })
                    }}
                  </li>
                </ul>
              </div>
            </template>

            <!-- STATUS -->
            <template #cell(productOrServiceType)="data">
              <strong v-if="data.item.contractorReestrProductOrServiceHistoryDtos.length">{{
                  getName({
                    nameRu: data.item.contractorReestrProductOrServiceHistoryDtos[0].directoryProductOrServiceTypeNameRu,
                    nameLt: data.item.contractorReestrProductOrServiceHistoryDtos[0].directoryProductOrServiceTypeNameLt,
                    nameUz: data.item.contractorReestrProductOrServiceHistoryDtos[0].directoryProductOrServiceTypeNameUz,
                  })
                }}</strong>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <!-- <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    v-b-tooltip.hover
                    :title="$t('actions.edit')"
                >
                    <i
                        @click="editItem(data.item.id)"
                        class="mdi mdi-circle-edit-outline edit"
                    ></i>
                </b-btn> -->
                <a
                    style="font-size: 1.2rem;"
                    :href="`${publicPath}${data.item.fileUrl}`"
                    target="_blank"
                >
                  <i class="mdi mdi-file-download"></i>
                </a>

                <!-- <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                    <i
                        @click="fetchReestrDocsByTypeId(data.toggleDetails, data.item.typeId, data.index)"
                        class="mdi mdi-clipboard-list edit"
                    ></i>
                </b-btn> -->
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
          <!-- <b-pagination
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
              aria-controls="my-table"
              class="justify-content-end"
          ></b-pagination> -->
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
const MAIN_API_URL = 'reestr/contractor-reestr-documents'
const APPEND_API_URL = 'for-contractor/daminiriushiy'
import crudAndListsService from '@/shared/services/crud_and_list.service'

export default {
  name: 'ReestrHistoryForContractorDominant',
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      regionId: null,
      loadingTableItems: false,
      regions: [],
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
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
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
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
        { label: this.$t('column.order_number'), key: "orderNumber" },
        { label: this.$t('column.added_date_to_reestr'), key: "reestrAcceptedDate" },
        { label: this.$t('column.removed_date_from_reestr'), key: "reestrClosedDate" },
        { label: this.$t('column.government_percentage'), key: "governmentPercentage" },
        { label: this.$t('column.status'), key: "status" },
        { label: this.$t('column.product_or_service_type'), key: "productOrServiceType" },
        { label: this.$t('submodules.product_or_services.title'), key: "productOrServices" },
      ],
      reestrTableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        { label: this.$t('column.business_entity'), key: "contractorFullName" },
        { label: this.$t('submodules.product_or_services.title'), key: "productOrServices" },
        // { label: this.$t('column.order_number'), key: "orderNumber" },
        // { label: this.$t('column.added_date_to_reestr'), key: "reestrAcceptedDate" },
        // {
        //     label: this.$t('column.actions'),
        //     key: "actions",
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //     sortable: false
        // },
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
    fetchReestrDocsByTypeId(toggleDetails, typeId, index) {
      if (toggleDetails) {
        toggleDetails()
      }
      this.$set(this.tableItems[index], 'loadingInnerData', true)
      crudAndListsService
          .searchList(MAIN_API_URL, null, `${APPEND_API_URL}?regionId=${this.regionId}&typeId=${typeId}`)
          .then((res) => {
            this.$set(this.tableItems[index], 'reestr', res.data)
          })
          .catch(e => {
            this.$set(this.tableItems[index], 'reestr', [])
          })
          .finally(() => {
            this.$set(this.tableItems[index], 'loadingInnerData', false)
          })
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.regionNameRu,
          nameLt: selected.regionNameLt,
          nameUz: selected.regionNameUz,
        })
        }`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if ($event) {
        this.fetchTableItems()
      }
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
    async fetchTableItems() {
      this.loadingTableItems = true
      // this.var_default_search_payload.keyword = this.searchKeyword
      /* this.var_default_search_payload.sortDesc.push(false)
      if (this.$i18n.locale == 'uz') {
          this.var_default_search_payload.sortBy.push('nameLt')
      } else if (this.$i18n.locale == 'ru') {
          this.var_default_search_payload.sortBy.push('nameRu')
      } else if (this.$i18n.locale == 'uzCyrillic') {
          this.var_default_search_payload.sortBy.push('nameUz')
      } */
      crudAndListsService
          .searchList(MAIN_API_URL, this.var_default_search_payload, `${APPEND_API_URL}?contractorId=${this.$route.params.id}`)
          .then((res) => {
            this.tableItems = res.data;
          })
          .catch(e => {
            this.tableItems = [];
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    editItem(id) {
      this.$router.push({ name: 'UpdateDominantContractorReestr', params: { id: id } })
    }
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
  },
  /*
  WATCH */
  watch: {
    /* 'var_default_search_payload.page': {
        handler () {
            this.fetchTableItems()
        }
    } */
  }
};
</script>

<style scoped lang='scss'>
.a-tag-underline-hover {
  :hover {
    text-decoration: underline !important;
  }
}
</style>