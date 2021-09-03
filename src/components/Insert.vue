<template>
  <div style="width:20vw; margin:4vw; float:left;">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-accountDt"
        label="날짜:"
        label-for="input-accounDt"
        description=""
      >
        <b-form-datepicker 
          id="accountDt" 
          v-model="form.accountDt" 
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-division" label="구분:" label-for="input-division">
        <b-form-select
          id="divisionId"
          v-model="form.divisionId"
          :options="divisionItems"
          @change="getCategoryList"
          required
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-member" label="주체:" label-for="input-member">
        <b-form-select
          id="memberId"
          v-model="form.memberId"
          :options="memberItems"
          required
          @change="getPaymentList"
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-payment" label="결제수단:" label-for="input-payment">
        <b-form-select
          id="paymentId"
          v-model="form.paymentId"
          :options="paymentItems"
          required
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-category" label="대분류:" label-for="input-category">
        <b-form-select
          id="categoryId"
          v-model="form.categoryId"
          :options="categoryItems"
          required
          @change="getCategorySeqList"
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-categorySeq" label="소분류:" label-for="input-categorySeq">
        <b-form-select
          id="categorySeq"
          v-model="form.categorySeq"
          :options="categorySeqItems"
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-price" label="가격:" label-for="input-price">
        <b-form-input
          id="price"
          v-model="form.price"
          required
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-remark" label="내용:" label-for="input-remark">
        <b-form-input
          id="remark"
          v-model="form.remark"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-impulseYn" label="충동지출:" label-for="input-impulseYn">
        <b-form-select
          id="impulseYn"
          v-model="form.impulseYn"
          :options="impulse"
          required
          style="width:100%;"
        ></b-form-select>
      </b-form-group>

      <div style="margin-top:10px;">
        <b-button type="submit" variant="primary" style="margin-right:5px;">등록</b-button>
        <b-button type="reset" variant="danger">초기화</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          divisionId: null,
          memberId: null,
          paymentId: null,
          categoryId: null,
          remark: ''
        },
        divisionItems: [],
        memberItems: [],
        paymentItems: [],
        categoryItems: [],
        categorySeqItems: [],
        impulse: ['N', 'Y'],
        show: true,
        serverSideUrl: 'http://146.56.159.174/account_book',
        param: {}
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        this.param = {
          'account_dt': this.form.accountDt.replaceAll('-', ''),
          'division_id': this.form.divisionId,
          'member_id': this.form.memberId,
          'payment_id': this.form.paymentId,
          'category_id': this.form.categoryId,
          'category_seq': this.form.categorySeq,
          'price': this.form.price,
          'remark': this.form.remark,
          'impulse_yn': this.form.impulseYn,
        }
        this.insertAccount(this.param)
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      getDivisionList() {
        axios.get(this.serverSideUrl + "/division_list")
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.divisionItems = []
            res.data.result_data.forEach(item => 
              this.divisionItems.push({
                text: item.division_nm,
                value: item.division_id
              })
            )
          }
        })
        .then((err)=>{
          console.log(err)
        })
      },
      getMemberList() {
        axios.get(this.serverSideUrl + "/member_list")
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.memberItems = []
            res.data.result_data.forEach(item => 
              this.memberItems.push({
                text: item.member_nm,
                value: item.member_id
              })
            )
          }
        })
        .then((err)=>{
          console.log(err)
        })
      },
      getPaymentList() {
        axios.get(this.serverSideUrl + "/payment_list/" + this.form.memberId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.paymentItems = []
            res.data.result_data.forEach(item => 
              this.paymentItems.push({
                text: item.payment_nm,
                value: item.payment_id
              })
            )
          }
        })
        .then((err)=>{
          console.log(err)
        })
      },
      getCategoryList() {
        axios.get(this.serverSideUrl + "/category_list/" + this.form.divisionId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.categoryItems = []
            res.data.result_data.forEach(item => 
              this.categoryItems.push({
                text: item.category_nm,
                value: item.category_id
              })
            )
          }
        })
        .then((err)=>{
          console.log(err)
        })
      },
      getCategorySeqList() {
        axios.get(this.serverSideUrl + "/category_seq_list/" + this.form.categoryId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.categorySeqItems = []
            res.data.result_data.forEach(item => 
              this.categorySeqItems.push({
                text: item.category_seq_nm,
                value: item.category_seq
              })
            )
          }
        })
        .then((err)=>{
          console.log(err)
        })
      },
      insertAccount(param) {
        axios.post(this.serverSideUrl + "/account", param)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            alert('success!!')
          }
        })
      }
    },
    created() {
      this.getDivisionList()
      this.getMemberList()
    }
  }
</script>