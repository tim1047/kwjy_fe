<template>
  <div>
    <Income></Income>
    <Invest></Invest>
    <Expense></Expense>
    <ExpenseDtl></ExpenseDtl>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ExpenseDtl from "@/components/ExpenseDtl.vue";
import Expense from "@/components/Expense.vue";
import Invest from "@/components/Invest.vue";
import Income from "@/components/Income.vue";


export default {
  name: "AccountDtl",
  components: {
    ExpenseDtl,
    Expense,
    Income,
    Invest
  },
  data() {
      return {
        expenseItems: [],
        serverSideUrl: 'http://146.56.159.174:8000/account_book'
      }
  },
  methods: {
    getExpenseDtl() {
      axios.get(this.serverSideUrl + "/category_seq_sum/3")
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
    this.getExpenseDtl()
  }
};
</script>
