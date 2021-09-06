<template>
    <div style="width:45vw; float:left;">
        <b-table-simple hover small caption-top responsive>
            <caption>지출:</caption>
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
                <b-th>{{expenseItems[0].total_sum_price}}</b-th>
                <b-th>0</b-th>
                <b-th>0</b-th>
                <b-th>0</b-th>
                <b-th>0</b-th>
                <b-th>0</b-th>
                <b-th>0</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="(item) in expenseItems" v-bind:key="item">
                <b-th>{{item.category_nm}}</b-th>
                <b-th>0</b-th>
                <b-td>{{item.sum_price}}</b-td>
                <b-td>0</b-td>
                <b-td>0</b-td>
                <b-td>0</b-td>
                <b-td variant="success">0</b-td>
                <b-td>0</b-td>
                <b-td>0</b-td>
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
        expenseItems: [],
        serverSideUrl: 'http://146.56.159.174:8000/account_book'
      }
  },
  methods: {
    getExpense() {
      axios.get(this.serverSideUrl + "/category_sum/3")
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
    this.getExpense()
  }
};
</script>
