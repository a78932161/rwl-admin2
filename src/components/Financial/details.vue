<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gofinancial">财务管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goaccount">账号管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>转存记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div><label>莫好克卡号 : </label></div>
      <div><label>会员卡类型 : </label></div>
      <div><label>实际转存额 : </label></div>
      <div><label>持卡人姓名 : </label></div>
      <div><label>持卡人手机 : </label></div>
      <div><label>备注 : </label></div>
      <div>
        <label>注册信息 : </label>
        <div style="display: grid;margin-left: 10%;margin-top: -34px">
          <label>会员ID : </label>
          <label>绑定手机号 : </label>
          <label>注册时间 : </label>
          <label>用户余额 : </label>
        </div>
      </div>
      <div><label>转存时间 : </label></div>
      <div><label>转存人 : </label></div>
      <div><label>转存后余额 : </label></div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "details",
    data(){
      return{

      }
    },
    methods:{
      gofinancial(){
        this.$emit('mp', true);
      },
      goaccount(){
        this.$emit('mp1', true);
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }
  .ord-top{
    margin-bottom: 3%;
  }
  .box-card {
    line-height: 35px;
    font-size: 18px;
    color: rgb(106, 119, 127);
  }
</style>
