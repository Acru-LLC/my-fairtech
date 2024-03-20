<script>
import i18n from "@/i18n";
import {TokenService} from "@/shared/services/storage.service";
import Toast from "vue-toastification";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import BaseInputWithValidation from "@/components/base/BaseInputWithValidation.vue";
import integratsiyaService from "@/shared/services/integratsiya.service";
import Navbar from "@/components/navbar.vue";

// const MAIN_API_URL = 'report/dashboard'

/**
 * Dashboard Component
 */
export default {
  components: {
    // Navbar,
    BaseInputWithValidation,

  },
  watch: {
    'stir':{
      handler(vm){
        if(vm.length == 9){
          // console.log(vm);
          this.findContractorByInn(vm)
        }
      }
    }
  },
  data() {
    return {
      addressSubject: null,
      nameSubject: null,
      offerta: false,
      soliqItems: null,
      loadingStirItems: false,
      stir: null,
      searchingModal: false,
      createItem: {
        files: [],
        documentTypeIds: [],
      },
      fileAdd: [], // Placeholder for response data
      types: [
        { id: 1, nameLt: 'Default Option 1' },
        { id: 2, nameLt: 'Default Option 2' },
        { id: 3, nameLt: 'Default Option 3' },
      ],
      documentTypeIds: [],
      images: [],
      uploadFiles:false,
      userId: TokenService.getUserId(),
      appealList: [],
      userInfos: {
        phoneNumber: null,
        pinfl: null,
        middleName: null,
        lastName: null,
        firstName: null,
        perAdress: null,
        inn: null
      },
      zipeKod:'',
      keyword: 'my-fairtech-appeal',
      appeal_file:[],
      // appeal_file_list:[],
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
      sender: "web",
      selectedId: '',
      selectedOption: this.$t('product_dashboard_info.ariza'),
      selectedOption2: '',
      file: '',
      buttonText: this.$t('product_dashboard_info.upload_btn'),
      draftData: 'Your draft data',
      btnText: this.$t('product_dashboard_info.draft_btn'),
      loadingTableItems: false,
      inputValue: '',
      formData: {
        applier_type: '',
        applier_jshshir: null,
        applier_fullname: '',
        applier_zipcode: null,
        applier_address: '',
        appeal_type: '',
        appeal_subtype: '',
        appeal_description: '',
        org_tin: null,
        org_name: '',
        org_phone: '',
        org_email: '',
        org_address: '',
      },
      appeal_description: '',

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
          itemsPerPage: this.limit,
          page: this.page - 1,
        },
        search: this.searchValue,
        // status: this.activeStatus,
      };
    },
    computedObserver () {
      return this.$refs.observer
    },
  },
  /*
  METHODS */
  methods: {
    findContractorByInn() {
      this.soliqItems = null
      this.loadingStirItems = true
      if (this.stir) {
        this.loadingStirItems = true
        integratsiyaService.getSoliqQomitasiInfoByInn("" + this.stir + "", true)
            .then(res => {
              this.nameSubject = res.data.fullName
              this.nameHeadSubject = res.data.director
              this.addressSubject = res.data.address
              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
              this.loadingStirItems = false
            })
            .catch(e => {
              this.loadingStirItems = false
              // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
            })
      } else {
        this.loadingStirItems = false
        this.$toast(this.$t('validator.inn'), {type: 'error'});
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }

    },
    openModal() {
      this.searchingModal = true;
    },
    addSingleFile() {
      // Placeholder method for adding a single file
      console.log('Add Single File');
    },
    saveFiles() {
      // Placeholder method for saving files
      console.log('Save Files');
    },
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
      return itemNumber >= 2 && itemNumber <= 6;
    },
    getAppealType() {
      crudAndListsService.getAppealType( {params: this.params})
          .then((res) => {
            // console.log(this.appealList)
            this.appealList = res.data.list;
            // console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
    },
    async getTypes() {
      this.var_default_search_payload.itemsPerPage = 500
      await crudAndListsService.getListDocType('PRODUCT', this.documentTypeIds, this.var_default_search_payload)
          .then(res => {
            this.types = res.data.list
            // console.log(this.types)
          })
          .catch(e => {
            console.log(e)
          })
    },


    // handleFileChange(event) {
      // let files = event.target.files || event.dataTransfer.files;
      // if (!files.length) return;
      // this.createFiles(files);
      // this.appeal_file.push(files);

      // console.log(this.appeal_file[0]);
      // console.log(Object.values(this.appeal_file));
      // console.log(event.target);
      // this.formData.appeal_file = event.target.files[0].name;
      // this.submitFile();

    // },

    // createFiles(files) {
      // for (let index = 0; index < files.length; index++) {
        // console.log(files)
        // this.appeal_file.push(files[index]);

        // this.appeal_file_list.push(files[index].name);
        // console.log(this.appeal_file);

        // console.log(this.appeal_file);
        // let reader = new FileReader();
        // reader.onload = function(event) {
        //   const fileName = event.target.result;
        //   vm.formData.appeal_file.push(fileName);
          // console.log(event);
        // }
        // reader.readAsDataURL(files[index]);
      // }
    // },

    sendAppeal(){
      let bodyFormData = new FormData();

      bodyFormData.append("applier_type", this.selectedOption);
      bodyFormData.append("applier_jshshir", this.userInfos.pinfl);
      bodyFormData.append("applier_fullname", this.userInfos.lastName + " " + this.userInfos.firstName + " " + this.userInfos.middleName);
      bodyFormData.append("applier_zipcode", this.zipeKod);
      bodyFormData.append("sender", this.sender)
      bodyFormData.append("stir", this.stir)
      bodyFormData.append("subjectName", this.nameSubject)
      bodyFormData.append("addressSubject", this.addressSubject)
      bodyFormData.append("checkbox", this.offerta)
      if (this.userInfos.phoneNumber.startsWith("+")){
        bodyFormData.append("applier_phone", this.userInfos.phoneNumber.slice(4));
      }
      else if (this.userInfos.phoneNumber.length===12){
        bodyFormData.append("applier_phone", this.userInfos.phoneNumber.slice(3));
      }
      else if (this.userInfos.phoneNumber.startsWith("+998")){
        bodyFormData.append("applier_phone", this.userInfos.phoneNumber.slice(4));
      }
      else{
        bodyFormData.append("applier_phone", this.userInfos.phoneNumber);
      }
      bodyFormData.append("applier_address", this.userInfos.perAdress);
      bodyFormData.append("appealType_id", this.selectedId);
      bodyFormData.append("documentTypeIds", this.documentTypeIds)
      bodyFormData.append("appeal_description", this.appeal_description);
      this.appeal_file.forEach(f => { bodyFormData.append("appeal_file", f.file ) })
      this.$toast.success(this.$t('messages.send_successfully'), {position: "top-right"});


      crudAndListsService.sendAppeal(bodyFormData)
          .then((res) => {

            this.stir = '',
            this.nameSubject = '',
            this.addressSubject = '',
            this.offerta = '',
            this.sender = ''
            this.zipeKod = '',
            this.selectedId = '',
            this.documentTypeIds = '',
            this.appeal_description = '',
            this.appeal_file = [];

            // this.$refs.appealFileUpload.removeAllFiles();
            this.$refs.appealFileUpload.removeAll();
            this.$toast.success(this.$t('messages.send_successfully'), {position: "top-right"});
          })
          .catch((err) => {
            console.log(err)
          })
    },


    // removeImage(index) {
    //   this.appeal_file.splice(index, 1)
    //   this.appeal_file_list.splice(index, 1)
    // }
    // async submitAppealForm() {
    //   try {
    //     const response = await crudAndListsService.sendAppeal(this.formData);
    //     // Handle the response as needed
    //     console.log('Response:', response.data);
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error:', error);
    //   }
    // },
  },
  mounted() {
    // this.getAppealType()
    // this.getTypes()
  },
  created() {
    this.getTypes()
    this.getAppealType()
  }
}
</script>

