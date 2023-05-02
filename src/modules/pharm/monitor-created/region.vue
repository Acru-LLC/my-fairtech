<template>
    <div class="card mb-0">
        <div class="card-body">
            <b-row>
                <b-col class="font-weight-bold p-3 pl-5">
                    {{ $t('choose_department') }}
                </b-col>
                <b-col class="pr-5 text-sm-end">
                    <b-button variant="outline-danger" @click="$emit('close')">
                        <i class="fa fa-times"></i>
                        {{ $t("actions.close") }}
                    </b-button>&nbsp;
                    <b-button variant="success" @click="save">
                        <i class="fa fa-save"></i>
                        {{ $t("actions.save") }}
                    </b-button>
                </b-col>
            </b-row>
        </div>
        <div class="px-4 pb-4">
            <simplebar
                    :key="cmpKey + 'ADS'"
                    :style="`height:${heightWindow - 165}px`"
                    id="contact-list"
                    ref="contactsRef"
                    data-simplebar-auto-hide="false"
            >
                <ul id="il" class="list-unstyled chat-list">
                    <li
                            v-for="(data, index) in regionList"
                            :id="regionList[regionList.length - 1].id == data.id ? 'lid' : ''"
                            :key="data.id + 'EMPLOYEE' + index"
                            @click="pushMember(data)"
                    >
                        <a href="javascript: void(0);">
                            <div class="media d-flex" style="align-items: center">
                                <div class="align-self-center mr-3"></div>
                                <div class="avatar-sm align-self-center mr-3">
                                    <span class="avatar-title rounded-circle bg-soft-primary text-white"></span>
                                </div>
                                <div class="media-body overflow-hidden">
                                    <p class="m-0" :class="check(data)">
                                        {{
                                        getName({
                                          nameLt: data.parentNameLt,
                                          nameRu: data.parentNameRu,
                                          nameUz: data.parentNameUz,
                                        })
                                        }}
                                    </p>
                                    <p class="m-0" :class="check(data)">
                                        {{
                                        getName({
                                          nameLt: data.nameLt,
                                          nameRu: data.nameRu,
                                          nameUz: data.nameUz,
                                        })
                                        }}
                                    </p>
                                </div>
                                <i v-if="check(data)" class="fas fa-check font-size-18 text-primary"></i>
                            </div>
                        </a>
                    </li>
                </ul>
            </simplebar>
        </div>
    </div>
</template>

<script>
import helperService from "../pharmService";
import simplebar from "simplebar-vue";

export default {
    props: {
        notIn: {
            type: Boolean,
            default: false,
        },
        async: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        simplebar,
    },
    data() {
        return {
            regionList: [],
            contactPage: 0,
            members: [],
            objectMembers: {},
            groupModal: false,
            searchValue: "",
            cmpKey: 0,
        };
    },
    methods: {
        reset() {
            this.cmpKey += 1;
            setTimeout(() => {
                this.scrollActive();
            }, 200);
        },
        scrollActive() {
            if (this.$refs.contactsRef.SimpleBar) {
                this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
                    "scroll",
                    (e) => {
                        let { scrollTop, scrollHeight, clientHeight } = event.target;
                        const offsetForTrigger = 1;
                        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
                            // this.loadMoreContact();
                        }
                    }
                );
            }
        },
        save() {

            this.$emit("save", this.objectMembers);
            this.objectMembers = {};
        },
        pushMember(v) {
            if (v.id == this.objectMembers.id) {
                this.objectMembers = {};
            } else {
                this.objectMembers = v;
            }
        },
        check(v) {
            if (this.objectMembers.id == v.id) {
                return ["font-weight-bold", "text-primary"];
            } else {
                return false;
            }
        },
        getRegions(v) {
            helperService.getRegions().then((res) => {
                this.$nextTick(() => {
                    this.regionList = res.data;
                });
            });
        },
    },
    mounted() {
        var container3 = document.querySelector(
            "#contact-list .simplebar-content-wrapper"
        );
        if (container3) {
            container3.scrollTo({ top: 500, behavior: "smooth" });
        }

        // Contact list actions

        this.scrollActive();
    },
    async created() {
        await this.getRegions();
    },
    watch: {
        // objectMembers: {
        //   async handler(v) {
        //     if (this.async) {
        //       this.$emit("asyncValue", v);
        //     }
        //   },
        // },
    },
};
</script>

<style>
</style>
