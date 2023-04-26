<script>
import Tr from "./tr";
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
  components: {
    Tr,
  },
};
</script>

<template>
  <div>
    <div class="table-responsive mb-0">
      <b-overlay  :opacity="0.1"   :show="loading" rounded="sm">
        <table class="table table-centered table-nowrap table-custom-bordered">
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
                <template v-slot:actions>
                  <td class="text-center">
                    <i
                      class="bx bx-edit font-size-18 p_cursor text-hover-primary"
                      @click="$emit('showModal', 'edit', data)"
                    ></i>
                    <i
                      class="bx bx-trash ml-2 font-size-18 p_cursor text-hover-danger"
                      @click="$emit('showModal', 'delete', data)"
                    ></i>
                  </td>
                </template>
              </Tr>
            </template>
            <tr class="text-center" v-if="list.length == 0">
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
          </tbody>
        </table>
      </b-overlay>
    </div>
    <slot name="pagination" />
  </div>
  <!-- end table -->
</template>