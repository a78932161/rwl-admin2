<template>
  <div>
    <div v-show="showFlag">
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <el-input placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
      </div>
      <div>
        <el-cascader
          placeholder="试试搜索：浙江"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="ord-content2">
      <el-button type="primary" class="ord-content2-bt" @click="gopd">订单派单</el-button>
      <el-button type="primary" @click="gofx">订单分析</el-button>
    </div>
    </div>

    <OrderDispatch v-show="isDispatch"></OrderDispatch>
    <OrderAnalysis v-show="isAnalysis"></OrderAnalysis>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import OrderDispatch  from '@/components/orders/orderDispatch';
  import OrderAnalysis  from '@/components/orders/orderAnalysis';

  export default {

    components:{
      OrderDispatch,
      OrderAnalysis
    },
    data() {
      return {
        showFlag:true,
        isDispatch:false,
        isAnalysis:false,
        options: CityInfo
      }
    },
    methods:{
      gopd(){
       this.showFlag=false;
       this.isDispatch=true;
      },
      gofx(){
        this.showFlag=false;
        this.isAnalysis=true;
      }
  }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin: 0 0 3% 0;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 10% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .ord-content2 {
    text-align: center;
  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 25px;

  }
  .ord-content2-bt{
    margin: 0 50px 0 0;
  }
</style>
