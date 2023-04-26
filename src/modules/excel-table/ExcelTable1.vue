<template>
  <div class="col-12">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_1') }}</div>
    </div>
    <div class="card card-body" style="min-height: 35em">
      <div class="table-responsive">
        <b-overlay :opacity="0.1" rounded="sm">
          <table
              class="table table-condensed table-bordered table-hover fixed_headers"
              style="border: 1px solid black"
          >
            <thead class="thead-light text-center" >

            <tr>
              <th colspan="5">
                <span class="text-color-red">2019 – 2021 йил 9 ойлик</span> <span class="text-color-green">давомида Монополияга қарши курашиш қўмитаси томонидан аниқланган рақобатга зид ҳаракатлар бўйича МАЪЛУМОТ</span>
              </th>
            </tr>
            <tr>
              <th><span class="text-color-green" style="width: 5%"> Т/р</span></th>
              <th><span class="text-color-green" style="width: 50%"> Қонун бузилиши тури</span></th>
              <th><span class="text-color-green" style="width: 15%"> 2019 йил</span></th>
              <th><span class="text-color-green" style="width: 15%"> 2020 йил</span></th>
              <th><span class="text-color-green" style="width: 15%"> 2021 йил <br>9 ойлик</span></th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">1</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">Давлат бошқаруви органларининг рақобатни чеклайдиган ҳужжатлари ҳамда ҳаракатлари</span>
              </th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">150</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 10</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">69</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">2</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
               Маҳаллий давлат ҳокимияти органлари ва юридик шахслар бирлашмаларининг рақобатни чеклайдиган ҳужжатлари ҳамда ҳаракатлари
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">1.223</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 324</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">890</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">3</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
             Инсофсиз рақобат
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">91</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 117</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">69</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">4</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
             Устун мавқени суиистеъмол қилиш, келишиб қилинган ҳаракатлар ва иқтисодий концентрацияси назорати соҳасида
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">24</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">255</span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">112</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">5</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
           Танлов (тендер) савдоларида рақобатга қарши ҳаракатлар
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 1,839 </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">	 2,214  </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 5,373</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">6</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
          Монопол юқори нарх ўрнатиш ҳамда тартибга солинадиган нархларни асоссиз ошириш
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 210  </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">	 	 174    </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">   	 296</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">7</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
         Биржа савдолари жараёнида рақобатни чеклаш
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 17  </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">	 	 40    </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">   	 20</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">8</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">
Табиий монополиялар томонидан асоссиз ҳақ ундириш ва тадбиркорлар ҳамда истеъмолчиларни камситилиши
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 420  </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">	 	 256    </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">   	 334</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%"></span></th>
              <th class="text-left"><span class="text-color-green" style="width: 50%">
ЖАМИ
              </span></th>
              <th class="text-center"><span class="text-color-green" style="width: 15%">  3,974  </span></th>
              <th class="text-center"><span class="text-color-green" style="width: 15%">	 	 3390    </span></th>
              <th class="text-center"><span class="text-color-green" style="width: 15%">   	 7163</span></th>
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
