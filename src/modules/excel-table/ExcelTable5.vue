<template>
  <div class="col-12">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_5') }}</div>
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
              <th colspan="9">
                <span class="text-color-green">Товар ёки молия бозорида устун мавқени эгаллаб турган хўжалик юритувчи субъектлар <br>
Давлат реестридаги корхоналар тўғрисида <br>
МАЪЛУМОТ</span>
              </th>
            </tr>
            <tr>
              <th rowspan="2"><span class="text-color-green" style="width: 5%"> Т/р</span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 15%"> Соҳалар номи	</span></th>
              <th rowspan="2"><span class="text-color-green"
                                    style="width: 10%"> Хўжалик <br>юритувчи  <br>субъектлар <br><span
                  class="text-color-red"> сони</span></span>
              </th>
              <th rowspan="2"><span class="text-color-green" style="width: 15%"> Монополлашган <br> бозорлар <br>
<span class="text-color-red">сони</span></span></th>
              <th colspan="2"><span class="text-color-red" style="width: 25%">  Шундан,	</span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 20%"> 2019 йил давомида</span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 20%">  2020 йил давомида</span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 20%"> 2021 йилнинг<br>
9 ойи давомида реестрга  <br>киритилган корхоналар<br>
<span class="text-color-red">сони</span></span></th>
            </tr>
            <tr>
              <th><span class="text-color-green"
                        style="width: 20%"> давлат <br>иштироки <br>мавжуд<br> корхоналар</span></th>
              <th><span class="text-color-green" style="width: 20%"> хусусий<br> корхоналар</span></th>
            </tr>
            </thead>

            <tbody class="text-center">
            <tr>
              <th colspan="9"><span class="text-color-green">Товар ёки молия бозорида устун мавқени эгаллаб турган хўжалик юритувчи субъектлар</span>
              </th>
            </tr>
            <tr>
              <th>1</th>
              <th class="text-left">Озиқ-овқат</th>
              <th> 11</th>
              <th>5</th>
              <th>8</th>
              <th>3</th>
              <th>1</th>
              <th>0</th>
              <th>0</th>
            </tr>
            <tr>
              <th>2</th>
              <th class="text-left">Кўмир</th>
              <th>2</th>
              <th>2</th>
              <th>2</th>
              <th>0</th>
              <th>2</th>
              <th>1</th>
              <th>0</th>
            </tr>

            <tr>
              <th>3</th>
              <th class="text-left">Нефть-газ саноати</th>
              <th>5</th>
              <th>6</th>
              <th>4</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>2</th>
            </tr>

            <tr>
              <th>4</th>
              <th class="text-left"> Кимё саноати</th>
              <th>4</th>
              <th>7</th>
              <th>4</th>
              <th>0</th>
              <th>2</th>
              <th>2</th>
              <th>3</th>
            </tr>
            <tr>
              <th>5</th>
              <th class="text-left"> Машинасозлик ва металлургия</th>
              <th>8</th>
              <th>13</th>
              <th>8</th>
              <th>0</th>
              <th> 1</th>
              <th>1</th>
              <th>0</th>
            </tr>
            <tr>
              <th>6</th>
              <th class="text-left">Электротехника саноати</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>0</th>
              <th> 1</th>
              <th>1</th>
              <th>0</th>
            </tr>
            <tr>
              <th>7</th>
              <th class="text-left">Қурилиш материаллари</th>
              <th>6</th>
              <th>5</th>
              <th>5</th>
              <th>1</th>
              <th> 1</th>
              <th>1</th>
              <th>0</th>
            </tr>
            <tr>
              <th>8</th>
              <th class="text-left">Хизматлар</th>
              <th>43</th>
              <th>44</th>
              <th>41</th>
              <th>2</th>
              <th>2</th>
              <th>2</th>
              <th>4</th>
            </tr>
            <tr>
              <th>9</th>
              <th class="text-left"> Молиявий хизматлар</th>
              <th>8</th>
              <th>16</th>
              <th>4</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>0</th>
            </tr>
            <tr>
              <th>10</th>
              <th class="text-left">Бошқа соҳалар</th>
              <th>5</th>
              <th>7</th>
              <th>3</th>
              <th>2</th>
              <th> 1</th>
              <th>1</th>
              <th>0</th>
            </tr>
            <tr>
              <th colspan="2">Жами:</th>
              <th>93</th>
              <th>106</th>
              <th>83</th>
              <th>10</th>
              <th>13</th>
              <th>11</th>
              <th>9</th>
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
