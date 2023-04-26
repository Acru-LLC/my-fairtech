<script>
import TableTemplate from "../table/table";
import Service from "../../reportService";
import {dec} from "@/helper";
import Checkbox from "vue-material-checkbox";
import formFormula from "./formFormula.vue";

export default {
  watch: {
    checkboxDataA: {
      handler(v) {
        this.thirdTrIdData.map((e) => {
          if (e.columnId == v) {
            this.typeCodeA = e
          }
        })
        this.$emit("changeCheckboxDataA", v);
      },
    },
    checkboxDataB: {
      handler(v) {
        this.$emit("changeCheckboxDataB", v);
      },
    },
    selected: {
      handler(v) {
        if (v == "A") {
          this.toggleFormulaA(true);
        } else if (v == "B") {
          this.toggleFormulaB(true);
        }
      },
    },
  },
  components: {
    TableTemplate,
    Checkbox,
    formFormula,
  },
  computed: {
    getTypeCode() {
      return this.typeCodeA == null ? '' : this.typeCodeA.typeCode
    }
  },
  data() {
    return {
      loaderR: false,
      checkboxDataD: [],
      hiddenSumRadio3: false,
      checkboxDataC: [],
      // getName: getName,
      selectedColumns: [],
      selectedRows: [],

      firstColumns: [],
      secondColumns: [],
      thirdColumns: [],

      thirdTrIdData: [],
      loader: false,

      checkboxDataB: [],
      checkboxDataA: [],
      typeCodeA: null,
      typeCodeB: null,

      isHiddenCheckboxA: false,
      isHiddenCheckboxB: false,

      selected: "",
      table: {},
      hiddenSumRadio: false,
      isShowFormula: false,
    };
  },

  methods: {
    getDocTableFormulasList() {
      this.$emit("getDocTableFormulasList", this.table.id)
    },

    pushCheckboxDataC(id) {
      this.checkboxDataC = [id];
    },
    saveRFormula() {
      this.loaderR = true;
      let payload = {
        f1: this.checkboxDataC,
        f2: this.checkboxDataD,
      };
      Service.saveFormulaRight(payload, dec(this.$route.params.id))
          .then((rs) => {
            if (rs.data) {
              this.successSaved();
              this.checkboxDataC = [];
              this.checkboxDataD = [];
              this.$emit("success");
            }
          })
          .catch((e) => {
          })
          .finally(() => (this.loaderR = false));
    },
    removeR() {
      this.hiddenSumRadio = false;
      this.hiddenSumRadio3 = false;
      this.checkboxDataC = [];
      this.checkboxDataD = [];
    },
    selectSumColumns() {
      this.cancelF();
      this.hiddenSumRadio3 = true;
    },
    selectSumColumn() {
      this.cancelF();
      this.hiddenSumRadio = true;
    },
    cancelF() {
      this.toggleFormulaA(false);
      this.toggleFormulaB(false);
      this.selected = "";
      this.checkboxDataB = [];
      this.checkboxDataA = [];
    },
    toggleFormulaA(v) {
      this.isHiddenCheckboxA = v;
      if (v) {
        this.removeR();
      }
    },
    toggleFormulaB(v) {
      this.isHiddenCheckboxB = v;
      if (v) {
        this.removeR();
      }
    },
    reset() {
      this.checkboxDataB = [];
      this.checkboxDataA = [];
    },
    getById(id) {
      this.loader = true;
      Service.getByIdTable(id)
          .then((rs) => {
            if (rs.data) {
              this.setColumns(rs.data.columns);
              this.setRow(rs.data.rows);
              this.table = rs.data.table;
            }
          })
          .catch((e) => {
          })
          .finally(() => (this.loader = false));
    },

    setColumns(v) {
      this.selectedColumns = v;
      this.firstColumns = [];
      this.secondColumns = [];
      this.thirdColumns = [];
      v.forEach((el1) => {
        this.firstColumns.push(el1);
        el1.children.forEach((el2) => {
          this.secondColumns.push(el2);
          el2.children.forEach((el3) => {
            this.thirdColumns.push({...el3, fId: el1.id});
          });
        });
      });

      setTimeout(() => {
        let firstTrTh = document.getElementsByClassName("firstTrTh");
        let secondTrTh = document.getElementsByClassName("secondTrTh");
        let thirdTrTh = document.getElementsByClassName("thirdTrTh");
        let counter2 = 0,
            counter3 = 0;
        firstTrTh.forEach((th) => {
          if (th.colSpan > 1) {
            for (
                let index2 = 0;
                index2 < th.colSpan;
                secondTrTh[counter2] && secondTrTh[counter2].colSpan > 1
                    ? index2
                    : index2++
            ) {
              if (secondTrTh[counter2] && secondTrTh[counter2].colSpan > 1) {
                for (
                    let index3 = 0;
                    index3 < secondTrTh[counter2].colSpan;
                    index3++
                ) {
                  let array = thirdTrTh[counter3].id.split(",");
                  let tmp = {
                    columnId: array[0],
                    typeCode: array[1],
                    rowId: [],
                    value: [],
                  };

                  this.thirdTrIdData.push(tmp);
                  counter3++;
                  index2++;
                }
                counter2++;
              } else {
                if (
                    secondTrTh[counter2] &&
                    secondTrTh[counter2].classList.contains("thirdTrId")
                ) {
                  // working
                  let array = secondTrTh[counter2].id.split(",");
                  let tmp = {
                    columnId: array[0],
                    typeCode: array[1],
                    rowId: [],
                    value: [],
                  };
                  this.thirdTrIdData.push(tmp);
                  counter2++;
                } else {
                  if (secondTrTh[counter2]) {
                    for (
                        let index3 = 0;
                        index3 < secondTrTh[counter2].colSpan;
                        index3++
                    ) {
                      let array = thirdTrTh[counter3].id.split(",");
                      let tmp = {
                        columnId: array[0],
                        typeCode: array[1],
                        rowId: [],
                        value: [],
                      };

                      this.thirdTrIdData.push(tmp);
                      counter3++;
                    }

                    counter2++;
                  }
                }
              }
            }
          } else {
            if (th.classList.contains("thirdTrId")) {
              let array = th.id.split(",");
              let tmp = {
                columnId: array[0],
                typeCode: array[1],
                rowId: [],
                value: [],
              };
              this.thirdTrIdData.push(tmp);
            } else {
              for (let index2 = 0; index2 < th.colSpan; index2++) {
                if (secondTrTh[counter2].colSpan > 1) {
                  for (
                      let index3 = 0;
                      index3 < secondTrTh[counter2].colSpan;
                      index3++
                  ) {
                    let array = thirdTrTh[counter3].id.split(",");
                    let tmp = {
                      columnId: array[0],
                      typeCode: array[1],
                      rowId: [],
                      value: [],
                    };
                    this.thirdTrIdData.push(tmp);
                    counter3++;
                  }
                  counter2++;
                } else {
                  if (
                      secondTrTh[counter2] &&
                      secondTrTh[counter2].classList.contains("thirdTrId")
                  ) {
                    let array = secondTrTh[counter2].id.split(",");
                    let tmp = {
                      columnId: array[0],
                      typeCode: array[1],
                      rowId: [],
                      value: [],
                    };

                    this.thirdTrIdData.push(tmp);
                    counter2++;
                  } else {
                    if (secondTrTh[counter2]) {
                      for (
                          let index3 = 0;
                          index3 < secondTrTh[counter2].colSpan;
                          index3++
                      ) {
                        let array = thirdTrTh[counter3].id.split(",");
                        let tmp = {
                          columnId: array[0],
                          typeCode: array[1],
                          rowId: [],
                          value: [],
                        };
                        this.thirdTrIdData.push(tmp);
                        counter3++;
                      }
                      counter2++;
                    }
                  }
                }
              }
            }
          }
        });
      }, 300);
    },
    setRow(v) {
      this.selectedRows = v;
    },

    rowspanFirst(el) {
      return el.children.length > 0
          ? 1
          : el.children.length > 0 && this.thirdColumns.length > 0
              ? 3
              : 3;
    },
    colspanFirst(el) {
      let found = this.thirdColumns.filter((i) => i.fId === el.id);
      let totalNotChild = el.children.filter((d) => d.children.length == 0);
      return el.children.length > 0 && found.length == 0
          ? el.children.length
          : el.children.length > 0 && found.length > 0
              ? totalNotChild.length + found.length
              : 1;
    },

    rowspanSecond(el) {
      return el.children.length == 0 && this.thirdColumns.length == 0
          ? 1
          : el.children.length == 0 && this.thirdColumns.length > 0
              ? 2
              : 1;
    },
    colspanSecond(el) {
      return el.children.length > 0 ? el.children.length : 1;
    },

    rowspanFirstClass(el) {
      return el.children.length > 0
          ? ""
          : el.children.length > 0 && this.thirdColumns.length > 0
              ? "thirdTrId"
              : "thirdTrId";
    },
    rowspanSecondClass(el) {
      return el.children.length == 0 && this.thirdColumns.length == 0
          ? "thirdTrId"
          : el.children.length == 0 && this.thirdColumns.length > 0
              ? "thirdTrId"
              : "";
    },
    addTemplateFormula() {
      this.isShowFormula = !this.isShowFormula;
    }
  },
};
</script>

