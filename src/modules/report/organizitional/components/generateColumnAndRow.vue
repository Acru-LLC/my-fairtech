<script>
import Service from "@/modules/report/reportService";
import { dec } from "@/helper";

export default {
  data() {
    return {
      // getName: getName,
      selectedColumns: [],
      selectedRows: [],

      firstColumns: [],
      secondColumns: [],
      thirdColumns: [],

      thirdTrIdData: [],
      loader: false,
      report: {},
      table: {},
      formulas: [],
      currentPosition: {
        rowIndex: null,
        columnIndex: null,
        rowId: null,
        columnId: null,
      },
    };
  },

  methods: {
    keyUpEventsDisable(e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    },
    keyUpEvents(evt) {
      if (this.currentPosition.columnId) {
        if (evt.keyCode == 40 && this.currentPosition.rowId) {
          // down
          if (this.currentPosition.rowIndex < this.selectedRows.length - 1) {
            let currentColumn =
              this.thirdTrIdData[this.currentPosition.columnIndex];
            let downRowColumn =
              this.selectedRows[this.currentPosition.rowIndex + 1];
            let downInput = document.getElementById(
              JSON.stringify({
                rowId: downRowColumn.id,
                columnId: currentColumn.columnId,
              })
            );
            if (downInput) {
              downInput.focus();
            }
          }
        } else if (evt.keyCode == 38 && this.currentPosition.rowId) {
          if (this.currentPosition.rowIndex != 0) {
            let currentColumn =
              this.thirdTrIdData[this.currentPosition.columnIndex];
            let upRowColumn =
              this.selectedRows[this.currentPosition.rowIndex - 1];
            let upInput = document.getElementById(
              JSON.stringify({
                rowId: upRowColumn.id,
                columnId: currentColumn.columnId,
              })
            );
            if (upInput) {
              upInput.focus();
            }
          }
          //up
        } else if (evt.keyCode == 37) {
          //left
          if (this.currentPosition.columnIndex != 0) {
            let prevColumn =
              this.thirdTrIdData[this.currentPosition.columnIndex - 1];
            let currentRow = this.selectedRows[this.currentPosition.rowIndex];
            let prevInput = document.getElementById(
              JSON.stringify({
                rowId: currentRow.id,
                columnId: prevColumn.columnId,
              })
            );
            if (prevInput) {
              if (prevInput.disabled) {
                let count =
                  this.thirdTrIdData.length -
                  (this.currentPosition.columnIndex - 1);
                for (let i = 0; i < count; i++) {
                  let prevColumn2 =
                    this.thirdTrIdData[
                      this.currentPosition.columnIndex - 1 - i
                    ];
                  let input = document.getElementById(
                    JSON.stringify({
                      rowId: currentRow.id,
                      columnId: prevColumn2.columnId,
                    })
                  );
                  if (input.disabled) {
                    continue;
                  } else {
                    if (input) {
                      input.focus();
                    }
                    break;
                  }
                }
              } else {
                prevInput.focus();
              }
            }
          }
        } else if (evt.keyCode == 39) {
          //right
          if (
            this.thirdTrIdData.length - 1 >
            this.currentPosition.columnIndex
          ) {
            let nextColumn =
              this.thirdTrIdData[this.currentPosition.columnIndex + 1];
            let currentRow = this.selectedRows[this.currentPosition.rowIndex];
            let nextInput = document.getElementById(
              JSON.stringify({
                rowId: currentRow.id,
                columnId: nextColumn.columnId,
              })
            );
            if (nextInput) {
              if (nextInput.disabled) {
                let forCount =
                  this.thirdTrIdData.length -
                  (this.currentPosition.columnIndex + 1);
                for (let i = 0; i < forCount; i++) {
                  let nextColumn2 =
                    this.thirdTrIdData[
                      this.currentPosition.columnIndex + 1 + i
                    ];

                  let input = document.getElementById(
                    JSON.stringify({
                      rowId: currentRow.id,
                      columnId: nextColumn2.columnId,
                    })
                  );
                  if (input.disabled) {
                    continue;
                  } else {
                    if (input) {
                      input.focus();
                    }
                    break;
                  }
                }
              } else {
                nextInput.focus();
              }
            }
          }
        }
      }
    },

    focusVal(rowId, value, rowIndex, columnIndex, columnId, typeCode) {
      this.$set(this.currentPosition, "rowIndex", rowIndex);
      this.$set(this.currentPosition, "columnIndex", columnIndex);
      this.$set(this.currentPosition, "rowId", rowId);
      this.$set(this.currentPosition, "columnId", columnId);
    },
    getFormulas_2() {
      return new Promise((res, rej) => {
        Service.formulasByTableId_2(dec(this.$route.params.id))
          .then(({ data }) => {
            this.formulas = data;
            res(data);
          })
          .catch((e) => rej(e));
      });
    },
    getDataById(id) {
      return new Promise((res, rej) => {
        Service.getReportById(id)
          .then(({ data }) => {
            res(data);
          })
          .catch((e) => rej(e));
      });
    },
    setValue(rowId, value, rowIndex, index, id, typeCode) {
      this.thirdTrIdData[index].value[rowIndex] = {
        rowId: rowId ? rowId : null,
        value: value,
        typeCode: typeCode,
        columnId: id,
      };
      document.getElementsByClassName("no_enter_value").forEach((input) => {
        if (JSON.parse(input.id).rowId) {
          this.formulas.forEach((e) => {
            if (
              e.f2.indexOf(id.toString()) > -1 &&
              e.f1.indexOf(JSON.parse(input.id).columnId) > -1 &&
              JSON.parse(input.id).rowId == rowId
            ) {
              let allVal = 0;
              document.getElementsByClassName("input_val").forEach((vInput) => {
                if (
                  e.f2.indexOf(parseFloat(JSON.parse(vInput.id).columnId)) >
                    -1 &&
                  JSON.parse(vInput.id).rowId == rowId
                ) {
                  if (this._empty(vInput.value)) {
                  } else {
                    allVal += parseFloat(vInput.value);
                  }
                }
                this.$set(input, "value", parseFloat(allVal));
                let foundIndex = this.thirdTrIdData.findIndex(
                  (e) => e.columnId == JSON.parse(input.id).columnId
                );
                this.thirdTrIdData[foundIndex].value[rowIndex] = {
                  rowId: rowId ? rowId : null,
                  value: allVal,
                  typeCode: typeCode,
                  columnId: JSON.parse(input.id).columnId,
                };
              });
            }
          });
        } else {
          this.formulas.forEach((e) => {
            if (
              e.f2.indexOf(id.toString()) > -1 &&
              e.f1.indexOf(JSON.parse(input.id).columnId) > -1
            ) {
              let allVal = 0;
              document.getElementsByClassName("input_val").forEach((vInput) => {
                if (
                  e.f2.indexOf(parseFloat(JSON.parse(vInput.id).columnId)) > -1
                ) {
                  if (this._empty(vInput.value)) {
                  } else {
                    allVal += parseFloat(vInput.value);
                  }
                }
                this.$set(input, "value", parseFloat(allVal));
                let foundIndex = this.thirdTrIdData.findIndex(
                  (e) => e.columnId == JSON.parse(input.id).columnId
                );
                this.thirdTrIdData[foundIndex].value[0] = {
                  rowId: null,
                  value: allVal,
                  typeCode: typeCode,
                  columnId: JSON.parse(input.id).columnId,
                };
              });
            }
          });
        }
      });

      this.$forceUpdate();
    },
    getById(id, reportId) {
      this.loader = true;
      Service.reportGetById(reportId).then(({ data }) => {
        this.report = data;
      });
      Service.getByIdTable(id)
        .then((rs) => {
          if (rs.data) {
            this.setColumns(rs.data.columns);
            this.setRow(rs.data.rows);
            this.table = rs.data.table;
            setTimeout(() => {
              Promise.all([
                this.getDataById(reportId),
                this.getFormulas_2(),
              ]).then(([data, formulas]) => {
                document
                  .getElementsByClassName("input_val")
                  .forEach((input) => {
                    formulas.forEach((element) => {
                      let index_V = JSON.parse(element.f1).findIndex(
                        (e) => e == JSON.parse(input.id).columnId
                      );
                      if (index_V > -1) {
                        this.$set(input, "disabled", true);
                        this.$set(input.style, "border", "none");
                        input.classList.add("no_enter_value");
                        input.style.fontWeight = "bold";
                      }
                    });
                    data.forEach((e) => {
                      if (JSON.parse(input.id).rowId) {
                        if (
                          parseFloat(JSON.parse(input.id).columnId) ==
                            parseFloat(e.columnId) &&
                          parseFloat(JSON.parse(input.id).rowId) ==
                            parseFloat(e.rowId)
                        ) {
                          this.$set(input, "value", e.value);
                        }
                      } else {
                        if (
                          parseFloat(JSON.parse(input.id).columnId) ==
                          parseFloat(e.columnId)
                        ) {
                          this.$set(input, "value", e.value);
                        }
                      }
                    });
                  });
                this.loader = false;
              });
            }, 500);
          }
        })
        .catch((e) => {
          this.loader = false;
          // this.catchErr(e);
        });
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
            this.thirdColumns.push({ ...el3, fId: el1.id });
          });
        });
      });

      setTimeout(() => {
        // this.thirdTrIdData = Array.prototype.slice
        //   .call(document.getElementsByClassName("thirdTrId"))
        //   .map((e) => {
        //     let array = e.id.split(",");
        //     return {
        //       columnId: array[0],
        //       typeCode: array[1],
        //       rowId: [],
        //       value: [],
        //     };
        //   });
        let firstTrTh = document.getElementsByClassName("firstTrTh");
        let secondTrTh = document.getElementsByClassName("secondTrTh");
        let thirdTrTh = document.getElementsByClassName("thirdTrTh");
        let counter2 = 0,
          counter3 = 0;
        firstTrTh.forEach((th) => {
          if (th.colSpan > 1) {
            for (let index2 = 0; index2 < th.colSpan; index2++) {
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
      if (this.selectedRows.length == 0) {
        this.selectedRows = [{}];
      }
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
              {{ getName( {nameLt: table.nameLt, nameRu: table.nameRu} ) }}

            </strong>
          </h5>
          <p class="text-center m-0">
            {{ getName( {nameLt: table.titleLt, nameRu: table.titleRu} ) }}

          </p>
        </div>
        <div class="col-lg-12">
          <div class="pr-3 float-right">
            <strong>
              {{
                getName( {
                  nameLt: table.conditionLt,
                  nameRu: table.conditionRu,
                } )
              }}
            </strong>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1" style="min-height: 60vh">
              <div style="overflow: auto" class="pb-5">
                <table
                  class="
                    table table-centered table-nowrap table-custom-bordered
                  "
                >
                  <thead>
                    <tr class="tr-text-center">
                      <th
                        :id="[el.id, el.typeCode]"
                        :class="rowspanFirstClass(el, index)"
                        class="firstTrTh"
                        style="width: 3%"
                        :rowspan="rowspanFirst(el)"
                        :colspan="colspanFirst(el)"
                        v-for="(el, index) in firstColumns"
                        :key="index + 'first'"
                      >
                        <div
                          style="
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "
                        >
                          <div
                            v-b-tooltip="{ variant: 'success' }"
                            :title="
                              getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu })
                            "
                            :class="
                              el.children.length > 0 || index == 0
                                ? ''
                                : 'rotate_text'
                            "
                          >
                            {{
                              getName({ nameLt: el.nameLt, ,nameUz: el.nameUz, nameRu: el.nameRu })
                            }}
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr class="tr-text-center">
                      <th
                        style="width: 3%"
                        :id="[el.id, el.typeCode]"
                        :class="rowspanSecondClass(el)"
                        class="secondTrTh"
                        :rowspan="rowspanSecond(el)"
                        :colspan="colspanSecond(el)"
                        v-for="(el, index) in secondColumns"
                        :key="index + 'second'"
                      >
                        <div
                          style="
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "
                        >
                          <div
                            v-b-tooltip="{ variant: 'success' }"
                            :title="
                              getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu })
                            "
                            :class="el.children.length > 0 ? '' : 'rotate_text'"
                          >
                            {{
                              getName({ nameLt: el.nameLt ,nameUz: el.nameUz,  nameRu: el.nameRu })
                            }}
                          </div>
                        </div>
                      </th>
                    </tr>

                    <tr class="tr-text-center">
                      <th
                        style="width: 3%"
                        :id="[el.id, el.typeCode]"
                        class="thirdTrId thirdTrTh"
                        :colspan="
                          el.children.length > 0 ? el.children.length : 1
                        "
                        v-for="(el, index) in thirdColumns"
                        :key="index + 'third'"
                      >
                        <div
                          v-b-tooltip="{ variant: 'success' }"
                          :title="
                            getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu })
                          "
                          style="
                            max-height: 200px;
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "
                        >
                          <div :class="(el.isVertical == 1 )  ? 'rotate_text' : ''" >
                            {{
                              getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu })
                            }}
                          </div>
                        </div>
                      </th>
                    </tr>

                    <tr class="tr-text-center">
                      <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'I-1'"
                      >
                        <strong v-if="selectedRows.length > 1">
                          {{
                            selectedRows.length > 1 && index == 0 ? "" : index
                          }}</strong
                        >

                        <strong v-else>
                          {{ index + 1 }}
                        </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index1) in selectedRows"
                      :key="index1 + 'MM'"
                    >
                      <!-- <th>
                        {{ getName({ ...data }) }}
                      </th> -->

                      <td
                        :class="[
                          $route.query.f1Ids &&
                          $route.query.f1Ids.indexOf(i.columnId) > -1 &&
                          selectedRows.length > 1 &&
                          $route.query.fRowId == data.id
                            ? 'bg-success'
                            : $route.query.f1Ids &&
                              $route.query.f1Ids.indexOf(i.columnId) > -1 &&
                              selectedRows.length <= 1
                            ? 'bg-success'
                            : '',
                          $route.query.f2Ids &&
                          $route.query.f2Ids.indexOf(i.columnId) > -1 &&
                          selectedRows.length > 1 &&
                          $route.query.fRowId == data.id
                            ? 'bg-primary'
                            : $route.query.f2Ids &&
                              $route.query.f2Ids.indexOf(i.columnId) > -1 &&
                              selectedRows.length <= 1
                            ? 'bg-primary'
                            : '',
                        ]"
                        v-for="(i, index) in thirdTrIdData"
                        :key="index + 'td'"
                        class="text-center p"
                      >
                        <p class="m-0 p-2" v-if="data.id && index == 0">
                          {{ getName(data) }}
                        </p>

                        <!-- FOR INTEGER -->

                        <div v-else>
                          <b-form-input
                            :class="
                              currentPosition.rowId &&
                              currentPosition.columnId &&
                              i.columnId == currentPosition.columnId &&
                              data.id == currentPosition.rowId
                                ? 'borderInput'
                                : currentPosition.columnId &&
                                  !currentPosition.rowId &&
                                  i.columnId == currentPosition.columnId
                                ? 'borderInput'
                                : ''
                            "
                            @focus="
                              (e) =>
                                focusVal(
                                  data.id,
                                  e,
                                  index1,
                                  index,
                                  i.columnId,
                                  i.typeCode
                                )
                            "
                            :style="
                              report.status && report.status != 'CREATED'
                                ? 'border: none !important'
                                : ''
                            "
                            :disabled="
                              report.status && report.status != 'CREATED'
                            "
                            :id="
                              JSON.stringify({
                                rowId: data.id,
                                columnId: i.columnId,
                              })
                            "
                            @input="
                              (e) =>
                                setValue(
                                  data.id,
                                  e,
                                  index1,
                                  index,
                                  i.columnId,
                                  i.typeCode
                                )
                            "
                            type="number"
                            class="text-center input_val p-0"
                          >
                          </b-form-input>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.borderInput {
  border: 2px solid green !important;
}
.check {
  margin-top: 5px;
  .m-chckbox--container {
    margin: 0px !important;
    width: 22px !important;
  }
  label {
    margin: 0;
    display: none;
  }
}
</style>
<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.rotate_text {
  writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  padding-bottom: 20px !important;
  padding-top: 20px !important;
}
.no_enter_value {
  padding: 0px !important;
  min-width: auto !important;
}
</style>
