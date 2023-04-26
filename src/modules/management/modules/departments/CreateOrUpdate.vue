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
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseTreeselectWithValidation
                        not-required
                        :placeholder="$t('column.parent_department')"
                        label="nameUz"
                        :form-label="$t('column.parent_department')"
                        ref="parentDepVeeName"
                        v-model="editingItem.parentId"
                        :options="departments"
                        :show-count="true"
                        :default-expand-level="1"
                        :normalizer="normalizer"
                        name="parentDepVeeName"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required"
                        v-model="editingItem.nameUz"
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
                        v-model="editingItem.shortName"
                        :label="$t('column.short_name')"
                        :placeholder="$t('column.short_name')"
                        class="required"
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
                        v-model="editingItem.curatorId"
                        :options="curators.map(e => e.id)"
                        :label="$t('column.curator')"
                        :custom-label="customLabelCurators"
                        :placeholder="$t('column.curator')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
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
                            >{{ $t('column.status') }}</b-form-select-option>
                        </template>
                      <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`" :value="status.id">{{
                          getName({
                            nameRu: status.nameRu,
                            nameLt: status.nameLt,
                            nameUz: status.nameUz,
                          })
                        }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
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
                        v-model="editingItem.typeId"
                        :options="types.map(e => e.id)"
                        :label="$t('submodules.department_types.title')"
                        :custom-label="customLabelDepType"
                        :placeholder="$t('submodules.department_types.title')"
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
                        v-model="contractorDto.vatCode"
                        :label="$t('column.vat_code')"
                        :placeholder="$t('column.vat_code')"
                    />
                    <!-- <div class="form-check form-check-right">
                        <input
                            v-if="isModeCreate"
                            v-model="isLegal"
                            class="form-check-input"
                            type="checkbox"
                            id="formCheckIsLegal"
                        />
                        <input
                            v-else
                            :checked="isLegal"
                            disabled
                            class="form-check-input"
                            type="checkbox"
                            id="formCheckIsLegal"
                        />
                        <label
                            class="form-check-label font-weight-normal"
                            for="formCheckIsLegal"
                        >
                            {{ $t('column.is_legal_org') }}
                        </label>
                    </div> -->
                </b-col>
            </b-row>

            <!-- CONTRACTOR_INFORMATION FORM -->
            <!-- <template v-if="isLegal"> -->
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        name="INN"
                        :rules="{required: true, regex: /\b\d{9}\b/}"
                        v-model="contractorDto.inn"
                        @keyup.enter="findContractorByInn"
                        with-input-append
                        mask="#########"
                        :label="$t('column.inn')"
                        placeholder="123456789"
                        class="required"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="findContractorByInn"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i class="mdi mdi-account-search"></i>
                            </b-button>
                            <!-- <b-tooltip
                                    target="contractorSearchButton"
                                    variant="primary"
                                >{{ $t('document.search_contractor') }}</b-tooltip> -->
                        </template>
                    </BaseInputWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <!-- <BaseInputWithValidation
                            rules="required"
                            name="contractorDtoFullName"
                            v-model="contractorDto.fullName"
                            :label="$t('column.full_name')"
                            :placeholder="$t('column.full_name')"
                            class="required"
                        /> -->
                    <BaseInputWithValidation
                        rules="required"
                        v-model="contractorDto.director"
                        :label="$t('column.director')"
                        :placeholder="$t('column.director')"
                        class="required"
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
                        v-model="contractorDto.mobileNumber"
                        :label="$t('column.mobile_number')"
                        mask="+998#########"
                        placeholder="+998#########"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <!-- <BaseInputWithValidation
                            rules="required"
                            name="contractorDtoShortName"
                            v-model="contractorDto.shortName"
                            :label="$t('column.short_name')"
                            :placeholder="$t('column.short_name')"
                            class="required"
                        /> -->
                    <BaseInputWithValidation
                        rules="required"
                        v-model="contractorDto.accounter"
                        :label="$t('column.accounter')"
                        :placeholder="$t('column.accounter')"
                        class="required"
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
                        v-model="contractorDto.addressDto.regionId"
                        :allowEmpty="false"
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
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="contractorDto.addressDto.districtId"
                        :allowEmpty="false"
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
                    <BaseInputWithValidation
                        :rules="{required: true, regex: /\b\d{5}\b/}"
                        class="required"
                        v-model="contractorDto.oked"
                        mask="#####"
                        :label="$t('column.oked')"
                        placeholder="12345"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        not-required
                        v-model="contractorDto.address"
                        :label="$t('column.address')"
                        :placeholder="$t('column.address')"
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

                </b-col>
            </b-row>
            <!-- </template> -->
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
            curators: [],
            regions: [],
            districts: [],
            statuses: [],
            editingItem: {},
            isLegal: false,
            contractorDto: {
                addressDto: {}
            }
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateDepartment'
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
                this.contractorDto.addressDto.districtId = null
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
        findContractorByInn () {
            if (this.computedObserver.fields.INN.valid)
                helperService.validateInnFromApi(this.contractorDto.inn)
                    .then(res => {
                        if (res.data) {
                            helperService.findContractorByInn(this.contractorDto.inn)
                                .then(res => {
                                    this.editingItem.shortName = res.data.regOrganisationDto.shortName
                                    this.editingItem.nameUz = res.data.regOrganisationDto.fullName

                                    this.contractorDto.accounter = res.data.regOrganisationDto.accounter
                                    this.contractorDto.director = res.data.regOrganisationDto.director
                                    this.contractorDto.shortName = res.data.regOrganisationDto.shortName
                                    this.contractorDto.fullName = res.data.regOrganisationDto.fullName
                                    this.contractorDto.addressDto.additional = res.data.regOrganisationDto.address
                                    this.contractorDto.addressDto.districtId = res.data.regOrganisationDto.districtId
                                    this.contractorDto.addressDto.regionId = res.data.regOrganisationDto.regionId
                                    this.regionSelected(this.contractorDto.addressDto.regionId, true)
                                    this.contractorDto.oked = res.data.regOrganisationDto.oked
                                    this.contractorDto.address = res.data.regOrganisationDto.address
                                    this.contractorDto.mobileNumber = res.data.regOrganisationDto.gdTelWork
                                })
                        } else {
                            this.computedObserver.setErrors({ INN: [this.$t('validator.inn')] });
                        }
                    })
                    .catch(e => {
                        console.log(e)

                    })
            else
                this.computedObserver.refs.INN.validate()
        },
        customLabelDepType (opt) {
            let selected = this.types.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                  nameRu: selected.nameRu,
                  nameLt: selected.nameLt,
                  nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
        customLabelDistrict (opt) {
            let selectedDistrict = this.districts.find(e => e.id == opt);
            if (selectedDistrict) {
                return `${this.getName({
                  nameRu: selectedDistrict.nameRu,
                  nameLt: selectedDistrict.nameLt,
                  nameUz: selectedDistrict.nameUz,
                })}`
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
                })}`
            }
            return ``;
        },
        customLabelCurators (opt) {
            let selected = this.curators.find(e => e.id == opt);
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
                    label: this.getName({
                      nameRu: node.nameRu,
                      nameLt: node.nameLt,
                      nameUz: node.nameUz,
                    }),
                }
            }
            return {
                id: node.id,
                label: this.getName({
                  nameRu: node.nameRu,
                  nameLt: node.nameLt,
                  nameUz: node.nameUz,
                }),
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
                        if (this.isLegal && this.contractorDto && this.contractorDto.inn) {
                            this.editingItem.inn = this.contractorDto.inn
                        }
                        let payload = {
                            contractorDto: this.isLegal ? Object.assign({}, this.contractorDto) : {},
                            departmentDto: Object.assign({}, this.editingItem)
                        }
                        helperService.updateDepartment(payload).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        if (this.isLegal && this.contractorDto && this.contractorDto.inn) {
                            this.editingItem.inn = this.contractorDto.inn
                            let payload = {
                                contractorDto: Object.assign({}, this.contractorDto),
                                departmentDto: Object.assign({}, this.editingItem)
                            }
                            helperService.createDepWithLegalInfo(payload).then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                        } else {
                            let payload = {
                                departmentDto: Object.assign({}, this.editingItem)
                            }
                            crudAndListsService.create('department', payload).then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                        }
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
            this.isLegal = true
            await crudAndListsService.getEmptyCustomUrl('department/get/legal-empty', true)
                .then(res => {
                    this.editingItem = Object.assign({}, res.data.departmentDto)
                    this.contractorDto = Object.assign({}, res.data.contractorDto)
                    if (this.$route.params.parentDepId) {
                        this.editingItem.parentId = this.$route.params.parentDepId
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById('department', this.$route.params.id, true)
                .then(res => {
                    this.editingItem = res.data.departmentDto
                    this.contractorDto = res.data.contractorDto
                    if (this.editingItem.inn) {
                        this.isLegal = true
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET DEPARTMENTS
        await crudAndListsService.searchList('department', this.var_default_search_payload)
            .then(res => {
                if (res.data.id)
                    this.departments.push(res.data)
            })
            .catch(e => {
                console.log(e)
            })

        // GET CURATORS
        await helperService.getCuratorsForDepartment()
            .then(res => {
                this.curators = res.data
            })
            .catch(e => {
                console.log(e)
            })

        // GET DEPARTMENT TYPES
        await crudAndListsService.searchList('directory/department-type', this.var_default_search_payload)
            .then(res => {
                this.types = res.data.list
            })
            .catch(e => {
                console.log(e)
            })
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
                this.regionSelected(this.contractorDto.addressDto.regionId, true)
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