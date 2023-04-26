<template>
  <div>
    <b-overlay
        :opacity="0.2"
        :show="loader"
    >
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.collection_assemble') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-12">
              <div class="row mb-2">
                <div class="col-md-3">
                  <BaseMultiselectWithValidation
                      rules="required"
                      class="required"
                      onlyFormElement
                      v-model="params.docTableId"
                      :options="ownDocTableListOptions.map(e => e.value)"
                      :label="$t('column.value_type')"
                      label-on-top
                      placeholder=""
                      :custom-label="ownDocTablesValue"
                      open-direction="bottom"
                      :max-height="600"
                      :show-labels="false"
                  />
                </div>
                <div class="col-md-2">
                  <b-form-select
                      class="border-light form-control rounded"
                      v-model="params.dateTypeId"
                      :disabled="ownDateTypeListOptions.length < 1"
                      :options="ownDateTypeListOptions"></b-form-select>
                </div>
                <div class="col-md-2">
                  <div class="search-box">
                    <div class="position-relative">
                      <input
                          type="text"
                          v-model="params.name"
                          class="form-control rounded border-light"
                          :placeholder="$t('actions.search')"
                      />
                      <i class="mdi mdi-magnify search-icon"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <b-btn @click="handleSearch">{{ $t('actions.search') }}</b-btn>
                </div>
                <div class="col-md-2">
                  <b-btn variant="success" @click="handleCollect()"
                         :disabled="this.selectedDocReports.indexSet.size < 2">{{ $t('actions.collect') }}
                  </b-btn>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <table class="table table-hover table-striped">
                <thead>
                <tr>
                  <th>{{ '№' }}</th>
                  <th>{{ $t('column.name') }}</th>
                  <th>{{ $t('submodules.reports.report_date') }}</th>
                  <th>{{ $t("nameShakl") }}</th>
                  <th>{{ $t("titleShakl") }}</th>
                  <th>{{ $t("dateTypes") }}</th>
                  <th>{{ $t("submodules.reports.yur_department") }}</th>
                  <th>{{ $t("submodules.reports.created_datetime") }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableList"
                    :key="index"
                    class="cursor-pointer"
                    @click="selectDocReportItem(index)"
                    :class="{'table-info': item.selected, 'table-info': item.selected}">
                  <td>{{
                      paginate(index, var_default_search_payload.itemsPerPage, var_default_search_payload.page - 1)
                    }}
                  </td>
                  <td>
                    {{
                      getName({
                        nameUz: item.reportNameUz,
                        nameRu: item.reportNameRu,
                        nameLt: item.reportNameLt,
                      })
                    }}
                  </td>
                  <td>{{ item.reportData }}</td>
                  <td>{{
                      getName({
                        nameUz: item.docTableNameUz,
                        nameRu: item.docTableNameRu,
                        nameLt: item.docTableNameLt,
                      })
                    }}
                  </td>
                  <td>{{
                      getName({
                        nameUz: item.docTableTitleUz,
                        nameRu: item.docTableTitleRu,
                        nameLt: item.docTableTitleLt,
                      })
                    }}
                  </td>
                  <td>{{
                      getName({
                        nameUz: item.dateTypeNameUz,
                        nameRu: item.dateTypeNameRu,
                        nameLt: item.dateTypeNameLt,
                      })
                    }}
                  </td>
                  <td>{{
                      getName({
                        nameUz: item.yurDepNameUz,
                        nameRu: item.yurDepNameRu,
                        nameLt: item.yurDepNameLt,
                      })
                    }}
                  </td>
                  <td>{{ item.createdDate }}</td>
                </tr>
                <tr v-if="tableList.length <= 0" :key="-1">
                  <td colspan="8">
                    <h5 class="text-center">Маълумот топилмади</h5>
                  </td>
                </tr>
                </tbody>
              </table>
              <b-pagination
                  v-if="tableListLength > 0"
                  v-model="var_default_search_payload.page"
                  :total-rows="tableListLength"
                  :per-page="var_default_search_payload.itemsPerPage"
                  aria-controls="my-table"
                  class="justify-content-end"
              />
            </div>
          </div>
        </div>
      </div>
      <b-modal id="modal" :title="$t('submodules.reports.collection_assemble')" size="xl">
        <div class="row">
          <div class="col-2 my-2">
            <b-form-select
                class="form-control rounded"
                v-model="collectingType">
              <b-form-select-option
                  v-for="(item, index) in collectingTypeList"
                  :key="index"
                  :value="item.value">
                {{ item.name }}
              </b-form-select-option>
            </b-form-select>
          </div>
          <div class="col-1 my-2">
            <b-btn variant="success" class="mx-1" @click="handleCollectedReportDraw">{{ $t('actions.gather') }}</b-btn>
          </div>
          <div class="col-1 my-2">
            <b-btn variant="info" class="mx-1" @click="handleExportExcel">{{ $t('actions.excel') }}</b-btn>
          </div>
          <div class="col-6"></div>
          <div class="col-2 my-2">
            <b-btn variant="success" block
                   class="mx-1"
                   :disabled="!collectedReportForTableReport || collectedReportForTableReport.length <= 0"
                   @click="handleSaveDataOpenModal">{{ $t('actions.confirm') }}
            </b-btn>
          </div>
          <div class="col-2 my-2" v-if="collectingType === 'COLLECT_AVG'">
            <input type="checkbox" id="checkbox" v-model="collectionAvgIgnoreZero">
            <label for="checkbox">{{ $t('submodules.reports.zero_ignore') }}</label>
          </div>
        </div>
        <table ref="collectedReportTable" class="table table-hover table-striped table-custom-bordered" border="1"
               style="border: 1px solid black">
          <report-header :fields="docTableFieldsOriginal"></report-header>
          <tbody>
          <tr v-for="(reportRow, reportRowIndex) in collectedReportForTableReport" :key="reportRowIndex">
            <td v-for="(reportCol, reportColIndex) in reportRow" :key="reportColIndex">
              <BaseMultiselectWithValidation
                  v-if="collectingType !== 'ASSEMBLE' && reportCol.typeCode === 'SELECT'"
                  v-model="collectedReportForTableReport[reportRowIndex][reportColIndex].selectValueId"
                  :options="selectOptionsByReferenceUrl[reportCol.columnId]"
                  :custom-label="labelCollectedSelect"
                  :label="$t('column.employee')"
                  :only-form-element="true"
                  :internal-search="false"
                  :hide-error-msg="false"
                  :loading="selectLoadItemLoader"
                  :show-labels="false"
                  :filterable="false"
                  :searchable="true"
                  :max-height="600"
                  @search-change="(keyword) => selectFetchOptions(reportCol, keyword)"
                  rules="required"
                  placeholder=""
              ></BaseMultiselectWithValidation>
              {{ printColumn(reportCol, reportColIndex) }}
            </td>
          </tr>
          </tbody>
        </table>
        <template #modal-footer>
          <div>&nbsp;</div>
        </template>
      </b-modal>
      <b-modal id="saveDataModal" :title="$t('submodules.reports.collection_assemble')" size="lg">
        <ValidationObserver ref="obServerSaveData" v-slot="{}">
          <div class="row">
            <div class="col-12 my-2">
              <BaseInputWithValidation
                  rules="required"
                  class="required"
                  @input="($event) => (saveData.reportInfoForGather.nameLt = toLatin($event))"
                  v-model="saveData.reportInfoForGather.nameUz"
                  :label="$t('column.name_uz')"
                  :placeholder="$t('column.name_uz')"
              />
            </div>
            <div class="col-12 my-2">
              <BaseInputWithValidation
                  rules="required"
                  class="required"
                  @input="($event) => (saveData.reportInfoForGather.nameUz = toCyrill($event))"
                  v-model="saveData.reportInfoForGather.nameLt"
                  :label="$t('column.name_lt')"
                  :placeholder="$t('column.name_lt')"
              />
            </div>
            <div class="col-12 my-2">
              <BaseInputWithValidation
                  rules="required"
                  class="required"
                  v-model="saveData.reportInfoForGather.nameRu"
                  :label="$t('column.name_ru')"
                  :placeholder="$t('column.name_ru')"
              />
            </div>
            <div class="col-12 my-2">
              <BaseDatePickerWithValidation
                  rules="required"
                  class="required"
                  v-model="saveData.reportInfoForGather.date"
                  :label="$t('column.date')"
                  :placeholder="$t('column.date')"
                  format="DD.MM.YYYY"
              />
            </div>
          </div>
        </ValidationObserver>
        <template #modal-footer>
          <b-btn variant="success" @click="handleSaveData">
            {{ $t("actions.save") }}
          </b-btn>
        </template>
      </b-modal>
    </b-overlay>
  </div>
</template>

<script>
import reportService from "../../reportService";
import reportHeader from "./reportHeader";
import XLSX from "xlsx";
import BaseInputWithValidation from "@/components/base/BaseInputWithValidation";
import BaseDatePickerWithValidation from "@/components/base/BaseDatePickerWithValidation";
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
  components: {
    BaseDatePickerWithValidation,
    BaseInputWithValidation,
    reportHeader
  },
  data() {
    return {
      title: this.$t("reportRoles"),
      loader: true,
      selectLoadItemLoader: null,
      selectLoadItemTimeOut: null,
      params: {
        params: {
          limit: 20,
          page: 0,
        },
        search: "",
        docTableId: "",
        dateTypeId: "",
      },
      tableListParams: {
        itemsPerPage: 20,
        page: 0,
      },
      tableList: [],
      tableListLength: 0,
      docTableFieldsOriginal: [],
      docTableFieldsSerialized: [],
      ownDocTableList: [],
      dateTypeList: [],
      dateTypeListPayload: {
        page: 0,
        itemsPerPage: 100
      },
      selectOptionsByReferenceUrl: {},
      selectedDocReports: {
        indexSet: new Set(),
        docTableId: false,
        docTable: null,
        docReports: {},
      },
      collectedReportForTableReport: [],
      collectingType: 'ASSEMBLE',
      collectionAvgIgnoreZero: false,
      collectingGroupColumnId: null,
      collectingTypeList: [
        {
          value: "ASSEMBLE",
          name: "Yig'ish",
        },
        {
          value: "COLLECT_SUM",
          name: "Yig'indini yig'ish (SUM)",
        },
        {
          value: "COLLECT_AVG",
          name: "O'rtacha qiymat yig'ish (AVG)",
        },
      ],
      saveData: {
        reportInfoForGather: {
          nameUz: '',
          nameLt: '',
          nameRu: '',
          date: '',
        }
      }
    };
  },
  async created() {
    await this.getOwnDocTableList();
    this.loader = false;
  },
  methods: {
    getOwnDocTableList() {
      reportService.getOwnTable(this.params).then(response => {
        if (response.data.list.length > 0) {
          this.ownDocTableList = response.data.list;
        }
      });
    },
    getDateTypeList(dateTypeId) {
      reportService.getListByParentId(dateTypeId, this.dateTypeListPayload).then(response => {
        if (response.data.list.length > 0) {
          this.dateTypeList = response.data.list;
        }
      })
          .finally(() => {
            this.loader = false;
          });
    },
    async handleSearch(clearSelected = true) {
      if (clearSelected) {
        this.selectedDocReports.docTableId = false;
        this.selectedDocReports.indexSet = new Set();
      }
      await this.getTableList();
    },
    handleValidateForCollecting() {
      if (!this.selectedDocReports.docTableId || this.selectedDocReports.indexSet.size < 2) {
        this.$toast(this.$t("submodules.reports.select_minimum_two_report"), {type: "warning"})
        return false;
      }
      return true;
    },
    async handleCollect() {
      this.loader = true;
      this.collectedReportForTableReport = [];
      this.docTableFieldsOriginal = [];
      this.docTableFieldsSerialized = [];
      if (!this.handleValidateForCollecting()) {
        this.loader = false;
        return;
      }
      await reportService.getByIdTable(this.selectedDocReports.docTableId).then(async response => {
        if (response.data.columns.length > 0) {
          this.docTableFieldsOriginal = response.data.columns;
          this.deserializeDocTableFields(this.docTableFieldsOriginal);
          this.selectedDocReports.docTable = response.data.table;
        }
        this.$bvModal.show('modal')
        await this.handleCollectView();
        this.loader = false;
      }).catch(() => {
        this.loader = false;
      });
    },
    deserializeDocTableFields(list, clear = true) {
      if (clear) {
        this.docTableFieldsSerialized = [];
      }
      list.forEach(e => {
        if (e.children.length > 0) {
          this.deserializeDocTableFields(e.children, false);
        } else {
          this.docTableFieldsSerialized.push(e)
          if (e.typeCode === 'SELECT') {
            this.selectOptionsByReferenceUrl[e.id] = [];
          }
        }
      })
    },
    async handleCollectView() {
      if (!this.handleValidateForCollecting()) {
        return;
      }
      this.loader = true;
      this.selectedDocReports.docReports = {};
      await this.selectedDocReports.indexSet.forEach((docReportId) => {
        this.selectedDocReports.docReports[docReportId] = {}
        reportService.getReportById(docReportId).then(response => {
          if (response.data) {
            response.data.map(value => {
              if (this.selectedDocReports.docReports[docReportId][value.rowId] === undefined) {
                this.selectedDocReports.docReports[docReportId][value.rowId] = {};
              }
              this.selectedDocReports.docReports[docReportId][value.rowId][value.columnId] = value;
            });
          }
        });
      })
    },
    handleCollectedReportDraw() {
      this.collectedReportForTableReport = [];
      switch (this.collectingType) {
        case 'ASSEMBLE':
          this.handleCollectedReportDrawAssemble();
          break;
        case 'COLLECT_SUM':
          this.handleCollectedReportDrawCollectSum();
          break;
        case 'COLLECT_AVG':
          this.handleCollectedReportDrawCollectAvg();
          break;
      }
    },
    handleCollectedReportDrawAssemble() {
      let sequence = 1;
      this.selectedDocReports.indexSet.forEach((value) => {
        const reports = this.selectedDocReports.docReports[value];
        for (const reportRowIndex in reports) {
          const reportRow = reports[reportRowIndex];
          let reportRowData = JSON.parse('[]');
          this.docTableFieldsSerialized.forEach(field => {
            if (reportRow[field.id] !== undefined) {
              reportRowData.push(reportRow[field.id]);
            } else {
              if (field.typeCode === 'SEQUENCE') {
                reportRowData.push({
                  value: sequence,
                  typeCode: field.typeCode,
                });
                sequence++;
              } else {
                reportRowData.push({});
              }
            }
          })
          this.collectedReportForTableReport.push(reportRowData);
        }
      })
    },
    handleCollectedReportDrawCollectSum() {
      let sequence = 1;
      this.selectedDocReports.indexSet.forEach((docReportId) => {
        let reportData = [];
        let sumBigIntegerCount = {};
        const reports = this.selectedDocReports.docReports[docReportId];
        for (const reportRowIndex in reports) {
          const report = reports[reportRowIndex];
          this.docTableFieldsSerialized.forEach((docTableField, docTableFieldIndex) => {
            const reportRowField = report[docTableField.id];
            if (docTableField.typeCode === 'SEQUENCE' && typeof reportData[docTableFieldIndex] === 'undefined') {
              reportData[docTableFieldIndex] = {
                value: sequence,
                typeCode: "SEQUENCE"
              }
            }
            reportData[docTableFieldIndex] = reportRowField && !reportData[docTableFieldIndex]?.id ? JSON.parse(JSON.stringify(reportRowField)) : (reportData[docTableFieldIndex] || {});
            if (docTableField.typeCode === 'BIGDECIMAL') {
              const valueBigDecimal = reportRowField?.valueBigDecimal ?? 0;
              if (typeof sumBigIntegerCount[docTableField.id] === 'undefined') {
                sumBigIntegerCount[docTableField.id] = 0;
              }
              if (typeof reportData[docTableFieldIndex].valueBigDecimal === 'undefined' || reportData[docTableFieldIndex].valueBigDecimal === null || reportData[docTableFieldIndex].valueBigDecimal === '') {
                reportData[docTableFieldIndex].valueBigDecimal = 0;
              }
              if (valueBigDecimal && (valueBigDecimal > 0 || valueBigDecimal < 0)) {
                sumBigIntegerCount[docTableField.id]++;
              }
              if (valueBigDecimal && reportRowField?.id !== reportData[docTableFieldIndex]?.id) {
                reportData[docTableFieldIndex].valueBigDecimal += valueBigDecimal;
                reportData[docTableFieldIndex].value = reportData[docTableFieldIndex].valueBigDecimal?.toString();
              }
            } else if (docTableField.typeCode === 'STRING' || docTableField.typeCode === 'DATE' || docTableField.typeCode === 'YEAR' || docTableField.typeCode === 'BOOLEAN') {
              reportData[docTableFieldIndex].value += ", " + (reportRowField.value ?? '');
              reportData[docTableFieldIndex].valueDate += ", " + (reportRowField.valueDate ?? '');
              reportData[docTableFieldIndex].valueString += ", " + (reportRowField.valueString ?? '');
              reportData[docTableFieldIndex].valueBoolean += ", " + (reportRowField.valueBoolean ?? '');
            } else if (docTableField.typeCode === 'SELECT') {
              if (!reportData[docTableFieldIndex]) {
                reportData[docTableFieldIndex] = JSON.parse(JSON.stringify(reportRowField));
              }
              reportData[docTableFieldIndex].id = reportRowField.id;
              reportData[docTableFieldIndex].rowId = reportRowField.rowId;
              // reportData[docTableFieldIndex].typeCode = 'STRING';
              reportData[docTableFieldIndex].columnId = reportRowField.columnId;
              reportData[docTableFieldIndex].docReportId = reportRowField.docReportId;
              reportData[docTableFieldIndex].selectValueId = null;
              if (reportData[docTableFieldIndex]?.valueString?.indexOf(reportRowField.selectValueNameUz) === -1) {
                if (reportRowField?.selectValueNameUz) {
                  reportData[docTableFieldIndex].valueString += (reportRowField?.selectValueNameUz ?? '') + ", ";
                  reportData[docTableFieldIndex].value += (reportRowField?.selectValueNameUz ?? '') + ", ";
                  reportData[docTableFieldIndex].selectValueNameUz += (reportRowField?.selectValueNameUz ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameEn) {
                  reportData[docTableFieldIndex].selectValueNameEn += (reportRowField?.selectValueNameEn ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameLt) {
                  reportData[docTableFieldIndex].selectValueNameLt += (reportRowField?.selectValueNameLt ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameRu) {
                  reportData[docTableFieldIndex].selectValueNameRu += (reportRowField?.selectValueNameRu ?? '') + ", ";
                }
              } else if (reportData[docTableFieldIndex]?.valueString === null) {
                reportData[docTableFieldIndex].valueString = '';
              }
            }
          })
        }
        this.collectedReportForTableReport.push(reportData);
        sequence++;
      })
    },
    handleCollectedReportDrawCollectAvg() {
      let sequence = 1;
      this.selectedDocReports.indexSet.forEach((docReportId) => {
        let reportData = [];
        let sumBigIntegerCount = {};
        const reports = this.selectedDocReports.docReports[docReportId];
        for (const reportRowIndex in reports) {
          const report = reports[reportRowIndex];
          this.docTableFieldsSerialized.forEach((docTableField, docTableFieldIndex) => {
            const reportRowField = report[docTableField.id];
            if (docTableField.typeCode === 'SEQUENCE' && typeof reportData[docTableFieldIndex] === 'undefined') {
              reportData[docTableFieldIndex] = {
                value: sequence,
                typeCode: "SEQUENCE"
              }
            }
            reportData[docTableFieldIndex] = reportRowField && !reportData[docTableFieldIndex]?.id ? JSON.parse(JSON.stringify(reportRowField)) : (reportData[docTableFieldIndex] || {});
            if (docTableField.typeCode === 'BIGDECIMAL') {
              const valueBigDecimal = reportRowField?.valueBigDecimal ?? 0;
              if (typeof sumBigIntegerCount[docTableField.id] === 'undefined') {
                sumBigIntegerCount[docTableField.id] = 0;
              }
              if (typeof reportData[docTableFieldIndex].valueBigDecimal === 'undefined' || reportData[docTableFieldIndex].valueBigDecimal === null || reportData[docTableFieldIndex].valueBigDecimal === '') {
                reportData[docTableFieldIndex].valueBigDecimal = 0;
              }
              if (this.collectionAvgIgnoreZero) {
                if (valueBigDecimal && (valueBigDecimal > 0 || valueBigDecimal < 0)) {
                  sumBigIntegerCount[docTableField.id]++;
                }
              } else {
                sumBigIntegerCount[docTableField.id]++;
              }
              if (valueBigDecimal && reportRowField?.id !== reportData[docTableFieldIndex]?.id) {
                reportData[docTableFieldIndex].valueBigDecimal += valueBigDecimal;
                reportData[docTableFieldIndex].value = reportData[docTableFieldIndex].valueBigDecimal?.toString();
              }
            } else if (docTableField.typeCode === 'STRING' || docTableField.typeCode === 'DATE' || docTableField.typeCode === 'YEAR' || docTableField.typeCode === 'BOOLEAN') {
              reportData[docTableFieldIndex].value += ", " + (reportRowField.value ?? '');
              reportData[docTableFieldIndex].valueDate += ", " + (reportRowField.valueDate ?? '');
              reportData[docTableFieldIndex].valueString += ", " + (reportRowField.valueString ?? '');
              reportData[docTableFieldIndex].valueBoolean += ", " + (reportRowField.valueBoolean ?? '');
            } else if (docTableField.typeCode === 'SELECT') {
              if (!reportData[docTableFieldIndex]) {
                reportData[docTableFieldIndex] = JSON.parse(JSON.stringify(reportRowField));
              }
              reportData[docTableFieldIndex].id = reportRowField.id;
              reportData[docTableFieldIndex].rowId = reportRowField.rowId;
              // reportData[docTableFieldIndex].typeCode = 'STRING';
              reportData[docTableFieldIndex].columnId = reportRowField.columnId;
              reportData[docTableFieldIndex].docReportId = reportRowField.docReportId;
              if (reportData[docTableFieldIndex]?.valueString?.indexOf(reportRowField.selectValueNameUz) === -1) {
                if (reportRowField?.selectValueNameUz) {
                  reportData[docTableFieldIndex].value += (reportRowField?.selectValueNameUz ?? '') + ", ";
                  reportData[docTableFieldIndex].valueString += (reportRowField?.selectValueNameUz ?? '') + ", ";
                  reportData[docTableFieldIndex].selectValueNameUz += (reportRowField?.selectValueNameUz ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameEn) {
                  reportData[docTableFieldIndex].selectValueNameEn += (reportRowField?.selectValueNameEn ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameLt) {
                  reportData[docTableFieldIndex].selectValueNameLt += (reportRowField?.selectValueNameLt ?? '') + ", ";
                }
                if (reportRowField?.selectValueNameRu) {
                  reportData[docTableFieldIndex].selectValueNameRu += (reportRowField?.selectValueNameRu ?? '') + ", ";
                }
              } else if (reportData[docTableFieldIndex]?.valueString === null) {
                reportData[docTableFieldIndex].valueString = '';
                reportData[docTableFieldIndex].value = '';
              }
            }
          })
        }
        for (const i in reportData) {
          const count = sumBigIntegerCount[reportData[i].columnId];
          if (reportData[i].typeCode === 'BIGDECIMAL' && count > 0) {
            reportData[i].valueBigDecimal /= count;
          }
          reportData[i].selectValueNameEn = reportData[i].selectValueNameEn ? reportData[i].selectValueNameEn.trim().slice(0, -1) : '';
          reportData[i].selectValueNameLt = reportData[i].selectValueNameLt ? reportData[i].selectValueNameLt.trim().slice(0, -1) : '';
          reportData[i].selectValueNameRu = reportData[i].selectValueNameRu ? reportData[i].selectValueNameRu.trim().slice(0, -1) : '';
          reportData[i].selectValueNameUz = reportData[i].selectValueNameUz ? reportData[i].selectValueNameUz.trim().slice(0, -1) : '';
        }
        this.collectedReportForTableReport.push(reportData);
        sequence++;
      })
    },
    selectDocReportItem(index) {
      const item = this.tableList[index];
      if (this.selectedDocReports.docTableId === false) {
        this.selectedDocReports.docTableId = item.docTableId;
      }
      if (this.selectedDocReports.indexSet.has(item.reportId)) {
        if (this.selectedDocReports.docTableId === item.docTableId) {
          this.selectedDocReports.indexSet.delete(item.reportId);
          this.tableList[index].selected = false;
        }
      } else {
        if (this.selectedDocReports.docTableId === item.docTableId) {
          this.selectedDocReports.indexSet.add(item.reportId);
          this.tableList[index].selected = true;
        }
      }
      if (this.selectedDocReports.indexSet.size === 0) {
        this.selectedDocReports.docTableId = false;
      }
    },
    printColumn(column, index) {
      switch (column.typeCode) {
        case 'SEQUENCE':
          return column?.value ?? index + 1;
        case 'STRING':
          return column?.valueString ?? column?.value ?? '';
        case 'BIGDECIMAL':
          // eslint-disable-next-line no-case-declarations
          let v = column?.valueBigDecimal ?? 0;
          v = v.toFixed(2);
          if (!isNaN(v)) {
            return v;
          }
          return '';
        case 'BOOLEAN':
          return column?.valueBoolean ? this.$t('actions.yes') : this.$t('actions.no');
        case 'DATE':
          return column?.valueDate ?? '';
        case 'YEAR':
          return column?.valueString ?? '';
        case 'SELECT':
          return this.getName({
            nameUz: column?.selectValueNameUz,
            nameRu: column?.selectValueNameRu,
            nameLt: column?.selectValueNameLt,
          }).trim(' ,');
        default:
          return '';
      }
    },
    async getTableList() {
      if (this.params.docTableId && this.params.dateTypeId) {
        this.tableListLength = 0;
        this.tableListLength = 0;
        this.tableList = [];
        this.loader = true
        await reportService.reportListForCollection(this.params.docTableId, this.params.dateTypeId, {...this.var_default_search_payload}).then(response => {
          if (response.data.list.length > 0) {
            this.tableListLength = response.data.total;
            this.tableList = response.data.list.map((item) => {
              return {...item, selected: this.selectedDocReports.indexSet.has(item.reportId)};
            });
          } else {
            this.tableListLength = 0;
            this.tableList = [];
          }
        }).finally(() => {
          this.loader = false;
        });
      }
    },
    handleExportExcel() {
      let currentDate = new Date();
      let dateDMY = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
      let fileName = this.getName(this.selectedDocReports.docTable) + dateDMY;
      let table = this.$refs.collectedReportTable;
      table.setAttribute('border', '1');
      table.style.border = '1px solid black';
      table.children?.forEach(theadOrTbody => {
        theadOrTbody.children.forEach(tr => {
          tr.children.forEach(thOrTd => {
            thOrTd.width = thOrTd.offsetWidth + 'px';
            thOrTd.style.width = thOrTd.offsetWidth + 'px';
          })
        })
      })
      let wb = XLSX.utils.table_to_book(table, {sheet: "sheet1"});
      setTimeout(() => { // todo nega bu kerakligini tekshirish kerak, copy olib qoyganman
        this.loaderExcel = false;
      }, 500);
      return XLSX.writeFile(wb, `${fileName}.xlsx`, {});
    },
    handleSaveDataOpenModal() {
      this.$bvModal.show('saveDataModal')
    },
    handleSaveData(e) {
      this.computedObServerSaveData.validate().then(isValid => {
        if (!isValid) {
          return false;
        }
        this.loader = true
        let data = [];
        for (const key in this.collectedReportForTableReport) {
          for (const val of this.collectedReportForTableReport[key]) {
            if (!val.typeCode || val.typeCode === 'SEQUENCE' || !val.columnId || !val.docReportId) {
              continue;
            }
            if (val.typeCode === 'SELECT' && typeof val.selectValueId === 'object') {
              const selectValue = val.selectValueId;
              data.push({
                ...val,
                dynamicRowId: key + 1,
                selectValueId: selectValue?.id,
                value: null,
                valueString: null,
                selectValueNameUz: selectValue?.nameUz ?? selectValue?.name ?? '',
                selectValueNameRu: selectValue?.nameRu ?? selectValue?.name ?? '',
                selectValueNameLt: selectValue?.nameLt ?? selectValue?.name ?? '',
                selectValueNameEn: selectValue?.nameEn ?? selectValue?.name ?? '',
                rowId: null
              })
              continue;
            }
            data.push({
              ...val,
              dynamicRowId: key + 1,
              rowId: null
            })
          }
        }
        const info = {
          ...this.saveData.reportInfoForGather,
          tableId: this.params.docTableId,
          dateTypeId: this.params.dateTypeId,
          gatherType: this.collectingType,
        }
        reportService.createAndFillGatherReport(info, data)
            .then((res) => {
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
            .finally(() => {
              this.loader = false
              this.$bvModal.hide('saveDataModal')
            })
      })
    },
    ownDocTablesValue(opt) {
      let item = this.ownDocTableListOptions.find(e => e.value === opt);
      return item.text ?? ''
    },
    labelCollectedSelect({nameUz, nameLt, nameRu, name}) {
      return nameUz ? this.getName({nameUz: nameUz, nameLt: nameLt, nameRu: nameRu}) : name
    },
    findFieldById(id) {
      return this.docTableFieldsSerialized.find(e => e.id === id);
    },
    async selectFetchOptions(column, keyword) {
      clearTimeout(this.selectLoadItemTimeOut);
      this.selectLoadItemTimeOut = setTimeout(async () => {
        this.selectLoadItemLoader = true;
        const field = this.findFieldById(column.columnId);
        crudAndListsService.searchListWithKeyword(field.referenceUrl, {
          keyword: keyword,
          itemsPerPage: 10,
          page: 1
        }, field.referenceAppendUrl)
            .then(res => {
              if ("DepartmentForDocument" === field.refCode) {
                this.selectOptionsByReferenceUrl[field.id] = res.data
              } else {
                this.selectOptionsByReferenceUrl[field.id] = res.data.list
              }
            })
            .catch(err => {
              this.selectLoadItemLoader = false;
            })
            .finally(() => {
              this.selectLoadItemLoader = false;
            })
      }, 500);
    },
  },
  computed: {
    ownDocTableListOptions() {
      if (this.ownDocTableList.length > 0) {
        return this.ownDocTableList.map(item => {
          return {
            text: this.getName({
              nameUz: item.nameUz,
              nameRu: item.nameRu,
              nameLt: item.nameLt,
            }),
            value: item.id,
          };
        });
      }
      return [];
    },
    ownDateTypeListOptions() {
      if (this.dateTypeList.length > 0) {
        return this.dateTypeList.map(item => {
          return {
            text: this.getName({
              nameUz: item.nameUz,
              nameRu: item.nameRu,
              nameLt: item.nameLt,
            }),
            value: item.id,
          };
        });
      }
      return [];
    },
    computedObServerSaveData() {
      return this.$refs.obServerSaveData
    }
  },
  watch: {
    async 'params.docTableId'(docTableId) {
      const {dateTypeId} = this.ownDocTableList.find(e => e.id === docTableId);
      if (dateTypeId) {
        this.loader = true
        await this.getDateTypeList(dateTypeId)
      } else {
        this.dateTypeList = [];
      }
    },
    'var_default_search_payload.page'() {
      if (this.loader) {
        return;
      }
      this.handleSearch(false);
    },
  }
};
</script>
