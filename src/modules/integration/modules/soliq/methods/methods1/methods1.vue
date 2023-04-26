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
                sm="12"
                md="6"
            >
              <BaseInputWithValidation
                  v-model="inn"
                  @keyup.enter="findContractorByInn"
                  with-input-append
                  :label="$t('submodules.integration.osimlik_info.number_or_tin')"
                  placeholder="123456789. .."
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
            <b-col class="mt-2"><h5> <b>22150024274</b></h5></b-col>
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
                    {{ $t('submodules.integration.osimlik_info.fields.Information_Date') }}</b>
                    <span variant="primary" pill>{{ resInformation_Date ? resInformation_Date : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.KR_New') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.KR_New ? resKR_Sert_asosiy.KR_New : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.RQST_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.RQST_NO ? resKR_Sert_asosiy.RQST_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DOC_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.DOC_NO ? resKR_Sert_asosiy.DOC_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DOC_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.DOC_NO ? resKR_Sert_asosiy.DOC_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DOC_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.DOC_NM ? resKR_Sert_asosiy.DOC_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DOC_FNCT_CD') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.DOC_FNCT_CD ? resKR_Sert_asosiy.DOC_FNCT_CD : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.RQST_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.RQST_DT ? resKR_Sert_asosiy.RQST_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.RQST_ITT_CD') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.RQST_ITT_CD ? resKR_Sert_asosiy.RQST_ITT_CD : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.RQST_ITT_NM') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.RQST_ITT_NM ? resKR_Sert_asosiy.RQST_ITT_NM : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMEX_TPCD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMEX_TPCD ? resKR_Sert_asosiy.IMEX_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMEX_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMEX_TP_NM ? resKR_Sert_asosiy.IMEX_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.CRPP_LNGA_TPCD') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.CRPP_LNGA_TPCD ? resKR_Sert_asosiy.CRPP_LNGA_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.CRPP_LNGA_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.CRPP_LNGA_TP_NM ? resKR_Sert_asosiy.CRPP_LNGA_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PERS_JRPN_TPCD') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.PERS_JRPN_TPCD ? resKR_Sert_asosiy.PERS_JRPN_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PERS_JRPN_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.PERS_JRPN_TP_NM ? resKR_Sert_asosiy.PERS_JRPN_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_TPCD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_TPCD ? resKR_Sert_asosiy.APLC_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_TP_NM ? resKR_Sert_asosiy.APLC_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_TXPR_UNIQ_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_TXPR_UNIQ_NO ? resKR_Sert_asosiy.APLC_TXPR_UNIQ_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_NM ? resKR_Sert_asosiy.APLC_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_RPPN_NM') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.APLC_RPPN_NM ? resKR_Sert_asosiy.APLC_RPPN_NM : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_REGN_TPCD') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.APLC_REGN_TPCD ? resKR_Sert_asosiy.APLC_REGN_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_REGN_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_REGN_TP_NM ? resKR_Sert_asosiy.APLC_REGN_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_ADDR') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_ADDR ? resKR_Sert_asosiy.APLC_ADDR : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_TELNO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_TELNO ? resKR_Sert_asosiy.APLC_TELNO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_FAX_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.APLC_FAX_NO ? resKR_Sert_asosiy.APLC_FAX_NO : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_PSPR_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.APLC_PSPR_NO ? resKR_Sert_asosiy.APLC_PSPR_NO : '_ _ _' }}</span>
                  </b-list-group-item>


                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_PSPR_PBLS_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_PSPR_PBLS_DT ? resKR_Sert_asosiy.APLC_PSPR_PBLS_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_PSPR_PBLS_ITT_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_PSPR_PBLS_ITT_NM ? resKR_Sert_asosiy.APLC_PSPR_PBLS_ITT_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_RETL_WRPR_RGSR_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_RETL_WRPR_RGSR_NO ? resKR_Sert_asosiy.APLC_RETL_WRPR_RGSR_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.APLC_RETL_WRPR_PBLS_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.APLC_RETL_WRPR_PBLS_DT ? resKR_Sert_asosiy.APLC_RETL_WRPR_PBLS_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_TPCD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_TPCD ? resKR_Sert_asosiy.IMPPN_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_TP_NM') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMPPN_TP_NM ? resKR_Sert_asosiy.IMPPN_TP_NM : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_TXPR_UNIQ_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_TXPR_UNIQ_NO ? resKR_Sert_asosiy.IMPPN_TXPR_UNIQ_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_NM ? resKR_Sert_asosiy.IMPPN_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_RPPN_NM') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMPPN_RPPN_NM ? resKR_Sert_asosiy.IMPPN_RPPN_NM : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_REGN_TPCD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_REGN_TPCD ? resKR_Sert_asosiy.IMPPN_REGN_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_REGN_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_REGN_TP_NM ? resKR_Sert_asosiy.IMPPN_REGN_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_ADDR') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_ADDR ? resKR_Sert_asosiy.IMPPN_ADDR : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_TELNO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMPPN_TELNO ? resKR_Sert_asosiy.IMPPN_TELNO : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_FAX_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMPPN_FAX_NO ? resKR_Sert_asosiy.IMPPN_FAX_NO : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_PSPR_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMPPN_PSPR_NO ? resKR_Sert_asosiy.IMPPN_PSPR_NO : '_ _ _' }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_PSPR_PBLS_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_PSPR_PBLS_DT ? resKR_Sert_asosiy.IMPPN_PSPR_PBLS_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_PSPR_PBLS_ITT_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_PSPR_PBLS_ITT_NM ? resKR_Sert_asosiy.IMPPN_PSPR_PBLS_ITT_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_RETL_WRPR_RGSR_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_RETL_WRPR_RGSR_NO ? resKR_Sert_asosiy.IMPPN_RETL_WRPR_RGSR_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMPPN_RETL_WRPR_PBLS_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMPPN_RETL_WRPR_PBLS_DT ? resKR_Sert_asosiy.IMPPN_RETL_WRPR_PBLS_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.EXPPN_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.EXPPN_NM ? resKR_Sert_asosiy.EXPPN_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.EXCY_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.EXCY_CD ? resKR_Sert_asosiy.EXCY_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.EXCY_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.EXCY_NM ? resKR_Sert_asosiy.EXCY_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.EXPPN_ADDR') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.EXPPN_ADDR ? resKR_Sert_asosiy.EXPPN_ADDR : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARLC_REGN_TPCD') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.ARLC_REGN_TPCD ? resKR_Sert_asosiy.ARLC_REGN_TPCD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARLC_REGN_TP_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.ARLC_REGN_TP_NM ? resKR_Sert_asosiy.ARLC_REGN_TP_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARLC_ADDR') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.ARLC_ADDR ? resKR_Sert_asosiy.ARLC_ADDR : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DPTR_THRG_CNTY_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.DPTR_THRG_CNTY_CD ? resKR_Sert_asosiy.DPTR_THRG_CNTY_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.DPTR_THRG_CNTY_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.DPTR_THRG_CNTY_NM ? resKR_Sert_asosiy.DPTR_THRG_CNTY_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARVL_THRG_CNTY_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.ARVL_THRG_CNTY_CD ? resKR_Sert_asosiy.ARVL_THRG_CNTY_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>


                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARVL_THRG_CNTY_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.ARVL_THRG_CNTY_NM ? resKR_Sert_asosiy.ARVL_THRG_CNTY_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.TRNP_METH_CD_1') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.TRNP_METH_CD_1 ? resKR_Sert_asosiy.TRNP_METH_CD_1 : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.TRNP_METH_NM_1') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.TRNP_METH_NM_1 ? resKR_Sert_asosiy.TRNP_METH_NM_1 : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.TRNP_METH_CD_2') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.TRNP_METH_CD_2 ? resKR_Sert_asosiy.TRNP_METH_CD_2 : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.TRNP_METH_NM_2') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.TRNP_METH_NM_2 ? resKR_Sert_asosiy.TRNP_METH_NM_2 : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.ARLC_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.ARLC_NM ? resKR_Sert_asosiy.ARLC_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.TRNP_PATH_CN') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.TRNP_PATH_CN ? resKR_Sert_asosiy.TRNP_PATH_CN : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.MATL_US_PUPS_CN') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.MATL_US_PUPS_CN ? resKR_Sert_asosiy.MATL_US_PUPS_CN : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMP_CVNT_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMP_CVNT_NO ? resKR_Sert_asosiy.IMP_CVNT_NO : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMP_CVNT_DT') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.IMP_CVNT_DT ? resKR_Sert_asosiy.IMP_CVNT_DT : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PLNT_EXPC_DPTR_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.PLNT_EXPC_DPTR_DT ? resKR_Sert_asosiy.PLNT_EXPC_DPTR_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PLNT_EXPC_ARVL_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.PLNT_EXPC_ARVL_DT ? resKR_Sert_asosiy.PLNT_EXPC_ARVL_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.MATL_US_PLC_NM') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.MATL_US_PLC_NM ? resKR_Sert_asosiy.MATL_US_PLC_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.SFKP_LOCT_STRZT_CFRN_NO') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.SFKP_LOCT_STRZT_CFRN_NO ? resKR_Sert_asosiy.SFKP_LOCT_STRZT_CFRN_NO : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IN_BORDER_CUSTOMS_OFFICE_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IN_BORDER_CUSTOMS_OFFICE_CD ? resKR_Sert_asosiy.IN_BORDER_CUSTOMS_OFFICE_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.OUT_BORDER_CUSTOMS_OFFICE_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.OUT_BORDER_CUSTOMS_OFFICE_CD ? resKR_Sert_asosiy.OUT_BORDER_CUSTOMS_OFFICE_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IN_BORDER_CUSTOMS_OFFICE_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IN_BORDER_CUSTOMS_OFFICE_NM ? resKR_Sert_asosiy.IN_BORDER_CUSTOMS_OFFICE_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.OUT_BORDER_CUSTOMS_OFFICE_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.OUT_BORDER_CUSTOMS_OFFICE_NM ? resKR_Sert_asosiy.OUT_BORDER_CUSTOMS_OFFICE_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PLNT_EXPECTED_TRANSIT_START_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.PLNT_EXPECTED_TRANSIT_START_DT ? resKR_Sert_asosiy.PLNT_EXPECTED_TRANSIT_START_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.PLNT_EXPECTED_TRANSIT_END_DT') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.PLNT_EXPECTED_TRANSIT_END_DT ? resKR_Sert_asosiy.PLNT_EXPECTED_TRANSIT_END_DT : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMCY_CD') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMCY_CD ? resKR_Sert_asosiy.IMCY_CD : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.IMCY_NM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.IMCY_NM ? resKR_Sert_asosiy.IMCY_NM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.FOR_TRANSIT_YN') }}</b>
                    <span variant="primary"
                          pill>{{
                        resKR_Sert_asosiy.FOR_TRANSIT_YN ? resKR_Sert_asosiy.FOR_TRANSIT_YN : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.EXPPN_CTDC_NO') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.EXPPN_CTDC_NO ? resKR_Sert_asosiy.EXPPN_CTDC_NO : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.FRST_REGST_ID') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.FRST_REGST_ID ? resKR_Sert_asosiy.FRST_REGST_ID : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.FRST_RGSR_DTL_DTTM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.FRST_RGSR_DTL_DTTM ? resKR_Sert_asosiy.FRST_RGSR_DTL_DTTM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.LAST_CHPR_ID') }}</b>
                    <span variant="primary"
                          pill>{{ resKR_Sert_asosiy.LAST_CHPR_ID ? resKR_Sert_asosiy.LAST_CHPR_ID : '_ _ _' }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.osimlik_info.fields.LAST_CHNG_DTL_DTTM') }}</b>
                    <span variant="primary" pill>{{
                        resKR_Sert_asosiy.LAST_CHNG_DTL_DTTM ? resKR_Sert_asosiy.LAST_CHNG_DTL_DTTM : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
        <h5><b>Tovar ma'lumotlari</b></h5>
        <b-table
            :items="resTovar" :fields="tableFields" :busy="loadingTableItems" id="my-table"
            class="custom-b-table" responsive striped bordered small hover show-empty
        >
          <template #cell(index)="data">
            {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
          </template>
          <!-- STATUS -->

          <template #empty="">
            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
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
      tableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: 'CRPP_NO',
          key: 'CRPP_NO',
          thStyle: {
            minWidth: '230px',
          },
        },
        {

          label: this.$t('submodules.integration.osimlik_info.fields.RQST_NO'),
          key: 'RQST_NO',
          thStyle: {
            minWidth: '150px',
          },
        },
        {
          label: this.$t('submodules.integration.osimlik_info.fields.FRST_REGST_ID'),
          key: 'FRST_REGST_ID',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.osimlik_info.fields.FRST_RGSR_DTL_DTTM'),
          key: 'FRST_RGSR_DTL_DTTM',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.osimlik_info.fields.LAST_CHPR_ID'),
          key: 'LAST_CHPR_ID',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: this.$t('submodules.integration.osimlik_info.fields.LAST_CHNG_DTL_DTTM'),
          key: 'LAST_CHNG_DTL_DTTM',
          thStyle: {
            minWidth: '220px',
          }
        },
        {
          label: 'HS_CD',
          key: 'HS_CD',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          label: 'CMDT_NM',
          key: 'CMDT_NM',
          thStyle: {
            minWidth: '120px',
          }
        },
        {
          label: 'CMDT_QTY',
          key: 'CMDT_QTY',
          thStyle: {
            minWidth: '120px',
          }
        },
        {
          label: 'CMDT_QTY_UT_CD',
          key: 'CMDT_QTY_UT_CD',
          thStyle: {
            minWidth: '120px',
          }
        },
        {
          label: 'CMDT_QTY_UT_NM',
          key: 'CMDT_QTY_UT_NM',
          thStyle: {
            minWidth: '120px',
          }
        },


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
      integratsiyaService.getOsimliklarKarantinInfoByInnForCreate(this.inn, true)
          .then(res => {
            this.resInformation_Date = res.data[0].KR_Sert_Information.Information_Date
            this.resKR_Sert_asosiy = res.data[0].KR_Sert_Information.KR_Sert_asosiy
            this.resTovar = res.data[0].KR_Sert_Information.KR_Sert_asosiy.Tovar
            // this.editingItem = Object.assi\gn({}, res.data)
            this.loadingTableItems = false
          })
          .catch(e => {
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




