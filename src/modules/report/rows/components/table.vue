<script>
import Tr from "./tr";

export default {
    watch: {
        selectedRow: {
            handler (v) {
                this.$emit("setRow", v);
            },
        },
        page: {
            handler (v) {
                this.$emit("changePage", v);
            },
        },
    },
    data () {
        return {
            selectedRow: [],
        };
    },
    methods: {
        pushData (data) {
            let found = this.selectedRow.findIndex((e) => e.id == data.id);
            if (found > -1) {
                this.selectedRow.splice(found, 1);
            } else {
                this.selectedRow.push(data);
            }
        },
        reset (array = []) {
            this.selectedRow = array;
        },
        getClass (data) {
            let found = this.selectedRow.find((e) => e.id == data.id);
            return found;
        },
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
    components: {
        Tr,
    },
};
</script>

<template>
    <div>
        <div class="table-responsive mb-0">
            <b-overlay
                :opacity="0.1"
                :show="loading"
                rounded="sm"
            >
                <table class="
            table
            table-centered
            table-nowrap
            table-hovered
            table-custom-bordered
          ">
                    <thead class="thead-light">
                        <slot name="thead" />
                    </thead>
                    <tbody>
                        <template v-for="(data, index) in list">
                            <Tr
                                class="effect"
                                :class="getClass(data) ? 'table-primary' : ''"
                                @pushData="pushData"
                                :index="index"
                                :key="data.id + 'c-1'"
                                :data="data"
                            >
                                <template v-slot:index>
                                    <td
                                        class="text-center"
                                        @click.prevent="pushData(data)"
                                    >
                                        <strong>{{ util_paginate( index, limit, page - 1 ) }}</strong>
                                    </td>
                                </template>
                                <template v-slot:actions>
                                    <!-- <td class="text-center"> -->
                                    <td
                                        v-if="!sidebar"
                                        class="text-center"
                                    >
                                        <i
                                            class="
                        bx bx-edit
                        font-size-18
                        p_cursor
                        text-hover-primary
                      "
                                            @click="$emit('showModal', 'edit', data)"
                                        ></i>
                                        <i
                                            class="
                        bx bx-trash
                        ml-2
                        font-size-18
                        p_cursor
                        text-hover-danger
                      "
                                            @click="$emit('showModal', 'delete', data)"
                                        ></i>
                                    </td>
                                </template>
                            </Tr>
                        </template>
                        <tr
                            class="text-center"
                            v-if="list.length == 0"
                        >
                            <td
                                colspan="9"
                                :style="loading ? 'height:50px' : 'height:40px'"
                                style="vertical-align: middle"
                            >
                                <h6 class="m-0">
                                    {{ $t( "messages.data_not_found" ) }}
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
<style lang="css" scoped>
.effect:hover {
  color: #3455f1;
}
</style>