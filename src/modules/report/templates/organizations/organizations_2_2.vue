<template>
    <div>
        <div class="text-center">
            <strong> {{ $t( "reportRoles" ) }} </strong>
            <span class="text-success"> ({{ members.length }}) </span>

        </div>

        <div>
            <div class="card">
                <div class="card-body">
                    <!-- TREE VIEW -->
                    <ul
                        v-if="computedData.length > 0"
                        style="list-style-type: none; padding-left: 0;"
                    >
                        <template v-for="dep in computedData">
                            <org-str-tree-view
                                @toggleActiveClass="toggleActiveClass"
                                class="item"
                                :key="dep.id + 'dep'"
                                :department-for-tree="dep"
                                :members="members"
                            >
                            </org-str-tree-view>
                        </template>
                    </ul>
                    <template v-else>
                        <h5>{{ $t('not_translated.not_added_sections') }}</h5>
                    </template>
                    <!-- TREE VIEW -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Service from "../../reportService";
import OrgStrTreeView from '../components/OrgStrTreeView'
// import { getName } from "@/helper";
export default {
    props: {
        notIn: {
            type: Boolean,
            default: false,
        },
        async: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        OrgStrTreeView
    },
    data () {
        return {
            showSelectedModal: false,
            // getName: getName,
            members: [],
            objectMembers: [],
            searchValue: "",
            contactList: [],
            loader: false,
            children: [],
            childView: false,
            searchValue2: "",
            dataStep: 'this.contactList',
            childDataObj: {},
            currenData: {},
            oldData: {}
        };
    },
    computed: {
        computedData () {
            if (this._empty(this.searchValue)) {
                return this.contactList;
            } else {
                return this.contactList.filter(
                    (e) =>
                        e.nameUz.toLowerCase().indexOf(this.searchValue.toLowerCase()) >
                        -1 ||
                        e.nameRu.toLowerCase().indexOf(this.searchValue.toLowerCase()) >
                        -1 ||
                        e.nameLt.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1
                );
            }
        },

        computedDataChildren () {
            if (this._empty(this.searchValue2)) {
                return this.children;
            } else {
                return this.children.filter(
                    (e) =>
                        e.nameUz.toLowerCase().indexOf(this.searchValue2.toLowerCase()) >
                        -1 ||
                        e.nameRu.toLowerCase().indexOf(this.searchValue2.toLowerCase()) >
                        -1 ||
                        e.nameLt.toLowerCase().indexOf(this.searchValue2.toLowerCase()) > -1
                );
            }
        },
    },
    methods: {
        toggleActiveClass (selectedDep) {
            if (selectedDep.id) {
                let pIndex = this.members.indexOf(selectedDep.id);
                let isParentInMembers = pIndex > -1
                if (isParentInMembers) {
                    this.members.splice(pIndex, 1);
                    this.objectMembers.splice(pIndex, 1);
                } else {
                    this.members.unshift(selectedDep.id);
                    this.objectMembers.unshift(selectedDep.id);
                }
                // this.giveActiveClassToDep(this.computedData, selectedDep.id)

                let vm = this;
                if (selectedDep.children && selectedDep.children.length) {
                    selectedDep.children.forEach(function f (ch) {
                        let chIndex = vm.members.indexOf(ch.id);
                        let isChildInMembers = chIndex > -1
                        if (isParentInMembers) {
                            if (isChildInMembers) {
                                vm.members.splice(chIndex, 1);
                            }
                        } else if (!isChildInMembers) {
                            vm.members.unshift(ch.id);
                        }
                        // vm.giveActiveClassToDep(vm.contactList, ch.id)

                        if (ch.children && ch.children.length) {
                            ch.children.forEach(innerCh => {
                                f(innerCh)
                            })
                        }
                    })
                }
            }
        },
        giveActiveClassToDep () {
            this.members.forEach(e => {
                if (document.getElementById(`depId-${e}`)) {
                    // document.getElementById(`depId-${e}`).classList.add('active')
                }
            })
        },

        getByDepartments (id) {
            Service.getByDepartments(id).then((res) => {
                this.members = res.data.map((e) => e.id);
            });
        },
        pushMember (v) {
            let index = this.members.indexOf(v.id);
            if (index > -1) {
                this.members.splice(index, 1);
                this.objectMembers.splice(index, 1);
            } else {
                this.members.unshift(v.id);
                this.objectMembers.unshift(v);
            }
        },
        check (v) {
            let index = this.members.indexOf(v.id);
            if (index > -1) {
                return ["font-weight-bold", "text-primary"];
            } else {
                return false;
            }
        },
        getContacts () {
            this.loader = true;
            Service.getAllYuridik()
                .then((res) => {
                    this.$nextTick(() => {
                        this.contactList = [res.data];
                    });
                })
                .finally(() => {
                    this.loader = false;
                });
        },
    },

    async created () {
        await this.getContacts();
    },
    watch: {
        objectMembers: {
            async handler (v) {
                if (this.async) {
                    this.$emit("asyncValue", v);
                }
            },
        },
    },
};
</script>

<style scoped>
.effect {
    position: relative;
    transition: 600ms;
}

.effect:after {
    content: attr(data-hover);
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotateX(90deg);
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    -o-transform: rotateX(90deg);
    -ms-transform: rotateX(90deg);
    transition: 150ms;
    opacity: 0.7;
    color: #0169af;
    height: 0;
}

.effect:hover:after {
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    top: 0;
    opacity: 1;
    height: 100%;
}

.effect:hover {
    color: #ab1af3;
}
</style>

<style scoped lang='scss'>
// STYLE FROM TREE COMPONENT BEGIN
.hoverable {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .org-str-actions {
        display: flex;
        min-width: 20%;
        align-items: center;

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
}

.dep-name {
    display: inline-block;
    margin: 0;
}

::v-deep .org-str-actions {
    visibility: hidden;
    // display: inline-block;
}

::v-deep li > div {
    &:hover {
        .org-str-actions {
            // display: inline-block !important;
            visibility: visible !important;
            @media (max-width: 568px) {
                display: flex !important;
            }
            // margin: 0;
        }
    }
}

::v-deep li div div:first-child,
.add,
.delete,
.edit {
    display: inline-block;
    margin: 6px 0;
    cursor: pointer;
}

::v-deep li div {
    &:hover {
        p {
            text-decoration: underline;
        }
    }
}

::v-deep li .active {
    font-weight: bold;
}

.mdi {
    margin-right: 0.8em;
}

.building-icon {
    color: #f0d45f;
    font-size: 1.5rem;
    cursor: pointer;

    .mdi-office-building-outline {
        font-size: 1.4rem;
    }
}

// STYLE FROM TREE COMPONENT END

/* .org-str-actions {
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
} */
.org-str-title {
    font-size: 1.2rem;
}
</style>
