<script>
import PageHeader from "./page-header";
import appConfig from "@/app.config";
import Board from "./board";

import projectService from "@/shared/services/projectService";
import {required} from "vuelidate/lib/validators";
/**
 * Kanban-board component
 */
import ProjEmployees from "./proj-employes";
import {Container, Draggable} from "vue-smooth-dnd";
import colors from "@/components/colors";
import CardInfo from "./card-info";
import BoardMobile from "./boards-mobile";
import i18n from "@/i18n";

export default {
  watch: {
    widthWindow: {
      handler(v) {
        this.setWindowWidthPrivate(v);
      },
    },
  },
  validations: {
    b: {
      name: {required},
    },
  },
  page: {
    title: i18n.t('tasks_list'),
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    colors,
    PageHeader,
    Board,
    Draggable,
    ProjEmployees,
    Container,
    CardInfo,
    BoardMobile,
  },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      project: {},
      isModal: false,
      componentKey: 0,
      isAddBoard: false,
      title: this.$t("tasks_list"),
      submitted: false,
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("proj"),
          href: "/projects",
        },
        {
          text: this.$t("tasks_list"),
          active: true,
        },
      ],
      boards: [],
      b: {
        name: "",
      },
      bId: null,
      drag: false,
      taskCard: {},
      removedCardBoard: null,
      dropRes: null,
      selectedColor: "",
      isCard: false,
      mobileBoard: false,
      mobilesm: false,
    };
  },
  methods: {
    setWindowWidthPrivate(v) {
      if (v < 992) {
        this.mobileBoard = true;
      } else {
        this.mobileBoard = false;
      }
      if (v < 420) {
        this.mobilesm = true;
      } else {
        this.mobilesm = false;
      }
    },
    clickCardTask(card) {
      this.isCard = true;
      setTimeout(() => {
        this.$refs.cardInfoRef.setCardInfoData(card);
        this.$refs.cardInfoRef.reset();
      }, 200);
    },
    selectColor(v) {
      this.selectedColor = v;
    },
    setProj(proj) {
      this.project = proj;
    },
    getChildPayload(index) {
      return this.boards[index];
    },

    onDrop(e) {
      let payload = {
        indexBefore: 0,
        indexAfter: 0,
        projectTaskId: e.payload.id,
      };
      if (e.addedIndex != null) {
        let currentIndex = e.addedIndex;
        let afterItem = this.boards[currentIndex + 1];
        let beforeItem = this.boards[currentIndex - 1];
        if (beforeItem) {
          this.$set(payload, "indexBefore", beforeItem.id);
        }
        if (afterItem) {
          this.$set(payload, "indexAfter", afterItem.id);
        }
        projectService
          .changeIndex(payload)
          .then(async (rs) => {
            this.boards = await this.applyDrag(this.boards, e);
            this.boards.forEach((e) => {
              this.$refs[`${e.id}-boardRef`][0].forceRerender();
            });
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      }
    },
    toggleModal({task, board}) {
      this.taskCard = task;
      this.bId = board.id;
      this.isModal = true;
      projectService
        .listCardEmployees(task.id)
        .then((rs) => {
          if (rs.data[0] != null) {
            this.$refs.projEmpRef.setSelected(rs.data);
          }
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },

    addBoard() {
      this.isAddBoard = true;
      this.b.name = "";
      this.bId = null;
    },
    editBoard(b) {
      this.isAddBoard = true;
      this.b.name = b.name;
      this.b.color = b.color;
      this.bId = b.id;
    },
    resetBoard() {
      this.listBoards();
      this.isAddBoard = false;
      this.b.name = "";
    },
    createBoard(b) {
      b.preventDefault();
      this.$v.$touch();
      this.submitted = true;
      if (!this.$v.b.$anyError) {
        let id = this.$route.query.id;
        if (this.bId) {
          projectService
            .updateBoard(this.bId, {
              name: this.b.name,
              color: this.selectedColor,
            })
            .then((rs) => {
              this.resetBoard();
              this.successEdited();
            })
            .catch((err) => {
              // this.catchErr(err);
            });
        } else {
          if (id) {
            projectService
              .createBoard(id, {name: this.b.name, color: this.selectedColor})
              .then((rs) => {
                this.successSaved();
                this.resetBoard();
              })
              .catch((err) => {
                // this.catchErr(err);
              });
          } else {
            this.$router.go(-1);
          }
        }
      }
    },
    listBoards() {
      let id = this.$route.query.id;
      if (id) {
        projectService
          .listBoards(id, {page: 0, itemsPerPage: 10})
          .then((rs) => {
            this.boards = rs.data;
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    setTaskCard(data) {
      this.boards.forEach((element) => {
        if (element.id == data.boardId) {
          this.$set(element, "projectTaskCardsDto", data.list);
        }
      });
    },
    loadMoreTaskCard({boardId, list}) {
      this.boards.forEach((el) => {
        if (el.id == boardId) {
          let value = el.projectTaskCardsDto.concat(list);
          this.$set(el, "projectTaskCardsDto", value);
        }
      });
    },
    cancelB() {
      this.isAddBoard = false;
      this.b.name = "";
    },
    recalculate(id) {
      if (this.$refs[`${id}-boardRef`][0]) {
        this.$refs[`${id}-boardRef`][0].recalculate();
      }
    },
    save(members) {
      if (this.taskCard.id && members.length > 0) {
        projectService
          .updateTaskCard(this.taskCard.id, "", null, members)
          .then((rs) => {
            if (this.mobileBoard) {
              this.$refs.mobileBoardRef.refresh();
              this.isModal = false;
              this.successEdited();
              return;
            }
            this.$refs[`${this.bId}-boardRef`][0].listTasks(this.bId);
            this.isModal = false;
            this.successEdited();
          })
          .catch((err) => {
            this.isModal = false;
            // this.catchErr(err);
          });
      } else {
        this.enterInfo();
      }
    },
    setSourceId(b, d) {
      this.removedCardBoard = b;
      this.dropRes = d;
    },
    removeByIndex() {
      if (this.removedCardBoard && this.dropRes) {
        this.boards.forEach((e) => {
          if (this.removedCardBoard.id === e.id) {
            let foundIndex = e.projectTaskCardsDto.findIndex(
              (d) => d.id == this.dropRes.payload().id
            );
            e.projectTaskCardsDto.splice(foundIndex, 1);
          }
        });
      }
    },
    pushByIndex(bId, dropRes) {
      this.boards.forEach((e) => {
        if (e.id === bId) {
          this.$set(
            e,
            "projectTaskCardsDto",
            this.applyDragCard(e.projectTaskCardsDto, dropRes)
          );
        }
      });
    },
    //FOR DRAG DROP COMONENT
    applyDrag(arr, dragResult) {
      const {removedIndex, addedIndex, payload} = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },

    applyDragCard(arr, dragResult) {
      const {removedIndex, addedIndex, payload} = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload();

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
  },
  async created() {
    await this.listBoards();
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
    this.setWindowWidthPrivate(this.widthWindow);
  },
};
</script>

<template>
  <div>
    <PageHeader
        :items="items"
        :mobile="mobilesm"
        :title="title"
        @addBoard="addBoard"
        @setProj="setProj"
    />
    <b-sidebar
        v-model="isModal"
        :no-header="true"
        backdrop
        backdrop-variant="dark"
        class="sd"
        right
        shadow
        sidebar-class="p-0"
    >
      <div v-if="isModal">
        <proj-employees
            ref="projEmpRef"
            @cancel="isModal = false"
            @save="save"
        />
      </div>
    </b-sidebar>
    <!-- card info  -->
    <b-sidebar
        v-model="isCard"
        :no-header="true"
        backdrop
        backdrop-variant="dark"
        class="sd"
        right
        shadow
        sidebar-class="p-0"
    >
      <CardInfo ref="cardInfoRef" :isCard="isCard"/>
    </b-sidebar>
    <!-- card info end -->
    <div v-if="mobileBoard">
      <BoardMobile
          ref="mobileBoardRef"
          :list="boards"
          @clickCardTask="clickCardTask"
          @loadMoreTaskCard="loadMoreTaskCard"
          @setTaskCard="setTaskCard"
          @toggleModal="toggleModal"
      />
    </div>

    <div v-else id="style-2" class="con">
      <Container
          :drop-placeholder="upperDropPlaceholderOptions"
          :get-child-payload="getChildPayload"
          drag-class="card-ghost"
          drag-handle-selector=".column-drag-handle"
          drop-class="card-ghost-drop"
          orientation="horizontal"
          @drop="onDrop"
      >
        <Draggable
            v-for="(item, index) in boards"
            :key="item.id + 'DRAGGABLEITEM'"
        >
          <Board
              :ref="`${item.id}-boardRef`"
              :board="item"
              :indexB="index"
              :proj="project"
              class="box"
              @clickCardTask="clickCardTask"
              @editBoard="editBoard"
              @loadMoreTaskCard="loadMoreTaskCard"
              @pushByIndex="pushByIndex"
              @removeByIndex="removeByIndex"
              @setSourceId="setSourceId"
              @setTaskCard="setTaskCard"
              @successDelete="listBoards"
              @toggleModal="toggleModal"
          />
        </Draggable>
      </Container>
    </div>
    <b-modal
        v-model="isAddBoard"
        :cancel-title="$t('actions.cancel')"
        :cancel-variant="'outline-danger'"
        :no-close-on-backdrop="true"
        :ok-title="$t('actions.save')"
        :ok-variant="'success'"
        body-class="p-0"
        hide-header
        size="md"
        @cancel="cancelB"
        @ok="createBoard"
    >
      <div class="p-4">
        <b-form-input
            v-model="b.name"
            :class="{ 'is-invalid': submitted && $v.b.name.$error }"
            :placeholder="$t('column.name')"
            class="mb-2"
            size="lg"
        ></b-form-input>
        <colors :propColor="b.color" @selectColor="selectColor"/>
      </div>
    </b-modal>
    <!-- end row -->
  </div>
</template>

<style lang="scss">
.sd {
  .b-sidebar {
    width: 700px !important;
    background: white;
  }
}

.con {
  max-width: 160rem;
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  overflow: auto;
}

.cards-drop-preview {
  background-color: rgb(240, 240, 247, 1) !important;
  border: 1px dashed #abc !important;
  margin: 0px 5px 5px 5px !important;
}

.box {
  width: 22rem;
  flex: 0 0 auto;
  margin-right: 10px;
  // max-height: 66vh;
}

// #style-2::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   border-radius: 10px;
//   background-color: #f5f5f5;
// }

// #style-2::-webkit-scrollbar {
//   width: 12px;
//   height: 14px;
//   background-color: #f5f5f5;
// }

// #style-2::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
//   background-color: #2b6c58;
// }
</style>
