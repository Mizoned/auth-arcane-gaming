import { createApp } from 'vue';
import { router, store } from './providers';
import App from './App.vue';
import directives from './directives';
import clickOutside from './directives/click-outside';

const app = createApp(App);

directives.forEach(directive => {

});

app.directive(clickOutside.name, clickOutside);

app.use(router);
app.use(store);

export default app;
