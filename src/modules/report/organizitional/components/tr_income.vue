<template>
  <tr>
    <!-- <slot name="check"></slot> -->
    <slot name="index"></slot>
    <td @click="$emit('clickTr', data)" class="text-center p_cursor">
      <b-badge :variant="getVariant(data.status, data.forSign)" class="pre">
        {{ getLabel(data.status, data.forSign) }}
      </b-badge>
    </td>
    <td
      @click="$emit('clickTr', data)"
      class="text-center p_cursor"
      :class="classCheck"
    >
      {{ data.reportDate }}
    </td>
    <slot name="name" ></slot>
    <td @click="$emit('clickTr', data)" class="text-center p_cursor">
      <p class="pre m-0" :class="classCheck">
        {{
          getName({ nameLt: data.docTableTitleLt,  nameUz: data.docTableTitleUz, nameRu: data.docTableTitleRu })
        }}
      </p>
    </td>

    <td @click="$emit('clickTr', data)" class="text-center p_cursor">
      <p class="pre m-0" :class="classCheck">
        {{
          getName({
            nameLt: data.dateTypeNameLt,
            nameRu: data.dateTypeNameRu,
            nameUz: data.dateTypeNameUz,
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
    <!-- <slot name="actions"></slot> -->
  </tr>
</template>

<script>
// import { getName } from "@/helper";
export default {
  methods: {
    getLabel(st, forSign) {
      if (st === "SEND") {
        return this.$t("docs_r.forConfirm");
      } else if (forSign && st === "SIGN") {
        return this.$t(`docs_r.${st}`);
      } else if (!forSign && st === "SIGN") {
        return this.$t(`docs_r.forSign`);
      } else {
        return this.$t(`docs_r.${st}`);
      }
    },
    getVariant(st, forSign) {
      if (st === "CANCEL") {
        return "danger";
      } else if (st === "CANCELED") {
        return "danger";
      } else if (st === "SIGN" && forSign) {
        return "success";
      } else if (st === "SIGN" && !forSign) {
        return "primary";
      } else if (st === "APPROVED") {
        return "success";
      } else {
        return "primary";
      }
    },
  },
  data() {
    return {
      // getName: getName,
    };
  },
  props: ["data", "classCheck"],
};
</script>

<style>
</style>
