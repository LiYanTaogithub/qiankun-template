import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async(to, from, next) => {
  // const hasToken = getToken()
  // console.log('hasToken', hasToken)
  // if(!hasToken) {
  //   next({ path: '/login' })
  // }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})