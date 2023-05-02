<script>
import ReferencesService from "@/shared/services/referencesService";
import FileController from "@/modules/projects/file-controller";
import projectService from "@/shared/services/projectService";
import Comments from "@/modules/projects/comments";
import PageHeader from "@/components/page-header";
import Members from "@/modules/projects/members";
import Files1 from "@/modules/pharm/work/files1";
import Files2 from "@/modules/pharm/work/files2";
import Files3 from "@/modules/pharm/work/files3";
import {replaceDate} from "@/helper";
import simplebar from "simplebar-vue";
import {TokenService} from "@/shared/services/storage.service";
import pharmService from "@/modules/pharm/pharmService";
import DorixonaAllInfo from "@/modules/pharm/work/DorixonaInfo.vue";
import {jsPDF} from "jspdf";

export default {
    components: {
        PageHeader,
        // Comments,
        Files1,
        Files2,
        Files3,
        DorixonaAllInfo
        // Members,
        // simplebar,
        // FileController,
    },
    /*
    COMPUTED */
    computed: {
        projectType() {
            return this.$route.name === 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
        },
        isCommission() {
            return this.projectType === 'COMMISSION'
        },
        projectFiles() {
            return this.isCommission ? [...this.proj.applicationDto.allFiles, ...this.proj.applicationDto.letterFiles] : this.proj.applicationDto.allFiles
        },
        isRevision() {
            return this.proj.status === 'REVISION'
        },
        showChangeTermButton() {
            return this.proj.applicationType === 'FROM_DXA' && this.proj.projectType === 'BEFORE_COMMISSION' && this.proj.status === 'CREATED'
        },
        showCloseProjectButton() {
            if (!this.proj?.status) {
                return false;
            }
            return ['REVIEW_FINISHED', 'FINISHED', 'TEMPORARILY_CLOSED', 'RETURN_FOR_REVISION_TO_BEFORE_COMMISSION']
                .indexOf(this.proj.status) === -1;
        },
        showReopenProjectButton() {
            if (!this.proj?.status) {
                return false;
            }
            return this.proj.applicationDto?.projectId &&
                this.proj.status === 'TEMPORARILY_CLOSED' &&
                this.proj.returnType === 'FOR_ACCEPT_REOPEN';
        },
        showOnTemporarilyClosedForNotCompleted() {
            return this.proj.status === 'TEMPORARILY_CLOSED' && this.proj.returnType === 'FOR_NOT_COMPLETED';
        },
        projApplicationDtoApplicationDXATypeName() {
            return this.getName({
                nameUz: this.proj?.applicationDto?.applicationDXATypeNameUz,
                nameLt: this.proj?.applicationDto?.applicationDXATypeNameLt,
                nameRu: this.proj?.applicationDto?.applicationDXATypeNameRu,
            })
        },
        applicationPageType() {
            return TokenService.getApplicationPageType()
        },
    },
    methods: {
        generatePDF() {
            require('jspdf-autotable');
            const columns = [
                {title: "", dataKey: "title"},
                {title: "", dataKey: "body"}
            ];
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter"
            });

            // text is placed using x, y coordinates
            doc.setFontSize(12).text(this.heading1, 0.5, 1.0);
            // create a line under heading
            doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
            // Using autoTable plugin

            this.pdfData = [
                {
                    title: "Murojaat ID",
                    body: this.proj.mnumber.substring(1)
                },
                {
                    title: "Arizachi F.I.SH",
                    body: this.toLatin(this.proj.consumerFirstName ? this.proj.consumerFirstName : '') + ' ' + this.toLatin(this.proj.consumerLastName ? this.proj.consumerLastName : '') + ' ' + this.toLatin(this.proj.consumerMiddleName ? this.proj.consumerMiddleName : '')
                },
                {
                    title: "Arizachi telefon nomeri",
                    body: this.proj.consumerPhone ? this.proj.consumerPhone : ''
                },
                {
                    title: "Arizachi JSHSHIRi",
                    body: this.proj.consumerPinfl ? this.proj.consumerPinfl : ''
                },
                {
                    title: "Ariza yuborilgan sana",
                    body: this.proj.createJson ? this.proj.createJson : ''
                },
                {
                    title: "Chek ro'yxatdan o'tkazilgan sana",
                    body: this.proj.medicationPaymentDate ? this.proj.medicationPaymentDate : ''
                },
                {
                    title: "Dori nomi",
                    body: this.toLatin(this.proj.medicationName ? this.proj.medicationName : '')
                },
                {
                    title: "Mxik kodi",
                    body: this.proj.medicationMxikCode ? this.proj.medicationMxikCode : ''
                },
                {
                    title: "Sotilgan narx",
                    body: this.proj.medicationPaymentPrice ? this.proj.medicationPaymentPrice : ''
                },
                {
                    title: "Sotishga ruxsat etilgan eng yuqori(referent) narx",
                    body: this.proj.medicationReferentPrice ? this.proj.medicationReferentPrice : ''
                },
                {
                    title: "Ortiqcha to'langan summa",
                    body: this.proj.medicationPaymentPrice - this.proj.medicationReferentPrice
                },
                {
                    title: "Chek raqami",
                    body: this.proj.medicationCheckNumber ? this.proj.medicationCheckNumber : ''
                },
                {
                    title: "Dorixona nomi",
                    body: this.toLatin(this.proj.pharmacyName ? this.proj.pharmacyName : '')
                },
                {
                    title: "Dorixona direktori F.I.SH",
                    body: this.toLatin(this.proj.medicationFounderName ? this.proj.medicationFounderName : '')
                },
                {
                    title: "Dorixona direktori pasporti",
                    body: this.toLatin(this.proj.medicationFounderPassport ? this.proj.medicationFounderPassport : '')
                },
                {
                    title: "Dorixona STIRi",
                    body: this.proj.pharmacyTin ? this.proj.pharmacyTin : ''
                },
                {
                    title: "Dorixona manzili",
                    body: this.toLatin(this.proj.pharmacyRegionName ? this.proj.pharmacyRegionName : '') + ' ' + this.toLatin(this.proj.pharmacyDistrictName ? this.proj.pharmacyDistrictName : '') + ' ' + this.toLatin(this.proj.pharmacyAddress ? this.proj.pharmacyAddress : '')
                },
                {
                    title: "Dorixona elektron pochtasi",
                    body: this.toLatin(this.proj.pharmacyEmail ? this.proj.pharmacyEmail : '')
                },
                {
                    title: "",
                    body: ""
                },
                {
                    title: "",
                    body: "                                                             Sana:" + new Date().ddmmyyyy()
                },
            ]

            doc.autoTable({
                columns,
                body: this.pdfData,
                margin: {left: 0.5, top: 1.25, right: 0.5},
                columnStyles: {
                    title: {columnWidth: 3},
                    body: {columnWidth: 'auto'}
                }
            });

            doc.setFont("Montserrat", "italic", "400")
                .text(this.moreText, 0.5, 3.5, {align: "left", maxWidth: "10.5"});

            doc.setFont("times", "italic", "400")

                .text(
                    "",
                    0.5,
                    doc.internal.pageSize.height - 0.5
                )
                .save(`${this.heading}.pdf`);
        },
        isDorixonaSidebar() {
            this.ismodalDorixonaInfo = true
            this.$refs.isSidebar_ref.getById()
        },
        async sendExtended() {
            let obj = {
                decision_text: this.commit,
                extendedDate: this.extendedDate,
            }
            await ReferencesService.extended(obj, {
                id: this.proj.applicationDto.id,
                applicationDxaId: this.proj.applicationDto.applicationDxaId
            })
                .then((res) => {
                    this.$toast(this.$t('succes.title'), {type: 'success'});
                    this.isCommit = false
                })
                .catch((err) => {
                    this.isCommit = false
                    console.log(err);
                })
                .finally(() => {
                    this.commit = null
                });
        },
        closeIsModal() {
            this.isCommit = false
            this.commit = ''
        },
        changeTerm() {
            this.isCommit = true
        },
        viewIlova(uploadPath) {
            if (this.getExt(uploadPath) === "pdf") {
                this.ilovaUploadPath = uploadPath;
                this.viewIlovaModal = true;
            }
        },
        getTask(grid) {
            this.$router.push({
                name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
                query: {page: "tasks", id: this.$route.query.id},
            });
        },
        getInfoConsumer() {
            let id = this.$route.query.id;
            if (id) {
                pharmService
                    .getUserApplicationInfo(id, true)
                    .then((rs) => {
                        this.$toast(this.$t('succes.title'), {type: 'success'});
                    })
                    .catch(() => {
                    });
            } else {
                this.$router.go(-1);
            }
        },
        getById() {
            let id = this.$route.query.id;
            if (id) {
                pharmService
                    .getByIdApplicationInfo(id, true)
                    .then((rs) => {
                        this.proj = rs.data;
                    })
                    .catch(() => {
                    });
            } else {
                this.$router.go(-1);
            }
        },
        projectReopenApplication() {
            if (this.reopen_application.modal) {
                this.cnf().then(({value}) => {
                    if (value) {
                        projectService.projectReopenApplication(this.$route.query.id, this.reopen_application.date).then(({data}) => {
                            this.forceRouteReload();
                        });
                    }
                })
            } else {
                this.reopen_application.modal = true;
            }
        },
        random(v) {
            return Math.floor(Math.random() * v);
        },
        async changeStatus(project) {
            await this.$emit('changeStatus', project)
            await this.getById();
            if (this.isCommission) {
                this.items.splice(1, 2,
                    ...[
                        {
                            text: this.$t("submodules.commission.projects_menu_title"),
                            href: "/commission",
                        },
                        {
                            text: this.$t('commission_details'),
                            active: true,
                        }
                    ]
                )
                this.title = this.$t('commission_details')
            }
        },
        handleProjectInformationCompleted() {
            this.$emit('handleProjectInformationCompleted', this.proj.id, () => {
                this.forceRouteReload();
            })
        },
    },
    async created() {
        await this.getById();
        if (this.isCommission) {
            this.items.splice(1, 2,
                ...[
                    {
                        text: this.$t("submodules.commission.projects_menu_title"),
                        href: "/commission",
                    },
                    {
                        text: this.$t('commission_details'),
                        active: true,
                    }
                ]
            )
            this.title = this.$t('commission_details')
        }
    },
    data() {
        return {
            heading: "Ariza shakli",
            heading1: "O'zbekiston Respublikasi Raqobatni rivojlantirish va iste'molchilar huquqlarini himoya qilish qo'mitasi",
            moreText: [],
            pdfData: [],
            commit: '',
            extendedDate: '',
            isCommit: false,
            ismodalDorixonaInfo: false,
            ilovaUploadPath: null,
            viewIlovaModal: false,
            modalProjectInformationCompleted: false,
            projectInformationCompletionDate: null,
            replaceDate: replaceDate,
            barChart: [],
            title: this.$t("pharm.appeal_proccess"),
            proj: {},
            reopen_application: {
                date: null,
                modal: false,
            },
            items: [
                {
                    text: this.$t("menu"),
                    href: "/",
                },
                {
                    text: this.$t("proj"),
                    href: "/projects",
                },
                {
                    text: this.$t("projDetails"),
                    active: true,
                },
            ],
        };
    },
};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items"/>
        <div class="row mb-2">
            <div class="col-12">
                <Back
                        :to="{name: 'AppealWork'}"/>
            </div>
        </div>
        <!-- end row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-4">
                        <div class="card grid-card-height">
                            <div class="card-body">
                                <b-row>

                                    <b-col cols="12">
                                        <span
                                                v-if="proj.status === 'BEING_SEEN'"
                                                class="badge badge-success"
                                        >
                                 {{ $t("submodules.commission.BEING_SEEN") }}  </span>
                                        <span v-else class="badge badge-primary">
                                        {{ $t(proj.status) }}
                                    </span>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.appeal_number') }}
                                        <p class="text-muted">{{ proj.mnumber }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t("column.send_date") }}
                                        <p class="text-muted"> {{ new Date(proj.createJson).ddmmyyyy() }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t("pharm.executive") }}
                                        <p class="text-muted"> {{
                                            `${proj?.innerEmployeeName ?? ''}`
                                            }}</p>
                                    </b-col>
                                </b-row>
                                <div class="row task-dates">
                                    <div class="row task-dates ml-2">

                                        <b-button class="ml-2" variant="success" @click="generatePDF"
                                        >
                                            <i class="fa fa-download"></i>
                                            {{ $t("pharm.arizaForm") }}
                                        </b-button>
                                    </div>

                                </div>

                                <!--                                <div class="row task-dates">-->
                                <!--                                    <div class="row task-dates ml-2">-->

                                <!--                                        &lt;!&ndash; Muddatni uzaytirish&ndash;&gt;-->
                                <!--                                        <b-button variant="success" @click="changeTerm">-->
                                <!--                                            <i class="fa fa-calendar-plus"></i>-->
                                <!--                                            {{ $t("submodules.projects.add_day") }}-->
                                <!--                                        </b-button>-->
                                <!--                                    </div>-->
                                <!--                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card grid-card-height">
                            <div class="card-body">
                                <b-row>

                                    <b-col cols="12"><h5><b> {{ $t('pharm.pharmacy') }}</b></h5></b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.pharmacyName') }}
                                        <p class="text-muted">{{ proj.pharmacyName }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.pharmacyAddress') }}
                                        <p class="text-muted">{{ proj.pharmacyRegionName }}{{
                                            proj.pharmacyDistrictName
                                            }}{{ proj.pharmacyAddress }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.pharmacyTin') }}
                                        <p class="text-muted">{{ proj.pharmacyTin }}</p>
                                    </b-col>
                                </b-row>

                                <div class="row task-dates">
                                    <div class="row task-dates ml-2">

                                        <b-button class="ml-2" variant="success" @click="isDorixonaSidebar">
                                            <i class="fa fa-eye"></i>
                                            {{ $t("pharm.get_info_apteka") }}
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card grid-card-height">
                            <div class="card-body">
                                <b-row>

                                    <b-col cols="12"><h5><b> {{ $t('pharm.consumer') }}</b></h5></b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.appeal_fio') }}
                                        <p class="text-muted">{{ proj.consumerFirstName }} {{ proj.consumerLastName }}
                                            {{ proj.consumerMiddleName }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.consumerPhone') }}
                                        <p class="text-muted">{{ proj.consumerPhone }}</p>
                                    </b-col>
                                    <b-col cols="12">
                                        {{ $t('pharm.consumerPinfl') }}
                                        <p class="text-muted">{{ proj.consumerPinfl }}</p>
                                    </b-col>
                                </b-row>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <Files1 class="grid-card-height" :project="proj"/>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-4">
                        <Files2 class="grid-card-height" :project="proj"/>
                        <!--                        <comments class="grid-card-height" :project="proj"/>-->
                    </div>
                    <div class="col-lg-4">
                        <Files3 class="grid-card-height" :project="proj"/>
                        <!--                        <Members class="grid-card-height" :project="proj" :heightProp="'390'"/>-->
                    </div>
                    <!-- end col -->
                </div>
            </div>
        </div>
        <!-- APPLICATION_ATTACHED_FILE VIEW MODAL -->
        <b-modal scrollable v-model="viewIlovaModal" size="xl" :title="$t('actions.view')">
            <div style="height: 700px" v-if="ilovaUploadPath">
                <embed width="100%" height="800" :src="`${baseUrl}/${ilovaUploadPath}`" type="application/pdf"/>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="viewIlovaModal = false">{{ $t("actions.close") }}</b-button>
            </template>
        </b-modal>

        <b-modal
                :title="$t('writeCmt') "
                id="widthMM"
                v-model="isCommit"
                size="md"
                :no-close-on-backdrop="true"
                body-class="p-0"
        >
            <div class="p-2">
                <div>
                    <BaseTextareaWithValidation
                            max-rows="6"
                            class="required"
                            required
                            label-on-top
                            :label="$t('writeCmt')"
                            v-model="commit"
                    >
                    </BaseTextareaWithValidation>
                </div>
                <div class="mt-3">
                    <BaseDatePickerWithValidation
                            not-required
                            format="DD-MM-YYYY"
                            custom-styles="grid-template-columns: 0% 100%"
                            v-model="extendedDate"
                            :placeholder="$t('submodules.projects.add_day')"
                            lang="ru"
                    ></BaseDatePickerWithValidation>
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="success" class="float-right m-1" @click="sendExtended">
                        {{ $t('actions.send') }}
                    </b-button>
                    <b-button variant="danger" class="float-right m-1" @click="closeIsModal">
                        {{ $t('actions.close') }}
                    </b-button>
                </div>
            </template>
        </b-modal>
        <b-modal
                :title="$t('submodules.dxa.reopen_application')"
                v-model="reopen_application.modal"
                size="md"
                :no-close-on-backdrop="true"
                body-class="p-0"
        >
            <div class="p-2">
                <div class="mt-3">
                    <BaseDatePickerWithValidation
                            class="required"
                            rules="required"
                            format="DD-MM-YYYY"
                            disable-before
                            custom-styles="grid-template-columns: 0% 100%"
                            v-model="reopen_application.date"
                            :placeholder="$t('submodules.doc.completionTime')"
                    />
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="success" class="float-right m-1" @click="projectReopenApplication">
                        {{ $t('submodules.dxa.reopen_application') }}
                    </b-button>
                    <b-button variant="danger" class="float-right m-1" @click="reopen_application.modal = false;">
                        {{ $t('actions.close') }}
                    </b-button>
                </div>
            </template>
        </b-modal>
        <!-- end row -->
        <!--        dorixona malumotlari-->
        <b-sidebar v-model="ismodalDorixonaInfo" class="sidebar-part" right shadow sidebar-class="p-0"
                   width="50%">
            <DorixonaAllInfo
                    ref="isSidebar_ref"
                    :applicationId="proj.id"
            />
        </b-sidebar>
    </div>
</template>

<style lang="scss" scoped>
.grid-card-height {
  height: calc(100% - 24px);
}
</style>