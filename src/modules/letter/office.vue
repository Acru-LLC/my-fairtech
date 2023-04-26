<template>
  <div
    class="form"
    :style="{
      height: `${heightWindow}px !important`,
    }"
  >
    <!-- <b-button variant="primary">
      Yopish
    </b-button> -->
    <div id="placeholder"></div>
  </div>
</template>


<script>
import DocsService from "./letterService";

export default {
  name: "Office",

  methods: {
    getBaseUrl() {
      return process.env.VUE_APP_ROOT_URL;
    },
    getRootApi() {
      return process.env.VUE_APP_ROOT_API;
    },
    getById(id) {
      DocsService.getByIdLetter(id).then((rs) => {
        if (rs.data) {
          this.setConfg(rs);
        }
      });
    },
    setConfg(rs) {
      setTimeout(() => {
        let config = {
          document: {
            url: `${this.getBaseUrl()}/${rs.data.url}`,
            key: rs.data.key,
            title: rs.data.title,
            fileType: rs.data.fileType,
          },
          documentType: rs.data.documentType,
          height: "100%",
          width: "100%",
          editorConfig: {
            callbackUrl: `${rs.data.callbackUrl}`,
            lang: 'ru',
          },
        };
        new DocsAPI.DocEditor("placeholder", config);
      }, 300);
    }
  },
  async created() {
    if (this.$route.query.page === "GET") {
      if (this.$route.query.id) {
        this.getById(this.$route.query.id);
      }
    }
  },
};
</script>
