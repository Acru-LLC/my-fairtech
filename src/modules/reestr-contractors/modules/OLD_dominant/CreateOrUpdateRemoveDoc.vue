<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="$t('actions.remove_from_reestr')"
    >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.orderNumber"
                        :label="$t('column.order_number')"
                        :placeholder="$t('column.order_number')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseDatePickerWithValidation
                        rules="required"
                        class="required"
                        :label="$t('column.removed_date_from_reestr')"
                        :placeholder="$t('column.removed_date_from_reestr')"
                        disable-after
                        v-model="editingItem.reestrClosedDate"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.regionId"
                        :options="regions.map(e => e.regionId)"
                        @select="regionSelected"
                        :allow-empty="false"
                        :label="$t('column.region')"
                        placeholder=""
                        :custom-label="customLabelRegion"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryProductOrServiceTypeId"
                        @select="productTypeSelected"
                        :allow-empty="false"
                        :options="productTypes.map(e => e.typeId)"
                        :label="$t('column.product_or_service_type')"
                        placeholder=""
                        :custom-label="customLabelProductType"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.contractorId"
                        :allow-empty="false"
                        :clear-on-select="false"
                        :loading="isLoadingContractors"
                        :options="contractors.map(e => e.contractorId)"
                        @select="contractorSelected"
                        :label="$t('column.business_entity')"
                        placeholder=""
                        :custom-label="customLabelContractor"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <!-- <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.directoryProductOrServiceIds"
                        :options="products.map(e => e.id)"
                        :label="$t('submodules.product_or_services.title')"
                        placeholder=""
                        :custom-label="customLabelProduct"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    /> -->
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.directoryProductOrServiceIds"
                        :options="productOrServicesByContractorId.map(e => e.productOrServiceId)"
                        :label="$t('submodules.product_or_services.title')"
                        placeholder=""
                        :custom-label="customLabelProduct"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :allow-empty="false"
                        :clear-on-select="false"
                        :loading="isLoadingProductOrServices"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <!-- <BaseInputWithValidation
                        rules="required|positiveNotZero"
                        class="required"
                        v-model="editingItem.governmentPercentage"
                        :label="$t('column.government_percentage')"
                        :placeholder="$t('column.government_percentage')"
                    /> -->
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        name="supplementDoc"
                        rules="required"
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                class="required"
                                ref="supplementDocUploader"
                                v-model="editingItem.supplementDocs"
                                data-vv-name="supplementDocFile"
                                data-vv-as="SupplementDocFile"
                                :max-files="1"
                                :label-on-top="false"
                                :label="$t('column.ilova')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
            </b-row>
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'reestr/contractor-reestr-documents'
const APPEND_API_URL = 'daminiriushiy'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateOrUpdateRemoveDoc",
    /*
    * COMPONENTS */
    components: {},
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            regions: [],
            hasNextPageContractors: false,
            hasNextPageProductOrServices: false,
            contractors: [],
            debounce: null,
            isLoadingContractors: false,
            isLoadingProductOrServices: false,
            contractorSearchPayload: {},
            productOrServicesSearchPayload: {},
            productTypes: [],
            products: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        computedObserver () {
            return this.$refs.observer
        },
        isModeCreate () {
            return this.$route.name === 'CreateRemoveDocDominantContractorReestr'
        },
        productOrServicesByContractorId () {
            let foundContractor = this.contractors.find(el => el.contractorId == this.editingItem.contractorId)
            if (foundContractor) {
                return foundContractor.productorservices
            } else {
                return []
            }
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.makeAndReturnFormData()).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.makeAndReturnFormData(),
                            `for-close-${APPEND_API_URL}`).then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        },
        /* makeAndReturnQueryParams () {
            let queryString = `contractorId=${this.editingItem.contractorId}
                         &directoryProductOrServiceTypeId=${this.editingItem.directoryProductOrServiceTypeId}
                         &governmentPercentage=${this.editingItem.governmentPercentage}
                         &orderNumber=${this.editingItem.orderNumber}
                         &reestrClosedDate=${this.editingItem.reestrClosedDate}`
            this.editingItem.directoryProductOrServiceIds.forEach(id => {
                queryString += `&directoryProductOrServiceIds=${id}`
            })
            return queryString
        }, */
        makeAndReturnFormData () {
            let form = new FormData();
            this.editingItem.supplementDocs.forEach(f => {
                form.append("file", f.file);
            })
            form.append("contractorId", this.editingItem.contractorId)
            form.append("regionId", this.editingItem.regionId)
            // form.append("directoryProductOrServiceTypeId", this.editingItem.directoryProductOrServiceTypeId)
            // form.append("governmentPercentage", this.editingItem.governmentPercentage)
            form.append("orderNumber", this.editingItem.orderNumber)
            form.append("reestrClosedDate", this.editingItem.reestrClosedDate)
            this.editingItem.directoryProductOrServiceIds.forEach(id => {
                form.append("directoryProductOrServiceIds", id)
            })
            return form
        },
        async regionSelected ($event, dontResetDependent = false) {
            if (!dontResetDependent) {
                this.productTypes = []
                this.editingItem.directoryProductOrServiceTypeId = null

                this.editingItem.contractorId = null
                this.contractors = []

                this.editingItem.directoryProductOrServiceIds = []
            }
            if ($event) {
                helperService
                    .getReestrByRegionId($event, APPEND_API_URL)
                    .then((res) => {
                        this.productTypes = res.data;
                    })
                    .catch(e => {
                        this.productTypes = [];
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
                })}`
            }
            return ``;
        },
        customLabelProduct (opt) {
            let selected = this.productOrServicesByContractorId.find(e => e.productOrServiceId == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.productOrServiceNameRu,
                    nameLt: selected.productOrServiceNameLt,
                    nameUz: selected.productOrServiceNameUz,
                })
                    }`
            }
            return ``;
        },
        customLabelProductType (opt) {
            let selected = this.productTypes.find(e => e.typeId == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.typeNameRu,
                    nameLt: selected.typeNameLt,
                    nameUz: selected.typeNameUz,
                })
                    }`
            }
            return ``;
        },
        async productTypeSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.editingItem.contractorId = null
                this.contractors = []
                this.editingItem.directoryProductOrServiceIds = []
                this.products = []
            }
            if ($event) {
                // GET CONTRACTORS
                await this.fetchContractors(this.editingItem.regionId, $event)
            }
        },
        async contractorSelected ($event, dontResetDependent = false) {
            if (!dontResetDependent) {
                this.editingItem.directoryProductOrServiceIds = []
                this.products = []
            }
        },
        /* contractorReachedEndOfList (e) {
            if (e) {
                this.fetchContractors()
            }
        }, */
        productOrServicesReachedEndOfList (e) {
            if (e) {
                this.fetchProductOrServices(this.editingItem.directoryProductOrServiceTypeId)
            }
        },
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.contractorId == opt);
            if (selected) {
                return `${selected.contractorFullName}`
            }
            return ``;
        },
        /* async debounceSearchProductOrServices (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText);
            }, 1000);
        }, */
        /* async debounceSearchContractors (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText);
            }, 1000);
        }, */
        fetchProductOrServicesWithKeyword (keyword) {
            this.products = []
            this.productOrServicesSearchPayload.page = 1
            this.productOrServicesSearchPayload.keyword = keyword ? keyword : ''
            this.fetchProductOrServices(this.editingItem.directoryProductOrServiceTypeId)
        },
        async fetchProductOrServices (typeId) {
            this.isLoadingProductOrServices = true
            await helperService.getProductOrServicesByTypeId(typeId, this.productOrServicesSearchPayload)
                .then(res => {
                    this.products.push(...res.data.list)
                    this.hasNextPageProductOrServices = res.data.total / this.productOrServicesSearchPayload.itemsPerPage > this.productOrServicesSearchPayload.page
                    this.productOrServicesSearchPayload.page += 1
                })
                .catch(e => {
                    console.log(e)
                    this.products = []
                })
                .finally(() => {
                    this.isLoadingProductOrServices = false
                })
        },
        /* fetchContractorsWithKeyword (keyword) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            this.fetchContractors()
        }, */
        async fetchContractors (regionId, typeId) {
            if (regionId && typeId) {
                this.isLoadingContractors = true
                await crudAndListsService.searchList(MAIN_API_URL, null, `${APPEND_API_URL}?regionId=${regionId}&typeId=${typeId}`)
                    .then(res => {
                        this.contractors = res.data
                    })
                    .catch(e => {
                        console.log(e)
                        this.contractors = []
                    })
                    .finally(() => {
                        this.isLoadingContractors = false
                    })
            } else {
                this.editingItem.contractorId = null
                this.contractors = []
            }
        },
    },
    /*
    * CREATED */
    async created () {
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.productOrServicesSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET CONTRACTORS
        // await this.fetchContractors()

        // GET REGIONS
        await helperService.fetchRegionsForContractorReestrByCurrentUserId()
            .then(res => {
                this.regions = res.data
            })
            .catch(e => {
                console.log(e)
            })
    }
}
</script>
<style scoped>
.col-form-label {
    padding-top: 0;
}

ul {
    list-style-type: none;
}
</style>