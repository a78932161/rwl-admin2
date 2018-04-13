<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="aa()">订单管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>订单派单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <el-input placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="ord-content3">
        <label class="ord-content3-l">昨天订单:<b>{{a}}</b>单</label>
        <label>今天订单:<b>{{a}}</b>单</label>
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
    <div class="ord-content4">
      <el-button type="primary" @click="goLaundry">洗衣<br>{{a}}</el-button>
      <el-button type="primary" @click="goDesigner">高端洗护<br>{{a}}</el-button>
      <el-button type="primary" @click="goFurniture">小让家具<br>{{a}}</el-button>
      <el-button type="primary" @click="goMall">小让商城<br>{{a}}</el-button>
    </div>
  </div>
</template>

<script>
  import "@/assets/js/city-data"

  export default {
    data() {
      return {
        a: 10,
        options: CityInfo,
      }
    },
    methods: {
      aa() {
        this.$router.go(0)
      },
      goLaundry() {
        this.$router.push('/newLaundry');
      },
      goDesigner() {
        this.$router.push('/newDesigner');
      },
      goFurniture() {
        this.$router.push('/newFurniture');
      },
      goMall() {
        this.$router.push('/newMall');
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

  .ord-content3 {
    margin: 10px auto;
  }

  .ord-content3-l {
    margin: 0 10px 0 0;
  }

  .ord-content4 {
    text-align: center;
  }

  .ord-content4 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }

</style>
