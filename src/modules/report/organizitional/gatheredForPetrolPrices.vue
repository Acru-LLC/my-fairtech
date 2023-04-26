<script>
import XLSX from "xlsx";
import helperService from '@/shared/services/helper.service';

export default {
  data() {
    return {
      regionId: null,
      regions: [],
      filterPayload: {
        fromDate: null,
        toDate: null
      },
      loaderPrint: false,
      loaderExcel: false,
      loader: false,
      loaderTable: false,
      allPetfolItems: [],
      datesDifference: null,
      fromToDate: [],
    };
  },
  /*
  COMPUTED */
  created() {
    helperService.fetchRegions()
        .then(res => {
          this.regions = res.data
        })
        .catch(e => {
          console.log(e)
        })
  },
  computed: {
  },
  methods: {
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    // getDaysArray(start, end) {
    //   for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    //     arr.push(new Date(dt));
    //   }
    //   return arr;
    // },
    search() {
      this.loader = true

      if (this.filterPayload.fromDate) {
        let fromDateOjb = this.filterPayload.fromDate.split('-')
        var from = new Date(parseInt(fromDateOjb[2]), parseInt(fromDateOjb[1]) - 1, parseInt(fromDateOjb[0]));
      }
      if (this.filterPayload.toDate) {
        let toDateOjb = this.filterPayload.toDate.split('-')
        var to = new Date(parseInt(toDateOjb[2]), parseInt(toDateOjb[1]) - 1, parseInt(toDateOjb[0]));
      }

      if (to && from) {
        this.datesDifference = new Date(to.getTime() - from.getTime());
        this.datesDifference = this.datesDifference.getUTCDate()
        this.fromToDate = []
        // loop for every day
        const pad = v => v.padStart(2, `0`);
        for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
          this.fromToDate.push(day.toLocaleDateString("nl-NL")
              .split(/[-/]/).map(pad).join("-"))
        }
      }

      // let dates = this.getDaysArray(this.filterPayload.fromDate, this.filterPayload.toDate)
      helperService.petrolPricesByDate(this.filterPayload.fromDate, this.filterPayload.toDate, this.regionId)
          .then(res => {
            this.allPetfolItems = res.data

            setTimeout(() => {
              this.loader = false
            }, 1000)
          })
          .catch(e => console.log(e))
          .finally(() => {
            this.loader = false
          })
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
  },
};
</script>

