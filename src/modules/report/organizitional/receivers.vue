<template>
  <div>
    <div v-for="(item, index) in infoData" :key="'hhh' + index">
      <!-- KELISHISH -->
      <div class="card" v-if="item.signerId">
        <div class="card-header bg-white d-flex align-items-center">
          <img :src="require('@/assets/images/report/4.png')" alt="DOC" height="45" />
          <h5 class="ml-3">
            <strong>{{ $t("actions.for_agreement") }}</strong>
          </h5>
        </div>
        <div class="pl-4">
          <div class="table-responsive border-color-custom m-0">
            <table class="table table-centered m-0">
              <tbody>
                <tr>
                  <td style="width: 50px">
                    <img
                      v-if="item.signerUploadPath"
                      :src="`${publicPath}/${item.signerUploadPath}`"
                      class="rounded-circle avatar-sm"
                      alt
                    />
                    <div v-else class="avatar-sm">
                      <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                        {{ `${item.signerLastName.charAt(0)}` }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div>
                        <h5 class="font-size-14 m-0">
                          <p class="text-dark m-0">
                            {{
                              `${item.signerLastName} ${item.signerFirstName} ${item.signerParentName}`
                            }}
                          </p>
                        </h5>
                        <p class="m-0 text-muted">
                          {{
                            getName({
                              nameLt: item.signerYurDepNameLt,
                              nameRu: item.signerYurDepNameRu,
                              nameUz: item.signerYurDepNameUz,
                            })
                          }}
                        </p>
                        <p class="m-0 text-muted">
                          {{
                            getName({
                              nameLt: item.signerDepNameLt,
                              nameRu: item.signerDepNameRu,
                              nameUz: item.signerDepNameUz,
                            })
                          }}
                        </p>
                        <p class="m-0 text-muted">
                          {{
                            getName({
                              nameLt: item.signerPositionNameLt ? item.signerPositionNameLt : '',
                              nameRu: item.signerPositionNameRu ? item.signerPositionNameRu : '',
                              nameUz: item.signerPositionNameUz ? item.signerPositionNameUz : '',
                            })
                          }}
                        </p>
                      </div>
                      <div>
                        <i
                          v-if="item.signed"
                          style="font-size: 26px"
                          class="mdi ml-3 text-success mdi-check-all"
                        ></i>
                      </div>
                    </div>

                    <div v-if="item.signDate" class="mt-1">
                      <b>{{ $t("dateSign") }}</b> :
                      {{
                        item.signDate
                      }}
                    </div>

                    <div v-if="item.cancelled">
                      <b-badge class="mt-2" variant="danger">
                        {{ $t("docs_r.CANCELED_TO_WORK") }}
                      </b-badge>
                      <br />
                      <div v-if="item.comment">
                        <label class="mt-1 mb-0 font-size-12"
                          >{{ $t("submodules.reports.reasonRejected") }}:
                        </label>

                        <p class="text-muted m-0">
                          {{ item.comment }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- REVIEW EMPLOYEE LIST -->
      <div class="card" v-if="item.receiverDepId">
        <div class="card-header bg-white d-flex align-items-center">
          <img :src="require('@/assets/images/report/3.png')" alt="DOC" height="45" />
          <h5 class="ml-3">
            <strong>{{ $t("actions.dep_work_with_report") }}</strong>
          </h5>
        </div>
        <div>
          <div class="table-responsive m-0">
            <table class="table table-centered m-0">
              <tbody v-if="item.id">
                <tr>
                  <td>
                    <h5 class="font-size-14 m-0">
                      <span class="text-muted">
                        {{
                          `${getName({
                            nameLt: item.receiverPDepNameLt,
                            nameRu: item.receiverPDepNameRu,
                            nameUz: item.receiverPDepNameUz,
                          })}`
                        }}
                      </span>
                      <br />
                      -
                      <span class="font-weight-bold">
                        {{
                          `${getName({
                            nameLt: item.receiverDepNameLt,
                            nameRu: item.receiverDepNameRu,
                            nameUz: item.receiverDepNameUz,
                          })}`
                        }}
                      </span>
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- DECIDED_EMPLOYEE -->
        <div
          v-if="item.decidedEmployeeFirstName"
          class="pl-4"
        >
          <div class="table-responsive border-color-custom m-0">
            <table class="table table-centered m-0">
              <tbody>
                <tr>
                  <td style="width: 50px">
                    <img
                      v-if="item.decidedUploadPath"
                      :src="`${publicPath}/${item.decidedUploadPath}`"
                      class="rounded-circle avatar-sm"
                      alt
                    />
                    <div v-else class="avatar-sm">
                      <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                        {{ `${item.decidedEmployeeLastName ? item.decidedEmployeeLastName.charAt(0) : ''}` }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div>
                        <h5 class="font-size-14 m-0">
                          <p class="text-dark m-0">
                            {{
                              `${item.decidedEmployeeLastName ? item.decidedEmployeeLastName : ''} ${item.decidedEmployeeFirstName ? item.decidedEmployeeFirstName : ''} ${item.decidedEmployeeMiddleName ? item.decidedEmployeeMiddleName : ''}`
                            }}
                          </p>
                        </h5>
                        <p class="m-0 text-muted">
                          {{
                            getName({
                              nameLt: item.decidedPositionNameLt,
                              nameRu: item.decidedPositionNameRu,
                              nameUz: item.decidedPositionNameUz,
                            })
                          }}
                        </p>
                      </div>
                      <div>
                        <i
                          v-if="!item.decidedCancelled"
                          style="font-size: 26px"
                          class="mdi ml-3 text-success mdi-check-all"
                        ></i>
                      </div>
                    </div>

                    <div v-if="item.decidedDate" class="mt-1">
                      <b>{{ $t("dateSign") }}</b> :
                      {{
                        item.decidedDate ? new Date(item.decidedDate).ddmmyyyyhhmmss() : ""
                      }}
                    </div>

                    <div v-if="item.decidedCancelled">
                      <b-badge class="mt-2" variant="danger">
                        {{ $t("docs_r.CANCELED_TO_WORK") }}
                      </b-badge>
                      <br />
                      <div v-if="item.decidedComment">
                        <label class="mt-1 mb-0 font-size-12"
                          >{{ $t("submodules.reports.reasonRejected") }}:
                        </label>

                        <p class="text-muted m-0">
                          {{ item.decidedComment }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getName } from "@/helper";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      // getName: getName,
    };
  },
  props: {
    infoData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>