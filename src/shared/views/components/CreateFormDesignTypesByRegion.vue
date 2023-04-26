<template>
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
        <b-row class="mb-3">
            <b-col
                sm="12"
                md="4"
            >
                <BaseMultiselectWithValidation
                    v-if="isModeCreate"
                    rules="required"
                    class="required"
                    multiple
                    :close-on-select="false"
                    :hide-selected="true"
                    v-model="editingItem.regionIds"
                    :options="regions.map(e => e.id)"
                    :label="$t('column.region')"
                    :custom-label="customLabelRegion"
                    :placeholder="$t('column.region')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
                <BaseMultiselectWithValidation
                    v-else
                    rules="required"
                    class="required"
                    v-model="editingItem.regionId"
                    :options="regions.map(e => e.id)"
                    :label="$t('column.region')"
                    :custom-label="customLabelRegion"
                    :placeholder="$t('column.region')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
            </b-col>
            <b-col
                sm="12"
                md="8"
                class="mb-3"
            >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    v-model="editingItem.directoryAdvertisementLocationTypeId"
                    :options="adLocationTypes.map(el => el.id)"
                    :label="$t('column.ad_location_type')"
                    :placeholder="$t('column.ad_location_type')"
                    :custom-label="customLabelAdLocationType"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
            </b-col>
            <b-col
                sm="12"
                md="12"
            >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    multiple
                    :close-on-select="false"
                    :hide-selected="true"
                    v-model="editingItem.designTypesIds"
                    :options="adDesignTypes.map(e => e.id)"
                    :label="$t('column.ad_design_types')"
                    :custom-label="customLabelAdDesignType"
                    :placeholder="$t('column.ad_design_types')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                    withCreateAddition
                >
                    <template v-slot:append-slot>
                        <b-button
                            @click="addDesignType = true"
                            variant="outline-primary"
                            id="contractorSearchButton"
                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                        >
                            <i class="mdi mdi-plus-circle"></i>
                        </b-button>
                    </template>
                </BaseMultiselectWithValidation>
            </b-col>
        </b-row>
        <BaseModalForCreate
            v-model="addDesignType"
            mainApiUrl="directory/advertisement-design-type"
            createFormName="CreateFormDesignType"
            @new-ref-created="newRefCreated"
        />
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/advertisement-location_and_design_type_by_regions'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateFormDesignTypesByRegion",
    props: {
        customIsModeCreate: {
            type: Boolean,
            default: false
        }
    },
    /*
    * COMPONENTS */
    components: {
    },
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            regions: [],
            adLocationTypes: [],
            statuses: [],
            adDesignTypes: [],
            addDesignType: false
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateAdvertisementDesignTypesByRegion'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelAdLocationType (opt) {
            let selected = this.adLocationTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelRegion (opt) {
            let selectedRegion = this.regions.find(e => e.id == opt);
            if (selectedRegion) {
                return `${this.getName({
                    nameRu: selectedRegion.nameRu,
                    nameLt: selectedRegion.nameLt,
                    nameUz: selectedRegion.nameUz,
                })
                    }`
            }
            return ``;
        },
        newRefCreated (newOptions, newId) {
            this.adDesignTypes = newOptions
            this.editingItem.directoryAdvertisementDesignTypesIds.push(newId)
        },
        customLabelAdDesignType (opt) {
            let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        treeClosed (veeName) {
            this.computedObserver.refs[veeName].validate();
        },
        normalizer (node) {
            if (!node.children || node.children.length === 0) {
                delete node.children
                return {
                    id: node.id,
                    label: node.name,
                }
            }
            return {
                id: node.id,
                label: node.name,
                children: node.children && node.children.length > 0 ? node.children : [],
            }
        },
        customFilter (item, queryText, itemText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.code.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
        },
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (!this.isModeCreate) {
                        crudAndListsService.update(MAIN_API_URL, this.editingItem, `${this.editingItem.regionId}/${this.editingItem.directoryAdvertisementLocationTypeId}`).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
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
        }
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
            await crudAndListsService.getById(MAIN_API_URL, `${this.$route.params.regionId}/${this.$route.params.adLocationTypeId}`, false)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET REGIONS
        await helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
            })
            .catch(e => {
                console.log(e)
            })

        // GET AD_LOCATION_TYPES
        crudAndListsService
            .searchList('directory/advertisement-location-types', this.var_default_search_payload)
            .then((res) => {
                this.adLocationTypes = res.data.list;
            })
            .catch(e => {
                console.log(e)
            })

        /* // GET STATUSES
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
            }) */

        // GET AD_DESIGN_TYPES
        helperService
            .getAdDesignTypesByActiveStatus()
            .then((res) => {
                this.adDesignTypes = res.data;
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