<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content">
        <div class="ord-content1">
          <el-input placeholder="请输入内容"></el-input>
          <el-button type="primary">查询</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
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
        <el-button type="primary" class="ord-content2-bt" @click="gostatistics">会员统计</el-button>
        <el-button type="primary" @click="goConsumption">消费统计</el-button>
      </div>
    </div>
    <statistics v-show="isStatistics"></statistics>
    <consumption v-show="isConsumption"></consumption>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import statistics from '@/components/vipManage/statistics'
  import consumption from '@/components/vipManage/consumption'

  export default {

    components: {
      statistics,
      consumption
    },
    data() {
      return {
        showFlag: true,
        options: CityInfo,
        value1: '',
        isStatistics:false,
        isConsumption:false,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      gostatistics() {
        this.showFlag=false;
        this.isStatistics=true;
      },
      goConsumption(){
        this.showFlag=false;
        this.isConsumption=true;
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

  .ord-content2-bt {
    margin: 0 50px 0 0;
  }
</style>
