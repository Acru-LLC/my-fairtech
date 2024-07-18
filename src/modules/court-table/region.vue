<template>
  <div>
    <!-- Region Selection Part -->
    <div v-if="!tableVisible">
      <b-row class="ml-4">
        <b-col class="mb-2 mt-3">
          <b-button style="background: #F39138" class="btn btn-warning p-2" size="md" @click="$router.go(-1)">
            {{ $t("actions.back") }}
          </b-button>
        </b-col>
      </b-row>
      <b-col cols="12">
        <b-row class="d-flex justify-content-center">
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1" v-for="(element, index) in regionData?.slice(0, 12)" :key="index">
            <div class="frame-hover"
                 :class="{ 'active': element.value === activeBox }">
              <div class="box-style"
                   :class="{ 'active': element.value === activeBox,'activeShadow': element.value == activeBox }" @click="selectRegion(element)">
                <p class="box-title-style" :class="{ 'activeText': element.value == activeBox }">{{ $t(element.title) }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1" v-for="(element, index) in regionData?.slice(12)" :key="index">
            <div class="frame-hover"
                 :class="{ 'active': element.value === activeBox }">
              <div class="box-style"
                   :class="{ 'active': element.value === activeBox,'activeShadow': element.value == activeBox }" @click="selectRegion(element)">
                <p class="box-title-style" :class="{ 'activeText': element.value == activeBox }">{{ $t(element.title) }}</p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1">
            <div class="frame-hover d-none"></div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="2" class="px-1">
            <div class="frame-hover d-none"></div>
          </b-col>
        </b-row>
      </b-col>
    </div>

    <!-- Table Part -->
    <div v-if="tableVisible" class="p-4">
      <b-row class="mb-3 d-flex justify-content-between">
        <b-col cols="1">
          <b-button variant="primary" class="p-2" @click="goBack">
            {{$t('actions.back')}}
          </b-button>
        </b-col>
        <b-col cols="6"></b-col>
        <b-col cols="3" class="d-flex justify-content-end">
          <BaseDatePickerWithValidation v-model="formattedDate" only-form-element not-required
                                        :disabled="formattedDate === today"/>
          <b-button variant="primary" class="p-2" @click="sendRequest(selectedRegion.value)">Излаш</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-3 d-flex justify-content-center">
        <h2><b class="text-color">{{ selectedRegionTitle }} </b>томонидан <b class="text-color">{{ formattedDate }}</b>
          йилга суд мажлисига тайинланган жиноят ишлари рўйхати</h2>
      </b-row>
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>{{ $t('court_table_list.table_columns.subyekt') }}</th>
          <th>{{ $t('court_table_list.table_columns.soha') }}</th>
          <th>{{ $t('court_table_list.table_columns.docs') }}</th>
          <th>{{ $t('court_table_list.table_columns.work_number') }}</th>
          <th>{{ $t('court_table_list.table_columns.date_time') }}</th>
          <th>{{ $t('court_table_list.table_columns.chairmon') }}</th>
          <th>{{ $t('court_table_list.table_columns.work_step') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in cases" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.step1.nameSubject }}</td>
          <td v-if="item.step1.fieldWorkDto">
            {{
              getName({
                nameLt: item.step1.fieldWorkDto.nameLt,
                nameUz: item.step1.fieldWorkDto.nameRu,
                nameRu: item.step1.fieldWorkDto.nameUz,
              })
            }}
          </td>
          <td>
            <p class="mb-2">
              <b class="detailText">
      <span v-if="!showText">
        <span v-if="item.step1?.resultsCaseReviews.length > 0">
          <span v-if="getLocale == 'uz'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameLt.split(' ').slice(0, 5).join(' ') }}
          </span>
          <span v-if="getLocale == 'uzCyrillic'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameUz.split(' ').slice(0, 5).join(' ') }}
          </span>
          <span v-if="getLocale == 'ru'">
            {{ item.step1?.resultsCaseReviews[0].brokenDocsDto?.nameRu.split(' ').slice(0, 5).join(' ') }}
          </span>
        </span>
      </span>
                <ol v-if="showText" class="ml-3">
                  <li v-for="(tItem, tIndex) in item.step1?.resultsCaseReviews" :key="tIndex">
                    {{
                      getName({
                        nameLt: tItem.brokenDocsDto?.nameLt,
                        nameUz: tItem.brokenDocsDto?.nameUz,
                        nameRu: tItem.brokenDocsDto?.nameRu,
                      })
                    }}
                  </li>
                </ol>
                <span @click="toggleShowText" style="color:#f39138; cursor: pointer;">
        <span v-if="!showText"> ...{{ $t('actions.details') }} ({{ lengthOfCaseBrake }})</span>
        <span v-else> ...{{ $t('actions.close') }}</span>
      </span>
              </b>
            </p>
          </td>

          <td>{{ item.step1.numberOfWork }}</td>
          <td>
            {{
              item.step1?.dateEnd ? item.step1.dateEnd : item.step2_all?.seeWorkDate ? item.step2_all.seeWorkDate : '- - -'
            }},
            {{
              item.step1?.timeEnd ? item.step1.timeEnd.slice(0, 5) : item.step2_all?.timeEnd ? item.step2_all.timeEnd.slice(0, 5) : '- - -'
            }}
          </td>
          <td>{{ item.step1.chairmanCommission }}</td>
          <td>{{ $t('court_table_list.table_columns.first_step') }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CheckService from "@/shared/services/checkService";

export default {
  name: "Region",
  data: () => ({
    showText: false,
    selectedRegion: null,
    today: new Date().toISOString().slice(0, 10),
    formattedDate: '',
    selectedOption: null,
    regionIsCentral: null,
    testValue: {},
    regionData: [
      { value: 17, title: "rais.region.republic" },
      { value: 1735, title: "rais.region.qoraqalpoq" },
      { value: 1703, title: "rais.region.andijon" },
      { value: 1706, title: "rais.region.buxoro" },
      { value: 1708, title: "rais.region.jizzax" },
      { value: 1712, title: "rais.region.navoi" },
      { value: 1714, title: "rais.region.namangan" },
      { value: 1718, title: "rais.region.samarqand" },
      { value: 1724, title: "rais.region.sirdaryo" },
      { value: 1722, title: "rais.region.surxandaryo" },
      { value: 1730, title: "rais.region.fargona" },
      { value: 1727, title: "rais.region.toshkentV" },
      { value: 1726, title: "rais.region.toshkentSh" },
      { value: 1710, title: "rais.region.qashqadaryo" },
      { value: 1733, title: "rais.region.xorazm" },
      { value: 1, title: "rais.region.qomita" }
    ],
    cases: [],
    activeBox: null,
    tableVisible: false,
    loading: false,
    searchLoader: false,
    modalVisible: false,
    searchingModal: false,
    getUserDatas: {}
  }),
  methods: {
    toggleShowText() {
      this.showText = !this.showText;
    },
    updateFormattedDate() {
      this.formattedDate = this.formatDate(this.today);
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    selectRegion(region) {
      this.selectedRegion = region;
      this.sendRequest(region.value);
    },
    sendRequest(data) {
      this.loading = true;
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      let check = {
        soato: data,
        date: formattedDate
      };
      this.searchLoader = true;
      return CheckService.courtTable(check)
          .then((result) => {
            this.cases = result.data;
            // this.cases = result.data.cases;
            this.activeBox = data;
            this.tableVisible = true;
            this.loading = false;
            if (
                result.data &&
                (result.data.count !== null ||
                    result.data.date !== null ||
                    result.data.firstName !== null ||
                    result.data.lastName !== null ||
                    result.data.middleName !== null)
            ) {
              this.$toast.success(this.$t('statistics_info.download_success'));
              this.modalVisible = true;
            } else {
              this.$toast.error(this.$t('statistics_info.empty_message'));
              this.modalVisible = true;
            }
          })
          .catch((err) => {
            this.$toast.error('Error');
          })
          .finally(() => {
            this.searchLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },
    goBack() {
      this.tableVisible = false;
      this.selectedRegion = null;
    }
  },
  created() {
    this.updateFormattedDate();
  },
  computed: {
    selectedRegionTitle() {
      return this.selectedRegion ? this.$t(this.selectedRegion.title) : '';
    },
    lengthOfCaseBrake() {
      return this.cases.reduce((acc, e) => acc + (e.step1.resultsCaseReviews?.length || 0), 0);
    },
    getLocale() {
      return localStorage.getItem('locale') ? localStorage.getItem('locale') : 'uzCyrillic'
    },
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.disable-content {
  pointer-events: none;
  opacity: 1;
}

.frame-hover {
  padding: 10px;
  margin: 5px 0px;
  border-width: 10px;
  border-style: solid;
  border-radius: 10px;
  border-color: transparent;
  transition: all 0.4s ease;
}

.box-style {
  width: 100%;
  height: 160px;
  display: flex;
  padding: 10px;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 3px solid #029984;
  border-radius: 10px;
  transition: all 0.4s ease;
  cursor: pointer;
  .box-title-style {
    padding: 18px;
    font-size: 19px;
    font-weight: 700;
    text-align: center;
    color: #029984;
  }
}

.frame-hover:hover {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
}
.frame-hover:hover .box-style {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}

.frame-hover:first-child:hover .box-title-style {
  color: #2c675b;
}
.active {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
  color: white;
}

.activeText {
  color: #2c675b !important;
}

.activeShadow {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
/*.box-style:hover {
  background-color: #029984 !important;
  box-shadow: 0 0 13px #029984;
  color:white;
}

.box-style:hover .box-title-style {
  color: white !important;
}*/

/*.active {
  background-color: #029984 !important;
  border-radius: 10px;
}

.activeText {
  color: white !important;
}*/
</style>
