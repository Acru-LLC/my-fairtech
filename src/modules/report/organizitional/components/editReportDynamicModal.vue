<script>
import Service from "@/modules/report/reportService";
import crudAndListsService from "@/shared/services/crud_and_list.service"
import Checkbox from "vue-material-checkbox";

const OKED_API_URL = 'reestr/info-oked'
export default {
  props: {
    isGenerated: {
      type: Boolean,
      default: false
    }
  },
  components: { Checkbox },
  data() {
    return {
      lastReportData: [],
      lastReportDataRows: [],
      lastReportFormulas: [],
      debounce: null,
      // OKED VARIABLES
      okeds: [],
      hasNextPageOked: false,
      isLoadingOked: false,
      okedSearchPayload: {},
      // ----------------
      f1Ids: [],
      f2Ids: [],
      fRowId: null,
      tableId: null,
      tableInfo: {},
      reportId: null,
      // getName: getName,
      selectedColumns: [],
      selectedRows: [],

      firstColumns: [],
      secondColumns: [],
      thirdColumns: [],

      thirdTrIdData: [],
      currentRowId: null,
      invalidEntries: 0,
      currentItemData: [],
      showData: [],
      loader: false,
      showResult: false,
      report: {},
      table: {},
      formulas: [],
      currentPosition: {
        rowIndex: null,
        columnIndex: null,
        rowId: null,
        columnId: null,
      },
      docTableFormulasList: {},
      docTableFormulasListenColumnId: {},
      trColumnIdOnDocColumnIdMap: {},
    };
  },
  watch: {
    thirdTrIdData: function (newThirdTrIdData) {
      if (typeof newThirdTrIdData === 'object' && newThirdTrIdData.length > 0) {
        let length = newThirdTrIdData.length;
        for (let i = 0; i < length; i++) {
          this.trColumnIdOnDocColumnIdMap[newThirdTrIdData[i].columnId] = i
        }
      }
    },
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
    // DYNAMIC_REFERENCES METHODS
    getRandomInt() {
      let number = Math.floor(Math.random() * 10000000);
      let bool = true
      this.selectedRows.find(el => {
        if (el.id == number) {
          bool = false
        } else if (el.id == number) {
          bool = false
        }
        return bool
      })
      if (bool) {
        return number;
      } else {
        this.getRandomInt()
      }

    },
    async addNewRow() {
      await this.selectedRows.push({ id: this.getRandomInt() })
      await this.setDocumentColumnValues(this.lastReportData, this.lastReportFormulas)
    },
    async closeReport() {
      this.$emit("closedReportLoader");
      this.cnf().then(async (rs) => {
        if (rs.value) {
          this.$emit('save', true)
        }
      });
    },
    stopFormingRows() {
      Service.stopFormingTheReport(this.reportId)
          .then(async (rs) => {
            this.$set(this.tableInfo, 'hasDynamicRows', false)
            // await this.deleteSuccess();
          })
          .catch((err) => {
            // this.catchErr(err);
          });
    },
    async deleteRow(index, data) {
      let findElement = this.lastReportDataRows.findIndex(el => el.id == data.id)
      if (findElement > -1) {
        this.cnf().then(async (rs) => {
          if (rs.value) {
            await Service.deleteRowId(data.id, this.reportId)
                .then(async (rs) => {
                  // await this.deleteSuccess();
                  this.selectedRows.splice(index, 1)
                  await this.$forceUpdate()
                  await this.resetIndex()
                  await this.setDocumentColumnValues(this.lastReportData.filter(e => e.rowId != data.id), this.lastReportFormulas)
                })
                .catch((err) => {
                  // this.catchErr(err);
                })
                .finally(async () => {
                  await this.getById(this.tableId, this.reportId, this.tableInfo)
                })
            ;
          }
        });
      } else {
        this.cnf().then(async (rs) => {
          if (rs.value) {
            let newThirdTrIdData = []
            this.thirdTrIdData = this.thirdTrIdData.map((e) => {
              e.value = e.value.filter(d => {
                if (d && d.rowId != data.id) {
                  if (d.typeCode === "BOOLEAN") {
                    d.valueBoolean = d.value
                    d.valueString = null
                    d.valueBigDecimal = null
                    d.valueDate = null
                    d.selectValueNameUz = null
                  } else if (d.typeCode === "STRING") {
                    d.valueString = d.value
                    d.valueBigDecimal = null
                    d.valueDate = null
                    d.valueBoolean = null
                    d.selectValueNameUz = null
                  } else if (d.typeCode === "BIGDECIMAL") {
                    d.valueBigDecimal = d.value
                    d.valueString = null
                    d.valueDate = null
                    d.valueBoolean = null
                    d.selectValueNameUz = null
                  } else if (d.typeCode === "DATE") {
                    d.valueDate = d.value
                    d.valueString = null
                    d.valueBigDecimal = null
                    d.valueBoolean = null
                    d.selectValueNameUz = null
                  } else if (d.typeCode === "YEAR") {
                    d.valueDate = null
                    d.valueString = d.value
                    d.valueBigDecimal = null
                    d.valueBoolean = null
                    d.selectValueNameUz = null
                  } else if (d.typeCode === "SELECT") {
                    d.valueString = null
                    d.valueBigDecimal = null
                    d.valueDate = null
                    d.valueBoolean = null
                  }
                  newThirdTrIdData.push(d)
                  return d
                }
              })
              return e
            })
            this.selectedRows.splice(index, 1)
            await this.$forceUpdate()
            await this.resetIndex()
            newThirdTrIdData.forEach(e => this.lastReportData.push(e))
            await this.setDocumentColumnValues(this.lastReportData, this.lastReportFormulas)
          }
        });


      }
    },

    dynamicRefsReachedEndOfList(e) {
      if (e) {
        this.fetchDynamicRefs()
      }
    },
    async debounceSearchDynamicRefs(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchDynamicRefsWithKeyword(searchText);
      }, 1000);
    },
    fetchDynamicRefsWithKeyword(keyword) {
      this.okeds = []
      this.okedSearchPayload.page = 1
      this.okedSearchPayload.keyword = keyword ? keyword : ''
      this.fetchDynamicRefs()
    },
    async fetchDynamicRefs() {
      this.isLoadingOked = true
      await crudAndListsService.searchListWithKeyword(OKED_API_URL, this.okedSearchPayload)
          .then(res => {
            this.okeds.push(...res.data.list)
            this.hasNextPageOked = res.data.total / this.okedSearchPayload.itemsPerPage > this.okedSearchPayload.page
            this.okedSearchPayload.page += 1
            if (!this.isModeCreate && this.editingItem.okedId) {
              let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
              if (!foundItm && this.editingItem.infoOkedDto) {
                this.okeds.push(this.editingItem.infoOkedDto)
              }
            }
          })
          .catch(e => {
            console.log(e)
            this.okeds = []
          })
          .finally(() => {
            this.isLoadingOked = false
          })
    },
    customLabelDynamicRef(opt) {
      let selected = this.okeds.find(e => e.id == opt.id);
      if (selected) {
        return `${selected.code} - ${
            selected.nameUz ?
                this.getName({
                  nameRu: selected.nameRu,
                  nameLt: selected.nameLt,
                  nameUz: selected.nameUz,
                })
                :
                selected.name
        }`
      }
      return ``;
    },
    // --------------------------
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
    keydownEvt(evt, rowId, value, rowIndex, columnIndex, columnId, typeCode) {
      this.keyUpEventsDisable(evt);
      if (columnId != null) {
        if (evt.keyCode == 40 && rowId != null) {
          evt.preventDefault();
          // down
          if (rowIndex < this.selectedRows.length - 1) {
            let currentColumn = this.thirdTrIdData[columnIndex];
            let downRowColumn = this.selectedRows[rowIndex + 1];
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
        } else if (evt.keyCode == 38 && rowId != null) {
          evt.preventDefault();
          if (rowIndex != 0) {
            let currentColumn = this.thirdTrIdData[columnIndex];
            let upRowColumn = this.selectedRows[rowIndex - 1];
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
          evt.preventDefault();
          //left
          if (columnIndex != 0) {
            let prevColumn = this.thirdTrIdData[columnIndex - 1];

            let currentRow = this.selectedRows[rowIndex];
            let prevInput = document.getElementById(
                JSON.stringify({
                  rowId: currentRow.id,
                  columnId: prevColumn.columnId,
                })
            );
            if (prevInput) {
              if (prevInput.disabled) {
                let count = this.thirdTrIdData.length - (columnIndex - 1);
                for (let i = 0; i < count; i++) {
                  let prevColumn2 = this.thirdTrIdData[columnIndex - 1 - i];
                  if (prevColumn2) {
                    let input = document.getElementById(
                        JSON.stringify({
                          rowId: currentRow.id,
                          columnId: prevColumn2.columnId,
                        })
                    );
                    if (input && input.disabled) {
                      continue;
                    } else {
                      if (input) {
                        input.focus();
                      }
                      break;
                    }
                  }
                }
              } else {
                prevInput.focus();
              }
            }
          }
        } else if (evt.keyCode == 39) {
          //right
          evt.preventDefault();
          if (this.thirdTrIdData.length - 1 > columnIndex) {
            let nextColumn = this.thirdTrIdData[columnIndex + 1];
            let currentRow = this.selectedRows[rowIndex];
            let nextInput = document.getElementById(
                JSON.stringify({
                  rowId: currentRow.id,
                  columnId: nextColumn.columnId,
                })
            );
            if (nextInput) {
              if (nextInput.disabled) {
                let forCount = this.thirdTrIdData.length - (columnIndex + 1);
                for (let i = 0; i < forCount; i++) {
                  let nextColumn2 = this.thirdTrIdData[columnIndex + 1 + i];

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
    async resetIndex() {
      await this.$set(this.currentPosition, "rowIndex", null);
      await this.$set(this.currentPosition, "columnIndex", null);
      await this.$set(this.currentPosition, "rowId", null);
      await this.$set(this.currentPosition, "columnId", null);
      // await document.addEventListener("keydown", this.keyUpEvents);
    },
    setError(f1, f2, frowId) {
      this.f1Ids = f1;
      this.f2Ids = f2;
      this.fRowId = frowId;
    },
    keyUpEventsDisable(e) {
      if (this.currentPosition.columnId != null) {
        if (e.which === 38 || e.which === 40) {
          e.preventDefault();
        }
      }
    },
    keyUpEvents(evt) {
      this.keyUpEventsDisable(evt);
      // if (this.currentPosition.columnId != null) {
      //   if (evt.keyCode == 40 && this.currentPosition.rowId != null) {
      //     evt.preventDefault();
      //     // down
      //     if (this.currentPosition.rowIndex < this.selectedRows.length - 1) {
      //       let currentColumn =
      //         this.thirdTrIdData[this.currentPosition.columnIndex];
      //       let downRowColumn =
      //         this.selectedRows[this.currentPosition.rowIndex + 1];
      //       let downInput = document.getElementById(
      //         JSON.stringify({
      //           rowId: downRowColumn.id,
      //           columnId: currentColumn.columnId,
      //         })
      //       );
      //       if (downInput) {
      //         downInput.focus();
      //       }
      //     }
      //   } else if (evt.keyCode == 38 && this.currentPosition.rowId != null) {
      //     evt.preventDefault();
      //     if (this.currentPosition.rowIndex != 0) {
      //       let currentColumn =
      //         this.thirdTrIdData[this.currentPosition.columnIndex];
      //       let upRowColumn =
      //         this.selectedRows[this.currentPosition.rowIndex - 1];
      //       let upInput = document.getElementById(
      //         JSON.stringify({
      //           rowId: upRowColumn.id,
      //           columnId: currentColumn.columnId,
      //         })
      //       );
      //       if (upInput) {
      //         upInput.focus();
      //       }
      //     }
      //     //up
      //   } else if (evt.keyCode == 37) {
      //     evt.preventDefault();
      //     //left
      //     if (this.currentPosition.columnIndex != 0) {
      //       let prevColumn =
      //         this.thirdTrIdData[this.currentPosition.columnIndex - 1];
      //       let currentRow = this.selectedRows[this.currentPosition.rowIndex];
      //       let prevInput = document.getElementById(
      //         JSON.stringify({
      //           rowId: currentRow.id,
      //           columnId: prevColumn.columnId,
      //         })
      //       );
      //       if (prevInput) {
      //         if (prevInput.disabled) {
      //           let count =
      //             this.thirdTrIdData.length -
      //             (this.currentPosition.columnIndex - 1);
      //           for (let i = 0; i < count; i++) {
      //             let prevColumn2 =
      //               this.thirdTrIdData[
      //                 this.currentPosition.columnIndex - 1 - i
      //               ];
      //             let input = document.getElementById(
      //               JSON.stringify({
      //                 rowId: currentRow.id,
      //                 columnId: prevColumn2.columnId,
      //               })
      //             );
      //             if (input && input.disabled) {
      //               continue;
      //             } else {
      //               if (input) {
      //                 input.focus();
      //               }
      //               break;
      //             }
      //           }
      //         } else {
      //           prevInput.focus();
      //         }
      //       }
      //     }
      //   } else if (evt.keyCode == 39) {
      //     //right
      //     evt.preventDefault();
      //     if (
      //       this.thirdTrIdData.length - 1 >
      //       this.currentPosition.columnIndex
      //     ) {
      //       let nextColumn =
      //         this.thirdTrIdData[this.currentPosition.columnIndex + 1];
      //       let currentRow = this.selectedRows[this.currentPosition.rowIndex];
      //       let nextInput = document.getElementById(
      //         JSON.stringify({
      //           rowId: currentRow.id,
      //           columnId: nextColumn.columnId,
      //         })
      //       );
      //       if (nextInput) {
      //         if (nextInput.disabled) {
      //           let forCount =
      //             this.thirdTrIdData.length -
      //             (this.currentPosition.columnIndex + 1);
      //           for (let i = 0; i < forCount; i++) {
      //             let nextColumn2 =
      //               this.thirdTrIdData[
      //                 this.currentPosition.columnIndex + 1 + i
      //               ];

      //             let input = document.getElementById(
      //               JSON.stringify({
      //                 rowId: currentRow.id,
      //                 columnId: nextColumn2.columnId,
      //               })
      //             );
      //             if (input.disabled) {
      //               continue;
      //             } else {
      //               if (input) {
      //                 input.focus();
      //               }
      //               break;
      //             }
      //           }
      //         } else {
      //           nextInput.focus();
      //         }
      //       }
      //     }
      //   }
      // }
    }
    ,

    focusVal(rowId, value, rowIndex, columnIndex, columnId, typeCode) {
      this.$set(this.currentPosition, "rowIndex", parseFloat(rowIndex));
      this.$set(this.currentPosition, "columnIndex", parseFloat(columnIndex));
      this.$set(this.currentPosition, "rowId", parseFloat(rowId));
      this.$set(this.currentPosition, "columnId", parseFloat(columnId));
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
    getDataById(id) {
      return new Promise((res, rej) => {
        Service.getReportById(id)
            .then(({ data }) => {
              res(data);
            })
            .catch((e) => rej(e));
      });
    },
    editValue(rowIndex, index) {
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'notEditable', false)
      this.$forceUpdate();
    },
    resetValue(rowIndex, index) {
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'selectValueId', this.thirdTrIdData[index].value[rowIndex].originalSelectValueId)
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'selectValueNameUz', this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameUz)
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'selectValueNameLt', this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameLt)
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'selectValueNameRu', this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameRu)
      this.$set(this.thirdTrIdData[index].value[rowIndex], 'notEditable', true)
      this.$forceUpdate();
    },
    setValue(rowId, value, rowIndex, index, id, typeCode, notEditable = false, initialLoadCall = false) {
      // value.rowId = rowId
      // value.typeCode = typeCode
      //
      // value.notEditable = notEditable
      // value.selectValueNameLt = value.nameLt
      // value.selectValueNameRu = value.nameRu
      // value.selectValueNameUz = value.nameUz
      //
      /* this.thirdTrIdData[index].value[rowIndex] = {
        rowId: rowId ? rowId : null,
        value: typeCode === 'SELECT' ? '' : value,
        selectValueNameUz: value ? value.nameUz : null,
        selectValueNameLt: value ? value.nameLt : null,
        selectValueNameRu: value ? value.nameRu : null,
        originalSelectValueNameUz: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameUz : '',
        originalSelectValueNameLt: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameLt : '',
        originalSelectValueNameRu: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameRu : '',
        typeCode: typeCode,
        columnId: id,
        notEditable: notEditable
      }; */
      if (initialLoadCall && typeCode === 'SELECT') {
        let rowIndex = this.selectedRows.findIndex(el => el.id == rowId)
        if (!this.thirdTrIdData[index].value[rowIndex].rowId) {
          this.thirdTrIdData[index].value[rowIndex] = {
            rowId: rowId,
            value: typeCode === 'SELECT' ? '' : value,
            selectValueId: value ? value.id : null,
            selectValueNameUz: value ? (value.nameUz ? value.nameUz : value.name) : null,
            selectValueNameLt: value ? value.nameLt : null,
            selectValueNameRu: value ? value.nameRu : null,
            originalSelectValueNameUz: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameUz : '',
            originalSelectValueNameLt: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameLt : '',
            originalSelectValueNameRu: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameRu : '',
            typeCode: typeCode,
            columnId: id,
            notEditable: notEditable,
          }
          this.thirdTrIdData[index].value[rowIndex].originalselectValueId = value.id
          this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameUz = value.nameUz
          this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameLt = value.nameLt
          this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameRu = value.nameRu
        }
      } else {
        if (typeCode === 'SELECT') {
          value.rowId = rowId
          value.columnId = id
          value.typeCode = typeCode
          value.notEditable = notEditable
          value.selectValueId = value.id
          value.selectValueNameLt = value.nameLt
          value.selectValueNameRu = value.nameRu
          value.selectValueNameUz = value.nameUz ? value.nameUz : value.name
        }

        this.thirdTrIdData[index].value[rowIndex] = {
          rowId: rowId,
          value: typeCode === 'SELECT' ? '' : value,
          selectValueId: value ? value.id : null,
          selectValueNameUz: value ? value.nameUz : null,
          selectValueNameLt: value ? value.nameLt : null,
          selectValueNameRu: value ? value.nameRu : null,
          originalSelectValueNameUz: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameUz : '',
          originalSelectValueNameLt: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameLt : '',
          originalSelectValueNameRu: this.thirdTrIdData[index].value[rowIndex] ? this.thirdTrIdData[index].value[rowIndex].originalSelectValueNameRu : '',
          typeCode: typeCode,
          columnId: id,
          notEditable: notEditable,
        };
      }

      document.getElementsByClassName("no_enter_value").forEach((input) => {
        if (JSON.parse(input.id).rowId) {
          this.formulas.forEach((e) => {
            let index_f2 = JSON.parse(e.f2).findIndex((d) => d == parseFloat(id));
            let index_f1 = JSON.parse(e.f1).findIndex((d) => d == parseFloat(JSON.parse(input.id).columnId));
            if (
                index_f2 > -1 &&
                index_f1 > -1 &&
                parseFloat(JSON.parse(input.id).rowId) === parseFloat(rowId)
            ) {

              let allVal = 0;
              document.getElementsByClassName("input_val").forEach((vInput) => {
                let e_index_f2 = JSON.parse(e.f2).findIndex(
                    (d) => d == parseFloat(JSON.parse(vInput.id).columnId)
                );

                if (
                    e_index_f2 > -1 &&
                    parseFloat(JSON.parse(vInput.id).rowId) === parseFloat(rowId)
                ) {
                  if (this._empty(vInput.value)) {
                  } else {
                    if (typeof parseFloat(vInput.value) == "number") {
                      allVal += parseFloat(vInput.value);
                    } else {
                      allVal += 0;
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
                  this.$forceUpdate();
                }
              });
            }
          });
        } else {
          this.formulas.forEach((e) => {
            let index_f2 = JSON.parse(e.f2).findIndex(
                (d) => d == parseFloat(id)
            );
            let index_f1 = JSON.parse(e.f1).findIndex(
                (d) => d == parseFloat(JSON.parse(input.id).columnId)
            );
            if (index_f2 > -1 && index_f1 > -1) {
              let allVal = 0;
              document.getElementsByClassName("input_val").forEach((vInput) => {
                let e_index_f2 = JSON.parse(e.f2).findIndex(
                    (d) => d == parseFloat(JSON.parse(vInput.id).columnId)
                );
                if (e_index_f2 > -1) {
                  if (this._empty(vInput.value)) {
                  } else {
                    if (typeof parseFloat(vInput.value) == "number") {
                      allVal += parseFloat(vInput.value);
                    } else {
                      allVal += 0;
                    }
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
                this.$forceUpdate();
              });
            }
          });
        }
      });

      this.$forceUpdate();

    },
    async setDocumentColumnValues(data, formulas) {
      this.showData = []
      this.currentItemData = data
      if (data && data.length) {
        data.forEach((e) => {
          if (e.valueString || e.valueBigDecimal) {
            if (e.typeCode === "YEAR") {
              document.getElementsByClassName("custom-datepicker mx-datepicker dynamic-year").forEach((field, idx) => {
                if (JSON.parse(field.id).rowId) {
                  if (
                      parseFloat(JSON.parse(field.id).columnId) === parseFloat(e.columnId) &&
                      parseFloat(JSON.parse(field.id).rowId) === parseFloat(e.rowId)
                  ) {
                    let rowIndex = this.selectedRows.findIndex(el => el.id == JSON.parse(field.id).rowId)
                    let colIndex = this.thirdTrIdData.findIndex(item => item.columnId === e.columnId)
                    this.setValue(e.rowId, e.value, rowIndex, colIndex, e.columnId, 'DATE')
                  }
                }
              })
            } else {
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

              document
                  .getElementsByClassName("input_val").forEach((input) => {
                formulas.forEach((element) => {
                  let index_V = JSON.parse(element.f1).findIndex((e) => e == JSON.parse(input.id).columnId);
                  if (index_V > -1) {
                    this.$set(input, "disabled", true);
                    this.$set(input.style, "border", "none");
                    input.classList.add("no_enter_value");
                    input.style.fontWeight = "bold";
                  }
                });

                if (JSON.parse(input.id).rowId) {
                  if (
                      parseFloat(JSON.parse(input.id).columnId) === parseFloat(e.columnId) &&
                      parseFloat(JSON.parse(input.id).rowId) === parseFloat(e.rowId)
                  ) {
                    this.$set(input, "value", e.value);
                  }
                } else {
                  if (
                      parseFloat(JSON.parse(input.id).columnId) === parseFloat(e.columnId)
                  ) {
                    this.$set(input, "value", e.value);
                  }
                }
              });
            }
          } else if (e.valueDate) {
            document.getElementsByClassName("custom-datepicker mx-datepicker dynamic-datepicker").forEach((field, idx) => {
              if (JSON.parse(field.id).rowId) {
                if (
                    parseFloat(JSON.parse(field.id).columnId) === parseFloat(e.columnId) &&
                    parseFloat(JSON.parse(field.id).rowId) === parseFloat(e.rowId)
                ) {
                  let rowIndex = this.selectedRows.findIndex(el => el.id == JSON.parse(field.id).rowId)
                  let colIndex = this.thirdTrIdData.findIndex(item => item.columnId === e.columnId)
                  this.setValue(e.rowId, e.value, rowIndex, colIndex, e.columnId, 'DATE')
                }
              }
            })
          } else if (e.valueBoolean !== null) {
            document.getElementsByClassName("checkbox_field").forEach((field, idx) => {
              let checkboxInput = field.classList.contains('active') ? field.children[0].children[1].children[0] : field.children[0].children[0].children[0]
              if (checkboxInput.id && JSON.parse(checkboxInput.id) && JSON.parse(checkboxInput.id).rowId) {
                if (
                    parseFloat(JSON.parse(checkboxInput.id).columnId) === parseFloat(e.columnId) &&
                    parseFloat(JSON.parse(checkboxInput.id).rowId) === parseFloat(e.rowId)
                ) {
                  let rowIndex = this.selectedRows.findIndex(el => el.id == JSON.parse(checkboxInput.id).rowId)
                  let colIndex = this.thirdTrIdData.findIndex(item => item.columnId == e.columnId)
                  this.setValue(e.rowId, JSON.parse(e.value), rowIndex, colIndex, e.columnId, 'BOOLEAN')
                }
              }
            })
          } else if (e.selectValueNameUz) {
            document.getElementsByClassName("select_field").forEach((field, idx) => {
              if (JSON.parse(field.id).rowId) {
                if (
                    parseFloat(JSON.parse(field.id).columnId) === parseFloat(e.columnId) &&
                    parseFloat(JSON.parse(field.id).rowId) === parseFloat(e.rowId)
                ) {
                  let rowIndex = this.selectedRows.findIndex(el => el.id == JSON.parse(field.id).rowId)
                  let colIndex = this.thirdTrIdData.findIndex(item => item.columnId == e.columnId)
                  this.setValue(
                      e.rowId,
                      {
                        nameUz: e.selectValueNameUz,
                        nameLt: e.selectValueNameLt,
                        nameRu: e.selectValueNameRu,
                        id: e.selectValueId
                      }, rowIndex, colIndex, e.columnId, 'SELECT', true, true)
                }
              }
            })
          }
        });
      } else {
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
            });
      }
      for (const docTableFormulaTargetId in this.docTableFormulasList) {
        let disabledElements = document.querySelectorAll('input[data-column-id="' + docTableFormulaTargetId + '"]');
        disabledElements.forEach((element) => {
          element.classList.add("no_enter_value");
          element.disabled = true;
        });
      }
    },
    async getById(id, reportId, info) {
      this.clearAll();
      this.tableId = id;
      this.reportId = reportId;
      this.tableInfo = info;
      this.loader = true;
      await Service.reportGetById(reportId).then(({ data }) => {
        this.report = data;
        this.$emit('setReportGenerated', this.report.generated);
      });
      await Service.getByIdTableWithReportId(id, reportId)
        .then(async (rs) => {
          if (rs.data) {
            await this.setColumns(rs.data.columns, rs.data.rows.length);
            this.setRow(rs.data.rows);
            this.table = rs.data.table;
            setTimeout(() => {
              Promise.all([
                this.getDataById(reportId),
                this.getFormulas_2(),
              ]).then(([data, formulas]) => {
                    this.lastReportData = data
                    this.lastReportFormulas = formulas
                    this.setDocumentColumnValues(data, formulas)
                    this.loader = false;
                  });
            },500);
          }
        })
        .catch((e) => {
          this.loader = false;
        });
      await Service.getDocTableFormulasList(id).then(({ data }) => {
        this.docTableFormulasList = {};
        let length = data.length;
        let currentTargetColumnId = null;
        for (let i = 0; i < length; i++) {
          if (this.docTableFormulasList[data[i].targetColumnId] === undefined) {
            currentTargetColumnId = data[i].targetColumnId;
            this.docTableFormulasList[data[i].targetColumnId] = {
              eval: "",
              list: [],
              listenColumns: [],
              targetColumnId: data[i].targetColumnId
            };
          }
          this.docTableFormulasList[data[i].targetColumnId].list.push(data[i]);
          if (data[i].docColumnId) {
            if (data[i].docColumnId && this.docTableFormulasList[data[i].targetColumnId].listenColumns.indexOf(data[i].docColumnId) === -1) {
              this.docTableFormulasList[data[i].targetColumnId].listenColumns.push(data[i].docColumnId)
            }
            if (this.docTableFormulasListenColumnId[data[i].docColumnId] === undefined) {
              this.docTableFormulasListenColumnId[data[i].docColumnId] = [data[i].targetColumnId];
            } else {
              if (this.docTableFormulasListenColumnId[data[i].docColumnId].indexOf(data[i].targetColumnId) === -1) {
                this.docTableFormulasListenColumnId[data[i].docColumnId].push(data[i].targetColumnId);
              }
            }
          }
          if (data[i].type === "ARGUMENTS") {
            this.docTableFormulasList[data[i].targetColumnId].eval += "{" + data[i].docColumnId + "}";
          } else {
            this.docTableFormulasList[data[i].targetColumnId].eval += data[i].code;
          }
        }
      });
    },

    async setColumns(v, rowsCount) {
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
      setTimeout(async () => {
        let firstTrTh = document.getElementsByClassName("firstTrTh");
        let secondTrTh = document.getElementsByClassName("secondTrTh");
        let thirdTrTh = document.getElementsByClassName("thirdTrTh");
        let counter2 = 0,
            counter3 = 0;
        await firstTrTh.forEach(async (th) => {
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
                    refCode: array[2],
                    referenceUrl: array[3],
                    referenceAppendUrl: array[4],
                    referenceCode: array[5],
                    referenceNameUz: array[6],
                    referenceNameLt: array[7],
                    referenceNameRu: array[8],
                    searchPayload: Object.assign({}, this.var_default_search_payload),
                    hasNextPage: false,
                    options: [],
                    rowId: [],
                    value: [],
                  };
                  // GET DYNAMIC REFRENCE OPTIONS
                  if (tmp.typeCode === 'SELECT') {
                    for (let i = 0; i < rowsCount; i++) {
                      tmp.value.push({ selectedItem: null })
                    }
                    crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                        .then(res => {
                          if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                            tmp.options.push(...res.data)
                          } else {
                            tmp.options.push(...res.data.list)
                          }
                          tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                          tmp.searchPayload.page += 1
                          /* if (!this.isModeCreate && this.editingItem.okedId) {
                              let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                              if (!foundItm && this.editingItem.infoOkedDto) {
                                  this.okeds.push(this.editingItem.infoOkedDto)
                              }
                          } */
                        })
                        .catch(e => {
                          console.log(e)
                          // this.okeds = []
                        })
                        .finally(() => {
                          // this.isLoadingOked = false
                        })
                  }
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
                    refCode: array[2],
                    referenceUrl: array[3],
                    referenceAppendUrl: array[4],
                    referenceCode: array[5],
                    referenceNameUz: array[6],
                    referenceNameLt: array[7],
                    referenceNameRu: array[8],
                    searchPayload: Object.assign({}, this.var_default_search_payload),
                    hasNextPage: false,
                    options: [],
                    rowId: [],
                    value: [],
                  };
                  // GET DYNAMIC REFRENCE OPTIONS
                  if (tmp.typeCode === 'SELECT') {
                    for (let i = 0; i < rowsCount; i++) {
                      tmp.value.push({ selectedItem: null })
                    }
                    crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                        .then(res => {
                          if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                            tmp.options.push(...res.data)
                          } else {
                            tmp.options.push(...res.data.list)
                          }
                          tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                          tmp.searchPayload.page += 1
                          /* if (!this.isModeCreate && this.editingItem.okedId) {
                              let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                              if (!foundItm && this.editingItem.infoOkedDto) {
                                  this.okeds.push(this.editingItem.infoOkedDto)
                              }
                          } */
                        })
                        .catch(e => {
                          console.log(e)
                          // this.okeds = []
                        })
                        .finally(() => {
                          // this.isLoadingOked = false
                        })
                  }
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
                        refCode: array[2],
                        referenceUrl: array[3],
                        referenceAppendUrl: array[4],
                        referenceCode: array[5],
                        referenceNameUz: array[6],
                        referenceNameLt: array[7],
                        referenceNameRu: array[8],
                        searchPayload: Object.assign({}, this.var_default_search_payload),
                        hasNextPage: false,
                        options: [],
                        rowId: [],
                        value: [],
                      };
                      // GET DYNAMIC REFRENCE OPTIONS
                      if (tmp.typeCode === 'SELECT') {
                        for (let i = 0; i < rowsCount; i++) {
                          tmp.value.push({ selectedItem: null })
                        }
                        crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                            .then(res => {
                              if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                                tmp.options.push(...res.data)
                              } else {
                                tmp.options.push(...res.data.list)
                              }
                              tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                              tmp.searchPayload.page += 1
                              /* if (!this.isModeCreate && this.editingItem.okedId) {
                                  let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                                  if (!foundItm && this.editingItem.infoOkedDto) {
                                      this.okeds.push(this.editingItem.infoOkedDto)
                                  }
                              } */
                            })
                            .catch(e => {
                              console.log(e)
                              // this.okeds = []
                            })
                            .finally(() => {
                              // this.isLoadingOked = false
                            })
                      }
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
                refCode: array[2],
                referenceUrl: array[3],
                referenceAppendUrl: array[4],
                referenceCode: array[5],
                referenceNameUz: array[6],
                referenceNameLt: array[7],
                referenceNameRu: array[8],
                searchPayload: Object.assign({}, this.var_default_search_payload),
                hasNextPage: false,
                options: [],
                rowId: [],
                value: [],
              };
              // GET DYNAMIC REFRENCE OPTIONS
              if (tmp.typeCode === 'SELECT') {
                for (let i = 0; i < rowsCount; i++) {
                  tmp.value.push({ selectedItem: null })
                }
                crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                    .then(res => {
                      if (["DepartmentForDocument", "Department"].includes(tmp.refCode)) {
                        tmp.options.push(...res.data)
                      } else {
                        tmp.options.push(...res.data.list)
                      }
                      tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                      tmp.searchPayload.page += 1
                      /* if (!this.isModeCreate && this.editingItem.okedId) {
                          let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                          if (!foundItm && this.editingItem.infoOkedDto) {
                              this.okeds.push(this.editingItem.infoOkedDto)
                          }
                      } */
                    })
                    .catch(e => {
                      console.log(e)
                      // this.okeds = []
                    })
                    .finally(() => {
                      // this.isLoadingOked = false
                    })
              }
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
                      refCode: array[2],
                      referenceUrl: array[3],
                      referenceAppendUrl: array[4],
                      referenceCode: array[5],
                      referenceNameUz: array[6],
                      referenceNameLt: array[7],
                      referenceNameRu: array[8],
                      searchPayload: Object.assign({}, this.var_default_search_payload),
                      hasNextPage: false,
                      options: [],
                      rowId: [],
                      value: [],
                    };
                    // GET DYNAMIC REFRENCE OPTIONS
                    if (tmp.typeCode === 'SELECT') {
                      for (let i = 0; i < rowsCount; i++) {
                        tmp.value.push({ selectedItem: null })
                      }
                      crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                          .then(res => {
                            if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                              tmp.options.push(...res.data)
                            } else {
                              tmp.options.push(...res.data.list)
                            }
                            tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                            tmp.searchPayload.page += 1
                            /* if (!this.isModeCreate && this.editingItem.okedId) {
                                let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                                if (!foundItm && this.editingItem.infoOkedDto) {
                                    this.okeds.push(this.editingItem.infoOkedDto)
                                }
                            } */
                          })
                          .catch(e => {
                            console.log(e)
                            // this.okeds = []
                          })
                          .finally(() => {
                            // this.isLoadingOked = false
                          })
                    }
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
                      refCode: array[2],
                      referenceUrl: array[3],
                      referenceAppendUrl: array[4],
                      referenceCode: array[5],
                      referenceNameUz: array[6],
                      referenceNameLt: array[7],
                      referenceNameRu: array[8],
                      searchPayload: Object.assign({}, this.var_default_search_payload),
                      hasNextPage: false,
                      options: [],
                      rowId: [],
                      value: [],
                    };
                    // GET DYNAMIC REFRENCE OPTIONS
                    if (tmp.typeCode === 'SELECT') {
                      for (let i = 0; i < rowsCount; i++) {
                        tmp.value.push({ selectedItem: null })
                      }
                      crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                          .then(res => {
                            if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                              tmp.options.push(...res.data)
                            } else {
                              tmp.options.push(...res.data.list)
                            }
                            tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                            tmp.searchPayload.page += 1
                            /* if (!this.isModeCreate && this.editingItem.okedId) {
                                let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                                if (!foundItm && this.editingItem.infoOkedDto) {
                                    this.okeds.push(this.editingItem.infoOkedDto)
                                }
                            } */
                          })
                          .catch(e => {
                            console.log(e)
                            // this.okeds = []
                          })
                          .finally(() => {
                            // this.isLoadingOked = false
                          })
                    }
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
                          refCode: array[2],
                          referenceUrl: array[3],
                          referenceAppendUrl: array[4],
                          referenceCode: array[5],
                          referenceNameUz: array[6],
                          referenceNameLt: array[7],
                          referenceNameRu: array[8],
                          searchPayload: Object.assign({}, this.var_default_search_payload),
                          hasNextPage: false,
                          options: [],
                          rowId: [],
                          value: [],
                        };
                        // GET DYNAMIC REFRENCE OPTIONS
                        if (tmp.typeCode === 'SELECT') {
                          for (let i = 0; i < rowsCount; i++) {
                            tmp.value.push({ selectedItem: null })
                          }
                          crudAndListsService.searchListWithKeyword(tmp.referenceUrl, tmp.searchPayload, tmp.referenceAppendUrl)
                              .then(res => {
                                if (['DepartmentForDocument', 'Department'].includes(i.refCode)) {
                                  tmp.options.push(...res.data)
                                } else {
                                  tmp.options.push(...res.data.list)
                                }
                                tmp.hasNextPage = res.data.total / tmp.searchPayload.itemsPerPage > tmp.searchPayload.page
                                tmp.searchPayload.page += 1
                                /* if (!this.isModeCreate && this.editingItem.okedId) {
                                    let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                                    if (!foundItm && this.editingItem.infoOkedDto) {
                                        this.okeds.push(this.editingItem.infoOkedDto)
                                    }
                                } */
                              })
                              .catch(e => {
                                console.log(e)
                                // this.okeds = []
                              })
                              .finally(() => {
                                // this.isLoadingOked = false
                              })
                        }
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
      this.lastReportDataRows = JSON.parse(JSON.stringify(v));
      if (this.selectedRows.length == 0 && !this.isGenerated) {
        this.selectedRows = [{ id: this.getRandomInt() }];
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
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    calculateDocFormulas(rowId, value, rowIndex, columnIndex, columnId, typeCode) {
      // rowIndex is `selectedRows` index

      if (this.docTableFormulasListenColumnId[columnId] === undefined) {
        return false;
      }
      let targets = this.docTableFormulasListenColumnId[columnId];
      for (const targetIndex in targets) {
        const docTableFormula = this.docTableFormulasList[targets[targetIndex]];
        let evalString = docTableFormula.eval;
        for (const listenColumn of docTableFormula.listenColumns) {
          let thirdIndex = this.trColumnIdOnDocColumnIdMap[listenColumn];
          let val = parseFloat(this.thirdTrIdData[thirdIndex]?.value[rowIndex]?.value ?? 0);
          if (!val) {
            this.report
          }
          val = isNaN(val) ? 0 : val;
          evalString = evalString.replace("{" + listenColumn + "}", val);
        }
        let val = eval(evalString);

        // todo optimize qilish kerak. v-model bilan qilish kerak
        this.$set(document.getElementById(JSON.stringify({
          "rowId": rowId,
          "columnId": docTableFormula.targetColumnId.toString()
        })), "value", val);

        this.setValue(rowId, val, rowIndex, this.trColumnIdOnDocColumnIdMap[docTableFormula.targetColumnId], docTableFormula.targetColumnId, typeCode);
      }
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    selectCustomLabel({ nameUz, nameLt, nameRu, name, fullName }) {
      if (nameUz) {
        return this.getName({ nameUz: nameUz, nameLt: nameLt, nameRu: nameRu });
      }
      if (fullName) {
        return fullName;
      }
      return name;
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
              {{ getName({ nameLt: table.nameLt, nameUz: table.nameUz, nameRu: table.nameRu }) }}

            </strong>
          </h5>
          <p class="text-center m-0">
            {{ getName({ nameLt: table.titleLt, nameUz: table.titleUz, nameRu: table.titleRu }) }}

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
              </strong><br>
              <span>
                {{
                  report.reportDate
                }}
              </span>
            </div>
            <div>
              <strong>
                {{
                  getName({
                    nameLt: table.conditionLt,
                    nameRu: table.conditionRu,
                    nameUz: table.conditionUz,
                  })
                }}
              </strong>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1" style="min-height: 60vh; overflow: auto;">
              <div class="pb-5">
                <table class="table thead-table table-centered table-custom-bordered">
                  <thead>
                  <tr class="tr-text-center">
                    <th
                        :id="[el.id, el.typeCode, el.refCode, el.referenceUrl, el.referenceAppendUrl, el.referenceCode, el.referenceNameUz, el.referenceNameLt, el.referenceNameRu]"
                        :class="rowspanFirstClass(el, index)"
                        class="firstTrTh"
                        style="min-width: 70px"
                        :rowspan="rowspanFirst(el)"
                        :colspan="colspanFirst(el)"
                        v-for="(el, index) in firstColumns"
                        :key="index + 'first'"
                    >
                      <div style=" max-height: 200px; display: inline-block; " >
                        <div :class=" (el.isVertical == 1 ) ? 'rotate_text' : ''">
                          {{ getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu }) }}
                        </div>
                      </div>
                    </th>
                    <th
                        v-show="tableInfo.hasDynamicRows &&  !tableInfo.isGenerated && !loader"
                        :rowspan="thirdColumns.length > 0 ? 3 : secondColumns.length > 0 ? 2 : 1"
                    >
                      <div style="max-height: 200px; display: inline-block;">
                        <div>
                          {{ $t('column.actions') }}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr class="tr-text-center">
                    <th
                        style="min-width: 70px"
                        :id="[el.id, el.typeCode, el.refCode, el.referenceUrl, el.referenceAppendUrl, el.referenceCode, el.referenceNameUz, el.referenceNameLt, el.referenceNameRu]"
                        :class="rowspanSecondClass(el)"
                        class="secondTrTh"
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
                          cursor: pointer;"
                      >
                        <div

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
                        style="min-width: 70px"
                        :id="[el.id, el.typeCode, el.refCode, el.referenceUrl, el.referenceAppendUrl, el.referenceCode, el.referenceNameUz, el.referenceNameLt, el.referenceNameRu]"
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
                        v-for="(item, index) of (tableInfo.hasDynamicRows &&  !tableInfo.isGenerated) ? thirdTrIdData.length  + 1 :  thirdTrIdData.length "
                        :key="index + 'I-1'"
                    >
                      <strong v-if="selectedRows.length > 1">
                        {{
                          selectedRows.length > 1 && index == 0 ? "" : index
                        }}
                      </strong
                      >

                      <strong v-else>
                        {{ index + 1 }}
                      </strong>
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="isGenerated && !selectedRows.length && !loader">
                    <td class="text-center" colspan="4000">
                      <h5 class="m-3 p-0">
                        {{ $t('messages.data_not_found') }}
                      </h5>
                    </td>
                  </tr>
                  <tr v-for="(data, index1) in selectedRows" :key="index1 + 'MM'">
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
                          selectedRows.length > 1 &&
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
                      <p class="m-0 p-2" v-if="i.typeCode === 'SEQUENCE'">
                        {{ index1 + 1 }}
                      </p>
                      <div
                          v-else-if="i.typeCode === 'SELECT' && thirdTrIdData[index].value[index1] && thirdTrIdData[index].value[index1].notEditable"
                          :v-b-tooltip="tableInfo.isGenerated ? '' :{ variant: 'info' }"
                          class="cursor-pointer"
                          @click="tableInfo.isGenerated ? '' : editValue(index1, index)"
                          :title="tableInfo.isGenerated ? '' :  $t('actions.click_to_edit')"
                      >
                        {{
                          getName({
                            nameUz: thirdTrIdData[index].value[index1].selectValueNameUz,
                            nameLt: thirdTrIdData[index].value[index1].selectValueNameLt,
                            nameRu: thirdTrIdData[index].value[index1].selectValueNameRu
                          })
                        }}
                      </div>
                      <!-- FOR SELECT -->
                      <div v-else-if="i.typeCode === 'SELECT'" style="min-width: 300px;">
                        <BaseTreeselectWithValidation
                            not-required
                            ref="parentDepVeeName"
                            name="parentDepVeeName"
                            class="select_field"
                            v-if="thirdTrIdData[index].value[index1] && ['DepartmentForDocument', 'Department'].includes(i.refCode)"
                            v-model="thirdTrIdData[index].value[index1].selectedItem"
                            form-label="__none"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId})"
                            :options="i.options"
                            :show-count="true"
                            :normalizer="normalizer"
                            :placeholder="$t('column.parent_department')"
                            :custom-label="selectCustomLabel"
                            :default-expand-level="1"
                            @select="setValue(data.id,$event,index1,index,i.columnId,i.typeCode,i.notEditable)"
                            @search-change="debounceSearchDynamicRefs"
                        >
                          <div slot="value-label">-{{ thirdTrIdData[index].value[index1].selectValueNameUz }}</div>
                        </BaseTreeselectWithValidation>
                        <BaseTreeselectWithValidation
                            not-required
                            ref="parentDepVeeName"
                            name="parentDepVeeName"
                            class="select_field"
                            v-if="!thirdTrIdData[index].value[index1] && ['DepartmentForDocument', 'Department'].includes(i.refCode)"
                            v-model="thirdTrIdData[index].value[index1]"
                            form-label="__none"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId})"
                            :options="i.options"
                            :show-count="true"
                            :normalizer="normalizer"
                            :placeholder="$t('column.parent_department')"
                            :default-expand-level="1"
                            :custom-label="({nameUz, nameLt, nameRu, name})  => nameUz ? getName({nameUz: nameUz, nameLt: nameLt, nameRu: nameRu}) : name"
                            @select="setValue(data.id,$event,index1,index,i.columnId,i.typeCode,i.notEditable)"
                            @search-change="debounceSearchDynamicRefs"
                        >
                        </BaseTreeselectWithValidation>
                        <BaseMultiselectWithValidation
                            v-if="thirdTrIdData[index].value[index1] && !['DepartmentForDocument', 'Department'].includes(i.refCode)"
                            not-required
                            only-form-element
                            v-model="thirdTrIdData[index].value[index1].selectedItem"
                            class="select_field"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId})"
                            :custom-label="selectCustomLabel"
                            label="name"
                            @select="setValue(data.id,$event,index1,index,i.columnId,i.typeCode,i.notEditable)"
                            :options="i.options"
                            :placeholder="getName({nameUz: i.referenceNameUz, nameLt: i.referenceNameLt, nameRu: i.referenceNameRu})"
                            open-direction="bottom"
                            :max-height="600"
                            :show-labels="false"
                            :has-next-page="i.hasNextPage"
                            @reachedEndOfList="dynamicRefsReachedEndOfList"
                            @search-change="debounceSearchDynamicRefs"
                            :searchable="true"
                            preserve-search
                            :clear-on-select="false"
                            :loading="i.isLoading"
                            :internal-search="false"
                            :with-create-addition="(thirdTrIdData[index].value[index1] && thirdTrIdData[index].value[index1].originalSelectValueNameUz) ? true : false"
                        >
                          <template v-slot:append-slot>
                            <b-btn
                                v-if="thirdTrIdData[index].value[index1] && thirdTrIdData[index].value[index1].originalSelectValueNameUz"
                                variant="link"
                                class="text-decoration-none p-0 text-danger"
                                style="font-size: 1.2rem;"
                            >
                              <i
                                  @click="resetValue(index1, index)"
                                  class="mdi mdi-refresh"
                              ></i>
                            </b-btn>
                          </template>
                        </BaseMultiselectWithValidation>
                        <BaseMultiselectWithValidation
                            v-else-if="!thirdTrIdData[index].value[index1] && !['DepartmentForDocument', 'Department'].includes(i.refCode)"
                            not-required
                            only-form-element
                            class="select_field"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId})"
                            v-model="thirdTrIdData[index].value[index1]"
                            :custom-label="selectCustomLabel"
                            label="name"
                            @select="setValue(data.id,$event,index1,index,i.columnId,i.typeCode,i.notEditable)"
                            :options="i.options"
                            :placeholder="getName({nameUz: i.referenceNameUz, nameLt: i.referenceNameLt, nameRu: i.referenceNameRu})"
                            open-direction="bottom"
                            :max-height="600"
                            :show-labels="false"
                            :has-next-page="i.hasNextPage"
                            @reachedEndOfList="dynamicRefsReachedEndOfList"
                            @search-change="debounceSearchDynamicRefs"
                            :searchable="true"
                            preserve-search
                            :clear-on-select="false"
                            :loading="i.isLoading"
                            :internal-search="false"
                        />
                      </div>
                      <!-- FOR DATE -->
                      <BaseDatePickerWithValidation
                          v-else-if="i.typeCode === 'DATE' && thirdTrIdData[index].value[index1]"
                          not-required
                          only-form-element
                          custom-styles="min-width: 140px;"
                          placeholder=""
                          v-model="thirdTrIdData[index].value[index1].value"
                          class="datepicker_field"
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          @input="(e) => setValue( data.id, e, index1, index, i.columnId, i.typeCode ) "
                          lang="ru"
                      />
                      <BaseDatePickerWithValidation
                          v-else-if="i.typeCode === 'DATE'"
                          not-required
                          only-form-element
                          custom-styles="min-width: 140px;"
                          class="datepicker_field"
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          placeholder=""
                          @input="(e) =>setValue(data.id,e,index1,index,i.columnId,i.typeCode)"
                          lang="ru"
                      />

                      <!-- FOR YEAR -->
                      <BaseDatePickerWithValidation
                          v-else-if="i.typeCode === 'YEAR' && thirdTrIdData[index].value[index1]"
                          not-required
                          only-form-element
                          custom-styles="min-width: 140px;"
                          placeholder=""
                          v-model="thirdTrIdData[index].value[index1].value"
                          class="datepicker_field dynamic-year"
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          @input="(e) => setValue( data.id, e, index1, index, i.columnId, i.typeCode ) "
                          type="year"
                          format="YYYY"
                      />
                      <BaseDatePickerWithValidation
                          v-else-if="i.typeCode === 'YEAR'"
                          not-required
                          only-form-element
                          custom-styles="min-width: 140px;"
                          class="datepicker_field dynamic-year"
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          placeholder=""
                          @input="(e) =>setValue(data.id,e,index1,index,i.columnId,i.typeCode)"
                          type="year"
                          format="YYYY"
                      />

                      <!-- FOR STRING -->
                      <div v-else-if="i.typeCode === 'STRING'" style="min-width: 300px;">
                        <b-form-input
                            @keydown=" (evt) => keydownEvt( evt, data.id, evt.target.value, index1, index, i.columnId, i.typeCode ) "
                            @keyup="(event) => calculateDocFormulas(data.id, event.target.value, index1, index, i.columnId, i.typeCode)"
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
                            @focus=" (e) => focusVal( data.id, e, index1, index, i.columnId, i.typeCode ) "
                            :style=" report.status && report.status !== 'CREATED' ? 'border: none !important' : ''"
                            :disabled="report.status && report.status !== 'CREATED'"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                            @input="(e) => setValue( data.id, e, index1, index, i.columnId, i.typeCode)"
                            class="text-center input_val p-0"
                        >
                        </b-form-input>
                      </div>
                      <!-- FOR BOOLEAN -->
                      <Checkbox
                          v-else-if="i.typeCode === 'BOOLEAN' && thirdTrIdData[index].value[index1]"
                          v-model="thirdTrIdData[index].value[index1].value"
                          :font-size="0"
                          :disabled="
                            report.status && report.status !== 'CREATED'
                          "
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          class="justify-content-center checkbox_field"
                          @change="(e) =>setValue(data.id,e,index1,index,i.columnId,i.typeCode)"
                      />
                      <Checkbox
                          v-else-if="i.typeCode === 'BOOLEAN'"
                          :font-size="0"
                          :disabled="
                            report.status && report.status !== 'CREATED'
                          "
                          :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                          class="justify-content-center checkbox_field"
                          @change="(e) =>setValue(data.id,e,index1,index,i.columnId,i.typeCode)"
                      />
                      <!-- FOR INTEGER -->
                      <div v-else>
                        <b-form-input
                            @keydown="(evt) => keydownEvt(evt,data.id,evt.target.value,index1,index,i.columnId,i.typeCode) "
                            @keyup="(event) => calculateDocFormulas(data.id, event.target.value, index1, index, i.columnId, i.typeCode)"
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
                            :data-column-id="i.columnId"
                            @focus="(e) => focusVal(data.id, e, index1, index, i.columnId, i.typeCode)"
                            :style="report.status && report.status !== 'CREATED' ? 'border: none !important' : ''"
                            :disabled="report.status && report.status !== 'CREATED'"
                            :id="JSON.stringify({rowId: data.id,columnId: i.columnId,})"
                            @input="(e) => setValue(data.id, e, index1, index, i.columnId, i.typeCode)"
                            type="number"
                            class="text-center input_val p-0"
                        >
                        </b-form-input>
                      </div>
                    </td>
                    <td style="width: 30px" v-show="tableInfo.hasDynamicRows &&  !tableInfo.isGenerated">
                      <div style="display: block; text-align: center" class="mt-1">
                        <i v-if="selectedRows.length > 1" @click="deleteRow(index1, data)" style="color: red"
                           class="mdi mdi-trash-can delete grow "></i>
                        <i v-if="selectedRows.length-1 === index1" @click="addNewRow" style="color: #0059ff"
                           class="mdi mdi-plus-circle grow "> </i>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr class="mt-5" v-show="showResult"
                  >
                    <td v-for="(i, index) in thirdTrIdData"
                        :key="index + 'td'"
                        class="text-center p"
                    >
                      <p v-if="index === 0">Jami</p>
                      <div v-else-if="i.typeCode === 'BIGDECIMAL'">
                        {{ getColumnData(i) }}
                      </div>
                      <div v-else>---</div>
                    </td>
                    <td></td>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <div v-show="tableInfo.hasDynamicRows &&  !tableInfo.isGenerated">
                <!-- <b-button variant="primary" class="mr-1" @click="showResult = !showResult ">
                  {{ $t( 'submodules.reports.report_result_see' ) }}
                </b-button> -->
                <b-button closed variant="warning" class="ml-1" @click="closeReport">
                  {{ $t('submodules.reports.stop_forming_report') }}
                </b-button>
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

th {
  /* &#SELECT {
    width: 20%;
  } */
  &[id*="SELECT"] {
    width: 150px;
  }
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

.vue-treeselect__list-item {
  padding-left: 15px !important;
}

.vue-treeselect__list-item.vue-treeselect__indent-level-0 {
  padding-left: 0px !important;
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

.grow {
  font-size: 1.3em;
  cursor: pointer;
}

.grow:hover,
.grow:focus,
.grow:active {
  transition: all .2s ease-in-out;
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
</style>
