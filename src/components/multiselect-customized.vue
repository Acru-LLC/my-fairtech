<template>
  <div :class="{ invalid: isInvalid }">
    <multiselect
      :label="label"
      :placeholder="''"
      :selectLabel="$t('actions.select')"
      :selectedLabel="$t('selected')"
      :deselectLabel="$t('actions.delete')"
      :track-by="trackId"
      :close-on-select="closeOnSelect"
      v-model="value"
      @search-change="fetch"
      :options="options"
      :multiple="multiple"
      :hide-selected="hideSelected"
      :internal-search="internalSearch"
      :searchable="searchable"
      :allow-empty="true"
      :disabled="isDisabled"
      @close="onTouch"
    >
      <template slot="noResult">
        <span>{{ $t("messages.data_not_found") }}</span>
      </template>
      <template slot="noOptions">
        <span>{{ $t("messages.data_not_found") }}</span>
      </template>
    </multiselect>

    <!-- <div class="text-danger" style="font-size:10px" v-show="isInvalid">{{$t('error.name_error')}}</div> -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  watch: {
    value: {
      handler(v) {
        this.$emit("value", v);
      },
    },
  },
  props: {
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    trackId: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    hideSelected: {
      type: Boolean,
      default: false,
    },
    internalSearch: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    showErr: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      isDisabled: false,
      isTouched: false,
      value: null,
    };
  },
  computed: {
    isInvalid() {
      return (
        (this.isTouched && this._empty(this.value) && this.showErr) ||
        (this.submitted && this._empty(this.value))
      );
    },
  },
  methods: {
    onTouch() {
      this.isTouched = true;
    },
    fetch(query) {
      this.$emit("searchItem", query);
    },
    reset() {
      this.value = null;
    },
    setValue(v) {
      this.value = v;
    },
  },
};
</script>

<style>
</style>
