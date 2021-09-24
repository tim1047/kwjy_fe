<template>
    <div style="width:45vw; float:left; margin:2vw">
        <b-table-simple small bordered caption-top responsive>
            <caption>지출:</caption>
            <colgroup><col><col><col></colgroup>
            <colgroup><col><col><col><col><col><col></colgroup>
            <b-thead head-variant="dark">
            <b-tr>
                <b-th variant="secondary"></b-th>
                <b-th variant="secondary">계획</b-th>
                <b-th variant="secondary">실제</b-th>
                <b-th variant="secondary">1W</b-th>
                <b-th variant="secondary">2W</b-th>
                <b-th variant="secondary">3W</b-th>
                <b-th variant="secondary">4W</b-th>
                <b-th variant="secondary">5W</b-th>
                <b-th variant="secondary">6W</b-th>
            </b-tr>
            <b-tr>
                <b-th variant="secondary">총합</b-th>
                <b-th variant="secondary">{{expenseItems.reduce((a, c) => a + parseInt(c.plan_price), 0) | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_first_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_second_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_third_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_fourth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_fifth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{expenseItems[0].total_sixth_week_sum_price | comma}}</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="(item) in expenseItems" v-bind:key="item">
                <b-th variant="secondary">{{item.category_nm}}</b-th>
                <b-th variant="secondary">{{item.plan_price | comma}}</b-th>
                <b-td variant="secondary">{{item.sum_price | comma}}</b-td>
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
  name: "Expense",
  components: {
  },
  data() {
      return {
        expenseItems: []
      }
  },
  methods: {
    init() {
      this.getExpense()
    },
    getExpense() {
      axios.get(this.serverSideUrl + "/category_sum/3?strtDt=" + this.strtDt + '&endDt=' + this.endDt)
      .then((res)=>{
        // set account list
        this.expenseItems = res.data.result_data
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
