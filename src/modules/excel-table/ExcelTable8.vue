<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_8') }}</div>
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
                  <th colspan="9">
               <span class="text-color-green">   Хўжалик юритувчи субъектларни қўшиб юбориш, қўшиб олиш ва акцияларни (улушларни) олиш <br>
                  бўйича битимларга олдиндан розилик берилиши тўғрисида <br></span>
                    <span class="text-color-red">  МАЪЛУМОТ</span>
                  </th>
                </tr>
                <tr>
                  <th colspan="7"></th>
                  <th colspan="2">01.10.2021 йил ҳолатига</th>
                </tr>
                <tr>
                  <th rowspan="3" style="width: 5%"><span class="text-color-green">Т/р</span></th>
                  <th rowspan="3" style="width: 10%">Даври
                  </th>
                  <th rowspan="3" style="width: 20%">Битим <br>
                    мазмуни
                  </th>
                  <th rowspan="3">Жами келиб <br> тушган <br>мурожаат</th>
                  <th colspan="2">Шундан</th>
                  <th colspan="3">Розилик берилган битимларнинг қиймати
                    <br> (млрд. сўмда)
                  </th>
                </tr>
                <tr>
                  <th rowspan="2">розилик <br>берилган
                    (махсус комиссия <br> қарори билан)
                  </th>
                  <th rowspan="2">розилик талаб <br> этилмаслиги <br> тушунтирилган</th>
                  <th rowspan="2">розилик <br> берилган жами <br> битимлар</th>
                  <th colspan="2">шундан:</th>
                </tr>
                <tr>
                  <th>хорижий <br> инвесторлар <br> иштирокидаги
                    <br> битимлар
                  </th>
                  <th style="width: 30%">фоизда
                    %
                  </th>

                </tr>
                </thead>

                <tbody class="text-center">

                <tr>
                  <td colspan="3">Жами:</td>
                  <td>448</td>
                  <td>320</td>
                  <td> 128</td>
                  <td>8,549</td>
                  <td> 5,097</td>
                  <td> 56</td>
                </tr>

                <tr>
                  <td rowspan="2" class="text-color-red">1</td>
                  <td rowspan="2" class="text-color-red">2019 йил</td>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг қўшиб юборилиши ва қўшиб олиниши</td>
                  <td>68</td>
                  <td> 53</td>
                  <td> 15</td>
                  <td> -</td>
                  <td> -</td>
                  <td> -</td>
                </tr>
                <tr>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг устав фондидаги (устав капиталидаги) акцияларнинг (улушларни)
                    олиниши
                  </td>
                  <td>136</td>
                  <td> 87</td>
                  <td> 49</td>
                  <td> 3,312</td>
                  <td> 2,435</td>
                  <td> 74</td>
                </tr>


                <tr>
                  <td rowspan="2" class="text-color-red">2</td>
                  <td rowspan="2" class="text-color-red">2020 йил</td>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг қўшиб юборилиши ва қўшиб олиниши</td>
                  <td>37</td>
                  <td> 27</td>
                  <td> 10</td>
                  <td> -</td>
                  <td> -</td>
                  <td> -</td>
                </tr>

                <tr>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг устав фондидаги (устав капиталидаги) акцияларнинг (улушларни)
                    олиниши
                  </td>
                  <td>116</td>
                  <td> 87</td>
                  <td> 29</td>
                  <td> 3,303</td>
                  <td> 1,957</td>
                  <td> 59</td>
                </tr>


                <tr>
                  <td rowspan="2" class="text-color-red">3</td>
                  <td rowspan="2" class="text-color-red">2021 йил 1 октябрь холатига</td>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг қўшиб юборилиши ва қўшиб олиниши</td>
                  <td>26</td>
                  <td> 22</td>
                  <td> 4</td>
                  <td> -</td>
                  <td> -</td>
                  <td> -</td>
                </tr>

                <tr>
                  <td class="text-left">Хўжалик юритувчи субъектларнинг устав фондидаги (устав капиталидаги) акцияларнинг (улушларни)
                    олиниши
                  </td>
                  <td>65</td>
                  <td> 44</td>
                  <td> 21</td>
                  <td> 1,934</td>
                  <td> 705</td>
                  <td> 36</td>
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
