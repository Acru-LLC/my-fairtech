<script>
import {mapActions, mapMutations} from "vuex";
import i18n from "@/i18n";
import CheckService from "@/shared/services/checkService";
import Toast from "vue-toastification";

export default {
  data() {
    return {
      controlWorkNumber: null,
      loading: false,
      searchingModal: false,
      currentLocale: {},
      activeInput: 'workNumber',
      workNumber: null,
      pinfl: null,
      stir: null,
      fish: '',
      appealCount: '',
      appealDate: '',
      getUserDatas: {},
      modalVisible: false,
    }
  },
  computed: {
    nameState() {
      // if(this.createFirstInstItem.appealWorkNumber) {
      const pattern1 = /^\d+\s*-\s*\d+\s*-\s*\d+\s*\/\s*\d+$/;
      const pattern2 = /^\d+\s*\/\s*\d+\s*-\s*\d+\s*-\s*\d+$/;
      const pattern3 = /^\d+\s*-\s*\d+\s*\/\s*\d+\s*-\s*\d+$/;
      return (pattern1.test(this.workNumber) || pattern2.test(this.workNumber) || pattern3.test(this.workNumber)) ? true : false
      // }
      // else {
      //   return true
      // }
    },
    getCurrentDate() {
      const now = new Date();
      // console.log(new Date())
      // console.log(now)
      // const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // return now.toLocaleDateString(undefined, options);
      let day = now.getDate()
      let month = now.getMonth()
      let year = now.getFullYear()
      return day + ' ' + this.monthName(month) + ' ' + year
    },
    isSendButtonDisabled() {
      if (this.isWorkNumberActive) {
        return !this.workNumber.trim();
      } else if (this.isPinflActive) {
        return !this.pinfl.trim();
      } else if (this.isStirActive) {
        return !this.stir.trim();
      }
      return true; // Disable the button if neither input is active
    },
    activeInputValue() {
      return this[this.activeInput];
    }
  },
  methods: {
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    showInput(type) {
      if (type === 'workNumber') {
        this.activeInput = 'workNumber';
        this.stir = '';
        this.pinfl = '';
      } else if (type === 'stir') {
        this.activeInput = 'stir';
        this.workNumber = '';
        this.pinfl = '';
      } else if (type === 'pinfl') {
        this.activeInput = 'pinfl';
        this.workNumber = '';
        this.stir = '';
      }
    },
    sendRequest() {
      this.loading = true;
      let check = {
        workNumber: this.workNumber,
        stir: this.stir,
        pinfl: this.pinfl
      }
      this.searchLoader = true;
      return CheckService.onlineKuzatuv(check)
          .then((result) => {
            this.getUserDatas = result.data;
            // console.log(result.data)
            this.phoneNumber = '';
            this.pinfl = '';
            this.fish = '';
            this.appealCount = '';
            this.appealDate = '';
            this.searchLoader = false;
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
            // console.log(result.data)
          })
          .catch((err) => {
            this.$toast.error('Error');
            // this.catchErr(err);
          })
          .finally(() => {
            this.searchLoader = false;
            this.searchingModal = false;
            this.loading = false;
          });
    },
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  watch: {
    'workNumber': {
      handler(newVal) {
        if (newVal) {
          this.controlWorkNumber = this.nameState;
        }
      }
    },
  }
}
</script>
<template>
  <div class="row m-0">
    <b-col class="mb-2 mt-3">
      <b-button style="background: #F39138" class="btn btn-warning" size="md" @click="$router.go(-1)">
        {{ $t("actions.back") }}
      </b-button>
    </b-col>
    <div class="col-12 mt-4">
      <div class="text-center">
        <h4 class="font-weight-bold d-inline-block mb-4" style="color: #226358;">
          {{ $t('pharm_check_sms.main_title') }}
        </h4>
      </div>
      <div class="d-flex justify-content-center">
        <h4 class="p-5" style="color: #226358">
          {{ $t('online_kuzatuv.require_txt') }}
        </h4>
      </div>
      <div class="card mx-auto d-block p-3" style="border: 1px solid #226358; width: 750px">
        <div class="d-flex justify-content-between">
          <button @click="showInput('workNumber')"
                  :class="{'active-class-style': activeInput === 'workNumber', 'inactive-class-style': activeInput !== 'workNumber'}"
                  class="btn">
            {{ $t('online_kuzatuv.work_number_placeholder') }}
          </button>
          <button @click="showInput('stir')"
                  :class="{'active-class-style': activeInput === 'stir', 'inactive-class-style': activeInput !== 'stir'}"
                  class="btn">
            {{ $t('product_dashboard_info.stir') }}
          </button>
          <button @click="showInput('pinfl')"
                  :class="{'active-class-style': activeInput === 'pinfl', 'inactive-class-style': activeInput !== 'pinfl'}"
                  class="btn">
            {{ $t('services.online_checking.pinfl_placeholder') }}
          </button>
        </div>
        <b-row class="d-flex justify-content-center my-3">
<!--          <input-->
<!--              v-if="activeInput === 'workNumber'"-->
<!--              class="form-control"-->
<!--              style="width: 48%!important;"-->
<!--              v-model="workNumber"-->
<!--              placeholder="0-00-2024/00"-->
<!--          />-->
<!--          <label class="base-form-component__label" for="input-live">{{ $t('purchase_info.form1.number') }} <span style="color: red">*</span></label>-->
          <b-col cols="6" v-if="activeInput === 'workNumber'">
          <b-form-input
              v-if="activeInput === 'workNumber'"
              id="input-live"
              v-model="workNumber"
              :state="nameState"
              class=""
              placeholder="0-00-2024/00"
              trim
          ></b-form-input>
          <b-form-invalid-feedback
              id="input-live-feedback"
              v-if="activeInput === 'workNumber'"
          >
            <span v-if="workNumber">{{ $t('online_kuzatuv.errorFeedback') }}</span>
          </b-form-invalid-feedback>
          </b-col>
          <b-col cols="6" v-if="activeInput === 'stir'">
          <input
              v-if="activeInput === 'stir'"
              class="form-control"
              v-model="stir"
              maxlength="9"
              :state="nameState"
              placeholder="000 000 000"
          />
          </b-col>
          <b-col cols="6"  v-if="activeInput === 'pinfl'">
          <input
              v-if="activeInput === 'pinfl'"
              class="form-control"
              v-model="pinfl"
              maxlength="14"
              type="number"
              placeholder="00000000000000"
          />
          </b-col>
        </b-row>
        <button
            @click="sendRequest"
            :disabled="!activeInputValue"
            class="btn btn-success w-50 d-flex justify-content-center mx-auto"
            style="background-color: #226358"
        >
          {{ $t('online_kuzatuv.take_court_btn') }}
        </button>
      </div>

      <b-modal id="modal-lg" size="md" centered no-close-on-backdrop no-close-on-esc hide-header-close>
        <div class="w-100 h-50 pt-3 pb-3">
          <div class="bg-white w-100 h-100 d-flex justify-content-center p-3">
            <b-row cols="12" class="text-center">
              <b-col style="height: 0" class="text-success">
                {{ $t('pharm_check_sms.murojaat_count') }}
                <b-form-text class="font-size-17 font-weight-bold" style="color: #226358">
                  {{ getUserDatas.count ? getUserDatas.count : 0 }} ta
                </b-form-text>
              </b-col>
            </b-row>
          </div>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 d-flex justify-content-between">
            <b-button @click="modalVisible = false" class=" border">
              {{ $t('submodules.dxa.close_modal') }}
            </b-button>
            <a href="https://cabinet.fairtech.uz/" target="_blank" class="btn btn-primary ">
              {{ $t('sud_xabarnoma.take_court_btn') }}
            </a>
          </div>
        </template>
      </b-modal>


      <div class="mt-4 w-75 mx-auto p-3" style="background-color: #F3F5FA; border-radius: 8px" v-for="(item, index) in getUserDatas" :key="index">
        <b-row class="justify-content-center">
          <b-col class="text-center">
            <h2 class="text-white" style="background-color: #226358; border-radius: 8px" v-if="item && item.step2_all && item.step2_all.resultDecisionNewDto">
              {{
                getName({
                  nameLt: item.step2_all.resultDecisionNewDto.nameLt,
                  nameUz: item.step2_all.resultDecisionNewDto.nameRu,
                  nameRu: item.step2_all.resultDecisionNewDto.nameUz,
                })
              }}
            </h2>
          </b-col>
          <b-col>
          <h2 class="text-primary">Иш рақами: {{ item && item.step2_all && item.step2_all.numberOfWork }}</h2>
          <hr>
          </b-col>
        </b-row>
        <div class="justify-content-center ml-3 mr-3">
          <b-row>
            <b-col>
              <span>Ҳудуд:</span>
            </b-col>
            <b-col>
              <span>Суд номи:</span>
            </b-col>
            <b-col>
              <span>Судья:</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>
                {{
                  getName({
                    nameLt: item.regionNameLt,
                    nameUz: item.regionNameRu,
                    nameRu: item.regionNameUz,
                  })
                }}
              </p>
            </b-col>
            <b-col>
              <p> Фуқаролик ишлари бўйича Учқўрғон туманлараро суди</p>
            </b-col>
            <b-col>
              <p>КОЗИЕВ ИСЛОМЖОН ИСМОИЛОВИЧ</p>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col>
              <span>Рўйхатга олиш санаси:</span>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <span class="title">Кўриб чиқиш санаси:</span>
                </b-col>
                <b-col>
                  <span class="title">Вақти:</span>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <span>Натижа:</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>{{item.step1.createDate}}</p>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <p class="value">{{item && item.step2_all && item.step2_all.seeWorkDate}}</p>
                </b-col>
                <b-col>
                  <p class="value">{{item && item.step2_all && item.step2_all.timeEnd}}</p>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <p v-if="item && item.step2_all && item.step2_all.resultDecisionNewDto">
                {{
                  getName({
                    nameLt: item.step2_all.resultDecisionNewDto.nameLt,
                    nameUz: item.step2_all.resultDecisionNewDto.nameRu,
                    nameRu: item.step2_all.resultDecisionNewDto.nameUz,
                  })
                }}
              </p>
            </b-col>
          </b-row>


          <div class="mt-4 p-4" style="background-color: #DCE1EB; border-radius: 8px">
            <b-row>
              <b-col>
                <span>Даъвогар: </span>
              </b-col>
              <b-col>
                <span>Манфаатидан чиққан шахс: </span>
              </b-col>
              <b-col>
                <span>Жавобгар: </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p>XOJAXMEDOVA DILNOZA ORIPJONOVNA</p>
              </b-col>
              <b-col>
                <p>></p>
              </b-col>
              <b-col>
                <p>URSUNOV FAYZULLO MAHMUDJONOVICH</p>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="8">
                <span>Иш туркуми: </span>
              </b-col>
              <b-col>
                <span>Қўшимча иш туркуми: </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="8">
                <p>
                  {{
                    getName({
                      nameLt: item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameLt ? item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameLt : '---',
                      nameUz: item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameUz ? item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameUz : '---',
                      nameRu: item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameRu ? item && item.step2 && item.step2[0] && item.step2[0].terminationWorkDto && item.step2[0].terminationWorkDto.nameRu : '---',
                    })
                  }}
                </p>
              </b-col>
              <b-col>
                <p v-if="item && item.step1 && item.step1.fieldWorkDto">
                  {{
                  getName({
                    nameLt: item.step1.fieldWorkDto.nameLt ? item.step1.fieldWorkDto.nameLt : '---',
                    nameUz: item.step1.fieldWorkDto.nameUz ? item.step1.fieldWorkDto.nameUz : '---',
                    nameRu: item.step1.fieldWorkDto.nameRu ? item.step1.fieldWorkDto.nameRu : '---'
                  })
                      }}
                </p>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.header {
  width: 100%;
  height: 10%;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 8px 5px rgba(41, 105, 93, 0.20);
  justify-content: space-between;
}

.header-text {
  margin-left: 1%;
}

.header-main-text a {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 38px;
  line-height: 35px;
}

.header-sub-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 12px;
}

