<template>
    <div
        class="card border mb-0"
    >
        <div class="card-body" style="min-height: 300px">
            <b-button
                @click="$emit('addPart')"
                variant="primary"
                class="pt-1 mb-4 pb-1 pr-2 pl-2"
            >
                <i class="fa fa-user-plus"></i>
                {{ $t("actions.add") }}
            </b-button>

          <b-button
              v-b-tooltip.hover
              :title="$t('submodules.employees.working_user_Add_No_with_project')"
              variant="warning"
              class="pt-1 mb-4 pb-1 pr-2 pl-2 ml-2"
          >
            <i class="bx bx-bell"></i>
            {{ $t("note_bell") }}
          </b-button>

            <div class="">
                <table class="table table-centered">
                    <tbody v-if="members.length > 0">
                        <tr
                            v-for="(member, index) in members"
                            :key="index + 'AD'"
                        >
                            <td style="width: 50px">
                                <img
                                    v-if="member.uploadPath"
                                    :src="`${hrUrl}/${member.uploadPath}`"
                                    class="rounded-circle avatar-xs"
                                    alt
                                />
                                <div
                                    v-else
                                    class="avatar-xs mr-3"
                                >
                                    <span class="avatar-title rounded-circle bg-soft-primary text-white font-size-16">
                                        {{ `${member.employeeFullName.charAt(0)}` }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <h5 class="font-size-14 m-0">
                                    <p class="text-dark m-0">
                                        {{ `${member.employeeFullName}` }}
                                    </p>
                                </h5>
                                <p class="m-0 text-muted">
                                    {{
                    getName({
                      nameLt: member.departmentNameLt,
                      nameRu: member.departmentNameRu,
                      nameUz: member.departmentNameUz,
                    })
                  }}
                                </p>
                                <p class="m-0 text-muted">
                                    {{
                    getName({
                      nameLt: member.positionNameLt,
                      nameUz: member.positionNameUz,
                      nameRu: member.positionNameRu,
                    })
                  }}
                                </p>
                            </td>
                            <td style="width: 400px;">
                                <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    v-model="member.mailingPurposeId"
                                    :options="mailingPurposes.map(e => e.id)"
                                    :label="$t('submodules.mailing_purpose.title')"
                                    label-on-top
                                    placeholder=""
                                    :custom-label="customLabelMailingPurpose"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                ></BaseMultiselectWithValidation>
                            </td>
                            <!-- <td style="width: 200px;">
                                <BaseTextareaWithValidation
                                    not-required
                                    v-model="member.resolution"
                                    max-rows="2"
                                    label-on-top
                                    :label="$t('column.resolution')"
                                />
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import crudAndListsService from "@/shared/services/crud_and_list.service"
import { g_name } from "@/helper";
export default {
    data () {
        return {
            g_name: g_name,
            mailingPurposes: [],
        };
    },
    props: {
        members: {
            type: Array,
            default: () => [],
        },
        submitted: {
            type: Boolean,
            default: true,
        },
    },
    /* 
    METHODS */
    methods: {
        customLabelMailingPurpose (opt) {
            let selected = this.mailingPurposes.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })
                    }`
            }
            return ``;
        },
    },
    /* 
    CREATED */
    created () {
        // FETCH MAILING_PURPOSE
        crudAndListsService.searchList('before-commission/directory/mailing-purpose', this.var_default_search_payload, null, true)
            .then(res => {
                this.mailingPurposes = res.data.list
            })
            .catch(e => {
                console.log(e)
            })
    }
};
</script>

<style lang="scss">
.sidebar1 {
    .b-sidebar {
        width: 500px;
        background: white;
    }
}
</style>