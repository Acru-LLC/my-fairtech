<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between pb-3">
        <h4 class="mb-0 font-size-18">{{ title }}</h4>
        <div class="page-title-right">
          <b-breadcrumb class="m-0">
            <b-breadcrumb-item
                v-for="(item, index) in items"
                :key="`page-header-breadcrumb-${index}`"
                :to="item.to"
                :active="item.active"
            >
              {{ item.text }}
            </b-breadcrumb-item>
          </b-breadcrumb>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>
