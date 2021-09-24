<template>
  <div>
    <div style="width:30vw; float:left; margin:2vw;">
        <b-table-simple bordered small caption-top responsive>
            <colgroup><col></colgroup>
            <colgroup><col></colgroup>
            <colgroup><col></colgroup>
            <b-tbody>
              <b-tr>
                <b-th variant="secondary">월 마감</b-th>
                <b-th variant="secondary">당월</b-th>
                <b-th variant="secondary">전월 대비</b-th>
              </b-tr>
              <b-tr>
                <b-th variant="secondary">수입</b-th>
                <b-td variant="secondary">{{divisionSum['income'] | comma}}</b-td>
                <b-td>{{divisionSum['income'] - prevDivisionSum['income'] | comma}}</b-td>
              </b-tr>
              <b-tr>
                <b-th variant="secondary">지출</b-th>
                <b-td variant="secondary">{{divisionSum['expense'] | comma}}</b-td>
                <b-td>{{divisionSum['expense'] - prevDivisionSum['expense'] | comma}}</b-td>
              </b-tr>
              <b-tr>
                <b-th variant="secondary">순수익(수입-지출)</b-th>
                <b-td variant="secondary">{{divisionSum['interest'] | comma}}</b-td>
                <b-td>{{divisionSum['interest'] - prevDivisionSum['interest'] | comma}}</b-td>
              </b-tr>
              <b-tr>
                <b-th variant="secondary">투자</b-th>
                <b-td variant="secondary">{{divisionSum['invest'] | comma}}</b-td>
                <b-td>{{divisionSum['invest'] - prevDivisionSum['invest'] | comma}}</b-td>
              </b-tr>
              <b-tr>
                <b-th variant="secondary">투자율</b-th>
                <b-td variant="secondary">{{divisionSum['invest_rate'] | comma}}</b-td>
                <b-td>{{divisionSum['invest_rate'] - prevDivisionSum['invest_rate'] | comma}}</b-td>
              </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>

    <div style="width:15vw; float:left; margin:2vw;">
        <b-table-simple bordered small caption-top responsive>
            <colgroup><col></colgroup>
            <colgroup><col></colgroup>
            <b-tbody>
              <b-tr>
                <b-th variant="secondary">지출주체현황</b-th>
                <b-td variant="secondary"></b-td>
              </b-tr>
              <b-tr v-for="(item) in memberSum" v-bind:key="item">
                <b-th variant="secondary">{{item.member_nm}}</b-th>
                <b-td>{{item.sum_price | comma}}</b-td>
              </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import EventBus from '@/lib/EventBus.js'

export default {
  name: "accountSummary",
  components: {
  },
  props: ['searchDate'],
  data() {
      return {
        date: this.searchDate,
        strtDt: '',
        endDt: '',
        divisionSum: {},
        prevDivisionSum: {},
        memberSum: []
       }
  },
  methods: {
    getAccountSummary() {
      this.getDivisionSum()
      this.getMemberSum()
    },
    getDivisionSum() {
      this.strtDt = this.date.curYear + ('0' + this.date.curMonth).slice(-2) + '01'
      this.endDt = this.date.curYear + ('0' + this.date.curMonth).slice(-2) + new Date(this.date.curYear, this.date.curMonth, 0).getDate()

      // axios call
      axios.get("http://146.56.159.174:8000/account_book" + "/division_sum?strtDt=" + this.date.curYear + ('0' + this.date.curDate.getMonth()).slice(-2) + '01' + "&endDt=" + this.date.curYear + ('0' + this.date.curDate.getMonth()).slice(-2) + new Date(this.date.curYear, this.date.curDate.getMonth(), 0).getDate())
      .then((res)=>{
        if(res.data.result_message == "SUCCESS"){
          this.prevDivisionSum = res.data.result_data
        }
      })
      axios.get("http://146.56.159.174:8000/account_book" + "/division_sum?strtDt=" + this.strtDt + "&endDt=" + this.endDt)
      .then((res)=>{
        if(res.data.result_message == "SUCCESS"){
          this.divisionSum = res.data.result_data
        }
      })
    },
    getMemberSum() {
      axios.get("http://146.56.159.174:8000/account_book" + "/member_sum?strtDt=" + this.strtDt + "&endDt=" + this.endDt)
      .then((res)=>{
        if(res.data.result_message == "SUCCESS"){
          this.memberSum = res.data.result_data
        }
      })
    }
  },
  created() {
    // init account list
    this.getAccountSummary()

    // receive event bus from Insert.vue
    // refresh account list
    EventBus.$on('insert', this.getAccountSummary)
    EventBus.$on('delete', this.getAccountSummary)
  }
};
</script>
