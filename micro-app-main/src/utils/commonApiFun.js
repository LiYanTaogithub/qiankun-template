import { getDepartmentList } from '@/api/common'
// 获取事业部
export function getDepartmentListFun(searchData, addAll = true, callBack) {
  searchData.optionData = [{
    key: '',
    val: '全部'
  }]
  if (addAll == false) searchData.optionData = []
  getDepartmentList().then(resp => {
    const { obj, code } = resp.data
    if (+code === 1) {
      obj && obj.map(item => {
        let object = {}
        object.key = item.regionCode
        object.val = item.regionName
        searchData.optionData.push(object)
      })
    }
  })
  callBack && callBack()
}
