<template>
  <section class="app-main">
    <div class="app-main-wrap">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachePage">
          <!-- <router-view :key="key" /> -->
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="$route.name" :key="key" />
          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section id="frame"></section>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      // 组件自身的 name 选项，用于缓存组件的实例
      cachePage: ['productmanage', 'planmanage', 'BossBillboard'],
      // Vue name 需要 PascalCase，而 route name 是 key-case，所以需要兼容判断
      cachePageRouteName: ['boss-billboard']
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    key() {
      if (
        !this.cachePage.includes(this.$route.name) &&
        !this.cachePageRouteName.includes(this.$route.name)
      ) {
        setTimeout(() => {
          document.querySelector('.app-main').scrollTop = 0
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* padding: 25px; */
  height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  background-color: whitesmoke;
  /* margin-top: 50px; */
}
.app-main-wrap {
  padding: 16px;
  min-height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
  height: 100%;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
