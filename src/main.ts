import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Button,NavBar,Icon,Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';
import * as VueRouter from 'vue-router'
import routes from "./config/routes.ts";

const app = createApp(App)

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
app.use(router)
app.use(Button)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar);
app.use(TabbarItem);
app.mount("#app")
