<template>
    <div>
        <section class="contact_wrapper">
            <div class="contact_info">
                <div style="margin-bottom: 80px">
                    <ValidationObserver
                            ref="observer"
                            v-slot="{}"
                    >
                        <b-row class="mb-3">
                            <b-col
                                    sm="12"
                                    md="12"
                            >
                                <BaseMultiselectWithValidation
                                        custom-styles="grid-template-columns: 0% 90%"
                                        rules="required"
                                        class="required"
                                        label-on-top
                                        v-model="editingItem.personId"
                                        :options="personType.map(e => e.id)"
                                        :label="$t('word_templates.person_type')"
                                        :placeholder="$t('word_templates.person_type')"
                                        open-direction="bottom"
                                        :show-labels="false"
                                        :custom-label="customLabelPersonType"
                                />
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col
                                    sm="12"
                                    md="12"
                            >
                                <BaseMultiselectWithValidation
                                        custom-styles="grid-template-columns: 0% 90%"
                                        label-on-top
                                        v-model="templateCategory"
                                        :options="category.map(e => e.id)"
                                        :label="$t('word_templates.categories')"
                                        :placeholder="$t('word_templates.categories')"
                                        open-direction="bottom"
                                        :show-labels="false"
                                        :custom-label="customLabelCategory"
                                        @search-change="fetchCategoryList"
                                />
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col
                                    sm="12"
                                    md="12"
                            >
                                <BaseMultiselectWithValidation
                                        custom-styles="grid-template-columns: 0% 90%"
                                        rules="required"
                                        class="required"
                                        label-on-top
                                        v-model="editingItem.templateId"
                                        :options="templates.map(e => e.id)"
                                        :label="$t('word_templates.templates')"
                                        :placeholder="$t('word_templates.templates')"
                                        open-direction="bottom"
                                        :show-labels="false"
                                        :custom-label="customLabelTemplate"
                                        @search-change="fetchTemplateList"
                                />
                            </b-col>
                        </b-row>
                        <div
                                v-if="editingItem.personId ? personType.find(e => e.id === editingItem.personId).code=='Legal' : false">
                            <b-row class="mb-3">
                                <b-col
                                        sm="12"
                                        md="12"
                                >
                                    <BaseMultiselectWithValidation
                                            custom-styles="grid-template-columns: 0% 90%"
                                            rules="required"
                                            class="required"
                                            label-on-top
                                            v-model="editingItem.organizationLetterId"
                                            :options="organization.map(e => e.id)"
                                            :label="$t('word_templates.organizations')"
                                            :placeholder="$t('word_templates.organizations')"
                                            open-direction="bottom"
                                            :show-labels="false"
                                            :custom-label="customLabelOrganization"
                                            @search-change="fetchOrganizationList"
                                    />
                                </b-col>
                            </b-row>
                        </div>
                        <div
                                v-else-if="editingItem.personId ? personType.find(e => e.id === editingItem.personId).code=='Physical' : false">
                            <b-row class="mb-3">
                                <b-col
                                        sm="12"
                                        md="12"
                                >
                                    <BaseInputWithValidation
                                            custom-styles="grid-template-columns: 0% 90%"
                                            rules="required"
                                            class="required"
                                            label-on-top
                                            v-model="editingItem.senderFio"
                                            :label="$t('submodules.doc.senderFIO')"
                                            :placeholder="$t('submodules.doc.senderFIO')"
                                    />
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col
                                        sm="12"
                                        md="12"
                                >
                                    <BaseInputWithValidation
                                            custom-styles="grid-template-columns: 0% 90%"
                                            rules="required"
                                            class="required"
                                            label-on-top
                                            v-model="editingItem.senderRegion"
                                            :label="$t('submodules.integration.osimlik_info.fields.APLC_ADDR')"
                                            :placeholder="$t('submodules.integration.osimlik_info.fields.APLC_ADDR')"
                                    />
                                </b-col>
                            </b-row>
                        </div>


                        <!--            <b-row class="mb-3">-->
                        <!--              <b-col-->
                        <!--                  sm="12"-->
                        <!--                  md="12"-->
                        <!--              >-->
                        <!--                <BaseInputWithValidation-->
                        <!--                    custom-styles="grid-template-columns: 0% 90%"-->
                        <!--                    rules="required"-->
                        <!--                    class="required"-->
                        <!--                    label-on-top-->
                        <!--                    v-model="editingItem.outgoingNumber"-->
                        <!--                    :label="$t('word_templates.outgoingNumber')"-->
                        <!--                    :placeholder="$t('word_templates.outgoingNumber')"-->
                        <!--                />-->
                        <!--              </b-col>-->
                        <!--            </b-row>-->

                        <b-row class="mb-3">
                            <b-col
                                    sm="12"
                                    md="12"
                            >
                                <BaseDatePickerWithValidation
                                        custom-styles="grid-template-columns: 0% 90%"
                                        rules="required"
                                        class="required"
                                        required
                                        label-on-top
                                        format="DD-MM-YYYY"
                                        :label="$t('word_templates.outgoingDate')"
                                        :placeholder="$t('word_templates.outgoingDate')"
                                        v-model="editingItem.outgoingDate"
                                />
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col
                                    sm="12"
                                    md="12"
                            >
                                <BaseInputWithValidation
                                        custom-styles="grid-template-columns: 0% 90%"
                                        rules="required"
                                        class="required"
                                        label-on-top
                                        v-model="editingItem.outgoingNumber"
                                        :label="$t('word_templates.outgoingNumber')"
                                        :placeholder="$t('word_templates.outgoingNumber')"
                                />
                            </b-col>
                        </b-row>
                        <!--                        <b-row class="mb-3"-->
                        <!--                               v-if="editingItem && editingItem.personId ? personType.find(e => e.id === editingItem.personId).code=='Legal' : false">-->
                        <!--                            <b-col-->
                        <!--                                    sm="12"-->
                        <!--                                    md="12"-->
                        <!--                            >-->
                        <!--                                <BaseDatePickerWithValidation-->
                        <!--                                        custom-styles="grid-template-columns: 0% 90%"-->
                        <!--                                        required-->
                        <!--                                        label-on-top-->
                        <!--                                        format="DD-MM-YYYY"-->
                        <!--                                        :label="$t('word_templates.incomingDate')"-->
                        <!--                                        :placeholder="$t('word_templates.incomingDate')"-->
                        <!--                                        v-model="editingItem.incomingDate"-->
                        <!--                                />-->
                        <!--                            </b-col>-->
                        <!--                        </b-row>-->
                        <!--                        <b-row class="mb-3"-->
                        <!--                               v-if="editingItem && editingItem.personId ? personType.find(e => e.id === editingItem.personId).code=='Legal' : false">-->
                        <!--                            <b-col-->
                        <!--                                    sm="12"-->
                        <!--                                    md="12"-->
                        <!--                            >-->
                        <!--                                <BaseInputWithValidation-->
                        <!--                                        custom-styles="grid-template-columns: 0% 90%"-->
                        <!--                                        label-on-top-->
                        <!--                                        v-model="editingItem.incomingNumber"-->
                        <!--                                        :label="$t('word_templates.incomingNumber')"-->
                        <!--                                        :placeholder="$t('word_templates.incomingNumber')"-->
                        <!--                                />-->
                        <!--                            </b-col>-->
                        <!--                        </b-row>-->
                    </ValidationObserver>
                </div>
                <div class="soci_wrap float-right">
                    <b-button block variant="outline-primary"
                              @click="Export2WordSave( 'word')">
                        <!--                      <i class="bx bx-printer label-icon"></i>-->
                        {{ $t("actions.print") }}
                    </b-button>
                </div>
            </div>
            <div class="contact_msg scrl pl-5 pr-5 p-2">
                <div id="exportContent1"
                     v-show="personTypeBool">
          <span
                  id="edit"
                  v-html="body1"
                  :tag="'textarea'"
                  :config="config"
                  ref="editorRef">
          </span>
                </div>

                <div id="exportContent2"
                     v-show="!personTypeBool">
          <span
                  id="edit"
                  v-html="body2"
                  :tag="'textarea'"
                  :config="config"
                  ref="editorRef">
          </span>
                </div>
            </div>

        </section>
    </div>
