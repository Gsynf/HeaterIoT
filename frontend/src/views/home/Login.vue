<template>
  <div>
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
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-position="top"
          label-width="80px">
            <h3 class="title">系统登录</h3>
            <el-link href="/msglogin" class="loginByMsg" type="primary">短信快捷登录</el-link>
            <el-form-item  class="tel" prop="tel" label="手机号码">
              <el-input  v-model="ruleForm.tel" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
            </el-form-item>
            <el-form-item  class="password" prop="pass" label="密码">
              <el-input  v-model="ruleForm.pass" auto-complete="off" placeholder="请输入您的密码（4-8位）" show-password></el-input>
            </el-form-item>
            <el-link href="/register" class="registerNow" type="primary" >没有账户？立即注册</el-link>
            <el-link href="/losepwd" class="losepwd" type="primary">忘记密码？</el-link>
            <el-form-item>
              <el-button class="btn" type="primary"
                         @click.native.prevent="loginSubmit('ruleForm')" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

const logo_path = require('assets/img/logo.png')
const name_path = require('assets/img/name.png')
import { requestLogin } from '../../network/api';


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
    // <!--验证密码-->
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (!this.checkPassword(value)) {
        callback(new Error('密码不合法'))
      } else {
        callback()
      }
    };
    return {
      logining: false,
      logo_path,
      name_path,
      ruleForm: {
        tel: '18813058359',
        pass: '123456'
      },
      rules: {
        tel: [
          { validator: checkTel, trigger: 'change' },
        ],
        pass: [
          { validator: checkPass, trigger: 'change' },
        ]
      },
      //checked: true
    };
  },
  methods: {
    //提交登录
    loginSubmit(ruleForm) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            //NProgress.start();
            let loginParams = {
              "adminTelephoneNum": this.ruleForm.tel,
              "adminPassword": this.ruleForm.pass
            };
              requestLogin(loginParams)
                .then(data => {
                  this.logining = false;
                  //NProgress.done();
                  if (data.code !== 100) {
                    this.$message({
                      message: data.message,
                      type: 'error',
                    });
                  } else {
                    setTimeout(() => {
                      alert('登录成功')
                    }, 400);
                    sessionStorage.setItem('userId', JSON.stringify(data.content.userId));
                    this.$router.push({path: '/main'});
                  }
                });
          } else {
              console.log('error submit!!');
              return false;
            }
        });
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
    }
  }
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
      /* position: relative;
      left: 250px;
      top: 30px; */
      width: 15%
		}
.name {
      /* position: relative;
      left: 300px;
      top: 20px; */
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
.loginByMsg,
.losepwd {
  right:20px;
  float: right;
}
.registerNow {
  left: 20px;
}
.tel,
.password {
  margin: 80px 0px 80px 0px;
  color: #FF9B1F
}
.btn {
  margin: 15px 45% 35px 45%;
}

</style>