<template>
  <div>
    <div>
      <div class="row">
        <div class="col-lg-12">
          <h5 class="text-center mb-1">
            <strong>
              {{ getName({nameLt: table.nameLt, nameUz: table.nameUz, nameRu: table.nameRu}) }}

            </strong>
          </h5>
          <p class="text-center m-0">
            {{ getName({nameLt: table.titleLt, nameUz: table.titleUz, nameRu: table.titleRu}) }}

          </p>
        </div>
        <div class="col-lg-12">
          <div class="pr-3 float-right">
            <strong>
              {{
                getName({
                  nameLt: table.conditionLt,
                  nameUz: table.conditionUz,
                  nameRu: table.conditionRu,
                })
              }}
            </strong>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1">
              <TableTemplate
                  :listRows="selectedRows"
                  :thirdColumns="thirdTrIdData"
                  class="mb-2 table-reponsive"
              >
                <template v-slot:thead>
                  <tr class="tr-text-center">
                    <th
                        style="width: 3%"
                        class="firstTrTh"
                        :id="[el.id,el.typeCode]"
                        :class="[
                        rowspanFirstClass(el),
                        checkboxDataB.indexOf(el.id.toString()) > -1
                          ? ['bg-primary', 'text-white']
                          : checkboxDataA.indexOf(el.id.toString()) > -1
                          ? ['bg-success', 'text-white']
                          : checkboxDataC.indexOf(el.id.toString()) > -1
                          ? ['bg-soft-warning', 'text-dark']
                          : checkboxDataD.indexOf(el.id.toString()) > -1
                          ? ['bg-light', 'text-dark']
                          : '',
                      ]"
                        :rowspan="rowspanFirst(el)"
                        :colspan="colspanFirst(el)"
                        v-for="(el, index) in firstColumns"
                        :key="index + 'first'"
                    >
                      <div
                          style="
                        max-height: 200px;
                          display: inline-block;
                        "
                      >
                        <div
                            :class="
                        (el.isVertical == 1 )
                        ? 'rotate_text'
                        : ''
                        "
                        >
                          {{ getName({nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu}) }}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr class="tr-text-center">
                    <th
                        style="width: 3%"
                        class="secondTrTh"
                        :id="[el.id,el.typeCode]"
                        :typeCode="el.typeCode"
                        :class="[
                        rowspanSecondClass(el),
                        checkboxDataB.indexOf(el.id.toString()) > -1
                          ? ['bg-primary', 'text-white']
                          : checkboxDataA.indexOf(el.id.toString()) > -1
                          ? ['bg-success', 'text-white']
                          : checkboxDataC.indexOf(el.id.toString()) > -1
                          ? ['bg-soft-warning', 'text-dark']
                          : checkboxDataD.indexOf(el.id.toString()) > -1
                          ? ['bg-light', 'text-dark']
                          : '',
                      ]"
                        :rowspan="rowspanSecond(el)"
                        :colspan="colspanSecond(el)"
                        v-for="(el, index) in secondColumns"
                        :key="index + 'second'"
                    >
                      <div
                          style="
                          max-height: 200px;
                          position: relative;
                          display: inline-block;
                          cursor: pointer;
                        "
                      >
                        <div
                            v-b-tooltip="{ variant: 'success' }"
                            :title="
                            getName({ nameLt: el.nameLt,  nameUz: el.nameUz,nameRu: el.nameRu })
                          "
                            :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                        >
                          {{ getName({nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu}) }}
                        </div>
                      </div>
                    </th>
                  </tr>

                  <tr class="tr-text-center">
                    <th
                        style="width: 3%"
                        :id="[el.id,el.typeCode]"
                        :class="
                        checkboxDataB.indexOf(el.id.toString()) > -1
                          ? ['bg-primary', 'text-white']
                          : checkboxDataA.indexOf(el.id.toString()) > -1
                          ? ['bg-success', 'text-white']
                          : checkboxDataC.indexOf(el.id.toString()) > -1
                          ? ['bg-soft-warning', 'text-dark']
                          : checkboxDataD.indexOf(el.id.toString()) > -1
                          ? ['bg-light', 'text-dark']
                          : ''
                      "
                        class="thirdTrId thirdTrTh"
                        :colspan="el.children.length > 0 ? el.children.length : 1"
                        v-for="(el, index) in thirdColumns"
                        :key="index + 'third'"
                    >
                      <div
                          style="
                            max-height: 200px;
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "
                      >
                        <div
                            v-b-tooltip="{ variant: 'success' }"
                            :title="
                            getName({ nameLt: el.nameLt, nameUz: el.nameUz,nameRu: el.nameRu })
                          "
                            :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                        >
                          {{ getName({nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu}) }}
                        </div>
                      </div>
                    </th>
                  </tr>

                  <tr class="tr-text-center">
                    <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'I-1'"
                    >
                      <strong v-if="selectedRows.length > 1">{{
                          selectedRows.length > 1 && index == 0 ? "" : index
                        }}</strong>

                      <strong v-else>
                        {{ index + 1 }}
                      </strong>
                    </td>
                  </tr>

                  <tr
                      class="tr-text-center bg-soft-success border"
                      v-if="isHiddenCheckboxA"
                  >
                    <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'A-1'"
                    >
                      <div v-if="index == 0 && selectedRows.length > 1"></div>
                      <div v-else class="check">
                        <Checkbox
                            v-show="item.typeCode ==='BIGDECIMAL'"
                            :value="item.columnId"
                            id="mycheck1"
                            v-model="checkboxDataA"
                            :disabled="checkboxDataB.indexOf(item.columnId) > -1 "
                        />
                      </div>
                    </td>
                  </tr>

                  <tr
                      class="tr-text-center bg-soft-primary"
                      v-if="isHiddenCheckboxB"
                  >
                    <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'B-1'"
                    >
                      <div v-if="index == 0 && selectedRows.length > 1"></div>
                      <div v-else class="check">
                        <Checkbox
                            v-show="item.typeCode ==='BIGDECIMAL'"
                            :disabled="checkboxDataA.indexOf(item.columnId) > -1"
                            :color="`#0070ff`"
                            :value="item.columnId"
                            id="mycheck2"
                            v-model="checkboxDataB"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr
                      class="tr-text-center bg-soft-warning"
                      v-if="hiddenSumRadio"
                  >
                    <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'B-1'"
                        @click="
                        checkboxDataD.indexOf(item.columnId) > -1
                          ? null
                          : pushCheckboxDataC(item.columnId)
                      "
                    >
                      <div v-if="index == 0 && selectedRows.length > 1"></div>
                      <div v-else class="check">
                        <Checkbox
                            :disabled="checkboxDataD.indexOf(item.columnId) > -1"
                            :checked="checkboxDataC.indexOf(item.columnId) > -1"
                            :color="`rgba(241, 180, 76, 0.25)`"
                            :value="item.columnId"
                            id="mycheck3"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr class="tr-text-center bg-light" v-if="hiddenSumRadio3">
                    <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'B-1'"
                    >
                      <div v-if="index == 0 && selectedRows.length > 1"></div>
                      <div v-else class="check">
                        <Checkbox
                            :disabled="checkboxDataC.indexOf(item.columnId) > -1"
                            :color="`#a6b0cf`"
                            :value="item.columnId"
                            id="mycheck4"
                            v-model="checkboxDataD"
                        />
                      </div>
                    </td>
                  </tr>
                </template>
              </TableTemplate>
            </div>
          </b-overlay>
        </div>
      </div>
      <formFormula
          :labelList="selectedColumns"
          :docTable="table"
          @getDocTableFormulasList="getDocTableFormulasList"
          v-if="isShowFormula"
      ></formFormula>
      <!--                                      COMMENT QILIB QO"YILDI FORMULALAR. SHABLONNI KO'RISHNI OCHIB.-->
      <div class="row">
        <div class="col-6">
          <div class="d-flex align-items-center justify-content-center mb-5">
            <b-form-radio-group buttons v-model="selected">
              <b-form-radio value="A" button-variant="outline-success"
              >A
              </b-form-radio
              >
            </b-form-radio-group>

            <span style="font-size: 20px" class="ml-2 mr-2">==</span>

            <b-form-radio-group buttons v-model="selected">
              <b-form-radio button-variant="outline-primary" value="B">B</b-form-radio>
            </b-form-radio-group>

            <b-button-group>
              <b-button
                  @click="cancelF"
                  :disabled="!isHiddenCheckboxA && !isHiddenCheckboxB"
                  variant="danger"
                  class="ml-4"
              >
                {{ $t("actions.cancel") }}
                <i class="fa fa-times"></i>
              </b-button>
              <slot name="save"></slot>
            </b-button-group>
          </div>

          <hr/>
          <div>
            <slot name="formulaFloat"></slot>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center justify-content-center mb-5">
            <b-button-group>
              <b-button @click="selectSumColumn" class="ml-4 bg-soft-warning">
                <span class="text-dark">
                  {{ $t("selectSumColumn") }}
                </span>
              </b-button>

              <b-button @click="selectSumColumns" class="bg-light">
                <span class="text-dark">
                  {{ $t("selectSumColumns") }}
                </span>
              </b-button>
              <b-button @click="addTemplateFormula" class="bg-light">
                <span class="text-dark">
                  {{
                    isShowFormula ? $t("submodules.doc_table_formulas.close_window") : $t("submodules.doc_table_formulas.add_formula")
                  }}
                </span>
              </b-button>
            </b-button-group>
            <b-button-group class="ml-4">
              <b-button
                  @click="removeR"
                  :disabled="!hiddenSumRadio && !hiddenSumRadio3"
                  variant="danger"
              >
                {{ $t("actions.cancel") }}
                <i class="fa fa-times"></i>
              </b-button>
              <b-button
                  @click="saveRFormula"
                  :disabled="
                        !checkboxDataC.length > 0 || !checkboxDataD.length > 0
                      "
                  variant="success"
              >
                <b-overlay :show="loaderR" opacity="0.1">
                  <i class="fa fa-save"></i> {{ $t("actions.save") }}
                </b-overlay
                >
              </b-button>
            </b-button-group>
          </div>
          <hr/>
          <div>
            <slot name="formulaRight"></slot>
          </div>
        </div>
        <div class="col-12">
          <hr>
          <slot name="formulasList"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.check {
  margin-top: 5px;

  .m-chckbox--container {
    margin: 0 !important;
    width: 22px !important;
  }

  label {
    margin: 0;
    display: none;
  }
}

.rotate_text {
  height: 100%;
  word-break: normal;
  writing-mode: vertical-rl;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  padding-bottom: 20px !important;
  padding-top: 20px !important;
}
</style>