<template>
  <div>
<!--    <Navbar class="green-gradient-bg"/>-->
      <div class="mt-3">
        <b-row class="p-1 font-size-20 font-weight-bold col-2 mx-auto" style="color: #236257;">
          {{ $t('product_dashboard_info.create_murojaat') }}
        </b-row>
        <b-col class="mb-2 mt-3">
          <b-button style="background: #F39138" class="btn btn-warning" size="md" @click="$router.go(-1)">
            {{ $t("actions.back") }}
          </b-button>
        </b-col>
        <div class="pt-2 p-3 mb-2" style="border: 1px solid #ccc">
          <b-row class="text-white p-1 col-2 ml-0" style="background-color: #236257; border-radius: 2px">
            {{ $t('product_dashboard_info.register_title') }}
          </b-row>
          <form class="d-flex justify-content-between ">
            <fieldset>
              <p class="font-size-15 mt-2 mb-0" style="color: #89A49D">{{ $t('product_dashboard_info.type') }} <span class="text-danger">*</span></p>
              <div>

                <div class="dropdown-select font-size-15"  :class="{ active: isActiveS1 }">    <!-- @click="firstDropdown"   -->
                  <input type="text" class="textBox" id="firstDropdown" :placeholder='$t("product_dashboard_info.selectType")' readonly
                         :value="selectedOption" style="color: #236257">
                  <div class="option-select" @click.stop="">
                    <div @click="selectOption($t('product_dashboard_info.ariza'))">
                      {{ $t('product_dashboard_info.ariza') }}
                    </div>
                    <div @click="selectOption($t('product_dashboard_info.appeal'))" :class="{ 'disabled-option': isItemDisabled(6) }">
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
                    mask="+998#########"
                    :label="$t('product_dashboard_info.phone_number')"
                    v-model="userInfos.phoneNumber"
                >
                </BaseInputWithValidation>
                  <button type="button" class="mt-3 bg-white" style="border: none">
                    <img src="../appeal/images/edit.svg" alt="">
                  </button>
                  <button type="button" class="mt-3 bg-white" style="border: none">
                    <img src="../appeal/images/delete.svg" alt="">
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
                  style="color: #89A49D!important;"
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
                  style="color: #89A49D!important;"
                  class="required font-size-15 text-color"
                  :label="$t('product_dashboard_info.stir')"
                  :placeholder = "'_ _ _ _ _ _ _ _ _'"
              >
              </BaseInputWithValidation>

              <div class="mt-3 d-flex justify-content-between">
                <BaseInputWithValidation
                    mask="######"
                    label-on-top
                    style="color: #89A49D!important;"
                    v-model="zipeKod"
                    class="font-size-15 text-color"
                    :label="$t('product_dashboard_info.post_address')"
                    :placeholder="'_ _ _ _ _ _'"
                >
                </BaseInputWithValidation>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../appeal/images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../appeal/images/delete.svg" alt="">
                </button>
              </div>
            </div>
            <div class="mt-2">
              <span
                  class="font-size-15"
                  style="color: #89A49D!important;"
                  v-if="selectedOption === $t('product_dashboard_info.appeal')">
                {{$t('product_dashboard_info.murojaatchi')}}
                <span class="text-danger">*</span>
              </span>
