<script>
import Tr from "./tr";
import helperService from "@/shared/services/helper.service"

export default {
  props: {
    page: {
      default: 1,
      type: Number,
    },
    limit: {
      default: 20,
      type: Number,
    },
    list: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeId: null,
      noActiveId: null,
      statuses: [],
    };
  },
  async created() {
    await helperService.getRefByCodeNew('status').then(res => {
      this.statuses = res.data.children
      this.activeIds();
      this.noActiveIds();
    })
  },

  components: {
    Tr,
  },
  methods: {
    activeIds() {
      this.statuses.map(item => {
        if (item.code === 'ACTIVE') {
          this.activeId = item.id
        }
      })
    },
    noActiveIds() {
      this.statuses.map(item => {
        if (item.code === 'INACTIVE') {
          this.noActiveId = item.id
        }
      })
    },
  },
};
</script>

<template>
  <div>
    <div class="table-responsive mb-0">
      <b-overlay :opacity="0.1" :show="loading" rounded="sm">
        <table class="table table-centered  table-custom-bordered">
          <thead class="thead-light">
          <slot name="thead"/>
          </thead>
          <tbody>
          <template v-for="(data, index) in list">
            <Tr :index="index" :key="data.id + 'Room'" :data="data">
              <template v-slot:index>
                <td class="text-center">
                  <strong>{{ util_paginate(index, limit, page - 1) }}</strong>
                </td>
              </template>
              <template v-slot:status>
                <td
                    class="text-center"
                    @click="$emit('showModal', 'change', data)"
                >
                  <b-form-checkbox switch v-model="data.statusId"
                                   :value="activeId"
                                   :unchecked-value="noActiveId"></b-form-checkbox>
                </td>
              </template>
              <template v-slot:name>
                <td
                    class="text-center"
                    @click="$emit('showModal', 'view', data)"
                >
                    <span class="hov_underline text-hover-bold p_cursor">
                      {{ getName({nameLt: data.nameLt,nameUz: data.nameUz, nameRu: data.nameRu}) }}
                    </span>
                </td>
              </template>

              <template v-slot:actions>
                <td class="text-center">
                  <b-button
                      @click="$emit('share', data)"
                      size="sm"
                      variant="primary"
                  >
                    <i class="bx bx-plus font-size-18"> </i>
                  </b-button>
                  <b-button
                      v-if="data.canDelete"
                      @click="$emit('showModal', 'delete', data)"
                      size="sm"
                      variant="light"
                      class="ml-2"
                  >
                    <i
                        class="bx bx-trash font-size-18"
                        @click="$emit('showModal', 'delete', data)"
                    ></i>
                  </b-button>

                  <!-- FORMULALARNI HALI ISHLAYDIGAN QILMAGANIMIZ SABAB COMMENT QILDIM 07.12.2021 -->
                  <!-- FORMULALAR HALI ISHLAYDIGAN QILINMADI. TABLE O"ZINI KO'RISH UCHUN FORMULALARNI KO"RINMIDIGAN QILIB VIEW COMMENTDAN OCHILDI 17.12.2021 -->
                  <b-button
                      @click="$emit('showModal', 'view', data)"
                      size="sm"
                      variant="light"
                      class="ml-2"
                  >
                    <i class="fa fa-eye font-size-18"></i>
                  </b-button>

                  <b-button
                      @click="$emit('showModal', 'edit', data)"
                      size="sm"
                      variant="light"
                      class="ml-2"
                  >
                    <i class="fa fa-edit font-size-18"></i>
                  </b-button>

                  <b-button
                      v-if="!data.isReturnableDepartmentAdded"
                      @click="$emit('responsiblePerson', data)"
                      size="sm"
                      variant="success"
                      class="ml-2"
                  >
                    <i class="fas fa-user-shield font-size-18"></i>
                  </b-button>
                </td>
              </template>
            </Tr>
          </template>
          <tr class="text-center" v-if="list.length == 0">
            <td
                colspan="9"
                :style="loading ? 'height:50px' : 'height:40px'"
                style="vertical-align: middle"
            >
              <h6 class="m-0">
                {{ $t("messages.data_not_found") }}
              </h6>
            </td>
          </tr>
          </tbody>
        </table>
      </b-overlay>
    </div>
    <slot name="pagination"/>
  </div>
  <!-- end table -->
</template>
