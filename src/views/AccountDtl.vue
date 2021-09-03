<template>
  <div class="home" style="max-width: 120rem; margin: auto;">
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

export default {
  name: "AccountDtl",
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
        items: []
       }
  },
  methods: {
    getCategorySum() {
      axios.get("http://146.56.159.174/account_book" + "/category_sum")
      .then((res)=>{
        this.items = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    },
    update(data) {
      console.log(data.item)
    }
  },
  created() {
    this.getCategorySum()
  }
};
</script>
