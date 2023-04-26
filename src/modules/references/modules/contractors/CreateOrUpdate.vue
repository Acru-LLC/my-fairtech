<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
        <CreateFormContractor ref="formContractor" @saved="$router.go(-1)"></CreateFormContractor>
    </base-create-or-update-wrapper>
</template>
<script>
import CreateFormContractor from "@/shared/views/components/CreateFormContractor";
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
// import crudAndListsService from "@/shared/services/crud_and_list.service"
// import helperService from "@/shared/services/helper.service"
const MAIN_API_URL = 'contractor'
export default {
    name: "CreateOrUpdate",
    /*
    * PROPS */
    props: {
        /* customIsModeCreate: {
            type: Boolean,
            default: false
        } */
    },
    /*
    * COMPONENTS */
    components: {
        CreateFormContractor
    },
    /*
    * DATA */
    data () {
        return {
            /* formOfOwnerships: [],
            regions: [],
            districts: [],
            statuses: [],
            editingItem: {
                addressDto: {}
            } */
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateContractor'
        },
        /* computedObserver () {
            return this.$refs.observer
        } */
    },
    /*
    * METHODS */
    methods: {
        /* setDefaultActiveStatus () {
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus) {
                this.editingItem.statusId = activeStatus.id
            }
        },
        async regionSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.editingItem.addressDto.districtId = null
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
        findContractorByInn (fromBlur = false) {
            if (this.computedObserver.fields.INN.valid || fromBlur)
                helperService.validateInnFromApi(this.editingItem.inn)
                    .then(res => {
                        if (res.data) {
                            helperService.getContractorInfoByInn(this.editingItem.inn)
                                .then(res => {
                                    this.editingItem = Object.assign({}, res.data)
                                    this.setDefaultActiveStatus()
                                    // FETCH DISTRICTS
                                    this.regionSelected(this.editingItem.addressDto.regionId, true)
                                })
                                .catch(e => {
                                    // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
                                })
                        } else {
                            this.computedObserver.setErrors({ INN: [this.$t('validator.inn')] });
                        }
                    })
                    .catch(e => {
                        console.log(e)

                    })
        },
        customLabelDistrict (opt) {
            let selectedDistrict = this.districts.find(e => e.id == opt);
            if (selectedDistrict) {
                return `${this.getName({
                    nameRu: selectedDistrict.nameRu,
                    nameLt: selectedDistrict.nameLt,
                    nameUz: selectedDistrict.nameUz,
                })
                    }`
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
                })
                    }`
            }
            return ``;
        },
        customLabelFormOfOwnership (opt) {
            let selected = this.formOfOwnerships.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })
                    }`
            }
            return ``;
        }, */
        save () {
            this.$refs.formContractor.save()
            /* this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.$refs.formContractor.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.$refs.formContractor.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formContractor.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.$refs.formContractor.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formContractor.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            }); */
        }
    },
    /*
    * CREATED */
    async created () {
        /* this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = Object.assign({}, res.data)
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id)
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
                    this.setDefaultActiveStatus()
                }
            })
            .catch(e => {
                console.log(e)
            })

        // GET REGIONS
        await helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
                this.regionSelected(this.editingItem.addressDto.regionId, true)
            })
            .catch(e => {
                console.log(e)
            })

        // GET FORM_OF_OWNERSHIP
        crudAndListsService
            .searchList('directory/form-of-ownerships', this.var_default_search_payload)
            .then((res) => {
                this.formOfOwnerships = res.data.list;
            })
            .catch(e => {
                console.log(e)
            }) */
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