<script>
//Importing Bar class from the vue-chartjs wrapper
import {Bar} from 'vue-chartjs'
import axios from 'axios';

//Exporting this so it can be used in other components
export default {
  extends: Bar,
  data() {
    return {
      chartLabelData: [],
      chartData: [],
      datacollection: {
        //Data to be represented on x-axis
        labels: this.chartLabelData,
        datasets: [
          {
            label: '지출항목별 비중',
            backgroundColor: '#0ead38',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: this.chartData
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
            display: true
          },
        responsive: true,
        maintainAspectRatio: false
      },
      serverSideUrl: 'http://146.56.159.174:8000/account_book'
    }
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.getExpense()
  },
  methods: {
    getExpense() {
      axios.get(this.serverSideUrl + "/category_sum/3")
      .then((res)=>{
        // set chart data
        for(var key in res.data.result_data){
          this.chartLabelData.push(res.data.result_data[key]['category_nm'])
          this.chartData.push(((res.data.result_data[key]['sum_price'] / res.data.result_data[key]['total_sum_price']) * 100).toFixed(2))

          this.datacollection.labels = this.chartLabelData
          this.datacollection.datasets[0].data = this.chartData
          this.renderChart(this.datacollection, this.options)
        }
      })
      .then((err)=>{
        console.log(err)
      })
    }
  }
}
</script>