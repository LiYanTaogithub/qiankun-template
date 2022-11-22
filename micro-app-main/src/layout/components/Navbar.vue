<template>
  <div class="navbar">
    <div class="Logo">
      <!-- 保险业务系统 -->
      <span class="logoImg">北京微服保险经纪有限公司</span>
      <!-- :style="'background-image: url(' + img_logo + ')'" -->
    </div>
    <hamburger :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <el-dropdown class="avatar-container"
                 style="float: right"
                 trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar"
             style="line-height: 50px;vertical-align: middle; margin-right:30px"
             :src="avatar + '?imageView2/1/w/80/h/80'"
             v-if="avatar" />
        <img class="user-avatar"
             style="line-height: 50px;vertical-align: middle;margin-right:30px"
             src="@/assets/images/logout.png"
             v-else />
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="user-dropdown">
        <el-dropdown-item divided>
          <span style="display:block;"
                @click="changePwd">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;"
                @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="right-menu">
      <div class="right-menu-item noBarLine">你好，{{ this.userName }}</div>
    </div>
    <!-- <change-pwd-dialog :resetPwdVisible="showEditPwdDialog"
                       :dataObj="userNo"
                       @closeResetPwdModal="showEditPwdDialog=false">
    </change-pwd-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ChangePwdDialog from './changePwdDialog'
import img_logo from '@/assets/images/sq-logo-white.png'
// import { getUserInfo } from '@/api/login.js'

export default {
  data() {
    return {
      img_logo: img_logo,
      userName: '',
      userNo: '',
      showEditPwdDialog: false
    }
  },
  components: {
    // Breadcrumb,
    Hamburger
    // ChangePwdDialog
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getUserInfo() {
      // getUserInfo().then(resp => {
      //   if (+resp.data.code === 1) {
      //     const { name, empid, roleName, department } = resp.data.obj
      //     this.$set(this, 'userName', name)
      //     this.$set(this, 'userNo', empid)
      //     let params = {
      //       name: name,
      //       empid: empid,
      //       roleName: roleName,
      //       department: department
      //     }
      //     this.$store.commit('SET_ROLENAME', params)
      //   }
      // })

    },
    async logout() {
      // await this.$store.dispatch('logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
      window.location.reload()
    },
    async changePwd() {
      const _params = {
        visible: true
      }
      // this.$store.commit('CHANGE_PWD', { IsDefPwd: false, params: _params })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.navbar {
  position: fixed;
  z-index: $zIndex-navBar;
  left: 0px;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #304156;
  border-bottom: solid 1px #4e5a6d;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .Logo {
    text-align: center;
    color: #fff;
    font-size: 20px;
    float: left;
    width: 210px;
    height: 50px;
    .logoImg {
      display: block;
      width: 100%;
      height: 50px;
      font-size: 15px;
      font-weight: bold;
      // color: rgb(64, 158, 255);
      background-color: #f5a30e;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      font-size: 12px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        top: -8px;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
