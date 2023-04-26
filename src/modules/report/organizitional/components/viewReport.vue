<script>
import Service from "@/modules/report/reportService";
// import { getName } from "@/helper";

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

      table: {},
    };
  },

  methods: {
    getDataById(id) {
      return new Promise( (res, rej) => {
        Service.getReportById( id )
            .then( ({data}) => {
              res( data );
            } )
            .catch( (e) => rej( e ) );
      } );
    },
    setValue(rowId, value, rowIndex, index, id, typeCode) {

      this.thirdTrIdData[index].value[rowIndex] = {
        rowId: rowId ? rowId : null,
        value: value,
        typeCode: typeCode,
        columnId: id,
      };
      this.$forceUpdate();
    },
    getById(id, reportId) {
      this.loader = true;
      Service.getByIdTable( id )
          .then( (rs) => {
            if (rs.data) {
              this.setColumns( rs.data.columns );
              this.setRow( rs.data.rows );
              this.table = rs.data.table;
              setTimeout( () => {
                this.getDataById( reportId ).then( (data) => {
                  data.forEach( (e) => {

                    document
                        .getElementsByClassName( "input_val" )
                        .forEach( (input) => {
                          if (JSON.parse( input.id ).rowId) {
                            if (
                                parseFloat( JSON.parse( input.id ).columnId ) ==
                                parseFloat( e.columnId ) &&
                                parseFloat( JSON.parse( input.id ).rowId ) ==
                                parseFloat( e.rowId )
                            ) {
                              if (e.typeCode == "SELECT"){

                                this.$set( input, "innerText", `${this.getName( {
                                  nameRu: e.selectValueNameRu,
                                  nameLt: e.selectValueNameLt,
                                  nameUz: e.selectValueNameUz,
                                } )}`);
                              }else{
                                this.$set( input, "innerText", e.value );
                              }
                            }
                          } else {
                            if (
                                parseFloat( JSON.parse( input.id ).columnId ) ==
                                parseFloat( e.columnId )
                            ) {
                              if (e.typeCode == "SELECT"){

                                this.$set( input, "innerText", `${this.getName( {
                                  nameRu: e.selectValueNameRu,
                                  nameLt: e.selectValueNameLt,
                                  nameUz: e.selectValueNameUz,
                                } )}`);
                              }else{
                                this.$set( input, "innerText", e.value );
                              }
                            }
                          }
                        } );
                  } );
                  this.loader = false;
                } );
              }, 500 );
            }
          } )
          .catch( (e) => {
            this.loader = false;
            // this.catchErr( e );
          } );
    },
    setColumns(v) {
      this.selectedColumns = v;
      this.firstColumns = [];
      this.secondColumns = [];
      this.thirdColumns = [];
      v.forEach( (el1) => {
        this.firstColumns.push( el1 );
        el1.children.forEach( (el2) => {
          this.secondColumns.push( el2 );
          el2.children.forEach( (el3) => {
            this.thirdColumns.push( {...el3, fId: el1.id} );
          } );
        } );
      } );

      setTimeout( () => {
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
        let firstTrTh = document.getElementsByClassName( "firstTrTh" );
        let secondTrTh = document.getElementsByClassName( "secondTrTh" );
        let thirdTrTh = document.getElementsByClassName( "thirdTrTh" );
        let counter2 = 0,
            counter3 = 0;
        firstTrTh.forEach( (th) => {
          if (th.colSpan > 1) {
            for (let index2 = 0; index2 < th.colSpan; index2++) {
              if (secondTrTh[counter2] && secondTrTh[counter2].colSpan > 1) {
                for (
                    let index3 = 0;
                    index3 < secondTrTh[counter2].colSpan;
                    index3++
                ) {
                  let array = thirdTrTh[counter3].id.split( "," );
                  let tmp = {
                    columnId: array[0],
                    typeCode: array[1],
                    rowId: [],
                    value: [],
                  };

                  this.thirdTrIdData.push( tmp );
                  counter3++;
                }
                counter2++;
              } else {
                if (
                    secondTrTh[counter2] &&
                    secondTrTh[counter2].classList.contains( "thirdTrId" )
                ) {
                  let array = secondTrTh[counter2].id.split( "," );
                  let tmp = {
                    columnId: array[0],
                    typeCode: array[1],
                    rowId: [],
                    value: [],
                  };

                  this.thirdTrIdData.push( tmp );
                  counter2++;
                } else {
                  if (secondTrTh[counter2]) {
                    for (
                        let index3 = 0;
                        index3 < secondTrTh[counter2].colSpan;
                        index3++
                    ) {
                      let array = thirdTrTh[counter3].id.split( "," );
                      let tmp = {
                        columnId: array[0],
                        typeCode: array[1],
                        rowId: [],
                        value: [],
                      };

                      this.thirdTrIdData.push( tmp );
                      counter3++;
                    }

                    counter2++;
                  }
                }
              }
            }
          } else {
            if (th.classList.contains( "thirdTrId" )) {
              let array = th.id.split( "," );
              let tmp = {
                columnId: array[0],
                typeCode: array[1],
                rowId: [],
                value: [],
              };

              this.thirdTrIdData.push( tmp );
            } else {
              for (let index2 = 0; index2 < th.colSpan; index2++) {
                if (secondTrTh[counter2].colSpan > 1) {
                  for (
                      let index3 = 0;
                      index3 < secondTrTh[counter2].colSpan;
                      index3++
                  ) {
                    let array = thirdTrTh[counter3].id.split( "," );
                    let tmp = {
                      columnId: array[0],
                      typeCode: array[1],
                      rowId: [],
                      value: [],
                    };
                    this.thirdTrIdData.push( tmp );
                    counter3++;
                  }
                  counter2++;
                } else {
                  if (
                      secondTrTh[counter2] &&
                      secondTrTh[counter2].classList.contains( "thirdTrId" )
                  ) {
                    let array = secondTrTh[counter2].id.split( "," );
                    let tmp = {
                      columnId: array[0],
                      typeCode: array[1],
                      rowId: [],
                      value: [],
                    };

                    this.thirdTrIdData.push( tmp );
                    counter2++;
                  } else {
                    if (secondTrTh[counter2]) {
                      for (
                          let index3 = 0;
                          index3 < secondTrTh[counter2].colSpan;
                          index3++
                      ) {
                        let array = thirdTrTh[counter3].id.split( "," );
                        let tmp = {
                          columnId: array[0],
                          typeCode: array[1],
                          rowId: [],
                          value: [],
                        };
                        this.thirdTrIdData.push( tmp );
                        counter3++;
                      }
                      counter2++;
                    }
                  }
                }
              }
            }
          }
        } );
      }, 300 );
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
      let found = this.thirdColumns.filter( (i) => i.fId === el.id );
      let totalNotChild = el.children.filter( (d) => d.children.length == 0 );
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
                        style="width: 3%"
                        :id="[el.id, el.typeCode]"
                        :class="rowspanFirstClass(el)"
                        class="firstTrTh"
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
                              getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu })
                            "
                            :class="
                              el.children.length > 0 || index == 0
                                ? ''
                                : 'rotate_text'
                            "
                        >
                          {{
                            getName( {nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu} )
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
                              getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu })
                            "
                            :class="el.children.length > 0 ? '' : 'rotate_text'"
                        >
                          {{
                            getName( {nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu} )
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
                              getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu })
                            "
                            :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                        >
                          {{
                            getName( {nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu} )
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
                      <strong v-if="selectedRows.length > 1">{{
                          selectedRows.length > 1 && index == 0 ? "" : index
                        }}</strong>

                      <strong v-else>{{ index + 1 }}</strong>
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
                        v-for="(i, index) in thirdTrIdData"
                        :key="index + 'td'"
                        class="text-center p"
                    >

                      <p
                          class="m-0 p-2" v-if="i.typeCode == 'SEQUENCE'">
                        {{ index1 + 1 }}
                      </p>

                      <!-- FOR INTEGER -->

                      <div v-else>
                        <b-form-input
                            :disabled="true"
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
                            style="min-width: 60px; border: none !important"
                            class="text-center input_val input-no-padding"
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

.input-no-padding {
  padding: 0px !important;
  min-width: auto !important;
}
</style>
