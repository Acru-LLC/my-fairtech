<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="btn btn-outline-dark btn-secondary float-left" @click="$router.push({name: 'IndexFinalForecast'})">
        {{ $t('actions.back') }}
      </div>
      <div class="h5 mb-4 d-inline-block">{{ $t('submodules.final_forecast.title') }}</div>
      <div class="btn btn-success float-right" @click="save">{{ $t('actions.save') }}</div>
      <div class="btn btn-primary float-right">{{ $t('actions.excel') }}</div>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <table class="table table-sm table-bordered table-condensed vertical-align-middle">
                <thead>
                <tr>
                  <th :colspan="getTableMaxRows">
                    <div @click="openModal(true, 'decisionName')" class="form-control">
                      {{
                        form.StatisticReportHeaderDto ? getName({
                          nameUz: form.StatisticReportHeaderDto.decisionNameUz,
                          nameRu: form.StatisticReportHeaderDto.decisionNameRu,
                          nameLt: form.StatisticReportHeaderDto.decisionNameLt,
                        }) : ''
                      }}
                    </div>
                  </th>
                </tr>
                <tr class="text-center">
                  <th rowspan="3">№</th>
                  <th rowspan="3">{{
                      $t('submodules.final_forecast.state_program_and_target_indicator')
                    }}
                  </th>
                  <th rowspan="3">{{ $t('column.employee') }}</th>
                  <th rowspan="3">{{ $t('column.unit') }}</th>
                  <th :colspan="quarterList.length || 1">
                    <div @click="openModal(true, 'year')" class="form-control">
                      {{
                        $t('submodules.final_forecast.year_plan', {year: form.StatisticReportHeaderDto ? form.StatisticReportHeaderDto.year : ''})
                      }}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th v-for="(quarterItem, quarterKey) in quarterList" :key="quarterKey" class="text-center">
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
                  <th class="text-center" :colspan="quarterList.length || 1">{{ $t('submodules.final_forecast.plan') }}</th>
                </tr>
                <tr class="text-center">
                  <th colspan="3">
                    <div @click="openModal(true, 'organizationName')" class="form-control">
                      {{
                        form.StatisticReportHeaderDto ? getName({
                          nameUz: form.StatisticReportHeaderDto.organizationNameUz,
                          nameRu: form.StatisticReportHeaderDto.organizationNameRu,
                          nameLt: form.StatisticReportHeaderDto.organizationNameLt,
                        }) : ''
                      }}
                    </div>
                  </th>
                  <th>
                    <div @click="openModal(true,'header_measurement_unit')"
                         class="form-control form-control-sm"
                         style="height: auto;min-height: calc(1.5em + 0.5rem + 2px)">
                      {{
                        form.StatisticReportHeaderDto && measurementUnitMap && measurementUnitMap[form.StatisticReportHeaderDto.measurementUnitId] ? getName({
                          nameUz: measurementUnitMap[form.StatisticReportHeaderDto.measurementUnitId].nameUz,
                          nameRu: measurementUnitMap[form.StatisticReportHeaderDto.measurementUnitId].nameRu,
                          nameLt: measurementUnitMap[form.StatisticReportHeaderDto.measurementUnitId].nameLt,
                        }) : '-'
                      }}
                    </div>
                  </th>
                  <th :colspan="quarterList.length || 1">
                    <div @click="openModal(true, 'value')" class="form-control">
                      {{ form.StatisticReportHeaderDto ? form.StatisticReportHeaderDto.value : '' }}
                    </div>
                  </th>
                </tr>
                <tr class="text-center">
                  <td></td>
                  <th :colspan="getTableMaxRows-1">
                    <div @click="openModal(true, 'strategicPurpose')" class="form-control">
                      {{
                        form.StatisticReportHeaderDto ? getName({
                          nameUz: form.StatisticReportHeaderDto.strategicPurposeUz,
                          nameRu: form.StatisticReportHeaderDto.strategicPurposeRu,
                          nameLt: form.StatisticReportHeaderDto.strategicPurposeLt,
                        }) : ''
                      }}
                    </div>
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
    <b-modal id="modal-1" :title="modal.title" v-model="modal.show">
      <div v-if="modal.step === 'decisionName'">
        <h5>{{ $t('submodules.final_forecast.decision_name') }}</h5>
        <div class="form-group">
          <label>{{ 'Uz' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.decisionNameUz">
        </div>
        <div class="form-group">
          <label>{{ 'Lt' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.decisionNameLt">
        </div>
        <div class="form-group">
          <label>{{ 'Ru' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.decisionNameRu">
        </div>
      </div>
      <div v-else-if="modal.step === 'organizationName'">
        <h5>{{ $t('submodules.final_forecast.organization_name') }}</h5>
        <div class="form-group">
          <label>{{ 'Uz' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.organizationNameUz">
        </div>
        <div class="form-group">
          <label>{{ 'Lt' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.organizationNameLt">
        </div>
        <div class="form-group">
          <label>{{ 'Ru' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.organizationNameRu">
        </div>
      </div>
      <div v-else-if="modal.step === 'strategicPurpose'">
        <h5>{{ $t('submodules.final_forecast.strategic_purpose') }}</h5>
        <div class="form-group">
          <label>{{ 'Uz' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.strategicPurposeUz">
        </div>
        <div class="form-group">
          <label>{{ 'Lt' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.strategicPurposeLt">
        </div>
        <div class="form-group">
          <label>{{ 'Ru' }}</label>
          <input type="text" class="form-control" v-model="form.StatisticReportHeaderDto.strategicPurposeRu">
        </div>
      </div>
      <div v-else-if="modal.step === 'year'">
        <h5>{{ $t('submodules.final_forecast.year') }}</h5>
        <div class="form-group">
          <date-picker
              class="d-block w-100"
              type="year"
              format="YYYY"
              v-model="form.StatisticReportHeaderDto.year"
              :first-day-of-week="1"
          ></date-picker>
        </div>
      </div>
      <div v-else-if="modal.step === 'value'">
        <h5>{{ $t('submodules.final_forecast.value') }}</h5>
        <div class="form-group">
          <input
              class="form-control"
              type="number"
              step="any"
              v-model="form.StatisticReportHeaderDto.value"
          />
        </div>
      </div>
      <div v-else-if="modal.step === 'header_measurement_unit'">
        <div class="form-group">
          <label>{{ $t('submodules.measurement_unit.title') }}</label>
          <select class="form-control form-control-sm"
                  v-model="form.StatisticReportHeaderDto.measurementUnitId"
          >
            <option value="" readonly=""></option>
            <option v-for="(measurementUnitItem, measurementUnitKey) in measurementUnitList"
                    :key="measurementUnitKey"
                    :value="measurementUnitItem.id">
              {{
                getName({
                  nameUz: measurementUnitItem.nameUz,
                  nameRu: measurementUnitItem.nameRu,
                  nameLt: measurementUnitItem.nameLt,
                })
              }}
            </option>
          </select>
        </div>
      </div>
      <div v-else-if="modal.step === 'measurement_unit'">
        <div class="form-group">
          <label>{{ $t('submodules.measurement_unit.title') }}</label>
          <select class="form-control form-control-sm"
                  v-model="form.StatisticReportInfoDto[modal.parentIndex].measurementUnitId"
          >
            <option value="" readonly=""></option>
            <option v-for="(measurementUnitItem, measurementUnitKey) in measurementUnitList"
                    :key="measurementUnitKey"
                    :value="measurementUnitItem.id">
              {{
                getName({
                  nameUz: measurementUnitItem.nameUz,
                  nameRu: measurementUnitItem.nameRu,
                  nameLt: measurementUnitItem.nameLt,
                })
              }}
            </option>
          </select>
        </div>
      </div>
      <div v-else-if="modal.step === 'measurement_unit_child'">
        <div class="form-group">
          <label>{{ $t('submodules.measurement_unit.title') }}</label>
          <select class="form-control form-control-sm"
                  v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].measurementUnitId"
          >
            <option value="" readonly=""></option>
            <option v-for="(measurementUnitItem, measurementUnitKey) in measurementUnitList"
                    :key="measurementUnitKey"
                    :value="measurementUnitItem.id">
              {{
                getName({
                  nameUz: measurementUnitItem.nameUz,
                  nameRu: measurementUnitItem.nameRu,
                  nameLt: measurementUnitItem.nameLt,
                })
              }}
            </option>
          </select>
        </div>
      </div>
      <div v-else-if="modal.step === 'info_name'">
        <div class="form-group">
          <label>{{ 'Uz' }}</label>
          <textarea class="form-control" v-model="form.StatisticReportInfoDto[modal.parentIndex].nameUz"></textarea>
        </div>
        <div class="form-group">
          <label>{{ 'Lt' }}</label>
          <textarea class="form-control" v-model="form.StatisticReportInfoDto[modal.parentIndex].nameLt"></textarea>
        </div>
        <div class="form-group">
          <label>{{ 'Ru' }}</label>
          <textarea class="form-control" v-model="form.StatisticReportInfoDto[modal.parentIndex].nameRu"></textarea>
        </div>
      </div>
      <div v-else-if="modal.step === 'info_name_child'">
        <div class="form-group">
          <label>{{ 'Uz' }}</label>
          <textarea class="form-control"
                    v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].nameUz"></textarea>
        </div>
        <div class="form-group">
          <label>{{ 'Lt' }}</label>
          <textarea class="form-control"
                    v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].nameLt"></textarea>
        </div>
        <div class="form-group">
          <label>{{ 'Ru' }}</label>
          <textarea class="form-control"
                    v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].nameRu"></textarea>
        </div>
      </div>
      <div v-else-if="modal.step === 'employee'">
        <div class="form-group">
          <label>{{ $t('assign_employee') }}</label>
          <BaseMultiselectWithValidation
              not-required
              multiple
              v-model="form.StatisticReportInfoDto[modal.parentIndex].employeeIds"
              @input="onEmployeeChange"
              @search-change="onEmployeeKeyUp"
              :options="employeeList.map(e => e.id)"
              :hide-selected="true"
              :close-on-select="false"
              :placeholder="$t('assign_employee')"
              :custom-label="customLabelAdDesignType"
              open-direction="bottom"
              style="width: 100%;"
              :max-height="600"
              :show-labels="false"
              :only-form-element="true"
          />
        </div>
      </div>
      <div v-else-if="modal.step === 'employee_child'">
        <div class="form-group">
          <label>{{ $t('assign_employee') }}</label>
          <BaseMultiselectWithValidation
              not-required
              multiple
              v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].employeeIds"
              @input="onEmployeeChange"
              @search-change="onEmployeeKeyUp"
              :options="employeeList.map(e => e.id)"
              :hide-selected="true"
              :close-on-select="false"
              :placeholder="$t('assign_employee')"
              :custom-label="customLabelAdDesignType"
              open-direction="bottom"
              style="width: 100%;"
              :max-height="600"
              :show-labels="false"
              :only-form-element="true"
          />
        </div>
      </div>
      <div v-else-if="modal.step === 'quarter_plan'">
        <div class="form-group">
          <label>{{ $t('column.value') }}</label>
          <input class="form-control"
                 type="number"
                 step="any"
                 v-model="form.StatisticReportInfoDto[modal.parentIndex].quarterValueDtoList[modal.quarterKey].plan" />
        </div>
      </div>
      <div v-else-if="modal.step === 'quarter_plan_child'">
        <div class="form-group">
          <label>{{ $t('column.value') }}</label>
          <input class="form-control"
                 type="number"
                 step="any"
                 v-model="form.StatisticReportInfoDto[modal.parentIndex].children[modal.childIndex].quarterValueDtoList[modal.quarterKey].plan" />
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

import DatePicker from "vue2-datepicker";
import Info from "./Info";
import appConfig from "@/app.config";
import apiService from "@/shared/services/api.service";

const urls = {
  create: MAIN_API_URL + '/create',
  get: MAIN_API_URL + '/get-by-id/',
  empty: MAIN_API_URL + '/get/empty',
  quarter: MAIN_API_URL + '/directory/quarter/list-search',
  measurementUnit: MAIN_API_URL + '/directory/measurement-unit/list-search',
  innerEmployee: '/employee/list-search/inner',
  confirmQuarterValue: '/statistic-report/confirm-quarter-plan/',
}

export default {
  page: {
    title: i18n.t('submodules.final_forecast.title'),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    DatePicker,
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
      employeeList: [],
      employeeListMap: {},
      saveLoading: false,
    };
  },

  methods: {
    getEmployeeInnerList(employeeListKeyword = '') {
      apiService.post(urls.innerEmployee + '?keyword=' + encodeURIComponent(employeeListKeyword), {
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
    serializeMeasurementUnit() {
      this.measurementUnitMap = {}
      this.measurementUnitList.forEach(item => {
        this.measurementUnitMap[item.id] = item
      })
    },
    openModal(show, step, infoTypeKey, parentIndex, childIndex, quarterKey = undefined) {
      if (parentIndex !== undefined && childIndex !== undefined) {
        step += '_child'
      }
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
    onEmployeeKeyUp(input) {
      this.getEmployeeInnerList(input);
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
      let data = this.form.StatisticReportHeaderDto;
      data.allInfos = this.form.StatisticReportInfoDto;
      apiService.post(urls.create, data).then(res => {
        this.$toast(this.$t('messages.saved_successfully'), {
          type: 'success'
        });
        this.serializeMeasurementUnit();
        this.saveLoading = false;
        this.$router.push({name: 'IndexFinalForecast'})
      }).catch(err => {
        this.saveLoading = false;
      });
    },
    confirmQuarterValue({id}) {
      this.cnf().then(({value}) => {
        if (value) {
          apiService.post(urls.confirmQuarterValue + id, {}, true).then(res => {
            this.handleCreated()
            this.$toast(this.$t('success'), {
              type: 'success'
            });
          }).catch(err => {
          });
        }
      })
    },
    handleCreated() {
      this.getEmployeeInnerList();
      apiService.get(urls.empty).then(response => {
        if (response.data.StatisticReportInfoDto.length === 1 && response.data.StatisticReportInfoDto[0].infoType === null) {
          this.infoTypeList.forEach((item, index) => {
            response.data.StatisticReportInfoDto[index] = JSON.parse(JSON.stringify(response.data.StatisticReportInfoDto[0]));
            response.data.StatisticReportInfoDto[index].infoType = item.code;
          });
        }
        this.form = response.data;
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
    },
  },
  created() {
    this.handleCreated()
  },
  computed: {
    getTableMaxRows: function () {
      return 4 + (this.quarterList.length)
    },
  },
  watch: {
    measurementUnitList: function () {
      this.serializeMeasurementUnit()
    },
  }
};
</script>

<style scoped lang='scss'>
.vertical-align-middle th, .vertical-align-middle td {
  vertical-align: middle;
}
</style>