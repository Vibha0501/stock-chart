<<<<<<< HEAD
//
// Import Bootstrap CSS globally
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";


const app = createApp(App)
app.use(VueApexCharts);

app.component("apexchart", VueApexCharts);
app.use(router)

app.mount('#app')
=======
import Vue from 'vue'
import App from './App.vue'
import router from './index.js'
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
>>>>>>> cabef6739efc2a891d243b7601760c63edec01a4
