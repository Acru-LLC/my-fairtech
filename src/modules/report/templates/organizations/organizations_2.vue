<template>
    <div>
        <div class="card mb-0">
            <div>
                <div class="p-4">
                    <div class="search-box mb-2">
                        <div class="position-relative">
                            <input
                                type="text"
                                class="form-control"
                                v-model="searchValue"
                                :placeholder="$t('actions.filter')"
                            />
                            <i class="bx bx-search-alt search-icon"></i>
                        </div>
                    </div>
                    <b-overlay
                        :show="loader"
                        rounded="sm"
                        opacity="0.1"
                    >
                        <ul
                            id="il"
                            class="list-unstyled chat-list"
                        >
                            <li
                                v-for="(data, index) in computedData"
                                :key="data.id + 'EMPLOYEE' + index"

                            >
                                <a href="javascript: void(0);"  @click="pushMember(data)">
                                    <div
                                        class="media d-flex"
                                        style="align-items: center"
                                    >
                                        <div class="align-self-center mr-3"></div>

                                        <div class="media-body overflow-hidden">
                                            <h5
                                                :class="check(data)"
                                                class="font-size-14 mb-1"
                                            >
                                                {{ `${getName({nameUz:data.nameUz, nameLt:data.nameLt, nameRu: data.nameRu})}` }}
                                            </h5>
                                        </div>

                                        <i
                                            v-if="check(data)"
                                            class="fas fa-check font-size-18 text-primary"
                                        ></i>
                                    </div>
                                </a>
                              <ul
                                  id="il"
                                  class="list-unstyled chat-list ml-4"
                              >
                                <li
                                    v-show="data.children.length > 0"
                                    v-for="(data1, index) in data.children"
                                    :key="data1.id + 'EMPLOYEE' + index"

                                >
                                  <a   @click="pushMember(data1)" href="javascript: void(0);">
                                    <div
                                        class="media d-flex"
                                        style="align-items: center"
                                    >
                                      <div class="align-self-center"></div>

                                      <div class="media-body overflow-hidden">
                                        <h5
                                            :class="check(data1)"
                                            class="font-size-14 mb-1 ml-1"
                                        >
                                          <i class="far fa-arrow-alt-circle-right"></i>
                                          {{ `${getName({nameUz:data1.nameUz, nameLt:data1.nameLt, nameRu: data1.nameRu})}` }}
                                        </h5>
                                      </div>

                                      <i
                                          v-if="check(data1)"
                                          class="fas fa-check font-size-18 text-primary"
                                      ></i>
                                    </div>
                                  </a>

                                  <ul
                                      id="il"
                                      class="list-unstyled chat-list ml-4"
                                  >
                                    <li
                                        v-show="data1.children.length > 0"
                                        v-for="(data2, index) in data1.children"
                                        :key="data2.id + 'EMPLOYEE' + index"
                                        @click="pushMember(data2)"
                                    >
                                      <a href="javascript: void(0);">
                                        <div
                                            class="media d-flex"
                                            style="align-items: center"
                                        >
                                          <div class="align-self-center"></div>

                                          <div class="media-body overflow-hidden">
                                            <h5
                                                :class="check(data2)"
                                                class="font-size-14 mb-1 ml-1"
                                            >
                                              <i class="far fa-arrow-alt-circle-right"></i>
                                              {{ `${getName({nameUz:data2.nameUz, nameLt:data2.nameLt, nameRu: data2.nameRu})}` }}
                                            </h5>
                                          </div>
                                          <i
                                              v-if="check(data2)"
                                              class="fas fa-check font-size-18 text-primary"
                                          ></i>
                                        </div>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                        </ul>
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Service from "../../reportService";
import crudAndListsService from "@/shared/services/crud_and_list.service"
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

    data () {
        return {
            // getName: getName,
            members: [],
            objectMembers: [],
            searchValue: "",
            contactList: [],
            loader: false,
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
    },
    methods: {
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
            // GET DEPARTMENTS
            crudAndListsService.searchList('department', this.var_default_search_payload, null, true)
                .then(res => {
                    this.contactList = res.data.children;
                    // if (res.data.id)
                    //     this.departments.push(res.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.loader = false;
                });
            // Service.getAllYuridik()
            //     .then((res) => {
            //         this.$nextTick(() => {
            //             this.contactList = res.data;
            //         });
            //     })
            //     .finally(() => {
            //         this.loader = false;
            //     });
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

<style>
</style>













