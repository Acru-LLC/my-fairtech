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
                    v-model="editingItem.name"
                    :label="$t('column.name')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <BaseMultiselectWithValidation
                    not-required
                    v-model="editingItem.inn"
                    :has-next-page="hasNextPageContractors"
                    @reachedEndOfList="contractorReachedEndOfList"
                    @search-change="debounceSearchContractors"
                    :searchable="true"
                    preserve-search
                    :clear-on-select="false"
                    :loading="isLoadingContractors"
                    :internal-search="false"
                    :options="contractors.map(e => e.inn)"
                    :label="$t('column.inn')"
                    :placeholder="$t('column.inn')"
                    :custom-label="customLabelContractor"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                    with-create-addition
                >
                    <template v-slot:append-slot>
                        <b-button
                            @click="contractorCreateModal = true"
                            variant="outline-primary"
                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                        >
                            <i class="mdi mdi-plus-circle"></i>
                        </b-button>
                    </template>
                </BaseMultiselectWithValidation>
                <BaseModalForCreate
                    v-model="contractorCreateModal"
                    without-list-search
                    use-component-save-fn
                    mainApiUrl="contractor"
                    createFormName="CreateFormContractor"
                    @new-ref-created-without-list-search="newRefCreated"
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
                <BaseInputWithValidation
                    rules="positiveNotZero"
                    v-model="editingItem.percentage"
                    :label="$t('column.share_percentage')"
                />
            </b-col>
        </b-row>
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'reestr/group-of-individuals'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateFormGroupOfIndividuals",
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
            // CONTRACTOR SELECT_AND_CREATE VARS
            hasNextPageContractors: false,
            contractors: [],
            debounce: null,
            isLoadingContractors: false,
            contractorCreateModal: false,
            contractorSearchPayload: {},
            // ---------------------------------
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateGroupOfIndividuals'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        // CONTRACTOR SELECT_AND_CREATE METHODS
        contractorReachedEndOfList (e) {
            if (e && !this.isLoadingContractors) {
                this.fetchContractors()
            }
        },
        async debounceSearchContractors (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText);
            }, 1000);
        },
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.inn == opt);
            if (selected) {
                return `${selected.inn} - ${selected.fullName}`
            }
            return ``;
        },
        fetchContractorsWithKeyword (keyword, makeFirstSelected = false) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            this.fetchContractors(makeFirstSelected)
        },
        async fetchContractors (makeFirstSelected) {
            this.contractorSearchPayload.sortBy = []
            this.contractorSearchPayload.sortBy.push('created')
            this.contractorSearchPayload.sortDesc = []
            this.contractorSearchPayload.sortDesc.push(true)
            this.isLoadingContractors = true
            await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor')
                .then(res => {
                    this.contractors.push(...res.data.list)
                    this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
                    this.contractorSearchPayload.page += 1
                    if (makeFirstSelected) {
                        this.editingItem.parentId = this.contractors.length ? this.contractors[0].id : null
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.contractors = []
                })
                .finally(() => {
                    this.isLoadingContractors = false
                })
        },
        newRefCreated (formName) {
            if (formName == 'CreateFormContractor') {
                this.fetchContractorsWithKeyword('', true)
            }
        },
        // ------------------------------------
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
        // FOR CONTRACTOR SELECT_AND_ADD
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        await this.fetchContractors()
        // ---------------------------------
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