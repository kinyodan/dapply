<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">

      <card-component title="Applications" class="has-table has-mobile-sort-spaced">
        <applications-table :applications_list="applications_list"
                            :data-url="`${$router.options.base}data-sources/clients.json`"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import ClientsTableSample from '~/components/ApplicationsTable'
import ApplicationsService from "~/services/ApplicationsService";
import ApplicationsTable from "~/components/ApplicationsTable";

export default {
  name: 'Home',
  layout:'Default',
  components: {
    ApplicationsTable,
    ClientsTableSample,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      applications_list:[],
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Applications']
    },
    listItems(){
      return this.applications_list
    }
  },
  created(){
    this.getApplicationsList()
  },
  mounted() {
    this.fillChartData()
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false,
    })
  },
  methods: {
    async getApplicationsList(){
      await ApplicationsService.lisApplications().then(response=>{
        if(response.data.status){
          this.applications_list=response.data.data
        }
      })
    },
    randomChartData(n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
      }
    },
  },
  head() {
    return {
      title: 'Applications —Wankimani ',
    }
  },
}
</script>
