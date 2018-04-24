import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count:1,
  radio1:'2',
  ieData:[],
};
const mutations={
  changeRadio1(state,n){
    state.radio1=n;
  },
  getieData(state,n){
    state.ieData=n;
  }

};

export default new Vuex.Store({
  state,
  mutations,
});
