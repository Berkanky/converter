<template>
  <q-page class="flex-column">
    <div class="" style="margin:0 auto;background-color:white;padding:10px;padding-inline:0px;">
        <div class="" align="left">
            <h5 style="color:#f87979;font-weight:bold;">Results Of Convert</h5>
        </div>
        <div class="resultsDiv">
            <div class="row" style="font-size:16px;padding:10px;" align="left">
                <div class="col-2">
                    <p style="font-size:16px;font-weight:bold;">Results Of Process : </p>
                </div>
                <div class="col-10">
                    <span v-if="!this.store.amount" style="font-weight:bold;"><span >1 {{this.store.currency}} </span>= {{this.store.secondCurrencyResult}} {{this.store.secondCurrency}}</span>
                    <span v-else style="font-weight:bold;"><span >{{this.store.amount}} {{this.store.currency}}</span> = {{this.store.secondCurrencyResult}} {{this.store.secondCurrency}}</span>
                </div>
            </div>
            <div class="row" style="padding:10px;">
               <p style="font-size:16px;color:Black;"><span style="font-weight:bold;">Info :</span> This transaction was made using the Market Data on the Date <span style="font-weight:bold;padding:5px;border-radius:4px;color:white;background-color:#f87979;padding-inline:10px;">{{this.store.convertResult.response.date}}</span> </p>
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import {useCounterStore} from "../stores/store"
export default {    
    setup(){
        const store = useCounterStore()
        return{
            store
        }
    },
    data:function(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style scoped>
    .resultsDiv{
        border:3px solid #ebebeb;
        border-radius:6px;
    }
</style>