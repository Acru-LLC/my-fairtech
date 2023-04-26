<script>
import Tr from "./tr";
// import { getName } from "@/helper";
export default {
  components: {
    Tr,
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
  data() {
    return {
      // getName: getName,
      selectedRow: [],
      currentTrData: {},
    };
  },
  methods: {
    clickTr(data) {
      this.currentTrData = data;
      this.$emit("clickTr", data);
    },
    resetCurrentData() {
      this.currentTrData = {};
    },
    pushData(data) {
      let found = this.selectedRow.findIndex((e) => e.id === data.id);
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
  watch: {
    selectedRow: {
      handler(v) {
        this.$emit("setRow", v);
      },
    },
    list(){
      if (this.list.length > 0) {
        setTimeout(() => this.clickTr(this.list[0]), 500)
      }
    }
  },
};
</script>

<template>
  <div>
    <div class="table-responsive mb-0">
      <b-overlay :opacity="0.1" :show="loading" rounded="sm">
        <table class="table table-centered table-nowrap table-hover">
          <thead class="thead-light">
          <slot name="thead"/>
          </thead>
          <tbody>
          <template v-for="(data, index) in list">
            <Tr
                @clickTr="clickTr"
                :class="
                  currentTrData.id === data.id
                    ? 'bg-soft-primary text-primary'
                    : data.status === 'CANCELED'
                    ? 'bg-soft-danger text-danger'
                    : ''
                "
                @pushData="pushData"
                :index="index"
                :key="data.id + 'c-1'"
                :data="data"
            >
              <template v-slot:index>
                <td class="text-center" @click.prevent="pushData(data)">
                  <strong>{{ paginate(index, limit, page - 1) }}</strong>
                </td>
              </template>

              <template v-slot:name>
                <td class="text-center">
                    <span class="pre text-hover-primary p_cursor">
                      {{
                        getName({
                          nameLt: data.docTableNameLt,
                          nameRu: data.docTableNameRu,
                          nameUz: data.docTableNameUz,
                        })
                      }}
                    </span>
                </td>
              </template>
              <template v-slot:docName>
                <td class="text-center">
                    <span class="pre text-hover-primary p_cursor">
                      {{
                        getName({
                          nameUz: data.nameUz,
                          nameLt: data.nameLt,
                          nameRu: data.nameRu,
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
                    v-if="data.status === 'CREATED'"
                    @click="$emit('showModal', 'edit', data)"
                    size="sm"
                    class="ml-2"
                    variant="light"
                  >
                    <i class="bx bx-edit font-size-18 text-hover-primary"></i>
                  </b-button>
                  <b-button
                    v-if="data.status === 'CREATED'"
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
                    v-if="data.status === 'CREATED'"
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
          <tr class="text-center" v-if="list.length === 0">
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
