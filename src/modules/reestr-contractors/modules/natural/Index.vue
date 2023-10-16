<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div v-if="isNatural" class="h4 mb-4 d-inline-block">{{ $t('submodules.reestr_contractors.natural_reestr_title') }}</div>
            <div v-else class="h4 mb-4 d-inline-block">{{ $t('submodules.reestr_contractors.dominant_reestr_title') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2 align-items-center">
                        <div class="col-sm-4">
                            <!-- REGIONS -->
                            <!-- DISABLED STATE -->
                            <BaseMultiselectWithValidation
                                v-if="localMainPageStoredData.isRepublic && $can('republic', 'for reestr')"
                                not-required
                                disabled
                                :value="null"
                                :options="regions.map(e => e.regionId)"
                                only-form-element
                                :custom-label="customLabelRegion"
                                :placeholder="$t('column.region')"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                            <BaseMultiselectWithValidation
                                v-else
                                class="required"
                                rules="required"
                                v-model="localMainPageStoredData.regionId"
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
                        <!-- IS_REPUBLIC CHECKBOX -->
                        <div
                            v-if="$can('republic', 'for reestr')"
                            class="col-sm-2"
                        >
                            <div class="form-check form-check-right">
                                <input
                                    v-model="localMainPageStoredData.isRepublic"
                                    class="form-check-input"
                                    type="checkbox"
                                    id="formCheckIsLegal"
                                />
                                <label
                                    class="form-check-label font-weight-normal"
                                    for="formCheckIsLegal"
                                >
                                    {{ $t('column.is_republic') }}
                                </label>
                            </div>
                        </div>

                        <div :class="$can('republic', 'for reestr') ? 'col-sm-6' : 'col-sm-8'">
                            <div class="text-sm-end">
                                <b-btn
                                    v-if="canAddToReestr"
                                    type="button"
                                    class="btn btn-success btn-rounded mb-2 me-2"
                                    :to="isNatural ? {name: 'CreateNaturalContractorReestr'} : isDominant ? {name: 'CreateDominantContractorReestr'} : '#'"
                                >
                                    <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add_to_reestr') }}
                                </b-btn>

                                <b-btn
                                    v-if="canRemoveFromReestr"
                                    type="button"
                                    class="btn btn-danger btn-rounded mb-2 me-2"
                                    :to="isNatural ? {name: 'CreateRemoveDocNaturalContractorReestr'} : isDominant ? {name: 'CreateRemoveDocDominantContractorReestr'} : '#'"
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
                        @row-clicked="rowClicked"
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
                                    <div class="d-flex align-items-center flex-wrap">
                                        <ul style="width: 100%;">
                                            <li
                                                v-for="(el, index) in innerData.item.contractorsByDistrict"
                                                :key="`product-or-service-${index}`"
                                            >
                                                <router-link
                                                    v-if="!el.childCount"
                                                    :to="{name: (isNatural && localMainPageStoredData.isRepublic) ? 'ReestrHistoryForRepublicContractorNatural' : isNatural ? 'ReestrHistoryForContractorNatural' : (isDominant && localMainPageStoredData.isRepublic) ? 'ReestrHistoryForRepublicContractorDominant' : isDominant ? 'ReestrHistoryForContractorDominant' : '#', params: {id: el.contractorId}}"
                                                    class="a-tag-underline-hover"
                                                >
                                                    <b-row class="my-1">
                                                        <b-col cols="8">
                                                            <strong>{{
                                                                el.contractorFullName
                                                            }} - <i>{{ el.contractorInn }}</i></strong>
                                                        </b-col>
                                                        <b-col
                                                            cols="4"
                                                            v-if="el.docStatusCode == 'PENDING'"
                                                        >
                                                            <b-badge
                                                                style="font-size: .7rem"
                                                                class="ml-5 a-tag-underline-hover"
                                                                :variant="el.docStatusCode == 'PENDING' ? 'warning' : el.docStatusCode == 'READY' ? 'success' : ''"
                                                            >
                                                                {{
                                                                    getName({
                                                                        nameRu: el.docStatusNameRu,
                                                                        nameLt: el.docStatusNameLt,
                                                                        nameUz: el.docStatusNameUz,
                                                                    })
                                                                }}
                                                            </b-badge>
                                                        </b-col>
                                                    </b-row>
                                                </router-link>
                                                <span
                                                    v-else
                                                    @click="parentContractorClicked(el, el.contractorInn, row, innerData.item)"
                                                    class="cursorPointer"
                                                >
                                                    <strong v-if="isDominant">
                                                        {{ $t('column.group_of_individuals') }}:
                                                    </strong>
                                                    {{
                                                    el.contractorFullName
                                                }} - <i>{{ el.contractorInn }}</i>
                                                    <strong>({{el.childCount}})</strong>
                                                </span>
                                                <div
                                                    v-if="el.showChildren"
                                                    class="d-flex align-items-center flex-wrap"
                                                >
                                                    <ul style="width: 100%;">
                                                        <li
                                                            v-for="(el2, index2) in el.children"
                                                            :key="`contractor-children-${index2}`"
                                                        >
                                                            <router-link
                                                                :to="{name: (isNatural && localMainPageStoredData.isRepublic) ? 'ReestrHistoryForRepublicContractorNatural' : isNatural ? 'ReestrHistoryForContractorNatural' : (isDominant && localMainPageStoredData.isRepublic) ? 'ReestrHistoryForRepublicContractorDominant' : isDominant ? 'ReestrHistoryForContractorDominant' : '#', params: {id: el2.id}}"
                                                                class="a-tag-underline-hover"
                                                            >
                                                                <b-row class="my-1">
                                                                    <b-col cols="8">
                                                                        <strong>{{
                                                                    el2.name
                                                                }} - <i>{{ el2.inn }}</i></strong>
                                                                    </b-col>
                                                                    <b-col
                                                                        cols="4"
                                                                        v-if="el2.docStatusCode == 'PENDING'"
                                                                    >
                                                                        <b-badge
                                                                            class="ml-5 a-tag-underline-hover"
                                                                            style="font-size: .7rem"
                                                                            :variant="el2.docStatusCode == 'PENDING' ? 'warning' : el2.docStatusCode == 'READY' ? 'success' : ''"
                                                                        >
                                                                            {{
                                                                                getName({
                                                                                    nameRu: el2.docStatusNameRu,
                                                                                    nameLt: el2.docStatusNameLt,
                                                                                    nameUz: el2.docStatusNameUz,
                                                                                })
                                                                            }}
                                                                        </b-badge>
                                                                    </b-col>
                                                                </b-row>
                                                            </router-link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    v-if="!localMainPageStoredData.isRepublic"
                                                    class="d-flex align-items-center flex-wrap"
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="(el2, index2) in el.districts"
                                                            :key="`product-or-service-district-${index2}`"
                                                        >{{
                                                            getName({
                                                            nameRu: el2.districtNameRu,
                                                            nameLt: el2.districtNameLt,
                                                            nameUz: el2.districtNameUz,
                                                            })
                                                        }}</li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </template>

                                <template #cell(productOrServices)="innerData">
                                    <strong>{{
                                            getName({
                                                nameRu: innerData.item.productOrServiceNameRu,
                                                nameLt: innerData.item.productOrServiceNameLt,
                                                nameUz: innerData.item.productOrServiceNameUz,
                                                })
                                        }}</strong>
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
                        </template>

                        <!-- EMPTY SLOT -->
                        <template #empty="">
                            <h4 class="text-center">{{ ((localMainPageStoredData.regionId && !localMainPageStoredData.isRepublic) || localMainPageStoredData.isRepublic) ? $t('messages.data_not_found') : $t('messages.please_select_region') }}</h4>
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
const APPEND_API_URL_DOMINANT = 'daminiriushiy'
const APPEND_API_URL_NATURAL = 'estestveniy'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'
import { mapMutations, mapState } from 'vuex'

export default {
    components: {},
    data () {
        return {
            loadingTableItems: false,
            regions: [],
            tableItems: [],
            tableFields: [
                {
                    label: "#",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false,
                    key: "index",
                },
                { label: this.$t('column.product_or_service_type'), tdClass: "cursorPointer", key: "product_or_service_type" },
                { label: this.$t('column.product_or_services_count'), key: "productOrServiceCount" },
                { label: this.$t('column.contractors_count'), key: "contractorCount" },
            ],
            reestrTableFields: [
                {
                    label: "#",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false,
                    key: "index",
                },
                { label: this.$t('submodules.product_or_services.title'), key: "productOrServices" },
                { label: this.$t('column.business_entity'), key: "contractorFullName" },
            ],
            localMainPageStoredData: {
                regionId: null,
                isRepublic: false,
                openedTypeIds: []
            }
        };
    },
    /*
    COMPUTED */
    computed: {
        ...mapState('reestrContractors', ['mainPageStoredDataForDominant', 'mainPageStoredDataForNatural']),
        computedLocalMainPageStoredData () {
            return JSON.stringify(this.localMainPageStoredData)
        },
        isDominant () {
            return this.$route.name === 'DominantReestrContractors' || this.$route.name === 'DominantReestrContractorsMain'
        },
        isNatural () {
            return this.$route.name === 'NaturalReestrContractors' || this.$route.name === 'NaturalReestrContractorsMain'
        },
        canAddToReestr () {
            if (this.isDominant) {
                return this.$can('create', 'contractor reestr document for acceptance daminiriushiy')
            } else if (this.isNatural) {
                return this.$can('create', 'contractor reestr document for acceptance estestveniy')
            }
            return false
        },
        canRemoveFromReestr () {
            if (this.isDominant) {
                return this.$can('create', 'contractor reestr document for close daminiriushiy')
            } else if (this.isNatural) {
                return this.$can('create', 'contractor reestr document for close estestveniy')
            }
            return false
        }
    },
    methods: {
        ...mapMutations('reestrContractors', ['setMainPageStoredData']),

        parentContractorClicked (contractor, inn, typeRow, productOrService) {
            this.$set(contractor, 'showChildren', !contractor.showChildren)
            if (contractor.showChildren && (!contractor.children || !(contractor.children ? contractor.children.length : contractor.children))) {
                this.$set(typeRow.item, 'loadingInnerData', true)
                if (inn) {
                    helperService
                        .searchReestrContractorListByParentId(`${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?typeId=${typeRow.item.typeId}&parentContractorId=${contractor.contractorId}&productOrServiceId=${productOrService.productOrServiceId}`)
                        .then((res) => {
                            this.$set(contractor, 'children', res.data)
                        })
                        .catch(e => {
                            this.$set(contractor, 'children', [])
                        })
                        .finally(() => {
                            this.$set(typeRow.item, 'loadingInnerData', false)
                        })
                } else {
                    helperService
                        .searchReestrContractorListByIndividualsGroupId(`${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?typeId=${typeRow.item.typeId}&groupOfIndividualsId=${contractor.contractorId}&productOrServiceId=${productOrService.productOrServiceId}`)
                        .then((res) => {
                            this.$set(contractor, 'children', res.data)
                        })
                        .catch(e => {
                            this.$set(contractor, 'children', [])
                        })
                        .finally(() => {
                            this.$set(typeRow.item, 'loadingInnerData', false)
                        })
                }
            }
        },
        typeOpenCloseHandler (typeId, forClose) {
            let foundIndex = this.localMainPageStoredData.openedTypeIds.findIndex(el => el == typeId)
            if (forClose && foundIndex > -1) {
                this.localMainPageStoredData.openedTypeIds.splice(foundIndex, 1)
            } else if (!forClose && foundIndex < 0) {
                this.localMainPageStoredData.openedTypeIds.push(typeId)
            }
            let savedOpenedTypeIds = JSON.parse(JSON.stringify(this.localMainPageStoredData.openedTypeIds))
            this.localMainPageStoredData.openedTypeIds = []
            this.$set(this.localMainPageStoredData, 'openedTypeIds', savedOpenedTypeIds)
        },
        rowClicked (item, index, e, fromCreated = false) {
            if (!fromCreated) {
                this.typeOpenCloseHandler(item.typeId, item._showDetails)
            }
            this.$set(item, '_showDetails', !item._showDetails)
            this.fetchReestrDocsByTypeId(item.typeId, index)
        },
        fetchReestrDocsByTypeId (typeId, index) {
            this.$set(this.tableItems[index], 'loadingInnerData', true)
            if (this.localMainPageStoredData.isRepublic) {
                helperService
                    .searchReestrListByRepublic(`${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?&typeId=${typeId}`)
                    .then((res) => {
                        this.$set(this.tableItems[index], 'reestr', res.data)
                    })
                    .catch(e => {
                        this.$set(this.tableItems[index], 'reestr', [])
                    })
                    .finally(() => {
                        this.$set(this.tableItems[index], 'loadingInnerData', false)
                    })
            } else {
                crudAndListsService
                    .searchList(MAIN_API_URL, null, `${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?regionId=${this.localMainPageStoredData.regionId}&typeId=${typeId}`)
                    .then((res) => {
                        this.$set(this.tableItems[index], 'reestr', res.data)
                    })
                    .catch(e => {
                        this.$set(this.tableItems[index], 'reestr', [])
                    })
                    .finally(() => {
                        this.$set(this.tableItems[index], 'loadingInnerData', false)
                    })
            }
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
        async regionSelected ($event) {
            if ($event) {
                this.fetchTableItems()
            }
        },
        openStoredTypes () {
            this.localMainPageStoredData.openedTypeIds.forEach(typeId => {
                let foundIndex = this.tableItems.findIndex(el => el.typeId == typeId)
                if (foundIndex > -1) {
                    this.rowClicked(this.tableItems[foundIndex], foundIndex, null, true)
                }
            })
        },
        async fetchTableItems () {
            this.loadingTableItems = true
            if (this.localMainPageStoredData.isRepublic) {
                helperService
                    .getReestrByRepublic(this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : '')
                    .then((res) => {
                        this.tableItems = res.data;
                        this.openStoredTypes()
                    })
                    .catch(e => {
                        this.tableItems = [];
                    })
                    .finally(() => {
                        this.loadingTableItems = false
                    })
            } else if (this.localMainPageStoredData.regionId) {
                helperService
                    .getReestrByRegionId(this.localMainPageStoredData.regionId, this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : '')
                    .then((res) => {
                        this.tableItems = res.data;
                        this.openStoredTypes()
                    })
                    .catch(e => {
                        this.tableItems = [];
                    })
                    .finally(() => {
                        this.loadingTableItems = false
                    })
            } else {
                this.tableItems = [];
                this.loadingTableItems = false
            }
        },
    },
    /* CREATED */
    created () {
        if (this.isDominant) {
            this.localMainPageStoredData = Object.assign({}, this.mainPageStoredDataForDominant)
        } else if (this.isNatural) {
            this.localMainPageStoredData = Object.assign({}, this.mainPageStoredDataForNatural)
        }
        // MAKE IS_REPUBLIC CHECKED
        if (!this.localMainPageStoredData.regionId && this.$can('republic', 'for reestr')) {
            this.localMainPageStoredData.isRepublic = true
        }

        // GET REGIONS
        helperService.fetchRegionsForContractorReestrByCurrentUserId()
            .then(res => {
                this.regions = res.data
                if (this.localMainPageStoredData.regionId && !this.localMainPageStoredData.isRepublic) {
                    this.fetchTableItems()
                }
            })
            .catch(e => {
                console.log(e)
            })
    },
    /*
    WATCH */
    watch: {
        computedLocalMainPageStoredData: {
            deep: true,
            handler (n, o) {
                let newVal = JSON.parse(n)
                let oldVal = JSON.parse(o)
                this.setMainPageStoredData({ data: newVal, reestrType: this.isDominant ? 'dominant' : this.isNatural ? 'natural' : '' })
                if (newVal.isRepublic != oldVal.isRepublic) {
                    this.fetchTableItems()
                }
            }
        }
    }
};
</script>

<style scoped lang='scss'>
::v-deep .cursorPointer {
    cursor: pointer;
    &:hover {
        strong {
            text-decoration: underline;
        }
        text-decoration: underline;
    }
}
.a-tag-underline-hover {
    &:hover {
        * {
            text-decoration: underline !important;
        }
    }
}
</style>
