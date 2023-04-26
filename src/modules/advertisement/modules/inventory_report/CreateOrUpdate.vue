<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      has-back-bottom
      has-save-suspend-bottom
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
      <div>
        <!-- ADVERTISEMENT CONSTRUCTION ADDRESS -->
        <h5 class="mb-3" style="text-align: center"><strong>1. {{ $t('column.ad_construction_address') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameUz,
                  }) ? getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameUz,
                  }) + ', ' : ''
                }}
                {{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameUz,
                  }) ? getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameUz,
                  }) + ', ' : ''
                }},
                {{ adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.addressDto.additional }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col>
                <BaseMultiselectWithValidation
                    v-model="createItem.quarterId"
                    :options="quarters.map(el => el.id)"
                    :label="$t('column.detected_condition')"
                    :custom-label="customLabelQuarters"
                    @select="quarterSelected"
                    :placeholder="$t('column.quarter')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <BaseMultiselectWithValidation
                    v-model="createItem.streetId"
                    :options="streets.map(el => el.id)"
                    :custom-label="customLabelStreet"
                    :placeholder="$t('column.street')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <BaseInputWithValidation v-model="createItem.additional"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT CONSTRUCTION PLACE -->
        <h5 class="mb-3" style="text-align: center"><strong>2. {{ $t('column.ad_construction_place') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementLocationOfOutdoorNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementLocationOfOutdoorNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementLocationOfOutdoorNameUz,
                  })
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseMultiselectWithValidation
                v-model="createItem.locationOfOutdoorId"
                :options="adLocationOfOutdoors.map(el => el.id)"
                :label="$t('column.detected_condition')"
                :custom-label="customLabelAdLocationType"
                :placeholder="''"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT CONSTRUCTION EXICTENCE DOCUMENT -->
        <h5 class="mb-3" style="text-align: center"><strong>3. {{
            $t('column.ad_construction_existence_document')
          }}</strong>
        </h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.passportNumber ? $t('column.ad_construction_passport_number') + ': ' + adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.passportNumber + ',' : ''
                }}{{
                  adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.passportCode ? $t('column.name') + ': ' + adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.passportCode + ',' : ''
                }}<br/></b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseTextareaWithValidation
                v-model="createItem.existenceDocument"
                max-rows="4"
                :label="$t('column.detected_condition')"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT TOOL TYPE -->
        <h5 class="mb-3" style="text-align: center"><strong>4. {{ $t('column.ad_tool_type') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementDesignTypeNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementDesignTypeNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementDesignTypeNameUz,
                  })
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseMultiselectWithValidation
                v-model="createItem.designTypeId"
                :options="adDesignTypes.map(el => el.id)"
                :label="$t('column.detected_condition')"
                :custom-label="customLabelAdDesignType"
                :placeholder="''"
                open-direction="bottom"
                :show-labels="false"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT TOOL VOLUME -->
        <h5 class="mb-3" style="text-align: center"><strong>5. {{ $t('column.ad_tool_volume') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameUz,
                  })
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseMultiselectWithValidation
                v-model="createItem.volumeTypeId"
                :options="adVolumeTypes.map(el => el.id)"
                :label="$t('column.detected_condition')"
                :custom-label="customLabelAdVolumeType"
                :placeholder="''"
                open-direction="bottom"
                :show-labels="false"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT TOOL CURRENT STATUS -->
        <h5 class="mb-3" style="text-align: center"><strong>6. {{ $t('column.ad_tool_current_status') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameUz,
                  })
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseMultiselectWithValidation
                v-model="createItem.objectStateId"
                :options="adObjectStates.map(el => el.id)"
                :label="$t('column.detected_condition')"
                :custom-label="customLabelAdObjectStates"
                :placeholder="''"
                open-direction="bottom"
                :show-labels="false"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT CONSTRUCTION LOCATE -->
        <h5 class="mb-3" style="text-align: center"><strong>7. {{ $t('column.state_ad_construction_locate') }}</strong>
        </h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"></b-col>
              <b-col cols="9"></b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3">
                <label>{{ $t('column.detected_condition') }}</label>
              </b-col>
              <b-col cols="9">
                <div>
                    <b-form-radio v-model="createItem.locateInState" name="some-radios" :value="$t('submodules.inventory_report.radio_box3')">{{ $t('submodules.inventory_report.radio_box3') }}</b-form-radio>
                    <b-form-radio v-model="createItem.locateInState" name="some-radios" :value="$t('submodules.inventory_report.radio_box4')">{{ $t('submodules.inventory_report.radio_box4') }}</b-form-radio>
                  <div class="mt-3">{{ $t('submodules.inventory_report.selected') }}: <strong>{{ createItem.locateInState }}</strong></div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT CONSTRUCTION ABOUT OWNER -->
        <h5 class="mb-3" style="text-align: center"><strong>8. {{ $t('column.ad_construction_about_owner') }}</strong>
        </h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorName ? $t('column.name') + ': ' + adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorName + ',' : ''
                }}<br/>
                {{
                  adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorPhoneNumber ? $t('column.phone_number') + ': ' + adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorPhoneNumber + ',' : ''
                }}<br/>
                {{
                  adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorAdditionalAddress ? $t('column.address') + ': ' + adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.contractorAdditionalAddress + ',' : ''
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseMultiselectWithValidation
                v-model="createItem.contractorId"
                :options="contractors.map(el => el.id)"
                :label="$t('column.detected_condition')"
                :custom-label="customLabelAdContractor"
                :placeholder="''"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
                withCreateAddition
            >
              <template v-slot:append-slot>
                <b-button
                    @click="addContractorModal = true"
                    variant="outline-primary"
                    style="padding: 2.5px 10px; font-size: 1.2rem;"
                >
                  <i class="mdi mdi-plus-circle"></i>
                </b-button>
              </template>
            </BaseMultiselectWithValidation>
            <BaseModalForCreate
                v-model="addContractorModal"
                mainApiUrl="contractor"
                :additional-params="{}"
                createFormName="CreateFormContractor"
                @new-ref-created="newRefCreated"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT TOOL ABOUT CONTRACTOR -->
        <h5 class="mb-3" style="text-align: center"><strong>9. {{ $t('column.ad_tool_about_contractor') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9"></b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseTextareaWithValidation
                v-model="createItem.infoByContractorAboutAdCompany"
                max-rows="4"
                :label="$t('column.detected_condition')"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT TOOL TYPE NAME -->
        <h5 class="mb-3" style="text-align: center"><strong>10. {{ $t('column.ad_tool_locate_type') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong>{{ $t('column.current_condition') }}:</strong></b-col>
              <b-col cols="9">{{
                  getName({
                    nameRu: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameRu,
                    nameLt: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameLt,
                    nameUz: adEditingItem.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameUz,
                  })
                }}
              </b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <!--            <BaseMultiselectWithValidation-->
            <!--                v-model="createItem.advertisementTypeId"-->
            <!--                :options="adTypes.map(el => el.id)"-->
            <!--                :label="$t('column.detected_condition')"-->
            <!--                :custom-label="customLabelAdTypes"-->
            <!--                :placeholder="''"-->
            <!--                open-direction="bottom"-->
            <!--                :show-labels="false"-->
            <!--            />-->
            <BaseInputWithValidation
                v-model="createItem.advertisementTypeName"
                :label="$t('column.detected_condition')"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- OTHER INFO -->
        <h5 class="mb-3" style="text-align: center"><strong>11. {{ $t('column.other_info') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong></strong></b-col>
              <b-col cols="9"></b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <BaseTextareaWithValidation
                v-model="createItem.otherInfo"
                max-rows="4"
                :label="$t('column.detected_condition')"
            />
          </b-col>
        </b-row>
        <hr>

        <!-- ADVERTISEMENT CONSTRUCTION 104 -->
        <h5 class="mb-3" style="text-align: center"><strong>12. {{ $t('column.ad_construction_104') }}</strong></h5>
        <b-row class="mb-5">
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3"><strong></strong></b-col>
              <b-col cols="9"></b-col>
            </b-row>
          </b-col>
          <b-col
              sm="12"
              md="6"
          >
            <b-row>
              <b-col cols="3">
                <label>{{ $t('column.detected_condition') }}</label>
              </b-col>
              <b-col cols="9">
                <div>
                  <b-form-radio v-model="createItem.vm104RelatedChanges" name="radios-for104" value="Мувофиқ">{{ $t('submodules.inventory_report.radio_box1') }}</b-form-radio>
                  <b-form-radio v-model="createItem.vm104RelatedChanges" name="radios-for104" value="Номувофиқ">{{ $t('submodules.inventory_report.radio_box2') }}</b-form-radio>
                  <div class="mt-3">{{ $t('submodules.inventory_report.selected') }}: <strong>{{ createItem.vm104RelatedChanges }}</strong></div>
                </div>
              </b-col>
            </b-row>

          </b-col>
        </b-row>
      </div>
    </ValidationObserver>

    <div>
      <div v-if="createItem.vm104RelatedChanges == 'Номувофиқ'">
        <b-row class="pb-5">
          <b-col class="px-5">
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">1.</strong>
              <b-form-checkbox v-model="createItem.locatedAtIntersectionOfHighways">
                {{ options[0].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">2.</strong>
              <b-form-checkbox v-model="createItem.locatedOnSidewalks">
                {{ options[1].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">3.</strong>
              <b-form-checkbox v-model="createItem.locatedNearRoadside">
                {{ options[2].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">4.</strong>
              <b-form-checkbox v-model="createItem.restrictsVisionForOther">
                {{ options[3].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">5.</strong>
              <b-form-checkbox v-model="createItem.distanceToRoadLessThanFiveMeters">
                {{ options[4].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">6.</strong>
              <b-form-checkbox v-model="createItem.locatedOnCarriagewayOrSidewalk">
                {{ options[5].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">7.</strong>
              <b-form-checkbox v-model="createItem.locatedAtPublicTransportStations">
                {{ options[6].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">8.</strong>
              <b-form-checkbox v-model="createItem.locatedCloseToTunnels">
                {{ options[7].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">9.</strong>
              <b-form-checkbox v-model="createItem.locatedCloseToHighVoltageElectricity">
                {{ options[8].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">10.</strong>
              <b-form-checkbox v-model="createItem.dataNotShownInFull">
                {{ options[9].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">11.</strong>
              <b-form-checkbox v-model="createItem.advertisingHeightMoreThanOneThirdOfBuilding">
                {{ options[10].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">12.</strong>
              <b-form-checkbox v-model="createItem.foundationsMoreThanFiftyCentimeters">
                {{ options[11].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">13.</strong>
              <b-form-checkbox v-model="createItem.foundationsPaintedIncorrectly">
                {{ options[12].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">14.</strong>
              <b-form-checkbox v-model="createItem.numberOfAdsAtFourWayIntersectionMoreThanFour">
                {{ options[13].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">15.</strong>
              <b-form-checkbox v-model="createItem.numberOfAdsAtThreeWayIntersectionMoreThanFour">
                {{ options[14].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">16.</strong>
              <b-form-checkbox v-model="createItem.distanceBetweenSmallSizedAdsLessThanFiftyMeters">
                {{ options[15].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">17.</strong>
              <b-form-checkbox v-model="createItem.distanceBetweenMediumSizedAds">
                {{ options[16].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">18.</strong>
              <b-form-checkbox v-model="createItem.distanceBetweenLargeSizedAds">
                {{ options[17].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">19.</strong>
              <b-form-checkbox v-model="createItem.distanceBetweenVeryLargeSizedAds">
                {{ options[18].name }}
              </b-form-checkbox>
            </b-row>
            <b-row class="mt-3">
              <strong style="margin-right: 5px;">20.</strong>
              <b-form-checkbox v-model="createItem.otherCases">
                {{ options[19].name }}
              </b-form-checkbox>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>

  </base-create-or-update-wrapper>
</template>
<script>
import crudAndListsService from "@/shared/services/crud_and_list.service"
import BaseMultiselectWithValidation from "../../../../components/base/BaseMultiselectWithValidation";
import BaseTextareaWithValidation from "../../../../components/base/BaseTextareaWithValidation";
import InventoryReportService from "./inventory_report.service";

const AD_MAIN_API_URL = 'contractor-advertising-construction'
const MAIN_API_URL = 'report/general-inventory-reports'
const APPEND_API_URL_FOR_GOVERNMENT = 'by-first-agent'

export default {
  name: "CreateOrUpdateByGovernment",
  /*
  * COMPONENTS */
  components: {BaseTextareaWithValidation, BaseMultiselectWithValidation},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      createItem: {},
      addContractorModal: false,
      adLocationOfOutdoors: [],
      quarters: [],
      streets: [],
      adDesignTypes: [],
      adVolumeTypes: [],
      adObjectStates: [],
      contractors: [],
      adTypes: [],
      items: [],
      adEditingItem: {
        contractorAdvertisingConstructionForSecondAgentDto: {addressDto: {}}
      },
      selected: [],
      options: [
        {item: 'a', name: this.$t('submodules.inventory_report.checkbox1')},
        {item: 'b', name: this.$t('submodules.inventory_report.checkbox2')},
        {item: 'c', name: this.$t('submodules.inventory_report.checkbox3')},
        {item: 'd', name: this.$t('submodules.inventory_report.checkbox4')},
        {item: 'e', name: this.$t('submodules.inventory_report.checkbox5')},
        {item: 'f', name: this.$t('submodules.inventory_report.checkbox6')},
        {item: 'g', name: this.$t('submodules.inventory_report.checkbox7')},
        {item: 'h', name: this.$t('submodules.inventory_report.checkbox8')},
        {item: 'j', name: this.$t('submodules.inventory_report.checkbox9')},
        {item: 'i', name: this.$t('submodules.inventory_report.checkbox10')},
        {item: 'k', name: this.$t('submodules.inventory_report.checkbox11')},
        {item: 'l', name: this.$t('submodules.inventory_report.checkbox12')},
        {item: 'm', name: this.$t('submodules.inventory_report.checkbox13')},
        {item: 'n', name: this.$t('submodules.inventory_report.checkbox14')},
        {item: 'o', name: this.$t('submodules.inventory_report.checkbox15')},
        {item: 'q', name: this.$t('submodules.inventory_report.checkbox16')},
        {item: 'r', name: this.$t('submodules.inventory_report.checkbox17')},
        {item: 's', name: this.$t('submodules.inventory_report.checkbox18')},
        {item: 't', name: this.$t('submodules.inventory_report.checkbox19')},
        {item: 'u', name: this.$t('submodules.inventory_report.checkbox20')},
      ]
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateInventoryReport'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    async quarterSelected($event) {
      this.var_default_search_payload.itemsPerPage = 500
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
    newRefCreated(newOptions, newId, formName) {
      if (formName == 'CreateFormContractor') {
        this.contractors = newOptions
        this.editingItem.contractorId = newId
      }
    },
    customLabelAdLocationType(opt) {
      let selected = this.adLocationOfOutdoors.find(e => e.id == (opt.id ? opt.id : opt));
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
    customLabelAdContractor(opt) {
      let selected = this.contractors.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${selected.fullName}`
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
    customLabelAdVolumeType(opt) {
      let selected = this.adVolumeTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
    customLabelAdObjectStates(opt) {
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
    customLabelAdTypes(opt) {
      let selected = this.adTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
    customLabelQuarters(opt) {
      let selected = this.quarters.find(e => e.id == (opt.id ? opt.id : opt));
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
      let selected = this.streets.find(e => e.id == (opt.id ? opt.id : opt));
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
    save() {
      this.createItem.constructionId = this.$route.params.adId
      if (!this.isModeCreate) {
        InventoryReportService.update(this.$route.params.adId, this.$route.params.id, this.createItem).then(res => {
          this.createItem = {}
          this.$router.go(-1)
          this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
        })
      } else {
        InventoryReportService.create(this.$route.params.adId, this.createItem).then(res => {
          this.createItem = {}
          this.$router.go(-1)
          this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
        })
      }
    },
    async getAdvertisementConstruction() {
      let districtId = 0
      await crudAndListsService.getById(AD_MAIN_API_URL, this.$route.params.adId)
          .then(res => {
            this.adEditingItem = res.data
            districtId = res.data.contractorAdvertisingConstructionForSecondAgentDto.addressDto.districtId
          })
          .catch(e => {
            console.log(e)
          })
      this.var_default_search_payload.itemsPerPage = 500
      await crudAndListsService.searchListWithKeyword('directory/quarter-names', this.var_default_search_payload, `get-by-districtId/${districtId}`)
          .then(res => {
            this.quarters = res.data.list
          })
          .catch(e => {
            console.log(e)
            this.quarters = []
          })
      await crudAndListsService.searchList('directory/street-names', this.var_default_search_payload)
          .then(res => {
            this.streets = res.data.list
          })
          .catch(e => {
            console.log(e)
            this.streets = []
          })
    },
  },
  /*
* CREATED */
  created() {
    this.getAdvertisementConstruction()
    this.var_default_search_payload.itemsPerPage = 500
    // GET AD_LOCATION_TYPES
    crudAndListsService.searchList('directory/advertisement-location-of-outdoor', this.var_default_search_payload).then((res) => {
      this.adLocationOfOutdoors = res.data.list;
    }).catch(e => {
      console.log(e)
      this.adLocationOfOutdoors = [];
    })
    // GET AD_DESIGN_TYPES
    crudAndListsService.searchListWithKeyword('directory/advertisement-design-type', this.var_default_search_payload).then((res) => {
      this.adDesignTypes = res.data.list
    }).catch(e => {
      console.log(e)
      this.adDesignTypes = [];
    })
    // GET AD_VOLUME_TYPES
    crudAndListsService.searchListWithKeyword('directory/advertisement-volume-types', this.var_default_search_payload).then((res) => {
      this.adVolumeTypes = res.data ? res.data.list : [];
    }).catch(e => {
      console.log(e)
      this.tableItems = [];
    })
    // GET AD_OBJECT_STATES
    crudAndListsService.searchListWithKeyword('directory/advertisement-object-state', this.var_default_search_payload).then((res) => {
      this.adObjectStates = res.data.list;
    }).catch(e => {
      console.log(e)
      this.adObjectStates = []
    })
    // GET AD_TYPES
    crudAndListsService.searchList('directory/advertisement-type', this.var_default_search_payload).then((res) => {
      this.adTypes = res.data.list;
    }).catch(e => {
      console.log(e)
      this.adTypes = []
    })
    crudAndListsService.searchListWithKeyword('contractor', this.var_default_search_payload, 'by-contractor').then(res => {
      this.contractors = res.data.list
    }).catch(e => {
      console.log(e)
      this.contractors = []
    })
    if (!this.isModeCreate) {
      InventoryReportService.get(this.$route.params.id).then(res => {
        this.createItem = res.data
      }).catch(e => {
        console.log(e)
      })
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