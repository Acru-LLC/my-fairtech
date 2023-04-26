<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_3') }}</div>
    </div>
    <div class="card card-body" style="min-height: 35em">
      <div class="table-responsive">
        <b-overlay :opacity="0.1" rounded="sm">
          <div class="row">
            <div class="col-12">
              <table
                  class="table table-condensed table-bordered table-hover fixed_headers"
                  style="border: 1px solid black"
              >
                <thead class="thead-light text-center">
                <tr>
                  <th rowspan="3" style="width: 5%"><span class="text-color-green">Т/р</span></th>
                  <th rowspan="3" style="width: 15%" class="text-center text-color-green">
                    Даври
                  </th>
                  <th rowspan="6" style="width: 10%">
                    <span class="text-color-green"> Жами иқтисодий манфаатларнинг ҳимоя қилиниши</span> <br>
                    <span class="text-color-red">(млн сўм)</span>
                  </th>
                  <th colspan="5" style="width: 40%">
                    <span class="text-color-green">   Аҳоли ва тадбиркорларга қайта ҳисоб қилиниши</span>

                  </th>
                  <th colspan="2" style="width: 15%">
                <span class="text-color-red">    Рақобатга зид нормалар аниқланган амалдаги <br> қонун ҳужжатлари <br>
                (ex-post)</span>
                  </th>
                </tr>
                <tr>
                  <th colspan="1" rowspan="2">
                    <span class="text-color-green">   Жами</span> <br><span class="text-color-red">
(млн сўм)</span>
                  </th>
                  <th colspan="2">
                    <span class="text-color-green">       Жисмоний шахсларга </span>
                  </th>
                  <th colspan="2">
                    <span class="text-color-green">     Юридик шахсларга </span>
                  </th>
                  <th rowspan="2">
                    <span class="text-color-red"> тадбиркорлик субъектлари сони</span>
                  </th>
                  <th rowspan="2">
               <span class="text-color-red">қайтарилган  <br>маблағ <br>
(млн сўм)</span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span class="text-color-red"> Истеъмолчилар <br> сони</span>
                  </th>
                  <th>
                <span class="text-color-red">қайтарилган  <br>маблағ <br>
(млн сўм)</span>
                  </th>
                  <th>
                    <span class="text-color-red"> тадбиркорлик <br>субъектлари сони</span>
                  </th>
                  <th>
                <span class="text-color-red">қайтарилган  <br>маблағ <br>
(млн сўм)</span>
                  </th>


                </tr>
                </thead>

                <tbody class="text-center">
                <tr class="text-center">
                  <td>1</td>
                  <td>2021 йил</td>
                  <td>257,973</td>
                  <td> 248,475</td>
                  <td>6,507</td>
                  <td> 2,795</td>
                  <td>17,925</td>
                  <td>245,681</td>
                  <td> 19</td>
                  <td> 9,498</td>
                </tr>
                <tr class="text-center">
                  <td>2</td>
                  <td>2020 йил</td>
                  <td>97,661</td>
                  <td> 92,817</td>
                  <td> 83,710</td>
                  <td> 58</td>
                  <td>11,750</td>
                  <td>92,759</td>
                  <td> 168</td>
                  <td> 4,844</td>
                </tr>
                <tr class="text-center">
                  <td>3</td>
                  <td> 2021 <br>9 ойлик</td>
                  <td> 160,407</td>
                  <td> 46,879</td>
                  <td> 35,907</td>
                  <td> 5,651</td>
                  <td> 7,950</td>
                  <td> 41,228</td>
                  <td> 104</td>
                  <td> 113,529</td>
                </tr>
                <tr class="text-center text-color-red">
                  <td colspan="2">Жами</td>
                  <td>516,042</td>
                  <td> 388,171</td>
                  <td>126,124</td>
                  <td> 8,504</td>
                  <td> 37,625</td>
                  <td> 379,668</td>
                  <td> 291</td>
                  <td> 127,870</td>
                </tr>

                </tbody>

              </table>
            </div>


          </div>
        </b-overlay>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.p_cursor {
  cursor: pointer !important;
}

.bg-color {
  background: #d5daf8 !important;
}

.text-color-red {
  color: red;
  font-size: 15px;
}

.text-color-green {
  color: #3355a1;
  font-size: 15px;
}
</style>
