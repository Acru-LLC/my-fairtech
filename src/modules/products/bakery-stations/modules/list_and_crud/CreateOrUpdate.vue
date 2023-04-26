<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="$t('submodules.ad_passport_info.title') + ' - ' + isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver ref="observer" v-slot="{}" >
      <b-row class="mb-3">
        <b-col sm="12" md="6" >
          <BaseInputWithValidation
              :rules="{required: true, regex: /\b\d{9}\b/}"
              class="required"
              name="INN"
              v-model="editingItem.inn"
              @blur="validateInn"
              @keyup.enter="getSingleContractorByInn"
              mask="#########"
              :label="$t('submodules.bakery_stations.bakery_station_owner_inn')"
              with-input-append
          >
            <template v-slot:append-slot>
              <!-- CONTRACTOR SEARCH BUTTON -->
              <b-button
                  v-if="!contractorNotFound"
                  @click="getSingleContractorByInn"
                  variant="outline-primary"
                  id="contractorSearchButton"
                  style="padding: 2.5px 10px; font-size: 1.2rem;"
              >
                <i class="mdi mdi-account-search"></i>
              </b-button>
              <!-- CONTRACTOR ADD BUTTON -->
              <b-button
                  v-else
                  @click="contractorCreateModal = true"
                  variant="outline-info"
                  id="contractorSearchButton"
                  style="padding: 2.5px 10px; font-size: 1.2rem;"
              >
                <i class="mdi mdi-plus-circle"></i>
              </b-button>
            </template>
          </BaseInputWithValidation>
        </b-col>

        <b-col sm="12" md="6">
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.contractorId"
              :has-next-page="hasNextPageContractors"
              @select="contractorSelected"
              @reachedEndOfList="contractorReachedEndOfList"
              @search-change="debounceSearchContractors"
              :searchable="true"
              :allow-empty="false"
              preserve-search
              :clear-on-select="false"
              :loading="isLoadingContractors"
              :internal-search="false"
              :options="contractors.map(e => e.id)"
              :label="$t('submodules.bakery_stations.bakery_station_owner')"
              placeholder=""
              :custom-label="customLabelContractor"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              not-required
              disabled
              v-model="editingItem.contractorPhoneNumber"
              :label="$t('submodules.bakery_stations.bakery_station_owner_phone_number')"
              mask="+998#########"
          />
        </b-col>

        <b-col
            sm="12"
            md="6"
        >
          <BaseTextareaWithValidation
              not-required
              disabled
              v-model="editingItem.contractorAddress"
              max-rows="2"
              :label="$t('submodules.bakery_stations.bakery_station_owner_address')"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <h5 class="m-0 text-center">
            {{ $t('submodules.bakery_stations.bakery_station_exact_address') }}
          </h5>
          <hr>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.addressDto.regionId"
              @select="regionSelected"
              :options="regions.map(e => e.regionId)"
              :label="$t('column.region')"
              placeholder=""
              :custom-label="customLabelRegion"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>

        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.addressDto.districtId"
              @select="districtSelected"
              :options="districts.map(e => e.id)"
              :label="$t('column.district')"
              placeholder=""
              :custom-label="customLabelDistrict"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              not-required
              v-model="editingItem.addressDto.quarterId"
              :options="quarters.map(e => e.id)"
              :label="$t('column.quarter')"
              placeholder=""
              :custom-label="customLabelQuarter"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
              withCreateAddition
          >
            <template v-slot:append-slot>
              <b-button
                  @click="quartersModal = true"
                  variant="outline-primary"
                  style="padding: 2.5px 10px; font-size: 1.2rem;"
              >
                <i class="mdi mdi-plus-circle"></i>
              </b-button>
            </template>
          </BaseMultiselectWithValidation>
          <BaseModalForCreate
              v-model="quartersModal"
              mainApiUrl="directory/quarter-names"
              :additional-params="{regionId: editingItem.addressDto.regionId,
              districtId: editingItem.addressDto.districtId}"
              createFormName="CreateFormGeoRegionQuarters"
              @new-ref-created="newRefCreated"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <b-row>
            <b-col cols="6">
              <BaseInputWithValidation
                  rules="required|positiveNotZero"
                  class="required"
                  :disabled="true"
                  v-model="editingItem.latNumber"
                  custom-styles="grid-template-columns: 51% 43%;"
                  name="addressLocation"
                  :label="$t('column.location_address')"
                  :placeholder="$t('column.latitude')"
              />
            </b-col>
            <b-col cols="3">
              <BaseInputWithValidation
                  rules="required|positiveNotZero"
                  only-form-element
                  v-model="editingItem.lngNumber"
                  :disabled="true"
                  custom-styles="grid-template-columns: unset;"
                  :placeholder="$t('column.longitude')"
              />
            </b-col>
            <b-col cols="3">
              <b-button
                  @click="openMapModal"
                  variant="primary"
                  size="sm"
                  pill
              >
                <i class="mdi mdi-map-marker font-size-16 align-middle"></i>
                {{ $t('column.map') }}
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              not-required
              v-model="editingItem.addressDto.additional"
              name="additionalAddress"
              :label="$t('column.orienter')"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <hr>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              v-model="editingItem.name"
              :label="$t('column.name')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseTextareaWithValidation
              not-required
              v-model="editingItem.description"
              max-rows="8"
              :label="$t('column.comment')"
              :placeholder="$t('column.comment')"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseDatePickerWithValidation
              not-required
              disableAfter
              v-model="editingItem.constructDate"
              :label="$t('column.created_date')"
              lang="ru"
          ></BaseDatePickerWithValidation>
        </b-col>
      </b-row>
    </ValidationObserver>

    <!-- CONTRACTOR CREATE MODAL -->
    <b-modal
        v-model="contractorCreateModal"
        id="create-multiple-min-collections-modal-id"
        size="xl"
        :title="$t('column.contractor')"
        title-class="font-18"
        :ok-title="$t('actions.save')"
        @ok="createContractor"
        @cancel="fetchContractorsWithKeyword('', false, true)"
        ok-variant="success"
        :cancel-title="$t('actions.cancel')"
        cancel-variant="danger"
        no-close-on-backdrop
        no-close-on-esc
    >
      <CreateFormContractor
          @saved="contractorSaved"
          :custom-is-mode-create="true"
          ref="createFormContractor"
      ></CreateFormContractor>
    </b-modal>

    <!-- MAP TO CHOOSE LOCATION OF AD_CONSTRUCTION -->
    <MapInModal
        :visible="mapModal"
        :event="{lat: editingItem.latNumber, lng: editingItem.lngNumber}"
        @saveLocation="saveLocation"
        @close="mapModal = false"
    ></MapInModal>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'bakery'
