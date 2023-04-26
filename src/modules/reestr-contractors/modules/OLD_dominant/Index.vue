<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
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
                        <div class="col-sm-4">
                            <!-- REGIONS -->
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
                        </div>
                        <div class="col-sm-8">
                            <div class="text-sm-end">
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
                            <strong>{{ data.index + 1 }}</strong>
                        </template>

                        <!-- STATUS -->
                        <template #cell(product_or_service_type)="data">
                            <strong>{{
                                getName({
                                    nameRu: data.item.typeNameRu,
                                    nameLt: data.item.typeNameLt,
                                    nameUz: data.item.typeNameUz,
                                })
                            }}</strong>
                        </template>

                        <!-- INNER TABLE FOR REESTR -->
                        <template #row-details="row">
                            <b-table
                                :items="row.item.reestr ? row.item.reestr : []"
                                :fields="reestrTableFields"
                                :busy="row.item.loadingInnerData"
                                bordered
                                small
                                hover
                                show-empty
                                striped
                            >

                                <!-- NUMBER OF ITEM -->
                                <template #cell(index)="innerData">
                                    {{
                                        innerData.index + 1
                                    }}
                                </template>

                                <template #cell(contractorFullName)="innerData">
                                    <router-link
                                        :to="{name: 'ReestrHistoryForContractorDominant', params: {id: innerData.item.contractorId}}"
                                        class="a-tag-underline-hover"
                                    >
                                        <strong>{{
                                            innerData.item.contractorFullName
                                        }}</strong>
                                    </router-link>
                                </template>

                                <template #cell(productOrServices)="innerData">
                                    <div class="d-flex align-items-center flex-wrap">
                                        <ul>
                                            <li
                                                v-for="(el, index) in innerData.item.productorservices"
                                                :key="`product-or-service-${index}`"
                                            >{{
                                        getName({
                                          nameRu: el.productOrServiceNameRu,
                                          nameLt: el.productOrServiceNameLt,
                                          nameUz: el.productOrServiceNameUz,
                                        })
                                      }}</li>
                                        </ul>
                                    </div>
                                </template>

                                <!-- ACTIONS -->
                                <!-- <template #cell(reestrActions)="innerData">
                                    <div class="general-table__actions d-flex justify-content-center">
                                        <b-btn
                                            class="text-decoration-none p-0"
                                            style="font-size: 1.2rem; margin-right: 1rem;"
                                        >
                                            <i class="mdi mdi-eye"></i>
                                        </b-btn>

                                    </div>
                                </template> -->

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
                                </b-btn>
                                <a
                                    style="font-size: 1.2rem;"
                                    :href="`${publicPath}${data.item.fileUrl}`"
                                    target="_blank"
                                    v-b-tooltip.hover
                                    :title="$t('actions.download')"
                                >
                                    <i class="mdi mdi-file-download-outline"></i>
                                </a> -->

                                <b-btn
                                    variant="link"
                                    class="text-decoration-none p-0"
                                    style="font-size: 1.2rem; margin-right: 1rem;"
                                >
                                    <i
                                        @click="fetchReestrDocsByTypeId(data.toggleDetails, data.item.typeId, data.index)"
                                        class="mdi mdi-clipboard-list edit"
                                    ></i>
                                </b-btn>
                            </div>
                        </template>

                        <!-- EMPTY SLOT -->
                        <template #empty="">
                            <h4 class="text-center">{{ regionId ? $t('messages.data_not_found') : $t('messages.please_select_region') }}</h4>
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
const APPEND_API_URL = 'daminiriushiy'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

export default {
    components: {},
    data () {
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
                { label: this.$t('column.product_or_service_type'), key: "product_or_service_type" },
                // { label: this.$t('column.products'), key: "products" },
                // { label: this.$t('column.order_number'), key: "orderNumber" },
                // { label: this.$t('column.added_date_to_reestr'), key: "reestrAcceptedDate" },
                // { label: this.$t('column.status'), key: "status" },
                {
                    label: this.$t('column.actions'),
                    key: "actions",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false
                },
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
        numberOfPages () {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
        }
    },
    methods: {
        fetchReestrDocsByTypeId (toggleDetails, typeId, index) {
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
        customLabelRegion (opt) {
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
        async regionSelected ($event, dontResetDistrict = false) {
            if ($event) {
                this.fetchTableItems()
            }
        },
        downloadExcel () {
            this.json_data = []
            this.tableItems.forEach(res => {
                let obj = {}
                obj.nameUz = res.nameUz
                obj.nameLt = res.nameLt
                obj.nameRu = res.nameRu
                this.json_data.push(obj)
            })
        },
        selectList ($event) {
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems();
        },
        async fetchTableItems () {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            /* this.var_default_search_payload.sortDesc.push(false)
            if (this.$i18n.locale == 'uz') {
                this.var_default_search_payload.sortBy.push('nameLt')
            } else if (this.$i18n.locale == 'ru') {
                this.var_default_search_payload.sortBy.push('nameRu')
            } else if (this.$i18n.locale == 'uzCyrillic') {
                this.var_default_search_payload.sortBy.push('nameUz')
            } */
            helperService
                .getReestrByRegionId(this.regionId, APPEND_API_URL)
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
        editItem (id) {
            this.$router.push({ name: 'UpdateDominantContractorReestr', params: { id: id } })
        }
    },
    /* CREATED */
    created () {
        // this.fetchTableItems()

        // GET REGIONS
        helperService.fetchRegionsForContractorReestrByCurrentUserId()
            .then(res => {
                this.regions = res.data
            })
            .catch(e => {
                console.log(e)
            })
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
.a-tag-underline-hover {
    :hover {
        text-decoration: underline !important;
    }
}
</style>