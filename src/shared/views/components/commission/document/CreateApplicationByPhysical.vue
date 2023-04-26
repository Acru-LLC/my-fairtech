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
                <b style="font-size: 14px"> {{ $t( 'submodules.doc.applicant' ) }}</b>
            </b-card-header>

            <div class="p-4">
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            rules="required"
                            class="required"
                            v-model="editingItem.applicantSecondName"
                            :label="$t('auth.last_name')"
                            :placeholder="$t('auth.last_name')"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            rules="required"
                            class="required"
                            v-model="editingItem.applicantFirstName"
                            :label="$t('auth.first_name')"
                            :placeholder="$t('auth.first_name')"
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
                            v-model="editingItem.applicantMiddleName"
                            :label="$t('auth.middle_name')"
                            :placeholder="$t('auth.middle_name')"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.address"
                            :label="$t('submodules.doc.address')"
                            :placeholder="$t('submodules.doc.address')"
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
                            v-model="editingItem.confirmationDocumentId"
                            :options="confirmation_document.map(e => e.id)"
                            :label="$t('submodules.commission.confirmation_document.title')"
                            :custom-label="customLabelConfirmationDocument"
                            :placeholder="$t('submodules.commission.confirmation_document.title')"
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
                            not-required
                            v-model="editingItem.receptionMethodId"
                            :options="reception_method.map(e => e.id)"
                            :label="$t('submodules.doc.method_of_reception')"
                            :custom-label="customLabelReceptionMethod"
                            :placeholder="$t('submodules.doc.method_of_reception')"
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
                            v-model="editingItem.appealTypeId"
                            :options="appeal_type.map(e => e.id)"
                            :label="$t('submodules.commission.appeal_type.title')"
                            :custom-label="customLabelAppealType"
                            :placeholder="$t('submodules.commission.appeal_type.title')"
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
                </b-row>
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.numberOfOutgoingDocument"
                            :label="$t('submodules.doc.entered_number_physical')"
                            :placeholder="$t('submodules.doc.entered_number_physical')"
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
                            :label="$t('submodules.doc.entered_date_physical')"
                            v-model="editingItem.dateOfOutgoingDocument"
                            lang="ru"
                        ></BaseDatePickerWithValidation>
                    </b-col>
                </b-row>
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.numberOfIncomingDocument"
                            :label="$t('submodules.doc.create_entered_number_physical')"
                            :placeholder="$t('submodules.doc.create_entered_number_physical')"
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
                            :label="$t('submodules.doc.create_entered_date_physical')"
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
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.nameOfOrganizationWasSent"
                            :label="$t('submodules.doc.other_contragent')"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                        class="float-left"
                    >
                        <BaseDatePickerWithValidation
                            rules="required"
                            class="required"
                            disable-before
                            custom-styles="grid-template-columns: 25% 75%;"
                            :label="$t('submodules.doc.completionTime')"
                            v-model="editingItem.completionTime"
                            lang="ru"
                        ></BaseDatePickerWithValidation>
                    </b-col>
                </b-row>
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            :rules="{email: true, required: false}"
                            placeholder="meningEmail@gmail.com"
                            v-model="editingItem.email"
                            :label="$t('column.mail')"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseInputWithValidation
                            not-required
                            v-model="editingItem.contractorPhoneNumber"
                            :label="$t('column.phone_number')"
                            mask="+998#########"
                            placeholder="+998#########"
                        />
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
                        <BaseTextareaWithValidation
                            not-required
                            v-model="editingItem.summary"
                            max-rows="8"
                            :label="$t('submodules.doc.summary')"
                            :placeholder="$t('submodules.doc.summary')"
                        />
                    </b-col>
                </b-row>
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
    name: "CreateApplicationByPhysical",
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
            confirmation_document: [],
            reception_method: [],
            document_status: [],
            appeal_type: [],
            addContractorModal: false,
            editingItem: {},
            statuses: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateApplicationByPhysical'
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
        customLabelPosition (opt) {
            let selected = this.positions.find(e => e.id == opt);
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
        customLabelConfirmationDocument (opt) {
            let selected = this.confirmation_document.find(e => e.id == opt);
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
        this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })

            await crudAndListsService.searchList('directory/commission/confirmation-document', this.var_default_search_payload, null, true)
                .then(res => {
                    this.confirmation_document = res.data.list
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
