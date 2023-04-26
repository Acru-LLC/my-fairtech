<template>
    <div class="row">
        <div class="col-12">
            <div class="col-md-12 text-center">
                <div class="h4 mb-4 d-inline-block">{{ $t('word_templates.template_header_name') }}</div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-8">
                            <div class="search-box me-4 mb-2 d-inline-block">
                                <div class="position-relative">
                                    <input
                                            v-model="searchKeyword"
                                            type="text"
                                            class="form-control"
                                            @input="fetchTableItems"
                                            :placeholder="$t('column.search')"
                                    />
                                    <i class="bx bx-search-alt search-icon"></i>
                                </div>
                            </div>
                            <div class="col-3 me-2 mx-2 d-inline-block">
                                <span>{{ $t('column.select.text1') }} {{ $t('column.select.text2') }}</span>
                                <!--                <span>{{ $t('column.select.text2') }}</span>-->

                                <div class="position-relative">
                                    <b-form-select
                                            v-model="selected"
                                            :options="optionsTable"
                                            @change="selectList"
                                            class="form-select"
                                    ></b-form-select>
                                </div>
                            </div>
                            <div class="col-5 me-2 mx-2 d-inline-block">
                                <!--                <BaseMultiselectWithValidation-->
                                <!--                    not-required-->
                                <!--                    custom-styles="grid-template-columns: 0% 100%"-->
                                <!--                    v-model="templateCategory"-->
                                <!--                    :options="category.map(e => e.id)"-->
                                <!--                    :placeholder="$t('word_templates.categories')"-->
                                <!--                    open-direction="bottom"-->
                                <!--                    :show-labels="false"-->
                                <!--                    :custom-label="customLabelCategory"-->
                                <!--                    @search-change="fetchCategoryList"-->
                                <!--                />-->
                                <base-multiselect-with-validation
                                        @search-change="fetchCategoryList"
                                        v-model="templateCategory"
                                        not-required
                                        label-on-top
                                        placeholder=""
                                        preserve-search
                                        with-create-addition
                                        open-direction="bottom"
                                        :label="$t('word_templates.categories')"
                                        :max-height="600"
                                        :searchable="true"
                                        :show-labels="false"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        :internal-search="false"
                                        :custom-label="customLabelCategory"
                                        :custom-styles="{display: 'block'}"
                                        :options="category.map((e) => e.id)"
                                />
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="text-sm-end">
                                <b-row>
                                    <b-col cols="10">

                                        <!-- <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          header="Лавозим"
                          worksheet="My Worksheet"
                          name="Лавозим.xls"
                      >
                        <b-btn
                            @click="downloadExcel"
                            type="button"
                            class="btn btn-rounded bg-primary mb-2"
                        >
                          <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                        </b-btn>
                      </download-excel>
                    </div> -->
                                    </b-col>
                                    <b-col cols="5">
                                        <!--                    <b-btn-->
                                        <!--                        type="button"-->
                                        <!--                        class="btn btn-success btn-rounded mb-2 me-2"-->
                                        <!--                        :to="{name: 'CreateTemplateHeader'}"-->
                                        <!--                    >-->
                                        <!--                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}-->
                                        <!--                    </b-btn>-->
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <!-- end col-->
                    </div>
                    <!-- Table data -->
                    <b-table
                            :items="tableItems"
                            :fields="tableFields"
                            :busy="loadingTableItems"
                            id="my-table"
                            class="custom-b-table"
                            responsive
                            striped
                            bordered
                            small
                            show-empty
                    >
                        <!-- NUMBER OF ITEM -->
                        <template #cell(index)="data">
                            {{
                            util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                            }}
                        </template>

                        <!-- NAME -->
                        <template #cell(receiver)="data">
                            <div v-if="data.item.personType == 'Legal'">
                                <p>
                                    {{
                                    getName({
                                      nameLt: data.item.organizationLetterNameLt,
                                      nameRu: data.item.organizationLetterNameRu,
                                      nameUz: data.item.organizationLetterNameUz,
                                      nameEn: data.item.organizationLetterNameEn
                                    })
                                    }}
                                    <br>
                                    {{ data.item.organizationLetterAdress }}
                                    <br>
                                    {{ data.item.organizationLetterEmail }}
                                </p>
                            </div>
                            <div v-if="data.item.personType == 'Physical'">
                                <p>
                                    {{ data.item.senderFio }}
                                    <br>
                                    {{ data.item.senderRegion }}
                                </p>
                            </div>

                        </template>

                        <!-- ACTIONS -->
                        <template #cell(actions)="data">
                            <div class="general-table__actions d-flex justify-content-center">
                                <b-btn
                                        variant="link"
                                        class="text-decoration-none p-0"
                                        style="font-size: 1.2rem; margin-right: 1rem;"
                                >
                                    <i
                                            @click="Export2Word(data.item)"
                                            class="mdi mdi-microsoft-word edit"
                                    ></i>
                                </b-btn>

                                <!--                <b-btn-->
                                <!--                    variant="link"-->
                                <!--                    class="text-decoration-none p-0 text-danger"-->
                                <!--                    style="font-size: 1.2rem;"-->
                                <!--                >-->
                                <!--                  <i-->
                                <!--                      @click="deleteItem(data.item.id)"-->
                                <!--                      class="mdi mdi-trash-can delete"-->
                                <!--                  ></i>-->
                                <!--                </b-btn>-->
                            </div>
                        </template>

                        <!-- EMPTY SLOT -->
                        <template #empty="">
                            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                        </template>

                        <!-- TABLE_BUSY SLOT -->
                        <template #table-busy>
                            <div class="text-center my-2">
                                <b-spinner
                                        variant="primary"
                                        class="align-middle"
                                ></b-spinner>

                            </div>
                        </template>
                    </b-table>
                    <!-- end table -->

                    <b-pagination
                            v-model="var_default_search_payload.page"
                            :total-rows="totalItems"
                            :per-page="var_default_search_payload.itemsPerPage"
                            aria-controls="my-table"
                            class="justify-content-end"
                    ></b-pagination>
                </div>
                <!-- end card-body -->
            </div>
            <!-- end card -->
        </div>
    </div>
  <!-- end row -->
