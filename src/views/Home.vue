<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input type="text" v-model="name"/>
    <span>{{name}}</span>
    <button v-on:click="getMainList">TEST</button>
    <ul>
      <li v-for="l in list" v-bind:key="l">{{l}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: "Home",
  components: {
  },
  data() {
      return {
        name: "서강원",
        list: []
      }
  },
  methods: {
    getMainList() {
      axios.get("http://146.56.159.174/account_book/account_list")
      .then((res)=>{
        this.list = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    }
  }
};
</script>
