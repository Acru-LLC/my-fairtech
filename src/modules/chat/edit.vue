<template>
  <div class="card card-body m-0">
    <b-form-file
      ref="fileRef"
      style="display: none"
      v-model="file"
    ></b-form-file>
    <div class="p-3">
      <h4
        v-if="file || uploadPath"
        class="card-title mb-4 d-flex"
        style="align-items: center"
      >
        <a
          :href="base64 ? uploadPath : `${baseUrl}${uploadPath}`"
          :download="fileName"
          class="fa fas fa-arrow-alt-circle-up text-primary"
          style="font-size: 35px"
        />
        <span class="ml-2">
          <p class="m-0">{{ fileName }}</p>
          <span v-if="fileSize" class="text-primary">{{
            getFileSize(fileSize)
          }}</span>
        </span>
      </h4>
      <div class="row">
        <div class="col">
          <div class="position-relative">
            <input
              type="text"
              v-model="message"
              class="form-control chat-input"
              :placeholder="$t('messaging.title')"
              :class="{
                'is-invalid': $v.message.$error,
              }"
            />

            <div class="chat-input-links">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a
                    id="button-2"
                    href="javascript: void(0);"
                    v-b-tooltip.hover
                    placement="top"
                    title="Emoji"
                  >
                    <i class="mdi mdi-emoticon-happy-outline"></i>
                  </a>
                </li>
                <b-tooltip variant="primary" placement="top" target="button-2">
                  <div style="overflow: auto; height: 250px">
                    <span
                      @click="selectEmoji(e)"
                      class="font-size-22 emoji d-inline-block"
                      v-for="(e, index) in emojies"
                      :key="index"
                      >{{ e }}</span
                    >
                  </div>
                </b-tooltip>

                <!-- <li class="list-inline-item">
                  <a
                    @click.prevent="fileUpload"
                    href="javascript: void(0);"
                    v-b-tooltip.hover
                    placement="top"
                    title="Add Files"
                  >
                    <i class="mdi mdi-file-document-outline"></i>
                  </a>
                </li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group row justify-content-end">
      <div class="col-sm-9">
        <div>
          <b-button variant="outline-danger" @click="cancel" class="mr-2">{{
            $t("actions.cancel")
          }}</b-button>
          <b-button variant="primary" @click="next">
            <i class="fa fa-save"></i>
            {{ $t("actions.save") }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.emoji:hover {
  cursor: pointer;
  background: black;
  border-radius: 5px;
}
</style>
<script>
// import { required } from "vuelidate/lib/validators";
import { getFileSize } from "@/helper";
export default {
  props: {
    emojies: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    file: {
      handler(v) {
        if (v) {
          this.fileName = v.name;
          this.fileSize = v.size;
          if (v.name.lastIndexOf(".") <= 0) {
            return this.showMsgError(`Please select a valid file!`);
          }
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.$nextTick(function () {
              this.uploadPath = fileReader.result;
              this.base64 = true;
            });
          });

          fileReader.readAsDataURL(v);
        }
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      getFileSize: getFileSize,
      message: "",
      file: null,
      fileName: null,
      uploadPath: null,
      base64: false,
      fileSize: null,
    };
  },
  validations: {
    message: {
      // required,
    },
  },
  methods: {
    fileUpload() {
      this.$refs.fileRef.$el.firstChild.click();
    },
    selectEmoji(e) {
      this.message = this.message.concat(e);
    },

    async next() {
      /* this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } */
      await this.$emit("save", { message: this.message, file: this.file });
      await this.cancel();
    },
    setMsg(msg) {
      this.message = msg;
    },
    setFile(name, uploadPath) {
      this.file = null;
      this.fileName = name;
      this.uploadPath = uploadPath;
      this.base64 = false;
      this.fileSize = null;
    },
    cancel() {
      this.setMsg("");
      this.setFile(null, null);
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>