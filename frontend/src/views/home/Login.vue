<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12" class="logo">
		      <el-image :src="logo_path" alt=""></el-image>
      </el-col>
      <el-col :span="12" class="name">
		      <el-image  :src="name_path" alt=""></el-image>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col class="demo-ruleForm login-container">
        <el-form >
            <h3 class="title">系统登录</h3>
            <el-link class="loginByMsg" type="primary">短信快捷登录</el-link>
            <el-form-item  class="username" prop="username">用户名：
                <el-input  placeholder="请输入您的用户名"></el-input>
            </el-form-item>
            <el-form-item  class="password" prop="password">密码：
                <el-input  placeholder="请输入您的密码" show-password></el-input>
            </el-form-item>
            <el-link href="/register" class="registerNow" type="primary" >没有账户？立即注册</el-link>
            <el-link class="losepwd" type="primary">忘记密码？</el-link>
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-col :span="4">
                  <el-button class="btn" type="primary"
                    @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
                </el-col>
              </el-row>

            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const logo_path = require('assets/img/logo.png')
const name_path = require('assets/img/name.png')

export default {
  data() {
    return {
      logo_path,
      name_path
    }
  },
  methods: {
    loginSubmit() {
      this.$router.replace('/device')
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
.el-row {
  margin-top: 35px;
  margin-bottom: 80px;
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
.el-form {
  height: 400px;
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
    height: 550px;
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
.login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #FF9B1F;
}
.loginByMsg,
.losepwd {
    right:20px;
}
.registerNow {
    left: 80px;
}
.el-link {
    /* float: right; */
    position: absolute;

}
.username,
.password {
  margin: 80px 0px 80px 0px;
  color: #FF9B1F
}
/* .btn {
  margin: 50px 220px;
} */
</style>
