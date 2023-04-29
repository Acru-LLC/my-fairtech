<script>
import {cnfDoc, replaceDate, showMsgSuccess, splitLargeText} from "@/helper";
import SignKeys from "./SignKeys";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import ProjectsList from "@/modules/projects/projects-list";
import Create from "@/modules/projects/create";

import Overview from "@/modules/pharm/work/overview";
import Tasks from "@/modules/projects/tasks";

import projectService from "@/shared/services/projectService";
import pharmService from "../pharmService";
import letterService from "../../letter/letterService";
import {TokenService} from "@/shared/services/storage.service";
/**
 * Projects-grid component
 */
import Comments from "@/modules/projects/comments";
import i18n from "@/i18n";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import ProjectListButtons from "./project-list-buttons";
import Service from "@/modules/pharm/pharmService";

export default {
    page: {
        title: i18n.t("documents"),
        meta: [
            {
                name: "description",
                content: appConfig.description,
            },
        ],
    },
    components: {
        ProjectsList,
        Tasks,
        Create,
        Overview,
        Comments,
        SignKeys,
        PageHeader,
        // ProjectListButtons,
    },
    data() {
        return {
            rejectedLoader: false,
            isRejectedModal: false,
            rejectedSeeLoader: false,
            isRejectedSeeModal: false,
            signatureSeeModal: false,
            reasonRejectedSee: "",
            quorumLoader: false,
            isQuorumModal: false,
            quorumDate: null,
            reasonRejected: "",
            selectedTrItem: {},
            signatureModal: false,
            mailingPurposeId: null,
            mailingPurposes: [],
            commissionTypeId: null,
            commissionComment: '',
            commissionModalLoader: false,
            commissionTypes: [],
            currentProject: null,
            commissionsModal: false,
            totalDeadline: 0,
            totalFinished: 0,
            totalCreated: 0,
            selected: "",
            currentProj: {},
            loading: false,
            replaceDate: replaceDate,
            searchValue: "",
            ijroStatus: "BEING_SEEN",
            total: 0,
            projectData: [],
            title: this.$t("documents"),
            items: [
                {
                    text: this.$t("menu"),
                    href: "/",
                },
                {
                    text: this.$t("documents"),
                    active: true,
                },
            ],
            itemsPerPage: 12,
            page: 1,
            modalProjectInformationCompleted: false,
            projectInformationCompletionDate: null,
            projectInformationCompletionProjectId: null,
        };
    },
    computed: {
        params() {
            return {
                pg: {
                    itemsPerPage: this.itemsPerPage,
                    page: this.page - 1,
                },
                search: this.searchValue,
                status: this.ijroStatus
            };
        },
        projectType() {
            return this.$route.name === 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
        },
        isCommission() {
            return this.projectType === 'COMMISSION'
        },
    },
    async created() {
        this.getProjects();
        // this.getTotalCount();
        // if (this.isCommission) {
        //   this.items.splice(1, 2,
        //       ...[
        //         {
        //           text: this.$t("submodules.commission.projects_menu_title"),
        //           href: "/commission",
        //         }
        //       ]
        //   )
        //   this.title = this.$t('submodules.commission.projects_menu_title')
        // }
        // }
    },
    watch: {
        page() {
            this.getProjects();
        },
        searchValue: {
            async handler() {
                await this.getProjects();
            },
        },
        selected: {
            handler(v) {
                    this.ijroStatus = v
                this.getProjects(v);
            },
        },
    },
    methods: {
        changeListType(type = null) {
            let query = {};
            if (type) {
                query['page'] = type;
                TokenService.setApplicationPageType(type)
            } else {
                TokenService.removeApplicationPageType()
            }
            if (this.isCommission) {
                this.$router.push({name: 'CommissionProjects', query: query})
            } else {
                this.$router.push({name: 'ProjectsMain', query: query})
            }
        },
        saveRejected(payload) {
            this.convertToPdf(this.selectedTrItem).then(r1 => {
                this.rejectedLoader = true;
                letterService.saveRejected(
                    this.selectedTrItem.letterId,
                    this.selectedTrItem.id,
                    this.reasonRejected,
                    payload
                )
                    .then(async () => {
                        this.isRejectedModal = false;
                        let tempData = Object.assign({}, this.selectedTrItem);
                        await this.successSaved();
                        await this.getList(true, tempData.id);
                        await this.getIncomeTotalCount();
                    })
                    .finally(() => {
                        this.rejectedLoader = false;
                    });
            })
        },
        showRejectedSeeModal(itemObj, selectedFilter = null) {
            this.selectedTrItem = itemObj
            this.isRejectedSeeModal = true;
        },
        showRejectedModal(itemObj, selectedFilter = null) {
            this.selectedTrItem = itemObj
            this.isRejectedModal = true;
        },
        showQuorumModal(itemObj, selectedFilter = null) {
            this.selectedTrItem = itemObj
            this.isQuorumModal = true;
        },
        quorumConfirm() {
            this.quorumLoader = true;
            letterService.sendQuorum(this.selectedTrItem.id, {date: this.quorumDate})
                .then(rs => {
                    this.successSaved();
                    this.isQuorumModal = false;
                })
                .catch(err => {
                })
                .finally(() => {
                    this.selectedTrItem = {}
                    this.quorumLoader = false;
                });
        },
        rejectSeeConfirm() {
            cnfDoc(this.$t("messages.reject_title")).then((rs) => {
                if (rs.value) {
                    this.signatureSeeModal = true;
                }
            });
        },
        rejectConfirm() {
            cnfDoc(this.$t("messages.reject_title")).then((rs) => {
                if (rs.value) {
                    this.signatureModal = true;
                }
            });
        },
        async signSuccessSee(data) {
            let payload = {
                signedContent: data.content,
                inn: data.inn,
                pnfl: data.pnfl
            };
            await letterService.onlyDocSignForRevision(payload, this.selectedTrItem.id, this.reasonRejectedSee)
                .then(async () => {
                    this.signatureSeeModal = false;
                    this.isRejectedSeeModal = false;
                    let tempData = Object.assign({}, this.selectedTrItem);
                    await showMsgSuccess(this.$t("successDocSigned"));
                    this.getProjects();
                    this.getTotalCount();
                })
                .catch((err) => {
                });
        },
        async signSuccess(data) {
            let payload = {
                signedContent: data.content,
                inn: data.inn,
                pnfl: data.pnfl
            };
            if (this.isRejectedModal) {
                this.isModalKeys = false;
                this.signatureModal = false;
                this.saveRejected(payload)
            } else {
                if (this.selectedTrItem.status === 'COMMISSION_SEND') {
                    letterService.onlyDocSign(payload, this.selectedTrItem.id)
                        .then(async () => {
                            this.isModalKeys = false;
                            this.signatureModal = false;
                            let tempData = Object.assign({}, this.selectedTrItem);
                            await showMsgSuccess(this.$t("successDocSigned"));
                            this.getProjects();
                            this.getTotalCount();
                        })
                        .catch((err) => {
                        });
                } else if (this.selectedTrItem.status === 'NOT_BELONG') {
                    await letterService.onlyDocSign(payload, this.selectedTrItem.id)
                        .then(async () => {
                            this.isModalKeys = false;
                            this.signatureModal = false;
                            let tempData = Object.assign({}, this.selectedTrItem);
                            await showMsgSuccess(this.$t("successDocSigned"));
                            await this.getList(true, tempData.id);
                            await this.getIncomeTotalCount();

                        })
                        .catch((err) => {
                        });
                } else {
                    letterService.signDoc(payload, this.selectedTrItem.id, this.commissionTypeId, this.commissionComment)
                        .then(async () => {
                            this.isModalKeys = false;
                            this.signatureModal = false;
                            this.commissionsModal = false;
                            let tempData = Object.assign({}, this.selectedTrItem);
                            await showMsgSuccess(this.$t("successDocSigned"));
                            await this.getList(true, tempData.id);
                            await this.getIncomeTotalCount();
                        })
                        .catch((err) => {
                        });
                }
            }
        },
        customLabelMailingPurpose(opt) {
            let selected = this.mailingPurposes.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })
                }`
            }
            return ``;
        },
        customLabelCommissionTypes(opt) {
            let selected = this.commissionTypes.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName} -
        ${this.getName({
                    nameRu: selected.directoryPositionNameRu,
                    nameLt: selected.directoryPositionNameLt,
                    nameUz: selected.directoryPositionNameUz,
                })
                } `
            }
            return ``;
        },
        async sendToDirector(grid, selectedFilter = null) {
            this.currentProject = grid
            await crudAndListsService.getList('employee/get-all-employee/in-monopoly-department', this.var_default_search_payload, null, true)
                .then(res => {
                    this.commissionTypes = res.data
                })
                .catch(e => {
                    console.log(e)
                })

            await crudAndListsService.searchList('before-commission/directory/mailing-purpose', this.var_default_search_payload)
                .then(res => {
                    this.mailingPurposes = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })


            this.commissionsModal = true;
        },
        async save() {
            this.commissionModalLoader = true
            let projectId = this.currentProject.id;
            projectService
                .addMember(projectId, [{employeeId: this.commissionTypeId, mailingPurposeId: this.mailingPurposeId}])
                .then(rs => {
                    this.successSaved();
                    this.isModal = false;
                    this.$emit("success");
                })
                .catch(err => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.commissionModalLoader = false
                    this.commissionsModal = false;
                });
        },
        async visa_btn() {
            this.commissionModalLoader = true

            letterService.SignatureGiveVisaForDXA({
                applicationId: this.selectedTrItem.applicationId,
                employeeId: this.commissionTypeId,
                letterId: this.selectedTrItem.id
            })
                .then((res) => {
                    this.$toast(this.$t('succes.title'), {type: 'success'});
                    this.commissionTypeId = null
                    this.commissionComment = ''
                    this.commissionsModal = false
                })
                .catch((err) => {
                    this.isCommit = false
                    console.log(err);
                })
                .finally(async () => {
                    this.commissionModalLoader = false
                    await this.getList();
                    this.selectedTrItem = {}
                });
        },
        getTotalCount() {
            projectService.getTotalCount(this.projectType).then((rs) => {
                if (rs.data) {
                    this.totalCreated = rs.data.created;
                    this.totalFinished = rs.data.finished;
                    this.totalDeadline = rs.data.deadline;
                }
            });
        },
        selected_changed(v) {
            this.getProjects(v);
        },
        convertToPdf(selectedItem, forSign = false) {
            return new Promise((res, rej) => {
                let config = {
                    url: `${selectedItem.url}`,
                    outputtype: ".pdf",
                    forSign: forSign,
                    key: selectedItem.key,
                };
                letterService.convertToPdfByApi(config, true)
                    .then((rs) => {
                        if (rs.data) {
                            res(rs.data);
                        } else {
                            res(false);
                        }
                    })
                    .catch((e) => {
                        rej(e);
                    });
            });
        },
        closeProject(id, status, selectedFilter = null) {
            // CLOSE PROJECT
            projectService
                .changeStatus(id, status, true)
                .then((rs) => {
                    if (rs.data) {
                        this.getProjects(selectedFilter ? selectedFilter : this.selected);
                        this.getTotalCount();
                        this.editSuccess();
                        this.forceRouteReload();
                    }
                })
        },

        changeStatus(grid, selectedFilter = null) {
            return letterService.changeStatusService(this, grid, selectedFilter)
        },
        handleProjectInformationCompleted(projectId = null, callback = () => 0) {
            if (this.modalProjectInformationCompleted) {
                if (this.projectInformationCompletionDate) {
                    return letterService.projectInformationCompleted(this.projectInformationCompletionProjectId, this.projectInformationCompletionDate)
                        .then(({data}) => {
                            this.projectInformationCompletionCallBack()
                            this.projectInformationCompletionCallBack = () => 0
                            this.projectInformationCompletionProjectId = null
                            this.modalProjectInformationCompleted = false;
                        })
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
                }
            } else {
                this.projectInformationCompletionCallBack = callback;
                this.projectInformationCompletionProjectId = projectId;
                this.modalProjectInformationCompleted = true;
            }
        },
        search_changed(v) {
            this.searchValue = v;
        },
        goComments(grid) {
            this.currentProj = grid;
            this.$router.push({
                name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
                query: {page: "comments", id: grid.id},
            });
        },
        getTasks(grid) {
            this.$router.push({
                name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
                query: {page: "tasks", id: grid.id},
            });
        },
        overViewApplication(grid) {
            this.$router.push({
                name: 'ApplicationMain',
                query: {page: "overview", id: grid.id},
            });
        },
        edit(grid) {
            this.$router.push({
                name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
                query: {page: "edit", id: grid.id},
            });
        },
        d_page_changed(page) {
            this.page = page;
        },
        dlt(id) {
            this.cnf().then((v) => {
                if (v.value) {
                    projectService
                        .delete(id)
                        .then((rs) => {
                            this.deleteSuccess();
                            this.getProjects();
                        })
                        .catch((err) => {
                        });
                }
            });
        },
        random(v) {
            return Math.floor(Math.random() * v);
        },
        async successSave() {
            await this.getProjects();
            this.successSaved();
            this.$router.push({
                name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
                query: {page: 'list'}
            });
        },

        getProjects() {
            this.loading = true;
            Service.getDoerAppealList(this.params)
                .then((rs) => {
                    this.projectData = rs.data.list;
                    this.total = rs.data.total;
                })
                .catch((err) => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // getProjects(v) {
        //     this.loading = true;
        //     pharmService
        //         .list(this.params, v, this.projectType)
        //         .then((rs) => {
        //             this.projectData = rs.data.list;
        //             this.total = rs.data.total;
        //         })
        //         .catch((err) => {
        //         })
        //         .finally(() => {
        //             this.loading = false;
        //         });
        // },
        splitLargeText(a, b) {
            return splitLargeText(a, b)
        }
    },
};
</script>

