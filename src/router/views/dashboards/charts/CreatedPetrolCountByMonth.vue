<template>
  <vue-apex-charts
      type="line"
      height="350"
      :options="chart.chartOptions"
      :series="chart.series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "created-petrol-count-by-month",
  data(){
    return {
      chart: {
        series: [
          {
            name: "Umumiy",
            data: [28, 29, 33, 36, 32, 32, 33, 33, 36, 32, 23, 14]
          },
          {
            name: "Andijon",
            data: [2, 1, 4, 8, 7, 3, 3, 1, 6, 1, 2, 5]
          }
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Hududlar bo\'yicha yangi qo\'shilgan shaxobchlar',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
      },
    }
  },
  components: {
    VueApexCharts,
  }
}
</script>

<style scoped>

</style>