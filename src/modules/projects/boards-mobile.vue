<script>
/**
 * Task-list component
 */
import projectService from "@/shared/services/projectService";
import CreateTask from "./create-task";

import BoardMobileTaskItem from "./board-mobile-task-item";
export default {
  components: {
    CreateTask,

    BoardMobileTaskItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      item: null,
      taskPage: 0,
      fileModal: 0,
      file: null,
      task: "",
      bId: null,
      params: {
        page: 0,
        itemsPerPage: 10,
      },
    };
  },

  methods: {
    loadMoreTasks(id) {
      projectService
        .listTaskCards(id, {
          page: (this.taskPage += 1),
          itemsPerPage: 10,
        })
        .then(async ({ data }) => {
          if (data.length > 0) {
            this.$emit("loadMoreTaskCard", { boardId: id, list: data });
          } else {
            this.taskPage = this.taskPage - 1;
          }
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
    toggleModal(data) {
      this.bId = data.board.id;
      this.$emit("toggleModal", data);
    },
    refresh() {
      this.listTasks(parseInt(this.bId));
    },
    clickCardTask(task, board) {
      this.bId = board.id;
      this.$emit("clickCardTask", task);
    },
    leaveTask(cmt, file, color) {
      projectService
        .createTask(this.bId, cmt, file, color)
        .then((rs) => {
          this.task = "";
          this.successSaved();
          setTimeout(() => {
            this.listTasks(parseInt(this.bId));
          }, 300);
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
    saveFile(message, file, color) {
      this.leaveTask(message, file, color);
      this.fileModal = false;
      this.file = null;
    },
    editFile(message, file, color) {
      projectService
        .updateTaskCard(this.item.id, message, file, [], color)
        .then((rs) => {
          this.item = null;
          this.listTasks(this.bId);

          this.successEdited();
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
            this.$emit("setTaskCard", { boardId: id, list: rs.data });
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    editTask(v, board) {
      this.bId = board.id;
      this.item = v;
      this.$refs.fileEdit.openM();
    },
    createTask(id) {
      this.item = null;
      this.bId = id;
      this.$refs.file.openM();
    },

    deleteTask(t, board) {
      this.cnf().then((v) => {
        if (v.value) {
          projectService
            .deleteTaskCard(t.id)
            .then((rs) => {
              this.deleteSuccess();
              this.listTasks(board.id);
            })
            .catch((err) => {
              // this.catchErr(err);
            });
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <create-task
      ref="file"
      @sendFile="saveFile"
      :cmt="true"
      :save="true"
      :name="true"
    />
    <create-task
      ref="fileEdit"
      @sendFile="editFile"
      :cmt="true"
      :edit="true"
      :item="item"
      :name="true"
    />
    <div class="row">
      <div class="col-lg-12">
        <div
          class="card"
          :style="
            !_empty(board.color)
              ? `border-top:5px solid ${board.color}`
              : 'border-top:5px solid white'
          "
          :key="board.id + index+ 'BOARD_MOBILE'+board.name"
          v-for="(board, index) in list"
        >
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="card-title mb-4">{{ board.name }}</h4>
              <a
                href="javascript: void(0);"
                @click="createTask(board.id)"
                class="btn btn-success"
              >
                <i class="mdi mdi-plus"></i>
                {{ $t("create_new_task") }}
              </a>
            </div>
            <div class="table-responsive mb-0">
              <BoardMobileTaskItem
                @loadMoreTasks="loadMoreTasks"
                @editTask="editTask"
                @deleteTask="deleteTask"
                @toggleModal="toggleModal"
                @clickCardTask="clickCardTask"
                :board="board"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