</template>

<script>

import crudAndListsService from "@/shared/services/crud_and_list.service";
import helperService from "@/shared/services/helper.service";
import Service from "@/modules/letter/letterService";
import i18n from "@/i18n";


const MAIN_API_URL = 'templates/sample'
const CATEGORY_API_URL = 'template/category'

export default {
    components: {},
    validations: {
        appealNumber: null,
        phoneNumber: null,
        message: null,
        region: null,
        phoneCode: null
    },
    async created() {
        await this.getCategory();
        await this.getTemplateHeader();
        await this.getTemplates();
        await this.getOrganization();
        await this.getEmpty();

    },

    watch: {
        // 'editingItem.incomingNumber': {
        //     handler(id) {
        //         if (id !== null) {
        //             this.getBodyHtml1()
        //             this.getBodyHtml2()
        //         } else {
        //         }
        //     }
        // },
        // 'editingItem.incomingDate': {
        //     handler(id) {
        //         if (id !== null) {
        //             this.getBodyHtml1()
        //             this.getBodyHtml2()
        //         } else {
        //         }
        //     }
        // },
        'editingItem.outgoingNumber': {
            handler(id) {
                if (id !== null) {
                    this.getBodyHtml1()
                    this.getBodyHtml2()
                } else {
                }
            }
        },
        'editingItem.outgoingDate': {
            handler(id) {
                if (id !== null) {
                    this.getBodyHtml1()
                    this.getBodyHtml2()
                } else {
                }
            }
        },
        'editingItem.senderRegion': {
            handler(id) {
                if (id !== null) {
                    this.getBodyHtml1()
                    this.getBodyHtml2()
                } else {
                }
            }
        },
        'editingItem.senderFio': {
            handler(id) {
                if (id !== null) {
                    this.getBodyHtml1()
                    this.getBodyHtml2()
                } else {
                }
            }
        },
        'editingItem.templateId': {
            handler(id) {
                if (id !== null) {
                    this.getBodyHtml1()
                    this.getBodyHtml2()
                } else {
                }
            }
        },
        'editingItem.personId': {
            handler(id) {
                if (id !== null) {
                    if (id === 1) {
                        this.personTypeBool = true;
                    }
                    if (id === 2) {
                        this.personTypeBool = false;
                        // this.editingItem.incomingNumber = ""
                        // this.editingItem.incomingDate = ""
                    }
                } else {
                }
            }
        },
        'templateCategory': {
            handler(id) {
                if (id !== null) {
                    this.fetchTemplateList('')
                } else {
                }
            }
        },

        'editingItem.organizationLetterId': {
            handler(id) {
                if (id !== null) {
                    this.organizationName = this.organization.find(e => e.id === this.editingItem.organizationLetterId)

                } else {
                    this.organizationName = {
                        nameUz: '',
                        adress: '',
                        email: '',
                    };
                }
                this.getBodyHtml1()
                this.getBodyHtml2()
            },
        },
        region: {
            handler(id) {
                if (id !== null) {
                    this.regionFull = this.regions.find(e => e.id == id);
                } else {
                    this.regionFull = null;
                }
            },
        },
        phoneId(id) {
            if (id !== null) {
                this.phoneCode = this.phoneCodes.find(e => e.id == id);
            } else {
                this.phoneCode = null;
            }
        },
    },
    computed: {

        computedObserver() {
            return this.$refs.observer
        }
    },
    methods: {
        getBodyHtml1() {
            let body;
            if (this.editingItem.templateId) {
                let header = '<img style="width: 100% !important; display: block" src="' + this.templateHeader + '" />'


                let bodyHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                    "            <span style='font-weight:bold;font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    this.editingItem.outgoingDate + "<span style='margin-left:64.2pt;'>    </span>" + this.editingItem.outgoingNumber +
                    "- son</span>\n" +
                    "          </p>"


                let bodyHtmlheaderRight = "  <p id=\"isPasted\"\n" +
                    "             style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    this.organizationName.nameUz +
                    "</span>\n" +
                    "          </p>\n" +
                    "          <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:11pt;font-family:\"Times New Roman\",serif;'> " +
                    this.organizationName.adress +
                    "</span>\n" +
                    "          </p>\n" +
                    "          <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:10pt;font-family:\"Times New Roman\",serif;'><i> " +
                    this.organizationName.email +
                    "</i></span>\n" +
                    "          </p>"
                // let innerDateNUmberHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                //     "<span style='font-weight:bold;font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                //     this.editingItem.incomingDate + "<span style='margin-left:64.2pt;'>    </span>" + this.editingItem.incomingNumber +
                //     "- son</span>\n" +
                //     "</p>"
                let innerDateNUmberHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                    "</p>"

                body = header + bodyHtml + bodyHtmlheaderRight + innerDateNUmberHtml + this.templates.find(e => e.id === this.editingItem.templateId).bodyHtml
            }
            this.body1 = body
        },
        getBodyHtml2() {
            let body;
            if (this.editingItem.templateId) {
                let header = '<img style="width: 100% !important; display: block" src="' + this.templateHeader + '" />'

                let bodyHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                    "            <span style='font-weight:bold;font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    this.editingItem.outgoingDate + "<span style='margin-left:64.2pt;'>    </span>" + this.editingItem.outgoingNumber +
                    "- son</span>\n" +
                    "          </p>"


                let bodyHtmlheaderRight = "  <p id=\"isPasted\"\n" +
                    "style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "<span style='font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    this.editingItem.senderFio +
                    "</span>\n" +
                    "</p>\n" +
                    "<p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "<span style='font-size:11pt;font-family:\"Times New Roman\",serif;'> " +
                    this.editingItem.senderRegion +
                    "</span>\n" +
                    "</p>\n"

                let innerDateNUmberHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                    "</p>"

                body = header + bodyHtml + bodyHtmlheaderRight + innerDateNUmberHtml + this.templates.find(e => e.id === this.editingItem.templateId).bodyHtml
            }
            this.body2 = body

        },
        async Export2WordSave(filename = '') {

            this.computedObserver.validate().then(valid => {
                if (valid) {
                    let element = null
                    if (this.personTypeBool) {
                        element = 'exportContent1'
                    } else {
                        element = 'exportContent2'
                    }
                    this.editingItem.headerId = this.templateHeaderId
                    this.editingItem.templateBodyHtml = this.body2
                    this.Export2Word(element, filename)

                    // crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
                    //     this.computedObserver.reset()
                    //     this.editingItem = Object.assign({}, {});
                    //     this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                    //
                    //     this.Export2Word(element, filename)
                    //     setTimeout(() => {
                    //         this.$router.push({name: 'WordTemplateSampleListMain'})
                    //     }, 1000)
                    // })
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
                }
            });
        },
        Export2Word(element, filename = '') {
            var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
            var postHtml = "</body></html>";
            var html = preHtml +
                document.getElementById(element).innerHTML +
                postHtml;

            // document.getElementById("add_to_me").innerHTML +=
            //     "<h3>This is the text which has been inserted by JS</h3>";

            var blob = new Blob(['\ufeff', html], {
                type: 'application/msword'
            });

            // Specify link url
            var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

            // Specify file name
            filename = filename ? filename + '.doc' : 'document.doc';

            // Create download link element
            var downloadLink = document.createElement("a");

            document.body.appendChild(downloadLink);

            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                // Create a link to the file
                downloadLink.href = url;

                // Setting the file name
                downloadLink.download = filename;

                //triggering the function
                downloadLink.click();
            }

            document.body.removeChild(downloadLink);
            // var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            //     "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            //     "xmlns='http://www.w3.org/TR/REC-html40'>" +
            //     "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
            // var footer = "</body></html>";
            // var sourceHTML = header + this.editingItem.templateBodyHtml + footer;
            //
            // var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            // var fileDownload = document.createElement("a");
            // document.body.appendChild(fileDownload);
            // fileDownload.href = source;
            // fileDownload.download = 'document.docx';
            // fileDownload.click();
            // document.body.removeChild(fileDownload);
        },
        async getEmpty() {
            this.var_default_search_payload.itemsPerPage = 100
            await crudAndListsService.getEmpty(MAIN_API_URL, null, true)
                .then(res => {
                    this.editingItem = res.data
                    this.editingItem.outgoingDate = "__________"
                    this.editingItem.outgoingNumber = ""
                    this.editingItem.incomingDate = "__________"
                    this.editingItem.incomingNumber = ""
                    this.editingItem.senderFio = ""
                    this.editingItem.senderRegion = ""

                })
                .catch(e => {
                    console.log(e)
                })
        },
        customLabelCategory(opt) {
            let selected = this.category.find(e => e.id === opt);
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
        fetchCategoryList(keyword = '', callback = null) {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = keyword
            crudAndListsService
                .searchListWithKeyword(CATEGORY_API_URL, this.var_default_search_payload)
                .then(res => {
                    this.category = res.data.list
                    callback();
                })
                .catch(e => {
                    console.log(e)
                })
        },
        customLabelOrganization(opt) {
            let selected = this.organization.find(e => e.id === opt);
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
        fetchOrganizationList(keyword = '', callback = null) {
            Service.searchList('template/category', this.var_default_search_payload, null, true)
                .then(res => {
                    this.category = res.data.list
                    callback();
                })
                .catch(e => {
                    console.log(e)
                })
        },
        customLabelTemplate(opt) {
            let selected = this.templates.find(e => e.id === opt);
            if (selected) {
                return selected.name
            }
            return ``;
        },
        customLabelPersonType(opt) {
            let selected = this.personType.find(e => e.id === opt);
            if (selected) {
                return selected.name
            }
            return ``;
        },
        async fetchTemplateList(keyword = '', callback = null) {
            this.loadingTableItems = true
            // this.var_default_search_payload.keyword = keyword
            let payload = Object.assign({}, this.var_default_search_payload)
            payload.page = 0;
            payload.itemsPerPage = 500;
            await helperService.getTemplateByCategoryId(this.templateCategory, keyword, payload)
                .then(res => {
                    this.templates = res.data.list
                })
                .catch(e => {
                    this.templates = [];
                }).finally(() => {
                    this.loadingTableItems = false
                })
        },

        getValue(v) {
            console.log(v)
            // this.form.tableId = v;
        },

        async getCategory() {
            // this.var_default_search_payload.itemsPerPage = 100
            await crudAndListsService.searchListWithKeyword("template/category", this.var_default_search_payload)
                .then(res => {
                    this.category = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
        },
        async getTemplateHeader() {
            await crudAndListsService.getEmptyCustomUrl('templates/header/get-region-id', true)
                .then(res => {
                    this.templateHeader = res.data.headerImg
                    this.templateHeaderId = res.data.id
                })
                .catch(e => {
                    console.log(e)
                })
        },
        async getTemplates() {
            this.var_default_search_payload.itemsPerPage = 100
            await crudAndListsService.searchListWithKeyword("templates", this.var_default_search_payload)
                .then(res => {
                    this.templates = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
        },
        async getOrganization() {
            this.var_default_search_payload.itemsPerPage = 100
            await crudAndListsService.searchListWithKeyword("word-templates/organizations", this.var_default_search_payload)
                .then(res => {
                    this.organization = res.data.list
                })
                .catch(e => {
                    console.log(e)
                })
        },
        async reset() {
            this.appealNumber = null,
                this.phoneNumber = null,
                this.regionFull = null,
                this.phoneCode = null
            this.phoneId = null
            this.region = null
        },
        async sendMsg() {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    this.loader = true
                    let info = {
                        uNumber: '+998' + this.phoneCode.code + this.phoneNumber,
                        mNumber: this.appealNumber,
                        isRepublic: this.regionFull.isRepublic,
                        rAdministration: this.regionFull.regionalAdministration,
                        rAddress: this.regionFull.address,
                        rPhoneNumber: this.regionFull.phoneNumber
                    }

                    helperService.sendMessageToUser(info)
                        .then(res => {
                            this.$toast(this.$t('send_message.success'), {type: 'success'});
                            this.loader = false
                            this.computedObserver.reset()
                            this.reset();

                        })
                        .catch(e => {
                            console.log(e)
                        })
                        .finally(f => {
                            this.loader = false
                        })
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
                }
            })
        }
    },
    data() {
        return {
            personTypeBool: null,
            config: {
                tableStyles: {
                    class1: "No borders",
                },
                embedlyScriptPath: "",
                imageInsertButtons: ["imageUpload", "|", "imageByURL"],
                language: "ru",
                events: {
                    "image.beforeUpload": (files) => {
                        let editor = this.$refs.editorRef.getEditor();
                        if (files.length > 0) {
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                let result = e.target.result;
                                editor.image.insert(result, null, null, editor.image.get());
                            };
                            reader.readAsDataURL(files[0]);
                        }
                        editor.popups.hideAll();
                        return false;
                    },
                },
                documentReady: true,
                fontSize: [
                    "3",
                    "4",
                    "6",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "14",
                    "16",
                    "18",
                    "22",
                    "24",
                    "30",
                    "36",
                    "48",
                    "60",
                    "72",
                    "96",
                ],
                fontFamilyDefaultSelection: "Times New Roman",
                // imageUploadRemoteUrls: false,
                toolbarButtons: [
                    "fullscreen",
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript",
                    "textColor",
                    "backgroundColor",
                    // "|",
                    "fontFamily",
                    "fontSize",
                    // "color",
                    // "inlineClass",
                    // "inlineStyle",
                    // "paragraphStyle",
                    "lineHeight",
                    "|",
                    "paragraphFormat",
                    "align",
                    "formatOL",
                    "formatUL",
                    "outdent",
                    "indent",
                    // "quote",
                    // "-",
                    // "insertLink",
                    "insertImage",
                    // "insertVideo",
                    //   "embedly",
                    //   "insertFile",
                    "insertTable",
                    "html",
                    "|",
                    //   "emoticons",
                    //   "fontAwesome",
                    "specialCharacters",
                    // "insertHR",
                    // "selectAll",
                    // "clearFormatting",
                    // "|",
                    //   "print",
                    //   "getPDF",
                    //   "spellChecker",
                    // "help",

                    //   "|",
                    //   "undo",
                    //   "redo",
                ],
                charCounterCount: false,
                tabSpaces: 4,
                height: 600,
                fontSizeUnit: "pt",
                placeholderText: "",

                // events: {
                //   initialized: function () {},
                // },
            },
            templateHeader: {},
            templateHeaderId: null,
            organizationName: {},
            regionFull: null,
            templateCategory: null,
            category: [],
            templates: [],
            organization: [],
            editingItem: {},
            body1: "",
            body2: "",
            personType: [
                {id: 1, name: i18n.t('word_templates.legal'), code: 'Legal'},
                {id: 2, name: i18n.t('word_templates.physical'), code: 'Physical'}
            ],
            phoneCode: null,
            phoneId: null,
            appealNumber: null,
            phoneNumber: null,
            mDate: null,
            region: null,
            message: null,
            title: null,
            submitted: false,
            loader: false
        };
    },
}
</script>

<style lang="scss" scoped>


@mixin size($point) {
  @if $point == lg-device {
    @media (min-width: 1024px) and (max-width: 1600px) {
      @content;
    }
  } @else if $point == md-device {
    @media (min-width: 768px) and (max-width: 1023px) {
      @content;
    }
  } @else if $point == sm-device {
    @media (max-width: 767px) {
      @content;
    }
  }
}

@font-face {
  font-family: "Material Icons Outlined";
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialiconsoutlined/v54/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2) format("woff2");
}

