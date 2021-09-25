<template>
  <div class="home">
    <!-- AccoutSummary component -->
    <div style="">
      <AccountSummary></AccountSummary>
    </div>

    <!-- CategorySeqChart component -->
    <div style="width:40vw; float:left;">
      <CategorySeqChart></CategorySeqChart>
    </div>

    <!-- AccountList component -->
    <div style="">
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
