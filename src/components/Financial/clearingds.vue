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
            <el-breadcrumb-item >商户结算详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="订单总数">
            </el-table-column>
            <el-table-column
              prop="name"
              label="撤单总数">
            </el-table-column>
            <el-table-column
              prop="name"
              label="退款总数">
            </el-table-column>
            <el-table-column
              prop="name"
              label="收衣总数">
            </el-table-column>
            <el-table-column
              prop="name"
              label="洗衣收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="小让商城收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="小让家具收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="高端洗护收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="微信支付">
            </el-table-column>
            <el-table-column
              prop="name"
              label="余额支付">
            </el-table-column>
            <el-table-column
              prop="name"
              label="支付宝">
            </el-table-column>
            <el-table-column
              prop="name"
              label="代理商收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="平台收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="物流收入">
            </el-table-column>

          </el-table>
        </div>
        <div style="text-align: center;margin: 5% 0 5% 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </div>


</template>

<script>
  import "@/assets/js/city-data"
  import top from '@/assets/vue/top'

  export default {
    components:{
      top,
    },
    data() {
      return {
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
          name: '10',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '20',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '30',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '50',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .el-bb{
    margin-bottom: 3%;
  }
</style>
