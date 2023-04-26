<template>
  <div class="card">
    <ViewReportDynamicModal v-if="isHasDynamicRow || isGeneratedRow" ref="viewReportDynamicModalRef"/>
    <ViewReportModal v-else ref="viewReportModalRef"/>
  </div>
</template>

<script>
import ViewReportModal from "./viewReportModal";
import ViewReportDynamicModal from "./viewReportDynamicModal";
import Service from "@/modules/report/reportService";

export default {
  name: "vueReportFromQRcode",
  data() {
    return {
      isHasDynamicRow: false,
      isGeneratedRow: false,
    }
  },
  components: {
    ViewReportModal,
    ViewReportDynamicModal,
  },
  async created() {

    let report = {}
    await Service.reportGetById( this.$route.params.id ).then( ({data}) => {
      report = data;
    } );
    this.isHasDynamicRow = report.hasDynamicRowsForTable
    this.isGeneratedRow = report.isGenerated
    if (report.hasDynamicRowsForTable) {
      setTimeout( () => {
        this.$refs.viewReportDynamicModalRef.getById( report.docTableId, report.id );
      }, 400 );
    } else {
      if (report.isGenerated) {
        setTimeout( () => {
          this.$refs.viewReportDynamicModalRef.getById( report.docTableId, report.id );
        }, 400 );
      } else {
        setTimeout( () => {
          this.$refs.viewReportModalRef.getById( report.docTableId, report.id );
        }, 400 );
      }
    }
  }
}
</script>

<style scoped>

</style>
