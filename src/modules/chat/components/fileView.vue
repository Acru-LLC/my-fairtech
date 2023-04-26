<template>
  <div v-if="uploadPath" class="avatar-sm">
    <span class="avatar-title rounded-circle bg-white text-primary font-size-24">
      <img
          v-if="imageTypes.indexOf(getExtension) > -1"
          :src="requireImg"
          height="auto"
          alt
          width="25"
      />
      <img
          v-else-if="['txt', 'text'].includes(getExtension)"
          :src="requireTxt"
          height="auto"
          alt
          width="30"
      />
      <img
          v-else-if="['pdf'].includes(getExtension)"
          :src="requirePdf"
          height="auto"
          alt
          width="25"
      />
      <img
          v-else-if="['pptx', 'ppt'].includes(getExtension)"
          :src="requirePpt"
          height="auto"
          alt
          width="25"
      />
      <img
          v-else-if="['zip', 'rar', 'tar', 'xz', 'gz'].includes(getExtension)"
          :src="requireZip"
          height="auto"
          alt
          width="30"
      />
      <img
          v-else-if="['xlsx', 'xls'].includes(getExtension)"
          :src="requireExcel"
          height="auto"
          alt
          width="25"
      />
      <img
          v-else-if="['docx', 'doc', 'odt'].includes(getExtension)"
          :src="requireWord"
          height="auto"
          alt
          width="25"
      />
      <i v-else class="mdi mdi-file-document-outline"/>
    </span>
  </div>
</template>

<script>
import { imageTypes } from "@/helper";

export default {
  props: ["uploadPath"],
  data() {
    return {
      imageTypes: imageTypes,
    };
  },
  computed: {
    getExtension() {
      return this.uploadPath.split(".").pop().toLowerCase();
    },
    requireImg() {
      return require('@/assets/img.png');
    },
    requireTxt() {
      return require('@/assets/txt.png');
    },
    requirePdf() {
      return require('@/assets/pdf.png');
    },
    requirePpt() {
      return require('@/assets/ppt.png');
    },
    requireZip() {
      return require('@/assets/zip.png');
    },
    requireExcel() {
      return require('@/assets/excel.png');
    },
    requireWord() {
      return require('@/assets/word.png');
    },
  },
};
</script>

<style>
</style>