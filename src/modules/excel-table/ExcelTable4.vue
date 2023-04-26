<template>
  <div class="col-12">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.excel.table_name_4') }}</div>
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
              <th colspan="5">
                <span class="text-color-green">Монополияга қарши курашиш қўмитасининг
истеъмолчилар ҳуқуқларини ҳимоя қилиш бўйича
</span><br>
                <span class="text-color-red">АСОСИЙ КЎРСАТКИЧЛАРИ</span>
              </th>
            </tr>
            <tr>
              <th><span class="text-color-green" style="width: 5%"> Т/р</span></th>
              <th><span class="text-color-green" style="width: 35%"> Кўрсаткичлар	</span></th>
              <th><span class="text-color-green" style="width: 20%"> 2019 йил</span></th>
              <th><span class="text-color-green" style="width: 20%"> 2020 йил</span></th>
              <th><span class="text-color-green" style="width: 20%"> 2021 йил <br>9 ойлик</span></th>
            </tr>
            </thead>

            <tbody class="text-center">
            <tr>
              <th colspan="5"><span class="text-color-red">Ҳуқуқлари тикланган истеъмолчилар</span></th>
            </tr>
            <tr>
              <td>1</td>
              <td class="text-left">Ҳуқуқлари тикланган истеъмолчилар</td>
              <td>1,390</td>
              <td>4,012,333</td>
              <td>4,012,333</td>
            </tr>
            <tr>
              <td>2</td>
              <td class="text-left">Истеъмолчилар фойдасига қайтарилган маблағ миқдори,<span class="text-color-red"> минг сўм</span></td>
              <td>274,978</td>
              <td>54,685,262</td>
              <td>54,685,262</td>
            </tr>
            <tr>
              <th colspan="5"><span class="text-color-red">Маҳсулот сифати бўйича назорат тадбирлари</span></th>
            </tr>
            <tr>
              <td>3</td>
              <td class="text-left">Назорат хариди ва экспертизаси ўтказилган товарлар</td>
              <td>-</td>
              <td>88</td>
              <td>171</td>
            </tr>
            <tr>
              <th colspan="5"><span class="text-color-red">Реклама бозорини тартибга солиш</span></th>
            </tr>
            <tr>
              <td>4</td>
              <td class="text-left">Реклама тўғрисидаги қонунчилик талаблари бузилиши бўйича аниқланган ҳолатлар</td>
              <td>4,315</td>
              <td>10,981</td>
              <td>10,981</td>
            </tr>
            <tr>
              <th colspan="5"><span class="text-color-red">Тарғибот ва халқаро муносабатлар</span></th>
            </tr>
            <tr>
              <td>5</td>
              <td class="text-left">Истеъмол маданияти ҳамда ҳуқуқлари бўйича оммавий ахборот воситаларида тушунтиришлар</td>
              <td>19</td>
              <td>3,670</td>
              <td>3,738</td>
            </tr>
            <tr>
              <td>6</td>
              <td class="text-left">Аҳоли ва тадбиркорларнинг истеъмол маданияти ҳамда ҳуқуқий билимини ошириш бўйича ташкил қилинган
                тадбирлар
              </td>
              <td>40</td>
              <td>300</td>
              <td>300</td>
            </tr>
            <tr>
              <td>7</td>
              <td class="text-left">Халқаро ҳамкорлик алоқалари ўрнатилган халқаро ташкилотлар, тадбирлар</td>
              <td>3</td>
              <td>19</td>
              <td>15</td>
            </tr>
            <tr>
              <th colspan="5"><span class="text-color-red">Қонунчилик базасини такомиллаштириш</span></th>
            </tr>
            <tr>
              <td>8</td>
              <td class="text-left">Истеъмолчиларга таъсири баҳоланган норматив-ҳуқуқий ҳужжат лойиҳалари</td>
              <td>30</td>
              <td>81</td>
              <td>84</td>
            </tr>
            <tr>
              <td>9</td>
              <td class="text-left">Хатловдан ўтказилган амалдаги норматив-ҳуқуқий ҳужжатлар</td>
              <td>12</td>
              <td>86</td>
              <td>29</td>
            </tr>
            <tr>
              <td>10</td>
              <td class="text-left">Ишлаб чиқилган норматив-ҳуқуқий ҳужжат лойиҳалари</td>
              <td>3</td>
              <td>14</td>
              <td>7</td>
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
