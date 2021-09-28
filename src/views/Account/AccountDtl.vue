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
  }
};
</script>
