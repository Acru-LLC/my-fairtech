<template>
  <div style="width: 100%">
    <b-card no-body class="pt-3 pb-3 pl-4 pr-4">
      <b-row>
        <b-col cols="3">
          <label class="m-0">{{ $t("reportTemplates") }}</label>
          <MultiselectCustomized
              :submitted="submitted"
              ref="refSelect"
              :label="g_label('nameLt', 'nameRu', 'nameUz')"
              :options="valueList"
              @searchItem="searchItem"
              @value="getValue"
          />
        </b-col>
        <b-col cols="3">
          <label class="m-0">{{ $t("dateTypes") }}</label>
          <MultiselectCustomized
              :submitted="submitted"
              ref="refSelect"
              :label="g_label('nameLt', 'nameRu', 'nameUz')"
              :options="list"
              @searchItem="searchItem2"
              @value="getValue2"
              v-model="reportInfo"
          />
        </b-col>

        <b-col cols="3">
          <b-button
              @click="showResult"
              variant="primary"
              style="margin-top: 19px"
          >
            <b-overlay :show="loaderButton" rounded="sm" opacity="0.1">
              <i class="fa fa-eye mr-1"></i>
              {{ $t("actions.view") }}
            </b-overlay>
          </b-button>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col cols="12">
          <GatherViewReport ref="viewGatherReportRef"/>
        </b-col>
      </b-row>

      <b-row v-if="reportList.length > 0">
        <b-col cols="12">
          <div class="d-flex align-items-center mb-3">
            <!-- <img
              class="avatar-xs"
              :src="require('@/assets/report.png')"
              alt=""
            /> -->
            <h5 class="m-0 ml-2">
              {{ $t("gatherReports") }}
            </h5>
          </div>
          <Table
              @clickTr="viewReport"
              :page="1"
              :limit="1000"
              ref="income_table"
              :list="reportList"
              :loading="loaderButton"
          >
            <template v-slot:thead>
              <tr class="tr-text-center">
                <th class="text-center" style="width: 10px !important">
                  <span class="d-block">№</span>
                </th>
                <th style="width: 25%">{{ $t("column.department") }}</th>
                <th style="width: 25%">{{ $t("madeByReport") }}</th>
                <th>{{ $t("date") }}</th>

                <th class="text-center">
                  {{ $t("column.status") }}
                </th>

                <th style="width: 14% !important" class="text-center">
                  {{ $t("column.actions") }}
                </th>
              </tr>
            </template>
          </Table>
        </b-col>
      </b-row>
    </b-card>

    <!-- view modal -->
    <b-modal
        id="widthM"
        v-model="viewReportModal"
        scrollable
        size="xl"
        :title="`${getName({
        nameLt: selectedTrItem.docTableNameLt,
        nameRu: selectedTrItem.docTableNameRu,
        nameUz: selectedTrItem.docTableNameUz,
      })}`"
    >
      <ViewReportModal ref="viewReportModalRef_2"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewReportModal = false">
          {{ $t("actions.close") }}
        </b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import Service from "../../reportService";

import ViewReportModal from "./viewReportModal.vue";
import {g_label} from "@/helper";
import GatherViewReport from "./gatherViewReport.vue";

import Table from "./table_gather_report.vue";

export default {
  components: {
    GatherViewReport,
    Table,
    ViewReportModal,
  },
  validations: {
    form: {
      tableId: {
        required,
      },
      childDateTypeId: {
        required,
      },
    },
  },
  mixins: [validationMixin],
  methods: {
    viewReport(item) {
      this.selectedTrItem = item;
      this.viewReportModal = true;
      setTimeout(() => {
        this.$refs.viewReportModalRef_2.getById(
            item.docTableId,
            item.reportId,
            item.status
        );
      }, 400);
    },

    showResult() {

      let obj = this.valueList.filter(e => e.id == this.form.tableId.id)

      if (!this.checkValidity()) {
        this.loaderButton = true;

        if (obj[0].hasDynamicRowsForTable) {
          setTimeout(() => {
            this.$refs.viewGatherReportRef
                .getByWithReportId(this.form.tableId.id, this.form)
                .then(({report, data}) => {
                  this.reportList = report;
                  this.reportData = data;
                  this.loaderButton = false;
                })
                .catch((e) => {
                  this.loaderButton = false;
                  // this.catchErr(e);
                });
          }, 400);
        } else {
          setTimeout(() => {
            this.$refs.viewGatherReportRef
                .getById(this.form.tableId.id, this.form)
                .then(({report, data}) => {
                  this.reportList = report;
                  this.reportData = data;
                  this.loaderButton = false;
                })
                .catch((e) => {
                  this.loaderButton = false;
                  // this.catchErr(e);
                });
          }, 400);
        }
    }
  },
  getListDateTypesChild() {
    if (this.form.tableId) {
      Service.getListDateTypesChild(
          this.params2,
          this.form.tableId.dateTypeId
      ).then((rs) => {
        this.list = rs.data.list;
      });
    }
  },
  searchItem(q) {
    this.search = q;
    this.getListTable();
  },
  getValue(v) {
    this.form.tableId = v;
    this.getListDateTypesChild();
  },

  searchItem2(q) {
    this.search2 = q;
    this.getListDateTypesChild();
  },
  getValue2(v) {
    this.form.childDateTypeId = v;
  },
  checkValidity() {
    this.submitted = true;
    this.$v.form.$touch();
    return this.$v.form.$anyError;
  },
  setFormData(item) {
    this.form = {...this.form, ...item};
  },
  getListTable() {
    Service.getOwnTableForGather(this.params)
        .then((rs) => {
          if (rs.data) {
            this.valueList = rs.data.list;
          }
        })
        .catch((e) => {});
  },
}
,
created()
{
  this.getListTable();
}
,
computed: {
  params()
  {
    return {
      params: {
        limit: 20,
        page: 0,
      },
      search: this.search,
    };
  }
,
  params2()
  {
    return {
      params: {
        limit: 20,
        page: 0,
      },
      search: this.search2,
    };
  }
,
}
,
data()
{
  return {
    reportData: [],
    viewReportModal: false,
    selectedTrItem: {},
    reportList: [],
    loaderButton: false,
    search2: "",
    list: [],
    g_label: g_label,
    submitted: false,
    valueList: [],
    search: "",
    reportInfo: {},
    form: {
      date: "",
      tableId: null,
      childDateTypeId: null,
    },
  };
}
,
}
;
</script>

<style>
</style>