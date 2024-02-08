<script>
import Loader from "./loader";
import VueApexCharts from 'vue-apexcharts'

/**
 * Email-sent component
 */
export default {
  components: {
    VueApexCharts,
    Loader,
  },
  data() {
    return {
      series: [
        {
          name: "Series A",
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
        },
        {
          name: "Series B",
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
        },
        {
          name: "Series C",
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
        },
      ],
      chartOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        colors: ["#2b6c58", "#f1b44c", "#34c38f"],
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
  props: {
    updating: {
      type: Boolean,
    },
  },
};
</script>
<template>
  <Loader :loading="updating">
    <div class="card">
      <div class="card-body">
        <div class="d-sm-flex flex-wrap">
          <h4 class="card-title mb-4">Email Sent</h4>
          <div class="ms-auto">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="javascript: void(0);">Week</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript: void(0);">Month</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="javascript: void(0);">Year</a>
              </li>
            </ul>
          </div>
        </div>

        <vue-apex-charts
          class="apex-charts"
          type="bar"
          dir="ltr"
          height="360"
          :series="series"
          :options="chartOptions"
        ></vue-apex-charts>
      </div>
    </div>
  </Loader>
</template>