<template>
  <tr>
    <slot name="index"></slot>
    <td>
      <h5 class="font-size-14 m-0">
        <span class="text-muted">
          {{
            `${getName({
              nameLt: data.parentNameLt,
              nameRu: data.parentNameRu,
              nameUz: data.parentNameUz,
            })}`
          }}
        </span>
        -
        <span class="text-primary font-weight-bold">
          {{
            `${getName({
              nameLt: data.nameLt,
              nameRu: data.nameRu,
              nameUz: data.nameUz,
            })}`
          }}
        </span>
      </h5>
    </td>

    <td>

    </td>

    <slot name="actions"></slot>
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
};
</script>

<style>
</style>