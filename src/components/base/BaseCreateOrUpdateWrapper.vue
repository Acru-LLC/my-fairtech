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
        <!--    TITLE    -->
        <div>
          {{ customTitle ? customTitle : $t('column.create_update') }}
        </div>
        <div class="actions">
          <!-- SHOW THESE ACTIONS ONLY FOR INVENTORY DOCUMENT -->
          <b-btn
              v-if="forParentInventoryDoc"
              variant="primary"
              class="text-capitalize mr-3"
              @click="$emit('make-income')"
          >
            {{ $t("actions.income") }}
          </b-btn>
          <b-btn
              v-if="forParentInventoryDoc"
              variant="error"
              class="text-capitalize mr-3"
              @click="$emit('make-write-off')"
          >
            {{ $t("actions.write_off") }}
          </b-btn>
          <b-btn
              v-if="hasSaveFinish"
              variant="success"
              class="text-capitalize mr-3"
              @click="$emit('save-finish')"
          >
            {{ $t("actions.save_finish") }}
          </b-btn>
          <b-overlay
              :show="loader"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
          >
          <b-btn
              :disabled="loader"
              v-if="hasSaveSuspend"
              :variant="hasSaveFinish ? 'warning' : 'success'"
              class="text-capitalize"
              @click="emitSave"
          >
            {{ $t("actions.save") }}
          </b-btn>
          </b-overlay>
        </div>
      </b-card-title>
      <hr/>
      <slot></slot>

      <b-card-title class="headline d-flex justify-content-between align-items-center">
        <b-btn
            v-if="hasBackBottom"
            variant="warning"
            class="text-capitalize"
            @click="goBack"
        >
          {{ $t('actions.back') }}
        </b-btn>
        <div class="actions">
          <!-- SHOW THESE ACTIONS ONLY FOR INVENTORY DOCUMENT -->
          <b-btn
              v-if="forParentInventoryDoc"
              variant="primary"
              class="text-capitalize mr-3"
              @click="$emit('make-income')"
          >
            {{ $t("actions.income") }}
          </b-btn>
          <b-btn
              v-if="forParentInventoryDoc"
              variant="error"
              class="text-capitalize mr-3"
              @click="$emit('make-write-off')"
          >
            {{ $t("actions.write_off") }}
          </b-btn>

          <b-btn
              v-if="hasSaveFinishBottom"
              variant="success"
              class="text-capitalize mr-3"
              @click="$emit('save-finish')"
          >
            {{ $t("actions.save_finish") }}
          </b-btn>
          <b-btn
              v-if="hasSaveSuspendBottom"
              :variant="hasSaveFinishBottom ? 'warning' : 'success'"
              class="text-capitalize"
              @click="emitSave"
          >
            {{ $t("actions.save") }}
          </b-btn>
        </div>
      </b-card-title>

    </b-card-body>
  </b-card>
</template>

<script>
import {bus} from "@/main";

export default {
  name: "BaseCreateOrUpdateWrapper",
  /*
  * PROPS */
  data() {
    return {
      loader: false
    }
  },
  props: {
    hasSaveFinish: {
      type: Boolean,
      default: false
    },
    hasSaveSuspend: {
      type: Boolean,
      default: false
    },
    hasSaveFinishBottom: {
      type: Boolean,
      default: false
    },
    hasSaveSuspendBottom: {
      type: Boolean,
      default: false
    },
    hasBackBottom: {
      type: Boolean,
      default: false
    },
    forParentInventoryDoc: {
      type: Boolean,
      default: false
    },
    customTitle: {
      type: String,
      default: ''
    },
    goBackRoute: {
      type: Object,
      default: () => {
      }
    }
  },
  /*
  METHODS */
  methods: {
    emitSave() {
      this.loader = true
      bus.leaveWithConfirm = false
      this.$emit('save')
      setTimeout(() => {
        bus.leaveWithConfirm = true
        this.loader = false
      }, 3000)
    },
    goBack() {
      bus.leaveWithConfirm = true
      if (this.goBackRoute && this.goBackRoute.name) {
        this.$router.push(this.goBackRoute)
      } else {
        this.$router.go(-1)
      }
    }
  }
};
</script>

<style scoped>
</style>
