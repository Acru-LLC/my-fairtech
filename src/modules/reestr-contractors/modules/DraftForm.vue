<script>
import Layout from "@/router/layouts/main";
import i18n from "@/i18n";
import {TokenService} from "@/shared/services/storage.service";
import ProjectMenu from "@/shared/views/auth/MainProMenu.vue";
import Toast from "vue-toastification";

// const MAIN_API_URL = 'report/dashboard'

/**
 * Dashboard Component
 */
export default {
  components: {
    Layout

  },
  data() {
    return {
      userId: TokenService.getUserId(),
      userInfos: [],
      counts: [],
      searchValue: "",
      page: 1,
      limit: 100,
      selectedAppStatus: "SEND_TO_REGION",
      countsByRegion: [],
      arr: [],
      isOpen: false,
      title: i18n.t('submodules.ad_passport_info.title'),
      regionPlaceholder: this.$t('product_dashboard_info.region_placeholder'),
      districtPlaceholder: this.$t('product_dashboard_info.district_placeholder'),
      typePlaceholder: this.$t('product_dashboard_info.select_type'),
      isActive1: false,
      isActive2: false,
      isActive3: false,
      selectedOption: '',
      file: '',
      buttonText: this.$t('product_dashboard_info.upload_btn'),
      draftData: 'Your draft data',
      btnText: this.$t('product_dashboard_info.draft_btn'),
      loadingTableItems: false,

      // items: [
      //   {
      //     text: "Dashboard",
      //     href: "/",
      //   },
      //   {
      //     text: i18n.t('submodules.ad_passport_info.title'),
      //     active: true,
      //   },
      // ],
    };
  },
  /*
COMPUTED */
  computed: {
    // current_project() {
    //     return JSON.parse(localStorage.getItem('current_project')) ? JSON.parse(localStorage.getItem('current_project')) : null
    // },
    result() {
      return (TokenService.getCurrentProject('fair_tech')
          || TokenService.getCurrentProject('fair_price')
          || TokenService.getCurrentProject('pharm_info')
          || TokenService.getCurrentProject('product_info')
          || TokenService.getCurrentProject('integration')
          || TokenService.getCurrentProject('alcohol')) ? true : false
    },
    params() {
      return {
        params: {
          // itemsPerPage: this.limit,
          // page: this.page - 1,
          groupBy: [],
          groupDesc: [],
          itemsPerPage: 1,
          keyword: "",
          multiSort: true,
          mustSort: false,
          page: 0,
          sortBy: [],
          sortDesc: [],
        },
        search: this.searchValue,
        status: this.selectedAppStatus,
      };
    }
  },

  /*
  METHODS */
  methods: {
    toggleDropdown1() {
      this.isActive1 = !this.isActive1;
    },
    toggleDropdown2() {
      this.isActive2 = !this.isActive2;
    },
    toggleDropdown3() {
      this.isActive3 = !this.isActive3;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.submitFile();
    },
    submitFile() {
      // Here you can write the logic to send the file to the server
      // console.log(this.file);
    },
    saveDraft() {
      localStorage.setItem('draft', this.draftData);
      this.$toast.success('Draft saved!', {
        position: "top-right"
      });
    }
  },
  mounted() {

  },

  created() {

  },
}
</script>

