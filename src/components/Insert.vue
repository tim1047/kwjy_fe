<template>
  <div>
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
        <b-button v-if="selectedForm" @click="updateAccount" variant="primary" style="margin-right:5px;">수정</b-button>
        <b-button v-else type="submit" variant="primary" style="margin-right:5px;">등록</b-button>
        <b-button type="reset" variant="danger">초기화</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import EventBus from '@/lib/EventBus.js'

  export default {
    props: ['selectedForm'],
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
        param: {}
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()

        // parameter set
        this.param = {
          'account_dt': this.form.accountDt.replaceAll('-', ''),
          'division_id': this.form.divisionId,
          'member_id': this.form.memberId,
          'payment_id': this.form.paymentId,
          'category_id': this.form.categoryId,
          'category_seq': this.form.categorySeq == null ? '' : this.form.categorySeq,
          'price': this.form.price,
          'remark': this.form.remark,
          'impulse_yn': this.form.impulseYn,
        }
        // parameter validate

        // insert account
        this.insertAccount(this.param)
      },
      onReset(event) {
        event.preventDefault()
        // reset form data
        this.clearFormData()
      },
      clearFormData() {
        this.accountDt = null
        this.form.divisionId = null
        this.form.memberId = null
        this.form.paymentId = null
        this.form.categoryId = null
        this.form.categorySeq = null
        this.form.remark = ''
        this.form.price = ''
        this.form.impulseYn = null
      },
      getDivisionList() {
        // axios call
        axios.get(this.serverSideUrl + "/division_list")
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.divisionItems = []
            
            // set division select box 
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
        // axios call
        axios.get(this.serverSideUrl + "/member_list")
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.memberItems = []

            // set member select box
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
        // axios call
        axios.get(this.serverSideUrl + "/payment_list/" + this.form.memberId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.paymentItems = []

            // set payment select box
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
        // axios
        axios.get(this.serverSideUrl + "/category_list/" + this.form.divisionId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.categoryItems = []

            // set category select box
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
        // axios call
        axios.get(this.serverSideUrl + "/category_seq_list/" + this.form.categoryId)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            this.categorySeqItems = []

            // set category seq select box
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
        // axios call
        axios.post(this.serverSideUrl + "/account", param)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            alert('저장 완료!!')

            // eventbus emit to AccountList.vue
            EventBus.$emit('insert')

            // form data reset
            this.clearFormData()
          }
        })
      },
      updateAccount() {
        // parameter set
        this.param = {
          'account_dt': this.form.accountDt.replaceAll('-', ''),
          'division_id': this.form.divisionId,
          'member_id': this.form.memberId,
          'payment_id': this.form.paymentId,
          'category_id': this.form.categoryId,
          'category_seq': this.form.categorySeq == null ? '' : this.form.categorySeq,
          'price': this.form.price,
          'remark': this.form.remark,
          'impulse_yn': this.form.impulseYn,
          'account_id': this.form.accountId
        }
        
        // axios call
        axios.put(this.serverSideUrl + "/account", this.param)
        .then((res)=>{
          if(res.data.result_message == "SUCCESS"){
            alert('수정 완료!!')

            // eventbus emit to AccountList.vue
            EventBus.$emit('insert')

            // form data reset
            this.clearFormData()
          }
        })
      }
    },
    created() {
      // 
      if(this.selectedForm){
        this.form = this.selectedForm
        this.getPaymentList()
        this.getCategoryList()
        this.getCategorySeqList()
      }

      // get division list
      this.getDivisionList()
      // get account memeber list
      this.getMemberList()
    },
    computed: {
      serverSideUrl() {
        return this.$store.state.apiUrl
      }
    }
  }
</script>