<script>
import Layout from "@/router/layouts/main";
import i18n from "@/i18n";
import {TokenService} from "@/shared/services/storage.service";
import ProjectMenu from "@/shared/views/auth/MainProMenu.vue";
import Toast from "vue-toastification";
import crudAndListsService from "@/shared/services/crud_and_list.service";

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
      userInfos: {},
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
      isActiveS1: false,
      isActiveS2: false,
      selectedOption: this.$t('product_dashboard_info.ariza'),
      selectedOption2: '',
      file: '',
      buttonText: this.$t('product_dashboard_info.upload_btn'),
      draftData: 'Your draft data',
      btnText: this.$t('product_dashboard_info.draft_btn'),
      loadingTableItems: false,
      inputValue: '',

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
    firstDropdown() {
      this.isActiveS1 = !this.isActiveS1
      if (this.isActiveS1) {
        // Add a click event listener to the document to close the dropdown when clicking outside
        document.addEventListener('click', this.closeDropdownOnClickOutside);
      } else {
        // Remove the click event listener when the dropdown is closed
        document.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
    secondDropdown() {
      this.isActiveS2 = !this.isActiveS2
      if (this.isActiveS2) {
        // Add a click event listener to the document to close the dropdown when clicking outside
        document.addEventListener('click', this.closeDropdownOnClickOutside2);
      } else {
        // Remove the click event listener when the dropdown is closed
        document.removeEventListener('click', this.closeDropdownOnClickOutside2);
      }
    },
    closeDropdown() {
      this.isActiveS1 = false;
      document.removeEventListener('click', this.closeDropdownOnClickOutside);
    },
    closeDropdown2() {
      this.isActiveS2 = false;
      document.removeEventListener('click', this.closeDropdownOnClickOutside2);
    },
    closeDropdownOnClickOutside(event) {
      // Check if the click event is outside the dropdown
      const dropdown = this.$el.querySelector('.dropdown-select');
      if (!dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    },
    closeDropdownOnClickOutside2(event) {
      // Check if the click event is outside the dropdown
      const dropdown = this.$el.querySelector('.select-dropdown');
      if (!dropdown.contains(event.target)) {
        this.closeDropdown2();
      }
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
    },
    selectOption(optionText) {
      this.selectedOption = optionText;
      this.closeDropdown();
    },
    selectOption2(optionText) {
      this.selectedOption2 = optionText;
      this.closeDropdown2();
    },
    isItemDisabled(itemNumber) {
      // Check if the item number is one of the last 4 items (2, 3, 4, or 5)
      return itemNumber >= 2 && itemNumber <= 5;
    },
    getUserInfo() {
      crudAndListsService.getUserInformation()
          .then((res) => {
            this.userInfos = res.data;
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
    },
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
      <div class="mt-3">
        <b-row class="p-1 font-size-20 font-weight-bold col-2 mx-auto" style="color: #236257;">
          {{ $t('product_dashboard_info.create_murojaat') }}
        </b-row>
        <div class="pt-2 p-3 mb-2" style="border: 1px solid #ccc">
          <b-row class="text-white p-1 col-2 ml-0" style="background-color: #236257; border-radius: 2px">
            {{ $t('product_dashboard_info.register_title') }}
          </b-row>
          <form class="d-flex justify-content-between ">
            <fieldset>
              <p class="font-size-15 mt-2 mb-0" style="color: #89A49D">{{ $t('product_dashboard_info.type') }} <span class="text-danger">*</span></p>
              <div>

                <div class="dropdown-select font-size-15" @click="firstDropdown" :class="{ active: isActiveS1 }">
                  <input type="text" class="textBox" id="firstDropdown" :placeholder='$t("product_dashboard_info.selectType")' readonly
                         :value="selectedOption" style="color: #236257">
                  <div class="option-select" @click.stop="">
                    <div @click="selectOption($t('product_dashboard_info.ariza'))">
                      {{ $t('product_dashboard_info.ariza') }}
                    </div>
                    <div @click="selectOption($t('product_dashboard_info.appeal'))">
                      {{ $t('product_dashboard_info.appeal') }}
                    </div>
<!--                    <div>{{ $t('product_dashboard_info.offer') }}</div>-->
                  </div>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                <BaseInputWithValidation
                    rules="required"
                    label-on-top
                    class="required font-size-15"
                    style="color: #89A49D"
                    :label="$t('product_dashboard_info.phone_number')"
                    v-model="userInfos.phoneNumber"
                >
                </BaseInputWithValidation>
                  <button type="button" class="mt-3 bg-white" style="border: none">
                    <img src="../images/edit.svg" alt="">
                  </button>
                  <button type="button" class="mt-3 bg-white" style="border: none">
                    <img src="../images/delete.svg" alt="">
                  </button>
                </div>

<!--                <input class="mr-1 cursor-pointer" type="checkbox" id="ariza" name="murojaat_turi" value="ariza">-->
<!--                <label for="ariza">{{ $t('product_dashboard_info.ariza') }}</label><br>-->
<!--                <input class="mr-1 cursor-pointer" type="checkbox" id="shikoyat" name="murojaat_turi" value="shikoyat">-->
<!--                <label for="shikoyat">{{ $t('product_dashboard_info.appeal') }}</label><br>-->
<!--                <input class="mr-1 cursor-pointer" type="checkbox" id="taklif" name="murojaat_turi" value="taklif">-->
<!--                <label for="taklif">{{ $t('product_dashboard_info.offer') }}</label>-->
              </div>
            </fieldset>
            <div class="mt-2" style="width: 260px">
              <BaseInputWithValidation
                  rules="required"
                  v-if="selectedOption === $t('product_dashboard_info.ariza')"
                  mask="##############"
                  label-on-top
                  v-model="userInfos.pinfl"
                  style="color: #89A49D"
                  class="required font-size-15 text-color"
                  :label="$t('pharm_check_sms.pinfl_placeholder')"
                  :placeholder = "'_ _ _ _ _ _ _ _ _ _ _ _ _ _'"
              >
              </BaseInputWithValidation>
              <BaseInputWithValidation
                  rules="required"
                  v-if="selectedOption === $t('product_dashboard_info.appeal')"
                  mask="#########"
                  label-on-top
                  v-model="userInfos.inn"
                  style="color: #89A49D"
                  class="required font-size-15 text-color"
                  :label="$t('product_dashboard_info.stir')"
                  :placeholder = "'_ _ _ _ _ _ _ _ _'"
              >
              </BaseInputWithValidation>

              <div class="mt-3 d-flex justify-content-between">
                <BaseInputWithValidation
                    mask="######"
                    label-on-top
                    style="color: #89A49D"
                    class="font-size-15 text-color"
                    :label="$t('product_dashboard_info.post_address')"
                    :placeholder="'_ _ _ _ _ _'"
                >
                </BaseInputWithValidation>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../images/delete.svg" alt="">
                </button>
              </div>
            </div>
            <div class="mt-2">
              <span
                  class="font-size-15"
                  style="color: #89A49D"
                  v-if="selectedOption === $t('product_dashboard_info.appeal')">
                {{$t('product_dashboard_info.murojaatchi')}}
                <span class="text-danger">*</span>
              </span>
              <span
                  class="font-size-15"
                  style="color: #89A49D"
                  v-if="selectedOption === $t('product_dashboard_info.ariza')">
                {{$t('product_dashboard_info.full_name')}}
                <span class="text-danger">*</span>
              </span>
              <b-form-text v-if="selectedOption === $t('product_dashboard_info.ariza')" class="font-size-17 font-weight-bold" style="color: #236257!important;">{{userInfos.lastName}} {{userInfos.firstName}} {{userInfos.middleName}}</b-form-text>
              <b-form-text v-if="selectedOption === $t('product_dashboard_info.appeal')" class="font-size-17 font-weight-bold" style="color: #236257!important;">---</b-form-text>
              <div v-if="selectedOption === $t('product_dashboard_info.ariza')" class="mt-3 d-flex justify-content-between">
              <b-form-group :label="$t('product_dashboard_info.address.title')" label-for="textarea" style="color: #89A49D">
                <b-form-textarea
                    id="textarea"
                    rows="2"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; width: 400px!important; color: #236257"
                ></b-form-textarea>
              </b-form-group>
                <button type="button" class="mt-3 bg-white mx-2" style="border: none">
                  <img src="../images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../images/delete.svg" alt="">
                </button>
              </div>
              <div v-if="selectedOption === $t('product_dashboard_info.appeal')" class="mt-3 d-flex justify-content-between">
              <b-form-group :label="$t('product_dashboard_info.yuridik_address')" label-for="textarea" style="color: #89A49D">
                <b-form-textarea
                    :value="userInfos.birthPlace + userInfos.perAdress"
                    id="textarea"
                    rows="2"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; width: 400px!important; color: #236257"
                ></b-form-textarea>
              </b-form-group>
                <button type="button" class="mt-3 bg-white mx-2" style="border: none">
                  <img src="../images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../images/delete.svg" alt="">
                </button>
              </div>
            </div>
          </form>
        </div >

        <div class="mb-3 pt-2 p-3" style="border: 1px solid #cccccc">
          <b-row class="text-white p-1 col-2 ml-0" style="background-color: #236257; border-radius: 2px">
            {{ $t('product_dashboard_info.murojaat_description') }}
          </b-row>
          <fieldset>
<!--            <p class="font-size-17 mt-2 mb-0">{{ $t('product_dashboard_info.murojaat_view') }}</p>-->
            <div>
              <div class="select-dropdown font-size-15 my-3" @click="secondDropdown" :class="{ active: isActiveS2 }">
                <input type="text" class="boxText font-weight-bold" id="secondDropdown" :placeholder='$t("product_dashboard_info.murojaat_select")' readonly
                       :value="selectedOption2" style="color: #236257">
                <div class="select-option" @click.stop="">
                  <div @click="selectOption2($t('product_dashboard_info.item1'))">{{ $t('product_dashboard_info.item1') }}</div>
                  <div @click="selectOption2($t('product_dashboard_info.item2'))" :class="{ 'disabled-option': isItemDisabled(2) }">{{ $t('product_dashboard_info.item2') }}</div>
                  <div @click="selectOption2($t('product_dashboard_info.item3'))" :class="{ 'disabled-option': isItemDisabled(3) }">{{ $t('product_dashboard_info.item3') }}</div>
                  <div @click="selectOption2($t('product_dashboard_info.item4'))" :class="{ 'disabled-option': isItemDisabled(4) }">{{ $t('product_dashboard_info.item4') }}</div>
                  <div @click="selectOption2($t('product_dashboard_info.item5'))" :class="{ 'disabled-option': isItemDisabled(5) }">{{ $t('product_dashboard_info.item5') }}</div>
                </div>
              </div>
<!--              <div class="d-flex justify-content-between w-50 mb-3">-->
<!--                <div class="form-check">-->
<!--                              <input-->
<!--                                  class="mr-1 cursor-pointer form-check-input"-->
<!--                                  type="checkbox"-->
<!--                                  id="chakana">-->
<!--                              <label for="chakana" class="form-check-label font-size-17 ml-1" style="color: #236257">{{ $t('product_dashboard_info.chakana') }}</label>-->
<!--                  <span class="text-danger">*</span>-->
<!--                </div>-->
<!--                <div class="form-check">-->
<!--                              <input-->
<!--                                  class="mr-1 cursor-pointer form-check-input"-->
<!--                                  type="checkbox"-->
<!--                                  id="ulgurji">-->
<!--                              <label for="ulgurji" class="form-check-label font-size-17 ml-1" style="color: #236257">{{ $t('product_dashboard_info.ulgurji') }}</label>-->
<!--                  <span class="text-danger">*</span>-->
<!--                </div>-->
<!--              </div>-->
              <b-form-group :label="$t('product_dashboard_info.shortDescription')" label-for="textarea" style="color: #89A49D">
                <b-form-textarea
                    id="textarea"
                    rows="9"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; color: #236257"
                ></b-form-textarea>
              </b-form-group>
              </div>
          </fieldset>
          <b-row>
            <div class="col">
              <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none"/>
              <button class="btn btnUpload font-size-15" @click="triggerFileInput">{{ buttonText }}</button>
              <span class="ml-2" v-if="file">{{ file.name }}</span>
            </div>
          </b-row>
          <b-row class="mt-3">
            <div class="col">
              <button class="btn text-white font-size-15" style="width: 200px; background-color: #F39138" @click="saveDraft">{{ btnText }}</button>
            </div>
            <b-button
                :disabled="!userInfos.pinfl && !userInfos.phoneNumber || loadingTableItems"
                @click="getInfos"
                variant="outline-primary"
                id="contractorSearchButton"
                class="btn mr-2 font-size-15"
                style="padding: 7.5px 10px; background-color: #225F55; width: 200px;"
            >
              <b-spinner v-if="loadingTableItems" type="border" small></b-spinner>
              <span class="text-white ml-2">{{ $t('product_dashboard_info.send_btn') }}</span>
            </b-button>
          </b-row>
        </div>
<!--        <b-row class="col">-->
<!--          <fieldset>-->
<!--            <p class="font-size-17 mt-2 mb-0">{{ $t('product_dashboard_info.murojaat_view') }}</p>-->
<!--            <div>-->


<!--              <div class="dropdown-select font-size-15" @click="secondDropdown" :class="{ active: isActiveS2 }">-->
<!--                <input type="text" class="textBox" id="secondDropdown" :placeholder="'Murojaat ko`rinishini tanlash'" readonly-->
<!--                       :value="selectedOption">-->
<!--                <div class="option-select">-->
<!--                  <div>{{ $t('product_dashboard_info.standart') }}</div>-->
<!--                  <div>{{ $t('product_dashboard_info.review') }}</div>-->
<!--                </div>-->
<!--              </div>-->

<!--              &lt;!&ndash;                <input class="mr-1 cursor-pointer" type="checkbox" id="standart_murojaat" name="murojaat_korinishi"&ndash;&gt;-->
<!--              &lt;!&ndash;                       value="standart_murojaat">&ndash;&gt;-->
<!--              &lt;!&ndash;                <label for="standart_murojaat">{{ $t('product_dashboard_info.standart') }}</label><br>&ndash;&gt;-->
<!--              &lt;!&ndash;                <input class="mr-1 cursor-pointer" type="checkbox" id="qayta_korib_chiqish_uchun"&ndash;&gt;-->
<!--              &lt;!&ndash;                       name="murojaat_korinishi" value="qayta_korib_chiqish_uchun">&ndash;&gt;-->
<!--              &lt;!&ndash;                <label for="qayta_korib_chiqish_uchun">{{ $t('product_dashboard_info.review') }}</label><br>&ndash;&gt;-->
<!--              &lt;!&ndash;                <input class="mr-1 cursor-pointer" type="checkbox" id="other" name="murojaa_korinishi" value="other">&ndash;&gt;-->
<!--              &lt;!&ndash;                <label for="other">&#45;&#45;&#45;&#45;</label>&ndash;&gt;-->
<!--            </div>-->
<!--          </fieldset>-->
<!--          <div class="col">-->
<!--            <label for="dropdown1">{{ $t('product_dashboard_info.address.region') }}</label>-->
<!--            <div class="dropdown-select font-size-15" @click="toggleDropdown1" :class="{ active: isActive1 }">-->
<!--              <input type="text" class="textBox" id="dropdown1" :placeholder="regionPlaceholder" readonly-->
<!--                     :value="selectedOption">-->
<!--              <div class="option-select">-->
<!--                <div>Andijon</div>-->
<!--                <div>Buxoro</div>-->
<!--                <div>Farg`ona</div>-->
<!--                <div>Jizzax</div>-->
<!--                <div>Xorazm</div>-->
<!--                <div>Namangan</div>-->
<!--                <div>Navoiy</div>-->
<!--                <div>Qashqadaryo</div>-->
<!--                <div>Qoraqalpog`iston Respublikasi</div>-->
<!--                <div>Samarqand</div>-->
<!--                <div>Sirdaryo</div>-->
<!--                <div>Surxondaryo</div>-->
<!--                <div>Toshkent.sh</div>-->
<!--                <div>Toshkent.vil</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col">-->
<!--            <label for="dropdown2">{{ $t('product_dashboard_info.address.district') }}</label>-->
<!--            <div class="dropdown-select font-size-15" @click="toggleDropdown2" :class="{ active: isActive2 }">-->
<!--              <input type="text" class="textBox" id="dropdown2" :placeholder="districtPlaceholder" readonly-->
<!--                     :value="selectedOption">-->
<!--              <div class="option-select">-->
<!--                <div>Bektemir tumani</div>-->
<!--                <div>Mirobod tumani</div>-->
<!--                <div>Mirzo Ulug‘bek tumani</div>-->
<!--                <div>Sergeli tumani</div>-->
<!--                <div>Olmazor tumani</div>-->
<!--                <div>Uchtepa tumani</div>-->
<!--                <div>Shayxontohur tumani</div>-->
<!--                <div>Yashnobod tumani</div>-->
<!--                <div>Chilonzor tumani</div>-->
<!--                <div>Yunusobod tumani</div>-->
<!--                <div>Yakkasaroy tumani</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col">-->
<!--            <label for="dropdown3">{{ $t('product_dashboard_info.murojaat_type') }}</label>-->
<!--            <div class="dropdown-select font-size-15" @click="toggleDropdown3" :class="{ active: isActive3 }">-->
<!--              <input type="text" class="textBox" id="dropdown3" :placeholder="typePlaceholder" readonly-->
<!--                     :value="selectedOption">-->
<!--              <div class="option-select">-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--                <div>Toshkent</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-row>-->
<!--        <b-row class="col my-4">-->
<!--          <div class="col">-->
<!--            <BaseInputWithValidation-->
<!--                rules="required"-->
<!--                mask="##############"-->
<!--                label-on-top-->
<!--                class="required font-size-15 text-color"-->
<!--                :label="$t('product_dashboard_info.full_name')"-->
<!--            >-->
<!--            </BaseInputWithValidation>-->
<!--          </div>-->
<!--          <div class="col">-->
<!--            <BaseInputWithValidation-->
<!--                rules="required"-->
<!--                mask="##############"-->
<!--                label-on-top-->
<!--                class="required font-size-15 text-color"-->
<!--                :label="$t('product_dashboard_info.phone_number')"-->
<!--            >-->
<!--            </BaseInputWithValidation>-->
<!--          </div>-->
<!--          <div class="col">-->
<!--            <BaseInputWithValidation-->
<!--                rules="required"-->
<!--                mask="##############"-->
<!--                label-on-top-->
<!--                class="required font-size-15 text-color"-->
<!--                :label="$t('product_dashboard_info.post_address')"-->
<!--            >-->
<!--            </BaseInputWithValidation>-->
<!--          </div>-->
<!--        </b-row>-->
<!--        <b-row class="col">-->
<!--          <div class="col">-->
<!--            <BaseInputWithValidation-->
<!--                rules="required"-->
<!--                mask="##############"-->
<!--                label-on-top-->
<!--                class="required font-size-15 text-color"-->
<!--                :label="$t('product_dashboard_info.street_address')"-->
<!--            >-->
<!--            </BaseInputWithValidation>-->
<!--          </div>-->
<!--        </b-row>-->
<!--        <b-row class="col my-4">-->
<!--          <div class="col">-->
<!--            <label for="textarea-no-resize">{{$t('product_dashboard_info.more_info')}}</label>-->
<!--            <b-form-textarea-->
<!--                id="textarea-no-resize"-->
<!--                rows="7"-->
<!--                no-resize-->
<!--            ></b-form-textarea>-->
<!--          </div>-->
<!--        </b-row>-->

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
  width: 260px;
  border-radius: 4px;
  border: 1px solid #427067;
  color: #34665A;
  z-index: 100;
//margin-left: 27px;
}
.select-dropdown {
  position: relative;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #427067;
  color: #34665A;
  z-index: 100;
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
  z-index: 100;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(-45deg);
  transition: 0.5s;
  pointer-events: none;
}
.select-dropdown::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid #427067;
  right: 20px;
  top: 10px;
  z-index: 100;
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
.select-dropdown.active::before {
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
.select-dropdown input {
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
.select-dropdown .select-option {
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
.select-dropdown.active .select-option {
  display: block;
}

.dropdown-select .option-select div {
  padding: 6px 20px;
  cursor: pointer;
}
.select-dropdown .select-option div {
  padding: 6px 20px;
  cursor: pointer;
}

.dropdown-select .option-select div:hover {
  background-color: #2B675B;
  color: #fff;
}
.select-dropdown .select-option div:hover {
  background-color: #2B675B;
  color: #fff;
}

.textBox::placeholder {
  text-align: center;
  color: #427067;
}
.boxText::placeholder {
  text-align: center;
  color: #427067;
}
.btnUpload {
  background-color: #7A9690;
  color: white;
  border-radius: 5px;
  width: 200px;
}
.disabled-option {
  color: #ccc; /* Change the text color to a light gray for disabled options */
  background-color: #f0f0f0; /* Change the background color to a light gray */
  cursor: not-allowed; /* Change the cursor to indicate that the option is not clickable */
  pointer-events: none; /* Prevent clicking on disabled options */
}
</style>
