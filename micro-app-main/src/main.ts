import Vue from "vue";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import router from "./router";
import startQiankun from "./micro";
import "./assets/styles/locale.antd.css";

import "./permission"

Vue.use(VueRouter);
Vue.use(Antd);
Vue.config.productionTip = false;

// 为 Angular 微应用所做的 zone 包注入
// 如果没有 Angular 微应用，请删除这行代码
import "zone.js/dist/zone";

startQiankun();

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
// const router = new VueRouter({
//   mode: "history",
//   routes,
// });
// 创建vue实例 将该实例挂载在id为 main-app 的节点上
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
