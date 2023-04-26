<template>
    <tr>
        <!-- <slot name="check"></slot> -->
        <slot name="index"></slot>
        <td
            class="text-center p_cursor"
            :class="classCheck"
        >
            {{
        getName({ nameLt: data.departmentNameLt,nameUz: data.departmentNameUz, nameRu: data.departmentNameRu })
      }}
        </td>

        <td class="text-center p_cursor">
            <p
                class="pre m-0 d-flex align-items-center justify-content-center"
                :class="classCheck"
            >
                <img
                    class="avatar-sm rounded-circle mr-2"
                    :src="`${publicPath}/${data.employeeUploadPath}`"
                    alt=""
                />
                <span>
                    {{
            `${data.employeeLastName} ${data.employeeFirstName} ${data.employeeParentName}`
          }}
                </span>
            </p>
        </td>

        <td class="text-center p_cursor">
            <p
                class="pre m-0"
                :class="classCheck"
            >
                {{ data.reportDate }}
            </p>
        </td>
        <td class="text-center p_cursor">
            <b-badge
                :variant="getVariant(data.status, data.forSign)"
                class="pre"
            >
                {{ getLabel(data.status, data.forSign) }}
            </b-badge>
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
            <b-button
                @click="$emit('clickTr', data)"
                variant="primary"
            >
                <i class="fa fa-eye"></i>
                {{ $t("actions.view") }}
            </b-button>
        </td>
        <!-- <slot name="actions"></slot> -->
    </tr>
</template>

<script>
// import { getName } from "@/helper";
export default {
    methods: {
        getLabel (st, forSign) {
            if (st == "SEND") {
                return this.$t("forConfirm");
            } else if (forSign && st == "SIGN") {
                return this.$t(`docs_r.${st}`);
            } else if (!forSign && st == "SIGN") {
                return this.$t(`docs_r.forSign`);
            } else {
                return this.$t(`docs_r.${st}`);
            }
        },
        getVariant (st, forSign) {
            if (st == "CANCEL") {
                return "danger";
            } else if (st == "CANCELED") {
                return "danger";
            } else if (st == "SIGN" && forSign) {
                return "success";
            } else if (st == "SIGN" && !forSign) {
                return "primary";
            } else if (st == "APPROVED") {
                return "success";
            } else {
                return "primary";
            }
        },
    },
    data () {
        return {
            publicPath: process.env.BASE_URL,
            // getName: getName,
        };
    },
    props: ["data", "classCheck"],
};
</script>

<style>
</style>