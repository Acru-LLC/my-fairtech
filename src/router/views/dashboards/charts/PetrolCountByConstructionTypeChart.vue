<template>
  <vue-apex-charts
      type="radialBar"
      height="360"
      :options="chart.options"
      :series="chart.series"
  ></vue-apex-charts>

</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "petrol-count-by-construction-type-chart",
  components: {
    VueApexCharts,
  },
  data() {
    return {
      chart: {
        series: [44, 55, 67, 83],
        options: {
          chart: {
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: true,
                  label: 'Total',
                  formatter: function (w) {
                    return 249
                  }
                }
              }
            }
          },
          labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
        },
      },
    }
  },
}
</script>

<style scoped>

</style>