<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">小让商城</el-breadcrumb-item>
        <el-breadcrumb-item>已派订单</el-breadcrumb-item>
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
        <el-button type="primary">已派订单</el-button>
        <el-button type="primary" disabled>完结订单</el-button>
        <el-button type="primary" disabled>取消订单</el-button>
        <el-button type="primary">导出订单</el-button>
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
                <el-button type="primary">查看详情</el-button>
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

  import {getmall} from "@/components/api/ordermall";
  import inquire from '@/assets/vue/inquire'
  export default {
    components:{
      inquire
    },
    data() {
      return {
        page: 1,
        size: 5,
        total: 10,
        tableData: [],
        options:[],
      }
    },
    methods: {
      getMallList() {
        let a = {
          status: 1,
          page: this.page,
          size: this.size,
        };
        getmall(a).then((res) => {
          res.data.data.content.forEach((value) => {
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
            status: 1,
          };
          this.$store.commit('getieData', this.inquire);
        })
      },
      orderData(data) {
        console.log(data);
      },
      aa() {
        this.$router.go(0);
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
