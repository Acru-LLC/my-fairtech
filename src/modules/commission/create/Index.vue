<template>
  <div>
    <div class="row">
      <div v-if="$can('view', 'application-inner') || $can('view', 'application-dxa')" class="col-12">
        <div class="col-md-12 text-center">
          <div class="h4 mb-4 d-inline-block">{{ $t('submodules.doc.work_with_doc') }}</div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-8">
                <div class="search-box me-4 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input
                        v-model="searchKeyword"
                        :placeholder="$t('column.search')"
                        class="form-control"
                        type="text"
                        @input="fetchTableItems"
                    />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
                <span>{{ $t('column.select.text1') }}</span>
                <div class="col-2 me-2 mx-2 d-inline-block">
                  <div class="position-relative">
                    <b-form-select
                        v-model="selected"
                        :options="optionsTable"
                        class="form-select"
                        @change="selectList"
                    />
                  </div>
                </div>
                <span>{{ $t('column.select.text2') }}</span>
              </div>
              <div class="col-sm-4">
                <div class="text-sm-end">
                  <b-row>
                    <!-- <b-col cols="3">
                    </b-col> -->
                    <b-col cols="12">
                      <b-btn
                          v-show="activeTab !== 'dxa'"
                          class="btn btn-success btn-rounded mb-2 me-2"
                          type="button"
                          @click="toggleTypeModalCreateWorkWithDocument(true)"
                      >
                        <!--                      :to="{name: 'CreateWorkWithDocument'}"-->
                        <i class="mdi mdi-plus me-1"></i>
                        {{ $t('submodules.doc.created_new_doc') }}
                      </b-btn>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-modal
          id="create-update-modal-id"
          v-model="typeModal"
          :ok-title="$t('actions.continue')"
          no-stacking
          ok-only
          hide-footer
          ok-variant="success"
          size="xl"
          title-class="font-18"
          @ok="createWorkWithDocument"
      >
        <template #modal-header="{}">
          <b-button
              block
              class="text-center w-100 mb-0 card-tabs"
              style="cursor:default; margin-right: 30%; margin-left: 30%;font-size: 1.4rem; background:#526BDF"
              variant="primary"
          >
            <i
                class="bx bx mdi mdi-file-document-multiple"
                style="font-size: 1.5rem;"
            ></i> {{ $t('submodules.doc.create_application') }}
          </b-button>
        </template>
        <b-row class="pl-4 pr-4">
          <b-col class="p-3" cols="4" xs="12">
            <b-card
                id="legalDepartmentCard"
                :bg-variant="selectedType === 'legal' ? 'primary' : 'light'"
                :header="$t('submodules.doc.sendDoc_from_legal')"
                :text-variant="selectedType === 'legal' ? 'white' : ''"
                class="text-center w-100 mb-0 card-tabs"
                no-body
                style="cursor: pointer; font-size: 1.4rem;"
                @click="$router.push({name: 'CreateApplicationByLegal'})"
            >
            </b-card>
          </b-col>
          <b-col class="p-3" cols="4" xs="12">
            <b-card
                id="simpleDepartmentCard"
                :bg-variant="selectedType === 'physical' ? 'primary' : 'light'"
                :header="$t('submodules.doc.sendDoc_from_physical')"
                :text-variant="selectedType === 'physical' ? 'white' : ''"
                class="text-center w-100 mb-0 card-tabs"
                no-body
                style="cursor: pointer; font-size: 1.4rem;"
                @click="$router.push({name: 'CreateApplicationByPhysical'})"
            >
            </b-card>
          </b-col>
          <b-col class="p-3" cols="4" xs="12">
            <b-card
                id="directorCard"
                :bg-variant="selectedType === 'director' ? 'primary' : 'light'"
                :header="$t('submodules.commission.by_director.title')"
                :text-variant="selectedType === 'director' ? 'white' : ''"
                class="text-center w-100 mb-0 card-tabs"
                no-body
                style="cursor: pointer; font-size:1.4rem;"
                @click="$router.push({name: 'CreateApplicationByDirector'})"
            >
            </b-card>
          </b-col>
        </b-row>
      </b-modal>
    </div>
    <div v-if="$can('view', 'application-inner') || $can('view', 'application-dxa')" class="row">
      <div class="col-7">
        <div class="card card-body card-tabs" style="min-height: 35em">
          <div>
            <b-tabs
                v-model="applicationTypeTabIndex"
                active-nav-item-class="font-weight-bold text-primary"
                class="text-uppercase"
            >
              <b-tab
                  v-if="$can('view', 'application-inner')"
                  :active="$can('view', 'application-inner')"
                  :title="$t('submodules.dxa.tabs_inner')"
                  @click="activeTableInnerApplication"
              ></b-tab>
              <b-tab
                  v-if="$can('view', 'application-dxa')"
                  :title="$t('submodules.dxa.tabs_dxa')"
                  @click="activeTableDXAApplication"
              ></b-tab>
            </b-tabs>
          </div>
          <div class="table-responsive">
            <b-overlay :opacity="0.1" :show="loading" rounded="sm">
              <table class="table table-centered table-striped table-nowrap table-hover bordered">
                <thead class="thead-light">
                <tr>
                  <th class="text-center" scope="col" style="width: 10%" > № </th>
                  <th class="text-left" scope="col" >
                    <span class="ml-5"> {{ $t("column.status") }}</span>
                  </th>
                  <th v-show="activeTab === 'inner'" class="text-left text-wrap" scope="col" style="min-width: 135px;">
                    {{ $t('submodules.doc.create_entered_number_legal') }}
                  </th>
                  <th v-show="activeTab === 'dxa'" class="text-center" scope="col">
                    {{ $t("submodules.dxa.dxa_application_number") }}
                  </th>
                  <th class="text-left text-wrap" scope="col" style="min-width: 200px;">
                    {{ $t("submodules.doc.sender_name") }}
                  </th>
                  <th
                      class="text-center"
                      scope="col"
                  >
                    {{ $t("submodules.doc.sender") }}
                  </th>
                  <th
                      v-show="activeTab === 'dxa'"
                      class="text-center"
                      scope="col"
                  >
                    {{ $t("submodules.dxa.application_type") }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="tableItems.length === 0" class="text-center">
                  <td :style="loading ? 'height:50px' : ''" colspan="9" style="vertical-align: middle;">
                    <h5>
                      {{ $t("messages.data_not_found") }}
                    </h5>
                  </td>
                </tr>
                <tr
                    v-for="(item, index) in tableItems"
                    :key="index + 'CREATE_DOC'"
                    :class=" selectedTrItem.id === item.id ? 'bg-color bg-soft-primary text-primary' : ''"
                    class="p_cursor"
                    @click.prevent="clickTrItem(item)"
                >

                  <td class="text-center">
                    {{
                      util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                    }}
                  </td>
                  <td class="text-left">
                    <b-badge v-if="item.applicationStatus === 'CREATED' || item.applicationStatus === 'RECEIVED'"
                             class="p-1" variant="secondary">
                      {{ $t('submodules.commission.doc_status.doc_created') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'BEING_SEEN'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.doc_status.doc_seen') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_NOT_BELONG'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.doc_status.for_not_belong') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_REGION'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.doc_status.for_region') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_NOT_COMPLETED'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.doc_status.for_not_completed') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SENT_TO_SIGN'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.sent_to_sign') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SEND_TO_REGION'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.sent_to_region') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'NOT_BELONG_LETTER_SIGNED'" class="p-1"
                             variant="warning">
                      {{ $t('submodules.dxa.not_belong_letter_signed') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'EXTENDED'" class="p-1" variant="warning">
                      {{ $t('submodules.dxa.extended') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SEEN'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.seen') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'NOT_BELONG'" class="p-1" variant="info">
                      {{ $t('submodules.dxa.not_belong') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_NOT_BELONG_DXA'" class="p-1" variant="info">
                      {{ $t('messages.for_not_belong_dxa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_NOT_COMPLETED_DXA'" class="p-1" variant="info">
                      {{ $t('messages.for_not_completed_dxa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_ACCEPTED_DXA'" class="p-1" variant="info">
                      {{ $t('messages.for_accepted_dxa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_REJECTED_DXA'" class="p-1" variant="info">
                      {{ $t('messages.for_rejected_dxa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_EXTENDED_DXA'" class="p-1" variant="info">
                      {{ $t('messages.for_extended_dxa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'REJECTED'" class="p-1" variant="danger">
                      {{ $t('docs_r.CANCELED_TO_WORK') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SENT'" class="p-1" variant="primary">
                      {{ $t('submodules.reports.report_sended') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'CANCELLED'" class="p-1" variant="danger">
                      {{ $t('docs_r.CANCELED_TO_WORK') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FINISHED'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.work_finished') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'TEMPORARILY_CLOSED'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.doc_status.temporarily_closed') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FINISH_LETTER_CREATED'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.finish_letter_created') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FINISH_LETTER_SENT'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.finish_letter_created') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FINISH_LETTER_SIGN_AND_SEND'" class="p-1"
                             variant="info">
                      {{ $t('submodules.commission.doc_status.ensure_compliance') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SEND_FOR_COMMISSION'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.send_for_commission') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_COMMISSION_REVIEW'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.review_in_commission') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_REVIEW_AFTER_COMMISSION'" class="p-1"
                             variant="info">
                      {{ $t('submodules.commission.doc_status.review_after_commission') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_BEING_SEEN'" class="p-1"
                             variant="warning">
                      {{ $t('submodules.commission.doc_status.commission_being_seen') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_SEEN'" class="p-1" variant="info">
                      {{ $t('submodules.commission.doc_status.commission_seen') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_SENT'" class="p-1" variant="primary">
                      {{ $t('submodules.commission.doc_status.commission_sent') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_SIGNED'" class="p-1" variant="success">
                      {{ $t('submodules.commission.doc_status.commission_signed') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_CANCELLED'" class="p-1" variant="danger">
                      {{ $t('submodules.commission.doc_status.commission_canceled') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SEND_FOR_TAKE_VISA'" class="p-1" variant="warning">
                      {{ $t('submodules.dxa.send_for_visa') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'COMMISSION_REVIEW_CLOSED'" class="p-1"
                             variant="success">
                      {{ $t('submodules.commission.doc_status.commission_review_closed') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'VISA_APPROVED'" class="p-1" variant="success">
                      {{ $t('submodules.dxa.VISA_APPROVED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'REVIEW_CLOSED'" class="p-1" variant="success">
                      {{ $t('submodules.commission.REVIEW_FINISHED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'ACCEPTED'" class="p-1" variant="success">
                      {{ $t('submodules.commission.ACCEPTED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'NOT_COMPLETED'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.NOT_COMPLETED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'NO_PERMIT_REQUIRED'" class="p-1" variant="info">
                      {{ $t('submodules.commission.NO_PERMIT_REQUIRED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'EXPIRED'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.EXPIRED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'NOT_COMPLETED'" class="p-1" variant="warning">
                      {{ $t('submodules.commission.NOT_COMPLETED') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'FOR_NO_PERMIT_REQUIRED_DXA'" class="p-1"
                             variant="info">
                      {{ $t('submodules.commission.FOR_NO_PERMIT_REQUIRED_DXA') }}
                    </b-badge>
                    <b-badge v-else-if="item.applicationStatus === 'SENT_FOR_REJECT'" class="p-1" variant="info">
                      {{ $t('messages.for_rejected_dxa') }}
                    </b-badge>
                    <b-badge v-else class="p-1" variant="success">{{ item.applicationStatus }}</b-badge>
                  </td>
                  <td v-show="activeTab === 'inner'" class="text-center">
                    {{ item.numberOfIncomingDocument }}
                  </td>
                  <td v-show="activeTab === 'dxa'" class="text-center" >
                    {{ item.applicationDXARegNumber }}
                  </td>
                  <td class="text-left">
                    <p
                        class="mb-0 d-flex align-items-center text-wrap"
                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                    >
                      <span v-if="item.type === 'LEGAL'"> {{ item.senderFullName }} </span>
                      <span v-else-if="item.type === 'FROM_DXA'"> {{ item.senderFullName }} </span>
                      <span v-else-if="item.type === 'PHYSICAL'"> {{ item.applicantSecondName }} {{
                          item.applicantFirstName
                        }} {{ item.applicantMiddleName }} </span>
                      <span v-else-if="item.type === 'BY_DIRECTOR'"> {{ item.senderFullName }} </span>
                    </p>
                  </td>
                  <td class="text-center">
                    <b-badge
                        v-if="item.type === 'LEGAL'"
                        class="p-1"
                        variant="primary"
                    >
                      {{ $t("submodules.doc.sendDoc_from_legal") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type === 'PHYSICAL'"
                        class="p-1"
                        variant="success"
                    >
                      {{ $t("submodules.doc.sendDoc_from_physical") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type === 'BY_DIRECTOR'"
                        class="p-1"
                        variant="secondary"
                    >
                      {{ $t("submodules.commission.by_director.title") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type === 'FROM_DXA'"
                        class="p-1"
                        variant="info"
                    >
                      DXA
                    </b-badge>
                  </td>
                  <td v-show="activeTab === 'dxa'" class="text-center">
                    <b-badge
                        v-if="item.applicationDXAType === 'FOR_SALE'"
                        class="p-1"
                        variant="primary"
                    >
                      {{ $t("submodules.dxa.dxa_application_type_1") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.applicationDXAType === 'FOR_ADD'"
                        class="p-1"
                        variant="success"
                    >
                      {{ $t("submodules.dxa.dxa_application_type_1") }}
                    </b-badge>
                  </td>
                </tr>
                </tbody>
              </table>
            </b-overlay>
          </div>
          <div v-if="totalItems > 0" class="row">
            <div class="col-lg-12">
              <b-pagination
                  v-model="var_default_search_payload.page"
                  :per-page="var_default_search_payload.itemsPerPage"
                  :total-rows="totalItems"
                  aria-controls="my-table"
                  class="justify-content-end"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="card card-body card-tabs" style="min-height: 35em">
          <b-tabs v-model="currentTabIndex" content-class="mt-3" fill>
            <b-tab :title="$t('submodules.doc.tab_doc')">
              <b-overlay :opacity="0.1" :show="loadingById" rounded="sm">
                <!-- FROM_DXA -->
                <table
                    v-if="selectedTrItem"
                    v-show="selectedTrItem.type === 'FROM_DXA'"
                    class="table m-0 "
                >
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.applicant') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span
                          class="text-right"
                          style="font-size: 12px"
                      >
                        {{
                          getName({
                            nameRu: selectedApplicationItem.applicationDXATypeNameRu,
                            nameLt: selectedApplicationItem.applicationDXATypeNameLt,
                            nameUz: selectedApplicationItem.applicationDXATypeNameUz,
                          })
                        }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }} </b> <br>
                    </td>
                    <td class="text-right">
                                            <span
                                                class="text-right"
                                                style="font-size: 12px"
                                            >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.inn') }}</b> <br>
                    </td>
                    <td class="text-right">
                                            <span
                                                class="text-right"
                                                style="font-size: 12px"
                                            >
                                                {{ selectedApplicationItem.companyTinFromDxa }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                    </td>
                    <td class="text-right">
                                            <span
                                                class="text-right"
                                                style="font-size: 12px"
                                            >
                                                {{ selectedApplicationItem.completionTime }}
                                            </span>
                    </td>
                  </tr>
                  <tr v-if="selectedTrItemTriedToSend">
                    <td class="font-weight-bold">{{ $t('submodules.dxa.sender_employee_to_dxa') }}:</td>
                    <td>
                      <b class="d-block">
                        {{ selectedTrItem.employeeLastName }}
                        {{ selectedTrItem.employeeFirstName }}
                        {{ selectedTrItem.employeeMiddleName }}
                      </b>
                      <small>
                        {{
                          getName({
                            nameUz: yurDepartmentNameUz,
                            nameRu: yurDepartmentNameRu,
                            nameEn: yurDepartmentNameEn,
                          })
                        }}
                        <br>
                        {{
                          getName({
                            nameUz: departmentNameUz,
                            nameRu: departmentNameRu,
                            nameEn: departmentNameEn,
                          })
                        }}
                        <br>
                        <b>
                          {{
                            getName({
                              nameUz: positionNameUz,
                              nameRu: positionNameRu,
                              nameEn: positionNameEn,
                            })
                          }}
                        </b>
                      </small>
                    </td>
                  </tr>
                </table>
                <!-- LEGAL -->
                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type === 'LEGAL'"
                    class="table m-0 "
                >
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('column.address') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.senderAddress }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                      <span class="text-left" style="font-size: 12px" >
                        {{ selectedApplicationItem.numberOfIncomingDocument }}
                      </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.dateOfIncomingDocument }}
                                            </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.entered_number_physical') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                       {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.dateOfOutgoingDocument
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.create_entered_number_physical') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.dateOfIncomingDocument
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.summary') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.employeeFullName
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.other_contragent') }}
                      </b> <br>
                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                </table>
                <!-- PHYSICAL -->
                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type === 'PHYSICAL'"
                    class="table m-0 "
                >
                  <tr class="cool-link">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.fio') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.applicantSecondName }}
                                                {{ selectedApplicationItem.applicantFirstName }}
                                                {{ selectedApplicationItem.applicantMiddleName }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b>
                        {{ $t('submodules.doc.address') }}
                      </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >{{ selectedApplicationItem.address }}</span>
                    </td>
                  </tr>
                  <tr class="cool-link">
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.confirmation_document.title') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.confirmationDocumentNameRu,
                            nameLt: selectedApplicationItem.confirmationDocumentNameLt,
                            nameUz: selectedApplicationItem.confirmationDocumentNameUz,
                          })
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.method_of_reception') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.receptionMethodNameRu,
                            nameLt: selectedApplicationItem.receptionMethodNameLt,
                            nameUz: selectedApplicationItem.receptionMethodNameUz,
                          })
                        }}
                                            </span>

                      <br>
                    </td>
                  </tr>
                  <tr class="cool-link">
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.appeal_type.title') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.appealTypeNameRu,
                            nameLt: selectedApplicationItem.appealTypeNameRu,
                            nameUz: selectedApplicationItem.appealTypeNameRu,
                          })
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.commission.document_status.title') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.documentStatusNameLt,
                            nameLt: selectedApplicationItem.documentStatusNameLt,
                            nameUz: selectedApplicationItem.documentStatusNameLt,
                          })
                        }}
                                            </span>

                      <br>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.entered_number_physical') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                        {{
                          selectedApplicationItem.dateOfOutgoingDocument
                        }}
                      </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.create_entered_number_physical') }}
                      </b> <br>

                      <span class="text-left text-muted" style="font-size: 11px">
                        {{ selectedApplicationItem.numberOfIncomingDocument }}
                      </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span class="text-left" style="font-size: 12px">
                        {{
                          selectedApplicationItem.dateOfIncomingDocument
                        }}
                      </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.summary') }}
                      </b> <br>
                      <span class="text-left text-muted" style="font-size: 11px">
                        {{
                          selectedApplicationItem.summary
                        }}
                      </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span class="text-left" style="font-size: 12px">
                        {{
                          selectedApplicationItem.employeeFullName
                        }}
                      </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.other_contragent') }}
                      </b> <br>
                      <span class="text-left text-muted" style="font-size: 11px">
                        {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                      </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span class="text-left" style="font-size: 12px">
                        {{
                          selectedApplicationItem.completionTime
                        }}
                      </span>
                      <br>
                    </td>
                  </tr>
                </table>
                <!-- BY_DIRECTOR -->
                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type === 'BY_DIRECTOR'"
                    class="table m-0 "
                >
                  <tr
                      v-show="!selectedApplicationItem.isLegal"
                      class="cool-link"
                  >
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.fio') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                        {{ selectedApplicationItem.senderFullName }}
                      </span>
                    </td>
                    <td class="text-right">
                      <b>
                        {{ $t('submodules.doc.address') }}
                      </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >{{ selectedApplicationItem.address }}</span>
                    </td>
                  </tr>
                  <tr
                      v-show="!selectedApplicationItem.isLegal"
                      class="cool-link"
                  >
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.confirmation_document.title') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.confirmationDocumentNameRu,
                            nameLt: selectedApplicationItem.confirmationDocumentNameLt,
                            nameUz: selectedApplicationItem.confirmationDocumentNameUz,
                          })
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.method_of_reception') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.receptionMethodNameRu,
                            nameLt: selectedApplicationItem.receptionMethodNameLt,
                            nameUz: selectedApplicationItem.receptionMethodNameUz,
                          })
                        }}
                                            </span>

                      <br>
                    </td>
                  </tr>
                  <tr
                      v-show="!selectedApplicationItem.isLegal"
                      class="cool-link"
                  >
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.appeal_type.title') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.appealTypeNameRu,
                            nameLt: selectedApplicationItem.appealTypeNameRu,
                            nameUz: selectedApplicationItem.appealTypeNameRu,
                          })
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.commission.document_status.title') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          getName({
                            nameRu: selectedApplicationItem.documentStatusNameLt,
                            nameLt: selectedApplicationItem.documentStatusNameLt,
                            nameUz: selectedApplicationItem.documentStatusNameLt,
                          })
                        }}
                                            </span>

                      <br>
                    </td>
                  </tr>

                  <tr v-show="selectedApplicationItem.isLegal">
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('column.address') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.senderAddress }}
                                            </span>
                    </td>
                  </tr>
                  <tr v-show="selectedApplicationItem.isLegal">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                            </span>
                    </td>
                  </tr>
                  <tr v-show="selectedApplicationItem.isLegal">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.numberOfIncomingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{ selectedApplicationItem.dateOfIncomingDocument }}
                                            </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.entered_number_physical') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.dateOfOutgoingDocument
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.create_entered_number_physical') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.dateOfIncomingDocument
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.summary') }}
                      </b> <br>

                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.employeeFullName
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.doc.other_contragent') }}
                      </b> <br>
                      <span
                          class="text-left text-muted"
                          style="font-size: 11px"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          class="text-left"
                          style="font-size: 12px"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>
                </table>
                <div
                    v-if="selectedApplicationItem && selectedApplicationItem.applicationProjectOwner && selectedApplicationItem.applicationProjectOwner.employeeFullName"
                    class="col-md-12">
                  <hr>
                  <b>{{ $t('column.is_project_owner') }}</b>
                  <div>
                    {{ selectedApplicationItem.applicationProjectOwner.employeeFullName }}
                  </div>
                </div>
                <div v-if="selectedApplicationItem.allFiles" class="wrapper">
                  <span CLASS="fromcenter">{{ $t('submodules.doc.application_file') }}</span>
                </div>
                <div
                    v-if="selectedApplicationItem.allFiles && selectedApplicationItem.allFiles.length"
                    class="card card-body card-tabs mt-1"
                    style="min-height: 10em; width: 100%"
                >
                  <tr
                      v-for="(item, index) in selectedApplicationItem.allFiles"
                      :key="index + 'FILE'"
                      class="mt-3"
                  >
                    <div class="d-flex align-items-center bg-light p-2 justify-content-between">
                      <div class="d-flex align-items-center">
                        <a
                            :download="getExt(item.url) === 'pdf' ? false : item.url"
                            :href="getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                            @click="viewIlova(item.url)"
                        >
                          <BaseFileViewer
                              :uploadPath="item.name"
                              class="my-card-hovered"
                          />
                        </a>
                        <span class="ml-2">
                                                    {{ item.name }}
                                                </span>
                      </div>
                    </div>
                  </tr>
                </div>
                <div
                    v-else-if="selectedApplicationItem.allFiles"
                    class="card card-body card-tabs mt-1 text-center"
                    style="min-height: 2em; width: 100%"
                >
                  {{ $t('messages.data_not_found') }}
                </div>
                <div
                    v-else
                    v-show="selectedTrItem.type !== 'FROM_DXA'"
                    class="text-center card mt-3"
                >
                  <h5 class="p-3" style="opacity: 0.3">{{ $t("submodules.doc.selected_doc") }}</h5>
                </div>
                <!-- PROJECT FILES | Created in loyiha) -->
                <template v-if="computedShowLetterFiles">
                  <div class="wrapper">
                    <span CLASS="fromcenter">{{ $t('application_created_files') }}</span>
                  </div>
                  <div class="card card-body card-tabs mt-1" style="min-height: 10em; width: 100%">
                    <tr v-for="(item, index) in selectedApplicationItem.letterFiles" :key="index + 'FILE'" class="mt-1">
                      <td class="d-flex align-items-center bg-light p-2 justify-content-between">
                        <div class="d-flex align-items-center">
                          <a
                              :download="getExt(item.url) === 'pdf' ? false : item.url"
                              :href="getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                              @click="viewIlova(item.url)"
                          >
                            <BaseFileViewer
                                :uploadPath="item.url"
                                class="my-card-hovered"
                            />
                          </a>
                          <span class="ml-2">{{ item.fileName }}</span>
                        </div>

                        <!-- Tegishli emasligini bildiruvchi xatni DXAga jo'natish uchun -->
                        <div class="d-flex align-items-center">
                          <b-button
                              v-if="(selectedApplicationItem.applicationStatus === 'NOT_BELONG_LETTER_SIGNED') && selectedApplicationItem.applicationTypeInProject === 'NOT_BELONG'
                            && selectedApplicationItem.type === 'FROM_DXA' && item.letterType === 'LETTER' && item.documentType === 'pdf'"
                              class="ml-2  card-tabs-button"
                              variant="success"
                              @click="sendToDXANotBelong(item, selectedApplicationItem)"
                          >
                            <i class="mdi mdi-email-send"></i>
                            {{ $t('submodules.doc.send_dxa_not_belong') }}
                          </b-button>
                        </div>

                        <!-- Ruxsat etilgan qarorni DXAga jo'natish uchun -->
                        <div class="d-flex align-items-center">
                          <b-button
                              v-if="(selectedApplicationItem.applicationStatus === 'COMMISSION_SIGNED') && selectedApplicationItem.applicationTypeInProject === 'FROM_DXA'
                            && selectedApplicationItem.type === 'FROM_DXA' && item.letterType === 'DECISION'
                            && item.documentType === 'pdf' && !item.isRejected"
                              class="ml-2  card-tabs-button"
                              pill
                              variant="outline-success"
                              @click="showModalAcceptedDecisionToDXA(item, selectedApplicationItem)"
                          >
                            <i class="mdi mdi-email-send"></i>
                            {{ $t('submodules.doc.send_dxa_accepted_decision') }}
                          </b-button>
                        </div>

                        <!-- Rad etilgan qarorni DXAga jo'natish uchun -->
                        <div class="d-flex align-items-center">
                          <b-button
                              v-if="(selectedApplicationItem.applicationStatus === 'COMMISSION_SIGNED') && selectedApplicationItem.applicationTypeInProject === 'FROM_DXA'
                            && selectedApplicationItem.type === 'FROM_DXA' && item.letterType === 'DECISION'
                            && item.documentType === 'pdf' && item.isRejected"
                              class="ml-2  card-tabs-button"
                              pill
                              variant="outline-danger"
                              @click="sendRejectedDecisionToDXA(item, selectedApplicationItem)"
                          >
                            <i class="mdi mdi-email-send"></i>
                            {{ $t('submodules.doc.send_dxa_rejected_decision') }}
                          </b-button>
                        </div>

                      </td>
                    </tr>
                  </div>

                </template>
                <!-- COMMISSION FILES -->
                <div
                    v-if="selectedApplicationItem.commissionFiles && (selectedApplicationItem.applicationStatus === 'COMMISSION_SEEN' || selectedApplicationItem.applicationStatus === 'COMMISSION_SENT' || selectedApplicationItem.applicationStatus === 'COMMISSION_SIGNED' || selectedApplicationItem.applicationStatus === 'COMMISSION_CANCELLED')"
                    class="wrapper"
                >
                  <span CLASS="fromcenter">{{ $t('commission_attached_files') }}</span>
                </div>
                <div
                    v-if="selectedApplicationItem.commissionFiles && selectedApplicationItem.commissionFiles.length"
                    class="card card-body card-tabs mt-1"
                    style="min-height: 10em; width: 100%"
                >
                  <tr v-for="(item, index) in selectedApplicationItem.commissionFiles"
                      :key="index + 'FILE'"
                      class="mt-1"
                  >
                    <div class="d-flex align-items-center bg-light p-2 justify-content-between">
                      <div class="d-flex align-items-center">
                        <a
                            :download="getExt(item.url) === 'pdf' ? false : item.url"
                            :href="getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                            @click="viewIlova(item.url)"
                        >
                          <BaseFileViewer
                              :uploadPath="item.url"
                              class="my-card-hovered"
                          />
                        </a>
                        <span class="ml-2">{{ item.fileName }}</span>
                      </div>

                    </div>
                  </tr>
                </div>
                <!-- <tr>
                  <td
                      colspan="2"
                      class="text-muted text-center p-0"
                  > -->
                <div
                    v-if="['FINISH_LETTER_CREATED', 'FINISH_LETTER_SENT', 'FINISH'].indexOf(selectedTrItem.status) !== -1 && finishLetter && finishLetter.url"
                    class="d-flex align-items-center bg-light p-2 justify-content-around">
                  <div class="d-flex align-items-center">
                    <a
                        :download="getExt(finishLetter.url) === 'pdf' ? false : finishLetter.url"
                        :href="getExt(finishLetter.url) === 'pdf' ? `#` : `${baseUrl}/${finishLetter.url}`"
                        @click="viewIlova(finishLetter.url)"
                    >
                      <BaseFileViewer
                          :uploadPath="finishLetter.url"
                          class="my-card-hovered"
                      />
                    </a>
                    <span class="ml-2">{{ finishLetter.fileName }}</span>
                    <b-button
                        v-if="['FINISH_LETTER_CREATED'].indexOf(selectedTrItem.status) !== -1 && finishLetter.fileType === 'docx'"
                        :to="`/docs/office?page=GET&id=${finishLetter.id}`"
                        class="card-tabs-button mx-2"
                        target="_blank"
                        variant="false"
                    >
                      <i class="fa fa-pen"></i>
                    </b-button>
                  </div>
                  <div class="d-flex">
                    <b-button
                        v-if="['FINISH_LETTER_CREATED'].indexOf(selectedTrItem.status) !== -1" class="mr-2"
                        variant="primary" @click="sendFinishLetterToChairman(finishLetter.id)">
                      <i class="fas fa-file-signature"></i>
                      {{ $t('submodules.commission.send_for_sign') }}
                    </b-button>
                    <div
                        v-else-if="['FINISH_LETTER_SENT', 'FINISH'].indexOf(selectedTrItem.status) !== -1 && finishLetter._signer">
                      {{ $t('submodules.doc.signer_employee') }}
                      <br>
                      <b>
                        {{ finishLetter._signer.fullName }}
                      </b>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <b-button
                      v-show="selectedTrItem.type === 'FROM_DXA' && selectedTrItem.applicationStatus === 'CREATED'"
                      class="card-tabs-button"
                      variant="primary"
                      @click="VISABtn"
                  >
                    <i class="fa fa-credit-card"></i>
                    {{ $t('submodules.dxa.visa') }}
                  </b-button>
                  <b-button
                      v-show="selectedTrItem.type === 'FROM_DXA'"
                      class="ml-2  card-tabs-button"
                      variant="warning"
                      @click="DXAInfoBtn"
                  >
                    <i class="fa fa-eye"></i>
                    {{ $t('submodules.dxa.view_dxa') }}
                  </b-button>
                  <b-button
                      v-show="selectedTrItem.status === 'EXTEND_COMPLETED'"
                      class="ml-2 card-tabs-button"
                      variant="outline-info"
                      @click="reopenApplication(selectedTrItem.id)"
                  >
                    <i class="fa fa-reply"></i>
                    {{ $t('submodules.dxa.reopen_application') }}
                  </b-button>
                  <b-button
                      v-if="selectedTrItem.type === 'FROM_DXA' && selectedTrItem.applicationStatus === 'VISA_APPROVED' && selectedTrItem && selectedTrItem.projectOwner"
                      class="ml-2  card-tabs-button"
                      variant="primary"
                      @click="createProject(selectedTrItem.id)"
                  >
                    <i class="fa fa-folder"></i>
                    {{ $t('submodules.doc.start_investigating') }}
                  </b-button>
                  <b-button
                      v-if="selectedTrItem.letterDto"
                      :to="`/docs/office?page=GET&id=${selectedTrItem.letterDto.id}`"
                      class="card-tabs-button"
                      target="_blank"
                      variant="warning"
                  >
                    <i class="fa fa-pencil-alt"></i>
                    {{ $t('actions.edit') }}
                  </b-button>
                  <b-button
                      v-if="selectedTrItem.applicationStatus === 'SEEN' && selectedTrItem.projectOwner
                      && selectedTrItem.applicationTypeInProject === 'FROM_DXA'"
                      class="ml-2 card-tabs-button"
                      variant="success"
                      @click="handleMakeSign(selectedTrItem)"
                  >
                    <i class="fa fa-share"></i>
                    {{ $t('submodules.commission.send_to_commission') }}
                  </b-button>
                  <b-button
                      v-if="(selectedTrItem.applicationStatus === 'SEEN') && selectedTrItem.applicationTypeInProject === 'NOT_BELONG' && selectedTrItem.type === 'FROM_DXA'"
                      class="ml-2  card-tabs-button"
                      variant="success"
                      @click="sendItem"
                  >
                    <i class="fa fa-share"></i>
                    {{ $t('submodules.doc.send_doc_for_sign') }}
                  </b-button>
                  <b-button
                      v-if="(selectedTrItem.applicationStatus === 'SEEN')
                          && selectedTrItem.applicationTypeInProject !== 'FROM_DXA'
                          && selectedTrItem.applicationTypeInProject !== 'NOT_BELONG'"
                      class="ml-2  card-tabs-button"
                      variant="success"
                      @click="sendItem"
                  >
                    <i class="fa fa-share"></i>
                    {{ $t('submodules.doc.send_doc') }}
                  </b-button>
                  <b-button
                      v-if="(selectedTrItem.applicationStatus === 'COMMISSION_SEEN')
                       && selectedTrItem.applicationTypeInProject !== 'FROM_DXA' "
                      class="ml-2  card-tabs-button"
                      variant="success"
                      @click="uploadFinishLetter"
                  >
                    <i class="fa fa-share"></i>
                    {{ $t('submodules.commission.doc_button.create_letter') }}
                  </b-button>
                  <b-button
                      v-if="selectedTrItem.applicationStatus === 'CREATED' && selectedTrItem.projectOwner"
                      class="ml-2  card-tabs-button"
                      variant="primary"
                      @click="createProject(selectedTrItem.id)"
                  >
                    <i class="fa fa-folder"></i>

                    {{ $t('submodules.doc.start_investigating') }}
                  </b-button>
                  <b-button
                      v-if="['FOR_NOT_COMPLETED', 'FOR_NOT_BELONG', 'FOR_REGION'].indexOf(selectedTrItem.applicationStatus) !== -1
                       && selectedTrItem && selectedTrItem.projectOwner && selectedTrItem.applicationTypeInProject !== 'FROM_DXA'"
                      class="ml-2 card-tabs-button"
                      variant="success"
                      @click="letterSign(selectedTrItem)"
                  >
                    <i class="fa fa-file-signature"></i>
                    {{ $t('submodules.commission.send_for_sign') }}
                  </b-button>
                </div>
                <div
                    v-if="!selectedTrItem.id"
                    class="text-center card mt-3"
                >
                  <h5
                      class="p-3"
                      style="opacity: 0.3"
                  >
                    {{ $t("submodules.doc.selected_doc") }}
                  </h5>
                </div>
                <!-- SEND_FOR_TAKE_VISA - Viza olish uchun jo'natilgan holatida -->
                <div
                    v-if="Object.keys(selectedTrItem).length !== 0 && selectedTrItem.type === 'FROM_DXA' && selectedTrItem.applicationStatus !== 'CREATED' && selectedTrItem.visaEmployeeDto"
                    class="card"
                >
                  <div class="card-header bg-white d-flex align-items-center">
                    <div class="font-size-16 flex-grow-1">
                      <img :src="require('@/assets/doc/1.png')" alt="DOC" height="45"/>
                      <strong class="ml-3">{{ $t("submodules.dxa.send_for_visa") }}</strong>
                    </div>
                  </div>
                  <div class="pl-4">
                    <div class="table-responsive">
                      <table class="table table-centered m-0">
                        <tbody>
                        <tr>
                          <td style="width: 50px">
                            <div class="avatar-sm">
                              <span
                                  class="avatar-title rounded-circle bg-soft-primary text-white font-size-20 font-weight-bold">
                                {{
                                  selectedTrItem.visaEmployeeDto.visaEmployeeFirstName ? selectedTrItem.visaEmployeeDto.visaEmployeeFirstName.charAt(0) : ''
                                }}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div>
                                <h5 class="font-size-14 m-0 font-weight-bold">
                                  <p class="text-dark m-0">
                                    {{ $t("submodules.dxa.visa_issuer") }}
                                  </p>
                                </h5>
                                <h5 class="font-size-14 m-0">
                                  <p class="text-dark m-0">
                                    {{ selectedTrItem.visaEmployeeDto.visaEmployeeLastName || '' }}
                                    {{ selectedTrItem.visaEmployeeDto.visaEmployeeFirstName || '' }}
                                    {{ selectedTrItem.visaEmployeeDto.visaEmployeeMiddleName || '' }}
                                  </p>
                                </h5>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaEmployeeDto.visaYurDepartmentNameLt,
                                      nameRu: selectedTrItem.visaEmployeeDto.visaYurDepartmentNameRu,
                                      nameUz: selectedTrItem.visaEmployeeDto.visaYurDepartmentNameUz,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameUz: selectedTrItem.visaEmployeeDto.visaDepartmentNameUz,
                                      nameLt: selectedTrItem.visaEmployeeDto.visaDepartmentNameLt,
                                      nameRu: selectedTrItem.visaEmployeeDto.visaDepartmentNameRu,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaEmployeeDto.visaPositionNameLt,
                                      nameRu: selectedTrItem.visaEmployeeDto.visaPositionNameRu,
                                      nameUz: selectedTrItem.visaEmployeeDto.visaPositionNameUz,
                                    })
                                  }}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            {{ selectedTrItem.visaEmployeeDto.visaComment }}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!-- VISA -->
                <div
                    v-show="Object.keys(selectedTrItem).length !== 0 && selectedTrItem.type === 'FROM_DXA' && selectedTrItem.dxaVisaIsGiven"
                    class="card"
                >
                  <div class="card-header bg-white d-flex align-items-center">
                    <div class="font-size-16 flex-grow-1">
                      <img :src="require('@/assets/doc/1.png')" alt="DOC" height="45"/>
                      <strong class="ml-3">{{ $t("submodules.dxa.VISA_APPROVED") }}</strong>
                    </div>
                    <div class="btn btn-info" @click="showVisaFileView(selectedTrItem.id)">
                      {{ $t('actions.view_document') }}
                    </div>
                  </div>
                  <div class="pl-4">
                    <div class="table-responsive">
                      <table class="table table-centered m-0" v-if="selectedTrItem.visaData">
                        <tbody>
                        <tr>
                          <td style="width: 50px">
                            <div class="avatar-sm">
                              <span class="avatar-title rounded-circle bg-soft-primary font-size-20 font-weight-bold">
                                {{
                                  selectedTrItem.visaData.fromWhoName ? selectedTrItem.visaData.fromWhoName.charAt(0) : ''
                                }}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div>
                                <h5 class="font-size-14 m-0 font-weight-bold">
                                  <p class="text-dark m-0">
                                    {{ $t("submodules.dxa.visa_issuer") }}
                                  </p>
                                </h5>
                                <h5 class="font-size-14 m-0">
                                  <p class="text-dark m-0">
                                    {{ selectedTrItem.visaData.fromWhoName || '' }}
                                  </p>
                                </h5>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaData.fromWhoYurDepartmentNameLt,
                                      nameRu: selectedTrItem.visaData.fromWhoYurDepartmentNameRu,
                                      nameUz: selectedTrItem.visaData.fromWhoYurDepartmentNameUz,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameUz: selectedTrItem.visaData.fromWhoDepartmentNameUz,
                                      nameLt: selectedTrItem.visaData.fromWhoDepartmentNameLt,
                                      nameRu: selectedTrItem.visaData.fromWhoDepartmentNameRu,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaData.fromWhoPositionNameLt,
                                      nameRu: selectedTrItem.visaData.fromWhoPositionNameRu,
                                      nameUz: selectedTrItem.visaData.fromWhoPositionNameUz,
                                    })
                                  }}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 50px">
                            <div class="avatar-sm">
                                <span class="avatar-title rounded-circle bg-soft-primary font-size-20 font-weight-bold">
                                {{
                                    selectedTrItem.visaData.toWhoName ? selectedTrItem.visaData.toWhoName.charAt(0) : ''
                                  }}
                                </span>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div>
                                <h5 class="font-size-14 m-0 font-weight-bold">
                                  <p class="text-dark m-0">
                                    {{ $t("submodules.dxa.performer") }}
                                  </p>
                                </h5>
                                <h5 class="font-size-14 m-0">
                                  <p class="text-dark m-0">
                                    {{ selectedTrItem.visaData.toWhoName || '' }}
                                  </p>
                                </h5>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaData.toWhoYurDepartmentNameLt,
                                      nameRu: selectedTrItem.visaData.toWhoYurDepartmentNameRu,
                                      nameUz: selectedTrItem.visaData.toWhoYurDepartmentNameUz,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameUz: selectedTrItem.visaData.toWhoDepartmentNameUz,
                                      nameLt: selectedTrItem.visaData.toWhoDepartmentNameLt,
                                      nameRu: selectedTrItem.visaData.toWhoDepartmentNameRu,
                                    })
                                  }}
                                </p>
                                <p class="m-0 text-muted">
                                  {{
                                    getName({
                                      nameLt: selectedTrItem.visaData.toWhoPositionNameLt,
                                      nameRu: selectedTrItem.visaData.toWhoPositionNameRu,
                                      nameUz: selectedTrItem.visaData.toWhoPositionNameUz,
                                    })
                                  }}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            {{ selectedTrItem.visaData.comment }}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </b-overlay>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <b-modal v-model="viewIlovaModal" :title="$t('actions.view')" scrollable size="xl">
      <div v-if="ilovaUploadPath" style="height: 700px">
        <embed :src="`${baseUrl}/${ilovaUploadPath}`" height="800" type="application/pdf" width="100%"/>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewIlovaModal = false">
          {{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>
    <b-modal id="doc-create-modal" v-model="sendModal" :no-close-on-backdrop="true"
             :title="`${$t('submodules.doc.send_doc')}`" scrollable size="xl">
      <Send ref="sendRef"
            :application="selectedTrItem"
            :members-for-aggrement="currentAppAggrementMembers"
            aggrement-not-editable
      />

      <template v-slot:modal-footer>
        <b-button class="card-tabs-button" variant="secondary" @click="sendModal = false">
          {{ $t("actions.cancel") }}
        </b-button>
        <b-button class="card-tabs-button" variant="success" @click="sendAndSave">
          <b-overlay :opacity="0.1" :show="loaderButton" rounded="sm">
            {{ $t("submodules.doc.send_doc") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-sidebar v-model="ismodalDXAInfo" :no-header="true" class="sidebar-part" right shadow sidebar-class="p-0"
               width="85%">
      <DXAApplicationAllInfo
          ref="isSidebar_ref"
          :ID="selectedTrItem.id"
          :applicationId="selectedTrItem.applicationDxaId"
          :projectOwner="selectedTrItem.projectOwner"
          :statusFromDXA="selectedTrItem.applicationStatus"
          @close="closeSidebar"
          @createProject="createProjectDXAINFO"
          @returnApplication="returnApplicationByRegion"/>
    </b-sidebar>
    <b-modal
        id="widthMM"
        v-model="isCommit"
        :no-close-on-backdrop="true"
        body-class="p-0"
        size="lg">
      <div class="p-5">
        <BaseTextareaWithValidation
            v-model="commit"
            :label="$t('messaging.title')"
            class="required"
            label-on-top
            max-rows="6"
            required
        >
        </BaseTextareaWithValidation>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
              class="float-right m-1"
              size="sm"
              variant="success"
              @click="sendReview"
          >
            {{ $t('actions.send') }}
          </b-button>

          <b-button class="float-right m-1" size="sm" variant="danger" @click="closeIsModal">
            {{ $t('actions.close') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- COMMISSIONS MODAL -->
    <b-modal v-model="commissionsModal" :title="`${$t('submodules.commission.title')}`" scrollable size="md">
      <BaseMultiselectWithValidation
          v-model="commissionTypeId"
          :custom-label="customLabelCommissionTypes"
          :label="$t('submodules.commission.special_commission_type.title')"
          :max-height="600"
          :options="commissionTypes.map(e => e.id)"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      />

      <b-form-textarea
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      />

      <template v-slot:modal-footer>
        <b-button variant="success" @click="visa_btn">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <!-- VISA MODAL -->
    <b-modal v-model="visaModal" :title="`${$t('submodules.dxa.visa')}`" scrollable size="md">
      <BaseMultiselectWithValidation
          v-model="commissionTypeId"
          :custom-label="customLabelCommissionTypes"
          :label="$t('actions.select_employee')"
          :max-height="600"
          :options="commissionTypes.map(e => e.id)"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      />

      <b-form-textarea
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      />

      <template v-slot:modal-footer>
        <b-button variant="success" @click="visa_btn">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <!-- signatureModal -->
    <b-modal v-model="signatureModal.modal" :title="`${$t('submodules.reports.make_sign')}`" hide-footer scrollable
             size="lg">
      <b-overlay :opacity="0.1" :show="signatureModal.loader" rounded="sm">
        <SignKeys :dataToSign="signatureModal.doc" @sign="signSuccess"/>
      </b-overlay>
    </b-modal>
    <!-- finishLetterToChairmaModal -->

    <b-modal v-model="finishLetterToChairmaModal.modal" :title="`${$t('submodules.commission.title')}`" scrollable
             size="md">
      <b-form-textarea v-model="finishLetterToChairmaModal.comment" :placeholder="$t('submodules.doc.summary')"
                       class="mt-3" rows="5"/>
      <template v-slot:modal-footer>
        <b-button variant="success" @click="makeLetterSendFinishLetterToChairman">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <b-modal v-model="visaFileView.modal" :title="`${$t('actions.view_document')}`" scrollable size="lg">
      <pdf :src="visaFileView.src"></pdf>
      <template v-slot:modal-footer>
        <a :href="visaFileView.src" class="btn btn-info" :download="`${selectedTrItem.applicationRegNumber}-visa.pdf`"
           target="_blank">{{ $t('actions.download') }}</a>
      </template>
    </b-modal>

    <b-modal v-model="acceptedDecisionToDXAModal.show" :title="`${$t('submodules.doc.send_dxa_accepted_decision')}`"
             scrollable size="lg">

      <div class="mt-3">{{ $t('actions.choose_file') }}</div>
      <BaseFileUploaderWithValidation
          v-model="acceptedDecisionToDXAModal.form.file"
          :max-files="50"
          label=""
      />

      <div class="mt-3">{{ $t('submodules.commission.payment_amount') }}</div>
      <base-input-with-validation
          v-model="acceptedDecisionToDXAModal.form.paymentAmount"
          label=""
          placeholder=""
          type="number"
          :step="0.01"
          :labelOnTop="true"
      />

      <template v-slot:modal-footer>
        <b-button variant="success" @click="sendAcceptedDecisionToDXA">
          <b-overlay :opacity="0.1" :show="acceptedDecisionToDXAModal.btnLoader" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

  </div>
  <!-- end row -->
</template>

<script>
import pdf from 'vue-pdf'
import Send from "@/modules/letter/create/send";
import SignKeys from "../../letter/SignKeys.vue";
import appConfig from "@/app.config";
import letterService from "@/modules/letter/letterService";
import ProjectService from '@/shared/services/projectService'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import DXAApplicationAllInfo from "../DXA info/index";
import BaseInputWithValidation from "@/components/base/BaseInputWithValidation.vue";
import {showMsgError, showMsgSuccess, successSavedDoc} from "@/helper";
import BaseTextareaWithValidation from "@/components/base/BaseTextareaWithValidation";

const MAIN_API_URL = 'before-commission/application'
const MAIN_API_URL_DXA = 'from-dxa'

export default {
  page: {
    title: "TypeOfComplaint",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    BaseTextareaWithValidation,
    BaseInputWithValidation,
    DXAApplicationAllInfo,
    pdf,
    Send,
    SignKeys,
  },
  data() {
    return {
      commissionTypeId: null,
      commissionComment: '',
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
      visaFileView: {
        modal: false,
        src: null,
      },
      visaModal: false,
      currentAppAggrementMembers: [],
      activeTab: 'inner',
      ismodalDXAInfo: false,
      applicationTypeTabIndex: 0,
      currentTabIndex: 0,
      loaderButton: false,
      sendModal: false,
      currentItem: {},
      ilovaUploadPath: null,
      viewIlovaModal: false,
      selectedTrItem: {},
      finishLetter: {},
      visaInfo: {},
      selectedApplicationItem: {},
      selectedApplicationItemFiles: {},
      loading: false,
      loadingById: false,
      selectedType: null,
      typeModal: false,
      loadingTableItems: false,
      isCommit: false,
      isSidebar: false,
      signatureModal: {
        modal: false,
        loader: false,
        doc: null,
      },
      finishLetterToChairmaModal: {
        modal: false,
        loader: false,
        comment: null,
      },
      decision_status: null,
      commit: null,
      json_fields: {
        "Name Uz": "nameUz",
        "Name Lt": "nameLt",
        "Name Ru": "nameRu",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      searchKeyword: '',
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      title: "Department Types",
      activeDep: {},
      tableItems: [],
      totalItems: 0,
      tableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {label: 'Жўнатувчининг номи (Ф.И.Ш.)', key: "name1"},
        {label: 'Манзили', key: "name2"},
        {label: 'Қисқа мазмуни', key: "name3"},
        {label: 'Рўйхатдан ўтказиш санаси', key: "name4"},
        {label: 'Рўйхатдан ўтказиш рақами', key: "name5"},
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      acceptedDecisionToDXAModal: {
        show: false,
        btnLoader: false,
        form: {
          paymentAmount: null,
          letter: null,
          file: [],
        }
      }
    };
  },
  /*
  COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    selectedTrItemTriedToSend() {
      return this.selectedTrItem.triedToSend && this.selectedTrItem.sentDXAInfo;
    },
    computedShowLetterFiles() {
      return this.selectedApplicationItem.applicationStatus !== 'BEING_SEEN' &&
          this.selectedApplicationItem.applicationStatus !== 'CREATED' &&
          this.selectedApplicationItem.letterFiles &&
          this.selectedApplicationItem.letterFiles.length > 0;
    },
  },
  methods: {
    async signSuccess(data) {
      this.signatureModal.loader = false;
    },
    closeIsModal() {
      this.decision_status = null
      this.isCommit = false
    },
    showVisaFileView(applicationId) {
      this.loadingById = true;
      letterService.dxaVisaDataGetFile(applicationId).then(({data}) => {
        this.visaFileView.src = 'data:application/pdf;base64,' + data;
        this.visaFileView.modal = true;
      }).finally(() => {
        this.loadingById = false;
      })
    },
    btn_click(status) {
      this.decision_status = status
      this.isCommit = true
    },
    sendReview() {
      let obj = {
        application_id: this.selectedTrItem.application_id,
        decision_status: this.decision_status,
        decision_text: this.commit,
      }
      letterService.applicationReview(obj)
          .then((res) => {
            this.$toast(this.$t('succes.title'), {type: 'success'});
            this.isCommit = false
            this.ismodalDXAInfo = false
          })
          .catch((err) => {
            this.isCommit = false
            console.log(err);
          })
          .finally(() => {
            this.commit = null
          });

    },
    visa_btn() {
      this.commissionModalLoader = true
      switch (this.selectedTrItem.type) {
        case 'FROM_DXA':
          switch (this.selectedTrItem.status) {
            case 'SEEN':
              this.sendToCommissionFromDxa()
              break;
            default:
              this.giveVisaForDXA();
              break;
          }
          break;
        default:
          this.giveVisaForDXA();
          break;
      }

    },
    sendToCommissionFromDxa() {
      const {selectedTrItem, commissionTypeId, commissionComment} = this
      letterService.sendToCommissionFromDxa(selectedTrItem.id, commissionTypeId, commissionComment)
          .then(() => {
            this.$toast(this.$t('succes.title'), {type: 'success'});
            this.commissionsModal = false
          })
          .finally(() => {
            this.commissionModalLoader = false
            this.fetchTableItems()
            this.selectedTrItem = {}
          })
    },
    giveVisaForDXA() {
      let obj = {
        comment: this.commissionComment,
        id: this.commissionTypeId,
      }
      letterService.giveVisaForDXA(this.selectedTrItem.id, obj)
          .then((res) => {
            this.$toast(this.$t('succes.title'), {type: 'success'});
            this.commissionTypeId = null
            this.commissionComment = ''
            this.visaModal = false
          })
          .catch((err) => {
            this.isCommit = false
            console.log(err);
          })
          .finally(() => {
            this.commissionModalLoader = false
            this.fetchTableItems()
            this.selectedTrItem = {}
          });
    },
    closeSidebar() {
      this.ismodalDXAInfo = false
    },
    activeTableInnerApplication() {
      this.activeTab = 'inner'
      this.var_default_search_payload.page = 1
      this.fetchTableItems();
    },
    activeTableDXAApplication() {
      this.activeTab = 'dxa'
      this.var_default_search_payload.page = 1
      this.fetchTableItems();
    },
    customLabelCommissionTypes(opt) {
      let selected = this.commissionTypes.find(e => e.id == opt);
      if (selected) {
        if (selected.fullName) {
          return `${selected.fullName} -
            ${this.getName({
            nameRu: selected.directoryPositionNameRu,
            nameLt: selected.directoryPositionNameLt,
            nameUz: selected.directoryPositionNameUz,
          })
          } `
        }
        return this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
      }
      return ``;
    },
    VISABtn() {
      crudAndListsService.getListGet('employee/get-all-employee/in-management', this.var_default_search_payload, null, true)
          .then(res => {
            this.commissionTypes = res.data
          })
          .catch(e => {
            console.log(e)
          })
      this.visaModal = true;
      this.fetchTableItems();
    },
    fetchCommissionTypes(callback = () => ({})) {
      this.commissionTypes = [];
      letterService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
          .then(res => {
            this.commissionTypes = res.data.list
            callback();
          })
          .catch(e => {
            console.log(e)
          })
    },
    handleMakeSign(item) {
      this.fetchCommissionTypes(() => {
        this.commissionsModal = true
      })
    },
    DXAInfoBtn() {
      this.ismodalDXAInfo = true
      this.$refs.isSidebar_ref.getApplicationInfoById()
      this.$refs.isSidebar_ref.getVisaInfoById()
    },
    reopenApplication(applicationId) {
      this.cnf().then(({value}) => {
        if (!value) {
          return false;
        }
        letterService.applicationReopenProject(applicationId).then(() => {
          this.fetchTableItems();
        })
      })
    },
    createProject(applicationId) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.create_project'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {

              this.$router.push({
                name: 'CreateProjectForApplication',
                params: {applicationId: applicationId}
              })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    createProjectDXAINFO(applicationId) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.create_project'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {

              this.$router.push({
                name: 'CreateProjectForApplication',
                params: {applicationId: applicationId, status: 'not_belong'}
              })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    returnApplicationByRegion(applicationId) {
      this.$bvModal.msgBoxConfirm(this.$t('actions.confirm'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              letterService
                  .returnApplicationByRegion(this.selectedTrItem.applicationDxaId, this.selectedTrItem.id)
                  .then((res) => {
                    this.$toast(this.$t('messages.accepted_message'), {type: 'success'});
                    this.ismodalDXAInfo = false
                    this.fetchTableItems()
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    toggleLoading(boolean) {
      this.loadingById = boolean;
    },
    // LETTER MODULEDAGI SEND_AND_SAVE ISHLATILYAPTI
    sendAndSave() {
      if (this.$refs.sendRef) {
        if (
            this.$refs.sendRef.selectedReview.length > 0 ||
            this.$refs.sendRef.selectedSignature.length > 0 ||
            this.$refs.sendRef.selectedSignature.employeeId
        ) {
          this.loaderButton = true;
          let payload = {
            agreement: this.$refs.sendRef.selectedAgreement.map(
                (e) => e.employeeId
            ),
            review: this.$refs.sendRef.selectedReview.map((e) => e.employeeId),
            signature: this.$refs.sendRef.selectedSignature.employeeId
                ? [this.$refs.sendRef.selectedSignature.employeeId]
                : [],
          };
          let letterId = '';
          if (this.selectedTrItem.applicationTypeInProject === 'NOT_BELONG') {
            letterId = this.currentItem.applicationStatus === 'SEEN' ? this.currentItem.letterFiles.find(el => el.letterType === 'LETTER').id : ''
          } else {
            letterId = this.currentItem.applicationStatus === 'COMMISSION_SEEN' ? this.currentItem.commissionFiles
                .find(el => el.letterType === 'PROTOCOL').id : this.currentItem.letterFiles
                .find(el => el.letterType === 'NOTICE').id //todo offer notice ni notice qilganmiz tekshirish kerak
          }
          letterService.sendDoc(letterId, payload)
              .then((rs) => {
                if (rs.data) {
                  this.$router.push("/letter/sent");
                  this.sendModal = false;
                  this.getList();
                  this.selectedTrItem = {};
                  this.successSaved();
                  this.$router.push("/letter/sent");
                }
              })
              .catch((e) => {
              })
              .finally((e) => {
                this.loaderButton = false;
              });
        } else {
          showMsgError(this.$t("error_send"));
        }
      }
    },
    /* sendAndSave() {
      if (this.$refs.sendRef) {
        if (
            this.$refs.sendRef.selectedReview.length > 0) {
          this.loaderButton = true;
          let payload = {
            id: this.currentItem.id,
            assistantIds: this.$refs.sendRef.selectedReview.map((e) => e.id)
          }

          crudAndListsService.create(MAIN_API_URL_add_assistant, payload)
              .then(res => {
                // this.computedObserver.reset()
                // this.$refs.formDepartmentTypes.editingItem = Object.assign( {}, {} );
                this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
              }).catch((e) => this.catchErr(e))
              .finally((e) => {
                this.sendModal = false;
                this.loaderButton = false;
              });
        } else {
          showMsgError(this.$t("error_send"));
        }
      }
    }, */
    viewIlova(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    getVisaInfo() {
      if (this.selectedTrItem.applicationStatus !== "CREATED" && this.selectedTrItem.applicationStatus !== "SEND_FOR_TAKE_VISA") {
        letterService.getVisaInfo(this.selectedTrItem.id)
            .then(({data}) => {
              this.visaInfo = data
            })
            .catch((err) => {
              // this.catchErr(err);
            })
            .finally(() => {
            });
      }
    },
    clickTrItem(item) {
      this.loadingById = true;
      if (this.selectedTrItem && this.selectedTrItem.id === item.id) {
        this.selectedTrItem = {};
      } else {
        if (this.selectedApplicationItem) {
          this.$set(this.selectedApplicationItem, 'id', item.id)
          this.selectedApplicationItem = Object.assign({}, item)
        }
        this.selectedTrItem = item;
        if (item.type === "FROM_DXA") {
          this.getVisaInfo();
        }
        if (this.currentTabIndex === 0) {
          this.getById(item);
        }
        if (['FINISH_LETTER_CREATED'].indexOf(item.status) !== -1) {
          this.letterGetFinishLetter(item);
        }
        if (['FINISH', 'FINISH_LETTER_SENT'].indexOf(item.status) !== -1) {
          this.letterGetFinishLetterWithSigner(item);
        }
      }
    },
    letterGetFinishLetter(item) {
      letterService.letterGetFinishLetter(item.id)
          .then(res => {
            this.signatureModal.doc = res.data;
            this.finishLetter = res.data;
          })
          .catch(e => {
            console.log(e)
          })
    },
    letterGetFinishLetterWithSigner(item) {
      letterService.letterGetFinishLetterWithSigner(item.id)
          .then(res => {
            this.signatureModal.doc = res.data.letter;
            this.finishLetter = res.data.letter;
            this.finishLetter._signer = res.data.signer;
          })
          .catch(e => {
            console.log(e)
          })
    },
    makeLetterSendFinishLetterToChairman() {
      if (!this.finishLetterToChairmaModal.comment) {
        return showMsgError(this.$t("messages.fill_info_fully"))
      }
      letterService.makeLetterSendFinishLetterToChairman(this.selectedApplicationItem.id, this.finishLetter.id, this.finishLetterToChairmaModal.comment)
          .then(async () => {
            this.fetchTableItems()
            showMsgSuccess(this.$t("forSignature"));
          })
          .catch((err) => {
          })
          .finally(() => {
            this.finishLetterToChairmaModal.modal = false;
            this.signatureModal.loader = false;
          });
    },
    getById(item) {
      if (item.type === 'FROM_DXA') {
        // helperService.getApplicationFromDxaById(item.id, false)
        // .then(res => {
        //     this.selectedApplicationItem = res.data.ApplicationDto
        //     // this.selectedApplicationItemFiles = res.data.fileList
        this.loadingById = false;
        // })
        // .catch(e => {
        //     console.log(e)
        // })
      } else {
        crudAndListsService.getById(MAIN_API_URL, item.id, false)
            .then(res => {
              this.selectedApplicationItem = res.data.ApplicationDto
              // this.selectedApplicationItemFiles = res.data.fileList
              this.loadingById = false;
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    toggleTypeModalCreateWorkWithDocument(booleanValue = false) {
      this.typeModal = booleanValue
    },
    createWorkWithDocument() {
      if (this.selectedType === 'legal') {
        this.$router.push({name: 'CreateApplicationByLegal'})
      } else if (this.selectedType === 'physical') {
        this.$router.push({name: 'CreateApplicationByPhysical'})
      } else if (this.selectedType === 'director') {
        this.$router.push({name: 'CreateApplicationByDirector'})
      }
    },
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.nameUz = res.nameUz
        obj.nameLt = res.nameLt
        obj.nameRu = res.nameRu
        this.json_data.push(obj)
      })
    },
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.loading = true;
      this.var_default_search_payload.keyword = this.searchKeyword
      if (this.$can('view', 'application-inner') && this.activeTab === 'inner') {
        crudAndListsService
            .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
            .then((res) => {
              this.tableItems = res.data.list;
              this.totalItems = res.data.total;
            })
            .catch(e => {
              this.tableItems = [];
              this.totalItems = 0;
            })
            .finally(() => {
              this.loadingTableItems = false
              this.loading = false

            })
      } else if (this.$can('view', 'application-dxa')) {
        crudAndListsService
            .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload, MAIN_API_URL_DXA)
            .then((res) => {
              this.tableItems = res.data.list;
              this.totalItems = res.data.total;
            })
            .catch(e => {
              this.tableItems = [];
              this.totalItems = 0;
            })
            .finally(() => {
              this.loadingTableItems = false
              this.loading = false

            })
      }

    },
    editItem(id) {
      this.$router.push({name: 'UpdatecommissionMembers', params: {id: id}})
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(MAIN_API_URL, id)
                  .then((res) => {
                    this.fetchTableItems()
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    sendItem() {
      this.currentItem = this.selectedApplicationItem;
      if (this.currentItem.projectId) {
        this.currentAppAggrementMembers = []
        //// -------- Project a'zolariga kelishish uchun xat bormaydigan qilindi
        if (this.currentItem.status !== 'SEEN' && this.currentItem.applicationStatus !== 'SEEN' && this.currentItem.applicationTypeInProject !== 'INNER') {
          ProjectService.listMembers(this.currentItem.applicationStatus === 'COMMISSION_SEEN' ? this.currentItem.commissionProjectId : this.currentItem.projectId, {
            page: 0,
            itemsPerPage: 1000
          }, this.currentItem.applicationStatus === 'COMMISSION_SEEN' ? 'COMMISSION' : 'BEFORE_COMMISSION')
              .then(res => {
                this.currentAppAggrementMembers = res.data.list;
              });
        }
      }
      this.sendModal = true;
    },

    //Tegishli emasligini bildiruvchi xatni DXAga jo'natish
    sendToDXANotBelong(letter, item) {
      this.currentItem = item;
      if (this.currentItem.status === 'NOT_BELONG_LETTER_SIGNED' && this.currentItem.applicationStatus === 'NOT_BELONG_LETTER_SIGNED'
          && this.currentItem.applicationTypeInProject === 'NOT_BELONG' && this.currentItem.type === 'FROM_DXA' && letter.letterType === 'LETTER') {
        this.$bvModal.msgBoxConfirm(this.$t('messages.send_title'), {
          okTitle: this.$t('actions.confirm'),
          cancelTitle: this.$t('actions.cancel')
        })
            .then(value => {
              if (value) {
                this.currentItem.status = 'FOR_NOT_BELONG_DXA'
                letterService
                    .onlyDocSignNotBelong(null, letter.id)
                    .then((res) => {
                      this.fetchTableItems()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              }
            })
            .catch(err => {
              // An error occurred
            })
      }
    },

    //Ruxsat etilgan qarorni DXAga jo'natish
    showModalAcceptedDecisionToDXA(letter, item) {
      this.currentItem = item;
      if (this.currentItem.status === 'COMMISSION_SIGNED' &&
          this.currentItem.applicationStatus === 'COMMISSION_SIGNED' &&
          this.currentItem.applicationTypeInProject === 'FROM_DXA' &&
          this.currentItem.type === 'FROM_DXA'
          && letter.letterType === 'DECISION'
          && !letter.isRejected) {
        this.acceptedDecisionToDXAModal.form.letter = letter;
        this.acceptedDecisionToDXAModal.show = true;
      }
    },
    sendAcceptedDecisionToDXA() {
      this.acceptedDecisionToDXAModal.btnLoader = true;
      if (!this.acceptedDecisionToDXAModal.form.paymentAmount || this.acceptedDecisionToDXAModal.form.paymentAmount <= 0) {
        this.$toast(this.$t('submodules.commission.invalid_payment_amount'), {type: 'error'});
        this.acceptedDecisionToDXAModal.btnLoader = false;
        return false;
      }
      if (!this.acceptedDecisionToDXAModal.form.file || this.acceptedDecisionToDXAModal.form.file.length <= 0) {
        this.$toast(this.$t('messages.file_not_chosen'), {type: 'error'});
        this.acceptedDecisionToDXAModal.btnLoader = false;
        return false;
      }
      this.currentItem.status = 'FOR_ACCEPTED_DXA'
      letterService
          .resultApplicationForDXA(null, this.acceptedDecisionToDXAModal.form.letter.id, this.currentItem.applicationDxaId, this.acceptedDecisionToDXAModal.form.paymentAmount)
          .then((res) => {
            this.fetchTableItems()
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.acceptedDecisionToDXAModal.show = false;
            this.acceptedDecisionToDXAModal.form.letter = null;
            this.acceptedDecisionToDXAModal.form.paymentAmount = null;
            this.acceptedDecisionToDXAModal.btnLoader = false;
          })
    },

    //Rad etilgan qarorni DXAga jo'natish
    sendRejectedDecisionToDXA(letter, item) {
      this.currentItem = item;
      if (this.currentItem.status === 'COMMISSION_SIGNED' && this.currentItem.applicationStatus === 'COMMISSION_SIGNED'
          && this.currentItem.applicationTypeInProject === 'FROM_DXA' && this.currentItem.type === 'FROM_DXA' && letter.letterType === 'DECISION' && letter.isRejected) {
        this.$bvModal.msgBoxConfirm(this.$t('messages.send_title'), {
          okTitle: this.$t('actions.confirm'),
          cancelTitle: this.$t('actions.cancel')
        })
            .then(value => {
              if (value) {
                this.currentItem.status = 'FOR_REJECTED_DXA'
                letterService
                    .resultApplicationForDXARejected(null, letter.id)
                    .then((res) => {
                      this.fetchTableItems()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              }
            })
            .catch(err => {
              // An error occurred
            })
      }
    },

    letterSign(application) {
      if (!application) {
        return;
      }
      this.$router.push(`/letter/send-for-sign/${application.id}`)
    },
    sendFinishLetterToChairman() {
      this.finishLetterToChairmaModal.modal = true;
    },
    uploadFinishLetter() {
      this.cnf().then((res) => {
        if (res.value) {
          letterService.uploadFinishLetter(this.selectedTrItem.id, 'LETTER_FINISH', 'Yakunlanganlik-xati')
              .then((rs) => {
                if (rs.data) {
                  this.fetchTableItems();
                  this.selectedTrItem = {}
                  successSavedDoc();
                  let routeData = this.$router.resolve({
                    name: "Office-DOCUMENT-commission",
                    query: {id: rs.data.id, page: "GET"},
                  });
                  window.open(routeData.href, "_blank");
                }
              })
              .catch((e) => {
                console.log(e);
              })
              .finally(() => {
                setTimeout(() => {
                  this.loaderDoc = false;
                }, 500);
              });
        }
      });
    }
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
    if (this.$route.query?.type === 'dxa') {
      setTimeout(() => {
        this.applicationTypeTabIndex = 1;
        this.activeTableDXAApplication()
      }, 500)
    }
  },
  /*
  WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.p_cursor {
  cursor: pointer !important;
}

.bg-color {
  background: #d5daf8 !important;
}

.card-tabs {
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;
  border-radius: 1rem 1rem 1rem 1rem;
}

.card-tabs-button {
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;
  font-size: 15px;
}

.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #c8d0e7;
  border-color: #ced4da #ced4da #fff;
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;

  border-radius: 2rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.fromcenter {
  height: auto;
  font-size: 22px;
  text-align: center;
  color: #000;
  opacity: 0.8;
}

.fromcenter:after {
  display: block;
  content: "";
  border-bottom: solid 3px #eea529;
  transform: scaleX(0);
  transition: transform 300ms ease-in-out;
}

.fromcenter:hover:after {
  transform: scaleX(1);
}
</style>
