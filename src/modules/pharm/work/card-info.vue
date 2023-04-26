<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-1 text-center" v-if="cardInfo.uploadPath">
        <div
          @click="singleImage = true"
          style="
            background-repeat: no-repeat;
            background-size: 30%;
            background-repeat: no-repeat;
            background-position: center center;
            min-height: 15em;
          "
          :style="`background-image: url(${baseUrl}/${cardInfo.uploadPath})`"
          alt
          class="img-thumbnail"
        />

        <vue-easy-lightbox
          :visible="singleImage"
          :imgs="`${baseUrl}/${cardInfo.uploadPath}`"
          @hide="singleImage = false"
        ></vue-easy-lightbox>
      </div>
      <div
        class="d-flex mb-2 mt-2"
        style="justify-content: space-between; align-items: center"
      >
        <h4 class="card-title">{{ $t("cmts") }}</h4>
        <form>
          <div class="form-group m-0">
            <div class="input-group">
              <input
                v-model="searchValue"
                type="text"
                class="form-control"
                :placeholder="$t('actions.filter')"
                aria-label="Recipient's username"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  <i class="mdi mdi-magnify"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <simplebar
        :style="`height:${
          cardInfo.uploadPath ? heightWindow - 400 : heightWindow - 200
        }px`"
        id="comment-list"
        ref="commentsRef"
        :key="cmpKey + 'COMMENT'"
      >
        <div class="media mb-4" v-for="(cmt, index) in comments" :key="index">
          <div class="mr-3">
            <img
              v-if="cmt.ownerUploadPath"
              class="media-object rounded-circle avatar-xs"
              alt
              :src="`${hrUrl}/${cmt.ownerUploadPath}`"
            />
            <div v-else class="avatar-xs mr-3">
              <span
                class="avatar-title rounded-circle bg-soft-primary text-white font-size-16"
              >
                {{
                  `${cmt.ownerLastName.charAt(0)}${cmt.ownerFirstName.charAt(
                    0
                  )}`
                }}
              </span>
            </div>
          </div>
          <div class="media-body">
            <h5 class="font-size-13 mb-1 text-primary font-weight-bold">
              {{
                `${cmt.ownerLastName} ${cmt.ownerFirstName} ${cmt.ownerParentName}`
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
              <span class="font-size-13">{{ cmt.comment }}</span>
              <i
                v-b-tooltip.hover.top
                :title="$t('actions.delete')"
                @click="deleteComment(cmt)"
                class="bx ml-2 bx-trash font-size-16 p_cursor hi"
              ></i>
              <i
                v-b-tooltip.hover.top
                :title="$t('actions.edit')"
                @click="editComment(cmt)"
                class="bx bx-pencil font-size-16 p_cursor hi"
              ></i>
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
      <form>
        <div class="form-group" style="position: relative">
          <b-form-textarea
            style="resize: none"
            @keyup.enter="leaveComment(comment)"
            v-model="comment"
            class="form-control"
            id="commentmessage-input"
            :placeholder="$t('writeCmt')"
            rows="3"
          ></b-form-textarea>
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
      </form>

      <upload-file :cmt="true" ref="file" @sendFile="sendFile" />
      <upload-file
        :item="editData"
        :cmt="true"
        :edit="true"
        ref="fileEdit"
        @sendFile="saveChanges"
      />
    </div>
  </div>
</template>

<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
import { replaceDate } from "@/helper";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  props: ["height", "isCard"],
  watch: {
    file: {
      handler(v) {
        if (v) {
          this.fileModal = true;
        }
      },
    },
    async searchValue() {
      await this.listComments();
    },
  },
  data() {
    return {
      replaceDate: replaceDate,
      singleImage: false,
      searchValue: "",
      fileModal: false,
      comment: "",
      file: null,
      page: 0,
      itemsPerPage: 20,
      comments: [],
      commentPage: 0,
      cardInfo: {},
      cmpKey: 0,
      editData: null,
    };
  },
  components: {
    simplebar,
    VueEasyLightbox,
  },
  computed: {
    params() {
      return {
        params: {
          page: this.page,
          itemsPerPage: this.itemsPerPage,
        },
        search: this.searchValue,
      };
    },
  },
  methods: {
    reset() {
      this.cmpKey += 1;
      setTimeout(() => {
        this.scrollActive();
      }, 200);
    },
    deleteComment(d) {
      this.cnf().then((v) => {
        if (v.value) {
          projectService
            .deleteCardComment(d.id)
            .then((rs) => {
              this.deleteSuccess();
              this.listComments();
            })
            .catch((err) => {
              // this.catchErr(err);
            });
        }
      });
    },
    editComment(v) {
      this.editData = v;
      setTimeout(() => {
        this.$refs.fileEdit.openForComment();
      }, 100);
    },

    setCardInfoData(data) {
      this.cardInfo = data;
      this.$nextTick(() => {
        this.listComments();
      });
    },
    saveChanges(message, file) {
      this.updateCardComment(message, file);
    },
    updateCardComment(cmt, file) {
      if (this.editData.id) {
        projectService
          .updateCardComment(this.editData.id, cmt, file)
          .then((rs) => {
            this.comment = "";
            setTimeout(() => {
              this.listComments();
              this.$refs.fileEdit.reset();
            }, 300);
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.showMsgError(`Not selected data`);
      }
    },
    sendFile(message, file) {
      this.leaveComment(message, file);
      this.fileModal = false;
      this.file = null;
    },
    clickUpload() {
      this.$refs.file.upld();
    },
    leaveComment(cmt, file) {
      if (this.cardInfo.id) {
        projectService
          .createCardComment(this.cardInfo.id, cmt, file)
          .then((rs) => {
            this.comment = "";
            setTimeout(() => {
              this.listComments();
            }, 300);
          })
          .catch((err) => {
            // this.catchErr(err);
          });
      } else {
        this.$router.go(-1);
      }
    },
    listComments() {
      if (this.cardInfo.id) {
        projectService
          .listCardComment(this.cardInfo.id, this.params)
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
      if (this.cardInfo.id) {
        projectService
          .listCardComment(this.cardInfo.id, {
            params: {
              page: page,
              itemsPerPage: 20,
            },
            search: "",
          })
          .then(async ({ data }) => {
            if (data.list.length > 0) {
              this.comments = this.comments.concat(data.list);
            } else {
              this.commentPage + -1;
            }
          });
      } else {
        this.$router.go(-1);
      }
    },
    scrollActive() {
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
    handleScroll() {
      if (this.$refs.commentsRef.$el) {
        setTimeout(() => {
          this.$refs.commentsRef.SimpleBar.getScrollElement().scrollTop = 0;
        }, 500);
      }
    },
  },
  mounted() {
    // var container3 = document.querySelector(
    //   "#comment-list .simplebar-content-wrapper"
    // );
    // if (container3) {
    //   container3.scrollTo({ top: 500, behavior: "smooth" });
    // }
    // Contact list actions
    if (this.isCard) {
      this.scrollActive();
    }
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