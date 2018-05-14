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
      <el-button type="primary" @click="goLaundry">洗衣<br>{{items.洗衣}}</el-button>
      <el-button type="primary" @click="goDesigner">高端洗护<br>{{items.高端洗护}}</el-button>
      <el-button type="primary" @click="goFurniture">小让家具<br>{{items.家具}}</el-button>
      <el-button type="primary" @click="goMall">小让商城<br>{{items.商城}}</el-button>
    </div>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {orderNumber} from "@/components/api/order";

  export default {
    data() {
      return {
        a: 10,
        options: CityInfo,
        items: [],
        value1:'',
      }
    },
    methods: {
      getList() {
        let a = new Date();
        let b = {
          starttime: a.getTime() - 3600 * 1000 * 24,
          endtime: a.getTime(),
        };
        orderNumber(b).then((res) => {
          this.items = res.data.data;
        })
      },



      aa() {
        this.$emit('goIndex',true);
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
    },
    mounted() {
      this.getList();
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
    margin: 0 0 8% 0;
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
    display: flex;
    justify-content: space-around;
  }

  .ord-content4 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }

</style>
