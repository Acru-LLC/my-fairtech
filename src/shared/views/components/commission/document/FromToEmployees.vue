<template>
    <!-- FROM_TO_EMPLOYEES -->
    <b-row class="mb-3">
        <b-col cols="12">
            <h5 class="m-0 text-center">
                {{ $t('submodules.employees.see_doc_chronology') }}
            </h5>
            <hr class="my-2">
        </b-col>

        <b-col
            v-for="(member, index) in assignment"
            :key="`from-to-employees-${index}`"
            cols="12"
        >
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="4"
                >
                    <BaseDatePickerWithValidation
                        rules="required"
                        class="required"
                        v-model="member.dateOfCreated"
                        disable-after
                        :label="$t('column.send_date')"
                        label-on-top
                        custom-styles="grid-template-columns: 0 100% 0 !important;"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        v-model="member.fromEmployee"
                        rules="required"
                        class="required"
                        :options="index == 0 ? employees : filteredFromEmployees"
                        :label="$t('column.from_whom')"
                        label-on-top
                        @select="employeeSelected"
                        :custom-label="customLabelEmployees"
                        :placeholder="''"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    >
                        <template
                            slot="singleLabel"
                            slot-scope="props"
                        >
                            <span class="option__desc"><span class="option__title"><strong>{{ props.option.employeeFullName }}</strong></span></span> <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentParentNameUz, nameLt: props.option.departmentParentNameLt, nameRu: props.option.departmentParentNameRu}) }}</span></span> / <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentNameUz, nameLt: props.option.departmentNameLt, nameRu: props.option.departmentNameRu}) }}</span></span>
                            <div><span class="option__small"><i>{{ getName({ nameUz: props.option.positionNameUz, nameLt: props.option.positionNameLt, nameRu: props.option.positionNameRu }) }}</i></span></div>
                        </template>
                        <template
                            slot="option"
                            slot-scope="props"
                        >
                            <span class="option__desc"><span class="option__title"><strong>{{ props.option.employeeFullName }}</strong></span></span> <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentParentNameUz, nameLt: props.option.departmentParentNameLt, nameRu: props.option.departmentParentNameRu}) }}</span></span> / <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentNameUz, nameLt: props.option.departmentNameLt, nameRu: props.option.departmentNameRu}) }}</span></span>
                            <div><span class="option__small"><i>{{ getName({ nameUz: props.option.positionNameUz, nameLt: props.option.positionNameLt, nameRu: props.option.positionNameRu }) }}</i></span></div>
                        </template>
                    </BaseMultiselectWithValidation>
                </b-col>
                <!-- <b-col
                    sm="12"
                    md="2"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="member.processId"
                        :options="processes.map(e => e.id)"
                        :label="$t('submodules.process.title')"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelProcess"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    >
                    </BaseMultiselectWithValidation>
                </b-col> -->
                <b-col
                    sm="12"
                    md="2"
                    class="d-flex align-items-end justify-content-end"
                >
                    <b-btn
                        v-if="index == assignment.length - 1"
                        variant="success"
                        class="mr-2"
                        size="sm"
                        @click="addMember"
                    ><i class="mdi mdi-plus"></i></b-btn>
                    <b-btn
                        v-if="assignment.length > 1 && index != 0"
                        variant="danger"
                        size="sm"
                        @click="assignment.splice(index, 1)"
                    ><i class="mdi mdi-trash-can"></i></b-btn>
                </b-col>
            </b-row>
            <b-row
                v-for="(toMember, toIndex) in member.toEmployees"
                :key="`${toIndex}-toEmployee`"
            >
                <b-col
                    sm="12"
                    md="4"
                >
                    <BaseMultiselectWithValidation
                        v-model="toMember.toEmployee"
                        rules="required"
                        class="required"
                        :options="employees"
                        :label="$t('column.to_whom')"
                        label-on-top
                        @select="employeeSelected"
                        :custom-label="customLabelEmployees"
                        :placeholder="''"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    >
                        <template
                            slot="singleLabel"
                            slot-scope="props"
                        >
                            <span class="option__desc"><span class="option__title"><strong>{{ props.option.employeeFullName }}</strong></span></span> <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentParentNameUz, nameLt: props.option.departmentParentNameLt, nameRu: props.option.departmentParentNameRu}) }}</span></span> / <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentNameUz, nameLt: props.option.departmentNameLt, nameRu: props.option.departmentNameRu}) }}</span></span>
                            <div><span class="option__small"><i>{{ getName({ nameUz: props.option.positionNameUz, nameLt: props.option.positionNameLt, nameRu: props.option.positionNameRu }) }}</i></span></div>
                        </template>
                        <template
                            slot="option"
                            slot-scope="props"
                        >
                            <span class="option__desc"><span class="option__title"><strong>{{ props.option.employeeFullName }}</strong></span></span> <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentParentNameUz, nameLt: props.option.departmentParentNameLt, nameRu: props.option.departmentParentNameRu}) }}</span></span> / <br>
                            <span class="option__desc"><span class="option__title">{{ getName({nameUz: props.option.departmentNameUz, nameLt: props.option.departmentNameLt, nameRu: props.option.departmentNameRu}) }}</span></span>
                            <div><span class="option__small"><i>{{ getName({ nameUz: props.option.positionNameUz, nameLt: props.option.positionNameLt, nameRu: props.option.positionNameRu }) }}</i></span></div>
                        </template>
                    </BaseMultiselectWithValidation>
                </b-col>

                <b-col
                    sm="12"
                    md="3"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="toMember.mailingPurposeId"
                        :options="mailingPurposes.map(e => e.id)"
                        :label="$t('submodules.mailing_purpose.title')"
                        label-on-top
                        placeholder=""
                        :custom-label="customLabelMailingPurpose"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    >
                        <!-- <template v-slot:append-slot>
                                        <b-button
                                            @click="mailingPurposeModal = true"
                                            variant="outline-primary"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                        >
                                            <i class="mdi mdi-plus-circle"></i>
                                        </b-button>
                                    </template> -->
                    </BaseMultiselectWithValidation>
                    <!-- <BaseModalForCreate
                                    v-model="mailingPurposeModal"
                                    mainApiUrl="before-commission/directory/mailing-purpose"
                                    createFormName="CreateFormMailingPurpose"
                                    @new-ref-created="newRefCreated"
                                /> -->
                </b-col>
                <b-col
                    sm="12"
                    md="5"
                >
                    <b-row class="align-items-end h-100">
                        <b-col
                            v-if="index == assignment.length - 1"
                            sm="12"
                            md="7"
                        >
                            <b-form-checkbox
                                :id="`isProjectOwner-${toIndex}`"
                                v-model="toMember.isProjectOwner"
                                @change="isProjectOwnerChanged($event, index, toIndex)"
                                name="project-owner-checkbox"
                            >
                                <strong>{{ $t('column.is_project_owner') }}</strong> <span style="color: red;"> *</span>
                            </b-form-checkbox>
                        </b-col>
                        <b-col
                            sm="12"
                            md="5"
                        >
                            <b-btn
                                v-if="toIndex == member.toEmployees.length - 1 && index != 0"
                                variant="success"
                                class="mr-2"
                                size="sm"
                                @click="addMemberEmployee(index)"
                            ><i class="mdi mdi-plus"></i></b-btn>
                            <b-btn
                                v-if="member.toEmployees.length > 1 && index !== 0"
                                variant="danger"
                                size="sm"
                                @click="member.toEmployees.splice(toIndex, 1)"
                            ><i class="mdi mdi-trash-can"></i></b-btn>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <hr class="my-2">
        </b-col>
    </b-row>
    <!-- END OF FROM_TO_EMPLOYEES FORM -->
