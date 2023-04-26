<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="$t('submodules.ad_passport_info.title') + '-' + isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              :rules="{required: true, regex: /\b\d{9}\b/}"
              class="required"
              name="INN"
              v-model="editingItem.inn"
              @keyup.enter="getSingleContractorByInn"
              mask="#########"
              :label="$t('column.ad_construction_owner_inn')"
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
              <!-- <b-tooltip
                      target="contractorSearchButton"
                      variant="primary"
                  >{{ $t('document.search_contractor') }}</b-tooltip> -->
            </template>
          </BaseInputWithValidation>
        </b-col>

        <b-col
            sm="12"
            md="6"
        >
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
              :label="$t('column.ad_construction_owner')"
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
              v-model="editingItem.contractorPhoneNumber"
              :label="$t('column.ad_construction_owner_phone_number')"
              mask="+998#########"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >

        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="12">
          <h5 class="m-0 text-center">
            {{ $t('column.ad_construction_exact_address') }}
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
              :options="regions.map(e => e.id)"
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
              rules="required"
              class="required"
              v-model="editingItem.addressDto.quarterId"
              @select="quarterSelected"
              :options="quarters.map(e => e.id)"
              :label="$t('column.quarter')"
              placeholder=""
              :custom-label="customLabelQuarter"
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
              not-required
              v-model="editingItem.addressDto.streetId"
              :options="streets.map(e => e.id)"
              :label="$t('column.street')"
              placeholder=""
              :custom-label="customLabelStreet"
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
              rules="required"
              class="required"
              v-model="editingItem.addressDto.additional"
              :label="$t('column.address')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.directoryAdvertisementGroupId"
              disabled
              :options="adGroups.map(el => el.id)"
              :label="$t('column.ad_construction_region_group')"
              placeholder=""
              :custom-label="customLabelAdRegionGroup"
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
              rules="required"
              class="required"
              v-model="editingItem.directoryAdvertisementZoneId"
              :options="adZones.map(el => el.id)"
              :label="$t('column.ad_construction_zone')"
              placeholder=""
              :custom-label="customLabelAdZone"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >

        </b-col>
        <b-col cols="12">
          <hr>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              v-model="editingItem.passportNumber"
              :label="$t('column.ad_construction_passport_number')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <b-row>
            <b-col cols="8">
              <BaseDatePickerWithValidation
                  rules="required"
                  class="required"
                  custom-styles="grid-template-columns: 57% 43%;"
                  v-model="editingItem.passportGivenDate"
                  :label="$t('column.ad_construction_passport_expire_date')"
                  lang="ru"
              ></BaseDatePickerWithValidation>
            </b-col>
            <b-col cols="4">
              <BaseDatePickerWithValidation
                  rules="required"
                  class="required"
                  only-form-element
                  v-model="editingItem.passportExpireDate"
                  :label="$t('column.ad_construction_passport_expire_date')"
                  lang="ru"
              ></BaseDatePickerWithValidation>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.directoryAdvertisementLocationTypeId"
              @select="adLocationTypeSelected"
              :options="adLocationTypes.map(el => el.id)"
              :label="$t('column.ad_location_type')"
              placeholder=""
              :custom-label="customLabelAdLocationType"
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
              v-model="editingItem.directoryAdvertisementDesignTypeId"
              :options="adDesignTypes.map(el => el.id)"
              :label="$t('column.ad_design_type')"
              placeholder=""
              :custom-label="customLabelAdDesignType"
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
          <b-row class="mb-3">
            <BaseMultiselectWithValidation
                rules="required"
                class="required"
                v-model="editingItem.directoryTypeOfOutdoorAdvertisingToolId"
                :options="adSides.map(el => el.id)"
                :label="$t('column.ad_construction_side')"
                placeholder=""
                :custom-label="customLabelAdSide"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-row>
          <b-row class="mb-3">
            <BaseMultiselectWithValidation
                rules="required"
                class="required"
                v-model="editingItem.directoryAdvertisementTypeId"
                :options="adTypes.map(el => el.id)"
                :label="$t('column.ad_construction_type')"
                placeholder=""
                :custom-label="customLabelAdType"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-row>
          <b-row class="mb-3">
            <b-row>
              <b-col cols="6">
                <BaseInputWithValidation
                    rules="required|positiveNotZero"
                    class="required"
                    v-model="editingItem.width"
                    @input="handleWidthLengthInput"
                    custom-styles="grid-template-columns: 57% 43%;"
                    :label="$t('column.ad_construction_volume')"
                    :placeholder="$t('column.width')"
                />
              </b-col>
              <b-col cols="3">
                <BaseInputWithValidation
                    rules="required|positiveNotZero"
                    only-form-element
                    v-model="editingItem.length"
                    @input="handleWidthLengthInput"
                    custom-styles="grid-template-columns: unset;"
                    :placeholder="$t('column.length')"
                />
              </b-col>
              <b-col cols="3">
                <BaseInputWithValidation
                    rules="required|positiveNotZero"
                    only-form-element
                    v-model="editingItem.volume"
                    custom-styles="grid-template-columns: unset;"
                    disabled
                    :placeholder="$t('column.volume')"
                />
              </b-col>
            </b-row>
          </b-row>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseFileUploaderWithValidation
              rules="required"
              class="required"
              :options="dropzoneOptions"
              :label="$t('column.ad_construction_drawing')"
          ></BaseFileUploaderWithValidation>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-3">
          <b-col
              sm="12"
              md="6"
          >

          </b-col>
          <b-col
              sm="12"
              md="6"
          >

          </b-col>
      </b-row> -->
      <b-row class="mb-3">
        <b-col cols="12">
          <h5 class="m-0 text-center">
            {{ $t('column.ad_construction_organisations_list') }}
          </h5>
          <hr>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              :name="`${$t('column.ad_construction_organisation')}-1`"
              v-model="editingItem.organizationNameOne"
              :label="$t('column.ad_construction_organisation')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              :name="`${$t('column.ad_construction_organisation')}-2`"
              v-model="editingItem.organizationNameTwo"
              :label="$t('column.ad_construction_organisation')"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              :name="`${$t('column.ad_construction_organisation')}-3`"
              v-model="editingItem.organizationNameThree"
              :label="$t('column.ad_construction_organisation')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              class="required"
              :name="`${$t('column.ad_construction_organisation')}-4`"
              v-model="editingItem.organizationNameFour"
              :label="$t('column.ad_construction_organisation')"
          />
        </b-col>
      </b-row>

    </ValidationObserver>
    <b-modal
        v-model="contractorCreateModal"
        id="create-multiple-min-collections-modal-id"
        size="xl"
        title="Minimal yig'im yaratish/o'zgartirish"
        title-class="font-18"
        :ok-title="$t('actions.save')"
        ok-variant="success"
        @ok="createContractor"
        :cancel-title="$t('actions.cancel')"
        cancel-variant="danger"
        no-close-on-backdrop
        no-close-on-esc
    >
      <CreateFormContractor
          ref="createFormContractor"
          @saved="contractorSaved"
          :custom-is-mode-create="true"
      />
    </b-modal>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'contractor-advertising-construction'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