<template>
  <div id="printId">
    <div class="bg-white pt-3 pl-3 pr-3">
      <div class="row align-items-end">
        <!-- FILTER START -->
        <b-col cols="3">
          <BaseDatePickerWithValidation
              rules="required"
              class="required"
              :disabled-date="true"
              :disable-after="true"
              label-on-top
              hide-error-msg
              :label="$t('column.from')"
              v-model="filterPayload.fromDate"
              :placeholder="''"
              lang="ru"
          ></BaseDatePickerWithValidation>
        </b-col>
        <b-col cols="3">
          <BaseDatePickerWithValidation
              rules="required"
              class="required"
              :disabled-date="true"
              :disable-after="true"
              label-on-top
              hide-error-msg
              :label="$t('column.to')"
              v-model="filterPayload.toDate"
              :placeholder="''"
              lang="ru"
          ></BaseDatePickerWithValidation>
        </b-col>
        <b-col cols="3">
          <BaseMultiselectWithValidation
              :disabled="!filterPayload.fromDate && !filterPayload.fromDate"
              not-required
              multiple
              v-model="regionId"
              :options="regions.map(e => e.id)"
              :hide-selected="true"
              :close-on-select="false"
              label-on-top
              :custom-label="customLabelRegion"
              :placeholder="$t('column.region')"
              open-direction="bottom"
              style="width: 100%;"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
        <b-col cols="1">
          <b-btn
              variant="outline-primary"
              @click="search"
          >
            {{ $t('actions.search') }}
          </b-btn>
        </b-col>
        <b-col>
          <div class="float-right">
            <b-button-group
                id="none-dsp"
            >
              <b-button
                  @click="excelExport"
                  variant="success"
              >
                <b-overlay
                    :show="loaderExcel"
                    opacity="0.1"
                    rounded="sm"
                >
                  {{ $t("actions.excel") }}
                </b-overlay>
              </b-button>
              <b-button
                  :disabled="loaderPrint"
                  @click="print"
                  variant="primary"
              >
                <b-overlay
                    :show="loaderPrint"
                    opacity="0.1"
                    rounded="sm"
                >
                  {{ $t("actions.print") }}
                </b-overlay>
              </b-button>
            </b-button-group>
          </div>
        </b-col>
        <!-- FILTER END -->

        <div class="col-lg-12 pt-3">
          <h5 class="text-center mb-1">
            <strong>
              {{ $t('submodules.reports.gathered_petrol_prices_region') }}
            </strong>
          </h5>
          <p class="text-center mb-1">
            <b>
              {{ $t('column.general_info') }}
            </b>
          </p>
          <p class="text-center mb-0" v-if="filterPayload.fromDate && filterPayload.toDate">
            ( {{ filterPayload.fromDate }} - {{ filterPayload.toDate }}
            {{ $t('submodules.reports.interval_condition') }})
          </p>
        </div>
        <div class="col-lg-12">
          <div class="text-sm-end pr-3">
            <div>
              <strong> {{ $t('submodules.reports.sum_litr') }}
              </strong>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay
              :opacity="0.1"
              :show="loader"
              rounded="sm"
          >
            <div
                class="bg-white pt-1"
                style="min-height: 60vh"
            >
              <div
                  id="over"
                  style="overflow: auto; max-height: 75vh;"
                  class="pb-1"
              >
                <table
                    id="reportTableId"
                    class="
                    table table-centered table-custom-bordered
                  "
                >
                  <thead>
                  <tr class="tr-text-center">
                    <th rowspan="2"></th>
                    <th
                        rowspan="2"
                        style="min-width: 200px;"
                    > {{ $t('submodules.reports.petrol_name') }})
                    </th>
                    <th
                        rowspan="2"
                        style="min-width: 200px;"
                    > {{ $t('submodules.reports.petrol_location') }})
                    </th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_80_import') }}</th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_80_local') }}</th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_91') }}</th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_92') }}</th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_95') }}</th>
                    <th :colspan="datesDifference">{{ $t('submodules.reports.petrol_AI_98') }}</th>
                  </tr>
                  <tr class="tr-text-center">

                    <th v-for="(date, index) in fromToDate" :key="`index0-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span>
                    </th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                    <th v-for="(date, index) in fromToDate" :key="`index1-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span></th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                    <th v-for="(date, index) in fromToDate" :key="`index2-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span></th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                    <th v-for="(date, index) in fromToDate" :key="`index3-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span></th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                    <th v-for="(date, index) in fromToDate" :key="`index4-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span></th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                    <th v-for="(date, index) in fromToDate" :key="`index5-${index}`"><span style="white-space: nowrap">{{
                        date
                      }}</span></th>
                    <!--                    <th class="bg-warning">Фарқ +/-</th>-->

                  </tr>
                  </thead>

                  <tbody v-for="(item,index) in allPetfolItems"
                         :key="index">
                  <tr>
                    <th>T/r</th>
                    <th
                        colspan="5000"
                        style="background: #c3ecfa;"
                    >
                      {{
                        getName({
                          nameUz: item.regionNameUz,
                          nameLt: item.regionNameLt,
                          nameRu: item.regionNameRu,
                        })
                      }}
                    </th>
                  </tr>
                  <tr v-for="(innerItem,innerIndex) in item.petrolList"
                      :key="`innerIndex-${innerIndex}`"
                  >

                    <td class="text-center">
                      {{ innerIndex + 1 }}
                    </td>
                    <td class="text-center">
                      {{
                        getName({
                          nameUz: innerItem.petrolStationNameUz,
                          nameLt: innerItem.petrolStationNameLt,
                          nameRu: innerItem.petrolStationNameRu,
                        })
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        getName({
                          nameUz: innerItem.districtNameUz,
                          nameLt: innerItem.districtNameLt,
                          nameRu: innerItem.districtNameRu,
                        })
                      }}
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index0) in fromToDate"
                        :key="`index0-${index0}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0&& innerItem.petrolBenzinList[0]">
                        <span v-for="(petrolCost, cost0) in innerItem.petrolBenzinList[0].priceByDate"
                              :key="cost0">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index1) in fromToDate"
                        :key="`index1-${index1}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0 && innerItem.petrolBenzinList[1]">
                        <span v-for="(petrolCost, cost1) in innerItem.petrolBenzinList[1].priceByDate"
                              :key="`index-${cost1}`">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index2) in fromToDate"
                        :key="`index2-${index2}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0&& innerItem.petrolBenzinList[2]">
                        <span v-for="(petrolCost, cost2) in innerItem.petrolBenzinList[2].priceByDate"
                              :key="cost2">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index3) in fromToDate"
                        :key="`index3-${index3}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0&& innerItem.petrolBenzinList[3]">
                        <span v-for="(petrolCost, cost3) in innerItem.petrolBenzinList[3].priceByDate"
                              :key="cost3">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index4) in fromToDate"
                        :key="`index4-${index4}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0&& innerItem.petrolBenzinList[4]">
                        <span v-for="(petrolCost, cost4) in innerItem.petrolBenzinList[4].priceByDate"
                              :key="cost4">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <td
                        class="text-center"
                        v-for="(date, index5) in fromToDate"
                        :key="`index5-${index5}`">
                      <div v-if="innerItem.petrolBenzinList.length > 0 && innerItem.petrolBenzinList[5]">
                        <span v-for="(petrolCost, cost5) in innerItem.petrolBenzinList[5].priceByDate"
                              :key="cost5">
                        <span v-if="date == petrolCost['petrolDate']">
                          {{ petrolCost['benzinPrice'] }}
                        </span>
                        </span>
                      </div>
                    </td>

                    <!--                    <td-->
                    <!--                        class="text-center"-->
                    <!--                        :class="n%2 == 0 ? 'bg-success' : 'bg-danger'"-->
                    <!--                    >-->
                    <!--                      0-->
                    <!--                    </td>-->
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
