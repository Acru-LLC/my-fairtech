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
                <!-- <b-col
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
                </b-col> -->
                <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <b-col :cols="$can('republic', 'for reestr') ? 8 : 12">
                            <!-- DISABLED STATE -->
                            <BaseMultiselectWithValidation
                                v-if="editingItem.isRepublic"
                                not-required
                                disabled
                                :value="null"
                                :options="regions.map(e => e.regionId)"
                                :custom-styles="$can('republic', 'for reestr') ? `grid-template-columns: 38% 62%;` : ''"
                                :custom-label="customLabelRegion"
                                placeholder=""
                                :label="$t('column.region')"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                            <BaseMultiselectWithValidation
                                v-else
                                rules="required"
                                class="required"
                                v-model="editingItem.regionId"
                                :options="regions.map(e => e.regionId)"
                                :custom-styles="$can('republic', 'for reestr') ? `grid-template-columns: 38% 62%;` : ''"
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
                            cols="4"
                            v-if="$can('republic', 'for reestr')"
                        >
                            <div class="form-check form-check-right">
                                <input
                                    v-model="editingItem.isRepublic"
                                    @change="regionSelected(null, false, $event)"
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
                        </b-col>
                    </b-row>
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
                        v-model="editingItem.directoryProductOrServiceId"
                        @select="productOrServiceSelected"
                        :options="products.map(e => e.productOrServiceId)"
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
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        v-if="editingItem.isRepublic"
                        rules="required"
                        class="required"
                        v-model="editingItem.contractorId"
                        :allow-empty="false"
                        :clear-on-select="false"
                        :loading="isLoadingContractors"
                        :options="contractors.map(e => e.id)"
                        :label="$t('column.business_entity')"
                        placeholder=""
                        :custom-label="customLabelContractorForRepublic"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                    <BaseMultiselectWithValidation
                        v-else
                        rules="required"
                        class="required"
                        v-model="editingItem.contractorId"
                        :allow-empty="false"
                        :clear-on-select="false"
                        :loading="isLoadingContractors"
                        :options="contractors.map(e => e.contractorId)"
                        :label="$t('column.business_entity')"
                        placeholder=""
                        :custom-label="customLabelContractor"
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
const APPEND_API_URL_NATURAL = 'close-estestveniy'
const APPEND_API_URL_DOMINANT = 'close-daminiriushiy'
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
            return this.$route.name === 'CreateRemoveDocNaturalContractorReestr' || this.$route.name === 'CreateRemoveDocDominantContractorReestr'
        },
        productOrServicesByContractorId () {
            let foundContractor = this.contractors.find(el => el.contractorId == this.editingItem.contractorId)
            if (foundContractor) {
                return foundContractor.productOrServicesByDistrict
            } else {
                return []
            }
        },
        isDominant () {
            return this.$route.name === 'CreateRemoveDocDominantContractorReestr'
        },
        isNatural () {
            return this.$route.name === 'CreateRemoveDocNaturalContractorReestr'
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(async valid => {
                if (valid) {
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.makeAndReturnFormDataForBase64()).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        let payload = await this.makeAndReturnFormDataForBase64()
                        crudAndListsService.create(MAIN_API_URL, payload,
                            `for-${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}`).then(res => {
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
        contractorsByProductOrServiceId (productOrServiceId) {
            let foundEl = this.products.find(el => el.productOrServiceId == productOrServiceId)
            if (foundEl) {
                return foundEl.contractorsByDistrict
            } else {
                return []
            }
        },
        /* makeAndReturnFormData () {
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
        }, */
        getBase64 (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        async makeAndReturnFormDataForBase64 () {
            if (this.editingItem.supplementDocs[0].file.dataURL) {
                this.editingItem.file = this.editingItem.supplementDocs[0].file.dataURL
                return this.editingItem
            } else {
                let res = await this.getBase64(this.editingItem.supplementDocs[0].file)
                this.editingItem.file = res
                return this.editingItem
            }

        },
        async regionSelected ($event, dontResetDependent = false, forRepublicEvent) {
            if (!dontResetDependent) {
                this.productTypes = []
                this.editingItem.directoryProductOrServiceTypeId = null

                this.editingItem.contractorId = null
                this.contractors = []

                this.editingItem.directoryProductOrServiceId = null
            }
            if (this.editingItem.isRepublic) {
                helperService
                    .getReestrByRepublic(this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : '')
                    .then((res) => {
                        this.productTypes = res.data;
                    })
                    .catch(e => {
                        this.productTypes = [];
                    })
            } else if ($event || this.editingItem.regionId) {
                helperService
                    .getReestrByRegionId($event ? $event : this.editingItem.regionId, this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : '')
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
            let selected = this.products.find(e => e.productOrServiceId == opt);
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
                this.editingItem.directoryProductOrServiceId = null
                this.products = []
            }
            if ($event) {
                // GET PRODUCT_OR_SERVICES
                await this.fetchContractors(this.editingItem.regionId, $event)
                // await helperService.getProductsByProdectTypeId($event)
                //     .then(res => {
                //         this.products = res.data
                //     })
                //     .catch(e => {
                //         this.products = []
                //         console.log(e)
                //     })
            }
        },
        async contractorSelected ($event, dontResetDependent = false) {
            if (!dontResetDependent) {
                this.editingItem.directoryProductOrServiceId = null
                this.products = []
            }
        },
        async productOrServiceSelected ($event, dontResetDependent = false) {
            if (!dontResetDependent) {
                this.editingItem.contractorId = null
                this.contractors = []
            }
            if ($event) {
                if (this.editingItem.directoryProductOrServiceTypeId && this.editingItem.isRepublic) {
                    this.isLoadingContractors = true
                    await helperService.getContractorsByProdectOrServiceTypeIdAndProductOrServiceId(`${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?typeId=${this.editingItem.directoryProductOrServiceTypeId}&productOrServiceId=${$event}`)
                        .then(res => {
                            this.contractors = res.data
                        })
                        .catch(e => {
                            this.contractors = []
                            console.log(e)
                        })
                        .finally(() => {
                            this.isLoadingContractors = false
                        })
                } else {
                    this.contractors = this.contractorsByProductOrServiceId($event)
                }
            } else {
                this.contractors = []
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
        customLabelContractorForRepublic (opt) {
            let selected = this.contractors.find(e => e.id == opt);
            if (selected) {
                return `${selected.name}`
            }
            return ``;
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
            if (this.editingItem.isRepublic && typeId) {
                this.isLoadingProductOrServices = true
                helperService.searchReestrListByRepublic(`${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?typeId=${typeId}`)
                    .then(res => {
                        this.products = res.data
                    })
                    .catch(e => {
                        console.log(e)
                        this.products = []
                    })
                    .finally(() => {
                        this.isLoadingProductOrServices = false
                    })
            } else if (regionId && typeId) {
                this.isLoadingProductOrServices = true
                await crudAndListsService.searchList(MAIN_API_URL, null, `${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?regionId=${regionId}&typeId=${typeId}`)
                    .then(res => {
                        this.products = res.data
                    })
                    .catch(e => {
                        console.log(e)
                        this.products = []
                    })
                    .finally(() => {
                        this.isLoadingProductOrServices = false
                    })
            } else {
                this.editingItem.directoryProductOrServiceId = null
                this.products = []
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