const APPEND_API_URL_FOR_GOVERNMENT = 'by-first-agent'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

import MapInModal from './components/MapInModal'
import CreateFormContractor from '@/shared/views/components/CreateFormContractor'

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    MapInModal,
    CreateFormContractor

  },
  /*
  * DATA */
  data() {
    return {
      notFormattedMonthlyPayment: null,
      adSideValue: null,
      districtModal: false,
      quartersModal: false,
      streetsModal: false,
      mapModal: false,

      editingItem: {
        addressDto: {}
      },
      hasNextPageContractors: false,
      contractors: [],
      debounce: null,
      isLoadingContractors: false,
      districts: [],
      quarters: [],
      streets: [],
      adTypes: [],
      adGroups: [],
      adZones: [],
      adSides: [],
      adVolumeTypes: [],
      localPassportExpireDate: [],
      contractorCreateModal: false,
      minCollectionValue: null,
      coefficientValue: null,
      contractorNotFound: false,
      contractorSearchPayload: {},
      checkPassportNumberLoading: false,
      dbPassportNumber: '',
      isPassportNumberInvalid: false,

      minimumCollections: [],
      createMultipleMinimumCollectionsModal: false,
      singleMinimumCollectionUpdateModal: false,
      statuses: [],
      regions: [],
      units: [],
      adLocationTypes: [],
      adDesignTypes: [],
      adObjectStates: [],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: 'ファイルをドロップしてください.',
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        addRemoveLinks: true,
        dictRemoveFile: 'x',
        maxFiles: 3,
      },
      architectDocFile: {},
      photo: {},
      passportDocFile: {},
      passportPhoto: {},
      paymentDocFile: {},
    }
  },
  /*
  * COMPUTED */
  computed: {
    inputMinValue(value) {
      return value.editingItem.passportGivenDate
    },
    inputMaxValue(value) {
      return value.editingItem.passportExpireDate
    },
    isModeCreate() {
      return this.$route.name == 'CreateBakeryStation'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    findAndSetAdVolumeType() {
      this.editingItem.directoryAdvertisementVolumeTypeId = null

      if (this.editingItem.volume) {
        this.adVolumeTypes.forEach(vType => {
          if (parseFloat(this.editingItem.volume) >= vType.minBorder && parseFloat(this.editingItem.volume) <= vType.maxBorder) {
            this.editingItem.directoryAdvertisementVolumeTypeId = vType.id
          }
        })
      }
      this.adVolumeTypeSelected(this.editingItem.directoryAdvertisementVolumeTypeId)
    },
    adSideSelected($event) {
      let foundAdSide = this.adSides.find(el => el.id == $event)
      this.adSideValue = foundAdSide ? foundAdSide.code : null
      this.calculateAndSetMonthlyPayment()
    },
    adVolumeTypeSelected($event) {
      this.getMinCollectionValue(this.editingItem.addressDto.regionId, this.editingItem.addressDto.districtId, this.editingItem.directoryAdvertisementLocationTypeId, this.editingItem.directoryAdvertisementDesignTypeId, $event)
    },
    calculateAndSetMonthlyPayment() {
      this.$set(this.editingItem, 'monthlyPayment', null)
      this.notFormattedMonthlyPayment = null
      if (this.minCollectionValue && this.coefficientValue && this.editingItem.designTypePrivilegeCoefficient && this.editingItem.volume && this.adSideValue) {
        let num = (parseFloat(this.minCollectionValue) * parseFloat(this.coefficientValue) * parseFloat(this.editingItem.designTypePrivilegeCoefficient) * parseFloat(this.editingItem.volume) * parseFloat(this.adSideValue)).toFixed(2)
        this.notFormattedMonthlyPayment = num
        let formattedPaymentValue = this.getNumberFormat(num)
        this.$set(this.editingItem, 'monthlyPayment', formattedPaymentValue)
      } else {
        this.$set(this.editingItem, 'monthlyPayment', null)
        this.notFormattedMonthlyPayment = null
      }
    },
    getPrivilegeCoefficientValueByAdDesignTypeId(adDesignTypeId) {
      if (adDesignTypeId) {
        helperService.getPrivilegeCoefficientValueByAdDesignTypeId(adDesignTypeId)
            .then(res => {
              this.editingItem.designTypePrivilegeCoefficient = res.data
              this.calculateAndSetMonthlyPayment()
            })
            .catch(e => console.log(e))
      }
    },
    newRefCreated(newOptions, newId, formName) {
      if (formName == 'CreateFormGeoRegionQuarters') {
        this.quarters = newOptions
        this.editingItem.addressDto.quarterId = newId
      } else if (formName == 'CreateFormGeoRegionStreets') {
        this.streets = newOptions
        this.editingItem.addressDto.streetId = newId
      }
    },
    async onBlurPassportNumberInput(value) {
      if (this.isPassportNumberInvalid) {
        await this.checkAdPassportNumber(value, true);
      }
    },
    async debounceCheckPassportNumber(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.checkAdPassportNumber(searchText);
      }, 1000);
    },
    checkAdPassportNumber(searchQuery = "", fromOnBlur = false) {
      /*
       * AVOID MULTIPLE REQUESTS AT ONCE */
      if (!this.editingItem.addressDto.regionId || !searchQuery || this.checkPassportNumberLoading || (!this.isModeCreate && this.editingItem.passportNumber == this.dbPassportNumber)) return;
      this.checkPassportNumberLoading = true;
      helperService.checkAdPassportNumberByRegion(searchQuery, this.editingItem.addressDto.regionId)
          .then(res => {
            this.isPassportNumberInvalid = res.data;
            if (this.isPassportNumberInvalid) {
              this.computedObserver.setErrors({PassportNumber: [this.$t('validator.ad_passport_number_already_in_use')]});
            }
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.checkPassportNumberLoading = false;
            /*
               * FOYDALANUVCHI YOZAYOTGAN BO'LSA INPUTNI QAYTA FOCUS QIL (ON_BLUR EVENTDAN BO'LSA FOCUS QILMA) */
            if (!fromOnBlur) {
              let passportNumberInput = this.$refs.passportNumber.$el.querySelector(
                  "input"
              );
              setTimeout(() => {
                passportNumberInput.focus();
              }, 50);
            }
          });
    },
    saveLocation(e) {
      this.$set(this.editingItem, 'latNumber', e.lat)
      this.$set(this.editingItem, 'lngNumber', e.lng)
      this.mapModal = false
    },
    drawCreated(e) {
      var type = e.layerType,
          layer = e.layer;

      if (type === 'marker') {
        layer.bindPopup('A popup!');
      }

      this.featureGroup.addLayer(layer);
    },
    openMapModal() {
      this.mapModal = true
    },
    async contractorSaved(res) {
      this.contractorCreateModal = false
      this.contractorNotFound = false
      await this.fetchContractorsWithKeyword('', true)
    },
    createContractor(e) {
      e.preventDefault()

      this.$refs.createFormContractor.save()
    },
    validateInn() {
      helperService.validateInnFromApi(this.editingItem.inn)
          .then(res => {
            if (!res.data) {
              this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
              this.contractorSelected(null, true)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    getSingleContractorByInn() {
      if (this.computedObserver.fields.INN.valid) {
        helperService.validateInnFromApi(this.editingItem.inn)
            .then(res => {
              if (res.data) {
                helperService.getSingleContractorByInn(this.editingItem.inn)
                    .then(res => {
                      this.contractorNotFound = false
                      this.contractorSelected(res.data, false, true)
                    })
                    .catch(e => {
                      this.contractorNotFound = true
                    })
              } else {
                this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
                this.contractorSelected(null, true)
              }
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    handleWidthLengthInput(widthOrLength) {
      if (this.editingItem.width && this.editingItem.length) {
        try {
          this.editingItem.volume = parseFloat(this.editingItem.width) * parseFloat(this.editingItem.length)
          this.findAndSetAdVolumeType()
          this.calculateAndSetMonthlyPayment()
        } catch (error) {
          this.editingItem.volume = null
          this.calculateAndSetMonthlyPayment()
          this.findAndSetAdVolumeType()
        }
      } else {
        this.editingItem.volume = null
        this.calculateAndSetMonthlyPayment()
        this.findAndSetAdVolumeType()
      }
    },
    addPassportDateChanged(e) {
      if (e[0]) {
        this.editingItem.passportGivenDate = e[0]
        this.editingItem.passportExpireDate = e[1]
      } else {
        this.editingItem.passportGivenDate = null
        this.editingItem.passportExpireDate = null
      }
    },
    customLabelAdSide(opt) {
      let selected = this.adSides.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })}`
      }
      return ``;
    },
    customLabelAdVolumeType(opt) {
      let selected = this.adVolumeTypes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })}`
      }
      return ``;
    },
    customLabelAdZone(opt) {
      let selected = this.adZones.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelAdRegionGroup(opt) {
      let selected = this.adGroups.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelAdType(opt) {
      let selected = this.adTypes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelStreet(opt) {
      let selected = this.streets.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelQuarter(opt) {
      let selected = this.quarters.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.editingItem.addressDto.districtId = null
      }
      if ($event) {
        // GET DISTRICTS
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
              if (dontResetDistrict)
                this.districtSelected(this.editingItem.addressDto.districtId, true)
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    getCoefficientValue(districtId, adZoneId) {
      if (districtId && adZoneId && this.isByAgency) {
        helperService.getCoefficientValueByZoneAndDistrictIds(districtId, adZoneId)
            .then(res => {
              this.coefficientValue = res.data ? res.data.coefficient : null
              if (this.minCollectionValue) {
                this.calculateAndSetMonthlyPayment()
                // this.$set(this.editingItem, 'monthlyPayment', parseFloat(this.minCollectionValue) * parseFloat(this.coefficientValue))
              }
            })
            .catch(e => {
              console.log(e)
              this.coefficientValue = null
              // this.$set(this.editingItem, 'monthlyPayment', null)
              this.calculateAndSetMonthlyPayment()
            })
      }
    },
    getMinCollectionValue(regionId, districtId, adLocationTypeId, adDesignTypeId, adVolumeTypeId) {
      // GET MINIMUM_COLLECTION (M) BY REGION, DISTRICT AND AD_DESIGN_TYPE IDS
      if (regionId && districtId && adLocationTypeId && adDesignTypeId && this.isByAgency && !this.editingItem.isUzAvtoYul) {
        helperService.getMinCollectionValueByRegionAndDistrictIds(regionId, districtId, adLocationTypeId, adDesignTypeId, adVolumeTypeId)
            .then(res => {
              this.minCollectionValue = res.data ? res.data.cost : null
              if (this.coefficientValue) {
                this.calculateAndSetMonthlyPayment()
                // this.$set(this.editingItem, 'monthlyPayment', parseFloat(this.minCollectionValue) * parseFloat(this.coefficientValue))
              }
            })
            .catch(e => {
              console.log(e)
              this.minCollectionValue = null
              this.calculateAndSetMonthlyPayment()
              // this.$set(this.editingItem, 'monthlyPayment', null)
            })
      } else {
        this.minCollectionValue = null
      }
    },
    async districtSelected($event, dontResetQuarter = false) {
      if (!dontResetQuarter) {
        this.editingItem.addressDto.quarterId = null
        this.editingItem.directoryAdvertisementZoneId = null
      }
      if ($event) {
        // GET QUARTERS
        await crudAndListsService.searchListWithKeyword('directory/quarter-names', this.var_default_search_payload, `get-by-districtId/${$event}`)
            .then(res => {
              this.quarters = res.data.list
            })
            .catch(e => {
              console.log(e)
              this.quarters = []
            })
      } else {
        this.quarters = []
      }
    },
    async adDesignTypeSelected($event) {
      this.getMinCollectionValue(this.editingItem.addressDto.regionId, this.editingItem.addressDto.districtId, this.editingItem.directoryAdvertisementLocationTypeId, $event, this.editingItem.directoryAdvertisementVolumeTypeId)
      this.getPrivilegeCoefficientValueByAdDesignTypeId($event)
    },
    async adZoneSelected($event) {
      this.getCoefficientValue(this.editingItem.addressDto.districtId, $event)
    },
    customObjectState(opt) {
      let selected = this.adObjectStates.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    contractorReachedEndOfList(e) {
      if (e) {
        this.fetchContractors()
      }
    },
    contractorSelected(contractorDtoOrId, dontResetInn = false, fromInnSearch = false) {
      let foundContractor = fromInnSearch ? this.contractors.find(c => c.id == contractorDtoOrId.id) : this.contractors.find(c => c.id == contractorDtoOrId)
      if (fromInnSearch && contractorDtoOrId && !foundContractor) {
        this.contractors.push(contractorDtoOrId)
        foundContractor = contractorDtoOrId
      }
      if (foundContractor) {
        this.editingItem.contractorId = fromInnSearch ? contractorDtoOrId.id : contractorDtoOrId
        this.editingItem.inn = foundContractor.inn
        this.editingItem.contractorPhoneNumber = null
        this.editingItem.contractorPhoneNumber = foundContractor.mobileNumber
        this.$set(this.editingItem, 'contractorAddress', `${foundContractor.addressDto.regionNameUz}, ${foundContractor.addressDto.districtNameUz} ${foundContractor.addressDto.additional ? ',' + foundContractor.addressDto.additional : ''}`)
        // this.editingItem.contractorAddress = `${foundContractor.addressDto.regionNameUz}, ${foundContractor.addressDto.districtNameUz} ${foundContractor.addressDto.additional ? ',' + foundContractor.addressDto.additional : ''}`
        this.contractorNotFound = false
      } else {
        if (!dontResetInn) {
          this.editingItem.inn = null
        }
        this.editingItem.contractorId = null
        this.editingItem.contractorPhoneNumber = null
        this.editingItem.contractorAddress = null
      }
    },
    async debounceSearchContractors(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText);
      }, 1000);
    },
    /* async debounceSearchContractorsByInn (searchText) {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(async () => {
            await this.getSingleContractorByInn();
        }, 1000);
    }, */
    fetchContractorsWithKeyword(keyword, makeSelectedByInn = false, fromContractorModalCancel = false) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      this.fetchContractors(makeSelectedByInn, fromContractorModalCancel)
    },
    async fetchContractors(makeSelectedByInn, fromContractorModalCancel) {
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor')
          .then(res => {
            this.contractors.push(...res.data.list)
            if (makeSelectedByInn || fromContractorModalCancel) {
              let foundContractor = this.contractors.find(el => el.inn == this.editingItem.inn)
              if (foundContractor) {
                this.contractorSelected(foundContractor.id)
              }
            }
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
          })
          .catch(e => {
            console.log(e)
            this.contractors = []
          })
          .finally(() => {
            this.isLoadingContractors = false
          })
    },
    async adLocationTypeSelected(adLocationTypeObjectOrId, dontResetAdDesignType = false) {
      if (!dontResetAdDesignType) {
        this.editingItem.directoryAdvertisementDesignTypeId = null
        this.editingItem.directoryAdvertisementVolumeTypeId = null
      }
      if (adLocationTypeObjectOrId) {
        this.getMinCollectionValue(this.editingItem.addressDto.regionId, this.editingItem.addressDto.districtId, adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId, this.editingItem.directoryAdvertisementDesignTypeId, this.editingItem.directoryAdvertisementVolumeTypeId)
        // GET AD_VOLUME_TYPES
        helperService
            .getAdVolumeTypesByAdLocationTypeId(adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId)
            .then((res) => {
              this.adVolumeTypes = res.data
              this.findAndSetAdVolumeType()
            })
            .catch(e => {
              console.log(e)
            })
        if (this.editingItem.addressDto.regionId) {
          // GET AD_DESIGN_TYPES
          helperService
              .getAdDesignTypesByAdLocationTypeId(adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId, this.editingItem.addressDto.regionId)
              .then((res) => {
                this.adDesignTypes = res.data
              })
              .catch(e => {
                console.log(e)
                this.adDesignTypes = []
              })
        } else {
          this.adDesignTypes = []
        }
      } else {
        this.adDesignTypes = []
        this.adVolumeTypes = []
      }
    },
    customLabelAdLocationType(opt) {
      let selected = this.adLocationTypes.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelAdDesignType(opt) {
      let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.regionNameRu,
          nameLt: selected.regionNameLt,
          nameUz: selected.regionNameUz,
        })
        }`
      }
      return ``;
    },
    customLabelUnit(opt) {
      let selected = this.units.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id || this.$route.params.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem, false, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {addressDto: {}});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem, false, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {addressDto: {}});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  /*
  * CREATED */
  async created() {
    this.var_default_search_payload.itemsPerPage = 500;
    this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
    if (this.isModeCreate) {
      await crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true, null)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }

    // GET REGIONS
    await helperService.fetchRegionsForBakeryByCurrentUserId()
        .then(res => {
          this.regions = res.data
          this.regionSelected(this.editingItem.addressDto ? this.editingItem.addressDto.regionId : null, true)
        })
        .catch(e => {
          console.log(e)
        })

    // GET CONTRACTORS
    await this.fetchContractors()
    if (!this.isModeCreate) {
      this.contractorSelected(this.editingItem.contractorId)
    }
  }
}
</script>

<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}

.dz-remove {
  display: inline-block !important;
  width: 1.2em;
  height: 1.2em;

  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1000;

  font-size: 1.2em !important;
  line-height: 1em;

  text-align: center;
  font-weight: bold;
  border: 1px solid gray !important;
  border-radius: 1.2em;
  color: gray;
  background-color: white;
  opacity: 0.5;
}

.dz-remove:hover {
  text-decoration: none !important;
  opacity: 1;
}
</style>