<template>
    <div>
        <!-- <Layout> -->
        <ProjectsList
                v-if="$route.query.page === 'list'"
                :page="page"
                :total="total"
                :loading="loading"
                :totalC="totalCreated"
                :totalD="totalDeadline"
                :totalF="totalFinished"
                :projectData="projectData"
                :isCommission="isCommission"
                :itemsPerPage="itemsPerPage"
                :selectedTrItem="selectedTrItem"
                @dlt="dlt"
                @edit="edit"
                @getTask="getTasks"
                @overView="overView"
                @goComments="goComments"
                @changeStatus="changeStatus"
                @d_page_changed="d_page_changed"
                @search_changed="search_changed"
                @showQuorumModal="showQuorumModal"
                @selected_changed="selected_changed"
                @showRejectedModal="showRejectedModal"
                @showRejectedSeeModal="showRejectedSeeModal"
                @handleProjectInformationCompleted="handleProjectInformationCompleted"
        />
        <Create v-else-if="$route.query.page === 'create'" @success="successSave"/>
        <Create v-else-if="$route.query.page === 'edit'" @success="successSave"/>
        <Overview
                v-else-if="$route.query.page === 'overview'"
                @success="successSave"
                @changeStatus="changeStatus"
                @handleProjectInformationCompleted="handleProjectInformationCompleted"
        />
        <Tasks v-else-if="$route.query.page === 'tasks'" @success="successSave"/>
        <div v-else-if="$route.query.page === 'comments'">
            <Back :to="{name: isCommission ? 'CommissionProjects' : 'ProjectsMain', query: {page: 'list'}}"
                  class="mb-2"/>

            <Comments :height="true" :project="currentProj"/>
        </div>
        <div v-else>
            <PageHeader :items="items" :title="title"/>
            <b-card>
                <b-row>
                    <b-col>
                        <div class="d-flex flex-container" style="justify-content: space-between">
                            <div class="btn-group btn-group-example mb-2" role="group" style="width: 100px">
                                <!--                                <b-button-->
                                <!--                                        :variant="!$route.query.page ? 'primary' : 'outline-primary'"-->
                                <!--                                        class="w-xs"-->
                                <!--                                        @click="changeListType(null)"-->
                                <!--                                >-->
                                <!--                                    <i class="fa fa-th"></i>-->
                                <!--                                </b-button>-->
                                <!--                                <b-button-->
                                <!--                                        :variant="$route.query.page === 'list' ? 'primary' : 'outline-primary'"-->
                                <!--                                        class="w-xs"-->
                                <!--                                        @click="changeListType('list')"-->
                                <!--                                >-->
                                <!--                                    <i class="fa fa-list"></i>-->
                                <!--                                </b-button>-->
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="mr-3">
                                    <b-form-radio-group
                                            id="btn-radios-1"
                                            v-model="selected"
                                            button-variant="outline-primary"
                                            buttons
                                            class="btn-custom mb-0"
                                            name="radios-btn-default"
                                    >
                                        <b-form-radio button-variant="outline-success" value="BEING_SEEN">
                                            <span> {{ $t("pharm.appeal_proccess_status1") }}</span>
                                            <b-badge v-if="totalCreated > 0" class="ml-1" variant="primary">
                                                {{ totalCreated }}
                                            </b-badge>
                                        </b-form-radio>
                                        <b-form-radio button-variant="outline-primary" value="PROCCESS">
                                            <span> {{ $t("pharm.appeal_proccess_status2") }}</span>
                                            <b-badge v-if="totalFinished > 0" class="ml-1" variant="success">
                                                {{ totalFinished }}
                                            </b-badge>
                                        </b-form-radio>


                                        <b-form-radio button-variant="outline-danger" value="FINISHED">
                                            <span> {{ $t("pharm.appeal_proccess_status3") }}</span>
                                            <b-badge v-if="totalDeadline > 0" class="ml-1" variant="success">
                                                {{ totalDeadline }}
                                            </b-badge>
                                        </b-form-radio>
                                    </b-form-radio-group>
                                </div>
                                <div class="mr-2">
                                    <div class="d-inline-block mt-1 ml-2">
                                        <div class="search-box">
                                            <div class="position-relative">
                                                <input
                                                        v-model="searchValue"
                                                        :placeholder="$t('actions.search')"
                                                        class="form-control rounded bg-light border-light"
                                                        style="width: 300px"
                                                        type="text"
                                                />
                                                <i class="mdi mdi-magnify search-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-card>
            <div class="row">
                <div v-for="grid in projectData" :key="grid.id + 'GR'" class="col-xl-4 col-sm-6">
                    <div class="card grid-card-height">
                        <div class="card-body hovercard" @click="overViewApplication(grid)">
                            <div class="media">
                                <div class="media-body">
                                    <h5 class="font-size-15 font-weight-bold">
                                        <a class="text-dark" href="#"> {{ $t('pharm.appeal_number') }}:  {{ grid.mnumber }}</a>
                                    </h5>
                                    <p class="pre m-0 font-weight-semibold">
                                        {{ getName(grid) }}
                                    </p>
                                    <b-row class="text-muted mt-0 mb-0 pre">
                                        <b-col md="12" lg="3">
                                            {{ $t('pharm.send_date') }}
                                            <p class="text-dark">
                                                {{ new Date(grid.updateJson).ddmmyyyyhhmmss() }}
                                            </p>
                                        </b-col>
                                        <b-col md="12" lg="5">
                                            {{ $t('pharm.appeal_fio') }}
                                            <p >
                        <span >
                          {{ grid.consumerFirstName || '' }}
                          {{ grid.consumerLastName || '' }}
                          {{ grid.consumerMiddleName || '' }}
                        </span>
                                            </p>
                                        </b-col>
                                        <b-col md="12" lg="4">
                                            {{ $t('pharm.pharmacyName') }}
                                            <p class="text-dark">
                                                {{ grid.pharmacyName }}
                                            </p>
                                        </b-col>
                                    </b-row>
                                    <p class="text-muted mb-0 pre overflow-auto beautiful-scroll"
                                       style="max-height: 60px;">
                                        {{ grid.description }}</p>
                                    <div class="team"></div>
                                </div>
                            </div>
                        </div>
                        <div class="px-3 py-3 border-top">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item mr-3">

                                    <span
                                            v-if="grid.status === 'BEING_SEEN'"
                                            class="badge badge-success"
                                    >
                                 {{ $t("submodules.commission.BEING_SEEN") }}  </span>
                                    <span v-else class="badge badge-primary">
                                        {{ $t(grid.status) }}
                                    </span>
                                </li>
                                <li
                                        v-if="!_empty(grid.end)"
                                        v-b-tooltip.hover.top
                                        :title="$t('column.finishing_date')"
                                        class="list-inline-item mr-3"
                                >
                                    <i class="bx bx-calendar mr-1"></i>
                                    {{ new Date(replaceDate(grid.end)).daym_shortyyyy() }}
                                </li>
                            </ul>
                            <!--                            <project-list-buttons-->
                            <!--                                    :isCommission="isCommission"-->
                            <!--                                    :project="grid"-->
                            <!--                                    :selectedTrItem="selectedTrItem"-->
                            <!--                                    @dlt="dlt"-->
                            <!--                                    @getTask="getTasks"-->
                            <!--                                    @goComments="goComments"-->
                            <!--                                    @changeStatus="changeStatus"-->
                            <!--                                    @showQuorumModal="showQuorumModal"-->
                            <!--                                    @showRejectedModal="showRejectedModal"-->
                            <!--                                    @showRejectedSeeModal="showRejectedSeeModal"-->
                            <!--                                    @handleProjectInformationCompleted="handleProjectInformationCompleted"-->
                            <!--                            />-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="total > 0">
                <div class="col-lg-12">
                    <b-pagination v-model="page" :per-page="itemsPerPage" :total-rows="total" class="m-0" size="sm"/>
                </div>
            </div>
        </div>
        <!-- end ro w -->
        <!-- </Layout> -->
        <b-modal v-model="commissionsModal" :title="`${$t('submodules.projects.send_to_director')}`" scrollable
                 size="md">
            <div style="min-height: 200px">
                <div class="p-2">
                    <BaseMultiselectWithValidation
                            v-model="commissionTypeId"
                            :custom-label="customLabelCommissionTypes"
                            :label="$t('submodules.employees.title')"
                            :max-height="600"
                            :options="commissionTypes.map(e => e.id)"
                            :show-labels="false"
                            class="required "
                            label-on-top
                            open-direction="bottom"
                            placeholder=""
                            rules="required"
                    ></BaseMultiselectWithValidation>
                </div>

                <div class="p-2">

                    <BaseMultiselectWithValidation
                            v-model="mailingPurposeId"
                            :custom-label="customLabelMailingPurpose"
                            :label="$t('submodules.mailing_purpose.title')"
                            :max-height="600"
                            :options="mailingPurposes.map(e => e.id)"
                            :show-labels="false"
                            class="required "
                            label-on-top
                            open-direction="bottom"
                            placeholder=""
                            rules="required"
                    ></BaseMultiselectWithValidation>
                </div>

            </div>
            <template v-slot:modal-footer>
                <b-button variant="success" @click="save">
                    <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
                        {{ $t("actions.send") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="signatureModal" :title="`${$t('submodules.reports.make_sign')}`" hide-footer scrollable
                 size="lg">
            <SignKeys :dataToSign="selectedTrItem" @sign="signSuccess"/>
        </b-modal>

        <!-- rejected modal -->
        <b-modal v-model="isRejectedModal" :title="`${$t('submodules.reports.reasonRejected')}`" scrollable size="md">
            <b-form-textarea v-model="reasonRejected" rows="5"></b-form-textarea>

            <template v-slot:modal-footer>
                <b-button variant="danger" @click="rejectConfirm">
                    <b-overlay :opacity="0.1" :show="rejectedLoader" rounded="sm">
                        {{ $t("submodules.reports.rejected") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>

        <!-- quorum modal -->
        <b-modal v-model="isQuorumModal" scrollable size="md">
            <div class="mb-3">
                <b-row>
                    <b-col cols="4">
                        {{ $t('column.last_modified_date') }}
                    </b-col>
                    <b-col>
            <span class="p-2">
              {{ selectedTrItem.start }}
            </span>
                    </b-col>
                </b-row>
            </div>
            <div class="row">
                <BaseDatePickerWithValidation
                        v-model="quorumDate"
                        :label="$t('column.date')"
                        class="required p-2"
                        custom-styles="grid-template-columns: 60% 40%;"
                        rules="required"
                ></BaseDatePickerWithValidation>
            </div>

            <template v-slot:modal-footer>
                <b-button variant="success" @click="quorumConfirm">
                    <b-overlay :opacity="0.1" :show="quorumLoader" rounded="sm">
                        {{ $t("actions.send") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>

        <b-modal v-model="isRejectedSeeModal" :title="`${$t('submodules.reports.reasonRejected')}`" scrollable
                 size="md">
            <b-form-textarea v-model="reasonRejectedSee" rows="5"></b-form-textarea>

            <template v-slot:modal-footer>
                <b-button variant="danger" @click="rejectSeeConfirm">
                    <b-overlay :opacity="0.1" :show="rejectedSeeLoader" rounded="sm">
                        {{ $t("submodules.reports.rejected") }}
                    </b-overlay>
                </b-button>
            </template>
        </b-modal>
        <b-modal v-model="signatureSeeModal" :title="`${$t('submodules.reports.make_sign')}`" hide-footer scrollable
                 size="lg">
            <SignKeys :dataToSign="selectedTrItem" @sign="signSuccessSee"/>
        </b-modal>
        <b-modal
                :title="$t('submodules.doc.completionTime') "
                id="widthMM"
                v-model="modalProjectInformationCompleted"
                size="md"
                :no-close-on-backdrop="true"
                body-class="p-0"
        >
            <div class="p-3 py-4">
                <div>
                    <BaseDatePickerWithValidation
                            rules="required"
                            class="required"
                            required
                            label-on-top
                            disable-before
                            format="DD.MM.YYYY"
                            :label="$t('submodules.doc.completionTime')"
                            :placeholder="$t('submodules.doc.completionTime')"
                            v-model="projectInformationCompletionDate"
                    />
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="success" class="float-right m-1" @click="handleProjectInformationCompleted">
                        {{ $t('actions.send') }}
                    </b-button>
                    <b-button variant="danger" class="float-right m-1"
                              @click="modalProjectInformationCompleted = false;">
                        {{ $t('actions.close') }}
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<style>
.hovercard:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
    background: #dff0fc;
}

.hovercard {
    background: #f2f9fd;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)
}
</style>

<style lang="scss" scoped>
.grid-card-height {
  height: calc(100% - 15px);
}
</style>
