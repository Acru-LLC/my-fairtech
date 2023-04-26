<template>
  <div style="margin-bottom: 25px; z-index: 10;">
    <div
        :style="
        !_empty(board.color)
          ? `border-top:5px solid ${board.color}`
          : 'border-top:5px solid white'
      "
        class="card mb-0 bg-white"
    >
      <div class="card-header pl-4 pr-4 pt-3 bg-white column-drag-handle">
        <!-- dropdown -->
        <b-dropdown
            v-if="proj.isAdmin"
            class="float-right"
            right
            toggle-class="p-0"
            variant="white"
        >
          <template slot="button-content">
            <i class="mdi mdi-dots-vertical m-0 text-muted h5"></i>
          </template>
          <b-dropdown-item @click="editBoard(board)">{{
              $t("actions.edit")
            }}
          </b-dropdown-item>
          <b-dropdown-item @click="deleteBoard(board)">{{
              $t("actions.delete")
            }}
          </b-dropdown-item>
        </b-dropdown>
        <span class="drag-column-header">
          <h4 class="card-title pb-1">{{ board.name }}</h4>
        </span>
      </div>
      <div class="card-body pt-0">
        <simplebar
            :id="'list-' + board.id"
            :key="componentKey + board.id + board.name"
            :ref="board.id + '-Ref'"
            style="max-height: 45vh; overflow: auto"
        >
          <Container
              :drop-placeholder="dropPlaceholderOptions"
              :get-child-payload="getCardPayload"
              :get-ghost-parent="getGhostParent"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              group-name="task"
              @drop="onCardDrop"
              @drop-ready="onDropReady"
          >
            <Draggable
                v-for="task in board.projectTaskCardsDto"
                :key="task.id + 'TASKDRAGGABLE'"
                class="dragEl"
                style="cursor: move"
            >
              <div
                  :style="
                  !_empty(task.color)
                    ? `border-left:3px solid ${task.color}`
                    : 'border-left:3px solid white'
                "
                  class="card task-box itemDrag"
              >
                <div
                    v-if="task.uploadPath"
                    class="mb-1 text-center"
                    style="width: 100%"
                >
                  <div
                      :style="`background-image: url(${baseUrl}/${task.uploadPath})`"
                      alt
                      class="img-thumbnail"
                      style="background-size: cover; height: 150px"
                      width="100%"
                  />
                </div>
                <div class="card-body" style="position: relative">
                  <div>
                    <h5 class="font-size-13">
                      {{ task.name }}
                    </h5>
                  </div>
                  <div class="team float-left">
                    <b-avatar-group size="28px">
                      <b-avatar
                          v-for="(m, index) in replaceStringToArray(
                          task.employeesUploadPath
                        )"
                          v-show="task.countEmployees > 0"
                          :key="index"
                          :src="`${hrUrl}/${m}`"
                          variant="info"
                      ></b-avatar>
                    </b-avatar-group>

                    <div class="p-2" style="cursor: pointer">
                      <div class="d-flex" style="flex-direction: row">
                        <b-button
                            v-b-tooltip.hover.top
                            :title="$t('actions.delete')"
                            class="pl-1 pr-1 pb-0 pt-1 p_cursor"
                            variant="light"
                            @click.prevent="deleteTask(task)"
                        >
                          <i class="bx bx-trash font-size-15"></i>
                        </b-button>

                        <b-button
                            v-b-tooltip.hover.top
                            :title="$t('actions.edit')"
                            class="pl-1 p_cursor pr-1 pb-0 pt-1 mr-1 ml-1"
                            variant="light"
                            @click.prevent="editTask(task)"
                        >
                          <i class="bx bx-edit font-size-15"></i>
                        </b-button>

                        <b-button
                            v-b-tooltip.hover.top
                            :title="$t('actions.add_employee')"
                            class="pl-1 p_cursor pr-1 pb-0 pt-1"
                            variant="light"
                            @click="
                            $emit('toggleModal', { task: task, board: board })
                          "
                        >
                          <i class="bx bx-user-plus font-size-15"></i>
                        </b-button>
                        <b-button
                            v-b-tooltip.hover.top
                            :title="$t('cmts')"
                            class="pl-1 p_cursor pr-1 pb-0 pt-1 ml-1"
                            variant="light"
                            @click="$emit('clickCardTask', task)"
                        >
                          <i class="bx bx-comment font-size-15"></i>
                        </b-button>
                      </div>
                    </div>

                    <div class="pre text-muted font-weight-bold mt-1">
                      <b-badge class="p-2" variant="soft-primary">
                        <i class="fa fa-user"></i>
                        <span>
                          {{
                            `${task.ownerLastName} ${task.ownerFirstName} ${task.ownerParentName}`
                          }}</span
                        >
                      </b-badge>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </Container>
        </simplebar>
        <div class="card-footer bg-white">
          <a
              class="btn btn-primary btn-block mt-3"
              @click="createTask(board.id)"
          >
            <i class="mdi mdi-plus mr-1"></i>
            {{ $t("create_new_task") }}
          </a>
        </div>
      </div>
    </div>
    <create-task
        ref="file"
        :cmt="true"
        :name="true"
        :save="true"
        @sendFile="saveFile"
    />
    <create-task
        ref="fileEdit"
        :cmt="true"
        :edit="true"
        :item="item"
        :name="true"
        @sendFile="editFile"
    />
  </div>
</template>


<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
import {Container, Draggable} from "vue-smooth-dnd";
import CreateTask from "./create-task";

