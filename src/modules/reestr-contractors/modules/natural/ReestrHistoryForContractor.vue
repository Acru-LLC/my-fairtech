<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row mb-2 align-items-center">
            <div class="col-2">
              <b-btn
                  variant="warning"
                  class="text-capitalize"
                  @click="$router.go(-1)"
              >
                {{ $t('actions.back') }}
              </b-btn>
            </div>
            <div class="col-8">
              <h4
                  class="text-center font-weight-bold m-0"
                  v-if="tableItems.length > 0"
              >{{ tableItems[0].contractorDto.fullName }}</h4>
            </div>
            <div class="col-2">
              <div
                  class="text-sm-end"
                  v-if="tableItems.length"
              >
                <download-excel
                    :data="json_data"
                    :fields="jsonFieldsComputed"
                    :header="`${tableItems[0].contractorDto.fullName}`"
                    worksheet="My Worksheet"
                    :name="`${tableItems[0].contractorDto.fullName}.xls`"
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
            </div>
          </div>
          <!-- Table data -->
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :busy="loadingTableItems"
              @row-clicked="rowClicked"
              id="my-table"
              class="custom-b-table"
              responsive
              bordered
              small
              show-empty
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              <strong>{{ data.index + 1 }}</strong>
            </template>

            <!-- STATUS -->
            <template #cell(status)="data">
              <b-badge
                  :variant="data.item.documentStatusCode === 'PENDING' ? 'warning' : data.item.documentStatusCode === 'READY' ? 'success' : ''">
                {{
                  getName({
                    nameRu: data.item.documentStatusNameRu,
                    nameLt: data.item.documentStatusNameLt,
                    nameUz: data.item.documentStatusNameUz,
                  })
                }}
              </b-badge>
            </template>

            <!-- DOCUMENT_TYPE -->
            <template #cell(documentType)="data">
              <b-badge
                  :variant="data.item.documentType === 'KIRITISH' ? 'success' : data.item.documentType === 'CHIQARISH' ? 'danger' : ''">
                {{
                  data.item.documentType
                }}
              </b-badge>
            </template>

            <!-- LAST_MODIFIED_BY -->
            <template #cell(lastModifiedBy)="data">
              <template v-if="data.item.updatedByUserName">
                {{
                  data.item.updatedByEmployeeFullName ? (data.item.updatedByEmployeeFullName + ' ' + (data.item.updatedByDirectoryPositionNameUz ? ('(' + data.item.updatedByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + data.item.updatedByUserName + ')') : '')) : $t('auth.username') + ' - ' + data.item.updatedByUserName
                }}
                <br><i>{{ data.item.updatedByDate ? data.item.updatedByDate : '' }}</i>
              </template>
            </template>

            <!-- APPROVED_BY -->
            <template #cell(approvedBy)="data">
              <template v-if="data.item.confirmedByUserName">
                {{
                  data.item.confirmedByEmployeeFullName ? (data.item.confirmedByEmployeeFullName + ' ' + (data.item.confirmedByDirectoryPositionNameUz ? ('(' + data.item.confirmedByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + data.item.confirmedByUserName + ')') : '')) : $t('auth.username') + ' - ' + data.item.confirmedByUserName
                }}
                <br><i>{{ data.item.confirmedByDate ? data.item.confirmedByDate : '' }}</i>
              </template>

            </template>

            <template #cell(contractorFullName)="data">
              {{ data.item.contractorDto.fullName }} - {{ data.item.contractorDto.inn }}
            </template>

            <!-- PRODUCTS_OR_SERVICES -->
            <template #cell(productOrServices)="data">
              {{
                getName({
                  nameRu: data.item.directoryProductOrServiceDto.nameRu,
                  nameLt: data.item.directoryProductOrServiceDto.nameLt,
                  nameUz: data.item.directoryProductOrServiceDto.nameUz,
                })
              }}
            </template>

            <!-- OKEDS -->
            <template #cell(oked)="data">
              <div v-if="data.item.infoOkedDto">
                <strong>{{ `${data.item.infoOkedDto.code} - ` }}</strong>
                {{
                  getName({
                    nameRu: data.item.infoOkedDto.nameRu,
                    nameLt: data.item.infoOkedDto.nameLt,
                    nameUz: data.item.infoOkedDto.nameUz,
                  })
                }}
              </div>
            </template>

            <!-- SKP -->
            <template #cell(skp)="data">
              <div v-if="data.item.infoSKPDto">
                <strong>{{ `${data.item.infoSKPDto.code} - ` }}</strong>
                {{
                  getName({
                    nameRu: data.item.infoSKPDto.nameRu,
                    nameLt: data.item.infoSKPDto.nameLt,
                    nameUz: data.item.infoSKPDto.nameUz,
                  })
                }}
              </div>
            </template>

            <!-- TNVED -->
            <template #cell(tnved)="data">
              <div v-if="data.item.infoTNVEDDto">
                <strong>{{ `${data.item.infoTNVEDDto.code} - ` }}</strong>
                {{
                  getName({
                    nameRu: data.item.infoTNVEDDto.nameRu,
                    nameLt: data.item.infoTNVEDDto.nameLt,
                    nameUz: data.item.infoTNVEDDto.nameUz,
                  })
                }}
              </div>
            </template>

            <!-- PRODUCT_OR_SERVICE_TYPE -->
            <template #cell(productOrServiceType)="data">
              <strong v-if="data.item.directoryProductOrServiceTypeDto">{{
                  getName({
                    nameRu: data.item.directoryProductOrServiceTypeDto.nameRu,
                    nameLt: data.item.directoryProductOrServiceTypeDto.nameLt,
                    nameUz: data.item.directoryProductOrServiceTypeDto.nameUz,
                  })
                }}</strong>
            </template>

            <!-- UNIT -->
            <template #cell(unit)="data">
              <strong v-if="data.item.unitId">{{
                  getName({
                    nameRu: data.item.unitNameRu,
                    nameLt: data.item.unitNameLt,
                    nameUz: data.item.unitNameUz,
                  })
                }}</strong>
            </template>

            <!-- FOUNDERS_PERCENTAGE -->
            <template #cell(foundersPercentage)="data">
              <div class="d-flex align-items-center flex-wrap">
                <ul>
                  <li
                      v-for="(el, index) in data.item.contractorDto.foundersDtos"
                      :key="`founder-${el.id}-${index}`"
                  >{{
                      el.founderName
                    }} <strong>({{
                        el.percentage
                      }})</strong>
                  </li>
                </ul>
              </div>
            </template>

            <!-- REGION -->
            <template #cell(region)="data">
              <div class="d-flex align-items-center flex-wrap">
                <ul>
                  <li
                      v-for="(el, index) in data.item.regionDtos"
                      :key="`region-${index}`"
                  ><strong>{{
                      getName({
                        nameRu: el.nameRu,
                        nameLt: el.nameLt,
                        nameUz: el.nameUz,
                      })
                    }}</strong>
                  </li>
                </ul>
              </div>
            </template>

            <!-- DISTRICT -->
            <template #cell(district)="data">
              <div
                  v-if="data.item.districtDtos"
                  class="d-flex align-items-center flex-wrap"
              >
                <ul>
                  <li
                      v-for="(el, index) in data.item.districtDtos"
                      :key="`district-${index}`"
                  ><strong>{{
                      getName({
                        nameRu: el.nameRu,
                        nameLt: el.nameLt,
                        nameUz: el.nameUz,
                      })
                    }}</strong>
                  </li>
                </ul>
              </div>
            </template>
            <!-- INNER TABLE FOR REESTR -->
            <template #row-details="row">
              <b-row>
                <b-col cols="12">
                  <b-tabs
                      v-model="row.item.activeTabIdxOfInnerTabs"
                      @input="setRowsInnerTabsData(row.item, row.index, $event)"
                      card
                  >
                    <b-tab
                        v-for="(t, index) in tableInnerTabs"
                        :key="`tableInnerTab-${index}`"
                        :title="t.title.toUpperCase()"
                    >
                      <b-tabs
                          v-if="t.key === 'contractor'"
                          v-model="row.item.activeTabIdxForContractor"
                          @input="setRowsInnerTabsData(row.item, row.index, $event, true)"
                      >
                        <b-tab
                            v-for="(tc, indexTc) in contractorTabs"
                            :key="`contractorTab-${indexTc}`"
                            :title="tc.title"
                        >
                          <b-tabs
                              card
                              v-if="tc.key === 'founders'"
                              v-model="row.item.activeTabIdxForContractorFounder"
                              @input="setRowsInnerTabsData(row.item, row.index, indexTc, true, true, $event)"
                          >
                            <b-tab
                                v-for="(tcf, indexTcf) in founderTabs"
                                :key="`contractorFoundersTab-${indexTcf}`"
                                :title="tcf.title"
                            >
                              <template #title>
                                {{ tcf.title }}
                                <b-badge
                                    v-if="(tcf.key === 'legal' || tcf.key === 'individual') && row.item.foundersFullData"
                                    :variant="tcf.key === 'legal' ? 'primary' : 'success'"
                                    class="font-weight-bold"
                                    style="font-size: .7rem;"
                                >
                                  {{ tcf.key === 'legal' ? row.item.foundersFullData.founderLegalCount : row.item.foundersFullData.founderIndividualCount
                                  }}
                                </b-badge>
                              </template>
                              <b-table
                                  :items="row.item.contractorTabItems"
                                  :fields="tcf.fields"
                                  :busy="row.item.loadingInnerData"
                                  sticky-header="400px"
                                  bordered
                                  small
                                  hover
                                  show-empty
                                  striped
                              >
                                <!-- TABLE_BUSY SLOT -->
                                <template #table-busy>
                                  <div class="text-center my-2">
                                    <b-spinner
                                        variant="primary"
                                        class="align-middle"
                                    ></b-spinner>

                                  </div>
                                </template>

                                <template #cell(index)="data">
                                  {{
                                    data.index + 1
                                  }}
                                </template>

                                <!-- FULL_NAME -->
                                <template #cell(fullName)="data">
                                  {{ data.item.firstName }} {{ data.item.lastName }}
                                  {{ data.item.middleName ? data.item.middleName : '' }}
                                </template>

                                <!-- FOUNDER_SHARE_SUM -->
                                <template #cell(founderShareSum)="data">
                                  {{ data.item.founderShareSum | toCurrency }}
                                </template>

                                <!-- FOUNDER_TYPE -->
                                <template #cell(founderType)="">
                                  <b-badge
                                      v-if="tcf.key === 'legal' || tcf.key === 'individual'"
                                      :variant="tcf.key === 'legal' ? 'primary' : 'success'"
                                      class="font-weight-bold"
                                      style="font-size: .7rem;"
                                  >{{ tcf.key === 'legal' ? $t('column.legal_entity') : $t('column.individual') }}
                                  </b-badge>
                                </template>

                                <template #empty="">
                                  <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                                </template>

                              </b-table>
                            </b-tab>
                          </b-tabs>
                          <b-table
                              v-else
                              :items="row.item.contractorTabItems"
                              :fields="tc.fields"
                              :busy="row.item.loadingInnerData"
                              sticky-header="400px"
                              bordered
                              small
                              hover
                              show-empty
                              striped
                          >
                            <!-- TABLE_BUSY SLOT -->
                            <template #table-busy>
                              <div class="text-center my-2">
                                <b-spinner
                                    variant="primary"
                                    class="align-middle"
                                ></b-spinner>

                              </div>
                            </template>

                            <template #cell(index)="data">
                              {{
                                data.index + 1
                              }}
                            </template>
                            <!-- NAME -->
                            <template #cell(name)="data">
                              <div class="d-flex justify-content-between">
                                <p
                                    class="mb-0 d-flex align-items-center"
                                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                                <p
                                    class="mb-0 d-flex align-items-center"
                                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                                <p
                                    class="mb-0 d-flex align-items-center"
                                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
                              </div>
                            </template>

                            <!-- FULL_NAME -->
                            <template #cell(directorOrAccounterFullName)="data">
                              {{ data.item.firstName }} {{ data.item.lastName }}
                              {{ data.item.middleName ? data.item.middleName : '' }}
                            </template>

                            <!-- STATUS -->
                            <template #cell(status)="data">
                              <div class="d-flex justify-content-between">
                                <p>
                                  {{
                                    getName({
                                      nameRu: data.item.statusNameRu,
                                      nameLt: data.item.statusNameLt,
                                      nameUz: data.item.statusNameUz,
                                    })
                                  }}
                                </p>
                              </div>
                            </template>

                            <!-- PARENT -->
                            <template #cell(parent)="data">
                                                            <span v-if="data.item.parent">
                                                                {{ data.item.parent.fullName }}
                                                            </span>
                            </template>

                            <!-- STATUS -->
                            <template #cell(formOfOwnership)="data">
                              <div class="d-flex justify-content-between">
                                <p>
                                  {{
                                    getName({
                                      nameRu: data.item.formOfOwnershipNameRu,
                                      nameLt: data.item.formOfOwnershipNameLt,
                                      nameUz: data.item.formOfOwnershipNameUz,
                                    })
                                  }}
                                </p>
                              </div>
                            </template>

                            <!-- REGION NAME -->
                            <template #cell(regionName)="data">
                              <p v-if="data.item.addressDto">
                                {{
                                  getName({
                                    nameRu: data.item.addressDto.regionNameRu,
                                    nameLt: data.item.addressDto.regionNameLt,
                                    nameUz: data.item.addressDto.regionNameUz,
                                  })
                                }}
                              </p>
                            </template>

                            <!-- DISTRICT NAME -->
                            <template #cell(districtName)="data">
                              <p v-if="data.item.addressDto">
                                {{
                                  getName({
                                    nameRu: data.item.addressDto.districtNameRu,
                                    nameLt: data.item.addressDto.districtNameLt,
                                    nameUz: data.item.addressDto.districtNameUz,
                                  })
                                }}
                              </p>
                            </template>

                            <!-- CAN REGISTER -->
                            <template
                                v-if="tc.key === 'generalInfo'"
                                #cell(canRegister)="data"
                            >
                              <div class="d-flex justify-content-center">
                                                                <span
                                                                    class="badge bg-success"
                                                                    v-if="data.item.canRegister === true"
                                                                >HA</span>
                                <span
                                    class="badge bg-warning"
                                    v-if="data.item.canRegister === false"
                                >YO'Q</span>
                              </div>
                            </template>

                            <!-- FOUNDER_SHARE_SUM -->
                            <template #cell(founderShareSum)="data">
                              {{ data.item.founderShareSum | toCurrency }}
                            </template>

                            <!-- FOUNDER_TYPE -->
                            <template #cell(founderType)="data">
                              <b-badge
                                  :variant="data.item.isLegal ? 'primary' : 'success'"
                                  class="font-weight-bold"
                                  style="font-size: .7rem;"
                              >{{ data.item.isLegal ? $t('column.legal_entity') : $t('column.individual') }}
                              </b-badge>
                            </template>

                            <template #empty="">
                              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                            </template>

                          </b-table>
                        </b-tab>
                      </b-tabs>
                      <b-table
                          v-else
                          :items="row.item.innerTabItems"
                          :fields="t.fields"
                          :busy="row.item.loadingInnerData"
                          sticky-header="400px"
                          bordered
                          small
                          hover
                          show-empty
                          striped
                      >
                        <!-- TABLE_BUSY SLOT -->
                        <template #table-busy>
                          <div class="text-center my-2">
                            <b-spinner
                                variant="primary"
                                class="align-middle"
                            ></b-spinner>

                          </div>
                        </template>

                        <template #cell(index)="innerData">
                          {{
                            innerData.index + 1
                          }}
                        </template>

                        <!-- PRICE_APPROVAL_CURRENT_PRICE_WITH_DUTY -->
                        <template #cell(currentPriceWithDuty)="data">
                          {{ data.item.currentPriceWithDuty | toCurrency }}
                        </template>
                        <!-- PRICE_APPROVAL_CURRENT_PRICE_WITHOUT_DUTY -->
                        <template #cell(currentPriceWithoutDuty)="data">
                          {{ data.item.currentPriceWithoutDuty | toCurrency }}
                        </template>

                        <!-- COMISSION_SHOWCASE_AMOUNT -->
                        <template #cell(instructionAmount)="data">
                          {{ data.item.instructionAmount | toCurrency }}
                        </template>
                        <!-- COMISSION_REMAINDER_AMOUNT -->
                        <template #cell(residueAmount)="data">
                          {{ data.item.residueAmount | toCurrency }}
                        </template>

                        <template #empty="">
                          <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                        </template>

                      </b-table>
                    </b-tab>
                  </b-tabs>
                </b-col>
                <!-- <b-col
                    v-if="isNatural || isNaturalRepublic"
                    sm="5"
                >
                    <h4 class="text-center">{{$t('column.announced_media')}}</h4>
                    <b-table
                        :items="row.item.announcedMediaDtos ? row.item.announcedMediaDtos : []"
                        :fields="mediaTableFields"
                        :busy="row.item.loadingInnerData"
                        bordered
                        small
                        hover
                        show-empty
                        striped
                        table-variant="info"
                    >


                        <template #cell(index)="innerData">
                            {{
                        innerData.index + 1
                    }}
                        </template>

                        <template #empty="">
                            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                        </template>

                    </b-table>
                </b-col>
                <b-col :sm="isNatural || isNaturalRepublic ? '7' : '12'">
                    <h4 class="text-center">{{$t('column.commission_applications')}}</h4>
                    <b-table
                        :items="row.item.commissionApplicationDtos ? row.item.commissionApplicationDtos : []"
                        :fields="comissionTableFields"
                        :busy="row.item.loadingInnerData"
                        bordered
                        small
                        hover
                        show-empty
                        striped
                        table-variant="warning"
                    >


                        <template #cell(index)="innerData">
                            {{
                        innerData.index + 1
                    }}
                        </template>

                        <template #empty="">
                            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                        </template>

                    </b-table>
                </b-col> -->
              </b-row>
            </template>
            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    v-if="canUpdateReestr && data.item.documentStatusCode === 'PENDING' && data.item.documentType === 'KIRITISH'"
                    variant="link"
                    v-b-popover.hover.bottom="{variant: 'dark', content: $t('actions.edit')}"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    @click="editItem(data.item)"
                >
                  <i class="mdi mdi-circle-edit-outline edit" />
                </b-btn>
