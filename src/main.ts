import './assets/main.css'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import TabMenu from 'primevue/tabmenu'
import Skeleton from 'primevue/skeleton'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Paginator from 'primevue/paginator'
import Menu from 'primevue/menu'

import router from './router'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(createPinia())
app.component('Button', Button)
app.component('Sidebar', Sidebar)
app.component('Dropdown', Dropdown)
app.component('Card', Card)
app.component('TabMenu', TabMenu)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Skeleton', Skeleton)
app.component('Toast', Toast)
app.component('Paginator', Paginator)
app.component('Menu', Menu)

app.mount('#app')
