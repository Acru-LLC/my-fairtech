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
                    rules="required|positiveNotZero"
                    class="required"
                    v-model="editingItem.coefficient"
                    name="coefficient"
                    :label="$t('column.coefficient')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    multiple
                    :close-on-select="false"
                    :hide-selected="true"
                    v-model="editingItem.directoryAdvertisementDesignTypesIds"
                    :options="adDesignTypes.map(e => e.id)"
                    :label="$t('column.ad_design_types')"
                    :placeholder="''"
                    :custom-label="customLabelAdDesignType"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                    withCreateAddition
                >
                    <template v-slot:append-slot>
                        <b-button
                            @click="adDesignTypeModal = true"
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

        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    rules="required"
                    class="required"
                    v-model="editingItem.decisionNumber"
                    :label="$t('column.decision_number')"
                />
            </b-col>
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
                <BaseTextareaWithValidation
                    not-required
                    v-model="editingItem.description"
                    max-rows="6"
                    :label="$t('column.reason')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
            </b-col>
        </b-row>
        <BaseModalForCreate
            v-model="adDesignTypeModal"
            mainApiUrl="directory/advertisement-design-type"
            createFormName="CreateFormDesignType"
            @new-ref-created="newRefCreated"
        />
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/advertisement-design-type_privilege_coefficients'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateFormAdPrivilegeCoefficient",
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
            statuses: [],
            adDesignTypes: [],
            adDesignTypeModal: false
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateAdvertisementPrivilegeCoefficient'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
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
        newRefCreated (newOptions, newId) {
            this.adDesignTypes = newOptions
            this.editingItem.designTypesIds.push(newId)
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