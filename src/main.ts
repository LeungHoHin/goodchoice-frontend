import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Button,NavBar,Icon,Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
app.use(Button)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar);
app.use(TabbarItem);
app.mount("#app")