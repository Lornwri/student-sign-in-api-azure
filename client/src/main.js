import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './style.css';
import App from './App.vue';


const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Add Pinia to the app
app.use(pinia);

// Enable devtools only in development mode - needed based on browser errors
if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true;
}

// Mount the app
app.mount('#app');
