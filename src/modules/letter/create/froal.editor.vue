<template>
  <div class="no-licence" style="position: relative !important">

    <froala
        id="edit"
        v-model="text"
        :tag="'textarea'"
        :config="config"
        ref="editorRef"
    ></froala>
  </div>
</template>

<script>
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import VueFroala from 'vue-froala-wysiwyg'

import "froala-editor/js/languages/ru";

export default {
  components: {},
  watch: {
    text: {
      handler(v) {
        this.$emit("changeText", v);
      },
    },
  },
  methods: {
    setTextContent(v) {
      this.text = v;
    },
  },
  data() {
    return {
      text: ``,
      editor: null,
      config: {
        tableStyles: {
          class1: "No borders",
        },
        embedlyScriptPath: "",
        imageInsertButtons: ["imageUpload", "|", "imageByURL"],
        language: "ru",
        events: {
          "image.beforeUpload": (files) => {
            let editor = this.$refs.editorRef.getEditor();
            if (files.length > 0) {
              let reader = new FileReader();
              reader.onload = (e) => {
                let result = e.target.result;
                editor.image.insert(result, null, null, editor.image.get());
              };
              reader.readAsDataURL(files[0]);
            }
            editor.popups.hideAll();
            return false;
          },
        },
        documentReady: true,
        fontSize: [
          "3",
          "4",
          "6",
          "8",
          "9",
          "10",
          "11",
          "12",
          "14",
          "16",
          "18",
          "22",
          "24",
          "30",
          "36",
          "48",
          "60",
          "72",
          "96",
        ],
        fontFamilyDefaultSelection: "Times New Roman",
        // imageUploadRemoteUrls: false,
        toolbarButtons: [
          "fullscreen",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "textColor",
          "backgroundColor",
          // "|",
          "fontFamily",
          "fontSize",
          // "color",
          // "inlineClass",
          // "inlineStyle",
          // "paragraphStyle",
          "lineHeight",
          "|",
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          // "quote",
          // "-",
          // "insertLink",
          "insertImage",
          // "insertVideo",
          //   "embedly",
          //   "insertFile",
          "insertTable",
          "html",
          "|",
          //   "emoticons",
          //   "fontAwesome",
          "specialCharacters",
          // "insertHR",
          // "selectAll",
          // "clearFormatting",
          // "|",
          //   "print",
          //   "getPDF",
          //   "spellChecker",
          // "help",

          //   "|",
          //   "undo",
          //   "redo",
        ],
        charCounterCount: false,
        tabSpaces: 4,
        height: 600,
        fontSizeUnit: "pt",
        placeholderText: "",

        // events: {
        //   initialized: function () {},
        // },
      },
    };
  },
};
</script>

<style lang="scss">
.fr-wrapper {
  border-left: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-right: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-radius: 0px 0px 4px 4px !important;
}

.fr-toolbar {
  border-left: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-right: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-radius: 4px 4px 0px 0px !important;
}

.fr-element * {
  margin: 0px !important;
  font-size: 14pt;
}

.fr-second-toolbar {
  display: none !important;
}

.fr-quick-insert {
  display: none !important;
}

.fr-sticky-on {
  position: absolute !important;
  /* display: none !important; */
}

.fr-element {
  /* padding: 1cm !important; */
}

.fr-popup {
  z-index: 1052 !important;
}

.fr-box.fr-basic .fr-element.fr-view {
  font-family: "Times New Roman", Georgia, Serif;
  font-size: 18px;
  color: #444444;
}

.fr-element {
  padding: 2cm 1.5cm 2cm 3cm !important;
}

.class1 td,
.class1 th {
  border: none !important;
}
</style>