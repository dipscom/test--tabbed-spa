import Vue from 'vue'
import TabbedForm from './TabbedForm.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TabbedForm),
}).$mount('#tabbed-form')