<!--              <span-->
<!--                  class="font-size-15"-->
<!--                  style="color: #89A49D"-->
<!--                  v-if="selectedOption === $t('product_dashboard_info.ariza')">-->
<!--                {{$t('product_dashboard_info.full_name')}}-->
<!--                <span class="text-danger">*</span>-->
<!--              </span>-->
              <BaseInputWithValidation
                  rules="required"
                  label-on-top
                  class="required font-size-15 font-weight-bold"
                  style="color: #89A49D!important;"
                  v-if="selectedOption === $t('product_dashboard_info.ariza')"
                  :label="$t('product_dashboard_info.full_name')"
                  v-model="userInfos.firstName"
              >
              </BaseInputWithValidation>
<!--              <b-form-text v-if="selectedOption === $t('product_dashboard_info.ariza')" class="font-size-17 font-weight-bold" style="color: #236257!important;">{{userInfos.lastName}} {{userInfos.firstName}} {{userInfos.middleName}}</b-form-text>-->
<!--              <b-form-text v-if="selectedOption === $t('product_dashboard_info.appeal')" class="font-size-17 font-weight-bold" style="color: #236257!important;">-&#45;&#45;</b-form-text>-->
              <div v-if="selectedOption === $t('product_dashboard_info.ariza')" class="mt-3 d-flex justify-content-between">
              <b-form-group :label="$t('product_dashboard_info.address.title')" label-for="textarea" style="color: #89A49D">
                <b-form-textarea
                    id="textarea"
                    :value="userInfos.perAdress"
                    rows="2"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; width: 400px!important; color: #236257"
                ></b-form-textarea>
              </b-form-group>
                <button type="button" class="mt-3 bg-white mx-2" style="border: none">
                  <img src="../appeal/images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../appeal/images/delete.svg" alt="">
                </button>
              </div>
              <div v-if="selectedOption === $t('product_dashboard_info.appeal')" class="mt-3 d-flex justify-content-between">
              <b-form-group :label="$t('product_dashboard_info.yuridik_address')" label-for="textarea" style="color: #89A49D">
                <b-form-textarea
                    id="textarea"
                    rows="2"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; width: 400px!important; color: #236257"
                ></b-form-textarea>
              </b-form-group>
                <button type="button" class="mt-3 bg-white mx-2" style="border: none">
                  <img src="../appeal/images/edit.svg" alt="">
                </button>
                <button type="button" class="mt-3 bg-white" style="border: none">
                  <img src="../appeal/images/delete.svg" alt="">
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