</template>

<script>


import Service from "@/modules/letter/letterService";

const MAIN_API_URL = 'templates/sample'
const CATEGORY_API_URL = 'template/category'

import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service';

export default {
    page: {
        title: "Positions",
        meta: [{name: "description", content: appConfig.description}],
    },
    components: {},
    data() {
        return {
            templateCategory: null,
            category: [],
            x: 200,
            y: 300,
            loadingTableItems: false,
            json_fields: {
                "Name Uz": "nameUz",
                "Name Lt": "nameLt",
                "Name Ru": "nameRu",
            },
            json_data: [],
            json_meta: [
                [
                    {
                        key: "charset",
                        value: "utf-8",
                    },
                ],
            ],
            searchKeyword: '',
            selected: 20,
            optionsTable: [
                {value: 20, text: 20},
                {value: 50, text: 50},
                {value: 100, text: 100},
                {value: 150, text: 150},
                {value: 200, text: 200},
            ],
            title: "Positions",
            activeDep: {},
            tableItems: [],


            totalItems: 0,
            tableFields: [
                {
                    label: "#",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false,
                    key: "index",
                },
                {
                    label: this.$t('word_templates.receiver'),
                    key: "receiver",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    label: this.$t('word_templates.template_name'),
                    key: "templateName",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    label: this.$t('word_templates.personType'),
                    key: "personType",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                // {
                //   label: this.$t('word_templates.incomingDate'),
                //   key: "incomingDate",
                //   thClass: "text-center",
                //   tdClass: "text-center"
                // },
                // {
                //   label: this.$t('word_templates.incomingNumber'),
                //   key: "incomingNumber",
                //   thClass: "text-center",
                //   tdClass: "text-center"
                // },
                {
                    label: this.$t('word_templates.outgoingDate'),
                    key: "outgoingDate",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    label: this.$t('word_templates.outgoingNumber'),
                    key: "outgoingNumber",
                    thClass: "text-center",
                    tdClass: "text-center"
                },
                {
                    label: this.$t('column.actions'),
                    key: "actions",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false
                },
            ],
        };
    },
    /*
    COMPUTED */
    computed: {
        numberOfPages() {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
        },
    },
    methods: {
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
        Export2Word(element, filename = '') {
            var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
            var postHtml = "</body></html>";

            let header = '<img style="width: 100% !important; display: block" src="' + element.headerImg + '" />'

            let bodyHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                "            <span style='font-weight:bold;font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                element.outgoingDate + "<span style='margin-left:64.2pt;'>    </span>" + element.outgoingNumber +
                "- son</span>\n" +
                "          </p>"

            let bodyHtmlheaderRight = null

            if (element.personType == "Legal") {
                let bodyHtmlheaderRight0 = "  <p id=\"isPasted\"\n" +
                    "             style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    this.getName({
                        nameLt: element.organizationLetterNameLt,
                        nameRu: element.organizationLetterNameRu,
                        nameUz: element.organizationLetterNameUz
                    })
                "</span>\n" + "</p>\n"

                let bodyHtmlheaderRight1 = "          <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:11pt;font-family:\"Times New Roman\",serif;'> " +
                    element.organizationLetterAdress +
                    "</span>\n" + " </p>\n"

                let bodyHtmlheaderRight2 = "          <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:11pt;font-family:\"Times New Roman\",serif;'> " +
                    element.organizationLetterEmail +
                    "</span>\n" + " </p>\n"

                bodyHtmlheaderRight = bodyHtmlheaderRight0 + bodyHtmlheaderRight1 + bodyHtmlheaderRight2

            } else if (element.personType == "Physical") {
                let bodyHtmlheaderRight0 = "  <p id=\"isPasted\"\n" +
                    "             style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
                    element.senderFio +
                    "</span>\n" + "</p>\n"

                let bodyHtmlheaderRight1 = "          <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;text-align:right;text-indent:35.45pt;'>\n" +
                    "            <span style='font-size:11pt;font-family:\"Times New Roman\",serif;'> " +
                    element.senderRegion +
                    "</span>\n" + " </p>\n"

                bodyHtmlheaderRight = bodyHtmlheaderRight0 + bodyHtmlheaderRight1
            }


            // let innerDateNUmberHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
            //     "            <span style='font-weight:bold;font-size:14pt;font-family:\"Times New Roman\",serif;'>" +
            //     element.incomingDate + "<span style='margin-left:64.2pt;'>    </span>" + element.incomingNumber +
            //     "- son</span>\n" +
            //     "          </p>"

            let innerDateNUmberHtml = " <p style='margin:0cm;font-size:11pt;font-family:\"Calibri\",sans-serif;margin-left:14.2pt;margin-top:14.2pt;text-align:justify;text-indent:35.45pt;'>\n" +
                "</p>"

            var html = preHtml +
                header + bodyHtml + bodyHtmlheaderRight + innerDateNUmberHtml + element.templateBodyHtml
            postHtml;
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
        }
        ,
        resize(newRect) {
            this.width = newRect.width;
            this.height = newRect.height;
            this.y = newRect.top;
            this.x = newRect.left;
        }
        ,
        fetchDateTypesByParentId(parentId, index) {
            let payload = Object.assign({}, this.var_default_search_payload)
            payload.page = 0;
            payload.itemsPerPage = 500;
            this.$set(this.tableItems[index], 'loadingInnerData', true)
            helperService
                .fetchDateTypesByParentId(parentId, payload)
                .then((res) => {
                    this.$set(this.tableItems[index], 'children', res.data.list)
                })
                .catch(e => {
                    this.$set(this.tableItems[index], 'children', [])
                })
                .finally(() => {
                    this.$set(this.tableItems[index], 'loadingInnerData', false)
                })
        }
        ,
        rowClicked(item, index) {
            this.$set(item, '_showDetails', !item._showDetails)
            this.fetchDateTypesByParentId(item.id, index)
        }
        ,
        downloadExcel() {
            this.json_data = []
            this.tableItems.forEach(res => {
                let obj = {}
                obj.nameUz = res.nameUz
                obj.nameLt = res.nameLt
                obj.nameRu = res.nameRu
                this.json_data.push(obj)
            })
        }
        ,
        selectList($event) {
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems();
        }
        ,
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
        async fetchTemplateList(keyword = '', callback = null) {
            this.loadingTableItems = true
            // this.var_default_search_payload.keyword = keyword
            let payload = Object.assign({}, this.var_default_search_payload)
            payload.page = 0;
            payload.itemsPerPage = 500;
            await helperService.getTemplateListByCategoryId(this.templateCategory, '', keyword, payload)
                .then(res => {
                    this.tableItems = res.data.list;
                    this.totalItems = res.data.total;
                })
                .catch(e => {
                    this.templates = [];
                }).finally(() => {
                    this.loadingTableItems = false
                })
        }
        ,
        fetchTableItems() {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            this.var_default_search_payload.personType = ''
            this.var_default_search_payload.categoryId = ''
            crudAndListsService
                .searchListWithKeywordAndPersonType(MAIN_API_URL, this.var_default_search_payload)
                .then((res) => {
                    this.tableItems = res.data.list;
                    this.totalItems = res.data.total;
                })
                .catch(e => {
                    this.tableItems = [];
                    this.totalItems = 0;
                })
                .finally(() => {
                    this.loadingTableItems = false
                })
        }
        ,
        editItem(id) {
            this.$router.push({name: 'UpdateTemplateHeader', params: {id: id}})
        }
        ,
        deleteItem(id, parentId = null, parentIndex = null, forChild = false) {
            this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
                okTitle: this.$t('actions.confirm'),
                cancelTitle: this.$t('actions.cancel')
            })
                .then(value => {
                    if (value) {
                        crudAndListsService
                            .deleteById(MAIN_API_URL, id)
                            .then((res) => {
                                if (forChild && parentId) {
                                    this.fetchDateTypesByParentId(parentId, parentIndex)
                                } else {
                                    this.fetchTableItems()
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        }
        ,
    },
    /* CREATED */
    async created() {
        await this.fetchTableItems()
        await this.getCategory();
    },
    /*
    WATCH */
    watch: {
        'templateCategory': {
            handler(id) {
                if (id !== null) {
                    this.fetchTemplateList('')
                } else {
                }
            }
        },
        'var_default_search_payload.page': {
            handler() {
                this.fetchTableItems()
            }
        }
    }
};
</script>

<style scoped lang='scss'>
</style>
