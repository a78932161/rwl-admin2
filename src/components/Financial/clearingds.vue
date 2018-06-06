<template>
  <div>
    <top></top>
    <el-col :span="24">
      <el-col :span="18" :offset="4">
        <div class="el-bb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/financial' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/clearing' }">商户结算</el-breadcrumb-item>
            <el-breadcrumb-item>商户结算详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <el-table
            :data="tableData"
            stripe>
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="orderTotal"
              label="订单总数">
            </el-table-column>
            <el-table-column
              prop="incomeTotal"
              label="总收入">
            </el-table-column>
            <el-table-column
              prop="productTotal"
              label="商品总量">
            </el-table-column>
            <el-table-column
              prop="laundryTotal"
              label="洗衣收入">
            </el-table-column>
            <el-table-column
              prop="mallTotal"
              label="小让商城收入">
            </el-table-column>
            <el-table-column
              prop="furnitureTotal"
              label="小让家具收入">
            </el-table-column>
            <el-table-column
              prop="highLaundryTotal"
              label="高端洗护收入">
            </el-table-column>
            <el-table-column
              prop="weChatPay"
              label="微信支付">
            </el-table-column>
            <el-table-column
              prop="balancePay"
              label="余额支付">
            </el-table-column>
            <el-table-column
              prop="agentIncome"
              label="商户收入">
            </el-table-column>
            <el-table-column
              prop="platformIncome"
              label="平台收入">
            </el-table-column>
          </el-table>
        </div>
        <div style="text-align: center;margin: 5% 0 5% 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </div>


</template>

<script>
  import "@/assets/js/city-data"
  import top from '@/assets/vue/top'
  import {getclearingds} from "@/components/api/clearing";

  export default {
    components: {
      top,
    },
    data() {
      return {
        options: CityInfo,
        value1: '',
        page: 1,
        size: 10,
        total: 10,
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
        tableData: [],
      }
    },
    methods: {
      getList() {
        let a = this.$route.query.id;
        let b = {
          storeid: a,
          page:this.page,
          size:this.size,
        };
        getclearingds(b).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.tableData = res.data.data.content;
            this.total=res.data.data.count;
          }
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
      },

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

  .el-bb {
    margin-bottom: 3%;
  }
</style>
