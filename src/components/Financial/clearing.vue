<template>
  <div>
    <top></top>
    <el-col :span="24">
      <el-col :span="18" :offset="4">
        <div class="el-bb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/financial' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>商户结算</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="ord-content">
          <div style="margin-right: 13%">
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
              label="商品数量">
            </el-table-column>
            <el-table-column
              prop="name"
              label="收入总额">
            </el-table-column>
            <el-table-column
              prop="name"
              label="充值总额">
            </el-table-column>
            <el-table-column
              prop="name"
              label="导卡总额">
            </el-table-column>
            <el-table-column
              prop="name"
              label="退款总额">
            </el-table-column>
            <el-table-column
              prop="name"
              label="洗衣">
            </el-table-column>
            <el-table-column
              prop="name"
              label="高端洗护">
            </el-table-column>
            <el-table-column
              prop="name"
              label="小让家具">
            </el-table-column>
            <el-table-column
              prop="name"
              label="订单商城">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商户收入">
            </el-table-column>
            <el-table-column
              prop="name"
              label="平台佣金">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="goclearingds">详情</el-button>
              </template>
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
      }
    },
    methods:{
      goclearingds(){
        this.$router.push('/clearingds');
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .top {
    height: 50px;
    border-bottom: 1px solid rgb(20, 190, 240);
    display: flex;
    align-items: center;
    margin: 0 0 30px 0;
  }

  .logo {
    display: flex;
  }

  .logo1 {
    margin: 0 10px 0 0;
  }

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .logo2 {
    color: rgb(20, 190, 240);
    font-size: 20px;
    letter-spacing: 2px;
    margin: 5px 0 0 0;
  }

  .logo3 {
    font-size: 16px;
  }

  .ord-content {
    display: flex;
    margin: 0 0 3% 0;
  }
  .el-bb{
    margin-bottom: 3%;
  }
</style>
