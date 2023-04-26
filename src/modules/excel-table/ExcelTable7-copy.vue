<template>
  <div class="col-12">
    <div class="card card-body" style="min-height: 35em">
      <div class="table-responsive">
        <b-overlay :opacity="0.1" rounded="sm">
          <table
              class="table table-condensed table-bordered table-hover fixed_headers"
              style="border: 1px solid black"
          >
            <thead class="thead-light text-center">

            <tr>
              <th colspan="5">
                <span class="text-color-green">Монополияга қарши курашиш қўмитаси томонидан 2021 йилнинг 9 ойи давомида танлов <br> (тендер)лар ҳамда бошқа давлат харидлари тартиботларида амалга оширилган назорат <br> ишлари тўғрисида <br></span>
                <span class="text-color-red">МАЪЛУМОТ</span>
              </th>
            </tr>
            <tr>
              <th><span class="text-color-green" style="width: 4%"> №</span></th>
              <th><span class="text-color-green" style="width: 32%"> Назорат ишлари тури</span></th>
              <th><span class="text-color-green" style="width: 32%"> Назорат амалга оширилган танлов (тендер)лар ва бошқа <br> давлат харид тартиботлари сони</span>
              </th>
              <th><span class="text-color-green" style="width: 32%"> Рақобат чекланиши аниқланган <br> танлов (тендер)лар сони	</span>
              </th>
            </tr>
            </thead>

            <tbody class="text-center">
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">1</span></th>
              <th class="text-left"><span class="text-body-color-green" style="width: 50%">Ўрганиш ва текширишларда иштирок этиш асосида</span>
              </th>
              <th class="text-center"><span class="text-color-green" style="width: 15%">9,259</span></th>
              <th class="text-center"><span class="text-color-green-green-red" style="width: 15%"> 3,938</span></th>
            </tr>
            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%">2</span></th>
              <th class="text-left"><span class="text-body-color-green"
                                          style="width: 50%">Бевосита таҳлил асосида</span>
              </th>
              <th class="text-center"><span class="text-color-green" style="width: 15%">4,823</span></th>
              <th class="text-center"><span class="text-color-green" style="width: 15%"> 	1,435</span></th>
            </tr>

            <tr>
              <th class="text-center"><span class="text-body-color-green" style="width: 5%"></span></th>
              <th class="text-left"><span class="text-color-red" style="width: 50%">
ЖАМИ
              </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%"> 14,082	 </span></th>
              <th class="text-center"><span class="text-color-red" style="width: 15%">5,373	    </span></th>
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
