import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  data: {
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        display: true,
        yAxes: [{
          labelString: '',
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }]
      }
    }
  }
}
