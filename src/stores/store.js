import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    currencyList : [],
    currency:null,
    secondCurrency:null,
    amount:1,
    convertResult : [],
    date:null,
    historicalResult:[],
    secondCurrencyResult : null
  }),
  getters: {
  },
  actions: {
  },
});