<!--                     murojaat select  -->
<!--              <div class="select-dropdown font-size-15 my-3" @click="secondDropdown" :class="{ active: isActiveS2 }">-->
<!--                <input type="text" class="boxText font-weight-bold" id="secondDropdown" :placeholder='$t("product_dashboard_info.murojaat_select")' readonly-->
<!--                       :value="selectedOption2" style="color: #236257" >-->
<!--                <div class="select-option" v-for="item in appealList" :key="item.id">-->
<!--                  <div @click="selectOption2(item.nameUz)">-->
<!--                    {{-->
<!--                    getName({-->
<!--                    nameRu: item.nameRu,-->
<!--                    nameLt: item.nameLt,-->
<!--                    nameUz: item.nameUz,-->
<!--                    })-->
<!--                    }}-->
<!--                  </div>-->
<!--&lt;!&ndash;                  <div @click="selectOption2($t('product_dashboard_info.item1'))">{{ $t('product_dashboard_info.item1') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div @click="selectOption2($t('product_dashboard_info.item2'))" :class="{ 'disabled-option': isItemDisabled(2) }">{{ $t('product_dashboard_info.item2') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div @click="selectOption2($t('product_dashboard_info.item3'))" :class="{ 'disabled-option': isItemDisabled(3) }">{{ $t('product_dashboard_info.item3') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div @click="selectOption2($t('product_dashboard_info.item4'))" :class="{ 'disabled-option': isItemDisabled(4) }">{{ $t('product_dashboard_info.item4') }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div @click="selectOption2($t('product_dashboard_info.item5'))" :class="{ 'disabled-option': isItemDisabled(5) }">{{ $t('product_dashboard_info.item5') }}</div>&ndash;&gt;-->
<!--                </div>-->
<!--              </div>-->

              <div class="my-3">
              <BaseSelectWithValidation
                  rules="required"
                  v-model="selectedId"
                  value-field="id"
                  label-on-top
              >
                <b-form-select-option class="text-center" value="" disabled>{{$t('product_dashboard_info.murojaat_select')}}</b-form-select-option>
                <b-form-select-option v-for="(item, index) in appealList" :key="index"
                                      :value="item.id">{{
                    getName({
                      nameRu: item.nameRu,
                      nameLt: item.nameLt,
                      nameUz: item.nameUz,
                      nameEn: item.nameEn,
                    })
                  }}
                </b-form-select-option>
              </BaseSelectWithValidation>

                <b-row class="mt-3" v-if="selectedId == 2">
                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        v-model="stir"
                          v-mask="'#########'"
                        :label="$t('pharm.chakanaData.pharmStr')"
                        label-on-top
                    >
                    </BaseInputWithValidation>
                  </b-col>

                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        :label="$t('pharm.chakanaData.pharmName')"
                        label-on-top
                        v-model="nameSubject"
                    >
                    </BaseInputWithValidation>
                  </b-col>

                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        :label="$t('pharm.pharmacyAddress')"
                        label-on-top
                        v-model="addressSubject"
                    >
                    </BaseInputWithValidation>
                  </b-col>
                </b-row>

                <b-row class="mt-3" v-if="selectedId == 3 || selectedId == 4 || selectedId == 5 || selectedId == 6">
                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        v-model="stir"
                        @keyup.enter="findContractorByInn"
                        v-mask="'#########'"
                        :label="$t('product_dashboard_info.menu_items.marketplace_stir')"
                        label-on-top
                    >
                    </BaseInputWithValidation>
                  </b-col>

                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        :label="$t('product_dashboard_info.menu_items.marketplace_name')"
                        label-on-top
                        v-model="nameSubject"
                    >
                    </BaseInputWithValidation>
                  </b-col>

                  <b-col>
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        :label="$t('product_dashboard_info.menu_items.marketplace_address')"
                        label-on-top
                        v-model="addressSubject"
                    >
                    </BaseInputWithValidation>
                  </b-col>
                </b-row>
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
                    v-model="appeal_description"
                    no-resize
                    class="w-100 font-weight-bold"
                    style="border: 1px solid #236257; color: #236257"
                ></b-form-textarea>
              </b-form-group>
              </div>
          </fieldset>


          <b-row class="py-3">
<!--          <b-col cols="12">-->
<!--            <BaseFileUploaderWithValidation-->
<!--                ref="appealFileUpload"-->
<!--                class="required"-->
<!--                label-on-top-->
<!--                v-model="appeal_file"-->
<!--                data-vv-name="file"-->
<!--                data-vv-as="file"-->
<!--                :multiple="true"-->
<!--                :max-files="100"-->
<!--                :maxFilesize="100"-->
<!--                :label="$t('actions.upload_file')"-->
<!--            ></BaseFileUploaderWithValidation>-->
<!--          </b-col>-->



            <b-col>
            <div>
              <b-col cols="12">
                <b-row>
                  <!-- File uploader -->
                  <b-col cols="12" md="6" class="px-3">
                    <BaseFileUploaderWithValidation
                        rules="required"
                        class="required"
                        ref="fileInput"
                        label-on-top
                        v-model="appeal_file"
                        data-vv-name="file"
                        data-vv-as="file"
                        :multiple="false"
                        :max-files="1"
                        :maxFilesize="100"
                        :label="$t('actions.upload_file')"
                    ></BaseFileUploaderWithValidation>
                  </b-col>

                  <!-- Select with default options -->
                  <b-col cols="12" md="6" class="px-3">
                    <BaseSelectWithValidation
                        v-model="documentTypeIds"
                        :label="$t('pharm.chakanaData.typeWork')"
                        value-field="id"
                        label-on-top
                    >
                      <!-- Default options -->
                      <b-form-select-option v-for="(type, index) in types" :key="index" :value="type.id">
                        {{
                          getName({
                            nameLt: type.nameLt,
                            nameRu: type.nameRu,
                            nameUz: type.nameUz,
                            nameEn: type.nameEn,
                          })
                        }}
                      </b-form-select-option>

                      <!-- Options from response (fileAdd) -->
                      <b-form-select-option v-for="(item, index) in fileAdd" :key="index" :value="item.id">
                        {{
                          getName({
                            nameLt: item.nameLt,
                            nameRu: item.nameRu,
                            nameUz: item.nameUz,
                            nameEn: item.nameEn,
                          })
                        }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
                    <b-col class="mt-3 p-0">
                      <b-form-checkbox v-model="offerta">
                        <span>{{ $t("product_dashboard_info.menu_items.oferta") }}</span>
                      </b-form-checkbox>
                    </b-col>
                  </b-col>

                </b-row>
              </b-col>

              <!-- Action buttons -->
<!--              <div style="margin-top: 10px;">-->
<!--                <b-button-->
<!--                    style="background-color: orange; color: white; padding: 5px 25px; border: none; margin-right: 15px; font-size: 16px;"-->
<!--                    @click="addSingleFile"-->
<!--                >-->
<!--                  <span v-if="fileAdd.length > 0">{{ $t("actions.add") }}</span>-->
<!--                  <span v-else>{{ $t("actions.download") }}</span>-->
<!--                </b-button>-->

<!--                <b-button-->
<!--                    style="background-color: #2b675b; color: white; padding: 5px 25px; border: none; font-size: 16px;"-->
<!--                    :disabled="createItem.documentTypeIds.length === 0"-->
<!--                    @click="saveFiles"-->
<!--                >-->
<!--                  {{ $t("actions.save") }}-->
<!--                </b-button>-->
<!--              </div>-->
            </div>
            </b-col>
<!--            <div class="col-12 d-flex align-items-center">-->
<!--&lt;!&ndash;              <input type="file" ref="fileInput" @change="handleFileChange" style="display: none"/>&ndash;&gt;-->
<!--              <button class="btn font-size-15" style="background-color: #7a9690; color: white; width:200px;" @click="uploadFiles = true;">{{ buttonText }}</button>-->
<!--              <span class="ml-2" v-if="appeal_file_list.length">-->
<!--                  <span v-for="(vm,i) in appeal_file_list" :key="i">-->
<!--                <i v-if="(vm.split('.').slice(1))[0] == 'pdf'" class="mdi mdi-file-pdf-box" style="color: darkred; font-size: 30px"></i>-->
<!--                     <i v-else-if="(vm.split('.').slice(1))[0] == 'docx'" class="mdi mdi-microsoft-word" style="color: #2B7CD3; font-size: 30px"></i>-->
<!--                     <i v-else-if="(vm.split('.').slice(1))[0] == 'xls'|| (vm.split('.').slice(1))[0] == 'xlsx'" class="mdi mdi-microsoft-excel" style="color: darkgreen; font-size: 30px"></i>-->
<!--                     <i v-else class="mdi mdi-file" style="color: orange; font-size: 30px"></i><span v-if="i != (appeal_file.length-1)">,</span>-->
<!--                    </span>-->
<!--              </span>-->
<!--            </div>-->

<!--            <b-modal centered v-model="uploadFiles" size="lg" :title="$t('actions.upload_file')">-->
<!--             <div class="row d-flex">-->
<!--               <div class="col-5" style="text-align: center;">-->
<!--                 <div>-->
<!--                   <input multiple type="file" class="btnUploadFrame" @change="handleFileChange" />-->
<!--                   <div class="btnUpload">-->
<!--                     <div class="mb-3 pt-3"><img width="130" src="../../../assets/file.png" alt=""></div>-->
<!--                     <div>{{$t('uploadFiles')}}</div>-->
<!--                   </div>-->
<!--                 </div>-->
<!--&lt;!&ndash;                 <button class="btn btnUpload font-size-15" @click="triggerFileInput">{{ buttonText }}</button>&ndash;&gt;-->
<!--&lt;!&ndash;                 <input type="file" ref="fileInput" multiple="multiple" name="fileselect[]" @change="handleFileChange" style="display: none"/>&ndash;&gt;-->
<!--&lt;!&ndash;                 <button class="btn btnUpload font-size-15" @click="triggerFileInput">{{ buttonText }}</button>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                 <span class="ml-2" v-if="appeal_file">{{ appeal_file.name }}</span>&ndash;&gt; onFileChange&ndash;&gt;-->
<!--               </div>-->
<!--               <div class="col-7" style="height: 240px; overflow-y: auto;">-->
<!--                 <div v-if="appeal_file_list.length">-->
<!--                   <div v-for="(item, index) in appeal_file_list" :key="index" class="uploadedFileList">-->
<!--                    <div class="d-flex justify-content-between align-items-center">-->
<!--                     <div class="d-flex align-items-center">-->
<!--                       <div>-->
<!--                         <i v-if="(item.split('.').slice(1))[0] == 'pdf'" class="mdi mdi-file-pdf-box font-size-24" style="color: darkred"></i>-->
<!--                         <i v-else-if="(item.split('.').slice(1))[0] == 'docx'" class="mdi mdi-microsoft-word font-size-24" style="color: #2B7CD3"></i>-->
<!--                         <i v-else-if="(item.split('.').slice(1))[0] == 'xls'|| (item.split('.').slice(1))[0] == 'xlsx'" class="mdi mdi-microsoft-excel font-size-24" style="color: darkgreen"></i>-->
<!--                         <i v-else class="mdi mdi-file font-size-24" style="color: orange"></i>-->
<!--                       </div>-->
<!--                       <div>-->
<!--                         {{ item }}-->
<!--                       </div>-->
<!--                     </div>-->
<!--                      <div>-->
<!--                        <button style="background-color: transparent; color: darkred; border:none; padding-right: 5px;" @click="removeImage(index)">X</button>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                   </div>-->
<!--                 </div>-->
<!--                 <div v-else class="text-center pt-5">{{$t('notSelectFile')}}</div>-->
<!--               </div>-->
<!--             </div>-->
<!--              <template v-slot:modal-footer>-->
<!--                <b-button style="background-color: #2b675b; color: white;" @click="uploadFiles = false;">-->
<!--                    {{ $t("rais.send") }}-->
<!--                </b-button>-->
<!--              </template>-->
<!--            </b-modal>-->
          </b-row>
          <b-row class="mt-3">
            <div class="col">
              <button class="btn text-white font-size-15" style="width: 200px; background-color: #F39138" @click="saveDraft">{{ btnText }}</button>
            </div>
            <b-button
                :disabled="!userInfos.pinfl || !userInfos.phoneNumber  || !appeal_description || loadingTableItems || !appeal_file.length || !stir || !nameSubject || !addressSubject || !offerta"
                @click="sendAppeal"
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

  </div>
</template>

<style scoped lang="css">
#filedrag
{
  /*display: none;*/
  font-weight: bold;
  text-align: center;
  padding: 1em 0;
  margin: 1em 0;
  color: #555;
  border: 2px dashed #555;
  border-radius: 7px;
  cursor: default;
}

#filedrag.hover
{
  color: #f00;
  border-color: #f00;
  border-style: solid;
  box-shadow: inset 0 3px 4px #888;
}

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
  display: none;
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
.btnUploadFrame{
  width: 80%;
  height: 220px;
  //border: 1px dashed grey !important;
  background-color:white;
  border-radius: 5px;
  color: black;
  opacity: 0;
  position: relative;
  z-index: 1;
}
.btnUpload {
  width: 80%;
  height: 220px;
  margin: 0 auto;
  display: block;
  border:1px dashed grey;
  color: black;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
}
.uploadedFileList{
  border:1px solid grey;
  border-radius: 5px;
  padding:2px 5px;
  margin-bottom: 5px;
}
.disabled-option {
  color: #ccc; /* Change the text color to a light gray for disabled options */
  background-color: #f0f0f0; /* Change the background color to a light gray */
  cursor: not-allowed; /* Change the cursor to indicate that the option is not clickable */
  pointer-events: none; /* Prevent clicking on disabled options */
}
::v-deep .custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #2B675B;
  background-color: #2B675B;
}
</style>
