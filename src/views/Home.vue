<template>
  <div class="home">
    <div id="table">
      <bootstrap-table :columns="columns" :data="data" :options="options"></bootstrap-table>
    </div>
    <div>
      <b-table responsive :fields="fields" :items="items"></b-table>
    </div>
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
        ],
        items: []
      }
  },
  methods: {
    getMainList() {
      axios.get("http://146.56.159.174/account_book/account")
      .then((res)=>{
        this.items = res.data.result_data
      })
      .then((err)=>{
        console.log(err)
      })
    }
  },
  created() {
    this.getMainList()
  }
};
</script>
