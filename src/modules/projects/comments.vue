<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{ $t("cmts") }}</h4>
      <simplebar
        :style="height ? 'height:330px' : 'height: 330px'"
        id="comment-list"
        ref="commentsRef"
      >
        <div class="media mb-4" v-for="(cmt, index) in comments" :key="index">
          <div class="mr-3">
            <img
              v-if="cmt.employeeUploadPath"
              class="media-object rounded-circle avatar-xs"
              alt
              :src="`${hrUrl}/${cmt.employeeUploadPath}`"
            />
            <div v-else class="avatar-xs mr-3">
              <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                {{ cmt.ownerLastName.charAt(0) }}
              </span>
            </div>
          </div>
          <div class="media-body">
            <h5 class="font-size-13 font-weight-bold mb-1">
              {{
                `${cmt.ownerLastName} ${cmt.ownerFirstName} ${cmt.ownerMiddleName}`
              }}
            </h5>
            <div v-if="cmt.uploadPath">
              <p class="mb-1 d-flex align-items-center">
                <a
                  :href="`${baseUrl}/${cmt.uploadPath}`"
                  :download="`file.${cmt.fileExtension}`"
                  class="fa fas fa-arrow-alt-circle-down text-primary"
                  style="font-size: 35px"
                ></a>
                <span class="ml-2">{{ cmt.fileName }}</span>
              </p>
            </div>

            <p class="mb-1" style="word-break: break-all !important">
              {{ cmt.comment }}
            </p>
            <p class="text-muted mb-0 font-size-10">
              <i class="bx bx-calendar mr-1 text-primary"></i>
              {{ replaceDate(cmt.date).daym_shortyyyy_hm() }}
            </p>
          </div>
        </div>
      </simplebar>
    </div>

    <div class="pl-3 pr-3 pt-3">
      <form v-if="project && project.status != 'FINISHED'">
        <div class="form-group m-0" style="position: relative">
          <textarea
            style="resize: none"
            @keyup.enter="leaveComment(comment)"
            v-model="comment"
            class="form-control"
            id="commentmessage-input"
            :placeholder="$t('writeCmt')"
            rows="3"
          ></textarea>
          <b-button
            variant="white"
            class="iconUpload"
            @click.prevent="clickUpload"
            style="padding: 1px"
            size="sm"
          >
            <i class="bx bxs-file-doc text-primary font-size-20"></i>
          </b-button>
        </div>

        <b-button
          @click="leaveComment(comment)"
          class="mt-1 float-right mb-3"
          variant="primary"
        >
          <b-overlay :show="loaderCmt" rounded="sm" opacity="0.1">
            {{ $t("actions.send") }}

            <i class="bx bx-send"></i>
          </b-overlay>
        </b-button>
      </form>

      <upload-file :cmt="true" ref="file" @sendFile="sendFile" />
    </div>
  </div>
</template>

<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
import { replaceDate } from "@/helper";
export default {
  props: ["height", "project"],
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
      replaceDate: replaceDate,
      fileModal: false,
      comment: "",
      file: null,
      params: {
        page: 0,
        itemsPerPage: 20,
      },
      comments: [],
      commentPage: 0,
      loaderCmt: false,
    };
  },
  components: {
    simplebar,
  },
  created() {
    this.listComments();
  },
  methods: {
    sendFile(message, file) {
      this.leaveComment(message, file);
      this.fileModal = false;
      this.file = null;
    },
    clickUpload() {
      this.$refs.file.upld();
    },
    leaveComment(cmt, file) {
      let id = this.$route.query.id;
      if (id) {
        this.loaderCmt = true;
        projectService
          .leaveComment(id, cmt, file)
          .then((rs) => {
            this.comment = "";
            setTimeout(() => {
              this.listComments();
            }, 300);
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loaderCmt = false;
          });
      } else {
        this.$router.go(-1);
      }
    },
    listComments() {
      let id = this.$route.query.id;
      if (id) {
        projectService
          .listComments(id, this.params, true)
          .then((rs) => {
            this.comments = rs.data.list;
            this.handleScroll();
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    loadMoreComments(page) {
      let id = this.$route.query.id;
      if (id) {
        projectService
          .listComments(id, {
            page: page,
            itemsPerPage: 20,
          })
          .then(async ({ data }) => {
            if (data.list.length > 0) {
              this.comments = this.comments.concat(data.list);
            } else {
              this.commentPage + -1;
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    handleScroll() {
      if (this.$refs.commentsRef.$el) {
        setTimeout(() => {
          this.$refs.commentsRef.SimpleBar.getScrollElement().scrollTop = 0;
        }, 500);
      }
    },
  },
  mounted() {
    var container3 = document.querySelector(
      "#comment-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({ top: 500, behavior: "smooth" });
    }
    // Contact list actions
    this.$refs.commentsRef.SimpleBar.getScrollElement().addEventListener(
      "scroll",
      (e) => {
        let { scrollTop, scrollHeight, clientHeight } = event.target;
        const offsetForTrigger = 1;
        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
          this.loadMoreComments((this.commentPage += 1));
        }
      }
    );
  },
};
</script>

<style>
.iconUpload {
  position: absolute;
  right: 2px;
  bottom: 2px;
}
</style>