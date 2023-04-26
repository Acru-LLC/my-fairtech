<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="(isModeCreate ? $t('actions.create') : $t('column.passport_number') + ': ' + editingItem.passportNumber)"
    >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        name="architecDocFile"
                        rules=""
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                ref="architectDocUploader"
                                v-model="architectDocFile"
                                data-vv-name="architecDocFile"
                                data-vv-as="ArchitecDocFile"
                                :max-files="5"
                                :has-error="hasError('mandat')"
                                :error="collectErr('mandat')"
                                :label="$t('column.ad_construction_drawing')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        v-if="isByAgency"
                        name="photos"
                        rules=""
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                ref="photosUploader"
                                v-model="photos"
                                :max-files="null"
                                :max-fileSize="null"
                                data-vv-name="photos"
                                data-vv-as="Photos"
                                :has-error="hasError('photos')"
                                :error="collectErr('photos')"
                                :label="$t('column.ad_construction_photo')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        v-if="isByAgency"
                        name="passportDocFile"
                        rules=""
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                ref="passportDocUploader"
                                v-model="passportDocFile"
                                :max-files="1"
                                data-vv-name="passportDocFile"
                                data-vv-as="PassportDocFile"
                                :has-error="hasError('passportDocFile')"
                                :error="collectErr('passportDocFile')"
                                :label="$t('column.ad_construction_passport_doc_file')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        v-if="isByAgency"
                        name="paymentDocFile"
                        rules=""
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                ref="paymentDocUploader"
                                v-model="paymentDocFile"
                                :max-files="1"
                                data-vv-name="paymentDocFile"
                                data-vv-as="PaymentDocFile"
                                :has-error="hasError('paymentDocFile')"
                                :error="collectErr('paymentDocFile')"
                                :label="$t('column.ad_construction_monthly_income_doc_photo')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        v-if="isByAgency"
                        name="passportPhoto"
                        rules=""
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                ref="passportPhotoUploader"
                                v-model="passportPhoto"
                                :max-files="1"
                                data-vv-name="passportPhoto"
                                data-vv-as="PassportPhoto"
                                :has-error="hasError('passportPhoto')"
                                :error="collectErr('passportPhoto')"
                                :label="$t('column.ad_construction_passport_photo')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >

                </b-col>
            </b-row>

        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'contractor-advertising-construction'
