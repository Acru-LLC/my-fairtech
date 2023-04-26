<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
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
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.zoneId"
                        :options="zones.map(e => e.id)"
                        :label="$t('column.zone')"
                        :custom-label="customLabelZone"
                        :placeholder="$t('column.zone')"
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
                        v-model="editingItem.regionId"
                        @select="regionSelected"
                        :options="regions.map(e => e.id)"
                        :label="$t('column.region')"
                        :custom-label="customLabelRegion"
                        :placeholder="$t('column.region')"
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
                    <BaseInputWithValidation
                        rules="required|positiveNotZero"
                        class="required"
                        v-model="editingItem.coefficient"
                        :label="$t('column.coefficient')"
                        :placeholder="$t('column.coefficient')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        v-if="isModeCreate"
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.districtIds"
                        :options="districts.map(e => e.id)"
                        :label="$t('column.district')"
                        :custom-label="customLabelDistrict"
                        :placeholder="$t('column.district')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                    <BaseMultiselectWithValidation
                        v-else
                        rules="required"
                        class="required"
                        v-model="editingItem.districtId"
                        :options="districts.map(e => e.id)"
                        :label="$t('column.district')"
                        :custom-label="customLabelDistrict"
                        :placeholder="$t('column.district')"
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
                    <BaseDatePickerWithValidation
                        rules="required"
                        class="required"
                        :label="$t('column.decision_date')"
                        :placeholder="$t('column.decision_date')"
                        v-model="editingItem.createdDate"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseTextareaWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.description"
                        max-rows="6"
                        :label="$t('column.reason')"
                        :placeholder="$t('column.reason')"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
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
                            >{{ $t('column.status') }}</b-form-select-option>
                          <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`" :value="status.id">{{
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
                <b-col
                    sm="12"
                    md="6"
                >
                </b-col>
            </b-row>
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'directory/coefficients'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {

    },
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            statuses: [],
            regions: [],
            districts: [],
            zones: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateZoneCoefficient'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        async regionSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.editingItem.districtIds = null
            }
            // GET DISTRICTS
            if ($event)
                await helperService.getGeoLocationsByParentId($event)
                    .then(res => {
                        this.districts = res.data
                    })
                    .catch(e => {
                        console.log(e)
                    })
        },
        customLabelDistrict (opt) {
            let selected = this.districts.find(e => e.id == opt);
            if (selected) {
                return `${
                    this.getName({
                      nameRu: selected.nameRu,
                      nameLt: selected.nameLt,
                      nameUz: selected.nameUz,
                    })
                }`
            }
            return ``;
        },
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.id == opt);
            if (selected) {
                return `${
                    this.getName({
                      nameRu: selected.nameRu,
                      nameLt: selected.nameLt,
                      nameUz: selected.nameUz,
                    })
                }`
            }
            return ``;
        },
        customLabelZone (opt) {
            let selected = this.zones.find(e => e.id == opt);
            if (selected) {
                return `${
                    this.getName({
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
        this.var_default_search_payload.itemsPerPage = 500;
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

        // GET REGIONS
        await helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
                this.regionSelected(this.editingItem.regionId, true)
            })
            .catch(e => {
                console.log(e)
            })

        // GET ZONES
        crudAndListsService
            .searchList('directory/advertisement-zone', this.var_default_search_payload)
            .then((res) => {
                this.zones = res.data.list;
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