<template>
    <div style="width:45vw; float:left; margin:2vw">
        <b-table-simple small bordered caption-top responsive>
            <caption>지출상세:</caption>
            <colgroup><col><col></colgroup>
            <colgroup><col></colgroup>
            <colgroup><col><col><col><col><col><col></colgroup>
            <b-thead head-variant="secondary">
            <b-tr>
                <b-th colspan="2" variant="secondary"></b-th>
                <b-th variant="secondary">실제</b-th>
                <b-th variant="secondary">1W</b-th>
                <b-th variant="secondary">2W</b-th>
                <b-th variant="secondary">3W</b-th>
                <b-th variant="secondary">4W</b-th>
                <b-th variant="secondary">5W</b-th>
                <b-th variant="secondary">6W</b-th>
            </b-tr>
            <b-tr>
                <b-th colspan="2" variant="secondary">지출전체총합</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_first_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_second_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_third_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_fourth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_fifth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_sixth_week_sum_price | comma}}</b-th>
            </b-tr>
            <b-tr>
                <b-th colspan="2" variant="warning">고정비용합</b-th>
                <b-th variant="warning">{{fixedPriceItems.reduce((a, c) => a + parseInt(c.sum_price), 0) | comma}}</b-th>
                <b-th variant="warning" v-for="(item) in fixedPriceItems" v-bind:key="item">
                  {{item.sum_price | comma}}
                </b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="(item) in expenseItems" v-bind:key="item">
                <b-th variant="secondary">{{item.category_nm}}</b-th>
                <b-th variant="secondary">{{item.category_seq_nm}}</b-th>
                <b-td>{{item.sum_price | comma}}</b-td>
                <b-td>{{item.first_week_sum_price | comma}}</b-td>
                <b-td>{{item.second_week_sum_price | comma}}</b-td>
                <b-td>{{item.third_week_sum_price | comma}}</b-td>
                <b-td>{{item.fourth_week_sum_price | comma}}</b-td>
                <b-td>{{item.fifth_week_sum_price | comma}}</b-td>
                <b-td>{{item.sixth_week_sum_price | comma}}</b-td>
            </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: "ExpenseDtl",
  components: {
  },
  data() {
      return {
        expenseItems: [],
        fixedPriceItems: []
      }
  },
  methods: {
    init() {
      this.getCategorySeqSum()
      this.getFixedPriceSum()
    },
    getCategorySeqSum() {
      axios.get(this.serverSideUrl + "/category_seq_sum/3?strtDt=" + this.strtDt + '&endDt=' + this.endDt)
      .then((res)=>{
        // set category seq sum list
        this.expenseItems = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    },
    getFixedPriceSum() {
      axios.get(this.serverSideUrl + "/fixed_price_sum?strtDt=" + this.strtDt + '&endDt=' + this.endDt)
      .then((res)=>{
        // set fixed price list
        this.fixedPriceItems = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    }
  },
  created() {
    this.init()
  },
  computed: {
    date() {
      return {
        curDate: this.$store.state.date.curDate,
        curYear: this.$store.state.date.curYear,
        curMonth: this.$store.state.date.curMonth
      }
    },
    strtDt() {
      return this.date.curYear + ('0' + this.date.curMonth).slice(-2) + '01'
    },
    endDt() {
      return this.date.curYear + ('0' + this.date.curMonth).slice(-2) + new Date(this.date.curYear, this.date.curMonth, 0).getDate()
    },
    serverSideUrl() {
      return this.$store.state.apiUrl
    }
  },
  watch: {
    date() {
      this.init()
    }
  }
};
</script>
