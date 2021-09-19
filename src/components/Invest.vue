<template>
    <div style="width:45vw; float:left;">
        <b-table-simple hover small caption-top responsive>
            <caption>투자:</caption>
            <colgroup><col><col><col></colgroup>
            <colgroup><col><col><col><col><col><col></colgroup>
            <b-thead head-variant="dark">
            <b-tr>
                <b-th></b-th>
                <b-th>계획</b-th>
                <b-th>실제</b-th>
                <b-th>1W</b-th>
                <b-th>2W</b-th>
                <b-th>3W</b-th>
                <b-th>4W</b-th>
                <b-th>5W</b-th>
                <b-th>6W</b-th>
            </b-tr>
            <b-tr>
                <b-th>총합</b-th>
                <b-th>0</b-th>
                <b-th>{{investItems[0].total_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_first_week_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_second_week_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_third_week_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_fourth_week_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_fifth_week_sum_price | comma}}</b-th>
                <b-th>{{investItems[0].total_sixth_week_sum_price | comma}}</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="(item) in investItems" v-bind:key="item">
                <b-th>{{item.category_nm}}</b-th>
                <b-th>0</b-th>
                <b-td>{{item.sum_price | comma}}</b-td>
                <b-td>{{item.first_week_sum_price | comma}}</b-td>
                <b-td>{{item.second_week_sum_price | comma}}</b-td>
                <b-td>{{item.third_week_sum_price | comma}}</b-td>
                <b-td variant="success">{{item.fourth_week_sum_price | comma}}</b-td>
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
  name: "Invest",
  components: {
  },
  data() {
      return {
        investItems: [],
        serverSideUrl: 'http://146.56.159.174:8000/account_book'
      }
  },
  methods: {
    getInvest() {
      axios.get(this.serverSideUrl + "/category_sum/2")
      .then((res)=>{
        // set account list
        this.investItems = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    }
  },
  created() {
    this.getInvest()
  }
};
</script>
