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
                        v-model="editingItem.departmentTypeId"
                        :options="depTypes.map(el => el.id)"
                        :label="$t('submodules.department_types.title')"
                        :custom-label="customLabelDepType"
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
                        v-model="editingItem.departmentPermissionTypeIds"
                        :options="depPermTypes.map(e => e.id)"
                        :label="$t('submodules.department_permission_types.title')"
                        :placeholder="''"
                        :custom-label="customLabelDepPermType"
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
const MAIN_API_URL = 'department-permission-type-by-department-types'
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
            depTypes: [],
            depPermTypes: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateDepartmentPermissionsByDepartmentType'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelDepPermType (opt) {
            let selected = this.depPermTypes.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
        customLabelDepType (opt) {
            let selected = this.depTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
                        this.editingItem.id = this.editingItem.departmentTypeId
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
        await helperService.getRefByCode('department_permission_type')
            .then(res => {
                this.depPermTypes = res.data.children
            })
            .catch(e => {
                console.log(e)
            })

        // GET AD_LOCATION_TYPES
        crudAndListsService
            .searchList('directory/department-type', this.var_default_search_payload)
            .then((res) => {
                this.depTypes = res.data.list;
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