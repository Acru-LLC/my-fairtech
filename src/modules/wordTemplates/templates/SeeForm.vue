<template>

  <b-card
      class="h-100"
      no-body
  >
    <b-card-body>
      <b-card-title class="headline d-flex justify-content-between align-items-center">
        <b-btn
            variant="warning"
            class="text-capitalize"
            @click="goBack"
        >
          {{ $t('actions.back') }}
        </b-btn>
      </b-card-title>
    </b-card-body>
    <div class="no-licence" style="position: relative !important">
      <froala
          id="edit"
          v-model="editingItem.bodyHtml"
          :tag="'textarea'"
          :config="config"
          ref="editorRef"
      ></froala>
    </div>
  </b-card>

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

Vue.use(VueFroala)
import "froala-editor/js/languages/ru";
import Service from "@/modules/letter/letterService";

const MAIN_API_URL = 'templates'
import crudAndListsService from "@/shared/services/crud_and_list.service"
import i18n from "@/i18n";
import Vue from "vue";
import {bus} from "@/main";


export default {
  name: "CreateForm",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    text: {
      handler(v) {
        this.$emit("changeText", v);
      },
    },
  },
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
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
      categoryId: null,
      category: [],
      editingItem: {},
      statuses: []
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateTemplates'
    },
    computedObserver() {
      return this.$refs.observer
    },

  },

  /*
  * METHODS */
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    setTextContent(v) {
      this.editingItem.bodyHtml = v;
    },
    customLabelCategory(opt) {
      let selected = this.category.find(e => e.id === opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    fetchCategoryList(keyword = '', callback = null) {
      Service.searchList('template/category', this.var_default_search_payload, null, true)
          .then(res => {
            this.category = res.data.list
            callback();
          })
          .catch(e => {
            console.log(e)
          })
    },

    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: node.name,
        }
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  /*
  * CREATED */
  async created() {
    this.var_default_search_payload.itemsPerPage = 500

    await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
        .then(res => {
          this.editingItem = res.data
        })
        .catch(e => {
          console.log(e)
        })

  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>


<style lang="scss" scoped>
.example {
  display: flex;
  flex-direction: column;

  .editor {
    height: 30rem;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>