<template>
  <div class="home">    
    <!-- AccoutSummary component -->
    <div style="margin:1vw;">
      <AccountSummary></AccountSummary>
    </div>

    <!-- CategorySeqChart component -->
    <div style="margin:1vw;">
      <CategorySeqChart></CategorySeqChart>
    </div>

    <!-- AccountList component -->
    <div style="margin:1vw;">
      <AccountList></AccountList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AccountSummary from "@/components/AccountSummary.vue";
import CategorySeqChart from "@/components/CategorySeqChart.vue";
import AccountList from "@/components/AccountList.vue";

export default {
  name: "AccountMain",
  components: {
    AccountSummary,
    CategorySeqChart,
    AccountList
  },
  data() {
      return {
      }
  },
  methods: {
    init() {
     
    }
  }
};
</script>
