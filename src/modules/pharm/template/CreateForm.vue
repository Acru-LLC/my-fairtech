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

                <BaseMultiselectWithValidation
                        v-model="editingItem1.regionId"
                        :allowEmpty="false"
                        :options="regions.map(e => e.id)"
                        :label="$t('column.connected_region')"
                        :custom-label="customLabelRegion"
                        :placeholder="$t('column.connected_region')"
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
                        v-model="editingItem1.statusId"
                        :label="$t('column.status')"
                        value-field="id"
                >
                    <template #first>
                        <b-form-select-option
                                :value="null"
                                disabled
                        >{{ $t('column.status') }}
                        </b-form-select-option>
                        <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`"
                                              :value="status.id">{{
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
                <BaseFileUploaderWithValidation
                        label-on-top
                        v-model="editingItem1.docFile"
                        data-vv-name="file"
                        data-vv-as="file"
                        :multiple="false"
                        :max-files="1"
                        :maxFilesize="100"
                        :label="$t('actions.excel_file_upload')"
                ></BaseFileUploaderWithValidation>
            </b-col>
            <b-col
                    sm="12"
                    md="6"
            >
<!--                <BaseInputWithValidation-->
<!--                        rules="required"-->
<!--                        class="required"-->
<!--                        v-model="editingItem1.code"-->
<!--                        :label="$t('column.code')"-->
<!--                        :placeholder="$t('column.code')"-->
<!--                />-->
                <BaseSelectWithValidation
                    v-model="editingItem1.code"
                    :label="$t('column.status')"
                    value-field="id"
                >
                    <template #first>
                        <b-form-select-option v-for="(code, index) in codes" :key="`${code}-${index}`"
                                              :value="code.value">{{
                                code.text
                            }}
                        </b-form-select-option>
                    </template>
                </BaseSelectWithValidation>
            </b-col>
        </b-row>
    </ValidationObserver>
</template>
<script>
import helperService from "@/shared/services/helper.service";

const MAIN_API_URL = 'templates/header'
import crudAndListsService from "@/shared/services/crud_and_list.service"
import pharmService from "@/modules/pharm/pharmService";

export default {
    name: "CreateForm",
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
    data() {
        return {
            editingItem1: {
                docFile: [],
                statusId: null,
                regionId: null,
                code: ''
            },
            editingItem: {},
            statuses: [],
            codes: [
                { value:'LETTER', text: "So'rov xati" },
                { value:'DEED', text: "Sudga yo'llanma" },
                { value:'NOTICE', text: "Bildirgi" },
                { value:'ACT', text: "Dalolatnoma" }
            ],
            regions: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate() {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateTemplateHeader'
        },
        computedObserver() {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        // collectErr(key) {
        //     if (this.errors[key] !== undefined) {
        //         return this.errors[key];
        //     }
        //     return undefined;
        // },
        // hasError(key) {
        //     if (this.errors[key] !== undefined) {
        //         return true;
        //     }
        //     return false;
        // },
        customLabelRegion(opt) {
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
        treeClosed(veeName) {
            this.computedObserver.refs[veeName].validate();
        },
        normalizer(node) {
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
        makeAndReturnFormData() {
            let form = new FormData();
            this.editingItem1.docFile.forEach(f => {
                form.append("file", f.file);
            })
            form.append("regionId", this.editingItem1.regionId);
            form.append("code", this.editingItem1.code);
            return form
        },
        async save() {
            this.computedObserver.validate().then(async valid => {
                if (valid) {
                    // if (this.editingItem.id) {
                    //     crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
                    //         this.computedObserver.reset()
                    //         this.editingItem = Object.assign({}, {});
                    //         this.$router.go(-1)
                    //         this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                    //     })
                    // } else {
                    await pharmService
                        .saveFileEntity(`pharm/file/upload`, this.makeAndReturnFormData())
                        .then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                        })
                        .catch(e => console.log(e));

                    // crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
                    //     this.computedObserver.reset()
                    //     this.editingItem = Object.assign({}, {});
                    //     this.$router.go(-1)
                    //     this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                    // })
                    // }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
                }
            });
        }
    },
    /*
    * CREATED */
    async created() {
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