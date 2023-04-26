<template>
  <div>
    <b-card class="p-0 m-0">
      <div class="d-flex" style="justify-content: center">
        <div class="position-relative">
          <img
            class="rounded-circle bg-light avatar-xl p-2"
            :src="`${imgUrl ? imgUrl : require('@/assets/images/acru-logo-with-name.svg')}`"
          />
          <div
            @click="changeImage"
            class="
              pos
              d-flex
              align-items-center
              justify-content-center
              bg-primary
              p_cursor
            "
          >
            <i class="bx bx-pencil text-white" style="font-size: 30px"></i>
          </div>
        </div>
      </div>

      <div class="d-flex mt-3" style="justify-content: center">
        <div>
          <label class="m-0">{{ $t("column.name") }}</label>
          <b-form-input  v-model="name" style="min-width: 40vh">
          </b-form-input>
        </div>
      </div>

      <b-form-file
        style="display: none"
        ref="fileRef"
        v-model="file"
      ></b-form-file>
    </b-card>
  </div>
</template>

<script>
import { checkFileIsImg } from "@/helper";
export default {
  watch: {
    file(v) {
      if (v) {
        if (checkFileIsImg(v) == "err") {
          this.file = null;
        } else {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.imgUrl = fileReader.result;
          });
          fileReader.readAsDataURL(v);
        }
      }
    },
  },
  data() {
    return {
      name: "",
      file: null,
      imgUrl: null,
    };
  },
  props: {
    group: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    fileUpload() {
      this.$refs.fileRef.$el.firstChild.click();
    },
    setEditedData(n, f) {
      this.name = n;
      this.imgUrl = f
    },
    changeImage() {
      this.fileUpload();
    },
  },
};
</script>

<style>
.pos {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 0.5s ease;
  box-shadow: 5px 5px 5px #eee;
  border-radius: 50px;
  border: 3px solid white;
  /* background: #556ee6; */
}
</style>