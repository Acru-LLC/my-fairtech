<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title mb-4">{{ $t("pharm.files_sud") }}</h4>
            <simplebar id="file-list" ref="filesRef" style="height: 384px">
                <div class="table-responsive mb-0">
                    <table class="table table-centered table-hover" style="table-layout: fixed; width: 100%">
                        <tbody>
                        <tr v-for="(file, index) in files" :key="index">
                            <td style="width: 53px">
                                <div>
                                    <a
                                            :download="getExt(file.uploadPath) === 'pdf' ? false : file.uploadPath"
                                            :href="getExt(file.uploadPath) === 'pdf' ? `#` : `${baseUrl}/${file.uploadPath}`"
                                            @click="viewFile(file.uploadPath)"
                                    >
                                        <FileView :uploadPath="file.uploadPath" class="my-card-hovered"/>
                                        <small class="text-center">{{ getFileSize(parseFloat(file.fileSize)) }}</small>
                                    </a>
                                </div>
                            </td>
                            <td style="width: 60%">
                                <h5 class="font-size-14 m-0">
                                    <p class="text-dark m-0">{{ file.fileName }}</p>
                                </h5>
                                <p class="text-muted mb-0 font-size-10">
                                    <i class="bx bx-calendar mr-1 text-primary"></i>
                                    {{
                                    replaceDate(file.createdDate) ? replaceDate(file.createdDate).daym_shortyyyy_hm() : ''
                                    }}
                                </p>
                                <small class="d-block text-muted">
                                    {{
                                    `${file.ownerLastName} ${file.ownerFirstName} ${file.ownerParentName ? file.ownerParentName : ''}`
                                    }}
                                </small>
                                <small class="d-block">
                                    {{ file.comment }}
                                </small>
                            </td>
                            <td style="width: 45px">
                                <div class="text-center">
                                    <a :download="`${file.fileName}`" :href="`${baseUrl}/${file.uploadPath}`"
                                       class="text-dark">
                                        <i class="bx bx-download h3 m-0"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </simplebar>
        </div>
        <b-modal v-model="viewFileModal" :title="$t('actions.view')" scrollable size="xl">
            <div v-if="fileUploadPath" style="height: 700px">
                <embed :src="`${baseUrl}/${fileUploadPath}`" height="800" type="application/pdf" width="100%"/>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="viewFileModal = false">
                    {{ $t("actions.close") }}
                </b-button>
            </template>
        </b-modal>
        <div v-if="project.status !== 'FINISHED'" class="p-3">
            <form>
                <div>
                    <b-button block variant="primary" @click.prevent="clickUpload">
                        <i class="mdi mdi-upload d-block font-size-16"></i>
                        {{ $t("actions.upload") }}
                    </b-button>
                </div>
            </form>
        </div>
        <upload-file ref="file" :cmt="true" @sendFile="saveFile"/>
    </div>
</template>

<script>
import pharmService from "../pharmService";
import simplebar from "simplebar-vue";
import {getFileSize, replaceDate, showMsgSuccess} from "@/helper";

export default {
    props: {
        project: {
            type: Object,
            default: () => {
            },
        },
    },
    data() {
        return {
            params: {
                page: 0,
                itemsPerPage: 500,
            },
            keyword: '',
            files: [],
            filePage: 0,
            getFileSize: getFileSize,
            fileUploadPath: null,
            viewFileModal: false,
            replaceDate: replaceDate
        };
    },
    components: {
        simplebar,
    },
    created() {
        this.listFiles();
    },
    methods: {
        viewFile(uploadPath) {
            if (this.getExt(uploadPath) === "pdf") {
                this.fileUploadPath = uploadPath;
                this.viewFileModal = true;
            }
        },
        saveFile(msg, file) {
            this.leaveFile(msg, file);
        },
        clickUpload() {
            this.$refs.file.upld();
        },
        leaveFile(msg, cmt) {
            let id = this.$route.query.id;
            if (id) {
                pharmService
                    .leaveFile(id, msg, cmt, 'COURT')
                    .then((rs) => {
                        this.file = null;
                        showMsgSuccess(rs.data);
                        setTimeout(() => {
                            this.listFiles();
                        }, 300);
                    })
                    .catch((err) => {
                        // this.catchErr(err);
                    });
            } else {
                this.$router.go(-1);
            }
        },
        listFiles() {
            let id = this.$route.query.id;
            if (id) {
                pharmService
                    .listFiles(id, '', 'COURT', this.params)
                    .then((rs) => {
                        this.files = rs.data.list;
                        this.handleScroll();
                    })
                    .catch((err) => {
                        // this.catchErr(err);
                    });
            } else {
                this.$router.go(-1);
            }
        },
        loadMoreFiles(page) {
            let id = this.$route.query.id;
            if (id) {
                pharmService
                    .listFiles(id, {
                        page: page,
                        itemsPerPage: 20,
                    })
                    .then(async ({data}) => {
                        if (data.list.length > 0) {
                            this.files = this.files.concat(data.list);
                        } else {
                            this.filePage + -1;
                        }
                    });
            } else {
                this.$router.go(-1);
            }
        },
        handleScroll() {
            if (this.$refs.filesRef.$el) {
                setTimeout(() => {
                    this.$refs.filesRef.SimpleBar.getScrollElement().scrollTop = 0;
                }, 500);
            }
        },
    },
    mounted() {
        let container3 = document.querySelector("#file-list .simplebar-content-wrapper");
        if (container3) {
            container3.scrollTo({top: 500, behavior: "smooth"});
        }
        // Contact list actions
        this.$refs.filesRef.SimpleBar.getScrollElement().addEventListener("scroll", (e) => {
            let {scrollTop, scrollHeight, clientHeight} = event.target;
            const offsetForTrigger = 1;
            if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
                this.loadMoreFiles((this.filePage += 1));
            }
        });
    },
};
</script>

<style>
</style>