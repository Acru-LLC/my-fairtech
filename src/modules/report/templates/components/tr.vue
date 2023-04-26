<template>
  <tr class="tr-text-center">
    <slot name="index"></slot>
    <slot name="name" class="m-0 pre text-center" style="width:23%"></slot>

    <td style="width:18%">
      <p class="m-0 pre text-center">
        {{ getName({nameLt: data.titleLt, nameUz: data.titleUz, nameRu: data.titleRu}) }}
      </p>
    </td>

    <td style="width:13%">
      <p class="m-0 pre text-center">
        {{ getName({nameLt: data.conditionLt, nameUz: data.conditionUz, nameRu: data.conditionRu}) }}
      </p>
    </td>
    <td style="width:20%">
      <p class="m-0 pre text-center">
        {{ getName({nameLt: data.returnableDepartmentNameLt, nameUz: data.returnableDepartmentNameUz, nameRu: data.returnableDepartmentNameRu}) }}
      </p>
    </td>
    <td style="width:8%"> {{ data.createdDate }}</td>
    <slot style="width:5%" name="status"></slot>
    <slot style="width:12%" name="actions"></slot>
  </tr>
</template>

<script>
// import { getName } from "@/helper";
export default {
  data() {
    return {
      // getName: getName,
    };
  },
  props: ["data"],
  watch: {
    'data.statusId': {
      handler() {

      }
    }
  }
};
</script>

<style>
</style>
