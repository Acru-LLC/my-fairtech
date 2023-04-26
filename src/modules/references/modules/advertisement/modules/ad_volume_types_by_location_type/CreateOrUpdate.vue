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
                    md="5"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryAdvertisementLocationTypeId"
                        :options="adLocationTypes.map(el => el.id)"
                        :label="$t('column.ad_location_type')"
                        :custom-label="customLabelAdLocationType"
                        :placeholder="''"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="7"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.directoryAdvertisementVolumeTypeIds"
                        :options="adVolumeTypes.map(e => e.id)"
                        :label="$t('submodules.ad_volume_types.title_plural')"
                        :placeholder="''"
                        :custom-label="customLabelAdVolumeType"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    >
                    </BaseMultiselectWithValidation>
                </b-col>
            </b-row>
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'directory/advertisement-formatters'
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
            adLocationTypes: [],
            adVolumeTypes: [],
            adDesignTypeModal: false
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateAdvertisementVolumeTypesByLocationType'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelAdVolumeType (opt) {
            let selected = this.adVolumeTypes.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
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
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (!this.isModeCreate) {
                        this.editingItem.id = this.editingItem.directoryAdvertisementLocationTypeId
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

        // GET AD_LOCATION_TYPES
        crudAndListsService
            .searchList('directory/advertisement-location-types', this.var_default_search_payload)
            .then((res) => {
                this.adLocationTypes = res.data.list;
            })
            .catch(e => {
                console.log(e)
            })

        // GET AD_VOLUME_TYPES
        crudAndListsService
            .searchList('directory/advertisement-volume-types', this.var_default_search_payload)
            .then((res) => {
                this.adVolumeTypes = res.data ? res.data.list : [];
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