<template>
  <div>
    <Layout >
      <div class="mt-5">
        <b-row class="text-white p-1 col-3" style="background-color: #236257; border-radius: 2px">
          {{ $t('product_dashboard_info.register_title') }}
        </b-row>
        <div class="mt-3 col-6">
          <form class="d-flex">
            <fieldset>
              <legend>{{ $t('product_dashboard_info.type') }}</legend>
              <div style="margin-left: 10px">
                <input class="mr-1 cursor-pointer" type="checkbox" id="ariza" name="murojaat_turi" value="ariza">
                <label for="ariza">{{ $t('product_dashboard_info.ariza') }}</label><br>
                <input class="mr-1 cursor-pointer" type="checkbox" id="shikoyat" name="murojaat_turi" value="shikoyat">
                <label for="shikoyat">{{ $t('product_dashboard_info.appeal') }}</label><br>
                <input class="mr-1 cursor-pointer" type="checkbox" id="taklif" name="murojaat_turi" value="taklif">
                <label for="taklif">{{ $t('product_dashboard_info.offer') }}</label>
              </div>
            </fieldset>
            <b-col cols="4"></b-col>
            <fieldset>
              <legend>{{ $t('product_dashboard_info.murojaat_view') }}</legend>
              <div style="margin-left: 10px">
                <input class="mr-1 cursor-pointer" type="checkbox" id="standart_murojaat" name="murojaat_korinishi"
                       value="standart_murojaat">
                <label for="standart_murojaat">{{ $t('product_dashboard_info.standart') }}</label><br>
                <input class="mr-1 cursor-pointer" type="checkbox" id="qayta_korib_chiqish_uchun"
                       name="murojaat_korinishi" value="qayta_korib_chiqish_uchun">
                <label for="qayta_korib_chiqish_uchun">{{ $t('product_dashboard_info.review') }}</label><br>
                <input class="mr-1 cursor-pointer" type="checkbox" id="other" name="murojaa_korinishi" value="other">
                <label for="other">----</label>
              </div>
            </fieldset>
          </form>

        </div>
        <div class="mt-3 mb-3 col-6 font-size-15">{{ $t('product_dashboard_info.address.title') }}</div>
        <b-row class="col">
          <div class="col">
            <label for="dropdown1">{{ $t('product_dashboard_info.address.region') }}</label>
            <div class="dropdown-select font-size-15" @click="toggleDropdown1" :class="{ active: isActive1 }">
              <input type="text" class="textBox" id="dropdown1" :placeholder="regionPlaceholder" readonly
                     :value="selectedOption">
              <div class="option-select">
                <div>Andijon</div>
                <div>Buxoro</div>
                <div>Farg`ona</div>
                <div>Jizzax</div>
                <div>Xorazm</div>
                <div>Namangan</div>
                <div>Navoiy</div>
                <div>Qashqadaryo</div>
                <div>Qoraqalpog`iston Respublikasi</div>
                <div>Samarqand</div>
                <div>Sirdaryo</div>
                <div>Surxondaryo</div>
                <div>Toshkent.sh</div>
                <div>Toshkent.vil</div>
              </div>
            </div>
          </div>
          <div class="col">
            <label for="dropdown2">{{ $t('product_dashboard_info.address.district') }}</label>
            <div class="dropdown-select font-size-15" @click="toggleDropdown2" :class="{ active: isActive2 }">
              <input type="text" class="textBox" id="dropdown2" :placeholder="districtPlaceholder" readonly
                     :value="selectedOption">
              <div class="option-select">
                <div>Bektemir tumani</div>
                <div>Mirobod tumani</div>
                <div>Mirzo Ulug‘bek tumani</div>
                <div>Sergeli tumani</div>
                <div>Olmazor tumani</div>
                <div>Uchtepa tumani</div>
                <div>Shayxontohur tumani</div>
                <div>Yashnobod tumani</div>
                <div>Chilonzor tumani</div>
                <div>Yunusobod tumani</div>
                <div>Yakkasaroy tumani</div>
              </div>
            </div>
          </div>
          <div class="col">
            <label for="dropdown3">{{ $t('product_dashboard_info.murojaat_type') }}</label>
            <div class="dropdown-select font-size-15" @click="toggleDropdown3" :class="{ active: isActive3 }">
              <input type="text" class="textBox" id="dropdown3" :placeholder="typePlaceholder" readonly
                     :value="selectedOption">
              <div class="option-select">
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
                <div>Toshkent</div>
              </div>
            </div>
          </div>
        </b-row>
        <b-row class="col my-4">
          <div class="col">
            <BaseInputWithValidation
                rules="required"
                mask="##############"
                label-on-top
                class="required font-size-15 text-color"
                :label="$t('product_dashboard_info.full_name')"
            >
            </BaseInputWithValidation>
          </div>
          <div class="col">
            <BaseInputWithValidation
                rules="required"
                mask="##############"
                label-on-top
                class="required font-size-15 text-color"
                :label="$t('product_dashboard_info.phone_number')"
            >
            </BaseInputWithValidation>
          </div>
          <div class="col">
            <BaseInputWithValidation
                rules="required"
                mask="##############"
                label-on-top
                class="required font-size-15 text-color"
                :label="$t('product_dashboard_info.post_address')"
            >
            </BaseInputWithValidation>
          </div>
        </b-row>
        <b-row class="col">
          <div class="col">
            <BaseInputWithValidation
                rules="required"
                mask="##############"
                label-on-top
                class="required font-size-15 text-color"
                :label="$t('product_dashboard_info.street_address')"
            >
            </BaseInputWithValidation>
          </div>
        </b-row>
        <b-row class="col my-4">
          <div class="col">
            <label for="textarea-no-resize">{{$t('product_dashboard_info.more_info')}}</label>
            <b-form-textarea
                id="textarea-no-resize"
                rows="7"
                no-resize
            ></b-form-textarea>
          </div>
        </b-row>
        <b-row class="col">
          <div class="col">
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none"/>
            <button class="btn btnUpload font-size-15" @click="triggerFileInput">{{ buttonText }}</button>
            <span class="ml-2" v-if="file">{{ file.name }}</span>
          </div>
        </b-row>
        <b-row class="col mt-3">
          <div class="col">
            <button class="btn text-white font-size-15" style="width: 200px; background-color: #F39138" @click="saveDraft">{{ btnText }}</button>
          </div>
          <b-button
              :disabled="!pinflBtn || loadingTableItems"
              @click="getInfos"
              variant="outline-primary"
              id="contractorSearchButton"
              class="btn mt-3 mb-3"
              style="padding: 2.5px 10px; font-size: 1.2rem; background-color: #225F55; width: 200px;"
          >
            <b-spinner v-if="loadingTableItems" type="border" small></b-spinner>
            <span class="text-white ml-2">{{ $t('product_dashboard_info.send_btn') }}</span>
          </b-button>
        </b-row>
        <b-row>

        </b-row>
      </div>

    </Layout>
    <!--    <ProjectMenu-->
    <!--        v-else-->
    <!--        @isLoginBtn="isLoginBtn"-->
    <!--    ></ProjectMenu>-->
  </div>
</template>

<style scoped lang="css">
.dropdown-select {
  position: relative;
  height: 40px;
  width: 500px;
  border-radius: 4px;
  border: 1px solid #427067;
  color: #34665A;
  z-index: 10000;
//margin-left: 27px;
}

.dropdown-select::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid #427067;
  right: 20px;
  top: 10px;
  z-index: 10000;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(-45deg);
  transition: 0.5s;
  pointer-events: none;
}

.dropdown-select.active::before {
  top: 15px;
  transform: rotate(-225deg);
}

.dropdown-select input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 12px 20px;
  border-radius: 10px;
}

.dropdown-select .option-select {
  position: absolute;
  top: 38px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  display: none;
  border: 1px solid #427067;
}

.dropdown-select.active .option-select {
  display: block;
}

.dropdown-select .option-select div {
  padding: 6px 20px;
  cursor: pointer;
}

.dropdown-select .option-select div:hover {
  background-color: #2B675B;
  color: #fff;
}

.textBox::placeholder {
  text-align: center;
  color: #427067;
}
.btnUpload {
  background-color: #7A9690;
  color: white;
  border-radius: 5px;
  width: 200px;
}
</style>
