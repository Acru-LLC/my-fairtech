<template>
  <div>
    <b-modal
      id="widthM"
      :scrollable="scroll"
      content-class="shadow"
      v-model="value"
      :no-close-on-backdrop="true"
      :hide-backdrop="hideBackDrop"
      :size="size"
      body-class="pb-1"
    >
      <template v-slot:modal-header>
        <h4>{{ title }}</h4>

        <div class="d-flex align-items-center">
          <div class="mr-3">
            <b-button
              v-if="signerHide"
              @click="setUser"
              style="padding: 11.5px 16px 11.5px 15px"
              variant="primary"
            >
              <b-overlay :opacity="0.1" :show="loaderUser" rounded="sm">
                <i class="fa fa-user-check mr-2" style="font-size: 16px"></i>
                {{ $t("actions.imzolovchi") }}
              </b-overlay>
            </b-button>
          </div>
          <div class="mr-3">
            <b-button
              @click="$emit('viewModalClick')"
              style="padding: 11.5px 16px 11.5px 15px"
              variant="primary"
            >
              <b-overlay :opacity="0.1" :show="loaderPdf" rounded="sm">
                <i class="fa fa-eye mr-2" style="font-size: 16px"></i>
                {{ $t("actions.view_pdf") }}
              </b-overlay>
            </b-button>
          </div>
          <div @click="$emit('closeModal')">
            <b-button variant="light" style="padding: 11.5px 16px 11.5px 15px">
              <i class="fa fa-times"></i>
            </b-button>
          </div>
        </div>
      </template>
      <!-- Signature -->
      <b-sidebar
        backdrop-variant="transparent"
        class="sidebar-part"
        shadow
        backdrop
        sidebar-class="p-0"
        :no-header="true"
        right
        v-model="isSidebar_3"
      >
        <MemberesSignature
          :notIn="false"
          @asyncValue="asyncValue_3"
          :async="true"
          @cancel="isSidebar_3 = false"
          ref="partRef_3"
        />
      </b-sidebar>
      <slot name="body"></slot>
      <template v-slot:modal-footer>
        <b-button
          style="padding: 11.5px 16px 11.5px 15px"
          variant="danger"
          @click="$emit('closeModal')"
        >
          {{ $t(cancelText) }}</b-button
        >

        <b-button
          v-if="hasOkButton"
          style="padding: 11.5px 16px 11.5px 15px"
          :disabled="loader"
          :variant="variantOk"
          @click="$emit('okModal')"
        >
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            {{ $t(okText) }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import MemberesSignature from "./MemberesSignature.vue";
export default {
  components: {
    MemberesSignature,
  },
  data() {
    return {
      loader: false,
      loaderPdf: false,
      loaderUser: false,
      isSidebar_3: false,
    };
  },
  methods: {
    asyncValue_3(v) {
      this.$emit("signerSet", v);
    },
    setUser() {
      this.isSidebar_3 = true;
    },
    loading(v) {
      this.loader = v;
    },
    loadingPdf(v) {
      this.loaderPdf = v;
    },
    loadingUser(v) {
      this.loaderUser = v;
    },
  },
  props: {
    signerHide: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    hasOkButton: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: "OK",
    },
    cancelText: {
      type: String,
      default: "actions.cancel",
    },
    title: {
      type: String,
      default: "Title",
    },
    variantOk: {
      type: String,
      default: "primary",
    },
    hideBackDrop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@media (min-width: 992px) {
  #widthM .modal-xl {
    max-width: 80% !important;
  }
}
</style>