</template>

<script>
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
export default {
    name: 'FromToEmployees',
    /* 
    DATA */
    data () {
        return {
            mailingPurposeModal: false,
            mailingPurposes: [],
            processModal: false,
            processes: [],
            employees: [],
            assignment: [{ id: null, employeeId: null, toEmployees: [{}] }],
            filteredFromEmployees: []
        }
    },
    /* 
    METHODS */
    methods: {
        isProjectOwnerChanged (e, index, toIndex = null) {
            this.assignment = this.assignment.map((a, i) => {
                this.$set(a, 'toEmployees', a.toEmployees.map((emp, idx) => {
                    if (index == i && toIndex == idx) {
                        this.$set(emp, 'isProjectOwner', e)
                    } else {
                        this.$set(emp, 'isProjectOwner', false)
                    }
                    return emp
                })) 
                return a
            })
        },
        employeeSelected () {
            // this.$emit('employeeSelected')
        },
        addMemberEmployee (memberIndex) {
            this.assignment[memberIndex].toEmployees.push({})
        },
        addMember () {
            this.assignment.push({ id: this.assignment.length + 1, employeeId: null, toEmployees: [{}] })
            this.isProjectOwnerChanged(false)
        },
        deleteMember (index) {
            if (index !== 0) {
                this.assignment.splice(index, 1)
            }
        },
        customLabelMailingPurpose (opt) {
            let selected = this.mailingPurposes.find(e => e.id == opt);
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
        customLabelProcess (opt) {
            let selected = this.processes.find(e => e.id == opt);
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
        customLabelEmployees (opt) {
            let selected = this.employees.find(e => e.id == opt.id);
            if (selected) {
                return `${selected.employeeFullName} (${this.getName({ nameUz: selected.departmentParentNameUz, nameLt: selected.departmentParentNameLt, nameRu: selected.departmentParentNameRu })})`
            }
            return ``;
        },
    },
    /* 
    WATCH */
    watch: {
        assignment: {
            deep: true,
            handler (newVal, oldVal) {
                this.$emit('assignmentChanged')
                this.filteredFromEmployees = []
                newVal.forEach(member => {
                    if (member.toEmployees && member.toEmployees.length) {
                        member.toEmployees.forEach(toEmp => {
                            if (toEmp.toEmployee) {
                                let foundIdx = this.filteredFromEmployees.findIndex(el => el.employeeId == toEmp.toEmployee.employeeId)
                                if (foundIdx < 0 && toEmp.toEmployee.employeeId) {
                                    let indexInAssignment = newVal.findIndex(o => {
                                        if (o.fromEmployee && o.fromEmployee.employeeId) {
                                            return o.fromEmployee.employeeId == toEmp.toEmployee.employeeId
                                        } else {
                                            return false
                                        }
                                    })
                                    if (indexInAssignment < 0) {
                                        this.filteredFromEmployees.push(toEmp.toEmployee)
                                    } else {
                                        let idxInFromEmps = this.filteredFromEmployees.findIndex(fEmp => fEmp.employeeId == toEmp.toEmployee.employeeId)
                                        if (idxInFromEmps > -1) {
                                            this.filteredFromEmployees.splice(idxInFromEmps, 1)
                                        }
                                    }
                                } else if (foundIdx > -1) {
                                    /* let indexInAssignment = newVal.findIndex(o => {
                                        if (o.fromEmployee && o.fromEmployee.employeeId) {
                                            return o.fromEmployee.employeeId == toEmp.toEmployee.employeeId
                                        } else {
                                            return false
                                        }
                                    })
                                    if (indexInAssignment > -1) {
                                        this.filteredFromEmployees.splice(foundIdx, 1)
                                    } */
                                }
                            }
                        })
                    }
                });
            }
        }
    },
    /* 
    CREATED */
    async created () {
        this.var_default_search_payload.itemsPerPage = 500
        // FETCH USERS WITH EMPLOYEES
        await crudAndListsService.searchListWithKeyword('user', this.var_default_search_payload, 'inner', true)
            .then(res => {
                this.employees = res.data.list
            })
            .catch(e => {
                console.log(e)
            })

        // FETCH MAILING_PURPOSE
        await crudAndListsService.searchList('before-commission/directory/mailing-purpose', this.var_default_search_payload, null, true)
            .then(res => {
                this.mailingPurposes = res.data.list
            })
            .catch(e => {
                console.log(e)
            })
    }
}
</script>