<template>
  <div>
    <div class="vipTop">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item @click="goIndex">会员管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span @click="goIndex1">消费统计</span></el-breadcrumb-item>
        <el-breadcrumb-item >衣物明细统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div style="margin-right: 20%">
        <el-cascader
          placeholder="试试搜索：浙江"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
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

    </div>
    <div class="vipyw">
      <div ></div>
      衣物明细
    </div>
    <div>
      <div style="width: 50%;margin-left: 30%">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>
      </div>

    </div>
  </div>

</template>

<script>
  import "@/assets/js/city-data"
  export default {
    data(){
      return{
        options: CityInfo,
        value1: '',
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      goIndex(){
        this.$router.go(0);
      },
      goIndex1(){
        this.$emit('goIndex1',true);
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .vipTop {
    margin-bottom: 3%;
  }

  .ord-content {
    display: flex;
    margin: 0 0 3% 0;
  }

  .vipRadio {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }

  .vipRadio label {
    margin-right: 3%;
  }

  .vipyw {
    border-bottom: 1px solid rgb(20, 190, 240);
    width: 20%;
    display: flex;
    color: rgb(20, 190, 240);
    font-weight: bolder;
    margin-bottom: 3%;
    letter-spacing: 1px;
  }

  .vipyw div {
    width: 25px;
    height: 25px;
    background: rgb(20, 190, 240);
    margin: 0 5% -1px 0;
  }

  .viptable {
    margin-bottom: 3%;
  }
</style>
