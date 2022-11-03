import { MessageBox } from 'element-ui'

export function confirmBox(confirmTixt, confirmCallBack, cancleCallBack, title = '提示') {
  MessageBox.confirm(confirmTixt, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    confirmCallBack && confirmCallBack()
  }).catch(() => {
    cancleCallBack && cancleCallBack()
    return false
  })
}
