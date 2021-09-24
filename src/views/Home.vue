<template>
  <div>
    <AccountList />
  </div>
</template>

<script>
// @ is an alias to /src
import AccountList from "@/components/AccountList.vue";

export default {
  name: "Home",
  components: {
    AccountList,
  }
};
</script>
