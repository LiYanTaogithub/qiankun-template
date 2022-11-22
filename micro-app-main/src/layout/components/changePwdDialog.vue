
<template>
  <div>
    <el-dialog title="修改密码" class="upload-model" :show-close="false" :visible.sync="propsResetPwdVisible" width="50%">
      <el-form label-width="140px" :model="formInfo" :rules="rules" ref="addForm">
        <el-form-item label="原密码:" prop="oldPassword">
          <el-input auto-complete="off" show-password v-model="formInfo.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="password">
          <el-input auto-complete="off" show-password v-model="formInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmFn('addForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { changePassword } from "@/api/login.js";
import { checkPassword } from '@/utils/validate';

export default {
  props: {
    resetPwdVisible: {
      type: Boolean,
      required: true
    },
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      if (value != '') {
        if ((!checkPassword(value)) && rule.field == 'password') {
          callback(new Error('必须含有数字、字母、特殊字符,且长度在8~16位之间'))
        } else {
          callback();
        }
      } else {
        callback()
      }
    }
    return {
      formInfo: {
        oldPassword: "",
        password: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { validator: validateCheck, trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    propsResetPwdVisible: {
      get: function () {
        return this.resetPwdVisible
      },
      set: function () {
        return this.$emit('closeResetPwdModal')
      }
    },
  },
  methods: {
    confirmFn(formName) {
      this.$refs[formName].validate(valid => {
        console.log("valid", valid)
        if (valid) {
          let params = {
            oldPassword: this.formInfo.oldPassword,
            password: this.formInfo.password,
          }
          changePassword(params).then((resultData) => {
            console.log("resultData", resultData)
            let { code, obj, msg } = resultData.data
            console.log("resultData11", code, obj, msg)
            if (code == 1) {
              this.$message.success('密码修改成功，请重新登录！')
              setTimeout(() => {
                this.$store.dispatch('resetToken')
                this.$router.push({
                  path: '/login'
                })
              }, 1000)
              this.cancel()
            } else if (code == 0) {
              this.$message.error(`${msg}`)
            } else if (code == 2) {
              this.$message.error(`${msg}`)
            }


          }).catch((err) => {
          })
        } else {

        }
      })
    },
    cancel() {
      this.formInfo.password = ''
      this.formInfo.oldPassword = ''
      this.$refs.addForm.resetFields()
      this.$store.commit('CLOSE_CHANGE_PWD')
    },


  }
}
</script>
<style scoped lang= "scss">
.addorderWrap {
  min-height: calc(100vh - 150px);
  /* margin-bottom: 100px; */
}
.content {
  overflow-y: auto;
  .carInfo {
    .carTable {
      margin-top: 20px;
      .addBtn {
        height: 50px;
        button {
          float: right;
        }
      }
      .tableList {
        margin-top: 10px;
      }
    }
  }
}
.plan {
  .mBottom {
    margin-bottom: 10px;
  }
}
.insuranceMan,
.invoiceInformation {
  .mBottom {
    margin-bottom: 10px;
  }
}
.uploadPhoto {
  .uploadPhotoWrap {
    .carNumber {
      height: 50px;
      line-height: 50px;
      color: #000;
      font-size: 14px;
      font-weight: 700;
    }
    .image {
      float: left;
      margin-right: 80px;
    }
  }
  /* ::v-deep  .avatar-uploader-icon {
    width: 377px !important;
  } */
}
.footer {
  text-align: center;
  margin: 20px 0;
}
::v-deep .el-input__inner {
  height: 32px;
}
</style>
