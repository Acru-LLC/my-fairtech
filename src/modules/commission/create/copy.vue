<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-8">
                <div class="search-box me-4 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input
                        v-model="searchKeyword"
                        type="text"
                        class="form-control"
                        @input="fetchTableItems"
                        :placeholder="$t('column.search')"
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
                        @change="selectList"
                        class="form-select"
                    ></b-form-select>
                  </div>
                </div>
                <span>{{ $t('column.select.text2') }}</span>
              </div>
              <div class="col-sm-4">
                <div class="text-sm-end">
                  <b-row>
                    <b-col cols="7">
                      <div class="text-sm-end">
                        <download-excel
                            :data="json_data"
                            :fields="json_fields"
                            header="Бўлинма тури"
                            worksheet="My Worksheet"
                            name="Бўлинма_тури.xls"
                        >
                          <b-btn
                              @click="downloadExcel"
                              type="button"
                              class="btn btn-rounded bg-primary mb-2"
                          >
                            <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                          </b-btn>
                        </download-excel>
                      </div>
                    </b-col>
                    <b-col cols="5">
                      <b-btn
                          type="button"
                          class="btn btn-success btn-rounded mb-2 me-2"
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
              <!-- end col-->
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>

      <!-- add choose Type -->
      <b-modal
          v-model="typeModal"
          id="create-update-modal-id"
          size="xl"
          title-class="font-18"
          ok-only
          ok-variant="success"
          :ok-title="$t('actions.continue')"
          @ok="createWorkWithDocument"
          no-stacking
      >
        <template #modal-header="{ close }">
          <b-button
              class="text-center w-100 mb-0 card-tabs"
              block
              style="cursor:default; margin-right: 30%; margin-left: 30%;font-size: 1.4rem; background:#526BDF"
              variant="primary"
          >
            <i
                style="font-size: 1.5rem;"
                class="bx bx mdi mdi-file-document-multiple"
            ></i> {{ $t('submodules.doc.create_application') }}
          </b-button>
        </template>
        <b-row class="pl-4 pr-4">
          <b-col
              xs="12"
              cols="4"
              class="p-3"
          >
            <b-card
                no-body
                id="legalDepartmentCard"
                @click="selectedType = 'legal'"
                :bg-variant="selectedType == 'legal' ? 'primary' : 'light'"
                :text-variant="selectedType == 'legal' ? 'white' : ''"
                :header="$t('submodules.doc.sendDoc_from_legal')"
                class="text-center w-100 mb-0 card-tabs"
                style="cursor: pointer; font-size: 1.4rem;"
            >
            </b-card>
          </b-col>
          <b-col
              xs="12"
              cols="4"
              class="p-3"
          >
            <b-card
                no-body
                id="simpleDepartmentCard"
                @click="selectedType = 'physical'"
                :bg-variant="selectedType == 'physical' ? 'primary' : 'light'"
                :text-variant="selectedType == 'physical' ? 'white' : ''"
                :header="$t('submodules.doc.sendDoc_from_physical')"
                class="text-center w-100 mb-0 card-tabs"
                style="cursor: pointer; font-size: 1.4rem;"
            >
            </b-card>
          </b-col>
          <b-col
              xs="12"
              cols="4"
              class="p-3"
          >
            <b-card
                no-body
                id="directorCard"
                @click="selectedType = 'director'"
                :bg-variant="selectedType == 'director' ? 'primary' : 'light'"
                :text-variant="selectedType == 'director' ? 'white' : ''"
                :header="$t('submodules.commission.by_director.title')"
                class="text-center w-100 mb-0 card-tabs"
                style="cursor: pointer; font-size:1.4rem;"
            >

            </b-card>
          </b-col>
        </b-row>
      </b-modal>
    </div>

    <div class="row">

      <div class="col-7">
        <div class="card card-body card-tabs" style="min-height: 35em" >
          <div>
            <b-tabs active-nav-item-class="font-weight-bold  text-primary"
                    class="text-uppercase" >
              <b-tab :title="$t('submodules.dxa.tabs_inner')" active @click="activeTableInnerApplication"></b-tab>
              <b-tab :title="$t('submodules.dxa.tabs_dxa')" @click="activeTableDXAApplication"></b-tab>
            </b-tabs>
          </div>
          <div class="table-responsive">
            <b-overlay
                :opacity="0.1"
                :show="loading"
                rounded="sm"
            >
              <table class="
                        table
                        table-centered
                        table-striped
                        table-nowrap
                        table-hover
                        bordered
                      ">
                <thead class="thead-light">
                <tr>
                  <th
                      scope="col"
                      class="text-center"
                      style="width: 10%"
                  > №
                  </th>
                  <th
                      style="width: 20%"
                      scope="col"
                      class="text-center"
                  >
                    <span class="ml-5"> {{ $t("column.status") }}</span>
                  </th>
                  <th
                      style="width: 25%"
                      class="text-left"
                      scope="col"
                  >
                    {{ $t("submodules.doc.senderFIO") }}
                  </th>
                  <th
                      style="width: 25%"
                      class="text-left"
                      scope="col"
                  >
                    {{ $t("submodules.doc.sender") }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    class="text-center"
                    v-if="tableItems.length == 0"
                >
                  <td
                      colspan="9"
                      :style="loading ? 'height:50px' : ''"
                      style="vertical-align: middle"
                  >
                    <h5>
                      {{ $t("messages.data_not_found") }}
                    </h5>
                  </td>
                </tr>
                <tr
                    @click.prevent="clickTrItem(item)"
                    v-for="(item, index) in tableItems"
                    :key="index + 'CREATE_DOC'"
                    class="p_cursor"
                    :class="
                            selectedTrItem.id == item.id
                              ? 'bg-color bg-soft-primary text-primary'
                              : ''
                          "
                >

                  <td class="text-center">
                    {{
                      util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                    }}
                  </td>
                  <td class="text-right">
                    <b-badge
                        variant="secondary"
                        class="p-1"
                        v-if="item.applicationStatus=='CREATED'"
                    >
                      {{ $t('submodules.commission.doc_status.doc_created') }}
                    </b-badge>
                    <b-badge
                        variant="primary"
                        class="p-1"
                        v-else-if="item.applicationStatus=='BEING_SEEN'"
                    >
                      {{ $t('submodules.commission.doc_status.doc_seen') }}
                    </b-badge>
                    <b-badge
                        variant="info"
                        class="p-1"
                        v-else-if="item.applicationStatus=='SEEN'"
                    >
                      {{ $t('submodules.commission.doc_status.seen') }}
                    </b-badge>
                    <b-badge
                        variant="success"
                        class="p-1"
                        v-else-if="item.applicationStatus=='SENT'"
                    >
                      {{ $t('submodules.reports.report_sended') }}
                    </b-badge>
                  </td>
                  <td class="text-left">
                    <p
                        class="mb-0 d-flex align-items-center"
                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                    >
                      <span v-if="item.type == 'LEGAL'"> {{ item.senderFullName }} </span>
                      <span v-else-if="item.type == 'FROM_DXA'"> {{ item.senderFullName }} </span>
                      <span v-else-if="item.type== 'PHYSICAL'"> {{ item.applicantSecondName }} {{
                          item.applicantFirstName
                        }} {{ item.applicantMiddleName }} </span>
                      <span v-else-if="item.type == 'BY_DIRECTOR'"> {{ item.senderFullName }} </span>
                    </p>
                  </td>
                  <td class="text-left">
                    <b-badge
                        v-if="item.type == 'LEGAL'"
                        variant="primary"
                        class="p-1"
                    >
                      {{ $t("submodules.doc.sendDoc_from_legal") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type == 'PHYSICAL'"
                        variant="success"
                        class="p-1"
                    >
                      {{ $t("submodules.doc.sendDoc_from_physical") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type == 'BY_DIRECTOR'"
                        variant="secondary"
                        class="p-1"
                    >
                      {{ $t("submodules.commission.by_director.title") }}
                    </b-badge>
                    <b-badge
                        v-else-if="item.type == 'FROM_DXA'"
                        variant="info"
                        class="p-1"
                    >
                      DXA
                    </b-badge>
                  </td>
                </tr>
                </tbody>
              </table>
            </b-overlay>
          </div>
          <div
              class="row"
              v-if="totalItems > 0"
          >
            <div class="col-lg-12">
              <b-pagination
                  v-model="var_default_search_payload.page"
                  :total-rows="totalItems"
                  :per-page="var_default_search_payload.itemsPerPage"
                  aria-controls="my-table"
                  class="justify-content-end"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>

      <div class="col-5">

        <div class="card card-body card-tabs" style="min-height: 35em" >
          <b-tabs
              content-class="mt-3"
              :no-fade="true"
              v-model="currentTabIndex"
              fill
          >
            <b-tab :title="$t('submodules.doc.tab_doc')">
              <b-overlay
                  :opacity="0.1"
                  :show="loadingById"
                  rounded="sm"
              >
                <table
                    v-if="selectedTrItem"
                    v-show="selectedTrItem.type == 'FROM_DXA'"
                    class="table m-0 "
                >
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('column.address') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderAddress }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfIncomingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <td
                        colspan="2"
                        class="text-muted text-center p-0"
                    >
                      <div class="mt-4">

                        <b-button
                            v-show="selectedTrItem.type == 'FROM_DXA'"
                            variant="warning"
                            class="card-tabs-button"
                            @click="DXAInfoBtn"
                        >
                          <i class="fa fa-eye"></i>
                          DXA ma'lumotlarni ko'rish
                        </b-button>

                        <b-button
                            v-if="selectedTrItem.letterDto"
                            variant="warning"
                            class="card-tabs-button"
                            :to="`/docs/office?page=GET&id=${enc(
                              selectedTrItem.letterDto.id
                            )}`"
                            target="_blank"
                        >
                          <i class="fa fa-pencil-alt"></i>
                          {{ $t('actions.edit') }}
                        </b-button>
                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'SEEN'"
                            @click="sendItem"
                            class="ml-2  card-tabs-button"
                            variant="success"
                        >
                          <i class="fa fa-share"></i>

                          {{ $t('submodules.doc.send_doc') }}
                        </b-button>

                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'CREATED'"
                            @click="createProject(selectedTrItem.id)"
                            class="ml-2  card-tabs-button"
                            variant="primary"
                        >
                          <i class="fa fa-folder"></i>

                          {{ $t('submodules.doc.start_investigating') }}
                        </b-button>

                        <!-- <b-button
    @click="deleteItem(selectedApplicationItem.id)"
    class="ml-2 card-tabs-button"
    variant="danger"
>
    <i class="bx bx-trash"></i>
    {{ $t( 'actions.delete' ) }}
</b-button> -->
                        <!--                    <b-button-->
                        <!--                        disabled="true"-->
                        <!--                        class="ml-2 card-tabs-button"-->
                        <!--                        variant="success"-->
                        <!--                    >-->
                        <!--                      <i class="fas fa-user-plus"></i>-->
                        <!--                      {{ $t( 'submodules.doc.executors' ) }}-->
                        <!--                    </b-button>-->
                      </div>
                      <!--                  <div>-->
                      <!--                    <b-form-file-->
                      <!--                        ref="fileRef"-->
                      <!--                        style="display: none"-->
                      <!--                    ></b-form-file>-->
                      <!--                    <b-button-->
                      <!--                        variant="primary"-->
                      <!--                        class="mt-2 mb-2"-->
                      <!--                    >-->
                      <!--                      <i class="bx bx-upload"></i>-->
                      <!--                      {{ $t( 'submodules.doc.application_file' ) }}-->
                      <!--                    </b-button>-->

                      <!--                  </div>-->
                    </td>
                  </tr>
                </table>

                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type == 'LEGAL'"
                    class="table m-0 "
                >
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('column.address') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderAddress }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                            </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfIncomingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <td
                        colspan="2"
                        class="text-muted text-center p-0"
                    >
                      <div class="mt-4">
                        <b-button
                            v-if="selectedTrItem.letterDto"
                            variant="warning"
                            class="card-tabs-button"
                            :to="`/docs/office?page=GET&id=${enc(
                              selectedTrItem.letterDto.id
                            )}`"
                            target="_blank"
                        >
                          <i class="fa fa-pencil-alt"></i>
                          {{ $t('actions.edit') }}
                        </b-button>
                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'SEEN'"
                            @click="sendItem"
                            class="ml-2  card-tabs-button"
                            variant="success"
                        >
                          <i class="fa fa-share"></i>

                          {{ $t('submodules.doc.send_doc') }}
                        </b-button>

                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'CREATED'"
                            @click="createProject(selectedTrItem.id)"
                            class="ml-2  card-tabs-button"
                            variant="primary"
                        >
                          <i class="fa fa-folder"></i>

                          {{ $t('submodules.doc.start_investigating') }}
                        </b-button>

                        <!-- <b-button
    @click="deleteItem(selectedApplicationItem.id)"
    class="ml-2 card-tabs-button"
    variant="danger"
>
    <i class="bx bx-trash"></i>
    {{ $t( 'actions.delete' ) }}
</b-button> -->
                        <!--                    <b-button-->
                        <!--                        disabled="true"-->
                        <!--                        class="ml-2 card-tabs-button"-->
                        <!--                        variant="success"-->
                        <!--                    >-->
                        <!--                      <i class="fas fa-user-plus"></i>-->
                        <!--                      {{ $t( 'submodules.doc.executors' ) }}-->
                        <!--                    </b-button>-->
                      </div>
                      <!--                  <div>-->
                      <!--                    <b-form-file-->
                      <!--                        ref="fileRef"-->
                      <!--                        style="display: none"-->
                      <!--                    ></b-form-file>-->
                      <!--                    <b-button-->
                      <!--                        variant="primary"-->
                      <!--                        class="mt-2 mb-2"-->
                      <!--                    >-->
                      <!--                      <i class="bx bx-upload"></i>-->
                      <!--                      {{ $t( 'submodules.doc.application_file' ) }}-->
                      <!--                    </b-button>-->

                      <!--                  </div>-->
                    </td>
                  </tr>
                </table>
                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type == 'PHYSICAL'"
                    class="table m-0 "
                >
                  <tr class="cool-link">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.fio') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 12px"
                          class="text-left"
                      >{{ selectedApplicationItem.address }}</span>
                    </td>
                  </tr>
                  <tr class="cool-link">
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.confirmation_document.title') }}
                      </b> <br>

                      <span
                          style="font-size: 11px"
                          class="text-left text-muted"
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
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
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
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <td
                        colspan="2"
                        class="text-muted text-center p-0"
                    >
                      <div class="mt-4">
                        <b-button
                            v-if="selectedTrItem.letterDto"
                            variant="warning"
                            class="card-tabs-button"
                            :to="`/docs/office?page=GET&id=${enc(
                              selectedTrItem.letterDto.id
                            )}`"
                            target="_blank"
                        >
                          <i class="fa fa-pencil-alt"></i>
                          {{ $t('actions.edit') }}
                        </b-button>
                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'SEEN'"
                            @click="sendItem"
                            class="ml-2  card-tabs-button"
                            variant="success"
                        >
                          <i class="fa fa-share"></i>

                          {{ $t('submodules.doc.send_doc') }}
                        </b-button>

                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'CREATED'"
                            @click="createProject(selectedTrItem.id)"
                            class="ml-2  card-tabs-button"
                            variant="primary"
                        >
                          <i class="fa fa-folder"></i>

                          {{ $t('submodules.doc.start_investigating') }}
                        </b-button>

                        <!-- <b-button
    @click="deleteItem(selectedApplicationItem.id)"
    class="ml-2 card-tabs-button"
    variant="danger"
>
    <i class="bx bx-trash"></i>
    {{ $t( 'actions.delete' ) }}
</b-button> -->
                        <!--                    <b-button-->
                        <!--                        disabled="true"-->
                        <!--                        class="ml-2 card-tabs-button"-->
                        <!--                        variant="success"-->
                        <!--                    >-->
                        <!--                      <i class="fas fa-user-plus"></i>-->
                        <!--                      {{ $t( 'submodules.doc.executors' ) }}-->
                        <!--                    </b-button>-->
                      </div>
                      <!--                  <div>-->
                      <!--                    <b-form-file-->
                      <!--                        ref="fileRef"-->
                      <!--                        style="display: none"-->
                      <!--                    ></b-form-file>-->
                      <!--                    <b-button-->
                      <!--                        variant="primary"-->
                      <!--                        class="mt-2 mb-2"-->
                      <!--                    >-->
                      <!--                      <i class="bx bx-upload"></i>-->
                      <!--                      {{ $t( 'submodules.doc.application_file' ) }}-->
                      <!--                    </b-button>-->

                      <!--                  </div>-->
                    </td>
                  </tr>
                </table>
                <table
                    v-if="selectedApplicationItem"
                    v-show="selectedApplicationItem.type == 'BY_DIRECTOR'"
                    class="table m-0 "
                >
                  <tr
                      class="cool-link"
                      v-show="!selectedApplicationItem.isLegal"
                  >
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.fio') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 12px"
                          class="text-left"
                      >{{ selectedApplicationItem.address }}</span>
                    </td>
                  </tr>
                  <tr
                      class="cool-link"
                      v-show="!selectedApplicationItem.isLegal"
                  >
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.confirmation_document.title') }}
                      </b> <br>

                      <span
                          style="font-size: 11px"
                          class="text-left text-muted"
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
                          style="font-size: 12px"
                          class="text-left"
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
                      class="cool-link"
                      v-show="!selectedApplicationItem.isLegal"
                  >
                    <td class="text-left">
                      <b>
                        {{ $t('submodules.commission.appeal_type.title') }}
                      </b> <br>

                      <span
                          style="font-size: 11px"
                          class="text-left text-muted"
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
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderFullName }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('column.address') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.senderAddress }}
                                            </span>
                    </td>
                  </tr>
                  <tr v-show="selectedApplicationItem.isLegal">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfOutgoingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.dateOfOutgoingDocument }}
                                            </span>
                    </td>
                  </tr>
                  <tr v-show="selectedApplicationItem.isLegal">
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_number_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{ selectedApplicationItem.numberOfIncomingDocument }}
                                            </span>
                    </td>

                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfOutgoingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.numberOfIncomingDocument
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.create_entered_date_physical') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.summary
                        }}
                                            </span>
                    </td>
                    <td class="text-right">
                      <b> {{ $t('submodules.doc.to_whom') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
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
                          style="font-size: 11px"
                          class="text-left text-muted"
                      >
                                                {{
                          selectedApplicationItem.nameOfOrganizationWasSent
                        }}
                                            </span>
                    </td>

                    <td class="text-right ">
                      <b> {{ $t('submodules.doc.completionTime') }} </b> <br>
                      <span
                          style="font-size: 12px"
                          class="text-left"
                      >
                                                {{
                          selectedApplicationItem.completionTime
                        }}
                                            </span>
                      <br>
                    </td>
                  </tr>

                  <tr>
                    <td
                        colspan="2"
                        class="text-muted text-center p-0"
                    >
                      <div class="mt-4">
                        <b-button
                            v-if="selectedTrItem.letterDto"
                            variant="warning"
                            class="card-tabs-button"
                            :to="`/docs/office?page=GET&id=${enc(
                              selectedTrItem.letterDto.id
                            )}`"
                            target="_blank"
                        >
                          <i class="fa fa-pencil-alt"></i>
                          {{ $t('actions.edit') }}
                        </b-button>
                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'SEEN'"
                            @click="sendItem"
                            class="ml-2  card-tabs-button"
                            variant="success"
                        >
                          <i class="fa fa-share"></i>

                          {{ $t('submodules.doc.send_doc') }}
                        </b-button>

                        <b-button
                            v-if="selectedTrItem.applicationStatus == 'CREATED'"
                            @click="createProject(selectedTrItem.id)"
                            class="ml-2  card-tabs-button"
                            variant="primary"
                        >
                          <i class="fa fa-folder"></i>

                          {{ $t('submodules.doc.start_investigating') }}
                        </b-button>

                        <!-- <b-button
    @click="deleteItem(selectedApplicationItem.id)"
    class="ml-2 card-tabs-button"
    variant="danger"
>
    <i class="bx bx-trash"></i>
    {{ $t( 'actions.delete' ) }}
</b-button> -->
                        <!--                    <b-button-->
                        <!--                        disabled="true"-->
                        <!--                        class="ml-2 card-tabs-button"-->
                        <!--                        variant="success"-->
                        <!--                    >-->
                        <!--                      <i class="fas fa-user-plus"></i>-->
                        <!--                      {{ $t( 'submodules.doc.executors' ) }}-->
                        <!--                    </b-button>-->
                      </div>
                      <!--                  <div>-->
                      <!--                    <b-form-file-->
                      <!--                        ref="fileRef"-->
                      <!--                        style="display: none"-->
                      <!--                    ></b-form-file>-->
                      <!--                    <b-button-->
                      <!--                        variant="primary"-->
                      <!--                        class="mt-2 mb-2"-->
                      <!--                    >-->
                      <!--                      <i class="bx bx-upload"></i>-->
                      <!--                      {{ $t( 'submodules.doc.application_file' ) }}-->
                      <!--                    </b-button>-->

                      <!--                  </div>-->
                    </td>
                  </tr>
                </table>

                <div
                    class="card card-body card-tabs mt-3"
                    style="min-height: 10em; width: 100%"
                    v-if="selectedApplicationItem.allFiles"
                >

                  <div class="wrapper">
                    <span CLASS="fromcenter">{{ $t('submodules.doc.application_file') }}</span>
                  </div>

                  <tr
                      class="mt-3"
                      v-for="(item, index) in selectedApplicationItem.allFiles"
                      :key="index + 'FILE'"
                  >
                    <div class="
                                                        d-flex
                                                        align-items-center
                                                        bg-light
                                                        p-2
                                                        justify-content-between
                                                      ">
                      <div class="d-flex align-items-center">
                        <a
                            @click="viewIlova(item.url)"
                            :download="
                                                            getExt(item.url) == 'PDF' ||
                                                            getExt(item.url) == 'pdf'
                                                              ? false
                                                              : true
                                                          "
                            :href="
                                                            getExt(item.url) == 'PDF' ||
                                                            getExt(item.url) == 'pdf'
                                                              ? `#`
                                                              : `${baseUrl}/${item.url}`
                                                          "
                        >
                          <BaseFileViewer
                              class="my-card-hovered"
                              :uploadPath="item.name"
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
                    v-show="selectedTrItem.type !== 'FROM_DXA'"
                    class="text-center card mt-3"
                    v-else
                >
                  <h5
                      style="opacity: 0.3"
                      class="p-3"
                  >
                    {{ $t("submodules.doc.selected_doc") }}
                  </h5>
                </div>

                <!-- PROJECT FILES -->
                <div
                    class="card card-body card-tabs mt-3"
                    style="min-height: 10em; width: 100%"
                    v-if="selectedApplicationItem.letterFiles"
                >

                  <!-- <div class="wrapper">
                      <span CLASS="fromcenter">{{ $t('submodules.doc.application_file') }}</span>
                  </div> -->

                  <tr
                      class="mt-3"
                      v-for="(item, index) in selectedApplicationItem.letterFiles"
                      :key="index + 'FILE'"
                  >
                    <div class="
                                                        d-flex
                                                        align-items-center
                                                        bg-light
                                                        p-2
                                                        justify-content-between
                                                      ">
                      <div class="d-flex align-items-center">
                        <a
                            @click="viewIlova(item.url)"
                            :download="
                                                            getExt(item.url) == 'PDF' ||
                                                            getExt(item.url) == 'pdf'
                                                              ? false
                                                              : true
                                                          "
                            :href="
                                                            getExt(item.url) == 'PDF' ||
                                                            getExt(item.url) == 'pdf'
                                                              ? `#`
                                                              : `${baseUrl}/${item.url}`
                                                          "
                        >
                          <BaseFileViewer
                              class="my-card-hovered"
                              :uploadPath="item.url"
                          />
                        </a>
                        <span class="ml-2">
                                                    {{ item.fileName }}
                                                </span>
                      </div>

                    </div>
                  </tr>
                </div>
                <!--                                <div-->
                <!--                                    v-show="selectedTrItem.type !== 'FROM_DXA'"-->
                <!--                                    class="text-center card mt-3"-->
                <!--                                    v-else-->
                <!--                                >-->
                <!--                                    <h5-->
                <!--                                        style="opacity: 0.3"-->
                <!--                                        class="p-3"-->
                <!--                                    >-->
                <!--                                        {{ $t("submodules.doc.selected_doc") }}-->
                <!--                                    </h5>-->
                <!--                                </div>-->
              </b-overlay>
            </b-tab>
            <b-tab
                :title="$t('submodules.doc.tab_doc_tree')"
                lazy
            >
              <b-overlay
                  :opacity="0.1"
                  :show="loadingById"
                  rounded="sm"
              >
                <div
                    class="text-center card mt-3"
                    v-if="!selectedApplicationItem"
                >
                  <h5
                      style="opacity: 0.3"
                      class="p-3"
                  >
                    {{ $t("submodules.doc.selected_doc") }}
                  </h5>
                </div>
                <document-tree
                    v-else
                    ref="documentTreeRef"
                    :doc-id="selectedApplicationItem.id"
                    @toggleLoading="toggleLoading"
                ></document-tree>
              </b-overlay>
            </b-tab>
            <b-tab
                :title="$t('submodules.doc.tab_doc_history')"
                lazy
            >
              <b-overlay
                  :opacity="0.1"
                  :show="loadingById"
                  rounded="sm"
              >
                <div
                    class="text-center card mt-3"
                    v-if="!selectedApplicationItem"
                >
                  <h5
                      style="opacity: 0.3"
                      class="p-3"
                  >
                    {{ $t("submodules.doc.selected_doc") }}
                  </h5>
                </div>
                <document-history
                    v-else
                    ref="documentHistoryRef"
                    :doc-id="selectedApplicationItem.id"
                    @toggleLoading="toggleLoading"
                ></document-history>
              </b-overlay>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <b-modal
        scrollable
        v-model="viewIlovaModal"
        size="xl"
        :title="$t('actions.view')"
    >
      <div
          style="height: 700px"
          v-if="ilovaUploadPath"
      >
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${ilovaUploadPath}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewIlovaModal = false"
        >{{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>

    <b-modal
        v-model="sendModal"
        scrollable
        :no-close-on-backdrop="true"
        size="xl"
        id="doc-create-modal"
        :title="`${$t('submodules.doc.send_doc')}`"
    >
      <Send ref="sendRef"/>

      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            class="card-tabs-button"
            @click="sendModal = false"
        >
          {{ $t("actions.cancel") }}
        </b-button>
        <b-button
            variant="success"
            class="card-tabs-button"
            @click="sendAndSave"
        >
          <b-overlay
              :opacity="0.1"
              :show="loaderButton"
              rounded="sm"
          >
            {{ $t("submodules.doc.send_doc") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <b-modal
        id="widthM"
        v-model="ismodalDXAInfo"
        size="xl"
        :no-close-on-backdrop="true"
        hide-footer
        body-class="p-0"
    >
      <DXAApplicationAllInfo :applicationId="selectedTrItem.id"/>
    </b-modal>

  </div>
  <!-- end row -->
</template>

<script>
import i18n from "../../../i18n";

const MAIN_API_URL = 'before-commission/application'
const MAIN_API_URL_DXA = 'application-dxa'
const MAIN_API_URL_add_assistant = 'before-commission/application/add-assistant'
import appConfig from "@/app.config";
import Send from "../../letter/create/send";
import DXAApplicationAllInfo from "../DXA info/index";
import DocumentTree from "../document-tree/document-tree";
import DocumentHistory from "../document-history/document-history";

// import helperService from '@/shared/services/helper.service'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import LetterService from '../../letter/letterService'

export default {

  page: {
    title: "TypeOfComplaint",
    meta: [{name: "description", content: appConfig.description}],
  },

  components: {
    DXAApplicationAllInfo,
    Send,
    DocumentHistory,
    DocumentTree,
  },
  data() {
    return {
      activeTab: 'inner',
      ismodalDXAInfo: false,
      currentTabIndex: 0,
      loaderButton: false,
      sendModal: false,
      currentItem: {},
      ilovaUploadPath: null,
      viewIlovaModal: false,
      selectedTrItem: {},
      selectedApplicationItem: {},
      selectedApplicationItemFiles: {},
      loading: false,
      loadingById: false,
      selectedType: 'legal',
      typeModal: false,
      loadingTableItems: false,
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
    };
  },
  /*
  COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
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

    DXAInfoBtn() {
      this.ismodalDXAInfo = true
    },
    createProject(applicationId) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.create_project'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              this.$router.push({name: 'CreateProjectForApplication', params: {applicationId: applicationId}})
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
          LetterService.sendDoc(this.currentItem.letterFiles.find(el => el.letterType == 'OFFER_NOTICE').id, payload)
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
              .catch((e) => {})
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
      if (
          this.getExt(uploadPath) == "PDF" ||
          this.getExt(uploadPath) == "pdf"
      ) {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    clickTrItem(item) {
      this.loadingById = true;
      if (this.selectedTrItem.id == item.id) {
        this.selectedTrItem = {};
      } else {
        if (this.selectedApplicationItem) {
          this.$set(this.selectedApplicationItem, 'id', item.id)
          this.selectedApplicationItem = Object.assign({}, item)
        }
        this.selectedTrItem = item;
        if (this.currentTabIndex == 0) {
          this.getById(item);
        }
        // else if (this.currentTabIndex == 1) {
        //     this.$refs.documentTreeRef.getDocumentTree()
        // } else if (this.currentTabIndex == 2) {
        //     this.$refs.documentHistoryRef.getDocumentHistory()
        // }
      }
    },
    async getById(item) {
      if (item.type == 'FROM_DXA') {
        // await helperService.getApplicationFromDxaById(item.id, false)
        // .then(res => {
        //     this.selectedApplicationItem = res.data.ApplicationDto
        //     // this.selectedApplicationItemFiles = res.data.fileList
        this.loadingById = false;
        // })
        // .catch(e => {
        //     console.log(e)
        // })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, item.id, false)
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
    async createWorkWithDocument() {
      if (this.selectedType == 'legal') {
        this.$router.push({name: 'CreateApplicationByLegal'})
      } else if (this.selectedType == 'physical') {
        this.$router.push({name: 'CreateApplicationByPhysical'})
      } else if (this.selectedType == 'director') {
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
      if ($event == 'all') {
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
      crudAndListsService
          .searchListWithKeyword(this.activeTab == 'inner' ? MAIN_API_URL : MAIN_API_URL_DXA, this.var_default_search_payload)
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
      this.sendModal = true;
    }
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
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

<style scoped lang='scss'>
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
.nav-tabs .nav-link {
  margin-bottom: -1px;
  border: 1px solid red;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
</style>
