<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.deviceId" placeholder="设备编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getDeviceShows">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="deviceShowInfo" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="index" width="40">
      </el-table-column>
      <el-table-column prop="deviceId" label="设备Id" width="120" sortable>
      </el-table-column>
      <el-table-column prop="userId" label="用户Id" width="100" sortable>
      </el-table-column>
      <el-table-column prop="nowTemp" label="温度" width="80" sortable>
      </el-table-column>
      <el-table-column prop="nowHum" label="湿度" width="80" sortable>
      </el-table-column>
      <el-table-column prop="nowMode" label="加热模式" width="100" sortable>
      </el-table-column>
      <el-table-column prop="nowStatus" label="加热状态" width="100" sortable>
      </el-table-column>
      <el-table-column prop="pumpStatus" label="泵运行" width="100" sortable>
      </el-table-column>
      <el-table-column prop="operatingVoltage" label="工作电压" width="100" sortable>
      </el-table-column>
      <el-table-column prop="operatingCurrent" label="工作电流" width="100" sortable>
      </el-table-column>
      <el-table-column prop="highTempAlarm" label="高温报警" width="100" sortable>
      </el-table-column>
      <el-table-column prop="lowTempAlarm" label="低温报警" width="100" sortable>
      </el-table-column>
      <el-table-column prop="waterAlarm" label="漏水报警" width="100" sortable>
      </el-table-column>
      <el-table-column prop="electricAlarm" label="漏电报警" width="100" sortable>
      </el-table-column>
      <el-table-column prop="updateTime" label="上传时间" width="100" sortable>
      </el-table-column>
      <el-table-column prop="deviceAddress" label="设备地址" width="100" sortable>
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">设置</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--设置界面-->
    <el-dialog title="设置" :visible.sync="editFormVisible" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :data="deviceSetting" :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="设备编号" >
          <el-input v-model="editForm.deviceId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="低温阈值" >
          <el-input v-model="editForm.lowTempThreshold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="高温阈值" >
          <el-input v-model="editForm.highTempThreshold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="漏水阈值" >
          <el-input v-model="editForm.waterThreshold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="漏电阈值" >
          <el-input v-model="editForm.electricThreshold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="自动模式温度" >
          <el-slider v-model="editForm.autoTemp" show-input :min="1" :max="99"></el-slider>
        </el-form-item>
        <el-form-item label="自动模式温差" >
          <el-input-number v-model="editForm.autoDifference" :min="0" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="自动模式功率" >
          <el-input-number v-model="editForm.autoPower" :min="1" :max="4"></el-input-number>
        </el-form-item>
        <el-form-item label="一段模式起始" >
          <el-time-picker v-model="editForm.startTime1" format='HH:mm' value-format="HH:mm"
                          :picker-options="{selectableRange:`00:00:00 -${editForm.endTime1 ? editForm.endTime1+':00' : '23:59:00'}`}">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="一段模式结束" >
          <el-time-picker v-model="editForm.endTime1" format='HH:mm' value-format="HH:mm"
                          :picker-options="{selectableRange:`${editForm.startTime1 ? editForm.startTime1+':00' : '00:00:00'} - '23:59:00'}`}">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="一段模式温度" >
          <el-slider v-model="editForm.temp1" show-input :min="1" :max="99"></el-slider>
        </el-form-item>
        <el-form-item label="一段模式温差" >
          <el-input-number v-model="editForm.difference1" :min="0" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="一段模式功率" >
          <el-input-number v-model="editForm.power1" :min="1" :max="4"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import util from '../../common/utils'
  //import NProgress from 'nprogress'
  import {getDeviceShowList,editDevice,getDeviceSetting} from '../../network/api';

  export default {
    data() {
      return {
        filters: {
          deviceId: ''
        },
        deviceShowInfo: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        deviceSetting: [], //点击编辑按钮先请求回来的目前设置
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          deviceId: [
            { required: true, message: '请输入设备编号', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          deviceId: '',
          highTempThreshold: 0,
          lowTempThreshold: 0,
          waterThreshold: 0,
          electricThreshold: 0,
          autoTemp: 0,
          autoDifference: 0,
          autoPower: 0,
          startTime1: '',
          endTime1: '',
          temp1: 0,
          difference1: 0,
          power1: 0,
        },

      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getDeviceShows();
      },
      //获取设备展示列表
      getDeviceShows() {
        let para = {
          deviceId: this.filters.deviceId,
          token: sessionStorage.getItem("token")
        };
        this.listLoading = true;
        //NProgress.start();
        getDeviceShowList(para).then (data => {
          this.deviceShowInfo = data.message;
          this.listLoading = false;
          //NProgress.done();
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getDeviceShows();
          });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        //this.editForm.deviceId = Object.assign({}, row).deviceId;  //编辑界面的deviceId为点击行的deviceId
        let para = {
          deviceId: Object.assign({}, row).deviceId,  //这一行的deviceId
          token: sessionStorage.getItem("token")
        };
        getDeviceSetting(para).then (data => {
          this.deviceSetting = data.message;
          //NProgress.done();
          this.editForm = this.deviceSetting;
        });
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              this.editForm.token = sessionStorage.getItem("token");  // 将token添加到参数列表中
              let para = Object.assign({}, this.editForm);
              editDevice(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                //this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                //this.getDeviceShows();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getDeviceShows();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getDeviceShows();
    }
  }

</script>

<style scoped>

</style>

