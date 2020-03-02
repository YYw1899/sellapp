import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    namelist: [],
    show: false,
    shopData: '',
  },
  mutations: {
    shopData (state, val) {
      state.shopData = val;
    },
    changeNamelist (state, val) {
      state.namelist = val;
    },
    changeNum (state, val) {
      state.namelist[val.i1].foods[val.i2].num = val.num_new;
    },
    changeshow (state, val) {
      state.show = val;
    },
    changeAllNum (state, val) {
      for (let i = 0; i < state.namelist.length; i++) {
        for (let i2 = 0; i2 < state.namelist[i].foods.length; i2++) {
          state.namelist[i].foods[i2].num = val;
        }
      }
    },
    totalPrice (state) {
      state.totalPrice
    }
  },
  getters: {
    shopCarlist (state) {
      var arr = [];
      state.namelist.forEach(v => arr.push(...(v.foods.filter(val => val.num > 0))));
      return arr;
    },
    totalPrice (state) {
      var arr = [];
      var totalPrice = 0;
      state.namelist.forEach(v => arr.push(...(v.foods.filter(val => val.num > 0))));
      for (let i = 0; i < arr.length; i++) {
        totalPrice += arr[i].num * arr[i].price;
      }
      return totalPrice;
    }
  }
});