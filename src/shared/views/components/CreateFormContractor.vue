<template>
  <ValidationObserver ref="observer" v-slot="{}" >
    <b-row class="mb-3">
      <b-col sm="12" md="6" class="mb-4 text-bold">
        <div class="base-input-wrapper base-form-input base-form-component">
          <label class="base-form-component__label" :class="{'font-weight-bold': !editingItem.isYur}">
            {{ $t('column.yatt_contragent') }}
          </label>
          <b-form-checkbox v-model="editingItem.isYur" switch>
            <span :class="{'font-weight-bold': editingItem.isYur}">
              {{ $t('column.legal_contragent') }}
            </span>
          </b-form-checkbox>
        </div>
      </b-col>
      <b-col sm="12" md="6">
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            v-show="editingItem.isYur"
            v-model="editingItem.inn"
            name="INN"
            mask="#########"
            class="required"
            placeholder="123456789"
            with-input-append
            :rules="{required: editingItem.isYur, regex: /\b\d{9}\b/}"
            :label="$t('column.inn')"
            @blur="validateInn"
            @keyup.enter="findContractorByInn"
        >
          <template v-slot:append-slot>
            <b-button
                @click="findContractorByInn"
                variant="outline-primary"
                id="contractorSearchButton"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-account-search"></i>
            </b-button>
          </template>
        </BaseInputWithValidation>
        <BaseInputWithValidation
            v-show="!editingItem.isYur"
            v-model="editingItem.pinfl"
            name="PINFL"
            mask="##############"
            class="required"
            placeholder="12345678901234"
            with-input-append
            :rules="{required: !editingItem.isYur, regex: /\b\d{14}\b/}"
            :label="$t('column.personal_number')"
            @blur="validatePinfl"
            @keyup.enter="findContractorByPinfl"
        >
          <template v-slot:append-slot>
            <b-button
                @click="findContractorByPinfl"
                variant="outline-primary"
                id="contractorSearchButton"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-account-search"></i>
            </b-button>
          </template>
        </BaseInputWithValidation>
      </b-col>
      <b-col sm="12" md="6">
        <!-- PARENT -->
        <BaseMultiselectWithValidation
            not-required
            v-model="editingItem.parentId"
            :has-next-page="hasNextPageContractors"
            @reachedEndOfList="contractorReachedEndOfList"
            @search-change="debounceSearchContractors"
            :searchable="true"
            preserve-search
            :clear-on-select="false"
            :loading="isLoadingContractors"
            :internal-search="false"
            :options="contractors.map(e => e.id)"
            :label="$t('column.superior_parent')"
            :placeholder="$t('column.contractor')"
            :custom-label="customLabelContractor"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
            with-create-addition
        >
          <template v-slot:append-slot>
            <b-button
                @click="contractorCreateModal = true"
                variant="outline-primary"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-plus-circle"></i>
            </b-button>
          </template>
        </BaseMultiselectWithValidation>
        <BaseModalForCreate
            v-model="contractorCreateModal"
            without-list-search
            use-component-save-fn
            mainApiUrl="contractor"
            createFormName="CreateFormContractor"
            @new-ref-created-without-list-search="newRefCreated"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            rules="required"
            v-model="editingItem.fullName"
            :label="$t('column.full_name')"
            :placeholder="$t('column.full_name')"
            class="required"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            rules="required"
            v-model="editingItem.shortname"
            :label="$t('column.short_name')"
            :placeholder="$t('column.short_name')"
            class="required"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            rules="required"
            v-model="editingItem.director"
            :label="$t('column.director')"
            :placeholder="$t('column.director')"
            class="required"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.accounter"
            :label="$t('column.accounter')"
            :placeholder="$t('column.accounter')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            :rules="{required: false, regex: /\b\d{5}\b/}"
            class=""
            v-model="editingItem.oked"
            mask="#####"
            :label="$t('column.oked')"
            placeholder="12345"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.vatCode"
            :label="$t('column.vat_code')"
            :placeholder="$t('column.vat_code')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseMultiselectWithValidation
            rules="required"
            class="required"
            v-model="editingItem.addressDto.regionId"
            @select="regionSelected"
            :options="regions.map(e => e.id)"
            :label="$t('column.region')"
            :custom-label="customLabelRegion"
            :placeholder="$t('column.region')"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseMultiselectWithValidation
            rules="required"
            class="required"
            v-model="editingItem.addressDto.districtId"
            :options="districts.map(e => e.id)"
            :label="$t('column.district')"
            :custom-label="customLabelDistrict"
            :placeholder="$t('column.district')"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.address"
            :label="$t('column.address')"
            :placeholder="$t('column.address')"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.mobileNumber"
            :label="$t('column.mobile_number')"
            mask="+998#########"
            placeholder="+998#########"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseMultiselectWithValidation
            not-required
            v-model="editingItem.formOfOwnershipId"
            :options="formOfOwnerships.map(e => e.id)"
            :label="$t('submodules.form_of_ownership.title')"
            :custom-label="customLabelFormOfOwnership"
            placeholder=""
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.faxNumber"
            :label="$t('column.fax_number')"
            :placeholder="$t('column.fax_number')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6" >
        <BaseInputWithValidation
            not-required
            v-model="editingItem.phoneNumber"
            :label="$t('column.phone_number')"
            mask="+998#########"
            placeholder="+998#########"
        />
      </b-col>
      <b-col sm="12" md="6" >
        <BaseInputWithValidation
            rules="email"
            v-model="editingItem.email"
            :label="$t('column.mail')"
            :placeholder="$t('column.mail')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6" >
        <!-- STATUS -->
        <BaseSelectWithValidation
            v-model="editingItem.statusId"
            class="required"
            rules="required"
            :label="$t('column.status')"
            value-field="id"
        >
          <template #first>
            <b-form-select-option :value="null" disabled >{{ $t('column.status') }}</b-form-select-option>
            <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`" :value="status.id" >
              {{
                getName({
                  nameRu: status.nameRu,
                  nameLt: status.nameLt,
                  nameUz: status.nameUz,
                })
              }}
            </b-form-select-option>
          </template>
        </BaseSelectWithValidation>
      </b-col>
      <b-col sm="12" md="6" >
        <div class="form-check form-check-right">
          <input
              v-model="editingItem.canRegister"
              class="form-check-input"
              type="checkbox"
              id="formCheckIsLegal"
          />
          <label
              class="form-check-label font-weight-normal"
              for="formCheckIsLegal"
          >
            {{ $t('column.can_login') }}
          </label>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="12">
        <h5 class="m-0 text-center">
          {{ $t('column.founders') }}
        </h5>
        <hr class="my-2">
        <b-table
            :items="computedFoundersDtos"
            :fields="foundersFields"
            sticky-header="400px"
            bordered
            small
            hover
            show-empty
            striped
        >
          <!-- NUMBER OF ITEM -->
          <template #cell(index)="data">
            {{
              data.index + 1
            }}
          </template>
          <!-- FOUNDER_SHARE_SUM -->
          <template #cell(founderShareSum)="data">
            {{ data.item.founderShareSum | toCurrency }}
          </template>
          <!-- TYPE -->
          <template #cell(type)="data">
            <b-badge
                :variant="data.item.isLegal ? 'primary' : 'success'"
                class="font-weight-bold"
                style="font-size: .7rem;"
            >{{ data.item.isLegal ? $t('column.legal_entity') : $t('column.individual') }}
            </b-badge>
          </template>
          <!-- EMPTY SLOT -->
          <template #empty="">
            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
/** YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"
const MAIN_API_URL = 'contractor'
export default {
  name: "CreateFormContractor",
  /** PROPS */
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    }
  },
  /** COMPONENTS */
  components: {},
  /** DATA */
  data() {
    return {
      foundersFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          key: 'fullName',
          label: this.$t('column.name'),
        },
        {
          key: 'inn',
          label: this.$t('column.inn'),
        },
        {
          key: 'pnfl',
          label: this.$t('column.personal_number'),
        },
        {
          key: 'type',
          label: this.$t('column.type'),
        },
        {
          key: 'founderSharePercent',
          label: this.$t('column.share_percentage'),
        },
        {
          key: 'founderShareSum',
          label: this.$t('column.share_sum'),
        },
      ],
      originalDto: {
        addressDto: {},
        foundersDtos: []
      },
      originalInn: null,
      originalPinfl: null,
      // CONTRACTOR SELECT_AND_CREATE VARS
      hasNextPageContractors: false,
      contractors: [],
      debounce: null,
      isLoadingContractors: false,
      contractorCreateModal: false,
      contractorSearchPayload: {},
      // ---------------------------------
      formOfOwnerships: [],
      regions: [],
      districts: [],
      statuses: [],
      editingItem: {
        isYur: true,
        addressDto: {},
        foundersDtos: []
      },
      defaultFounder: {
        founderName: null,
        percentage: null
      }
    }
  },
  /** COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateContractor'
    },
    computedObserver() {
      return this.$refs.observer
    },
    computedFoundersDtos(){
      if (this.editingItem.regContractorDto?.founders?.length > 0) {
        return this.editingItem.regContractorDto.founders.map((founder, index) => {
          if (founder.founderIndividual) {
            return {
              index: index,
              fullName: `${founder.founderIndividual.lastName} ${founder.founderIndividual.firstName} ${founder.founderIndividual.middleName}`,
              inn: founder.founderIndividual.tin ?? null,
              pnfl: founder.founderIndividual.pinfl ?? null,
              type: null,
              isLegal: false,
              founderSharePercent: founder.founderIndividual?.founderSharePercent ?? null,
              founderShareSum: founder.founderIndividual?.founderShareSum ?? null,
            }
          }
          if (founder.founderLegal) {
            return {
              index: index,
              fullName: founder.founderLegal?.name ?? null,
              inn: founder.founderLegal?.tin ?? null,
              pnfl: null,
              type: null,
              isLegal: true,
              founderSharePercent: founder.founderLegal?.founderSharePercent ?? null,
              founderShareSum: founder.founderLegal?.founderShareSum ?? null,
            }
          }
        })
      }
      return this.editingItem.foundersDtos
    },
  },
  /** METHODS */
  methods: {
    // CONTRACTOR SELECT_AND_CREATE METHODS
    contractorReachedEndOfList(e) {
      if (e && !this.isLoadingContractors) {
        this.fetchContractors()
      }
    },
    async debounceSearchContractors(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText);
      }, 1000);
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    fetchContractorsWithKeyword(keyword, makeFirstSelected = false) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      this.fetchContractors(makeFirstSelected)
    },
    async fetchContractors(makeFirstSelected) {
      this.contractorSearchPayload.sortBy = []
      this.contractorSearchPayload.sortBy.push('created')
      this.contractorSearchPayload.sortDesc = []
      this.contractorSearchPayload.sortDesc.push(true)
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor', !this.customIsModeCreate)
          .then(res => {
            this.contractors.push(...res.data.list)
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
            if (makeFirstSelected) {
              this.editingItem.parentId = this.contractors.length ? this.contractors[0].id : null
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
    newRefCreated(formName) {
      if (formName === 'CreateFormContractor') {
        this.fetchContractorsWithKeyword('', true)
      }
    },
    // ------------------------------------
    addFounderDto() {
      let tmp = Object.assign({}, this.defaultFounder)
      this.editingItem.foundersDtos.push(tmp)
    },
    setDefaultActiveStatus() {
      let activeStatus = this.statuses.find(el => el.code === 'ACTIVE')
      if (activeStatus) {
        this.editingItem.statusId = activeStatus.id
      }
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.editingItem.addressDto.districtId = null
      }
      // GET DISTRICTS
      if ($event)
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
            })
            .catch(e => {
              console.log(e)
            })
    },
    async validateInn() {
      let res = await helperService.validateInnFromApi(this.editingItem.inn)
      if (!res.data) {
        this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
      }
      return res.data
    },
    async validatePinfl() {
      if (!this.editingItem.pinfl) {
        this.computedObserver.setErrors({pinfl: [this.$t('validator.required')]});
      }
      if (this.editingItem.pinfl.length !== 14) {
        this.computedObserver.setErrors({pinfl: [this.$t('validator.regex')]});
      }
    },
    setFoundersFromSoliq(foundersFromSoliq = []) {
      let foundersDtos = foundersFromSoliq.filter(el => {
        let founderDto = {
          contractorId: null,
          founderAddressId: null,
          founderContactId: null,
          founderIndividualId: null,
          founderLegalId: null,
          founderSharePercent: el.founderIndividual ? el.founderIndividual.founderSharePercent : el.founderLegal ? el.founderLegal.founderSharePercent : null,
          founderShareSum: el.founderIndividual ? el.founderIndividual.founderShareSum : el.founderLegal ? el.founderLegal.founderShareSum : null,
          fullName: el.founderLegal ? el.founderLegal.name : el.founderIndividual ? `${el.founderIndividual.firstName} ${el.founderIndividual.lastName} ${el.founderIndividual.middleName ? el.founderIndividual.middleName : ''}` : null,
          id: null,
          inn: el.founderLegal ? el.founderLegal.tin : el.founderIndividual ? el.founderIndividual.tin : null,
          isLegal: el.founderLegal ? true : el.founderIndividual ? false : null,
          pnfl: el.founderIndividual ? el.founderIndividual.pinfl : null,
        }
        if (founderDto.inn) {
          return founderDto
        }
      })
      this.$set(this.editingItem, 'foundersDtos', foundersDtos);
    },
    findContractorByInn() {
      if (this.computedObserver.fields.INN.valid)
        helperService.validateInnFromApi(this.editingItem.inn, true)
            .then(res => {
              if (res.data) {
                let isYur = this.editingItem.isYur;
                if (this.editingItem.inn != this.originalInn) {
                  helperService.getContractorInfoByInnForCreate(this.editingItem.inn, this.editingItem.pinfl, this.editingItem.isYur, true)
                      .then(res => {
                        this.editingItem = Object.assign({}, res.data)
                        this.editingItem.isYur = isYur
                        this.setDefaultActiveStatus()
                        // FETCH DISTRICTS
                        this.regionSelected(this.editingItem.addressDto.regionId, true)
                        // CHECK AND SET FOUNDERS FROM SOLIQ
                        if (res.data.regContractorDto && res.data.regContractorDto.founders) {
                          this.setFoundersFromSoliq(res.data.regContractorDto.founders)
                        } else {
                          this.setFoundersFromSoliq()
                        }
                      })
                      .catch(e => {
                        // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
                      })
                } else {
                  helperService.getContractorInfoByInnForUpdate(this.editingItem.inn, this.editingItem.pinfl, this.editingItem.isYur, true)
                      .then(res => {
                        this.editingItem = Object.assign({}, res.data)
                        this.editingItem.isYur = isYur
                        this.$set(this.editingItem, 'addressDto', this.originalDto.addressDto)
                        this.$set(this.editingItem, 'mobileNumber', this.originalDto.mobileNumber)
                        this.$set(this.editingItem, 'email', this.originalDto.email)
                        this.$set(this.editingItem, 'canRegister', this.originalDto.canRegister)
                        this.setDefaultActiveStatus()
                        // FETCH DISTRICTS
                        this.regionSelected(this.editingItem.addressDto.regionId, true)
                        // CHECK AND SET FOUNDERS FROM SOLIQ
                        if (res.data.regContractorDto && res.data.regContractorDto.founders) {
                          this.setFoundersFromSoliq(res.data.regContractorDto.founders)
                        } else {
                          this.setFoundersFromSoliq()
                        }
                      })
                      .catch(e => {
                        // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
                      })
                }
              } else {
                this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
              }
            })
            .catch(e => {
              console.log(e)
            })
    },
    findContractorByPinfl() {
      if (this.computedObserver.fields.PINFL.valid)
        if (this.editingItem.pinfl !== this.originalPinfl) {
          let isYur = this.editingItem.isYur;
          helperService.getContractorInfoByInnForCreate(this.editingItem.inn, this.editingItem.pinfl, this.editingItem.isYur, true)
              .then(({ data }) => {
                this.editingItem = Object.assign({}, data)
                this.editingItem.isYur = isYur
                this.setDefaultActiveStatus()
                // FETCH DISTRICTS
                this.regionSelected(this.editingItem.addressDto.regionId, true)
                // CHECK AND SET FOUNDERS FROM SOLIQ
                if (data.regContractorDto && data.regContractorDto.founders) {
                  this.setFoundersFromSoliq(data.regContractorDto.founders)
                } else {
                  this.setFoundersFromSoliq()
                }
              })
              .catch(e => {
              })
        } else {
          helperService.getContractorInfoByInnForUpdate(this.editingItem.inn, this.editingItem.pinfl, this.editingItem.isYur, true)
              .then(res => {
                this.editingItem = Object.assign({}, res.data)
                this.editingItem.isYur = isYur
                this.$set(this.editingItem, 'addressDto', this.originalDto.addressDto)
                this.$set(this.editingItem, 'mobileNumber', this.originalDto.mobileNumber)
                this.$set(this.editingItem, 'email', this.originalDto.email)
                this.$set(this.editingItem, 'canRegister', this.originalDto.canRegister)
                this.setDefaultActiveStatus()
                // FETCH DISTRICTS
                this.regionSelected(this.editingItem.addressDto.regionId, true)
                // CHECK AND SET FOUNDERS FROM SOLIQ
                if (res.data.regContractorDto && res.data.regContractorDto.founders) {
                  this.setFoundersFromSoliq(res.data.regContractorDto.founders)
                } else {
                  this.setFoundersFromSoliq()
                }
              })
              .catch(e => {
                // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
              })
        }
    },
    customLabelDistrict(opt) {
      let selectedDistrict = this.districts.find(e => e.id == opt);
      if (selectedDistrict) {
        return `${this.getName({
          nameRu: selectedDistrict.nameRu,
          nameLt: selectedDistrict.nameLt,
          nameUz: selectedDistrict.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selectedRegion = this.regions.find(e => e.id == opt);
      if (selectedRegion) {
        return `${this.getName({
          nameRu: selectedRegion.nameRu,
          nameLt: selectedRegion.nameLt,
          nameUz: selectedRegion.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelFormOfOwnership(opt) {
      let selected = this.formOfOwnerships.find(e => e.id == opt);
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
    async save() {
      let isInnValid = await this.validateInn()
      if (!isInnValid) {
        return
      }
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.foundersDtos) {
            this.editingItem.foundersDtos = this.editingItem.foundersDtos.filter(el => {
              return el.founderName && el.founderName.toString().trim().length && el.percentage
            })
          }
          if (!this.isModeCreate) {
            this.editingItem.id = this.$route.params.id.toString()
            crudAndListsService.update(MAIN_API_URL, this.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {addressDto: {}});
              // this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
              this.$emit('saved', res.data)
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {addressDto: {}});
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
              this.$emit('saved', res.data)
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  /** CREATED */
  async created() {
    // FOR CONTRACTOR SELECT_AND_ADD
    this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
    this.fetchContractors()
    // -----------------------------
    this.var_default_search_payload.itemsPerPage = 500
    if (this.isModeCreate) {
      crudAndListsService.getEmpty(MAIN_API_URL, null, true)
          .then(res => {
            this.editingItem = Object.assign({}, res.data)
            this.editingItem.isYur = true;
            /* if (!this.editingItem.foundersDtos || !this.editingItem.foundersDtos.length) {
                this.editingItem.foundersDtos = []
                let tmpFounder = Object.assign({}, this.defaultFounder)
                this.editingItem.foundersDtos.push(tmpFounder)
            } */
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
          .then(res => {
            if (res.data.isYur === null) {
              res.data.isYur = Boolean(!res.data.pinfl && res.data.inn);
            }
            this.editingItem = Object.assign({}, res.data)
            console.log(this.editingItem.inn, this.editingItem)
            this.originalInn = this.editingItem.inn
            this.originalPinfl = this.editingItem.pinfl
            this.originalDto = JSON.parse(JSON.stringify(res.data))
            /* if (!this.editingItem.foundersDtos || !this.editingItem.foundersDtos.length) {
                this.editingItem.foundersDtos = []
                let tmpFounder = Object.assign({}, this.defaultFounder)
                this.editingItem.foundersDtos.push(tmpFounder)
            } */
            if (this.editingItem.parentId) {
              let parentIdx = this.contractors.findIndex(el => el.id == this.editingItem.parentId)
              if (parentIdx < 0) {
                this.contractors.push(this.editingItem.parent)
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
    }
    // GET STATUSES
    helperService.getRefByCode('status', true)
        .then(res => {
          this.statuses = res.data.children
          if (this.isModeCreate) {
            this.setDefaultActiveStatus()
          }
        })
        .catch(e => {
          console.log(e)
        })
    // GET REGIONS
    helperService.fetchRegions(true)
        .then(res => {
          this.regions = res.data
          this.regionSelected(this.editingItem.addressDto.regionId, true)
        })
        .catch(e => {
          console.log(e)
        })
    // GET FORM_OF_OWNERSHIP
    crudAndListsService
        .searchList('directory/form-of-ownerships', this.var_default_search_payload, null, true)
        .then((res) => {
          this.formOfOwnerships = res.data.list;
        })
        .catch(e => {
          console.log(e)
        })
  },
  watch: {
    'editingItem.isYur': {
      handler(newVal, oldVal){
        console.log(newVal, oldVal)
        if ( newVal !== oldVal) {
          this.editingItem = {
            isYur: newVal,
            addressDto: {},
            foundersDtos: []
          }
        }
      },
      deep: true
    }
  },
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