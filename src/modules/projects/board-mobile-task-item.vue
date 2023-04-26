<template>
  <simplebar
    :id="'list-' + board.id"
    :ref="board.id + '-Ref'"
    style="max-height: 500px"
  >
    <table class="table table-nowrap table-centered">
      <tbody>
        <tr
          :style="
            task.uploadPath
              ? `background-image: url(${baseUrl}/${task.uploadPath})`
              : ''
          "
          v-for="task in board.projectTaskCardsDto"
          :key="task.id + 'TASKCARDMOBILE'"
        >
          <td
            style="width: 60px"
            :style="
              !_empty(task.color)
                ? `border-left:3px solid ${task.color}`
                : 'border-left:3px solid white'
            "
          ></td>
          <td>
            <h5 class="text-truncate font-size-14 m-0">
              {{ task.name }}
            </h5>
            <span class="pre text-muted">
              {{
                `${task.ownerLastName} ${task.ownerFirstName} ${task.ownerParentName}`
              }}</span
            >
          </td>
          <td>
            <b-avatar-group size="28px">
              <b-avatar
                v-show="task.countEmployees > 0"
                variant="info"
                v-for="(m, index) in replaceStringToArray(
                  task.employeesUploadPath
                )"
                :key="index"
                :src="`${hrUrl}/${m}`"
              ></b-avatar>
            </b-avatar-group>
          </td>
          <td>
            <div class="float-right">
              <div class="p-2" style="cursor: pointer">
                <div class="d-flex" style="flex-direction: row">
                  <b-button
                    @click.prevent="$emit('deleteTask', task, board)"
                    variant="outline-primary"
                    class="mr-2"
                  >
                    <i class="bx bx-trash font-size-15"></i>
                  </b-button>

                  <b-button
                    @click.prevent="$emit('editTask', task, board)"
                    variant="outline-primary"
                    class="mr-2"
                  >
                    <i class="bx bx-edit font-size-15"></i>
                  </b-button>

                  <b-button
                    @click="
                      $emit('toggleModal', {
                        task: task,
                        board: board,
                      })
                    "
                    class="mr-2"
                    variant="outline-primary"
                  >
                    <i class="bx bx-user-plus font-size-15"></i>
                  </b-button>

                  <b-button
                    @click="$emit('clickCardTask', task, board)"
                    variant="outline-primary"
                  >
                    <i class="bx bx-comment font-size-15"></i>
                  </b-button>

                  <b-button
                    @click="
                      $emit('toggleModal', {
                        task: task,
                        board: board,
                      })
                    "
                    class="ml-2"
                    variant="primary"
                  >
                    <i class="bx bx-cog font-size-15"></i>
                  </b-button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </simplebar>
</template>

<script>
import simplebar from "simplebar-vue";
export default {
  mounted() {
    this.scrollActive();
  },
  methods: {
    scrollActive() {
      if (this.board.id) {
        this.$refs[
          `${this.board.id}-Ref`
        ].SimpleBar.getScrollElement().addEventListener("scroll", (e) => {
          let { scrollTop, scrollHeight, clientHeight } = event.target;
          const offsetForTrigger = 1;
          if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
            this.$emit("loadMoreTasks", this.board.id);
          }
        });
      }
    },
  },
  components: {
    simplebar,
  },
  props: {
    board: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>