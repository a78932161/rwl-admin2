<template>
<div>
  <div class="ord-top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item ><span @click="aa()">订单管理</span></el-breadcrumb-item>
      <el-breadcrumb-item>订单分析</el-breadcrumb-item>
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
    <el-table
      :data="tableData6"
      show-summary
      stripe
      :summary-method="getSummaries"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="类目"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="订单数">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="单价均价">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="商品数量">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="110">
        <template slot-scope="scope">
          <el-button  type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</div>
</template>

<script>
  import "@/assets/js/city-data"
    export default {
      data() {
        return {
          options: CityInfo,
          tableData6: [{
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          }, {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '4.43',
            amount3: 12
          }, {
            id: '12987124',
            name: '王小虎',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
          }, {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
          }, {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4.1',
            amount3: 15
          }]
        }
      },
      methods: {
        getSummaries(param) {
          const { columns} = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '支付类型';
              return;
            }
            if(index === 1){
              sums[index] = '微信支付:';
            }
            if(index === 2){
              sums[index] = '余额支付:';
            }
            if(index === 3){
              sums[index] = '支付宝支付:';
            }
          });

          return sums;
        },
        aa(){
          this.$router.go(0)
        },
      },
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
    margin: 0 0 5% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;

  }
</style>