.language-bar {
  background-color: #E1E8E7;
  border-radius: 50%;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.language-img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}

.language-select {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 33px;
  height: 33px;
  margin-right: 0.25rem;
}

.language-select .selected-language {
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  background-color: #E1E8E7;
}

.language-select .selected-language i {
  margin-right: 10px;
}

.language-select .dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.language-select .dropdown-content a {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

.language-select .dropdown-content a i {
  margin-right: 10px;
}

.language-select .dropdown-content a:hover {
  background-color: #e4e4e4;
}

.language-select.active .dropdown-content {
  display: block;
  z-index: 2;
}

.modal-dialog {
  max-height: 150px !important;
}

.date-label {
  width: 156px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #2C665A;
  background: rgba(217, 217, 217, 0.00);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
  //display: inline-block; transition: all 0.4s;
}

.date-label span {
  background-color: #2C665A;
  display: block;
  position: absolute;
  transition: all 0.4s;
}

.date-label span:nth-child(odd) {
  width: 0;
  height: 2px;
}

.date-label span:nth-child(even) {
  width: 2px;
  height: 0;
}

.date-label span:nth-child(1) {
  left: 0;
  bottom: 0;
}

.date-label span:nth-child(2) {
  right: 0;
  bottom: 0;
}

.date-label span:nth-child(3) {
  right: 0;
  top: 0;
}

.date-label span:nth-child(4) {
  left: 0;
  top: 0;
}

.date-label:hover span:nth-child(odd) {
  width: 100%;
}

.date-label:hover span:nth-child(even) {
  height: 100%;
}

.date-label:hover {
  box-shadow: 0 2px 4px rgba(75, 0, 130, 0.2);
}

.date-text {
  color: #2C665A;
  font-family: "NoirPro-Regular", sans-serif;
  font-size: 15px;
  line-height: 36px; /* 93.333% */
}

.active-class-style {
  background-color: #2B675B !important;
  color: white !important;
  font-size: 17px;
  //width: 80%;
}

.inactive-class-style {
  background-color: #E1E8E7 !important;
  color: #2B675B !important;
  font-size: 17px;
  //width: 48%;
}
p{
  font-size: 16px;
  color: #2B675B;
}
</style>
