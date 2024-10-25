import { createApp } from 'vue';
import { router, store } from './providers';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);

export default app;
