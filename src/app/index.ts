import { createApp } from 'vue';
import { router, store } from './providers';
import App from './App.vue';
import { clickOutside } from './directives';

const app = createApp(App);

app.directive('click-outside', clickOutside);

app.use(router);
app.use(store);

export default app;
