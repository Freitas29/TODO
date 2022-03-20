import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

import 'primevue/resources/themes/lara-light-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';          

const app = createApp(App);
app.use(PrimeVue, {ripple: true});
app.use(createPinia())

app.mount('#app');