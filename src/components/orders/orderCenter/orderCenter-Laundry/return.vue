<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders',query:{type:1} }">洗衣</el-breadcrumb-item>
        <el-breadcrumb-item>送还订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <inquire @orderData="orderData"></inquire>
    <div class="ord-content5">
      <div>
        <el-cascader
          placeholder="试试搜索：门店"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary" disabled>立即派送</el-button>
        <el-button type="primary" disabled>已派订单</el-button>
        <el-button type="primary" disabled>入站订单</el-button>
        <el-button type="primary" disabled>取消订单</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{`${props.row.province}${props.row.city}${props.row.area}${props.row.address}`}}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="预约时间">
                <span>{{ props.row.deliveryDate }}</span>
              </el-form-item>
              <el-form-item label="套餐选择"><span>{{ props.row.goods }}</span></el-form-item>
              <el-form-item label="已付金额"><span>{{ props.row.amount/100 }}</span></el-form-item>
              <el-form-item label="支付方式"><span>{{ props.row.payMode}}</span></el-form-item>
              <el-form-item label="更新时间"><span>{{props.row.statusUpdateTime}}</span></el-form-item>
              <el-form-item style="text-align: center;width:100%">
                <el-button type="primary" @click="details(props.row)">查看详情</el-button>
                <el-button type="primary" @click="endd(props.row)">完结订单</el-button>
                <el-button type="primary" @click="withdraw(props.row)">撤回订单</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="number">
        </el-table-column>
        <el-table-column width="150" label="时间" prop="createtime"></el-table-column>
        <el-table-column width="250" label="地址" prop="address"></el-table-column>
        <el-table-column
          label="商品"
          prop="goods1">
        </el-table-column>
        <el-table-column width="80" label="件数" prop="total"></el-table-column>
        <el-table-column
          label="门店"
          prop="receiptPeople">
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin: 5% 0 5% 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import {getlaundry, returnlaundry, endlaundry, withdrawlaundry} from "@/components/api/orderLaundry";
  import inquire from '@/assets/vue/inquire'

  export default {
    components: {
      inquire
    },
    data() {
      return {
        page: 1,
        size: 10,
        total: 10,
        tableData: [],
        options: [],
        inquire: '',
      }
    },
    methods: {
      getLaundryList() {
        this.options = [];
        this.tableData = [];
        this.$store.state.getieData = [];
        this.inquire = [];
        if (this.$store.state.orderFind.object != null) {
          this.$store.state.orderFind.object.forEach((value) => {
            value.total = value.items.length + '件';
            if (value.payMode == 0) {
              value.payMode = '微信支付'
            } else if (value.payMode == 1) {
              value.payMode = '余额支付'
            } else if (value.payMode == 2) {
              value.payMode = '卡支付'
            }
            if (value.items) {
              let b = [];
              value.items.forEach((value1) => {
                b.push(value1.laundryProduct.name);
              });
              value.goods1 = b[0];
              value.goods = b.join(',');
            }
            value.createtime = this.getLocalTime(value.createtime);
            value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);

          });
          this.tableData = this.$store.state.orderFind.object;
          this.total = this.$store.state.orderFind.totalSize;

        } else if (this.$store.state.orderArea.content) {
          this.$store.state.orderArea.content.forEach((value) => {
            value.total = value.items.length + '件';
            if (value.payMode == 0) {
              value.payMode = '微信支付'
            } else if (value.payMode == 1) {
              value.payMode = '余额支付'
            } else if (value.payMode == 2) {
              value.payMode = '卡支付'
            }
            if (value.items) {
              let b = [];
              value.items.forEach((value1) => {
                b.push(value1.laundryProduct.name);
              });
              value.goods1 = b[0];
              value.goods = b.join(',');
            }
            value.createtime = this.getLocalTime(value.createtime);
            value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);

          });
          this.tableData = this.$store.state.orderArea.content;
          this.total = this.$store.state.orderArea.totalElements;


        } else {
          let a = {
            type: 1,
            status: 7,
            page: this.page,
            size: this.size,
          };
          getlaundry(a).then((res) => {
            res.data.data.content.forEach((value) => {
              value.total = value.items.length + '件';
              if (value.payMode == 0) {
                value.payMode = '微信支付'
              } else if (value.payMode == 1) {
                value.payMode = '余额支付'
              } else if (value.payMode == 2) {
                value.payMode = '卡支付'
              }
              if (value.items) {
                let b = [];
                value.items.forEach((value1) => {
                  b.push(value1.laundryProduct.name);
                });
                value.goods1 = b[0];
                value.goods = b.join(',');
              }
              value.createtime = this.getLocalTime(value.createtime);
              value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
            });
            this.tableData = res.data.data.content;
            this.total = res.data.data.totalElements;

          });
        }
      },
      orderData(data) {
        this.getLaundryList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.inquire = {
          page: this.page,
          size: this.size,
          type: 1,
          status: 7,
        };
        this.$store.commit('getieData', this.inquire);
        this.getLaundryList();
      },

      goLaundry() {
        this.$router.push('/orderIndex');
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      details(row) {
        let a = row.id;
        this.$router.push({name: 'userOrders', query: {id: a}});
      },
      withdraw(row) {

        let a = {
          orderid: row.id
        };
        withdrawlaundry(a).then((res) => {
          this.$confirm('此操作将撤回订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (res.data.code == 0) {
              this.$message({
                message: `${res.data.msg}`,
                type: 'success'
              });
              this.getLaundryList();
            } else {
              this.$message.error('撤回失败!');
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        })
      },
      endd(row) {
        this.$confirm('此操作将完结订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            orderid: row.id,
          };
          endlaundry(a).then((res) => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: `${res.data.msg}`,
              });
              this.getLaundryList();
            } else {
              this.$message({
                type: 'warning',
                message: `${res.data.msg}`,
              })
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

    },
    mounted() {
      this.$store.state.orderFind = [];
      this.$store.state.orderArea = [];
      let inquire = {
        page: 1,
        size: 10,
        type: 1,
        status: 7,
      };
      this.$store.commit('getieData', inquire);
      this.getLaundryList();
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

  .ord-content5 button {
    width: 100px;
    height: 50px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }


</style>
