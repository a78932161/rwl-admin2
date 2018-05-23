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
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <div>
            <el-cascader
              placeholder="试试搜索：浙江"
              :options="options"
              filterable
              change-on-select
              clearable
              @change="cascader"
            ></el-cascader>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="orderTotal"
              label="订单总数">
            </el-table-column>
            <el-table-column
              prop="productTotal"
              label="商品数量">
            </el-table-column>
            <el-table-column
              prop="orderTotal"
              label="收入总额">
            </el-table-column>
            <el-table-column
              prop="rechargeTotal"
              label="充值总额">
            </el-table-column>
            <el-table-column
              prop="refundTotal"
              label="退款总额">
            </el-table-column>
            <el-table-column
              prop="laundryTotal"
              label="洗衣">
            </el-table-column>
            <el-table-column
              prop="highLaundryTotal"
              label="高端洗护">
            </el-table-column>
            <el-table-column
              prop="furnitureTotal"
              label="小让家具">
            </el-table-column>
            <el-table-column
              prop="mallTotal"
              label="订单商城">
            </el-table-column>
            <el-table-column
              prop="agentIncome"
              label="商户收入">
            </el-table-column>
            <el-table-column
              prop="platformIncome"
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
  import {getclearing} from "@/components/api/clearing";

  export default {
    components: {
      top,
    },
    data() {
      return {
        options: CityInfo,
        value1: null,
        size: 5,
        page: 1,
        total: 10,
        province: '',
        city: '',
        zone: '',
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
      goclearingds() {
        this.$router.push('/clearingds');
      },
      getList() {
        console.log(this.value1);
        console.log(this.province);

        if (this.value1 && this.province) {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime(),
            province: this.province,
            city: this.city,
            area: this.zone,
          };
          getclearing(b).then((res) => {
            console.log(res);
            this.tableData = res.data.data;
          })
        } else if (this.value1 ===null && this.province) {
          let b = {
            province: this.province,
            city: this.city,
            area: this.zone,
          };
          getclearing(b).then((res) => {
            console.log(res);
            this.tableData = res.data.data;
          })
        } else if (this.value1 && this.province === '') {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime(),
          };
          getclearing(b).then((res) => {
            console.log(res);
            this.tableData = res.data.data;
          })
        } else if (this.value1 ===null && this.province === '') {
          let a = new Date();
          let b = {
            starttime: 0,
            endtime: a.getTime(),
          };
          getclearing(b).then((res) => {
            console.log(res);
            this.tableData = res.data.data;
          })
        }
      },
      cascader(value) {
        this.province = '';
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            value1.children.forEach((value2) => {
              if (value[1] == value2.value) {
                value2.children.forEach((value3) => {
                  if (value[2] == value3.value) {
                    this.province = value1.label;
                    this.city = value2.label;
                    this.zone = value3.label;
                  }
                })
              }
            })
          }
        })
      },
      search() {
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

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .el-bb {
    margin-bottom: 3%;
  }
</style>
