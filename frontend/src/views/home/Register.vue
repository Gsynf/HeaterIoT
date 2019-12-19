<template>
  <div class="registerpage" v-title data-title="注册 | 瀚游于青山绿水">
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
          :model="ruleForm3"
          :rules="rules3"
          ref="ruleForm3"
          class="demo-ruleForm"
          label-position="right"
          label-width="80px">
            <h3 class="title">欢迎注册</h3>
            <el-link href="/login" class="backlogin" type="primary">返回密码登录</el-link>
            <el-form-item  class="username" prop="username" label="用户名">
              <el-input  v-model="ruleForm3.username" auto-complete="off" placeholder="请输入用户名（2-6位）"></el-input>
            </el-form-item>
            <el-form-item  class="tel" prop="tel" label="手机号码">
              <el-input  v-model="ruleForm3.tel" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
            </el-form-item>
            <el-form-item  class="code" prop="smscode" label="验证码">
              <el-input  class="codeinput" v-model="ruleForm3.smscode" placeholder="请输入验证码" ></el-input>
              <el-button class="codebtn" type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
            </el-form-item>
          <el-form-item  class="password" prop="pass" label="登录密码">
              <el-input  v-model="ruleForm3.pass" auto-complete="off" placeholder="请输入您的密码（4-8位）" show-password></el-input>
            </el-form-item>
            <el-form-item  class="checkPass" prop="checkPass" label="确认密码">
              <el-input  v-model="ruleForm3.checkPass" auto-complete="off" placeholder="请再次输入您的密码（4-8位）" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn" type="primary"
                         @click.native.prevent="registerSubmit('ruleForm3')" :loading="logining">注册</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

const logo_path = require('assets/img/logo.png')
const name_path = require('assets/img/name.png')
import {requestMsgValidate, requestRegister} from '../../network/api';


export default {
  data() {
    // <!--验证用户名-->
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"))
      } else if (!this.checkProfileName(value)) {
        callback(new Error('用户名不合法'))
      } else {
        callback()
      }
    };
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
    // <!--验证密码-->
    let checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (!this.checkPassword(value)) {
        callback(new Error('密码不合法'))
      } else {
        if (this.ruleForm3.checkPass !== "") {
          this.$refs.ruleForm3.validateField("checkPass");
        }
        callback()
      }
    };
    // <!--二次验证密码-->
    let checkPwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm3.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
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
      ruleForm3: {
        username: '',
        tel: '',
        smscode: "",
        pass: '',
        checkPass: '',
      },
      rules3: {
        username: [
          { validator: checkUsername, trigger: 'change' }
        ],
        tel: [
          { validator: checkTel, trigger: 'change' },
        ],
        smscode: [
          { validator: checkSmscode, trigger: 'change' }
        ],
        pass: [
          { validator: checkPwd, trigger: 'change' },
        ],
        checkPass: [
          { validator: checkPwd2, trigger: 'change' }
        ],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
      //checked: true
    };
  },
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let msgRegisterParams = {
        "adminTelephoneNum": this.ruleForm3.tel,
      };
      if (this.checkMobile(msgRegisterParams.adminTelephoneNum)) {
        requestMsgValidate(msgRegisterParams)
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
    //提交注册
    registerSubmit(ruleForm3) {
        this.$refs.ruleForm3.validate((valid) => {
          if (valid) {
            this.logining = true;
            //NProgress.start();
            let registerParams = {
              "adminName": this.ruleForm3.username,
              "adminTelephoneNum": this.ruleForm3.tel,
              "smsCode": this.ruleForm3.smscode,
              "adminPassword": this.ruleForm3.pass,
              "adminRight": 0
            };
              requestRegister(registerParams)
                .then(data => {
                  this.logining = false;
                  //NProgress.done();
                  if (data.success !== true) {
                    this.$message({
                      message: data.message,
                      type: 'error',
                    });
                  } else {
                    setTimeout(() => {
                      alert('注册成功')
                    }, 400);
                    this.$router.push({path: '/login'});
                  }
                });
          } else {
              console.log('error submit!!');
              return false;
            }
        });
      },
    // 验证用户名密码2-8位
    checkProfileName(str) {
      let re = /^.{2,8}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
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
    // 验证密码4-8位
    checkPassword(str) {
      let re = /^.{4,8}$/;
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
  }
}
</script>

<style>
html,body,#app {
  height: 100%;
  width: 100%;
}
.registerpage{
  background-image: url(~assets/img/home/bg.jpg);
  /*图片不重复*/
  background-repeat: no-repeat;
  /* 平铺，让背景图基于容器大小伸缩  */
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  /* !* 当内容溢出元素框时,内容会被修剪,并且其余内容是不可见的 *!*/
  /* !*overflow: hidden;*!*/
  /* !*position: absolute;*!*/
  height: 100%;
  width: 100%;
  min-height: 900px;
  min-width: 1000px;
}
.headline {
  padding-top: 35px;
  padding-bottom: 30px;
}
.logo {
      width: 15%
		}
.name {
      width: 50%
		}
/*解决ie浏览器headline只显示一部分的问题*/
.el-image__inner--center {
  transform: translate(-50%,0%);
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
}
.demo-ruleForm {
  height: 550px;
}
.title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #FF9B1F;
}
.backlogin {
  right:20px;
  float: right;
}
.el-form-item__label {
  color: #FF9B1F;
}
.username,
.tel,
.password,
.checkPass,
.code{
  margin: 50px 0px 30px 0px;
  color: #FF9B1F;
}
.el-input {
  width: 90%;
  display: inline-block;
}
.codeinput {
  width: 50%;
  display: inline-block;
}
.codebtn {
  width: 150px;
  display: inline-block;
  margin-left: 100px;
}
.btn {
  margin: 0px 50% 35px 40%;
}
</style>
