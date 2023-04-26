<script>
import Service from "@/modules/report/reportService";
import {dec} from "@/helper";
import VueQRCodeComponent from "vue-qrcode-component";
import XLSX from "xlsx";

export default {
  components: {
    VueQRCodeComponent,
  },
  data() {
    return {
      qrCodeHeader: process.env.VUE_APP_ROOT_URL,
      showResult: false,
      showData: [],
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
      QRcodeData: {},
      currentPosition: {
        rowIndex: null,
        columnIndex: null,
        rowId: null,
        columnId: null,
      },
    };
  },
  /* COMPUTED */
  computed: {
    hasBigDecimalCol() {
      return this.thirdTrIdData.some(el => el.typeCode == 'BIGDECIMAL')
    }
  },
  methods: {
    getColumnData(i) {
      let found = this.showData.find((e) => e.columnId == i.columnId)
      if (found) {
        return found.columnData
      } else {
        return ""
      }
    },
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
      let wb = XLSX.utils.table_to_book(table, {sheet: "sheet1"});
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
      this.QRcodeData = {};
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
              .then(({data}) => {
                this.formulas = data;
                res(data);
              })
              .catch((e) => rej(e));
        } else {
          rej();
        }
      });
    },
    getDataById(id) {
      return new Promise((res, rej) => {
        Service.getReportById(id)
            .then(({data}) => {
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
                    allVal += parseFloat(vInput.innerText);
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
    async getById(id, reportId, status) {
      await this.clearAll();
      this.tableId = id;
      this.reportId = reportId;
      this.loader = true;
      if (status == "SIGN" || status == "APPROVED") {
        this.getQrCode(reportId);
      }
      Service.reportGetById(reportId).then(({data}) => {
        this.report = data;
      });
      Service.getByIdTableWithReportId(id, reportId)
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
                            // this.$set(input, "disabled", true);
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
                              if (e.typeCode === 'BIGDECIMAL') {
                                let foundColumnId = this.showData.findIndex((d) => d.columnId === e.columnId)
                                if (foundColumnId > -1) {
                                  this.showData.map(f => {
                                    if (f.columnId == e.columnId) {
                                      f.columnData = (+f.columnData) + (+e.value)
                                    }
                                  })
                                } else {
                                  this.showData.push({
                                    columnId: e.columnId,
                                    columnData: (e.value)
                                  })
                                }
                              }
                              if (e.typeCode === "SELECT") {
                                this.$set(input, "innerText", `${this.getName({
                                  nameRu: e.selectValueNameRu,
                                  nameLt: e.selectValueNameLt,
                                  nameUz: e.selectValueNameUz,
                                })}`);
                              } else {
                                this.$set(input, "innerText", e.value);
                              }
                            }
                          } else {
                            if ( parseFloat(JSON.parse(input.id).columnId) === parseFloat(e.columnId) ) {
                              if (e.typeCode === 'BIGDECIMAL') {
                                let foundColumnId = this.showData.findIndex((d) => d.columnId === e.columnId)
                                if (foundColumnId > -1) {
                                  this.showData.map(f => {
                                    if (f.columnId == e.columnId) {
                                      f.columnData = (+f.columnData) + (+e.value)
                                    }
                                  })
                                } else {
                                  this.showData.push({
                                    columnId: e.columnId,
                                    columnData: (e.value)
                                  })
                                }
                              }
                              if (e.typeCode === "SELECT") {
                                this.$set(input, "innerText", `${this.getName({
                                  nameRu: e.selectValueNameRu,
                                  nameLt: e.selectValueNameLt,
                                  nameUz: e.selectValueNameUz,
                                })}`);
                              } else {
                                this.$set(input, "innerText", e.value);
                              }
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
            // this.catchErr( e );
          });
    },
    getQrCode(id) {
      this.loaderQrcode = true;
      Service.getQrCode(id)
          .then((res) => {
            this.QRcodeData = res.data;
          })
          .finally(() => {
            this.loaderQrcode = false;
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
      if (el.children.length > 0) {
        return 1;
      }
      if (el.children.length > 0 && this.thirdColumns.length > 0) {
        return 3;
      }
      return 3;
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
      if (el.children.length == 0 && this.thirdColumns.length == 0) {
        return 1;
      }
      if (el.children.length == 0 && this.thirdColumns.length > 0) {
        return 2;
      }
      return 1;
    },
    colspanSecond(el) {
      return el.children.length > 0 ? el.children.length : 1;
    },

    rowspanFirstClass(el) {
      if (el.children.length > 0) {
        return "";
      }
      if (el.children.length > 0 && this.thirdColumns.length > 0) {
        return "thirdTrId";
      }
      return "thirdTrId";
    },
    rowspanSecondClass(el) {
      if (el.children.length == 0 && this.thirdColumns.length == 0) {
        return "thirdTrId";
      }
      if (el.children.length == 0 && this.thirdColumns.length > 0) {
        return "thirdTrId";
      }
      return "";
    },
  },
};
</script>

<template>
  <div id="printId">
    <div>
      <div class="row">
        <div class="col-12">
          <b-overlay :show="loaderQrcode" opacity="0.1" rounded="sm">
            <div
                v-if="QRcodeData.signDate"
                class="pl-4 d-flex align-items-center justify-content-"
            >
              <div class="no-border-table m-0">
                <table class="table table-centered m-0">
                  <tbody>
                  <tr>
                    <td>
                      <div>
                        <VueQRCodeComponent
                            :size="90"
                            :text="qrCodeHeader + $route.path + '/' + reportId"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div>
                          <h5 class="font-size-14 m-0">
                            <p class="text-dark m-0">
                              {{
                                `${QRcodeData.lastName} ${QRcodeData.firstName} ${QRcodeData.middleName}`
                              }}
                            </p>
                          </h5>
                          <p class="m-0 text-muted">
                            {{
                              getName({
                                nameLt: QRcodeData.yurDepNameLt,
                                nameRu: QRcodeData.yurDepNameRu,
                                nameUz: QRcodeData.yurDepNameUz,
                              })
                            }}
                          </p>
                          <p class="m-0 text-muted">
                            {{
                              getName({
                                nameLt: QRcodeData.departmentNameLt,
                                nameRu: QRcodeData.departmentNameRu,
                                nameUz: QRcodeData.departmentNameUz,
                              })
                            }}
                          </p>
                          <p class="m-0 text-muted">
                            {{
                              getName({
                                nameLt: QRcodeData.positionNameLt,
                                nameRu: QRcodeData.positionNameRu,
                                nameUz: QRcodeData.positionNameUz,
                              })
                            }}
                          </p>
                        </div>
                        <div>
                          <i
                              v-if="QRcodeData.signed"
                              style="font-size: 26px"
                              class="mdi ml-3 text-success mdi-check-all"
                          ></i>
                        </div>
                      </div>

                      <div v-if="QRcodeData.signDate" class="mt-1">
                        <b>{{ $t("dateSign") }}</b> :
                        {{
                          QRcodeData.signDate
                              ? new Date(QRcodeData.signDate).ddmmyyyyhhmmss()
                              : ""
                        }}
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
      <div class="row">
        <div class="col-lg-12">
          <h5 class="text-center mb-1">
            <strong>
              {{ getName({nameLt: table.nameLt, nameRu: table.nameRu}) }}
            </strong>
          </h5>
          <p class="text-center m-0">
            {{ getName({nameLt: table.titleLt, nameRu: table.titleRu}) }}
          </p>
        </div>
        <div class="col-lg-12">
          <div class="d-flex justify-content-between align-items-end pl-3 pr-3">
            <div>
              <strong>
                {{
                  getName({
                    nameLt: report.nameLt,
                    nameRu: report.nameRu,
                    nameUz: report.nameUz
                  })
                }}
              </strong>
              <br>
              <span>
                {{ report.reportDate }}
              </span>
            </div>
            <div>
              <strong>
                {{
                  getName({
                    nameLt: table.conditionLt,
                    nameRu: table.conditionRu,
                  })
                }}
              </strong>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1" style="min-height: 60vh">
              <div id="over" style="overflow: auto" class="pb-5">
                <table id="reportTableId" class="table table-centered table-custom-bordered" >
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
                      <div style="max-height: 200px;display: inline-block;">
                        <div :class="(el.isVertical == 1 )? 'rotate_text': ''">
                          {{
                            getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz})
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
                      <div style="max-height: 200px;position: relative;display: inline-block;cursor: pointer;">
                        <div :class="(el.isVertical == 1 )  ? 'rotate_text' : ''">
                          {{
                            getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz})
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
                        :colspan=" el.children.length > 0 ? el.children.length : 1 "
                        v-for="(el, index) in thirdColumns"
                        :key="index + 'third'"
                    >
                      <div style="max-height: 200px;position: relative;display: inline-block;cursor: pointer;">
                        <div :class="(el.isVertical == 1 )  ? 'rotate_text' : ''">
                          {{
                            getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz})
                          }}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr class="tr-text-center">
                    <td v-for="(item, index) of thirdTrIdData" :key="index + 'I-1'">
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
                  <tr v-for="(data, index1) in selectedRows" :key="index1 + 'MM'" >
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
                      <p
                          class="m-0 p-2" v-if="i.typeCode == 'SEQUENCE'">
                        {{ index1 + 1 }}
                      </p>
                      <!-- FOR INTEGER -->
                      <p
                          v-else
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          @input="(e) =>setValue(data.id,e,index1,index,i.columnId,i.typeCode)"
                          type="number"
                          style="min-height: 35px; line-height: 35px"
                          class="cursor-pointer input_val input-no-padding"
                      >
                      </p>
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr class="mt-5" v-show="showResult"
                  >
                    <th v-for="(i, index) in thirdTrIdData"
                        :key="index + 'td'"
                        class="text-center p"
                    >
                      <p v-if="index == 0">Jami</p>
                      <div v-else-if="i.typeCode == 'BIGDECIMAL'">
                        {{ getColumnData(i) }}
                      </div>
                      <div v-else>---</div>
                    </th>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <div>
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
                  <b-button v-if="!this.$route.params.id && hasBigDecimalCol" variant="info"
                            @click="showResult = !showResult ">
                    {{ $t('submodules.reports.report_result_see') }}
                  </b-button>
                </b-button-group>
              </div>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.qrcode {
  border: 1px solid #0364f6;
  margin-right: 50px;
  margin-top: -30px;
}

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

.no-border-table {
  th,
  td {
    border: none !important;
  }
}
</style>
