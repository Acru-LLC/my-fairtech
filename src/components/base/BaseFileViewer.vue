<template>
  <div class="avatar-sm" v-if="uploadPath">
    <span
      class="avatar-title rounded-circle bg-white text-primary font-size-24"
    >
      <img
        height="auto"
        width="25"
        :src="require('@/assets/img.png')"
        v-if="imageTypes.indexOf(getExt(uploadPath)) > -1"
      />
      <img
        height="auto"
        width="30"
        :src="require('@/assets/txt.png')"
        v-else-if="getExt(uploadPath) == 'txt'"
      />
      <img
        height="auto"
        width="25"
        :src="require('@/assets/pdf.png')"
        v-else-if="getExt(uploadPath) == 'pdf'"
      />
      <img
        width="25"
        height="auto"
        :src="require('@/assets/ppt.png')"
        v-else-if="getExt(uploadPath) == 'pptx'"
      />
      <img
        width="30"
        height="auto"
        :src="require('@/assets/zip.png')"
        v-else-if="getExt(uploadPath) == 'zip'"
      />
      <img
        width="25"
        height="auto"
        :src="require('@/assets/excel.png')"
        v-else-if="getExt(uploadPath) == 'xlsx'"
      />
      <img
        v-else-if="getExt(uploadPath) == 'doc' || getExt(uploadPath) == 'docx'"
        width="25"
        height="auto"
        :src="require('@/assets/word.png')"
      />
      <i v-else class="mdi mdi-file-document-outline"></i>
    </span>
  </div>
</template>

<script>
import { imageTypes } from "../../helper";
export default {
  name: "BaseFileViewer",
  props: ["uploadPath"],
  data() {
    return {
      imageTypes: imageTypes,
    };
  },
};
</script>

<style>
</style>
