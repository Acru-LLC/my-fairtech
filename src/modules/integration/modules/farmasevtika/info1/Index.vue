<template>
  <b-row>
    <b-col cols="12">
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('submodules.integration.farmasevtika_info.fullTitle') }}
        </div>
      </b-col>
      <b-card>
        <b-card-body>
          <b-row class="mb-2">
            <div class="d-inline-block">
              <!--              <div class="search-box me-4 mb-2 d-inline-block">-->
              <!--                <div class="position-relative">-->
              <!--                  <b-input-->
              <!--                      v-model="searchKeyword"-->
              <!--                      type="text"-->
              <!--                      class="form-control"-->
              <!--                      @input="fetchTableItems"-->
              <!--                      :placeholder="$t('column.search')"-->
              <!--                  />-->
              <!--                  <i class="bx bx-search-alt search-icon"></i>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              <span>{{ $t('column.select.text1') }}</span>-->
              <!--              <b-col cols="2" class="me-2 mx-2 d-inline-block">-->
              <!--                <div class="position-relative">-->
              <!--                  <b-form-select-->
              <!--                      v-model="selected"-->
              <!--                      :options="optionsTable"-->
              <!--                      @change="selectList"-->
              <!--                      class="form-select"-->
              <!--                  ></b-form-select>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <!--              <span>{{ $t('column.select.text2') }}</span>-->
            </div>
<!--            <div class="d-inline-block">-->
<!--              <div class="text-sm-end float-right">-->
<!--                <download-excel-->
<!--                    :data="json_data"-->
<!--                    :fields="json_fields"-->
<!--                    :header="$t('submodules.integration.iqtisodiy_taraqqiyot_info.info1')"-->
<!--                    worksheet="My Worksheet"-->
<!--                    :name="`${$t('submodules.integration.iqtisodiy_taraqqiyot_info.info1')}.xls`"-->
<!--                >-->
<!--                  <b-btn @click="downloadExcel" class="mb-2" type="primary" rounded>-->
<!--                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}-->
<!--                  </b-btn>-->
<!--                </download-excel>-->
<!--              </div>-->
<!--            </div>-->
            <!--            <div class="ml-1 d-inline-block">-->
            <!--              <div class="text-sm-end float-right">-->
            <!--                <b-btn @click="downloadAllExcel" class="mb-2" type="primary" rounded>-->
            <!--                  <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download_all_excel') }}-->
            <!--                </b-btn>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-row>
          <b-table
              :items="tableItems" :fields="tableFields" :busy="loadingTableItems" id="my-table"
              class="custom-b-table" responsive striped bordered small hover show-empty
          >

            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>


            <!-- box_group_name_ru -->
            <template #cell(box_group_name_ru)="data">
              <p>
                {{ data.item.box_group_name_ru }}

              </p>
            </template>
            <!--             certificate_number-->
            <template #cell(certificate_number)="data">
              <p>
                {{ data.item.certificate.certificate_number }}
              </p>
            </template>
            <!--             certificate_date-->
            <template #cell(certificate_date)="data">
              <p>
                {{ data.item.certificate.certificate_date }}
              </p>
            </template>
            <!--             pharmacotherapeutic_group-->
            <template #cell(pharmacotherapeutic_group)="data">
              <p>
                {{ data.item.certificate.pharmacotherapeutic_group }}
              </p>
            </template>
            <!--             route_administration-->
            <template #cell(route_administration)="data">
              <p>
                {{ data.item.certificate.route_administration }}
              </p>
            </template>
            <!-- medicine_name -->
            <template #cell(medicine_name)="data">
              <p>
                {{ data.item.medicine.medicine_name }}

              </p>
            </template>
            <!--             box_type_name-->
            <template #cell(box_type_name)="data">
              <p>
                {{ data.item.medicine_boxes[0].box_type_name }}
              </p>
            </template>
            <!--             atc_code-->
            <template #cell(atc_code)="data">
              <p>
                {{ data.item.medicine_mark.atc_code }}
              </p>
            </template>
            <!--             atc_name-->
            <template #cell(atc_name)="data">
              <p>
                {{
                  data.item.medicine_mark.atc_name_ru
                }}
              </p>
            </template>
            <!--             inn_name-->
            <template #cell(inn_name)="data">
              <p>
                {{
                  data.item.medicine_mark.inn_name
                }}
              </p>
            </template>
            <!--             medicine_mark_name_ru-->
            <template #cell(medicine_mark_name)="data">
              <p>
                {{
                  data.item.medicine_mark.medicine_mark_name_ru
                }}
              </p>
            </template>
            <!--                {{  -->
            <!--                  getName({-->
            <!--                    nameRu: data.item.statusNameRu,-->
            <!--                    nameLt: data.item.statusNameLt,-->
            <!--                    nameUz: data.item.statusNameUz,-->
            <!--                  })-->
            <!--                }}-->

            <!--             ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i @click="viewItem(data.item.box_group_id)" class="mdi mdi-eye-outline"/>
                </b-btn>
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
                />
              </div>
            </template>
          </b-table>
          <div>
            <b-button-group style="float: right">
              <b-button size="sm" @click="prevBtn">{{ $t('actions.prev') }}</b-button>
              <b-button variant="primary" size="sm" disabled>. . . . . .</b-button>
              <b-button size="sm" @click="nextBtn">{{ $t('actions.next') }}</b-button>
            </b-button-group>
          </div>
          <!--          <b-pagination-->
          <!--              v-model="var_default_search_payload.page"-->
          <!--              :total-rows="totalItems"-->
          <!--              :per-page="var_default_search_payload.itemsPerPage"-->
          <!--              aria-controls="my-table"-->
          <!--              class="justify-content-end"-->
          <!--          ></b-pagination>-->
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import ApiService from "@/shared/services/api.service";
import integratsiyaService from "@/shared/services/integratsiya.service";

