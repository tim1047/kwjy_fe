<template>
  <div class="home">
    <button v-on:click="getMainList">TEST</button>
    <div class="accountTbList">
      <colgroup>
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <tr>
        <th>순번</th>
        <th>날짜</th>
        <th>구분</th>
        <th>주체</th>
        <th>결제수단</th>
        <th>대분류</th>
        <th>소분류</th>
        <th>금액</th>
        <th>내용</th>
        <th>충동구매</th>
      </tr>
      <tr v-for="(row, idx) in list" v-bind:key="idx">
        <td>{{row.account_id}}</td>
        <td>{{row.account_dt}}</td>
        <td>{{row.division_nm}}</td>
        <td>{{row.member_nm}}</td>
        <td>{{row.payment_nm}}</td>
        <td>{{row.category_nm}}</td>
        <td>{{row.category_seq_nm}}</td>
        <td>{{row.price}}</td>
        <td>{{row.remark}}</td>
        <td>{{row.impulse_yn}}</td>
      </tr>
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
