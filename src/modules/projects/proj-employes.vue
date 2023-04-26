<template>
    <div>
        <div class="card mb-0">
            <div class="card-body">
                <div
                    class="button-items d-flex"
                    style="justify-content:space-between"
                >
                    <b-button
                        variant="primary"
                        class="btn-label"
                    >
                        <i class="bx bx-smile label-icon"></i>
                        {{`(${members.length})`}}
                    </b-button>
                    <span>
                        <b-button
                            variant="outline-danger"
                            @click="$emit('cancel')"
                        >{{$t('actions.cancel')}}</b-button>
                        <b-button
                            variant="primary"
                            @click="save"
                        >
                            <i class="fa fa-save"></i>
                            {{$t('actions.save')}}
                        </b-button>
                    </span>
                </div>
            </div>
            <div>
                <div class="p-4">
                    <!-- <div class="search-box mb-2">
            <div class="position-relative">
              <input
                type="text"
                class="form-control"
                v-model="searchValue"
                :placeholder="$t('actions.filter')"
              />
              <i class="bx bx-search-alt search-icon"></i>
            </div>
          </div>-->

                    <simplebar
                        style="height: 590px"
                        id="contact-list"
                        ref="contactsRef"
                    >
                        <ul class="list-unstyled chat-list">
                            <li
                                :id="contactList[contactList.length-1].id == data.id ?'lid' :'' "
                                v-for="data in contactList"
                                :key="data.employeeId"
                                @click="pushMember(data)"
                            >
                                <a href="javascript: void(0);">
                                    <div
                                        class="media d-flex"
                                        style="align-items:center"
                                    >
                                        <div class="align-self-center mr-3"></div>
                                        <div
                                            class="align-self-center mr-3"
                                            v-if="data.uploadPath"
                                        >
                                            <img
                                                :src="`${hrUrl}/${data.uploadPath}`"
                                                class="rounded-circle avatar-xs"
                                                alt
                                            />
                                        </div>
                                        <div
                                            class="avatar-xs align-self-center mr-3"
                                            v-if="!data.uploadPath"
                                        >
                                            <span class="avatar-title rounded-circle bg-soft-primary text-white">
                                              {{ `${data.lastName.charAt(0)} ${data.firstName.charAt(0)}` }}
                                            </span>
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <h5
                                                :class="check(data)"
                                                class="font-size-14 mb-1"
                                            >{{ `${data.lastName} ${data.firstName} ${data.parentName}` }}</h5>
                                            <p class="m-0">{{getName({nameLt:data.departmentNameLt,nameRu: data.departmentNameRu})}}</p>
                                            <p class="m-0">{{getName({nameLt:data.staffPositionNameLt,nameRu:data.staffPositionNameRu})}}</p>
                                        </div>

                                        <i
                                            v-if="check(data)"
                                            class="fas fa-user-check font-size-18 text-primary"
                                        ></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </simplebar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
export default {
    props: ["notIn"],
    components: {
        simplebar
    },
    data () {
        return {
            contactList: [],
            contactPage: 0,
            members: [],
            groupModal: false,
            searchValue: "",
            cmpKey: 0
        };
    },
    /* 
    COMPUTED */
    computed: {
        projectType () {
            return this.$route.name == 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
        }
    },
    methods: {
        setSelected (arr) {
            this.members = arr;
        },
        refresh () {
            this.cmpKey += 1;
        },
        save () {
            this.$emit("save", this.members);
            this.members = [];
            setTimeout(() => {
                this.getContacts({ page: 0, itemsPerPage: 20 });
            }, 300);
        },
        pushMember (v) {
            let index = this.members.indexOf(v.employeeId);
            if (index > -1) {
                this.members.splice(index, 1);
            } else {
                this.members.unshift(v.employeeId);
            }
        },
        check (v) {
            let index = this.members.indexOf(v.employeeId);
            if (index > -1) {
                return ["font-weight-bold", "text-primary"];
            } else {
                return false;
            }
        },
        getContacts (v) {
            let projectId = this.$route.query.id;
            if (projectId) {
                projectService.listMembers(projectId, v, this.projectType).then(res => {
                    this.$nextTick(() => {
                        this.contactList = res.data.list;
                    });
                });
            }
        },
        loadMoreContact () {
            let projectId = this.$route.query.id;
            if (projectId) {
                projectService
                    .listMembers(projectId, {
                        page: (this.contactPage += 1),
                        itemsPerPage: 20
                    }, this.projectType)
                    .then(async ({ data }) => {
                        if (data.list.length > 0) {
                            this.$nextTick(() => {
                                this.contactList = this.contactList.concat(data.list);
                            });
                        } else {
                            this.contactPage + -1;
                        }
                    });
            }
        }
    },
    async mounted () {
        var container3 = document.querySelector(
            "#contact-list .simplebar-content-wrapper"
        );
        if (container3) {
            container3.scrollTo({ top: 500, behavior: "smooth" });
        }
        // Contact list actions
        await this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
            "scroll",
            e => {
                let { scrollTop, scrollHeight, clientHeight } = event.target;
                const offsetForTrigger = 1;
                if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
                    this.loadMoreContact();
                }
            }
        );
    },
    async created () {
        await this.getContacts({ page: 0, itemsPerPage: 20 });
    },
    watch: {
        searchValue: {
            async handler () {
                await this.getContacts({ page: 0, itemsPerPage: 20 });
            }
        }
    }
};
</script>

<style>
</style>