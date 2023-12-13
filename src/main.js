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
