<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-nav-item><b-link to="/">정윤 * 강원 가계부</b-link></b-nav-item>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><b-link to="accountDtl">가계부 통계</b-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <div style="">
      <b-jumbotron :header="jumboHeader" lead="원하는 날짜를 선택하여 조회해주세요.">
        <b-form-select v-model="curYear" :options="yearList"></b-form-select>
        <b-form-select v-model="curMonth" :options="monthList"></b-form-select>
        <b-button variant="primary" @click="goSearch()">조회</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      yearList: [],
      monthList: [],
      curYear: this.$store.state.date.curYear,
      curMonth: this.$store.state.date.curMonth
    }
  },
  methods: {
    init() {
      this.setAccountDtList()
      this.goSearch()
    },
    setAccountDtList() {
      // set month list
      for(let i=1;i<=12;i++){
        this.monthList.push({
            text: i+"월",
            value: i 
          })
      }
      for(let i=2021;i<=2023;i++){
        this.yearList.push({
            text: i+"년",
            value: i 
          })
      }
    },
    goSearch() {
      this.$store.commit('setYear', this.curYear)
      this.$store.commit('setMonth', this.curMonth)
    }
  },
  created() {
    this.init()
  },
  computed: {
    jumboHeader() {
      return this.$store.state.date.curMonth + "월 가계부"
    }
  }
};
</script>