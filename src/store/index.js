import Vue from 'vue'
import Vuex from 'vuex'
import predict from './modules/predict'
import sequence from './modules/sequence'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sequence,
    predict
  }
})

// export default new Vuex.Store(sequence)
