<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="4" class="vipAside">
        <div class="vipTop">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户余额</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card class="vipInfo">
          <div><label>姓名: {{name}}</label></div>
          <div><label>ID: {{id}}</label></div>
          <div><label>手机: {{phone}}</label></div>
        </el-card>

      </el-col>
      <el-col :span="14" class="vipMain">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类目">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账号余额">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="110">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.category=='消费'" @click="goUserOrders(scope.row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
  import top from '@/assets/vue/top'
  import {getvip1, getrecords} from "@/components/api/vipss";

  export default {
    components: {
      top,
    },
    data() {
      return {
        tableData: [],
        name: '',
        id: '',
        phone: '',
        size: 5,
        page: 1,
        total: 10,
      }
    },
    methods: {
      getList() {
        let a = {
          userid: this.$route.query.id,
        };
        getvip1(a).then((res) => {
          this.name = res.data.data.name;
          this.id = res.data.data.number;
          this.phone = res.data.data.phone;
        });
        getrecords(a).then((res1) => {
          res1.data.data.forEach((value) => {
            value.time = this.getLocalTime(value.time);
            value.balance = value.balance / 100;
            value.money = value.money / 100;
          });
          this.total = res1.data.data.length;
          let arr = res1.data.data;
          let currentArr = [];
          let page = this.size;
          let currentPage = this.page;
          let StartNum = (currentPage - 1) * page;
          let EndNum = currentPage * page;
          for (let i = StartNum; i < EndNum; i++) {
            if (!arr[i]) {
              break;
            }
            currentArr.push(arr[i]);
          }
          this.tableData = currentArr;//显示的数据
          console.log(this.tableData);
        })
      },
      goUserOrders(row) {
        console.log(row.orderId);
        let a = row.orderId;
        this.$router.push({name: 'userOrders', query: {id: a}});
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      handleCurrentChange(val) {
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

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .vipAside {

  }

  .vipTop {
    margin: 0 0 10% 0;
  }

  .vipInfo {
    width: 80%;
    padding: 5px;
    font-size: 18px;
    line-height: 40px;
  }

  .vipMain {
    margin: 2% 0 0 0;

  }
</style>
