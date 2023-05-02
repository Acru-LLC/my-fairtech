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
            <FileView :uploadPath="fileName" />

            <span class="ml-2">
              <p class="m-0" v-if="fileName">{{ fileName }}</p>
              <span v-if="fileSize" class="text-primary">{{
                getFileSize(fileSize)
              }}</span>
            </span>
          </h4>

          <b-form>
            <b-form-group
              style="position: relative"
              v-if="cmt"
              class="mb-4"
              :label="name ? $t('templates_row.nm') : $t('column.comment')"
              label-for="horizontal-password-input"
              label-cols-sm="3"
            >
              <textarea
                style="resize: none"
                v-model="fileMessage"
                class="form-control"
                id="commentmessage-input"
                :placeholder="name ? $t('templates_row.nm') : $t('column.comment')"
                rows="3"
              ></textarea>
              <b-button
                variant="white"
                class="iconUpload2"
                @click.prevent="upld"
                style="padding: 1px"
                size="sm"
              >
                <i class="bx bxs-file-doc font-size-20"></i>
              </b-button>
            </b-form-group>

            <div class="form-group row justify-content-end">
              <div class="col-sm-9">
                <div>
                  <b-button
                    variant="outline-danger"
                    @click="reset"
                    class="mr-2"
                    >{{ $t("actions.cancel") }}</b-button
                  >
                  <b-button variant="primary" @click="send">{{
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
      style="display: none"
      ref="uploadFile"
      v-model="file"
    ></b-form-file>
  </div>
</template>

<script>
import { getFileSize, imageTypes, getExtFromName } from "@/helper";
export default {
    props: ["cmt", "save", "name", "edit", "item"],
  watch: {
    file(v) {
      if (v) {
        this.fileName = v.name;
        this.fileSize = v.size;
        if (!this.fileModal) {
          this.fileModal = true;
        }
      }
    },
  },
  data() {
    return {
      getExtFromName: getExtFromName,
      imageTypes: imageTypes,
      getFileSize: getFileSize,
      fileMessage: "",
      fileName: null,
      file: null,
      fileModal: false,
      fileSize: null,
    };
  },
  methods: {
    openM() {
      this.fileModal = true;
      setTimeout(() => {
        if (this.edit && this.item) {
          if (this.item.fileName) {
            this.fileName = this.item.fileName;
          }
          this.fileMessage = this.item.name;
        }
      }, 300);
    },
    openForComment() {
      this.fileModal = true;
      setTimeout(() => {
        if (this.edit && this.item) {
          if (this.item.fileName) {
            this.fileName = this.item.fileName;
          }
          this.fileMessage = this.item.comment;
        }
      }, 300);
    },
    upld() {
      this.$refs.uploadFile.$el.firstChild.click();
    },
    async send() {
      await this.$emit("sendFile", this.fileMessage, this.file);
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