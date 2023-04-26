<template>
  <div>
    <!-- SIGNATURE -->
    <div class="card" v-if="selectedSignature.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/2.png')" alt="DOC" height="45" />
        <h5 class="ml-3">
          <strong>{{ $t("forSignature") }}</strong>
        </h5>
      </div>
      <div class="pl-4">
        <div class="table-responsive border-color-custom m-0">
          <table class="table table-centered m-0">
            <tbody>
              <tr
                v-for="(item, index) in selectedSignature"
                :key="index + 'sign'"
              >
                <td style="width: 50px">
                  <img
                    v-if="item.signerUploadPath"
                    :src="`${hrUrl}/${item.signerUploadPath}`"
                    class="rounded-circle avatar-sm"
                    alt
                  />
                  <div v-else class="avatar-sm">
                    <span class="avatar-title rounded-circle bg-soft-primary text-white font-size-16">
                      {{ `${item.signerLastName.charAt(0)}` }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div>
                      <h5 class="font-size-14 m-0">
                        <p class="text-dark m-0">
                      {{ `${item.signerLastName} ${item.signerFirstName} ${item.signerParentName}` }}
                        </p>
                      </h5>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: item.depNameLt,
                            nameRu: item.depNameRu,
                          })
                        }}
                      </p>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: item.positionNameLt,
                            nameRu: item.positionNameRu,
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
                      item.signDate ? new Date(item.signDate).ddmmyyyyhhmmss() : ""
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

                      <p class="text-muted m-0">{{ item.comment }}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AGREEMENT -->
    <div class="card" v-if="selectedAgreement.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/4.png')" alt="DOC" height="45" />
        <h5 class="ml-3">
          <strong>{{ $t("forAgreement") }}</strong>
        </h5>
      </div>
      <div class="pl-4">
        <div class="table-responsive">
          <table class="table table-centered m-0">
            <tbody v-if="selectedAgreement.length > 0">
              <tr
                v-for="(member, index) in selectedAgreement"
                :key="index + 'AD'"
              >
                <td style="width: 50px">
                  <img
                    v-if="member.signerUploadPath"
                    :src="`${hrUrl}/${member.signerUploadPath}`"
                    class="rounded-circle avatar-sm"
                    alt
                  />
                  <div v-else class="avatar-sm">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${member.signerLastName.charAt(0)}` }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div>
                      <h5 class="font-size-14 m-0">
                        <p class="text-dark m-0">
                      {{ `${member.signerLastName} ${member.signerFirstName} ${member.signerParentName}` }}
                        </p>
                      </h5>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: member.depNameLt,
                            nameRu: member.depNameRu,
                          })
                        }}
                      </p>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: member.positionNameLt,
                            nameRu: member.positionNameRu,
                          })
                        }}
                      </p>
                    </div>
                    <div>
                      <i
                        v-if="member.isAgreed"
                        style="font-size: 26px"
                        class="mdi mdi-handshake ml-3 text-success"
                      ></i>
                    </div>
                  </div>

                  <div v-if="member.cancelled">
                    <b-badge class="mt-2" variant="danger">
                      {{ $t("docs_r.CANCELED_TO_WORK") }}
                    </b-badge>
                    <br />
                    <div v-if="member.comment">
                      <label class="mt-1 mb-0 font-size-12"
                        >{{ $t("submodules.reports.reasonRejected") }}:
                      </label>

                      <p class="text-muted m-0">{{ member.comment }}</p>
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
    <div class="card" v-if="selectedReview.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/3.png')" alt="DOC" height="45" />
        <h5 class="ml-3">
          <strong>{{ $t("forReview") }}</strong>
        </h5>
      </div>
      <div class="pl-4">
        <div class="table-responsive m-0">
          <table class="table table-centered m-0">
            <tbody v-if="selectedReview.length > 0">
              <tr v-for="(member, index) in selectedReview" :key="index + 'AD'">
                <td style="width: 50px">
                  <img
                    v-if="member.signerUploadPath"
                    :src="`${hrUrl}/${member.signerUploadPath}`"
                    class="rounded-circle avatar-sm"
                    alt
                  />
                  <div v-else class="avatar-sm">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${member.signerLastName.charAt(0)}` }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div>
                      <h5 class="font-size-14 m-0">
                        <p class="text-dark m-0">
                          {{ `${member.signerLastName} ${member.signerFirstName} ${member.signerParentName}` }}
                        </p>
                      </h5>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: member.depNameLt,
                            nameRu: member.depNameRu,
                          })
                        }}
                      </p>
                      <p class="m-0 text-muted">
                        {{
                          g_name({
                            nameLt: member.positionNameLt,
                            nameRu: member.positionNameRu,
                          })
                        }}
                      </p>
                    </div>
                    <div>
                      <i
                        v-if="member.isViewed"
                        style="font-size: 22px"
                        class="ml-3 text-success mdi mdi-file-eye"
                      ></i>
                    </div>
                  </div>

                  <div v-if="member.cancelled">
                    <b-badge class="mt-2" variant="danger">
                      {{ $t("docs_r.CANCELED_TO_WORK") }}
                    </b-badge>
                    <br />
                    <div v-if="member.comment">
                      <label class="mt-1 mb-0 font-size-12"
                        >{{ $t("submodules.reports.reasonRejected") }}:
                      </label>

                      <p class="text-muted m-0">{{ member.comment }}</p>
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
</template>

<script>
import { g_name } from "@/helper";
export default {
  data() {
    return {
      g_name: g_name,
    };
  },
  props: {
    selectedReview: {
      type: Array,
      default: () => [],
    },
    selectedAgreement: {
      type: Array,
      default: () => [],
    },
    selectedSignature: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>