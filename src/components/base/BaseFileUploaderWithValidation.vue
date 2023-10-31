<template>
  <div :class="baseWrapperClass">
    <label class="base-form-component__label" :style="!labelOnTop ? 'margin-bottom: 0rem' : ''">{{ label }}</label>

    <vue-dropzone
        v-bind="$attrs"
        v-on="$listeners"
        :id="`base-dropzone-${label}`"
        ref="appealFileUpload"
        class="base-form-component__main-form-element base-dropzone"
        :options="options"
        @vdropzone-file-added="uploadDone"
        @vdropzone-removed-file='remove'
        :destroyDropzone="true"
    ></vue-dropzone>

    <!-- INVALID FEEDBACK -->
    <b-form-invalid-feedback
        v-if="!hideErrorMsg"
        :style="{'display': 'block', 'margin-top': '.15rem'}"
        class="base-form-component__invalid-feedback"
    >
      <!-- {{ validationContext.errors[0] }} -->
    </b-form-invalid-feedback>
    <!-- HELP TEXT -->
    <b-form-text v-if="infoMsg" class="base-form-component__info-msg">
      {{ infoMsg }}
    </b-form-text>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "BaseFileUploaderWithValidation",
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    labelOnTop: {
      type: Boolean,
      default: true
    },
    wrapperClasses: {
      type: String,
      default: ''
    },
    hideErrorMsg: {
      type: Boolean,
      default: false
    },
    infoMsg: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true,
    },
    maxFiles: {
      default: 5,
    },
    maxFilesize: {
      default: 10,
    },
    mimes: {
      default: null,
      type: String,
    }
  },
  data() {
    return {
      options: {
        url: process.env.BASE_URL,
        maxFiles: 5,
        maxFilesize: 10,
        acceptedFiles: null,
        addRemoveLinks: true,
        autoProcessQueue: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        dictDefaultMessage: this.$t('dropzone.defaultMessage'),
        dictFallbackMessage: this.$t('dropzone.fallbackMessage'),
        dictFallbackText: this.$t('dropzone.fallbackText'),
        dictFileTooBig: this.$t('dropzone.fileTooBig', {
          filesize: '{filesize}',
          maxFilesize: '{maxFilesize}'
        }),
        dictInvalidFileType: this.$t('dropzone.invalidFileType'),
        dictResponseError: this.$t('dropzone.responseError', { statusCode: '{statusCode}' }),
        dictCancelUpload: this.$t('×'),
        dictCancelUploadConfirmation: this.$t('dropzone.cancelUploadConfirmation'),
        dictRemoveFile: this.$t('×'),
        dictMaxFilesExceeded: this.$t('dropzone.maxFilesExceeded'),
      },
      uploaded: [],
    };
  },
  created() {
    this.options.maxFiles = this.maxFiles;
    this.options.maxFilesize = this.maxFilesize;
    this.options.acceptedFiles = this.mimes;
  },
  methods: {
    generateUUID() {
      let dt = new Date().getTime();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },
    remove(file) {
      this.uploaded = this.uploaded.filter(f => f.uuid !== (file.upload && file.upload.uuid ? file.upload.uuid : file.uuid))
      this.$emit('input', this.uploaded)
    },
    uploadDone(file) {
      this.uploaded.push(
          {
            file: file,
            uuid: file.upload && file.upload.uuid ? file.upload.uuid : file.uuid,
            name: file.name
          }
      )
      this.$emit('input', this.uploaded);
    },
    removeAll(){
      this.$refs.appealFileUpload.removeAllFiles();
    }

  },
  computed: {
    baseWrapperClass(){
      return this.wrapperClasses + (this.labelOnTop ? '' : ' base-input-wrapper base-form-input base-form-component')
    },
  }
};
</script>

<style scoped>
::v-deep.base-dropzone .dz-preview .dz-progress {
  display: none;
}
</style>