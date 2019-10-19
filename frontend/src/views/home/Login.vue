<template>
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

</template>

<script>
export default {
  methods: {
    loginSubmit() {
      this.$router.replace('/device')
    }
  }
}
</script>

<style>
		/*css初始化*/
		* {
			margin: 0;
			padding: 0;  /*清除内外边距*/
		}
		ul {
			list-style: none; 	/*去除列表默认的小点*/
		}
		.clearfix:before, .clearfix:after {	/*清除浮动*/
			display: table;
			content: "";
		}
		.clearfix:after {
			clear: both;
		}
		.clearfix {
			*zoom: 1;
		}
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
    margin: 200px auto;
    width: 800px;
    height: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /* 盒子阴影 */
    box-shadow: 2px 2px 25px #cac6c6;
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
