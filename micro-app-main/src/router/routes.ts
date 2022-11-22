import Home from "@/pages/home/index.vue";
import Layout from '@/layout/index.vue'
import Login from '@/pages/login/index.vue'
import ErrorPage from '@/pages/404.vue'
const routes = [
  {
    /**
     * path: 路径为 / 时触发该路由规则
     * name: 路由的 name 为 Home
     * component: 触发路由时加载 `Home` 组件
     */
    path: "/main",
    name: "Layout",
    component: Layout,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    // component: (resolve) => require([`@/views/404`], resolve),
    component: ErrorPage,
    hidden: true
  }
];

export default routes;