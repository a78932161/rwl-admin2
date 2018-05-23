<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">小让商城</el-breadcrumb-item>
        <el-breadcrumb-item>新订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <inquire @orderData="orderData"></inquire>
    <div class="ord-content5">
      <div>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="distribution">立即派送</el-button>
        <el-button type="primary" disabled>已派订单</el-button>
        <el-button type="primary" disabled>完结订单</el-button>
        <el-button type="primary" disabled>取消订单</el-button>
        <el-button type="primary" @click="daochu">导出订单</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="预约时间">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="已付金额">
                <span>{{ props.row.amount }}</span>
              </el-form-item>
              <el-form-item style="display: flex; justify-content:center;width:100%">
                <el-button type="primary" @click="details(props.row)">查看详情</el-button>
                <el-button type="primary" @click="quxiao(props.row)">取消订单</el-button>
                <el-button type="primary">派给顺丰</el-button>
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
        <el-table-column
          label="派单时间"
          prop="createtime">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin: 5% 0 5% 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="5"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getmall, InvalidMall, deliveryMall, distributionMall} from "@/components/api/ordermall";
  import inquire from '@/assets/vue/inquire'

  export default {
    components: {
      inquire
    },
    data() {
      return {
        page: 1,
        size: 5,
        total: 10,
        tableData: [],
        options: [],
        value: '',
        inquire:[],
      }
    },
    methods: {
      getMallList() {
        this.options = [];
        this.tableData = [];
        this.$store.state.getieData = [];
        this.inquire = [];
        if (this.$store.state.orderFind.length > 0) {
          this.$store.state.orderFind.forEach((value) => {
            value.items = value.items.length + '件';
            value.createtime = this.getLocalTime(value.createtime);
            switch (value.status) {
              case 0:
                value.status = '新订单';
                break;
              case 1:
                value.status = '已派订单';
                break;
              case 2:
                value.status = '已收订单';
                break;
              case 3:
                value.status = '入站订单';
                break;
              case 4:
                value.status = '上挂订单';
                break;
              case 5:
                value.status = '完结订单';
                break;
              case 6:
                value.status = '取消订单';
                break;
            }
          });
          this.tableData = this.$store.state.orderFind;
          this.total = this.$store.state.orderFind.length;
          this.inquire = {
            page: this.page,
            size: this.size,
            type: 4,
            status: 0,
          };
          this.$store.commit('getieData', this.inquire);
        } else if (this.$store.state.orderArea.content) {
          this.$store.state.orderArea.content.forEach((value) => {
            value.items = value.items.length + '件';
            value.createtime = this.getLocalTime(value.createtime);
            switch (value.status) {
              case 0:
                value.status = '新订单';
                break;
              case 1:
                value.status = '已派订单';
                break;
              case 2:
                value.status = '已收订单';
                break;
              case 3:
                value.status = '入站订单';
                break;
              case 4:
                value.status = '上挂订单';
                break;
              case 5:
                value.status = '完结订单';
                break;
              case 6:
                value.status = '取消订单';
                break;
            }
          });
          this.tableData = this.$store.state.orderArea.content;
          this.total = this.$store.state.orderArea.totalElements;
          this.inquire = {
            page: this.page,
            size: this.size,
            type: 4,
            status: 0,
          };
          this.$store.commit('getieData', this.inquire);

        } else {
          let a = {
            type: 4,
            status: 0,
            page: this.page,
            size: this.size,
          };
          getmall(a).then((res) => {
            res.data.data.content.forEach((value) => {
              value.items = value.items.length + '件';
              value.createtime = this.getLocalTime(value.createtime);
              switch (value.status) {
                case 0:
                  value.status = '新订单';
                  break;
                case 1:
                  value.status = '已派订单';
                  break;
                case 2:
                  value.status = '已收订单';
                  break;
                case 3:
                  value.status = '入站订单';
                  break;
                case 4:
                  value.status = '上挂订单';
                  break;
                case 5:
                  value.status = '完结订单';
                  break;
                case 6:
                  value.status = '取消订单';
                  break;
              }
            });
            this.tableData = res.data.data.content;
            this.total = res.data.data.totalElements;
            this.inquire = {
              page: this.page,
              size: this.size,
              type: 4,
              status: 0,
            };
            this.$store.commit('getieData', this.inquire);
          });
          deliveryMall().then((res) => {
            res.data.data.forEach((value) => {
              let a = {
                value: value.id,
                label: value.name
              };
              this.options.push(a);
            });
          })
        }
      },
      orderData(data) {
        this.getMallList();
      },

      goLaundry() {
        this.$router.push('/orderIndex');
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getMallList();
      },
      quxiao(row) {
        this.$confirm('此操作将永久取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            orderid: row.id
          };
          InvalidMall(a).then((res) => {
            console.log(res);
            this.getMallList();
          });
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      daochu() {
        window.location.href = 'http://rtest.rwlai.cn/rwlmall/rwlmall/mallorder/export?status=0';
      },
      distribution() {
        console.log(this.mutipleSelection);
        console.log(this.value);
        let idData = [];
        if (this.mutipleSelection && this.value) {
          this.mutipleSelection.forEach((value) => {
            idData.push(value.id);
          });
          let a = {
            orderid: idData.join(','),
            storeid: this.value,
          };
          distributionMall(a).then((res) => {
            this.getMallList();
            this.$message({
              message: '派送成功',
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: '请选择需要派送的订单或选择门店',
            type: 'warning'
          });
        }
      },
      handleSelectChange(selection) {
        this.mutipleSelection = selection;
        let ids = [];
        this.mutipleSelection.map((item) => {
          ids.push(item.id)
        });
        return ids;
      },
      details(row) {
        let a = row.id;
        this.$router.push({name: 'userOrders', query: {id: a}});
      },
    },

    mounted() {
      this.getMallList();

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
