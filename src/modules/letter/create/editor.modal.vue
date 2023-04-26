<template>
  <b-modal
    :scrollable="scroll"
    content-class="shadow"
    v-model="value"
    :no-close-on-backdrop="true"
    :size="size"
    body-class="pb-1"
  >
    <template v-slot:modal-header>
      <h5>{{ $t(title) }}</h5>
      <div @click="$emit('closeModal')">
        <b-button variant="light" size="sm">
          <i class="fa fa-times"></i>
        </b-button>
      </div>
    </template>
    <slot name="body"></slot>
    <template v-slot:modal-footer>
      <b-button
        style="padding: 11.5px 16px 11.5px 15px"
        variant="secondary"
        @click="$emit('closeModal')"
      >
        {{ $t(cancelText) }}</b-button
      >
      <b-overlay :opacity="0.1" :show="loader" rounded="sm">
        <b-button
          v-if="hasOkButton"
          style="padding: 11.5px 16px 11.5px 15px"
          :disabled="loader"
          :variant="variantOk"
          @click="$emit('okModal')"
        >
          {{ $t(okText) }}
        </b-button>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
    };
  },
  methods: {
    loading(v) {
      this.loader = v;
    },
  },
  props: {
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
  },
};
</script>

<style>
</style>