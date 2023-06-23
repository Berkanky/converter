<template>
 <!-- <q-page class="flex-column">
    <div class="row" align="center">
      <div class="col-4">
        <q-select
        filled
        v-model="this.currency"
        input-debounce="0"
        label="Simple filter"
        :options="this.currencyList[0]"
        @update:model-value="resultSelect"
      >
      </q-select>
      </div>
      <div class="col-4">
        <q-select
        filled
        v-model="this.secondCurrency"
        input-debounce="0"
        label="Simple filter"
        :options="this.currencyList[0]"
        @update:model-value="resultSecondSelect"
      >
      </q-select>
      </div>
      <div class="col-4">
        <q-input v-model="this.amount" label="Standard" />
      </div>
    </div>
    <div class="row">
      <q-btn color="dark" icon="send" size="md" v-on:click="getResult"></q-btn>
    </div>
    <div class="row">
      <p v-if="this.convertResult.length!=0">{{this.amount}} {{this.currency}} = {{(this.convertResult.response.rates[this.secondCurrency])*this.amount}} {{this.secondCurrency}} </p>
    </div>
    <div class="row">
      <q-input v-model="date">
        <template v-slot:append>
              <q-btn icon="event" round color="primary">
      <q-popup-proxy  cover transition-show="scale" transition-hide="scale" >
        <q-date v-model="this.date"  @update:model-value="saveDate" mask="YYYY-MM-DD">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-btn color="green" size="md" icon="check" v-on:click="getHistorical"></q-btn>
      <p v-if="this.historicalResult.length!=0">{{this.amount}} {{this.currency}} {{this.date}} Tarihinde {{((this.amount)*(this.historicalResult.response.rates[this.secondCurrency])).toFixed(2)}} {{this.secondCurrency}} Değerindedir.</p>
    </div>
    <div class="row">
      <q-btn icon="clear" size="md" color="red" v-on:click="clearData"></q-btn>
    </div>
    <div class="row" v-if="this.historicalResult.length!=0">{{}}</div>
  </q-page>-->
  <q-page class="flex-column">
    <div class="" style="width:60%;margin:0 auto;background-color:white;padding:10px;">
      <div class="" align="left">
        <h5 style="color:#f87979;font-weight:bold;">Currency Calculation</h5>
      </div>
      <div class="row">
        <p style="font-size:16px;font-weight:bold;">Process <span style="padding:8px;background-color:#f87979;border-radius:4px;color:White;" v-if="this.store.convertResult.length!=0">{{this.store.currency}} - {{this.store.secondCurrency}}</span> Progress With Theese Currencies</p>
      </div>
      <div class="inputDiv" >
        <div class="">
          <h5 style="color:teal;font-weight:bold;position:absolute;margin-top:-18px;">Currency Calculator</h5>
        </div>
        <div class="row" style="margin-top:2%;">
          <p style="font-weight:bold;font-size:16px;margin-left:4px;"><span style="color:red;">*</span><span>Required Fields.</span></p>
        </div>
        <div class="row" style="margin-top:1%;">
          <div class="col-2">
            <p style="font-weight:bold;font-size:16px;color:dark;margin-top:15px;margin-left:5px;">Value :</p>
          </div>
          <div class="col-8">
             <q-input filled v-model="this.store.amount" v-on:keyup="amountValue" label="Please Enter Value"  color="white">
              <template v-slot:append>
                <q-icon name="clear" color="red" v-on:click="this.store.amount=null"></q-icon>
              </template>
             </q-input>
          </div>
          <div class="col-2">
            <transition appear
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutRight">
                <p style="font-weight:bold;font-size:16px;margin-top:15px;margin-left:4px;" >{{this.store.amount}}</p>
            </transition>
          </div>
        </div>
        <div class="row" style="margin-top:1%;">
          <div class="col-2">
            <p style="font-weight:bold;font-size:16px;color:dark;margin-top:15px;margin-left:5px;"><span style="color:red;">*</span> First Currency :</p>
          </div>
          <div class="col-8">
            <q-select
              filled
              v-model="this.store.currency"
              input-debounce="0"
              label="Select First Currency"
              :options="this.store.currencyList[0]"
              @update:model-value="resultSelect"
              >
              <template v-slot:prepend>
                <q-icon name="clear" color="red" v-on:click="this.store.currency=null"></q-icon>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row" style="margin-top:1%;">
          <div class="col-2">
            <p style="font-weight:bold;font-size:16px;color:dark;margin-top:15px;margin-left:5px;"><span style="color:red;">*</span> Second Currency :</p>
          </div>
          <div class="col-8">
            <q-select
              filled
              v-model="this.store.secondCurrency"
              input-debounce="0"
              label="Select Second Currency"
              :options="this.store.currencyList[0]"
              @update:model-value="resultSecondSelect"
            >
              <template v-slot:prepend>
                <q-icon name="clear" color="red" v-on:click="this.store.secondCurrency=null"></q-icon>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row" style="margin-top:1%;">
          <div class="col-2">
            <p style="font-weight:bold;font-size:16px;color:dark;margin-top:15px;margin-left:5px;">Quick Select :</p>
          </div>
          <div class="col-10" align="center" >
            <q-btn label="EUR - TL"  v-on:click="firstQuick"  class="quickButtonStyles"></q-btn>
            <q-btn label="USD - TL"  style="margin-left:3px;" v-on:click="secondQuick" class="quickButtonStyles"></q-btn>
            <q-btn label="CAD - TL"  style="margin-left:3px;" v-on:click="thirdQuick" class="quickButtonStyles"></q-btn>
            <q-btn label="TL - EUR"  style="margin-left:3px;" v-on:click="fourthQuick" class="quickButtonStyles"></q-btn>
            <q-btn label="TL - USD"  style="margin-left:3px;" v-on:click="fifthQuick" class="quickButtonStyles"></q-btn>
            <q-btn label="TL - CAD"  style="margin-left:3px;" v-on:click="sixthQuick" class="quickButtonStyles"></q-btn>
          </div>
        </div>
        <div class="" style="margin-top:2%;margin-bottom:2%;margin-right:17%;" align="right">
            <q-btn label="Calculate" style="color:white;background-color:#f87979;" size="13px" rounded v-on:click="getResult"></q-btn>
            <q-btn label="Clear" style="color:#f87979;background-color:white;margin-left:4px;" size="13px" rounded v-on:click="clearAllData"></q-btn>
          <!--<div class="col-6" align="center">
              <q-btn label="hesapla" style="color:white;background-color:#f87979;" size="18px" rounded v-on:click="getResult"></q-btn>
          </div>
          <div class="col-6" align="center">
              <q-btn label="Temizle" style="color:#f87979;background-color:white;" size="18px" rounded v-on:click="clearAllData"></q-btn>
          </div>-->
        </div> 
      </div>
      <transition-group appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <results v-if="this.store.convertResult.length!=0"/>
        <historical v-if="this.store.convertResult.length!=0" style="margin-top:-55%;"/>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import {useCounterStore} from "../stores/store"