const MAIN_API_URL = 'iqtisodiyot-vazirlik'
export default {
  components: {},
  data() {
    return {
      offset: 0,
      limit: 10,
      period_date: new Date().ddmmyyyy(),
      loadingTableItems: false,
      json_fields: {
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.product_name')]: 'product_name',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Qoraqalpogiston_Respublikasi')]: 'Qoraqalpogiston_Respublikasi',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Andijon_viloyati')]: 'Andijon_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Buxoro_viloyati')]: 'Buxoro_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Jizzax_viloyati')]: 'Jizzax_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Qashqadaryo_viloyati')]: 'Qashqadaryo_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Navoiy_viloyati')]: 'Navoiy_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Namangan_viloyati')]: 'Namangan_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Samarqand_viloyati')]: 'Samarqand_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Surxandaryo_viloyati')]: 'Surxandaryo_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Sirdaryo_viloyati')]: 'Sirdaryo_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Toshkent_viloyati')]: 'Toshkent_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Fargona_viloyati')]: 'Fargona_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Xorazm_viloyati')]: 'Xorazm_viloyati',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.Toshkent_shahri')]: 'Toshkent_shahri',
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
      activeDep: {},
      changeIndex: {
        firstItemId: null,
        secondItemId: null,
      },
      infoDateOfIssueRange: {},
      filter: {
        fromDate: null,
        toDate: null,
        infoDateOfIssue: null,
        infoMode: null,
        infoShipperAddress: null,
        infoShipperName: null,
        tifTnCode: null,
        productName: null,
        unitName: null,
        productWeight: null,
        productWeightUnit: null,
        productAmount: null,
        infoDollarExchangeRate: null,
        infoConsigneeName: null,
        infoConsigneeAddress: null,
        productStatisticalValue: null,
        productStatisticalValueUnit: null,
      },
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
          label: 'название лекарственного препарата с учетом упаковки на русском',
          key: 'box_group_name_ru',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: '№ регистрационного удостоверения',
          key: 'certificate_number',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: 'дата выдачи регистрационного удостоверения  ',
          key: 'certificate_date',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: 'название фармакотерапевтической группы',
          key: 'pharmacotherapeutic_group',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: 'название способа введения',
          key: 'route_administration',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: 'название лекарственного препарата',
          key: 'medicine_name',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: 'название типа упаковки',
          key: 'box_type_name',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: 'код атх',
          key: 'atc_code',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: 'название atx на русском',
          key: 'atc_name',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: 'название мнн',
          key: 'inn_name',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: 'торговое наименование на русском',
          key: 'medicine_mark_name',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        }
      ],
    };
  },
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    nextBtn() {
      this.offset = this.offset + 10
      this.limit = this.limit + 10
      this.fetchTableItems()
    },
    prevBtn() {
      if (this.limit > 10) {
        this.offset = this.offset - 10
        this.limit = this.limit - 10
      }
      this.fetchTableItems()
    },
    async downloadExcel() {
      this.json_data = this.tableItems.map((item, index) => {
        return {
          ...item,
          infoDateOfIssue: item.infoDateOfIssue ? this.getDateFormat(item.infoDateOfIssue) : '',
          infoInformationDate: item.infoInformationDate ? this.getDateFormat(item.infoInformationDate) : '',
        }
      });
    },
    async downloadAllExcel() {
      let url = MAIN_API_URL + '/excel-download'
      this.filter.type = "EXPORT"
      if (this.filter) {
        url += this.generatePayloadUrl(this.filter);
      }
      return ApiService.responseTypeBlob(url, true).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const file_name = `${this.$t('submodules.integration.customs_product.title')} ${this.$t('submodules.integration.customs_product.export')} - ${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
      });
    },
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword

      integratsiyaService.getFarmasevtikaInformation({"offset": this.offset, "limit": this.limit + 1}, true)
          .then(res => {
            this.tableItems = res.data;
            this.totalItems = res.data.length;
            this.loadingTableItems = false
            this.var_default_search_payload.itemsPerPage = this.totalItems
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
            this.loadingTableItems = false
          })
    },
    clearDateOfIssueRange() {
      this.filter.fromDate = null
      this.filter.toDate = null
      this.infoDateOfIssueRange = {}
    },
    generatePayloadUrl(requestParams) {
      return '?' + Object.keys(requestParams).map(key => {
        if (requestParams[key]) {
          return key + '=' + requestParams[key]
        }
      }).filter(v => !!v).join('&');
    },
    searchListWithKeyword(mainUrl, payload, requestParams = {}, withLoader = false) {
      let myPayload = Object.assign({}, payload)
      myPayload.page -= 1
      let url = mainUrl + '/get-information-1';
      if (requestParams) {
        url += this.generatePayloadUrl(requestParams);
      }
      return ApiService.post(url, myPayload, withLoader);
    },
    viewItem(id) {
      this.$router.push({name: 'ViewIntegrationFarmasevtikaInfoIndex', params: {id: id}})
    },
  }
  ,
  created() {
    this.fetchTableItems()
  }
  ,
  watch: {
    'var_default_search_payload.page':
        {
          handler() {
            this.fetchTableItems()
          }
          ,
          deep: true
        },
    'period_date': {
      handler() {
        this.fetchTableItems()
      }
    },
    infoDateOfIssueRange() {
      if (this.infoDateOfIssueRange.startDate) {
        this.filter.fromDate = this.getDateFormat(this.infoDateOfIssueRange.startDate, '-');
      }
      if (this.infoDateOfIssueRange.endDate) {
        this.filter.toDate = this.getDateFormat(this.infoDateOfIssueRange.endDate, '-');
      }
      this.fetchTableItems();
    }
  }
}
;
</script>

<style scoped lang='scss'>
</style>