<template>
  <div>
    <b-modal
      v-model="fileModal"
      size="md"
      :no-close-on-backdrop="true"
      hide-header
      hide-footer
      centered
      body-class="p-0"
    >
      <div class="card m-0">
        <div class="card-body">
          <h4
            class="card-title mb-4 d-flex"
            style="align-items: center"
            v-if="fileName"
          >
            <i
              class="fa fas fa-arrow-alt-circle-up text-primary"
              style="font-size: 35px"
            ></i>
            <span class="ml-2">
              <p class="m-0" v-if="fileName">{{ fileName }}</p>
              <span v-if="fileSize" class="text-primary">{{
                getFileSize(fileSize)
              }}</span>
            </span>
          </h4>

          <b-form>
            <b-form-group
              v-if="cmt"
              class="mb-0"
              :label="name ? $t('column.name') : $t('column.comment')"
              label-for="horizontal-password-input"
              label-cols-sm="3"
            >
              <textarea
                style="resize: none"
                v-model="fileMessage"
                class="form-control"
                id="commentmessage-input"
                :placeholder="name ? $t('column.name') : $t('column.comment')"
                rows="3"
              ></textarea>
              <b-button
                variant="white"
                class="iconUpload2"
                @click.prevent="upld"
                style="padding: 1px"
                size="sm"
              >
                <i class="bx bxs-file-image text-primary font-size-20"></i>
              </b-button>
            </b-form-group>
            <colors ref="colorRef" @selectColor="selectColor" />
            <div class="form-group mt-4 mb-0 row">
              <div class="col-sm-12">
                <div class="float-right">
                  <b-button
                    variant="outline-danger"
                    @click="reset"
                    class="mr-2"
                    >{{ $t("actions.cancel") }}</b-button
                  >
                  <b-button variant="success" @click="send">{{
                    save
                      ? $t("actions.save")
                      : edit
                      ? $t("actions.edit")
                      : $t("actions.send")
                  }}</b-button>
                </div>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </b-modal>
    <b-form-file
      accept="image/*"
      style="display: none"
      ref="uploadFile"
      v-model="file"
    ></b-form-file>
  </div>
</template>

<script>
import colors from "@/components/colors";
import { getFileSize } from "@/helper";
export default {
  components: {
    colors,
  },
  props: ["cmt", "save", "name", "edit", "item"],
  watch: {
    file(v) {
      if (v) {
        if (v.size <= 10 * (1024 * 1024)) {
          let ext = v.name.split(".").pop();
          if (this.imagesExt.indexOf(ext) > -1) {
            this.setFileDetails(v.name, v.size);
            if (!this.fileModal) {
              this.fileModal = true;
            }
          } else {
            this.file = null;
            this.setFileDetails(null, null);
            this.showMsgError(this.$t("warning.fileImage"));
          }
        } else {
          this.file = null;
          this.setFileDetails(null, null);
          this.showMsgError(this.$t("warning.fileSize"));
        }
      }
    },
  },
  data() {
    return {
      imagesExt: [
        "tiff",
        "pjp",
        "jfif",
        "gif",
        "svg",
        "bmp",
        "png",
        "jpeg",
        "svgz",
        "jpg",
        "webp",
        "ico",
        "xbm",
        "dib",
        "tif",
        "jpe",
        "jif",
        "jfi",
        "pjpeg",
        "avif",
        "psd",
        "raw",
        "arw",
        "cr2",
        "nrw",
        "k25",
        "indd",
        "heif",
        "heic",
        "ind",
        "indt",
        "jp2",
        "j2k",
        "jpm",
        "mj2",
      ],
      fileMessage: "",
      fileName: null,
      file: null,
      fileModal: false,
      fileSize: null,
      selectedColor: "",
      getFileSize: getFileSize,
    };
  },
  methods: {
    selectColor(v) {
      this.selectedColor = v;
    },
    setFileDetails(name, size) {
      this.fileName = name;
      this.fileSize = size;
    },
    openM() {
      this.fileModal = true;
      setTimeout(() => {
        if (this.edit && this.item) {
          if (this.item.fileName) {
            this.fileName = this.item.fileName;
          }

          this.fileMessage = this.item.name;
          this.$refs.colorRef.setColor(this.item.color);
        }
      }, 300);
    },
    upld() {
      this.$refs.uploadFile.$el.firstChild.click();
    },
    async send() {
      await this.$emit(
        "sendFile",
        this.fileMessage,
        this.file,
        this.selectedColor
      );
      await this.reset();
    },
    reset() {
      this.fileMessage = "";
      this.file = null;
      this.fileModal = false;
    },
  },
};
</script>

<style>
.iconUpload2 {
  position: absolute;
  right: 5px;
  bottom: 1px;
}
</style>