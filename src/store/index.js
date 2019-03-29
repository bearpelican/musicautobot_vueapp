import Vue from 'vue'
import Vuex from 'vuex'
import predict from './modules/predict'
import sequence from './modules/sequence'
import createSynthPlugin from '@/store/plugins/synthPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sequence,
    predict
  },
  plugins: [createSynthPlugin]
})
