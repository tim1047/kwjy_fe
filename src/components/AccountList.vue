<template>
  <div class="home" style="width:70vw; float:left;">
    <b-jumbotron :header="jumboHeader" lead="원하는 월을 선택하여 조회해주세요.">
      <b-form-select v-model="curMonth" :options="monthList"></b-form-select>
      <b-button variant="primary">조회</b-button>
    </b-jumbotron>
    <b-container fluid>
      <b-table responsive bordered fixed small :fields="fields" :items="items">
        <template #cell(actions)="data">
         <b-button size="sm" @click="update(data)" class="mr-1">
            수정
          </b-button>
          <b-button size="sm" @click="update(data)">
            삭제
          </b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import EventBus from '@/lib/EventBus.js'

export default {
  name: "accountList",
  components: {
  },
  data() {
      return {
        fields: [
          { key: 'account_id', label: '순번'},
          { key: 'account_dt', label: '날짜'},
          { key: 'division_nm', label: '구분'},
          { key: 'member_nm', label: '주체'},
          { key: 'payment_nm', label: '결제수단'},
          { key: 'category_nm', label: '대분류'},
          { key: 'category_seq_nm', label: '소분류'},
          { key: 'price', label: '가격'},
          { key: 'remark', label: '내용'},
          { key: 'impulse_yn', label: '충동지출'},
          { key: 'actions', label: '수정/삭제'}
        ],
        items: [],
        curMonth: null,
        monthList: [],
        jumboHeader: ''
       }
  },
  methods: {
    getMainList() {
      // axios call
      axios.get("http://146.56.159.174:8000/account_book" + "/account")
      .then((res)=>{
        // set account list
        this.items = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    },
    update(data) {
      console.log(data.item)
    },
    setAccountDtList() {
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
    // init account list
    this.getMainList()

    // set jumboHeader text
    this.curMonth = new Date().getMonth() + 1
    this.jumboHeader = this.curMonth + "월 가계부"
    // set month list
    this.setAccountDtList()

    // receive event bus from Insert.vue
    // refresh account list
    EventBus.$on('insert', this.getMainList)
  }
};
</script>
