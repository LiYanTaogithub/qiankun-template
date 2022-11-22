import Vue, { createApp } from "vue";
import Antd from "ant-design-vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import ElTreeSelect from 'el-tree-select'
// import VueRouter from "vue-router";
import router from '@/router'
import App from "./App.vue"
// import router from "./router";

import "./assets/styles/locale.antd.css";
import '@/icons' // icon

import "./permission"
import store from './store'
console.log('store', store)
// Vue.use(VueRouter);
Vue.use(Antd);
Vue.use(ElementUI, { locale })
Vue.use(ElTreeSelect)
Vue.config.productionTip = false;
// Vue.use(store)
// 为 Angular 微应用所做的 zone 包注入
// 如果没有 Angular 微应用，请删除这行代码
import "zone.js/dist/zone";

// startQiankun();
// 创建vue实例 将该实例挂载在id为 main-app 的节点上

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#main-app");

