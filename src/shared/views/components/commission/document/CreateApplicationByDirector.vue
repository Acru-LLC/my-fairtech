<template>
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >

        <b-card
            class="mt-3"
            no-body
        >
            <b-card-header class="text-center">
                <b style="font-size: 14px"> {{ $t( 'submodules.commission.by_director.title' ) }}</b>
            </b-card-header>
            <div class="p-4">
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseMultiselectWithValidation
                            not-required
                            v-model="editingItem.commissionPositionId"
                            :options="commission_position.map(e => e.id)"
                            :label="$t('submodules.commission.special_commission.title')"
                            :custom-label="customLabelcommissionPosition"
                            :placeholder="$t('submodules.commission.special_commission.title')"
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
                            not-required
                            v-model="editingItem.documentStatusId"
                            :options="document_status.map(e => e.id)"
                            :label="$t('submodules.commission.document_status.title')"
                            :custom-label="customLabelDocumentStatus"
                            :placeholder="$t('submodules.commission.document_status.title')"
                            open-direction="bottom"
                            :max-height="600"
                            :show-labels="false"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                        class="float-left"
                    >
                        <BaseDatePickerWithValidation
                            not-required
                            disable-after
                            custom-styles="grid-template-columns: 25% 75%;"
                            :label="$t('submodules.doc.create_entered_date_legal')"
                            v-model="editingItem.dateOfIncomingDocument"
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
                            not-required
                            v-model="editingItem.baseId"
                            :options="base_type.map(e => e.id)"
                            :label="$t('submodules.commission.base_type.title')"
                            :custom-label="customLabelBaseType"
                            :placeholder="$t('submodules.commission.base_type.title')"
                            open-direction="bottom"
                            :max-height="600"
                            :show-labels="false"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseTextareaWithValidation
                            not-required
                            v-model="editingItem.summary"
                            max-rows="4"
                            :label="$t('submodules.doc.summary')"
                            :placeholder="$t('submodules.doc.summary')"
                        />
                    </b-col>

                </b-row>

                <b-row class="mb-3">
                    <b-col
                        cols="6"
                        class=" mt-2"
                    >
                        <BaseMultiselectWithValidation
                            not-required
                            v-model="editingItem.innerEmployeeId"
                            @select="employeeSelected"
                            :options="employees.map(e => e.id)"
                            :label="$t('column.employee')"
                            :custom-label="customLabelEmployees"
                            :placeholder="$t('column.employee')"
                            open-direction="bottom"
                            :max-height="600"
                            :show-labels="false"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.executorFromOtherOrganization"
                            :label="$t('submodules.commission.executorOtherOrganization.title')"
                        />
                    </b-col>

                </b-row>

                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                        class="float-left"
                    >
                        <BaseDatePickerWithValidation
                            rules="required"
                            class="required"
                            custom-styles="grid-template-columns: 25% 75%;"
                            :label="$t('submodules.doc.completionTime')"
                            v-model="editingItem.completionTime"
                            disable-before
                            lang="ru"
                        ></BaseDatePickerWithValidation>
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.numberOfIncomingDocument"
                            :label="$t('submodules.doc.create_entered_number_legal')"
                            :placeholder="$t('submodules.doc.create_entered_number_legal')"
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
                            v-model="editingItem.senderId"
                            :has-next-page="hasNextPageContractors"
                            @reachedEndOfList="contractorReachedEndOfList"
                            @search-change="debounceSearchContractors"
                            :searchable="true"
                            :allow-empty="false"
                            preserve-search
                            :clear-on-select="false"
                            :loading="isLoadingContractors"
                            :internal-search="false"
                            :options="contractors.map(e => e.id)"
                            :label="$t('column.business_entity')"
                            :placeholder="$t('submodules.doc.contractor')"
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
                    <b-col
                        sm="12"
                        md="6"
                        class="float-left"
                    >
                        <b-button
                            id="popover-3"
                            variant="primary"
                        >{{ $t( 'auth.organisation_data' ) }}</b-button>
                        <b-popover
                            target="popover-3"
                            triggers="hover focus"
                        >
                            <!--              <template #title>{{ $t( 'auth.organisation_data' ) }}</template>-->
                            <div
                                v-if="currentApplicationSenderId"
                                style="font-size: 14px"
                            >
                                <b>{{ $t( 'column.name' ) }}: </b><span>{{ currentApplicationSenderId.fullName }}</span> <br><br>
                                <b>{{ $t( 'column.address' ) }}: </b><span>{{ currentApplicationSenderId.address }}</span><br><br>
                                <b>{{ $t( 'column.director' ) }}: </b><span>{{ currentApplicationSenderId.director }}</span><br><br>
                            </div>
                            <div v-else>
                                {{ $t( 'messages.please_select_contractor' ) }}
                            </div>
                        </b-popover>

                    </b-col>
                </b-row>

                <!-- FROM_TO_EMPLOYEES -->
                <from-to-employees
                    ref="fromToEmployeesRef"
                    @assignmentChanged="assignmentsChanged"
                ></from-to-employees>

                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <ValidationProvider
                            name="supplementDoc"
                            mode="passive"
                        >
                            <template v-slot:default="">
                                <BaseFileUploaderWithValidation
                                    not-required
                                    ref="supplementDocUploader"
                                    v-model="editingItem.applicationFiles"
                                    data-vv-name="supplementDocFile"
                                    data-vv-as="SupplementDocFile"
                                    :max-files="null"
                                    :max-fileSize="null"
                                    :label-on-top="false"
                                    :label="$t('submodules.doc.application_file')"
                                ></BaseFileUploaderWithValidation>
                            </template>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </ValidationObserver>
