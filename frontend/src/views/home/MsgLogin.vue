<template>
  <div v-title data-title="短信登录 | 瀚游于青山绿水">
    <el-row type="flex" justify="center" class="headline">
      <el-col :span="12" class="logo">
		      <el-image :src="logo_path" alt=""></el-image>
      </el-col>
      <el-col :span="12" class="name">
		      <el-image  :src="name_path" alt=""></el-image>
      </el-col>
    </el-row>
    <el-row type="flex" class="mainbody">
      <el-col class="login-container">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          class="demo-ruleForm"
          label-position="top"
          label-width="80px">
            <h3 class="title">短信验证码登录</h3>
            <el-link href="/login" class="backlogin" type="primary">返回密码登录</el-link>
            <el-form-item  class="tel" prop="tel" label="手机号码">
                <el-input  v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
            </el-form-item>
            <el-form-item  class="code" prop="smscode" label="验证码">
                <el-input  v-model="ruleForm2.smscode" placeholder="请输入验证码" ></el-input>
                <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="btn" type="primary"
                         @click.native.prevent="msgLoginSubmit('ruleForm2')" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

const logo_path = require('assets/img/logo.png')
const name_path = require('assets/img/name.png')
import {requestMsgLoginValidate, requestMsgLogin} from '../../network/api';

export default {
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    };
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else if (!this.checkValidateCode(value)) {
        callback(new Error('短信验证码不合法'))
      }else {
        callback()
      }
    };
    return {
      logining: false,
      logo_path,
      name_path,
      ruleForm2: {
        tel: "18813058359",
        smscode: ""
      },
      rules2: {
        tel: [
          { validator: checkTel, trigger: 'change' }
        ],
        smscode: [
          { validator: checkSmscode, trigger: 'change' }
        ],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    };
  },
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let msgLoginParams = {
        "adminTelephoneNum": this.ruleForm2.tel,
      };
      if (this.checkMobile(msgLoginParams.adminTelephoneNum)) {
        requestMsgLoginValidate(msgLoginParams)
          .then(data => {
            this.logining = false;
            //NProgress.done();
            if (data.success !== true) {
              this.$message({
                message: data.message,
                type: 'error'
              });
            } else {
              setTimeout(() => {
                alert('短信验证码发送成功')
              }, 400);
            }
          });
        let time = 6;
        this.buttonText = '已发送';
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒';
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取';
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交登录-->
    msgLoginSubmit(ruleForm2) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          //NProgress.start();
          let loginParams = {
            "adminTelephoneNum": this.ruleForm2.tel,
            "smsCode": this.ruleForm2.smscode
          };
          requestMsgLogin(loginParams)
            .then(data => {
              this.logining = false;
              //NProgress.done();
              if (data.code !== 100) {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
              } else {
                setTimeout(() => {
                  alert('登录成功')
                }, 400);
                sessionStorage.setItem('userId', JSON.stringify(data.content.userId));
                this.$router.push({ path: '/device' });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证短信验证码长度必须为6位
    checkValidateCode(str) {
      let re = /^.{6}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    }
  },
}
</script>

<style>
body{
    background-image: url(~assets/img/home/bg.jpg);
    background-repeat: no-repeat;
    /* 平铺 */
    background-size: cover;
    /* 当页面的其余部分滚动时，背景图像不会移动 */
    background-attachment: fixed;
    margin: 0px;
    padding: 0px;
    /* 当内容溢出元素框时,内容会被修剪,并且其余内容是不可见的 */
    overflow: hidden;
    position: absolute;
}
.headline {
  margin-top: 35px;
  margin-bottom: 30px;
}
.logo {
      width: 15%
		}
.name {
      width: 50%
		}

.login-container {
    /* 处理圆角，W3C标准 */
    border-radius: 5px;
    /* 处理圆角，针对webkit内核浏览器 */
    -webkit-border-radius: 5px;
    /* 处理圆角，针对火狐等浏览器 */
    -moz-border-radius: 5px;
    /* 规定背景的绘制区域 */
    background-clip: padding-box;
    width: 800px;
    height: 600px;
    padding: 35px 35px 15px 35px;
    background: rgba(0, 0, 0, .3);
    /* background: rgba(182, 175, 175, 0.3); */
    border: 1px solid rgba(0, 0, 0, .3);
    /* 盒子阴影 */
    box-shadow: 2px 2px 25px #000;
    /* 子绝父相 */
    position: relative;
    left: 80px;
    top: 35px;
}
.demo-ruleForm {
  height: 500px;
}
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #FF9B1F;
}
.el-form-item__label {
  color: #FF9B1F;
}
.backlogin {
  right:20px;
  float: right;
}
.tel {
  margin: 80px 0px 80px 0px;
  color: #FF9B1F
}
.code {
  margin: 80px 0px 80px 0px;
  color: #FF9B1F;
  bottom: 50px;
}

.code input {
  width: 500px;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
  position: relative;
  right: 20px;
  bottom: 40px;
  float: right;
}

.btn {
  margin: -5px 45% 40px 45%;
}

</style>