<!--                <a v-b-popover.hover.bottom="{variant: 'dark', content: $t('actions.download')}"-->
<!--                   style="font-size: 1.2rem; margin-right: 1rem;" :href="`${publicPath}${data.item.fileUrl}`" target="_blank" >-->
<!--                  <i class="mdi mdi-file-download" />-->
<!--                </a>-->
                <b-btn
                    v-if="canApproveReestr && data.item.documentStatusCode === 'PENDING'"
                    v-b-popover.hover.bottom="{variant: 'dark', content: $t('actions.confirm')}"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; color: green;"
                >
                  <i @click="approveReestrDoc(data.item)" class="mdi mdi-check-circle-outline edit" />
                </b-btn>
              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner
                    variant="primary"
                    class="align-middle"
                ></b-spinner>
              </div>
            </template>
          </b-table>

          <!-- end table -->
          <!-- <b-pagination
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
              aria-controls="my-table"
              class="justify-content-end"
          ></b-pagination> -->
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>

<script>
const MAIN_API_URL = 'reestr/contractor-reestr-documents'
const APPEND_API_URL_NATURAL = 'for-contractor/estestveniy'
const APPEND_API_URL_DOMINANT = 'for-contractor/daminiriushiy'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

export default {
  name: 'ReestrHistoryForContractorNatural',
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      // activeTabIdxForContractor: 0,
      // activeTabIdxOfInnerTabs: 0,
      founderTabs: [
        {
          key: "legal",
          title: this.$t('column.legal_entity'),
          fields: [
            {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
            },
            {
              key: 'name',
              label: this.$t('column.name'),
            },
            {
              key: 'tin',
              label: this.$t('column.inn'),
            },
            {
              key: 'founderType',
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
          ]
        },
        {
          key: "individual",
          title: this.$t('column.individual'),
          fields: [
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
              key: 'tin',
              label: this.$t('column.inn'),
            },
            {
              key: 'pinfl',
              label: this.$t('column.personal_number'),
            },
            {
              key: 'founderType',
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
          ]
        }
      ],
      contractorTabs: [
        {
          key: "generalInfo",
          title: this.$t('column.general_info'),
          fields: [
            {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
            },
            { label: this.$t('column.full_name'), key: "fullName", thStyle: { 'min-width': '17rem' } },
            { label: this.$t('column.superior_parent'), key: "parent" },
            { label: this.$t('column.status'), key: "status" },
            { label: this.$t('submodules.form_of_ownership.title'), key: "formOfOwnership" },
            {
              label: this.$t('column.can_login'), key: "canRegister", tdClass: "text-center",
            },
            { label: this.$t('column.inn'), key: "inn" },
            { label: this.$t('column.oked'), key: "oked" },
            // { label: this.$t('column.director'), key: "director" },
            // { label: this.$t('column.accounter'), key: "accounter" },
            { label: this.$t('column.mobile_number'), key: "mobileNumber" },
            { label: this.$t('column.region'), key: "regionName" },
            { label: this.$t('column.district'), key: "districtName" },
            { label: this.$t('column.address'), key: "address" },
            { label: this.$t('column.phone_number'), key: "phoneNumber" },
            { label: this.$t('column.mail'), key: "email" },
            { label: this.$t('column.fax_number'), key: "faxNumber" }
          ]
        },
        {
          key: "director",
          title: this.$t('column.director'),
          fields: [
            {
              key: 'index',
              label: '#'
            },
            {
              key: 'directorOrAccounterFullName',
              label: this.$t('column.name')
            },
            {
              key: 'inn',
              label: this.$t('column.inn'),
            },
            {
              key: 'pnfl',
              label: this.$t('column.personal_number'),
            },
          ]
        },
        {
          key: "accounter",
          title: this.$t('column.accounter'),
          fields: [
            {
              key: 'index',
              label: '#'
            },
            {
              key: 'directorOrAccounterFullName',
              label: this.$t('column.name')
            },
            {
              key: 'inn',
              label: this.$t('column.inn'),
            },
            {
              key: 'pnfl',
              label: this.$t('column.personal_number'),
            },
          ]
        },
        {
          key: "founders",
          title: this.$t('column.founders'),
          fields: [
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
              key: 'founderType',
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
          ]
        }
      ],
      tableInnerTabs: [
        {
          key: "contractor",
          title: this.$t('column.business_entity'),
          fields: [
            {
              key: 'index',
              label: '#'
            },
            {
              key: 'name',
              label: this.$t('column.name')
            }
          ]
        },
        {
          key: "prices",
          title: this.$t('column.prices'),
          fields: [
            { label: `${this.$t('column.price_approval_basis')} ${this.$t('column.date')}`, key: "priceApprovalDate" },
            { label: `${this.$t('column.effective_date_price')}`, key: "priceEffectiveDate" },
            {
              label: `${this.$t('column.price_approval_basis')} ${this.$t('column.number')}`,
              key: "priceApprovalNumber"
            },
            { label: `${this.$t('column.current_price_with_duty')}`, key: "currentPriceWithDuty" },
            { label: `${this.$t('column.current_price_without_duty')}`, key: "currentPriceWithoutDuty" },
            { label: `${this.$t('column.additional_info')}`, key: "additionalInformation" },
          ]
        },
        {
          key: "announcedMedia",
          title: this.$t('column.announced_media'),
          fields: [
            {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
            },
            { label: this.$t('column.name'), key: "announcedMediaName" },
            { label: this.$t('column.link'), key: "announcedMediaLink" },
            { label: this.$t('column.date'), key: "announcedMediaDate" }
          ]
        },
        {
          key: "comission",
          title: this.$t('column.commission_applications'),
          fields: [
            {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
            },
            { label: this.$t('column.number'), key: "commencementNumber" },
            { label: this.$t('column.date'), key: "commencementDate" },
            { label: this.$t('column.initiator'), key: "initiatorName" },
            { label: this.$t('column.finishing_type'), key: "completionWorkType" },
            { label: this.$t('column.finishing_date'), key: "completionWorkDate" },
            { label: this.$t('column.showcase_amount'), key: "instructionAmount" },
            { label: this.$t('column.remainder_amount'), key: "residueAmount" }
          ]
        },
      ],
      regionId: null,
      loadingTableItems: false,
      regions: [],
      json_fields: {
        "Order Number": "orderNumber",
        "Reestr Accepted Date": "reestrAcceptedDate",
        "Reestr Closed Date": "reestrClosedDate",
        "Contractor FullName": "contractorFullName",
        "Government Percentage": "governmentPercentage",
        "Status": "status",
        "Product or Service Type": "productOrServiceType",
        "Product or Services": "productOrServices",
        "Unit": "unit",
        "Oked": "oked",
        "Skp": "skp",
        "Tnved": "tnved",
        "Comment": "comment",
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
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
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
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
        { label: this.$t('column.order_number'), key: "orderNumber" },
        { label: this.$t('column.added_date_to_reestr'), key: "reestrAcceptedDate" },
        { label: this.$t('column.removed_date_from_reestr'), key: "reestrClosedDate" },
        { label: this.$t('column.business_entity'), key: "contractorFullName" },
        { label: this.$t('column.region'), key: "region" },
        { label: this.$t('column.government_percentage'), key: "governmentPercentage" },
        { label: this.$t('column.founders_percentage'), key: "foundersPercentage" },
        { label: this.$t('column.document_type'), key: "documentType" },
        { label: this.$t('column.status'), key: "status" },
        { label: this.$t('column.product_or_service_type'), key: "productOrServiceType" },
        { label: this.$t('submodules.product_or_services.title'), key: "productOrServices" },
        { label: this.$t('column.unit'), key: "unit" },
        { label: this.$t('column.oked'), key: "oked" },
        { label: this.$t('column.comment'), key: "comment" },
        { label: this.$t('column.last_modified_by'), key: "lastModifiedBy" },
        { label: this.$t('column.approved_by'), key: "approvedBy" },
      ],
      /* mediaTableFields: [
          {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
          },
          { label: this.$t('column.name'), key: "announcedMediaName" },
          { label: this.$t('column.link'), key: "announcedMediaLink" },
          { label: this.$t('column.date'), key: "announcedMediaDate" }
      ],
      comissionTableFields: [
          {
              label: "#",
              thClass: "text-center",
              tdClass: "text-center",
              sortable: false,
              key: "index",
          },
          { label: this.$t('column.number'), key: "commencementNumber" },
          { label: this.$t('column.date'), key: "commencementDate" },
          { label: this.$t('column.initiator'), key: "initiatorName" },
          { label: this.$t('column.finishing_type'), key: "completionWorkType" },
          { label: this.$t('column.finishing_date'), key: "completionWorkDate" },
          { label: this.$t('column.showcase_amount'), key: "instructionAmount" },
          { label: this.$t('column.remainder_amount'), key: "residueAmount" }
      ] */
    };
  },
  /*
  COMPUTED */
  computed: {
    /* activeInnerTab () {
        return this.tableInnerTabs[this.activeTabIdxOfInnerTabs].key
    },
    activeContractorTab () {
        return this.contractorTabs[this.activeTabIdxForContractor].key
    }, */
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    isDominant() {
      return this.$route.name === 'ReestrHistoryForContractorDominant'
    },
    isNatural() {
      return this.$route.name === 'ReestrHistoryForContractorNatural'
    },
    isDominantRepublic() {
      return this.$route.name === 'ReestrHistoryForRepublicContractorDominant'
    },
    isNaturalRepublic() {
      return this.$route.name === 'ReestrHistoryForRepublicContractorNatural'
    },
    jsonFieldsComputed() {
      let tmp = {}
      this.tableFields.forEach((field, index) => {
        if (index != 0 && index != this.tableFields.length - 1) {
          tmp[field.label] = field.key
        }
      })
      return tmp
    },
    canUpdateReestr() {
      if (this.isDominant || this.isDominantRepublic) {
        return this.$can('update', 'contractor reestr document for acceptance daminiriushiy')
      } else if (this.isNatural || this.isNaturalRepublic) {
        return this.$can('update', 'contractor reestr document for acceptance estestveniy')
      }
      return false
    },
    canApproveReestr() {
      return this.$can('contractor', 'reestr document confirmation')
    }
  },
  methods: {
    approveReestrDoc(doc) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.you_sure_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              helperService
                  .approveReestrDoc(doc.id)
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
    activeInnerTab(activeTabIdxOfInnerTabs) {
      return this.tableInnerTabs[activeTabIdxOfInnerTabs].key
    },
    activeContractorTab(activeTabIdxForContractor) {
      return this.contractorTabs[activeTabIdxForContractor].key
    },
    setRowsInnerTabsData(item, index, selectedTabIndex, isForContractor = false, isForFounders = false, founderTabIndex = 0) {
      if (this.tableInnerTabs[selectedTabIndex].key === 'contractor' || isForContractor) {
        this.$set(item, 'loadingInnerData', true)
        if (this.contractorTabs[selectedTabIndex].key === 'generalInfo') {
          this.$set(item, 'contractorTabItems', [item.contractorDto])
          this.$set(item, 'loadingInnerData', false)
        } else if (this.contractorTabs[selectedTabIndex].key === 'director') {
          helperService.getContractorDirector(item.contractorDto.id)
              .then(res => {
                this.$set(item, 'contractorTabItems', [res.data])
              })
              .catch(e => {
                this.$set(item, 'contractorTabItems', [])
                console.log(e)
              })
              .finally(() => {
                this.$set(item, 'loadingInnerData', false)
              })
        } else if (this.contractorTabs[selectedTabIndex].key === 'accounter') {
          helperService.getContractorAccounter(item.contractorDto.id)
              .then(res => {
                this.$set(item, 'contractorTabItems', [res.data])
              })
              .catch(e => {
                this.$set(item, 'contractorTabItems', [])
                console.log(e)
              })
              .finally(() => {
                this.$set(item, 'loadingInnerData', false)
              })
        } else if (this.contractorTabs[selectedTabIndex].key === 'founders') {
          if (isForFounders && item.foundersFullData) {
            if (this.founderTabs[item.activeTabIdxForContractorFounder].key === 'legal') {
              this.$set(item, 'contractorTabItems', item.foundersFullData.founderLegalDto)
            } else if (this.founderTabs[item.activeTabIdxForContractorFounder].key === 'individual') {
              this.$set(item, 'contractorTabItems', item.foundersFullData.founderIndividualDto)
            }
            this.$set(item, 'loadingInnerData', false)
          } else {
            helperService.getContractorFounders(item.contractorDto.id)
                .then(res => {
                  this.$set(item, 'foundersFullData', res.data)
                  if (this.founderTabs[item.activeTabIdxForContractorFounder].key === 'legal') {
                    this.$set(item, 'contractorTabItems', res.data.founderLegalDto)
                  } else if (this.founderTabs[item.activeTabIdxForContractorFounder].key === 'individual') {
                    this.$set(item, 'contractorTabItems', res.data.founderIndividualDto)
                  }
                })
                .catch(e => {
                  this.$set(item, 'foundersFullData', null)
                  this.$set(item, 'contractorTabItems', [])
                  console.log(e)
                })
                .finally(() => {
                  this.$set(item, 'loadingInnerData', false)
                })
          }
        }
      } else if (this.tableInnerTabs[selectedTabIndex].key === 'prices') {
        this.$set(item, 'innerTabItems', item.priceApprovalDtos)
      } else if (this.tableInnerTabs[selectedTabIndex].key === 'announcedMedia') {
        this.$set(item, 'innerTabItems', item.announcedMediaDtos)
      } else if (this.tableInnerTabs[selectedTabIndex].key === 'comission') {
        this.$set(item, 'innerTabItems', item.commissionApplicationDtos)
      }
    },
    rowClicked(item, index) {
      this.$set(item, '_showDetails', !item._showDetails)
      if (!item.activeTabIdxOfInnerTabs) {
        this.$set(item, 'activeTabIdxOfInnerTabs', 0)
      }
      if (!item.activeTabIdxForContractor) {
        this.$set(item, 'activeTabIdxForContractor', 0)
      }
      if (!item.activeTabIdxForContractorFounder) {
        this.$set(item, 'activeTabIdxForContractorFounder', 0)
      }
      this.setRowsInnerTabsData(item, index, 0, true)
      // this.fetchReestrDocsByTypeId(null, item.typeId, index)
    },
    fetchReestrDocsByTypeId(toggleDetails, typeId, index) {
      if (toggleDetails) {
        toggleDetails()
      }
      this.$set(this.tableItems[index], 'loadingInnerData', true)
      crudAndListsService
          .searchList(MAIN_API_URL, null, `${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?regionId=${this.regionId}&typeId=${typeId}`)
          .then((res) => {
            this.$set(this.tableItems[index], 'reestr', res.data)
          })
          .catch(e => {
            this.$set(this.tableItems[index], 'reestr', [])
          })
          .finally(() => {
            this.$set(this.tableItems[index], 'loadingInnerData', false)
          })
    },
    async regionSelected($event, dontResetDistrict = false) {
      if ($event) {
        this.fetchTableItems()
      }
    },
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.orderNumber = res.orderNumber
        obj.reestrAcceptedDate = res.reestrAcceptedDate
        obj.reestrClosedDate = res.reestrClosedDate
        obj.contractorFullName = res.contractorDto.fullName + '-' + res.contractorDto.inn
        obj.governmentPercentage = res.governmentPercentage
        obj.documentType = res.documentType
        obj.status = this.getName({
          nameLt: res.documentStatusNameLt,
          nameUz: res.documentStatusNameUz,
          nameRu: res.documentStatusNameRu
        })
        obj.productOrServiceType = this.getName({
          nameLt: res.directoryProductOrServiceTypeDto.nameLt,
          nameUz: res.directoryProductOrServiceTypeDto.nameUz,
          nameRu: res.directoryProductOrServiceTypeDto.nameRu
        })
        obj.productOrServices = this.getName({
          nameLt: res.directoryProductOrServiceDto.nameLt,
          nameUz: res.directoryProductOrServiceDto.nameUz,
          nameRu: res.directoryProductOrServiceDto.nameRu
        })
        obj.unit = this.getName({ nameLt: res.unitNameLt, nameUz: res.unitNameUz, nameRu: res.unitNameRu })
        obj.skp = res.infoSKPDto ? res.infoSKPDto.code + '-' + this.getName({
          nameLt: res.infoSKPDto.nameLt,
          nameUz: res.infoSKPDto.nameUz,
          nameRu: res.infoSKPDto.nameRu
        }) : ''
        obj.oked = res.infoOkedDto ? res.infoOkedDto.code + '-' + this.getName({
          nameLt: res.infoOkedDto.nameLt,
          nameUz: res.infoOkedDto.nameUz,
          nameRu: res.infoOkedDto.nameRu
        }) : ''
        obj.tnved = res.infoTNVEDDto ? res.infoTNVEDDto.code + '-' + this.getName({
          nameLt: res.infoTNVEDDto.nameLt,
          nameUz: res.infoTNVEDDto.nameUz,
          nameRu: res.infoTNVEDDto.nameRu
        }) : ''
        obj.comment = res.comment
        obj.lastModifiedBy = `${res.updatedByEmployeeFullName ? (res.updatedByEmployeeFullName + ' ' + (res.updatedByDirectoryPositionNameUz ? ('(' + res.updatedByDirectoryPositionNameUz + ', ' + this.$t('auth.username') + ' - ' + res.updatedByUserName + ')') : '')) : this.$t('auth.username') + ' - ' + res.updatedByUserName + ' ' + (res.updatedByDate ? res.updatedByDate : '')}`
        obj.approvedBy = `${res.confirmedByEmployeeFullName ? (res.confirmedByEmployeeFullName + ' ' + (res.confirmedByDirectoryPositionNameUz ? ('(' + res.confirmedByDirectoryPositionNameUz + ', ' + this.$t('auth.username') + ' - ' + res.confirmedByUserName + ')') : '')) : this.$t('auth.username') + ' - ' + res.confirmedByUserName + ' ' + (res.confirmedByDate ? res.confirmedByDate : '')}`
        obj.foundersPercentage = ''
        res.contractorDto.foundersDtos.forEach(el => {
          obj.foundersPercentage += `${el.founderName} (${el.percentage}), `
        })
        obj.region = ''
        res.regionDtos.forEach(el => {
          obj.region += `${this.getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu })}, `
        })
        if (this.isDominant || this.isNatural) {
          obj.district = ''
          res.districtDtos.forEach(el => {
            obj.district += `${this.getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu })}, `
          })
        }
        if (this.isNatural || this.isNaturalRepublic) {
          obj.priceApprovalDate = res.priceApprovalDate
          obj.priceEffectiveDate = res.priceEffectiveDate
          obj.priceApprovalNumber = res.priceApprovalNumber
          obj.currentPriceWithDuty = res.currentPriceWithDuty
          obj.currentPriceWithoutDuty = res.currentPriceWithoutDuty
          obj.additionalInformation = res.additionalInformation
        }
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
    async fetchTableItems() {
      if (this.isDominantRepublic || this.isNaturalRepublic) {
        this.loadingTableItems = true
        helperService
            .searchReestrHistoryListByContractorId(`${this.isDominantRepublic ? APPEND_API_URL_DOMINANT : this.isNaturalRepublic ? APPEND_API_URL_NATURAL : ''}?contractorId=${this.$route.params.id}`, true)
            .then((res) => {
              this.tableItems = res.data;
            })
            .catch(e => {
              this.tableItems = [];
            })
            .finally(() => {
              this.loadingTableItems = false
            })
      } else {
        this.loadingTableItems = true
        // this.var_default_search_payload.keyword = this.searchKeyword
        /* this.var_default_search_payload.sortDesc.push(false)
        if (this.$i18n.locale === 'uz') {
            this.var_default_search_payload.sortBy.push('nameLt')
        } else if (this.$i18n.locale === 'ru') {
            this.var_default_search_payload.sortBy.push('nameRu')
        } else if (this.$i18n.locale === 'uzCyrillic') {
            this.var_default_search_payload.sortBy.push('nameUz')
        } */
        crudAndListsService
            .searchList(MAIN_API_URL, this.var_default_search_payload, `${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}?contractorId=${this.$route.params.id}`, true)
            .then((res) => {
              this.tableItems = res.data;
            })
            .catch(e => {
              this.tableItems = [];
            })
            .finally(() => {
              this.loadingTableItems = false
            })
      }
    },
    editItem(item) {
      if (item.documentType === 'KIRITISH') {
        this.$router.push(this.isDominant || this.isDominantRepublic ? {
          name: 'UpdateDominantContractorReestr',
          params: { id: item.id }
        } : { name: 'UpdateNaturalContractorReestr', params: { id: item.id } })
      } else if (item.documentType === 'CHIQARISH') {
        this.$router.push(this.isDominant || this.isDominantRepublic ? {
          name: 'UpdateRemoveDocDominantContractorReestr',
          params: { id: item.id }
        } : { name: 'UpdateRemoveDocNaturalContractorReestr', params: { id: item.id } })
      }
    }
  },
  /* CREATED */
  created() {
    if (this.isDominant || this.isDominantRepublic) {
      this.tableFields.splice(12, 0, { label: this.$t('column.skp_code'), key: "skp" },
          { label: this.$t('column.tnved_code'), key: "tnved" })
    }
    if (this.isDominant || this.isNatural) {
      this.tableFields.splice(6, 0, { label: this.$t('column.district'), key: "district" })
    }
    /* if (this.isNatural || this.isNaturalRepublic) {
        this.tableFields.splice(this.tableFields.length - 1, 0,
            { label: `${this.$t('column.price_approval_basis')} ${this.$t('column.date')}`, key: "priceApprovalDate" },
            { label: `${this.$t('column.effective_date_price')}`, key: "priceEffectiveDate" },
            { label: `${this.$t('column.price_approval_basis')} ${this.$t('column.number')}`, key: "priceApprovalNumber" },
            { label: `${this.$t('column.current_price_with_duty')}`, key: "currentPriceWithDuty" },
            { label: `${this.$t('column.current_price_without_duty')}`, key: "currentPriceWithoutDuty" },
            { label: `${this.$t('column.additional_info')}`, key: "additionalInformation" },
        )
    } */
    this.fetchTableItems()
  },
  /*
  WATCH */
  watch: {
    /* 'var_default_search_payload.page': {
        handler () {
            this.fetchTableItems()
        }
    } */
  }
};
</script>

<style scoped lang='scss'>
.a-tag-underline-hover {
  :hover {
    text-decoration: underline !important;
  }
}

ul {
  padding-left: 20px;
}
</style>