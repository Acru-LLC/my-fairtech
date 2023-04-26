<template>
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
                    v-model="editingItem.nameUz"
                    :label="$t('column.name_uz')"
                    :placeholder="$t('column.name_uz')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <!-- PRODUCT_OR_SERVICE_TYPE_CHILDREN -->
                <!-- <BaseMultiselectWithValidation
                    v-if="isDominant"
                    rules="required"
                    class="required"
                    v-model="editingItem.directoryProductOrServiceTypeChildIds"
                    multiple
                    :close-on-select="false"
                    :hide-selected="true"
                    :options="productOrServiceTypesChildren.map(el => el.id)"
                    :label="$t('submodules.product_or_service_types_child.title')"
                    :custom-label="customLabelProductOrServiceTypeChild"
                    :placeholder="''"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                /> -->

                <!-- CODE -->
                <BaseInputWithValidation
                    rules="required"
                    class="required"
                    v-model="editingItem.code"
                    :label="$t('column.code')"
                    :placeholder="$t('column.code')"
                />
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    not-required
                    v-model="editingItem.nameLt"
                    :label="$t('column.name_lt')"
                    :placeholder="$t('column.name_lt')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <!-- <BaseInputWithValidation
                    v-if="isDominant"
                    rules="required"
                    class="required"
                    v-model="editingItem.code"
                    :label="$t('column.code')"
                    :placeholder="$t('column.code')"
                /> -->
                <BaseSelectWithValidation
                    v-model="editingItem.statusId"
                    class="required"
                    rules="required"
                    :label="$t('column.status')"
                    value-field="id"
                >
                    <template #first>
                        <b-form-select-option
                            :value="null"
                            disabled
                        >{{ $t('column.status') }}
                        </b-form-select-option>
                        <b-form-select-option
                            v-for="(status, index) in statuses"
                            :key="`${status}-${index}`"
                            :value="status.id"
                        >{{
                getName({
                  nameRu: status.nameRu,
                  nameLt: status.nameLt,
                  nameUz: status.nameUz,
                })
              }}
                        </b-form-select-option>
                    </template>
                </BaseSelectWithValidation>
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    not-required
                    v-model="editingItem.nameRu"
                    :label="$t('column.name_ru')"
                    :placeholder="$t('column.name_ru')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <!-- <BaseSelectWithValidation
                    v-if="isDominant"
                    v-model="editingItem.statusId"
                    class="required"
                    rules="required"
                    :label="$t('column.status')"
                    value-field="id"
                >
                    <template #first>
                        <b-form-select-option
                            :value="null"
                            disabled
                        >{{ $t('column.status') }}
                        </b-form-select-option>
                        <b-form-select-option
                            v-for="(status, index) in statuses"
                            :key="`${status}-${index}`"
                            :value="status.id"
                        >{{
                getName({
                  nameRu: status.nameRu,
                  nameLt: status.nameLt,
                  nameUz: status.nameUz,
                })
              }}
                        </b-form-select-option>
                    </template>
                </BaseSelectWithValidation> -->
            </b-col>
        </b-row>

        <!-- <b-row>
        <b-col
            sm="12"
            md="6"
        >
            <BaseInputWithValidation
                not-required
                v-model="editingItem.nameEn"
                :label="$t('column.name_en')"
                :placeholder="$t('column.name_en')"
            />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
            <BaseInputWithValidation
                not-required
                v-model="editingItem.sizeEn"
                :label="$t('column.ad_size_en')"
                :placeholder="$t('column.ad_size_en')"
            />
        </b-col>
    </b-row> -->
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/product-or-service-types'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateFormProductOrServiceTypes",
    props: {
        customIsModeCreate: {
            type: Boolean,
            default: false
        }
    },
    /*
    * COMPONENTS */
    components: {},
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            statuses: [],
            productOrServiceTypesChildren: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateProductOrServiceType'
        },
        isDominant () {
            return this.$route.params.cStatusCode == 'daminiriushiy'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        this.editingItem.contractorStatusId = this.$route.params.cStatusId
                        crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
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
        customLabelProductOrServiceTypeChild (opt) {
            let selected = this.productOrServiceTypesChildren.find(e => e.id == (opt.id ? opt.id : opt));
            if (selected) {
                return `${selected.code} - ${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })
                    }`
            }
            return ``;
        },
    },
    /*
    * CREATED */
    async created () {
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
        // GET STATUSES
        await helperService.getRefByCode('status')
            .then(res => {
                this.statuses = res.data.children
                if (this.isModeCreate) {
                    let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
                    if (activeStatus) {
                        this.editingItem.statusId = activeStatus.id
                    }
                }
            })
            .catch(e => {
                console.log(e)
            })

        // GET PRODUCT_OR_SERVICE_TYPES_CHILDREN
        /* crudAndListsService
            .searchListWithKeyword('directory/product-or-service-type-children', this.var_default_search_payload, this.$route.params.cStatusCode)
            .then((res) => {
                this.productOrServiceTypesChildren = res.data.list;
            })
            .catch(e => {
                console.log(e)
            }) */
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