const APPEND_API_URL_FOR_GOVERNMENT = 'first-agent-files'
const APPEND_API_URL_FOR_AGENCY = 'second-agent-files'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "UpdateItemFiles",
    /*
    * COMPONENTS */
    components: {
    },
    /*
    * DATA */
    data () {
        return {
            publicPath: process.env.BASE_URL,
            editingItem: {
                addressDto: {}
            },
            errors: [],
            architectDocFile: [],
            photos: [],
            passportDocFile: [],
            passportPhoto: [],
            paymentDocFile: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name == 'CreateAdPassportInfoByAgency' || this.$route.name == 'CreateAdPassportInfoByGovernment'
        },
        isByAgency () {
            return this.$route.name == 'UpdateAdPassportInfoFilesByAgency'
        },
        isByGovernment () {
            return this.$route.name == 'UpdateAdPassportInfoFilesByGovernment'
        },
        computedObserver () {
            return this.$refs.observer
        },
        /* multipleMinimumCollectionsComputedObserver () {
            return this.$refs['multiple-minimum-collections-observer']
        },
        singleMinimumCollectionUpdateComputedObserver () {
            return this.$refs['single-minimum-collection-update-observer']
        } */
    },
    /*
    * METHODS */
    methods: {
        generateUUID () {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        async setFilesFromServer () {
            if (this.isByGovernment) {
                // ARCHITECT_DOC_FILES
                this.editingItem.architectDocFileList.forEach(f => {
                    fetch(this.publicPath + f.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = f.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], f.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + f.url;
                            this.$refs.architectDocUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));
                    /* let file = { size: f.size, name: f.name, type: f.contentType, uuid: this.generateUUID() };
                    let url = this.publicPath + f.url;
                    this.$refs.architectDocUploader.$refs.dropzone.manuallyAddFile(file, url); */
                })
            } else if (this.isByAgency) {
                // ARCHITECT_DOC_FILES
                this.editingItem.architectDocFileList.forEach((f, index) => {
                    fetch(this.publicPath + f.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = f.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], f.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + f.url;
                            this.$refs.architectDocUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));

                    /* const mockFile = { name: f.name, size: f.size };
                    console.log(this.$refs.architectDocUploader.$refs.dropzone.dropzone.options) */
                    // this.$refs.architectDocUploader.$refs.dropzone.files[index] = f.name;
                    /* this.$refs.architectDocUploader.$refs.dropzone.dropzone.options.addedfile(this.$refs.architectDocUploader.$refs.dropzone, mockFile);
                    this.$refs.architectDocUploader.$refs.dropzone.dropzone.options.thumbnail(this.$refs.architectDocUploader.$refs.dropzone, mockFile, this.publicPath + f.url); */
                    /* mockFile.previewElement.classList.add('dz-success');
                    mockFile.previewElement.classList.add('dz-complete'); */
                    // let file = new File([""], f.name, { type: f.contentType, size: f.size, lastModified: new Date().getTime() })
                    // file.size = f.size
                    // let file = { size: f.size, name: f.name, type: f.contentType, uuid: this.generateUUID() };
                    /* let url = this.publicPath + f.url;
                    this.$refs.architectDocUploader.$refs.dropzone.manuallyAddFile(myFile, url); */
                })
                // OBJECT_PHOTOS
                this.editingItem.objectPhotoList.forEach(f => {
                    fetch(this.publicPath + f.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = f.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], f.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + f.url;
                            this.$refs.photosUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));
                    /* let file = { size: f.size, name: f.name, type: f.contentType, uuid: this.generateUUID() };
                    let url = this.publicPath + f.url;
                    this.$refs.photosUploader.$refs.dropzone.manuallyAddFile(file, url); */
                })
                if (this.editingItem.passportDocFileUrl) {
                    // PASSPORT_DOC_FILE
                    fetch(this.publicPath + this.editingItem.passportDocFileUrl.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = this.editingItem.passportDocFileUrl.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], this.editingItem.passportDocFileUrl.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + this.editingItem.passportDocFileUrl.url;
                            this.$refs.passportDocUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));
                    /* let pDocFile = { size: this.editingItem.passportDocFileUrl.size, name: this.editingItem.passportDocFileUrl.name, type: this.editingItem.passportDocFileUrl.contentType, uuid: this.generateUUID() };
                    let pDocFileUrl = this.publicPath + this.editingItem.passportDocFileUrl.url;
                    this.$refs.passportDocUploader.$refs.dropzone.manuallyAddFile(pDocFile, pDocFileUrl); */
                }
                if (this.editingItem.passportPhotoUrl) {
                    // PASSPORT_PHOTO
                    fetch(this.publicPath + this.editingItem.passportPhotoUrl.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = this.editingItem.passportPhotoUrl.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], this.editingItem.passportPhotoUrl.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + this.editingItem.passportPhotoUrl.url;
                            this.$refs.passportPhotoUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));
                    /* let pPhoto = { size: this.editingItem.passportPhotoUrl.size, name: this.editingItem.passportPhotoUrl.name, type: this.editingItem.passportPhotoUrl.contentType, uuid: this.generateUUID() };
                    let pPhotoUrl = this.publicPath + this.editingItem.passportPhotoUrl.url;
                    this.$refs.passportPhotoUploader.$refs.dropzone.manuallyAddFile(pPhoto, pPhotoUrl); */
                }
                if (this.editingItem.paymentDocFileUrl) {
                    // PAYMENT_DOC_FILE
                    fetch(this.publicPath + this.editingItem.paymentDocFileUrl.url)
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            myBlob.name = this.editingItem.paymentDocFileUrl.name;
                            myBlob.lastModified = new Date();
                            const myFile = new File([myBlob], this.editingItem.paymentDocFileUrl.name, {
                                type: myBlob.type,
                            });

                            let url = this.publicPath + this.editingItem.paymentDocFileUrl.url;
                            this.$refs.paymentDocUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                        })
                        .catch(e => console.log(e));
                    /* let paymentFile = { size: this.editingItem.paymentDocFileUrl.size, name: this.editingItem.paymentDocFileUrl.name, type: this.editingItem.paymentDocFileUrl.contentType, uuid: this.generateUUID() };
                    let paymentFileUrl = this.publicPath + this.editingItem.paymentDocFileUrl.url;
                    this.$refs.paymentDocUploader.$refs.dropzone.manuallyAddFile(paymentFile, paymentFileUrl); */
                }
            }
        },
        collectErr (key) {
            if (this.errors[key] !== undefined) {
                return this.errors[key];
            }
            return undefined;
        },
        hasError (key) {
            if (this.errors[key] !== undefined) {
                return true;
            }
            return false;
        },
        /* dataURLtoFile (dataurl, filename) {
            let arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }, */
        makeAndReturnFormData () {
            let form = new FormData();
            if (this.isByGovernment) {
                /* this.architectDocFile.forEach(f => {
                    form.append("architectDocFiles", this.dataURLtoFile(f.file, f.name));
                }) */
                this.architectDocFile.forEach(f => {
                    form.append("architectDocFiles", f.file);
                })
            } else if (this.isByAgency) {
                /* this.architectDocFile.forEach(f => {
                    form.append("architectDocFiles", this.dataURLtoFile(f.file, f.name));
                })
                this.photos.forEach(f => {
                    form.append("objectPhotos", this.dataURLtoFile(f.file, f.name));
                })
                form.append("isMainIndexForObjectPhotos", this.photos.length ? 0 : null);

                this.passportDocFile.forEach(f => {
                    form.append("passportDocFile", this.dataURLtoFile(f.file, f.name));
                })
                this.passportPhoto.forEach(f => {
                    form.append("passportPhoto", this.dataURLtoFile(f.file, f.name));
                })
                this.paymentDocFile.forEach(f => {
                    form.append("paymentDocFile", this.dataURLtoFile(f.file, f.name));
                }) */
                this.architectDocFile.forEach(f => {
                    form.append("architectDocFiles", f.file);
                })
                this.photos.forEach(f => {
                    form.append("objectPhotos", f.file);
                })
                // form.append("isMainIndexForObjectPhotos", this.photos.length ? 0 : null);

                this.passportDocFile.forEach(f => {
                    form.append("passportDocFile", f.file);
                })
                this.passportPhoto.forEach(f => {
                    form.append("passportPhoto", f.file);
                })
                this.paymentDocFile.forEach(f => {
                    form.append("paymentDocFile", f.file);
                })
            }
            return form
        },
        async save () {
            this.computedObserver.validate().then(async valid => {
                if (valid) {
                    if ((!this.passportPhoto && !this.passportDocFile) || ((this.passportPhoto ? !this.passportPhoto.length : true) && (this.passportDocFile ? !this.passportDocFile.length : true))) {
                        this.$toast(this.$t('messages.fill_ad_passport_doc_or_photo'), { type: 'error' });
                        return
                    }
                    if (this.isByAgency) {
                        await crudAndListsService
                            .saveFileEntity(`second-agent-files/${this.$route.params.id}`, this.makeAndReturnFormData())
                            .then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                            .catch(e => console.log(e));
                    } else if (this.isByGovernment) {
                        await crudAndListsService
                            .saveFileEntity(`first-agent-files/${this.$route.params.id}`, this.makeAndReturnFormData())
                            .then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                            .catch(e => console.log(e));
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
        // this.$store.commit('SET_GLOBAL_LOADING', true)
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true, null, this.isByGovernment ? APPEND_API_URL_FOR_GOVERNMENT : this.isByAgency ? APPEND_API_URL_FOR_AGENCY : false)
            .then(async res => {
                this.editingItem = res.data
                await this.setFilesFromServer()
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                // this.$store.commit('SET_GLOBAL_LOADING', false)
            })
    },
    /*
    WATCH */
    watch: {
        veeErrors: {
            handler (val, oldVal) {
                this.errors = [];
                val.items.map((err) => {
                    /* if (this.fields.hasOwnProperty(err.field) !== -1) {
                        this.errors[err.field] = err.msg;
                    } */
                });
            },
            deep: true,
        },
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

.dz-remove {
    display: inline-block !important;
    width: 1.2em;
    height: 1.2em;

    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1000;

    font-size: 1.2em !important;
    line-height: 1em;

    text-align: center;
    font-weight: bold;
    border: 1px solid gray !important;
    border-radius: 1.2em;
    color: gray;
    background-color: white;
    opacity: 0.5;
}

.dz-remove:hover {
    text-decoration: none !important;
    opacity: 1;
}
</style>
