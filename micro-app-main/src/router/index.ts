
import routes from "./routes";
import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/home/index.vue";
import Layout from '@/layout/index.vue'
import Login from '@/pages/login/index.vue'
import ErrorPage from '@/pages/404.vue'
// const _import = require('./_import_' + process.env.NODE_ENV)

// 解决报错
// const originalReplace = Router.prototype.replace

// // replace
// Router.prototype.replace = function replace(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => err)
// }

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/main/*',
    name: 'home',
    component: Home,
    // hidden: true
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
  }]
const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    // scrollBehavior: () => ({
    //   y: 0
    // }),
    routes,
  })
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}
export default router