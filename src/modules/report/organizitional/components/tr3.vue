<template>
  <tr @click="$emit('clickTr', data)" class="tr-text-center p_cursor">
    <slot name="index"></slot>
<!--    <slot name="docName"></slot>-->
    <td>{{ data.reportDate }}</td>
    <slot name="name"></slot>

    <td>
      <p class="pre m-0">
        {{
          getName({ nameLt: data.docTableTitleLt,nameUz: data.docTableTitleUz, nameRu: data.docTableTitleRu })
        }}
      </p>
    </td>

    <td>
      <p class="pre m-0">
        {{
          getName({
            nameLt: data.dateTypeNameLt,
            nameRu: data.dateTypeNameRu,
          })
        }}
      </p>
    </td>
    <td class="text-wrap">
      {{getName({
      nameLt: data.yurDepNameLt,
      nameRu: data.yurDepNameRu,
      nameUz: data.yurDepNameUz,
    })}}
    </td>
    <td class="text-wrap">{{ data.createdDate }}</td>
    <td class="text-center">
      <b-badge class="pre" :variant="getVariant(data.status)">
        {{ getLabel(data.status) }}
      </b-badge>

    </td>
    <slot name="actions"></slot>
  </tr>
</template>

<script>
// import { getName } from "@/helper";
export default {
  methods: {
    getVariant(st) {
      if (st == "CANCEL") {
        return "danger";
      } else if (st == "CANCELED") {
        return "danger";
      } else if (st == "SIGN") {
        return "success";
      } else if (st == "APPROVED") {
        return "success";
      } else {
        return "primary";
      }
    },
    getLabel(st) {
      return this.$t(`docs_r.${st}`);
    },
  },
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
