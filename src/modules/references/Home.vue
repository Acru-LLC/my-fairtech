<template>
    <div class="row">
        <div class="col-xl-5">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h3 class="card-title mb-0 org-str-title">{{ $t('not_translated.organizational_structure') }}</h3>
                        <!-- ACTIONS -->
                        <div class="org-str-actions">
                            <b-btn
                                variant="link"
                                class="text-decoration-none p-0"
                                :to="{name: 'CreateDepartment'}"
                            >
                                <i class="mdi mdi-plus-circle add"></i>
                            </b-btn>

                            <b-btn
                                variant="link"
                                class="text-decoration-none p-0"
                            >
                                <i
                                    @click="$emit('showRefModal', {dep: {}, forAdding: false})"
                                    class="mdi mdi-circle-edit-outline edit"
                                ></i>
                            </b-btn>

                            <b-btn
                                variant="link"
                                class="text-decoration-none p-0"
                            >
                                <i
                                    @click="onOpen({}.id)"
                                    class="mdi mdi-trash-can delete"
                                ></i>
                            </b-btn>
                        </div>
                    </div>

                    <!-- TREE VIEW -->
                    <ul
                        v-if="getDepartments.length > 0"
                        style="list-style-type: none;"
                    >
                        <template v-for="dep in getDepartments">
                            <org-str-tree-view
                                @showRefModal="showRefModal"
                                @deleteDep="deleteDepartment"
                                @toggleActiveClass="toggleActiveClass"
                                class="item"
                                :key="dep.id + 'dep'"
                                :department-for-tree="dep"
                            >
                            </org-str-tree-view>
                        </template>
                    </ul>
                    <template v-else>
                        <h5>Hozircha bo'limlar qo'shilmagan</h5>
                        <p>Qo'shish belgili tugmachaga bosib bo'linma qo'shishingiz mumkin</p>
                    </template>
                    <!-- TREE VIEW -->
                </div>
            </div>
        </div>
        <div class="col-xl-7">

            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-4 org-str-title">{{activeDep.id ? activeDep.name :`Tanlangan bo'limning ma'lumotlari`}}</h3>
                    <!-- SELECTED DEPARTMENT DETAILS -->
                    <div
                        v-if="activeDep.id"
                        class="table-responsive "
                    >
                        <table class="table table-nowrap mb-0">
                            <tbody>
                                <tr>
                                    <th scope="row">Test :</th>
                                    <td>test test</td>
                                    <th scope="row">Test :</th>
                                    <td>test test</td>
                                </tr>
                                <tr>
                                    <th scope="row">Test :</th>
                                    <td>(123) 123 1234</td>
                                    <th scope="row">Test :</th>
                                    <td>(123) 123 1234</td>
                                </tr>
                                <tr>
                                    <th scope="row">Test :</th>
                                    <td>test@gmail.com</td>
                                    <th scope="row">Test :</th>
                                    <td>test@gmail.com</td>
                                </tr>
                                <tr>
                                    <th scope="row">Test :</th>
                                    <td>Test</td>
                                    <th scope="row">Test :</th>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h5 v-else>
                        Ma'lumotlarni ko'rish uchun bo'limni tanlang
                    </h5>
                </div>
            </div>
            <!-- end card -->
        </div>
    </div>
    <!-- end row -->
</template>

<script>
import appConfig from "@/app.config";
import OrgStrTreeView from '@/modules/management/components/OrgStrTreeView.vue'

/**
 * Product-cart component
 */
export default {
    page: {
        title: "Departments",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {
        OrgStrTreeView
    },
    data () {
        return {
            title: "Departments",
            activeDep: {},
            getDepartments: [
                {
                    "id": 1,
                    "comment": "",
                    "name": "Qo'mita",
                    "shortName": "DUTY FREE",
                    "address": "",
                    "currencyId": 27,
                    "currencyCode": "EUR",
                    "currencyName": "EUR",
                    "typeId": 6,
                    "typeName": "SHOP",
                    "saleType": "RETAIL",
                    "phone": "",
                    "accountantFullName": "",
                    "inn": "",
                    "okonx": "",
                    "bankAccount": "",
                    "vatAccount": "",
                    "withRequisite": false,
                    "children": [
                        {
                            "id": 2,
                            "comment": "",
                            "parentId": 1,
                            "parentName": "DUTY FREE",
                            "name": "Central Apparat",
                            "shortName": "Tashkent",
                            "address": "",
                            "currencyId": 27,
                            "currencyCode": "EUR",
                            "currencyName": "EUR",
                            "typeId": 6,
                            "typeName": "SHOP",
                            "saleType": "RETAIL",
                            "phone": "",
                            "accountantFullName": "",
                            "inn": "",
                            "okonx": "",
                            "bankAccount": "",
                            "vatAccount": "",
                            "withRequisite": false,
                            "bankName": "",
                            "bankFilialName": "",
                            "cb": ""
                        },
                        {
                            "id": 3,
                            "comment": "",
                            "parentId": 1,
                            "parentName": "DUTY FREE",
                            "name": "AZPP",
                            "shortName": "Termez",
                            "address": "",
                            "currencyId": 27,
                            "currencyCode": "EUR",
                            "currencyName": "EUR",
                            "typeId": 5,
                            "typeName": "WAREHOUSE",
                            "saleType": "RETAIL",
                            "phone": "",
                            "accountantFullName": "",
                            "inn": "",
                            "okonx": "",
                            "bankAccount": "",
                            "vatAccount": "",
                            "withRequisite": false,
                            "bankName": "",
                            "bankFilialName": "",
                            "cb": ""
                        },
                        {
                            "id": 4,
                            "comment": "",
                            "parentId": 1,
                            "parentName": "DUTY FREE",
                            "name": "Hududlar",
                            "shortName": "Samarkand",
                            "address": "",
                            "typeId": 4,
                            "typeName": "COMPANY",
                            "saleType": "",
                            "phone": "",
                            "accountantFullName": "",
                            "inn": "",
                            "okonx": "",
                            "bankAccount": "",
                            "vatAccount": "",
                            "withRequisite": false,
                            "bankName": "",
                            "bankFilialName": "",
                            "cb": ""
                        }
                    ],
                    "bankName": "",
                    "bankFilialName": "",
                    "cb": ""
                }
            ]
        };
    },
    methods: {
        onOpen (smth) { },
        giveActiveClassToDep (treeArr, activeId) {
            for (var el of treeArr) {
                if (el.id == activeId) {
                    document.getElementById(`depId-${activeId}`).classList.add('active')
                }
                else {
                    document.getElementById(`depId-${el.id}`).classList.remove('active')
                }
                if (el.children && el.children.length > 0) {
                    this.giveActiveClassToDep(el.children, activeId);
                }
            }
        },
        showRefModal () { },
        deleteDepartment () { },
        toggleActiveClass (activeDep) {
            this.activeDep = Object.assign({}, activeDep)
            this.giveActiveClassToDep(this.getDepartments, activeDep.id)
        },
    }
};
</script>

<style scoped lang='scss'>
.org-str-actions {
    display: flex;
    min-width: 20%;
    justify-content: space-between;
    .btn {
        line-height: 1;
        &:focus {
            outline: none !important;
            box-shadow: none;
        }
    }
    i {
        font-size: 1.3rem;
    }
}
.org-str-title {
    font-size: 1.2rem;
}
</style>