<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" width="120" sortable>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="200" sortable>
        </el-table-column>
        <el-table-column prop="telephoneNum" label="手机号码" width="200" sortable>
        </el-table-column>
        <el-table-column prop="deviceId" label="设备" width="200" sortable>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="200" sortable>
        </el-table-column>
        <el-table-column prop="userPassword" label="密码（已加密）" min-width="800">
        </el-table-column>

      </el-table>
    </template>

  </section>
</template>
<script>
  import { getUserList } from '../../network/api';

  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        filters: {
          tel: ''
        },
        loading: false,
        users: [
        ]
      }
    },
    methods: {
      //获取用户列表
      getUser: function () {
        let para = {
          inputTelephoneNum: this.filters.tel,
          token: sessionStorage.getItem("token")
        };
        this.loading = true;
        //NProgress.start();
        getUserList(para).then(data => {
          this.users = data;
          this.loading = false;
          //NProgress.done();
        });
      }
    },
    mounted() {
      this.getUser();
    }
  };
</script>

<style scoped>
</style>
