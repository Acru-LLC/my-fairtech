<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <div class="search-box me-2 mb-2 d-inline-block">
                                <div class="position-relative">
                                    <input
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('column.search')"
                                    />
                                    <i class="bx bx-search-alt search-icon"></i>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-sm-3">
                            <div class="text-sm-end">
                                <h4>{{ $t('submodules.roles.title') }}</h4>
                            </div>
                        </div> -->
                        <div class="col-sm-6">
                            <div class="text-sm-end">
                                <b-btn
                                    type="button"
                                    class="btn btn-success btn-rounded mb-2 me-2"
                                    :to="addBtnLink"
                                >
                                    <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                                </b-btn>
                            </div>
                        </div>
                        <!-- end col-->
                    </div>
                    <!-- Table data -->
                    <b-table v-bind="$attrs">

                        <slot></slot>

                        <!-- EMPTY SLOT -->
                        <template #empty="">
                            <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                        </template>

                        <!-- TABLE_BUSY SLOT -->
                        <template #table-busy>
                            <div class="text-center my-2">
                                <b-spinner variant="primary" class="align-middle"></b-spinner>
                                
                            </div>
                        </template>
                    </b-table>

                    <!-- end table -->
                    <b-pagination
                        v-model="searchPayload.page"
                        :total-rows="totalItems"
                        :per-page="searchPayload.itemsPerPage"
                        aria-controls="my-table"
                        class="justify-content-end"
                    ></b-pagination>
                </div>
                <!-- end card-body -->
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
</template>

<script>
export default {
    name: "BaseIndexPageWithTableWrapper",
    /*
    * PROPS */
    props: {
        totalItems: {
            type: Number,
            default: 0
        },
        searchPayload: {
            type: Object,
            default: () => { }
        },
        hasSearchInput: {
            type: Boolean,
            default: false
        },
        hasAddNewBtn: {
            type: Boolean,
            default: false
        },
        addBtnLink: {
            type: [Object, String],
            default: '#'
        }
    },
    /* 
    METHODS */
    methods: {

    }
};
</script>

<style scoped>
</style>
