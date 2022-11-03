<template>
  <div class="selectDevWrap">
    <el-form-item>
      <el-select @change="onChangeDev"
                 v-model="dev"
                 placeholder="请选择开发者"
                 style="width: 100%">
        <el-option v-for="(item) in devs"
                   :label="item.label"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'selectDev',
  data () {
    return {
      dev: '',
      // 开发者选择
      devs: [
        { value: 'DevYanzheng', label: '验证环境-库容(10.20.5.21/fl-kcrz-web)' },
        { value: 'DevKaifa', label: '开发环境-库容(10.20.7.116/fl-kcrz-web)' },
        // { value: 'DevKaiZhang', label: '张凯-大屋' },
        // { value: 'DevHuangKaiLun', label: '黄凯伦-本地' },
        // { value: 'DevGuoBoRong', label: '郭博荣-本地' }
        // { value: 'DevLiugj1', label: '刘贵军-DevLiugj1(前端屋)' },
        // { value: 'DevLiugj2', label: '刘贵军-DevLiugj2(大屋)' },
        // { value: 'DevHuise', label: '（前端屋灰色网线）-DevHuise' },
        // { value: 'DevLingwf', label: '凌未风' }
        // { value: 'DevWangpt', label: '油卡-王鹏涛' }
      ]
    }
  },
  created () {
    // Cookies.remove('Dev')
    const _dev = Cookies.get('Dev')
    if (!_dev) {
      Cookies.set('Dev', 'DevYaof1')
      this.dev = 'DevYaof1'
    } else {
      this.dev = _dev
    }
  },
  methods: {
    onChangeDev (val) {
      // console.log(val)
      Cookies.set('Dev', val)
    }
  }
}
</script>

<style lang="scss">
.selectDevWrap {
  .el-input {
    width: 100%;
  }
}
</style>