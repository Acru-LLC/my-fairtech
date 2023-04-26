<template>
  <div>

    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col
                cols="3"
            >
              <BaseInputWithValidation
                  v-model="inn"
                  @keyup.enter="findContractorByInn"
                  with-input-append
                  mask="#########"
                  :label="$t('submodules.integration.soliqQomita_info.tin')"
                  placeholder="123456789"
                  class="required"
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
            </b-col>
            <b-col class="mt-2"></b-col>
          </b-row>
        </ValidationObserver>

      </template>
      <b-card :title="$t('submodules.integration.farmasevtika_info.response')" v-if="resInformation_Date">


        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.fullName') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.fullName ? resInformation_Date.fullName : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.shortname') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.shortname ? resInformation_Date.shortname : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.faxNumber') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.faxNumber ? resInformation_Date.faxNumber : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.phoneNumber') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.phoneNumber ? resInformation_Date.phoneNumber : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.email') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.email ? resInformation_Date.email : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.inn') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.inn ? resInformation_Date.inn : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.pinfl') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.pinfl ? resInformation_Date.pinfl : '_ _ _'
                      }}</span>
                  </b-list-group-item>


                </b-list-group>
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.oked') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.oked ? resInformation_Date.oked : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.vatCode') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.vatCode ? resInformation_Date.vatCode : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.address') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.address ? resInformation_Date.address : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.director') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.director ? resInformation_Date.director : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.accounter') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.accounter ? resInformation_Date.accounter : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.mobileNumber') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.mobileNumber ? resInformation_Date.mobileNumber : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.canRegister') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.pinfl ? resInformation_Date.canRegister : '_ _ _' }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>

        <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.address_Dto') }}</b></h5>
        <b-card no-body class="overflow-hidden" v-if="resInformation_Date.addressDto">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.additional') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.addressDto.additional ? resInformation_Date.addressDto.additional : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.comment') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.addressDto.comment ? resInformation_Date.addressDto.comment : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.country') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.addressDto.countryNameLt ? resInformation_Date.addressDto.countryNameLt : '_ _ _',
                          nameRu: resInformation_Date.addressDto.countryNameRu ? resInformation_Date.addressDto.countryNameRu : '_ _ _',
                          nameUz: resInformation_Date.addressDto.countryNameUz ? resInformation_Date.addressDto.countryNameUz : '_ _ _',
                          nameEn: resInformation_Date.addressDto.countryNameEn ? resInformation_Date.addressDto.countryNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.region') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.addressDto.regionNameLt ? resInformation_Date.addressDto.regionNameLt : '_ _ _',
                          nameRu: resInformation_Date.addressDto.regionNameRu ? resInformation_Date.addressDto.regionNameRu : '_ _ _',
                          nameUz: resInformation_Date.addressDto.regionNameUz ? resInformation_Date.addressDto.regionNameUz : '_ _ _',
                          nameEn: resInformation_Date.addressDto.regionNameEn ? resInformation_Date.addressDto.regionNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>


                </b-list-group>
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.district') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.addressDto.districtNameLt ? resInformation_Date.addressDto.districtNameLt : '_ _ _',
                          nameRu: resInformation_Date.addressDto.districtNameRu ? resInformation_Date.addressDto.districtNameRu : '_ _ _',
                          nameUz: resInformation_Date.addressDto.districtNameUz ? resInformation_Date.addressDto.districtNameUz : '_ _ _',
                          nameEn: resInformation_Date.addressDto.districtNameEn ? resInformation_Date.addressDto.districtNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.quarter') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.addressDto.quarterNameLt ? resInformation_Date.addressDto.quarterNameLt : '_ _ _',
                          nameRu: resInformation_Date.addressDto.quarterNameRu ? resInformation_Date.addressDto.quarterNameRu : '_ _ _',
                          nameUz: resInformation_Date.addressDto.quarterNameUz ? resInformation_Date.addressDto.quarterNameUz : '_ _ _',
                          nameEn: resInformation_Date.addressDto.quarterNameEn ? resInformation_Date.addressDto.quarterNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.street') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.addressDto.streetNameLt ? resInformation_Date.addressDto.streetNameLt : '_ _ _',
                          nameRu: resInformation_Date.addressDto.streetNameRu ? resInformation_Date.addressDto.streetNameRu : '_ _ _',
                          nameUz: resInformation_Date.addressDto.streetNameUz ? resInformation_Date.addressDto.streetNameUz : '_ _ _',
                          nameEn: resInformation_Date.addressDto.streetNameEn ? resInformation_Date.addressDto.streetNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
        <b-card no-body class="overflow-hidden" v-else>
          <span>{{ $t("submodules.integration.error_message") }}</span>
        </b-card>


        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.parent') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.parent ? resInformation_Date.parent : '_ _ _'
                      }}</span>
                  </b-list-group-item>


                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.status') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.statusNameLt ? resInformation_Date.statusNameLt : '_ _ _',
                          nameRu: resInformation_Date.statusNameRu ? resInformation_Date.statusNameRu : '_ _ _',
                          nameUz: resInformation_Date.statusNameUz ? resInformation_Date.statusNameUz : '_ _ _',
                          nameEn: resInformation_Date.statusNameEn ? resInformation_Date.statusNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.formOfOwnership') }}</b>
                    <span variant="primary" pill>
                      {{
                        getName({
                          nameLt: resInformation_Date.formOfOwnershipNameLt ? resInformation_Date.formOfOwnershipNameLt : '_ _ _',
                          nameRu: resInformation_Date.formOfOwnershipNameRu ? resInformation_Date.formOfOwnershipNameRu : '_ _ _',
                          nameUz: resInformation_Date.formOfOwnershipNameUz ? resInformation_Date.formOfOwnershipNameUz : '_ _ _',
                          nameEn: resInformation_Date.formOfOwnershipNameEn ? resInformation_Date.formOfOwnershipNameEn : '_ _ _'
                        })
                      }}</span>
                  </b-list-group-item>


                </b-list-group>
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.contractorDirectorDto') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.contractorDirectorDto ? resInformation_Date.contractorDirectorDto : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.quarter') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.contractorAccountantDto ? resInformation_Date.contractorAccountantDto : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.addressDto.street') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.lastModified ? resInformation_Date.lastModified : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>

        <h5 class="text-center"><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractor_Dto') }}</b>
        </h5>

        <div v-if="resInformation_Date.regContractorDto">
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyLink') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyLink ? resInformation_Date.regContractorDto.companyLink : '_ _ _'
                        }}</span>
                    </b-list-group-item>


                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyShippingAddress')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyShippingAddress ? resInformation_Date.regContractorDto.companyShippingAddress : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company_Info') }}</b></h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.company">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.reregistrationDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.reregistrationDate ? resInformation_Date.regContractorDto.company.reregistrationDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.opf') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.opf ? resInformation_Date.regContractorDto.company.opf : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.businessFund')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.businessFund ? resInformation_Date.regContractorDto.company.businessFund : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.soogu') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.soogu ? resInformation_Date.regContractorDto.company.soogu : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.liquidationDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.liquidationDate ? resInformation_Date.regContractorDto.company.liquidationDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.liquidationReason')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.liquidationReason ? resInformation_Date.regContractorDto.company.liquidationReason : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.suspensionDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.suspensionDate ? resInformation_Date.regContractorDto.company.suspensionDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.oked') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.oked ? resInformation_Date.regContractorDto.company.oked : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.taxpayerType')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.taxpayerType ? resInformation_Date.regContractorDto.company.taxpayerType : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.taxMode') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.taxMode ? resInformation_Date.regContractorDto.company.taxMode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.registrationNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.registrationNumber ? resInformation_Date.regContractorDto.company.registrationNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.name') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.name ? resInformation_Date.regContractorDto.company.name : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.tin') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.tin ? resInformation_Date.regContractorDto.company.tin : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.registrationDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.registrationDate ? resInformation_Date.regContractorDto.company.registrationDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.statusUpdated')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.statusUpdated ? resInformation_Date.regContractorDto.company.statusUpdated : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.createdSysDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.createdSysDate ? resInformation_Date.regContractorDto.company.createdSysDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.updatedSysDate')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.updatedSysDate ? resInformation_Date.regContractorDto.company.updatedSysDate : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.kfs') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.kfs ? resInformation_Date.regContractorDto.company.kfs : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.businessFundCurrency')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.businessFundCurrency ? resInformation_Date.regContractorDto.company.businessFundCurrency : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.suspensionReason')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.suspensionReason ? resInformation_Date.regContractorDto.company.suspensionReason : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.shortName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.shortName ? resInformation_Date.regContractorDto.company.shortName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.businessType')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.businessType ? resInformation_Date.regContractorDto.company.businessType : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.sooguRegistrator')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.sooguRegistrator ? resInformation_Date.regContractorDto.company.sooguRegistrator : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.status') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.status ? resInformation_Date.regContractorDto.company.status : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.taxStatus')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.taxStatus ? resInformation_Date.regContractorDto.company.taxStatus : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.vatNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.vatNumber ? resInformation_Date.regContractorDto.company.vatNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.soato') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.soato ? resInformation_Date.regContractorDto.company.soato : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company.pinfl') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.company.pinfl ? resInformation_Date.regContractorDto.company.pinfl : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.company_Banks') }}</b></h5>
          <div v-if="resInformation_Date.regContractorDto.companyBanks">
            <b-table
                :items="resInformation_Date.regContractorDto.companyBanks ? resInformation_Date.regContractorDto.companyBanks : []"
                :fields="tableFields1"
                :busy="loadingTableItems"
                id="my-table"
                class="custom-b-table" responsive striped bordered small hover show-empty
            >
              <template #cell(index)="data">
                {{
                  util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                }}
              </template>
              <!-- STATUS -->

              <template #empty="">
                <h4 class="text-center">{{ $t('submodules.integration.error_message') }}</h4>
              </template>

              <!-- TABLE_BUSY SLOT -->
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner
                      variant="primary"
                      class="align-middle"
                  />
                </div>
              </template>
            </b-table>
          </div>
          <div v-else>
            <b-card no-body class="overflow-hidden">
              <span>{{ $t("submodules.integration.error_message") }}</span>
            </b-card>
          </div>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyExtra_Info') }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.companyExtraInfo">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyExtraInfo.monthlyNumberEmployees')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyExtraInfo.monthlyNumberEmployees ? resInformation_Date.regContractorDto.companyExtraInfo.monthlyNumberEmployees : '_ _ _'
                        }}</span>
                    </b-list-group-item>


                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyExtraInfo.avgNumberEmployees')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyExtraInfo.avgNumberEmployees ? resInformation_Date.regContractorDto.companyExtraInfo.avgNumberEmployees : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{
              $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBilling_Address')
            }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.companyBillingAddress">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.countryCode ? resInformation_Date.regContractorDto.companyBillingAddress.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.soato')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.soato ? resInformation_Date.regContractorDto.companyBillingAddress.soato : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.sectorCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.sectorCode ? resInformation_Date.regContractorDto.companyBillingAddress.sectorCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.villageCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.villageCode ? resInformation_Date.regContractorDto.companyBillingAddress.villageCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.streetName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.streetName ? resInformation_Date.regContractorDto.companyBillingAddress.streetName : '_ _ _'
                        }}</span>
                    </b-list-group-item>
                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>


                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.house')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.house ? resInformation_Date.regContractorDto.companyBillingAddress.house : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.flat')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.flat ? resInformation_Date.regContractorDto.companyBillingAddress.flat : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.cadastreNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.cadastreNumber ? resInformation_Date.regContractorDto.companyBillingAddress.cadastreNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBillingAddress.postCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.companyBillingAddress.postCode ? resInformation_Date.regContractorDto.companyBillingAddress.postCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director_info') }}</b></h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.director">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.gender') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.gender ? resInformation_Date.regContractorDto.director.gender : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.tin') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.tin ? resInformation_Date.regContractorDto.director.tin : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.citizenship')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.citizenship ? resInformation_Date.regContractorDto.director.citizenship : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.countryCode ? resInformation_Date.regContractorDto.director.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.nationality')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.nationality ? resInformation_Date.regContractorDto.director.nationality : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.pinfl') }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.pinfl ? resInformation_Date.regContractorDto.director.pinfl : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.passportNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.passportNumber ? resInformation_Date.regContractorDto.director.passportNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.lastName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.lastName ? resInformation_Date.regContractorDto.director.lastName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.firstName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.firstName ? resInformation_Date.regContractorDto.director.firstName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.middleName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.middleName ? resInformation_Date.regContractorDto.director.middleName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.director.passportSeries')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.director.passportSeries ? resInformation_Date.regContractorDto.director.passportSeries : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director_Address') }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.directorAddress">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.soato')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.soato ? resInformation_Date.regContractorDto.directorAddress.soato : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.sectorCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.sectorCode ? resInformation_Date.regContractorDto.directorAddress.sectorCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.countryCode ? resInformation_Date.regContractorDto.directorAddress.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.flat')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.flat ? resInformation_Date.regContractorDto.directorAddress.flat : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.house')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.house ? resInformation_Date.regContractorDto.directorAddress.house : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.streetName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.streetName ? resInformation_Date.regContractorDto.directorAddress.streetName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorAddress.villageCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorAddress.villageCode ? resInformation_Date.regContractorDto.directorAddress.villageCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.director_Contact') }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.directorContact">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorContact.phone')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorContact.phone ? resInformation_Date.regContractorDto.directorContact.phone : '_ _ _'
                        }}</span>
                    </b-list-group-item>
                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.directorContact.email')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.directorContact.email ? resInformation_Date.regContractorDto.directorContact.email : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant_info') }}</b></h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.accountant">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.tin')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.tin ? resInformation_Date.regContractorDto.accountant.tin : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.pinfl')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.pinfl ? resInformation_Date.regContractorDto.accountant.pinfl : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.lastName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.lastName ? resInformation_Date.regContractorDto.accountant.lastName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.firstName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.firstName ? resInformation_Date.regContractorDto.accountant.firstName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.middleName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.middleName ? resInformation_Date.regContractorDto.accountant.middleName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.countryCode ? resInformation_Date.regContractorDto.accountant.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.passportSeries')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.passportSeries ? resInformation_Date.regContractorDto.accountant.passportSeries : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant.passportNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountant.passportNumber ? resInformation_Date.regContractorDto.accountant.passportNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant_Contact') }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.accountantContact">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantContact.phone')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantContact.phone ? resInformation_Date.regContractorDto.accountantContact.phone : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantContact.email')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantContact.email ? resInformation_Date.regContractorDto.accountantContact.email : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountant_Address') }}</b>
          </h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.accountantAddress">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.soato')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.soato ? resInformation_Date.regContractorDto.accountantAddress.soato : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.sectorCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.sectorCode ? resInformation_Date.regContractorDto.accountantAddress.sectorCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.countryCode ? resInformation_Date.regContractorDto.accountantAddress.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.flat')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.flat ? resInformation_Date.regContractorDto.accountantAddress.flat : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.house')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.house ? resInformation_Date.regContractorDto.accountantAddress.house : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.streetName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.streetName ? resInformation_Date.regContractorDto.accountantAddress.streetName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.accountantAddress.villageCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.accountantAddress.villageCode ? resInformation_Date.regContractorDto.accountantAddress.villageCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>
                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>
        </div>
        <div v-else>
          <b-card no-body class="overflow-hidden" >
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>
        </div>
        <h5 class="text-center"><b>
          {{ $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders_info') }}</b></h5>

        <h5><b> {{
            $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founder_Contact')
          }}</b></h5>
        <div v-if="resInformation_Date.regContractorDto.founders[0]">
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderContact.phone')
                      }}</b>
                      <span variant="primary" pill
                            v-if=" resInformation_Date.regContractorDto.founders[0].founderContact">{{
                          resInformation_Date.regContractorDto.founders[0].founderContact.phone ? resInformation_Date.regContractorDto.founders[0].founderContact.phone : '_ _ _'
                        }}</span>
                      <span v-else>{{ $t("submodules.integration.error_message") }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderContact.email')
                      }}</b>
                      <span variant="primary" pill
                            v-if=" resInformation_Date.regContractorDto.founders[0].founderContact">{{
                          resInformation_Date.regContractorDto.founders[0].founderContact.email ? resInformation_Date.regContractorDto.founders[0].founderContact.email : '_ _ _'
                        }}</span>
                      <span v-else>{{ $t("submodules.integration.error_message") }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <h5><b> {{
              $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founder_Address')
            }}</b></h5>
          <b-card no-body class="overflow-hidden"
                  v-if="resInformation_Date.regContractorDto.founders[0].founderAddress">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.countryCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.countryCode ? resInformation_Date.regContractorDto.founders[0].founderAddress.countryCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.sectorCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.sectorCode ? resInformation_Date.regContractorDto.founders[0].founderAddress.sectorCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.villageCode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.villageCode ? resInformation_Date.regContractorDto.founders[0].founderAddress.villageCode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.streetName')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.streetName ? resInformation_Date.regContractorDto.founders[0].founderAddress.streetName : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.house')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.flat ? resInformation_Date.regContractorDto.founders[0].founderAddress.flat : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.flat')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.flat ? resInformation_Date.regContractorDto.founders[0].founderAddress.flat : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.soato')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.soato ? resInformation_Date.regContractorDto.founders[0].founderAddress.soato : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.cadastreNumber')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.cadastreNumber ? resInformation_Date.regContractorDto.founders[0].founderAddress.cadastreNumber : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                      {{
                        $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderAddress.postcode')
                      }}</b>
                      <span variant="primary" pill>{{
                          resInformation_Date.regContractorDto.founders[0].founderAddress.postcode ? resInformation_Date.regContractorDto.founders[0].founderAddress.postcode : '_ _ _'
                        }}</span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{
              $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founder_Legal')
            }}</b></h5>
          <b-card no-body class="overflow-hidden" v-if="resInformation_Date.regContractorDto.founders[0].founderLegal">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.tin')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderLegal.tin ? resInformation_Date.regContractorDto.founders[0].founderLegal.tin : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.name')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderLegal.name ? resInformation_Date.regContractorDto.founders[0].founderLegal.name : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>


                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.shortName')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderLegal.shortName ? resInformation_Date.regContractorDto.founders[0].founderLegal.shortName : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.regCountry')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderLegal.regCountry ? resInformation_Date.regContractorDto.founders[0].founderLegal.regCountry : '_ _ _'
                        }}
                    </span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <b>
                          {{
                            $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.founderSharePercent')
                          }}
                        </b>
                        <span variant="primary" pill>
                        {{
                            resInformation_Date.regContractorDto.founders[0].founderLegal.founderSharePercent ? resInformation_Date.regContractorDto.founders[0].founderLegal.founderSharePercent : '_ _ _'
                          }}
                      </span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <b>
                          {{
                            $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderLegal.founderShareSum')
                          }}
                        </b>
                        <span variant="primary" pill>
                        {{
                            resInformation_Date.regContractorDto.founders[0].founderLegal.founderShareSum ? resInformation_Date.regContractorDto.founders[0].founderLegal.founderShareSum : '_ _ _'
                          }}
                      </span>
                      </b-list-group-item>
                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>

          <h5><b> {{
              $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founder_Individual')
            }}</b></h5>
          <b-card no-body class="overflow-hidden"
                  v-if="resInformation_Date.regContractorDto.founders[0].founderIndividual">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.lastName')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.lastName ? resInformation_Date.regContractorDto.founders[0].founderIndividual.lastName : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.firstName')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.firstName ? resInformation_Date.regContractorDto.founders[0].founderIndividual.firstName : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b>
                        {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.middleName')
                        }}
                      </b>
                      <span variant="primary" pill>
                      {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.middleName ? resInformation_Date.regContractorDto.founders[0].founderIndividual.middleName : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.gender')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.gender ? resInformation_Date.regContractorDto.founders[0].founderIndividual.gender : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.nationality')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.nationality ? resInformation_Date.regContractorDto.founders[0].founderIndividual.nationality : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.citizenship')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.citizenship ? resInformation_Date.regContractorDto.founders[0].founderIndividual.citizenship : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.passportSeries')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.passportSeries ? resInformation_Date.regContractorDto.founders[0].founderIndividual.passportSeries : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.passportNumber')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.passportNumber ? resInformation_Date.regContractorDto.founders[0].founderIndividual.passportNumber : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                  </b-list-group>
                </b-card-text>
              </b-col>
              <b-col md="6">
                <b-card-text>
                  <b-list-group>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.pinfl')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.pinfl ? resInformation_Date.regContractorDto.founders[0].founderIndividual.pinfl : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.tin')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.tin ? resInformation_Date.regContractorDto.founders[0].founderIndividual.tin : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.birthDate')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.birthDate ? resInformation_Date.regContractorDto.founders[0].founderIndividual.birthDate : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.individualId')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.individualId ? resInformation_Date.regContractorDto.founders[0].founderIndividual.individualId : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.countryCode')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.countryCode ? resInformation_Date.regContractorDto.founders[0].founderIndividual.countryCode : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.founderSharePercent')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.founderSharePercent ? resInformation_Date.regContractorDto.founders[0].founderIndividual.founderSharePercent : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                      <b> {{
                          $t('submodules.integration.soliqQomita_info.response.regContractorDto.founders.founderIndividual.founderShareSum')
                        }} </b>
                      <span variant="primary"
                            pill>   {{
                          resInformation_Date.regContractorDto.founders[0].founderIndividual.founderShareSum ? resInformation_Date.regContractorDto.founders[0].founderIndividual.founderShareSum : '_ _ _'
                        }}
                    </span>
                    </b-list-group-item>


                  </b-list-group>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden" v-else>
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>
        </div>
        <div v-else>
          <b-card no-body class="overflow-hidden">
            <span>{{ $t("submodules.integration.error_message") }}</span>
          </b-card>
        </div>

        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.yattFromSoliq') }}</b>
                    <span variant="primary"
                          pill>{{
                        resInformation_Date.yattFromSoliq ? resInformation_Date.yattFromSoliq : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.foundersDtos') }}</b>
                    <span variant="primary"
                          pill>{{
                        resInformation_Date.foundersDtos ? resInformation_Date.foundersDtos : '_ _ _'
                      }}</span>
                  </b-list-group-item>


                </b-list-group>
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.isExist') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.isExist ? resInformation_Date.isExist : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.soliqQomita_info.response.isYur') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.isYur ? resInformation_Date.isYur : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import integratsiyaService from "@/shared/services/integratsiya.service";

export default {
  name: "methods1",
  data() {
    return {
      inn: '',
      resInformation_Date: null,
      resKR_Sert_asosiy: [],
      resTovar: [],
      loadingTableItems: false,
      tableFields1: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.mfo'),
          key: 'mfo',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.paymentAccount'),
          key: 'paymentAccount',
          thStyle: {
            minWidth: '150px',
          },
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.status'),
          key: 'status',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.attribute'),
          key: 'attribute',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.openDate'),
          key: 'openDate',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.soliqQomita_info.response.regContractorDto.companyBanks.closeDate'),
          key: 'closeDate',
          thStyle: {
            minWidth: '220px',
          }
        }

      ],
    }
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
  },
  methods: {
    findContractorByInn() {
      // if (this.computedObserver.fields.INN.valid)
      //   helperService.validateInnFromApi(this.editingItem.inn, true)
      //       .then(res => {
      //         if (res.data) {
      this.loadingTableItems = true
      this.resInformation_Date = null
      integratsiyaService.getSoliqQomitasiInfoByInn(this.inn, true)
          .then(res => {
            this.resInformation_Date = res.data
            this.loadingTableItems = false
          })
          .catch(e => {
            console.log(e)
            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
          })
      // } else {
      //   this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
      // }
      // })
      // .catch(e => {
      //   console.log(e)
      //
      // })
      /* else
          this.computedObserver.refs.INN.validate() */
    },
  }
}
</script>

<style scoped>

</style>




