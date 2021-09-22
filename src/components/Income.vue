<template>
    <div style="width:45vw; float:left;">
        <b-table-simple small bordered caption-top responsive>
            <caption>수입:</caption>
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
                <b-th variant="secondary">0</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_first_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_second_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_third_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_fourth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_fifth_week_sum_price | comma}}</b-th>
                <b-th variant="secondary">{{incomeItems[0].total_sixth_week_sum_price | comma}}</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="(item) in incomeItems" v-bind:key="item">
                <b-th variant="secondary">{{item.category_nm}}</b-th>
                <b-th variant="secondary">0</b-th>
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
  name: "Income",
  components: {
  },
  data() {
      return {
        incomeItems: [],
        serverSideUrl: 'http://146.56.159.174:8000/account_book'
      }
  },
  methods: {
    getIncome() {
      axios.get(this.serverSideUrl + "/category_sum/1")
      .then((res)=>{
        // set account list
        this.incomeItems = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    }
  },
  created() {
    this.getIncome()
  }
};
</script>
