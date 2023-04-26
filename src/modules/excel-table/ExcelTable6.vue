<template>
  <div class="col-12">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_6') }}</div>
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
                <span class="text-color-green">Табиий монополия субъектлари Давлат реестридаги корхоналар тўғрисида<br>
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
              <th rowspan="2"><span class="text-color-green" style="width: 30%"> 2019 йил<br>
давомида реестрга киритилган корхоналар<br>
<span class="text-color-red">сони</span></span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 30%"> 2020 йил<br>
давомида реестрга киритилган корхоналар<br>
<span class="text-color-red">сони</span></span></th>
              <th rowspan="2"><span class="text-color-green" style="width: 30%"> 2021 йилнинг<br>
9 ойи давомида реестрга киритилган корхоналар<br>
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
              <th colspan="9"><span class="text-color-green">Табиий монополия субъектлари</span></th>
            </tr>
            <tr>
              <th>1</th>
              <th class="text-left">Нефть, нефть маҳсулотлари ва газни қувур орқали транспортировка қилиш</th>
              <th>4</th>
              <th>4</th>
              <th>4</th>
              <th>-</th>
              <th>3</th>
              <th>-</th>
              <th>-</th>
            </tr>
            <tr>
              <th>2</th>
              <th class="text-left">Электр энергиясини ишлаб чиқариш ҳамда транспортировка қилиш шу жумладан субъистемолчиларга етказиб
                бериш хизматлари
              </th>
              <th>30</th>
              <th>29</th>
              <th>24</th>
              <th>5</th>
              <th>5</th>
              <th>1</th>
              <th>1</th>
            </tr>

            <tr>
              <th>3</th>
              <th class="text-left">Иссиқлик энергиясини ишлаб чиқариш ҳамда транспортировка қилиш</th>
              <th>28</th>
              <th>36</th>
              <th>4</th>
              <th>-</th>
              <th>-</th>
              <th>1</th>
              <th>-</th>
            </tr>

            <tr>
              <th>4</th>
              <th class="text-left">Темир йўллар инфратузилмасидан фойдаланиш ҳисобга олинган ҳолда темир йўлларда ташиш</th>
              <th>10</th>
              <th>12</th>
              <th>4</th>
              <th>6</th>
              <th>-</th>
              <th>3</th>
              <th>-</th>
            </tr>
            <tr>
              <th>5</th>
              <th class="text-left">Умумий эркин фойдаланиладиган почта алоқаси хизматлари</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>0</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
            <tr>
              <th>6</th>
              <th class="text-left">Сув қувурлари ва канализация хизмати</th>
              <th>54</th>
              <th>92</th>
              <th>26</th>
              <th>29</th>
              <th>15</th>
              <th>4</th>
              <th>-</th>
            </tr>
            <tr>
              <th>7</th>
              <th class="text-left">Аэронавигациялар, портлар ва аэропортлар хизматлари</th>
              <th>2</th>
              <th>2</th>
              <th>2</th>
              <th>-</th>
              <th>1</th>
              <th>1</th>
              <th>-</th>
            </tr>
            <tr>
              <th colspan="2">Жами:</th>
              <th>129</th>
              <th>176</th>
              <th>89</th>
              <th>40</th>
              <th>24</th>
              <th>10</th>
              <th>1</th>
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
