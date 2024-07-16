<script>
import {mapActions, mapMutations} from "vuex";
import i18n from "@/i18n";
import CheckService from "@/shared/services/checkService";
import Toast from "vue-toastification";

export default {
  data() {
    return {
      loading: false,
      searchingModal: false,
      currentLocale: {},
      isTelefonActive: true,
      isJshshirActive: false,
      telefonInput: null,
      jshshirInput: null,
      fish: '',
      appealCount: '',
      appealDate: '',
      getUserDatas:{},
      modalVisible: false,
    }
  },
  computed: {
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
      if (this.isTelefonActive) {
        return !this.telefonInput.trim();
      } else if (this.isJshshirActive) {
        return !this.jshshirInput.trim();
      }
      return true; // Disable the button if neither input is active
    },
  },
  methods: {
    ...mapActions(['setCount']),
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),

    showInput(type) {
      if (type === 'phoneNumber') {
        this.isTelefonActive = true;
        this.isJshshirActive = false;
        this.jshshirInput = '';
      } else if (type === 'pinfl') {
        this.isTelefonActive = false;
        this.isJshshirActive = true;
        this.telefonInput = '';
      }
    },
    sendRequest() {
      this.loading = true;
      let check = {
        stir:this.telefonInput,
        pinfl:this.jshshirInput,
        fish: this.fish,
        appealCount: this.appealCount,
        appealDate: this.appealDate
      }
      this.searchLoader = true;
      return CheckService.courtCheckOnline(check)
          .then((result)=>{
            this.getUserDatas = result.data;
            console.log(result.data)
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
            ){
              this.$toast.success(this.$t('statistics_info.download_success'));
              this.modalVisible = true;
            }
            else{
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
          {{ $t('sud_xabarnoma.require_txt') }}
        </h4>
      </div>
      <div class="card mx-auto d-block p-3" style="border: 1px solid #226358; width: 560px">
        <div class="d-flex justify-content-between">
          <button @click="showInput('phoneNumber')" :class="{'active-class-style': isTelefonActive, 'inactive-class-style': !isTelefonActive}" class="btn ">{{$t('column.individual')}}</button>
          <button @click="showInput('pinfl')" :class="{'active-class-style': isJshshirActive, 'inactive-class-style': !isJshshirActive}" class="btn">{{$t('column.legal_entity')}}</button>
        </div>
        <div class="d-flex justify-content-center my-3">
          <input v-if="isJshshirActive" class="form-control" style="width: 48%!important;" v-model="telefonInput" v-mask="'### ### ###'" :placeholder="$t('bojxona_info.stir')"/>
          <input v-if="isTelefonActive" class="form-control" style="width: 48%!important;" v-model="jshshirInput" v-mask="'##############'" :placeholder="$t('pharm_check_sms.pinfl_placeholder')"/>
        </div>
        <button @click="sendRequest" :disabled="!telefonInput && !jshshirInput" class="btn btn-success w-50 d-flex justify-content-center mx-auto" style="background-color: #226358">{{ $t('pharm_check_sms.check_btn') }}</button>
      </div>
      <b-modal id="modal-lg" size="md" v-model="modalVisible" centered>
        <div class="w-100 h-50 pt-3 pb-3">
          <div class="bg-white w-100 h-100 d-flex justify-content-center p-3">
            <b-row cols="12" class="text-center">
              <b-col style="height: 0" class="text-success">
                {{ $t('pharm_check_sms.murojaat_count') }}
                <b-form-text class="font-size-17 font-weight-bold" style="color: #226358">
                  {{ getUserDatas ? getUserDatas : 0 }} ta
                </b-form-text>
              </b-col>
            </b-row>
          </div>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 d-flex justify-content-between">
            <b-button @click="modalVisible = false" class="inactive-class-style border">
              {{ $t('submodules.dxa.close_modal') }}
            </b-button>
            <a href="https://cabinet.fairtech.uz/" target="_blank" class="btn btn-primary active-class-style">
              {{ $t('sud_xabarnoma.take_court_btn') }}
            </a>
          </div>
        </template>
      </b-modal>
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

.modal-dialog{
  max-height: 150px!important;
}
.modal-content{
  height: 200px;
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
  width: 48%;
}
.inactive-class-style {
  background-color: #E1E8E7 !important;
  color: #2B675B !important;
  font-size: 17px;
  width: 48%;
}
</style>
