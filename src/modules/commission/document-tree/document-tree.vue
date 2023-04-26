<template>
    <b-row>
        <b-col>
            <b-card>
                <div
                    class="card-body p-0"
                    style="overflow: auto;"
                >
                    <h4 class="card-title mb-4"><b>{{ $t( 'submodules.doc.tab_doc_tree' ) }}</b></h4>
                    <!-- <h5 v-if="currentDocument && currentDocument.id">
                        <i class="fa fa-clock text-primary"></i>
                        {{currentDocument.dateOfCreated ? currentDocument.dateOfCreated : ''}} <span class="text-primary">#</span>
                        <i>{{currentDocument.fromEmployee}}</i> (Registered)
                    </h5> -->
                    <v-jstree
                        v-if="documentTreeArray[0] && documentTreeArray[0].id"
                        :data="documentTreeArray"
                        whole-row
                        text-field-name="fromEmployee"
                    >
                        <template slot-scope="_">
                            <div @click.exact="customItemClick(_.vm, _.model, $event)">
                                <p>
                                    <i class="fa fa-clock text-primary"></i>
                                    {{_.model.dateOfCreated ? _.model.dateOfCreated : ''}} <span class="text-primary">#</span>
                                    <i>{{_.model.fromEmployee}}</i> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span class="text-primary">
                                        {{getName({nameLt: _.model.mailingPurposeNameLt, nameUz: _.model.mailingPurposeNameUz, nameRu: _.model.mailingPurposeNameRu})}}
                                    </span> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <i>
                                        {{_.model.toEmployee}} (<span class="text-primary">{{getName({nameLt: _.model.processNameLt, nameUz: _.model.processNameUz, nameRu: _.model.processNameRu})}}</span>)</i>
                                </p>

                            </div>
                        </template>
                    </v-jstree>
                </div>
            </b-card>
        </b-col>
    </b-row>
</template>
<script>
// import MyDocumentService from "../../../services/document/mydocument.service";
import VJstree from 'vue-jstree'
import helperService from '@/shared/services/helper.service';

export default {
    props: {
        docId: {
            type: String
        }
    },
    components: {
        VJstree
    },
    name: "DocumentTree",
    data () {
        return {
            currentDocument: {},
        }
    },
    methods: {
        async getDocumentTree () {
            this.$emit('toggleLoading', true)
            helperService.getApplicationTree(this.docId)
                .then(res => {
                    this.currentDocument = res.data
                    // this.currentDocument.children = this.currentDocument.children.map(function f (o) {
                    //     vm.$set(o, 'opened', true)
                    //     // o.opened = true
                    //     if (o.children && o.children.length) {
                    //         o.children.map(f)
                    //     }
                    //     return o
                    // })
                })
                .finally(() => {
                    this.$emit('toggleLoading', false)
                })
            /* await MyDocumentService.getDocumentTree( this.docId ).then( response => {
              this.currentDocument = response.data
            } ).catch( (e) => {
              this.$myMakeToast(
                  this.$globalCreateErrorMessageFromArray(
                      this.$getArrayFromArrayList( Object.values( e.response.data.errors ) ) ),
                  this.$t( "actions.error" ),
                  "danger"
              );
            } ); */
        },
        customItemClick (obj, model, event) {
            this.$set(model, 'opened', !model.opened)
            // model.opened = !model.opened
        },
        recursiveCreateNode (node, assignments = false, batches = false) {
            let currentTreeNode = {
                text: `<i class="fa fa-clock text-primary"></i>
                                                ${node.processDate} <span class="text-primary">#</span> `,
                children: [],
                opened: true,
            };
            if (assignments) {
                currentTreeNode.text += `<i>${node.fromUser}</i>  <i
                                                        class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span
                                                        class="text-primary">
                                                       ${node.mailingPurpose}
                                                    </span> <i class="fa fa-arrow-right text-success ml-1 mr-1"></i> <i>
                                                    ${node.toUser} (<span class="text-primary">${node.process}</span>`;
                if (node.message) {
                    currentTreeNode.text += ` - <span class="text-success">${node.message}</span>`
                }
                currentTreeNode.text += `)`;
            } else if (batches) {
                currentTreeNode.text += `<i>${node.user}</i> <i
                                                        class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span
                                                        class="text-primary">
                                                       ${node.process}
                                                    </span>`;
            } else {
                currentTreeNode.text += `<i>${node.user}</i> <i
                                                        class="fa fa-arrow-right text-success ml-1 mr-1"></i> <span
                                                        class="text-primary">
                                                        ${node.process}
                                                    </span>`;
            }


            if (node.assignments && node.assignments.length) {
                node.assignments.forEach(el => {
                    currentTreeNode.children.push(this.recursiveCreateNode(el, true))
                })
            }

            if (node.batches && node.batches.length) {
                node.batches.forEach(el => {
                    currentTreeNode.children.push(this.recursiveCreateNode(el, false, true))
                })
            }

            return currentTreeNode;
        }
    },
    async created () {
        if (this.docId) {
            await this.getDocumentTree()
        }
    },
    computed: {
        documentTreeArray () {
            // let correctBatchesTree = [];
            // this.currentDocument.batches.forEach(treeElement => {
            //     correctBatchesTree.push(this.recursiveCreateNode(treeElement, false, true))
            // });

            // let correctAssignmentsTree = [];
            // this.currentDocument.assignments.forEach(treeElement => {
            //     correctAssignmentsTree.push(this.recursiveCreateNode(treeElement, true))
            // });
            let vm = this
            let copyOfData = Object.assign({}, this.currentDocument)
            if (copyOfData.children) {
                copyOfData.children = copyOfData.children.map(function f (o) {
                    vm.$set(o, 'opened', true)
                    // o.opened = true
                    if (o.children && o.children.length) {
                        o.children.map(f)
                    }
                    return o
                })
            }
            this.$set(copyOfData, 'opened', true)
            return [copyOfData];
        },
    },
    /* 
    WATCH */
    watch: {
        docId: {
            handler () {
                this.getDocumentTree()
            }
        }
    }
}
</script>
