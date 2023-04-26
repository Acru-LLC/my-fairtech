<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
        <CreateFormProductOrServices ref="formProductOrServices"></CreateFormProductOrServices>
    </base-create-or-update-wrapper>
</template>
<script>
import CreateFormProductOrServices from "@/shared/views/components/CreateFormProductOrServicesEstestveniy";

const MAIN_API_URL = 'directory/product-or-services'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {
        CreateFormProductOrServices
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
            return this.$route.name === 'CreateProductOrServiceEstestveniy'
        },
        computedObserver () {
            return this.$refs.formProductOrServices.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.$refs.formProductOrServices.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.$refs.formProductOrServices.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formProductOrServices.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.$refs.formProductOrServices.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.$refs.formProductOrServices.editingItem = Object.assign({}, {});
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