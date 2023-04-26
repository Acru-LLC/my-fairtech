<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
        <CreateFormAdPrivilegeCoefficient ref="createOrUpdateFormRef"></CreateFormAdPrivilegeCoefficient>
    </base-create-or-update-wrapper>
</template>
<script>
import CreateFormAdPrivilegeCoefficient from "@/shared/views/components/CreateFormAdPrivilegeCoefficient";

const MAIN_API_URL = 'directory/advertisement-design-type_privilege_coefficients'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {
      CreateFormAdPrivilegeCoefficient
    },
    /*
    * DATA */
    data () {
        return {
            adDesignTypes: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateAdvertisementPrivilegeCoefficient'
        },
        computedObserver () {
            return this.$refs.createOrUpdateFormRef.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelAdDesignType (opt) {
            let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
            if (selected) {
                return `${selected.nameUz}`
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
                    if (this.$refs.createOrUpdateFormRef.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.$refs.createOrUpdateFormRef.editingItem).then(res => {
                            this.computedObserver.reset()
                          this.$refs.createOrUpdateFormRef.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.$refs.createOrUpdateFormRef.editingItem).then(res => {
                            this.computedObserver.reset()
                          this.$refs.createOrUpdateFormRef.editingItem = Object.assign({}, {});
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
    async created () {}
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