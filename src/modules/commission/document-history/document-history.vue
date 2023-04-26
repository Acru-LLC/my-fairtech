<template>
    <b-row>
        <b-col>
            <b-card>
                <div class="card-body p-0">
                    <h4 class="card-title mb-4"><b>{{$t('submodules.doc.tab_doc_history')}}</b></h4>
                    <div
                        class
                        v-if="documentHistories && documentHistories.length"
                    >
                        <ul class="verti-timeline list-unstyled">
                            <li
                                class="event-list"
                                style="padding: 0 0 10px 20px;"
                            >
                                <div class="event-timeline-dot">
                                    <i class="bx bx-right-arrow-circle h2 text-primary"></i>
                                </div>
                                <div class="media">
                                    <div class="media-body">
                                        <div>
                                            <p class="my-p-margin-top-3">
                                                <i class="fa fa-clock text-primary"></i>
                                                {{documentHistories[0].dateOfCreated ? documentHistories[0].dateOfCreated : ''}} <span class="text-primary">#</span>
                                                <i>{{documentHistories[0].fromEmployee}}</i> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span class="text-primary">
                                                    Регистрация
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                class="event-list"
                                style="padding: 0 0 10px 20px;"
                                v-for="(el,index) in documentHistories"
                                :key="index"
                            >
                                <div class="event-timeline-dot">
                                    <i class="bx bx-right-arrow-circle h2 text-primary"></i>
                                </div>
                                <div class="media">
                                    <div class="media-body">
                                        <div>
                                            <p class="my-p-margin-top-3">
                                                <!-- <template v-if="!el.directionTypeId"> -->
                                                <i class="fa fa-clock text-primary"></i>
                                                {{el.dateOfCreated ? el.dateOfCreated : ''}} <span class="text-primary">#</span>
                                                <i>{{el.fromEmployee}}</i> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span class="text-primary">
                                                    {{getName({nameLt: el.mailingPurposeNameLt, nameUz: el.mailingPurposeNameUz, nameRu: el.mailingPurposeNameRu})}}
                                                </span> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <i>
                                                    {{el.toEmployee}}</i>
                                                <!-- </template> -->
                                                <!--                                                >New common language will be more simple and regular than the existing.</p>-->
                                                <!-- <template v-else-if="el.directionTypeId === 2">
                                                    <i> {{el.userInfo}}</i> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span class="text-primary">
                                                        {{el.documentHistoryTypeId == 1
                            ? (el.status ?
                                el.status : el.process ) : el.assignmentProcess }}
                                                    </span>
                                                    <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <i>
                                                        {{el.documentHistoryTypeId == 2 ?
                            (el.assignmentToUser ? el.assignmentToUser : "") :
                            (el.assignmentFromUser ? el.assignmentFromUser : "")
                          }} <span
                                                            class="text-success"
                                                            v-if="el.resolution"
                                                        >({{el.resolution}})</span>
                                                    </i>
                                                </template>
                                                <template v-else-if="el.directionTypeId === 1">
                                                    <i> {{el.userInfo}}</i> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <b>{{el.documentHistoryTypeId
                        == 1
                            ? (el.status ?
                                el.status : el.process ) : el.assignmentProcess }}</b> <span
                                                        class="text-success"
                                                        v-if="el.message"
                                                    >({{el.message}})</span>
                                                </template> -->
                                            </p>
                                            <!--                                                <p-->
                                            <!--                                                        class="text-muted"-->

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </b-card>
        </b-col>
    </b-row>
</template>
<script>
// import MyDocumentService from "../../../services/document/mydocument.service";
import helperService from '@/shared/services/helper.service'
export default {
    props: {
        docId: {
            type: String
        }
    },
    name: "DocumentHistory",
    data () {
        return {
            documentHistories: []
        }
    },
    methods: {
        async getDocumentHistory () {
            this.$emit('toggleLoading', true)
            helperService.getApplicationTree(this.docId)
                .then(async (res) => {
                    this.documentHistories = []
                    this.documentHistories.push(res.data)
                    let arrFromRecursion = []
                    arrFromRecursion = await this.bfs(res.data, "children", [])
                    this.documentHistories.push(...arrFromRecursion)
                    console.log(this.documentHistories)
                })
                .finally(() => {
                    this.$emit('toggleLoading', false)
                })
            /* await MyDocumentService.getDocumentHistory(this.docId).then(response => {
              this.documentHistories = response.data
            }).catch((e) => {
              this.$myMakeToast(
                  this.$globalCreateErrorMessageFromArray(
                      this.$getArrayFromArrayList(Object.values(e.response.data.errors))),
                  this.$t("actions.error"),
                  "danger"
              );
            }); */
        },
        async bfs (tree, key, collection) {
            if (!tree[key] || tree[key].length === 0) return collection;
            for (var i = 0; i < tree[key].length; i++) {
                var child = tree[key][i]
                collection.push(child);
                await this.bfs(child, key, collection);
            }
            return collection;
        }
    },
    async created () {
        if (this.docId) {
            await this.getDocumentHistory()
        }
    },
    /* 
    WATCH */
    watch: {
        docId: {
            handler () {
                this.getDocumentHistory()
            }
        }
    }
}
</script>
