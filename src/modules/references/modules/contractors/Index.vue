<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.contractor.title') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-5">
              <div class="col-7 search-box me-4 mb-2 d-inline-block">
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
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <div class="col-sm-3" style="padding-left: 2%">
              <!-- REGIONS -->
              <BaseMultiselectWithValidation
                  v-model="activeDep.regionId"
                  not-required
                  open-direction="bottom"
                  :options="regions.map(e => e.id)"
                  :custom-label="customLabelRegion"
                  :placeholder="$t('column.region')"
                  :max-height="600"
                  :show-labels="false"
                  :only-form-element="true"
                  @input="regionSelected"
              />
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-row>
                  <b-col cols="7">
                    <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          header="Контрагентлар"
                          worksheet="My Worksheet"
                          name="Контрагентлар.xls"
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
                        :to="{name: 'CreateContractor'}"
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
              sticky-header="sticky-header"
              id="my-table"
              class="custom-b-table max-height-70"
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

            <!-- PARENT -->
            <template #cell(parent)="data">
                            <span v-if="data.item.parent">
                                {{ data.item.parent.fullName }}
                            </span>
            </template>

            <!-- STATUS -->
            <template #cell(formOfOwnership)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.formOfOwnershipNameRu,
                      nameLt: data.item.formOfOwnershipNameLt,
                      nameUz: data.item.formOfOwnershipNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- REGION NAME -->
            <template #cell(regionName)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.addressDto.regionNameRu,
                    nameLt: data.item.addressDto.regionNameLt,
                    nameUz: data.item.addressDto.regionNameUz,
                  })
                }}
              </p>
            </template>

            <!-- DISTRICT NAME -->
            <template #cell(districtName)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.addressDto.districtNameRu,
                    nameLt: data.item.addressDto.districtNameLt,
                    nameUz: data.item.addressDto.districtNameUz,
                  })
                }}
              </p>
            </template>

            <!-- CAN REGISTER -->
            <template #cell(canRegister)="data">
              <div class="d-flex justify-content-center">
                                <span
                                    class="badge bg-success"
                                    v-if="data.item.canRegister === true"
                                >HA</span>
                <span
                    class="badge bg-warning"
                    v-if="data.item.canRegister === false"
                >YO'Q</span>
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
import i18n from "../../../../i18n";

const MAIN_API_URL = 'contractor'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from "@/shared/services/helper.service";

export default {
    page: {
        title: "Department Types",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {},
    data () {
        return {
            loadingTableItems: false,
            json_fields: {
                "Тўлиқ номи": "fullName",
                "СТИР": "inn",
                "ИФУТ": "oked",
                "Директор": "director",
                "Бухгалтер": "accounter",
                "Мобил тел. рақами": "mobileNumber",
                "Вилоят": "regionName",
                "Туман": "districtName",
                "Манзил": "additional",
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
            title: "Department Types",
            activeDep: {
                regionId: '',
            },
            tableItems: [],
            regions: [],
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
                { label: this.$t('column.full_name'), key: "fullName", thStyle: { 'min-width': '17rem' } },
                { label: this.$t('column.last_modified_date'), key: "lastModified" },
                { label: this.$t('column.superior_parent'), key: "parent"},
                { label: this.$t('column.status'), key: "status" },
                { label: this.$t('submodules.form_of_ownership.title'), key: "formOfOwnership" },
                {
                    label: this.$t('column.can_login'), key: "canRegister", tdClass: "text-center",
                },
                { label: this.$t('column.inn'), key: "inn" },
                { label: this.$t('column.oked'), key: "oked" },
                { label: this.$t('column.director'), key: "director" },
                { label: this.$t('column.accounter'), key: "accounter" },
                { label: this.$t('column.mobile_number'), key: "mobileNumber" },
                { label: this.$t('column.region'), key: "regionName" },
                { label: this.$t('column.district'), key: "districtName" },
                { label: this.$t('column.address'), key: "address" },
                { label: this.$t('column.phone_number'), key: "phoneNumber" },
                { label: this.$t('column.mail'), key: "email" },
                { label: this.$t('column.fax_number'), key: "faxNumber" },
            ],
        };
    },
    /*
    COMPUTED */
    computed: {
        numberOfPages () {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
        }
    },
    methods: {
        downloadExcel () {
            this.json_data = []
            this.tableItems.forEach(res => {
                let obj = {}
                obj.fullName = res.fullName
                obj.inn = res.inn
                obj.oked = res.oked
                obj.director = res.director
                obj.accounter = res.accounter
                obj.mobileNumber = res.mobileNumber
                obj.regionName = res.addressDto.regionName
                obj.districtName = res.addressDto.districtName
                obj.additional = res.addressDto.additional
                this.json_data.push(obj)
            })
        },
        selectList ($event) {
            if ($event === 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems();
        },
        fetchTableItems () {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            this.var_default_search_payload.regionId = this.activeDep.regionId
            crudAndListsService
                .searchListWithKeywordByRegion(MAIN_API_URL, this.var_default_search_payload, 'by-contractor')
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
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.id === opt);
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
        async regionSelected () {
            this.fetchTableItems()
        },
        editItem (id) {
            this.$router.push({ name: 'UpdateContractor', params: { id: id } })
        },
        deleteItem (id) {
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
    async created () {
        // GET REGIONS
        await helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
                // this.regionSelected(this.activeDep.regionId, true)
            })
            .catch(e => {
                console.log(e)
            })
        this.fetchTableItems()
    },
    /*
    WATCH */
    watch: {
        'var_default_search_payload.page': {
            handler () {
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