export default {
  props: ["board", "indexB", "proj"],
  watch: {
    file: {
      handler(v) {
        if (v) {
          this.fileModal = true;
        }
      },
    },
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      componentKey: 1,
      boardDraggedItem: null,
      item: null,
      fileModal: false,
      task: "",
      file: null,
      params: {
        page: 0,
        itemsPerPage: 10,
      },
      tasks: [],
      taskPage: 0,
      bId: null,
      drag: false,
    };
  },
  components: {
    simplebar,
    Draggable,
    Container,
    CreateTask,
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghostB",
      };
    },
  },
  methods: {
    onDropReady(dropResult) {
      if (dropResult.removedIndex != null) {
        this.$emit("setSourceId", this.board, dropResult);
      }
    },
    getGhostParent() {
      return document.body;
    },
    getCardPayload(i) {
      return (index) => {
        return this.board.projectTaskCardsDto[i];
      };
    },

    onCardDrop(e) {
      if (e.addedIndex !== null) {
        let payload = {
          indexBefore: 0,
          indexAfter: 0,
          projectTaskCardId: e.payload().id,
        };
        let currentIndex = e.addedIndex;
        let afterItem = this.board.projectTaskCardsDto[currentIndex + 1];
        let beforeItem = this.board.projectTaskCardsDto[currentIndex - 1];
        if (beforeItem) {
          this.$set(payload, "indexBefore", beforeItem.id);
        }
        if (afterItem) {
          this.$set(payload, "indexAfter", afterItem.id);
        }
        projectService
          .changeIndexCard(this.board.id, payload)
          .then(async (rs) => {
            if (rs.data) {
              if (e.removedIndex !== null) {
                this.$emit(
                  "pushByIndex",
                  this.board.id,
                  e,
                  beforeItem,
                  afterItem
                );
              } else {
                this.$emit(
                  "pushByIndex",
                  this.board.id,
                  e,
                  beforeItem,
                  afterItem
                );

                this.$emit("removeByIndex");
              }
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      }
    },
    forceRerender() {
      this.componentKey += 1;
      setTimeout(() => {
        this.scrollActive();
      }, 200);
    },
    dragDrop(e) {
      if (e.added) {
        this.changeItemPosition(e.added);
      } else if (e.moved) {
        this.changeItemPosition(e.moved);
      }
    },
    recalculate() {
      const simpleBar = this.$refs[`${this.board.id}-Ref`].SimpleBar;
      simpleBar.recalculate();
    },
    editFile(message, file, color) {
      projectService
        .updateTaskCard(this.item.id, message, file, [], color)
        .then((rs) => {
          this.item = null;
          this.listTasks(this.board.id);
          this.successEdited();
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
    editTask(v) {
      this.item = v;
      this.$refs.fileEdit.openM();
    },
    deleteTask(t) {
      this.cnf().then((v) => {
        if (v.value) {
          projectService
            .deleteTaskCard(t.id)
            .then((rs) => {
              this.deleteSuccess();
              this.listTasks(this.board.id);
            })
            .catch((err) => {
              // this.catchErr(err);
            });
        }
      });
    },
    deleteBoard(b) {
      this.cnf().then((v) => {
        if (v.value) {
          projectService
            .deleteBoard(b.id)
            .then((rs) => {
              this.deleteSuccess();
              this.$emit("successDelete");
            })
            .catch((err) => {
              // this.catchErr(err);
            });
        }
      });
    },
    editBoard(b) {
      this.$emit("editBoard", b);
    },

    createTask(id) {
      this.item = null;
      this.bId = id;
      this.$refs.file.openM();
    },
    saveFile(message, file, color) {
      this.leaveTask(message, file, color);
      this.fileModal = false;
      this.file = null;
    },
    clickUpload() {
      this.$refs.file.upld();
    },
    leaveTask(cmt, file, color) {
      projectService
        .createTask(this.bId, cmt, file, color)
        .then((rs) => {
          this.task = "";
          this.successSaved();
          setTimeout(() => {
            this.listTasks(this.bId);
          }, 300);
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
    listTasks(id) {
      if (id) {
        projectService
          .listTaskCards(id, this.params)
          .then((rs) => {
            this.taskPage = 0;
            this.$emit("setTaskCard", {boardId: id, list: rs.data});
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    loadMoreTasks(id, page) {
      projectService
        .listTaskCards(id, {
          page: page,
          itemsPerPage: 10,
        })
        .then(async ({data}) => {
          if (data.length > 0) {
            this.$emit("loadMoreTaskCard", {boardId: id, list: data});
          } else {
            this.taskPage + -1;
          }
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
    handleScroll(id) {
      if (this.$refs[`${id}-Ref`].$el) {
        setTimeout(() => {
          this.$refs[`${id}-Ref`].SimpleBar.getScrollElement().scrollTop = 0;
        }, 500);
      }
    },
    scrollActive() {
      this.$refs[
        `${this.board.id}-Ref`
        ].SimpleBar.getScrollElement().addEventListener("scroll", (e) => {
        let {scrollTop, scrollHeight, clientHeight} = event.target;
        const offsetForTrigger = 1;
        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
          this.loadMoreTasks(this.board.id, (this.taskPage += 1));
        }
      });
    },
  },
  mounted() {
    // var container = document.querySelector(
    //   `#list-${this.board.id} .simplebar-content-wrapper`
    // );
    // if (container) {
    //   container.scrollTo({ top: 500, behavior: "smooth" });
    // }
    // Contact list actions
    this.scrollActive();
  },
};
</script>

<style>
.iconUpload {
    position: absolute;
    right: 2px;
    bottom: 2px;
}

.myClass {
    -webkit-transform: rotate(-3deg) skew(5deg);
    transform: rotate(-3deg) skew(5deg);
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg);
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg);
}

.absolute-right {
    /* display: none; */
    position: absolute;
    color: black;
}

.dragEl:hover .absolute-right {
    display: block;
    transition: 2s ease-in-out;
}
</style>