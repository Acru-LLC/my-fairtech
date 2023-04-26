<template>
  <b-badge
      variant="success"
      class="p-1"
      v-if="status=='VISA_APPROVED'"
  >
    {{ $t('submodules.dxa.VISA_APPROVED') }}
  </b-badge>
</template>

<script>
export default {
  name: "ApplicationStatusBadge",
  props: {
    status: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      variant: '',
      text: '',
    };
  },
  created() {
      switch (this.status) {
        case 'CREATED':
          this.variant = 'secondary'
          break;
        case 'RECEIVED':
          this.variant = 'secondary'
          break;
        case 'BEING_SEEN':
          this.variant = 'warning'
          break;
        case 'EXTENDED':
          this.variant = 'warning'
          break;
        case 'SEEN':
          this.variant = 'info'
          break;
        case 'NOT_BELONG':
          this.variant = 'info'
          break;
        case 'SENT':
          this.variant = 'primary'
          break;
        case 'CANCELLED':
          this.variant = 'danger'
          break;
        case 'SEND_FOR_COMMISSION':
          this.variant = 'info'
          break;
        case 'COMMISSION_BEING_SEEN':
          this.variant = 'warning'
          break;
        case 'COMMISSION_SEEN':
          this.variant = 'info'
          break;
        case 'COMMISSION_SENT':
          this.variant = 'primary'
          break;
        case 'COMMISSION_SIGNED':
          this.variant = 'success'
          break;
        case 'COMMISSION_CANCELLED':
          this.variant = 'danger'
          break;
        case 'SEND_FOR_TAKE_VISA':
          this.variant = 'warning'
          break;
        case 'VISA_APPROVED':
          this.variant = 'success'
          break;
        case 'REVIEW_CLOSED':
          this.variant = 'success'
          break;
        default:
          this.variant = 'success'
          break;
    }
  }
}
</script>

<style scoped>

</style>