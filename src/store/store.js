// src/store/store.js
import Vue from 'vue';
import Vuex from 'vuex';
import bookings from './bookings.json'

Vue.use(Vuex);




export default new Vuex.Store({
  state: {
    events: [...bookings]
  
  },
  
 
  mutations: {
    setEvents(state, events) {
      state.events = events;
    }
  },
  
  getters: {
    events: state => state.events
  },
});

