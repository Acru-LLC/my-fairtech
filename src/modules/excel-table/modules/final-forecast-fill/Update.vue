<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="btn btn-outline-dark btn-secondary float-left"
           @click="$router.push({name: 'IndexFinalForecastFill'})">
        {{ $t('actions.back') }}
      </div>
      <div class="h5 mb-4 d-inline-block">{{ $t('submodules.final_forecast.title') }}</div>
      <div class="btn btn-success float-right" @click="save">{{ $t('actions.save') }}</div>
      <div class="btn btn-primary float-right" @click="excelExport">{{ $t('actions.excel') }}</div>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <table class="table table-sm table-bordered table-condensed vertical-align-middle" ref="table">
                <thead>
                <tr>
                  <th :colspan="getTableMaxRows" class="text-center h5">
                    {{
                      form.StatisticReportHeaderDto ? getName({
                        nameUz: form.StatisticReportHeaderDto.decisionNameUz,
                        nameRu: form.StatisticReportHeaderDto.decisionNameRu,
                        nameLt: form.StatisticReportHeaderDto.decisionNameLt,
                      }) : ''
                    }}
                  </th>
                </tr>
                <tr class="text-center">
                  <th rowspan="3">№</th>
                  <th rowspan="3" colspan="2" class="text-center">{{
                      $t('submodules.final_forecast.state_program_and_target_indicator')
                    }}
                  </th>
                  <th rowspan="3">{{ $t('column.unit') }}</th>
                  <th :colspan="quarterPlanDoneList.length || 1" class="text-center">
                    {{
                      $t('submodules.final_forecast.year_plan', {year: form.StatisticReportHeaderDto ? form.StatisticReportHeaderDto.year : ''})
                    }}
                  </th>
                </tr>
                <tr>
                  <th v-for="(quarterItem, quarterKey) in quarterList" :key="quarterKey" class="text-center"
                      colspan="2">
                    {{
                      getName({
                        nameUz: quarterItem.nameUz,
                        nameRu: quarterItem.nameRu,
                        nameLt: quarterItem.nameLt,
                      })
                    }}
                  </th>
                </tr>
                <tr>
                  <th v-for="(quarterItem, quarterKey) in quarterPlanDoneList" :key="quarterKey" class="text-center">
                    {{
                      quarterItem.type === 'plan' ? $t('submodules.final_forecast.plan') : $t('submodules.final_forecast.done')
                    }}
                  </th>
                </tr>
                <tr class="text-center">
                  <th colspan="3">
                    {{
                      form.StatisticReportHeaderDto ? getName({
                        nameUz: form.StatisticReportHeaderDto.organizationNameUz,
                        nameRu: form.StatisticReportHeaderDto.organizationNameRu,
                        nameLt: form.StatisticReportHeaderDto.organizationNameLt,
                      }) : ''
                    }}
                  </th>
                  <th>
                    {{
                      form.StatisticReportHeaderDto ? getName({
                        nameUz: form.StatisticReportHeaderDto.measurementUnitNameUz,
                        nameRu: form.StatisticReportHeaderDto.measurementUnitNameRu,
                        nameLt: form.StatisticReportHeaderDto.measurementUnitNameLt,
                      }) : ''
                    }}
                  </th>
                  <th :colspan="quarterPlanDoneList.length || 1">
                    {{ form.StatisticReportHeaderDto ? form.StatisticReportHeaderDto.value : '' }}
                  </th>
                </tr>
                <tr class="text-center">
                  <td></td>
                  <th :colspan="getTableMaxRows-1">
                    {{
                      form.StatisticReportHeaderDto ? getName({
                        nameUz: form.StatisticReportHeaderDto.strategicPurposeUz,
                        nameRu: form.StatisticReportHeaderDto.strategicPurposeRu,
                        nameLt: form.StatisticReportHeaderDto.strategicPurposeLt,
                      }) : ''
                    }}
                  </th>
                </tr>
                </thead>
                <Info v-for="(infoTypeItem, infoTypeKey) in infoTypeList"
                      :key="infoTypeKey"
                      :infoTypeKey="infoTypeKey"
                      :infoType="infoTypeItem"
                      :statisticReportInfoDto="form.StatisticReportInfoDto"
                      :getTableMaxRows="getTableMaxRows"
                      :quarterList="quarterList"
                      ref="infoType"
                      :quarterPlanDoneList="quarterPlanDoneList"
                      :measurementUnitList="measurementUnitList"
                      :measurementUnitMap="measurementUnitMap"
                      @open-parent-modal="openModal"
                      @confirm-quarter-value="confirmQuarterValue"
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-1"
             :title="modal.title"
             v-model="modal.show"
             ref="modal">
      <div v-if="modal.step === 'quarter_plan'">
        <div class="form-group">
          <label>{{ $t('column.value') }}</label>
          <input class="form-control"
                 type="number"
                 ref="quarter_plan"
                 step="any"
                 v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].quarterValueDtoList[modal.quarterKey].done"/>
        </div>
      </div>
      <div v-if="modal.step === 'bases'">
        <div class="form-group">
          <BaseFileUploaderWithValidation
              not-required
              ref="supplementDocUploader"
              v-model="modal.bases"
              :max-files="null"
              :max-fileSize="null"
              :label-on-top="false"
              :label="$t('attached_files')"
          ></BaseFileUploaderWithValidation>
        </div>
        <div v-if="this.modal.childIndex !== undefined">
          <div
              v-if="form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases && form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases[modal.quarterKey]"
              class="d-inline-block">
            <div
                v-for="(items, keys) in form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases[modal.quarterKey]"
                :key="keys" class="d-inline-block">
              <a :href="'/'+items.url" download class="btn"><i class="mdi mdi-download"></i> {{ items.name }}</a>
            </div>
          </div>
          <div
              v-for="(items, keys) in form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].quarterValueDtoList[modal.quarterKey].baseFiles"
              :key="keys" class="d-inline-block">
            <a :href="'/'+items.url" download class="btn"><i class="mdi mdi-download"></i> {{ items.name }}</a>
          </div>
        </div>
        <div v-else>
          <div v-if="form.StatisticReportInfoDto[this.modal.parentIndex].bases && form.StatisticReportInfoDto[this.modal.parentIndex].bases[modal.quarterKey]"
               class="d-inline-block">
            <div v-for="(items, keys) in form.StatisticReportInfoDto[this.modal.parentIndex].bases[modal.quarterKey]"
                 :key="keys" class="d-inline-block">
              <a :href="'/'+items.url" download class="btn"><i class="mdi mdi-download"></i> {{ items.name }}</a>
            </div>
            <div
                v-for="(items, keys) in form.StatisticReportInfoDto[this.modal.parentIndex].quarterValueDtoList[modal.quarterKey].baseFiles"
                :key="keys" class="d-inline-block">
              <a :href="'/'+items.url" download class="btn"><i class="mdi mdi-download"></i> {{ items.name }}</a>
            </div>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <button type="button" class="btn btn-primary" @click="modal.show = false;">{{ $t('actions.save') }}</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import i18n from "../../../../i18n";

