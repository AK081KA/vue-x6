import GenoAnyEditor from './App.vue'
import Vue from 'vue'
const install = (Vue: any) => {
  Vue.component(GenoAnyEditor.name, GenoAnyEditor)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { GenoAnyEditor }
