<template>
  <vue-apex-charts
      type="donut"
      :options="chart.options"
      :series="chart.series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "petrol-count-by-region-chart",
  components: {
    VueApexCharts,
  },
  data(){
    return {
      chart: {
        series: [1, 2, 4, 5, 2, 3, 64, 13, 13, 3, 8, 9, 34, 12,],
        options: {
          chart: {
            type: 'donut',
          },
          labels: [
            'Andijon 1',
            'Andijon 2',
            'Andijon 4',
            'Andijon 5',
            'Andijon 2',
            'Andijon 3',
            'Andijon 64',
            'Andijon 13',
            'Andijon 13',
            'Andijon 3',
            'Andijon 8',
            'Andijon 9',
            'Andijon 34',
            'Andijon 12',
          ],
          title: {
            text: 'Huhudlar boyocha AYOQSH\'lar soni',
            align: 'left'
          },
          responsive: [{
            breakpoint: 100,
            options: {
              legend: {
                position: 'right'
              }
            }
          }]
        },
      },
    }
  },
}
</script>

<style scoped>

</style>