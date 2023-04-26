<template>
  <div class="col-12">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_2') }}</div>
    </div>
    <div class="card card-body" style="min-height: 35em">
      <div class="table-responsive">
        <b-overlay :opacity="0.1" rounded="sm">
          <table
              class="table table-condensed table-bordered table-hover fixed_headers"
              style="border: 1px solid black"
          >
            <thead class="thead-light text-center">
            <tr>
              <th colspan="13" class="text-center">
                <span class="text-color-red">  2019-2020 йиллар ва 2021 йил 9 ойлиги давомида</span>
                <span class="text-color-green">  Монополияга қарши курашиш қўмитаси томонидан норматив-хуқуқий ҳужжатлар лойиҳаларини <br> рақобатга таъсирини баҳолаш натижалари тўғрисида
                МАЪЛУМОТ</span>


              </th>
            </tr>
            <tr>
              <th rowspan="3" style="width: 4%"><span class="text-color-green">Т/р</span></th>
              <th colspan="3" style="width: 32%" class="text-center text-color-green">
                Жами кўриб чиқилган норматив-хуқуқий лойиҳалар сони
                (ex-ante)
              </th>
              <th colspan="6" style="width: 32%">
                <span class="text-color-red"> Лойиҳада рақобатга зид нормалар мавжуд</span>
              </th>
              <th colspan="3" style="width: 32%">
                <span class="text-color-red">    Рақобатга зид нормалар аниқланган амалдаги <br> қонун ҳужжатлари <br>
                (ex-post)</span>

              </th>
            </tr>
            <tr>
              <th colspan="1">
                <span class="text-color-red">   2019 йил</span>
              </th>
              <th colspan="1">
                <span class="text-color-red">        2020 йил</span>
              </th>
              <th colspan="1">
                <span class="text-color-red">        2021 йил 9 ойлик</span>
              </th>
              <th colspan="2">
                <span class="text-color-red">       2019 йил</span>
              </th>
              <th colspan="2">
                <span class="text-color-red">        2020 йил</span>
              </th>
              <th colspan="2">
                <span class="text-color-red">        2021 йил 9 ойлик</span>
              </th>
              <th colspan="1">
                <span class="text-color-red">   2019 йил</span>
              </th>
              <th colspan="1">
                <span class="text-color-red">        2020 йил</span>
              </th>
              <th colspan="1">
                <span class="text-color-red">        2021 йил 9 ойлик</span>
              </th>
            </tr>
            <tr>
              <th>
              </th>
              <th>
              </th>
              <th>
              </th>
              <th>
                <span class="text-color-red">    сони</span>
              </th>
              <th>
                <span class="text-color-red">     фоизда</span>
              </th>  <th>
              <span class="text-color-red">    сони</span>
            </th>
              <th>
                <span class="text-color-red">     фоизда</span>
              </th>
              <th>
                <span class="text-color-red">    сони</span>
              </th>
              <th>
                <span class="text-color-red">     фоизда</span>
              </th>
              <th>
              </th>
              <th>
              </th>
              <th>
              </th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <th colspan="13" class="text-center">
                  <span
                      class="text-color-green">Вазирлик ва идоралар ишлаб чиққан норматив-хуқуқий ҳужжатлар лойиҳалари</span>
              </th>
            </tr>
            <tr>
              <td class="text-color-green text-center">1</td>
              <td class="text-color-green text-center">288</td>
              <td class="text-color-green text-center">297</td>
              <td class="text-color-green text-center">237</td>
              <td class="text-color-red text-center">225</td>
              <td class="text-color-red text-center">78</td>
              <td class="text-color-red text-center">216</td>
              <td class="text-color-red text-center">73</td>
              <td class="text-color-red text-center">119</td>
              <td class="text-color-red text-center">50</td>
              <td class="text-color-green text-center">150</td>
              <td class="text-color-green text-center">10</td>
              <td class="text-color-green text-center">69</td>
            </tr>
            <tr>
              <th colspan="13" class="text-center text-color-green">
                Маҳаллий ҳокимият органлари қарорлари лойиҳалари
              </th>
            </tr>
            <tr>
              <td class="text-color-green text-center">2</td>
              <td class="text-color-green text-center">0</td>
              <td class="text-color-green text-center">456</td>
              <td class="text-color-green text-center">682</td>
              <td class="text-color-red text-center">0</td>
              <td class="text-color-red text-center">0</td>
              <td class="text-color-red text-center">61</td>
              <td class="text-color-red text-center">13</td>
              <td class="text-color-red text-center">60</td>
              <td class="text-color-red text-center">9</td>
              <td class="text-color-green text-center">1.223</td>
              <td class="text-color-green text-center">324</td>
              <td class="text-color-green text-center">890</td>
            </tr>
            <tr>
              <th colspan="13" class="text-center text-color-green">
                Жами
              </th>
            </tr>
            <tr>
              <td class="text-color-green text-center">3</td>
              <td class="text-color-green text-center">288</td>
              <td class="text-color-green text-center">753</td>
              <td class="text-color-green text-center">919</td>
              <td class="text-color-red text-center">225</td>
              <td class="text-color-red text-center">78</td>
              <td class="text-color-red text-center">277</td>
              <td class="text-color-red text-center">37</td>
              <td class="text-color-red text-center">179</td>
              <td class="text-color-red text-center">19</td>
              <td class="text-color-green text-center">1.373</td>
              <td class="text-color-green text-center">334</td>
              <td class="text-color-green text-center">959</td>
            </tr>
            </tbody>

          </table>
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
