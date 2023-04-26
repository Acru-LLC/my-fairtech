<script>
import Service from "@/modules/report/reportService";
// import { getName, dec } from "@/helper";
import XLSX from "xlsx";
export default {
  data() {
    return {
      loaderPrint: false,
      loaderExcel: false,
      loaderQrcode: false,
      f1Ids: [],
      f2Ids: [],
      fRowId: null,
      tableId: null,
      reportId: null,
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
    print() {
      this.loaderPrint = true;
      let vm = this;
      setTimeout(() => {
        let mywindow = window.open("", "PRINT", "height=800,width=1000");
        // Get all stylesheets HTML
        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style'),
        ]) {
          stylesHtml += node.outerHTML;
        }

        mywindow.document.write(`<html><head> <title>  Report </title>`);
        mywindow.document.write(`</head><body><style>
      @page {
        size: A4 !important;
        margin: 1cm !important;
      }
      table{
          font-size:1.1vw
      }


      #none-dsp {
        display:none !important
      }
      #over {
        overflow:visible !important
      }
      </style>
      ${stylesHtml}`);
        mywindow.document.write(document.getElementById("printId").innerHTML);

        mywindow.document.write("</body></html>");

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.onload = function () {
          mywindow.print();
          mywindow.close();
          vm.loaderPrint = false;
        };
        return true;
      }, 300);
    },
    excelExport() {
      this.loaderExcel = true;
      let fileName = `Report`;
      let table = document.getElementById("reportTableId");
      let wb = XLSX.utils.table_to_book(table, { sheet: "sheet1" });
      setTimeout(() => {
        this.loaderExcel = false;
      }, 500);
      return XLSX.writeFile(wb, `${fileName}.xlsx`, {});
    },
    clearAll() {
      this.selectedColumns = [];
      this.selectedRows = [];
      this.firstColumns = [];
      this.secondColumns = [];
      this.thirdColumns = [];
      this.thirdTrIdData = [];
      this.formulas = [];
      this.table = [];
      this.f1Ids = [];
      this.f2Ids = [];
    },
    setError(f1, f2, frowId) {
      this.f1Ids = f1;
      this.f2Ids = f2;
      this.fRowId = frowId;
    },

    getFormulas_2() {
      return new Promise((res, rej) => {
        if (this.tableId) {
          Service.formulasByTableId_2(this.tableId)
            .then(({ data }) => {
              this.formulas = data;
              res(data);
            })
            .catch((e) => rej(e));
        } else {
          rej();
        }
      });
    },
    getDataById(form) {
      return new Promise((res, rej) => {
        Service.getGather(form)
          .then(({ data }) => {
            let resdata = {
              data: data.dataList,
              report: data.reportList,
            };
            res(resdata);
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
      document.getElementsByClassName("no_enter_value_2").forEach((input) => {
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
                  if (this._empty(vInput.innerText)) {
                  } else {
                    allVal += parseFloat(vInput.innerText);
                  }
                }
                this.$set(input, "innerText", parseFloat(allVal));
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
                  if (this._empty(vInput.innerText)) {
                  } else {
                    allVal += parseFloat(vInput.value);
                  }
                }
                this.$set(input, "innerText", parseFloat(allVal));
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
    getById(id, form) {
      this.clearAll();
      this.tableId = id;
      //   this.reportId = reportId;
      this.loader = true;

      //   Service.reportGetById(reportId).then(({ data }) => {
      //     this.report = data;
      //   });
      return new Promise((res, rej) => {
        Service.getByIdTable(id)
          .then((rs) => {
            if (rs.data) {
              this.setColumns(rs.data.columns);
              this.setRow(rs.data.rows);
              this.table = rs.data.table;
              setTimeout(() => {
                Promise.all([
                  this.getDataById(form),
                  this.getFormulas_2(),
                ]).then(([{ data, report }, formulas]) => {
                  document
                    .getElementsByClassName("input_val")
                    .forEach((input) => {
                      formulas.forEach((element) => {
                        let index_V = JSON.parse(element.f1).findIndex(
                          (e) => e == JSON.parse(input.id).columnId
                        );
                        if (index_V > -1) {
                          // this.$set(input, "disabled", true);
                          this.$set(input.style, "border", "none");
                          input.classList.add("no_enter_value_2");
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
                            this.$set(input, "innerText", e.value);
                          }
                        } else {
                          if (
                            parseFloat(JSON.parse(input.id).columnId) ==
                            parseFloat(e.columnId)
                          ) {
                            this.$set(input, "innerText", e.value);
                          }
                        }
                      });
                    });

                  this.loader = false;
                  res({ report: report, data: data });
                });
              }, 500);
            }
          })
          .catch((e) => {
            this.loader = false;
            // this.catchErr(e);
            rej("error");
          });
      });
    },
    getByWithReportId(id, form) {
      this.clearAll();
      this.tableId = id;
      //   this.reportId = reportId;
      this.loader = true;

      //   Service.reportGetById(reportId).then(({ data }) => {
      //     this.report = data;
      //   });
      return new Promise((res, rej) => {
        Service.getByIdTableWithReportId(id, form.tableId.id)
            .then((rs) => {
              if (rs.data) {
                this.setColumns(rs.data.columns);
                this.setRow(rs.data.rows);
                this.table = rs.data.table;
                setTimeout(() => {
                  Promise.all([
                    this.getDataById(form),
                    this.getFormulas_2(),
                  ]).then(([{ data, report }, formulas]) => {
                    document
                        .getElementsByClassName("input_val")
                        .forEach((input) => {
                          formulas.forEach((element) => {
                            let index_V = JSON.parse(element.f1).findIndex(
                                (e) => e == JSON.parse(input.id).columnId
                            );
                            if (index_V > -1) {
                              // this.$set(input, "disabled", true);
                              this.$set(input.style, "border", "none");
                              input.classList.add("no_enter_value_2");
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
                                this.$set(input, "innerText", e.value);
                              }
                            } else {
                              if (
                                  parseFloat(JSON.parse(input.id).columnId) ==
                                  parseFloat(e.columnId)
                              ) {
                                this.$set(input, "innerText", e.value);
                              }
                            }
                          });
                        });

                    this.loader = false;
                    res({ report: report, data: data });
                  });
                }, 500);
              }
            })
            .catch((e) => {
              this.loader = false;
              // this.catchErr(e);
              rej("error");
            });
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
        //   .call(document.getElementsByClassName("thirdTrId_2"))
        //   .map((e) => {
        //     let array = e.id.split(",");
        //     return {
        //       columnId: array[0],
        //       typeCode: array[1],
        //       rowId: [],
        //       value: [],
        //     };
        //   });
        let firstTrTh = document.getElementsByClassName("firstTrTh_2");
        let secondTrTh = document.getElementsByClassName("secondTrTh_2");
        let thirdTrTh = document.getElementsByClassName("thirdTrTh_2");
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
                  secondTrTh[counter2].classList.contains("thirdTrId_2")
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
            if (th.classList.contains("thirdTrId_2")) {
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
                    secondTrTh[counter2].classList.contains("thirdTrId_2")
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
        ? "thirdTrId_2"
        : "thirdTrId_2";
    },
    rowspanSecondClass(el) {
      return el.children.length == 0 && this.thirdColumns.length == 0
        ? "thirdTrId_2"
        : el.children.length == 0 && this.thirdColumns.length > 0
        ? "thirdTrId_2"
        : "";
    },
  },
};
</script>

<template>
  <div id="printId">
    <div>
      <div class="row">
        <div class="col-lg-12">
          <h5 class="text-center mb-1">
            <strong>
              {{ getName({ nameLt: table.titleLt, nameRu: table.titleRu, nameUz: table.titleUz }) }}
            </strong>
          </h5>
          <p class="text-center m-0">
            {{
              getName({
                nameLt: table.conditionLt,
                nameRu: table.conditionRu,
                nameUz: table.conditionUz,
              })
            }}
          </p>
        </div>
        <div class="col-lg-12">
          <div class="float-left pl-3">
            <b-button-group id="none-dsp">
              <b-button @click="excelExport" variant="success">
                <b-overlay :show="loaderExcel" opacity="0.1" rounded="sm">
                  {{ $t("actions.excel") }}
                </b-overlay>
              </b-button>
              <b-button
                :disabled="loaderPrint"
                @click="print"
                variant="primary"
              >
                <b-overlay :show="loaderPrint" opacity="0.1" rounded="sm">
                  {{ $t("actions.print") }}
                </b-overlay>
              </b-button>
            </b-button-group>
          </div>
          <div class="pr-3 float-right">
            <strong>
              {{ getName({ nameLt: table.nameLt, nameRu: table.nameRu, nameUz: table.nameUz }) }}
            </strong>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1" style="min-height: 60vh">
              <div id="over" style="overflow: auto" class="pb-5">
                <table
                  id="reportTableId"
                  class="
                    table table-centered table-nowrap table-custom-bordered
                  "
                >
                  <thead>
                    <tr class="tr-text-center">
                      <th
                        :id="[el.id, el.typeCode]"
                        :class="rowspanFirstClass(el, index)"
                        class="firstTrTh_2"
                        style="width: 3%"
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
                            v-b-tooltip="{ variant: 'success' }"
                            :title="
                              getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                            "
                            :class="
                        (el.isVertical == 1 )
                        ? 'rotate_text'
                        : ''
                        "
                          >
                            {{
                              getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
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
                        class="secondTrTh_2"
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
                              getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                            "
                            :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                          >
                            {{
                              getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                            }}
                          </div>
                        </div>
                      </th>
                    </tr>

                    <tr class="tr-text-center">
                      <th
                        style="width: 3%"
                        :id="[el.id, el.typeCode]"
                        class="thirdTrId_2 thirdTrTh_2"
                        :colspan="
                          el.children.length > 0 ? el.children.length : 1
                        "
                        v-for="(el, index) in thirdColumns"
                        :key="index + 'third'"
                      >
                        <div
                          v-b-tooltip="{ variant: 'success' }"
                          :title="
                            getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                          "
                          style="
                            max-height: 200px;
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "

                        >
                          <div :class="(el.isVertical == 1 )  ? 'rotate_text' : ''">
                            {{
                              getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
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
                          f1Ids &&
                          f1Ids.indexOf(i.columnId) > -1 &&
                          selectedRows.length > 1 &&
                          fRowId == data.id
                            ? 'bg-success'
                            : f1Ids &&
                              f1Ids.indexOf(i.columnId) > -1 &&
                              selectedRows.length <= 1
                            ? 'bg-success'
                            : '',
                          f2Ids &&
                          f2Ids.indexOf(i.columnId) > -1 &&
                          length > 1 &&
                          fRowId == data.id
                            ? 'bg-primary'
                            : f2Ids &&
                              f2Ids.indexOf(i.columnId) > -1 &&
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

                        <p
                          style="min-height: 35px; line-height: 35px"
                          v-else
                          :id="
                            JSON.stringify({
                              rowId: data.id,
                              columnId: i.columnId,
                            })
                          "
                          class="m-0 input_val text-center"
                        >
                          <!-- <b-form-input
                            :disabled="true"
                            style="border: none !important'
                            "
                            :id="
                              JSON.stringify({
                                rowId: data.id,
                                columnId: i.columnId,
                              })
                            "
                            type="number"
                            class="text-center input_val border-none p-0"
                          >
                          </b-form-input> -->
                        </p>
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
.border-none {
  border: 1px solid transparent !important;
}
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
  height: 100%;
  word-break: normal;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  padding-bottom: 20px !important;
  padding-top: 20px !important;
}
.no_enter_value_2 {
  padding: 0px !important;
  min-width: auto !important;
}
.no-border-table {
  th,
  td {
    border: none !important;
  }
}
</style>
