<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('send_message.history') }}</div>
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
              <span>{{ $t('column.select.text1') }}</span>
              <div class="col-2 me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
              <span>{{ $t('column.select.text2') }}</span>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-row>
                  <b-col cols="11">
                    <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          header="Бўлинма тури"
                          worksheet="My Worksheet"
                          name="Бўлинма_тури.xls"
                      >
                        <b-btn
                            type="button"
                            class="btn btn-rounded bg-primary mb-2"
                        >
                          <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                        </b-btn>
                      </download-excel>
                    </div>
                  </b-col>
                  <!--                  <b-col cols="5">-->
                  <!--                    <b-btn-->
                  <!--                        type="button"-->
                  <!--                        class="btn btn-success btn-rounded mb-2 me-2"-->
                  <!--                        :to="{name: 'CreateRegionalAdministrations'}"-->
                  <!--                    >-->
                  <!--                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}-->
                  <!--                    </b-btn>-->
                  <!--                  </b-col>-->
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
              hover
              show-empty
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- NAME -->
            <template #cell(name)="data">
              <div class="d-flex justify-content-between">
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
              </div>
            </template>

            <!-- STATUS -->
            <template #cell(status)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </p>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    @click="generatePDF(data.item)"
                    variant="link"
                    class="text-decoration-none p-0 text-danger"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i
                      class="mdi mdi-file-pdf"
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
                <b-spinner variant="primary" class="align-middle"></b-spinner>

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
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>

<script>
import i18n from "../../i18n";

const MAIN_API_URL = 'murojaat'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import {jsPDF} from "jspdf";

export default {
  page: {
    title: "Department Types",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      heading: "Fuqaroga yuborilgan sms xabar",
      moreText: [],
      // items: [
      //   {title: "Item 1", body: "I am item 1 body text"},
      //   {title: "Item 2", body: "I am item 2 body text"},
      //   {title: "Item 3", body: "I am item 3 body text"},
      //   {title: "Item 4", body: "I am item 4 body text"}
      // ],
      items: [],
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
      title: "Department Types",
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
        {label: this.$t('send_message.appealNumber'), key: "mnumber"},
        {label: this.$t('send_message.phoneNumber'), key: "unumber"},
        {label: this.$t('send_message.region1'), key: "radministration"},
        {label: this.$t('send_message.address'), key: "raddress"},
        {label: this.$t('send_message.phone_number'), key: "rphoneNumber"},
        {label: this.$t('send_message.send_date'), key: "referenceAt"},
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
    }
  },
  methods: {
    generatePDF(item) {
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
      doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using autoTable plugin
      let text = null

      if (item.isRepublic) {
        text = item.mnumber + " murojaatingiz " + item.radministration + " Raqobat qo‘mitasiga ko'rib chiqish uchun yuborildi.\n" +
            "\n" +
            "Aloqa: " + item.rphoneNumber + ", " + item.raddress
      } else if (!item.isRepublic){
        text = item.mnumber + " murojaatingiz Raqobat qo‘mitasi " + item.radministration + "ga ko'rib chiqish uchun yuborildi.\n" +
            "\n" +
            "Aloqa: " + item.rphoneNumber + ", " + item.raddress
      }

      this.items = [
        {title: "Murojaat raqami", body: item.mnumber},
        {title: "Murojaatchining telefon raqami", body: item.unumber},
        {title: "SMS xabar yuborilgan sana", body: item.referenceAt},
        {
          title: "SMS xabar matni",
          body: text
        },
      ]
      doc.autoTable({
        columns,
        body: this.items,
        margin: {left: 0.5, top: 1.25, right: 0.5},
        columnStyles: {
          title: {columnWidth: 3},
          body: {columnWidth: 'auto'}
        }
      });
      // this.moreText = [
      //   "Fuqaroga sms xabar yuborilgan sana: " + item.unumber,
      //   "Fuqaroning murojaat sanasi: " + item.unumber,
      //   "Murojaatchining telefon raqami: " + item.unumber,
      //   "Fuqaroga yuborilgan SMS xabar matni: " + item.unumber
      // ]

      // Using array of sentences
      doc.setFont("helvetica", "italic", "400")
          // doc
          //     .setFont("helvetica")
          //     .setFontSize(12)
          .text(this.moreText, 0.5, 3.5, {align: "left", maxWidth: "10.5"});

      // Creating footer and saving file
      doc.setFont("times", "italic", "400")
          // doc
          //     .setFont("times")
          //     .setFontSize(11)
          //     .setFontStyle("italic")
          //     .setTextColor(0, 0, 255)
          .text(
              "",
              0.5,
              doc.internal.pageSize.height - 0.5
          )
          .save(`${this.heading}.pdf`);
    },
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.nameUz = res.nameUz
        obj.nameLt = res.nameLt
        obj.nameRu = res.nameRu
        this.json_data.push(obj)
      })
    },
    selectList($event) {
      if ($event == 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.sortDesc.push(false)

      crudAndListsService
          .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
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
    },
    editItem(id) {
      this.$router.push({name: 'UpdateRegionalAdministrations', params: {id: id}})
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(MAIN_API_URL, id)
                  .then((res) => {
                    this.fetchTableItems()
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
  },
  /*
  WATCH */
  watch: {
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