<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" class="ord-content2-bt" @click="gopd">订单派单</el-button>
        <el-button type="primary" @click="gofx">订单分析</el-button>
      </div>
    </div>

    <OrderDispatch v-if="isDispatch" @goIndex="goIndex"></OrderDispatch>
    <OrderAnalysis v-if="isAnalysis" @goIndex1="goIndex1"></OrderAnalysis>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import OrderDispatch from '@/components/orders/orderDispatch';
  import OrderAnalysis from '@/components/orders/orderAnalysis';

  export default {

    components: {
      OrderDispatch,
      OrderAnalysis
    },
    data() {
      return {
        showFlag: true,
        isDispatch: false,
        isAnalysis: false,
        options: CityInfo
      }
    },
    methods: {
      gopd() {
        this.showFlag = false;
        this.isDispatch = true;
      },
      gofx() {
        this.showFlag = false;
        this.isAnalysis = true;
      },
      goIndex(data) {
        this.showFlag = data;
        this.isDispatch = false;
      },
      goIndex1(data) {
        this.showFlag = data;
        this.isAnalysis = false;
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin-bottom: 15%;
    text-align: center;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;
  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 25px;

  }

  .ord-content2-bt {
    margin: 0 50px 0 0;
  }
</style>
