import router from '@/router'
// asyncRouterMap,
import { constantRouterMap, resetRouter } from '@/router'
// import { routeList } from '@/views/systemManage/mock.js'
// console.log('routeList', routeList)
import Layout from '@/layout'
// const _import = require('@/router/_import_' + process.env.NODE_ENV) // 获取组件的方法

// joseph added
function filterGongnengPermission(role, route) {
  if (!role.children || !role.children.length) {
    route.meta.permission = {}
    return
  }
  const _permission = {}
  role.children.forEach(child => {
    if (child.type === '2') _permission[child.resCode] = true
  })

  route.meta.permission = _permission
}
function loadPageByRoutes(str) { // views文件夹下的Home组件，传入的格式为 'Home'
  return function (resolve) {
    require([`@/pages/${str}.vue`], resolve)
  }
}

/**
 * 通过meta.resCode判断当前菜单是否匹配权限
 * @param roles
 * @param route
 */
function checkPermission(roles, route) {
  // console.log('checkPermission==roles', roles)
  // console.log('checkPermission==route', route)
  if (route.meta && route.meta.resCode) {
    let thisRole
    const hasPermission = roles.some(role => {
      if (route.meta.resCode === role.resCode) {
        thisRole = role
        filterGongnengPermission(role, route)
        return true
      }
      return false
    })
    return hasPermission
      ? { hasPermission, thisRole }
      : { hasPermission: false }
  } else {
    return { hasPermission: false }
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (route.temp === true) {
//       // 开发阶段针对还没设置权限的导航
//       console.log(route.name + ': 此导航是临时的，还没配置权限！')
//       return true
//     }
//     if (route.hidden === true) return true
//     const { hasPermission, thisRole } = checkPermission(roles, route)
//     if (hasPermission) {
//       if (
//         route.children &&
//         route.children.length &&
//         thisRole.type === '1' &&
//         thisRole.children &&
//         thisRole.children.length
//       ) {
//         route.children = filterAsyncRouter(route.children, thisRole.children)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    console.log()
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadPageByRoutes(route.component)
        // route.component = _import(route.component) // 导入组件
      }
    }
    // route.component = ''
    if (route.hidden) {
      if (route.hidden == '1') {
        route.hidden = false
      } else if (route.hidden == '0') {
        route.hidden = true
      }
    }
    if (route.alwaysShow) {
      if (route.alwaysShow == '1') {
        route.alwaysShow = true
      } else if (route.alwaysShow == '0' || route.alwaysShow == '') {
        route.alwaysShow = false
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    if (route.path === '/insuranceinquiry') {
      route.key = 'ReactMicroApp'
    }
    return true
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // console.log('roles====', roles)
        // saveObjArr('router', roles) // 存储路由到localStorage   routeList
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        const accessedRouters = filterAsyncRouter(roles) // 获取的路由
        console.log('accessedRouters', accessedRouters)
        resetRouter()
        commit('SET_ROUTERS', accessedRouters)
        router.addRoutes(accessedRouters) // 动态添加可访问路由表
        resolve(accessedRouters)
        // this.$router.push('/')
      })
    }
  }
}

export default permission
