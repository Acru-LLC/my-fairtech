<script>
import Tr from "./tr";
// import { getName } from "@/helper";
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
      // getName: getName,
    };
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
        <table class="table table-centered table-nowrap ">
          <thead class="thead-light">
            <slot name="thead" />
          </thead>
          <tbody>
            <template v-for="(data, index) in list">
              <Tr :index="index" :key="data.id + 'Room'" :data="data">
                <template v-slot:index>
                  <td class="text-center">
                    <strong>{{ paginate(index, limit, page - 1) }}</strong>
                  </td>
                </template>
                <template v-slot:name>
                  <td
                    class="text-center"
                  >
                    <span class="">
                      {{ getName({ nameLt: data.nameLt, nameRu: data.nameRu, nameUz: data.nameUz }) }}
                    </span>
                  </td>
                </template>

                <template v-slot:actions>
                  <td class="text-center">
                    <!-- <i
                      class="bx bx-edit font-size-18 p_cursor text-hover-primary"
                      @click="$emit('showModal', 'edit', data)"
                    ></i> -->
                    <!-- <b-button
                      @click="$emit('share', data)"
                      size="sm"
                      variant="primary"
                    >
                      <i class="bx bx-edit font-size-18"> </i>
                    </b-button> -->
                    <b-button
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

                    <!-- <b-button
                      size="sm"
                      variant="light"
                      class="ml-2"
                    >
                      <i class="fa fa-eye font-size-18"></i>
                    </b-button> -->
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
    <slot name="pagination" />
  </div>
  <!-- end table -->
</template>
