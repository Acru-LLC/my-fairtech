<script>
import projectService from "@/shared/services/projectService";
import Members from "./members";
import { replaceDate } from "@/helper";
export default {
    components: {
        Members,
    },
    created () {
        this.listMembers();
    },
    /* 
      COMPUTED */
    computed: {
        projectType () {
            return this.$route.name == 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
        },
        isCommission () {
            return this.projectType == 'COMMISSION'
        },
    },
    data () {
        return {
            uploadPath: "",
            singleImage: false,
            members: [],
            isModal: false,
            project: {},
            isMembers: false,
            replaceDate: replaceDate,
        };
    },
    methods: {
        viewMembers () {
            if (!this.isMembers) {
                this.isMembers = true;
                if (this.isMembers) {
                    setTimeout(() => {
                        this.$refs.mRef.recalculate();
                    }, 200);
                }
            }
        },
        listMembers () {
            let id = this.$route.query.id;
            if (id) {
                projectService
                    .getById(id, this.projectType)
                    .then((rs) => {
                        this.$emit("setProj", rs.data);
                        this.members = rs.data.employeesDto;
                        this.project = rs.data;
                    })
                    .catch((err) => {
                        // this.catchErr(err);
                    });
            } else {
                this.$router.go(-1);
            }
        },
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        items: {
            type: Array,
            default: () => {
                return [];
            },
        },
        mobile: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<template>
    <b-card
        no-body
        class="p-3"
    >
        <!-- start page title -->
        <div class="row">
            <b-sidebar
                backdrop-variant="dark"
                class="sidebar1"
                shadow
                backdrop
                sidebar-class="p-0"
                :no-header="true"
                right
                v-model="isMembers"
            >
                <div class="p-2">
                    <members
                        :isMembers="isMembers"
                        ref="mRef"
                        @success="listMembers"
                        :close="true"
                        @close="isMembers = false"
                        :heightProp="heightWindow - 200"
                    />
                </div>
            </b-sidebar>

            <div
                class="col-12"
                v-if="project.id"
            >
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <h5>{{ project.name }}</h5>
                        <span>{{ project.description }}</span>
                    </div>
                </div>
                <div
                    style="flex-wrap: wrap !important"
                    class="mt-3 d-flex justify-content-between align-items-center"
                >
                    <div class="d-flex align-items-center">
                        <div class="mr-3">
                            <b-button
                                size="sm"
                                @click="$router.go(-1)"
                                variant="primary"
                            >
                                <i class="fa fa-arrow-left"></i>
                                <!-- <span v-if="!mobile"> {{ $t("actions.back") }}</span> -->
                            </b-button>
                        </div>
                        <div>
                            <span v-if="!isCommission" class="text-muted font-size-11">{{
                $t("projectType")
              }}</span>
                            <p class="m-0">
                                <span class="text-dark font-weight-bold">{{
                  getName(project)
                }}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <span class="text-muted font-size-11">{{ $t("ownerProj") }}</span>
                        <p class="m-0">
                            <span class="text-dark font-weight-bold">
                                {{
                  `${project.ownerLastName} ${project.ownerFirstName} ${project.ownerMiddleName}`
                }}</span>
                        </p>
                    </div>

                    <div>
                        <span class="text-muted font-size-11">{{
              $t("column.on_date")
            }}</span>
                        <p class="m-0">
                            <i class="bx bx-calendar mr-1 text-primary"></i>
                            <span class="text-dark font-weight-bold">
                                {{
                  replaceDate(project.start)
                    ? replaceDate(project.start).daym_shortyyyy()
                    : ""
                }}</span>
                        </p>
                    </div>

                    <div>
                        <span class="text-muted font-size-11">{{
              $t("column.finishing_date")
            }}</span>
                        <p class="m-0">
                            <i class="bx bx-calendar mr-1 text-primary"></i>
                            <span class="text-dark font-weight-bold">
                                {{
                  replaceDate(project.end)
                    ? replaceDate(project.end).daym_shortyyyy()
                    : ""
                }}</span>
                        </p>
                    </div>

                    <div
                        @click="viewMembers"
                        class="p_cursor"
                    >
                        <span class="text-muted font-size-11">
                            <i class="fa fa-users"></i>
                            <span v-if="!mobile"> {{ $t("members") }}</span></span>
                        <p class="m-0">
                            <span class="text-dark font-weight-bold">
                                <b-avatar
                                    size="25px"
                                    v-show="members.length == 1"
                                    variant="primary"
                                    :src="
                    m.photoUploadPath ? `${hrUrl}/${m.photoUploadPath}` : ''
                  "
                                    :badge="`${m.lastName.charAt(0)}${m.firstName.charAt(0)}`"
                                    v-for="m in members"
                                    :key="m.id + 'MM'"
                                ></b-avatar>
                                <b-avatar-group
                                    size="25px"
                                    v-if="members.length > 1"
                                >
                                    <b-avatar
                                        variant="info"
                                        :src="
                      m.photoUploadPath ? `${hrUrl}/${m.photoUploadPath}` : ''
                    "
                                        :badge="`${m.lastName.charAt(0)}${m.firstName.charAt(0)}`"
                                        v-for="m in members"
                                        :key="m.id + 'MMMMMM'"
                                    ></b-avatar>
                                </b-avatar-group>
                            </span>
                        </p>
                    </div>

                    <div class="d-flex align-items-center justify-content-center">
                        <div
                            class="card-footer bg-white p-0"
                            v-if="project.isAdmin"
                        >
                            <a
                                href="#"
                                @click="$emit('addBoard')"
                                class="btn btn-primary btn-block"
                            >
                                <i class="mdi mdi-plus mr-1"></i>
                                <span v-if="!mobile"> {{ $t("actions.add") }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end page title -->
    </b-card>
</template>