.material-icons-outlined {
  font-family: "Material Icons Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: sans-serif;
  font-size: 14px;
  color: #222;
  box-sizing: border-box;
  background-size: 100vw 100vh;
  height: 100vh;
  align-items: center;
  justify-content: center;
  @include size(md-device) {
    align-items: baseline;
  }
  @include size(sm-device) {
    align-items: baseline;
  }
}

.contact_wrapper {
  border-radius: 10px;
  display: flex;
  // align-items: center;
  background: white;
  padding: 30px 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 100%;
  min-height: 800px;
  @include size(md-device) {
    width: 80%;
    flex-direction: column;
  }
  @include size(sm-device) {
    width: 90%;
    flex-direction: column;
    padding-top: 0px;
  }

  .contact_info {
    border-radius: 8px;
    position: relative;
    width: 450px;
    flex: 0 0 450px;
    background: #095a54;
    color: #f6f6f6;
    margin-left: -40px;
    padding: 25px;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    @include size(md-device) {
      width: 100%;
      flex: 0 0 100%;
      margin-left: -50px;
      margin-top: -15px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
    @include size(sm-device) {
      width: 100%;
      flex: 0 0 100%;
      margin-left: -25px;
      margin-top: 0px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    .title {
      font-size: 24px;
      margin: 0px;
      font-weight: 400;
      margin-bottom: 30px;
    }

    .icons_wrapp {
      margin: 0px;
      padding: 0px;
      list-style: none;
      margin-bottom: 30px;

      li {
        display: flex;
        align-items: baseline;
        margin-bottom: 25px;

        .icon {
          .material-icons-outlined {
            vertical-align: middle;
            font-size: 24px;
            width: 32px;
          }
        }

        .text {
          vertical-align: middle;
          line-height: 1.4;
        }
      }
    }

    .soci_wrap {
      margin: 0px;
      padding: 0px;
      display: flex;
      position: absolute;
      bottom: 25px;
      right: 15%;
      width: 50%;
      float: left;
      font-size: 16px;
    }
  }

  .contact_msg {
    border-radius: 8px;
    border: 1px solid #095A54;
    flex: 0 0 calc(100% - 450px);
    margin: 0 30px 0 30px;

    .title {
      font-size: 24px;
      margin: 0px;
      font-weight: 400;
      margin-bottom: 30px;
      padding: 0 15px;
      color: #095a54;
    }

    .form_fild {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .input_group {
        position: relative;
        margin-bottom: 25px;
        padding: 0 15px;

        &.w_50 {
          width: calc(50% - 30px);
          flex: 0 0 calc(50% - 30px);
          @include size(sm-device) {
            width: calc(100% - 30px);
            flex: 0 0 calc(100% - 30px);
          }
        }

        &.w_100 {
          width: calc(100% - 30px);
          flex: 0 0 calc(100% - 30px);
        }

        .input {
          width: 100%;
          min-height: 30px;
          padding: 5px 0px;
          border: none;
          font-size: 18px;
          color: #444;
          outline: none;
          font-weight: 400;
          border-bottom: solid 2px #e9e9e9;

          &.input_textarea {
            min-width: 100%;
            min-height: 75px;
            max-height: 75px;
            max-width: 100%;
          }

          &:hover {
            border-bottom-color: #ddd;
          }

          &:focus {
            border-bottom-color: #aaa;
          }

          &:valid,
          &:focus {
            ~ .placeholder {
              top: -50px;
              font-size: 12px !important;
              color: #095a54;

              &.textarea {
                top: -12px;
              }
            }
          }
        }

        .placeholder {
          position: absolute;
          left: 15px;
          top: 0px;
          bottom: 0px;
          display: flex;
          align-items: center;
          font-size: 18px;
          color: #bbb;
          font-weight: 400;
          transition: all 0.3s ease;
          pointer-events: none;

          &.textarea {
            align-items: baseline;
          }
        }

        .btn {
          padding: 12px;
          border: none;
          border-radius: 0px;
          background-color: #095a54;
          color: white;
          min-width: 120px;
          outline: none;
          transition: all 0.3s ease;

          &:hover {
            background-color: #06423e;
          }

          &:active {
            transform: scale(0.95);
          }
        }
      }
    }
  }

  .scrl {
    overflow-y: auto !important;
    height: 800px;
    max-height: 100%;
  }
}

hr {
  border: 0;
  margin: 1.35em auto;
  max-width: 100%;
  background-position: 50%;
  box-sizing: border-box;
}

.fade1 {
  margin-bottom: 0px;
  height: 2px;
  $color: #a9a8a8;
  color: $color;
  background-image: linear-gradient(
                  90deg,
                  rgba($color, 1),
                  rgba($color, 1) 50%,
                  rgba($color, 1) 100%);
}

.fade2 {
  border-radius: 5px;
  margin-top: -20px;
  height: 7px;
  $color: #a9a8a8;
  color: $color;
  background-image: linear-gradient(
                  90deg,
                  rgba($color, 1),
                  rgba($color, 1) 50%,
                  rgba($color, 1) 100%);
}

.text-header {
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
}
</style>

<style>
.contractor {
    font-weight: 700;
    font-size: 14px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
}
</style>