</template>
<script>
import FromToEmployees from './FromToEmployees.vue'
const MAIN_API_URL = 'before-commission/application'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateApplicationByDirector",
    props: {
        customIsModeCreate: {
            type: Boolean,
            default: false
        }
    },
    /*
    * COMPONENTS */
    components: { FromToEmployees },
    /*
    * DATA */
    data () {
        return {
            hasNextPageContractors: false,
            employees: [],
            contractors: [],
            document_status: [],
            appeal_type: [],
            commission_position: [],
            reception_method: [],
            base_type: [],
            isLoadingContractors: false,
            contractorSearchPayload: {},
            contractorCreateModal: false,
            addContractorModal: false,
            currentApplicationSenderId: null,
            editingItem: {},
            statuses: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateApplicationByDirector'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        assignmentsChanged () {
            this.editingItem.assignments = JSON.parse(JSON.stringify(this.$refs.fromToEmployeesRef.assignment))
        },
        employeeSelected (employeeId) {
            let tmpEmployee = this.employees.find(el => el.id == employeeId)
            /* this.employees.forEach(tmp => {
              if (tmp.id == employeeId) {
                tmpEmployee = tmp
              }
            }) */
            if (tmpEmployee) {
                this.editingItem.departmentId = tmpEmployee.departmentId
                let firstLetter = tmpEmployee.firstName.substring(0, 1)
                this.editingItem.username = (firstLetter + '.' + tmpEmployee.lastName).toLowerCase()
            }
        },
        customLabelReceptionMethod (opt) {
            let selected = this.reception_method.find(e => e.id == opt);
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
        customLabelBaseType (opt) {
            let selected = this.base_type.find(e => e.id == opt);
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
        customLabelAppealType (opt) {
            let selected = this.appeal_type.find(e => e.id == opt);
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
        customLabelcommissionPosition (opt) {
            let selected = this.commission_position.find(e => e.id == opt);
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
        customLabelDocumentStatus (opt) {
            let selected = this.document_status.find(e => e.id == opt);
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
        async debounceSearchContractors (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText);
            }, 1000);
        },
        contractorReachedEndOfList (e) {
            if (e && !this.isLoadingContractors) {
                this.fetchContractors()
            }
        },
        fetchContractorsWithKeyword (keyword, makeFirstSelected = false) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            // this.contractorSearchPayload.sortBy = []
            // this.contractorSearchPayload.sortBy.push('created')
            // this.contractorSearchPayload.sortDesc = []
            // this.contractorSearchPayload.sortDesc.push(false)
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
                        this.editingItem.contractorId = this.contractors.length ? this.contractors[0].id : null
                    }
                    if (!this.isModeCreate && this.editingItem.contractorId) {
                        let contractorFound = this.contractors.find(el => el.id == this.editingItem.contractorId)
                        if (!contractorFound && this.editingItem.contractorDto) {
                            this.contractors.push(this.editingItem.contractorDto)
                        }
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
        customLabelEmployees (opt) {
            let selected = this.employees.find(e => e.id == opt);
            if (selected) {
                return `${selected.firstName} ${selected.lastName} ${selected.middleName ? selected.middleName : ''}`
            }
            return ``;
        },
        customLabelAdContractor (opt) {
            let selected = this.contractors.find(e => e.id == (opt.id ? opt.id : opt));
            if (selected) {
                return `${selected.fullName}`
            }
            return ``;
        },
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName}`
            }
            return ``;
        },
        newRefCreated (newOptions, newId, formName) {
            if (formName == 'CreateFormContractor') {
                this.contractors = newOptions
                this.editingItem.contractorId = newId
            }
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
    watch: {
        'editingItem.senderId': {
            handler (newVal, oldVal) {
                this.contractors.map(e => {
                    if (e.id == newVal) {
                        this.currentApplicationSenderId = e
                        return e
                    }
                    return e
                })
            }
        },
    },
    /*
    * CREATED */
    async created () {
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
            await this.fetchContractors()

            await crudAndListsService.searchListWithKeyword('/employee', this.var_default_search_payload, 'inner', true)
                .then(res => {
                    this.employees = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })

            await crudAndListsService.searchList('directory/application/appeal-type', this.var_default_search_payload, null, true)
                .then(res => {
                    this.appeal_type = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
            await crudAndListsService.searchList('directory/application/document-status', this.var_default_search_payload, null, true)
                .then(res => {
                    this.document_status = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
            await crudAndListsService.searchList('directory/application/reception-method', this.var_default_search_payload, null, true)
                .then(res => {
                    this.reception_method = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
            await crudAndListsService.searchList('directory/application/base', this.var_default_search_payload, null, true)
                .then(res => {
                    this.base_type = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
            await crudAndListsService.searchList('directory/commission/commission-position', this.var_default_search_payload, null, true)
                .then(res => {
                    this.commission_position = res.data.list
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
.card-tabs-button {
    box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
        -0.2rem -0.2rem 0.5rem #ffffff;
    font-size: 12px;
}

.col-form-label {
    padding-top: 0;
}

ul {
    list-style-type: none;
}

.card-tabs {
    box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
        -0.2rem -0.2rem 0.5rem #ffffff;
    border-radius: 1rem 1rem 1rem 1rem;
    /* background-color: #f5f6f6; */
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.fromcenter {
    height: auto;
    font-size: 22px;
    text-align: center;
    color: #000;
    opacity: 0.8;
}

.fromcenter:after {
    display: block;
    content: "";
    border-bottom: solid 3px #9f9c9c;
    transform: scaleX(0);
    transition: transform 300ms ease-in-out;
}

.fromcenter:hover:after {
    transform: scaleX(1);
}
</style>

