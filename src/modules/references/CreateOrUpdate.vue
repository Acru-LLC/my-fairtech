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
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.code"
                        :label="$t('column.code')"
                        :placeholder="$t('column.code')"
                    >
                        <!-- <template v-slot:append-slot>
                            <b-button
                                variant="outline-primary"
                                style="padding: 2px 10px; font-size: 20px;"
                                id="contractorSearchButton"
                            >
                                <i class="mdi mdi-account-search"></i>
                            </b-button>
                            <b-tooltip
                                target="contractorSearchButton"
                                variant="primary"
                            >{{ $t('document.search_contractor') }}</b-tooltip>
                        </template> -->
                    </BaseInputWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseTreeselectWithValidation
                        vee-name="parentDepVeeName"
                        rules="required"
                        class="required"
                        :placeholder="$t('column.parent_department')"
                        :label="$t('column.parent_department')"
                        ref="parentDep"
                        v-model="editingItem.parentId"
                        :options="departments"
                        :show-count="true"
                        :default-expand-level="1"
                        :normalizer="normalizer"
                        name="parentDep"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                </b-col>
            </b-row>

            <b-row>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required"
                        v-model="editingItem.fullname"
                        :label="$t('column.full_name')"
                        :placeholder="$t('column.full_name')"
                        class="required"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required"
                        v-model="editingItem.shortname"
                        :label="$t('column.short_name')"
                        :placeholder="$t('column.short_name')"
                        class="required"
                    />
                </b-col>
            </b-row>
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
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
            types: [],
            departments: [],
            editingItem: {},
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.path === '/management/department/create'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
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
                    if (this.editingItem.id) {
                        crudAndListsService.update('department', this.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create('department', this.editingItem).then(res => {
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
            await crudAndListsService.getEmpty('department').then(res => {
                this.editingItem = res.data
            })
        } else {
            await crudAndListsService.getById('department', this.$route.params.id, false, 'managementDepartment/setByIdResponse').then(res => {
                this.editingItem = res.data
            })
        }
        // GET DEPARTMENTS
        await crudAndListsService.searchList('department', this.var_default_search_payload).then(res => {
            if (res.data.id)
                this.departments.push(res.data)
        })
        // GET DEPARTMENT TYPES
        await helperService.getRefByCodeNew('department_type').then(res => {
            this.types = res.data.children
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