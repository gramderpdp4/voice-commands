import { createApp } from 'vue'
import './css/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { addComponent } from './js/addComponents'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import 'primevue/resources/themes/aura-dark-amber/theme.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(DialogService)

addComponent(app)

app.mount('#app')