import historical from "../pages/historicalRates.vue"
import results from "../pages/resultPage.vue"
export default {
  components:{
    results,
    historical
  },
  setup(){
    const store = useCounterStore()
    return{
      store
    }
  },
  data:function(){
    return{
      currencyList : [],
      currency:'',
      secondCurrency:'',
      amount:1,
      convertResult : [],
      date:null,
      historicalResult:[],
      secondCurrencyResult : null
    }
  },
  methods:{
    clearAllData(){
      this.store.convertResult = []
      this.store.currency = ''
      this.store.secondCurrency = ''
      this.store.amount = 1
      this.store.secondCurrencyResult = null
      this.store.historicalResult = []
    },
    amountValue(){
      if(this.store.amount!=null&&this.store.amount!=''&&this.store.currency!=''&&this.store.secondCurrency!=''){
        this.getResult()  
      }
    },
    resultLiveCurrent(){
      //{{(this.convertResult.response.rates[this.secondCurrency])*this.amount}}
      this.store.secondCurrencyResult = ((this.store.convertResult.response.rates[this.store.secondCurrency])*this.store.amount)
      this.store.secondCurrencyResult = (this.store.secondCurrencyResult).toFixed(2)
      console.log(this.store.secondCurrencyResult)
    },
    sixthQuick(){
      this.store.currency = 'TRY'
      this.store.secondCurrency = 'CAD'
      this.getResult()
    },
    fifthQuick(){
      this.store.currency = 'TRY'
      this.store.secondCurrency = 'USD'
      this.getResult()
    },
    fourthQuick(){
      this.store.currency = 'TRY'
      this.store.secondCurrency = 'EUR'
      this.getResult()
    },
    thirdQuick(){
      this.store.currency = 'CAD'
      this.store.secondCurrency = 'TRY'
      this.getResult()
    },
    secondQuick(){
      this.store.currency = 'USD'
      this.store.secondCurrency = 'TRY'
      this.getResult()
    },
    firstQuick(){
      this.store.currency = 'EUR'
      this.store.secondCurrency = 'TRY'
      this.getResult()
      ////console.log(this.secondCurrencyResult)
    },
    async getTimeline(){
      const res = await fetch(`https://api.currencyscoop.com/v1/timeseries?api_key=2e2859b6bea44c2f58b7cc3f0a59ad58&base=USD&start_date=2021-01-01&end_date=2021-01-25`)
      const data = await res.json()
      //console.log('Timeline',data)
    },
    clearData(){
      this.store.convertResult = []
      this.store.historicalResult = []
      this.store.currency = null
      this.store.secondCurrency = null
      this.store.amount = null
      this.store.date = null
    },
    async getResult(){
      if(this.store.currency!=null&&this.store.currency!=''&&this.store.secondCurrency!=''&&this.store.secondCurrency!=null){
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'e2880f91d9mshfb17a8e0244a72ep13079cjsn4b92a900ff35',
            'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
          }
        };
        const res = await fetch(`https://currencyscoop.p.rapidapi.com/latest?base=${this.store.currency}`, options)
        const data = await res.json()
        this.store.convertResult = data
        //window.scrollTo({top:0,behavior:'smooth'})
        window.scroll({top:300,behavior:'smooth'})
        console.log('Result',this.store.convertResult)
        this.resultLiveCurrent()
        //this.$q.notify({
          //type:'positive',
          //message:'Proccess Complete',
          //timeout:700
        //})
        //setTimeout(()=>{
          //this.$router.push({name:'resultPage'})
        //},1000)
        //this.amount,this.currency,this.amount*(data.response.rates[this.secondCurrency]),this.secondCurrency
      }else{
        this.$q.notify({
          type:'negative',
          message:'Please Fill In The Required Fields',
          timeout:2000
        })
      }
    },
    resultSecondSelect(val){
      this.store.secondCurrency = val
      //console.log('Second',this.secondCurrency)
    },
    resultSelect(val){
      this.store.currency = val
      //console.log(this.currency)
    },
    async getCurrencyList(){
      this.currencyList = []
      const options = {
	      method: 'GET',
	      headers: {
		      'X-RapidAPI-Key': 'e2880f91d9mshfb17a8e0244a72ep13079cjsn4b92a900ff35',
		      'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
	      } 
      };
      const res = await fetch('https://currencyscoop.p.rapidapi.com/currencies', options)
      const data = await res.json()
      //this.currencyList = data.response.fiats
      ////console.log(Object.keys(this.currencyList))
      this.store.currencyList.push(Object.keys(data.response.fiats))
      //console.log(this.currencyList[0])
    }
  },
  mounted(){
    this.getCurrencyList()
  }
}
</script>

<style scoped>
  .inputDiv{
    border:3px solid #ebebeb;
    border-radius:6px;
  }
  .quickButtonStyles{
    background-color: #f87979;
    color:White;
    font-weight:bold;
  }
</style>