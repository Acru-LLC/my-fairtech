<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_7') }}</div>
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
                  <th colspan="20" class="text-color-green">
                    Монополияга қарши курашиш қўмитаси томонидан танлов (тендер) ларда иштирок этиш тўғрисида <br>
                    <span class="text-color-red">   МАЪЛУМОТ</span>
                  </th>
                </tr>
                <tr>
                  <th rowspan="2">№</th>
                  <th rowspan="2">Марказий аппарат ва ҳудудлар</th>
                  <th colspan="6">Жами иштирок этилган танлов (тендер) лар сони</th>

                  <th>Жами иштирок этилган танлов (тендер) лар сони</th>
                  <th>Бошланғич нарх</th>
                  <th>Иқтисод қилинган маблағлар (млрд сўм)</th>
                  <th>шу жумладан рақобат чекланиши аниқланган танлов (тендер)лар</th>

                  <th>Жами иштирок этилган танлов (тендер) лар сони</th>
                  <th>Бошланғич нарх</th>
                  <th>Иқтисод қилинган маблағлар (млрд сўм)</th>
                  <th>шу жумладан рақобат чекланиши аниқланган танлов (тендер)лар</th>

                  <th>Жами иштирок этилган танлов (тендер) лар сони</th>
                  <th>Бошланғич нарх</th>
                  <th>Иқтисод қилинган маблағлар (млрд сўм)</th>
                  <th>шу жумладан рақобат чекланиши аниқланган танлов (тендер)лар</th>

                </tr>
                <tr>
                  <th>2013 й</th>
                  <th>2014 й</th>
                  <th>2015 й</th>
                  <th>2016 й</th>
                  <th>2017 й</th>
                  <th>2018 й</th>


                  <th colspan="4">2019 й</th>
                  <th colspan="4">2020 й</th>
                  <th colspan="4">2021 й</th>

                </tr>
                </thead>

                <tbody class="text-center">
                <tr>
                  <th>1</th>
                  <th>Бевосита иштирок этилган тендерлар</th>
                  <th> 2,642</th>
                  <th> 3,266</th>
                  <th>3,132</th>
                  <th> 2,541</th>
                  <th> 2,289</th>
                  <th> 707</th>
                  <th> 1,692</th>
                  <th> 1,149.83</th>
                  <th> 21.91</th>
                  <th> 173</th>
                  <th> 1,998</th>
                  <th> 20,359.90</th>
                  <th> 436.69</th>
                  <th> 284</th>
                  <th> 3,426</th>
                  <th>9,518.49</th>
                  <th> 737.58</th>
                  <th>115</th>
                </tr>

                <tr>
                  <th>2</th>
                  <th>Таҳлил ва мурожаатлар асосида</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>2,252</th>
                  <th>106.46</th>
                  <th></th>
                  <th>1,666</th>
                  <th>2,219</th>
                  <th> 5,980.57</th>
                  <th></th>
                  <th>1,930</th>
                  <th>9,259</th>
                  <th> 13,287.78</th>
                  <th></th>
                  <th>3,938</th>
                </tr>
                <tr>
                  <th>3</th>
                  <th>Масофавий таҳлил асосида</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>4,823</th>
                  <th>2,562.61</th>
                  <th> 372.91</th>
                  <th> 1,435</th>
                </tr>
                <tr class="text-color-red">
                  <th colspan="2">ЖАМИ</th>
                  <th>2,642	</th>
                  <th>3,266	</th>
                  <th>3,132	</th>
                  <th>2,541	</th>
                  <th>2,289	</th>
                  <th>707	</th>
                  <th>3,944</th>
                  <th>	1,256.29</th>
                  <th>	21.91	</th>
                  <th>1,839	</th>
                  <th>4,217	</th>
                  <th>26,340.48</th>
                  <th>	436.69</th>
                  <th>	2,214</th>
                  <th>	17,508</th>
                  <th>	25,368.88	</th>
                  <th>1,110.49</th>
                  <th>	5,488</th>
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
