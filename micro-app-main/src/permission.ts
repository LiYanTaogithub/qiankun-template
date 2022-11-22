import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
import shared from "@/shared";

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  // console.log('hasToken*********', hasToken)
  if (hasToken) {
    // console.log('to', to)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next()
      // next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.addRouters
      // console.log('hasGetUserInfo', hasGetUserInfo)
      if (hasGetUserInfo.length !== 0) {
        next()
      } else {
        try {
          // console.log('刷新页面')
          store
            .dispatch('getRouter')
            .then(data => {
              if (data.obj.length !== 0) {
                const authList = data.obj
                // const authList = data.obj[0].children
                console.log('authList', authList)
                store
                  .dispatch('GenerateRoutes', { roles: authList })
                  .then(resp => {
                    console.log('可访问路由表', resp)
                    // TODO: 根据roles权限生成可访问的路由表
                    router.push('/main')
                    // if (to.path == '/' || to.path == '/404') {
                    //   resp.forEach((item, key) => {
                    //     if (!item.hidden && key === 0) {
                    //       const _children = item.children
                    //       for (let i = 0; i < _children.length; i++) {
                    //         if (!_children[i].hidden) {
                    //           router.push(_children[i].path)
                    //           return false
                    //         }
                    //       }
                    //     }
                    //   })
                    //   // next({ path: '/dashboard/index' })
                    // } else {
                    //   next({ ...to, replace: true })
                    // }
                  })
              } else {
                // console.log('跳转')
                next()
              }
            })
            .catch(() => {
              Message.error('请重新登录')
              store.dispatch('resetToken')
              next({ path: '/login' })
            })
        } catch (error) {
          // remove token and go to login page to re-login
          store.dispatch('resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})