<template>
  <div class="home">
    <b-jumbotron :header="jumboHeader" lead="원하는 월을 선택하여 조회해주세요.">
      <b-form-select v-model="date.curMonth" :options="monthList"></b-form-select>
      <b-button variant="primary" @click="getMainList">조회</b-button>
    </b-jumbotron>

    <AccountSummary v-bind:searchDate="date"></AccountSummary>
    <div style="width:40vw; float:left;">
      <CategorySeqChart></CategorySeqChart>
    </div>

    <div style="float:left;">
      <b-button v-b-modal="'insert-modal'" variant="primary" style="margin:0.5vw;">등록</b-button>
      <b-container fluid>
        <b-table responsive bordered fixed small :fields="fields" :items="items">
          <template #cell(actions)="data">
          <b-button size="sm" v-b-modal="'update-modal'" @click="updateAccount(data)" variant="primary" style="margin-right:5px;">
              수정
            </b-button>
            <b-button size="sm" @click="deleteAccount(data)" type="submit" variant="danger">
              삭제
            </b-button>
          </template>
        </b-table>
      </b-container>
      <b-button v-b-modal="'insert-modal'" variant="primary" style="margin:0.5vw;">등록</b-button>
    </div>

    <b-modal id="insert-modal" ok-only>
      <Insert></Insert>
    </b-modal>

    <b-modal id="update-modal" ok-only>
      <Insert v-bind:selectedForm="selectedForm"></Insert>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import EventBus from '@/lib/EventBus.js'
import AccountSummary from "@/components/AccountSummary.vue";
import Insert from "@/components/Insert.vue";
import CategorySeqChart from "@/components/CategorySeqChart.vue";

export default {
  name: "accountList",
  components: {
    AccountSummary,
    Insert,
    CategorySeqChart
  },
  data() {
      return {
        fields: [
          { key: 'seq', label: '순번'},
          { key: 'account_dt', label: '날짜'},
          { key: 'division_nm', label: '구분'},
          { key: 'member_nm', label: '주체'},
          { key: 'payment_nm', label: '결제수단'},
          { key: 'category_nm', label: '대분류'},
          { key: 'category_seq_nm', label: '소분류'},
          { key: 'price', label: '가격'},
          { key: 'remark', label: '내용'},
          { key: 'impulse_yn', label: '충동지출'},
          { key: 'actions', label: '수정/삭제'},
          { key: 'account_id', thClass: 'd-none', tdClass: 'd-none' },
          { key: 'member_id', thClass: 'd-none', tdClass: 'd-none' },
          { key: 'division_id', thClass: 'd-none', tdClass: 'd-none' },
          { key: 'payment_id', thClass: 'd-none', tdClass: 'd-none' },
          { key: 'category_id', thClass: 'd-none', tdClass: 'd-none' },
          { key: 'category_seq', thClass: 'd-none', tdClass: 'd-none' },
        ],
        items: [],
        date: {
          curDate: null,
          curYear: null,
          curMonth: null,
          prevMonth: null
        },
        strtDt: '',
        endDt: '',
        monthList: [],
        jumboHeader: '',
        param: {},
        selectedForm: {}
       }
  },
  methods: {
    getMainList() {
      this.getAccountList()
    },
    getAccountList() {
      this.strtDt = this.date.curYear + ('0' + this.date.curMonth).slice(-2) + '01'
      this.endDt = this.date.curYear + ('0' + this.date.curMonth).slice(-2) + new Date(this.date.curYear, this.date.curMonth, 0).getDate()

      // axios call
      axios.get("http://146.56.159.174:8000/account_book" + "/account?strtDt=" + this.strtDt + "&endDt=" + this.endDt)
      .then((res)=>{
        // set account list
        this.items = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    },
    updateAccount(data) {
      console.log(data.item)
      // set parameter
      this.selectedForm = {
        'accountId': data.item.account_id,
        'accountDt': data.item.account_dt.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
        'divisionId': data.item.division_id,
        'memberId': data.item.member_id,
        'paymentId': data.item.payment_id,
        'categoryId': data.item.category_id,
        'categorySeq': data.item.category_seq,
        'price': data.item.price,
        'remark': data.item.remark,
        'impulseYn': data.item.impulse_yn
      }
    },
    deleteAccount(data) {
      if(!confirm('데이터를 삭제하시겠습니까?')){
        return
      }
      // set parameter
      this.param = {
        'account_id': data.item.account_id
      }
      // axios call
      axios.delete("http://146.56.159.174:8000/account_book" + "/account", {
        data: this.param
      })
      .then((res)=>{
        if(res.data.result_message == "SUCCESS"){
          alert("삭제 완료!!")
          
          // eventbus emit
          EventBus.$emit('delete')

          // refresh account list
          this.getMainList()
        }
      })
      .then((err)=>{
        console.log(err)
      })
    },
    setAccountDtList() {
      // set month list
      for(let i=1;i<=12;i++){
        this.monthList.push(
          {
            text: i+"월",
            value: i 
          }
        )
      }
    }
  },
  created() {
    // set jumboHeader text
    this.date.curDate = new Date()
    this.date.curYear = this.date.curDate.getFullYear()
    this.date.curMonth = this.date.curDate.getMonth() + 1
    this.jumboHeader = this.date.curMonth + "월 가계부"

    // set month list
    this.setAccountDtList()

    // init account list
    this.getMainList()

    // receive event bus from Insert.vue
    // refresh account list
    EventBus.$on('insert', this.getMainList)
    EventBus.$on('delete', this.getMainList)
  }
};
</script>
