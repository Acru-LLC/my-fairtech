<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="$t('submodules.ad_passport_info.title') + ' - ' + isModeCreate ? $t('actions.create') : $t('actions.update')"
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
                        @blur="validateInn"
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
                        disabled
                        v-model="editingItem.contractorPhoneNumber"
                        :label="$t('column.ad_construction_owner_phone_number')"
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
                        :label="$t('column.ad_construction_owner_address')"
                    />
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                    class="text-right"
                >
                    <b-form-checkbox
                        id="uzavtoyol"
                        v-model="editingItem.isUzAvtoYul"
                        name="uzavtoyol-checkbox"
                        style="font-size: medium;"
                    >
                        <strong>{{ $t('column.uzavtoyul') }}</strong>
                    </b-form-checkbox>
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
                        withCreateAddition
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="streetsModal = true"
                                variant="outline-primary"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i class="mdi mdi-plus-circle"></i>
                            </b-button>
                        </template>
                    </BaseMultiselectWithValidation>
                    <BaseModalForCreate
                        v-model="streetsModal"
                        mainApiUrl="directory/street-names"
                        :additional-params="{regionId: editingItem.addressDto.regionId,
              districtId: editingItem.addressDto.districtId,
              quarterId: editingItem.addressDto.quarterId}"
                        createFormName="CreateFormGeoRegionStreets"
                        @new-ref-created="newRefCreated"
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
                        name="additionalAddress"
                        :label="$t('column.orienter')"
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
                    <BaseMultiselectWithValidation
                        v-if="!editingItem.isUzAvtoYul"
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryAdvertisementZoneId"
                        @select="adZoneSelected"
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
                    <BaseMultiselectWithValidation
                        v-if="!editingItem.isUzAvtoYul"
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
                    <BaseInputWithValidation
                        v-if="!editingItem.isUzAvtoYul"
                        rules="required"
                        class="required"
                        disabled
                        v-model="coefficientValue"
                        :label="$t('column.coefficient')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        not-required
                        v-model="editingItem.passportCode"
                        :label="$t('column.code')"
                    />
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
                        @input="debounceCheckPassportNumber"
                        @blur="
                            onBlurPassportNumberInput(
                                $event.target.value
                            )
                        "
                        name="PassportNumber"
                        ref="passportNumber"
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
                                not-required
                                type="month"
                                format="MM-YYYY"
                                custom-styles="grid-template-columns: 50% 50%"
                                v-model="editingItem.passportGivenDate"
                                :label="$t('column.ad_construction_passport_expire_date')"
                                :placeholder="$t('column.from')"
                                :minValue="inputMinValue"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                        <b-col cols="4">
                            <BaseDatePickerWithValidation
                                not-required
                                type="month"
                                format="MM-YYYY"
                                custom-styles="grid-template-columns: 99% 1%"
                                only-form-element
                                v-model="editingItem.passportExpireDate"
                                :placeholder="$t('column.to')"
                                :maxValue="inputMaxValue"
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
                        @select="adDesignTypeSelected"
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
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryTypeOfOutdoorAdvertisingToolId"
                        @input="adSideSelected"
                        :options="adSides.map(el => el.id)"
                        :label="$t('column.ad_construction_side')"
                        placeholder=""
                        :custom-label="customLabelAdSide"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>

                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        v-if="editingItem.designTypePrivilegeCoefficient == 1 && !editingItem.isUzAvtoYul"
                        not-required
                        disabled
                        :label="$t('column.coefficient_by_collection_amount')"
                    />
                    <BaseInputWithValidation
                        v-else-if="!editingItem.isUzAvtoYul"
                        not-required
                        disabled
                        v-model="editingItem.designTypePrivilegeCoefficient"
                        :label="$t('column.coefficient_by_collection_amount')"
                    />
                </b-col>
            </b-row>

            <!-- <b-row class="mb-3">
          <b-col
              sm="12"
              md="6"
          >
              <BaseInputWithValidation
                  rules="required|positiveNotZero"
                  class="required"
                  v-model="editingItem.length"
                  @input="handleWidthLengthInput"
                  :label="$t('column.ad_construction_length')"
              />
          </b-col>

          <b-col
              sm="12"
              md="6"
          >
              <BaseInputWithValidation
                  rules="required|positiveNotZero"
                  class="required"
                  v-model="editingItem.volume"
                  disabled
                  :label="$t('column.ad_construction_volume')"
              />
          </b-col>
      </b-row> -->

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
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
                                v-model="editingItem.width"
                                @input="handleWidthLengthInput"
                                custom-styles="grid-template-columns: 51% 43%;"
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
                                ref="adVolume"
                                only-form-element
                                v-model="editingItem.volume"
                                custom-styles="grid-template-columns: unset;"
                                disabled
                                :placeholder="$t('column.volume')"
                            />
                        </b-col>
                    </b-row>

                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <b-col cols="7">
                            <BaseMultiselectWithValidation
                                v-if="isByAgency"
                                rules="required"
                                class="required"
                                v-model="editingItem.directoryAdvertisementObjectStateId"
                                :options="adObjectStates.map(el => el.id)"
                                :label="$t('column.status')"
                                placeholder=""
                                custom-styles="grid-template-columns: 44% 56%;"
                                :custom-label="customObjectState"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                        </b-col>
                        <b-col cols="5">
                            <BaseDatePickerWithValidation
                                v-if="isByAgency"
                                not-required
                                disableAfter
                                custom-styles="grid-template-columns: 40% 60%;"
                                v-model="editingItem.constructDate"
                                :label="$t('column.created_date')"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        not-required
                        disabled
                        v-model="editingItem.directoryAdvertisementVolumeTypeId"
                        @input="adVolumeTypeSelected"
                        :options="adVolumeTypes.map(el => el.id)"
                        :label="$t('submodules.ad_volume_types.title')"
                        placeholder=""
                        :custom-label="customLabelAdVolumeType"
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
                        v-if="isByAgency && !editingItem.isUzAvtoYul"
                        not-required
                        disabled
                        v-model="editingItem.monthlyPayment"
                        :label="$t('column.monthly_income')"
                    ></BaseInputWithValidation>
                </b-col>

                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseTextareaWithValidation
                        v-if="isByAgency"
                        not-required
                        v-model="editingItem.description"
                        max-rows="8"
                        :label="$t('column.comment')"
                        :placeholder="$t('column.comment')"
                    />
                </b-col>
            </b-row>

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
                        not-required
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
                        not-required
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
                        not-required
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
                        not-required
                        :name="`${$t('column.ad_construction_organisation')}-4`"
                        v-model="editingItem.organizationNameFour"
                        :label="$t('column.ad_construction_organisation')"
                    />
                </b-col>
            </b-row>
            <br />

            <b-row
                class="mb-3"
                v-if="!isModeCreate"
            >
                <b-col
                    sm="12"
                    md="3"
                >

                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        disabled
                        :label="$t('column.created_by')"
                        v-model="editingItem.createdByEmployeeFullName"
                    />
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
const MAIN_API_URL = 'contractor-advertising-construction'
const APPEND_API_URL_FOR_GOVERNMENT = 'by-first-agent'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

