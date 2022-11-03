import Home from "@/pages/home/index.vue";

const routes = [
  {
    /**
     * path: 路径为 / 时触发该路由规则
     * name: 路由的 name 为 Home
     * component: 触发路由时加载 `Home` 组件
     */
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require([`@/pages/login/index`], resolve),
    hidden: true
  },
  {
    path: '/404',
    // component: (resolve) => require([`@/views/404`], resolve),
    component: (resolve) => require([`@/pages/404`], resolve),
    hidden: true
  }
];

export default routes;