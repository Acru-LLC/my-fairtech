<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
        <CreateFormAdVolumeTypes ref="formSides"></CreateFormAdVolumeTypes>
    </base-create-or-update-wrapper>
</template>
<script>
import CreateFormAdVolumeTypes from "@/shared/views/components/CreateFormAdVolumeTypes";

const MAIN_API_URL = 'directory/advertisement-volume-types'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {
        CreateFormAdVolumeTypes
    },
    /*
    * DATA */
    data () {
        return {}
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateAdvertisementVolumeType'
        },
        computedObserver () {
            return this.$refs.formSides.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.$refs.formSides.editingItem.maxNotLimited) {
                        this.$refs.formSides.editingItem.maxBorder = 922337203685415
                    }
                    if (this.$refs.formSides.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.$refs.formSides.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formSides.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.$refs.formSides.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formSides.editingItem = Object.assign({}, {});
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