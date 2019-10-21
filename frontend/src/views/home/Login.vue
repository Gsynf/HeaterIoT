<template>
  <div>
    <header>
      <div >
		    <el-image class="logo" :src="logo_path" alt=""></el-image>
		    <el-image class="name" :src="name_path" alt=""></el-image>
    </div>
    </header>
    <el-form label-width="100px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
            <el-link class="loginByMsg" type="primary">短信快捷登录</el-link>
            <el-form-item  class="username" label="用户名" prop="username">
                <el-input  placeholder="请输入您的用户名"></el-input>
            </el-form-item>
            <el-form-item  class="password" label="密码" prop="password">
                <el-input  placeholder="请输入您的密码" show-password></el-input>
            </el-form-item>
            <el-link href="/register" class="registerNow" type="primary" >没有账户？立即注册</el-link>
            <el-link class="losepwd" type="primary">忘记密码？</el-link>
            <el-button type="primary"
            @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
    </el-form>
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
.logo {
			/* float: left; */
      position: relative;
      left: 250px;
      top: 30px;
      width: 15%
		}
.name {
      position: relative;
      left: 300px;
      top: 20px;
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
    margin: 80px 100px;
    width: 800px;
    height: 500px;
    padding: 35px 35px 15px 35px;
    background: rgba(182, 175, 175, 0.3);
    border: 1px solid #908888;
    /* 盒子阴影 */
    box-shadow: 2px 2px 25px #908888;
}
.login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.el-form {
    /* 子绝父相 */
    position: relative;
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
.passwoed {
    margin: 80px 0px 80px 0px;
}
.el-button {
    margin: 100px 350px;
}

</style>
