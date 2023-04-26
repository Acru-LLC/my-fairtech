<script>
import Tr from "./tr_gather_report";
// import { getName } from "@/helper";
export default {
  watch: {
    selectedRow: {
      handler(v) {
        this.$emit("setRow", v);
      },
    },
  },
  data() {
    return {
      // getName: getName,
      selectedRow: [],
      currentTrData: {},
      members: [],
      objectMembers: [],
    };
  },
  methods: {
    check(v) {
      let index = this.members.indexOf(v.id);
      if (index > -1) {
        return ["font-weight-bold", "text-success"];
      } else {
        return false;
      }
    },
    pushMember(v) {
      let index = this.members.indexOf(v.id);
      if (index > -1) {
        this.members.splice(index, 1);
        this.objectMembers.splice(index, 1);
      } else {
        this.members.unshift(v.id);
        this.objectMembers.unshift(v);
      }
    },
    resetCurrentData() {
      this.currentTrData = {};
    },
    clickTr(data) {
      this.currentTrData = data;
      this.$emit("clickTr", data);
    },
    pushData(data) {
      let found = this.selectedRow.findIndex((e) => e.id == data.id);
      if (found > -1) {
        this.selectedRow.splice(found, 1);
      } else {
        this.selectedRow.push(data);
      }
    },
    reset(array = []) {
      this.selectedRow = array;
    },
  },
  props: {
    sidebar: {
      default: false,
      type: Boolean,
    },
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
  components: {
    Tr,
  },
};
</script>

<template>
  <div>
    <div class="table-responsive mb-0">
      <b-overlay :opacity="0.1" :show="loading" rounded="sm">
        <table
          class="table table-centered table-striped table-nowrap table-hover"
        >
          <thead class="thead-light">
            <slot name="thead" />
          </thead>
          <tbody>
            <template v-for="(data, index) in list">
              <Tr
                @clickTr="clickTr"
                :class="
                  currentTrData.id == data.id
                    ? 'bg-soft-primary text-primary'
                    : data.status == 'CANCELED'
                    ? 'bg-soft-danger text-danger'
                    : ''
                "
                @pushData="pushData"
                :index="index"
                :key="data.id + 'c-1'"
                :data="data"
                :classCheck="check(data)"
              >
                <template v-slot:check>
                  <td class="bg-white">
                    <b-button
                      v-if="data.status == 'APPROVED'"
                      @click.prevent="pushMember(data)"
                      :variant="check(data) ? 'success' : 'light'"
                      size="sm"
                    >
                      <i class="fa fa-check"></i>
                    </b-button>
                  </td>
                </template>
                <template v-slot:index>
                  <td
                    @click="clickTr(data)"
                    class="text-center p_cursor"
                    @click.prevent="pushData(data)"
                  >
                    <strong :class="check(data)">
                      {{ paginate(index, limit, page - 1) }}</strong
                    >
                  </td>
                </template>

                <template v-slot:name>
                  <td @click="clickTr(data)" class="text-center p_cursor">
                    <span
                      :class="check(data)"
                      class="text-hover-primary p_cursor"
                    >
                      {{
                        getName({
                          nameLt: data.docTableNameLt,
                          nameRu: data.docTableNameRu,
                        })
                      }}
                    </span>
                  </td>
                </template>
                <!-- <template v-slot:actions>
                  <td v-if="!sidebar" class="text-center">

                    <b-button
                      @click="$emit('showModal', 'view', data)"
                      size="sm"
                      class="ml-2"
                      variant="light"
                    >
                      <i class="fa fa-eye font-size-18"></i>
                    </b-button>
                    <b-button
                      v-if="data.status == 'CREATED'"
                      @click="$emit('showModal', 'edit', data)"
                      size="sm"
                      class="ml-2"
                      variant="light"
                    >
                      <i class="bx bx-edit font-size-18 text-hover-primary"></i>
                    </b-button>
                    <b-button
                      v-if="data.status == 'CREATED'"
                      @click="$emit('showModal', 'delete', data)"
                      size="sm"
                      class="ml-2"
                      variant="light"
                    >
                      <i
                        class="
                          bx bx-trash
                          font-size-18
                          p_cursor
                          text-hover-danger
                        "
                      ></i>
                    </b-button>

                    <b-button
                      v-if="data.status == 'CREATED'"
                      @click="$emit('showModal', 'send', data)"
                      size="sm"
                      class="ml-2"
                      variant="primary"
                    >
                      <i
                        class="
                          bx bx-send
                          font-size-18
                          p_cursor
                          text-hover-danger
                        "
                      ></i>
                    </b-button>
                  </td>
                </template> -->
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
    <slot name="pagination" />
  </div>
  <!-- end table -->
</template>