import MapInModal from './components/MapInModal'
import CreateFormContractor from '@/shared/views/components/CreateFormContractor'

export default {
    name: "CreateOrUpdateByGovernment",
    /*
    * COMPONENTS */
    components: {
        MapInModal,
        CreateFormContractor

    },
    /*
    * DATA */
    data () {
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
            editingItem1: {
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
        inputMinValue (value) {
            return value.editingItem.passportGivenDate
        },
        inputMaxValue (value) {
            return value.editingItem.passportExpireDate
        },
        isModeCreate () {
            return this.$route.name == 'CreateAdPassportInfoByAgency' || this.$route.name == 'CreateAdPassportInfoByGovernment'
        },
        isByAgency () {
            return this.$route.name == 'CreateAdPassportInfoByAgency' || this.$route.name == 'UpdateAdPassportInfoByAgency'
        },
        isByGovernment () {
            return this.$route.name == 'CreateAdPassportInfoByGovernment' || this.$route.name == 'UpdateAdPassportInfoByGovernment'
        },
        computedObserver () {
            return this.$refs.observer
        },
        multipleMinimumCollectionsComputedObserver () {
            return this.$refs['multiple-minimum-collections-observer']
        },
        singleMinimumCollectionUpdateComputedObserver () {
            return this.$refs['single-minimum-collection-update-observer']
        }
    },
    /*
    * METHODS */
    methods: {
        findAndSetAdVolumeType () {
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
        adSideSelected ($event) {
            let foundAdSide = this.adSides.find(el => el.id == $event)
            this.adSideValue = foundAdSide ? foundAdSide.code : null
            this.calculateAndSetMonthlyPayment()
        },
        adVolumeTypeSelected ($event) {
            this.getMinCollectionValue(this.editingItem.addressDto.regionId, this.editingItem.addressDto.districtId, this.editingItem.directoryAdvertisementLocationTypeId, this.editingItem.directoryAdvertisementDesignTypeId, $event)
        },
        calculateAndSetMonthlyPayment () {
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
        getPrivilegeCoefficientValueByAdDesignTypeId (adDesignTypeId) {
            if (adDesignTypeId) {
                helperService.getPrivilegeCoefficientValueByAdDesignTypeId(adDesignTypeId)
                    .then(res => {
                        this.editingItem.designTypePrivilegeCoefficient = res.data
                        this.calculateAndSetMonthlyPayment()
                    })
                    .catch(e => console.log(e))
            }
        },
        newRefCreated (newOptions, newId, formName) {
            if (formName == 'CreateFormGeoRegionQuarters') {
                this.quarters = newOptions
                this.editingItem.addressDto.quarterId = newId
            } else if (formName == 'CreateFormGeoRegionStreets') {
                this.streets = newOptions
                this.editingItem.addressDto.streetId = newId
            }
        },
        async onBlurPassportNumberInput (value) {
            if (this.isPassportNumberInvalid) {
                await this.checkAdPassportNumber(value, true);
            }
        },
        async debounceCheckPassportNumber (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.checkAdPassportNumber(searchText);
            }, 1000);
        },
        checkAdPassportNumber (searchQuery = "", fromOnBlur = false) {
            /*
             * AVOID MULTIPLE REQUESTS AT ONCE */
            if (!this.editingItem.addressDto.regionId || !searchQuery || this.checkPassportNumberLoading || (!this.isModeCreate && this.editingItem.passportNumber == this.dbPassportNumber)) return;
            this.checkPassportNumberLoading = true;
            helperService.checkAdPassportNumberByRegion(searchQuery, this.editingItem.addressDto.regionId)
                .then(res => {
                    this.isPassportNumberInvalid = res.data;
                    if (this.isPassportNumberInvalid) {
                        this.computedObserver.setErrors({ PassportNumber: [this.$t('validator.ad_passport_number_already_in_use')] });
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
        saveLocation (e) {
            this.$set(this.editingItem, 'latNumber', e.lat)
            this.$set(this.editingItem, 'lngNumber', e.lng)
            this.mapModal = false
        },
        drawCreated (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }

            this.featureGroup.addLayer(layer);
        },
        openMapModal () {
            this.mapModal = true
        },
        async contractorSaved (res) {
            this.contractorCreateModal = false
            this.contractorNotFound = false
            await this.fetchContractorsWithKeyword('', true)
        },
        createContractor (e) {
            e.preventDefault()

            this.$refs.createFormContractor.save()
        },
        validateInn () {
            helperService.validateInnFromApi(this.editingItem.inn)
                .then(res => {
                    if (!res.data) {
                        this.computedObserver.setErrors({ INN: [this.$t('validator.inn')] });
                        this.contractorSelected(null, true)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getSingleContractorByInn () {
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
                            this.computedObserver.setErrors({ INN: [this.$t('validator.inn')] });
                            this.contractorSelected(null, true)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
        handleWidthLengthInput (widthOrLength) {
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
        addPassportDateChanged (e) {
            if (e[0]) {
                this.editingItem.passportGivenDate = e[0]
                this.editingItem.passportExpireDate = e[1]
            } else {
                this.editingItem.passportGivenDate = null
                this.editingItem.passportExpireDate = null
            }
        },
        customLabelAdSide (opt) {
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
        customLabelAdVolumeType (opt) {
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
        customLabelAdZone (opt) {
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
        customLabelAdRegionGroup (opt) {
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
        customLabelAdType (opt) {
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
        customLabelStreet (opt) {
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
        customLabelQuarter (opt) {
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
        customLabelDistrict (opt) {
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
        async regionSelected ($event, dontResetDistrict = false) {
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

                if (!this.editingItem.isUzAvtoYul) {
                    // GET GROUP OF REGION
                    await helperService.getGroupOfRegion($event)
                        .then(res => {
                            this.$set(this.editingItem, 'directoryAdvertisementGroupId', res.data.id)
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }

                if (this.editingItem.directoryAdvertisementLocationTypeId) {
                    // GET AD_DESIGN_TYPES
                    helperService
                        .getAdDesignTypesByAdLocationTypeId(this.editingItem.directoryAdvertisementLocationTypeId, $event)
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
            }
            this.checkAdPassportNumber(this.editingItem.passportNumber)
        },
        getCoefficientValue (districtId, adZoneId) {
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
        getMinCollectionValue (regionId, districtId, adLocationTypeId, adDesignTypeId, adVolumeTypeId) {
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
        async districtSelected ($event, dontResetQuarter = false) {
            if (!dontResetQuarter) {
                this.editingItem.addressDto.quarterId = null
                this.editingItem.directoryAdvertisementZoneId = null
            }
            this.getMinCollectionValue(this.editingItem.addressDto.regionId, $event, this.editingItem.directoryAdvertisementLocationTypeId, this.editingItem.directoryAdvertisementDesignTypeId, this.editingItem.directoryAdvertisementVolumeTypeId)
            this.getCoefficientValue($event, this.editingItem.directoryAdvertisementZoneId)
            if ($event) {
                // GET QUARTERS
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


                if (!this.editingItem.isUzAvtoYul) {
                    // GET AD_ZONES BY DISTRICT_ID
                    await helperService.getAdZonesByDistrictId($event)
                        .then(res => {
                            this.adZones = res.data
                        })
                        .catch(e => {
                            console.log(e)
                            this.adZones = []
                        })
                }
            } else {
                this.quarters = []
                this.adZones = []
                this.minCollectionValue = null
                this.coefficientValue = null
            }
        },
        async adDesignTypeSelected ($event) {
            this.getMinCollectionValue(this.editingItem.addressDto.regionId, this.editingItem.addressDto.districtId, this.editingItem.directoryAdvertisementLocationTypeId, $event, this.editingItem.directoryAdvertisementVolumeTypeId)
            this.getPrivilegeCoefficientValueByAdDesignTypeId($event)
        },
        async adZoneSelected ($event) {
            this.getCoefficientValue(this.editingItem.addressDto.districtId, $event)
        },
        async quarterSelected ($event, dontResetStreet = false) {
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
        customObjectState (opt) {
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
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName}`
            }
            return ``;
        },
        contractorReachedEndOfList (e) {
            if (e) {
                this.fetchContractors()
            }
        },
        contractorSelected (contractorDtoOrId, dontResetInn = false, fromInnSearch = false) {
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
                this.editingItem.contractorAddress = `${foundContractor.addressDto.regionNameUz}, ${foundContractor.addressDto.districtNameUz} ${foundContractor.addressDto.additional ? ',' + foundContractor.addressDto.additional : ''}`
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
        async debounceSearchContractors (searchText) {
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
        fetchContractorsWithKeyword (keyword, makeSelectedByInn = false, fromContractorModalCancel = false) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            this.fetchContractors(makeSelectedByInn, fromContractorModalCancel)
        },
        async fetchContractors (makeSelectedByInn, fromContractorModalCancel) {
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
        async adLocationTypeSelected (adLocationTypeObjectOrId, dontResetAdDesignType = false) {
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
        customLabelAdLocationType (opt) {
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
        customLabelAdDesignType (opt) {
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
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
            if (selected) {
                return `${this.getName({
                    nameRu: selected.regionNameRu,
                    nameLt: selected.regionNameLt,
                    nameUz: selected.regionNameUz,
                })}`
            }
            return ``;
        },
        customLabelUnit (opt) {
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
        treeClosed (veeName) {
            this.computedObserver.refs[veeName].validate();
        },
        normalizer (node) {
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
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    this.$set(this.editingItem, 'monthlyPayment', this.notFormattedMonthlyPayment)
                    if (this.editingItem.id || this.$route.params.id) {
                        crudAndListsService.update(MAIN_API_URL, this.isByGovernment ? this.editingItem : {
                            contractorAdvertisingConstructionForSecondAgentDto: this.editingItem,
                            id: this.editingItem.id
                        }, this.isByGovernment ? APPEND_API_URL_FOR_GOVERNMENT : false, true).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, { addressDto: {} });
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.isByGovernment ? this.editingItem : { contractorAdvertisingConstructionForSecondAgentDto: this.editingItem }, this.isByGovernment ? APPEND_API_URL_FOR_GOVERNMENT : false, true).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, { addressDto: {} });
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        }
    },
    /*
    * CREATED */
    async created () {
        this.var_default_search_payload.itemsPerPage = 500;
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL, this.isByGovernment ? APPEND_API_URL_FOR_GOVERNMENT : false)
                .then(res => {
                    this.editingItem = this.isByGovernment ? res.data : res.data.contractorAdvertisingConstructionForFirstAgentDto
                    this.editingItem1 = this.isByGovernment ? { addressDto: {} } : res.data.contractorAdvertisingConstructionForSecondAgentDto
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true, null, this.isByGovernment ? APPEND_API_URL_FOR_GOVERNMENT : false)
                .then(res => {
                    this.editingItem = this.isByGovernment ? res.data : res.data.contractorAdvertisingConstructionForSecondAgentDto
                    // ASSIGN OLD_SAVED_PASSPORT_NUMBER ON DATABASE TO LOCAL VARIABLE
                    this.dbPassportNumber = this.editingItem.passportNumber
                })
                .catch(e => {
                    console.log(e)
                })
        }

        // GET REGIONS
        await helperService.fetchRegionsForAdvertisementByCurrentUserId()
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

        if (!this.editingItem.isUzAvtoYul) {
            // GET AD_GROUPS
            crudAndListsService
                .searchList('directory/advertisement-group', this.var_default_search_payload)
                .then((res) => {
                    this.adGroups = res.data.list;
                })
                .catch(e => {
                    console.log(e)
                })
        }

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
        await this.fetchContractors()

        if (this.isByAgency) {
            // GET AD_OBJECT_STATES
            crudAndListsService
                .searchListWithKeyword('directory/advertisement-object-state', this.var_default_search_payload)
                .then((res) => {
                    this.adObjectStates = res.data.list;
                })
                .catch(e => {
                    console.log(e)
                })
        }

        if (!this.isModeCreate) {
            this.contractorSelected(this.editingItem.contractorId)
            this.findAndSetAdVolumeType()
            this.getCoefficientValue(this.editingItem.addressDto.districtId, this.editingItem.directoryAdvertisementZoneId)
            this.adSideSelected(this.editingItem.directoryTypeOfOutdoorAdvertisingToolId)
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