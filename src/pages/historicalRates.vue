<template>
  <div  style="margin:0 auto;background-color:white;padding:0px;"> 
    <h5 style="color:#f87979;font-weight:bold;">Historical Rates</h5>
    <div class="historicalResults">
        <div class="row">
            <div class="col-6">
                <q-input v-model="this.store.date" style="width:80%;margin:0 auto;" color="dark" label="Select Date">
                    <template v-slot:append>
                        <q-btn icon="event" round style="color:#f87979">
                            <q-popup-proxy  cover transition-show="scale" transition-hide="scale" >
                                <q-date v-model="this.store.date"  @update:model-value="saveDate" mask="YYYY-MM-DD" color="orange" dark today-btn>
                                    <div class="row items-center justify-end q-gutter-sm">
                                        <q-btn label="Cancel" color="orange" flat v-close-popup />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-btn>
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="clear" color="red" v-on:click="this.store.date=null"></q-icon>
                    </template>
                </q-input>
            </div>
            <div class="col-6">
                <q-select
                    filled
                    v-model="this.currencyVal"
                    input-debounce="0"
                    label="Find Currency"
                    :options="this.store.currencyList[0]"
                    @update:model-value="getCurrencyHistorical"
                    style="margin-left:4px;width:80%;margin:0 auto;"
                    v-if="this.store.historicalResult.length!=0"
                >
                <template v-slot:prepend>
                    <q-icon name="clear" color="red" v-on:click="clearHistoricalSelect"></q-icon>
                </template>
                </q-select>
            </div>
        </div>
        <div class="row" style="margin-top:3%;" v-if="this.store.convertResult.length!=0&&this.store.historicalResult.length!=0">
            <p><span style="font-weight:bold;font-size:16px;">Depreciation Summary : </span><span style="padding:10px;border-radius:4px;background-color:#f87979;color:White;font-size:16px;font-weight:bold;">{{this.resultSummary}}</span></p>
        </div>
        <div class="row" style="margin-top:3%;" v-if="this.store.convertResult.length!=0&&this.store.historicalResult.length!=0&&this.selectedCurrencies.length!=0">
            <div class="col-5">
                <q-card class="my-card" style="width:100%;">
                    <q-card-section>
                        <div class="text-h6">{{this.store.currency}} - {{this.store.secondCurrency}}</div>
                        <div class="text-subtitle2">{{this.store.date}}</div>
                    </q-card-section>

                    <q-markup-table>
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">Currency Name</th>
                            <th class="text-center">Currency Value</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody v-for="dat in this.selectedCurrencies" :key="dat.name">
                        <tr>
                            <td class="text-center"><q-btn round icon="clear" color="red" v-on:click="deleteFromList(dat)"></q-btn></td>
                            <td class="text-center"> {{this.store.currency}} - {{dat.name}}</td>
                            <td class="text-center">{{(dat.value).toFixed(2)}}</td>
                            <td class="text-left"><q-btn icon="history" round size="md" class="showGraphButtonStyle" :class="{'newShowGraphButtonStyle':this.selectedOne==dat.name}" v-on:click="showLastYears(dat)"></q-btn></td>
                        </tr>
                        </tbody>
                    </q-markup-table>
                </q-card>
                <div class="" align="center" style="margin-top:2%;">
                    <q-btn label="Clear Graph" style="color:#f87979;background-color:white;" size="md" v-on:click="clearGraph"></q-btn>
                    
                </div>
            </div>
            <div class="col-6" v-if="this.showCard" align="center">
                <Bar :chart-data="chartData"/>
            </div>
        </div>
        <div class="row"  >
            <div class="col-6" v-if="this.showCard">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {useCounterStore} from "../stores/store"
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    components:{
        Bar ,
    },
    setup(){
        const store = useCounterStore()
        return{
            store
        }
    },
    data:function(){
        return{
            selectedOne : null,
            scrollValue : 0,
            selectedYear : null,
            selectedMonth:null,
            selectedDay:null,
            currencyVal:null,
            selectedCurrencies : [],
            result : null,
            resultSummary:null,
            currentDate : null,
            showCard:false,
            currentDay:null,
            currentMonth:null,
            chartData:{
                labels : [],
                datasets:[
                    {
                        label:null,
                        backgroundColor: '#f87979',
                        data:[],
                    }
                ]
            }
        }
    },
    methods:{
        deleteFromList(dat){
            //const listLast = this.selectedCurrencies
            this.selectedCurrencies.forEach((element,index,arr) => {
                if(element.name==dat.name){
                    arr.splice(index,1)
                }
            });
            console.log('Last : ',this.selectedCurrencies)
        },
        clearGraph(){
            this.showCard = false
            this.chartData.datasets[0].data = []
            this.chartData.labels = []
            this.selectedCurrencies = []
            window.scrollTo({top:0,behavior:'smooth'})
        },
        async getSpecificHistorical(){

        },
        async showLastYears(dat){
            //console.log(dat)
            this.selectedOne = dat.name
            this.showCard = true
            window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})
            dat.status = true
            const d = new Date()
            this.currentMonth = (d.getUTCMonth()+1)
            this.currentDay = (d.getDate()-1)
            if(this.currentDay<10){
                this.currentDay = ('0'+this.currentDay).slice(-2)
            }
            if(this.currentMonth<10){
                //('0' + 4).slice(-2)
                this.currentMonth = ('0'+this.currentMonth).slice(-2)
            }
            //console.log('month',this.currentMonth,'Day ',this.currentDay)
            this.chartData.datasets[0].data = []
            this.chartData.labels = []
            this.chartData.datasets[0].label = this.store.currency + '-'+dat.name
            //this.chartData.datasets[0].label = dat.name
            if(this.showCard){
                for(let year = 2022;year>=this.selectedYear;year--){
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'e2880f91d9mshfb17a8e0244a72ep13079cjsn4b92a900ff35',
                            'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
	                    }
                    };
                    const res = await fetch(`https://currencyscoop.p.rapidapi.com/historical?base=${this.store.currency}&date=${year}-${this.selectedMonth}-${this.selectedDay}`, options)
                    const secondData = await res.json()
                    ////console.log(secondData)
                    ////console.log(secondData.response.rates[dat.name])
                    this.chartData.labels.push(secondData.response.date)
                    this.chartData.datasets[0].data.push(secondData.response.rates[dat.name])
                    
                    ////console.log('Years',this.chartData.datasets[0].data)
                }
            }
        },
        getCurrentDate(){
            //this.currentDate = new Date().toISOString().slice(0, 10)
            this.currentDate = new Date().toISOString().slice(0, 10)
            ////console.log(this.currentDate)
        },
        clearHistoricalSelect(){
            this.currencyVal = null
            this.selectedCurrencies = []
            this.chartData.datasets[0].data = []
            this.chartData.labels = []
        },
        dataPushForBar(){
            const listLast = this.selectedCurrencies
            listLast.forEach(element => {
                this.chartData.labels.push(element.name)
                this.chartData.datasets[0].data.push(element.value)
            });
        },
        getCurrencyHistorical(val){
            window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})
            this.currencyVal = val
            //this.selectedCurrencies.push({name:val,value:this.store.historicalResult.response.rates[val]})
            const listLast = this.selectedCurrencies
            const newItem = {name:val,value:this.store.historicalResult.response.rates[val],status:false}
            const index = listLast.findIndex(object => object.name === newItem.name)
            if(index===-1){
                this.selectedCurrencies.push(newItem)
                
                //this.chartData.labels.push(newItem.name)
                //this.chartData.datasets[0].data.push(newItem.value)
                
            }else{
                this.$q.notify({
                    type:'negative',
                    message:'Already Added',
                    timeout:1500
                })
            }
            this.currencyVal = null
            //console.log('Selected ',this.selectedCurrencies)
        },
       // getCurrencyHistorical(val){
            //this.currencyVal = val
            ////console.log('Result Currency',this.store.historicalResult.response.rates[val])
        //},
        saveDate(value,reason,details){
            this.showCard = false
            this.chartData.datasets[0].data = []
            this.chartData.labels = []
            this.selectedCurrencies = []
            this.store.date = value
            this.selectedYear = details.year
            this.selectedMonth = details.month
            this.selectedDay = details.day
            if(this.selectedMonth<10){
                //this.currentMonth = ('0'+this.currentMonth).slice(-2)
                this.selectedMonth = ('0'+this.selectedMonth).slice(-2)
            }
            if(this.selectedDay<10){
                this.selectedDay = ('0'+this.selectedDay).slice(-2)
            }
            //console.log(this.selectedMonth)
            //console.log(details.year)
            ////console.log(this.date)
            this.getHistorical()
        }, 
        async getHistorical(){
            this.store.historicalResult = []
            const options = {
	            method: 'GET',
	            headers: {
		            'X-RapidAPI-Key': 'e2880f91d9mshfb17a8e0244a72ep13079cjsn4b92a900ff35',
		            'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
	            }
            };
            const res = await fetch(`https://currencyscoop.p.rapidapi.com/historical?base=${this.store.currency}&date=${this.store.date}`, options)
            const data = await res.json()
            this.store.historicalResult = data
            //console.log(this.historicalResult)
            this.findSummary()
        },
        findSummary(){
            //2021
            const secondValue = this.store.amount/((this.store.convertResult.response.rates[this.store.secondCurrency])*this.store.amount)//Günümüz
            const firstValue = this.store.amount/((this.store.historicalResult.response.rates[this.store.secondCurrency])*this.store.amount)//Geçmiş
            this.result = ((secondValue-firstValue)/firstValue)*100
            if(this.store.convertResult.response.rates[this.store.secondCurrency]>this.store.historicalResult.response.rates[this.store.secondCurrency]){
                this.resultSummary = `Between ${this.store.date} - ${this.currentDate},`+ ' '+'The Depreciation Of The  '+' '+this.store.secondCurrency+' '+' Unit Against The  '+' '+this.store.currency+' '+`Unit Is`+' '+this.result.toFixed(2)+'%'
                ////console.log(this.store.secondCurrency,'Biriminin',this.store.currency,'Biriminin Karşısındaki Değer kaybı',this.result.toFixed(2),'%')
                ////console.log(this.store.historicalResult)
            }else{
                this.resultSummary = `Between ${this.store.date} - ${this.currentDate},`+' '+'The Appreciation Of The'+' '+this.store.secondCurrency+' '+'Unit Against The'+' '+this.store.currency+' '+'Unit Is'+' '+this.result.toFixed(2)+'%'
                ////console.log(this.store.currency,'Biriminin',this.store.secondCurrency,'Biriminin Karşısındaki Değer Kaybı',this.result.toFixed(2),'%')
                ////console.log(this.store.historicalResult)
            }
        },
    },
    mounted(){
        window.addEventListener('scroll',function(){
            this.scrollValue = window.scrollY
            //console.log('SCroll Value',this.scrollValue)
        })
    },
    created(){
        this.getCurrentDate()
    }
}
</script>

<style scoped>
    .historicalResults{
        border:3px solid #ebebeb;
        border-radius:6px;     
        padding:10px;
    }
    .showGraphButtonStyle{
        color:white;
        background-color: #f87979;
    }
    .newShowGraphButtonStyle{
        color:#f87979;
        background-color:white;
    }
</style>