const MAIN_API_URL = 'statistic-report'

import Info from "./Info";
import appConfig from "@/app.config";
import apiService from "@/shared/services/api.service";
import XLSX from "xlsx";

const urls = {
  create: MAIN_API_URL + '/create',
  update: MAIN_API_URL + '/update/',
  saveValue: MAIN_API_URL + '/save-value',
  get: MAIN_API_URL + '/get-by-id/',
  quarter: MAIN_API_URL + '/directory/quarter/list-search',
  measurementUnit: MAIN_API_URL + '/directory/measurement-unit/list-search',
  innerEmployee: '/employee/list-search/inner',
  confirmQuarterValue: '/statistic-report/confirm-quarter-value/',
}

export default {
  page: {
    title: i18n.t('submodules.final_forecast.title'),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    Info,
  },
  data() {
    return {
      form: {},
      modal: {
        show: false,
        step: '',
        title: "",
        infoTypeKey: '',
        parentIndex: 0,
        childIndex: undefined,
        quarterKey: undefined,
        bases: undefined,
      },
      infoTypeList: [
        {
          code: 'FINAL',
          name: i18n.t('submodules.final_forecast.info_type_final'),
        },
        {
          code: 'DIRECTLY',
          name: i18n.t('submodules.final_forecast.info_type_directly'),
        },
      ],
      quarterList: [],
      measurementUnitList: [],
      measurementUnitMap: {},
      employeeListKeyword: '',
      employeeList: [],
      employeeListMap: {},
      saveLoading: false,
    };
  },
  methods: {
    getEmployeeInnerList() {
      apiService.post(urls.innerEmployee + '?keyword=' + encodeURIComponent(this.employeeListKeyword), {
        itemsPerPage: 10,
        page: 0,
      }).then(res => {
        this.employeeList = res.data.list;
        this.employeeListMap = {};
        this.employeeList.forEach(item => {
          this.employeeListMap[item.id] = item;
        });
      });
    },
    openModal(show, step, infoTypeKey, parentIndex, childIndex, quarterKey = undefined) {
      console.log(show, step, infoTypeKey, parentIndex, childIndex, quarterKey)
      this.modal.show = show;
      this.modal.step = step;
      this.modal.infoTypeKey = infoTypeKey;
      this.modal.parentIndex = parentIndex;
      this.modal.childIndex = childIndex;
      this.modal.quarterKey = quarterKey;
    },
    customLabelAdDesignType(id) {
      let selected = this.employeeListMap[id];
      if (selected) {
        return selected.fullName;
      }
      return '';
    },
    customLabelMeasurementUnitList(id) {
      let selected = this.measurementUnitList[id];
      if (selected) {
        return this.getName({});
      }
      return '';
    },
    onEmployeeChange(selectedList) {
      if (this.modal.step === 'employee_child') {
        this.form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].employeeFullNames = selectedList.map(e => {
          return this.employeeListMap[e].lastName + ' ' + this.employeeNameFirstChar(this.employeeListMap[e].firstName) + ' ' + this.employeeNameFirstChar(this.employeeListMap[e].middleName);
        });
      } else if (this.modal.step === 'employee') {
        this.form.StatisticReportInfoDto[this.modal.parentIndex].employeeFullNames = selectedList.map(e => {
          return this.employeeListMap[e].lastName + ' ' + this.employeeNameFirstChar(this.employeeListMap[e].firstName) + ' ' + this.employeeNameFirstChar(this.employeeListMap[e].middleName);
        });
      }
      this.$refs['infoType'][this.modal.infoTypeKey].serializeItems()
    },
    employeeNameFirstChar(name) {
      let fs = name.charAt(0) + name.charAt(1);
      if (['sh', 'ch', "o'", "g'"].indexOf(fs.toLowerCase().replace('`', "'")) !== -1) {
        return fs;
      }
      return name.charAt(0);
    },
    save() {
      if (this.saveLoading) {
        return;
      }
      this.saveLoading = true;
      let data = this.serializeSaveResult(this.form.StatisticReportInfoDto);
      apiService.post(urls.saveValue, data, true).then(res => {
        this.$toast(this.$t('messages.saved_successfully'), {
          type: 'success'
        });
        this.saveLoading = false;
        this.$router.push({name: 'IndexFinalForecastFill'});
      }).catch(err => {
        this.saveLoading = false;
      });
    },
    serializeSaveResult(infos, result = []) {
      for (const index in infos) {
        infos[index].quarterValueDtoList.map(e => {
          result.push({
            id: e.id,
            done: e.done,
            quarterId: e.quarterId,
          });
        });
        if (infos[index].children) {
          result = this.serializeSaveResult(infos[index].children, result);
        }
      }
      return result;
    },
    serializeEmployeeIds(infoList) {
      return infoList.map(info => {
        info.employeeIds = info.attachedEmployeeDtos.map(e => {
          return e.employeeId;
        });
        info.employeeFullNames = info.attachedEmployeeDtos.map(e => {
          return e.employeeLastName + ' ' + e.employeeFirstName + ' ' + e.employeeMiddleName;
        });
        if (info.children) {
          info.children = this.serializeEmployeeIds(info.children);
        }
        return info;
      });
    },
    excelExport() {
      this.loaderExcel = true;
      let fileName = `Report`;
      let wb = XLSX.utils.table_to_book(this.$refs.table, {sheet: "sheet1"});
      setTimeout(() => {
        this.loaderExcel = false;
      }, 500);
      return XLSX.writeFile(wb, `${fileName}.xlsx`, {});
    },
    confirmQuarterValue({id}) {
      this.cnf().then(({value}) => {
        if (value) {
          apiService.post(urls.confirmQuarterValue + id, {}, true).then(async res => {
            await this.handleCreated()
            await this.$toast(this.$t('success'), {
              type: 'success'
            });
          }).catch(err => {
          });
        }
      })
    },
    handleCreated(){
      this.getEmployeeInnerList();
      apiService.post(urls.get + this.$route.params.id).then(response => {
        let res = {
          StatisticReportHeaderDto: response.data.header,
          StatisticReportInfoDto: response.data.infoList,
        };
        res.StatisticReportInfoDto = this.serializeEmployeeIds(res.StatisticReportInfoDto);
        if (res.StatisticReportInfoDto.length === 1 && res.StatisticReportInfoDto[0].infoType === null) {
          this.infoTypeList.forEach((item, index) => {
            res.StatisticReportInfoDto[index] = JSON.parse(JSON.stringify(res.StatisticReportInfoDto[0]));
            res.StatisticReportInfoDto[index].infoType = item.code;
          });
        }
        this.form = res;
      });
      apiService.post(urls.quarter, {
        itemsPerPage: 100,
        page: 0,
      }).then(response => {
        this.quarterList = response.data.list;
      });
      apiService.post(urls.measurementUnit, {
        itemsPerPage: 100,
        page: 0,
      }).then(response => {
        this.measurementUnitList = response.data.list;
      });
    }
  },
  created() {
    this.handleCreated()
  },
  computed: {
    getTableMaxRows: function () {
      return 4 + (this.quarterPlanDoneList.length)
    },
    quarterPlanDoneList() {
      let list = [];
      this.quarterList.forEach((e, i) => {
        list.push({...e, type: 'plan', quarterIndex: i});
        list.push({...e, type: 'done', quarterIndex: i});
      });
      return list;
    },
  },
  watch: {
    'modal.show': {
      handler(val) {
        if (this.modal.step === 'bases') {
          if (val === false) {
            if (this.modal.bases && this.modal.bases.length > 0) {
              const files = this.modal.bases;
              const formData = new FormData();
              const quarter = this.quarterPlanDoneList[this.modal.quarterKey];
              let info;
              if (this.modal.childIndex !== undefined) {
                info = this.form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex];
              } else {
                info = this.form.StatisticReportInfoDto[this.modal.parentIndex];
              }
              files.forEach(file => {
                formData.append('baseFiles', file.file);
              });
              apiService
                  .post(MAIN_API_URL + `/save/base-files/${info.id}/${quarter.id}`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => {
                    if (this.modal.childIndex !== undefined) {
                      if (!this.form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases) {
                        this.form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases = [];
                      }
                      this.form.StatisticReportInfoDto[this.modal.parentIndex].children[this.modal.childIndex].bases[this.modal.quarterKey] = res.data.infoFiles;
                    } else {
                      if (!this.form.StatisticReportInfoDto[this.modal.parentIndex].bases) {
                        this.form.StatisticReportInfoDto[this.modal.parentIndex].bases = [];
                      }
                      this.form.StatisticReportInfoDto[this.modal.parentIndex].bases[this.modal.quarterKey] = res.data.infoFiles;
                    }
                    this.modal.bases = [];
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
          }
        }
      },
      deep: true,
    },
  }
};
</script>

<style scoped lang='scss'>
.vertical-align-middle th, .vertical-align-middle td {
  vertical-align: middle;
}

.preview {
  max-width: 60px;
  max-height: 60px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>