
import { App } from 'vue';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
import ProgressSpinner from 'primevue/progressspinner';

export const addComponent = (app: App) => {
    app.component('Toast', Toast)
    app.component('DynamicDialog', DynamicDialog)
    app.component('ProgressSpinner', ProgressSpinner)
}