import CreateFormContractor from '@/shared/views/components/CreateFormContractor'

export default {
  name: "CreateOrUpdateByGovernment",
  /*
  * COMPONENTS */
  components: {
    CreateFormContractor
    // BSidebar
  },
  /*
  * DATA */
  data() {
    return {
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
      localPassportExpireDate: [],
      contractorCreateModal: false,
      contractorNotFound: false,
      contractorSearchPayload: {},


      editingItemForMultiple: {},
      currentEditingItem: {},
      minimumCollections: [],
      createMultipleMinimumCollectionsModal: false,
      singleMinimumCollectionUpdateModal: false,
      statuses: [],
      regions: [],
      units: [],
      adLocationTypes: [],
      adDesignTypes: [],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: 'ファイルをドロップしてください.',
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        addRemoveLinks: true,
        dictRemoveFile: 'x',
        maxFiles: 3,
      }
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateAdPassportInfoByGovernment'
    },
    computedObserver() {
      return this.$refs.observer
    },
    multipleMinimumCollectionsComputedObserver() {
      return this.$refs['multiple-minimum-collections-observer']
    },
    singleMinimumCollectionUpdateComputedObserver() {
      return this.$refs['single-minimum-collection-update-observer']
    }
  },
  /*
  * METHODS */
  methods: {
    /*  fetchContractors () {
         // GET CONTRACTORS
         crudAndListsService
             .searchList('contractor', this.var_default_search_payload)
             .then((res) => {
                 this.contractors = res.data.list;
             })
             .catch(e => {
                 console.log(e)
             })
     }, */
    async contractorSaved(res) {
      this.contractorCreateModal = false
      this.contractorNotFound = false
      await this.fetchContractorsWithKeyword('', true)
      /* let foundContractor = this.contractors.find(el => el.inn == this.editingItem.inn)
      if (foundContractor) {
          this.editingItem.contractorId = foundContractor.id
      } */
    },
    createContractor(e) {
      e.preventDefault()

      this.$refs.createFormContractor.save()
    },
    getSingleContractorByInn(inn) {
      if (this.computedObserver.fields.INN.valid)
        helperService.validateInnFromApi(this.editingItem.inn)
            .then(res => {
              if (res.data) {
                helperService.getSingleContractorByInn(this.editingItem.inn)
                    .then(res => {
                      this.contractorNotFound = false
                      this.contractorSelected(res.data.id)
                    })
                    .catch(e => {
                      this.contractorNotFound = true
                    })
              } else {
                this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
              }
            })
            .catch(e => {
              console.log(e)
            })
      else
        this.computedObserver.refs.INN.validate()
    },
    handleWidthLengthInput(widthOrLength) {
      if (this.editingItem.width && this.editingItem.length) {
        try {
          this.editingItem.volume = parseFloat(this.editingItem.width) * parseFloat(this.editingItem.length)
        } catch (error) {
          this.editingItem.volume = null
        }
      } else {
        this.editingItem.volume = null
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
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelAdZone(opt) {
      let selected = this.adZones.find(e => e.id == opt);
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelAdRegionGroup(opt) {
      let selected = this.adGroups.find(e => e.id == opt);
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelAdType(opt) {
      let selected = this.adTypes.find(e => e.id == opt);
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelStreet(opt) {
      let selected = this.streets.find(e => e.id == opt);
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelQuarter(opt) {
      let selected = this.quarters.find(e => e.id == opt);
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
      if (selected) {
        return `${selected.name}`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.editingItem.addressDto.districtId = null
        this.editingItem.directoryAdvertisementGroupId = null
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

        // GET GROUP OF REGION
        await helperService.getGroupOfRegion($event)
            .then(res => {
              this.$set(this.editingItem, 'directoryAdvertisementGroupId', res.data.id)
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    async districtSelected($event, dontResetQuarter = false) {
      if (!dontResetQuarter) {
        this.editingItem.addressDto.quarterId = null
        this.editingItem.directoryAdvertisementZoneId = null
      }
      // GET QUARTERS
      if ($event) {
        await crudAndListsService.searchListWithKeyword('directory/quarter-names', this.var_default_search_payload, `get-by-districtId/${$event}`)
            .then(res => {
              this.quarters = res.data.list
              if (dontResetQuarter)
                this.quarterSelected(this.editingItem.addressDto.quarterId, true)
            })
            .catch(e => {
              console.log(e)
              this.quarters = []
            })

        // GET AD_ZONES BY DISTRICT_ID
        await helperService.getAdZonesByDistrictId($event)
            .then(res => {
              this.adZones = res.data
            })
            .catch(e => {
              console.log(e)
              this.adZones = []
            })
      } else {
        this.quarters = []
        this.adZones = []
      }
    },
    async quarterSelected($event, dontResetStreet = false) {
      if (!dontResetStreet) {
        this.editingItem.addressDto.streetId = null
      }
      // GET STREETS
      if ($event) {
        await crudAndListsService.searchListWithKeyword('directory/street-names', this.var_default_search_payload, `get-by-quarterId/${$event}`)
            .then(res => {
              this.streets = res.data.list
            })
            .catch(e => {
              console.log(e)
              this.streets = []
            })
      } else {
        this.streets = []
      }
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
    contractorSelected(contractorId) {
      let foundContractor = this.contractors.find(c => c.id == contractorId)
      if (foundContractor) {
        this.editingItem.contractorId = contractorId
        this.editingItem.inn = foundContractor.inn
        this.editingItem.contractorPhoneNumber = foundContractor.mobileNumber
      } else {
        this.editingItem.contractorId = null
        this.editingItem.inn = null
        this.editingItem.contractorPhoneNumber = null
      }
    },
    async debounceSearchContractors(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText);
      }, 1000);
    },
    fetchContractorsWithKeyword(keyword, selectAfterFetch = false) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      this.fetchContractors(selectAfterFetch)
    },
    async fetchContractors(selectAfterFetch) {
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload)
          .then(res => {
            this.contractors.push(...res.data.list)
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
            if (selectAfterFetch) {
              let foundContractor = this.contractors.find(el => el.inn == this.editingItem.inn)
              if (foundContractor) {
                this.contractorSelected(foundContractor.id)
              }
            }
          })
          .catch(e => {
            console.log(e)
            this.contractors = []
          })
          .finally(() => {
            this.isLoadingContractors = false
          })
    },
    updateSingleMinimumCollection(e) {
      e.preventDefault();
      // TODO: DUBLICATE LIKKA TEKSHIR (XUDDI SHUNDAYI TABLE GA QO'SHILMAGAN BO'LSIN)
      this.singleMinimumCollectionUpdateComputedObserver.validate().then(valid => {
        if (valid) {
          this.currentEditingItem.directoryAdvertisementDesignTypeNameUz = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameUz
          this.currentEditingItem.directoryAdvertisementLocationTypeNameUz = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameUz
          this.currentEditingItem.regionName = this.regions.find(el => el.id == this.currentEditingItem.regionId).name
          this.currentEditingItem.statusNameUz = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameUz
          this.currentEditingItem.unitShortNameUz = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameUz

          this.$set(this.minimumCollections, this.currentEditingItem.index, this.currentEditingItem)
          this.singleMinimumCollectionUpdateModal = false
          this.currentEditingItem = Object.assign({}, {})
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    async adLocationTypeSelected(adLocationTypeObjectOrId, dontResetAdDesignType = false) {
      if (!dontResetAdDesignType) {
        this.editingItem.directoryAdvertisementDesignTypeId = null
        this.editingItemForMultiple.directoryAdvertisementDesignTypes = []
        this.currentEditingItem.directoryAdvertisementDesignTypeId = null
      }
      if (adLocationTypeObjectOrId) {
        // GET AD_DESIGN_TYPES
        helperService
            .getAdDesignTypesByAdLocationTypeId(adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId)
            .then((res) => {
              this.adDesignTypes = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    editItem(item, index) {
      this.currentEditingItem = Object.assign({}, item)
      this.$set(this.currentEditingItem, 'index', index)
      this.singleMinimumCollectionUpdateModal = true
    },
    deleteItem(item, index) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              this.minimumCollections.splice(index, 1)
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    createOrUpdateItem(mode) {
      if (mode == 'create') {
        this.computedObserver.validate().then(valid => {
          if (valid) {
            this.editingItemForMultiple = Object.assign({}, {})
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus) {
              this.editingItemForMultiple.statusId = activeStatus.id
            }
            this.createMultipleMinimumCollectionsModal = true
          } else {
            this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
          }
        })
      }
    },
    saveSingleMinimumCollection(e) {
      e.preventDefault();

      this.multipleMinimumCollectionsComputedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {

          } else {
            this.editingItemForMultiple.directoryAdvertisementDesignTypes.forEach(adDesignType => {

              this.editingItem.directoryAdvertisementDesignTypeId = adDesignType.id
              this.editingItem.directoryAdvertisementDesignTypeNameUz = adDesignType.nameUz
              this.editingItem.cost = adDesignType.cost

              this.editingItem.directoryAdvertisementLocationTypeId = this.editingItemForMultiple.directoryAdvertisementLocationType.id
              this.editingItem.directoryAdvertisementLocationTypeNameUz = this.editingItemForMultiple.directoryAdvertisementLocationType.nameUz
              this.editingItem.regionId = this.editingItemForMultiple.region.id
              this.editingItem.regionName = this.editingItemForMultiple.region.name
              this.editingItem.statusId = this.editingItemForMultiple.statusId

              this.editingItem.statusNameUz = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameUz

              this.editingItem.unitId = this.editingItemForMultiple.unit.id
              this.editingItem.unitShortNameUz = this.editingItemForMultiple.unit.shortNameUz

              let copiedItem = Object.assign({}, this.editingItem)

              copiedItem.decisionNumber = this.editingItem.decisionNumber
              copiedItem.createdDate = this.editingItem.createdDate
              copiedItem.description = this.editingItem.description

              this.minimumCollections.push(copiedItem)
            })
          }
          this.createMultipleMinimumCollectionsModal = false
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    customLabelAdLocationType(opt) {
      let selected = this.adLocationTypes.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelAdDesignType(opt) {
      let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${selected.nameUz}`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${selected.name}`
      }
      return ``;
    },
    customLabelUnit(opt) {
      let selected = this.units.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${selected.nameUz}`
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
          label: node.name,
        }
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem, 'by-first-agent').then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem, 'by-first-agent').then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
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
      await crudAndListsService.getEmpty(MAIN_API_URL, 'by-first-agent')
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false, null, 'by-first-agent')
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }
    // GET STATUSES
    /* await helperService.getRefByCode('status')
        .then(res => {
            this.statuses = res.data.children
            if (this.isModeCreate) {
                let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
                if (activeStatus) {
                    this.editingItem.statusId = activeStatus.id
                    this.editingItemForMultiple.statusId = activeStatus.id
                }
            }
        })
        .catch(e => {
            console.log(e)
        }) */

    // GET REGIONS
    await helperService.fetchRegions()
        .then(res => {
          this.regions = res.data
          this.regionSelected(this.editingItem.addressDto ? this.editingItem.addressDto.regionId : null, true)
        })
        .catch(e => {
          console.log(e)
        })

    // GET AD_SIDES
    crudAndListsService
        .searchList('directory/type-of-outdoor-advertising-tools', this.var_default_search_payload)
        .then((res) => {
          this.adSides = res.data.list;
        })
        .catch(e => {
          console.log(e)
        })

    // GET AD_GROUPS
    crudAndListsService
        .searchList('directory/advertisement-group', this.var_default_search_payload)
        .then((res) => {
          this.adGroups = res.data.list;
        })
        .catch(e => {
          console.log(e)
        })

    // GET AD_LOCATION_TYPES
    crudAndListsService
        .searchList('directory/advertisement-location-types', this.var_default_search_payload)
        .then((res) => {
          this.adLocationTypes = res.data.list;
          this.adLocationTypeSelected(this.editingItem.directoryAdvertisementLocationTypeId, true)
        })
        .catch(e => {
          console.log(e)
        })

    // GET AD_TYPES
    crudAndListsService
        .searchList('directory/advertisement-type', this.var_default_search_payload)
        .then((res) => {
          this.adTypes = res.data.list;
        })
        .catch(e => {
          console.log(e)
        })

    // GET CONTRACTORS
    this.fetchContractors()
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
</style>